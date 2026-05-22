import './avisar.css';
import $ from 'jquery';
import { auth, db } from '../firebase.js';
import { collection, setDoc, doc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Notificacion, getls, Saludar, Capi } from '../widev.js';
import { rutas } from '../rutas.js';

let activeCategory = 'bug';
let allIssues = [];

const getUsuarioActual = () => {
  const wi = getls('wiSmile') || {};
  return wi.nombre || wi.usuario || auth.currentUser?.displayName || auth.currentUser?.email || 'Anónimo';
};

export const render = () => {
  const display = getUsuarioActual();
  return `
    <div class="smw_avisar_view">
      
      <!-- CABECERA: Título y Controles -->
      <header class="smw_avisar_header wi_fadeUp">
        <div class="smw_avisar_title_row">
          <h1><i class="fas fa-bug smw_mora_glow"></i> Centro de Feedback & Issues</h1>
          <p class="smw_avisar_subtitle">Reporta incidencias, propone sugerencias y comparte con el equipo</p>
        </div>
        <div class="smw_avisar_controls">
          <button class="smw_sync_btn" id="btnSyncIssues" title="Sincronizar Incidencias">
            <i class="fas fa-sync-alt"></i> Sincronizar
          </button>
          <a href="/smile" class="smw_back_btn nv_item" data-page="smile">
            <i class="fas fa-arrow-left"></i> Panel de Control
          </a>
        </div>
      </header>

      <!-- CUERPO PRINCIPAL DE DOS COLUMNAS -->
      <div class="smw_avisar_grid wi_fadeUp" style="animation-delay: 0.1s">
        
        <!-- COLUMNA IZQUIERDA: FORMULARIO -->
        <div class="smw_feedback_form_card">
          <div class="smw_fcard_header">
            <h2><i class="fas fa-pen-to-square"></i> Crear Nuevo Reporte</h2>
            <p class="smw_fcard_desc">Identificado como: <strong>${display}</strong></p>
          </div>
          <form id="frmFeedback" class="smw_form_layout" onsubmit="return false;">
            
            <!-- Título -->
            <div class="smw_form_group">
              <label for="fbTitle">Título del Reporte</label>
              <input type="text" id="fbTitle" class="smw_input" placeholder="Ej. El selector de tours se demora en cargar..." required />
            </div>

            <!-- Categoria -->
            <div class="smw_form_group">
              <label>Categoría</label>
              <div class="smw_category_selector">
                <button type="button" class="smw_cat_tag_btn active" data-cat="bug" style="--c-accent: var(--Dulce)">
                  Bug 🐛
                </button>
                <button type="button" class="smw_cat_tag_btn" data-cat="sugerencia" style="--c-accent: var(--Oro)">
                  Sugerencia 💡
                </button>
                <button type="button" class="smw_cat_tag_btn" data-cat="felicitacion" style="--c-accent: var(--Paz)">
                  Felicitación ✨
                </button>
              </div>
            </div>

            <!-- Descripción -->
            <div class="smw_form_group">
              <label for="fbDesc">Descripción Detallada</label>
              <textarea id="fbDesc" class="smw_textarea" placeholder="Explica detalladamente la incidencia o tu sugerencia para que podamos entenderla fácilmente..." rows="5" required></textarea>
            </div>

            <button type="submit" class="smw_submit_fb_btn" id="btnSubmitFeedback">
              <i class="fas fa-paper-plane"></i> Enviar Incidencia
            </button>

          </form>
        </div>

        <!-- COLUMNA DERECHA: LISTADO DE ISSUES -->
        <div class="smw_issues_feed_card">
          <div class="smw_fcard_header">
            <h2><i class="fas fa-list-check"></i> Reportes del Equipo</h2>
            <span class="smw_badge_count" id="lblIssuesCount">0 reportes</span>
          </div>
          
          <div class="smw_issues_list" id="issuesList">
            ${_generarSkeletonsIssues(3)}
          </div>
        </div>

      </div>
    </div>
  `;
};

export const init = async () => {
  const user = auth.currentUser;
  if (!user && !getls('wiSmile')) return setTimeout(() => rutas.navigate('/login'), 100);

  // Activa animaciones de entrada
  $('.wi_fadeUp').addClass('visible wi_visible');

  // Inicializar carga de issues
  await _cargarIssues();

  // BINDING DE EVENTOS
  _bindEvents();

  console.log('🐛 SPA Feedback & Issues cargado exitosamente');
  window.__WIREADY__ = true;
};

export const cleanup = () => {
  $(document).off('.avisar_events');
  window.toggleExpandirIssue = null;
};

// --- BINDING EVENTS ---
function _bindEvents() {
  // Selector de categoría en el formulario
  $(document).off('click.avisar_events', '.smw_cat_tag_btn').on('click.avisar_events', '.smw_cat_tag_btn', function() {
    $('.smw_cat_tag_btn').removeClass('active');
    $(this).addClass('active');
    activeCategory = $(this).data('cat');
  });

  // Envío de Formulario
  $(document).off('submit.avisar_events', '#frmFeedback').on('submit.avisar_events', '#frmFeedback', async function(e) {
    e.preventDefault();
    const titulo = $('#fbTitle').val().trim();
    const descripcion = $('#fbDesc').val().trim();

    if (!titulo || !descripcion) {
      return Notificacion('Completa todos los campos obligatorios.', 'warning');
    }

    await _crearIssue(titulo, descripcion);
  });

  // Botón Sincronizar
  $(document).off('click.avisar_events', '#btnSyncIssues').on('click.avisar_events', '#btnSyncIssues', async function() {
    $(this).find('i').addClass('fa-spin');
    await _cargarIssues();
    $(this).find('i').removeClass('fa-spin');
    Notificacion('Feed sincronizado exitosamente', 'success');
  });

  // Expandir detalles de issue
  window.toggleExpandirIssue = (id) => {
    const $card = $(`.smw_issue_card[data-id="${id}"]`);
    $card.toggleClass('expanded');
  };
}

// --- CARGAR TODOS LOS ISSUES DESDE FIRESTORE ---
async function _cargarIssues() {
  const $header = $('.smw_avisar_header');
  $header.addClass('smw_loading');
  try {
    $('#issuesList').html(_generarSkeletonsIssues(3));

    const snap = await getDocs(query(collection(db, 'wiFeedbackIssues'), orderBy('fecha', 'desc')));
    allIssues = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    _renderizarIssues();
  } catch (error) {
    console.error('Error al cargar reportes:', error);
    $('#issuesList').html(`
      <div class="smw_empty_pane">
        <i class="fas fa-exclamation-triangle"></i>
        <span>Error al cargar reportes. Revisa tu conexión.</span>
      </div>
    `);
  } finally {
    $header.removeClass('smw_loading');
  }
}

// --- RENDERIZAR LA LISTA EN EL FEED ---
function _renderizarIssues() {
  $('#lblIssuesCount').text(`${allIssues.length} reportes`);
  
  if (!allIssues.length) {
    $('#issuesList').html(`
      <div class="smw_empty_pane">
        <i class="fas fa-folder-open"></i>
        <strong>No hay reportes de feedback</strong>
        <p>Sé el primero en reportar un bug o sugerir una mejora.</p>
      </div>
    `);
    return;
  }

  const html = allIssues.map(issue => {
    const autor = Capi(issue.autor || 'Colaborador');
    const fecha = _formatearFechaAvisar(issue.fecha);
    const badgeEst = _obtenerBadgeEstado(issue.estado);
    const badgeCat = _obtenerBadgeCategoria(issue.categoria);

    return `
      <div class="smw_issue_card smw_anim_fade" data-id="${issue.id}">
        <div class="smw_issue_summary" onclick="toggleExpandirIssue('${issue.id}')">
          <div class="smw_issue_title_row">
            <h3 class="smw_issue_title">${_escaparHtml(issue.titulo)}</h3>
            <div class="smw_issue_badges">
              <span class="smw_badge_status ${badgeEst.cls}">
                <i class="fas ${badgeEst.ico}"></i> ${badgeEst.txt}
              </span>
              <span class="smw_badge_cat ${badgeCat.cls}">
                ${badgeCat.txt}
              </span>
            </div>
          </div>
          
          <div class="smw_issue_meta">
            <span><i class="fas fa-user-circle"></i> por <strong>${autor}</strong></span>
            <span class="smw_meta_dot"></span>
            <span><i class="fas fa-clock"></i> ${fecha}</span>
            <i class="fas fa-chevron-down smw_issue_arrow"></i>
          </div>
        </div>

        <div class="smw_issue_details">
          <div class="smw_issue_desc_wrap">
            <p>${_escaparHtml(issue.descripcion).replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  $('#issuesList').html(html);
}

// --- CREAR Y GUARDAR UN NUEVO REPORT DE FEEDBACK ---
async function _crearIssue(titulo, descripcion) {
  const btn = $('#btnSubmitFeedback');
  btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Enviando...');
  
  const id = `issue_${Date.now()}`;
  const autor = getUsuarioActual();

  const nuevoIssue = {
    id,
    titulo,
    descripcion,
    categoria: activeCategory,
    estado: 'abierto', // Estado inicial por defecto
    autor,
    fecha: serverTimestamp()
  };

  try {
    await setDoc(doc(db, 'wiFeedbackIssues', id), nuevoIssue);
    
    // Limpiar formulario
    $('#fbTitle').val('');
    $('#fbDesc').val('');
    
    Notificacion('Reporte enviado con éxito ✨', 'success');
    
    // Recargar listado en vivo
    await _cargarIssues();
  } catch (error) {
    console.error('Error al guardar reporte:', error);
    Notificacion('Error al enviar el reporte.', 'error');
  } finally {
    btn.prop('disabled', false).html('<i class="fas fa-paper-plane"></i> Enviar Incidencia');
  }
}

// --- AUXILIARES ---
function _formatearFechaAvisar(fecha) {
  if (!fecha) return 'Ahora';
  let dateObj = null;
  if (fecha.toDate) {
    dateObj = fecha.toDate();
  } else if (typeof fecha === 'string') {
    dateObj = new Date(fecha);
  } else if (fecha.seconds) {
    dateObj = new Date(fecha.seconds * 1000);
  }
  
  if (dateObj && !isNaN(dateObj.getTime())) {
    const d = String(dateObj.getDate()).padStart(2, '0');
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const y = dateObj.getFullYear();
    const h = String(dateObj.getHours()).padStart(2, '0');
    const min = String(dateObj.getMinutes()).padStart(2, '0');
    return `${d}/${m}/${y} ${h}:${min}`;
  }
  return 'Ahora';
}

function _obtenerBadgeEstado(estado) {
  const estados = {
    'abierto': { cls: 'abierto', txt: 'Abierto', ico: 'fa-circle-dot' },
    'en_progreso': { cls: 'en_progreso', txt: 'En Progreso', ico: 'fa-gear' },
    'cerrado': { cls: 'cerrado', txt: 'Cerrado', ico: 'fa-circle-check' }
  };
  return estados[estado] || estados['abierto'];
}

function _obtenerBadgeCategoria(categoria) {
  const categorias = {
    'bug': { cls: 'bug', txt: 'Bug 🐛' },
    'sugerencia': { cls: 'sugerencia', txt: 'Sugerencia 💡' },
    'felicitacion': { cls: 'felicitacion', txt: 'Felicitación ✨' }
  };
  return categorias[categoria] || { cls: 'bug', txt: 'General' };
}

function _escaparHtml(str) {
  return String(str || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[c]));
}

function _generarSkeletonsIssues(cant = 3) {
  return Array(cant).fill(0).map(() => `
    <div class="smw_issue_card smw_sk_issue">
      <div class="smw_issue_summary" style="pointer-events: none;">
        <div class="smw_issue_title_row">
          <span class="smw_sk_el" style="width: 70%; height: 18px; border-radius: 4px;"></span>
          <div style="display: flex; gap: 8px;">
            <span class="smw_sk_el" style="width: 65px; height: 20px; border-radius: 12px;"></span>
            <span class="smw_sk_el" style="width: 75px; height: 20px; border-radius: 12px;"></span>
          </div>
        </div>
        <div class="smw_issue_meta" style="margin-top: 1.5vh;">
          <span class="smw_sk_el" style="width: 100px; height: 14px; border-radius: 4px;"></span>
          <span class="smw_sk_el" style="width: 80px; height: 14px; border-radius: 4px; margin-left: 2vh;"></span>
        </div>
      </div>
    </div>
  `).join('');
}
