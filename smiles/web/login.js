import './login.css';
import $ from 'jquery';
import { auth, db } from '../firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile,
         sendEmailVerification, sendPasswordResetEmail, signOut, GoogleAuthProvider, signInWithPopup, updatePassword } from 'firebase/auth';
import { setDoc, getDoc, getDocs, doc, collection, query, where, serverTimestamp } from 'firebase/firestore';
import { wiTip, Mensaje, savels, getls, wiSpin, wiAuth, abrirModal, cerrarTodos } from '../widev.js';
import { rutas } from '../rutas.js';
import { app} from '../wii.js';

export { auth, signOut };

// ── CONFIG ───────────────────────────────────────────────────────────────────
const cfg = { db: 'smiles', pagina: 'rol' };
let modal = 'si', link = 'si', restablecer = 'si', login = 'si', registrar = 'si';

// Ruta por rol
const ROL_PATH = { smile: '/registrar', gestor: '/gestor', empresa: '/empresa', admin: '/admin' };
const SEGMENTO_MAP = { smile: 'creador', gestor: 'negocio', empresa: 'empresa' };

const err = {
  'auth/email-already-in-use':'Email ya registrado', 'auth/weak-password':'Contraseña débil (mín. 6)',
  'auth/invalid-credential':'Contraseña incorrecta', 'auth/invalid-email':'Email no válido',
  'auth/missing-email':'Usuario no registrado',      'auth/too-many-requests':'Demasiados intentos'
};

// ── SANITIZACIÓN ESTRICTA (Anti-XSS / SQLi) ──────────────────────────────────
const sanName = v => v.replace(/[<>="'`;/\\$}{]/g, '').replace(/\s+/g, ' ').trim();
const sanEmail = v => v.replace(/[<>="'`;/\\$}{ ]/g, '').toLowerCase().trim();
const sanUser = v => v.toLowerCase().replace(/[^a-z0-9_-]/g, '').trim();

const reglas = {
  regEmail:     [sanEmail, v => /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v) || 'Email inválido'],
  regUsuario:   [sanUser,  v => v.length >= 4 || 'Mínimo 4 caracteres'],
  regNombre:    [sanName,  v => v.length > 0 || 'Ingresa tu nombre'],
  regApellidos: [sanName,  v => v.length > 0 || 'Ingresa tus apellidos'],
  regPassword:  [v => v,   v => v.length >= 6 || 'Mínimo 6 caracteres'],
  regPassword1: [v => v,   v => v === $('#regPassword').val() || 'No coinciden']
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
const campo = (ico, tipo, id, place, ojo = false) =>
  `<div class="wilg_grupo"><i class="fas fa-${ico}"></i><input type="${tipo}" id="${id}" placeholder="${place}" autocomplete="off">${ojo ? '<i class="fas fa-eye wilg_ojo"></i>' : ''}</div>`;



// ── TEMPLATES ────────────────────────────────────────────────────────────────
const tpl = {
  login: () => `
    <div class="wilg_head">
      <div class="wilg_logo"><img src="${import.meta.env.BASE_URL}smile.avif" alt="${app}"></div>
      <h2>Bienvenido</h2><p>Inicia sesión en tu cuenta</p>
    </div>
    <button type="button" class="wilg_btn_google" id="btnGoogle"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"> Continuar con Google</button>
    <div class="wilg_or"><span>o usa tu email</span></div>
    ${campo('envelope','text','email','Email o usuario')}
    ${campo('lock','password','password','Contraseña',true)}
    <button type="button" id="Login" class="wilg_btn inactivo"><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</button>
    ${(restablecer==='si'||registrar==='si') ? `<div class="wilg_links">
      ${restablecer==='si' ? '<span class="wilg_rec"><i class="fas fa-key"></i> ¿Olvidaste tu contraseña?</span>' : ''}
      ${registrar==='si'   ? '<span class="wilg_reg">Crear cuenta <i class="fas fa-arrow-right"></i></span>' : ''}
    </div>` : ''}`,

  registrar: () => `
    <div class="wilg_head">
      <div class="wilg_logo"><img src="${import.meta.env.BASE_URL}smile.avif" alt="${app}"></div>
      <h2>Crear Cuenta</h2><p>Únete a la comunidad</p>
    </div>
    <button type="button" class="wilg_btn_google" id="btnGoogle"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"> Continuar con Google</button>
    <div class="wilg_or"><span>o usa tu email</span></div>
    <div class="wilg_grid">
      ${[['envelope','email','regEmail','Email'],['user','text','regUsuario','Usuario'],
         ['user-tie','text','regNombre','Nombre'],['user-tie','text','regApellidos','Apellidos']]
        .map(([i,t,id,p]) => campo(i,t,id,p)).join('')}
      ${campo('lock','password','regPassword','Contraseña',true)}
      ${campo('lock','password','regPassword1','Confirmar contraseña',true)}
    </div>



    <div class="wilg_check">
      <label><input type="checkbox" id="regTerminos">
      <span>Acepto los <a href="/terminos" target="_blank">términos y condiciones</a></span></label>
    </div>
    <button type="button" id="Registrar" class="wilg_btn inactivo"><i class="fas fa-user-plus"></i> Registrarme</button>
    <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Ya tengo cuenta</span></div>`,

  restablecer: () => `
    <div class="wilg_head">
      <div class="wilg_logo wilg_logo_sm"><img src="${import.meta.env.BASE_URL}smile.avif" alt="${app}"></div>
      <h2>Recuperar</h2><p>Te enviaremos un enlace a tu email</p>
    </div>
    ${campo('envelope','text','recEmail','Email o usuario')}
    <button type="button" id="Recuperar" class="wilg_btn"><i class="fas fa-paper-plane"></i> Enviar enlace</button>
    <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Volver</span></div>`,

  username: () => `
    <div class="wilg_head">
      <div class="wilg_logo"><img src="${import.meta.env.BASE_URL}smile.avif" alt="${app}"></div>
      <h2>¡Casi listo!</h2><p>Completa tus datos de acceso</p>
    </div>
    ${campo('user','text','regUsuarioGoogle','Ingresa un usuario (ej: marcos)')}
    ${campo('lock','password','regPasswordGoogle','Crea una contraseña segura', true)}
    

    <div class="wilg_check" style="margin-top: 1.5vh;">
      <label><input type="checkbox" id="regTerminosGoogle">
      <span>Acepto los <a href="/terminos" target="_blank">términos y condiciones</a></span></label>
    </div>
    <button type="button" id="CompletarGoogle" class="wilg_btn inactivo" style="margin-top: 1.5vh;"><i class="fas fa-rocket"></i> Completar Registro</button>
  `
};

// ── MODAL ────────────────────────────────────────────────────────────────────
const modalHTML = (vista, cls = '') =>
  `<div id="wilg_modal" class="wiModal wilg_mod ${cls}"><div class="modalBody"><button class="modalX">&times;</button>
   <form id="liForm">${tpl[vista]()}</form></div></div>`;

const inyectarModal = (vista = 'login') => {
  $('#wilg_modal').remove();
  const cls = vista === 'registrar' ? 'wilg_mod_reg' : '';
  $('body').append(modalHTML(vista, cls));
  setTimeout(() => { abrirModal('wilg_modal'); $('#liForm input:first').focus(); }, 50);
};

const mostrarModal = v => {
  const cls = v === 'registrar' ? 'wilg_mod_reg' : '';
  $('#wilg_modal').toggleClass('wilg_mod_reg', cls === 'wilg_mod_reg');
  $('#liForm').html(tpl[v]()).attr('data-vista', v);
  setTimeout(() => $('#liForm input:first').focus(), 30);
};

// ── RENDER (PÁGINA) ──────────────────────────────────────────────────────────
export const render = () => (link !== 'si' || wiAuth.user)
  ? ''
  : `<div class="wilg_wrap"><div class="wilg_card"><form id="liForm"></form></div></div>`;

export const init = () => {
  if (link !== 'si') { setTimeout(() => rutas.navigate('/'), 0); return; }
  const wi = wiAuth.user;
  if (wi) { setTimeout(() => rutas.navigate(ROL_PATH[wi.rol] || '/'), 0); return; }
  mostrar('login');
};

const mostrar = v => { $('#liForm').html(tpl[v]()).attr('data-vista', v); setTimeout(() => $('#liForm input:first').focus(), 30); };

// ── UTILS ────────────────────────────────────────────────────────────────────
const val     = id => $(`#${id}`).val().trim();
const esModal = () => $('#wilg_modal.active').length > 0;
const swap    = v  => esModal() ? mostrarModal(v) : mostrar(v);
const accion  = async (btn, txt, fn) => {
  wiSpin(btn, true, txt);
  try { await fn(); } catch(e) { Mensaje(err[e.code] || e.message, 'error'); }
  finally { wiSpin(btn, false); }
};

// Resuelve email desde username
const fetchUser = async input => {
  if (input.includes('@')) return { email: input, wi: null };
  const snap = await getDoc(doc(db, 'smiles', input));
  if (!snap.exists()) throw new Error('Usuario no encontrado');
  return { email: snap.data().email, wi: snap.data() };
};

const tema = t => {
  if (!t) return;
  const [n, c] = t.split('|');
  document.documentElement.dataset.theme = n;
  $('meta[name="theme-color"]').attr('content', c);
  $('.tema').removeClass('mtha').filter(`[data-ths="${t}"]`).addClass('mtha');
};

const redir = wi => {
  if (cfg.pagina === 'actual') return;
  const ruta = cfg.pagina === 'rol' ? (ROL_PATH[wi?.rol] || '/') : cfg.pagina;
  rutas.navigate(ruta);
};

const entrar = wi => {
  wiAuth.login(wi, 7, ['wiSmart']);
  if (wi?.tema) { localStorage.wiTema = wi.tema; tema(wi.tema); }
  if (esModal()) cerrarTodos();
  Mensaje(`<i class="fa-solid fa-hand-wave"></i> Bienvenido ${wi?.nombre || ''}`, 'success');
  redir(wi);
};

// ── EVENTOS ──────────────────────────────────────────────────────────────────
$(document)
  .on('submit.wi', '#liForm', e => e.preventDefault())
  .on('click.wi', '.wilg_ojo', function () {
    const $i = $(this).siblings('input');
    $i.attr('type', $i.attr('type') === 'password' ? 'text' : 'password');
    $(this).toggleClass('fa-eye fa-eye-slash');
  })
  // Sanitización en tiempo real (Blindaje Pro)
  .on('input.wi', '#email, #recEmail, #regEmail', function() { $(this).val($(this).val().replace(/[<>="'`;/\\$}{ ]/g, '').toLowerCase()); })
  .on('input.wi', '#regUsuario, #regUsuarioGoogle', function() { $(this).val($(this).val().toLowerCase().replace(/[^a-z0-9_-]/g, '')); })
  .on('input.wi', '#regNombre, #regApellidos', function() { $(this).val($(this).val().replace(/[<>="'`;/\\$}{]/g, '')); })
  
  .on('click.wi', '.wilg_reg', () => { registrar === 'si' && swap('registrar'); })
  .on('click.wi', '.wilg_rec', () => { restablecer === 'si' && swap('restablecer'); })
  .on('click.wi', '.wilg_log', () => swap('login'))
  .on('input.wi keyup.wi', '#password',     e => { $('#Login').removeClass('inactivo');     e.key === 'Enter' && $('#Login').click(); })
  .on('input.wi keyup.wi', '#regPassword1', e => { $('#Registrar').removeClass('inactivo'); e.key === 'Enter' && $('#Registrar').click(); })
  .on('input.wi keyup.wi', '#recEmail',     e => { e.key === 'Enter' && $('#Recuperar').trigger('click'); })
  .on('blur.wi', Object.keys(reglas).map(id => `#${id}`).join(','), function () {
    const raw = $(this).val(); if (!raw) return;
    const [trans, vld] = reglas[this.id];
    const v = trans(raw); $(this).val(v);
    const r = vld(v); r !== true && wiTip(this, r, 'error', 2500);
  })
  .on('blur.wi', '#regUsuario', async function () {
    const u = val('regUsuario'); if (!u || u.length < 3) return;
    if (u.includes('@')) return ($(this).data('ok', false), wiTip(this, 'No puede contener @', 'error', 2500));
    const libre = !(await getDoc(doc(db, 'smiles', u))).exists();
    $(this).data('ok', libre);
    wiTip(this, `Usuario ${libre ? 'disponible <i class="fa-solid fa-check-circle"></i>' : 'no disponible <i class="fa-solid fa-times-circle"></i>'}`, libre ? 'success' : 'error', 3000);
  })
  .on('blur.wi', '#regEmail', async function () {
    const e = val('regEmail'); if (!e || !e.includes('@')) return;
    const libre = (await getDocs(query(collection(db, 'smiles'), where('email','==',e)))).empty;
    $(this).data('ok', libre);
    wiTip(this, `Email ${libre ? 'disponible <i class="fa-solid fa-check-circle"></i>' : 'no disponible <i class="fa-solid fa-times-circle"></i>'}`, libre ? 'success' : 'error', 3000);
  })

  // ── GOOGLE AUTH (FLUX) ───────────────────────────────────────────
  .on('click.wi', '#btnGoogle', async function () {
    if ($(this).data('busy')) return;
    $(this).data('busy', true);
    const prevHtml = $(this).html();
    $(this).html('<i class="fas fa-circle-notch fa-spin"></i> Conectando...');
    
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      // Buscar si el UID ya está en la colección 'smiles' (porque doc ID = username)
      const userDocs = await getDocs(query(collection(db, 'smiles'), where('uid', '==', user.uid)));
      
      if (!userDocs.empty) {
        // ¡Ya existe! Loguear directo.
        const wi = userDocs.docs[0].data();
        if (wi.estado === 'pendiente') {
          await signOut(auth);
          if (esModal()) cerrarTodos();
          rutas.navigate('/registrado');
          return;
        }
        entrar(wi);
      } else {
        // Nuevo usuario, pedir Username
        window.wiTempGoogleUser = user;
        swap('username');
      }
    } catch (e) {
      if (e.code !== 'auth/popup-closed-by-user' && e.code !== 'auth/cancelled-popup-request') {
        Mensaje(err[e.code] || e.message, 'error');
      }
      $(this).html(prevHtml).data('busy', false);
    }
  })

  .on('input.wi keyup.wi', '#regUsuarioGoogle, #regPasswordGoogle', function(e) {
     if ($('#regUsuarioGoogle').val().length >= 4 && $('#regPasswordGoogle').val().length >= 6) {
       $('#CompletarGoogle').removeClass('inactivo');
       if (e.key === 'Enter') $('#CompletarGoogle').click();
     } else {
       $('#CompletarGoogle').addClass('inactivo');
     }
  })
  
  .on('blur.wi', '#regUsuarioGoogle', async function () {
    const u = val('regUsuarioGoogle'); if (!u || u.length < 3) return;
    if (u.includes('@')) return ($(this).data('ok', false), wiTip(this, 'No puede contener @', 'error', 2500));
    const libre = !(await getDoc(doc(db, 'smiles', u))).exists();
    $(this).data('ok', libre);
    wiTip(this, `Usuario ${libre ? 'disponible <i class="fa-solid fa-check-circle"></i>' : 'no disponible <i class="fa-solid fa-times-circle"></i>'}`, libre ? 'success' : 'error', 3000);
  })

  .on('click.wi', '#CompletarGoogle', async function () {
    if ($(this).data('busy')) return;
    
    if (!$('#regTerminosGoogle').is(':checked')) return wiTip($('#regTerminosGoogle')[0], 'Acepta los términos', 'error', 2500);

    const u = val('regUsuarioGoogle');
    if (!u || !$('#regUsuarioGoogle').data('ok')) return wiTip($('#regUsuarioGoogle')[0], 'Verifica el usuario', 'error', 2500);

    const p = val('regPasswordGoogle');
    if (!p || p.length < 6) return wiTip($('#regPasswordGoogle')[0], 'Mínimo 6 caracteres', 'error', 2500);

    const user = window.wiTempGoogleUser;
    if (!user) return Mensaje('Error de sesión con Google. Intenta de nuevo.', 'error');

    const rolSeleccionado = 'smile';

    $(this).data('busy', true);
    await accion(this, 'Finalizando', async () => {
      // Intentar setear la contraseña al usuario de Google
      try {
        await updatePassword(user, p);
      } catch (e) {
        console.warn("Aviso Auth Password:", e);
      }

      const partes = user.displayName ? user.displayName.split(' ') : ['Usuario',''];
      const wi = {
        usuario:   u,
        email:     user.email,
        nombre:    partes[0],
        apellidos: partes.slice(1).join(' ') || '',
        rol:       rolSeleccionado,
        estado:    'pendiente',
        uid:       user.uid,
        terminos:  true,
        tema:      localStorage.wiTema || 'Cielo|#0EBEFF',
        
        // ── CAMPOS PRO ──
        avatar:    user.photoURL || '',
        bio:       '',
        plan:      'free',
        segmento:  SEGMENTO_MAP[rolSeleccionado] || 'creador',
        verificado: false,
        registradoPor: 'google'
      };

      await setDoc(doc(db, 'smiles', u), { ...wi, creado: serverTimestamp() });
      await signOut(auth);
      if (esModal()) cerrarTodos();
      rutas.navigate('/registrado');
    });
    $(this).data('busy', false);
  })



  // ── LOGIN ────────────────────────────────────────────────────────
  .on('click.wi', '#Login', async function () {
    await accion(this, 'Iniciando', async () => {
      const input = val('email'), pass = val('password');
      const { email, wi: wiPre } = await fetchUser(input);
      await signInWithEmailAndPassword(auth, email, pass);
      const wi = wiPre ?? (await getDoc(doc(db, 'smiles', auth.currentUser.displayName || input))).data();

      // Verificar si la cuenta está pendiente de activación
      if (wi.estado === 'pendiente') {
        await signOut(auth);
        if (esModal()) cerrarTodos();
        rutas.navigate('/registrado');
        return;
      }
      entrar(wi);
    });
  })

  // ── REGISTRO ─────────────────────────────────────────────────────
  .on('click.wi', '#Registrar', async function () {
    if ($(this).data('busy')) return;

    const rolSeleccionado = 'smile';

    const chk = [
      [!$('#regTerminos').is(':checked'), '#regTerminos', 'Acepta los términos'],
      [!$('#regUsuario').data('ok'),      '#regUsuario',  'Verifica el usuario'],
      [!$('#regEmail').data('ok'),        '#regEmail',    'Verifica el email']
    ];

    const fallo = chk.find(([c]) => c);
    if (fallo) return wiTip($(fallo[1])[0], fallo[2], 'error', 2500);

    $(this).data('busy', true);
    await accion(this, 'Registrando', async () => {
      const d = {
        email:      val('regEmail'),
        usuario:    val('regUsuario'),
        nombre:     val('regNombre'),
        apellidos:  val('regApellidos'),
        password:   val('regPassword')
      };

      const { user } = await createUserWithEmailAndPassword(auth, d.email, d.password);
      await Promise.all([updateProfile(user, { displayName: d.usuario }), sendEmailVerification(user)]);

      // Determinar status: Ahora Negocio (gestor) entra activo directo
      const rolFinal    = rolSeleccionado;
      const estado      = 'pendiente';
      

      const wi = {
        usuario:   d.usuario,
        email:     d.email,
        nombre:    d.nombre,
        apellidos: d.apellidos,
        rol:       rolFinal,
        estado,
        uid:       user.uid,
        terminos:  true,
        tema:      localStorage.wiTema || 'Cielo|#0EBEFF',
        
        // ── CAMPOS ──
        avatar:    '',
        bio:       '',
        plan:      'free',
        segmento:  SEGMENTO_MAP[rolFinal] || 'creador',
        verificado: false,
        registradoPor: 'correo',

        // Extras por rol
        ...(rolSeleccionado === 'empresa' && {
          ruc:          val('regRuc'),
          empresaNombre:val('regEmpresaNombre'),
        }),
        ...(rolSeleccionado === 'gestor' && {
          empresaNombre: val('regEmpresaNombre'),
        }),
      };

      await setDoc(doc(db, 'smiles', d.usuario), { ...wi, creado: serverTimestamp() });

      if (estado === 'pendiente') {
        await signOut(auth);
        if (esModal()) cerrarTodos();
        rutas.navigate('/registrado');
      } else {
        entrar(wi);
      }
    });
    $(this).data('busy', false);
  })

  // ── RESTABLECER ──────────────────────────────────────────────────
  .on('click.wi', '#Recuperar', async function () {
    const emailVal = val('recEmail');
    if (!emailVal) return wiTip(this, 'Ingresa tu email o usuario', 'error', 2500);
    await accion(this, 'Enviando', async () => {
      const { email } = await fetchUser(emailVal);
      await sendPasswordResetEmail(auth, email);
      Mensaje('<i class="fa-solid fa-check-circle"></i> Email enviado, revisa tu bandeja', 'success');
      setTimeout(() => swap('login'), 2000);
    });
  })
  .on('click.wi', '.tema', async function () {
    const wi = getls('wiSmile'); if (!wi?.usuario) return;
    setTimeout(async () => {
      const t = localStorage.wiTema; if (!t) return;
      try {
        await setDoc(doc(db, 'smiles', wi.usuario), { tema: t, actualizado: serverTimestamp() }, { merge: true });
        savels('wiSmile', { ...wi, tema: t }, 7);
        Mensaje(`Tema ${t.split('|')[0]} guardado <i class="fas fa-check-circle"></i>`, 'success');
      } catch (e) { console.error('tema:', e); }
    }, 0);
  });



// ── AUTH MODAL ───────────────────────────────────────────────────────────────
export const abrirLogin = (tipo = 'login') => {
  if (modal === 'si') {
    inyectarModal(tipo === 'registrar' && registrar === 'si' ? 'registrar' : 'login');
  } else {
    rutas.navigate('/login');
  }
};

export const salir = async (keep = []) => {
  sessionStorage.removeItem('vault_unlocked');
  try { await signOut(auth); } catch(e) { console.error('signOut:', e); }
  wiAuth.logout(keep);
};

export const cleanup = () => { $(document).off('.wi'); };