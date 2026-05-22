import{n as e}from"./vendor-BBPjS4yS.js";import{S as t,d as n,i as r,w as i}from"./widev-8sJg4_cC.js";import{M as a,O as o,T as s,_ as c,k as l,m as u,p as d,x as f}from"./firebase-37FTGmWc.js";import{n as p,t as m}from"./firebase-D1N8l2os.js";var h=`wiAudios`,g=`wiImg`,_=()=>n(`wiSmile`)?.email||m.currentUser?.email||``,v=async e=>{let t=_();return t?(await c(f(o(p,e),s(`email`,`==`,t)))).docs.map(e=>({id:e.id,...e.data()})).sort((e,t)=>(t.creado?.seconds||0)-(e.creado?.seconds||0)):[]},y=async(e,t,n)=>{let r=_();return r?(await d(o(p,e),{email:r,titulo:t,src:n,creado:a(),actualizado:a()})).id:null},b=async(e,t)=>{await u(l(p,e,t))},x=()=>v(h),S=()=>v(g),C=(e,t)=>`
<div class="ag_item" data-id="${e.id}" data-col="${t}">
  <div class="ag_item_info">
    <span class="ag_item_titulo">${e.titulo}</span>
    <span class="ag_item_src" title="${e.src}">${e.src.length>50?e.src.substring(0,50)+`...`:e.src}</span>
  </div>
  <div class="ag_item_accs">
    <button class="ag_copiar" ${i(`Copiar URL`)}><i class="fas fa-copy"></i></button>
    <button class="ag_eliminar" ${i(`Eliminar`)}><i class="fas fa-trash"></i></button>
  </div>
</div>`,w=(e,t)=>e.length?e.map(e=>C(e,t)).join(``):`<p class="ag_vacio"><i class="fas fa-inbox"></i> Sin elementos guardados</p>`,T=()=>`
<div class="agregar">
  <h2 class="ag_titulo"><i class="fas fa-folder-plus"></i> Mis Recursos</h2>

  <div class="ag_grid">
    <div class="ag_sec">
      <h3 class="ag_stit"><i class="fas fa-music"></i> Audios</h3>
      <div class="ag_form">
        <div class="ag_row">
          <div class="ag_inp"><i class="fas fa-tag"></i><input id="agAudTit" maxlength="40" placeholder="Título"></div>
          <div class="ag_inp ag_inp_url"><i class="fas fa-link"></i><input id="agAudSrc" maxlength="300" placeholder="URL del audio (.mp3)"></div>
          <button class="ag_btn" id="agAudBtn"><i class="fas fa-plus"></i> Agregar</button>
        </div>
      </div>
      <div class="ag_lista" id="agAudList"><p class="ag_vacio"><i class="fas fa-spinner fa-spin"></i> Cargando...</p></div>
    </div>

    <div class="ag_sec">
      <h3 class="ag_stit"><i class="fas fa-image"></i> Imágenes</h3>
      <div class="ag_form">
        <div class="ag_row">
          <div class="ag_inp"><i class="fas fa-tag"></i><input id="agImgTit" maxlength="40" placeholder="Título"></div>
          <div class="ag_inp ag_inp_url"><i class="fas fa-link"></i><input id="agImgSrc" maxlength="300" placeholder="URL de la imagen"></div>
          <button class="ag_btn" id="agImgBtn"><i class="fas fa-plus"></i> Agregar</button>
        </div>
      </div>
      <div class="ag_lista" id="agImgList"><p class="ag_vacio"><i class="fas fa-spinner fa-spin"></i> Cargando...</p></div>
    </div>
  </div>
</div>`,E=async()=>{if(!_())return r(`Inicia sesión para gestionar recursos`,`warning`);let n=async()=>{let t=await v(h);e(`#agAudList`).html(w(t,h))},i=async()=>{let t=await v(g);e(`#agImgList`).html(w(t,g))};await Promise.all([n(),i()]),e(document).on(`click.ag`,`#agAudBtn`,async function(){let i=e(`#agAudTit`).val().trim(),a=e(`#agAudSrc`).val().trim();if(!i||!a)return r(`Completa título y URL`,`warning`);t(this,!0);try{await y(h,i,a),e(`#agAudTit, #agAudSrc`).val(``),await n(),r(`Audio guardado 🎵`,`success`)}catch(e){console.error(e),r(`Error al guardar`,`error`)}finally{t(this,!1)}}),e(document).on(`click.ag`,`#agImgBtn`,async function(){let n=e(`#agImgTit`).val().trim(),a=e(`#agImgSrc`).val().trim();if(!n||!a)return r(`Completa título y URL`,`warning`);t(this,!0);try{await y(g,n,a),e(`#agImgTit, #agImgSrc`).val(``),await i(),r(`Imagen guardada 🖼️`,`success`)}catch(e){console.error(e),r(`Error al guardar`,`error`)}finally{t(this,!1)}}),e(document).on(`click.ag`,`.ag_copiar`,function(){let t=e(this).closest(`.ag_item`).find(`.ag_item_src`).attr(`title`);navigator.clipboard.writeText(t),r(`URL copiada`,`success`)}),e(document).on(`click.ag`,`.ag_eliminar`,async function(){let t=e(this).closest(`.ag_item`),n=t.data(`id`),i=t.data(`col`);t.css(`opacity`,`.4`);try{await b(i,n),t.slideUp(200,()=>t.remove()),r(`Eliminado`,`info`)}catch(e){console.error(e),t.css(`opacity`,`1`),r(`Error`,`error`)}})},D=()=>{e(document).off(`.ag`)};export{D as cleanup,E as init,x as misAudios,S as misImagenes,T as render};