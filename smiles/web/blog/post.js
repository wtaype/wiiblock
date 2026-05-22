import './post.css';
import $ from 'jquery';
import { adRight } from './wiad.js';
import { app, icon} from '../../wii.js';
import { wiAuth, Notificacion, wicopy, wiTip, wiSmart, setMeta, showi, getls } from '../../widev.js';
import { getPost, getPreview, getRelacionados, getUltimas, addView, addLike, superDate, tplShare, fade, clearPostCache, clearRelCache } from './devblog.js';

const tplRel = r => `<a href="/${r.slug || r.id}" class="po_rel_card" ${wiTip(r.resumen||r.titulo)}><div class="po_rel_img"><img src="${r.imagen}" alt="${r.imagenAlt||r.titulo}" loading="lazy"/></div><div class="po_rel_info"><span class="po_rel_cat"><i class="fas fa-paw"></i> ${r.categoria}</span><strong>${r.titulo}</strong><span class="po_rel_meta"><i class="fas fa-calendar"></i> ${superDate(r.actualizado || r.creado)} · <i class="fas fa-eye"></i> ${r.vistas||0} · <i class="fas fa-heart" style="color:#fe0149"></i> ${r.likes||0}</span></div></a>`;

// ── Template navegación anterior/siguiente (reutilizable) ────
const tplNav = (prevP, nextP, f = 'po_fade po_visible') => (prevP || nextP) ? `
    <div class="po_pn_box ${f}" style="--d:.4s">
      ${prevP ? `<a href="/${prevP.slug||prevP.id}" class="po_pn_card pn_prev" ${wiTip('Anterior')}><div class="po_pn_img"><img src="${prevP.imagen}" loading="lazy"/></div><div class="po_pn_info"><span class="po_pn_lb"><i class="fas fa-arrow-left"></i> Anterior</span><strong class="po_pn_tit">${prevP.titulo}</strong></div></a>` : '<div></div>'}
      ${nextP ? `<a href="/${nextP.slug||nextP.id}" class="po_pn_card pn_next" ${wiTip('Siguiente')}><div class="po_pn_info"><span class="po_pn_lb">Siguiente <i class="fas fa-arrow-right"></i></span><strong class="po_pn_tit">${nextP.titulo}</strong></div><div class="po_pn_img"><img src="${nextP.imagen}" loading="lazy"/></div></a>` : '<div></div>'}
    </div>` : '';

// ── HTML DEL POST (Plantilla pura y limpia) ───────────────────
const tplPost = (p, rels, ultimas, slug, fromCache) => {
  const isAdmin = wiAuth.user?.usuario;
  const f = fromCache ? 'po_fade po_visible' : 'po_fade';
  
  const hasSidebarData = rels !== null && ultimas !== null;
  const relsArr = rels || [];
  const ultimasArr = ultimas || [];

  const prevP = relsArr[0] || ultimasArr[0];
  const nextP = relsArr[1] || ultimasArr[1];
  const navHtml = hasSidebarData ? tplNav(prevP, nextP, f) : '<div id="po_nav_container"></div>';

  return `
    <div class="po_progress_bar" id="po_progress"></div>
    <div class="po_wrap"><div class="po_layout">
      <div class="po_col_main"><div class="po_content">
        <div class="po_hero ${f}" style="--d:0s">
          <img src="${p.imagenTop||p.imagen}" alt="${p.imagenAlt||p.titulo}" class="po_hero_img" loading="eager"/>
          <div class="po_hero_over">
            <a href="/blog" class="po_back" ${wiTip('Volver')}><i class="fas fa-arrow-left"></i> Blog</a>
            <div class="po_hero_badges">
              <span class="po_cat_badge" ${wiTip(p.categoria)}><i class="fas fa-paw"></i> ${p.categoria}</span>
              ${p.pin?`<span class="po_dest_badge" ${wiTip('Destacada')}><i class="fas fa-thumbtack"></i> Pin</span>`:''}
              <button class="po_like_btn po_like_sync ${localStorage.getItem('wi_like_'+slug)?'active':''}" data-slug="${slug}" ${wiTip('Me encanta')} style="border-color:rgba(255,255,255,0.2);background:rgba(0,0,0,0.4);color:#fff;padding:.6vh 1.2vh;font-size:var(--fz_s4)"><i class="fas fa-heart"></i> <span class="po_likes_count_text">${p.likes||0}</span></button>
            </div>
          </div>
        </div>
        <header class="po_header ${f}" style="--d:.1s">
          <h1 class="po_titulo">${p.titulo}</h1>
          <p class="po_resumen">${p.resumen}</p>
          <div class="po_meta">
            <span ${wiTip('Autor')}><i class="fas fa-user-pen"></i> ${p.autor}</span>
            <span ${wiTip('Fecha')}><i class="fas fa-calendar"></i> ${superDate(p.creado,true)}</span>
            <span ${wiTip('Lectura')}><i class="fas fa-clock"></i> ${p.tiempoLectura}</span>
            <span ${wiTip('Vistas')}><i class="fas fa-eye"></i> ${(p.vistas||0)+1}</span>
            <button class="po_like_btn po_like_sync ${localStorage.getItem('wi_like_'+slug)?'active':''}" data-slug="${slug}" ${wiTip('Me encanta')}><i class="fas fa-heart"></i> <span class="po_likes_count_text">${p.likes||0}</span></button>
            ${fromCache?`<span class="po_cache_badge" ${wiTip('Cache ⚡')}><i class="fas fa-bolt"></i> Local</span>`:''}
          </div>
        </header>
        <div class="po_contenido ${f}" style="--d:.2s">${p.contenido}</div>
        ${navHtml}
        <div class="po_share ${f}" style="--d:.45s"><span><i class="fas fa-share-nodes"></i> Comparte</span>
          <div class="po_share_btns">
            <button class="po_like_btn po_like_sync ${localStorage.getItem('wi_like_'+slug)?'active':''}" data-slug="${slug}" ${wiTip('Me encanta')}><i class="fas fa-heart"></i> <span class="po_likes_count_text">${p.likes||0}</span></button>
            ${tplShare(p.titulo)}<button class="po_share_btn po_copy" style="--sc:var(--mco)" ${wiTip('Copiar')}><i class="fas fa-link"></i></button>
          </div>
        </div>
      </div>
      <div id="wi_comments" class="po_comments ${f}" style="--d:.55s"><div class="po_comments_title"><i class="fas fa-comments"></i> Comentarios</div><div id="disqus_thread"></div></div>
    </div>
    <aside class="po_sidebar">
      <div class="po_side_card ${f}" style="--d:.15s">
        <div class="po_side_title"><i class="fas fa-user-pen"></i> Autor</div>
        <div class="po_autor_box"><div class="po_autor_av"><img src="${import.meta.env.BASE_URL}smile.avif" alt="${p.autor}"/></div><div class="po_autor_info"><strong>${p.autor}</strong><span>${app} <i class="fas ${icon}"></i></span></div></div>
        ${isAdmin?`<div class="po_admin_actions" style="margin-top:.8vh"><a href="/nuevo?edit=${slug}" class="po_admin_btn_edit" ${wiTip('Editar')}><i class="fas fa-pen"></i> Editar</a><button id="po_refresh" class="po_admin_btn_refresh" data-slug="${slug}" data-cat="${p.categoria}" ${wiTip('Recargar')}><i class="fas fa-rotate"></i></button></div>`:''}
      </div>
      <div id="po_ultimas_container">${hasSidebarData ? (ultimasArr.length?`<div class="po_side_card ${f}" style="--d:.2s"><div class="po_side_title"><i class="fas fa-clock"></i> Últimas historias</div><div class="po_relacionados" data-showi="100">${ultimasArr.map(tplRel).join('')}</div></div>`:'') : '<div class="po_side_card po_fade po_visible" style="--d:.2s"><div class="po_side_title"><i class="fas fa-clock"></i> Últimas historias</div><div class="po_sk_side shimmer" style="height:120px"></div></div>'}</div>
      <div id="po_rels_container">${hasSidebarData ? (relsArr.length?`<div class="po_side_card ${f}" style="--d:.25s"><div class="po_side_title"><i class="fas fa-heart"></i> Más historias de ${p.categoria}</div><div class="po_relacionados" data-showi="100">${relsArr.map(tplRel).join('')}</div></div>`:'') : `<div class="po_side_card po_fade po_visible" style="--d:.25s"><div class="po_side_title"><i class="fas fa-heart"></i> Más historias de ${p.categoria}</div><div class="po_sk_side shimmer" style="height:120px"></div></div>`}</div>
    
      <!-- AdSense Sticky Sidebar 300x600 con adRight Fallback -->
      <div class="po_ad_sticky ${f}" style="--d:.3s; position: sticky; top: 8vh; margin-top: 2vh; text-align:center; min-height:600px;">
         <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1362457560630815" data-ad-slot="1800353788" data-ad-format="auto" data-full-width-responsive="true"></ins>
         <div class="wi_ad_fallback">${adRight}</div>
      </div>
    </aside>
  </div></div>`;
};

let cacheRenderizado = false;

// ── RENDER (Ultra Speed) ──────────────────────────────────────
export const render = (slug) => {
  // 🔥 Magia Absoluta: Devolver el HTML final en el milisegundo 0 si hay caché
  const p = slug && getls(`wi_post_${slug}`);
  if (p) {
    cacheRenderizado = true;
    return tplPost(p, getls(`wi_mas_${p.categoria}`) || [], getls('wi_sidebar_posts') || [], slug, true);
  }
  cacheRenderizado = false;

  const prev = slug && getPreview(slug);
  if (prev) return `
    <div class="po_wrap"><div class="po_layout"><div class="po_col_main"><div class="po_content">
      <div class="po_hero po_fade po_visible" style="--d:0s"><img src="${prev.imagenTop||prev.imagen}" alt="${prev.imagenAlt||prev.titulo}" class="po_hero_img" loading="eager"/><div class="po_hero_over"><a href="/blog" class="po_back" ${wiTip('Volver')}><i class="fas fa-arrow-left"></i> Blog</a><div class="po_hero_badges"><span class="po_cat_badge"><i class="fas fa-paw"></i> ${prev.categoria}</span></div></div></div>
      <header class="po_header po_fade po_visible" style="--d:0s"><h1 class="po_titulo">${prev.titulo}</h1><p class="po_resumen">${prev.resumen}</p></header>
      <div class="po_contenido po_fade" style="--d:.1s; min-height:98vh;"><div class="po_sk_body">${'<div class="po_sk_p shimmer"></div>'.repeat(6)}</div></div>
    </div></div><aside class="po_sidebar" style="min-height:98vh;">${'<div class="po_sk_side shimmer"></div>'.repeat(3)}</aside></div></div>`;

  return `<div class="po_wrap"><div class="po_layout"><div class="po_col_main"><div class="po_content"><div class="po_sk_img shimmer"></div><div class="po_sk_body" style="min-height:98vh;"><div class="po_sk_cat shimmer"></div><div class="po_sk_tit shimmer"></div><div class="po_sk_meta shimmer"></div>${'<div class="po_sk_p shimmer"></div>'.repeat(5)}</div></div></div><aside class="po_sidebar" style="min-height:98vh;">${'<div class="po_sk_side shimmer"></div>'.repeat(3)}</aside></div></div>`;
};

// ── INIT ──────────────────────────────────────────────────────
export const init = async (slug, force = false) => {
  if (!slug) return;
  // 1. Inicializar animaciones de la UI síncrona
  if (cacheRenderizado && !force) {
    fade('po_fade'); showi(); setupTOC(); setupScroll();
  }

  try {
    const result = await getPost(slug, force);

    if (!result?.data?.activo) return $('#wimain').html(`<div class="po_err dpvc"><i class="fas fa-paw"></i><h2>Historia no encontrada</h2><p>No existe o no está disponible 🐾</p><a href="/blog" class="po_back_btn"><i class="fas fa-arrow-left"></i> Ver historias</a></div>`);

    const { data: p, fromCache } = result;
    if (!fromCache && !force) addView(slug);

    setMeta({ title: p.titulo, desc: p.resumen, keywords: p.keywords, img: p.imagenTop||p.imagen, path: `/${slug}`, type: 'Article', datePublished: p.creado });

    if (!cacheRenderizado || force) {
      $('#wimain').html(tplPost(p, null, null, slug, fromCache));
      fade('po_fade'); showi(); setupTOC(); setupScroll();
    } else if (!fromCache) {
      // Actualización silenciosa si se descargó info fresca
      $('.po_cache_badge').remove();
    }

    // Carga secundaria (Deferred Sidebar & Nav)
    const renderDeferredSidebar = (rels, ultimas) => {
      $('#po_nav_container').html(tplNav(rels[0] || ultimas[0], rels[1] || ultimas[1]));
      $('#po_ultimas_container').html(ultimas.length?`<div class="po_side_card po_fade po_visible" style="--d:0s"><div class="po_side_title"><i class="fas fa-clock"></i> Últimas historias</div><div class="po_relacionados" data-showi="100">${ultimas.map(tplRel).join('')}</div></div>`:'');
      $('#po_rels_container').html(rels.length?`<div class="po_side_card po_fade po_visible" style="--d:0s"><div class="po_side_title"><i class="fas fa-heart"></i> Más historias de ${p.categoria}</div><div class="po_relacionados" data-showi="100">${rels.map(tplRel).join('')}</div></div>`:'');
      showi();
    };

    Promise.all([
      getRelacionados(slug, p.categoria, force),
      getUltimas(slug, force)
    ]).then(([relacionados, ultimas]) => {
      renderDeferredSidebar(relacionados || [], ultimas || []);
    });

    const dCfg = function(){ this.page.url=`https://wiihope.com/${slug}`; this.page.identifier=slug; this.page.title=p.titulo; };
    window.DISQUS ? window.DISQUS.reset({reload:true,config:dCfg}) : (window.disqus_config=dCfg, wiSmart({disqus:[async()=>$('body').append($('<script>',{src:'https://superwii.disqus.com/embed.js','data-timestamp':+new Date()}))]}));

    console.log(`🐾 ${app} Post OK`);
    window.__WIREADY__ = true;

  } catch(e) { console.error('[post]',e); Notificacion('Error al cargar','error'); }
};

// ── HELPERS ───────────────────────────────────────────────────
function setupTOC() {
  if ($('.po_toc_box').length) return;
  const headings = $('.po_contenido').find('h2,h3');
  if (!headings.length) return;
  let html = '<div class="po_toc_box po_fade" style="--d:.15s"><div class="po_toc_title"><i class="fas fa-list"></i> En este artículo</div><ul class="po_toc">';
  headings.each((i, el) => { const id='po_h_'+i; $(el).attr('id',id).css('scroll-margin-top','7vh'); html+=`<li style="margin-left:${el.tagName.toLowerCase()==='h3'?'1.5vh':'0'}"><a href="#${id}" class="po_toc_link">${$(el).text()}</a></li>`; });
  $(html+'</ul></div>').insertBefore('.po_contenido');
}

function setupScroll() {
  $(window).off('scroll.post_prog').on('scroll.post_prog', () => $('#po_progress').css('width', ($(window).scrollTop() / Math.max($(document).height()-$(window).height(),1) * 100) + '%'));
}

// ── EVENTOS GLOBALES ──────────────────────────────────────────
$(document)
  .on('click.post', '.po_copy,.po_copy2', () => wicopy(location.href, '.po_copy', '¡Enlace copiado! 🔗'))
  .on('click.post', '.po_rel_card', function(e) { e.preventDefault(); import('../../rutas.js').then(m => m.rutas.navigate($(this).attr('href'))); })
  .on('click.post', '.po_like_sync', function() {
    const s = $(this).data('slug');
    if (localStorage.getItem('wi_like_'+s)) return;
    localStorage.setItem('wi_like_'+s,'1'); $('.po_like_sync').addClass('active');
    $('.po_likes_count_text').text((parseInt($('.po_likes_count_text').first().text())||0) + 1);
    addLike(s);
  })
  .on('click.post', '.po_yt_btn', async function() {
    const id = $(this).data('yt');
    if (!$('#wi_yt_modal').length) {
      $('body').append(`
        <div id="wi_yt_modal" class="wiModal">
          <div class="modalBody" style="background:#000; padding:0; border-radius:1.5vh; overflow:hidden; width:95%; max-width:800px; border:1px solid rgba(255,255,255,.1);">
            <button class="modalX wi_yt_close" style="color:#fff; text-shadow:0 0 8px #000; right:1.5vh; top:1vh; font-size:2.2rem; z-index:10;">&times;</button>
            <div id="wi_yt_player" style="width:100%; aspect-ratio:16/9; background:#000;"></div>
          </div>
        </div>`);
      $('#wi_yt_modal').on('click', function(e) { if (e.target === this) $('.wi_yt_close').trigger('click'); });
    }
    $('#wi_yt_player').html(`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    const { abrirModal } = await import('../../widev.js');
    abrirModal('wi_yt_modal');
  })
  .on('click.post', '.wi_yt_close', async function() {
    const { cerrarModal } = await import('../../widev.js');
    cerrarModal('wi_yt_modal');
    setTimeout(() => $('#wi_yt_player').html(''), 300);
  })
  .on('click.post', '#po_refresh', async function() {
    const $b=$(this); $b.html('<i class="fas fa-spinner fa-spin"></i>').prop('disabled',true);
    clearPostCache($b.data('slug')); clearRelCache($b.data('cat'));
    await init($b.data('slug'), true);
  });

export const cleanup = () => $(window).off('scroll.post_prog');
