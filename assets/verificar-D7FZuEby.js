const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/login-CS-GQr1l.css"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-S-ySWqyJ.js";import{n as t}from"./vendor-BBPjS4yS.js";import{d as n,r}from"./widev-8sJg4_cC.js";import{n as i,r as a}from"./index-dirkjPSU.js";import{M as o,S as s,g as c,i as l,k as u}from"./firebase-37FTGmWc.js";import{n as d,t as f}from"./firebase-D1N8l2os.js";var p=()=>new Promise(e=>{if(f.currentUser)return e(f.currentUser);let t=l(f,n=>{t(),e(n)})}),m=`ABCDEFGHIJKLMNOPQRSTUVWXYZ234567`,h=e=>{let t=0,n=0,r=[];for(let i of e.replace(/=+$/,``).toUpperCase())n=n<<5|m.indexOf(i),t+=5,t>=8&&(r.push(n>>>t-8&255),t-=8);return new Uint8Array(r)},g=()=>{let e=crypto.getRandomValues(new Uint8Array(20));return Array.from(e,e=>m[e&31]).join(``)},_=async(e,t=0)=>{let n=Math.floor(Date.now()/3e4)+t,r=new ArrayBuffer(8);new DataView(r).setUint32(4,n,!1);let i=await crypto.subtle.importKey(`raw`,h(e),{name:`HMAC`,hash:`SHA-1`},!1,[`sign`]),a=new Uint8Array(await crypto.subtle.sign(`HMAC`,i,r)),o=a[19]&15;return(((a[o]&127)<<24|a[o+1]<<16|a[o+2]<<8|a[o+3])%1e6).toString().padStart(6,`0`)},v=async(e,t)=>{for(let n of[-1,0,1])if(await _(t,n)===e)return!0;return!1},y=e=>{let t=n(`wiSmile`);return!e||!t?(i.navigate(`/login`),!1):t.rol===`admin`?t.estado===`activo`?sessionStorage.getItem(`vault_unlocked`)===`true`?(i.navigate(`/admin`),!1):t:(i.navigate(`/registrado`),!1):(i.navigate(`/`),!1)},b=`
  <svg viewBox="0 0 100 100" class="vault_svg_logo" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g_glow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#4285F4"/>
        <stop offset="33%" stop-color="#EA4335"/>
        <stop offset="66%" stop-color="#FBBC05"/>
        <stop offset="100%" stop-color="#34A853"/>
      </linearGradient>
    </defs>
    <!-- Glowing ring -->
    <circle cx="50" cy="50" r="46" fill="none" stroke="url(#g_glow)" stroke-width="3" opacity="0.3" class="vault_glow_ring"/>
    <!-- Outer white dial with shadow -->
    <circle cx="50" cy="50" r="38" fill="var(--wb, #fff)" style="filter: drop-shadow(0px 8px 16px rgba(0,0,0,0.12))"/>
    
    <!-- Google Colors Dial segments -->
    <path d="M 50,18 A 32,32 0 0,1 82,50 L 50,50 Z" fill="#4285F4"/>
    <path d="M 82,50 A 32,32 0 0,1 50,82 L 50,50 Z" fill="#EA4335"/>
    <path d="M 50,82 A 32,32 0 0,1 18,50 L 50,50 Z" fill="#FBBC05"/>
    <path d="M 18,50 A 32,32 0 0,1 50,18 L 50,50 Z" fill="#34A853"/>
    
    <!-- White center hub with a lock keyhole -->
    <circle cx="50" cy="50" r="16" fill="var(--wb, #fff)"/>
    <circle cx="50" cy="46" r="4.5" fill="#1e293b"/>
    <path d="M 47.5,46 L 52.5,46 L 54,58 L 46,58 Z" fill="#1e293b"/>
  </svg>
`,x=`
  <div class="vault_badge">Admin</div>
  <h1 class="vault_title">Configura tu Bóveda</h1>
  <p class="vault_subtitle">Escanea este código QR con <strong>Google Authenticator</strong> para proteger el panel de administración.</p>

  <div id="vault_qr_wrap" class="vault_qr_wrap">
    <canvas id="vault_qr"></canvas>
    <div class="vault_qr_shine"></div>
  </div>
  <p class="vault_qr_hint"><i class="fas fa-info-circle"></i> Abre Google Authenticator → Añadir cuenta → Escanear QR</p>

  <div class="vault_auth_box" style="margin-top:1.5rem">
    <label>Ingresa el código de 6 dígitos para confirmar</label>
    <div class="vault_input_wrap">
      <i class="fas fa-th"></i>
      <input type="text" id="vault_code_setup" placeholder="000000" maxlength="6" autocomplete="off" inputmode="numeric" />
    </div>
    <button id="btn_vault_confirmar" class="vault_btn_primary" disabled>
      <i class="fas fa-lock"></i> Confirmar y Cerrar Puerta
    </button>
  </div>
`,S=`
  <h1 class="vault_title">Verificar que eres tú</h1>
  <p class="vault_subtitle">Abre <strong>Google Authenticator</strong> en tu celular e ingresa el código de 6 dígitos.</p>

  <div class="vault_auth_box">
    <div class="vault_input_wrap vault_input_lg">
      <i class="fas fa-th"></i>
      <input type="text" id="vault_code" placeholder="000000" maxlength="6"
             autocomplete="off" inputmode="numeric" autofocus />
    </div>
    <button id="btn_code" class="vault_btn_primary">
      <i class="fas fa-unlock"></i> Verificar y Entrar
    </button>
  </div>

  <button id="btn_vault_back" class="vault_btn_back">
    <i class="fas fa-arrow-left"></i> Volver al inicio
  </button>
`,C=null,w=null,T=60;function E(){w&&clearInterval(w);let e=localStorage.getItem(`vault_expire`);e||(e=Date.now()+T*1e3,localStorage.setItem(`vault_expire`,e));let n=()=>Math.max(0,Math.ceil((parseInt(e)-Date.now())/1e3)),i=n();t(`#vault_timer`).text(`${i}s`);let o=async()=>{if(i=n(),t(`#vault_timer`).text(`${i}s`),i<=0){w&&clearInterval(w),w=null,localStorage.removeItem(`vault_expire`),r(`Sesión cerrada por inactividad`,`error`);let{salir:e}=await a(async()=>{let{salir:e}=await import(`./login-DNnpS32i.js`);return{salir:e}},__vite__mapDeps([0]));await e()}};o(),i>0&&(w=setInterval(o,1e3))}var D=()=>{let e=n(`wiSmile`);return!e||e.rol!==`admin`?``:`
    <div class="vault_wrap">
      <div class="vault_card" id="vault_card_container">
        <div class="vault_timer_band">
          <i class="fas fa-clock fa-spin"></i> Cierre de seguridad en <strong id="vault_timer">60s</strong>
        </div>
        <div class="vault_logo_wrapper">
          ${b}
        </div>
        <div id="vault_content_area" style="text-align:center;padding:1rem 0">
          <i class="fas fa-spinner fa-spin fa-2x" style="color:var(--tx3,#aaa)"></i>
          <p style="margin-top:1rem;color:var(--tx2)">Cargando Autenticación...</p>
        </div>
      </div>
    </div>
  `},O=async()=>{t(`body`).addClass(`is-vault-locked`),E(),t(document).off(`.vault_shield`),t(document).on(`click.vault_shield`,`a, [href], .nv_item`,function(e){if(t(`body`).hasClass(`is-vault-locked`)){let n=t(this);if(n.attr(`id`)===`btn_vault_back`||n.closest(`#btn_vault_back`).length)return;e.preventDefault(),e.stopPropagation(),r(`<i class="fas fa-exclamation-triangle"></i> Identidad no verificada. Completa el 2FA primero.`,`warning`)}}),t(document).on(`contextmenu.vault_shield`,function(e){t(`body`).hasClass(`is-vault-locked`)&&(e.preventDefault(),r(`<i class="fas fa-eye-slash"></i> Clic derecho inhabilitado por seguridad.`,`warning`))}),t(document).on(`copy.vault_shield cut.vault_shield paste.vault_shield`,`input, body`,function(e){t(`body`).hasClass(`is-vault-locked`)&&(e.preventDefault(),r(`<i class="fas fa-key"></i> Copiar y pegar inhabilitado en esta boveda.`,`warning`))}),t(document).on(`keydown.vault_shield`,function(e){if(t(`body`).hasClass(`is-vault-locked`)){if(e.keyCode===123)return e.preventDefault(),r(`<i class="fas fa-shield-alt"></i> DevTools bloqueado por seguridad.`,`error`),!1;if(e.ctrlKey||e.metaKey){let t=String.fromCharCode(e.keyCode).toLowerCase();if(t===`u`||t===`s`||t===`p`||e.shiftKey&&(t===`i`||t===`j`||t===`c`))return e.preventDefault(),r(`<i class="fas fa-shield-alt"></i> Combinación de teclas restringida en esta zona.`,`error`),!1}}});let e=y(await p());if(e)try{let n=await c(u(d,`configwii`,e.usuario)),r=n.exists()?n.data():null;r?.configurado&&r?.secret?(C=r.secret,t(`#vault_card_container`).removeClass(`vault_card_setup`),t(`#vault_content_area`).html(S),A(e)):(t(`#vault_card_container`).addClass(`vault_card_setup`),t(`#vault_content_area`).html(x),await k(e))}catch(e){console.error(`[verificar] init:`,e),r(`Error al cargar la bóveda`,`error`)}};async function k(i){let c=await a(()=>import(`./vendor-BBPjS4yS.js`).then(t=>e(t.t(),1)),[]);C=g();let l=`WiiBlock`,f=n(`wiSmile`),p=`otpauth://totp/${l}:${encodeURIComponent(f?.usuario||i.usuario)}?secret=${C}&issuer=${l}&algorithm=SHA1&digits=6&period=30`;await c.toCanvas(document.getElementById(`vault_qr`),p,{width:200,margin:2,color:{dark:`#0f172a`,light:`#ffffff`}}),t(document).on(`input.vault`,`#vault_code_setup`,function(){this.value=this.value.replace(/[^0-9]/g,``),t(`#btn_vault_confirmar`).prop(`disabled`,this.value.length!==6)}),t(document).on(`click.vault`,`#btn_vault_confirmar`,async function(){let e=t(`#vault_code_setup`).val().trim();if(e.length!==6)return;if(!await v(e,C)){r(`<i class="fas fa-times-circle"></i> Código incorrecto, intenta de nuevo`,`error`),t(`#vault_code_setup`).val(``).focus();return}let n=t(this);n.html(`<i class="fas fa-spinner fa-spin"></i> Guardando...`).prop(`disabled`,!0);try{await s(u(d,`configwii`,i.usuario),{configurado:!0,secret:C,email:i.email||``,creado:o(),actualizado:o()}),r(`<i class="fas fa-lock"></i> ¡Bóveda configurada! Bienvenido al panel.`,`success`),j()}catch(e){console.error(`[verificar] setup save:`,e),r(`Error al guardar la configuración`,`error`),n.html(`<i class="fas fa-lock"></i> Confirmar y Cerrar Puerta`).prop(`disabled`,!1)}})}function A(e){setTimeout(()=>t(`#vault_code`).focus(),100),t(document).on(`input.vault`,`#vault_code`,function(){this.value=this.value.replace(/[^0-9]/g,``),this.value.length===6&&t(`#btn_code`).click()}),t(document).on(`click.vault`,`#btn_code`,async function(){let e=t(`#vault_code`).val().trim();if(e.length!==6)return r(`Ingresa los 6 dígitos`,`warning`);let n=t(this),i=n.html();n.html(`<i class="fas fa-spinner fa-spin"></i> Verificando...`).prop(`disabled`,!0);try{await v(e,C)?(r(`<i class="fas fa-unlock"></i> ¡Bóveda desbloqueada!`,`success`),j()):(r(`<i class="fas fa-times-circle"></i> Código incorrecto o expirado`,`error`),t(`#vault_code`).val(``).focus(),n.html(i).prop(`disabled`,!1))}catch(e){console.error(`[verificar] unlock:`,e),n.html(i).prop(`disabled`,!1)}}),t(document).on(`click.vault`,`#btn_vault_back`,()=>{localStorage.removeItem(`vault_expire`),i.navigate(`/`)})}function j(){w&&=(clearInterval(w),null),localStorage.removeItem(`vault_expire`),t(`body`).removeClass(`is-vault-locked`),sessionStorage.setItem(`vault_unlocked`,`true`),window.location.href=`/admin`}var M=()=>{w&&=(clearInterval(w),null),t(`body`).removeClass(`is-vault-locked`),t(document).off(`.vault`),t(document).off(`.vault_shield`)};export{M as cleanup,O as init,D as render};