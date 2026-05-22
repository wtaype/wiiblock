import './precios.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import {
  collection, getDocs, doc, updateDoc, addDoc, deleteDoc, serverTimestamp
} from 'firebase/firestore';
import { getls, savels, removels, Notificacion, Capi } from '../widev.js';
import { rutas } from '../rutas.js';

// ─── State ────────────────────────────────────────────────────────────────────
let tours      = [];       // all docs from listatours
let dirtyRows  = {};       // { [id]: { ...changedFields } }
let saving     = {};       // { [id]: true } during save
let _newSeq    = 0;        // counter for transient new-row ids

// ─── Constants ────────────────────────────────────────────────────────────────
const NS       = '.prec';
const CACHE_KEY = 'toursSmile';

// ─── render ───────────────────────────────────────────────────────────────────
export const render = () => /* html */`
  <div class="prec_wrap">

    <!-- ══ HEADER ══ -->
    <div class="prec_header" id="prec_header">
      <div class="prec_header_inner">
        <div class="prec_header_text">
          <h1 class="prec_title">
            <i class="fas fa-tags"></i>
            Gestión de Precios
          </h1>
          <p class="prec_subtitle">Edita tours, precios, puntos y comisiones del reto</p>
        </div>
        <div class="prec_header_actions">
          <button class="prec_btn_new" id="prec_btn_new">
            <i class="fas fa-plus"></i> Nuevo Tour
          </button>
          <button class="prec_refresh_btn" id="prec_refresh" title="Actualizar lista">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="prec_stats_bar" id="prec_stats">
        <div class="prec_stat_chip prec_stat_total">
          <span class="prec_stat_num" id="prec_stat_total">—</span>
          <span class="prec_stat_label">Total</span>
        </div>
        <div class="prec_stat_chip prec_stat_activos">
          <span class="prec_stat_num" id="prec_stat_activos">—</span>
          <span class="prec_stat_label">Activos</span>
        </div>
        <div class="prec_stat_chip prec_stat_inactivos">
          <span class="prec_stat_num" id="prec_stat_inactivos">—</span>
          <span class="prec_stat_label">Inactivos</span>
        </div>
      </div>
    </div>

    <!-- ══ TABLE CARD ══ -->
    <div class="prec_table_card">
      <div class="prec_table_title_bar">
        <i class="fas fa-table-list"></i>
        <span>Lista de Tours</span>
      </div>
      <div class="prec_table_scroll">
        <table class="prec_table" id="prec_table">
          <thead>
            <tr>
              <th class="prec_th">#</th>
              <th class="prec_th">Tour</th>
              <th class="prec_th">Precio (S/)</th>
              <th class="prec_th">Puntos</th>
              <th class="prec_th">Comisión (%)</th>
              <th class="prec_th">Estado</th>
              <th class="prec_th prec_th_actions">Acciones</th>
            </tr>
          </thead>
          <tbody id="prec_tbody">
            ${_skeletonRows(6)}
          </tbody>
        </table>
      </div>
    </div>

  </div>
`;

// ─── Skeleton rows ────────────────────────────────────────────────────────────
function _skeletonRows(n) {
  return Array.from({ length: n }, () => /* html */`
    <tr class="prec_row_skeleton">
      <td><div class="smw_sk_el" style="width:32px;height:22px;border-radius:6px"></div></td>
      <td><div class="smw_sk_el" style="width:120px;height:22px;border-radius:6px"></div></td>
      <td><div class="smw_sk_el" style="width:64px;height:22px;border-radius:6px"></div></td>
      <td><div class="smw_sk_el" style="width:56px;height:22px;border-radius:6px"></div></td>
      <td><div class="smw_sk_el" style="width:56px;height:22px;border-radius:6px"></div></td>
      <td><div class="smw_sk_el" style="width:44px;height:22px;border-radius:999px"></div></td>
      <td><div class="smw_sk_el" style="width:80px;height:30px;border-radius:8px"></div></td>
    </tr>
  `).join('');
}

// ─── Row HTML ─────────────────────────────────────────────────────────────────
function _rowHtml(t, isNew = false) {
  const id     = t.id;
  const activo = t.activo !== false;
  const cls    = isNew ? 'prec_row prec_row_new prec_row_dirty' : 'prec_row';
  return /* html */`
    <tr class="${cls}" data-id="${id}" data-new="${isNew ? '1' : '0'}">
      <td class="prec_td prec_td_num">
        <input
          class="prec_td_input prec_in_num"
          type="number"
          min="0"
          value="${t.num ?? ''}"
          data-id="${id}"
          data-field="num"
          title="Orden de visualización"
        />
      </td>
      <td class="prec_td prec_td_tour">
        <input
          class="prec_td_input prec_in_tour"
          type="text"
          value="${_esc(t.tour ?? '')}"
          data-id="${id}"
          data-field="tour"
          placeholder="Nombre del tour"
        />
      </td>
      <td class="prec_td">
        <div class="prec_price_wrap">
          <span class="prec_currency">S/</span>
          <input
            class="prec_td_input prec_in_price"
            type="number"
            min="0"
            step="0.01"
            value="${t.precio ?? ''}"
            data-id="${id}"
            data-field="precio"
            placeholder="0.00"
          />
        </div>
      </td>
      <td class="prec_td">
        <input
          class="prec_td_input prec_in_pts"
          type="number"
          min="0"
          value="${t.puntos ?? ''}"
          data-id="${id}"
          data-field="puntos"
          placeholder="0"
        />
      </td>
      <td class="prec_td">
        <div class="prec_pct_wrap">
          <input
            class="prec_td_input prec_in_com"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value="${t.comision ?? ''}"
            data-id="${id}"
            data-field="comision"
            placeholder="0"
          />
          <span class="prec_pct_sign">%</span>
        </div>
      </td>
      <td class="prec_td prec_td_toggle">
        <label class="prec_toggle" title="${activo ? 'Activo' : 'Inactivo'}">
          <input
            type="checkbox"
            class="prec_toggle_activo"
            data-id="${id}"
            data-field="activo"
            ${activo ? 'checked' : ''}
          />
          <span class="prec_toggle_slider"></span>
        </label>
      </td>
      <td class="prec_td prec_td_actions">
        <div class="prec_actions_wrap">
          ${isNew ? /* html */`
            <button class="prec_btn_save prec_btn_save_active" data-id="${id}" title="Guardar nuevo tour">
              <i class="fas fa-plus-circle"></i> Crear
            </button>
            <button class="prec_btn_cancel_new" data-id="${id}" title="Cancelar">
              <i class="fas fa-times"></i>
            </button>
          ` : /* html */`
            <button class="prec_btn_save" data-id="${id}" title="Guardar cambios" disabled>
              <i class="fas fa-save"></i> Guardar
            </button>
            <button class="prec_btn_delete" data-id="${id}" title="Eliminar tour">
              <i class="fas fa-trash"></i>
            </button>
          `}
        </div>
      </td>
    </tr>
  `;
}

// ─── HTML escape helper ───────────────────────────────────────────────────────
function _esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ─── Update stats ─────────────────────────────────────────────────────────────
function _updateStats() {
  const total     = tours.length;
  const activos   = tours.filter(t => t.activo !== false).length;
  const inactivos = total - activos;
  $('#prec_stat_total').text(total);
  $('#prec_stat_activos').text(activos);
  $('#prec_stat_inactivos').text(inactivos);
}

// ─── Render full table ────────────────────────────────────────────────────────
function _renderTable() {
  _updateStats();

  if (!tours.length) {
    $('#prec_tbody').html(/* html */`
      <tr>
        <td colspan="7">
          <div class="prec_empty">
            <i class="fas fa-map-marked-alt"></i>
            <p>No hay tours registrados.<br>Haz clic en <strong>+ Nuevo Tour</strong> para agregar uno.</p>
          </div>
        </td>
      </tr>
    `);
    return;
  }

  const sorted = [...tours].sort((a, b) => (a.num ?? 999) - (b.num ?? 999));
  $('#prec_tbody').html(sorted.map(t => _rowHtml(t, false)).join(''));
}

// ─── Mark row dirty ───────────────────────────────────────────────────────────
function _markDirty(id, field, value) {
  if (!dirtyRows[id]) dirtyRows[id] = {};
  dirtyRows[id][field] = value;

  const $row = $(`tr[data-id="${id}"]`);
  $row.addClass('prec_row_dirty');
  $row.find(`.prec_btn_save[data-id="${id}"]`)
    .prop('disabled', false)
    .addClass('prec_btn_save_active');
}

// ─── Clear dirty state ────────────────────────────────────────────────────────
function _clearDirty(id) {
  delete dirtyRows[id];
  const $row = $(`tr[data-id="${id}"]`);
  $row.removeClass('prec_row_dirty');
  $row.find(`.prec_btn_save[data-id="${id}"]`)
    .prop('disabled', true)
    .removeClass('prec_btn_save_active');
}

// ─── Flash row ────────────────────────────────────────────────────────────────
function _flashRow(id, type) {
  const $row = $(`tr[data-id="${id}"]`);
  const cls  = type === 'ok' ? 'prec_row_flash_ok' : 'prec_row_flash_err';
  $row.addClass(cls);
  setTimeout(() => $row.removeClass(cls), 900);
}

// ─── Save existing row ────────────────────────────────────────────────────────
async function _saveRow(id) {
  if (saving[id]) return;
  const changes = dirtyRows[id];
  if (!changes || !Object.keys(changes).length) return;

  saving[id] = true;
  const $btn = $(`tr[data-id="${id}"] .prec_btn_save`);
  $btn.prop('disabled', true).html('<i class="fas fa-circle-notch fa-spin"></i>');

  try {
    await updateDoc(doc(db, 'listatours', id), {
      ...changes,
      updatedAt: serverTimestamp()
    });

    // Update local state
    const idx = tours.findIndex(t => t.id === id);
    if (idx !== -1) Object.assign(tours[idx], changes);

    // Invalidate cache
    removels(CACHE_KEY);

    _clearDirty(id);
    _flashRow(id, 'ok');
    Notificacion('Tour guardado ✅', 'success');
  } catch (err) {
    console.error('[PRECIOS] saveRow error:', err);
    _flashRow(id, 'err');
    Notificacion('Error al guardar el tour', 'error');
  } finally {
    saving[id] = false;
    const $btn2 = $(`tr[data-id="${id}"] .prec_btn_save`);
    if (dirtyRows[id]) {
      $btn2.prop('disabled', false)
           .addClass('prec_btn_save_active')
           .html('<i class="fas fa-save"></i> Guardar');
    } else {
      $btn2.prop('disabled', true)
           .removeClass('prec_btn_save_active')
           .html('<i class="fas fa-save"></i> Guardar');
    }
  }
}

// ─── Create new tour ──────────────────────────────────────────────────────────
async function _createTour(id) {
  if (saving[id]) return;
  const data = dirtyRows[id] || {};

  const tourName = data.tour?.trim() || '';
  if (!tourName) {
    Notificacion('El nombre del tour es obligatorio', 'warning');
    $(`tr[data-id="${id}"] .prec_in_tour`).trigger('focus');
    return;
  }

  saving[id] = true;
  const $btn = $(`tr[data-id="${id}"] .prec_btn_save`);
  $btn.prop('disabled', true).html('<i class="fas fa-circle-notch fa-spin"></i> Creando…');

  try {
    const payload = {
      tour:      tourName,
      num:       Number(data.num)      || 0,
      precio:    Number(data.precio)   || 0,
      puntos:    Number(data.puntos)   || 0,
      comision:  Number(data.comision) || 0,
      activo:    data.activo !== false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const ref = await addDoc(collection(db, 'listatours'), payload);

    // Add to local state
    const newTour = { id: ref.id, ...payload };
    tours.push(newTour);

    // Invalidate cache
    removels(CACHE_KEY);

    // Remove temp row, re-render
    delete dirtyRows[id];
    delete saving[id];
    _renderTable();

    // Flash newly added row
    setTimeout(() => _flashRow(ref.id, 'ok'), 50);
    Notificacion(`Tour "${Capi(tourName)}" creado ✅`, 'success');
    _updateStats();
  } catch (err) {
    console.error('[PRECIOS] createTour error:', err);
    saving[id] = false;
    $btn.prop('disabled', false)
        .html('<i class="fas fa-plus-circle"></i> Crear');
    Notificacion('Error al crear el tour', 'error');
  }
}

// ─── Delete tour ──────────────────────────────────────────────────────────────
async function _deleteTour(id) {
  const tour = tours.find(t => t.id === id);
  const name = tour ? Capi(tour.tour || 'este tour') : 'este tour';

  const ok = window.confirm(
    `¿Eliminar "${name}" permanentemente?\n\nEsta acción no se puede deshacer.`
  );
  if (!ok) return;

  const $row = $(`tr[data-id="${id}"]`);
  $row.css({ opacity: 0.5, pointerEvents: 'none' });

  try {
    await deleteDoc(doc(db, 'listatours', id));
    tours = tours.filter(t => t.id !== id);
    delete dirtyRows[id];
    removels(CACHE_KEY);
    $row.addClass('prec_row_removing');
    setTimeout(() => {
      _renderTable();
    }, 350);
    Notificacion(`Tour "${name}" eliminado`, 'warning');
  } catch (err) {
    console.error('[PRECIOS] deleteTour error:', err);
    $row.css({ opacity: '', pointerEvents: '' });
    Notificacion('Error al eliminar el tour', 'error');
  }
}

// ─── Prepend new row ──────────────────────────────────────────────────────────
function _prependNewRow() {
  // Only allow one new row at a time
  if ($('.prec_row_new').length) {
    $('tr.prec_row_new .prec_in_tour').first().trigger('focus');
    Notificacion('Ya hay un tour nuevo pendiente de guardar', 'info');
    return;
  }

  _newSeq++;
  const tempId = `__new_${_newSeq}`;
  const newTour = {
    id:       tempId,
    num:      tours.length + 1,
    tour:     '',
    precio:   0,
    puntos:   0,
    comision: 0,
    activo:   true
  };

  // Pre-seed dirty state so create knows defaults
  dirtyRows[tempId] = {
    num:      newTour.num,
    precio:   0,
    puntos:   0,
    comision: 0,
    activo:   true
  };

  const html = _rowHtml(newTour, true);
  $('#prec_tbody').prepend(html);
  $(`tr[data-id="${tempId}"] .prec_in_tour`).trigger('focus');
}

// ─── Load tours ───────────────────────────────────────────────────────────────
async function _loadTours(forceReload = false) {
  if (!forceReload) {
    const cached = getls(CACHE_KEY);
    if (cached) {
      tours = cached;
      _renderTable();
      return;
    }
  }

  $('#prec_tbody').html(_skeletonRows(6));
  $('#prec_header').addClass('smw_loading');

  try {
    const snap = await getDocs(collection(db, 'listatours'));
    tours = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    savels(CACHE_KEY, tours, 60); // 60 min cache
    _renderTable();
  } catch (err) {
    console.error('[PRECIOS] loadTours error:', err);
    $('#prec_tbody').html(/* html */`
      <tr>
        <td colspan="7">
          <div class="prec_empty prec_empty_error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Error al cargar los tours. Intenta de nuevo.</p>
          </div>
        </td>
      </tr>
    `);
    Notificacion('Error al cargar los tours', 'error');
  } finally {
    $('#prec_header').removeClass('smw_loading');
  }
}

// ─── init ─────────────────────────────────────────────────────────────────────
export const init = async () => {
  // Show immediately
  $('.prec_wrap').addClass('visible');
  window.__WIREADY__ = true;

  // Reset module state
  tours     = [];
  dirtyRows = {};
  saving    = {};
  _newSeq   = 0;

  // Load data in background
  _loadTours(false);

  // ── Events ───────────────────────────────────────────────────────────────

  // Field change → mark dirty
  $(document).on(`input${NS}`, '.prec_td_input', function () {
    const id    = $(this).data('id');
    const field = $(this).data('field');
    let   val   = $(this).val();

    // Coerce numeric fields
    if (['num', 'precio', 'puntos', 'comision'].includes(field)) {
      val = val === '' ? '' : Number(val);
    }

    _markDirty(id, field, val);
  });

  // Toggle activo → mark dirty immediately
  $(document).on(`change${NS}`, '.prec_toggle_activo', function () {
    const id    = $(this).data('id');
    const field = $(this).data('field');
    const val   = $(this).is(':checked');
    const $row  = $(`tr[data-id="${id}"]`);
    const isNew = $row.data('new') === 1 || $row.data('new') === '1';
    _markDirty(id, field, val);

    // For existing rows: auto-save the activo toggle immediately
    if (!isNew) {
      _saveRow(id);
    }
  });

  // Save button
  $(document).on(`click${NS}`, '.prec_btn_save', function () {
    const id    = $(this).data('id');
    const $row  = $(`tr[data-id="${id}"]`);
    const isNew = $row.data('new') === 1 || $row.data('new') === '1';

    if (isNew) {
      _createTour(id);
    } else {
      _saveRow(id);
    }
  });

  // Cancel new row
  $(document).on(`click${NS}`, '.prec_btn_cancel_new', function () {
    const id = $(this).data('id');
    delete dirtyRows[id];
    delete saving[id];
    $(`tr[data-id="${id}"]`).remove();
  });

  // Delete button
  $(document).on(`click${NS}`, '.prec_btn_delete', function () {
    const id = $(this).data('id');
    _deleteTour(id);
  });

  // Add new tour button
  $(document).on(`click${NS}`, '#prec_btn_new', () => {
    _prependNewRow();
  });

  // Refresh
  $(document).on(`click${NS}`, '#prec_refresh', async function () {
    const $btn = $(this);
    if ($btn.hasClass('prec_spinning')) return;
    $btn.addClass('prec_spinning');
    dirtyRows = {};
    saving    = {};
    await _loadTours(true);
    $btn.removeClass('prec_spinning');
    Notificacion('Lista actualizada', 'success');
  });

  // Keyboard: Enter saves the row
  $(document).on(`keydown${NS}`, '.prec_td_input', function (e) {
    if (e.key !== 'Enter') return;
    const id    = $(this).data('id');
    const $row  = $(`tr[data-id="${id}"]`);
    const isNew = $row.data('new') === 1 || $row.data('new') === '1';
    if (isNew) {
      _createTour(id);
    } else if (dirtyRows[id]) {
      _saveRow(id);
    }
  });

  // Keyboard: Escape cancels new row
  $(document).on(`keydown${NS}`, '.prec_row_new .prec_td_input', function (e) {
    if (e.key !== 'Escape') return;
    const id = $(this).data('id');
    delete dirtyRows[id];
    delete saving[id];
    $(`tr[data-id="${id}"]`).remove();
  });
};

// ─── cleanup ──────────────────────────────────────────────────────────────────
export const cleanup = () => {
  $(document).off(NS);
  tours     = [];
  dirtyRows = {};
  saving    = {};
};
