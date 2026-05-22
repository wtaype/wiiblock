import{n as e}from"./vendor-BBPjS4yS.js";import{t}from"./wii-DZw4TcJ0.js";import{a as n,d as r,i,w as a}from"./widev-8sJg4_cC.js";import{n as o}from"./index-WaeVJtKe.js";import{M as s,O as c,S as l,T as u,_ as d,k as f,m as p,v as m,x as h}from"./firebase-37FTGmWc.js";import{n as g,t as _}from"./firebase-DOYPslWB.js";var v=[],y=null,b=null,x=null,S=`wi_notas_cache`,C=`wi_notas_cache_time`,w=100,T=1200,E=300*1e3,D=()=>r(`wiSmile`)||{},O=e=>{try{localStorage.setItem(S,JSON.stringify(e)),localStorage.setItem(C,Date.now().toString())}catch{}},k=()=>{try{return JSON.parse(localStorage.getItem(S)||`[]`)}catch{return[]}},A=()=>{let e=parseInt(localStorage.getItem(C)||`0`);return Date.now()-e<E},j=()=>{localStorage.removeItem(S),localStorage.removeItem(C)},M=[{id:`Cielo`,hex:`#0EBEFF`,bg:`rgba(14,190,255,.12)`,tx:`var(--tx)`,rgb:`14,190,255`},{id:`Dulce`,hex:`#FF5C93`,bg:`rgba(255,92,147,.12)`,tx:`var(--tx)`,rgb:`255,92,147`},{id:`Paz`,hex:`#10B981`,bg:`rgba(16,185,129,.12)`,tx:`var(--tx)`,rgb:`16,185,129`},{id:`Mora`,hex:`#8B5CF6`,bg:`rgba(139,92,246,.12)`,tx:`var(--tx)`,rgb:`139,92,246`},{id:`Sol`,hex:`#F59E0B`,bg:`rgba(245,158,11,.12)`,tx:`var(--tx)`,rgb:`245,158,11`}],N=()=>{let e=D();if(!e.email)return location.replace(`/`),``;let r=e.nombre||e.usuario||e.email||_.currentUser?.email||``;return`
  <div class="wn_container">
    <div class="wn_header">
      <div class="wn_info">
        <img src="/smile.avif" alt="${t}" class="wn_avatar" />
        <div class="wn_text">
          <h1><i class="fas fa-sticky-note"></i> Mis Notas</h1>
          <p>${n()} <strong>${r}</strong></p>
        </div>
      </div>
      <div class="wn_actions">
        <button class="wn_btn_new" id="wnNueva" ${a(`Nueva nota`)}>
          <i class="fas fa-plus"></i> <span>Nueva</span>
        </button>
        <div class="wn_status_wrap">
          <div class="wn_status">
            <span class="wn_dot"></span>
            <span class="wn_dotxt">Cargando...</span>
          </div>
          <button class="wn_btn_sync" id="wnSync" ${a(`Sincronizar`)}>
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="wn_grid" id="wnGrid">${Y(k())}</div>

    <div class="wn_modal" id="wnEliminar">
      <div class="wn_modal_body">
        <i class="fas fa-trash-alt"></i>
        <h3>¿Eliminar nota?</h3>
        <p>Esta acción no se puede deshacer</p>
        <div class="wn_modal_acts">
          <button class="wn_cancel" id="wnCancel">Cancelar</button>
          <button class="wn_confirm" id="wnConfirm">Eliminar</button>
        </div>
      </div>
    </div>
  </div>`},P=()=>{Q();let t=D();if(!t.email)return o.navigate(`/`);let n=t.email||_.currentUser?.email;e(document).on(`click.wn`,`#wnNueva`,()=>z(n)).on(`click.wn`,`#wnSync`,()=>I(n)).on(`click.wn`,`.wn_card`,function(t){e(t.target).closest(`.wn_toolbar, .wn_colors`).length||B(e(this).data(`id`))}).on(`input.wn`,`.wn_titulo, .wn_contenido`,function(){V(e(this).closest(`.wn_card`).data(`id`),n)}).on(`click.wn`,`.wn_pin`,function(t){t.stopPropagation(),U(e(this).closest(`.wn_card`).data(`id`),n)}).on(`click.wn`,`.wn_color`,function(t){t.stopPropagation(),e(this).closest(`.wn_card`).find(`.wn_colors`).toggleClass(`show`)}).on(`click.wn`,`.wn_color_opt`,function(t){t.stopPropagation();let r=e(this).closest(`.wn_card`);W(r.data(`id`),e(this).data(`color`),n),r.find(`.wn_colors`).removeClass(`show`)}).on(`click.wn`,`.wn_del`,function(t){t.stopPropagation(),y=e(this).closest(`.wn_card`).data(`id`),e(`#wnEliminar`).addClass(`show`)}).on(`click.wn`,`#wnCancel, #wnEliminar`,t=>{e(t.target).is(`#wnCancel, #wnEliminar`)&&(e(`#wnEliminar`).removeClass(`show`),y=null)}).on(`click.wn`,`#wnConfirm`,()=>G(n)).on(`click.wn`,t=>{e(t.target).closest(`.wn_colors, .wn_color`).length||e(`.wn_colors`).removeClass(`show`)}),F(n),x=()=>{!document.hidden&&!A()&&L(n,!0)},document.addEventListener(`visibilitychange`,x)},F=t=>{let n=k();n.length&&A()?(v=n,R(),e(`#wnGrid`).html(Y(v)),K(!0,`Cache`)):L(t,!1)},I=async t=>{e(`#wnSync`).addClass(`spinning`),j(),await L(t,!1),e(`#wnSync`).removeClass(`spinning`),i(`Sincronizado ✓`,`success`,1500)},L=async(t,n=!1)=>{try{K(!1,`Cargando...`),v=(await d(h(c(g,`wiNotas`),u(`email`,`==`,t),m(w)))).docs.map(e=>({id:e.id,...e.data()})),R(),O(v),e(`#wnGrid`).html(Y(v)),K(!0)}catch(t){if(console.error(`❌ Notas:`,t),K(!1,`Offline`),!n){let t=k();t.length?(v=t,e(`#wnGrid`).html(Y(v)),i(`Usando caché local 📦`,`warning`,2e3)):e(`#wnGrid`).html(X(`fa-wifi-slash`,`Sin conexión`,`Verifica tu internet`))}}},R=()=>{v.sort((e,t)=>e.pin===t.pin?(t.fecha?.seconds||0)-(e.fecha?.seconds||0):t.pin?1:-1)},z=async t=>{let n=`nota_${Date.now()}`,{usuario:r=``,nombre:a=``}=D(),o={id:n,titulo:``,contenido:``,color:`Cielo`,pin:!1,email:t,usuario:a||r||t,fecha:{seconds:Date.now()/1e3}};v.unshift(o),O(v),e(`#wnGrid`).html(Y(v)),setTimeout(()=>{e(`.wn_card[data-id="${n}"]`).addClass(`editing`).find(`.wn_titulo`).focus()},50);try{await l(f(g,`wiNotas`,n),{...o,fecha:s()}),K(!0),i(`Nueva nota ✨`,`success`,1200)}catch(t){console.error(`❌`,t),v=v.filter(e=>e.id!==n),O(v),e(`#wnGrid`).html(Y(v)),i(`Error al crear`,`error`)}},B=t=>{let n=e(`.wn_card[data-id="${t}"]`);e(`.wn_card.editing`).not(n).removeClass(`editing`),n.toggleClass(`editing`),n.hasClass(`editing`)&&n.find(`.wn_titulo`).focus()},V=(e,t)=>{clearTimeout(b),b=setTimeout(()=>H(e,t),T)},H=async(t,n)=>{let r=e(`.wn_card[data-id="${t}"]`),a=r.find(`.wn_titulo`).text().trim(),o=r.find(`.wn_contenido`).text().trim(),c=v.find(e=>e.id===t);if(c&&!(c.titulo===a&&c.contenido===o)){c.titulo=a,c.contenido=o,O(v),r.addClass(`saving`);try{await l(f(g,`wiNotas`,t),{id:t,titulo:a,contenido:o,color:c.color,pin:c.pin,email:n,usuario:c.usuario,fecha:s()}),K(!0),r.removeClass(`saving`).addClass(`saved`),setTimeout(()=>r.removeClass(`saved`),800)}catch(e){console.error(`❌`,e),r.removeClass(`saving`),i(`Error al guardar`,`error`)}}},U=async(t,n)=>{let r=v.find(e=>e.id===t);if(r){r.pin=!r.pin,R(),O(v),e(`#wnGrid`).html(Y(v));try{await l(f(g,`wiNotas`,t),{...r,fecha:s()}),K(!0),i(r.pin?`Fijada 📌`:`Desanclada`,`success`,1e3)}catch(t){console.error(`❌`,t),r.pin=!r.pin,R(),O(v),e(`#wnGrid`).html(Y(v))}}},W=async(t,n,r)=>{let i=v.find(e=>e.id===t);if(!i||i.color===n)return;let a=i.color;i.color=n,O(v),e(`#wnGrid`).html(Y(v));try{await l(f(g,`wiNotas`,t),{...i,fecha:s()}),K(!0)}catch(t){console.error(`❌`,t),i.color=a,O(v),e(`#wnGrid`).html(Y(v))}},G=async()=>{if(!y)return;let t=y;y=null,e(`#wnEliminar`).removeClass(`show`);let n=[...v];v=v.filter(e=>e.id!==t),O(v),e(`.wn_card[data-id="${t}"]`).addClass(`deleting`),setTimeout(()=>e(`#wnGrid`).html(Y(v)),250);try{await p(f(g,`wiNotas`,t)),i(`Eliminada 🗑️`,`success`,1e3)}catch(t){console.error(`❌`,t),v=n,O(v),e(`#wnGrid`).html(Y(v)),i(`Error al eliminar`,`error`)}},K=(t,n)=>{e(`.wn_dot`).removeClass(`active error`).addClass(t?`active`:`error`),e(`.wn_dotxt`).text(n||(t?`Online`:`Offline`))},q=e=>M.find(t=>t.id===e)||M[0],J=e=>{if(!e)return`Ahora`;let t=e.toDate?.()||new Date((e.seconds||0)*1e3),n=new Date;n.setHours(0,0,0,0);let r=new Date(n);return r.setDate(r.getDate()-1),t>=n?t.toLocaleTimeString(`es`,{hour:`2-digit`,minute:`2-digit`}):t>=r?`Ayer`:t.toLocaleDateString(`es`,{day:`numeric`,month:`short`})},Y=e=>e?.length?e.map(e=>{let t=q(e.color);return`
    <div class="wn_card${e.pin?` pinned`:``}" data-id="${e.id}" style="--c-bg:${t.bg};--c-tx:${t.tx};--c-accent:${t.hex}">
      <div class="wn_card_inner">
        ${e.pin?`<span class="wn_pin_badge"><i class="fas fa-thumbtack"></i></span>`:``}
        <div class="wn_titulo" contenteditable="true" data-placeholder="Título" spellcheck="false">${Z(e.titulo)}</div>
        <div class="wn_contenido" contenteditable="true" data-placeholder="Escribe aquí..." spellcheck="false">${Z(e.contenido).replace(/\n/g,`<br>`)}</div>
        <div class="wn_footer">
          <span class="wn_fecha">${J(e.fecha)}</span>
          <span class="wn_saved"><i class="fas fa-check"></i></span>
        </div>
        <div class="wn_toolbar">
          <button class="wn_pin${e.pin?` active`:``}" ${a(`Fijar`)}><i class="fas fa-thumbtack"></i></button>
          <button class="wn_color" ${a(`Color`)}><i class="fas fa-palette"></i></button>
          <button class="wn_del" ${a(`Eliminar`)}><i class="fas fa-trash"></i></button>
        </div>
        <div class="wn_colors">${M.map(t=>`<span class="wn_color_opt${t.id===e.color?` active`:``}" data-color="${t.id}" style="--cc:${t.hex}"></span>`).join(``)}</div>
      </div>
    </div>`}).join(``):X(`fa-sticky-note`,`Sin notas aún`,`Crea tu primera nota 👆`),X=(e,t,n)=>`<div class="wn_empty"><i class="fas ${e}"></i><p>${t}</p><span>${n}</span></div>`,Z=e=>String(e||``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`})[e]),Q=()=>{clearTimeout(b),x&&=(document.removeEventListener(`visibilitychange`,x),null),e(document).off(`.wn`),[v,y,b]=[[],null,null]};export{Q as cleanup,P as init,N as render};