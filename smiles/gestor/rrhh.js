import './rrhh.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import { collection, getDocs, doc, updateDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { getls, savels, removels, Notificacion, Capi, Capit, wiAuth } from '../widev.js';
import { rutas } from '../rutas.js';

// ─── State ────────────────────────────────────────────────────────────────────
let usuarios    = [];
let filtroTab   = 'todos';   // 'todos' | 'activos' | 'pendientes' | 'inactivos'
let filtroSearch = '';
let selectedId  = null;
let _saving     = false;

const CACHE_KEY = 'rrhhUsuarios';
const CACHE_TTL = 30;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const _initials = (u) =>
  ((u.nombre || '') + ' ' + (u.apellidos || '') || u.usuario || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => (w[0] || '').toUpperCase())
    .join('');

const _avatar = (u, size = 40) => {
  if (u.imagen) {
    return `<div class="rrhh_avatar" style="width:${size}px;height:${size}px"><img src="${u.imagen}" alt="${Capi(u.nombre || u.usuario || '?')}" loading="lazy"/></div>`;
  }
  const ini = _initials(u);
  return `<div class="rrhh_avatar rrhh_avatar_initials" data-rol="${u.rol || 'smile'}" style="width:${size}px;height:${size}px;font-size:${Math.round(size * 0.36)}px">${ini}</div>`;
};

const _rolBadge = (rol) => {
  const safe = (rol || 'smile').toLowerCase();
  return `<span class="rrhh_rol_badge rrhh_rol_${safe}">${Capi(safe)}</span>`;
};

const _estadoToggleHtml = (id, estado) => {
  const isActive = estado === 'activo';
  return /* html */`
    <label class="rrhh_toggle" title="${isActive ? 'Activo' : 'Inactivo'}">
      <input type="checkbox" class="rrhh_toggle_estado_input" data-id="${id}" ${isActive ? 'checked' : ''} />
      <span class="rrhh_toggle_slider" style="--c: #29C72E"></span>
    </label>
  `;
};

const _toggleHtml = (id, participa) => {
  const checked = participa === 'si' ? 'checked' : '';
  return /* html */`
    <label class="rrhh_toggle" title="${participa === 'si' ? 'Participando' : 'No participa'}">
      <input type="checkbox" class="rrhh_toggle_participa" data-id="${id}" ${checked} />
      <span class="rrhh_toggle_slider"></span>
    </label>
  `;
};

// ─── Filter logic ─────────────────────────────────────────────────────────────
const _applyFilters = () => {
  const term = filtroSearch.toLowerCase().trim();
  const miRol = getls('wiSmile')?.rol || 'smile';

  return usuarios.filter(u => {
    // Seguridad: Si soy gestor, no veo admins
    if (miRol === 'gestor' && u.rol === 'admin') return false;

    // Tab filter
    if (filtroTab === 'activos'    && u.participa !== 'si') return false;
    if (filtroTab === 'pendientes' && u.estado !== 'pendiente') return false;
    if (filtroTab === 'inactivos'  && u.participa !== 'no' && u.estado !== 'inactivo') return false;
    // Search
    if (term) {
      const haystack = [u.nombre, u.apellidos, u.usuario, u.email].join(' ').toLowerCase();
      if (!haystack.includes(term)) return false;
    }
    return true;
  });
};

// ─── render ───────────────────────────────────────────────────────────────────
export const render = () => /* html */`
  <div class="rrhh_wrap">

    <!-- ══ HEADER CARD ══ -->
    <div class="rrhh_header_card" id="rrhh_header_card">
      <div class="rrhh_header_card_stripe"></div>
      <div class="rrhh_header_inner">
        <div class="rrhh_header_text">
          <h1 class="rrhh_title">
            <i class="fas fa-users-gear"></i>
            Gestión de Colaboradores
          </h1>
          <p class="rrhh_subtitle">Administra el equipo, roles, estado y participación en el reto</p>
        </div>
        <div class="rrhh_header_actions">
          <button class="rrhh_refresh_btn" id="rrhh_refresh" title="Actualizar lista">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- ══ STATS BAR ══ -->
    <div class="rrhh_stats_bar" id="rrhh_stats">
      <div class="rrhh_stat_chip rrhh_stat_total">
        <span class="rrhh_stat_num" id="stat_total">—</span>
        <span class="rrhh_stat_label">Total</span>
      </div>
      <div class="rrhh_stat_chip rrhh_stat_activos">
        <span class="rrhh_stat_num" id="stat_activos">—</span>
        <span class="rrhh_stat_label">Activos</span>
      </div>
      <div class="rrhh_stat_chip rrhh_stat_pendientes">
        <span class="rrhh_stat_num" id="stat_pendientes">—</span>
        <span class="rrhh_stat_label">Pendientes</span>
      </div>
      <div class="rrhh_stat_chip rrhh_stat_inactivos">
        <span class="rrhh_stat_num" id="stat_inactivos">—</span>
        <span class="rrhh_stat_label">Inactivos</span>
      </div>
    </div>

    <!-- ══ SEARCH BAR ══ -->
    <div class="rrhh_search_bar">
      <i class="fas fa-search rrhh_search_icon"></i>
      <input
        type="text"
        id="rrhh_search"
        class="rrhh_search_input"
        placeholder="Buscar por nombre, usuario o email…"
        autocomplete="off"
      />
    </div>

    <!-- ══ FILTER TABS ══ -->
    <div class="rrhh_tabs" id="rrhh_tabs">
      <button class="rrhh_tab active" data-tab="todos">
        <i class="fas fa-list"></i> Todos
      </button>
      <button class="rrhh_tab" data-tab="activos">
        <i class="fas fa-circle-check"></i> Activos
      </button>
      <button class="rrhh_tab" data-tab="pendientes">
        <i class="fas fa-clock"></i> Pendientes
      </button>
      <button class="rrhh_tab" data-tab="inactivos">
        <i class="fas fa-circle-xmark"></i> Inactivos
      </button>
    </div>

    <!-- ══ TABLE ══ -->
    <table class="rrhh_table" id="rrhhTable">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Participa</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="rrhh_tbody">
        <tr>
          <td colspan="8" class="rrhh_loading_cell">
            <div class="rrhh_spinner"><i class="fas fa-circle-notch fa-spin"></i> Cargando colaboradores…</div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>

  <!-- ══ SIDE PANEL OVERLAY ══ -->
  <div class="rrhh_overlay" id="rrhh_overlay"></div>

  <!-- ══ SIDE PANEL ══ -->
  <aside class="rrhh_panel" id="rrhh_panel" aria-hidden="true">
    <div class="rrhh_panel_header">
      <div class="rrhh_panel_avatar_wrap" id="rrhh_panel_avatar"></div>
      <div class="rrhh_panel_title_wrap">
        <h2 class="rrhh_panel_name" id="rrhh_panel_name">Colaborador</h2>
        <span class="rrhh_panel_user" id="rrhh_panel_user">@usuario</span>
      </div>
      <button class="rrhh_panel_close" id="rrhh_panel_close" aria-label="Cerrar panel">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="rrhh_panel_body">
      <form id="rrhh_edit_form" autocomplete="off">
        <input type="hidden" id="edit_uid" />

        <!-- Personal -->
        <div class="rrhh_form_section">
          <div class="rrhh_form_section_title"><i class="fas fa-id-card"></i> Datos Personales</div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_nombre">Nombre</label>
            <input class="rrhh_form_input" id="edit_nombre" type="text" placeholder="Nombre" />
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_apellidos">Apellidos</label>
            <input class="rrhh_form_input" id="edit_apellidos" type="text" placeholder="Apellidos" />
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_usuario">Usuario</label>
            <input class="rrhh_form_input rrhh_input_locked" id="edit_usuario" type="text" disabled />
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_email">Email</label>
            <input class="rrhh_form_input rrhh_input_locked" id="edit_email" type="email" disabled />
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_descripcion">Descripción</label>
            <textarea class="rrhh_form_input rrhh_form_textarea" id="edit_descripcion" placeholder="Bio o descripción…" rows="2"></textarea>
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_imagen">Imagen (URL)</label>
            <input class="rrhh_form_input" id="edit_imagen" type="url" placeholder="https://…" />
          </div>
        </div>

        <!-- Laboral -->
        <div class="rrhh_form_section">
          <div class="rrhh_form_section_title"><i class="fas fa-briefcase"></i> Datos Laborales</div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_rol">Rol</label>
            <select class="rrhh_form_select" id="edit_rol">
              <option value="smile">Smile</option>
              <option value="gestor">Gestor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_estado">Estado</label>
            <select class="rrhh_form_select" id="edit_estado">
              <option value="activo">Activo</option>
              <option value="pendiente">Pendiente</option>
              <option value="suspendido">Suspendido</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <div class="rrhh_form_row rrhh_form_row_inline">
            <label class="rrhh_form_label">Participa en el reto</label>
            <label class="rrhh_toggle" id="edit_participa_toggle">
              <input type="checkbox" id="edit_participa" />
              <span class="rrhh_toggle_slider"></span>
            </label>
          </div>
        </div>

        <!-- Banca -->
        <div class="rrhh_form_section">
          <div class="rrhh_form_section_title"><i class="fas fa-building-columns"></i> Datos Bancarios</div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_banco">Banco / Método</label>
            <select class="rrhh_form_select" id="edit_banco">
              <option value="">— Seleccionar —</option>
              <option value="BCP">BCP</option>
              <option value="BBVA">BBVA</option>
              <option value="Interbank">Interbank</option>
              <option value="Yape">Yape</option>
              <option value="Plin">Plin</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_numeroCuenta">Número de Cuenta</label>
            <input class="rrhh_form_input" id="edit_numeroCuenta" type="text" placeholder="N.º cuenta o celular" />
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_titularCuenta">Titular</label>
            <input class="rrhh_form_input" id="edit_titularCuenta" type="text" placeholder="Nombre del titular" />
          </div>
        </div>

        <div class="rrhh_panel_footer">
          <button type="submit" class="rrhh_btn_save" id="rrhh_btn_save">
            <i class="fas fa-save"></i>
            <span>Guardar cambios</span>
          </button>
        </div>
      </form>
    </div>
  </aside>
`;

// ─── _updateStats ─────────────────────────────────────────────────────────────
const _updateStats = () => {
  const total     = usuarios.length;
  const activos   = usuarios.filter(u => u.participa === 'si').length;
  const pendientes = usuarios.filter(u => u.estado === 'pendiente').length;
  const inactivos = usuarios.filter(u => u.participa !== 'si').length;
  $('#stat_total').text(total);
  $('#stat_activos').text(activos);
  $('#stat_pendientes').text(pendientes);
  $('#stat_inactivos').text(inactivos);
};

// ─── _renderTable ─────────────────────────────────────────────────────────────
const _renderTable = () => {
  _updateStats();
  const lista = _applyFilters();

  // Ordenar dinámicamente: Participan primero, luego alfabéticamente
  lista.sort((a, b) => {
    const aPart = a.participa === 'si' ? 0 : 1;
    const bPart = b.participa === 'si' ? 0 : 1;
    if (aPart !== bPart) return aPart - bPart;
    return (a.nombre || a.usuario || '').localeCompare(b.nombre || b.usuario || '', 'es');
  });

  if (!lista.length) {
    const term = filtroSearch.toLowerCase().trim();
    $('#rrhh_tbody').html(/* html */`
      <tr>
        <td colspan="8">
          <div class="rrhh_empty">
            <i class="fas fa-user-slash"></i>
            <p>${term ? `Sin resultados para "<strong>${term}</strong>"` : 'No hay colaboradores en esta categoría'}</p>
          </div>
        </td>
      </tr>
    `);
    return;
  }

  const rows = lista.map(u => {
    const isPendiente = u.estado === 'pendiente';
    return /* html */`
      <tr data-id="${u.id}" class="${u.participa === 'si' ? '' : 'rrhh_row_inactive'}">
        <td>${_avatar(u, 40)}</td>
        <td class="rrhh_nombre">${Capit((u.nombre || '') + ' ' + (u.apellidos || '')).trim() || '—'}</td>
        <td class="rrhh_usuario">@${u.usuario || '—'}</td>
        <td class="rrhh_email">${u.email || '—'}</td>
        <td>${_rolBadge(u.rol)}</td>
        <td>${_toggleHtml(u.id, u.participa)}</td>
        <td>${_estadoToggleHtml(u.id, u.estado)}</td>
        <td class="rrhh_actions_cell">
          <button class="rrhh_btn_editar" data-id="${u.id}" title="Editar colaborador">
            <i class="fas fa-pen-to-square"></i> Editar
          </button>
          ${isPendiente ? /* html */`
            <button class="rrhh_btn_approve" data-id="${u.id}" title="Aprobar solicitud">
              <i class="fas fa-check"></i>
            </button>
            <button class="rrhh_btn_reject" data-id="${u.id}" title="Rechazar solicitud">
              <i class="fas fa-times"></i>
            </button>
          ` : ''}
        </td>
      </tr>
    `;
  }).join('');

  $('#rrhh_tbody').html(rows);
};

// ─── Panel helpers ────────────────────────────────────────────────────────────
const _openPanel = (id) => {
  const u = usuarios.find(u => u.id === id);
  if (!u) return;
  selectedId = id;

  // Populate header
  const nombre = Capit((u.nombre || '') + ' ' + (u.apellidos || '')).trim() || u.usuario || '—';
  $('#rrhh_panel_avatar').html(_avatar(u, 52));
  $('#rrhh_panel_name').text(nombre);
  $('#rrhh_panel_user').text('@' + (u.usuario || '—'));

  // Populate form fields
  $('#edit_uid').val(id);
  $('#edit_nombre').val(u.nombre || '');
  $('#edit_apellidos').val(u.apellidos || '');
  $('#edit_usuario').val(u.usuario || '');
  $('#edit_email').val(u.email || '');
  $('#edit_descripcion').val(u.descripcion || '');
  $('#edit_imagen').val(u.imagen || '');
  $('#edit_rol').val(u.rol || 'smile');
  $('#edit_estado').val(u.estado || 'activo');
  $('#edit_participa').prop('checked', u.participa === 'si');
  $('#edit_banco').val(u.banco || '');
  $('#edit_numeroCuenta').val(u.numeroCuenta || '');
  $('#edit_titularCuenta').val(u.titularCuenta || '');

  // Security options
  const miRol = getls('wiSmile')?.rol || 'smile';
  if (miRol === 'gestor') {
    $('#edit_rol option[value="admin"]').hide();
  } else {
    $('#edit_rol option[value="admin"]').show();
  }

  // Show panel
  $('#rrhh_panel').addClass('open').attr('aria-hidden', 'false');
  $('#rrhh_overlay').addClass('visible');
  $('body').addClass('rrhh_no_scroll');
};

const _closePanel = () => {
  selectedId = null;
  $('#rrhh_panel').removeClass('open').attr('aria-hidden', 'true');
  $('#rrhh_overlay').removeClass('visible');
  $('body').removeClass('rrhh_no_scroll');
};

// ─── Modal helpers (eliminados) ────────────────────────────────────────────────
// ─── _toggleParticipa ─────────────────────────────────────────────────────────
const _toggleParticipa = async (id) => {
  const idx = usuarios.findIndex(u => u.id === id);
  if (idx === -1) return;
  const current = usuarios[idx].participa;
  const newVal  = current === 'si' ? 'no' : 'si';
  const nombre  = Capi(usuarios[idx].nombre || usuarios[idx].usuario || id);
  try {
    await updateDoc(doc(db, 'smiles', id), { participa: newVal });
    usuarios[idx].participa = newVal;
    removels(CACHE_KEY);
    savels(CACHE_KEY, usuarios, CACHE_TTL);
    _renderTable();
    Notificacion(`${nombre} ahora ${newVal === 'si' ? 'participa ✅' : 'no participa ❌'}`, newVal === 'si' ? 'success' : 'warning');
  } catch (err) {
    console.error('[RRHH] toggleParticipa:', err);
    Notificacion('Error al actualizar participación', 'error');
    _renderTable();
  }
};

// ─── _toggleEstado ────────────────────────────────────────────────────────────
const _toggleEstado = async (id) => {
  const idx = usuarios.findIndex(u => u.id === id);
  if (idx === -1) return;
  const current = usuarios[idx].estado;
  const newVal  = current === 'activo' ? 'inactivo' : 'activo';
  const nombre  = Capi(usuarios[idx].nombre || usuarios[idx].usuario || id);
  try {
    await updateDoc(doc(db, 'smiles', id), { estado: newVal });
    usuarios[idx].estado = newVal;
    removels(CACHE_KEY);
    savels(CACHE_KEY, usuarios, CACHE_TTL);
    _renderTable();
    Notificacion(`${nombre} ahora está ${newVal === 'activo' ? 'Activo ✅' : 'Inactivo ❌'}`, newVal === 'activo' ? 'success' : 'warning');
  } catch (err) {
    console.error('[RRHH] toggleEstado:', err);
    Notificacion('Error al actualizar estado', 'error');
    _renderTable();
  }
};

// ─── _saveEdit ────────────────────────────────────────────────────────────────
const _saveEdit = async () => {
  if (_saving || !selectedId) return;
  _saving = true;

  const $btn = $('#rrhh_btn_save');
  $btn.addClass('loading').prop('disabled', true);
  $('#rrhh_header_card').addClass('smw_loading');

  const data = {
    nombre:        $('#edit_nombre').val().trim(),
    apellidos:     $('#edit_apellidos').val().trim(),
    usuario:       $('#edit_usuario').val().trim(),
    email:         $('#edit_email').val().trim(),
    descripcion:   $('#edit_descripcion').val().trim(),
    imagen:        $('#edit_imagen').val().trim(),
    rol:           $('#edit_rol').val(),
    estado:        $('#edit_estado').val(),
    participa:     $('#edit_participa').is(':checked') ? 'si' : 'no',
    banco:         $('#edit_banco').val(),
    numeroCuenta:  $('#edit_numeroCuenta').val().trim(),
    titularCuenta: $('#edit_titularCuenta').val().trim(),
    updatedAt:     serverTimestamp(),
  };

  // Strip empty strings
  Object.keys(data).forEach(k => {
    if (data[k] === '') delete data[k];
  });

  try {
    await updateDoc(doc(db, 'smiles', selectedId), data);
    const idx = usuarios.findIndex(u => u.id === selectedId);
    if (idx !== -1) Object.assign(usuarios[idx], data);
    removels(CACHE_KEY);
    savels(CACHE_KEY, usuarios, CACHE_TTL);
    _renderTable();
    _closePanel();
    Notificacion('Colaborador actualizado ✅', 'success');
  } catch (err) {
    console.error('[RRHH] saveEdit:', err);
    Notificacion('Error al guardar cambios', 'error');
  } finally {
    _saving = false;
    $btn.removeClass('loading').prop('disabled', false);
    $('#rrhh_header_card').removeClass('smw_loading');
  }
};

// ─── _aprobar / _rechazar ─────────────────────────────────────────────────────
const _aprobar = async (id) => {
  const idx = usuarios.findIndex(u => u.id === id);
  if (idx === -1) return;
  const nombre = Capi(usuarios[idx].nombre || usuarios[idx].usuario || id);
  try {
    await updateDoc(doc(db, 'smiles', id), { estado: 'activo', participa: 'si' });
    usuarios[idx].estado    = 'activo';
    usuarios[idx].participa = 'si';
    removels(CACHE_KEY);
    savels(CACHE_KEY, usuarios, CACHE_TTL);
    _renderTable();
    Notificacion(`${nombre} aprobado como colaborador ✅`, 'success');
  } catch (err) {
    console.error('[RRHH] aprobar:', err);
    Notificacion('Error al aprobar solicitud', 'error');
  }
};

const _rechazar = async (id) => {
  const idx = usuarios.findIndex(u => u.id === id);
  if (idx === -1) return;
  const nombre = Capi(usuarios[idx].nombre || usuarios[idx].usuario || id);
  try {
    await updateDoc(doc(db, 'smiles', id), { estado: 'inactivo', participa: 'no' });
    usuarios[idx].estado    = 'inactivo';
    usuarios[idx].participa = 'no';
    removels(CACHE_KEY);
    savels(CACHE_KEY, usuarios, CACHE_TTL);
    _renderTable();
    Notificacion(`Solicitud de ${nombre} rechazada`, 'warning');
  } catch (err) {
    console.error('[RRHH] rechazar:', err);
    Notificacion('Error al rechazar solicitud', 'error');
  }
};

// ─── _crearTrabajador (eliminado) ────────────────────────────────────────────────
// ─── _loadUsuarios ────────────────────────────────────────────────────────────
const _loadUsuarios = async (forceReload = false) => {
  if (!forceReload) {
    const cached = getls(CACHE_KEY);
    if (cached) {
      usuarios = cached;
      _renderTable();
      return;
    }
  }

  $('#rrhh_tbody').html(`
    <tr>
      <td colspan="8" class="rrhh_loading_cell">
        <div class="rrhh_spinner"><i class="fas fa-circle-notch fa-spin"></i> Cargando colaboradores…</div>
      </td>
    </tr>
  `);

  try {
    const snap = await getDocs(collection(db, 'smiles'));
    usuarios = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    usuarios.sort((a, b) => {
      const aPart = a.participa === 'si' ? 0 : 1;
      const bPart = b.participa === 'si' ? 0 : 1;
      if (aPart !== bPart) return aPart - bPart;
      return (a.nombre || a.usuario || '').localeCompare(b.nombre || b.usuario || '', 'es');
    });
    savels(CACHE_KEY, usuarios, CACHE_TTL);
    _renderTable();
  } catch (err) {
    console.error('[RRHH] loadUsuarios:', err);
    $('#rrhh_tbody').html(`
      <tr>
        <td colspan="8">
          <div class="rrhh_empty rrhh_empty_error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Error al cargar colaboradores. Intenta de nuevo.</p>
          </div>
        </td>
      </tr>
    `);
    Notificacion('Error al cargar colaboradores', 'error');
  }
};

// ─── init ─────────────────────────────────────────────────────────────────────
export const init = async () => {
  // Show immediately
  $('.rrhh_wrap').addClass('visible');
  window.__WIREADY__ = true;

  // Load data in background
  _loadUsuarios(false);

  // ── Events ──────────────────────────────────────────────────────────────────

  // Search
  $(document).on('input.rrhh', '#rrhh_search', function () {
    filtroSearch = $(this).val();
    _renderTable();
  });

  // Tab filter
  $(document).on('click.rrhh', '.rrhh_tab', function () {
    filtroTab = $(this).data('tab');
    $('.rrhh_tab').removeClass('active');
    $(this).addClass('active');
    _renderTable();
  });

  // Refresh
  $(document).on('click.rrhh', '#rrhh_refresh', async function () {
    const $btn = $(this);
    $btn.addClass('rrhh_spinning');
    filtroSearch = '';
    filtroTab = 'todos';
    $('#rrhh_search').val('');
    $('.rrhh_tab').removeClass('active');
    $('.rrhh_tab[data-tab="todos"]').addClass('active');
    await _loadUsuarios(true);
    $btn.removeClass('rrhh_spinning');
    Notificacion('Lista actualizada', 'success');
  });

  // Toggle participa
  $(document).on('change.rrhh', '.rrhh_toggle_participa', function () {
    _toggleParticipa($(this).data('id'));
  });

  // Toggle estado
  $(document).on('change.rrhh', '.rrhh_toggle_estado_input', function () {
    _toggleEstado($(this).data('id'));
  });

  // Open side panel
  $(document).on('click.rrhh', '.rrhh_btn_editar', function (e) {
    e.stopPropagation();
    _openPanel($(this).data('id'));
  });

  // Close panel — X button
  $(document).on('click.rrhh', '#rrhh_panel_close', _closePanel);

  // Close panel — overlay click
  $(document).on('click.rrhh', '#rrhh_overlay', _closePanel);

  // Close panel — Escape key
  $(document).on('keydown.rrhh', function (e) {
    if (e.key === 'Escape') {
      _closePanel();
      _closeModal();
    }
  });

  // Save edit form
  $(document).on('submit.rrhh', '#rrhh_edit_form', function (e) {
    e.preventDefault();
    _saveEdit();
  });

  // Aprobar
  $(document).on('click.rrhh', '.rrhh_btn_approve', function (e) {
    e.stopPropagation();
    _aprobar($(this).data('id'));
  });

  // Rechazar
  $(document).on('click.rrhh', '.rrhh_btn_reject', function (e) {
    e.stopPropagation();
    _rechazar($(this).data('id'));
  });
  // (Eventos de creación eliminados)
};

// ─── cleanup ──────────────────────────────────────────────────────────────────
export const cleanup = () => {
  $(document).off('.rrhh');
  $('body').removeClass('rrhh_no_scroll');
  usuarios     = [];
  filtroTab    = 'todos';
  filtroSearch = '';
  selectedId   = null;
  _saving      = false;
};
