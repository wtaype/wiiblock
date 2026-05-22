import './acerca.css';
import './terminos.css';
import $ from 'jquery';
import { app, version } from '../../wii.js';
import { year } from '../../widev.js';

// ── DATOS ─────────────────────────────────────────────────────────────────
const SECCIONES = [
  {
    ico: 'fa-user-shield', color: '#0EBEFF', num: '01',
    tit: 'Licencia de Uso de la Extensión',
    body: `<p>WiiBlock es una extensión de navegador gratuita distribuida bajo la licencia estándar de software libre. Al descargar y utilizar nuestra herramienta, te comprometes a:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> Utilizar la extensión de forma personal y no comercial perjudicial para terceros.</li>
      <li><i class="fas fa-check"></i> No revender o sublicenciar el software de WiiBlock o presentarlo como un producto de pago bajo otra marca comercial.</li>
      <li><i class="fas fa-check"></i> No utilizar la extensión para alterar de manera fraudulenta el tráfico de red de sitios web de forma delictiva.</li>
    </ul>`
  },
  {
    ico: 'fa-clipboard-check', color: '#29C72E', num: '02',
    tit: 'Modificaciones del Software y Reglas',
    body: `<p>El ecosistema web está en constante evolución y las reglas de publicidad cambian continuamente:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> <strong>Actualización de Filtros:</strong> Nos reservamos el derecho de modificar o actualizar las listas de filtros y reglas de bloqueo predeterminadas para adaptarlas a nuevas redes de anuncios.</li>
      <li><i class="fas fa-check"></i> <strong>Filtros de terceros:</strong> Al activar listas comunitarias externas que no son desarrolladas por WiiBlock, asumes la responsabilidad y políticas propias de dichos autores de listas.</li>
    </ul>`
  },
  {
    ico: 'fa-eye-slash', color: '#FF5C69', num: '03',
    tit: 'Limitación de Responsabilidad',
    body: `<p>WiiBlock se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> <strong>Visualización de páginas web:</strong> Debido a que algunas páginas web detectan los adblockers o utilizan técnicas agresivas para inyectar publicidad, no garantizamos que el 100% de los sitios web se muestren o funcionen perfectamente en todo momento.</li>
      <li><i class="fas fa-check"></i> <strong>Exclusión de daños:</strong> WiiBlock no será responsable de ningún desperfecto, pérdida de información local o anomalía técnica derivada de la deshabilitación o bloqueo de scripts en tu navegador Chrome.</li>
    </ul>`
  },
  {
    ico: 'fa-copyright', color: '#7000FF', num: '04',
    tit: 'Propiedad Intelectual',
    body: `<p>WiiBlock es propiedad de su desarrollador y la comunidad de código libre. Todos los derechos reservados ${year()}.</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> El código fuente de la extensión, los logotipos, la marca comercial y el diseño estético de los portales son propiedad de sus respectivos autores bajo licencias de código abierto aplicables.</li>
      <li><i class="fas fa-check"></i> Se permite la contribución, el fork y el reporte de incidentes en nuestros repositorios comunitarios autorizados respetando los términos de licencias de código libre.</li>
    </ul>`
  },
  {
    ico: 'fa-cloud-bolt', color: '#FFDA34', num: '05',
    tit: 'Almacenamiento Local y Caché',
    body: `<p>Para optimizar la velocidad y permitir un funcionamiento inmediato:</p>
    <ul class="tm_list">
      <li><i class="fas fa-check"></i> Toda tu configuración personalizada, exclusiones de páginas y listas permitidas se graban localmente en la caché de tu perfil de navegador Chrome.</li>
      <li><i class="fas fa-check"></i> WiiBlock no realiza copias de seguridad de tus configuraciones en servidores externos. Si reinstalas Chrome o eliminas tu perfil, deberás exportar o volver a configurar tus exclusiones de páginas manualmente.</li>
    </ul>`
  },
  {
    ico: 'fa-gavel', color: '#0EBEFF', num: '06',
    tit: 'Legislación y Jurisdicción',
    body: `<p>Estos Términos y Condiciones se rigen bajo los principios de buena fe y las leyes que protegen el libre uso de software en internet.</p>
    <p>Cualquier disputa o consulta referente al comportamiento de la extensión será resuelta en los foros comunitarios oficiales de soporte.</p>`
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
      <div class="ac_hero_badge"><i class="fas fa-file-contract"></i> Condiciones de Licencia</div>
      <h1 class="ac_hero_tit">Términos y<br><span class="ac_grad">Condiciones</span></h1>
      <p class="ac_hero_sub">
        Normas de uso, licencias de software libre y directrices de responsabilidad para la 
        instalación y utilización de la extensión de privacidad <strong>WiiBlock.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-user-check"></i> Software Libre</span>
        <span class="tm_chip"><i class="fas fa-shield-halved"></i> Cero Cargos</span>
        <span class="tm_chip"><i class="fas fa-gavel"></i> Transparencia</span>
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
      <div class="ac_sec_badge"><i class="fas fa-list-check"></i> Acuerdo de Licencia</div>
      <h2 class="ac_sec_tit">Reglamento <span class="ac_grad">de Uso General</span></h2>
      <p class="ac_sec_sub">Lee con atención. La descarga y uso de la extensión requiere la aceptación de estas condiciones.</p>
    </div>
    <div class="tm_secs_grid">
      ${SECCIONES.map((s, i) => `
        <div class="tm_sec_card wi_fadeUp" id="tm_sec_${i}">
          <div class="tm_sec_header">
            <div class="tm_sec_ico" style="--tc:${s.color}">
              <i class="fas ${s.ico}"></i>
            </div>
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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) $(e.target).addClass('visible'); });
  }, { threshold: 0.1 });
  _obs = observer;
  $('.wi_fadeUp').each(function () { observer.observe(this); });

  $(document).on('click.terminos', '.tm_nav', function (e) {
    e.preventDefault();
    const { rutas } = window._wiRutas ?? {};
    rutas?.navigate?.($(this).attr('href'));
  });

  $(document).on('click.terminos', '.tm_index_item', function (e) {
    e.preventDefault();
    const t = document.querySelector($(this).attr('href'));
    if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 90, behavior: 'smooth' });
  });

  if (window.wiInitTips) window.wiInitTips();
  console.log(`📜 ${app} Términos cargados`);
  window.__WIREADY__ = true;
};

export const cleanup = () => {
  _obs?.disconnect?.();
  _obs = null;
  $(document).off('.terminos');
};
