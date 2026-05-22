import{n as e}from"./vendor-BBPjS4yS.js";import{C as t,S as n,_ as r,d as i,i as a,m as o,n as s}from"./widev-s4H-x_09.js";import{C as c,M as l,O as u,_ as d,b as f,k as p,m as ee,p as te,v as m,x as h}from"./firebase-37FTGmWc.js";import{n as g}from"./firebase-DOYPslWB.js";import{cargarTodosEmpleados as _}from"./zsmile-kEYmd3lp.js";var v=`.chat`,y=`chatSmileMsgs`,b=.1,x=7,S=5,C=3e4,w=500,T=[],E=[],D=``,O=null,k=!1,A=``,j=``,M=!1,N=!0,P=null,F=()=>`
  <div class="chat_wrap wi_fadeUp">
    <div class="chat_container" id="chatContainer">

      <!-- ═══ SIDEBAR (LEFT COLUMN) ═══ -->
      <aside class="chat_sidebar">
        <div class="chat_sidebar_header">
          <div class="chat_sidebar_title">
            <i class="fas fa-users-viewfinder"></i>
            <h2>Mi Equipo</h2>
            <span class="chat_sidebar_count" id="sidebarCount">0</span>
          </div>
          <button class="chat_sidebar_close_btn" id="chatSidebarClose" title="Cerrar">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="chat_sidebar_search">
          <div class="chat_search_box">
            <i class="fas fa-search"></i>
            <input
              type="text"
              id="chatSearchInput"
              placeholder="Buscar compañero…"
              autocomplete="off"
            >
          </div>
        </div>

        <div class="chat_sidebar_list" id="chatSidebarList">
          ${I()}
        </div>
      </aside>

      <!-- ═══ MAIN CHAT (RIGHT COLUMN) ═══ -->
      <main class="chat_main">
        <!-- ══ HEADER ══ -->
        <div class="chat_header smw_loading" id="chatHeader">
          <div class="chat_header_left">
            <button class="chat_sidebar_toggle_btn" id="chatSidebarToggle" title="Ver colaboradores">
              <i class="fas fa-users"></i>
              <span class="chat_sidebar_indicator"></span>
            </button>
            <div class="chat_header_icon">
              <i class="fas fa-comments"></i>
            </div>
            <div class="chat_header_text">
              <h1 class="chat_title">Chat del Equipo</h1>
              <p class="chat_subtitle">Canal interno de <em>Smiles</em></p>
            </div>
          </div>
          <div class="chat_header_actions">
            <div class="chat_online_badge" id="chatOnline">
              <span class="chat_online_dot"></span>
              <span id="chatOnlineCount">—</span> activos
            </div>
            <button class="chat_refresh_btn" id="chatRefresh" title="Actualizar mensajes">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>

        <!-- ══ MESSAGES AREA ══ -->
        <div class="chat_messages" id="chatMessages">
          ${L()}
        </div>

        <!-- ══ INPUT AREA ══ -->
        <div class="chat_input_area" id="chatInputArea">
          <div class="chat_input_card">
            <div class="chat_textarea_wrap">
              <textarea
                id="chatTextarea"
                class="chat_textarea"
                placeholder="Escribe un mensaje…"
                rows="1"
                maxlength="${w}"
              ></textarea>
            </div>
            <button class="chat_send_btn" id="chatSendBtn" title="Enviar mensaje">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <div class="chat_blocked_msg" id="chatBlockedMsg" style="display:none;">
            <i class="fas fa-lock"></i>
            Solo los colaboradores activos pueden enviar mensajes.
          </div>
        </div>
      </main>

    </div>

    <!-- CHAT DELETION MODAL -->
    <div class="chat_modal" id="chatEliminarModal">
      <div class="chat_modal_body">
        <i class="fas fa-trash-alt"></i>
        <h3>¿Eliminar mensaje?</h3>
        <p>Esta acción no se puede deshacer y se borrará para todos.</p>
        <div class="chat_modal_acts">
          <button class="chat_cancel" id="chatCancelDeleteBtn">Cancelar</button>
          <button class="chat_confirm" id="chatConfirmDeleteBtn">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
`;function I(){return[,,,,,].fill(0).map(()=>`
    <div class="chat_sidebar_sk_item">
      <div class="chat_sidebar_sk_avatar smw_sk_el"></div>
      <div class="chat_sidebar_sk_info">
        <div class="chat_sidebar_sk_name smw_sk_el"></div>
        <div class="chat_sidebar_sk_sub smw_sk_el"></div>
      </div>
    </div>
  `).join(``)}function L(){return[{mine:!1,w:`62%`},{mine:!0,w:`48%`},{mine:!1,w:`75%`},{mine:!0,w:`55%`},{mine:!1,w:`68%`}].map(({mine:e,w:t})=>`
    <div class="chat_bubble_wrap ${e?`mine`:`other`}">
      ${e?``:`<div class="chat_sk_avatar smw_sk_el"></div>`}
      <div class="chat_sk_block">
        <div class="chat_sk_name smw_sk_el" style="width:90px;"></div>
        <div class="chat_sk_bubble smw_sk_el" style="width:${t};"></div>
      </div>
      ${e?`<div class="chat_sk_avatar smw_sk_el"></div>`:``}
    </div>
  `).join(``)}var R=(e=``)=>{let t=e.trim().split(/\s+/).filter(Boolean);return t.length?t.length===1?t[0][0].toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase():`?`},z=[`#3b82f6`,`#f97316`,`#a855f7`,`#22c55e`,`#ef4444`,`#0ea5e9`,`#eab308`,`#ec4899`],B=(e=``)=>{let t=0;for(let n=0;n<e.length;n++)t=e.charCodeAt(n)+((t<<5)-t);return z[Math.abs(t)%z.length]},V=e=>{if(e.tipo===`snapshot`)return H(e);let n=e.usuario||e.autor||``,i=n&&A&&n.toLowerCase().trim()===A.toLowerCase().trim(),a=B(n),o=R(e.nombre||n||`?`),c=t(e.creado||e.ts),l=U(e.texto||``).replace(/\n/g,`<br>`),u=r.user?.rol===`gestor`||r.user?.rol===`admin`,d=i||u,f=e.imagen,p=`
    <div class="chat_avatar_wrap" title="${s(e.nombre||n||``)}">
      ${f?`<img class="chat_avatar_img" src="${e.imagen}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`:``}
      <div class="chat_avatar_fallback" style="background:${a}; ${f?`display:none;`:``}">
        ${o}
      </div>
    </div>
  `;return`
    <div class="chat_bubble_wrap ${i?`mine`:`other`} chat_msg_in ${e.temp?`chat_msg_pending`:``}" data-id="${e.id||``}">
      ${i?``:p}
      <div class="chat_bubble_col">
        <div class="chat_bubble_meta ${i?`right`:``}">
          <span class="chat_bubble_name">${s(e.nombre||n||`Colaborador`)}</span>
          <span class="chat_bubble_time">${c}</span>
          ${d?`<button class="chat_msg_delete_btn" data-id="${e.id||``}" title="Eliminar mensaje"><i class="fas fa-trash-alt"></i></button>`:``}
        </div>
        <div class="chat_bubble ${i?`mine`:`other`}">
          <span>${l}</span>
        </div>
      </div>
      ${i?p:``}
    </div>
  `},H=e=>`
    <div class="chat_snapshot_card chat_msg_in">
      <div class="chat_snapshot_icon">📊</div>
      <div class="chat_snapshot_body">
        <div class="chat_snapshot_label">
          <i class="fas fa-chart-bar"></i> Snapshot del equipo
          <span class="chat_snapshot_time">${t(e.creado||e.ts)}</span>
        </div>
        <div class="chat_snapshot_text">${U(e.texto||``)}</div>
      </div>
    </div>
  `,U=e=>String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`),W=e=>e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),G=()=>{let t=e(`#chatTextarea`).val()||``;e(`.chat_sidebar_item`).each(function(){let n=(e(this).attr(`data-nombre`)||``).trim();n&&(RegExp(`@`+W(n)+`(?![a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ])`,`i`).test(t)?e(this).addClass(`active`):e(this).removeClass(`active`))})},K=(t=!1)=>{let n=e(`#chatMessages`);if(!T.length){n.html(`
      <div class="chat_empty">
        <div class="chat_empty_icon">💬</div>
        <p class="chat_empty_title">Sin mensajes aún</p>
        <p class="chat_empty_sub">¡Sé el primero en escribir!</p>
      </div>
    `);return}let r=T.map(V).join(``);N&&T.length>=x&&(r=`<div class="chat_paginate_container"><button class="chat_paginate_btn" id="chatPaginateBtn"><i class="fas fa-history"></i> Cargar anteriores (+5)</button></div>`+r),n.html(r),e(`#chatMessages .chat_msg_in`).each(function(t){e(this).css(`animation-delay`,`${t*.02}s`)}),t||J()},q=()=>{let t=e(`#chatSidebarList`);if(!t.length)return;let n=E.filter(e=>{let t=D.toLowerCase().trim(),n=(e.nombre||``).toLowerCase(),r=(e.apellidos||``).toLowerCase(),i=(e.usuario||``).toLowerCase();return n.includes(t)||r.includes(t)||i.includes(t)});if(e(`#sidebarCount`).text(n.length),!n.length){t.html(`
      <div class="chat_sidebar_empty">
        <i class="fas fa-search-minus"></i>
        <p class="chat_sidebar_empty_title">Sin resultados</p>
        <p class="chat_sidebar_empty_sub">Intenta buscar otra palabra</p>
      </div>
    `);return}let r=n.map(e=>{let t=e.usuario===A,n=R(e.nombre||`?`),r=B(e.usuario||``),i=e.estado===`activo`,a=e.imagen||e.avatar,o=a?`<img class="chat_sidebar_avatar_img" src="${a}" alt="${e.nombre}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`:``;return`${e.nombre||``} ${e.apellidos||``}`.replace(/\s+/g,` `).trim(),`
      <div class="chat_sidebar_item ${t?`chat_sidebar_item_me`:``}" data-usuario="${e.usuario}" data-nombre="${e.usuario}">
        <div class="chat_sidebar_avatar_wrap">
          ${o}
          <div class="chat_sidebar_avatar_fallback" style="background:${r}; ${a?`display:none;`:``}">
            ${n}
          </div>
          <span class="chat_sidebar_avatar_dot ${i?`online`:`offline`}"></span>
        </div>
        <div class="chat_sidebar_info">
          <div class="chat_sidebar_name_row">
            <span class="chat_sidebar_name">${s(e.nombre)} ${s(e.apellidos||``)}</span>
            ${t?`<span class="chat_sidebar_me_badge">Tú</span>`:``}
          </div>
          <div class="chat_sidebar_status_row">
            <span class="chat_sidebar_role chat_badge_${e.rol||`smile`}">
              ${e.rol===`gestor`?`Gestor`:e.rol===`admin`?`Admin`:`Smile`}
            </span>
            <span class="chat_sidebar_username">@${e.usuario}</span>
          </div>
        </div>
        <div class="chat_sidebar_action" title="Mencionar">
          <i class="fas fa-at"></i>
        </div>
      </div>
    `}).join(``);t.html(r),G()},J=(e=!1)=>{let t=document.getElementById(`chatMessages`);t&&t.scrollTo({top:t.scrollHeight,behavior:e?`smooth`:`auto`})},Y=t=>{e(`#chatOnlineCount`).text(t)},X=async(t=!1)=>{if(!M){if(M=!0,!t){let e=i(y);if(e&&Array.isArray(e)){T=e,N=!0,K(),M=!1;return}}t&&e(`#chatRefresh`).addClass(`chat_spinning`),e(`#chatHeader`).addClass(`smw_loading`);try{let e=await d(h(u(g,`chatSmiles`),f(`creado`,`desc`),m(x)));T=e.docs.reverse().map(e=>({id:e.id,...e.data()})),N=e.size>=x,o(y,T,b),K(),Y(new Set(T.map(e=>e.usuario||e.autor).filter(Boolean)).size)}catch(t){console.error(`[Chat] loadMensajes error:`,t),T.length||e(`#chatMessages`).html(`
        <div class="chat_empty chat_empty_error">
          <div class="chat_empty_icon">⚠️</div>
          <p class="chat_empty_title">Error al cargar</p>
          <p class="chat_empty_sub">Revisa tu conexión e intenta de nuevo.</p>
          <button class="chat_retry_btn" id="chatRetry">
            <i class="fas fa-redo"></i> Reintentar
          </button>
        </div>
      `),a(`No se pudieron cargar los mensajes`,`error`)}finally{M=!1,e(`#chatHeader`).removeClass(`smw_loading`),e(`#chatRefresh`).removeClass(`chat_spinning`)}}},ne=async()=>{if(M||!N||!T.length)return;let t=e(`#chatMessages`),n=T[0].creado||T[0].ts;if(!n){a(`No se puede paginar: falta cursor de tiempo`,`warning`);return}M=!0,e(`#chatPaginateBtn`).prop(`disabled`,!0).html(`<i class="fas fa-circle-notch fa-spin"></i> Cargando anteriores...`);try{let e=await d(h(u(g,`chatSmiles`),f(`creado`,`desc`),c(n),m(S)));if(e.empty){N=!1,K(!0),a(`No hay más mensajes anteriores`,`info`);return}let r=e.docs.reverse().map(e=>({id:e.id,...e.data()}));r.length<S&&(N=!1);let i=t[0].scrollHeight,o=t[0].scrollTop;T=[...r,...T],K(!0);let s=t[0].scrollHeight;t[0].scrollTop=o+(s-i),a(`Cargados ${r.length} mensajes anteriores`,`success`)}catch(e){console.error(`[Chat] loadAnteriores error:`,e),a(`Error al cargar anteriores`,`error`)}finally{M=!1}},Z=async()=>{try{E=await _(!0),q()}catch(e){console.error(`[Chat] _loadColaboradores error:`,e)}},Q=async()=>{if(!k)return;let t=e(`#chatTextarea`),n=t.val().trim();if(!n)return;if(n.length>w){a(`El mensaje excede ${w} caracteres`,`warning`);return}t.val(``).trigger(`input`),$(t[0]);let i=`temp_`+Date.now()+Math.random().toString(36).substr(2,5),s=r.user,c=s?.imagen||s?.avatar||``,d={id:i,texto:n,usuario:A,email:s?.email||``,nombre:j,imagen:c,creado:new Date,ts:new Date,tipo:`texto`,temp:!0};T.push(d),K(!1),te(u(g,`chatSmiles`),{texto:n,usuario:A,email:s?.email||``,nombre:j,imagen:c,creado:l(),ts:l(),tipo:`texto`}).then(e=>{let t=T.findIndex(e=>e.id===i);t!==-1&&(T[t].id=e.id,delete T[t].temp,o(y,T,b),K(!0))}).catch(e=>{console.error(`[Chat] Background send error:`,e),a(`No se pudo entregar el mensaje`,`error`),T=T.filter(e=>e.id!==i),o(y,T,b),K(!0)})},$=e=>{e&&(e.style.height=`auto`,e.style.height=Math.min(e.scrollHeight,96)+`px`,e.style.overflowY=e.scrollHeight>96?`auto`:`hidden`)},re=()=>{let t=e(`#chatTextarea`),n=e(`#chatSendBtn`),r=e(`#chatBlockedMsg`);k?(t.prop(`disabled`,!1).attr(`placeholder`,`Escribe un mensaje…`),n.prop(`disabled`,!1).removeClass(`chat_send_disabled`),r.hide()):(t.prop(`disabled`,!0).attr(`placeholder`,`No puedes enviar mensajes (participación inactiva)`),n.prop(`disabled`,!0).addClass(`chat_send_disabled`),r.show())},ie=async()=>{e(`.chat_wrap`).addClass(`visible`),window.__WIREADY__=!0;let t=r.user;t&&(A=t.usuario||t.email||``,j=t.nombre||t.usuario||`Colaborador`,k=t.participa===`si`),re(),X(!1),Z(),O=setInterval(()=>{o(y,null,0),X(!0),Z()},C),e(document).on(`input${v}`,`#chatTextarea`,function(){$(this),G()}),e(document).on(`keydown${v}`,`#chatTextarea`,function(e){e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),Q())}),e(document).on(`click${v}`,`#chatSendBtn`,()=>Q()),e(document).on(`click${v}`,`#chatRefresh`,async function(){o(y,null,0),N=!0,await X(!0),await Z(),a(`Mensajes actualizados`,`success`)}),e(document).on(`click${v}`,`#chatPaginateBtn`,()=>ne()),e(document).on(`click${v}`,`.chat_msg_delete_btn`,function(){let t=e(this).attr(`data-id`);t&&(P=t,e(`#chatEliminarModal`).addClass(`show`))}),e(document).on(`click${v}`,`#chatCancelDeleteBtn, #chatEliminarModal`,function(t){e(t.target).is(`#chatCancelDeleteBtn, #chatEliminarModal`)&&(e(`#chatEliminarModal`).removeClass(`show`),P=null)}),e(document).on(`click${v}`,`#chatConfirmDeleteBtn`,async function(){if(!P)return;let t=this;n(t,!0,`Eliminando...`);try{let t=P;await ee(p(g,`chatSmiles`,t)),a(`Mensaje eliminado permanentemente`,`success`),e(`#chatEliminarModal`).removeClass(`show`),P=null;let n=e(`.chat_bubble_wrap[data-id="${t}"]`);n.length?n.fadeOut(300,function(){e(this).remove(),T=T.filter(e=>e.id!==t),o(y,T,b)}):(T=T.filter(e=>e.id!==t),o(y,T,b),K(!0))}catch(e){console.error(`[Chat] deleteDoc error:`,e),a(`Error al eliminar mensaje`,`error`)}finally{n(t,!1,`Eliminar`)}}),e(document).on(`input${v}`,`#chatSearchInput`,function(){D=e(this).val(),q()}),e(document).on(`click${v}`,`.chat_sidebar_item`,function(t){if(!k)return;let n=(e(this).attr(`data-nombre`)||``).trim(),r=e(`#chatTextarea`),i=e(this).hasClass(`active`),a=r.val(),o=`@${n}`;if(i){let e=n.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`),t=RegExp(`@`+e+`(?![a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ])\\s*`,`gi`);a=a.replace(t,``),a=a.replace(/\s+/g,` `).trim(),r.val(a?a+` `:``)}else{let e=a?a.endsWith(` `)?``:` `:``;r.val(a+e+o+` `)}r.trigger(`input`),r.focus(),$(r[0]),e(`#chatContainer`).removeClass(`chat_sidebar_active`)}),e(document).on(`click${v}`,`#chatSidebarToggle`,function(){e(`#chatContainer`).addClass(`chat_sidebar_active`)}),e(document).on(`click${v}`,`#chatSidebarClose`,function(){e(`#chatContainer`).removeClass(`chat_sidebar_active`)}),e(document).on(`click${v}`,`#chatRetry`,()=>{e(`#chatMessages`).html(L()),e(`#chatSidebarList`).html(I()),X(!0),Z()}),e(document).on(`focus${v}`,`#chatTextarea`,function(){setTimeout(()=>J(!0),350)})},ae=()=>{e(document).off(v),clearInterval(O),O=null,T=[],E=[],D=``,k=!1,A=``,j=``,M=!1,N=!0,P=null};export{ae as cleanup,ie as init,F as render};