import{n as e}from"./vendor-BBPjS4yS.js";import{d as t,i as n,t as r}from"./widev-8sJg4_cC.js";import{n as i}from"./index-BQVcDkZH.js";import{M as a,O as o,S as s,_ as c,b as l,k as u,x as d}from"./firebase-37FTGmWc.js";import{n as f,t as p}from"./firebase-D1N8l2os.js";var m=`bug`,h=[],g=()=>{let e=t(`wiSmile`)||{};return e.nombre||e.usuario||p.currentUser?.displayName||p.currentUser?.email||`Anónimo`},_=()=>`
    <div class="smw_avisar_view">
      
      <!-- CABECERA: Título y Controles -->
      <header class="smw_avisar_header wi_fadeUp">
        <div class="smw_avisar_title_row">
          <h1><i class="fas fa-bug smw_mora_glow"></i> Centro de Feedback & Issues</h1>
          <p class="smw_avisar_subtitle">Reporta incidencias, propone sugerencias y comparte con el equipo</p>
        </div>
        <div class="smw_avisar_controls">
          <button class="smw_sync_btn" id="btnSyncIssues" title="Sincronizar Incidencias">
            <i class="fas fa-sync-alt"></i> Sincronizar
          </button>
          <a href="/smile" class="smw_back_btn nv_item" data-page="smile">
            <i class="fas fa-arrow-left"></i> Panel de Control
          </a>
        </div>
      </header>

      <!-- CUERPO PRINCIPAL DE DOS COLUMNAS -->
      <div class="smw_avisar_grid wi_fadeUp" style="animation-delay: 0.1s">
        
        <!-- COLUMNA IZQUIERDA: FORMULARIO -->
        <div class="smw_feedback_form_card">
          <div class="smw_fcard_header">
            <h2><i class="fas fa-pen-to-square"></i> Crear Nuevo Reporte</h2>
            <p class="smw_fcard_desc">Identificado como: <strong>${g()}</strong></p>
          </div>
          <form id="frmFeedback" class="smw_form_layout" onsubmit="return false;">
            
            <!-- Título -->
            <div class="smw_form_group">
              <label for="fbTitle">Título del Reporte</label>
              <input type="text" id="fbTitle" class="smw_input" placeholder="Ej. El selector de tours se demora en cargar..." required />
            </div>

            <!-- Categoria -->
            <div class="smw_form_group">
              <label>Categoría</label>
              <div class="smw_category_selector">
                <button type="button" class="smw_cat_tag_btn active" data-cat="bug" style="--c-accent: var(--Dulce)">
                  Bug 🐛
                </button>
                <button type="button" class="smw_cat_tag_btn" data-cat="sugerencia" style="--c-accent: var(--Oro)">
                  Sugerencia 💡
                </button>
                <button type="button" class="smw_cat_tag_btn" data-cat="felicitacion" style="--c-accent: var(--Paz)">
                  Felicitación ✨
                </button>
              </div>
            </div>

            <!-- Descripción -->
            <div class="smw_form_group">
              <label for="fbDesc">Descripción Detallada</label>
              <textarea id="fbDesc" class="smw_textarea" placeholder="Explica detalladamente la incidencia o tu sugerencia para que podamos entenderla fácilmente..." rows="5" required></textarea>
            </div>

            <button type="submit" class="smw_submit_fb_btn" id="btnSubmitFeedback">
              <i class="fas fa-paper-plane"></i> Enviar Incidencia
            </button>

          </form>
        </div>

        <!-- COLUMNA DERECHA: LISTADO DE ISSUES -->
        <div class="smw_issues_feed_card">
          <div class="smw_fcard_header">
            <h2><i class="fas fa-list-check"></i> Reportes del Equipo</h2>
            <span class="smw_badge_count" id="lblIssuesCount">0 reportes</span>
          </div>
          
          <div class="smw_issues_list" id="issuesList">
            ${O(3)}
          </div>
        </div>

      </div>
    </div>
  `,v=async()=>{if(!p.currentUser&&!t(`wiSmile`))return setTimeout(()=>i.navigate(`/login`),100);e(`.wi_fadeUp`).addClass(`visible wi_visible`),await x(),b(),console.log(`🐛 SPA Feedback & Issues cargado exitosamente`),window.__WIREADY__=!0},y=()=>{e(document).off(`.avisar_events`),window.toggleExpandirIssue=null};function b(){e(document).off(`click.avisar_events`,`.smw_cat_tag_btn`).on(`click.avisar_events`,`.smw_cat_tag_btn`,function(){e(`.smw_cat_tag_btn`).removeClass(`active`),e(this).addClass(`active`),m=e(this).data(`cat`)}),e(document).off(`submit.avisar_events`,`#frmFeedback`).on(`submit.avisar_events`,`#frmFeedback`,async function(t){t.preventDefault();let r=e(`#fbTitle`).val().trim(),i=e(`#fbDesc`).val().trim();if(!r||!i)return n(`Completa todos los campos obligatorios.`,`warning`);await C(r,i)}),e(document).off(`click.avisar_events`,`#btnSyncIssues`).on(`click.avisar_events`,`#btnSyncIssues`,async function(){e(this).find(`i`).addClass(`fa-spin`),await x(),e(this).find(`i`).removeClass(`fa-spin`),n(`Feed sincronizado exitosamente`,`success`)}),window.toggleExpandirIssue=t=>{e(`.smw_issue_card[data-id="${t}"]`).toggleClass(`expanded`)}}async function x(){let t=e(`.smw_avisar_header`);t.addClass(`smw_loading`);try{e(`#issuesList`).html(O(3)),h=(await c(d(o(f,`wiFeedbackIssues`),l(`fecha`,`desc`)))).docs.map(e=>({id:e.id,...e.data()})),S()}catch(t){console.error(`Error al cargar reportes:`,t),e(`#issuesList`).html(`
      <div class="smw_empty_pane">
        <i class="fas fa-exclamation-triangle"></i>
        <span>Error al cargar reportes. Revisa tu conexión.</span>
      </div>
    `)}finally{t.removeClass(`smw_loading`)}}function S(){if(e(`#lblIssuesCount`).text(`${h.length} reportes`),!h.length){e(`#issuesList`).html(`
      <div class="smw_empty_pane">
        <i class="fas fa-folder-open"></i>
        <strong>No hay reportes de feedback</strong>
        <p>Sé el primero en reportar un bug o sugerir una mejora.</p>
      </div>
    `);return}let t=h.map(e=>{let t=r(e.autor||`Colaborador`),n=w(e.fecha),i=T(e.estado),a=E(e.categoria);return`
      <div class="smw_issue_card smw_anim_fade" data-id="${e.id}">
        <div class="smw_issue_summary" onclick="toggleExpandirIssue('${e.id}')">
          <div class="smw_issue_title_row">
            <h3 class="smw_issue_title">${D(e.titulo)}</h3>
            <div class="smw_issue_badges">
              <span class="smw_badge_status ${i.cls}">
                <i class="fas ${i.ico}"></i> ${i.txt}
              </span>
              <span class="smw_badge_cat ${a.cls}">
                ${a.txt}
              </span>
            </div>
          </div>
          
          <div class="smw_issue_meta">
            <span><i class="fas fa-user-circle"></i> por <strong>${t}</strong></span>
            <span class="smw_meta_dot"></span>
            <span><i class="fas fa-clock"></i> ${n}</span>
            <i class="fas fa-chevron-down smw_issue_arrow"></i>
          </div>
        </div>

        <div class="smw_issue_details">
          <div class="smw_issue_desc_wrap">
            <p>${D(e.descripcion).replace(/\n/g,`<br>`)}</p>
          </div>
        </div>
      </div>
    `}).join(``);e(`#issuesList`).html(t)}async function C(t,r){let i=e(`#btnSubmitFeedback`);i.prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Enviando...`);let o=`issue_${Date.now()}`,c=g(),l={id:o,titulo:t,descripcion:r,categoria:m,estado:`abierto`,autor:c,fecha:a()};try{await s(u(f,`wiFeedbackIssues`,o),l),e(`#fbTitle`).val(``),e(`#fbDesc`).val(``),n(`Reporte enviado con éxito ✨`,`success`),await x()}catch(e){console.error(`Error al guardar reporte:`,e),n(`Error al enviar el reporte.`,`error`)}finally{i.prop(`disabled`,!1).html(`<i class="fas fa-paper-plane"></i> Enviar Incidencia`)}}function w(e){if(!e)return`Ahora`;let t=null;return e.toDate?t=e.toDate():typeof e==`string`?t=new Date(e):e.seconds&&(t=new Date(e.seconds*1e3)),t&&!isNaN(t.getTime())?`${String(t.getDate()).padStart(2,`0`)}/${String(t.getMonth()+1).padStart(2,`0`)}/${t.getFullYear()} ${String(t.getHours()).padStart(2,`0`)}:${String(t.getMinutes()).padStart(2,`0`)}`:`Ahora`}function T(e){let t={abierto:{cls:`abierto`,txt:`Abierto`,ico:`fa-circle-dot`},en_progreso:{cls:`en_progreso`,txt:`En Progreso`,ico:`fa-gear`},cerrado:{cls:`cerrado`,txt:`Cerrado`,ico:`fa-circle-check`}};return t[e]||t.abierto}function E(e){return{bug:{cls:`bug`,txt:`Bug 🐛`},sugerencia:{cls:`sugerencia`,txt:`Sugerencia 💡`},felicitacion:{cls:`felicitacion`,txt:`Felicitación ✨`}}[e]||{cls:`bug`,txt:`General`}}function D(e){return String(e||``).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`})[e])}function O(e=3){return Array(e).fill(0).map(()=>`
    <div class="smw_issue_card smw_sk_issue">
      <div class="smw_issue_summary" style="pointer-events: none;">
        <div class="smw_issue_title_row">
          <span class="smw_sk_el" style="width: 70%; height: 18px; border-radius: 4px;"></span>
          <div style="display: flex; gap: 8px;">
            <span class="smw_sk_el" style="width: 65px; height: 20px; border-radius: 12px;"></span>
            <span class="smw_sk_el" style="width: 75px; height: 20px; border-radius: 12px;"></span>
          </div>
        </div>
        <div class="smw_issue_meta" style="margin-top: 1.5vh;">
          <span class="smw_sk_el" style="width: 100px; height: 14px; border-radius: 4px;"></span>
          <span class="smw_sk_el" style="width: 80px; height: 14px; border-radius: 4px; margin-left: 2vh;"></span>
        </div>
      </div>
    </div>
  `).join(``)}export{y as cleanup,v as init,_ as render};