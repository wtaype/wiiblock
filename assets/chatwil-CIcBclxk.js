import{n as e}from"./vendor-BBPjS4yS.js";import{a as t}from"./widev-8sJg4_cC.js";import{r as n}from"./index-WaeVJtKe.js";import{SUGERENCIAS as r,detectarTema as i}from"./contexto-CN5_NjMF.js";import"./waa-BSRlNFQl.js";var a=()=>{let e=r.general,n=t().replace(/, $/,``).toLowerCase();return`
<div class="miia">
  
  <div class="miia_messages_wrap">
    <div class="miia_messages" id="miiaMessages">
      <div class="miia_empty wi_fadeUp visible">
        <div class="miia_welcome_icon">
          <img src="/perfil.webp" alt="ChatWil" class="miia_avatar_img">
          <div class="miia_icon_ring"></div>
        </div>
        <h2 class="miia_welcome_title">ChatWil</h2>
        <p class="miia_welcome_text">
          ${n.charAt(0).toUpperCase()+n.slice(1)} herman@, <strong>bienvenid@ a ChatWil. ¿Cuéntame, cómo te sientes hoy?</strong>
        </p>
        <div class="miia_suggestions">
          ${e.map((e,t)=>`
            <div class="suggestion_card" data-prompt="${e.prompt}" style="animation-delay: ${t*.1}s">
              <i class="fas ${e.ico}"></i><span>${e.txt}</span>
            </div>`).join(``)}
        </div>
      </div>
    </div>
  </div>

  <div class="miia_input_area wi_fadeUp visible">
    <div class="miia_input_container">
      <div class="miia_input_wrapper">
        <textarea class="miia_input" id="miiaInput" placeholder="Escribe tu petición aquí..." rows="1"></textarea>
        <button class="miia_send active" id="miiaSend">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div class="miia_input_info">
        <span><i class="fas fa-hands-praying"></i> ChatWil v11 · <a href="https://chatwiil.web.app/terminos.html" target="_blank">Términos</a></span>
      </div>
    </div>
  </div>

</div>`},o=!1,s=0,c=null,l=[],u=()=>({$msg:e(`#miiaMessages`),$inp:e(`#miiaInput`),$btn:e(`#miiaSend`)}),d=(t=!1)=>{let n=e(`.miia_messages_wrap`)[0];n&&(t?n.scrollTo({top:n.scrollHeight,behavior:`smooth`}):n.scrollTop=n.scrollHeight)},f=async()=>c??=await n(()=>import(`./brain-DdaAd1po.js`),[]),p=e=>e.replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/\n/g,`<br>`).replace(/\*\*(.*?)\*\*/g,`<strong>$1</strong>`).replace(/\*(.*?)\*/g,`<strong>$1</strong>`),m=(t,n)=>{let{$msg:r}=u(),i=new Date().toLocaleTimeString(`es-PE`,{hour:`2-digit`,minute:`2-digit`}),a=e(`
    <div class="miia_message ${n}" data-time="${i}">
      <div class="message_avatar">${n===`user`?`<i class="fas fa-user-circle"></i>`:`<img src="/perfil.webp" alt="ChatWil" class="miia_avatar_img">`}</div>
      <div class="message_content">
        <div class="message_header">
          <span class="message_name">${n===`user`?`Tú`:`ChatWil`}</span>
          <span class="message_time">${i}</span>
        </div>
        <div class="message_text"></div>
      </div>
    </div>`);a.find(`.message_text`).html(p(t)),r.append(a),d()},h=t=>{e(`.miia_message.typing`).remove(),t&&(e(`#miiaMessages`).append(`
    <div class="miia_message ai typing">
      <div class="message_avatar"><img src="/perfil.webp" alt="ChatWil" class="miia_avatar_img"></div>
      <div class="message_content">
        <div class="message_text"><div class="typing_dots"><span></span><span></span><span></span></div></div>
      </div>
    </div>`),d())},g=(t,n)=>{let{$msg:r}=u(),i=new Date().toLocaleTimeString(`es-PE`,{hour:`2-digit`,minute:`2-digit`}),a=`tw_${Date.now()}_${++s}`;r.append(`
    <div class="miia_message ai" data-time="${i}">
      <div class="message_avatar"><img src="/perfil.webp" alt="ChatWil" class="miia_avatar_img"></div>
      <div class="message_content">
        <div class="message_header">
          <span class="message_name">ChatWil</span>
          <span class="message_time">${i}</span>
        </div>
        <div class="message_text" id="${a}"></div>
      </div>
    </div>`),d();let o=e(`#${a}`),c=Array.from(t),l=0,f=0,m=()=>{l<c.length?(o.html(p(c.slice(0,l+1).join(``))),l++,Date.now()-f>100&&(d(),f=Date.now()),setTimeout(m,15)):(o.removeAttr(`id`),d(!0),n?.())};m()},_=t=>{e(`.miia_contextual_suggestions`).remove();let n=r[t]??r.general;if(!n?.length)return;let i=`
    <div class="miia_contextual_suggestions">
      <p class="suggestions_title"><i class="fas fa-hands-praying"></i> ¿En qué más podemos orar?</p>
      <div class="suggestions_grid">
        ${n.map(e=>`
          <div class="suggestion_card_small" data-prompt="${e.prompt}">
            <i class="fas ${e.ico}"></i><span>${e.txt}</span>
          </div>`).join(``)}
      </div>
    </div>`;e(`#miiaMessages`).append(i),d(!0)},v=async()=>{let{$inp:t}=u(),n=t.val().trim();if(!(!n||o)){e(`.miia_empty`).fadeOut(200,function(){e(this).remove()}),m(n,`user`),t.val(``).css(`height`,`auto`).trigger(`input`),o=!0,h(!0);try{l.push({role:`user`,content:n}),await new Promise(e=>setTimeout(e,800+Math.random()*700));let e=await(await f()).procesar(n,l);if(h(!1),!e||typeof e!=`string`)throw Error(`Respuesta inválida`);l.push({role:`assistant`,content:e}),g(e,()=>{o=!1,_(i(n))})}catch(e){console.error(`❌ Error:`,e),h(!1),m(`😔 Disculpa, tuve un problema. Por favor, intenta de nuevo. 💚`,`ai`),o=!1}}},y=()=>{let{$inp:n,$btn:r}=u(),i=t().replace(/, $/,``).toLowerCase(),a=`${i.charAt(0).toUpperCase()+i.slice(1)}, me gustaría que ores por mí, por favor.`;n.val(a),n.attr(`placeholder`,`Escribe tu petición aquí...`),e(document).on(`input.chatwil`,`#miiaInput`,function(){this.style.height=`auto`,this.style.height=Math.min(this.scrollHeight,120)+`px`;let t=e(this).val().trim().length>0;e(`#miiaSend`).prop(`disabled`,!t).toggleClass(`active`,t)}).on(`keydown.chatwil`,`#miiaInput`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),v())}).on(`click.chatwil`,`#miiaSend`,v).on(`click.chatwil`,`.suggestion_card, .suggestion_card_small`,function(){e(`#miiaInput`).val(e(this).data(`prompt`)).css(`height`,`auto`).trigger(`input`).focus(),e(this).hasClass(`suggestion_card_small`)&&setTimeout(v,120)}),console.log(`✅ ChatWil v11 iniciado`)},b=()=>{e(document).off(`.chatwil`),l=[]};export{b as cleanup,y as init,a as render};