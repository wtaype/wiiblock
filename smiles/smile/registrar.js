/* ==========================================================================
   REGISTRAR.JS - Módulo SPA Premium de Registro/Edición con Doble Columna & Ranking
   ========================================================================== */

import $ from 'jquery';
import './registrar.css';
import { db } from '../firebase.js';
import { doc, setDoc, serverTimestamp, collection, getDocs, query, where } from 'firebase/firestore';
import { wiAuth, Notificacion, wiSpin, getls, savels, removels } from '../widev.js';
import { rutas } from '../rutas.js';
import { 
  getMesActual, 
  cargarTours, 
  obtenerRankingMes, 
  invalidateRankingCaches 
} from './zsmile.js';

// --- VARIABLES GLOBALES DEL MÓDULO ---
let htours = [];      // Lista de tours activos cargados
let selTour = null;   // Tour seleccionado actualmente
let activeVentaEspecial = null; // Guarda la venta en edición/vista para re-vincular al cargar tours
let isFormResetting = false;    // Bloqueador de auto-guardado durante resets

// --- RENDERIZADO DEL HTML (Diseño de Doble Columna: 70% Formulario, 30% Sidebar Dividido) ---
export const render = () => `
  <div class="smw_reg_container">
    <div class="smw_reg_card" id="smwRegCard">
      
      <!-- COLUMNA IZQUIERDA: FORMULARIO DE REGISTRO (70%) -->
      <div class="smw_reg_col_left">
        <h1 class="smw_reg_title" id="smwRegCardTitle">
          <i class="fas fa-cart-plus"></i> Registrar Nueva Venta
        </h1>

        <form id="formularioVenta" class="smw_form">
          <div class="smw_form_grid">
            
            <!-- Fila 1: Tipo de Tour (3 cols) + Registro En (1 col) -->
            <div class="smw_form_field w_3">
              <label><i class="fas fa-route"></i> Tipo de Tour *</label>
              <div class="smw_tour_selector" id="tourSelector">
                <div class="smw_tour_display" id="tourDisplay" tabindex="0">
                  <span class="smw_tour_text">
                    <i class="fas fa-search-location" style="color:var(--mco)"></i> 
                    <span id="tourSelectedLabel">Seleccionar tour...</span>
                  </span>
                  <i class="fas fa-chevron-down smw_arrow"></i>
                </div>
                <div class="smw_tour_dropdown" id="tourDropdown">
                  <div class="smw_tour_search">
                    <i class="fas fa-search"></i>
                    <input type="text" id="smwTourSearch" placeholder="Buscar tour por nombre o precio..." autocomplete="off">
                  </div>
                  <div class="smw_tour_table_container">
                    <table class="smw_tour_table">
                      <tbody id="tourTableBody">
                        ${_generarSkeletonsSelectorTours(4)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <input type="hidden" id="tipoTour" required>
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-hotel"></i> Registro en:</label>
              <select id="registroEn" class="smw_select">
                <option value="hawka">Hawka</option>
                <option value="hclaudia">HClaudia</option>
              </select>
            </div>

            <!-- Fila 2: Cliente (2 cols) + N° Habitación (1 col) + Hora (1 col) -->
            <div class="smw_form_field w_2">
              <label><i class="fas fa-user"></i> Nombre del Cliente *</label>
              <input type="text" id="nombreCliente" class="smw_input" required placeholder="Nombre de cliente / calle / grupo">
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-bed"></i> Habitación</label>
              <input type="text" id="numeroHabitacion" class="smw_input" placeholder="Ej: 205">
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-clock"></i> Hora de salida *</label>
              <input type="text" id="horaSalida" class="smw_input" placeholder="Ej: 5PM" required>
            </div>

            <!-- Fila 3: Tipo Doc (1 col) + N° Doc (1 col) + Método Pago (1 col) + PAX (1 col) -->
            <div class="smw_form_field w_1">
              <label><i class="fas fa-id-card"></i> Documento</label>
              <select id="tipoDocumento" class="smw_select">
                <option value="dni">DNI</option>
                <option value="pasaporte">Pasaporte</option>
                <option value="cedula">Cédula</option>
                <option value="ce">CE</option>
              </select>
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-hashtag"></i> N° Documento</label>
              <input type="text" id="numeroDocumento" class="smw_input" placeholder="Ej: 78964523">
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-credit-card"></i> Pago *</label>
              <select id="metodoPago" class="smw_select" required>
                <option value="">Seleccionar...</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Yape">Yape</option>
                <option value="Plin">Plin</option>
              </select>
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-users"></i> PAX *</label>
              <input type="number" id="cantidadPax" class="smw_input" required min="1" value="1">
            </div>

            <!-- Fila 4: Imp. Indiv. (1 col) + Total (1 col) + Operador (1 col) + Pago Oper. (1 col) -->
            <div class="smw_form_field w_1">
              <label><i class="fas fa-dollar-sign"></i> Individual (S/)</label>
              <input type="number" id="precioUnitario" class="smw_input" step="0.01" placeholder="0.00">
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-calculator"></i> Total (S/)</label>
              <input type="number" id="importeTotal" class="smw_input" step="0.01" placeholder="0.00" disabled>
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-user-shield"></i> Operador *</label>
              <input type="text" id="Operador" class="smw_input" placeholder="Ejm: Pili..." required>
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-hand-holding-usd"></i> Pago Oper. *</label>
              <input type="number" id="PagoOperador" class="smw_input" step="0.01" placeholder="0.00" required>
            </div>

            <!-- Fila 5: Estado Pago (1 col) + Ganancia (1 col) + Fecha (1 col) + Comentarios (1 col) -->
            <div class="smw_form_field w_1">
              <label><i class="fas fa-money-check-alt"></i> Estado Pago *</label>
              <select id="estadoPago" class="smw_select" required>
                <option value="pagado">Pagado (Nosotros)</option>
                <option value="cobrar">Yo pasé (->)</option>
                <option value="pagado2">Nos pasaron (<-)</option>
                <option value="cobrado">Arreglado (<->)</option>
              </select>
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-handshake"></i> Ganancia (S/)</label>
              <input type="number" id="ganancia" class="smw_input" step="0.01" placeholder="0.00" disabled>
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fas fa-calendar-day"></i> Fecha *</label>
              <input type="date" id="fechaTour" class="smw_input" required value="${new Date().toISOString().split('T')[0]}">
            </div>

            <div class="smw_form_field w_1">
              <label><i class="fa-solid fa-comment-dots"></i> Notas (Opcional)</label>
              <input type="text" id="Comentario" class="smw_input" placeholder="Anotaciones extra...">
            </div>

            <!-- Fila 6: Opciones de Puntos / Excepciones (4 cols - Ancho Completo) -->
            <div class="smw_options_section">
              <h3 class="smw_options_title"><i class="fas fa-star-half-alt"></i> Opciones de Puntos / Excepciones</h3>
              <div class="smw_check_grid">
                
                <label class="smw_check_label active" id="lblMiVenta">
                  <input type="checkbox" id="vtMiVenta" checked>
                  <i class="fas fa-check-circle smw_check_icon"></i>
                  <span>Mi venta</span>
                </label>

                <label class="smw_check_label" id="lblJulio">
                  <input type="checkbox" id="vtJulio">
                  <i class="far fa-circle smw_check_icon"></i>
                  <span>Venta de Julio</span>
                </label>

                <label class="smw_check_label" id="lblSonia">
                  <input type="checkbox" id="vtSonia">
                  <i class="far fa-circle smw_check_icon"></i>
                  <span>Venta de Sonia</span>
                </label>

                <label class="smw_check_label" id="lblExterna">
                  <input type="checkbox" id="vtExterna">
                  <i class="far fa-circle smw_check_icon"></i>
                  <span>Venta Externa</span>
                </label>

              </div>
            </div>

          </div>

          <!-- Acciones del Formulario (Guardar Venta junto a Puntos) -->
          <div class="smw_form_actions">
            <div class="smw_actions_right" id="smwActionsRight">
              <div class="smw_points_preview">
                <span>Puntos a ganar: <strong id="vistaPreviaLaPuntos">0</strong></span>
                <i class="fas fa-star"></i>
              </div>

              <button type="submit" class="smw_btn smw_btn_save" id="btnSaveVenta">
                <i class="fas fa-save"></i> Guardar Venta
              </button>
            </div>
          </div>

        </form>
      </div>

      <!-- COLUMNA DERECHA: SIDEBAR (30%) (Ranking en Vivo + Mis Ventas de Hoy) -->
      <div class="smw_reg_col_right">
        
        <!-- Panel Superior: Ranking en Vivo (Top 3-4 Guías) -->
        <div class="smw_sidebar_section" style="flex: 0 0 42%; display: flex; flex-direction: column; overflow: hidden;">
          <div class="smw_sidebar_header">
            <h2><i class="fas fa-trophy" style="color:#FFDA34"></i> Ranking en Vivo</h2>
            <span class="smw_month_badge" id="lblMesActual">...</span>
          </div>
          
          <div class="smw_mini_ranking_list" id="miniRankingList">
            ${_generarSkeletonsMiniRanking(3)}
          </div>
        </div>

        <div style="border-top: 1px dashed var(--brd); margin: 1.5vh 0; flex-shrink: 0;"></div>

        <!-- Panel Inferior: Mis Ventas de Hoy & Objetivos en Tiempo Real -->
        <div class="smw_sidebar_section" style="flex: 1 1 58%; display: flex; flex-direction: column; overflow: hidden;">
          <div class="smw_sidebar_header">
            <h2><i class="fas fa-bullseye" style="color:var(--mco)"></i> Mis Ventas de Hoy</h2>
            <span class="smw_user_points_badge" id="lblMisPuntosMes">0 pts</span>
          </div>

          <div class="smw_my_today_sales_list" id="myTodaySalesList">
            <div class="smw_mini_empty">
              <i class="fas fa-circle-notch fa-spin"></i>
              <span>Cargando mis ventas...</span>
            </div>
          </div>
        </div>

        <div class="smw_sidebar_links">
          <a href="/historial" class="smw_sidebar_btn nv_item" data-page="historial">
            <i class="fas fa-clipboard-list"></i> Ver Historial de Ventas
          </a>
        </div>
      </div>

    </div>
  </div>
`;

// --- INICIALIZACIÓN DE LA SPA ---
export const init = async () => {
  // Validación de sesión usando el helper centralizado wiAuth de widev.js
  const user = wiAuth.user;
  if (!user) return setTimeout(() => rutas.navigate('/login'), 100);

  // Activar estado de carga animado premium
  const $card = $('#smwRegCard');
  $card.addClass('smw_loading');
  $('#tourDisplay').addClass('smw_loading_select');

  // 1. Mostrar nombre de mes en el badge del sidebar
  const mesesNombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const mesActual = getMesActual();
  const [ano, mesNum] = mesActual.split('-');
  $('#lblMesActual').text(`${mesesNombres[parseInt(mesNum) - 1]} ${ano}`);

  // 2. Cargar tours desde caché de manera ultra rápida y no bloqueante
  const cachedTours = getls('toursSmile');
  if (cachedTours?.length > 0) {
    htours = cachedTours.map(t => ({
      nt: t.num || Math.random(),
      tour: t.tour,
      price: parseFloat(t.precio) || 0,
      pts: parseInt(t.puntos) || 0,
      com: parseFloat(t.comision) || 5
    }));
    renderTourTable(htours);
  }

  // De todos modos, cargar tours en segundo plano sin congelar la UI
  cargarTours().then(tours => {
    htours = tours;
    renderTourTable(htours);
    
    // Re-vincular de forma segura si ya se cargó la edición o borrador en el intermedio
    _verificarModoEspecial(user, true);
    _cargarDraftFormulario(true);
    actualizarValidacionCampos();
  }).catch(e => console.error('Error al cargar tours:', e))
    .finally(() => {
      // Desactivar estado de carga suavemente
      $card.removeClass('smw_loading');
      $('#tourDisplay').removeClass('smw_loading_select');
    });

  // 3. Pintar ranking en vivo lateral (no bloqueante)
  pintarMiniRanking().catch(e => console.error(e));

  // 4. Pintar mis ventas de hoy y mis puntos mensuales (no bloqueante)
  pintarMisDatosSidebar(user.usuario).catch(e => console.error(e));

  // 5. Registrar todos los eventos
  _registrarEventos();

  // 6. Verificar modo edición o vista desde el historial
  _verificarModoEspecial(user);

  // 6b. Cargar borrador (draft) temporal si existe (solo en modo registro limpio)
  _cargarDraftFormulario();

  // 7. Validar visualmente campos con valores por defecto
  actualizarValidacionCampos();

  // Re-validar en cascada con varios retardos para detectar autofill asíncrono del navegador
  for (let delay of [100, 300, 600, 1000, 1800, 3000]) {
    setTimeout(actualizarValidacionCampos, delay);
  }
};

// --- ELIMINACIÓN DE EVENTOS DE MEMORIA AL DESMONTAR ---
export const cleanup = () => {
  $(document).off('.registrar');
  selTour = null;
  htours = [];
  activeVentaEspecial = null;
  isFormResetting = false;
};

// --- RENDERIZAR TABLA INTERNA DEL SELECTOR ---
function renderTourTable(tours) {
  if (!tours.length) {
    $('#tourTableBody').html('<tr><td colspan="4" style="text-align:center;color:var(--tx3);padding:2vh;">Sin resultados para la búsqueda</td></tr>');
    return;
  }

  const html = tours.map((t, idx) => `
    <tr class="tour-row" data-index="${htours.indexOf(t)}">
      <td class="smw_tour_num">${idx + 1}</td>
      <td>${t.tour}</td>
      <td class="smw_tour_price">S/ ${t.price.toFixed(2)}</td>
      <td class="smw_tour_pts">${t.pts} pts</td>
    </tr>
  `).join('');

  $('#tourTableBody').html(html);
}

// --- CALCULAR Y PINTAR EL WIDGET DE RANKING EN VIVO ---
async function pintarMiniRanking() {
  try {
    const mes = getMesActual();
    
    // Si no está en caché local, inyectar el skeleton para evitar saltos bruscos
    const cacheKey = `empleadosPuntos_${mes}`;
    const cached = getls(cacheKey);
    if (!cached) {
      $('#miniRankingList').html(_generarSkeletonsMiniRanking(3));
    }

    const ranking = await obtenerRankingMes(mes);

    if (!ranking || !ranking.length) {
      $('#miniRankingList').html(`
        <div class="smw_mini_empty">
          <i class="fas fa-star" style="color:var(--brd)"></i>
          <span>No hay ventas este mes.<br>¡Sé el primero en registrar!</span>
        </div>
      `);
      return;
    }

    // Tomamos los líderes del mes (Top 3 o 4) para el sidebar
    const html = ranking.slice(0, 4).map((emp, i) => {
      const pos = i + 1;
      const itemCls = pos <= 3 ? `pos_${pos}` : '';
      const badgeContent = pos === 1 ? '<i class="fas fa-crown"></i>' : pos;
      
      const iniciales = `${(emp.nombre || '?')[0]}${(emp.nombre?.split(' ')[1] || '')[0] || ''}`.toUpperCase();
      
      return `
        <div class="smw_mini_rank_item ${itemCls}" style="animation-delay: ${i * 0.08}s">
          <div class="smw_mini_rank_badge">${badgeContent}</div>
          <div class="smw_mini_rank_avatar">
            ${emp.imagen ? `<img src="${emp.imagen}" alt="${emp.nombre}">` : `<span>${iniciales}</span>`}
          </div>
          <div class="smw_mini_rank_info">
            <span class="smw_mini_rank_name">${emp.nombre}</span>
            <span class="smw_mini_rank_sales">${emp.totalVentas} tour${emp.totalVentas !== 1 ? 's' : ''}</span>
          </div>
          <div class="smw_mini_rank_pts">${emp.totalPuntos} <span>pts</span></div>
        </div>
      `;
    }).join('');

    $('#miniRankingList').html(html);
  } catch (error) {
    console.error('Error al pintar mini ranking:', error);
    $('#miniRankingList').html(`
      <div class="smw_mini_empty">
        <i class="fas fa-exclamation-triangle" style="color:var(--error)"></i>
        <span>Error al cargar el ranking</span>
      </div>
    `);
  }
}

// --- OBTENER MIS VENTAS DEL MES DESDE CACHÉ O FIRESTORE ---
async function obtenerMisVentasMes(vendedor, mes) {
  try {
    // Smart cache: Verificamos si existe en svVentas para cuidar consistencia de vendedor y mes
    const svCached = getls('svVentas');
    if (svCached && svCached.vendedor === vendedor && svCached.mes === mes) {
      console.log('⚡ [Smart Cache] Mis ventas recuperadas usando la clave svVentas.');
      return svCached.ventas;
    }

    const cacheKey = `ventasSmile_${vendedor}_${mes}`;
    const cached = getls(cacheKey);
    if (cached) {
      return cached;
    }

    const [yr, mm] = mes.split('-').map(Number);
    const snap = await getDocs(collection(db, 'registrosdb'));
    const misVentas = [];

    snap.docs.forEach(doc => {
      const v = doc.data();
      if (v.vendedor !== vendedor) return;

      const f = v.fechaTour;
      let a, m;
      if (typeof f === 'string') {
        [a, m] = f.split('-').map(Number);
      } else if (f?.toDate) {
        const fd = f.toDate();
        a = fd.getFullYear();
        m = fd.getMonth() + 1;
      } else {
        return;
      }

      if (a === yr && m === mm) {
        misVentas.push({
          idVenta: v.idVenta || doc.id,
          ...v
        });
      }
    });

    // Ordenar de más reciente a más vieja
    misVentas.sort((a, b) => {
      const timeA = a.fechaRegistro?.seconds ? a.fechaRegistro.seconds * 1000 : (a.fechaRegistro?.toDate ? a.fechaRegistro.toDate().getTime() : Date.now());
      const timeB = b.fechaRegistro?.seconds ? b.fechaRegistro.seconds * 1000 : (b.fechaRegistro?.toDate ? b.fechaRegistro.toDate().getTime() : Date.now());
      return timeB - timeA;
    });

    savels(cacheKey, misVentas, 10); // Cache tradicional por 10 segundos
    
    // Guardar de manera smart con la clave svVentas (cuidando consistencias)
    savels('svVentas', { vendedor, mes, ventas: misVentas }, 10); // Cache smart por 10 segundos
    
    return misVentas;
  } catch (error) {
    console.error('Error al obtener mis ventas del mes:', error);
    return [];
  }
}

// --- PINTAR SECCIÓN DE VENTAS DE HOY Y PUNTOS ACUMULADOS ---
async function pintarMisDatosSidebar(vendedor) {
  try {
    const mes = getMesActual();
    const ventas = await obtenerMisVentasMes(vendedor, mes);

    // 1. Calcular y pintar los puntos totales acumulados en el mes
    const totalPuntos = ventas.reduce((acc, v) => acc + (parseInt(v.puntos) || 0), 0);
    $('#lblMisPuntosMes').text(`${totalPuntos} pts`);

    // 2. Filtrar ventas correspondientes al día de hoy (fechaTour es YYYY-MM-DD)
    const hoy = new Date();
    const hoyStr = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;

    const ventasHoy = ventas.filter(v => {
      let f = v.fechaTour;
      if (f && f.toDate) {
        f = f.toDate().toISOString().split('T')[0];
      }
      return f === hoyStr;
    });

    if (!ventasHoy.length) {
      $('#myTodaySalesList').html(`
        <div class="smw_mini_empty">
          <i class="fas fa-calendar-day" style="color:var(--brd)"></i>
          <span>No has registrado ventas hoy.<br>Tus ventas del día aparecerán aquí.</span>
        </div>
      `);
      return;
    }

    // 3. Renderizar listado interactivo de ventas de hoy
    const html = ventasHoy.map((v, i) => {
      const pax = parseInt(v.cantidadPax) || 1;
      const pts = parseInt(v.puntos) || 0;

      return `
        <div class="smw_today_sale_card" style="animation-delay: ${i * 0.06}s">
          <div class="smw_today_sale_icon">
            <i class="fas fa-route"></i>
          </div>
          <div class="smw_today_sale_info">
            <span class="smw_today_sale_client">${v.nombreCliente}</span>
            <span class="smw_today_sale_tour">${v.tipoTour}</span>
            <div class="smw_today_sale_meta">
              <span class="smw_today_sale_pax"><i class="fas fa-users"></i> ${pax} pax</span>
              <span class="smw_today_sale_pts"><i class="fas fa-star"></i> ${pts} pts</span>
            </div>
          </div>
          <div class="smw_today_sale_edit_btn btn-edit-today-sale" data-id="${v.idVenta}" title="Editar en tiempo real">
            <i class="fas fa-edit"></i>
          </div>
        </div>
      `;
    }).join('');

    $('#myTodaySalesList').html(html);
  } catch (error) {
    console.error('Error al pintar mis datos en el sidebar:', error);
    $('#myTodaySalesList').html(`
      <div class="smw_mini_empty">
        <i class="fas fa-exclamation-triangle" style="color:var(--error)"></i>
        <span>Error al cargar tus datos</span>
      </div>
    `);
  }
}

// --- ACTUALIZAR CLASES Y ICONOS DE LOS CHECKBOXES PERSONALIZADOS ---
function actualizarIconosCheck() {
  const mapping = {
    'vtMiVenta': '#lblMiVenta',
    'vtJulio': '#lblJulio',
    'vtSonia': '#lblSonia',
    'vtExterna': '#lblExterna'
  };

  Object.entries(mapping).forEach(([cbId, lblId]) => {
    const isChecked = $(`#${cbId}`).prop('checked');
    const $label = $(lblId);
    $label.toggleClass('active', isChecked);

    const $icon = $label.find('.smw_check_icon');
    if (isChecked) {
      $icon.removeClass('fa-circle far').addClass('fa-check-circle fas');
    } else {
      $icon.removeClass('fa-check-circle fas').addClass('fa-circle far');
    }
  });
}

// --- EVENTOS JQUERY DE LA PÁGINA ---
function _registrarEventos() {
  $(document)
    // Validación visual de todos los campos al interactuar o escribir (detecta autofill)
    .on('input.registrar change.registrar focus.registrar blur.registrar keyup.registrar click.registrar', '#formularioVenta input, #formularioVenta select', function() {
      actualizarValidacionCampos();
      guardarDraftFormulario();
    })
    
    // Captura global al interactuar con el formulario para detectar autofill dinámico del navegador
    .on('mouseenter.registrar focusin.registrar click.registrar change.registrar', '#formularioVenta', function() {
      actualizarValidacionCampos();
    })

    // Abrir/Cerrar el desplegable de Tours
    .on('click.registrar', '#tourDisplay', function(e) {
      e.stopPropagation();
      const $drop = $('#tourDropdown');
      const active = $drop.hasClass('active');
      
      $('.smw_tour_dropdown').removeClass('active');
      $('.smw_tour_display').removeClass('active');

      if (!active) {
        $drop.addClass('active');
        $(this).addClass('active');
        setTimeout(() => $('#smwTourSearch').focus(), 100);
      }
    })

    // Cerrar dropdown al hacer click fuera
    .on('click.registrar', function(e) {
      if (!$(e.target).closest('.smw_tour_selector').length) {
        $('#tourDropdown, #tourDisplay').removeClass('active');
      }
    })

    // Búsqueda interactiva de tours
    .on('input.registrar', '#smwTourSearch', function() {
      const q = $(this).val().toLowerCase();
      if (!q) {
        renderTourTable(htours);
      } else {
        const filtrados = htours.filter(t => 
          t.tour.toLowerCase().includes(q) || 
          t.price.toString().includes(q)
        );
        renderTourTable(filtrados);
      }
    })

    // Selección de Tour de la tabla
    .on('click.registrar', '.tour-row', function(e) {
      e.stopPropagation();
      const idx = $(this).data('index');
      selTour = htours[idx];
      if (!selTour) return;

      $('#tourSelectedLabel').text(selTour.tour);
      $('#tipoTour').val(selTour.tour);
      $('#tourDisplay').removeClass('faltaValor').addClass('okValor');
      $('#precioUnitario').val(selTour.price).removeClass('faltaValor').addClass('okValor');
      $('#tourDropdown, #tourDisplay').removeClass('active');
      
      $('.tour-row').removeClass('selected');
      $(this).addClass('selected');

      aplicarZoom('#precioUnitario');
      
      calcularTotal();
      calcularComision();
      actualizarPuntosPreview();
      actualizarValidacionCampos();
      guardarDraftFormulario();
    })

    // Cambios en PAX y Precio Unitario
    .on('input.registrar', '#cantidadPax, #precioUnitario', () => {
      calcularTotal();
      calcularComision();
      actualizarPuntosPreview();
    })

    // Cambios en Estado de Pago e Importes
    .on('change.registrar', '#estadoPago', calcularComision)
    .on('input.registrar', '#importeTotal, #PagoOperador', calcularComision)

    // Lógica de exclusión mutua para checkboxes interactivos
    .on('change.registrar', '#vtMiVenta, #vtJulio, #vtSonia, #vtExterna', function() {
      const currentId = $(this).attr('id');
      const isChecked = $(this).prop('checked');
      const ids = ['vtMiVenta', 'vtJulio', 'vtSonia', 'vtExterna'];

      if (isChecked) {
        // Desmarcar todos los demás al seleccionar uno
        ids.forEach(id => {
          if (id !== currentId) {
            $(`#${id}`).prop('checked', false);
          }
        });
      } else {
        // Si intenta desmarcar el único activo, se fuerza "Mi venta"
        const anyChecked = ids.some(id => $(`#${id}`).prop('checked'));
        if (!anyChecked) {
          $('#vtMiVenta').prop('checked', true);
        }
      }

      actualizarIconosCheck();
      actualizarPuntosPreview();
      guardarDraftFormulario();
    })

    // Atajo interactivo de edición rápida en tiempo real
    .on('click.registrar', '.btn-edit-today-sale', async function(e) {
      e.preventDefault();
      e.stopPropagation();

      const id = $(this).data('id');
      const user = wiAuth.user;
      if (!user) return;

      const mes = getMesActual();
      const ventas = await obtenerMisVentasMes(user.usuario, mes);
      const venta = ventas.find(v => v.idVenta === id);

      if (venta) {
        window.editarVenta = { venta, soloVista: false };
        _verificarModoEspecial(user);

        // Scroll suave al formulario en dispositivos pequeños
        $('html, body').animate({
          scrollTop: $('#formularioVenta').offset().top - 20
        }, 500);

        Notificacion('Venta cargada para modificación en tiempo real', 'info');
      } else {
        Notificacion('No se encontró la venta seleccionada', 'error');
      }
    })

    // GUARDAR O ACTUALIZAR LA VENTA
    .on('submit.registrar', '#formularioVenta', async function(e) {
      e.preventDefault();
      
      const $btn = $('#btnSaveVenta');
      if ($btn.prop('disabled')) return;

      // Validar selector de tours
      if (!selTour) {
        Notificacion('Selecciona un tour del catálogo', 'error');
        $('#tourDisplay').addClass('faltaValor').focus();
        return;
      }

      // Validaciones obligatorias de campos mínimos
      const req = [
        ['#nombreCliente', 'Cliente'],
        ['#horaSalida', 'Hora'],
        ['#fechaTour', 'Fecha'],
        ['#Operador', 'Operador'],
        ['#metodoPago', 'Pago']
      ];
      const vacios = req.filter(([sel]) => !$(sel).val()?.trim());
      if (vacios.length) {
        vacios.forEach(([sel]) => $(sel).addClass('faltaValor'));
        Notificacion(`Completa los campos obligatorios: ${vacios.map(([,n]) => n).join(', ')}`, 'error');
        return;
      }

      const user = wiAuth.user;
      const vendedor = user.usuario || user.nombre || 'Desconocido';
      const email = user.email || '';

      const pax = parseInt($('#cantidadPax').val()) || 1;
      const esEsp = $('#vtJulio, #vtSonia, #vtExterna').is(':checked');
      const ventaId = $btn.attr('data-edit-id') || `venta_${Date.now()}`;

      const venta = {
        idVenta: ventaId,
        tipoTour: selTour.tour,
        registroEn: $('#registroEn').val(),
        nombreCliente: $('#nombreCliente').val().trim(),
        numeroHabitacion: $('#numeroHabitacion').val().trim(),
        tipoDocumento: $('#tipoDocumento').val(),
        numeroDocumento: $('#numeroDocumento').val().trim(),
        cantidadPax: pax,
        precioUnitario: parseFloat($('#precioUnitario').val()) || 0,
        metodoPago: $('#metodoPago').val(),
        importeTotal: parseFloat($('#importeTotal').val()) || 0,
        ganancia: parseFloat($('#ganancia').val()) || 0,
        horaSalida: $('#horaSalida').val().trim(),
        Operador: $('#Operador').val().trim(),
        PagoOperador: parseFloat($('#PagoOperador').val()) || 0,
        Comentario: $('#Comentario').val().trim(),
        fechaTour: $('#fechaTour').val(),
        estadoPago: $('#estadoPago').val(),
        vendedor: vendedor,
        puntos: esEsp ? 0 : (selTour.pts * pax),
        email: email,
        qventa: 1,
        fechaRegistro: serverTimestamp(),
        esVentaJulio: !!$('#vtJulio').prop('checked'),
        esVentaSonia: !!$('#vtSonia').prop('checked'),
        esVentaExterna: !!$('#vtExterna').prop('checked')
      };

      wiSpin($btn, true, $btn.attr('data-edit-id') ? 'Actualizando...' : 'Guardando...');

      try {
        await setDoc(doc(db, 'registrosdb', ventaId), venta);

        // Limpiar cachés del mes de forma inteligente usando zsmile.js y removels
        const mes = getMesActual();
        invalidateRankingCaches(vendedor, mes);
        removels('svVentas');

        Notificacion(
          $btn.attr('data-edit-id') ? '¡Venta actualizada con éxito! 🏆' : '¡Venta registrada con éxito! 🚀',
          'success'
        );

        // Limpiar formulario
        limpiarFormulario();

        // Repintar mini ranking lateral de inmediato para feedback instantáneo
        await pintarMiniRanking();

        // Repintar panel de hoy lateral
        await pintarMisDatosSidebar(vendedor);

        // Redirección guiada al historial para corroborar
        setTimeout(() => {
          rutas.navigate('/historial');
        }, 1200);

      } catch (err) {
        console.error('Error al guardar venta:', err);
        Notificacion('Error al intentar guardar la venta.', 'error');
      } finally {
        wiSpin($btn, false);
      }
    });
}

// --- CÁLCULOS EN TIEMPO REAL ---
function calcularTotal() {
  const pax = parseInt($('#cantidadPax').val()) || 1;
  const precio = parseFloat($('#precioUnitario').val()) || 0;
  const total = precio * pax;
  $('#importeTotal').val(total.toFixed(2));
  aplicarZoom('#importeTotal');
}

function calcularComision() {
  const estado = $('#estadoPago').val();
  const total = parseFloat($('#importeTotal').val()) || 0;
  const pago = parseFloat($('#PagoOperador').val()) || 0;
  const esPagado = estado === 'pagado' || estado === 'pagado2';

  const $pagoOp = $('#PagoOperador');
  if (esPagado) {
    $pagoOp.prop('disabled', true).val('0').attr('placeholder', 'Servicio propio');
    $('#ganancia').val(total.toFixed(2));
  } else {
    $pagoOp.prop('disabled', false).attr('placeholder', 'S/ 0.00');
    const ganancia = total - pago;
    $('#ganancia').val(ganancia.toFixed(2));
  }
  
  aplicarZoom('#ganancia');
}

function actualizarPuntosPreview() {
  const pax = parseInt($('#cantidadPax').val()) || 1;
  const ptsBase = selTour?.pts || 0;
  const esEsp = $('#vtJulio, #vtSonia, #vtExterna').is(':checked');
  const totalPuntos = esEsp ? 0 : (ptsBase * pax);
  
  $('#vistaPreviaLaPuntos').text(totalPuntos);
  aplicarZoom('#vistaPreviaLaPuntos');
}

function aplicarZoom(sel) {
  $(sel).addClass('field-updated');
  setTimeout(() => $(sel).removeClass('field-updated'), 600);
}

// --- VALIDACIÓN DINÁMICA DE CAMPOS CON VALOR ---
function actualizarValidacionCampos() {
  $('#formularioVenta input, #formularioVenta select').each(function() {
    const $el = $(this);
    if ($el.attr('type') === 'hidden' || $el.attr('type') === 'checkbox' || $el.attr('type') === 'submit') return;
    
    const val = $el.val()?.toString().trim();
    const req = $el.prop('required');
    
    if (req) {
      $el.toggleClass('okValor', !!val).toggleClass('faltaValor', !val);
    } else {
      $el.toggleClass('okValor', !!val);
    }
  });

  // Especial para tourDisplay
  const tourVal = $('#tipoTour').val();
  if (tourVal) {
    $('#tourDisplay').removeClass('faltaValor').addClass('okValor');
  } else {
    $('#tourDisplay').removeClass('okValor faltaValor');
  }
}

// --- LIMPIAR ESTADO FORMULARIO ---
function limpiarFormulario() {
  isFormResetting = true;
  selTour = null;
  activeVentaEspecial = null;
  const $form = $('#formularioVenta');
  if (!$form.length) {
    isFormResetting = false;
    return;
  }

  $form[0].reset();
  removels('registroVentaDraft');
  $('#formularioVenta input, #formularioVenta select, #tourDisplay').prop('disabled', false).removeClass('okValor faltaValor');
  $('#smwRegCard').removeClass('view-only edit-mode');
  
  $('#vtMiVenta').prop('checked', true);
  $('#vtJulio, #vtSonia, #vtExterna').prop('checked', false);
  actualizarIconosCheck();
  
  $('#btnSaveVenta').prop('disabled', false).html('<i class="fas fa-save"></i> Guardar Venta').removeAttr('data-edit-id');
  $('.btn-custom-action').remove();

  // Valores default
  $('#cantidadPax').val(1);
  $('#fechaTour').val(new Date().toISOString().split('T')[0]);
  $('#vistaPreviaLaPuntos').text('0');
  $('#tourSelectedLabel').text('Seleccionar tour...');
  $('.tour-row').removeClass('selected');
  $('#importeTotal, #ganancia').prop('disabled', true);
  
  $('#smwRegCardTitle').html('<i class="fas fa-cart-plus"></i> Registrar Nueva Venta');
  
  actualizarValidacionCampos();
  isFormResetting = false;
}

// --- CONFIGURAR MODO EDICIÓN O VISTA ---
function _verificarModoEspecial(user, onlyBindTour = false) {
  let datosEdicion = activeVentaEspecial;
  
  if (!datosEdicion) {
    datosEdicion = window.editarVenta || getls('editarVentaTemp');
    if (datosEdicion) {
      activeVentaEspecial = datosEdicion;
      window.editarVenta = null;
      removels('editarVentaTemp');
    }
  }

  if (!datosEdicion) return;

  const { venta, soloVista } = datosEdicion;
  if (!venta) return;

  if (!onlyBindTour) {
    limpiarFormulario();
    activeVentaEspecial = datosEdicion; // Restaurar tras la limpieza
  }

  // Vincular tour
  selTour = htours.find(t => t.tour === venta.tipoTour);
  if (selTour) {
    $('#tourSelectedLabel').text(selTour.tour);
    $('#tipoTour').val(selTour.tour);
    $('#tourDisplay').removeClass('faltaValor').addClass('okValor');
    $(`.tour-row`).removeClass('selected');
    $(`.tour-row[data-index="${htours.indexOf(selTour)}"]`).addClass('selected');
  } else {
    $('#tourSelectedLabel').text(venta.tipoTour || 'Tour personalizado');
    $('#tipoTour').val(venta.tipoTour || '');
    $('#tourDisplay').removeClass('okValor faltaValor');
  }

  if (!onlyBindTour) {
    // Rellenar campos
    Object.entries(venta).forEach(([key, val]) => {
      const $el = $(`#${key}`);
      if ($el.length && key !== 'fechaTour' && key !== 'esVentaJulio' && key !== 'esVentaSonia' && key !== 'esVentaExterna') {
        $el.val(val || '');
      }
    });

    if (venta.fechaTour) {
      let f = '';
      if (venta.fechaTour?.toDate) f = venta.fechaTour.toDate().toISOString().split('T')[0];
      else if (typeof venta.fechaTour === 'string') f = venta.fechaTour.split('T')[0];
      $('#fechaTour').val(f);
    }

    // Cargar estados de checkboxes interactivos con exclusión mutua
    const esExcepcion = (venta.esVentaJulio || venta.esVentaSonia || venta.esVentaExterna);
    $('#vtMiVenta').prop('checked', !esExcepcion);
    $('#vtJulio').prop('checked', venta.esVentaJulio || false);
    $('#vtSonia').prop('checked', venta.esVentaSonia || false);
    $('#vtExterna').prop('checked', venta.esVentaExterna || false);
    actualizarIconosCheck();

    calcularTotal();
    calcularComision();
    actualizarPuntosPreview();

    if (soloVista) {
      $('#formularioVenta input, #formularioVenta select').prop('disabled', true);
      $('#tourDisplay').css('pointer-events', 'none');
      $('#smwRegCard').addClass('view-only');
      $('#smwRegCardTitle').html('<i class="fas fa-eye"></i> Detalle de Venta (Solo Vista)');
      
      $('#btnSaveVenta').prop('disabled', true).html('<i class="fas fa-lock"></i> Venta Protegida');

      if (!$('.btn-clear-view').length) {
        $('#smwActionsRight').append(`
          <button type="button" class="smw_btn smw_btn_cancel btn-custom-action btn-clear-view">
            <i class="fas fa-arrow-left"></i> Volver al Registro
          </button>
        `);
      }

      $(document).on('click.registrar', '.btn-clear-view', function() {
        limpiarFormulario();
        Notificacion('Formulario restaurado a modo registro.', 'info');
      });

    } else {
      $('#formularioVenta input, #formularioVenta select').prop('disabled', false);
      $('#importeTotal, #ganancia').prop('disabled', true);
      $('#tourDisplay').css('pointer-events', 'auto');
      $('#smwRegCard').addClass('edit-mode');
      $('#smwRegCardTitle').html('<i class="fas fa-edit"></i> Modificar Registro de Venta');

      $('#btnSaveVenta').prop('disabled', false).html('<i class="fas fa-save"></i> Guardar Cambios').attr('data-edit-id', venta.idVenta || venta.id);

      if (!$('.btn-cancel-edit').length) {
        $('#smwActionsRight').append(`
          <button type="button" class="smw_btn smw_btn_cancel btn-custom-action btn-cancel-edit">
            <i class="fas fa-times"></i> Cancelar Edición
          </button>
        `);
      }

      $(document).on('click.registrar', '.btn-cancel-edit', function() {
        limpiarFormulario();
        Notificacion('Edición cancelada.', 'info');
      });
    }

    actualizarValidacionCampos();
  } else {
    calcularTotal();
    calcularComision();
    actualizarPuntosPreview();
    actualizarValidacionCampos();
  }
}

// --- GENERADORES DE SKELETONS LOADERS COMPACTOS Y PREMIUM ---
function _generarSkeletonsSelectorTours(cant = 4) {
  return Array(cant).fill(0).map(() => `
    <tr style="pointer-events: none;">
      <td class="smw_tour_num"><div class="smw_sk_el" style="width: 16px; height: 16px; border-radius: 4px;"></div></td>
      <td><div class="smw_sk_el" style="width: 140px; height: 14px; border-radius: 4px;"></div></td>
      <td class="smw_tour_price"><div class="smw_sk_el" style="width: 50px; height: 14px; border-radius: 4px;"></div></td>
      <td class="smw_tour_pts"><div class="smw_sk_el" style="width: 40px; height: 14px; border-radius: 4px;"></div></td>
    </tr>
  `).join('');
}

function _generarSkeletonsMiniRanking(cant = 3) {
  return Array(cant).fill(0).map((_, index) => `
    <div class="smw_mini_rank_item smw_sk_mini_row" style="pointer-events: none; animation-delay: ${index * 0.05}s">
      <div class="smw_sk_el" style="width: 2.2vh; height: 2.2vh; border-radius: 50%; margin-right: 1.5vh;"></div>
      <div class="smw_mini_rank_avatar smw_sk_el smw_sk_circle" style="border-radius: 50%; width: 4.5vh; height: 4.5vh; background: none; margin-right: 1.5vh;"></div>
      <div class="smw_mini_rank_info" style="flex: 1;">
        <div class="smw_sk_el" style="width: 80px; height: 12px; margin-bottom: 0.6vh; border-radius: 4px;"></div>
        <div class="smw_sk_el" style="width: 50px; height: 9px; border-radius: 4px;"></div>
      </div>
      <div class="smw_sk_el" style="width: 40px; height: 14px; border-radius: 4px;"></div>
    </div>
  `).join('');
}

// --- BORRADOR (DRAFT) TEMPORAL DE CAMPOS ---
function guardarDraftFormulario() {
  if (isFormResetting) return;
  // Evitar guardar borrador si el formulario está en modo edición o visualización
  if ($('#smwRegCard').hasClass('edit-mode') || $('#smwRegCard').hasClass('view-only')) return;

  const cliente = $('#nombreCliente').val()?.trim() || '';
  const tour = $('#tipoTour').val() || '';

  // Si no hay cliente ni tour ingresado, no tiene sentido guardar basura en el borrador
  if (!cliente && !tour) {
    removels('registroVentaDraft');
    return;
  }

  const draft = {
    tipoTour: tour,
    registroEn: $('#registroEn').val() || 'hawka',
    nombreCliente: cliente,
    numeroHabitacion: $('#numeroHabitacion').val()?.trim() || '',
    horaSalida: $('#horaSalida').val()?.trim() || '',
    tipoDocumento: $('#tipoDocumento').val() || 'dni',
    numeroDocumento: $('#numeroDocumento').val()?.trim() || '',
    metodoPago: $('#metodoPago').val() || '',
    cantidadPax: $('#cantidadPax').val() || '1',
    precioUnitario: $('#precioUnitario').val() || '',
    Operador: $('#Operador').val()?.trim() || '',
    PagoOperador: $('#PagoOperador').val() || '',
    estadoPago: $('#estadoPago').val() || 'pagado',
    Comentario: $('#Comentario').val()?.trim() || '',
    fechaTour: $('#fechaTour').val() || '',
    esVentaJulio: $('#vtJulio').prop('checked') || false,
    esVentaSonia: $('#vtSonia').prop('checked') || false,
    esVentaExterna: $('#vtExterna').prop('checked') || false
  };

  savels('registroVentaDraft', draft, 24); // Borrador válido por 24 horas con expiración limpia
}

function _cargarDraftFormulario(onlyBindTour = false) {
  // Evitar cargar borrador si se ha disparado una edición/vista directa
  if ($('#smwRegCard').hasClass('edit-mode') || $('#smwRegCard').hasClass('view-only')) return;

  const draft = getls('registroVentaDraft');
  if (!draft) return;

  if (!onlyBindTour) {
    // Restaurar campos del formulario
    Object.entries(draft).forEach(([key, val]) => {
      const $el = $(`#${key}`);
      if ($el.length && key !== 'fechaTour' && key !== 'esVentaJulio' && key !== 'esVentaSonia' && key !== 'esVentaExterna') {
        $el.val(val || '');
      }
    });

    if (draft.fechaTour) {
      $('#fechaTour').val(draft.fechaTour);
    }

    // Cargar checkboxes mutuamente excluyentes
    const esExcepcion = (draft.esVentaJulio || draft.esVentaSonia || draft.esVentaExterna);
    $('#vtMiVenta').prop('checked', !esExcepcion);
    $('#vtJulio').prop('checked', draft.esVentaJulio || false);
    $('#vtSonia').prop('checked', draft.esVentaSonia || false);
    $('#vtExterna').prop('checked', draft.esVentaExterna || false);

    actualizarIconosCheck();
  }

  // Vincular el tour si existía
  if (draft.tipoTour) {
    selTour = htours.find(t => t.tour === draft.tipoTour);
    if (selTour) {
      $('#tourSelectedLabel').text(selTour.tour);
      $('#tipoTour').val(selTour.tour);
      $('#tourDisplay').removeClass('faltaValor').addClass('okValor');
      $(`.tour-row`).removeClass('selected');
      $(`.tour-row[data-index="${htours.indexOf(selTour)}"]`).addClass('selected');
    }
  }

  calcularTotal();
  calcularComision();
  actualizarPuntosPreview();
  actualizarValidacionCampos();
}
