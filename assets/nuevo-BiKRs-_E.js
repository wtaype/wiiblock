import{n as e}from"./vendor-BBPjS4yS.js";import{l as t}from"./wii-dwHbqceZ.js";import{S as n,_ as r,b as i,d as a,i as o,r as s,w as c}from"./widev-mG2tMnX8.js";import{r as l}from"./index-k8WwHtzZ.js";import{M as u,S as d,g as f,k as p,w as m}from"./firebase-37FTGmWc.js";import{n as h}from"./firebase-Cknp8_pv.js";import{a as g,b as _,o as v,t as y,u as b}from"./devblog-DCx5qiQ-.js";var x=e=>e.trim().toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).replace(/\b(el|la|los|las|de|del|en|un|una|y|a|con|por|para|que|es|se)\b/g,` `).replace(/[^a-z0-9\s]/g,``).replace(/\s+/g,`_`).replace(/_{2,}/g,`_`).replace(/^_|_$/g,``).slice(0,50),S=e=>{let t=e.replace(/<[^>]*>/g,` `).split(/\s+/).filter(Boolean);return{words:t.length,min:Math.max(1,Math.ceil(t.length/200))}},C=()=>i.params()?.edit||new URLSearchParams(location.search).get(`edit`)||null,w=()=>{let e=r.user?.usuario?r.user:a(`wiSmile`)||{};if(!e.email)return`<div class="nu_err dpvc"><i class="fas fa-lock"></i><h2>Acceso restringido</h2><p>Inicia sesión para crear historias</p></div>`;let n=C();return`
  <div class="nu_wrap">
    <div class="nu_head">
      <div class="nu_head_left"><h1><i class="fas fa-${n?`pen`:`pen-fancy`}"></i> ${n?`Editar historia`:`Nueva historia`}</h1><p>${n?`Editando: <strong>${n}</strong> ✏️`:``}</p></div>
      <div class="nu_head_right">
        ${n?`<a href="/${n}" class="nu_btn_outline" ${c(`Ver post`)}><i class="fas fa-eye"></i> Ver</a>`:`<button type="button" id="nu_preview_pg" class="nu_btn_outline" ${c(`Preview`)}><i class="fas fa-eye"></i> Preview</button>`}
        <button type="submit" form="nu_form" id="nu_submit" class="nu_btn_submit"><i class="fas fa-${n?`save`:`paper-plane`}"></i> ${n?`Guardar`:`Publicar`}</button>
      </div>
    </div>
    <form id="nu_form" autocomplete="off"><div class="nu_layout">
      <div class="nu_left">
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-heading"></i> Título</div>
          <input id="nu_titulo" type="text" class="nu_titulo_inp" placeholder="Historias que inspiren y con mucho valor" maxlength="100" required/>
          <div class="nu_slug_box">
            <span class="nu_slug_label"><i class="fas fa-link"></i> ${t}</span>
            <input id="nu_slug_inp" type="text" placeholder="mi_historia" maxlength="50" spellcheck="false" ${n?`readonly`:``}/>
            ${n?``:`<button type="button" id="nu_slug_reset" class="nu_slug_btn" ${c(`Regenerar`)}><i class="fas fa-rotate"></i></button>`}
          </div>
          <div id="nu_slug_status" class="nu_slug_status">${n?`<span class="ok"><i class="fas fa-lock"></i> Slug bloqueado (edición)</span>`:``}</div>
        </div>
        <div class="nu_grid_seo">
          <div class="nu_card">
            <div class="nu_card_title"><i class="fas fa-align-left"></i> Resumen (Meta Description)</div>
            <textarea id="nu_resumen" rows="3" maxlength="160" placeholder="Describe en pocas palabras..."></textarea>
            <div class="nu_counter"><span id="nu_resumen_cnt">0</span>/160</div>
          </div>
          <div class="nu_card">
            <div class="nu_card_title"><i class="fas fa-search"></i> Palabras Clave (Meta Keywords)</div>
            <textarea id="nu_keywords" rows="3" placeholder="amor, fe, esperanza, wiihope..."></textarea>
            <div class="nu_hint">Separa las palabras con comas. Solo para SEO.</div>
          </div>
        </div>
        <div class="nu_card nu_card_editor">
          <div class="nu_card_title_row">
            <span><i class="fas fa-code"></i> Contenido Markdown</span>
            <div class="nu_editor_tabs">
              <button type="button" class="nu_tab active" data-tab="edit"><i class="fas fa-code"></i> Editor</button>
              <button type="button" class="nu_tab" data-tab="prev"><i class="fas fa-eye"></i> Preview</button>
            </div>
          </div>
          <div class="nu_toolbar" style="flex-wrap:wrap;">${[[[`fa-bold`,`**texto**`,`Negrita`],[`fa-italic`,`*texto*`,`Cursiva`],[`fa-strikethrough`,`~~texto~~`,`Tachado`]],[[`fa-heading`,`## Título H2`,`Subtítulo (H2)`],[`fa-heading`,`### Título H3`,`Sección (H3)`]],[[`fa-list-ul`,`- item
- item2`,`Lista`],[`fa-check-square`,`- [ ] tarea`,`Checklist`],[`fa-quote-right`,`> cita`,`Citar`],[`fa-minus`,`
---
`,`Separador`]],[[`fa-code`,"`código`",`Código`],[`fa-image`,`![desc](url)`,`Imagen`],[`fa-link`,`[texto](url)`,`Enlace`]]].map((e,t)=>`<div style="display:flex;gap:0.4vh${t<3?`;border-right:1px solid var(--brd);padding-right:0.6vh;margin-right:0.2vh`:``}">${e.map(([e,t,n])=>`<button type="button" class="nu_tool" data-tag='${t}' ${c(n)}><i class="fas ${e}"></i></button>`).join(``)}</div>`).join(``)}</div>
          <textarea id="nu_contenido" class="nu_code" rows="18" placeholder="Escribe tu historia en Markdown...\n\n## Un nuevo comienzo\n\nHabía una vez..."></textarea>
          <div id="nu_prev_html" class="nu_html_prev dpn po_contenido" style="padding: 1.5vh; border: 1px solid var(--brd); border-radius: 1vh; min-height: 20vh; margin-top: 1vh; background: var(--wb);"></div>
          <div class="nu_content_footer"><span id="nu_palabras" class="nu_hint"><i class="fas fa-font"></i> 0 palabras</span><span id="nu_lectura" class="nu_hint"><i class="fas fa-clock"></i> 1 min</span></div>
        </div>
      </div>
      <div class="nu_right">
        <div class="nu_card nu_card_publish">
          <div class="nu_card_title"><i class="fas fa-rocket"></i> ${n?`Actualizar`:`Publicar`}</div>
          <div class="nu_publish_opts">
            <label class="nu_check_l"><input type="checkbox" id="nu_activo" checked/><span><i class="fas fa-globe"></i> Público</span></label>
            <label class="nu_check_l"><input type="checkbox" id="nu_pin"/><span><i class="fas fa-thumbtack"></i> Pin</span></label>
          </div>
          <button type="submit" form="nu_form" class="nu_btn_submit nu_btn_full"><i class="fas fa-${n?`save`:`paper-plane`}"></i> ${n?`Guardar cambios`:`Publicar`}</button>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-folder"></i> Categoría</div>
          <input id="nu_cat_inp" type="text" placeholder="Ej: Esperanza, Salud..." maxlength="30" required/>
          <div id="nu_cat_sug" class="nu_sug_box"></div>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-tags"></i> Tags</div>
          <input id="nu_tags_inp" type="text" placeholder="Escribe y presiona Enter"/>
          <div id="nu_tag_sug" class="nu_sug_box"></div>
          <div id="nu_tags_box" class="nu_tags_box"></div>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-image"></i> Imágenes</div>
          <div style="display:flex; flex-direction:column; gap:1vh; margin-bottom: 1.5vh;">
            <label style="font-size:var(--fz_s4); color:var(--tx2); font-weight:600;"><i class="fas fa-compress"></i> Miniatura (Inicio-Blog)</label>
            <input id="nu_img" type="url" placeholder="https://... (Sugerido: 334x208px)"/>
            <div id="nu_img_prev" class="nu_img_prev dpn"><img id="nu_img_el" src="" alt=""/><button type="button" id="nu_img_clear" class="nu_img_clear" ${c(`Quitar`)}><i class="fas fa-xmark"></i></button></div>
          </div>
          <div style="display:flex; flex-direction:column; gap:1vh;">
            <label style="font-size:var(--fz_s4); color:var(--tx2); font-weight:600;"><i class="fas fa-panorama"></i> ImagenTop (Post)</label>
            <input id="nu_img_top" type="url" placeholder="https://... (Sugerido: 1180px425px u horizontal)"/>
            <div id="nu_img_top_prev" class="nu_img_prev dpn"><img id="nu_img_top_el" src="" alt=""/><button type="button" id="nu_img_top_clear" class="nu_img_clear" ${c(`Quitar`)}><i class="fas fa-xmark"></i></button></div>
          </div>
        </div>
        <div class="nu_card nu_card_autor">
          <div class="nu_card_title"><i class="fas fa-user-pen"></i> Autor</div>
          <div class="nu_autor_info"><div class="nu_autor_av"><i class="fas fa-user-circle"></i></div><div><strong>${e?.nombre||e?.usuario||`Anónimo`}</strong><span>${e?.email||``}</span></div></div>
        </div>
      </div>
    </div></form>
  </div>`},T=async()=>{if(!(r.user?.usuario?r.user:a(`wiSmile`)||{}).email)return;let t=C(),i=[],c,w=!!t,T=()=>x(e(`#nu_titulo`).val()),E=()=>{let{words:t,min:n}=S(e(`#nu_contenido`).val());e(`#nu_palabras`).html(`<i class="fas fa-font"></i> ${t} palabras`),e(`#nu_lectura`).html(`<i class="fas fa-clock"></i> ${n} min`)},D=()=>e(`#nu_tags_box`).html(i.map((e,t)=>`<span class="nu_tag_chip">#${e} <i class="fas fa-xmark nu_tag_rm" data-i="${t}"></i></span>`).join(``)),O=e=>{if(!e)return``;let t=e.replace(/^### (.*$)/gim,`<h3>$1</h3>`).replace(/^## (.*$)/gim,`<h2>$1</h2>`).replace(/^\> (.*$)/gim,`<blockquote>$1</blockquote>`).replace(/\*\*(.*?)\*\*/gim,`<strong>$1</strong>`).replace(/\*(.*?)\*/gim,`<em>$1</em>`).replace(/~~(.*?)~~/gim,`<del>$1</del>`).replace(/`([^`]+)`/gim,`<code>$1</code>`).replace(/!\[(.*?)\]\((.*?)\)/gim,`<img alt="$1" src="$2" />`).replace(/\[(.*?)\]\((https:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)(?:\S*?))\)/gim,`<button type="button" class="po_yt_btn" data-yt="$3"><i class="fab fa-youtube" style="color:#fe0149; font-size:1.2em; margin-right:6px;"></i> $1</button>`).replace(/\[(.*?)\]\((.*?)\)/gim,`<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`).replace(/^---/gim,`<hr style="border:none;border-top:1px solid var(--brd);margin:2vh 0"/>`).split(`
`),n=[],r=!1,i=!1;return t.forEach(e=>{let t=e.trim();if(t.startsWith(`|`)&&t.endsWith(`|`)){if(i||=(n.push(`<div class="po_table_wrap"><table>`),!0),t.match(/^\|?[\s\-\|:]+\|?$/))return;let e=t.split(`|`).filter((e,t,n)=>t>0&&t<n.length-1),r=i&&n[n.length-1].includes(`<table>`)?`th`:`td`;n.push(`<tr>`+e.map(e=>`<${r}>${e.trim()}</${r}>`).join(``)+`</tr>`);return}else i&&=(n.push(`</table></div>`),!1);let a=e.match(/^[\-\*]\s+(.*)$/);if(a){r||=(n.push(`<ul>`),!0);let e=a[1];e.startsWith(`[ ] `)?e=`<input type="checkbox" disabled style="margin-right:0.5vh"> `+e.slice(4):e.startsWith(`[x] `)&&(e=`<input type="checkbox" checked disabled style="margin-right:0.5vh"> `+e.slice(4)),n.push(`<li>${e}</li>`)}else{if(r&&=(n.push(`</ul>`),!1),t===``)return;e.match(/^<(h2|h3|ul|ol|li|blockquote|img|hr|div|table|tr|th|td)/)?n.push(e):n.push(`<p>${e}</p>`)}}),i&&n.push(`</table></div>`),r&&n.push(`</ul>`),n.join(`
`)},k=w?`wi_draft_edit_`+t:`wi_draft_new`,A=()=>{let t={titulo:e(`#nu_titulo`).val(),slug:e(`#nu_slug_inp`).val(),resumen:e(`#nu_resumen`).val(),keywords:e(`#nu_keywords`).val(),cat:e(`#nu_cat_inp`).val(),img:e(`#nu_img`).val(),imgTop:e(`#nu_img_top`).val(),content:e(`#nu_contenido`).val(),tags:i};localStorage.setItem(k,JSON.stringify(t))};if(e(`#nu_form`).on(`input`,`input, textarea`,()=>{clearTimeout(window.wiDraftTimer),window.wiDraftTimer=setTimeout(A,1e3)}),(()=>{try{let t=new Set,n=new Set;for(let e of Object.keys(localStorage).filter(e=>e.startsWith(`wi_blogs`)||e.startsWith(`wi_post_`))){let r=a(e);(Array.isArray(r)?r:r?[r]:[]).forEach(e=>{e.categoria&&t.add(e.categoria),e.tags&&Array.isArray(e.tags)&&e.tags.forEach(e=>n.add(e))})}t.size>0&&e(`#nu_cat_sug`).html(Array.from(t).slice(0,8).map(e=>`<span class="nu_sug_chip cat_sug">${e}</span>`).join(``)),n.size>0&&e(`#nu_tag_sug`).html(Array.from(n).slice(0,12).map(e=>`<span class="nu_sug_chip tag_sug">#${e}</span>`).join(``))}catch{console.warn(`No se pudieron cargar sugerencias`)}})(),w)try{let n=await b(t,!0);if(!n?.data){o(`Post no encontrado`,`error`);return}let r=n.data;e(`#nu_titulo`).val(r.titulo),e(`#nu_slug_inp`).val(r.slug||r.id),e(`#nu_resumen`).val(r.resumen||``).trigger(`input`),e(`#nu_keywords`).val(r.keywords||``),e(`#nu_contenido`).val(r.contenidoMd||r.contenido||``),e(`#nu_img`).val(r.imagen||``),e(`#nu_img_top`).val(r.imagenTop||``),e(`#nu_activo`).prop(`checked`,r.activo!==!1),e(`#nu_pin`).prop(`checked`,!!r.pin),e(`#nu_cat_inp`).val(r.categoria||``),i=Array.isArray(r.tags)?[...r.tags]:[],D(),r.imagen&&(e(`#nu_img_el`).attr(`src`,r.imagen),e(`#nu_img_prev`).removeClass(`dpn`)),r.imagenTop&&(e(`#nu_img_top_el`).attr(`src`,r.imagenTop),e(`#nu_img_top_prev`).removeClass(`dpn`)),e(`#nu_resumen_cnt`).text((r.resumen||``).length),E()}catch(e){console.error(`edit load:`,e),o(`Error cargando post`,`error`)}else try{let t=JSON.parse(localStorage.getItem(k));t&&(e(`#nu_titulo`).val(t.titulo),e(`#nu_slug_inp`).val(t.slug),e(`#nu_resumen`).val(t.resumen),e(`#nu_keywords`).val(t.keywords||``),e(`#nu_cat_inp`).val(t.cat),e(`#nu_img`).val(t.img).trigger(`input`),e(`#nu_img_top`).val(t.imgTop).trigger(`input`),e(`#nu_contenido`).val(t.content),t.tags&&(i=t.tags,D()),E())}catch{}e(`#nu_form`).on(`keydown`,e=>{e.key===`Enter`&&e.target.tagName!==`TEXTAREA`&&e.preventDefault()}),w||(e(`#nu_slug_inp`).on(`input`,function(){e(this).val(e(this).val().replace(/[^a-z0-9_]/gi,e=>e===` `?`_`:``).toLowerCase().replace(/_{2,}/g,`_`)),e(`#nu_slug_status`).html(`<i class="fas fa-pen"></i> Escribiendo...`).removeClass(`ok err`)}).on(`change`,async function(){let t=e(this).val(),n=e(`#nu_slug_status`);if(!t)return n.html(``).removeClass(`ok err`);if(t.length<3)return n.html(`<i class="fas fa-exclamation"></i> Muy corto`).addClass(`err`).removeClass(`ok`);n.html(`<i class="fas fa-spinner fa-spin"></i>`).removeClass(`ok err`),(await f(p(h,`blog`,t)).catch(()=>null))?.exists()?n.html(`<i class="fas fa-xmark"></i> Ya existe`).addClass(`err`).removeClass(`ok`):n.html(`<i class="fas fa-check"></i> OK`).addClass(`ok`).removeClass(`err`)}),e(`#nu_slug_reset`).on(`click`,()=>{e(`#nu_slug_inp`).val(T()).trigger(`input`).trigger(`change`)})),e(`#nu_resumen`).on(`input`,function(){e(`#nu_resumen_cnt`).text(e(this).val().length)}),e(`#nu_img`).on(`input`,function(){clearTimeout(c),c=setTimeout(()=>{let t=e(this).val().trim();if(!t)return e(`#nu_img_prev`).addClass(`dpn`);e(`#nu_img_el`).attr(`src`,t).off(`load error`).on(`load`,()=>e(`#nu_img_prev`).removeClass(`dpn`)).on(`error`,()=>e(`#nu_img_prev`).addClass(`dpn`))},600)}),e(`#nu_img_clear`).on(`click`,()=>{e(`#nu_img`).val(``).trigger(`input`),e(`#nu_img_prev`).addClass(`dpn`)});let j;e(`#nu_img_top`).on(`input`,function(){clearTimeout(j),j=setTimeout(()=>{let t=e(this).val().trim();if(!t)return e(`#nu_img_top_prev`).addClass(`dpn`);e(`#nu_img_top_el`).attr(`src`,t).off(`load error`).on(`load`,()=>e(`#nu_img_top_prev`).removeClass(`dpn`)).on(`error`,()=>e(`#nu_img_top_prev`).addClass(`dpn`))},600)}),e(`#nu_img_top_clear`).on(`click`,()=>{e(`#nu_img_top`).val(``).trigger(`input`),e(`#nu_img_top_prev`).addClass(`dpn`)}),e(`#nu_contenido`).on(`input`,E),e(`#nu_tags_inp`).on(`keydown`,function(t){t.key!==`Enter`&&t.key!==`,`||(t.preventDefault(),e(this).val().toLowerCase().split(`,`).map(e=>e.trim().replace(/\s+/g,`_`)).filter(Boolean).forEach(e=>{!i.includes(e)&&i.length<8&&i.push(e)}),D(),e(this).val(``))}),e(document).on(`click.nuevo`,`.nu_tool`,function(){let t=e(this).data(`tag`),n=e(`#nu_contenido`),r=n[0],i=r.selectionStart,a=r.selectionEnd,o=r.value.substring(i,a)||`texto`,s=t.replace(`texto`,o).replace(`cita`,o);n.val(r.value.substring(0,i)+s+r.value.substring(a)),r.focus(),r.selectionStart=i,r.selectionEnd=i+s.length,E(),A()}).on(`click.nuevo`,`.nu_tab`,function(){let t=e(this).data(`tab`);e(`.nu_tab`).removeClass(`active`),e(this).addClass(`active`),t===`prev`?(e(`#nu_prev_html`).html(_(O(e(`#nu_contenido`).val()))).removeClass(`dpn`),e(`#nu_contenido`).addClass(`dpn`)):(e(`#nu_contenido`).removeClass(`dpn`),e(`#nu_prev_html`).addClass(`dpn`))}).on(`click.nuevo`,`.nu_tag_rm`,function(){i.splice(+e(this).data(`i`),1),D()}).on(`click.nuevo`,`.cat_sug`,function(){e(`#nu_cat_inp`).val(e(this).text())}).on(`click.nuevo`,`.tag_sug`,function(){let t=e(this).text().replace(`#`,``);t&&!i.includes(t)&&i.length<8&&(i.push(t),D())}),e(`#nu_form`).on(`submit`,async function(c){c.preventDefault();let b=e(`#nu_submit,.nu_btn_full`),x=r.user?.usuario?r.user:a(`wiSmile`)||{},C=e(`#nu_cat_inp`).val().trim();C&&=C.charAt(0).toUpperCase()+C.slice(1).toLowerCase();let[T,E,D,A,j,M,N,P]=[e(`#nu_titulo`).val().trim(),e(`#nu_resumen`).val().trim(),e(`#nu_keywords`).val().trim(),C,e(`#nu_img`).val().trim(),e(`#nu_img_top`).val().trim(),e(`#nu_contenido`).val().trim(),e(`#nu_slug_inp`).val().trim()],F=_(O(N));if(!T||!E||!A||!j||!N)return o(`Completa los campos obligatorios`,`warning`);if(N.length<10)return o(`Contenido muy corto`,`warning`);if(!P||P.length<3)return o(`Slug inválido`,`warning`);if(!w&&e(`#nu_slug_status`).hasClass(`err`))return o(`Slug no disponible`,`error`);n(b,!0,w?`Guardando...`:`Publicando...`);try{if(`${S(F).min}`,w)await m(p(h,y,t),{activo:e(`#nu_activo`).is(`:checked`),pin:e(`#nu_pin`).is(`:checked`),titulo:T,resumen:E,keywords:D,categoria:A,contenido:F,contenidoMd:N,imagen:j,imagenTop:M,imagenAlt:T,tags:i,tiempoLectura:`${S(F).min} min`,actualizado:u()}),v(t),g(),s(`¡Historia actualizada! 🐾✨`,`success`),setTimeout(()=>l(()=>import(`./index-k8WwHtzZ.js`).then(e=>e.rutas.navigate(`/${t}`)),[]),1200);else{if((await f(p(h,`blog`,P))).exists())return n(b,!1),o(`Slug existente`,`warning`);await d(p(h,y,P),{id:P,slug:P,activo:e(`#nu_activo`).is(`:checked`),pin:e(`#nu_pin`).is(`:checked`),usuario:x.usuario,email:x.email,autor:x.nombre||x.usuario,titulo:T,resumen:E,keywords:D,categoria:A,contenido:F,contenidoMd:N,imagen:j,imagenTop:M,imagenAlt:T,tags:i,vistas:0,likes:0,tiempoLectura:`${S(F).min} min`,creado:u(),actualizado:u()}),g(),localStorage.removeItem(k),s(`¡Historia publicada! 🐾✨`,`success`),setTimeout(()=>l(()=>import(`./index-k8WwHtzZ.js`).then(e=>e.rutas.navigate(`/${P}`)),[]),1200)}}catch(e){console.error(`nuevo:`,e),o(w?`Error al guardar`:`Error al publicar`,`error`),n(b,!1)}})},E=()=>{e(`#nu_form,#nu_slug_inp,#nu_titulo,#nu_resumen,#nu_img,#nu_contenido`).off(),e(document).off(`.nuevo`)};export{E as cleanup,T as init,w as render};