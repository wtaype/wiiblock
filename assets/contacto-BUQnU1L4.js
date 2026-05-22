import{n as e}from"./vendor-BBPjS4yS.js";import{t}from"./wii-DZw4TcJ0.js";import{E as n,S as r,T as i,i as a,x as o}from"./widev-8sJg4_cC.js";import{r as s}from"./index-dirkjPSU.js";import"./cookies-BREJrm6Y.js";var c={pub:void 0,sid:void 0,tid:void 0};o({js:[()=>s(()=>import(`https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`),[])]});var l=[{ico:`fa-envelope`,color:`#0EBEFF`,label:`Email Soporte`,value:`soporte@wiiblock.dev`,copiable:!0},{ico:`fa-users`,color:`#FF5C69`,label:`Comunidad`,value:`Soporte Comunitario GitHub`,copiable:!1},{ico:`fa-clock`,color:`#29C72E`,label:`Atención Técnica`,value:`Lunes a Viernes (Respuesta en 24h)`,copiable:!1}],u=[`Reportar anuncio no bloqueado`,`Problema de visualización (Sitio Roto)`,`Sugerencia de filtro o nueva regla`,`Problema con la extensión (Error técnico)`,`Reportar vulnerabilidad de privacidad`,`Otro motivo de soporte`],d=[{q:`¿Cómo reporto un anuncio que WiiBlock no ha bloqueado?`,r:`Puedes usar este formulario seleccionando el asunto "Reportar anuncio no bloqueado" indicando la URL exacta de la página web y el lugar de la pantalla donde aparece el anuncio. Nuestro equipo actualizará las listas de filtros en un plazo máximo de 24 horas.`},{q:`¿Por qué algunas páginas se ven "rotas" al activar el bloqueador?`,r:`Esto se conoce coloquialmente como "anti-adblock bypass" o fallas de inyección de CSS. Si un sitio web deja de funcionar o no carga correctamente sus imágenes, desactiva temporalmente el escudo desde el popup de la extensión y repórtanos el sitio usando el asunto "Problema de visualización (Sitio Roto)" para que podamos ajustar la regla específica.`},{q:`¿WiiBlock recopila mi historial de navegación?`,r:`No. WiiBlock respeta tu privacidad de forma absoluta. Todo el procesamiento de red se hace de manera local en tu navegador Chrome mediante la API nativa declarativeNetRequest. Ninguno de tus datos de navegación, búsquedas o historial es enviado a servidores externos ni recopilado por nosotros.`},{q:`¿Cómo puedo sugerir una nueva función o lista de filtros?`,r:`¡Nos encanta recibir sugerencias! Selecciona el asunto "Sugerencia de filtro o nueva regla" y coméntanos qué lista comunitaria te gustaría ver preconfigurada en WiiBlock o qué funcionalidad extra te gustaría que incorporemos en la próxima versión.`}],f=500,p=`wi_ct_last`,m=60*1e3,h=()=>{let e=parseInt(localStorage.getItem(p)||`0`,10);return Date.now()-e>m},g=()=>localStorage.setItem(p,String(Date.now())),_=[],v=()=>`
<main id="wimain">
<div class="ac_wrap ct_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero ct_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-headset"></i> Centro de Ayuda WiiBlock</div>
      <h1 class="ac_hero_tit">Soporte y<br><span class="ac_grad">Consultas 🛠️</span></h1>
      <p class="ac_hero_sub">
        ¿Has encontrado un anuncio molesto o un sitio web roto? 
        <strong>Nuestro equipo de soporte técnico te ayudará de inmediato.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-clock"></i> Respuesta: Lunes a Viernes</span>
        <span class="tm_chip"><i class="fas fa-shield-halved"></i> 100% Confidencial</span>
        <span class="tm_chip"><i class="fas fa-user-shield"></i> Soporte Especializado</span>
      </div>
    </div>
  </section>

  <!-- ══ GRID: FORM + INFO ══ -->
  <section class="ac_sec ct_sec">
    <div class="ct_grid">

      <!-- Formulario -->
      <div class="ct_form_wrap">
        <div class="ac_sec_head" style="text-align:left;margin-bottom:4vh">
          <div class="ac_sec_badge"><i class="fas fa-comment-dots"></i> Formulario de Reportes</div>
          <h2 class="ac_sec_tit">Enviar <span class="ac_grad">un reporte</span></h2>
        </div>
        <form id="ctForm" class="ct_form" novalidate autocomplete="off">
          <!-- Honeypot anti-bot (invisible) -->
          <input type="text" name="ct_honey" id="ct_honey" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0">

          <div class="ct_field">
            <label for="ct_nombre"><i class="fas fa-user"></i> Tu Nombre</label>
            <input type="text" id="ct_nombre" name="from_name" placeholder="Ingresa tu nombre o alias" required maxlength="80">
          </div>
          <div class="ct_field">
            <label for="ct_email"><i class="fas fa-envelope"></i> Correo Electrónico</label>
            <input type="email" id="ct_email" name="email" placeholder="ejemplo@correo.com" required maxlength="120">
          </div>
          <div class="ct_field">
            <label for="ct_telefono"><i class="fas fa-phone"></i> Celular / Contacto (Opcional)</label>
            <input type="tel" id="ct_telefono" name="telefono" placeholder="Tu número de contacto" maxlength="20">
          </div>
          <div class="ct_field">
            <label for="ct_asunto"><i class="fas fa-tag"></i> Asunto o Incidencia</label>
            <select id="ct_asunto" name="asunto" required>
              <option value="">Selecciona un motivo</option>
              ${u.map(e=>`<option value="${e}">${e}</option>`).join(``)}
            </select>
          </div>
          <div class="ct_field">
            <label for="ct_mensaje"><i class="fas fa-comment-dots"></i> Detalles del Reporte o Consulta</label>
            <textarea id="ct_mensaje" name="message" rows="6" placeholder="Describe detalladamente el problema (URL del sitio con anuncios, comportamiento de la extensión, etc.)" required maxlength="${f}"></textarea>
            <div class="ct_chars"><span id="ct_count">0</span> / ${f}</div>
          </div>

          <div class="ct_actions">
            <button type="submit" class="ac_btn_p ct_btn_submit" id="ct_submit">
              <i class="fas fa-paper-plane"></i> <span>Enviar Mensaje</span>
            </button>
            <button type="reset" class="ac_btn_s">
              <i class="fas fa-redo"></i> <span>Limpiar</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Info -->
      <div class="ct_info_wrap">
        <div class="ct_info_card wi_fadeUp">
          <h3><i class="fas fa-address-card"></i> Información de Contacto</h3>
          <div class="ct_info_items">
            ${l.map(e=>`
              <div class="ct_info_item">
                <div class="ct_info_ico" style="background:color-mix(in srgb,${e.color} 15%,transparent);color:${e.color}">
                  <i class="fas ${e.ico}"></i>
                </div>
                <div class="ct_info_data">
                  <span class="ct_info_label">${e.label}</span>
                  <span class="ct_info_value">${e.value}</span>
                </div>
                ${e.copiable?`<button class="ct_copy" data-copy="${e.value}" title="Copiar"><i class="fas fa-copy"></i></button>`:``}
              </div>`).join(``)}
          </div>
        </div>

        <div class="ct_info_card wi_fadeUp" style="margin-top:3vh">
          <h3><i class="fas fa-shield-halved"></i> Confidencialidad de la Información</h3>
          <div style="font-size:0.8rem; line-height:1.6; padding:12px;">
            Este formulario de soporte se procesa de forma segura. La información proporcionada (como nombres, correos y URLs) es estrictamente utilizada para resolver problemas de bloqueo de anuncios y no se comparte con ninguna entidad externa.
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ══ FAQ ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-circle-question"></i> Resolución de Dudas</div>
      <h2 class="ac_sec_tit">Preguntas <span class="ac_grad">Frecuentes</span></h2>
    </div>
    <div class="ct_faq">
      ${d.map((e,t)=>`
        <div class="ct_faq_item wi_fadeUp" id="faq_${t}">
          <div class="ct_faq_q">
            <i class="fas fa-circle-question"></i>
            <h3>${e.q}</h3>
            <i class="fas fa-chevron-down ct_faq_arr"></i>
          </div>
          <div class="ct_faq_a"><p>${e.r}</p></div>
        </div>`).join(``)}
    </div>
  </section>

</div></main>`,y=()=>{e(document).on(`input.contacto`,`#ct_mensaje`,function(){let t=e(this).val();t.length>f&&e(this).val(t.slice(0,f)),e(`#ct_count`).text(Math.min(t.length,f))}),e(document).on(`reset.contacto`,`#ctForm`,()=>{setTimeout(()=>e(`#ct_count`).text(`0`),10)}),e(document).on(`submit.contacto`,`#ctForm`,async function(n){if(n.preventDefault(),e(`#ct_honey`).val())return;if(!h()){a(`Espera un momento antes de enviar otro mensaje.`,`warning`);return}let i=e(`#ct_nombre`).val().trim(),o=e(`#ct_email`).val().trim(),s=e(`#ct_telefono`).val().trim()||`No especificado`,l=e(`#ct_asunto`).val(),u=e(`#ct_mensaje`).val().trim();if(i.length<3)return a(`El nombre debe tener al menos 3 caracteres.`,`error`);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o))return a(`Ingresa un email válido.`,`error`);if(!l)return a(`Selecciona una incidencia.`,`error`);if(u.length<10)return a(`El mensaje debe tener al menos 10 caracteres.`,`error`);let d=e(`#ct_submit`);r(d,!0,`Enviando…`);try{window.emailjs===void 0&&await new Promise((e,t)=>{let n=document.createElement(`script`);n.src=`https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js`,n.onload=e,n.onerror=()=>t(Error(`No se pudo cargar EmailJS`)),document.head.appendChild(n)}),window.emailjs.init(c.pub),await window.emailjs.send(c.sid,c.tid,{nombre:i,email:o,telefono:s,asunto:l,mensaje:u,app_name:t}),g(),a(`¡Mensaje enviado al equipo técnico! Se procesará a la brevedad. 🛠️`,`success`,4500),this.reset(),e(`#ct_count`).text(`0`)}catch(e){console.error(`[contacto] EmailJS error:`,e),a(`No se pudo enviar el mensaje. Intenta de nuevo.`,`error`)}finally{r(d,!1,`Enviar Mensaje`)}}),e(document).on(`click.contacto`,`.ct_copy`,function(){n(e(this).data(`copy`),this,`¡Copiado!`)}),e(document).on(`click.contacto`,`.ct_faq_q`,function(){let t=e(this).closest(`.ct_faq_item`),n=t.hasClass(`active`);e(`.ct_faq_item`).removeClass(`active`).find(`.ct_faq_a`).slideUp(280),e(`.ct_faq_arr`).removeClass(`rotated`),n||(t.addClass(`active`).find(`.ct_faq_a`).slideDown(280),t.find(`.ct_faq_arr`).addClass(`rotated`))}),_.push(i(`.wi_fadeUp`,t=>e(t).addClass(`visible`))),_.push(i(`.ct_faq_item`,(t,n)=>setTimeout(()=>e(t).addClass(`visible`),n*80))),console.log(`📩 ${t} Soporte Contacto cargado`),window.__WIREADY__=!0},b=()=>{e(document).off(`.contacto`),_.forEach(e=>e?.disconnect?.()),_=[]};export{b as cleanup,y as init,v as render};