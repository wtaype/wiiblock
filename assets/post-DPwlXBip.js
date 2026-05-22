import{n as e}from"./vendor-BBPjS4yS.js";import{i as t,t as n}from"./wii-DZw4TcJ0.js";import{E as r,_ as i,d as a,g as o,h as s,i as c,w as l,x as u}from"./widev-8sJg4_cC.js";import{r as d}from"./index-WaeVJtKe.js";import{c as f,f as p,m,n as h,o as g,p as _,r as v,s as y,u as b,v as x,y as S}from"./devblog-Dj72ZO6L.js";e(`#wiad_styles`).length||e(`<style id="wiad_styles">`).text(`
    .wi_ad_link { max-width:300px; }
    .wi_ad_link:hover { opacity:1!important; transform:scale(1.01); }
    .wi_ad_img { margin-block:4vh 2vh; }
  `).appendTo(`head`);var C=`
  <div class="lc_ad_side lc_ad_r">
    <a href="https://wtaype.me/" target="_blank" class="lc_ad_box wi_ad_link">
      <img src="https://typingwii.web.app/Img1.webp" alt="Ad Right" class="wi_ad_img" />
    </a>
  </div>
`,w=e=>`<a href="/${e.slug||e.id}" class="po_rel_card" ${l(e.resumen||e.titulo)}><div class="po_rel_img"><img src="${e.imagen}" alt="${e.imagenAlt||e.titulo}" loading="lazy"/></div><div class="po_rel_info"><span class="po_rel_cat"><i class="fas fa-paw"></i> ${e.categoria}</span><strong>${e.titulo}</strong><span class="po_rel_meta"><i class="fas fa-calendar"></i> ${x(e.actualizado||e.creado)} · <i class="fas fa-eye"></i> ${e.vistas||0} · <i class="fas fa-heart" style="color:#fe0149"></i> ${e.likes||0}</span></div></a>`,T=(e,t,n=`po_fade po_visible`)=>e||t?`
    <div class="po_pn_box ${n}" style="--d:.4s">
      ${e?`<a href="/${e.slug||e.id}" class="po_pn_card pn_prev" ${l(`Anterior`)}><div class="po_pn_img"><img src="${e.imagen}" loading="lazy"/></div><div class="po_pn_info"><span class="po_pn_lb"><i class="fas fa-arrow-left"></i> Anterior</span><strong class="po_pn_tit">${e.titulo}</strong></div></a>`:`<div></div>`}
      ${t?`<a href="/${t.slug||t.id}" class="po_pn_card pn_next" ${l(`Siguiente`)}><div class="po_pn_info"><span class="po_pn_lb">Siguiente <i class="fas fa-arrow-right"></i></span><strong class="po_pn_tit">${t.titulo}</strong></div><div class="po_pn_img"><img src="${t.imagen}" loading="lazy"/></div></a>`:`<div></div>`}
    </div>`:``,E=(e,r,a,o,s)=>{let c=i.user?.usuario,u=s?`po_fade po_visible`:`po_fade`,d=r!==null&&a!==null,f=r||[],p=a||[],m=f[0]||p[0],h=f[1]||p[1],g=d?T(m,h,u):`<div id="po_nav_container"></div>`;return`
    <div class="po_progress_bar" id="po_progress"></div>
    <div class="po_wrap"><div class="po_layout">
      <div class="po_col_main"><div class="po_content">
        <div class="po_hero ${u}" style="--d:0s">
          <img src="${e.imagenTop||e.imagen}" alt="${e.imagenAlt||e.titulo}" class="po_hero_img" loading="eager"/>
          <div class="po_hero_over">
            <a href="/blog" class="po_back" ${l(`Volver`)}><i class="fas fa-arrow-left"></i> Blog</a>
            <div class="po_hero_badges">
              <span class="po_cat_badge" ${l(e.categoria)}><i class="fas fa-paw"></i> ${e.categoria}</span>
              ${e.pin?`<span class="po_dest_badge" ${l(`Destacada`)}><i class="fas fa-thumbtack"></i> Pin</span>`:``}
              <button class="po_like_btn po_like_sync ${localStorage.getItem(`wi_like_`+o)?`active`:``}" data-slug="${o}" ${l(`Me encanta`)} style="border-color:rgba(255,255,255,0.2);background:rgba(0,0,0,0.4);color:#fff;padding:.6vh 1.2vh;font-size:var(--fz_s4)"><i class="fas fa-heart"></i> <span class="po_likes_count_text">${e.likes||0}</span></button>
            </div>
          </div>
        </div>
        <header class="po_header ${u}" style="--d:.1s">
          <h1 class="po_titulo">${e.titulo}</h1>
          <p class="po_resumen">${e.resumen}</p>
          <div class="po_meta">
            <span ${l(`Autor`)}><i class="fas fa-user-pen"></i> ${e.autor}</span>
            <span ${l(`Fecha`)}><i class="fas fa-calendar"></i> ${x(e.creado,!0)}</span>
            <span ${l(`Lectura`)}><i class="fas fa-clock"></i> ${e.tiempoLectura}</span>
            <span ${l(`Vistas`)}><i class="fas fa-eye"></i> ${(e.vistas||0)+1}</span>
            <button class="po_like_btn po_like_sync ${localStorage.getItem(`wi_like_`+o)?`active`:``}" data-slug="${o}" ${l(`Me encanta`)}><i class="fas fa-heart"></i> <span class="po_likes_count_text">${e.likes||0}</span></button>
            ${s?`<span class="po_cache_badge" ${l(`Cache ⚡`)}><i class="fas fa-bolt"></i> Local</span>`:``}
          </div>
        </header>
        <div class="po_contenido ${u}" style="--d:.2s">${e.contenido}</div>
        ${g}
        <div class="po_share ${u}" style="--d:.45s"><span><i class="fas fa-share-nodes"></i> Comparte</span>
          <div class="po_share_btns">
            <button class="po_like_btn po_like_sync ${localStorage.getItem(`wi_like_`+o)?`active`:``}" data-slug="${o}" ${l(`Me encanta`)}><i class="fas fa-heart"></i> <span class="po_likes_count_text">${e.likes||0}</span></button>
            ${S(e.titulo)}<button class="po_share_btn po_copy" style="--sc:var(--mco)" ${l(`Copiar`)}><i class="fas fa-link"></i></button>
          </div>
        </div>
      </div>
      <div id="wi_comments" class="po_comments ${u}" style="--d:.55s"><div class="po_comments_title"><i class="fas fa-comments"></i> Comentarios</div><div id="disqus_thread"></div></div>
    </div>
    <aside class="po_sidebar">
      <div class="po_side_card ${u}" style="--d:.15s">
        <div class="po_side_title"><i class="fas fa-user-pen"></i> Autor</div>
        <div class="po_autor_box"><div class="po_autor_av"><img src="/wiiblock/smile.avif" alt="${e.autor}"/></div><div class="po_autor_info"><strong>${e.autor}</strong><span>${n} <i class="fas ${t}"></i></span></div></div>
        ${c?`<div class="po_admin_actions" style="margin-top:.8vh"><a href="/nuevo?edit=${o}" class="po_admin_btn_edit" ${l(`Editar`)}><i class="fas fa-pen"></i> Editar</a><button id="po_refresh" class="po_admin_btn_refresh" data-slug="${o}" data-cat="${e.categoria}" ${l(`Recargar`)}><i class="fas fa-rotate"></i></button></div>`:``}
      </div>
      <div id="po_ultimas_container">${d?p.length?`<div class="po_side_card ${u}" style="--d:.2s"><div class="po_side_title"><i class="fas fa-clock"></i> Últimas historias</div><div class="po_relacionados" data-showi="100">${p.map(w).join(``)}</div></div>`:``:`<div class="po_side_card po_fade po_visible" style="--d:.2s"><div class="po_side_title"><i class="fas fa-clock"></i> Últimas historias</div><div class="po_sk_side shimmer" style="height:120px"></div></div>`}</div>
      <div id="po_rels_container">${d?f.length?`<div class="po_side_card ${u}" style="--d:.25s"><div class="po_side_title"><i class="fas fa-heart"></i> Más historias de ${e.categoria}</div><div class="po_relacionados" data-showi="100">${f.map(w).join(``)}</div></div>`:``:`<div class="po_side_card po_fade po_visible" style="--d:.25s"><div class="po_side_title"><i class="fas fa-heart"></i> Más historias de ${e.categoria}</div><div class="po_sk_side shimmer" style="height:120px"></div></div>`}</div>
    
      <!-- AdSense Sticky Sidebar 300x600 con adRight Fallback -->
      <div class="po_ad_sticky ${u}" style="--d:.3s; position: sticky; top: 8vh; margin-top: 2vh; text-align:center; min-height:600px;">
         <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-1362457560630815" data-ad-slot="1800353788" data-ad-format="auto" data-full-width-responsive="true"></ins>
         <div class="wi_ad_fallback">${C}</div>
      </div>
    </aside>
  </div></div>`},D=!1,O=e=>{let t=e&&a(`wi_post_${e}`);if(t)return D=!0,E(t,a(`wi_mas_${t.categoria}`)||[],a(`wi_sidebar_posts`)||[],e,!0);D=!1;let n=e&&p(e);return n?`
    <div class="po_wrap"><div class="po_layout"><div class="po_col_main"><div class="po_content">
      <div class="po_hero po_fade po_visible" style="--d:0s"><img src="${n.imagenTop||n.imagen}" alt="${n.imagenAlt||n.titulo}" class="po_hero_img" loading="eager"/><div class="po_hero_over"><a href="/blog" class="po_back" ${l(`Volver`)}><i class="fas fa-arrow-left"></i> Blog</a><div class="po_hero_badges"><span class="po_cat_badge"><i class="fas fa-paw"></i> ${n.categoria}</span></div></div></div>
      <header class="po_header po_fade po_visible" style="--d:0s"><h1 class="po_titulo">${n.titulo}</h1><p class="po_resumen">${n.resumen}</p></header>
      <div class="po_contenido po_fade" style="--d:.1s; min-height:98vh;"><div class="po_sk_body">${`<div class="po_sk_p shimmer"></div>`.repeat(6)}</div></div>
    </div></div><aside class="po_sidebar" style="min-height:98vh;">${`<div class="po_sk_side shimmer"></div>`.repeat(3)}</aside></div></div>`:`<div class="po_wrap"><div class="po_layout"><div class="po_col_main"><div class="po_content"><div class="po_sk_img shimmer"></div><div class="po_sk_body" style="min-height:98vh;"><div class="po_sk_cat shimmer"></div><div class="po_sk_tit shimmer"></div><div class="po_sk_meta shimmer"></div>${`<div class="po_sk_p shimmer"></div>`.repeat(5)}</div></div></div><aside class="po_sidebar" style="min-height:98vh;">${`<div class="po_sk_side shimmer"></div>`.repeat(3)}</aside></div></div>`},k=async(t,r=!1)=>{if(t){D&&!r&&(f(`po_fade`),o(),A(),j());try{let i=await b(t,r);if(!i?.data?.activo)return e(`#wimain`).html(`<div class="po_err dpvc"><i class="fas fa-paw"></i><h2>Historia no encontrada</h2><p>No existe o no está disponible 🐾</p><a href="/blog" class="po_back_btn"><i class="fas fa-arrow-left"></i> Ver historias</a></div>`);let{data:a,fromCache:c}=i;!c&&!r&&v(t),s({title:a.titulo,desc:a.resumen,keywords:a.keywords,img:a.imagenTop||a.imagen,path:`/${t}`,type:`Article`,datePublished:a.creado}),!D||r?(e(`#wimain`).html(E(a,null,null,t,c)),f(`po_fade`),o(),A(),j()):c||e(`.po_cache_badge`).remove();let l=(t,n)=>{e(`#po_nav_container`).html(T(t[0]||n[0],t[1]||n[1])),e(`#po_ultimas_container`).html(n.length?`<div class="po_side_card po_fade po_visible" style="--d:0s"><div class="po_side_title"><i class="fas fa-clock"></i> Últimas historias</div><div class="po_relacionados" data-showi="100">${n.map(w).join(``)}</div></div>`:``),e(`#po_rels_container`).html(t.length?`<div class="po_side_card po_fade po_visible" style="--d:0s"><div class="po_side_title"><i class="fas fa-heart"></i> Más historias de ${a.categoria}</div><div class="po_relacionados" data-showi="100">${t.map(w).join(``)}</div></div>`:``),o()};Promise.all([_(t,a.categoria,r),m(t,r)]).then(([e,t])=>{l(e||[],t||[])});let d=function(){this.page.url=`https://wiihope.com/${t}`,this.page.identifier=t,this.page.title=a.titulo};window.DISQUS?window.DISQUS.reset({reload:!0,config:d}):(window.disqus_config=d,u({disqus:[async()=>e(`body`).append(e(`<script>`,{src:`https://superwii.disqus.com/embed.js`,"data-timestamp":+new Date}))]})),console.log(`🐾 ${n} Post OK`),window.__WIREADY__=!0}catch(e){console.error(`[post]`,e),c(`Error al cargar`,`error`)}}};function A(){if(e(`.po_toc_box`).length)return;let t=e(`.po_contenido`).find(`h2,h3`);if(!t.length)return;let n=`<div class="po_toc_box po_fade" style="--d:.15s"><div class="po_toc_title"><i class="fas fa-list"></i> En este artículo</div><ul class="po_toc">`;t.each((t,r)=>{let i=`po_h_`+t;e(r).attr(`id`,i).css(`scroll-margin-top`,`7vh`),n+=`<li style="margin-left:${r.tagName.toLowerCase()===`h3`?`1.5vh`:`0`}"><a href="#${i}" class="po_toc_link">${e(r).text()}</a></li>`}),e(n+`</ul></div>`).insertBefore(`.po_contenido`)}function j(){e(window).off(`scroll.post_prog`).on(`scroll.post_prog`,()=>e(`#po_progress`).css(`width`,e(window).scrollTop()/Math.max(e(document).height()-e(window).height(),1)*100+`%`))}e(document).on(`click.post`,`.po_copy,.po_copy2`,()=>r(location.href,`.po_copy`,`¡Enlace copiado! 🔗`)).on(`click.post`,`.po_rel_card`,function(t){t.preventDefault(),d(()=>import(`./index-WaeVJtKe.js`).then(t=>t.rutas.navigate(e(this).attr(`href`))),[])}).on(`click.post`,`.po_like_sync`,function(){let t=e(this).data(`slug`);localStorage.getItem(`wi_like_`+t)||(localStorage.setItem(`wi_like_`+t,`1`),e(`.po_like_sync`).addClass(`active`),e(`.po_likes_count_text`).text((parseInt(e(`.po_likes_count_text`).first().text())||0)+1),h(t))}).on(`click.post`,`.po_yt_btn`,async function(){let t=e(this).data(`yt`);e(`#wi_yt_modal`).length||(e(`body`).append(`
        <div id="wi_yt_modal" class="wiModal">
          <div class="modalBody" style="background:#000; padding:0; border-radius:1.5vh; overflow:hidden; width:95%; max-width:800px; border:1px solid rgba(255,255,255,.1);">
            <button class="modalX wi_yt_close" style="color:#fff; text-shadow:0 0 8px #000; right:1.5vh; top:1vh; font-size:2.2rem; z-index:10;">&times;</button>
            <div id="wi_yt_player" style="width:100%; aspect-ratio:16/9; background:#000;"></div>
          </div>
        </div>`),e(`#wi_yt_modal`).on(`click`,function(t){t.target===this&&e(`.wi_yt_close`).trigger(`click`)})),e(`#wi_yt_player`).html(`<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${t}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);let{abrirModal:n}=await d(async()=>{let{abrirModal:e}=await import(`./widev-8sJg4_cC.js`).then(e=>e.D);return{abrirModal:e}},[]);n(`wi_yt_modal`)}).on(`click.post`,`.wi_yt_close`,async function(){let{cerrarModal:t}=await d(async()=>{let{cerrarModal:e}=await import(`./widev-8sJg4_cC.js`).then(e=>e.D);return{cerrarModal:e}},[]);t(`wi_yt_modal`),setTimeout(()=>e(`#wi_yt_player`).html(``),300)}).on(`click.post`,`#po_refresh`,async function(){let t=e(this);t.html(`<i class="fas fa-spinner fa-spin"></i>`).prop(`disabled`,!0),g(t.data(`slug`)),y(t.data(`cat`)),await k(t.data(`slug`),!0)});var M=()=>e(window).off(`scroll.post_prog`);export{M as cleanup,k as init,O as render};