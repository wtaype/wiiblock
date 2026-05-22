import{n as e}from"./vendor-BBPjS4yS.js";import{d as t,i as n}from"./widev-mG2tMnX8.js";var r=()=>t(`wiSmile`),i=[{id:`wiihope_all`,txt:`Todos los usuarios`},{id:`wiihope_paz`,txt:`Mensajes de paz`},{id:`wiihope_esperanza`,txt:`Esperanza`},{id:`wiihope_blog`,txt:`Blog`},{id:`wiihope_biblia`,txt:`Biblia`},{id:`wiihope_felicitaciones`,txt:`Felicitaciones`}],a=[{id:`home`,txt:`Inicio`},{id:`messages`,txt:`Mensajes`},{id:`blog`,txt:`Blog`},{id:`bible`,txt:`Biblia`},{id:`quotes`,txt:`Citas`},{id:`music`,txt:`Musica`},{id:`settings`,txt:`Ajustes`},{id:`dashboard`,txt:`Dashboard`}],o=[{id:`esperanza`,txt:`Esperanza`},{id:`blog`,txt:`Blog`},{id:`biblia`,txt:`Biblia`},{id:`citas`,txt:`Citas`},{id:`sistema`,txt:`Sistema`},{id:`felicitacion`,txt:`Felicitacion`}],s=(e=``)=>String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`),c=t=>String(e(t).val()||``).trim(),l=()=>{let e=r();return!e||e.rol!==`admin`?`<div class="fcm_page"><div class="fcm_empty"><i class="fas fa-ban"></i> Acceso denegado.</div></div>`:`
  <div class="fcm_page">
    <section class="fcm_hero">
      <div class="fcm_hero_icon"><i class="fas fa-bell"></i></div>
      <div>
        <div class="fcm_badge"><i class="fas fa-shield-heart"></i> Admin seguro</div>
        <h1>Mi FCM</h1>
        <p>Generador de payloads para enviar avisos a WiiHope Android desde Firebase Console.</p>
      </div>
    </section>

    <section class="fcm_grid">
      <div class="fcm_card">
        <div class="fcm_head">
          <i class="fas fa-pen-nib"></i>
          <div>
            <h2>Mensaje</h2>
            <p>Escribe el aviso y elige donde abrira en la app.</p>
          </div>
        </div>

        <div class="fcm_field">
          <label>Titulo</label>
          <input id="fcm_title" class="fcm_input" maxlength="80" value="Un mensaje de esperanza para ti">
        </div>

        <div class="fcm_field">
          <label>Cuerpo</label>
          <textarea id="fcm_body" class="fcm_input" maxlength="240">Dios sigue contigo. Respira, ora un momento y continua con paz.</textarea>
        </div>

        <div class="fcm_cols">
          <div class="fcm_field">
            <label>Topic</label>
            <select id="fcm_topic" class="fcm_input">
              ${i.map(e=>`<option value="${e.id}">${e.txt}</option>`).join(``)}
            </select>
          </div>
          <div class="fcm_field">
            <label>Pantalla</label>
            <select id="fcm_screen" class="fcm_input">
              ${a.map(e=>`<option value="${e.id}">${e.txt}</option>`).join(``)}
            </select>
          </div>
        </div>

        <div class="fcm_cols">
          <div class="fcm_field">
            <label>Tipo</label>
            <select id="fcm_type" class="fcm_input">
              ${o.map(e=>`<option value="${e.id}">${e.txt}</option>`).join(``)}
            </select>
          </div>
          <div class="fcm_field">
            <label>Slug opcional</label>
            <input id="fcm_slug" class="fcm_input" placeholder="ej. biblia_amor_verdadero">
          </div>
        </div>

        <div class="fcm_actions">
          <button id="fcm_btn_build" class="fcm_btn primary"><i class="fas fa-wand-magic-sparkles"></i> Generar</button>
          <button id="fcm_btn_demo" class="fcm_btn"><i class="fas fa-seedling"></i> Ejemplo blog</button>
        </div>
      </div>

      <div class="fcm_card">
        <div class="fcm_head">
          <i class="fas fa-list-check"></i>
          <div>
            <h2>Firebase Console</h2>
            <p>Copia estos campos en Cloud Messaging.</p>
          </div>
        </div>
        <div id="fcm_console" class="fcm_console"></div>
        <button class="fcm_btn wide" data-copy="#fcm_console_text"><i class="fas fa-copy"></i> Copiar campos</button>
      </div>
    </section>

    <section class="fcm_card">
      <div class="fcm_head">
        <i class="fas fa-code"></i>
        <div>
          <h2>JSON REST v1</h2>
          <p>Guardalo para una fase futura con backend seguro.</p>
        </div>
      </div>
      <pre id="fcm_json" class="fcm_pre"></pre>
      <button class="fcm_btn wide" data-copy="#fcm_json"><i class="fas fa-copy"></i> Copiar JSON</button>
    </section>
  </div>`},u=()=>{let t=r();!t||t.rol!==`admin`||(e(document).off(`.fcm`),e(document).on(`click.fcm`,`#fcm_btn_build`,f).on(`change.fcm keyup.fcm`,`#fcm_title,#fcm_body,#fcm_topic,#fcm_screen,#fcm_type,#fcm_slug`,f).on(`click.fcm`,`#fcm_btn_demo`,p).on(`click.fcm`,`[data-copy]`,function(){m(e(this).data(`copy`))}),f())},d=()=>{e(document).off(`.fcm`)};function f(){let t=c(`#fcm_title`)||`WiiHope`,n=c(`#fcm_body`)||`Tienes un nuevo mensaje.`,r=c(`#fcm_topic`)||`wiihope_all`,i=c(`#fcm_screen`)||`messages`,a=c(`#fcm_type`)||`sistema`,o=c(`#fcm_slug`),l={title:t,body:n,screen:i,type:a};o&&(l.slug=o);let u=[`Topic: ${r}`,``,`Notification title: ${t}`,`Notification text: ${n}`,``,`Custom data:`,...Object.entries(l).map(([e,t])=>`${e}: ${t}`)].join(`
`),d={message:{topic:r,notification:{title:t,body:n},data:l,android:{priority:`HIGH`,notification:{channel_id:`wiihope_general`,click_action:`OPEN_WIIHOPE`}}}};e(`#fcm_console`).html(`
    <div class="fcm_console_box">
      <input id="fcm_console_text" value="${s(u)}" readonly>
      ${Object.entries(l).map(([e,t])=>`<div><strong>${s(e)}</strong><span>${s(t)}</span></div>`).join(``)}
    </div>
  `),e(`#fcm_json`).text(JSON.stringify(d,null,2))}function p(){e(`#fcm_title`).val(`Nueva reflexion en WiiHope`),e(`#fcm_body`).val(`Hay una lectura nueva para fortalecer tu fe hoy.`),e(`#fcm_topic`).val(`wiihope_blog`),e(`#fcm_screen`).val(`blog`),e(`#fcm_type`).val(`blog`),e(`#fcm_slug`).val(`biblia_amor_verdadero`),f(),n(`Ejemplo de blog cargado`,`success`)}async function m(t){let r=e(t),i=r.is(`input,textarea`)?r.val():r.text();try{await navigator.clipboard.writeText(i),n(`Copiado al portapapeles`,`success`)}catch{let t=e(`<textarea>`).val(i).appendTo(`body`).select();document.execCommand(`copy`),t.remove(),n(`Copiado`,`success`)}}export{d as cleanup,u as init,l as render};