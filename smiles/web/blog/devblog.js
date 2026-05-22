import { savels, getls, wiTip } from '../../widev.js';
import { db } from '../../firebase.js';
import { doc, getDoc, collection, getDocs, updateDoc, increment, query, orderBy, limit, startAfter, where } from 'firebase/firestore';

// ── CONFIG ────────────────────────────────────────────────────
export const COL = 'blog';
const TTL = { list: 3, post: 12, rel: 6 };
const K   = { list: (c, o) => c === 'todo' && o === 'nuevo' ? 'wi_blogs' : `wi_blogs_${c}_${o}`, post: s => `wi_post_${s}`, rel: c => `wi_mas_${c}` };

// ── SERIALIZAR ────────────────────────────────────────────────
const toMs = v => v?.toDate?.()?.getTime?.() ?? v ?? null;
export const ser = (d, id) => ({ ...(id ? {slug: id, id: id} : {}), ...d, creado: toMs(d.creado), actualizado: toMs(d.actualizado) });

// ── SANITIZAR HTML (Sin paquetes) ─────────────────────────────
export const wiSanihtml = (html) => {
  if (!html) return '';
  let str = html.toString();
  str = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  str = str.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  str = str.replace(/(\bon[a-z]+\s*=\s*"[^"]*")/gi, '');
  str = str.replace(/(\bon[a-z]+\s*=\s*'[^']*')/gi, '');
  str = str.replace(/(\bon[a-z]+\s*=\s*[^\s>]+)/gi, '');
  str = str.replace(/<\/?(iframe|embed|object|applet)\b[^>]*>/gi, '');
  str = str.replace(/href\s*=\s*(['"]?)\s*javascript:[^>]*\1/gi, 'href="#"');
  return str;
};

// ── FECHA ─────────────────────────────────────────────────────
const FMT = { corta: { day:'numeric', month:'short', year:'numeric' }, larga: { day:'numeric', month:'long', year:'numeric' } };
export const superDate = (ms, largo) => { if (!ms) return ''; try { return new Date(ms).toLocaleDateString('es-PE', largo ? FMT.larga : FMT.corta); } catch { return ''; } };

// ── CATEGORÍAS ────────────────────────────────────────────────
export const CATS = [
  { id:'todo',        icon:'fa-grip',     label:'Todas',       color:'var(--mco)' },
  { id:'Amor',        icon:'fa-heart',    label:'Amor',        color:'#ff3849'    },
  { id:'Esperanza',   icon:'fa-dove',     label:'Esperanza',   color:'#0EBEFF'    },
  { id:'Fortaleza',   icon:'fa-mountain', label:'Fortaleza',   color:'#6a00f5'    },
  { id:'Pensamientos',icon:'fa-brain',    label:'Pensamientos',color:'#ffa726'    },
  { id:'Proposito',   icon:'fa-compass',  label:'Proposito',   color:'#25b62a'    },
  { id:'Sufrimiento', icon:'fa-droplet',  label:'Sufrimiento', color:'#757575'    },
  { id:'Tristeza',    icon:'fa-cloud-showers-heavy', label:'Tristeza', color:'#455a64' },
];
export const catInfo = cat => CATS.find(c => c.id === cat) || CATS[1];

// ── SKELETON ──────────────────────────────────────────────────
export const skCard = () => `<div class="bl_card_sk"><div class="bl_sk_img shimmer"></div><div class="bl_sk_body"><div class="bl_sk_cat shimmer"></div><div class="bl_sk_tit shimmer"></div><div class="bl_sk_tit bl_sk_t2 shimmer"></div><div class="bl_sk_p shimmer"></div><div class="bl_sk_p bl_sk_p2 shimmer"></div><div class="bl_sk_foot shimmer"></div></div></div>`;

// ── FADE ──────────────────────────────────────────────────────
export const fade = (cls = 'bl_fade', root = document) => requestAnimationFrame(() =>
  root.querySelectorAll?.(`.${cls}:not(.${cls.replace('fade','visible')})`)?.forEach(el => {
    const d = parseFloat(el.style.getPropertyValue('--d') || '0');
    if (d > 0) el.style.transitionDelay = `${d}s`;
    el.classList.add(cls.replace('fade', 'visible'));
  })
);

// ── SHARES ────────────────────────────────────────────────────
export const shareLinks = t => [
  { icon:'fab fa-facebook',  url:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(location.href)}`, color:'#1877F2', label:'Facebook'  },
  { icon:'fab fa-twitter',   url:`https://twitter.com/intent/tweet?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(t)}`, color:'#1da1f2', label:'Twitter'   },
  { icon:'fab fa-whatsapp',  url:`https://wa.me/?text=${encodeURIComponent(t+' '+location.href)}`, color:'#25D366', label:'WhatsApp'  },
  { icon:'fab fa-telegram',  url:`https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(t)}`, color:'#0088cc', label:'Telegram' },
];

export const tplShare = (titulo, full) => shareLinks(titulo).map((r, i) => full || i < 3 ? `
  <a href="${r.url}" target="_blank" rel="noopener" class="po_share_${full?'full_':''}btn" style="--sc:${r.color}" ${wiTip(r.label)}>
    <i class="${r.icon}"></i>${full ? ` ${r.label}` : ''}
  </a>` : '').join('');

// ── BADGE FUENTE ──────────────────────────────────────────────
export const srcBadge = fc => fc
  ? `<span class="bl_cache_tag" ${wiTip('⚡ Veloz')}><i class="fas fa-bolt"></i> Veloz</span>`
  : `<span class="bl_fire_tag"  ${wiTip('☁️ Online')}><i class="fas fa-cloud"></i> Online</span>`;

// ── LIMPIEZA LRU CACHÉ ────────────────────────────────────────
export const cleanCacheLRU = () => {
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('wi_blogs') || k.startsWith('wi_post_') || k.startsWith('wi_mas_'));
    if (keys.length > 25) {
      const items = keys.map(k => {
        const raw = localStorage.getItem(k);
        if(!raw) return {k, e:0};
        try { const p = JSON.parse(raw); return {k, e: p.e || 0}; } catch { return {k, e:0}; }
      }).sort((a,b) => a.e - b.e);
      items.slice(0, 10).forEach(i => localStorage.removeItem(i.k)); // Eliminar los 10 más viejos
    }
  } catch(e) {}
};

// ── LISTA DE POSTS (Paginación Real sin index manual) ─────────
export const getPostsPaginated = async (cat = 'todo', orden = 'nuevo', force = false, lastSnap = null, pageSize = 16) => {
  cleanCacheLRU();
  const PAGE_SIZE = pageSize;
  
  // Cache check para página 1
  const key = K.list(cat, orden) + (lastSnap ? '_page' : '');
  if (!force && !lastSnap) { 
    const c = getls(key); 
    if (Array.isArray(c) && c.length) return { lista: c, fromCache: true, lastSnap: null }; 
  }

  if (!db) return { lista: [], fromCache: false, lastSnap: null };

  const colRef = collection(db, COL);
  const orderField = orden === 'vistas' ? 'vistas' : 'creado';
  let q;

  if (cat === 'todo') {
    const args = [colRef, orderBy(orderField, 'desc')];
    if (lastSnap) args.push(startAfter(lastSnap));
    q = query(...args, limit(PAGE_SIZE));
  } else {
    const args = [colRef, where('categoria', '==', cat)];
    if (lastSnap) args.push(startAfter(lastSnap));
    q = query(...args, limit(PAGE_SIZE));
  }

  const snap = await getDocs(q);
  let lista = snap.docs.map(d => ser(d.data(), d.id)).filter(d => d.activo !== false);
  const newLastSnap = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;

  // Si usamos where('categoria'), firebase ignora el orden sin index. Lo ordenamos localmente.
  if (cat !== 'todo') {
    lista.sort((a, b) => orden === 'vistas' ? (b.vistas||0)-(a.vistas||0) : (b.creado||0)-(a.creado||0));
  }

  if (lista.length && !lastSnap) savels(key, lista, TTL.list);
  
  return { lista, fromCache: false, lastSnap: newLastSnap };
};

// Mantenemos esta función para mantener compatibilidad con otras áreas mientras tanto
let _allCache = null, _allTime = 0;
export const fetchAll = async (force) => {
  if (!force && _allCache && Date.now() - _allTime < 60000) return _allCache;
  if (!db) return [];
  const snap = await getDocs(query(collection(db, COL), orderBy('creado', 'desc'), limit(50)));
  _allCache = snap.docs.map(d => ser(d.data(), d.id)).filter(d => d.activo);
  _allTime = Date.now();
  return _allCache;
};

// ── POST INDIVIDUAL ───────────────────────────────────────────
export const getPost = async (slug, force = false) => {
  if (!force) { const c = getls(K.post(slug)); if (c) return { data: c, fromCache: true }; }
  if (!db) return null;
  const snap = await getDoc(doc(db, COL, slug));
  if (!snap.exists()) return null;
  const data = ser(snap.data(), snap.id);
  savels(K.post(slug), data, TTL.post);
  return { data, fromCache: false };
};

// ── PREVIEW RÁPIDO (desde cache del blog) ─────────────────────
export const getPreview = slug => {
  const c = getls(K.post(slug));
  if (c) return c;

  for (const k of Object.keys(localStorage).filter(k => k.startsWith('wi_blogs'))) {
    const arr = getls(k);
    if (Array.isArray(arr)) { const p = arr.find(d => d.slug === slug || d.id === slug); if (p) return p; }
  }
  return null;
};

// ── ÚLTIMAS PUBLICACIONES ───────────────────────────────────────
export const getUltimas = async (slug, force = false) => {
  if (!force) { const c = getls('wi_sidebar_posts'); if (Array.isArray(c)) return c.filter(d => d.slug !== slug && d.id !== slug).slice(0, 5); }
  let pool = _allCache || [];
  if (!pool.length) {
    for (const k of Object.keys(localStorage).filter(k => k.startsWith('wi_blogs'))) {
      const arr = getls(k);
      if (Array.isArray(arr) && arr.length) { pool = arr; break; }
    }
  }
  if (!pool.length) pool = await fetchAll(force);
  const lista = pool.filter(d => d.activo !== false).sort((a, b) => (b.creado||0)-(a.creado||0)).slice(0, 6);
  if (lista.length) savels('wi_sidebar_posts', lista, TTL.list);
  return lista.filter(d => d.slug !== slug && d.id !== slug).slice(0, 5);
};

// ── RELACIONADOS (desde memoria/cache, sin Firestore extra) ──
export const getRelacionados = async (slug, categoria, force = false) => {
  if (!force) { const c = getls(K.rel(categoria)); if (Array.isArray(c)) return c.filter(d => d.slug !== slug && d.id !== slug).slice(0, 3); }
  // Intenta usar _allCache si existe, sino busca en localStorage del blog
  let pool = _allCache || [];
  if (!pool.length) {
    for (const k of Object.keys(localStorage).filter(k => k.startsWith('wi_blogs'))) {
      const arr = getls(k);
      if (Array.isArray(arr) && arr.length) { pool = arr; break; }
    }
  }
  // Solo si no hay nada, hacemos fetch
  if (!pool.length) pool = await fetchAll(force);
  const lista = pool.filter(d => d.activo !== false && d.categoria === categoria)
    .sort((a, b) => (b.creado||0)-(a.creado||0)).slice(0, 5);
  if (lista.length) savels(K.rel(categoria), lista, TTL.rel);
  return lista.filter(d => d.slug !== slug && d.id !== slug).slice(0, 3);
};

// ── PREFETCH (hover en blog) ──────────────────────────────────
const _prefetched = new Set();
export const prefetchPost = slug => {
  if (!db || _prefetched.has(slug) || getls(K.post(slug))) return;
  _prefetched.add(slug);
  getDoc(doc(db, COL, slug)).then(s => s.exists() && savels(K.post(slug), ser(s.data(), s.id), TTL.post)).catch(() => {});
};

// ── VISTAS, LIKES + CACHE CLEAR ───────────────────────────────
export const addView = s => { if (!db) return; updateDoc(doc(db, COL, s), { vistas: increment(1) }).catch(() => {}); };
export const addLike = s => {
  if (db) updateDoc(doc(db, COL, s), { likes: increment(1) }).catch(() => {});
  const p = getls(K.post(s));
  if (p) { p.likes = (p.likes || 0) + 1; savels(K.post(s), p, TTL.post); }
};
export const clearPostCache = s => localStorage.removeItem(K.post(s));
export const clearRelCache = c => localStorage.removeItem(K.rel(c));
export const clearBlogCache = () => Object.keys(localStorage).filter(k => k.startsWith('wi_blogs')).forEach(k => localStorage.removeItem(k));