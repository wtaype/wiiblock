import{n as e}from"./vendor-BBPjS4yS.js";import{S as t,d as n,i as r,w as i}from"./widev-8sJg4_cC.js";import"./index-WaeVJtKe.js";import{E as a,M as o,O as s,T as c,_ as l,k as u,m as d,v as f,x as p}from"./firebase-37FTGmWc.js";import{n as m}from"./firebase-DOYPslWB.js";var h=[],g=null,_=``,v=!0,y=!1,b=null,x=`wiWin`,S=`wi_win_cache`,C=()=>n(`wiSmile`)||{},w=e=>localStorage.setItem(S,JSON.stringify(e)),T=()=>JSON.parse(localStorage.getItem(S)||`[]`),E=()=>h.sort((e,t)=>!!t.pin-+!!e.pin||(t.fechaActualizado?.seconds||0)-(e.fechaActualizado?.seconds||0)),D=()=>({seconds:Math.floor(Date.now()/1e3)}),O=async(t,n=!1)=>{if(y=!t?.email,y){v=!1,k();return}n||e(`.es_btn_refresh`).addClass(`syncing`);try{h=(await l(p(s(m,x),c(`email`,`==`,t.email),f(100)))).docs.map(e=>({_fsId:e.id,...e.data()})),E(),w(h),v=!1,k()}catch{v=!1,n||L()}finally{e(`.es_btn_refresh`).removeClass(`syncing`)}},k=()=>{g||=h.find(e=>e.pin)||h[0]||null,L()},A=async(n=!1)=>{if(!g)return;let i=C(),s=e(`#btnS2`),c=e(`.es_in_title_h`).val().trim()||`Untitled`,l=e(`.es_editor`).html();g.titulo=c,g.contenido=l,g._dirty&&(g.fechaActualizado=D());let d=h.filter(e=>e._dirty);if(!d.length){n&&r(`Sin cambios por guardar`,`info`,800);return}if(w(h),n&&t(s,!0,`Guardando`),y){d.forEach(e=>e._dirty=!1),w(h),F(),n&&setTimeout(()=>{t(s,!1,`Guardado`),setTimeout(()=>s.html(`<i class="fas fa-save"></i> <span id="iconSync">Guardar</span>`),1500)},600);return}try{let e=a(m);for(let t of d){let n={id:t.id,titulo:t.titulo||`Untitled`,contenido:t.contenido||``,email:i.email,usuario:i.usuario||`Public`,fecha:t.fecha||o(),fechaActualizado:o(),pin:!!t.pin};e.set(u(m,x,t._fsId),n),t._dirty=!1}await e.commit(),w(h),F(),n&&(r(`Sincronización Exitosa ✨`,`success`,800),t(s,!1,`Guardado`))}catch(e){n&&(console.error(`Save Error:`,e),r(`Error al guardar`,`error`),t(s,!1,`Reintentar`))}finally{n&&setTimeout(()=>{e(`#btnS2`).length&&e(`#btnS2`).html(`<i class="fas fa-save"></i> <span>Guardar</span>`)},2e3)}},j=async()=>{let t=C(),n=`win${Date.now()}`,r=D(),i={_fsId:n,id:n,titulo:``,contenido:``,pin:!1,email:t.email||`guest`,usuario:t.usuario||`Public`,fecha:r,fechaActualizado:r,_dirty:!0};h.unshift(i),g=i,w(h),L(),e(`.es_in_title_h`).focus(),e(`.es_container`).removeClass(`menu-open`)},M=async(n,i=null)=>{if(confirm(`¿Eliminar?`)){i&&t(e(i),!0,`...`);try{h=h.filter(e=>e._fsId!==n),g?._fsId===n&&(g=h[0]||null),w(h),y||await d(u(m,x,n)),L()}catch{i&&t(e(i),!1,`<i class="fas fa-trash-alt"></i>`),r(`Error al eliminar`,`error`)}}},N=async e=>{let t=h.find(t=>t._fsId===e);t&&(t.pin=!t.pin,t._dirty=!0,t.fechaActualizado=D(),E(),w(h),L())},P=()=>{e(`.es_tool_btn[data-cmd]`).each(function(){let t=e(this).data(`cmd`);try{document.queryCommandState(t)?e(this).addClass(`active`):e(this).removeClass(`active`)}catch{}});try{let t=window.getSelection().anchorNode;if(t){let n=t.nodeType===3?t.parentNode:t;if(e(n).closest(`.es_editor`).length){let t=window.getComputedStyle(n);if(t.fontSize&&e(`#winFontSize`).val(parseInt(t.fontSize)),t.fontFamily){let n=t.fontFamily.split(`,`)[0].replace(/['"]/g,``);e(`#winFontFamily option`).each(function(){(e(this).text()===n||e(this).val().includes(n))&&e(`#winFontFamily`).val(e(this).val())})}let r=e(n).closest(`p, div, h1, h2, h3, h4, h5, h6, li`);if(r.length){let n=r[0].style.lineHeight;n&&e(`#winLineHeight`).val(n),r[0].style.marginBottom===`0px`||t.marginBottom===`0px`?e(`#btnNoMargin`).addClass(`active`):e(`#btnNoMargin`).removeClass(`active`)}}}}catch{}},F=()=>{let t=h.filter(e=>(e.titulo||``).toLowerCase().includes(_.toLowerCase()));e(`.es_list_items_final`).html(t.map(t=>{let n=t.titulo||`Untitled`,r=e(`<div>`).html(t.contenido||``).text().trim()||`Sin contenido...`,a=r.length>30?r.substring(0,30)+`...`:r,o=!t._dirty,s=new Date((t.fechaActualizado?.seconds||Date.now()/1e3)*1e3).toLocaleDateString(`es-ES`,{day:`2-digit`,month:`short`});return`
        <div class="es_item_final ${g?._fsId===t._fsId?`active`:``}" data-id="${t._fsId}">
            <div class="it_r1">
                <strong class="it_title">${t.pin?`<i class="fas fa-thumbtack pin_ico"></i> `:``}${n}</strong>
                <div class="it_icons">
                    <span class="it_status" ${i(o?`Guardado`:`Pendiente`)}>
                        ${o?`<i class="fas fa-cloud"></i>`:`<i class="fas fa-sync-alt fa-spin" style="color:var(--warning)"></i>`}
                    </span>
                    <i class="fas fa-thumbtack it_action btnPin" data-id="${t._fsId}" style="${t.pin?`color:var(--mco)`:``}" ${i(t.pin?`Desanclar`:`Anclar`)}></i>
                    <i class="fas fa-trash-alt it_action btnDel" data-id="${t._fsId}" ${i(`Borrar`)}></i>
                </div>
            </div>
            <div class="it_r2">
                <span class="it_snippet">${a}</span>
                <span class="it_date">${s}</span>
            </div>
        </div>`}).join(``)||`<div class="txc" style="margin-top:20px; opacity:0.4; font-size:12px;">No hay documentos</div>`)},I=()=>{let t=e(`.es_left`);if(t.length){if(v&&!h.length)return t.html(`<div class="es_skeleton"> <div class="sk_line" style="width:40%"></div> <div class="sk_line"></div> </div>`);if(!g)return t.html(`<div style="margin:auto; text-align:center;"><button class="es_btn_new_final" id="btnS1" style="width:280px">+ Nuevo Win</button></div>`);t.html(`
        <div class="es_page">
            <div class="es_page_header">
                <div class="es_header_left">
                    <input type="text" class="es_in_title_h" placeholder="Escribir el título..." value="${g.titulo||``}" spellcheck="false">
                </div>
                <div class="es_header_right">
                    <button class="es_btn_pro save" id="btnS2"><i class="fas fa-save" id="iconSync"></i> <span>Guardar</span></button>
                    <button class="es_btn_pro del" id="btnD2" ${i(`Eliminar permanentemente`)}><i class="fas fa-trash-alt"></i> <span>Eliminar</span></button>
                    <button class="es_btn_menu" id="toggleMenu" ${i(`Historial`)}><i class="fas fa-history"></i></button>
                </div>
            </div>
            <div class="es_page_content">
                <div class="es_editor" contenteditable="true" data-placeholder="Escriba aquí contenido pro..." spellcheck="false">${g.contenido||``}</div>
            </div>
            <div class="es_page_footer">
                <div class="es_footer_group">
                    ${[`bold`,`italic`,`underline`,`strikeThrough`].map(e=>`
                    <button class="es_tool_btn" data-cmd="${e}" ${i(e)}><i class="fas fa-${e===`bold`?`bold`:e===`italic`?`italic`:e===`underline`?`underline`:`strikethrough`}"></i></button>
                    `).join(``)}
                </div>
                <div class="es_footer_sep"></div>
                <div class="es_footer_group">
                    ${[`justifyLeft`,`justifyCenter`,`justifyRight`,`justifyFull`].map(e=>`
                    <button class="es_tool_btn" data-cmd="${e}" ${i(e)}><i class="fas fa-align-${e===`justifyLeft`?`left`:e===`justifyCenter`?`center`:e===`justifyRight`?`right`:`justify`}"></i></button>
                    `).join(``)}
                </div>
                <div class="es_footer_sep"></div>
                <div class="es_footer_group">
                    <button class="es_tool_btn" data-cmd="insertUnorderedList" ${i(`Lista`)}><i class="fas fa-list-ul"></i></button>
                    <button class="es_tool_btn" data-cmd="insertOrderedList" ${i(`Numerada`)}><i class="fas fa-list-ol"></i></button>
                </div>
                <div class="es_footer_sep"></div>
                <div class="es_footer_group">
                    <input type="text" id="winFontSize" class="es_font_text" value="16" maxlength="2" title="Tamaño de fuente" autocomplete="off">
                </div>
                <div class="es_footer_sep"></div>
                <div class="es_footer_group">
                    <select id="winFontFamily" class="es_font_sel" title="Familia de fuente">
                        <option value="inherit">Sistema</option>
                        <option value="Arial, sans-serif">Arial</option>
                        <option value="'Poppins', sans-serif">Poppins</option>
                        <option value="'Rubik', sans-serif">Rubik</option>
                        <option value="Georgia, serif">Georgia</option>
                        <option value="'Courier New', monospace">Courier</option>
                        <option value="'Times New Roman', serif">Times</option>
                    </select>
                </div>
                <div class="es_footer_sep"></div>
                <div class="es_footer_group">
                    <select id="winLineHeight" class="es_font_sel" title="Interlineado" style="width: 58px; padding: 0 0.5vh;">
                        <option value="1">1.0</option>
                        <option value="1.15">1.15</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2.0</option>
                    </select>
                    <button class="es_tool_btn" id="btnNoMargin" title="Eliminar espacio de párrafos"><i class="fas fa-compress-alt"></i></button>
                </div>
            </div>
        </div>`)}},L=()=>{e(`.es_container`).length||e(`#wimain`).html(R()),I(),F()},R=()=>`<div class="es_container">
        <div class="es_overlay"></div>
        <div class="es_left"></div>
        <div class="es_right">
            <div class="es_sidebar_final">
                <div class="es_sidebar_actions">
                    <button class="es_btn_new_final" id="btnN1">+ Nuevo Win</button>
                    <button class="es_btn_refresh" id="btnSync" ${i(`Sync Firestore`)}><i class="fas fa-sync-alt"></i></button>
                </div>
                <input type="text" class="es_search_final" placeholder="Buscar documentos...">
                <div class="es_list_items_final"></div>
                <div style="margin-top:auto; font-size:10px; opacity:0.5; display:flex; align-items:center; gap:5px;">
                    <div class="wn_dot_final"></div> ${y?`Offline - Local Mode`:`Online - wiWin Cloud`}
                </div>
            </div>
        </div>
    </div>`,z=async()=>{B();let t=C();y=!t.email,h=T(),h.length?(v=!1,k()):(L(),O(t,!0)),e(document).on(`click.es`,`.es_tool_btn[data-cmd]`,function(){document.execCommand(e(this).data(`cmd`)),e(`.es_editor`).focus(),P()}).on(`input.es`,`.es_editor, .es_in_title_h`,function(){if(g){g.titulo=e(`.es_in_title_h`).val().trim(),g.contenido=e(`.es_editor`).html(),g._dirty=!0,g.fechaActualizado=D(),w(h);let t=e(`.es_item_final[data-id="${g._fsId}"]`);if(t.length)if(t.find(`.it_status`).html(`<i class="fas fa-sync-alt fa-spin" style="color:var(--warning)"></i>`),e(this).hasClass(`es_in_title_h`))t.find(`.it_title`).html((g.pin?`<i class="fas fa-thumbtack pin_ico"></i> `:``)+(g.titulo||`Untitled`));else{let n=e(`<div>`).html(g.contenido).text().trim()||`Sin contenido...`,r=n.length>30?n.substring(0,30)+`...`:n;t.find(`.it_snippet`).text(r)}let n=e(`.es_editor`)[0];if(n&&e(this).hasClass(`es_editor`)){let e=window.getSelection();if(e?.rangeCount){let t=e.getRangeAt(0).getBoundingClientRect(),r=n.closest(`.es_page_content`),i=r.getBoundingClientRect();t.bottom>i.bottom-40&&(r.scrollTop+=t.bottom-i.bottom+60)}}}}).on(`click.es`,`#btnS2`,()=>A(!0)).on(`click.es`,`#btnSync`,()=>O(C())).on(`click.es`,`#btnD2, .btnDel`,function(t){t.stopPropagation(),M(e(this).data(`id`)||g._fsId,this)}).on(`click.es`,`.btnPin`,function(t){t.stopPropagation(),N(e(this).data(`id`))}).on(`click.es`,`#btnN1, #btnS1`,j).on(`click.es`,`#toggleMenu, .es_overlay`,()=>e(`.es_container`).toggleClass(`menu-open`)).on(`click.es`,`.es_item_final`,async function(){let t=e(this).data(`id`);g?._fsId!==t&&(g=h.find(e=>e._fsId===t),L(),P(),e(`.es_container`).removeClass(`menu-open`))}).on(`input.es`,`.es_search_final`,function(){_=e(this).val(),F()}).on(`keyup.es mouseup.es click.es`,`.es_editor`,function(){P();let e=window.getSelection();e.rangeCount>0&&(b=e.getRangeAt(0))}).on(`keydown.es`,`.es_in_title_h`,function(t){t.key===`Tab`&&(t.preventDefault(),e(`.es_editor`).focus())}).on(`keydown.es`,`#winFontSize`,function(t){if(t.key===`Enter`){t.preventDefault();let n=Math.max(8,Math.min(72,parseInt(e(this).val())||16));if(e(this).val(n),b){let e=window.getSelection();e.removeAllRanges(),e.addRange(b)}document.execCommand(`styleWithCSS`,!1,!0),document.execCommand(`fontSize`,!1,`7`),e(`.es_editor font[size="7"], .es_editor span[style*="xxx-large"]`).removeAttr(`size`).css(`font-size`,n+`px`),e(`.es_editor`).focus().trigger(`input.es`),P()}}).on(`change.es`,`#winFontFamily`,function(){if(b){let e=window.getSelection();e.removeAllRanges(),e.addRange(b)}document.execCommand(`styleWithCSS`,!1,!0),document.execCommand(`fontName`,!1,e(this).val()),e(`.es_editor`).focus().trigger(`input.es`),P()}).on(`change.es`,`#winLineHeight`,function(){if(b){let e=window.getSelection();e.removeAllRanges(),e.addRange(b)}let t=window.getSelection();if(t.rangeCount){let n=t.getRangeAt(0).commonAncestorContainer,r=n.nodeType===3?n.parentNode:n,i=e(r).hasClass(`es_editor`)?e(r).children().filter(function(){return t.containsNode(this,!0)}):e(r).closest(`p, div, h1, h2, h3, h4, h5, h6, li`);!i.length&&e(r).hasClass(`es_editor`)&&(i=e(r)),i.css(`line-height`,e(this).val())}e(`.es_editor`).focus().trigger(`input.es`),P()}).on(`click.es`,`#btnNoMargin`,function(){if(b){let e=window.getSelection();e.removeAllRanges(),e.addRange(b)}let t=window.getSelection();if(t.rangeCount){let n=t.getRangeAt(0).commonAncestorContainer,r=n.nodeType===3?n.parentNode:n,i=e(r).hasClass(`es_editor`)?e(r).children().filter(function(){return t.containsNode(this,!0)}):e(r).closest(`p, div, h1, h2, h3, h4, h5, h6, li`);!i.length&&e(r).hasClass(`es_editor`)&&(i=e(r)),i.css(`margin-bottom`)===`0px`?i.css({"margin-top":``,"margin-bottom":``}):i.css({"margin-top":`0px`,"margin-bottom":`0px`,"padding-bottom":`0px`})}e(`.es_editor`).focus().trigger(`input.es`),P()})},B=()=>{e(document).off(`.es`),h=[],g=null,b=null};export{B as cleanup,z as init,R as render};