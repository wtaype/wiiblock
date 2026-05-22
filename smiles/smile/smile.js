import './smile.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { wiAuth, Notificacion, getNombre, Saludar, getls, savels } from '../widev.js';
import { app } from '../wii.js';
import { rutas } from '../rutas.js';
import { getMesActual, obtenerRankingMes } from './zsmile.js';

let mesSeleccionado = getMesActual();

export const render = () => {
  const mesesOptions = selectMes();
  return `
    <div class="smw_dash">
      <header class="smw_hero wi_fadeUp">
        <div class="smw_hero_glow"></div>
        <div class="smw_hero_content">
          <div class="smw_hero_left">
            <div class="smw_avatar_wrap">
              <div class="smw_avatar" id="smwAvatar">?</div>
              <div class="smw_avatar_ring"></div>
            </div>
            <div class="smw_welcome">
              <h1 id="smwSaludo">Cargando...</h1>
              <p id="smwRole"><i class="fas fa-car-side"></i> Colaborador — Reto del Mes</p>
            </div>
          </div>
          <div class="smw_month_selector_container">
            <select id="smwMonthSelector" class="smw_select" style="min-width: 160px; backdrop-filter: blur(10px); background: var(--bg5);">
              ${mesesOptions}
            </select>
          </div>
        </div>
      </header>

      <section class="smw_kpi_band wi_fadeUp" id="smwKpis" style="animation-delay: 0.1s">
        <div class="smw_kpi_item">
          <span class="smw_kpi_val" id="kpiTours" style="color: var(--Cielo)"><span class="smw_sk_kpi"></span></span>
          <span class="smw_kpi_lbl">Tours este mes</span>
        </div>
        <div class="smw_kpi_sep"></div>
        <div class="smw_kpi_item">
          <span class="smw_kpi_val" id="kpiPuntos" style="color: var(--Oro)"><span class="smw_sk_kpi"></span></span>
          <span class="smw_kpi_lbl">Mis puntos</span>
        </div>
        <div class="smw_kpi_sep"></div>
        <div class="smw_kpi_item">
          <span class="smw_kpi_val" id="kpiPos" style="color: var(--Mora)"><span class="smw_sk_kpi"></span></span>
          <span class="smw_kpi_lbl">Posición</span>
        </div>
      </section>

      <nav class="smw_quick_nav wi_fadeUp" style="animation-delay: 0.2s">
        ${[
          { page: 'registrar', ico: 'fa-plus-circle',    col: '#FF5C69', tit: 'Registrar Venta', sub: 'Nueva venta de tour' },
          { page: 'ranking',   ico: 'fa-trophy',          col: '#FFDA34', tit: 'Ver Ranking',    sub: 'Puntos del mes' },
          { page: 'historial', ico: 'fa-clipboard-list', col: '#0EBEFF', tit: 'Historial',      sub: 'Mis ventas registradas' },
          { page: 'tours',     ico: 'fa-route',           col: '#29C72E', tit: 'Catálogo Tours', sub: 'Lista de tours and precios' },
          { page: 'avisar',    ico: 'fa-bell',            col: '#7000FF', tit: 'Anuncios',       sub: 'Noticias del equipo' },
        ].map((a, i) => `
          <a href="/${a.page}" class="smw_qcard nv_item" data-page="${a.page}" style="--qc:${a.col}; animation-delay: ${i * 0.05}s">
            <div class="smw_qcard_ico" style="--qc: ${a.col}"><i class="fas ${a.ico}"></i></div>
            <div class="smw_qcard_txt">
              <strong>${a.tit}</strong>
              <span>${a.sub}</span>
            </div>
            <i class="fas fa-arrow-right smw_qcard_arr"></i>
          </a>
        `).join('')}
      </nav>
    </div>
  `;
};

export const init = async () => {
  const user = wiAuth.user;
  if (!user) return setTimeout(() => rutas.navigate('/login'), 100);

  const nombre = getNombre(user.nombre || user.usuario || '');
  const iniciales = `${(user.nombre || '?')[0]}${(user.apellidos || '')[0] || ''}`.toUpperCase();

  // Set avatar and greetings
  $('#smwAvatar').text(iniciales);
  $('#smwSaludo').html(`${Saludar()} <strong>${nombre}</strong>`);
  
  if (user.descripcion) {
    $('#smwRole').html(`<i class="fas fa-user-tag"></i> ${user.descripcion}`);
  } else {
    $('#smwRole').html(`<i class="fas fa-car-side"></i> Colaborador — Reto del Mes`);
  }

  // Load KPIs for default month
  $('#smwMonthSelector').val(mesSeleccionado);
  _cargarKpis(user.usuario, mesSeleccionado);

  // Bind Month Change Event
  $(document).off('change.smile_dash').on('change.smile_dash', '#smwMonthSelector', function() {
    mesSeleccionado = $(this).val();
    _cargarKpis(user.usuario, mesSeleccionado);
  });

  $('.wi_fadeUp').addClass('visible wi_visible');
  console.log(`🏜️ ${app} Smile Dashboard cargado`);
  window.__WIREADY__ = true;
};

export const cleanup = () => {
  $(document).off('change.smile_dash');
};

async function _cargarKpis(vendedor, mes) {
  try {
    // Inyectar skeletons mientras carga
    $('#kpiTours').html('<span class="smw_sk_kpi"></span>');
    $('#kpiPuntos').html('<span class="smw_sk_kpi"></span>');
    $('#kpiPos').html('<span class="smw_sk_kpi"></span>');

    const cacheKey = `kpiSmile_${vendedor}_${mes}`;
    const cache = getls(cacheKey);

    if (cache) return _pintarKpis(cache);

    const [yr, mm] = mes.split('-').map(Number);
    
    // Obtener todos los registros de la BD
    const snap = await getDocs(collection(db, 'registrosdb'));

    let tours = 0, puntos = 0;
    snap.docs.forEach(d => {
      const v = d.data();
      if (v.vendedor !== vendedor) return;
      const f = v.fechaTour;
      let a, m;
      if (typeof f === 'string') { [a, m] = f.split('-').map(Number); }
      else if (f?.toDate) { const fd = f.toDate(); a = fd.getFullYear(); m = fd.getMonth() + 1; }
      else return;

      if (a === yr && m === mm) {
        tours += parseInt(v.qventa) || 1;
        puntos += parseInt(v.puntos) || 0;
      }
    });

    // Calcular posición en el ranking usando zsmile helper
    const ranking = await obtenerRankingMes(mes);
    const pos = ranking.findIndex(e => e.usuario === vendedor);
    const posicion = pos === -1 ? '—' : `#${pos + 1}`;

    const data = { tours, puntos, posicion };
    savels(cacheKey, data, 5); // 5 horas de cache local
    _pintarKpis(data);
  } catch (e) {
    console.warn('KPI error:', e);
    _pintarKpis({ tours: '?', puntos: '?', posicion: '?' });
  }
}

function _pintarKpis({ tours, puntos, posicion }) {
  $('#kpiTours').text(tours);
  $('#kpiPuntos').text(puntos);
  $('#kpiPos').text(posicion);
}

function selectMes() {
  const hoy = new Date(), anio = hoy.getFullYear(), mes = hoy.getMonth();
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return $.map(new Array(7), (_, i) => {
    const cada = i - 3, des = mes + cada, cyear = anio + Math.floor(des / 12), mesv = ((des % 12) + 12) % 12;
    const tval = `${cyear}-${String(mesv + 1).padStart(2, '0')}`;
    return `<option value="${tval}"${cada === 0 ? ' selected' : ''}>${meses[mesv]} ${cyear}</option>`;
  }).join('');
}
