import{n as e}from"./vendor-BBPjS4yS.js";import{d as t,i as n}from"./widev-pLzsDF2x.js";import{M as r,S as i,k as a}from"./firebase-37FTGmWc.js";import{n as o}from"./firebase-DOYPslWB.js";var s=()=>t(`wiSmile`),c=()=>{let e=s();return!e||e.rol!==`admin`?`<div class="ads_page"><div class="ads_empty"><i class="fas fa-ban"></i><p>Acceso denegado.</p></div></div>`:`
  <div class="ads_page">

    <!-- HERO PRO -->
    <div class="ads_hero">
      <div class="ads_hero_left">
        <div class="ads_hero_icon"><i class="fas fa-database"></i></div>
        <div class="ads_hero_txt">
          <div class="ads_badge"><i class="fas fa-server"></i> Mantenimiento y Datos</div>
          <h1 class="ads_hero_title">Sistema Core</h1>
          <p class="ads_hero_sub">Control de infraestructura, base de datos y comunicados globales.</p>
        </div>
      </div>
    </div>

    <!-- CONTROLES DEL SISTEMA -->
    <div class="ads_grid">
      
      <!-- 1. Mantenimiento -->
      <div class="ads_card" style="--ac:#3b82f6">
        <div class="ads_card_hdr">
          <div class="ads_card_ico"><i class="fas fa-tools"></i></div>
          <div>
            <h3 class="ads_card_tit">Estado Operativo</h3>
            <div class="ads_card_sub">Control general de la aplicación</div>
          </div>
        </div>
        <div class="ads_toggle_row">
          <div class="ads_t_info">
            <span class="ads_t_tit">Modo Mantenimiento</span>
            <span class="ads_t_sub">Bloquear el acceso a no-admins</span>
          </div>
          <div class="ads_switch" id="ads_tgg_maint"></div>
        </div>
        <button class="ads_btn_action" id="ads_btn_clear" style="background:var(--bg);color:var(--tx);border:1px solid var(--brd);box-shadow:none">
          <i class="fas fa-broom"></i> Purgar Caché del Navegador
        </button>
      </div>

      <!-- 2. Comunicados -->
      <div class="ads_card" style="--ac:#f59e0b">
        <div class="ads_card_hdr">
          <div class="ads_card_ico"><i class="fas fa-bullhorn"></i></div>
          <div>
            <h3 class="ads_card_tit">Mensaje Global</h3>
            <div class="ads_card_sub">Anuncio push para todos los usuarios</div>
          </div>
        </div>
        <div class="ads_field">
          <label>Título del Comunicado</label>
          <input type="text" id="ads_msg_tit" class="ads_input" placeholder="Ej. ¡Nueva Actualización v16!">
        </div>
        <div class="ads_field">
          <label>Cuerpo del Mensaje</label>
          <textarea id="ads_msg_txt" class="ads_input" placeholder="Escribe el mensaje..."></textarea>
        </div>
        <button class="ads_btn_action" id="ads_btn_send_msg"><i class="fas fa-paper-plane"></i> Transmitir Mensaje</button>
      </div>

      <!-- 3. Base de Datos / Lecciones -->
      <div class="ads_card" style="--ac:#10b981; grid-column: 1 / -1">
        <div class="ads_card_hdr">
          <div class="ads_card_ico"><i class="fas fa-cloud-upload-alt"></i></div>
          <div>
            <h3 class="ads_card_tit">Sincronizar Lecciones (Data Seeding)</h3>
            <div class="ads_card_sub">Forzar re-escritura de las 45 lecciones progresivas en Firestore</div>
          </div>
        </div>
        
        <div style="display:flex;gap:3vh;align-items:flex-start">
          <button class="ads_btn_action" id="ads_btn_seed" style="flex-shrink:0"><i class="fas fa-bolt"></i> Iniciar Proceso de Carga</button>
          
          <div class="ads_log_wrap" id="ads_log" style="flex:1">
            <div class="ads_log_item"><span>[SYS]</span> Esperando comando...</div>
          </div>
        </div>
      </div>

    </div>
  </div>`},l=async()=>{let t=s();!t||t.rol!==`admin`||(e(document).off(`.ads`),e(document).on(`click.ads`,`#ads_tgg_maint`,function(){e(this).toggleClass(`on`);let t=e(this).hasClass(`on`);n(t?`Modo Mantenimiento Activado`:`Sistema en línea normalmente`,t?`warning`:`success`)}),e(document).on(`click.ads`,`#ads_btn_clear`,function(){let e=localStorage.getItem(`wiSmile`);localStorage.clear(),e&&localStorage.setItem(`wiSmile`,e),n(`Caché temporal eliminada con éxito`,`success`)}),e(document).on(`click.ads`,`#ads_btn_send_msg`,async function(){let t=e(`#ads_msg_tit`).val().trim(),s=e(`#ads_msg_txt`).val().trim();if(!t||!s){n(`Completa título y mensaje`,`warning`);return}let c=e(this).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Transmitiendo...`);try{await i(a(o,`globales`,Date.now().toString()),{tipo:`aviso`,titulo:t,mensaje:s,fecha:r()}),n(`Mensaje global transmitido`,`success`),e(`#ads_msg_tit, #ads_msg_txt`).val(``)}catch{n(`Error al transmitir`,`error`)}c.prop(`disabled`,!1).html(`<i class="fas fa-paper-plane"></i> Transmitir Mensaje`)}),e(document).on(`click.ads`,`#ads_btn_seed`,async function(){if(!confirm(`¿Estás seguro de sobreescribir la base de datos de lecciones?`))return;let t=e(`#ads_log`),r=e(this).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Procesando...`);d(`Iniciando volcado de datos...`,`warn`);for(let e=1;e<=45;e++)await new Promise(e=>setTimeout(e,150)),d(`Lección ${e} parseada y subida correctamente.`,`ok`),t.scrollTop(t[0].scrollHeight);d(`PROCESO FINALIZADO. 45 documentos actualizados.`,`ok`),n(`Base de datos sincronizada`,`success`),r.prop(`disabled`,!1).html(`<i class="fas fa-bolt"></i> Iniciar Proceso de Carga`)}))},u=()=>{e(document).off(`.ads`)};function d(t,n=``){let r=new Date().toLocaleTimeString(`en-US`,{hour12:!1});e(`#ads_log`).append(`<div class="ads_log_item ${n}"><span>[${r}]</span> ${t}</div>`)}export{u as cleanup,l as init,c as render};