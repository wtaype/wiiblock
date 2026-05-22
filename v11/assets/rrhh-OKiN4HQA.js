import{n as e}from"./vendor-BBPjS4yS.js";import{d as t,i as n,m as r,n as i,p as a,t as o}from"./widev-DijrRLiT.js";import"./index-DzTaEhHV.js";import{M as s,O as c,_ as l,k as u,w as d}from"./firebase-37FTGmWc.js";import{n as f}from"./firebase-DOYPslWB.js";var p=[],m=`todos`,h=``,g=null,_=!1,v=`rrhhUsuarios`,y=30,b=e=>((e.nombre||``)+` `+(e.apellidos||``)||e.usuario||`?`).trim().split(/\s+/).slice(0,2).map(e=>(e[0]||``).toUpperCase()).join(``),x=(e,t=40)=>{if(e.imagen)return`<div class="rrhh_avatar" style="width:${t}px;height:${t}px"><img src="${e.imagen}" alt="${o(e.nombre||e.usuario||`?`)}" loading="lazy"/></div>`;let n=b(e);return`<div class="rrhh_avatar rrhh_avatar_initials" data-rol="${e.rol||`smile`}" style="width:${t}px;height:${t}px;font-size:${Math.round(t*.36)}px">${n}</div>`},S=e=>{let t=(e||`smile`).toLowerCase();return`<span class="rrhh_rol_badge rrhh_rol_${t}">${o(t)}</span>`},C=(e,t)=>{let n=t===`activo`;return`
    <label class="rrhh_toggle" title="${n?`Activo`:`Inactivo`}">
      <input type="checkbox" class="rrhh_toggle_estado_input" data-id="${e}" ${n?`checked`:``} />
      <span class="rrhh_toggle_slider" style="--c: #29C72E"></span>
    </label>
  `},w=(e,t)=>`
    <label class="rrhh_toggle" title="${t===`si`?`Participando`:`No participa`}">
      <input type="checkbox" class="rrhh_toggle_participa" data-id="${e}" ${t===`si`?`checked`:``} />
      <span class="rrhh_toggle_slider"></span>
    </label>
  `,T=()=>{let e=h.toLowerCase().trim(),n=t(`wiSmile`)?.rol||`smile`;return p.filter(t=>!(n===`gestor`&&t.rol===`admin`||m===`activos`&&t.participa!==`si`||m===`pendientes`&&t.estado!==`pendiente`||m===`inactivos`&&t.participa!==`no`&&t.estado!==`inactivo`||e&&![t.nombre,t.apellidos,t.usuario,t.email].join(` `).toLowerCase().includes(e)))},E=()=>`
  <div class="rrhh_wrap">

    <!-- ══ HEADER CARD ══ -->
    <div class="rrhh_header_card" id="rrhh_header_card">
      <div class="rrhh_header_card_stripe"></div>
      <div class="rrhh_header_inner">
        <div class="rrhh_header_text">
          <h1 class="rrhh_title">
            <i class="fas fa-users-gear"></i>
            Gestión de Colaboradores
          </h1>
          <p class="rrhh_subtitle">Administra el equipo, roles, estado y participación en el reto</p>
        </div>
        <div class="rrhh_header_actions">
          <button class="rrhh_refresh_btn" id="rrhh_refresh" title="Actualizar lista">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- ══ STATS BAR ══ -->
    <div class="rrhh_stats_bar" id="rrhh_stats">
      <div class="rrhh_stat_chip rrhh_stat_total">
        <span class="rrhh_stat_num" id="stat_total">—</span>
        <span class="rrhh_stat_label">Total</span>
      </div>
      <div class="rrhh_stat_chip rrhh_stat_activos">
        <span class="rrhh_stat_num" id="stat_activos">—</span>
        <span class="rrhh_stat_label">Activos</span>
      </div>
      <div class="rrhh_stat_chip rrhh_stat_pendientes">
        <span class="rrhh_stat_num" id="stat_pendientes">—</span>
        <span class="rrhh_stat_label">Pendientes</span>
      </div>
      <div class="rrhh_stat_chip rrhh_stat_inactivos">
        <span class="rrhh_stat_num" id="stat_inactivos">—</span>
        <span class="rrhh_stat_label">Inactivos</span>
      </div>
    </div>

    <!-- ══ SEARCH BAR ══ -->
    <div class="rrhh_search_bar">
      <i class="fas fa-search rrhh_search_icon"></i>
      <input
        type="text"
        id="rrhh_search"
        class="rrhh_search_input"
        placeholder="Buscar por nombre, usuario o email…"
        autocomplete="off"
      />
    </div>

    <!-- ══ FILTER TABS ══ -->
    <div class="rrhh_tabs" id="rrhh_tabs">
      <button class="rrhh_tab active" data-tab="todos">
        <i class="fas fa-list"></i> Todos
      </button>
      <button class="rrhh_tab" data-tab="activos">
        <i class="fas fa-circle-check"></i> Activos
      </button>
      <button class="rrhh_tab" data-tab="pendientes">
        <i class="fas fa-clock"></i> Pendientes
      </button>
      <button class="rrhh_tab" data-tab="inactivos">
        <i class="fas fa-circle-xmark"></i> Inactivos
      </button>
    </div>

    <!-- ══ TABLE ══ -->
    <table class="rrhh_table" id="rrhhTable">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Participa</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="rrhh_tbody">
        <tr>
          <td colspan="8" class="rrhh_loading_cell">
            <div class="rrhh_spinner"><i class="fas fa-circle-notch fa-spin"></i> Cargando colaboradores…</div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>

  <!-- ══ SIDE PANEL OVERLAY ══ -->
  <div class="rrhh_overlay" id="rrhh_overlay"></div>

  <!-- ══ SIDE PANEL ══ -->
  <aside class="rrhh_panel" id="rrhh_panel" aria-hidden="true">
    <div class="rrhh_panel_header">
      <div class="rrhh_panel_avatar_wrap" id="rrhh_panel_avatar"></div>
      <div class="rrhh_panel_title_wrap">
        <h2 class="rrhh_panel_name" id="rrhh_panel_name">Colaborador</h2>
        <span class="rrhh_panel_user" id="rrhh_panel_user">@usuario</span>
      </div>
      <button class="rrhh_panel_close" id="rrhh_panel_close" aria-label="Cerrar panel">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="rrhh_panel_body">
      <form id="rrhh_edit_form" autocomplete="off">
        <input type="hidden" id="edit_uid" />

        <!-- Personal -->
        <div class="rrhh_form_section">
          <div class="rrhh_form_section_title"><i class="fas fa-id-card"></i> Datos Personales</div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_nombre">Nombre</label>
            <input class="rrhh_form_input" id="edit_nombre" type="text" placeholder="Nombre" />
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_apellidos">Apellidos</label>
            <input class="rrhh_form_input" id="edit_apellidos" type="text" placeholder="Apellidos" />
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_usuario">Usuario</label>
            <input class="rrhh_form_input rrhh_input_locked" id="edit_usuario" type="text" disabled />
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_email">Email</label>
            <input class="rrhh_form_input rrhh_input_locked" id="edit_email" type="email" disabled />
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_descripcion">Descripción</label>
            <textarea class="rrhh_form_input rrhh_form_textarea" id="edit_descripcion" placeholder="Bio o descripción…" rows="2"></textarea>
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_imagen">Imagen (URL)</label>
            <input class="rrhh_form_input" id="edit_imagen" type="url" placeholder="https://…" />
          </div>
        </div>

        <!-- Laboral -->
        <div class="rrhh_form_section">
          <div class="rrhh_form_section_title"><i class="fas fa-briefcase"></i> Datos Laborales</div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_rol">Rol</label>
            <select class="rrhh_form_select" id="edit_rol">
              <option value="smile">Smile</option>
              <option value="gestor">Gestor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_estado">Estado</label>
            <select class="rrhh_form_select" id="edit_estado">
              <option value="activo">Activo</option>
              <option value="pendiente">Pendiente</option>
              <option value="suspendido">Suspendido</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <div class="rrhh_form_row rrhh_form_row_inline">
            <label class="rrhh_form_label">Participa en el reto</label>
            <label class="rrhh_toggle" id="edit_participa_toggle">
              <input type="checkbox" id="edit_participa" />
              <span class="rrhh_toggle_slider"></span>
            </label>
          </div>
        </div>

        <!-- Banca -->
        <div class="rrhh_form_section">
          <div class="rrhh_form_section_title"><i class="fas fa-building-columns"></i> Datos Bancarios</div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_banco">Banco / Método</label>
            <select class="rrhh_form_select" id="edit_banco">
              <option value="">— Seleccionar —</option>
              <option value="BCP">BCP</option>
              <option value="BBVA">BBVA</option>
              <option value="Interbank">Interbank</option>
              <option value="Yape">Yape</option>
              <option value="Plin">Plin</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_numeroCuenta">Número de Cuenta</label>
            <input class="rrhh_form_input" id="edit_numeroCuenta" type="text" placeholder="N.º cuenta o celular" />
          </div>
          <div class="rrhh_form_row">
            <label class="rrhh_form_label" for="edit_titularCuenta">Titular</label>
            <input class="rrhh_form_input" id="edit_titularCuenta" type="text" placeholder="Nombre del titular" />
          </div>
        </div>

        <div class="rrhh_panel_footer">
          <button type="submit" class="rrhh_btn_save" id="rrhh_btn_save">
            <i class="fas fa-save"></i>
            <span>Guardar cambios</span>
          </button>
        </div>
      </form>
    </div>
  </aside>
`,D=()=>{let t=p.length,n=p.filter(e=>e.participa===`si`).length,r=p.filter(e=>e.estado===`pendiente`).length,i=p.filter(e=>e.participa!==`si`).length;e(`#stat_total`).text(t),e(`#stat_activos`).text(n),e(`#stat_pendientes`).text(r),e(`#stat_inactivos`).text(i)},O=()=>{D();let t=T();if(t.sort((e,t)=>{let n=e.participa===`si`?0:1,r=t.participa===`si`?0:1;return n===r?(e.nombre||e.usuario||``).localeCompare(t.nombre||t.usuario||``,`es`):n-r}),!t.length){let t=h.toLowerCase().trim();e(`#rrhh_tbody`).html(`
      <tr>
        <td colspan="8">
          <div class="rrhh_empty">
            <i class="fas fa-user-slash"></i>
            <p>${t?`Sin resultados para "<strong>${t}</strong>"`:`No hay colaboradores en esta categoría`}</p>
          </div>
        </td>
      </tr>
    `);return}let n=t.map(e=>{let t=e.estado===`pendiente`;return`
      <tr data-id="${e.id}" class="${e.participa===`si`?``:`rrhh_row_inactive`}">
        <td>${x(e,40)}</td>
        <td class="rrhh_nombre">${i((e.nombre||``)+` `+(e.apellidos||``)).trim()||`—`}</td>
        <td class="rrhh_usuario">@${e.usuario||`—`}</td>
        <td class="rrhh_email">${e.email||`—`}</td>
        <td>${S(e.rol)}</td>
        <td>${w(e.id,e.participa)}</td>
        <td>${C(e.id,e.estado)}</td>
        <td class="rrhh_actions_cell">
          <button class="rrhh_btn_editar" data-id="${e.id}" title="Editar colaborador">
            <i class="fas fa-pen-to-square"></i> Editar
          </button>
          ${t?`
            <button class="rrhh_btn_approve" data-id="${e.id}" title="Aprobar solicitud">
              <i class="fas fa-check"></i>
            </button>
            <button class="rrhh_btn_reject" data-id="${e.id}" title="Rechazar solicitud">
              <i class="fas fa-times"></i>
            </button>
          `:``}
        </td>
      </tr>
    `}).join(``);e(`#rrhh_tbody`).html(n)},k=n=>{let r=p.find(e=>e.id===n);if(!r)return;g=n;let a=i((r.nombre||``)+` `+(r.apellidos||``)).trim()||r.usuario||`—`;e(`#rrhh_panel_avatar`).html(x(r,52)),e(`#rrhh_panel_name`).text(a),e(`#rrhh_panel_user`).text(`@`+(r.usuario||`—`)),e(`#edit_uid`).val(n),e(`#edit_nombre`).val(r.nombre||``),e(`#edit_apellidos`).val(r.apellidos||``),e(`#edit_usuario`).val(r.usuario||``),e(`#edit_email`).val(r.email||``),e(`#edit_descripcion`).val(r.descripcion||``),e(`#edit_imagen`).val(r.imagen||``),e(`#edit_rol`).val(r.rol||`smile`),e(`#edit_estado`).val(r.estado||`activo`),e(`#edit_participa`).prop(`checked`,r.participa===`si`),e(`#edit_banco`).val(r.banco||``),e(`#edit_numeroCuenta`).val(r.numeroCuenta||``),e(`#edit_titularCuenta`).val(r.titularCuenta||``),(t(`wiSmile`)?.rol||`smile`)===`gestor`?e(`#edit_rol option[value="admin"]`).hide():e(`#edit_rol option[value="admin"]`).show(),e(`#rrhh_panel`).addClass(`open`).attr(`aria-hidden`,`false`),e(`#rrhh_overlay`).addClass(`visible`),e(`body`).addClass(`rrhh_no_scroll`)},A=()=>{g=null,e(`#rrhh_panel`).removeClass(`open`).attr(`aria-hidden`,`true`),e(`#rrhh_overlay`).removeClass(`visible`),e(`body`).removeClass(`rrhh_no_scroll`)},j=async e=>{let t=p.findIndex(t=>t.id===e);if(t===-1)return;let i=p[t].participa===`si`?`no`:`si`,s=o(p[t].nombre||p[t].usuario||e);try{await d(u(f,`smiles`,e),{participa:i}),p[t].participa=i,a(v),r(v,p,y),O(),n(`${s} ahora ${i===`si`?`participa ✅`:`no participa ❌`}`,i===`si`?`success`:`warning`)}catch(e){console.error(`[RRHH] toggleParticipa:`,e),n(`Error al actualizar participación`,`error`),O()}},M=async e=>{let t=p.findIndex(t=>t.id===e);if(t===-1)return;let i=p[t].estado===`activo`?`inactivo`:`activo`,s=o(p[t].nombre||p[t].usuario||e);try{await d(u(f,`smiles`,e),{estado:i}),p[t].estado=i,a(v),r(v,p,y),O(),n(`${s} ahora está ${i===`activo`?`Activo ✅`:`Inactivo ❌`}`,i===`activo`?`success`:`warning`)}catch(e){console.error(`[RRHH] toggleEstado:`,e),n(`Error al actualizar estado`,`error`),O()}},N=async()=>{if(_||!g)return;_=!0;let t=e(`#rrhh_btn_save`);t.addClass(`loading`).prop(`disabled`,!0),e(`#rrhh_header_card`).addClass(`smw_loading`);let i={nombre:e(`#edit_nombre`).val().trim(),apellidos:e(`#edit_apellidos`).val().trim(),usuario:e(`#edit_usuario`).val().trim(),email:e(`#edit_email`).val().trim(),descripcion:e(`#edit_descripcion`).val().trim(),imagen:e(`#edit_imagen`).val().trim(),rol:e(`#edit_rol`).val(),estado:e(`#edit_estado`).val(),participa:e(`#edit_participa`).is(`:checked`)?`si`:`no`,banco:e(`#edit_banco`).val(),numeroCuenta:e(`#edit_numeroCuenta`).val().trim(),titularCuenta:e(`#edit_titularCuenta`).val().trim(),updatedAt:s()};Object.keys(i).forEach(e=>{i[e]===``&&delete i[e]});try{await d(u(f,`smiles`,g),i);let e=p.findIndex(e=>e.id===g);e!==-1&&Object.assign(p[e],i),a(v),r(v,p,y),O(),A(),n(`Colaborador actualizado ✅`,`success`)}catch(e){console.error(`[RRHH] saveEdit:`,e),n(`Error al guardar cambios`,`error`)}finally{_=!1,t.removeClass(`loading`).prop(`disabled`,!1),e(`#rrhh_header_card`).removeClass(`smw_loading`)}},P=async e=>{let t=p.findIndex(t=>t.id===e);if(t===-1)return;let i=o(p[t].nombre||p[t].usuario||e);try{await d(u(f,`smiles`,e),{estado:`activo`,participa:`si`}),p[t].estado=`activo`,p[t].participa=`si`,a(v),r(v,p,y),O(),n(`${i} aprobado como colaborador ✅`,`success`)}catch(e){console.error(`[RRHH] aprobar:`,e),n(`Error al aprobar solicitud`,`error`)}},F=async e=>{let t=p.findIndex(t=>t.id===e);if(t===-1)return;let i=o(p[t].nombre||p[t].usuario||e);try{await d(u(f,`smiles`,e),{estado:`inactivo`,participa:`no`}),p[t].estado=`inactivo`,p[t].participa=`no`,a(v),r(v,p,y),O(),n(`Solicitud de ${i} rechazada`,`warning`)}catch(e){console.error(`[RRHH] rechazar:`,e),n(`Error al rechazar solicitud`,`error`)}},I=async(i=!1)=>{if(!i){let e=t(v);if(e){p=e,O();return}}e(`#rrhh_tbody`).html(`
    <tr>
      <td colspan="8" class="rrhh_loading_cell">
        <div class="rrhh_spinner"><i class="fas fa-circle-notch fa-spin"></i> Cargando colaboradores…</div>
      </td>
    </tr>
  `);try{p=(await l(c(f,`smiles`))).docs.map(e=>({id:e.id,...e.data()})),p.sort((e,t)=>{let n=e.participa===`si`?0:1,r=t.participa===`si`?0:1;return n===r?(e.nombre||e.usuario||``).localeCompare(t.nombre||t.usuario||``,`es`):n-r}),r(v,p,y),O()}catch(t){console.error(`[RRHH] loadUsuarios:`,t),e(`#rrhh_tbody`).html(`
      <tr>
        <td colspan="8">
          <div class="rrhh_empty rrhh_empty_error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Error al cargar colaboradores. Intenta de nuevo.</p>
          </div>
        </td>
      </tr>
    `),n(`Error al cargar colaboradores`,`error`)}},L=async()=>{e(`.rrhh_wrap`).addClass(`visible`),window.__WIREADY__=!0,I(!1),e(document).on(`input.rrhh`,`#rrhh_search`,function(){h=e(this).val(),O()}),e(document).on(`click.rrhh`,`.rrhh_tab`,function(){m=e(this).data(`tab`),e(`.rrhh_tab`).removeClass(`active`),e(this).addClass(`active`),O()}),e(document).on(`click.rrhh`,`#rrhh_refresh`,async function(){let t=e(this);t.addClass(`rrhh_spinning`),h=``,m=`todos`,e(`#rrhh_search`).val(``),e(`.rrhh_tab`).removeClass(`active`),e(`.rrhh_tab[data-tab="todos"]`).addClass(`active`),await I(!0),t.removeClass(`rrhh_spinning`),n(`Lista actualizada`,`success`)}),e(document).on(`change.rrhh`,`.rrhh_toggle_participa`,function(){j(e(this).data(`id`))}),e(document).on(`change.rrhh`,`.rrhh_toggle_estado_input`,function(){M(e(this).data(`id`))}),e(document).on(`click.rrhh`,`.rrhh_btn_editar`,function(t){t.stopPropagation(),k(e(this).data(`id`))}),e(document).on(`click.rrhh`,`#rrhh_panel_close`,A),e(document).on(`click.rrhh`,`#rrhh_overlay`,A),e(document).on(`keydown.rrhh`,function(e){e.key===`Escape`&&(A(),_closeModal())}),e(document).on(`submit.rrhh`,`#rrhh_edit_form`,function(e){e.preventDefault(),N()}),e(document).on(`click.rrhh`,`.rrhh_btn_approve`,function(t){t.stopPropagation(),P(e(this).data(`id`))}),e(document).on(`click.rrhh`,`.rrhh_btn_reject`,function(t){t.stopPropagation(),F(e(this).data(`id`))})},R=()=>{e(document).off(`.rrhh`),e(`body`).removeClass(`rrhh_no_scroll`),p=[],m=`todos`,h=``,g=null,_=!1};export{R as cleanup,L as init,E as render};