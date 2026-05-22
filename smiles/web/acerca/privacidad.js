import './acerca.css';
import './terminos.css';
import $ from 'jquery';
import { app, version } from '../../wii.js';
import { year } from '../../widev.js';

// ── DATOS ─────────────────────────────────────────────────────────────────
const SECCIONES = [
  {
    ico: 'fa-database', color: '#0EBEFF', num: '01',
    tit: 'Información que Recopilamos',
    body: `<p>Para nosotros, tu privacidad es un derecho fundamental e inalienable. Por ello, WiiBlock está construido bajo una estricta filosofía de cero recopilación de datos:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> <strong>Sin historial de navegación:</strong> No rastreamos, almacenamos, analizamos ni transmitimos los sitios web que visitas ni tus búsquedas.</li>
      <li><i class="fas fa-check"></i> <strong>Sin datos personales:</strong> No solicitamos tu nombre, dirección de correo electrónico ni ningún tipo de información identificativa para utilizar la extensión.</li>
      <li><i class="fas fa-check"></i> <strong>Estadísticas locales:</strong> Los contadores de anuncios bloqueados y de megabytes ahorrados se procesan en la memoria temporal de tu propio dispositivo y jamás se suben a servidores externos.</li>
    </ul>
    <div class="tm_alert">
      <i class="fas fa-shield-halved"></i>
      <p>Todo el proceso de filtrado de solicitudes se realiza localmente en tu cliente Chrome. No hay intermediarios que procesen o recopilen tus datos.</p>
    </div>`
  },
  {
    ico: 'fa-gear', color: '#29C72E', num: '02',
    tit: 'Funcionamiento del Bloqueo Local',
    body: `<p>WiiBlock utiliza la API nativa DeclarativeNetRequest de Google Chrome, garantizando la seguridad en el procesamiento de filtros:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> <strong>Filtrado a nivel navegador:</strong> Es el propio Chrome el que compara los destinos de red solicitados con las listas de filtros locales que provee WiiBlock.</li>
      <li><i class="fas fa-check"></i> <strong>Sin telemetría en la nube:</strong> Ninguna dirección URL es transmitida a servidores de WiiBlock para su evaluación o filtrado de publicidad.</li>
      <li><i class="fas fa-check"></i> <strong>Eficiencia de rendimiento:</strong> Al evitar inyectar scripts pesados en JavaScript para analizar el tráfico, tu equipo consume menos CPU y memoria RAM.</li>
    </ul>`
  },
  {
    ico: 'fa-ban', color: '#FF5C69', num: '03',
    tit: 'Políticas de Publicidad y No Venta',
    body: `<p>Al ser un bloqueador de anuncios independiente, mantenemos políticas de integridad inquebrantables:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> <strong>Sin anuncios aceptables pagados:</strong> No aceptamos dinero de redes publicitarias a cambio de permitir anuncios invasivos o rastreo encubierto.</li>
      <li><i class="fas fa-check"></i> <strong>Código transparente y abierto:</strong> Nuestras reglas de bloqueo son públicas y auditables para que puedas comprobar su comportamiento y honestidad.</li>
      <li><i class="fas fa-check"></i> <strong>Modelo sin lucro comercial:</strong> WiiBlock es y será siempre 100% gratuito. No vendemos planes premium ni comercializamos datos agregados de usuarios.</li>
    </ul>`
  },
  {
    ico: 'fa-user-lock', color: '#7000FF', num: '04',
    tit: 'Configuración y Datos Guardados',
    body: `<p>WiiBlock solo guarda preferencias técnicas de manera local en tu navegador Chrome:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> <strong>LocalStorage / Storage API:</strong> Se utiliza únicamente para almacenar el estado de la extensión (activo/inactivo), tus listas blancas de sitios web permitidos y tus temas estéticos.</li>
      <li><i class="fas fa-check"></i> <strong>Cifrado y borrado sencillo:</strong> Si desinstalas WiiBlock o limpias el almacenamiento de tu navegador Chrome, todas tus preferencias y configuraciones guardadas localmente se eliminan de inmediato.</li>
    </ul>`
  },
  {
    ico: 'fa-shield-halved', color: '#FFDA34', num: '05',
    tit: 'Permisos Requeridos y su Propósito',
    body: `<p>Para cumplir con sus tareas protectoras, WiiBlock solicita únicamente los permisos estrictamente necesarios en Chrome:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> <strong>declarativeNetRequest:</strong> Utilizado para que el navegador Chrome pueda desviar e impedir la conexión con servidores publicitarios maliciosos o conocidos.</li>
      <li><i class="fas fa-check"></i> <strong>storage:</strong> Necesario para recordar tu configuración personalizada y listas de sitios permitidos cada vez que inicias el navegador.</li>
    </ul>`
  },
  {
    ico: 'fa-rotate', color: '#0EBEFF', num: '06',
    tit: 'Modificaciones de esta Política',
    body: `<p>Podemos actualizar esta política para reflejar optimizaciones técnicas o adaptarnos a nuevas normativas exigidas por la Chrome Web Store.</p>
    <div class="tm_alert">
      <i class="fas fa-calendar-check"></i>
      <p>Última actualización: Mayo de ${year()} · Versión ${version}. El uso de WiiBlock confirma tu aceptación de estas directrices de privacidad y protección local.</p>
    </div>`
  },
];

// ── RENDER ─────────────────────────────────────────────────────────────────
export const render = () => `
<main id="wimain">
<div class="ac_wrap tm_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero tm_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-shield-halved"></i> Privacidad Garantizada</div>
      <h1 class="ac_hero_tit">Política de<br><span class="ac_grad">Privacidad</span></h1>
      <p class="ac_hero_sub">
        Esta política regula el funcionamiento local de la extensión y nuestras directrices de 
        <strong>cero recopilación y privacidad absoluta de tu navegación.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-ban"></i> Sin rastreadores</span>
        <span class="tm_chip"><i class="fas fa-eye-slash"></i> 100% Local</span>
        <span class="tm_chip"><i class="fas fa-shield-halved"></i> Cero Servidores</span>
      </div>
      <div class="tm_last_upd">
        <i class="fas fa-calendar-check"></i>
        Última actualización: Mayo ${year()} · Versión ${version}
      </div>
    </div>
  </section>

  <!-- ══ ÍNDICE RÁPIDO ══ -->
  <div class="tm_index_band">
    ${SECCIONES.map((s, i) => `
      <a href="#tm_sec_${i}" class="tm_index_item">
        <i class="fas ${s.ico}" style="color:${s.color}"></i>
        <span>${s.tit}</span>
      </a>`).join('')}
  </div>

  <!-- ══ SECCIONES ══ -->
  <section class="ac_sec tm_secciones">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-shield-halved"></i> Protección</div>
      <h2 class="ac_sec_tit">Nuestros Compromisos de <span class="ac_grad">Privacidad</span></h2>
      <p class="ac_sec_sub">Toda la extensión funciona directamente en tu navegador, sin intermediarios ni recopilación de telemetría.</p>
    </div>
    <div class="tm_secs_grid">
      ${SECCIONES.map((s, i) => `
        <div class="tm_sec_card wi_fadeUp" id="tm_sec_${i}">
          <div class="tm_sec_header">
            <div class="tm_sec_ico" style="--tc:${s.color}"><i class="fas ${s.ico}"></i></div>
            <div>
              <span class="tm_sec_num" style="color:${s.color}">${s.num}</span>
              <h2 class="tm_sec_tit">${s.tit}</h2>
            </div>
          </div>
          <div class="tm_sec_body">${s.body}</div>
        </div>`).join('')}
    </div>
  </section>

</div></main>
`;

// ── INIT ──────────────────────────────────────────────────────────────────
let _obs = null;

export const init = () => {
  _obs = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) $(e.target).addClass('visible'); }),
    { threshold: 0.1 }
  );
  $('.wi_fadeUp').each(function () { _obs.observe(this); });

  $(document).on('click.privacidad', '.tm_nav', function (e) {
    e.preventDefault();
    import('../../rutas.js').then(m => m.rutas.navigate($(this).attr('href')));
  });
  $(document).on('click.privacidad', '.tm_index_item', function (e) {
    e.preventDefault();
    const t = document.querySelector($(this).attr('href'));
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 90, behavior: 'smooth' });
  });

  console.log(`🔒 ${app} Privacidad cargada`);
  window.__WIREADY__ = true;
};

export const cleanup = () => {
  _obs?.disconnect?.(); _obs = null;
  $(document).off('.privacidad');
};
