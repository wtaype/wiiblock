import './chat.css';
import $ from 'jquery';
import { db } from '../firebase.js';
import { collection, getDocs, addDoc, doc, deleteDoc, query, orderBy, limit, startAfter, serverTimestamp } from 'firebase/firestore';
import { getls, savels, Notificacion, Capit, wiTiempo, wiAuth, wiSpin } from '../widev.js';
import { cargarTodosEmpleados } from './zsmile.js';

// ─── Constants ────────────────────────────────────────────────────────────────
const NS          = '.chat';
const CACHE_KEY   = 'chatSmileMsgs';
const CACHE_TTL   = 0.1;   // 6 min
const MSG_LIMIT   = 7;
const PAGE_LIMIT  = 5;
const REFRESH_MS  = 30000; // 30 s
const MAX_CHARS   = 500;

// ─── State ────────────────────────────────────────────────────────────────────
let mensajes      = [];
let colaboradores = [];
let filterText    = '';
let enviando      = false;
let refreshTimer  = null;
let puedeEnviar   = false;
let miUsuario     = '';
let miNombre      = '';
let cargando      = false;
let tieneMasAnteriores = true;
let msgIdAEliminar = null;

// ─── render ───────────────────────────────────────────────────────────────────
export const render = () => /* html */`
  <div class="chat_wrap wi_fadeUp">
    <div class="chat_container" id="chatContainer">

      <!-- ═══ SIDEBAR (LEFT COLUMN) ═══ -->
      <aside class="chat_sidebar">
        <div class="chat_sidebar_header">
          <div class="chat_sidebar_title">
            <i class="fas fa-users-viewfinder"></i>
            <h2>Mi Equipo</h2>
            <span class="chat_sidebar_count" id="sidebarCount">0</span>
          </div>
          <button class="chat_sidebar_close_btn" id="chatSidebarClose" title="Cerrar">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="chat_sidebar_search">
          <div class="chat_search_box">
            <i class="fas fa-search"></i>
            <input
              type="text"
              id="chatSearchInput"
              placeholder="Buscar compañero…"
              autocomplete="off"
            >
          </div>
        </div>

        <div class="chat_sidebar_list" id="chatSidebarList">
          ${_sidebarSkeletons()}
        </div>
      </aside>

      <!-- ═══ MAIN CHAT (RIGHT COLUMN) ═══ -->
      <main class="chat_main">
        <!-- ══ HEADER ══ -->
        <div class="chat_header smw_loading" id="chatHeader">
          <div class="chat_header_left">
            <button class="chat_sidebar_toggle_btn" id="chatSidebarToggle" title="Ver colaboradores">
              <i class="fas fa-users"></i>
              <span class="chat_sidebar_indicator"></span>
            </button>
            <div class="chat_header_icon">
              <i class="fas fa-comments"></i>
            </div>
            <div class="chat_header_text">
              <h1 class="chat_title">Chat del Equipo</h1>
              <p class="chat_subtitle">Canal interno de <em>Smiles</em></p>
            </div>
          </div>
          <div class="chat_header_actions">
            <div class="chat_online_badge" id="chatOnline">
              <span class="chat_online_dot"></span>
              <span id="chatOnlineCount">—</span> activos
            </div>
            <button class="chat_refresh_btn" id="chatRefresh" title="Actualizar mensajes">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>

        <!-- ══ MESSAGES AREA ══ -->
        <div class="chat_messages" id="chatMessages">
          ${_skeletons()}
        </div>

        <!-- ══ INPUT AREA ══ -->
        <div class="chat_input_area" id="chatInputArea">
          <div class="chat_input_card">
            <div class="chat_textarea_wrap">
              <textarea
                id="chatTextarea"
                class="chat_textarea"
                placeholder="Escribe un mensaje…"
                rows="1"
                maxlength="${MAX_CHARS}"
              ></textarea>
            </div>
            <button class="chat_send_btn" id="chatSendBtn" title="Enviar mensaje">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <div class="chat_blocked_msg" id="chatBlockedMsg" style="display:none;">
            <i class="fas fa-lock"></i>
            Solo los colaboradores activos pueden enviar mensajes.
          </div>
        </div>
      </main>

    </div>

    <!-- CHAT DELETION MODAL -->
    <div class="chat_modal" id="chatEliminarModal">
      <div class="chat_modal_body">
        <i class="fas fa-trash-alt"></i>
        <h3>¿Eliminar mensaje?</h3>
        <p>Esta acción no se puede deshacer y se borrará para todos.</p>
        <div class="chat_modal_acts">
          <button class="chat_cancel" id="chatCancelDeleteBtn">Cancelar</button>
          <button class="chat_confirm" id="chatConfirmDeleteBtn">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
`;

// ─── Sidebar Skeleton HTML ────────────────────────────────────────────────────
function _sidebarSkeletons() {
  return Array(5).fill(0).map(() => /* html */`
    <div class="chat_sidebar_sk_item">
      <div class="chat_sidebar_sk_avatar smw_sk_el"></div>
      <div class="chat_sidebar_sk_info">
        <div class="chat_sidebar_sk_name smw_sk_el"></div>
        <div class="chat_sidebar_sk_sub smw_sk_el"></div>
      </div>
    </div>
  `).join('');
}

// ─── Message Skeletons HTML ───────────────────────────────────────────────────
function _skeletons() {
  const items = [
    { mine: false, w: '62%' },
    { mine: true,  w: '48%' },
    { mine: false, w: '75%' },
    { mine: true,  w: '55%' },
    { mine: false, w: '68%' },
  ];
  return items.map(({ mine, w }) => /* html */`
    <div class="chat_bubble_wrap ${mine ? 'mine' : 'other'}">
      ${!mine ? '<div class="chat_sk_avatar smw_sk_el"></div>' : ''}
      <div class="chat_sk_block">
        <div class="chat_sk_name smw_sk_el" style="width:90px;"></div>
        <div class="chat_sk_bubble smw_sk_el" style="width:${w};"></div>
      </div>
      ${mine ? '<div class="chat_sk_avatar smw_sk_el"></div>' : ''}
    </div>
  `).join('');
}

// ─── Avatar initials ──────────────────────────────────────────────────────────
const _initials = (nombre = '') => {
  const parts = nombre.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// ─── Avatar color (hashed from usuario string) ────────────────────────────────
const AVATAR_COLORS = [
  '#3b82f6','#f97316','#a855f7','#22c55e',
  '#ef4444','#0ea5e9','#eab308','#ec4899',
];
const _avatarColor = (str = '') => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

// ─── Render a single message bubble ──────────────────────────────────────────
const _bubbleHtml = (msg) => {
  if (msg.tipo === 'snapshot') return _snapshotHtml(msg);

  const autorKey = msg.usuario || msg.autor || '';
  const esMio    = autorKey && miUsuario && autorKey.toLowerCase().trim() === miUsuario.toLowerCase().trim();
  const color    = _avatarColor(autorKey);
  const initials = _initials(msg.nombre || autorKey || '?');
  const tiempo   = wiTiempo(msg.creado || msg.ts);
  const texto    = _escapeHtml(msg.texto || '').replace(/\n/g, '<br>');

  const esGestorOAdmin = wiAuth.user?.rol === 'gestor' || wiAuth.user?.rol === 'admin';
  const puedeEliminar  = esMio || esGestorOAdmin;

  const hasPhoto = msg.imagen;
  const avatar = /* html */`
    <div class="chat_avatar_wrap" title="${Capit(msg.nombre || autorKey || '')}">
      ${hasPhoto 
        ? `<img class="chat_avatar_img" src="${msg.imagen}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` 
        : ''
      }
      <div class="chat_avatar_fallback" style="background:${color}; ${hasPhoto ? 'display:none;' : ''}">
        ${initials}
      </div>
    </div>
  `;

  return /* html */`
    <div class="chat_bubble_wrap ${esMio ? 'mine' : 'other'} chat_msg_in ${msg.temp ? 'chat_msg_pending' : ''}" data-id="${msg.id || ''}">
      ${!esMio ? avatar : ''}
      <div class="chat_bubble_col">
        <div class="chat_bubble_meta ${esMio ? 'right' : ''}">
          <span class="chat_bubble_name">${Capit(msg.nombre || autorKey || 'Colaborador')}</span>
          <span class="chat_bubble_time">${tiempo}</span>
          ${puedeEliminar ? `<button class="chat_msg_delete_btn" data-id="${msg.id || ''}" title="Eliminar mensaje"><i class="fas fa-trash-alt"></i></button>` : ''}
        </div>
        <div class="chat_bubble ${esMio ? 'mine' : 'other'}">
          <span>${texto}</span>
        </div>
      </div>
      ${esMio ? avatar : ''}
    </div>
  `;
};

// ─── Snapshot card ────────────────────────────────────────────────────────────
const _snapshotHtml = (msg) => {
  const tiempo = wiTiempo(msg.creado || msg.ts);
  const texto  = _escapeHtml(msg.texto || '');
  return /* html */`
    <div class="chat_snapshot_card chat_msg_in">
      <div class="chat_snapshot_icon">📊</div>
      <div class="chat_snapshot_body">
        <div class="chat_snapshot_label">
          <i class="fas fa-chart-bar"></i> Snapshot del equipo
          <span class="chat_snapshot_time">${tiempo}</span>
        </div>
        <div class="chat_snapshot_text">${texto}</div>
      </div>
    </div>
  `;
};

// ─── Escape HTML ──────────────────────────────────────────────────────────────
const _escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// ─── Two-way synchronization of collaborator mentions ────────────────────────
const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const _syncSidebarSelection = () => {
  const text = $('#chatTextarea').val() || '';
  $('.chat_sidebar_item').each(function () {
    const fullName = ($(this).attr('data-nombre') || '').trim();
    if (!fullName) return;

    // Matches @FullName case-insensitively, ensuring it doesn't match a partial word accent boundary
    const regex = new RegExp('@' + escapeRegExp(fullName) + '(?![a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ])', 'i');

    if (regex.test(text)) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });
};

// ─── Render messages list ─────────────────────────────────────────────────────
const _renderMessages = (preventScroll = false) => {
  const $msgs = $('#chatMessages');

  if (!mensajes.length) {
    $msgs.html(/* html */`
      <div class="chat_empty">
        <div class="chat_empty_icon">💬</div>
        <p class="chat_empty_title">Sin mensajes aún</p>
        <p class="chat_empty_sub">¡Sé el primero en escribir!</p>
      </div>
    `);
    return;
  }

  let html = mensajes.map(_bubbleHtml).join('');
  if (tieneMasAnteriores && mensajes.length >= MSG_LIMIT) {
    html = `<div class="chat_paginate_container"><button class="chat_paginate_btn" id="chatPaginateBtn"><i class="fas fa-history"></i> Cargar anteriores (+5)</button></div>` + html;
  }
  $msgs.html(html);

  // Animate-in stagger
  $('#chatMessages .chat_msg_in').each(function (i) {
    $(this).css('animation-delay', `${i * 0.02}s`);
  });

  if (!preventScroll) {
    _scrollToBottom();
  }
};

// ─── Render Sidebar ───────────────────────────────────────────────────────────
const _renderSidebar = () => {
  const $list = $('#chatSidebarList');
  if (!$list.length) return;

  const filtered = colaboradores.filter(c => {
    const term = filterText.toLowerCase().trim();
    const nombre = (c.nombre || '').toLowerCase();
    const apellidos = (c.apellidos || '').toLowerCase();
    const usuario = (c.usuario || '').toLowerCase();
    return nombre.includes(term) || apellidos.includes(term) || usuario.includes(term);
  });

  $('#sidebarCount').text(filtered.length);

  if (!filtered.length) {
    $list.html(/* html */`
      <div class="chat_sidebar_empty">
        <i class="fas fa-search-minus"></i>
        <p class="chat_sidebar_empty_title">Sin resultados</p>
        <p class="chat_sidebar_empty_sub">Intenta buscar otra palabra</p>
      </div>
    `);
    return;
  }

  const html = filtered.map(col => {
    const isMe     = col.usuario === miUsuario;
    const initials = _initials(col.nombre || '?');
    const color    = _avatarColor(col.usuario || '');
    
    // Status color
    const isOnline = col.estado === 'activo';
    
    // Avatar image or fallback initials
    const photoUrl = col.imagen || col.avatar;
    const avatarHtml = photoUrl
      ? `<img class="chat_sidebar_avatar_img" src="${photoUrl}" alt="${col.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
      : '';

    const rawNombre = `${col.nombre || ''} ${col.apellidos || ''}`;
    const cleanNombre = rawNombre.replace(/\s+/g, ' ').trim();

    return /* html */`
      <div class="chat_sidebar_item ${isMe ? 'chat_sidebar_item_me' : ''}" data-usuario="${col.usuario}" data-nombre="${col.usuario}">
        <div class="chat_sidebar_avatar_wrap">
          ${avatarHtml}
          <div class="chat_sidebar_avatar_fallback" style="background:${color}; ${photoUrl ? 'display:none;' : ''}">
            ${initials}
          </div>
          <span class="chat_sidebar_avatar_dot ${isOnline ? 'online' : 'offline'}"></span>
        </div>
        <div class="chat_sidebar_info">
          <div class="chat_sidebar_name_row">
            <span class="chat_sidebar_name">${Capit(col.nombre)} ${Capit(col.apellidos || '')}</span>
            ${isMe ? '<span class="chat_sidebar_me_badge">Tú</span>' : ''}
          </div>
          <div class="chat_sidebar_status_row">
            <span class="chat_sidebar_role chat_badge_${col.rol || 'smile'}">
              ${col.rol === 'gestor' ? 'Gestor' : col.rol === 'admin' ? 'Admin' : 'Smile'}
            </span>
            <span class="chat_sidebar_username">@${col.usuario}</span>
          </div>
        </div>
        <div class="chat_sidebar_action" title="Mencionar">
          <i class="fas fa-at"></i>
        </div>
      </div>
    `;
  }).join('');

  $list.html(html);
  _syncSidebarSelection();
};

// ─── Scroll to bottom ─────────────────────────────────────────────────────────
const _scrollToBottom = (smooth = false) => {
  const el = document.getElementById('chatMessages');
  if (!el) return;
  el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'auto' });
};

// ─── Update online count ──────────────────────────────────────────────────────
const _updateOnlineCount = (count) => {
  $('#chatOnlineCount').text(count);
};

// ─── Load messages from Firestore ─────────────────────────────────────────────
const _loadMensajes = async (forceReload = false) => {
  if (cargando) return;
  cargando = true;

  // Try cache first
  if (!forceReload) {
    const cached = getls(CACHE_KEY);
    if (cached && Array.isArray(cached)) {
      mensajes = cached;
      tieneMasAnteriores = true;
      _renderMessages();
      cargando = false;
      return;
    }
  }

  // Show loading state on refresh
  if (forceReload) {
    $('#chatRefresh').addClass('chat_spinning');
  }

  $('#chatHeader').addClass('smw_loading');

  try {
    const q    = query(collection(db, 'chatSmiles'), orderBy('creado', 'desc'), limit(MSG_LIMIT));
    const snap = await getDocs(q);

    // Reverse so oldest is first
    const docs = snap.docs.reverse();
    mensajes = docs.map(d => ({ id: d.id, ...d.data() }));
    tieneMasAnteriores = snap.size >= MSG_LIMIT;

    // Cache results
    savels(CACHE_KEY, mensajes, CACHE_TTL);

    _renderMessages();

    // Count participants in last messages
    const uniqueAutors = new Set(mensajes.map(m => m.usuario || m.autor).filter(Boolean));
    _updateOnlineCount(uniqueAutors.size);

  } catch (err) {
    console.error('[Chat] loadMensajes error:', err);
    if (!mensajes.length) {
      $('#chatMessages').html(/* html */`
        <div class="chat_empty chat_empty_error">
          <div class="chat_empty_icon">⚠️</div>
          <p class="chat_empty_title">Error al cargar</p>
          <p class="chat_empty_sub">Revisa tu conexión e intenta de nuevo.</p>
          <button class="chat_retry_btn" id="chatRetry">
            <i class="fas fa-redo"></i> Reintentar
          </button>
        </div>
      `);
    }
    Notificacion('No se pudieron cargar los mensajes', 'error');
  } finally {
    cargando = false;
    $('#chatHeader').removeClass('smw_loading');
    $('#chatRefresh').removeClass('chat_spinning');
  }
};

// ─── Load previous messages (pagination) ──────────────────────────────────────
const _loadAnteriores = async () => {
  if (cargando || !tieneMasAnteriores || !mensajes.length) return;

  const $msgs = $('#chatMessages');
  const cursor = mensajes[0].creado || mensajes[0].ts;
  if (!cursor) {
    Notificacion('No se puede paginar: falta cursor de tiempo', 'warning');
    return;
  }

  cargando = true;
  const $btn = $('#chatPaginateBtn');
  $btn.prop('disabled', true).html('<i class="fas fa-circle-notch fa-spin"></i> Cargando anteriores...');

  try {
    const q = query(
      collection(db, 'chatSmiles'),
      orderBy('creado', 'desc'),
      startAfter(cursor),
      limit(PAGE_LIMIT)
    );
    const snap = await getDocs(q);

    if (snap.empty) {
      tieneMasAnteriores = false;
      _renderMessages(true);
      Notificacion('No hay más mensajes anteriores', 'info');
      return;
    }

    const docs = snap.docs.reverse();
    const nuevos = docs.map(d => ({ id: d.id, ...d.data() }));

    if (nuevos.length < PAGE_LIMIT) {
      tieneMasAnteriores = false;
    }

    // Save scroll position
    const scrollHeightBefore = $msgs[0].scrollHeight;
    const scrollTopBefore = $msgs[0].scrollTop;

    // Prepend to our state array
    mensajes = [...nuevos, ...mensajes];

    // Render and prevent automatic scroll to bottom
    _renderMessages(true);

    // Restore scroll position
    const scrollHeightAfter = $msgs[0].scrollHeight;
    $msgs[0].scrollTop = scrollTopBefore + (scrollHeightAfter - scrollHeightBefore);

    Notificacion(`Cargados ${nuevos.length} mensajes anteriores`, 'success');
  } catch (err) {
    console.error('[Chat] loadAnteriores error:', err);
    Notificacion('Error al cargar anteriores', 'error');
  } finally {
    cargando = false;
  }
};

// ─── Load collaborators list ──────────────────────────────────────────────────
const _loadColaboradores = async () => {
  try {
    const data = await cargarTodosEmpleados(true); // only active participants
    colaboradores = data;
    _renderSidebar();
  } catch (err) {
    console.error('[Chat] _loadColaboradores error:', err);
  }
};

// ─── Send message ─────────────────────────────────────────────────────────────
const _enviarMensaje = async () => {
  if (!puedeEnviar) return;

  const $ta    = $('#chatTextarea');
  const texto  = $ta.val().trim();

  if (!texto) return;
  if (texto.length > MAX_CHARS) {
    Notificacion(`El mensaje excede ${MAX_CHARS} caracteres`, 'warning');
    return;
  }

  // Clear input immediately in the UI to feel instant
  $ta.val('').trigger('input');
  _autoResize($ta[0]);

  // Create local optimistic message
  const tempId  = 'temp_' + Date.now() + Math.random().toString(36).substr(2, 5);
  const wi      = wiAuth.user;
  const userImg = wi?.imagen || wi?.avatar || '';

  const nuevoMsg = {
    id:      tempId,
    texto,
    usuario: miUsuario,
    email:   wi?.email || '',
    nombre:  miNombre,
    imagen:  userImg,
    creado:  new Date(), // Local fallback timestamp for instant render
    ts:      new Date(),
    tipo:    'texto',
    temp:    true // Flag for visual pending state
  };

  // Push to local array
  mensajes.push(nuevoMsg);

  // Render immediately and scroll to bottom
  _renderMessages(false);

  // Background send to Firestore
  addDoc(collection(db, 'chatSmiles'), {
    texto,
    usuario: miUsuario,
    email:   wi?.email || '',
    nombre:  miNombre,
    imagen:  userImg,
    creado:  serverTimestamp(),
    ts:      serverTimestamp(),
    tipo:    'texto',
  }).then((docRef) => {
    // Message successfully stored! Update temporary ID
    const idx = mensajes.findIndex(m => m.id === tempId);
    if (idx !== -1) {
      mensajes[idx].id = docRef.id;
      delete mensajes[idx].temp;

      // Update cache
      savels(CACHE_KEY, mensajes, CACHE_TTL);

      // Silent render update (prevent scrolling again if the user has scrolled up)
      _renderMessages(true);
    }
  }).catch((err) => {
    console.error('[Chat] Background send error:', err);
    Notificacion('No se pudo entregar el mensaje', 'error');

    // Remove the failed message
    mensajes = mensajes.filter(m => m.id !== tempId);
    savels(CACHE_KEY, mensajes, CACHE_TTL);
    _renderMessages(true);
  });
};

// ─── Auto-resize textarea ─────────────────────────────────────────────────────
const _autoResize = (el) => {
  if (!el) return;
  el.style.height = 'auto';
  const lineH  = 24;
  const maxH   = lineH * 4;
  el.style.height = Math.min(el.scrollHeight, maxH) + 'px';
  el.style.overflowY = el.scrollHeight > maxH ? 'auto' : 'hidden';
};

// ─── Update UI based on send permission ───────────────────────────────────────
const _updateSendUI = () => {
  const $ta   = $('#chatTextarea');
  const $btn  = $('#chatSendBtn');
  const $blk  = $('#chatBlockedMsg');

  if (puedeEnviar) {
    $ta.prop('disabled', false).attr('placeholder', 'Escribe un mensaje…');
    $btn.prop('disabled', false).removeClass('chat_send_disabled');
    $blk.hide();
  } else {
    $ta.prop('disabled', true).attr('placeholder', 'No puedes enviar mensajes (participación inactiva)');
    $btn.prop('disabled', true).addClass('chat_send_disabled');
    $blk.show();
  }
};

// ─── init ─────────────────────────────────────────────────────────────────────
export const init = async () => {
  // 1. Immediately show UI
  $('.chat_wrap').addClass('visible');
  window.__WIREADY__ = true;

  // 2. Determine current user from wiAuth cache
  const wi = wiAuth.user;
  if (wi) {
    miUsuario   = wi.usuario || wi.email || '';
    miNombre    = wi.nombre  || wi.usuario || 'Colaborador';
    puedeEnviar = wi.participa === 'si';
  }

  // 3. Update input UI
  _updateSendUI();

  // 4. Load messages
  _loadMensajes(false);

  // 5. Load collaborators sidebar list
  _loadColaboradores();

  // 6. Auto-refresh every 30s
  refreshTimer = setInterval(() => {
    savels(CACHE_KEY, null, 0); // bust cache
    _loadMensajes(true);
    _loadColaboradores();
  }, REFRESH_MS);

  // ── Events ────────────────────────────────────────────────────────────────

  // Textarea auto-resize & mention synchronization
  $(document).on(`input${NS}`, '#chatTextarea', function () {
    _autoResize(this);
    _syncSidebarSelection();
  });

  // Send on Enter (Shift+Enter = newline)
  $(document).on(`keydown${NS}`, '#chatTextarea', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      _enviarMensaje();
    }
  });

  // Send button click
  $(document).on(`click${NS}`, '#chatSendBtn', () => _enviarMensaje());

  // Refresh button
  $(document).on(`click${NS}`, '#chatRefresh', async function () {
    savels(CACHE_KEY, null, 0);
    tieneMasAnteriores = true;
    await _loadMensajes(true);
    await _loadColaboradores();
    Notificacion('Mensajes actualizados', 'success');
  });

  // Pagination button click
  $(document).on(`click${NS}`, '#chatPaginateBtn', () => _loadAnteriores());

  // Delete message click: open custom modal
  $(document).on(`click${NS}`, '.chat_msg_delete_btn', function () {
    const id = $(this).attr('data-id');
    if (!id) return;
    msgIdAEliminar = id;
    $('#chatEliminarModal').addClass('show');
  });

  // Cancel deletion or backdrop click
  $(document).on(`click${NS}`, '#chatCancelDeleteBtn, #chatEliminarModal', function (e) {
    if ($(e.target).is('#chatCancelDeleteBtn, #chatEliminarModal')) {
      $('#chatEliminarModal').removeClass('show');
      msgIdAEliminar = null;
    }
  });

  // Confirm deletion click with wiSpin and blocking execution
  $(document).on(`click${NS}`, '#chatConfirmDeleteBtn', async function () {
    if (!msgIdAEliminar) return;
    const btn = this;
    wiSpin(btn, true, 'Eliminando...');

    try {
      const id = msgIdAEliminar;
      await deleteDoc(doc(db, 'chatSmiles', id));
      Notificacion('Mensaje eliminado permanentemente', 'success');

      // Close modal and clean up state
      $('#chatEliminarModal').removeClass('show');
      msgIdAEliminar = null;

      // Premium fadeOut animation of the bubble
      const $bubbleWrap = $(`.chat_bubble_wrap[data-id="${id}"]`);
      if ($bubbleWrap.length) {
        $bubbleWrap.fadeOut(300, function () {
          $(this).remove();
          mensajes = mensajes.filter(m => m.id !== id);
          savels(CACHE_KEY, mensajes, CACHE_TTL);
        });
      } else {
        // Fallback in case element isn't found
        mensajes = mensajes.filter(m => m.id !== id);
        savels(CACHE_KEY, mensajes, CACHE_TTL);
        _renderMessages(true);
      }
    } catch (err) {
      console.error('[Chat] deleteDoc error:', err);
      Notificacion('Error al eliminar mensaje', 'error');
    } finally {
      wiSpin(btn, false, 'Eliminar');
    }
  });

  // Sidebar search input keyup
  $(document).on(`input${NS}`, '#chatSearchInput', function () {
    filterText = $(this).val();
    _renderSidebar();
  });

  // Click on collaborator to mention them (Smart Toggle Selection V3)
  $(document).on(`click${NS}`, '.chat_sidebar_item', function (e) {
    if (!puedeEnviar) return;

    const fullName = ($(this).attr('data-nombre') || '').trim();
    const $ta      = $('#chatTextarea');
    const isActive = $(this).hasClass('active');

    let currentText = $ta.val();
    const mention   = `@${fullName}`;

    if (isActive) {
      // Deselect: remove all case-insensitive mentions of this collaborator
      const escaped = fullName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Matches @fullName with optional trailing whitespace, case-insensitively
      const regex = new RegExp('@' + escaped + '(?![a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ])\\s*', 'gi');
      currentText = currentText.replace(regex, '');
      
      // Clean up consecutive spaces and trim
      currentText = currentText.replace(/\s+/g, ' ').trim();
      $ta.val(currentText ? currentText + ' ' : '');
    } else {
      // Select: append mention at the end
      const prefix = currentText ? (currentText.endsWith(' ') ? '' : ' ') : '';
      $ta.val(currentText + prefix + mention + ' ');
    }

    // Trigger events to update textarea resize and two-way sidebar selection
    $ta.trigger('input');
    $ta.focus();
    _autoResize($ta[0]);

    // If mobile, automatically close the sidebar view
    $('#chatContainer').removeClass('chat_sidebar_active');
  });

  // Toggle sidebar on mobile
  $(document).on(`click${NS}`, '#chatSidebarToggle', function () {
    $('#chatContainer').addClass('chat_sidebar_active');
  });

  $(document).on(`click${NS}`, '#chatSidebarClose', function () {
    $('#chatContainer').removeClass('chat_sidebar_active');
  });

  // Retry button
  $(document).on(`click${NS}`, '#chatRetry', () => {
    $('#chatMessages').html(_skeletons());
    $('#chatSidebarList').html(_sidebarSkeletons());
    _loadMensajes(true);
    _loadColaboradores();
  });

  // Scroll to bottom on focus (mobile)
  $(document).on(`focus${NS}`, '#chatTextarea', function () {
    setTimeout(() => _scrollToBottom(true), 350);
  });
};

// ─── cleanup ──────────────────────────────────────────────────────────────────
export const cleanup = () => {
  $(document).off(NS);
  clearInterval(refreshTimer);
  refreshTimer = null;

  // Reset state
  mensajes      = [];
  colaboradores = [];
  filterText    = '';
  enviando      = false;
  puedeEnviar   = false;
  miUsuario     = '';
  miNombre      = '';
  cargando      = false;
  tieneMasAnteriores = true;
  msgIdAEliminar = null;
};
