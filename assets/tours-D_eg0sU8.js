import{n as e}from"./vendor-BBPjS4yS.js";import{_ as t}from"./widev-8sJg4_cC.js";import{n}from"./index-dirkjPSU.js";import{cargarTours as r}from"./zsmile-Bz5WYaFS.js";var i=[],a=()=>`
  <div class="smw_tours_view">
    
    <!-- CABECERA: Título y Controles -->
    <header class="smw_tours_header wi_fadeUp">
      <div class="smw_tours_title_row">
        <h1><i class="fas fa-route smw_paz_glow"></i> Catálogo & Reglas</h1>
        <p class="smw_tours_subtitle">Información oficial de tours, precios y políticas del reto</p>
      </div>

      <a href="/smile" class="smw_back_btn nv_item" data-page="smile">
        <i class="fas fa-arrow-left"></i> Panel de Control
      </a>
    </header>

    <!-- NAVEGACIÓN DE PESTAÑAS (TABS) -->
    <div class="smw_tours_tabs wi_fadeUp" style="animation-delay: 0.1s">
      <button class="smw_tab_btn active" data-tab="precios">
        <i class="fas fa-tags"></i> Precios de Tours
      </button>
      <button class="smw_tab_btn" data-tab="puntos">
        <i class="fas fa-star"></i> Puntos del Reto
      </button>
      <button class="smw_tab_btn" data-tab="reglas">
        <i class="fas fa-gavel"></i> Reglas y Políticas
      </button>
    </div>

    <!-- CONTENIDOS DE PESTAÑAS -->
    <div class="smw_tours_content_container wi_fadeUp" style="animation-delay: 0.2s">
      
      <!-- PESTAÑA: PRECIOS -->
      <div class="smw_tab_pane active" id="pane-precios">
        <div class="smw_sec_head_tours">
          <h3><i class="fas fa-hand-holding-dollar"></i> Lista de Precios Oficiales</h3>
          <span class="smw_badge_info"><i class="fas fa-info-circle"></i> Comisión base incluida</span>
        </div>
        
        <div class="smw_tours_grid" id="preciosCatalogGrid">
          ${l(4)}
        </div>
      </div>

      <!-- PESTAÑA: PUNTOS -->
      <div class="smw_tab_pane" id="pane-puntos">
        <div class="smw_sec_head_tours">
          <h3><i class="fas fa-award"></i> Asignación de Puntos del Reto</h3>
          <span class="smw_badge_info"><i class="fas fa-fire"></i> ¡Suma más para ganar!</span>
        </div>

        <div class="smw_tours_grid" id="puntosCatalogGrid">
          <!-- Dinámico -->
        </div>
      </div>

      <!-- PESTAÑA: REGLAS -->
      <div class="smw_tab_pane" id="pane-reglas">
        <div class="smw_sec_head_tours">
          <h3><i class="fas fa-shield-halved"></i> Políticas y Reglas del Sistema</h3>
          <span class="smw_badge_info"><i class="fas fa-triangle-exclamation"></i> Lectura obligatoria</span>
        </div>

        <div class="smw_rules_list">
          ${[{title:`Tasa Turística`,desc:`Los precios que se muestran en el catálogo NO incluyen la tasa turística regulada.`,type:`normal`},{title:`Vehículos Propios`,desc:`Buggie/Bodegas y City Tour: Se acumula mayor puntaje con buggies propiedad de Sonia o vehículos autorizados de la empresa.`,type:`normal`},{title:`Reclamos y Quejas`,desc:`⚠️ Reclamos fundados de clientes ANULAN los puntos del tour. Comentario positivo certificado = +10 pts. Comentario negativo = -10 pts.`,type:`alert`},{title:`Anulación de Servicios`,desc:`Cualquier devolución o anulación de tour cancela por completo los puntos y comisiones del mismo.`,type:`normal`},{title:`Registro Oportuno`,desc:`Los tours deben ser registrados en el sistema el MISMO DÍA en que se realiza la venta para validar los puntos.`,type:`alert`},{title:`Fidelización en Redes`,desc:`Etiqueta en Instagram/Tiktok de la marca = +5 pts. Comentario en TripAdvisor o Google Maps = +5 pts (Máximo 10 puntos extra por cliente).`,type:`bonus`}].map((e,t)=>`
            <div class="smw_rule_card ${e.type}">
              <div class="smw_rule_index">${t+1}</div>
              <div class="smw_rule_body">
                <h4>${e.title}</h4>
                <p>${e.desc}</p>
              </div>
            </div>
          `).join(``)}
        </div>
      </div>

    </div>

  </div>
`,o=async()=>{if(!t.user)return setTimeout(()=>n.navigate(`/login`),100);c(),e(document).off(`click.tours_events`,`.smw_tab_btn`).on(`click.tours_events`,`.smw_tab_btn`,function(){let t=e(this).data(`tab`);e(`.smw_tab_btn`).removeClass(`active`),e(this).addClass(`active`),e(`.smw_tab_pane`).removeClass(`active`),e(`#pane-${t}`).addClass(`active`)}),e(`.wi_fadeUp`).addClass(`visible wi_visible`),window.__WIREADY__=!0},s=()=>{e(document).off(`.tours_events`)};async function c(){let t=e(`.smw_tours_header`);t.addClass(`smw_loading`);try{if(e(`#preciosCatalogGrid`).html(l(4)),e(`#puntosCatalogGrid`).html(l(4)),i=await r(),!i.length){e(`#preciosCatalogGrid`).html(`<div class="smw_empty_pane">No hay tours cargados en la base de datos.</div>`),e(`#puntosCatalogGrid`).html(`<div class="smw_empty_pane">No hay tours cargados en la base de datos.</div>`);return}let t=i.map(e=>`
      <div class="smw_tour_cat_card">
        <div class="smw_tcard_badge"><i class="fas fa-route"></i></div>
        <h4 class="smw_tcard_title">${e.tour}</h4>
        <div class="smw_tcard_details">
          <div class="smw_tcard_stat">
            <span class="smw_tcard_stat_lbl">Precio Sugerido</span>
            <strong class="smw_tcard_stat_val" style="color: var(--tx)">S/ ${e.price.toFixed(2)}</strong>
          </div>
          <div class="smw_tcard_stat">
            <span class="smw_tcard_stat_lbl">Comisión Base</span>
            <strong class="smw_tcard_stat_val" style="color: var(--Paz)">S/ ${e.com.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    `).join(``);e(`#preciosCatalogGrid`).html(t);let n=i.map(e=>`
      <div class="smw_tour_cat_card puntos">
        <div class="smw_tcard_badge" >
          <i class="fas fa-star"></i>
        </div>
        <h4 class="smw_tcard_title">${e.tour}</h4>
        <div class="smw_tcard_details">
          <div class="smw_tcard_stat">
            <span class="smw_tcard_stat_lbl">Puntos por pax</span>
            <strong class="smw_tcard_stat_val" >${e.pts} <i class="fas fa-star" style="font-size: 14px"></i></strong>
          </div>
          <div class="smw_tcard_stat">
            <span class="smw_tcard_stat_lbl">Multiplicador pax</span>
            <strong class="smw_tcard_stat_val" style="color: var(--tx)">Activo</strong>
          </div>
        </div>
      </div>
    `).join(``);e(`#puntosCatalogGrid`).html(n)}catch(t){console.error(`Error al cargar catalogo:`,t),e(`#preciosCatalogGrid`).html(`<div class="smw_empty_pane">Error al cargar información de tours.</div>`)}finally{t.removeClass(`smw_loading`)}}function l(e=4){return Array(e).fill(0).map(()=>`
    <div class="smw_tour_cat_card smw_sk_tcard">
      <div class="smw_tcard_badge smw_sk_el" style="width: 4.5vh; height: 4.5vh; border-radius: 1vh; margin: 0 auto 0 0;"></div>
      <div class="smw_sk_el" style="width: 80%; height: 20px; margin: 1.5vh 0; border-radius: 6px;"></div>
      <div class="smw_tcard_details" style="border-top: 1px dashed var(--brd); padding-top: 1.5vh; margin-top: 1vh; width: 100%;">
        <div class="smw_tcard_stat" style="align-items: flex-start; gap: 0.5vh;">
          <span class="smw_sk_el" style="width: 50px; height: 12px; border-radius: 4px;"></span>
          <span class="smw_sk_el" style="width: 65px; height: 18px; border-radius: 4px;"></span>
        </div>
        <div class="smw_tcard_stat" style="align-items: flex-end; gap: 0.5vh;">
          <span class="smw_sk_el" style="width: 50px; height: 12px; border-radius: 4px;"></span>
          <span class="smw_sk_el" style="width: 65px; height: 18px; border-radius: 4px;"></span>
        </div>
      </div>
    </div>
  `).join(``)}export{s as cleanup,o as init,a as render};