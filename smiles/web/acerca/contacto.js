import './acerca.css';
import './contacto.css';
import $ from 'jquery';
import { app } from '../../wii.js';
import { Notificacion, wiSpin, wiVista, wicopy, wiSmart } from '../../widev.js';

// ── Configuración EmailJS ──────────────────────────────────────────────────────
const EJS = {
  pub: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  sid: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  tid: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
};
wiSmart({
  js: [() => import('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js')],
});

// ── Datos de contacto interno ─────────────────────────────────────────────────
const INFO = [
  { ico: 'fa-envelope',     color: '#0EBEFF', label: 'Email Soporte', value: 'soporte@wiiblock.dev', copiable: true  },
  { ico: 'fa-users',        color: '#FF5C69', label: 'Comunidad', value: 'Soporte Comunitario GitHub', copiable: false },
  { ico: 'fa-clock',        color: '#29C72E', label: 'Atención Técnica', value: 'Lunes a Viernes (Respuesta en 24h)', copiable: false },
];

const ASUNTOS = [
  'Reportar anuncio no bloqueado',
  'Problema de visualización (Sitio Roto)',
  'Sugerencia de filtro o nueva regla',
  'Problema con la extensión (Error técnico)',
  'Reportar vulnerabilidad de privacidad',
  'Otro motivo de soporte',
];

const FAQ = [
  { q: '¿Cómo reporto un anuncio que WiiBlock no ha bloqueado?', r: 'Puedes usar este formulario seleccionando el asunto "Reportar anuncio no bloqueado" indicando la URL exacta de la página web y el lugar de la pantalla donde aparece el anuncio. Nuestro equipo actualizará las listas de filtros en un plazo máximo de 24 horas.' },
  { q: '¿Por qué algunas páginas se ven "rotas" al activar el bloqueador?', r: 'Esto se conoce coloquialmente como "anti-adblock bypass" o fallas de inyección de CSS. Si un sitio web deja de funcionar o no carga correctamente sus imágenes, desactiva temporalmente el escudo desde el popup de la extensión y repórtanos el sitio usando el asunto "Problema de visualización (Sitio Roto)" para que podamos ajustar la regla específica.' },
  { q: '¿WiiBlock recopila mi historial de navegación?', r: 'No. WiiBlock respeta tu privacidad de forma absoluta. Todo el procesamiento de red se hace de manera local en tu navegador Chrome mediante la API nativa declarativeNetRequest. Ninguno de tus datos de navegación, búsquedas o historial es enviado a servidores externos ni recopilado por nosotros.' },
  { q: '¿Cómo puedo sugerir una nueva función o lista de filtros?', r: '¡Nos encanta recibir sugerencias! Selecciona el asunto "Sugerencia de filtro o nueva regla" y coméntanos qué lista comunitaria te gustaría ver preconfigurada en WiiBlock o qué funcionalidad extra te gustaría que incorporemos en la próxima versión.' },
];

const MAX_CHARS = 500;

// ── Anti-spam: timestamp del último envío (localStorage) ──────────────────────
const SPAM_KEY  = 'wi_ct_last';
const SPAM_WAIT = 60 * 1000; // 1 minuto entre envíos

const puedeEnviar = () => {
  const last = parseInt(localStorage.getItem(SPAM_KEY) || '0', 10);
  return Date.now() - last > SPAM_WAIT;
};
const marcarEnvio = () => localStorage.setItem(SPAM_KEY, String(Date.now()));

// ── Estado ─────────────────────────────────────────────────────────────────────
let _obs = [];

// ── Render ─────────────────────────────────────────────────────────────────────
export const render = () => `
<main id="wimain">
<div class="ac_wrap ct_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero ct_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-headset"></i> Centro de Ayuda WiiBlock</div>
      <h1 class="ac_hero_tit">Soporte y<br><span class="ac_grad">Consultas 🛠️</span></h1>
      <p class="ac_hero_sub">
        ¿Has encontrado un anuncio molesto o un sitio web roto? 
        <strong>Nuestro equipo de soporte técnico te ayudará de inmediato.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-clock"></i> Respuesta: Lunes a Viernes</span>
        <span class="tm_chip"><i class="fas fa-shield-halved"></i> 100% Confidencial</span>
        <span class="tm_chip"><i class="fas fa-user-shield"></i> Soporte Especializado</span>
      </div>
    </div>
  </section>

  <!-- ══ GRID: FORM + INFO ══ -->
  <section class="ac_sec ct_sec">
    <div class="ct_grid">

      <!-- Formulario -->
      <div class="ct_form_wrap">
        <div class="ac_sec_head" style="text-align:left;margin-bottom:4vh">
          <div class="ac_sec_badge"><i class="fas fa-comment-dots"></i> Formulario de Reportes</div>
          <h2 class="ac_sec_tit">Enviar <span class="ac_grad">un reporte</span></h2>
        </div>
        <form id="ctForm" class="ct_form" novalidate autocomplete="off">
          <!-- Honeypot anti-bot (invisible) -->
          <input type="text" name="ct_honey" id="ct_honey" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0">

          <div class="ct_field">
            <label for="ct_nombre"><i class="fas fa-user"></i> Tu Nombre</label>
            <input type="text" id="ct_nombre" name="from_name" placeholder="Ingresa tu nombre o alias" required maxlength="80">
          </div>
          <div class="ct_field">
            <label for="ct_email"><i class="fas fa-envelope"></i> Correo Electrónico</label>
            <input type="email" id="ct_email" name="email" placeholder="ejemplo@correo.com" required maxlength="120">
          </div>
          <div class="ct_field">
            <label for="ct_telefono"><i class="fas fa-phone"></i> Celular / Contacto (Opcional)</label>
            <input type="tel" id="ct_telefono" name="telefono" placeholder="Tu número de contacto" maxlength="20">
          </div>
          <div class="ct_field">
            <label for="ct_asunto"><i class="fas fa-tag"></i> Asunto o Incidencia</label>
            <select id="ct_asunto" name="asunto" required>
              <option value="">Selecciona un motivo</option>
              ${ASUNTOS.map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
          </div>
          <div class="ct_field">
            <label for="ct_mensaje"><i class="fas fa-comment-dots"></i> Detalles del Reporte o Consulta</label>
            <textarea id="ct_mensaje" name="message" rows="6" placeholder="Describe detalladamente el problema (URL del sitio con anuncios, comportamiento de la extensión, etc.)" required maxlength="${MAX_CHARS}"></textarea>
            <div class="ct_chars"><span id="ct_count">0</span> / ${MAX_CHARS}</div>
          </div>

          <div class="ct_actions">
            <button type="submit" class="ac_btn_p ct_btn_submit" id="ct_submit">
              <i class="fas fa-paper-plane"></i> <span>Enviar Mensaje</span>
            </button>
            <button type="reset" class="ac_btn_s">
              <i class="fas fa-redo"></i> <span>Limpiar</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Info -->
      <div class="ct_info_wrap">
        <div class="ct_info_card wi_fadeUp">
          <h3><i class="fas fa-address-card"></i> Información de Contacto</h3>
          <div class="ct_info_items">
            ${INFO.map(it => `
              <div class="ct_info_item">
                <div class="ct_info_ico" style="background:color-mix(in srgb,${it.color} 15%,transparent);color:${it.color}">
                  <i class="fas ${it.ico}"></i>
                </div>
                <div class="ct_info_data">
                  <span class="ct_info_label">${it.label}</span>
                  <span class="ct_info_value">${it.value}</span>
                </div>
                ${it.copiable ? `<button class="ct_copy" data-copy="${it.value}" title="Copiar"><i class="fas fa-copy"></i></button>` : ''}
              </div>`).join('')}
          </div>
        </div>

        <div class="ct_info_card wi_fadeUp" style="margin-top:3vh">
          <h3><i class="fas fa-shield-halved"></i> Confidencialidad de la Información</h3>
          <div style="font-size:0.8rem; line-height:1.6; padding:12px;">
            Este formulario de soporte se procesa de forma segura. La información proporcionada (como nombres, correos y URLs) es estrictamente utilizada para resolver problemas de bloqueo de anuncios y no se comparte con ninguna entidad externa.
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ══ FAQ ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-circle-question"></i> Resolución de Dudas</div>
      <h2 class="ac_sec_tit">Preguntas <span class="ac_grad">Frecuentes</span></h2>
    </div>
    <div class="ct_faq">
      ${FAQ.map((f, i) => `
        <div class="ct_faq_item wi_fadeUp" id="faq_${i}">
          <div class="ct_faq_q">
            <i class="fas fa-circle-question"></i>
            <h3>${f.q}</h3>
            <i class="fas fa-chevron-down ct_faq_arr"></i>
          </div>
          <div class="ct_faq_a"><p>${f.r}</p></div>
        </div>`).join('')}
    </div>
  </section>

</div></main>`;

// ── Init ──────────────────────────────────────────────────────────────────────
export const init = () => {
  // Contador de caracteres
  $(document).on('input.contacto', '#ct_mensaje', function () {
    const v = $(this).val();
    if (v.length > MAX_CHARS) $(this).val(v.slice(0, MAX_CHARS));
    $('#ct_count').text(Math.min(v.length, MAX_CHARS));
  });

  // Reset → limpiar contador
  $(document).on('reset.contacto', '#ctForm', () => {
    setTimeout(() => $('#ct_count').text('0'), 10);
  });

  // Envío del formulario
  $(document).on('submit.contacto', '#ctForm', async function (e) {
    e.preventDefault();

    // honeypot
    if ($('#ct_honey').val()) return;

    if (!puedeEnviar()) {
      Notificacion('Espera un momento antes de enviar otro mensaje.', 'warning');
      return;
    }

    const nombre   = $('#ct_nombre').val().trim();
    const email    = $('#ct_email').val().trim();
    const telefono = $('#ct_telefono').val().trim() || 'No especificado';
    const asunto   = $('#ct_asunto').val();
    const mensaje  = $('#ct_mensaje').val().trim();

    if (nombre.length < 3)                                return Notificacion('El nombre debe tener al menos 3 caracteres.', 'error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))       return Notificacion('Ingresa un email válido.', 'error');
    if (!asunto)                                          return Notificacion('Selecciona una incidencia.', 'error');
    if (mensaje.length < 10)                              return Notificacion('El mensaje debe tener al menos 10 caracteres.', 'error');

    const $btn = $('#ct_submit');
    wiSpin($btn, true, 'Enviando…');

    try {
      if (typeof window.emailjs === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('No se pudo cargar EmailJS'));
          document.head.appendChild(script);
        });
      }
      
      window.emailjs.init(EJS.pub);

      await window.emailjs.send(EJS.sid, EJS.tid, {
        nombre:   nombre,
        email:    email,
        telefono: telefono,
        asunto:   asunto,
        mensaje:  mensaje,
        app_name: app,
      });

      marcarEnvio();
      Notificacion('¡Mensaje enviado al equipo técnico! Se procesará a la brevedad. 🛠️', 'success', 4500);
      this.reset();
      $('#ct_count').text('0');
    } catch (err) {
      console.error('[contacto] EmailJS error:', err);
      Notificacion('No se pudo enviar el mensaje. Intenta de nuevo.', 'error');
    } finally {
      wiSpin($btn, false, 'Enviar Mensaje');
    }
  });

  // Copiar datos de contacto
  $(document).on('click.contacto', '.ct_copy', function () {
    wicopy($(this).data('copy'), this, '¡Copiado!');
  });

  // FAQ acordeón
  $(document).on('click.contacto', '.ct_faq_q', function () {
    const $item = $(this).closest('.ct_faq_item');
    const isOpen = $item.hasClass('active');
    $('.ct_faq_item').removeClass('active').find('.ct_faq_a').slideUp(280);
    $('.ct_faq_arr').removeClass('rotated');
    if (!isOpen) {
      $item.addClass('active').find('.ct_faq_a').slideDown(280);
      $item.find('.ct_faq_arr').addClass('rotated');
    }
  });

  _obs.push(wiVista('.wi_fadeUp', (el) => $(el).addClass('visible')));
  _obs.push(wiVista('.ct_faq_item', (el, i) => setTimeout(() => $(el).addClass('visible'), i * 80)));

  console.log(`📩 ${app} Soporte Contacto cargado`);
  window.__WIREADY__ = true;
};

// ── Cleanup ───────────────────────────────────────────────────────────────────
export const cleanup = () => {
  $(document).off('.contacto');
  _obs.forEach(o => o?.disconnect?.()); _obs = [];
};
