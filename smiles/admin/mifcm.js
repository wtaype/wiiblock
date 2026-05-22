import './mifcm.css';
import $ from 'jquery';
import { getls, Notificacion } from '../widev.js';

const wi = () => getls('wiSmile');

const TOPICS = [
  { id: 'wiihope_all', txt: 'Todos los usuarios' },
  { id: 'wiihope_paz', txt: 'Mensajes de paz' },
  { id: 'wiihope_esperanza', txt: 'Esperanza' },
  { id: 'wiihope_blog', txt: 'Blog' },
  { id: 'wiihope_biblia', txt: 'Biblia' },
  { id: 'wiihope_felicitaciones', txt: 'Felicitaciones' },
];

const SCREENS = [
  { id: 'home', txt: 'Inicio' },
  { id: 'messages', txt: 'Mensajes' },
  { id: 'blog', txt: 'Blog' },
  { id: 'bible', txt: 'Biblia' },
  { id: 'quotes', txt: 'Citas' },
  { id: 'music', txt: 'Musica' },
  { id: 'settings', txt: 'Ajustes' },
  { id: 'dashboard', txt: 'Dashboard' },
];

const TYPES = [
  { id: 'esperanza', txt: 'Esperanza' },
  { id: 'blog', txt: 'Blog' },
  { id: 'biblia', txt: 'Biblia' },
  { id: 'citas', txt: 'Citas' },
  { id: 'sistema', txt: 'Sistema' },
  { id: 'felicitacion', txt: 'Felicitacion' },
];

const esc = (v = '') => String(v)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const val = (id) => String($(id).val() || '').trim();

export const render = () => {
  const u = wi();
  if (!u || u.rol !== 'admin') return `<div class="fcm_page"><div class="fcm_empty"><i class="fas fa-ban"></i> Acceso denegado.</div></div>`;

  return `
  <div class="fcm_page">
    <section class="fcm_hero">
      <div class="fcm_hero_icon"><i class="fas fa-bell"></i></div>
      <div>
        <div class="fcm_badge"><i class="fas fa-shield-heart"></i> Admin seguro</div>
        <h1>Mi FCM</h1>
        <p>Generador de payloads para enviar avisos a WiiHope Android desde Firebase Console.</p>
      </div>
    </section>

    <section class="fcm_grid">
      <div class="fcm_card">
        <div class="fcm_head">
          <i class="fas fa-pen-nib"></i>
          <div>
            <h2>Mensaje</h2>
            <p>Escribe el aviso y elige donde abrira en la app.</p>
          </div>
        </div>

        <div class="fcm_field">
          <label>Titulo</label>
          <input id="fcm_title" class="fcm_input" maxlength="80" value="Un mensaje de esperanza para ti">
        </div>

        <div class="fcm_field">
          <label>Cuerpo</label>
          <textarea id="fcm_body" class="fcm_input" maxlength="240">Dios sigue contigo. Respira, ora un momento y continua con paz.</textarea>
        </div>

        <div class="fcm_cols">
          <div class="fcm_field">
            <label>Topic</label>
            <select id="fcm_topic" class="fcm_input">
              ${TOPICS.map(x => `<option value="${x.id}">${x.txt}</option>`).join('')}
            </select>
          </div>
          <div class="fcm_field">
            <label>Pantalla</label>
            <select id="fcm_screen" class="fcm_input">
              ${SCREENS.map(x => `<option value="${x.id}">${x.txt}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="fcm_cols">
          <div class="fcm_field">
            <label>Tipo</label>
            <select id="fcm_type" class="fcm_input">
              ${TYPES.map(x => `<option value="${x.id}">${x.txt}</option>`).join('')}
            </select>
          </div>
          <div class="fcm_field">
            <label>Slug opcional</label>
            <input id="fcm_slug" class="fcm_input" placeholder="ej. biblia_amor_verdadero">
          </div>
        </div>

        <div class="fcm_actions">
          <button id="fcm_btn_build" class="fcm_btn primary"><i class="fas fa-wand-magic-sparkles"></i> Generar</button>
          <button id="fcm_btn_demo" class="fcm_btn"><i class="fas fa-seedling"></i> Ejemplo blog</button>
        </div>
      </div>

      <div class="fcm_card">
        <div class="fcm_head">
          <i class="fas fa-list-check"></i>
          <div>
            <h2>Firebase Console</h2>
            <p>Copia estos campos en Cloud Messaging.</p>
          </div>
        </div>
        <div id="fcm_console" class="fcm_console"></div>
        <button class="fcm_btn wide" data-copy="#fcm_console_text"><i class="fas fa-copy"></i> Copiar campos</button>
      </div>
    </section>

    <section class="fcm_card">
      <div class="fcm_head">
        <i class="fas fa-code"></i>
        <div>
          <h2>JSON REST v1</h2>
          <p>Guardalo para una fase futura con backend seguro.</p>
        </div>
      </div>
      <pre id="fcm_json" class="fcm_pre"></pre>
      <button class="fcm_btn wide" data-copy="#fcm_json"><i class="fas fa-copy"></i> Copiar JSON</button>
    </section>
  </div>`;
};

export const init = () => {
  const u = wi();
  if (!u || u.rol !== 'admin') return;

  $(document).off('.fcm');
  $(document)
    .on('click.fcm', '#fcm_btn_build', build)
    .on('change.fcm keyup.fcm', '#fcm_title,#fcm_body,#fcm_topic,#fcm_screen,#fcm_type,#fcm_slug', build)
    .on('click.fcm', '#fcm_btn_demo', demoBlog)
    .on('click.fcm', '[data-copy]', function () { copyText($(this).data('copy')); });

  build();
};

export const cleanup = () => {
  $(document).off('.fcm');
};

function build() {
  const title = val('#fcm_title') || 'WiiHope';
  const body = val('#fcm_body') || 'Tienes un nuevo mensaje.';
  const topic = val('#fcm_topic') || 'wiihope_all';
  const screen = val('#fcm_screen') || 'messages';
  const type = val('#fcm_type') || 'sistema';
  const slug = val('#fcm_slug');

  const data = { title, body, screen, type };
  if (slug) data.slug = slug;

  const consoleText = [
    `Topic: ${topic}`,
    '',
    `Notification title: ${title}`,
    `Notification text: ${body}`,
    '',
    'Custom data:',
    ...Object.entries(data).map(([k, v]) => `${k}: ${v}`),
  ].join('\n');

  const rest = {
    message: {
      topic,
      notification: { title, body },
      data,
      android: {
        priority: 'HIGH',
        notification: {
          channel_id: 'wiihope_general',
          click_action: 'OPEN_WIIHOPE',
        },
      },
    },
  };

  $('#fcm_console').html(`
    <div class="fcm_console_box">
      <input id="fcm_console_text" value="${esc(consoleText)}" readonly>
      ${Object.entries(data).map(([k, v]) => `<div><strong>${esc(k)}</strong><span>${esc(v)}</span></div>`).join('')}
    </div>
  `);
  $('#fcm_json').text(JSON.stringify(rest, null, 2));
}

function demoBlog() {
  $('#fcm_title').val('Nueva reflexion en WiiHope');
  $('#fcm_body').val('Hay una lectura nueva para fortalecer tu fe hoy.');
  $('#fcm_topic').val('wiihope_blog');
  $('#fcm_screen').val('blog');
  $('#fcm_type').val('blog');
  $('#fcm_slug').val('biblia_amor_verdadero');
  build();
  Notificacion('Ejemplo de blog cargado', 'success');
}

async function copyText(selector) {
  const $el = $(selector);
  const txt = $el.is('input,textarea') ? $el.val() : $el.text();
  try {
    await navigator.clipboard.writeText(txt);
    Notificacion('Copiado al portapapeles', 'success');
  } catch {
    const tmp = $('<textarea>').val(txt).appendTo('body').select();
    document.execCommand('copy');
    tmp.remove();
    Notificacion('Copiado', 'success');
  }
}
