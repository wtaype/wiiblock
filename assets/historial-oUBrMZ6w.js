import{n as e}from"./vendor-BBPjS4yS.js";import{_ as t,d as n,i as r,m as i,t as a}from"./widev-mG2tMnX8.js";import{n as o}from"./index-k8WwHtzZ.js";import{O as s,T as c,_ as l,k as u,m as d,x as f}from"./firebase-37FTGmWc.js";import{n as p}from"./firebase-Cknp8_pv.js";import{getMesActual as m,invalidateRankingCaches as h}from"./zsmile-B-dPhVr9.js";var g=[],_=[],v=m(),y=``,b=!1,x=1,S=9,C=``,w=()=>`
    <div class="smw_hist_view">
      
      <!-- CABECERA: Título y Selector de Mes -->
      <header class="smw_hist_header wi_fadeUp">
        <div class="smw_hist_title_row">
          <h1><i class="fas fa-clipboard-list smw_cielo_glow"></i> Historial de Ventas</h1>
          <p class="smw_hist_subtitle">Monitorea y gestiona los registros mensuales</p>
        </div>

        <div class="smw_hist_controls">
          <!-- Selector de Mes con flechas -->
          <div class="smw_month_selector_wrap">
            <button class="smw_month_nav_btn" id="btnHistMesAnt" title="Mes Anterior">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="smw_month_display">
              <i class="fas fa-calendar-alt"></i>
              <span id="txtHistMesSeleccionado">...</span>
            </div>
            <!-- Select oculto para cambio de mes -->
            <select id="selHistorialMes" class="smw_month_hidden_select_header">
              ${F()}
            </select>
            <button class="smw_month_nav_btn" id="btnHistMesSig" title="Mes Siguiente">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </header>

      <!-- BARRA DE FILTROS -->
      <section class="smw_hist_filters_card wi_fadeUp" style="animation-delay: 0.08s">
        <div class="smw_filter_grid">
          
          <!-- Buscador -->
          <div class="smw_filter_field">
            <label><i class="fas fa-search"></i> Buscar Venta</label>
            <input type="text" id="histSearchInput" class="smw_input" placeholder="Nombre cliente o habitación...">
          </div>

          <!-- Filtrar por Vendedor -->
          <div class="smw_filter_field">
            <label><i class="fas fa-user-tie"></i> Vendedor</label>
            <select id="histFilterEmployee" class="smw_select">
              <option value="">Todos los vendedores</option>
            </select>
          </div>

          <!-- Ventas por página -->
          <div class="smw_filter_field">
            <label><i class="fas fa-list-numeric"></i> Por página</label>
            <select id="histLimtSelector" class="smw_select">
              <option value="5">Mostrar 5</option>
              <option value="9" selected>Mostrar 9</option>
              <option value="15">Mostrar 15</option>
              <option value="25">Mostrar 25</option>
            </select>
          </div>

          <!-- Solo hoy -->
          <div class="smw_filter_field smw_toggle_field">
            <label><i class="fas fa-calendar"></i> Fecha</label>
            <button class="smw_btn_toggle" id="btnFilterHoy">
              <i class="fas fa-calendar-day"></i> Solo hoy
            </button>
          </div>

        </div>
      </section>

      <!-- TABLA DE RESULTADOS -->
      <section class="smw_hist_table_card wi_fadeUp" style="animation-delay: 0.18s">

        <!-- Barra de título de tabla estilo referencia -->
        <div class="smw_hist_table_title">
          <div style="display:flex;align-items:center;gap:1.2vh">
            <i class="fas fa-table"></i>
            Registro de Ventas
          </div>
          <span id="smwHistTotal">— registros</span>
        </div>

        <div class="smw_table_responsive">
          <table class="smw_hist_table">
            <thead>
              <tr>
                <th><i class="fas fa-calendar"></i>Fecha</th>
                <th><i class="fas fa-user"></i>Usuario</th>
                <th><i class="fas fa-route"></i>Tipo Tour</th>
                <th><i class="fas fa-users"></i>PAX</th>
                <th><i class="fas fa-user-tag"></i>Nombre</th>
                <th><i class="fas fa-calculator"></i>M. Total</th>
                <th><i class="fas fa-dollar-sign"></i>M. Individual</th>
                <th><i class="fas fa-credit-card"></i>Pagado</th>
                <th><i class="fas fa-hand-holding-usd"></i>Ganancia</th>
                <th><i class="fas fa-user-shield"></i>Vendedor</th>
                <th><i class="fas fa-star"></i>Puntos</th>
                <th><i class="fas fa-cogs"></i>Acciones</th>
              </tr>
            </thead>
            <tbody id="histSalesTableBody">
              ${I(9)}
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div class="smw_pagination_container" id="histPagination"></div>
      </section>

    </div>
  `,T=async()=>{let n=t.user;if(!n)return setTimeout(()=>o.navigate(`/login`),100);x=1,y=``,b=!1,C=``,e(`#selHistorialMes`).val(v),O(),e(`.wi_fadeUp`).addClass(`visible wi_visible`),k(),D(n),window.__WIREADY__=!0},E=()=>{e(document).off(`.historial_events`),window.verDetalleVenta=null,window.editarVentaAccion=null,window.eliminarVentaAccion=null,window.histCambiarPagina=null};function D(t){e(document).off(`change.historial_events`,`#selHistorialMes`).on(`change.historial_events`,`#selHistorialMes`,async function(){v=e(this).val(),O(),x=1,await k()}),e(document).off(`click.historial_events`,`#btnHistMesAnt`).on(`click.historial_events`,`#btnHistMesAnt`,function(){let t=e(`#selHistorialMes`),n=t.prop(`selectedIndex`);n<t.find(`option`).length-1&&t.prop(`selectedIndex`,n+1).trigger(`change`)}),e(document).off(`click.historial_events`,`#btnHistMesSig`).on(`click.historial_events`,`#btnHistMesSig`,function(){let t=e(`#selHistorialMes`),n=t.prop(`selectedIndex`);n>0&&t.prop(`selectedIndex`,n-1).trigger(`change`)}),e(document).off(`change.historial_events`,`#histFilterEmployee`).on(`change.historial_events`,`#histFilterEmployee`,function(){y=e(this).val(),x=1,A()}),e(document).off(`change.historial_events`,`#histLimtSelector`).on(`change.historial_events`,`#histLimtSelector`,function(){S=parseInt(e(this).val()),x=1,A()}),e(document).off(`input.historial_events`,`#histSearchInput`).on(`input.historial_events`,`#histSearchInput`,function(){C=e(this).val().toLowerCase().trim(),x=1,A()}),e(document).off(`click.historial_events`,`#btnFilterHoy`).on(`click.historial_events`,`#btnFilterHoy`,function(){b=!b,e(this).toggleClass(`active`,b),x=1,A()}),window.histCambiarPagina=e=>{x=e,A()},window.verDetalleVenta=e=>{let t=g.find(t=>t.id===e);if(!t)return r(`Venta no encontrada`,`error`);window.editarVenta={venta:t,soloVista:!0},o.navigate(`/registrar`)},window.editarVentaAccion=e=>{let t=g.find(t=>t.id===e);if(!t)return r(`Venta no encontrada`,`error`);window.editarVenta={venta:t,soloVista:!1},o.navigate(`/registrar`)},window.eliminarVentaAccion=async e=>{let t=g.find(t=>t.id===e);if(!t)return r(`Venta no encontrada`,`error`);if(confirm(`¿Eliminar venta de "${t.nombreCliente}"?\n\nEsta acción NO se puede deshacer.`)&&confirm(`⚠️ CONFIRMACIÓN FINAL\n\nSe eliminará:\n• ${t.nombreCliente}\n• ${t.tipoTour}\n• S/ ${t.importeTotal||0}\n\n¿CONFIRMAS?`))try{r(`Eliminando registro...`,`info`),await d(u(p,`registrosdb`,e));let n=t.fechaTour,i=v;if(typeof n==`string`){let[e,t]=n.split(`-`);i=`${e}-${t}`}else if(n?.toDate){let e=n.toDate();i=`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}`}h(t.vendedor,i),r(`Venta eliminada exitosamente`,`success`),await k()}catch(e){console.error(`Error al eliminar:`,e),r(`Error al eliminar el registro.`,`error`)}}}function O(){let t=e(`#selHistorialMes option:selected`).text();e(`#txtHistMesSeleccionado`).text(t||v)}async function k(){let t=e(`.smw_hist_header`);t.addClass(`smw_loading`);try{let t=n(`todosEmpleadosSmile`),r=n(`todasVentasSmile`);if(t&&r){_=t,g=r;let n=_.map(e=>`<option value="${e.usuario}">${e.nombre||e.usuario}</option>`).join(``);e(`#histFilterEmployee`).html(`<option value="">Todos los vendedores</option>${n}`).val(y),A();return}e(`#histSalesTableBody`).html(I(S));let[a,o]=await Promise.all([l(f(s(p,`smiles`),c(`participa`,`==`,`si`))),l(s(p,`registrosdb`))]);_=a.docs.map(e=>({id:e.id,...e.data()})),g=o.docs.map(e=>({id:e.id,...e.data()})),g.sort((e,t)=>{let n=e.fechaTour?.toDate?e.fechaTour.toDate():new Date(e.fechaTour||0);return(t.fechaTour?.toDate?t.fechaTour.toDate():new Date(t.fechaTour||0))-n}),i(`todosEmpleadosSmile`,_,60),i(`todasVentasSmile`,g,5);let u=_.map(e=>`<option value="${e.usuario}">${e.nombre||e.usuario}</option>`).join(``);e(`#histFilterEmployee`).html(`<option value="">Todos los vendedores</option>${u}`).val(y),A()}catch(t){console.error(`Error en cargar todo:`,t),e(`#histSalesTableBody`).html(`<tr><td colspan="12" class="smw_error_cell"><i class="fas fa-exclamation-triangle"></i> Error al cargar datos</td></tr>`)}finally{t.removeClass(`smw_loading`)}}function A(){let[n,r]=v.split(`-`).map(Number),i=new Date,o=`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,`0`)}-${String(i.getDate()).padStart(2,`0`)}`,s=new Set(_.map(e=>e.usuario)),c=g.filter(e=>{if(!s.has(e.vendedor))return!1;let t=e.fechaTour;if(!t)return!1;if(t.toDate){let e=t.toDate();return e.getFullYear()===n&&e.getMonth()+1===r}if(typeof t==`string`){let[e,i]=t.split(`-`).map(Number);return e===n&&i===r}return!1});y&&(c=c.filter(e=>e.vendedor===y)),C&&(c=c.filter(e=>{let t=(e.nombreCliente||``).toLowerCase(),n=(e.numeroHabitacion||``).toLowerCase(),r=(e.tipoTour||``).toLowerCase();return t.includes(C)||n.includes(C)||r.includes(C)})),b&&(c=c.filter(e=>{let t=e.fechaTour;if(!t)return!1;if(typeof t==`string`)return t.split(`T`)[0]===o;if(t.toDate){let e=t.toDate();return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`===o}return!1}));let l=c.length,u=Math.ceil(l/S);x>u&&u>0&&(x=u);let d=(x-1)*S,f=c.slice(d,d+S);e(`#smwHistTotal`).text(`Registro${l===1?``:`s`} = ${l}`);let p=t.user,m=f.map(e=>{let t=e.vendedor===p?.usuario?`
        <button class="smw_hist_btn smw_hbtn_view"   onclick="verDetalleVenta('${e.id}')"   title="Ver Venta"><i class="fas fa-eye"></i></button>
        <button class="smw_hist_btn smw_hbtn_edit"   onclick="editarVentaAccion('${e.id}')" title="Editar"><i class="fas fa-edit"></i></button>
        <button class="smw_hist_btn smw_hbtn_delete" onclick="eliminarVentaAccion('${e.id}')" title="Eliminar"><i class="fas fa-trash-alt"></i></button>
      `:`<button class="smw_hist_btn smw_hbtn_view" onclick="verDetalleVenta('${e.id}')" title="Ver Detalle"><i class="fas fa-eye"></i></button>`,n=N(e.fechaTour),r=_.find(t=>t.usuario===e.vendedor),i=r?.imagen||r?.avatar?r.imagen||r.avatar:`/retodelmes/smile.avif`,o=P(e.estadoPago),s=e.esVentaJulio?`Julio`:e.esVentaSonia?`Sonia`:e.esVentaExterna?`Externo`:a(e.vendedor),c=`
      <div class="smw_cliente_info">
        <span class="smw_cliente_name">${(e.nombreCliente||`Sin nombre`).toUpperCase()}</span>
        ${e.numeroHabitacion?`<span class="smw_room_pill"><i class="fas fa-door-open"></i> ${e.numeroHabitacion}</span>`:``}
      </div>
    `;return`
      <tr class="smw_row_anim">
        <td><span class="smw_date_span">${n}</span></td>
        <td>
          <div class="smw_vendedor_cell">
            <img src="${i}" class="smw_avatar_table" alt="avatar" onerror="this.src='/retodelmes/smile.avif'">
            <span class="smw_vendedor_name">${a(e.vendedor)}</span>
          </div>
        </td>
        <td><span class="smw_tour_pill">${e.tipoTour}</span></td>
        <td><span class="smw_pax_pill"><i class="fas fa-users"></i> ${e.cantidadPax||1}</span></td>
        <td><div class="smw_cliente_cell">${c}</div></td>
        <td><strong class="smw_price_span">S/ ${parseFloat(e.importeTotal||0).toFixed(2)}</strong></td>
        <td><span class="smw_unit_price">S/ ${parseFloat(e.precioUnitario||e.precio||0).toFixed(2)}</span></td>
        <td>
          <span class="smw_status_badge ${o.cls}">
            <span class="smw_status_dot"></span> ${o.txt}
          </span>
        </td>
        <td><span class="smw_profit_span">S/ ${parseFloat(e.ganancia||0).toFixed(2)}</span></td>
        <td><span class="smw_reg_label"><i class="fas fa-user"></i> ${s}</span></td>
        <td>
          <span class="smw_points_box">
            <i class="fas fa-star"></i> ${e.puntos||0}
          </span>
        </td>
        <td><div class="smw_actions_cell">${t}</div></td>
      </tr>
    `}).join(``),h=e(`#histSalesTableBody`);m?h.html(m):h.html(`
      <tr>
        <td colspan="12" class="smw_empty_cell">
          <i class="fas fa-inbox"></i>
          <strong>No se encontraron registros de ventas</strong>
          <p>Prueba ajustando los filtros o seleccionando otro mes.</p>
        </td>
      </tr>
    `),j(u)}function j(t){let n=e(`#histPagination`);if(t<=1){n.html(``);return}let r=`<div class="smw_pagination">`;x>1&&(r+=`<button class="smw_page_btn" onclick="histCambiarPagina(${x-1})"><i class="fas fa-chevron-left"></i></button>`),M(x,t).forEach(e=>{e===`...`?r+=`<span style="padding:0 0.5vh;color:var(--tx3);font-weight:700">…</span>`:r+=`<button class="smw_page_btn ${e===x?`active`:``}" onclick="histCambiarPagina(${e})">${e}</button>`}),x<t&&(r+=`<button class="smw_page_btn" onclick="histCambiarPagina(${x+1})"><i class="fas fa-chevron-right"></i></button>`),r+=`</div>`,n.html(r)}function M(e,t){return t<=7?Array.from({length:t},(e,t)=>t+1):e<=4?[1,2,3,4,5,`...`,t]:e>=t-3?[1,`...`,t-4,t-3,t-2,t-1,t]:[1,`...`,e-1,e,e+1,`...`,t]}function N(e){if(!e)return`Sin fecha`;if(e.toDate){let t=e.toDate();return`${String(t.getDate()).padStart(2,`0`)}/${String(t.getMonth()+1).padStart(2,`0`)}/${t.getFullYear()}`}if(typeof e==`string`){let t=e.split(`T`)[0].split(`-`);return t.length===3?`${t[2]}/${t[1]}/${t[0]}`:e}if(e.seconds){let t=new Date(e.seconds*1e3);return`${String(t.getDate()).padStart(2,`0`)}/${String(t.getMonth()+1).padStart(2,`0`)}/${t.getFullYear()}`}return`Sin fecha`}function P(e){return{pagado:{cls:`paid`,txt:`PAGADO`},cobrado:{cls:`paid`,txt:`PAGADO`},cobrar:{cls:`pending`,txt:`DEUDA`}}[e]||{cls:`pending`,txt:`DEUDA`}}function F(){let t=new Date,n=t.getFullYear(),r=t.getMonth(),i=[`Enero`,`Febrero`,`Marzo`,`Abril`,`Mayo`,`Junio`,`Julio`,`Agosto`,`Septiembre`,`Octubre`,`Noviembre`,`Diciembre`];return e.map(Array(7),(e,t)=>{let a=t-3,o=r+a,s=n+Math.floor(o/12),c=(o%12+12)%12;return`<option value="${`${s}-${String(c+1).padStart(2,`0`)}`}"${a===0?` selected`:``}>${i[c]} ${s}</option>`}).join(``)}function I(e=9){return Array(e).fill(0).map(()=>`
    <tr class="smw_sk_row">
      <td><span class="smw_sk_el" style="width:65px;height:14px"></span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px;justify-content:center">
          <span class="smw_sk_el smw_sk_circle" style="width:28px;height:28px"></span>
          <span class="smw_sk_el" style="width:65px;height:14px"></span>
        </div>
      </td>
      <td><span class="smw_sk_el" style="width:100px;height:24px;border-radius:6px"></span></td>
      <td><span class="smw_sk_el" style="width:40px;height:22px;border-radius:50px"></span></td>
      <td><span class="smw_sk_el" style="width:85px;height:14px"></span></td>
      <td><span class="smw_sk_el" style="width:60px;height:16px"></span></td>
      <td><span class="smw_sk_el" style="width:55px;height:14px"></span></td>
      <td><span class="smw_sk_el" style="width:72px;height:22px;border-radius:50px"></span></td>
      <td><span class="smw_sk_el" style="width:55px;height:14px"></span></td>
      <td><span class="smw_sk_el" style="width:60px;height:14px"></span></td>
      <td><span class="smw_sk_el" style="width:52px;height:22px;border-radius:50px"></span></td>
      <td>
        <div style="display:flex;gap:6px;justify-content:center">
          <span class="smw_sk_el smw_sk_circle" style="width:26px;height:26px"></span>
        </div>
      </td>
    </tr>
  `).join(``)}export{E as cleanup,T as init,w as render};