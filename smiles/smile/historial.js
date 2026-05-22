import './historial.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import { collection, getDocs, doc, deleteDoc, query, where } from 'firebase/firestore';
import { wiAuth, Notificacion, Capi, getls, savels } from '../widev.js';
import { rutas } from '../rutas.js';
import { getMesActual, invalidateRankingCaches } from './zsmile.js';

let todasLasVentas = [];
let todosLosEmpleados = [];
let mesSeleccionado = getMesActual();
let filtroVendedor = '';
let filtroHoy = false;
let pagActual = 1;
let limitePorPagina = 9;
let busquedaFiltro = '';

export const render = () => {
  const mesesOptions = selectMes();
  return `
    <div class="smw_hist_view">
      
      <!-- CABECERA: Título y Selector de Mes -->
      <header class="smw_hist_header wi_fadeUp">
        <div class="smw_hist_title_row">
          <h1><i class="fas fa-clipboard-list smw_cielo_glow"></i> Historial de Ventas</h1>
          <p class="smw_hist_subtitle">Monitorea y gestiona los registros mensuales</p>
        </div>

        <div class="smw_hist_controls">
          <!-- Selector de Mes con flechas -->
          <div class="smw_month_selector_wrap">
            <button class="smw_month_nav_btn" id="btnHistMesAnt" title="Mes Anterior">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="smw_month_display">
              <i class="fas fa-calendar-alt"></i>
              <span id="txtHistMesSeleccionado">...</span>
            </div>
            <!-- Select oculto para cambio de mes -->
            <select id="selHistorialMes" class="smw_month_hidden_select_header">
              ${mesesOptions}
            </select>
            <button class="smw_month_nav_btn" id="btnHistMesSig" title="Mes Siguiente">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </header>

      <!-- BARRA DE FILTROS -->
      <section class="smw_hist_filters_card wi_fadeUp" style="animation-delay: 0.08s">
        <div class="smw_filter_grid">
          
          <!-- Buscador -->
          <div class="smw_filter_field">
            <label><i class="fas fa-search"></i> Buscar Venta</label>
            <input type="text" id="histSearchInput" class="smw_input" placeholder="Nombre cliente o habitación...">
          </div>

          <!-- Filtrar por Vendedor -->
          <div class="smw_filter_field">
            <label><i class="fas fa-user-tie"></i> Vendedor</label>
            <select id="histFilterEmployee" class="smw_select">
              <option value="">Todos los vendedores</option>
            </select>
          </div>

          <!-- Ventas por página -->
          <div class="smw_filter_field">
            <label><i class="fas fa-list-numeric"></i> Por página</label>
            <select id="histLimtSelector" class="smw_select">
              <option value="5">Mostrar 5</option>
              <option value="9" selected>Mostrar 9</option>
              <option value="15">Mostrar 15</option>
              <option value="25">Mostrar 25</option>
            </select>
          </div>

          <!-- Solo hoy -->
          <div class="smw_filter_field smw_toggle_field">
            <label><i class="fas fa-calendar"></i> Fecha</label>
            <button class="smw_btn_toggle" id="btnFilterHoy">
              <i class="fas fa-calendar-day"></i> Solo hoy
            </button>
          </div>

        </div>
      </section>

      <!-- TABLA DE RESULTADOS -->
      <section class="smw_hist_table_card wi_fadeUp" style="animation-delay: 0.18s">

        <!-- Barra de título de tabla estilo referencia -->
        <div class="smw_hist_table_title">
          <div style="display:flex;align-items:center;gap:1.2vh">
            <i class="fas fa-table"></i>
            Registro de Ventas
          </div>
          <span id="smwHistTotal">— registros</span>
        </div>

        <div class="smw_table_responsive">
          <table class="smw_hist_table">
            <thead>
              <tr>
                <th><i class="fas fa-calendar"></i>Fecha</th>
                <th><i class="fas fa-user"></i>Usuario</th>
                <th><i class="fas fa-route"></i>Tipo Tour</th>
                <th><i class="fas fa-users"></i>PAX</th>
                <th><i class="fas fa-user-tag"></i>Nombre</th>
                <th><i class="fas fa-calculator"></i>M. Total</th>
                <th><i class="fas fa-dollar-sign"></i>M. Individual</th>
                <th><i class="fas fa-credit-card"></i>Pagado</th>
                <th><i class="fas fa-hand-holding-usd"></i>Ganancia</th>
                <th><i class="fas fa-user-shield"></i>Vendedor</th>
                <th><i class="fas fa-star"></i>Puntos</th>
                <th><i class="fas fa-cogs"></i>Acciones</th>
              </tr>
            </thead>
            <tbody id="histSalesTableBody">
              ${_generarSkeletonsTabla(9)}
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div class="smw_pagination_container" id="histPagination"></div>
      </section>

    </div>
  `;
};

export const init = async () => {
  const user = wiAuth.user;
  if (!user) return setTimeout(() => rutas.navigate('/login'), 100);

  pagActual = 1;
  filtroVendedor = '';
  filtroHoy = false;
  busquedaFiltro = '';

  $('#selHistorialMes').val(mesSeleccionado);
  _actualizarDisplayMes();

  // 1. Mostrar la UI de inmediato con sus esqueletos
  $('.wi_fadeUp').addClass('visible wi_visible');

  // 2. Cargar en segundo plano sin bloquear el hilo principal
  _cargarTodo();
  _bindEvents(user);

  window.__WIREADY__ = true;
};

export const cleanup = () => {
  $(document).off('.historial_events');
  window.verDetalleVenta     = null;
  window.editarVentaAccion   = null;
  window.eliminarVentaAccion = null;
  window.histCambiarPagina   = null;
};

// ── EVENTOS ──────────────────────────────────────────────────────────────────
function _bindEvents(user) {
  $(document).off('change.historial_events', '#selHistorialMes')
    .on('change.historial_events', '#selHistorialMes', async function() {
      mesSeleccionado = $(this).val();
      _actualizarDisplayMes();
      pagActual = 1;
      await _cargarTodo();
    });

  $(document).off('click.historial_events', '#btnHistMesAnt')
    .on('click.historial_events', '#btnHistMesAnt', function() {
      const $sel = $('#selHistorialMes');
      const index = $sel.prop('selectedIndex');
      if (index < $sel.find('option').length - 1) {
        $sel.prop('selectedIndex', index + 1).trigger('change');
      }
    });

  $(document).off('click.historial_events', '#btnHistMesSig')
    .on('click.historial_events', '#btnHistMesSig', function() {
      const $sel = $('#selHistorialMes');
      const index = $sel.prop('selectedIndex');
      if (index > 0) {
        $sel.prop('selectedIndex', index - 1).trigger('change');
      }
    });

  $(document).off('change.historial_events', '#histFilterEmployee')
    .on('change.historial_events', '#histFilterEmployee', function() {
      filtroVendedor = $(this).val();
      pagActual = 1;
      _renderizarTabla();
    });

  $(document).off('change.historial_events', '#histLimtSelector')
    .on('change.historial_events', '#histLimtSelector', function() {
      limitePorPagina = parseInt($(this).val());
      pagActual = 1;
      _renderizarTabla();
    });

  $(document).off('input.historial_events', '#histSearchInput')
    .on('input.historial_events', '#histSearchInput', function() {
      busquedaFiltro = $(this).val().toLowerCase().trim();
      pagActual = 1;
      _renderizarTabla();
    });

  $(document).off('click.historial_events', '#btnFilterHoy')
    .on('click.historial_events', '#btnFilterHoy', function() {
      filtroHoy = !filtroHoy;
      $(this).toggleClass('active', filtroHoy);
      pagActual = 1;
      _renderizarTabla();
    });

  window.histCambiarPagina = (pag) => {
    pagActual = pag;
    _renderizarTabla();
  };

  window.verDetalleVenta = (id) => {
    const venta = todasLasVentas.find(v => v.id === id);
    if (!venta) return Notificacion('Venta no encontrada', 'error');
    window.editarVenta = { venta, soloVista: true };
    rutas.navigate('/registrar');
  };

  window.editarVentaAccion = (id) => {
    const venta = todasLasVentas.find(v => v.id === id);
    if (!venta) return Notificacion('Venta no encontrada', 'error');
    window.editarVenta = { venta, soloVista: false };
    rutas.navigate('/registrar');
  };

  window.eliminarVentaAccion = async (id) => {
    const venta = todasLasVentas.find(v => v.id === id);
    if (!venta) return Notificacion('Venta no encontrada', 'error');

    if (!confirm(`¿Eliminar venta de "${venta.nombreCliente}"?\n\nEsta acción NO se puede deshacer.`)) return;
    if (!confirm(`⚠️ CONFIRMACIÓN FINAL\n\nSe eliminará:\n• ${venta.nombreCliente}\n• ${venta.tipoTour}\n• S/ ${venta.importeTotal || 0}\n\n¿CONFIRMAS?`)) return;

    try {
      Notificacion('Eliminando registro...', 'info');
      await deleteDoc(doc(db, 'registrosdb', id));

      const f = venta.fechaTour;
      let mesVenta = mesSeleccionado;
      if (typeof f === 'string') {
        const [a, m] = f.split('-');
        mesVenta = `${a}-${m}`;
      } else if (f?.toDate) {
        const fd = f.toDate();
        mesVenta = `${fd.getFullYear()}-${String(fd.getMonth() + 1).padStart(2, '0')}`;
      }

      invalidateRankingCaches(venta.vendedor, mesVenta);
      Notificacion('Venta eliminada exitosamente', 'success');
      await _cargarTodo();
    } catch (e) {
      console.error('Error al eliminar:', e);
      Notificacion('Error al eliminar el registro.', 'error');
    }
  };
}

// ── ACTUALIZAR DISPLAY MES ────────────────────────────────────────────────────
function _actualizarDisplayMes() {
  const text = $('#selHistorialMes option:selected').text();
  $('#txtHistMesSeleccionado').text(text || mesSeleccionado);
}

// ── CARGAR TODO (cache-first) ─────────────────────────────────────────────────
async function _cargarTodo() {
  const $header = $('.smw_hist_header');
  $header.addClass('smw_loading');
  try {
    const cachedEmpleados = getls('todosEmpleadosSmile');
    const cachedVentas    = getls('todasVentasSmile');

    if (cachedEmpleados && cachedVentas) {
      todosLosEmpleados = cachedEmpleados;
      todasLasVentas    = cachedVentas;
      const opts = todosLosEmpleados
        .map(e => `<option value="${e.usuario}">${e.nombre || e.usuario}</option>`)
        .join('');
      $('#histFilterEmployee').html(`<option value="">Todos los vendedores</option>${opts}`).val(filtroVendedor);
      _renderizarTabla();
      return;
    }

    $('#histSalesTableBody').html(_generarSkeletonsTabla(limitePorPagina));

    const [empSnap, snap] = await Promise.all([
      getDocs(query(collection(db, 'smiles'), where('participa', '==', 'si'))),
      getDocs(collection(db, 'registrosdb'))
    ]);

    todosLosEmpleados = empSnap.docs.map(d => ({ id: d.id, ...d.data() }));
    todasLasVentas    = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    todasLasVentas.sort((a, b) => {
      const dA = a.fechaTour?.toDate ? a.fechaTour.toDate() : new Date(a.fechaTour || 0);
      const dB = b.fechaTour?.toDate ? b.fechaTour.toDate() : new Date(b.fechaTour || 0);
      return dB - dA;
    });

    savels('todosEmpleadosSmile', todosLosEmpleados, 60);
    savels('todasVentasSmile',    todasLasVentas,    5);

    const opts = todosLosEmpleados
      .map(e => `<option value="${e.usuario}">${e.nombre || e.usuario}</option>`)
      .join('');
    $('#histFilterEmployee').html(`<option value="">Todos los vendedores</option>${opts}`).val(filtroVendedor);

    _renderizarTabla();
  } catch (error) {
    console.error('Error en cargar todo:', error);
    $('#histSalesTableBody').html('<tr><td colspan="12" class="smw_error_cell"><i class="fas fa-exclamation-triangle"></i> Error al cargar datos</td></tr>');
  } finally {
    $header.removeClass('smw_loading');
  }
}

// ── RENDERIZAR TABLA ──────────────────────────────────────────────────────────
function _renderizarTabla() {
  const [actualYear, actualMes] = mesSeleccionado.split('-').map(Number);
  const hoyObj = new Date();
  const hoyStr = `${hoyObj.getFullYear()}-${String(hoyObj.getMonth() + 1).padStart(2, '0')}-${String(hoyObj.getDate()).padStart(2, '0')}`;

  // 0. Set de participantes (ya filtrado por participa==='si' al cargar empleados)
  const participantesSet = new Set(todosLosEmpleados.map(e => e.usuario));

  // 1. Filtrar por mes + participa
  let ventas = todasLasVentas.filter(v => {
    // Solo empleados con participa === 'si'
    if (!participantesSet.has(v.vendedor)) return false;
    const f = v.fechaTour;
    if (!f) return false;
    if (f.toDate) {
      const fd = f.toDate();
      return fd.getFullYear() === actualYear && fd.getMonth() + 1 === actualMes;
    }
    if (typeof f === 'string') {
      const [a, m] = f.split('-').map(Number);
      return a === actualYear && m === actualMes;
    }
    return false;
  });

  // 2. Filtrar por vendedor
  if (filtroVendedor) ventas = ventas.filter(v => v.vendedor === filtroVendedor);


  // 3. Búsqueda texto
  if (busquedaFiltro) {
    ventas = ventas.filter(v => {
      const c = (v.nombreCliente || '').toLowerCase();
      const h = (v.numeroHabitacion || '').toLowerCase();
      const t = (v.tipoTour || '').toLowerCase();
      return c.includes(busquedaFiltro) || h.includes(busquedaFiltro) || t.includes(busquedaFiltro);
    });
  }

  // 4. Solo hoy
  if (filtroHoy) {
    ventas = ventas.filter(v => {
      const f = v.fechaTour;
      if (!f) return false;
      if (typeof f === 'string') return f.split('T')[0] === hoyStr;
      if (f.toDate) {
        const fd = f.toDate();
        const fs = `${fd.getFullYear()}-${String(fd.getMonth() + 1).padStart(2, '0')}-${String(fd.getDate()).padStart(2, '0')}`;
        return fs === hoyStr;
      }
      return false;
    });
  }

  // Paginación
  const totalRegs = ventas.length;
  const totalPags = Math.ceil(totalRegs / limitePorPagina);
  if (pagActual > totalPags && totalPags > 0) pagActual = totalPags;
  const inicio     = (pagActual - 1) * limitePorPagina;
  const ventasPag  = ventas.slice(inicio, inicio + limitePorPagina);

  // Actualizar counter
  $('#smwHistTotal').text(`Registro${totalRegs !== 1 ? 's' : ''} = ${totalRegs}`);

  const currentUser = wiAuth.user;

  const filasHtml = ventasPag.map(v => {
    const esDuenio = v.vendedor === currentUser?.usuario;

    const btns = esDuenio
      ? `
        <button class="smw_hist_btn smw_hbtn_view"   onclick="verDetalleVenta('${v.id}')"   title="Ver Venta"><i class="fas fa-eye"></i></button>
        <button class="smw_hist_btn smw_hbtn_edit"   onclick="editarVentaAccion('${v.id}')" title="Editar"><i class="fas fa-edit"></i></button>
        <button class="smw_hist_btn smw_hbtn_delete" onclick="eliminarVentaAccion('${v.id}')" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
      `
      : `<button class="smw_hist_btn smw_hbtn_view" onclick="verDetalleVenta('${v.id}')" title="Ver Detalle"><i class="fas fa-eye"></i></button>`;

    const fecha  = _formatearFecha(v.fechaTour);
    const emp    = todosLosEmpleados.find(e => e.usuario === v.vendedor);
    const avatarImg = emp?.imagen || emp?.avatar
      ? (emp.imagen || emp.avatar)
      : `${import.meta.env.BASE_URL}smile.avif`;

    const est = _obtenerEstado(v.estadoPago);
    const quienVende = v.esVentaJulio ? 'Julio' : v.esVentaSonia ? 'Sonia' : v.esVentaExterna ? 'Externo' : Capi(v.vendedor);

    const clienteHtml = `
      <div class="smw_cliente_info">
        <span class="smw_cliente_name">${(v.nombreCliente || 'Sin nombre').toUpperCase()}</span>
        ${v.numeroHabitacion ? `<span class="smw_room_pill"><i class="fas fa-door-open"></i> ${v.numeroHabitacion}</span>` : ''}
      </div>
    `;

    return `
      <tr class="smw_row_anim">
        <td><span class="smw_date_span">${fecha}</span></td>
        <td>
          <div class="smw_vendedor_cell">
            <img src="${avatarImg}" class="smw_avatar_table" alt="avatar" onerror="this.src='${import.meta.env.BASE_URL}smile.avif'">
            <span class="smw_vendedor_name">${Capi(v.vendedor)}</span>
          </div>
        </td>
        <td><span class="smw_tour_pill">${v.tipoTour}</span></td>
        <td><span class="smw_pax_pill"><i class="fas fa-users"></i> ${v.cantidadPax || 1}</span></td>
        <td><div class="smw_cliente_cell">${clienteHtml}</div></td>
        <td><strong class="smw_price_span">S/ ${parseFloat(v.importeTotal || 0).toFixed(2)}</strong></td>
        <td><span class="smw_unit_price">S/ ${parseFloat(v.precioUnitario || v.precio || 0).toFixed(2)}</span></td>
        <td>
          <span class="smw_status_badge ${est.cls}">
            <span class="smw_status_dot"></span> ${est.txt}
          </span>
        </td>
        <td><span class="smw_profit_span">S/ ${parseFloat(v.ganancia || 0).toFixed(2)}</span></td>
        <td><span class="smw_reg_label"><i class="fas fa-user"></i> ${quienVende}</span></td>
        <td>
          <span class="smw_points_box">
            <i class="fas fa-star"></i> ${v.puntos || 0}
          </span>
        </td>
        <td><div class="smw_actions_cell">${btns}</div></td>
      </tr>
    `;
  }).join('');

  const tbody = $('#histSalesTableBody');
  if (filasHtml) {
    tbody.html(filasHtml);
  } else {
    tbody.html(`
      <tr>
        <td colspan="12" class="smw_empty_cell">
          <i class="fas fa-inbox"></i>
          <strong>No se encontraron registros de ventas</strong>
          <p>Prueba ajustando los filtros o seleccionando otro mes.</p>
        </td>
      </tr>
    `);
  }

  _renderizarPaginacion(totalPags);
}

// ── PAGINACIÓN ────────────────────────────────────────────────────────────────
function _renderizarPaginacion(total) {
  const container = $('#histPagination');
  if (total <= 1) { container.html(''); return; }

  let html = '<div class="smw_pagination">';

  // Botón anterior
  if (pagActual > 1) {
    html += `<button class="smw_page_btn" onclick="histCambiarPagina(${pagActual - 1})"><i class="fas fa-chevron-left"></i></button>`;
  }

  // Números de página – mostrar máximo 7 botones con elipsis
  const range = _paginationRange(pagActual, total);
  range.forEach(item => {
    if (item === '...') {
      html += `<span style="padding:0 0.5vh;color:var(--tx3);font-weight:700">…</span>`;
    } else {
      html += `<button class="smw_page_btn ${item === pagActual ? 'active' : ''}" onclick="histCambiarPagina(${item})">${item}</button>`;
    }
  });

  // Botón siguiente
  if (pagActual < total) {
    html += `<button class="smw_page_btn" onclick="histCambiarPagina(${pagActual + 1})"><i class="fas fa-chevron-right"></i></button>`;
  }

  html += '</div>';
  container.html(html);
}

function _paginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

// ── AUXILIARES ────────────────────────────────────────────────────────────────
function _formatearFecha(fecha) {
  if (!fecha) return 'Sin fecha';
  if (fecha.toDate) {
    const d = fecha.toDate();
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  }
  if (typeof fecha === 'string') {
    const parts = fecha.split('T')[0].split('-');
    if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
    return fecha;
  }
  if (fecha.seconds) {
    const d = new Date(fecha.seconds * 1000);
    return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
  }
  return 'Sin fecha';
}

function _obtenerEstado(estado) {
  const map = {
    'pagado':  { cls: 'paid',    txt: 'PAGADO' },
    'cobrado': { cls: 'paid',    txt: 'PAGADO' },
    'cobrar':  { cls: 'pending', txt: 'DEUDA'  },
  };
  return map[estado] || { cls: 'pending', txt: 'DEUDA' };
}

function selectMes() {
  const hoy = new Date(), anio = hoy.getFullYear(), mes = hoy.getMonth();
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return $.map(new Array(7), (_, i) => {
    const cada = i - 3, des = mes + cada;
    const cyear = anio + Math.floor(des / 12);
    const mesv  = ((des % 12) + 12) % 12;
    const tval  = `${cyear}-${String(mesv + 1).padStart(2, '0')}`;
    return `<option value="${tval}"${cada === 0 ? ' selected' : ''}>${meses[mesv]} ${cyear}</option>`;
  }).join('');
}

function _generarSkeletonsTabla(cant = 9) {
  return Array(cant).fill(0).map(() => `
    <tr class="smw_sk_row">
      <td><span class="smw_sk_el" style="width:65px;height:14px"></span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center">
          <span class="smw_sk_el smw_sk_circle" style="width:28px;height:28px"></span>
          <span class="smw_sk_el" style="width:65px;height:14px"></span>
        </div>
      </td>
      <td><span class="smw_sk_el" style="width:100px;height:24px;border-radius:6px"></span></td>
      <td><span class="smw_sk_el" style="width:40px;height:22px;border-radius:50px"></span></td>
      <td><span class="smw_sk_el" style="width:85px;height:14px"></span></td>
      <td><span class="smw_sk_el" style="width:60px;height:16px"></span></td>
      <td><span class="smw_sk_el" style="width:55px;height:14px"></span></td>
      <td><span class="smw_sk_el" style="width:72px;height:22px;border-radius:50px"></span></td>
      <td><span class="smw_sk_el" style="width:55px;height:14px"></span></td>
      <td><span class="smw_sk_el" style="width:60px;height:14px"></span></td>
      <td><span class="smw_sk_el" style="width:52px;height:22px;border-radius:50px"></span></td>
      <td>
        <div style="display:flex;gap:6px;justify-content:center">
          <span class="smw_sk_el smw_sk_circle" style="width:26px;height:26px"></span>
        </div>
      </td>
    </tr>
  `).join('');
}
