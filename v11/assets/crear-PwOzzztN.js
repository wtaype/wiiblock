import{S as e,d as t,i as n,m as r}from"./widev-DijrRLiT.js";import{M as i,O as a,S as o,T as s,g as c,k as l,m as u,w as d,x as f,y as p}from"./firebase-37FTGmWc.js";import{n as m}from"./firebase-DOYPslWB.js";var h=null,g=t(`misProyectosLinkwii`)||[],_=g.length>0?g[0].slug:null,v=[{hex:`#FFFFFF`,name:`auto`},{hex:`#FFDA34`,name:`Oro`},{hex:`#3cd741`,name:`Success`},{hex:`#ffa726`,name:`Warning`},{hex:`#00a8e6`,name:`Info`},{hex:`#0EBEFF`,name:`Cielo`},{hex:`#FF5C69`,name:`Dulce`},{hex:`#29C72E`,name:`Paz`},{hex:`#7000FF`,name:`Mora`},{hex:`#21273B`,name:`Futuro`},{hex:`#dddddd`,name:`Offline`}],y=[``,`fas fa-link`,`fab fa-instagram`,`fab fa-tiktok`,`fab fa-youtube`,`fab fa-whatsapp`,`fab fa-facebook`,`fab fa-spotify`,`fab fa-x-twitter`,`fab fa-linkedin`,`fab fa-telegram`,`fas fa-globe`,`fas fa-store`,`fas fa-envelope`,`fas fa-phone`],b=e=>e?e.includes(`instagram.com`)?`fab fa-instagram`:e.includes(`tiktok.com`)?`fab fa-tiktok`:e.includes(`youtube.com`)||e.includes(`youtu.be`)?`fab fa-youtube`:e.includes(`whatsapp.com`)||e.includes(`wa.me`)?`fab fa-whatsapp`:e.includes(`facebook.com`)||e.includes(`fb.me`)?`fab fa-facebook`:e.includes(`spotify.com`)?`fab fa-spotify`:e.includes(`twitter.com`)||e.includes(`x.com`)?`fab fa-x-twitter`:e.includes(`linkedin.com`)?`fab fa-linkedin`:e.includes(`t.me`)||e.includes(`telegram`)?`fab fa-telegram`:e.includes(`pinterest.com`)?`fab fa-pinterest`:`fas fa-link`:``,x=async()=>t(`wiSmile`)?`
    <div class="cr_layout wi_fadeUp wi_visible">
      
      <!-- ── COL IZQUIERDA: Lista de Proyectos ── -->
      <div class="cr_col_left">
        <div class="cr_left_header">
          <div class="cr_left_title">Mis Linkwiis</div>
          <button class="cr_btn_new" id="btn_nuevo_proy">
            <i class="fas fa-plus"></i> Nuevo
          </button>
        </div>

        <div class="cr_slug_form" id="form_nuevo_proy">
          <div class="cr_slug_prefix">linkwii.com/</div>
          <input type="text" id="inp_slug" class="cr_input" placeholder="mi-slug" autocomplete="off">
          <div class="cr_slug_actions">
            <button class="cr_btn_xs" id="btn_cancel_proy">Cancelar</button>
            <button class="cr_btn_xs prim" id="btn_save_proy">Crear</button>
          </div>
        </div>

        <div class="cr_proy_list" id="lista_proyectos_render">
          <div style="font-size:0.85rem; color:var(--tx3); text-align:center; padding:3vh 0;">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </div>
      </div>

      <!-- ── COL CENTRO: Editor ── -->
      <div class="cr_col_center" id="cr_col_center">
        <div style="flex:1; display:flex; align-items:center; justify-content:center; min-height:60vh;">
          <div class="ad_empty">
            <i class="fas fa-magic" style="font-size:3rem; color:var(--brd); display:block; margin-bottom:2vh;"></i>
            Selecciona un proyecto o crea uno nuevo.
          </div>
        </div>
      </div>

      <!-- ── COL DERECHA: Preview Celular ── -->
      <div class="cr_col_right">
        <div style="text-align:center; margin-bottom:2vh;">
          <div style="font-size:0.75rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--tx3);">Vista Previa</div>
        </div>
        <div class="cr_phone">
          <div class="cr_phone_notch"></div>
          <div class="cr_phone_content" id="cr_phone_render">
            <div class="ad_empty" style="margin-top:40%; font-size:0.75rem; color:var(--tx3);">
              <i class="fas fa-mobile-alt" style="font-size:2rem; display:block; margin-bottom:1vh; opacity:0.3;"></i>
              En vivo
            </div>
          </div>
        </div>
      </div>

    </div>
  `:`<h1>Acceso Denegado</h1>`,S=()=>{let e=document.getElementById(`lista_proyectos_render`);if(e){if(g.length===0){e.innerHTML=`<div style="font-size:0.85rem; color:var(--tx3); text-align:center; padding:3vh 0;">Sin proyectos aún.</div>`;return}e.innerHTML=g.map(e=>`
    <div class="cr_proy_item ${e.slug===_?`activo`:``}" onclick="window.crSeleccionar('${e.slug}')">
      <div>
        <div class="cr_pt1">/${e.slug}</div>
        <div class="cr_pt2">${e.links?.length||0} enlaces</div>
      </div>
      <i class="fas fa-chevron-right" style="font-size:0.75rem; color:var(--tx3);"></i>
    </div>
  `).join(``)}},C=()=>{let t=document.getElementById(`cr_col_center`);if(!t)return;let r=g.find(e=>e.slug===_);if(!r){t.innerHTML=`
      <div style="flex:1; display:flex; align-items:center; justify-content:center; min-height:60vh;">
        <div class="ad_empty"><i class="fas fa-magic" style="font-size:3rem; color:var(--brd); display:block; margin-bottom:2vh;"></i>Selecciona un proyecto.</div>
      </div>
    `;return}let a=r.color||`#FFFFFF`,o=v.map(e=>`
    <div class="cr_swatch ${a===e.hex?`selected`:``}"
         style="background:${e.hex};"
         data-color="${e.hex}"
         title="${e.name}"
         onclick="window.crElegirColor(this)"></div>
  `).join(``),s=r.links||[],c=s.map((e,t)=>`
      <div class="cr_link_card">
        <div class="cr_link_card_header">
          <div style="display:flex; align-items:center; gap:1vh;">
            <span class="cr_link_num">Enlace ${t+1}</span>
            <div class="cr_icon_btn" onclick="window.crCicloIcono(${t})" title="Haz clic para cambiar el ícono">
              <i class="${e.icon||b(e.url)||`fas fa-link`}" id="icon_prev_${t}"></i>
            </div>
          </div>
          <button class="cr_link_del btn_rm_link" data-index="${t}" title="Eliminar"><i class="fas fa-times"></i></button>
        </div>
        <input type="text" class="cr_input arr_inp_titulo" data-idx="${t}" placeholder="Título" value="${e.titulo}" oninput="window.crPreviewEnlace(this, 'titulo')">
        <input type="url" class="cr_input arr_inp_url" data-idx="${t}" placeholder="https://..." value="${e.url}" oninput="window.crPreviewEnlace(this, 'url')">
      </div>
    `).join(``);t.innerHTML=`
    <!-- BARRA COMPACTA DEL PROYECTO -->
    <div class="cr_proyect_bar">
      <div class="cr_proyect_slug"><span>linkwii.com/</span>${r.slug}</div>
      <div class="cr_bar_actions">
        <button class="cr_action_btn" onclick="window.crCopiar('${r.slug}')"><i class="far fa-copy"></i> Copiar</button>
        <a class="cr_action_btn" href="/${r.slug}" target="_blank"><i class="fas fa-external-link-alt"></i> Ver</a>
        <button class="cr_action_btn danger" id="btn_del_main"><i class="fas fa-trash"></i></button>
      </div>
    </div>

    <!-- APARIENCIA -->
    <div class="cr_section">
      <div class="cr_section_title">
        <span><i class="fas fa-paint-roller" style="margin-right:0.5vh;"></i> Apariencia</span>
        <button class="cr_btn_save" id="btn_update_info" style="font-size:0.75rem; padding:0.6vh 1.8vh;"><i class="fas fa-save"></i> Guardar</button>
      </div>
      <div class="cr_apariencia_grid">
        <div class="cr_field">
          <div class="cr_label">Bio / Descripción</div>
          <textarea id="edit_desc" class="cr_input" rows="4" placeholder="Escribe algo sobre ti..." oninput="window.crPreviewApariencia(this, 'desc')">${r.desc||``}</textarea>
        </div>
        <div style="display:flex; flex-direction:column; gap:1.5vh;">
          <div class="cr_field">
            <div class="cr_label">URL del Avatar</div>
            <input type="url" id="edit_logo" class="cr_input" placeholder="https://..." value="${r.logo||``}" oninput="window.crPreviewApariencia(this, 'logo')">
          </div>
          <div class="cr_field">
            <div class="cr_swatches">
              ${o}
              <input type="hidden" id="edit_color" value="${a}">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ENLACES EN GRID 2 COLUMNAS -->
    <div class="cr_section">
      <div class="cr_section_title">
        <span><i class="fas fa-link" style="margin-right:0.5vh;"></i> Mis Enlaces</span>
        <div style="display:flex; gap:0.8vh;">
          <button class="cr_action_btn" id="btn_add_link_arr"><i class="fas fa-plus"></i> Añadir</button>
          ${s.length>0?`<button class="cr_btn_save" id="btn_save_links" style="font-size:0.75rem; padding:0.6vh 1.8vh;"><i class="fas fa-save"></i> Guardar</button>`:``}
        </div>
      </div>
      ${s.length>0?`<div class="cr_links_grid">${c}</div>`:`<div class="ad_empty" style="padding:3vh 0; font-size:0.88rem;">Sin enlaces. Añade uno.</div>`}
    </div>
  `,document.getElementById(`btn_update_info`)?.addEventListener(`click`,async t=>{let a=t.currentTarget;e(a,!0,`Guardando`);try{await d(l(m,`linkwiis`,r.slug),{desc:document.getElementById(`edit_desc`).value,logo:document.getElementById(`edit_logo`).value,color:document.getElementById(`edit_color`).value,actualizado:i()}),n(`Apariencia guardada ✨`,`success`)}catch{n(`Error al guardar`)}e(a,!1,`<i class="fas fa-save"></i> Guardar`)}),document.getElementById(`btn_add_link_arr`)?.addEventListener(`click`,async()=>{let e=[...r.links||[],{titulo:``,url:``,icon:``}];await d(l(m,`linkwiis`,r.slug),{links:e})}),document.querySelectorAll(`.btn_rm_link`).forEach(e=>{e.addEventListener(`click`,async e=>{if(!confirm(`¿Estás seguro de eliminar este enlace? Esta acción no se puede deshacer.`))return;let t=parseInt(e.currentTarget.dataset.index),i=[...r.links||[]];i.splice(t,1);try{await d(l(m,`linkwiis`,r.slug),{links:i}),n(`Enlace eliminado ✨`,`success`)}catch{n(`Error al eliminar`)}})}),document.getElementById(`btn_save_links`)?.addEventListener(`click`,async t=>{let a=t.currentTarget;e(a,!0,`Guardando`);let o=r.links.filter(e=>e.titulo.trim()||e.url.trim());o.push({titulo:``,url:``,icon:``});try{await d(l(m,`linkwiis`,r.slug),{links:o,actualizado:i()}),n(`Enlaces guardados ✨`,`success`)}catch{n(`Error al guardar enlaces`)}e(a,!1,`<i class="fas fa-save"></i> Guardar`)}),document.getElementById(`btn_del_main`)?.addEventListener(`click`,async()=>{if(confirm(`¿Eliminar definitivamente el proyecto /${r.slug}? Esta acción no se puede deshacer.`))try{await u(l(m,`linkwiis`,r.slug)),_=null,n(`Proyecto eliminado ✨`,`success`)}catch{n(`Error al eliminar`)}})},w={instagram:`linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)`,tiktok:`#000`,youtube:`#ff0000`,whatsapp:`#25D366`,facebook:`#1877F2`,twitter:`#000`,linkedin:`#0077b5`,telegram:`#0088cc`,onlyfans:`#00aff0`,pinterest:`#E60023`,web:`#00a8e6`,link:`#FFDA34`},T=e=>e?e.includes(`instagram.com`)?`instagram`:e.includes(`tiktok.com`)?`tiktok`:e.includes(`youtube.com`)||e.includes(`youtu.be`)?`youtube`:/whatsapp|wa\.me/.test(e)?`whatsapp`:e.includes(`facebook.com`)||e.includes(`fb.me`)?`facebook`:/twitter\.com|x\.com/.test(e)?`twitter`:e.includes(`linkedin.com`)?`linkedin`:/t\.me|telegram/.test(e)?`telegram`:e.includes(`onlyfans.com`)?`onlyfans`:e.includes(`pinterest.com`)?`pinterest`:/\.(com|net|org|co|info|es|app|io|me)/.test(e)?`web`:`link`:`link`,E=()=>{let e=document.getElementById(`cr_phone_render`);if(!e)return;let t=g.find(e=>e.slug===_);if(!t){e.innerHTML=`<div class="ad_empty" style="margin-top:40%; font-size:0.75rem; color:var(--tx3);"><i class="fas fa-mobile-alt" style="font-size:2rem; display:block; margin-bottom:1vh; opacity:0.3;"></i>En vivo</div>`;return}let n=t.color||`#FFFFFF`,r=(t.links||[]).filter(e=>e.titulo).map(e=>{let t=e.icon||b(e.url),r=n;(!r||r.toLowerCase()===`#ffffff`)&&(r=w[T(e.url)]);let i=r&&r.includes(`gradient`);return`
      <div class="cr_phone_btn" style="${r?`background:${r}; color:#fff; border-color:transparent; box-shadow:0 4px 14px ${i?`rgba(0,0,0,0.2)`:r+`40`};`:``}">
        ${t?`<span style="position:absolute; left:14px; font-size:15px;"><i class="${t}"></i></span>`:``}
        ${e.titulo}
      </div>
    `}).join(``);e.innerHTML=`
    <img src="${t.logo||`/smile.avif`}" class="cr_phone_avatar" alt="">
    <div class="cr_phone_title">@${t.slug}</div>
    <div class="cr_phone_bio">${t.desc||``}</div>
    <div style="width:100%;">${r}</div>
    <div style="margin-top:auto; padding-top:24px; font-size:11px; font-weight:600; color:#aaa; display:flex; align-items:center; gap:4px;">
      <img src="/smile.avif" style="height:14px; border-radius:50%; opacity:0.4;"> Crea tu Linkwii gratis
    </div>
  `};window.crCicloIcono=e=>{let t=g.find(e=>e.slug===_);if(!t)return;let n=t.links[e],r=n.icon||``,i=y.indexOf(r);i===-1&&(i=0);let a=y[(i+1)%y.length];n.icon=a;let o=document.getElementById(`icon_prev_${e}`);o&&(o.className=a||b(n.url)||`fas fa-link`),E()},window.crPreviewEnlace=(e,t)=>{let n=parseInt(e.dataset.idx),r=g.find(e=>e.slug===_);if(!r)return;let i=e.value;if(t===`url`&&i&&!i.startsWith(`http`)&&(i=`https://`+i),r.links[n][t]=i,t===`url`&&!r.links[n].icon){let e=document.getElementById(`icon_prev_${n}`);e&&(e.className=b(i)||`fas fa-link`)}E()},window.crPreviewApariencia=(e,t)=>{let n=g.find(e=>e.slug===_);n&&(n[t]=e.value,E())},window.crSeleccionar=e=>{_=e,S(),C(),E()},window.crCopiar=e=>{navigator.clipboard.writeText(`${window.location.origin}/${e}`).then(()=>n(`Enlace copiado 📋`,`success`))},window.crElegirColor=e=>{document.querySelectorAll(`.cr_swatch`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`);let t=e.dataset.color;document.getElementById(`edit_color`).value=t;let n=g.find(e=>e.slug===_);n&&(n.color=t),E()};var D=()=>{let e=t(`wiSmile`);if(!e)return;let u=document.getElementById(`btn_nuevo_proy`),d=document.getElementById(`form_nuevo_proy`),v=document.getElementById(`inp_slug`);u?.addEventListener(`click`,()=>{d.style.display=`block`,v.focus()}),document.getElementById(`btn_cancel_proy`)?.addEventListener(`click`,()=>{d.style.display=`none`,v.value=``}),document.getElementById(`btn_save_proy`)?.addEventListener(`click`,async t=>{let r=v.value.trim().toLowerCase().replace(/[^a-z0-9-]/g,``);if(!r)return n(`Ingresa un slug válido`);let a=t.currentTarget,s=a.innerHTML;a.innerHTML=`<i class="fas fa-spinner fa-spin"></i>`,a.disabled=!0;try{let t=l(m,`linkwiis`,r);if((await c(t)).exists())return n(`Ese slug ya está ocupado. Elige otro.`);await o(t,{slug:r,usuario:e.usuario,email:e.email,estado:!0,vistas:0,desc:`¡Bienvenido a mi Linkwii!`,logo:e.avatar||``,color:`#FFFFFF`,links:[],creado:i(),actualizado:i()}),n(`Proyecto creado 🎉`,`success`),d.style.display=`none`,v.value=``,window.crSeleccionar(r)}catch(e){console.error(e),n(`Error al crear`)}finally{a.innerHTML=s,a.disabled=!1}});let y=f(a(m,`linkwiis`),s(`usuario`,`==`,e.usuario));g.length>0&&(S(),C(),E()),h=p(y,e=>{g=e.docs.map(e=>({slug:e.id,...e.data()})),r(`misProyectosLinkwii`,g),!_&&g.length>0?_=g[0].slug:_&&!g.find(e=>e.slug===_)&&(_=g.length>0?g[0].slug:null),S(),C(),E()})},O=()=>{h&&h(),delete window.crSeleccionar,delete window.crCopiar,delete window.crElegirColor};export{O as cleanup,D as init,x as render};