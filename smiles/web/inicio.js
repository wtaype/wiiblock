import $ from 'jquery';
import { app, version, by, linkme } from '../wii.js';
import { wiVista, year, wiTip, Saludar } from '../widev.js';

// ── DATA ──────────────────────────────────────────────────────
const roles = [
  'Bloqueador de Anuncios 🛡️',
  'Protector de Privacidad 🔒',
  'Navegación Ultrarrápida ⚡',
  'Cero Popups Invasivos 🚫',
  'YouTube sin Publicidad 📺'
];

const stats = [
  { valor:100,  label:'Eficacia de Bloqueo', sufijo:'%' },
  { valor:2,    label:'Velocidad de Carga',   sufijo:'x' },
];

const features = [
  { id:'bloqueo', icon:'fa-shield-halved', color:'#FF5C69', nombre:'Bloqueo Avanzado', desc:'Di adiós a la publicidad molesta',
    items:[{icon:'fa-youtube',name:'YouTube sin pausas',desc:'Mira videos al instante y sin interrupciones'},{icon:'fa-rectangle-ad',name:'Adiós Banners y Popups',desc:'Limpieza total en todas las páginas web'},{icon:'fa-window-restore',name:'Bloqueo de Emergentes',desc:'Detiene molestas ventanas invasivas'}]},
  { id:'privacidad', icon:'fa-eye-slash', color:'#29C72E', nombre:'Privacidad Total', desc:'Tus datos son y seguirán siendo tuyos',
    items:[{icon:'fa-cookie-bite',name:'Bloqueo de Trackers',desc:'Evita que las empresas rastreen tus búsquedas'},{icon:'fa-eye-slash',name:'Sin historial de navegación',desc:'Funciona de forma local y 100% confidencial'},{icon:'fa-key',name:'Escudo de Identidad',desc:'Protege tus datos y firmas digitales de rastreadores'}]},
  { id:'velocidad', icon:'fa-bolt', color:'#FFDA34', nombre:'Navegación 2x Rápida', desc:'Optimización extrema de carga web',
    items:[{icon:'fa-gauge-high',name:'Carga en milisegundos',desc:'Páginas ligeras que cargan en un parpadeo'},{icon:'fa-wifi',name:'Ahorro de Datos móviles',desc:'Menos publicidad significa menor consumo de megas'},{icon:'fa-battery-three-quarters',name:'Eficiencia de Batería',desc:'Optimiza el uso de CPU y memoria RAM en Chrome'}]},
  { id:'filtros', icon:'fa-sliders', color:'#7000FF', nombre:'Control Absoluto', desc:'Filtros personalizados para cada usuario',
    items:[{icon:'fa-circle-check',name:'Lista de Sitios Permitidos',desc:'Habilita anuncios en tus webs preferidas'},{icon:'fa-list-check',name:'Filtros Comunitarios',desc:'Reglas de bloqueo constantemente actualizadas'},{icon:'fa-crosshairs',name:'Bloquear Elemento',desc:'Haz clic derecho para ocultar lo que no quieras ver'}]},
  { id:'estadisticas', icon:'fa-chart-line', color:'#0EBEFF', nombre:'Reportes en Tiempo Real', desc:'Monitorea el escudo de protección',
    items:[{icon:'fa-clock',name:'Contador de anuncios',desc:'Visualiza la cantidad bloqueada por sesión'},{icon:'fa-chart-pie',name:'Historial de Ahorro',desc:'Reporte detallado de datos y megabytes salvados'},{icon:'fa-heart',name:'Navegación Segura',desc:'Estado del escudo en cada dominio visitado'}]},
  { id:'soporte', icon:'fa-arrows-rotate', color:'#FF8F00', nombre:'Reglas al Día', desc:'Filtros optimizados y actualizados',
    items:[{icon:'fa-robot',name:'Actualización Automática',desc:'Reglas optimizadas para las últimas amenazas de anuncios'},{icon:'fa-circle-exclamation',name:'Reportar anuncios',desc:'Envía reportes sobre anuncios que se hayan filtrado'},{icon:'fa-headset',name:'Soporte de la Comunidad',desc:'Ayuda y sugerencias de parte del equipo técnico'}]},
];

const beneficios = [
  { icon:'fa-feather', titulo:'Ultrarrápido y Liviano', desc:'Diseñado para consumir el mínimo de memoria RAM y procesador en tu navegador Chrome, optimizando el rendimiento general del dispositivo.' },
  { icon:'fa-user-shield', titulo:'Privacidad Garantizada', desc:'Tus datos nunca salen de tu ordenador. WiiBlock procesa todas las reglas de bloqueo en tu propio navegador local sin servidores intermedios.' },
  { icon:'fa-heart', titulo:'100% Gratuito y Libre', desc:'Sin cargos ocultos ni suscripciones premium. Creemos en una web libre, limpia y segura para todos los usuarios de forma gratuita.' },
];

// ── PLANTILLAS ────────────────────────────────────────────────
const tplStat = s => `
  <div class="ini_stat">
    <div class="ini_stat_n" data-target="${s.valor}" data-sufijo="${s.sufijo}">0</div>
    <div class="ini_stat_l">${s.label}</div>
  </div>`;

const tplFeature = f => `
  <div class="ini_cat_card" style="--cc:${f.color}">
    <div class="ini_cat_bar"></div>
    <div class="ini_cat_top">
      <div class="ini_cat_ico"><i class="fas ${f.icon}"></i></div>
      <div class="ini_cat_info"><h3>${f.nombre}</h3><p>${f.desc}</p></div>
    </div>
    <ul class="ini_cat_tools">
      ${f.items.map(it=>`
        <li><div class="ini_tool_a">
          <i class="fas ${it.icon}"></i>
          <div><strong>${it.name}</strong><span>${it.desc}</span></div>
          <i class="fas fa-check ini_ext" style="color:var(--success)"></i>
        </div></li>`).join('')}
    </ul>
  </div>`;

const tplBeneficio = (b,i) => `
  <div class="ini_about_card" style="--d:${i*.15}s">
    <div class="ini_card_ico"><i class="fas ${b.icon}"></i></div>
    <h3>${b.titulo}</h3>
    <p>${b.desc}</p>
  </div>`;

// ── RENDER ────────────────────────────────────────────────────
export const render = () => `
<div class="ini_wrap">

  <!-- ===== HERO ===== -->
  <section class="ini_hero">
    <div class="ini_hero_content">

      <div class="ini_saludo" style="--d:0s">
        <span>${Saludar()}</span><span class="ini_wave">👋</span>
      </div>

      <h1 class="ini_titulo" style="--d:.18s">
        Seguridad y Privacidad con <span class="ini_grad">${app}</span>
      </h1>

      <div class="ini_roles" style="--d:.36s">
        ${roles.map((r,i)=>`<span class="ini_role${i===0?' active':''}">${r}</span>`).join('')}
      </div>

      <p class="ini_sub" style="--d:.54s">
        Disfruta de una web limpia y vuela en tu navegación. Bloquea anuncios invasivos, detiene rastreadores de datos y protege tu privacidad con un solo clic.
      </p>

      <div class="ini_stats" id="in_stats" style="--d:.72s">
        ${stats.map(tplStat).join('')}
      </div>

      <div class="ini_btns" style="--d:.9s">
        <a href="/acerca" class="ini_btn_p"><i class="fas fa-circle-info"></i> Descubrir WiiBlock</a>
      </div>

    </div>

    <!-- Derecha: preview de la Extensión WiiBlock Popup -->
    <div class="ini_hero_visual">
      <div class="ini_nw_preview" style="--d:.3s; padding: 2vh; max-width: 320px; height: auto;">
        <div class="ini_nw_head" style="height: auto; padding: 1vh 0; display: flex; justify-content: space-between; border-bottom: 2px solid var(--brd);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-shield-halved" style="color: var(--mco); font-size: 1.4rem;"></i>
            <span style="font-weight: 800; font-size: 0.95rem; color: var(--tx);">${app}</span>
          </div>
          <div style="font-size: 0.65rem; font-weight: 700; background: var(--bg5); color: var(--mco); padding: 2px 6px; border-radius: 20px;">
            ${version}
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 3vh; padding: 4vh 1vh;">
          <!-- Power Button -->
          <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--mco) 0%, var(--bg2) 100%); display: flex; justify-content: center; align-items: center; color: #fff; font-size: 2.2rem; cursor: pointer; box-shadow: 0 0 20px rgba(55,161,221,0.4); transition: transform 0.2s;">
            <i class="fas fa-power-off"></i>
          </div>
          <div style="font-weight: 700; font-size: 0.8rem; color: var(--success); letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--success); display: inline-block; animation: ini_blink 1.5s infinite;"></span>
            PROTECCIÓN ACTIVA
          </div>
        </div>
        <div style="border-top: 1px solid var(--brd); padding-top: 2vh; display: flex; flex-direction: column; gap: 1.5vh;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
            <span style="color: var(--tx2); font-weight: 500;"><i class="fas fa-ban" style="margin-right: 6px; color: #FF5C69;"></i> Bloqueados en esta web</span>
            <strong style="color: var(--tx); font-size: 0.95rem;">24</strong>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
            <span style="color: var(--tx2); font-weight: 500;"><i class="fas fa-eye-slash" style="margin-right: 6px; color: #29C72E;"></i> Rastreadores detenidos</span>
            <strong style="color: var(--tx); font-size: 0.95rem;">12</strong>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; background: var(--bg1); padding: 8px; border-radius: 8px; border: 1px solid var(--brd);">
            <span style="color: var(--mco); font-weight: 700;"><i class="fas fa-trophy" style="margin-right: 6px;"></i> Total bloqueados</span>
            <strong style="color: var(--mco); font-size: 0.9rem;">15,482</strong>
          </div>
        </div>
      </div>
      <div class="ini_ftech ini_ft1" style="--d:.5s"  ${wiTip('Shield')}><i class="fas fa-shield-halved"></i></div>
      <div class="ini_ftech ini_ft2" style="--d:.65s" ${wiTip('Speed')}><i class="fas fa-bolt"></i></div>
      <div class="ini_ftech ini_ft3" style="--d:.8s"  ${wiTip('Privacy')}><i class="fas fa-eye-slash"></i></div>
      <div class="ini_ftech ini_ft4" style="--d:.95s" ${wiTip('Block')}><i class="fas fa-ban"></i></div>
    </div>
  </section>

  <!-- ===== FUNCIONALIDADES ===== -->
  <section class="ini_cats_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">Los <span class="ini_grad">6 Pilares</span> de WiiBlock</h2>
      <div class="ini_sec_line"></div>
      <p class="ini_sec_desc">Herramientas avanzadas integradas en un solo escudo para tu navegador</p>
    </div>
    <div class="ini_cats_grid">${features.map(tplFeature).join('')}</div>
  </section>

  <!-- ===== ¿POR QUÉ? ===== -->
  <section class="ini_about_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">¿Qué beneficios tienes al usar <span class="ini_grad">${app}?</span></h2>
      <div class="ini_sec_line"></div>
    </div>
    <div class="ini_about_grid">${beneficios.map(tplBeneficio).join('')}</div>
  </section>

  <!-- ===== CTA ===== -->
  <section class="ini_cta_sec">
    <div class="ini_cta_wrap">
      <i class="fas fa-rocket ini_cta_ico"></i>
      <h2>Disfruta de una web más limpia, rápida y segura</h2>
      <p>Instala la extensión en segundos y toma el control de tu privacidad en internet.</p>
      <div class="ini_cta_chips">
        <a href="/acerca" class="ini_btn_p"><i class="fas fa-circle-info"></i> Más información</a>
        <a href="https://chromewebstore.google.com/detail/lpegdodoliifnidedjieckcmppcdecge" target="_blank" rel="noopener" class="ini_btn_s"><i class="fab fa-chrome" style="color: #0EBEFF;"></i> Instalar en Chrome</a>
      </div>
      <p class="ini_cta_autor" style="margin-top:2vh;">Creado con ❤️ por <a href="${linkme}" target="_blank" rel="noopener">${by}</a> · ${version} © ${year()}</p>
    </div>
  </section>

</div>`;

// ── INIT ──────────────────────────────────────────────────────
export const init = () => {

  // Roles rotantes
  let ri = 0;
  const $r = $('.ini_role');
  setInterval(() => { $r.removeClass('active'); $r.eq(ri = (ri+1) % $r.length).addClass('active'); }, 2800);

  // Stats contador — al entrar en viewport
  wiVista('#in_stats', () => {
    $('.ini_stat_n').each(function() {
      const $n = $(this), obj = +$n.data('target'), suf = $n.data('sufijo') || '';
      let v = 0;
      const t = setInterval(() => {
        v += obj / 50;
        if (v >= obj) { $n.text(obj + suf); clearInterval(t); }
        else $n.text(Math.floor(v));
      }, 28);
    });
  });

  // Scroll animations
  wiVista('.ini_cat_card',   null, { anim:'wi_fadeUp', stagger:80  });
  wiVista('.ini_about_card', null, { anim:'wi_fadeUp', stagger:140 });

  console.log(`🚀 ${app} ${version} · Inicio OK`);
};

export const cleanup = () => {};