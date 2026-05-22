import './verificar.css';
import $ from 'jquery';
import { rutas } from '../rutas.js';
import { Mensaje, wiAuth, getls } from '../widev.js';
import { db, auth } from '../firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// ── ESPERAR SESIÓN DE FIREBASE ───────────────────────────────────────────────
const waitAuth = () => new Promise(r => {
  if (auth.currentUser) return r(auth.currentUser);
  const unsub = onAuthStateChanged(auth, u => { unsub(); r(u); });
});

// ── TOTP NATIVO (Web Crypto API — sin dependencias) ───────────────────────────
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

const b32decode = str => {
  let bits = 0, val = 0;
  const out = [];
  for (const c of str.replace(/=+$/, '').toUpperCase())
    { val = (val << 5) | B32.indexOf(c); bits += 5; if (bits >= 8) { out.push((val >>> (bits - 8)) & 0xff); bits -= 8; } }
  return new Uint8Array(out);
};

const generateSecret = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  return Array.from(bytes, b => B32[b & 31]).join('');
};

const totpToken = async (secret, offset = 0) => {
  const epoch = Math.floor(Date.now() / 30000) + offset;
  const cnt   = new ArrayBuffer(8);
  new DataView(cnt).setUint32(4, epoch, false);
  const key = await crypto.subtle.importKey('raw', b32decode(secret), { name:'HMAC', hash:'SHA-1' }, false, ['sign']);
  const sig  = new Uint8Array(await crypto.subtle.sign('HMAC', key, cnt));
  const off  = sig[19] & 0xf;
  const code = ((sig[off] & 0x7f) << 24 | sig[off+1] << 16 | sig[off+2] << 8 | sig[off+3]) % 1_000_000;
  return code.toString().padStart(6, '0');
};

const verifyTOTP = async (token, secret) => {
  for (const d of [-1, 0, 1]) if (await totpToken(secret, d) === token) return true;
  return false;
};

// ── GUARD DE SEGURIDAD ────────────────────────────────────────────────────────
const guard = (user) => {
  const wi = getls('wiSmile');
  if (!user || !wi)                                        return (rutas.navigate('/login'), false);
  if (wi.rol !== 'admin')                                  return (rutas.navigate('/'), false);
  if (wi.estado !== 'activo')                              return (rutas.navigate('/registrado'), false);
  if (sessionStorage.getItem('vault_unlocked') === 'true') return (rutas.navigate('/admin'), false);
  return wi;
};

// ── SVG LOGO GOOGLE AUTHENTICATOR (Premium) ───────────────────────────────────
const SVG_GOOGLE_AUTH = `
  <svg viewBox="0 0 100 100" class="vault_svg_logo" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g_glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#4285F4"/>
        <stop offset="33%" stop-color="#EA4335"/>
        <stop offset="66%" stop-color="#FBBC05"/>
        <stop offset="100%" stop-color="#34A853"/>
      </linearGradient>
    </defs>
    <!-- Glowing ring -->
    <circle cx="50" cy="50" r="46" fill="none" stroke="url(#g_glow)" stroke-width="3" opacity="0.3" class="vault_glow_ring"/>
    <!-- Outer white dial with shadow -->
    <circle cx="50" cy="50" r="38" fill="var(--wb, #fff)" style="filter: drop-shadow(0px 8px 16px rgba(0,0,0,0.12))"/>
    
    <!-- Google Colors Dial segments -->
    <path d="M 50,18 A 32,32 0 0,1 82,50 L 50,50 Z" fill="#4285F4"/>
    <path d="M 82,50 A 32,32 0 0,1 50,82 L 50,50 Z" fill="#EA4335"/>
    <path d="M 50,82 A 32,32 0 0,1 18,50 L 50,50 Z" fill="#FBBC05"/>
    <path d="M 18,50 A 32,32 0 0,1 50,18 L 50,50 Z" fill="#34A853"/>
    
    <!-- White center hub with a lock keyhole -->
    <circle cx="50" cy="50" r="16" fill="var(--wb, #fff)"/>
    <circle cx="50" cy="46" r="4.5" fill="#1e293b"/>
    <path d="M 47.5,46 L 52.5,46 L 54,58 L 46,58 Z" fill="#1e293b"/>
  </svg>
`;

// ── INNER TEMPLATES ───────────────────────────────────────────────────────────
const HTML_INNER_SETUP = `
  <div class="vault_badge">Admin</div>
  <h1 class="vault_title">Configura tu Bóveda</h1>
  <p class="vault_subtitle">Escanea este código QR con <strong>Google Authenticator</strong> para proteger el panel de administración.</p>

  <div id="vault_qr_wrap" class="vault_qr_wrap">
    <canvas id="vault_qr"></canvas>
    <div class="vault_qr_shine"></div>
  </div>
  <p class="vault_qr_hint"><i class="fas fa-info-circle"></i> Abre Google Authenticator → Añadir cuenta → Escanear QR</p>

  <div class="vault_auth_box" style="margin-top:1.5rem">
    <label>Ingresa el código de 6 dígitos para confirmar</label>
    <div class="vault_input_wrap">
      <i class="fas fa-th"></i>
      <input type="text" id="vault_code_setup" placeholder="000000" maxlength="6" autocomplete="off" inputmode="numeric" />
    </div>
    <button id="btn_vault_confirmar" class="vault_btn_primary" disabled>
      <i class="fas fa-lock"></i> Confirmar y Cerrar Puerta
    </button>
  </div>
`;

const HTML_INNER_UNLOCK = `
  <h1 class="vault_title">Verificar que eres tú</h1>
  <p class="vault_subtitle">Abre <strong>Google Authenticator</strong> en tu celular e ingresa el código de 6 dígitos.</p>

  <div class="vault_auth_box">
    <div class="vault_input_wrap vault_input_lg">
      <i class="fas fa-th"></i>
      <input type="text" id="vault_code" placeholder="000000" maxlength="6"
             autocomplete="off" inputmode="numeric" autofocus />
    </div>
    <button id="btn_code" class="vault_btn_primary">
      <i class="fas fa-unlock"></i> Verificar y Entrar
    </button>
  </div>

  <button id="btn_vault_back" class="vault_btn_back">
    <i class="fas fa-arrow-left"></i> Volver al inicio
  </button>
`;

// ── STATE ─────────────────────────────────────────────────────────────────────
let _secret = null;
let _isSetup = false;
let _intervaloTimer = null;
const TIEMPO_LIMITE = 60; // segundos (configurable)

// ── TEMPORIZADOR AUTO-LOGOUT PERSISTENTE (localStorage) ──
function _iniciarTimer() {
  if (_intervaloTimer) clearInterval(_intervaloTimer);
  
  let expire = localStorage.getItem('vault_expire');
  if (!expire) {
    expire = Date.now() + (TIEMPO_LIMITE * 1000);
    localStorage.setItem('vault_expire', expire);
  }
  
  const calcularSegundos = () => Math.max(0, Math.ceil((parseInt(expire) - Date.now()) / 1000));
  let segundos = calcularSegundos();
  
  $('#vault_timer').text(`${segundos}s`);
  
  const tick = async () => {
    segundos = calcularSegundos();
    $('#vault_timer').text(`${segundos}s`);
    
    if (segundos <= 0) {
      if (_intervaloTimer) clearInterval(_intervaloTimer);
      _intervaloTimer = null;
      localStorage.removeItem('vault_expire');
      Mensaje('Sesión cerrada por inactividad', 'error');
      
      const { salir } = await import('../web/login.js');
      await salir();
    }
  };
  
  tick(); // Verificar inmediatamente
  if (segundos > 0) {
    _intervaloTimer = setInterval(tick, 1000);
  }
}

// ── RENDER ────────────────────────────────────────────────────────────────────
// Renderizamos sincrónicamente el esqueleto de la bóveda para evitar pantallas blancas en F5
export const render = () => {
  const wi = getls('wiSmile');
  if (!wi || wi.rol !== 'admin') return '';

  return `
    <div class="vault_wrap">
      <div class="vault_card" id="vault_card_container">
        <div class="vault_timer_band">
          <i class="fas fa-clock fa-spin"></i> Cierre de seguridad en <strong id="vault_timer">60s</strong>
        </div>
        <div class="vault_logo_wrapper">
          ${SVG_GOOGLE_AUTH}
        </div>
        <div id="vault_content_area" style="text-align:center;padding:1rem 0">
          <i class="fas fa-spinner fa-spin fa-2x" style="color:var(--tx3,#aaa)"></i>
          <p style="margin-top:1rem;color:var(--tx2)">Cargando Autenticación...</p>
        </div>
      </div>
    </div>
  `;
};

export const init = async () => {
  // 1. Activar el bloqueo Zero-Trust y arrancar el temporizador de inmediato
  $('body').addClass('is-vault-locked');
  _iniciarTimer();

  // 2. Blindaje Programático "Top Mundial": Bloquear navegación, clic derecho, copiar, pegar y shortcuts de desarrollador
  $(document).off('.vault_shield');

  // A. Interceptar clics en enlaces
  $(document).on('click.vault_shield', 'a, [href], .nv_item', function(e) {
    if ($('body').hasClass('is-vault-locked')) {
      const $el = $(this);
      if ($el.attr('id') === 'btn_vault_back' || $el.closest('#btn_vault_back').length) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      Mensaje('<i class="fas fa-exclamation-triangle"></i> Identidad no verificada. Completa el 2FA primero.', 'warning');
    }
  });

  // B. Bloquear Clic Derecho (Context Menu)
  $(document).on('contextmenu.vault_shield', function(e) {
    if ($('body').hasClass('is-vault-locked')) {
      e.preventDefault();
      Mensaje('<i class="fas fa-eye-slash"></i> Clic derecho inhabilitado por seguridad.', 'warning');
    }
  });

  // C. Bloquear Copiar, Cortar y Pegar
  $(document).on('copy.vault_shield cut.vault_shield paste.vault_shield', 'input, body', function(e) {
    if ($('body').hasClass('is-vault-locked')) {
      e.preventDefault();
      Mensaje('<i class="fas fa-key"></i> Copiar y pegar inhabilitado en esta boveda.', 'warning');
    }
  });

  // D. Bloquear F12, Ctrl+U (Código Fuente), Ctrl+Shift+I/J/C (DevTools), Ctrl+S (Guardar), Ctrl+P (Imprimir)
  $(document).on('keydown.vault_shield', function(e) {
    if (!$('body').hasClass('is-vault-locked')) return;

    // F12 (keyCode 123)
    if (e.keyCode === 123) {
      e.preventDefault();
      Mensaje('<i class="fas fa-shield-alt"></i> DevTools bloqueado por seguridad.', 'error');
      return false;
    }

    // Combinaciones con Ctrl o Cmd (Mac)
    if (e.ctrlKey || e.metaKey) {
      const key = String.fromCharCode(e.keyCode).toLowerCase();
      
      // Ctrl+U, Ctrl+S, Ctrl+P, o Ctrl+Shift+I/J/C
      if (key === 'u' || key === 's' || key === 'p' || (e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))) {
        e.preventDefault();
        Mensaje('<i class="fas fa-shield-alt"></i> Combinación de teclas restringida en esta zona.', 'error');
        return false;
      }
    }
  });

  // 3. Esperar la inicialización asíncrona de Firebase Auth
  const user = await waitAuth();
  const wi = guard(user);
  if (!wi) return;

  try {
    const cfgDoc = await getDoc(doc(db, 'configwii', wi.usuario));
    const cfg    = cfgDoc.exists() ? cfgDoc.data() : null;

    if (cfg?.configurado && cfg?.secret) {
      // ── MODO UNLOCK ──
      _isSetup = false;
      _secret  = cfg.secret;
      $('#vault_card_container').removeClass('vault_card_setup');
      $('#vault_content_area').html(HTML_INNER_UNLOCK);
      _initUnlock(wi);
    } else {
      // ── MODO SETUP ──
      _isSetup = true;
      $('#vault_card_container').addClass('vault_card_setup');
      $('#vault_content_area').html(HTML_INNER_SETUP);
      await _initSetup(wi);
    }
  } catch(e) {
    console.error('[verificar] init:', e);
    Mensaje('Error al cargar la bóveda', 'error');
  }
};

// ── SETUP ─────────────────────────────────────────────────────────────────────
async function _initSetup(wi) {
  const QRCode = await import('qrcode');

  _secret = generateSecret();

  const issuer  = 'RetoDelMes';
  const sm       = getls('wiSmile');
  const account  = encodeURIComponent(sm?.usuario || wi.usuario);
  const otpauth  = `otpauth://totp/${issuer}:${account}?secret=${_secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;

  // Renderizar QR en canvas
  await QRCode.toCanvas(document.getElementById('vault_qr'), otpauth, {
    width: 200, margin: 2,
    color: { dark: '#0f172a', light: '#ffffff' },
  });

  // Validar código en tiempo real
  $(document).on('input.vault', '#vault_code_setup', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
    $('#btn_vault_confirmar').prop('disabled', this.value.length !== 6);
  });

  $(document).on('click.vault', '#btn_vault_confirmar', async function() {
    const code = $('#vault_code_setup').val().trim();
    if (code.length !== 6) return;

    const valido = await verifyTOTP(code, _secret);
    if (!valido) {
      Mensaje('<i class="fas fa-times-circle"></i> Código incorrecto, intenta de nuevo', 'error');
      $('#vault_code_setup').val('').focus();
      return;
    }

    const $btn = $(this);
    $btn.html('<i class="fas fa-spinner fa-spin"></i> Guardando...').prop('disabled', true);

    try {
      await setDoc(doc(db, 'configwii', wi.usuario), {
        configurado: true,
        secret:      _secret,
        email:       wi.email || '',
        creado:      serverTimestamp(),
        actualizado: serverTimestamp(),
      });

      Mensaje('<i class="fas fa-lock"></i> ¡Bóveda configurada! Bienvenido al panel.', 'success');
      _desbloquear();
    } catch(e) {
      console.error('[verificar] setup save:', e);
      Mensaje('Error al guardar la configuración', 'error');
      $btn.html('<i class="fas fa-lock"></i> Confirmar y Cerrar Puerta').prop('disabled', false);
    }
  });
}

// ── UNLOCK ────────────────────────────────────────────────────────────────────
function _initUnlock(wi) {
  setTimeout(() => $('#vault_code').focus(), 100);

  $(document).on('input.vault', '#vault_code', function() {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value.length === 6) $('#btn_code').click();
  });

  $(document).on('click.vault', '#btn_code', async function() {
    const code = $('#vault_code').val().trim();
    if (code.length !== 6) return Mensaje('Ingresa los 6 dígitos', 'warning');

    const $btn = $(this);
    const orig = $btn.html();
    $btn.html('<i class="fas fa-spinner fa-spin"></i> Verificando...').prop('disabled', true);

    try {
      const valido = await verifyTOTP(code, _secret);

      if (valido) {
        Mensaje('<i class="fas fa-unlock"></i> ¡Bóveda desbloqueada!', 'success');
        _desbloquear();
      } else {
        Mensaje('<i class="fas fa-times-circle"></i> Código incorrecto o expirado', 'error');
        $('#vault_code').val('').focus();
        $btn.html(orig).prop('disabled', false);
      }
    } catch(e) {
      console.error('[verificar] unlock:', e);
      $btn.html(orig).prop('disabled', false);
    }
  });

  $(document).on('click.vault', '#btn_vault_back', () => {
    localStorage.removeItem('vault_expire');
    rutas.navigate('/');
  });
}

// ── DESBLOQUEAR ───────────────────────────────────────────────────────────────
function _desbloquear() {
  if (_intervaloTimer) { clearInterval(_intervaloTimer); _intervaloTimer = null; }
  localStorage.removeItem('vault_expire');
  $('body').removeClass('is-vault-locked');
  sessionStorage.setItem('vault_unlocked', 'true');
  window.location.href = '/admin';
}

export const cleanup = () => {
  if (_intervaloTimer) { clearInterval(_intervaloTimer); _intervaloTimer = null; }
  $('body').removeClass('is-vault-locked');
  $(document).off('.vault');
  $(document).off('.vault_shield');
};
