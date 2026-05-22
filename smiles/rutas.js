import $ from 'jquery';
import { app, titulo, descri, keywii, linkweb } from './wii.js';
import { Notificacion, wiPath, wiFade } from './widev.js';
import * as inicioMod from './web/inicio.js';

// ── NAV COMUN — rutas compartidas entre todos los roles ────────────────────────
const COMUN = [
  // { href: '/acerca', page: 'acerca', ico: 'fa-circle-info', txt: 'Acerca' }
];

// ── NAV — Config visual por rol (nvleft = izquierda, nvright = derecha) ────────
export const NAV = {
  todos: {
    nvleft:  [
      { href: '/', page: 'inicio', ico: 'fa-house', txt: 'Bienvenido' },
      { href: '/descubre', page: 'descubre', ico: 'fa-compass', txt: 'Descubre' },
      { href: '/privacidad', page: 'privacidad', ico: 'fa-user-shield', txt: 'Privacidad' },
      { href: '/terminos', page: 'terminos', ico: 'fa-file-contract', txt: 'Términos' },
      { href: '/acerca', page: 'acerca', ico: 'fa-circle-info', txt: 'Acerca' },
       ...COMUN],
    nvright: [],
  },
  smile: {
    nvleft: [
      { href: '/registrar', page: 'registrar', ico: 'fa-plus-circle',      txt: 'Registrar Ventas' },
      { href: '/historial', page: 'historial', ico: 'fa-clipboard-list',   txt: 'Historial Ventas' },
      { href: '/ranking',   page: 'ranking',   ico: 'fa-trophy',           txt: 'Ranking'   },
      { href: '/tours',     page: 'tours',     ico: 'fa-route',            txt: 'Tours '     },
      { href: '/chat', page: 'chat', ico: 'fa-comments', txt: 'Chat Grupal' },
      ...COMUN,
    ],
    nvright: [
      { isPerfil: true }, { isSalir: true },
    ],
  },
  gestor: {
    nvleft: [
      { href: '/gestor',     page: 'gestor',     ico: 'fa-house',           txt: 'Dashboard'    },
      { href: '/registrar', page: 'registrar', ico: 'fa-plus-circle',      txt: 'Registrar Ventas' },
      { href: '/ranking',   page: 'ranking',   ico: 'fa-trophy',           txt: 'Ranking'   },
      { href: '/historial', page: 'historial', ico: 'fa-clipboard-list',   txt: 'Tablero' },
      { href: '/tours',     page: 'tours',     ico: 'fa-route',            txt: 'Tours'     },
      { href: '/chat', page: 'chat', ico: 'fa-comments', txt: 'Chat Grupal' },
      ...COMUN,
    ],
    nvright: [
      { href: '/rrhh',      page: 'rrhh',      ico: 'fa-users-gear',     txt: 'RRHH'      },
      { href: '/precios',   page: 'precios',   ico: 'fa-tags',           txt: 'Precios'   },
      { isPerfil: true }, { isSalir: true },
    ],
  },
  admin: {
    nvleft: [
      { href: '/admin',    page: 'admin',    ico: 'fa-globe', txt: 'Plataforma' },
      { href: '/usuarios', page: 'usuarios', ico: 'fa-users', txt: 'Usuarios'   },
      { href: '/permisos', page: 'permisos', ico: 'fa-lock',  txt: 'Permisos'   },
      { href: '/sistema',  page: 'sistema',  ico: 'fa-cogs',  txt: 'Sistema'    },
      { href: '/chat', page: 'chat', ico: 'fa-comments', txt: 'Chat Grupal' },
    ],
    nvright: [
      { href: '/mifcm',    page: 'mifcm',    ico: 'fa-bell',  txt: 'Mi FCM'     },
      { href: '/word',      page: 'word',      ico: 'fa-rocket', txt: 'Planificar'     },
      { href: '/nuevo',    page: 'nuevo',    ico: 'fa-plus',        txt: 'Post' },
      { href: '/notas', page: 'notas', ico: 'fa-comments',    txt: 'Book'   },
      { isPerfil: true }, { isSalir: true },
    ],
  },
  verificar: {
    nvleft:  [],
    nvright: [],
  },
};

// ── RUTAS — Fuente única de verdad - roles: null = público · ['rol',...] = protegido · area = carpeta del módulo ───────────────────────────────────────────────
export const RUTAS = [
  // ── Core público ───────────────────────────────────────────────
  { path: '/inicio',   area: 'web/' },
  { path: '/login',    area: 'web/' },
  { path: '/emojis',   area: 'web/' },
  { path: '/registrado',   area: 'web/' },

  // ── Submódulos públicos ───────────────────────────────────────────────
  { path: '/blog',     area: 'web/blog/' },
  { path: '/post',     area: 'web/blog/'    }, 
  { path: '/chatwil',  area: 'web/chatwil/' },

  // ── Acerca / Legales / Info ───────────────────────────────────────────────
  { path: '/acerca',     area: 'web/acerca/' },
  { path: '/descubre',   area: 'web/acerca/' },
  { path: '/terminos',   area: 'web/acerca/' },
  { path: '/cookies',    area: 'web/acerca/' },
  { path: '/privacidad', area: 'web/acerca/' },
  { path: '/feedback',   area: 'web/acerca/' },
  { path: '/contacto',   area: 'web/acerca/' },

  // ── Autenticadas (smile) ───────────────────────────────────────────────
  { path: '/agregar',  area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/smile',    area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/notas',    area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/perfil',   area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/mensajes', area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/word',     area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/nuevo',    area: 'web/blog/', roles: ['smile','gestor','admin'] },

  // ── Tours App — smile ────────────────────────────────────────────────
  { path: '/registrar', area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/ranking',   area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/historial', area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/tours',     area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/avisar',    area: 'smile/', roles: ['smile','gestor','admin'] },
  { path: '/chat',      area: 'smile/', roles: ['smile','gestor','admin'] },
  // ── Tours App — gestor ────────────────────────────────────────────────
  { path: '/rrhh',      area: 'gestor/', roles: ['gestor','admin'] },
  { path: '/precios',   area: 'gestor/', roles: ['gestor','admin'] },

  // ── Autenticadas (roles superiores) ───────────────────────────────────────────────
  { path: '/gestor',   area: 'gestor/',  roles: ['gestor','admin'] },
  { path: '/admin',    area: 'admin/',   roles: ['admin']          },
  { path: '/usuarios', area: 'admin/',   roles: ['admin']          },
  { path: '/permisos', area: 'admin/',   roles: ['admin']          },
  { path: '/sistema',  area: 'admin/',   roles: ['admin']          },
  { path: '/mifcm',    area: 'admin/',   roles: ['admin']          },
  { path: '/verificar',area: 'verificar/',roles: ['admin']          },
];

// ── GLOB — Vite mapea todos los módulos en build time ───────────────────────────────────────────────
const MODS = import.meta.glob([
  './{web,smile,gestor,admin,verificar}/**/*.js',
  '!./web/inicio.js',
  '!./web/chatwil/head/**/*.js',
  '!./web/chatwil/memoria.js',
  '!./web/chatwil/brain.js',
  '!./web/blog/devblog.js',
  '!./web/blog/wiad.js'
]);
const rutasMod = (area, page) => MODS[`./${area}${page}.js`];

// ── MOTOR ──────────────────────────────────────────────────────────────────────
class WiRutas {
  constructor() {
    this.rutas     = {};               // funciones lazy originales — nunca se sobreescriben
    this.cache     = { '/inicio': inicioMod }; // inicio eagerly bundled, cero red
    this.modActual = null;
    this.cargand   = false;
    this.HOME      = 'inicio';
    this.main      = '#wimain';
    this.pathActual = null;
    this.isFirstLoad = true;
  }

  register(path, fn) { this.rutas[path] = fn; }
  inicio() { return Promise.resolve(inicioMod); }

  registerAll(getRol) {
    const pub = {}, priv = {};

    RUTAS.forEach(({ path, area, roles = null, mod }) => {
      if (path === '/inicio') {
        pub[path] = () => this.inicio();
        return;
      }
      const page = mod ?? path.split('/').pop();
      const imp  = rutasMod(area, page);
      if (!imp) { console.warn(`[ruta] no encontrado: ${area}${page}.js`); return; }
      roles === null ? (pub[path] = imp) : (priv[path] ??= []).push({ roles, imp });
    });

    const noAuth = () => Promise.resolve({
      render: () => '',
      init:   () => setTimeout(() => this.navigate('/login'), 0),
    });

    new Set([...Object.keys(pub), ...Object.keys(priv)]).forEach(path => {
      const pubImp   = pub[path];
      const privList = priv[path] || [];
      const resolve  = () => { const rol = getRol?.() || null; return privList.find(e => e.roles.includes(rol)); };

      if (!privList.length)  return this.register(path, pubImp);
      if (!pubImp)           return this.register(path, () => { const e = resolve(); return e ? e.imp() : noAuth(); });
      this.register(path, () => { const e = resolve(); return e ? e.imp() : pubImp(); });
    });
  }

  // ── PREFETCH: descarga el módulo al hacer hover, sin bloquear nada ───────────
  async prefetch(ruta) {
    const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);
    if (this.cache[norm] || !this.rutas[norm]) return;   // ya listo o no existe
    try {
      this.cache[norm] = await this.rutas[norm]();
      console.log(`⚡ Listo ${norm.replace('/', '')}`);
    } catch { console.warn('[ruta] prefetch falló:', norm); }
  }

  // ── NAVIGATE: si ya está en cache, carga instantánea ─────────────────────────
  async navigate(ruta, historial = true) {
    if (this.cargand) return;
    this.cargand = true;
    const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);

    // ── GUARD ADMIN ───────────────────────────────────────────────────────────
    if (['/admin','/usuarios','/permisos','/sistema','/mifcm'].includes(norm)) {
      const { getls } = await import('./widev.js');
      const wi = getls('wiSmile'), go = r => (this.cargand = false, this.navigate(r, true));
      const dest = !wi || wi.rol !== 'admin' ? '/' : wi.estado !== 'activo' ? '/registrado' : !sessionStorage.getItem('vault_unlocked') ? '/verificar' : null;
      if (dest) return go(dest);
    }

    try {
      this.modActual?.cleanup?.();
      const slug = !this.rutas[norm] ? norm.slice(1) : null;
      const cargar  = slug ? rutasMod('web/blog/', 'post') : (this.rutas[norm] ?? rutasMod('web/', '404'));
      const mod = this.cache[norm] ?? await cargar();
      if (!slug) this.cache[norm] = mod;

      const [html] = await Promise.all([mod.render(slug)]);
      
      document.body.classList.remove('is-public-profile');
      this.marcarNav(norm);
      window.dispatchEvent(new CustomEvent('winavigate', { detail: { norm } }));

      // Hydration: Solo preservar contenido prerenderizado si la ruta ES la del inicio
      // (el index.html genérico solo tiene prerender del inicio; en otras rutas siempre inyectar)
      const esHydration = this.isFirstLoad
        && $(this.main).children().length > 0
        && !window.__WIREADY__
        && norm === `/${this.HOME}`;
      if (esHydration) {
        this.isFirstLoad = false;
      } else {
        await wiFade(this.main, html);
      }
      this.isFirstLoad = false;

      window.scrollTo(0, 0);


      mod.init?.(slug);

      if (historial) wiPath.poner(norm === `/${this.HOME}` ? '/' : norm, document.title);
      this.pathActual = norm;
      this.modActual = mod;
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) return location.reload();
      Notificacion('Error en la ruta');
      console.error('[ruta] navigate:', err);
    } finally {
      this.cargand = false;
    }
  }

  marcarNav(norm) {
    const pag = norm.slice(1) || this.HOME;
    $('.nv_item').removeClass('active');
    $(`.nv_item[data-page="${pag}"]`).addClass('active');
  }

  init() {
    this.marcarNav(wiPath.actual === '/' ? `/${this.HOME}` : wiPath.limpiar(wiPath.actual));

    $(document)
      .on('click', '.nv_item', (e) => {
        e.preventDefault();
        const pag = $(e.currentTarget).data('page');
        this.navigate(pag === this.HOME ? '/' : `/${pag}`);
      })
      .on('mouseenter touchstart', '.nv_item[data-page]', (e) => {
        const pag = $(e.currentTarget).data('page');
        this.prefetch(pag === this.HOME ? '/' : `/${pag}`);
      });

    window.addEventListener('popstate', (e) => {
      const ruta = e.state?.ruta || wiPath.actual;
      const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);
      if (norm === this.pathActual) return;
      this.navigate(ruta, false);
    });
    this.navigate(wiPath.actual, false);
  }
}

export const rutas = new WiRutas();
