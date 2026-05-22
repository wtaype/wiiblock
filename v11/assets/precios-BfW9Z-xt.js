import{n as e}from"./vendor-BBPjS4yS.js";import{d as t,i as n,m as r,p as i,t as a}from"./widev-DijrRLiT.js";import"./index-DzTaEhHV.js";import{M as o,O as s,_ as c,k as l,m as u,p as d,w as f}from"./firebase-37FTGmWc.js";import{n as p}from"./firebase-DOYPslWB.js";var m=[],h={},g={},_=0,v=`.prec`,y=`toursSmile`,b=()=>`
  <div class="prec_wrap">

    <!-- ══ HEADER ══ -->
    <div class="prec_header" id="prec_header">
      <div class="prec_header_inner">
        <div class="prec_header_text">
          <h1 class="prec_title">
            <i class="fas fa-tags"></i>
            Gestión de Precios
          </h1>
          <p class="prec_subtitle">Edita tours, precios, puntos y comisiones del reto</p>
        </div>
        <div class="prec_header_actions">
          <button class="prec_btn_new" id="prec_btn_new">
            <i class="fas fa-plus"></i> Nuevo Tour
          </button>
          <button class="prec_refresh_btn" id="prec_refresh" title="Actualizar lista">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="prec_stats_bar" id="prec_stats">
        <div class="prec_stat_chip prec_stat_total">
          <span class="prec_stat_num" id="prec_stat_total">—</span>
          <span class="prec_stat_label">Total</span>
        </div>
        <div class="prec_stat_chip prec_stat_activos">
          <span class="prec_stat_num" id="prec_stat_activos">—</span>
          <span class="prec_stat_label">Activos</span>
        </div>
        <div class="prec_stat_chip prec_stat_inactivos">
          <span class="prec_stat_num" id="prec_stat_inactivos">—</span>
          <span class="prec_stat_label">Inactivos</span>
        </div>
      </div>
    </div>

    <!-- ══ TABLE CARD ══ -->
    <div class="prec_table_card">
      <div class="prec_table_title_bar">
        <i class="fas fa-table-list"></i>
        <span>Lista de Tours</span>
      </div>
      <div class="prec_table_scroll">
        <table class="prec_table" id="prec_table">
          <thead>
            <tr>
              <th class="prec_th">#</th>
              <th class="prec_th">Tour</th>
              <th class="prec_th">Precio (S/)</th>
              <th class="prec_th">Puntos</th>
              <th class="prec_th">Comisión (%)</th>
              <th class="prec_th">Estado</th>
              <th class="prec_th prec_th_actions">Acciones</th>
            </tr>
          </thead>
          <tbody id="prec_tbody">
            ${x(6)}
          </tbody>
        </table>
      </div>
    </div>

  </div>
`;function x(e){return Array.from({length:e},()=>`
    <tr class="prec_row_skeleton">
      <td><div class="smw_sk_el" style="width:32px;height:22px;border-radius:6px"></div></td>
      <td><div class="smw_sk_el" style="width:120px;height:22px;border-radius:6px"></div></td>
      <td><div class="smw_sk_el" style="width:64px;height:22px;border-radius:6px"></div></td>
      <td><div class="smw_sk_el" style="width:56px;height:22px;border-radius:6px"></div></td>
      <td><div class="smw_sk_el" style="width:56px;height:22px;border-radius:6px"></div></td>
      <td><div class="smw_sk_el" style="width:44px;height:22px;border-radius:999px"></div></td>
      <td><div class="smw_sk_el" style="width:80px;height:30px;border-radius:8px"></div></td>
    </tr>
  `).join(``)}function S(e,t=!1){let n=e.id,r=e.activo!==!1;return`
    <tr class="${t?`prec_row prec_row_new prec_row_dirty`:`prec_row`}" data-id="${n}" data-new="${t?`1`:`0`}">
      <td class="prec_td prec_td_num">
        <input
          class="prec_td_input prec_in_num"
          type="number"
          min="0"
          value="${e.num??``}"
          data-id="${n}"
          data-field="num"
          title="Orden de visualización"
        />
      </td>
      <td class="prec_td prec_td_tour">
        <input
          class="prec_td_input prec_in_tour"
          type="text"
          value="${C(e.tour??``)}"
          data-id="${n}"
          data-field="tour"
          placeholder="Nombre del tour"
        />
      </td>
      <td class="prec_td">
        <div class="prec_price_wrap">
          <span class="prec_currency">S/</span>
          <input
            class="prec_td_input prec_in_price"
            type="number"
            min="0"
            step="0.01"
            value="${e.precio??``}"
            data-id="${n}"
            data-field="precio"
            placeholder="0.00"
          />
        </div>
      </td>
      <td class="prec_td">
        <input
          class="prec_td_input prec_in_pts"
          type="number"
          min="0"
          value="${e.puntos??``}"
          data-id="${n}"
          data-field="puntos"
          placeholder="0"
        />
      </td>
      <td class="prec_td">
        <div class="prec_pct_wrap">
          <input
            class="prec_td_input prec_in_com"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value="${e.comision??``}"
            data-id="${n}"
            data-field="comision"
            placeholder="0"
          />
          <span class="prec_pct_sign">%</span>
        </div>
      </td>
      <td class="prec_td prec_td_toggle">
        <label class="prec_toggle" title="${r?`Activo`:`Inactivo`}">
          <input
            type="checkbox"
            class="prec_toggle_activo"
            data-id="${n}"
            data-field="activo"
            ${r?`checked`:``}
          />
          <span class="prec_toggle_slider"></span>
        </label>
      </td>
      <td class="prec_td prec_td_actions">
        <div class="prec_actions_wrap">
          ${t?`
            <button class="prec_btn_save prec_btn_save_active" data-id="${n}" title="Guardar nuevo tour">
              <i class="fas fa-plus-circle"></i> Crear
            </button>
            <button class="prec_btn_cancel_new" data-id="${n}" title="Cancelar">
              <i class="fas fa-times"></i>
            </button>
          `:`
            <button class="prec_btn_save" data-id="${n}" title="Guardar cambios" disabled>
              <i class="fas fa-save"></i> Guardar
            </button>
            <button class="prec_btn_delete" data-id="${n}" title="Eliminar tour">
              <i class="fas fa-trash"></i>
            </button>
          `}
        </div>
      </td>
    </tr>
  `}function C(e){return String(e).replace(/&/g,`&amp;`).replace(/"/g,`&quot;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}function w(){let t=m.length,n=m.filter(e=>e.activo!==!1).length,r=t-n;e(`#prec_stat_total`).text(t),e(`#prec_stat_activos`).text(n),e(`#prec_stat_inactivos`).text(r)}function T(){if(w(),!m.length){e(`#prec_tbody`).html(`
      <tr>
        <td colspan="7">
          <div class="prec_empty">
            <i class="fas fa-map-marked-alt"></i>
            <p>No hay tours registrados.<br>Haz clic en <strong>+ Nuevo Tour</strong> para agregar uno.</p>
          </div>
        </td>
      </tr>
    `);return}let t=[...m].sort((e,t)=>(e.num??999)-(t.num??999));e(`#prec_tbody`).html(t.map(e=>S(e,!1)).join(``))}function E(t,n,r){h[t]||(h[t]={}),h[t][n]=r;let i=e(`tr[data-id="${t}"]`);i.addClass(`prec_row_dirty`),i.find(`.prec_btn_save[data-id="${t}"]`).prop(`disabled`,!1).addClass(`prec_btn_save_active`)}function D(t){delete h[t];let n=e(`tr[data-id="${t}"]`);n.removeClass(`prec_row_dirty`),n.find(`.prec_btn_save[data-id="${t}"]`).prop(`disabled`,!0).removeClass(`prec_btn_save_active`)}function O(t,n){let r=e(`tr[data-id="${t}"]`),i=n===`ok`?`prec_row_flash_ok`:`prec_row_flash_err`;r.addClass(i),setTimeout(()=>r.removeClass(i),900)}async function k(t){if(g[t])return;let r=h[t];if(!(!r||!Object.keys(r).length)){g[t]=!0,e(`tr[data-id="${t}"] .prec_btn_save`).prop(`disabled`,!0).html(`<i class="fas fa-circle-notch fa-spin"></i>`);try{await f(l(p,`listatours`,t),{...r,updatedAt:o()});let e=m.findIndex(e=>e.id===t);e!==-1&&Object.assign(m[e],r),i(y),D(t),O(t,`ok`),n(`Tour guardado ✅`,`success`)}catch(e){console.error(`[PRECIOS] saveRow error:`,e),O(t,`err`),n(`Error al guardar el tour`,`error`)}finally{g[t]=!1;let n=e(`tr[data-id="${t}"] .prec_btn_save`);h[t]?n.prop(`disabled`,!1).addClass(`prec_btn_save_active`).html(`<i class="fas fa-save"></i> Guardar`):n.prop(`disabled`,!0).removeClass(`prec_btn_save_active`).html(`<i class="fas fa-save"></i> Guardar`)}}}async function A(t){if(g[t])return;let r=h[t]||{},c=r.tour?.trim()||``;if(!c){n(`El nombre del tour es obligatorio`,`warning`),e(`tr[data-id="${t}"] .prec_in_tour`).trigger(`focus`);return}g[t]=!0;let l=e(`tr[data-id="${t}"] .prec_btn_save`);l.prop(`disabled`,!0).html(`<i class="fas fa-circle-notch fa-spin"></i> Creando…`);try{let e={tour:c,num:Number(r.num)||0,precio:Number(r.precio)||0,puntos:Number(r.puntos)||0,comision:Number(r.comision)||0,activo:r.activo!==!1,createdAt:o(),updatedAt:o()},l=await d(s(p,`listatours`),e),u={id:l.id,...e};m.push(u),i(y),delete h[t],delete g[t],T(),setTimeout(()=>O(l.id,`ok`),50),n(`Tour "${a(c)}" creado ✅`,`success`),w()}catch(e){console.error(`[PRECIOS] createTour error:`,e),g[t]=!1,l.prop(`disabled`,!1).html(`<i class="fas fa-plus-circle"></i> Crear`),n(`Error al crear el tour`,`error`)}}async function j(t){let r=m.find(e=>e.id===t),o=r?a(r.tour||`este tour`):`este tour`;if(!window.confirm(`¿Eliminar "${o}" permanentemente?\n\nEsta acción no se puede deshacer.`))return;let s=e(`tr[data-id="${t}"]`);s.css({opacity:.5,pointerEvents:`none`});try{await u(l(p,`listatours`,t)),m=m.filter(e=>e.id!==t),delete h[t],i(y),s.addClass(`prec_row_removing`),setTimeout(()=>{T()},350),n(`Tour "${o}" eliminado`,`warning`)}catch(e){console.error(`[PRECIOS] deleteTour error:`,e),s.css({opacity:``,pointerEvents:``}),n(`Error al eliminar el tour`,`error`)}}function M(){if(e(`.prec_row_new`).length){e(`tr.prec_row_new .prec_in_tour`).first().trigger(`focus`),n(`Ya hay un tour nuevo pendiente de guardar`,`info`);return}_++;let t=`__new_${_}`,r={id:t,num:m.length+1,tour:``,precio:0,puntos:0,comision:0,activo:!0};h[t]={num:r.num,precio:0,puntos:0,comision:0,activo:!0};let i=S(r,!0);e(`#prec_tbody`).prepend(i),e(`tr[data-id="${t}"] .prec_in_tour`).trigger(`focus`)}async function N(i=!1){if(!i){let e=t(y);if(e){m=e,T();return}}e(`#prec_tbody`).html(x(6)),e(`#prec_header`).addClass(`smw_loading`);try{m=(await c(s(p,`listatours`))).docs.map(e=>({id:e.id,...e.data()})),r(y,m,60),T()}catch(t){console.error(`[PRECIOS] loadTours error:`,t),e(`#prec_tbody`).html(`
      <tr>
        <td colspan="7">
          <div class="prec_empty prec_empty_error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Error al cargar los tours. Intenta de nuevo.</p>
          </div>
        </td>
      </tr>
    `),n(`Error al cargar los tours`,`error`)}finally{e(`#prec_header`).removeClass(`smw_loading`)}}var P=async()=>{e(`.prec_wrap`).addClass(`visible`),window.__WIREADY__=!0,m=[],h={},g={},_=0,N(!1),e(document).on(`input${v}`,`.prec_td_input`,function(){let t=e(this).data(`id`),n=e(this).data(`field`),r=e(this).val();[`num`,`precio`,`puntos`,`comision`].includes(n)&&(r=r===``?``:Number(r)),E(t,n,r)}),e(document).on(`change${v}`,`.prec_toggle_activo`,function(){let t=e(this).data(`id`),n=e(this).data(`field`),r=e(this).is(`:checked`),i=e(`tr[data-id="${t}"]`),a=i.data(`new`)===1||i.data(`new`)===`1`;E(t,n,r),a||k(t)}),e(document).on(`click${v}`,`.prec_btn_save`,function(){let t=e(this).data(`id`),n=e(`tr[data-id="${t}"]`);n.data(`new`)===1||n.data(`new`)===`1`?A(t):k(t)}),e(document).on(`click${v}`,`.prec_btn_cancel_new`,function(){let t=e(this).data(`id`);delete h[t],delete g[t],e(`tr[data-id="${t}"]`).remove()}),e(document).on(`click${v}`,`.prec_btn_delete`,function(){j(e(this).data(`id`))}),e(document).on(`click${v}`,`#prec_btn_new`,()=>{M()}),e(document).on(`click${v}`,`#prec_refresh`,async function(){let t=e(this);t.hasClass(`prec_spinning`)||(t.addClass(`prec_spinning`),h={},g={},await N(!0),t.removeClass(`prec_spinning`),n(`Lista actualizada`,`success`))}),e(document).on(`keydown${v}`,`.prec_td_input`,function(t){if(t.key!==`Enter`)return;let n=e(this).data(`id`),r=e(`tr[data-id="${n}"]`);r.data(`new`)===1||r.data(`new`)===`1`?A(n):h[n]&&k(n)}),e(document).on(`keydown${v}`,`.prec_row_new .prec_td_input`,function(t){if(t.key!==`Escape`)return;let n=e(this).data(`id`);delete h[n],delete g[n],e(`tr[data-id="${n}"]`).remove()})},F=()=>{e(document).off(v),m=[],h={},g={}};export{F as cleanup,P as init,b as render};