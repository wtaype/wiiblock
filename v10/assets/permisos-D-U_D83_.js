import{n as e}from"./vendor-BBPjS4yS.js";import{d as t,i as n,s as r}from"./widev-Bh2jKAWA.js";import{O as i,T as a,_ as o,g as s,k as c,w as l,x as u}from"./firebase-37FTGmWc.js";import{n as d}from"./firebase-DOYPslWB.js";var f=()=>t(`wiSmile`),p=[],m=()=>{let e=f();return!e||e.rol!==`admin`?`<div class="adp_page"><div class="adp_empty"><i class="fas fa-ban"></i><p>Acceso denegado.</p></div></div>`:`
  <div class="adp_page">

    <!-- HERO PRO -->
    <div class="adp_hero">
      <div class="adp_hero_left">
        <div class="adp_hero_icon"><i class="fas fa-user-shield"></i></div>
        <div class="adp_hero_txt">
          <div class="adp_badge"><i class="fas fa-key"></i> Autorización</div>
          <h1 class="adp_hero_title">Gestión de Permisos</h1>
          <p class="adp_hero_sub">Promueve usuarios a Gestores, Empresas o revoca sus accesos.</p>
        </div>
      </div>
    </div>

    <!-- BUSCADOR DIRECTO -->
    <div class="adp_finder">
      <div class="adp_finder_txt">
        <h3 class="adp_finder_tit">Buscar Usuario</h3>
        <p class="adp_finder_sub">Ingresa el ID (usuario) exacto para modificar su rol.</p>
      </div>
      <div class="adp_finder_inp_wrap">
        <input type="text" id="adp_inp_search" class="adp_finder_inp" placeholder="Ej. geluksee..." autocomplete="off">
        <button id="adp_btn_search" class="adp_finder_btn"><i class="fas fa-search"></i> Buscar</button>
      </div>
    </div>

    <!-- GRID DE PRIVILEGIADOS -->
    <h2 class="adp_sec_title"><i class="fas fa-star"></i> Cuentas Privilegiadas Actuales</h2>
    <div class="adp_grid" id="adp_grid">
      <div class="adp_empty"><i class="fas fa-spinner fa-spin"></i><p>Buscando cuentas especiales...</p></div>
    </div>

    <!-- MODALES -->
    <div id="adp_modales"></div>

  </div>`},h=async()=>{let r=f();!r||r.rol!==`admin`||(e(document).off(`.adp`),await v(),e(document).on(`click.adp`,`#adp_btn_search`,async function(){let t=e(`#adp_inp_search`).val().trim();if(!t)return;let r=e(this).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i>`);try{let e=await s(c(d,`smiles`,t));e.exists()?b({id:e.id,...e.data()}):n(`Usuario no encontrado`,`warning`)}catch{n(`Error en la búsqueda`,`error`)}r.prop(`disabled`,!1).html(`<i class="fas fa-search"></i> Buscar`)}),e(document).on(`keydown.adp`,`#adp_inp_search`,t=>{t.key===`Enter`&&e(`#adp_btn_search`).click()}),e(document).on(`click.adp`,`.adp_btn_edit`,function(){let t=e(this).data(`id`),n=p.find(e=>e.id===t);n&&b(n)}),e(document).on(`click.adp`,`.adp_role_opt`,function(){e(`.adp_role_opt`).removeClass(`selected`),e(this).addClass(`selected`)}),e(document).on(`click.adp`,`#adp_btn_save_rol`,async function(){let i=e(this).data(`id`),a=e(`.adp_role_opt.selected`).data(`rol`);if(!a||i===r.usuario&&a!==`admin`&&!confirm(`¿Estás seguro de quitarte los permisos de admin a ti mismo? Cerrarás tu propia sesión.`))return;let o=e(this).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Guardando...`);try{if(await l(c(d,`smiles`,i),{rol:a}),n(`Rol actualizado a ${a.toUpperCase()}`,`success`),_(),e(`#adp_inp_search`).val(``),await v(),i===r.usuario&&a!==`admin`){let e=t(`wiSmile`);e.rol=a,localStorage.setItem(`wiSmile`,JSON.stringify(e)),setTimeout(()=>location.reload(),1e3)}}catch{n(`Error al guardar`,`error`),o.prop(`disabled`,!1).html(`Guardar Permisos`)}}),e(document).on(`click.adp`,`.adp_modal_close, .adp_btn_cancel`,_),e(document).on(`click.adp`,`.adp_modal_bg`,t=>{e(t.target).hasClass(`adp_modal_bg`)&&_()}))},g=()=>{e(document).off(`.adp`)};function _(){e(`#adp_modales`).html(``)}async function v(){try{p=(await o(u(i(d,`smiles`),a(`rol`,`in`,[`gestor`,`empresa`,`admin`])))).docs.map(e=>({id:e.id,...e.data()})),y()}catch(t){console.error(`[admin_permisos] Error VIPs:`,t),e(`#adp_grid`).html(`<div class="adp_empty"><i class="fas fa-exclamation-triangle"></i><p>Error cargando cuentas VIP.</p></div>`)}}function y(){if(!p.length){e(`#adp_grid`).html(`<div class="adp_empty"><i class="fas fa-user-shield"></i><p>No hay cuentas privilegiadas asignadas aún.</p></div>`);return}let t={gestor:`#8b5cf6`,empresa:`#f59e0b`,admin:`#020617`},n=p.map(e=>{let n=e.rol||`smile`,i=t[n]||`#38bdf8`,a=e.nombres||e.nombre||e.id,o=e.email||`Sin correo registrado`;return`
      <div class="adp_card" style="--clr:${i}">
        <div class="adp_c_rol">${n}</div>
        <div class="adp_av">${r(a)}</div>
        <div class="adp_nom">${a}</div>
        <div class="adp_eml">${o}</div>
        <button class="adp_btn_edit" data-id="${e.id}"><i class="fas fa-sliders-h"></i> Editar Rol</button>
      </div>`}).join(``);e(`#adp_grid`).html(n)}function b(t){let n=t.nombres||t.nombre||t.id,i=r(n),a=t.rol||`smile`,o=[{id:`smile`,ic:`fa-user`,tit:`Estudiante`,sub:`Acceso estándar. Modo práctica y lecciones.`,c:`#38bdf8`},{id:`gestor`,ic:`fa-chalkboard-teacher`,tit:`Gestor (Profesor)`,sub:`Puede crear clases y ver notas de alumnos.`,c:`#8b5cf6`},{id:`empresa`,ic:`fa-building`,tit:`Empresa`,sub:`Panel corporativo, departamentos y certificados.`,c:`#f59e0b`},{id:`admin`,ic:`fa-crown`,tit:`Admin`,sub:`Control total de la plataforma y usuarios.`,c:`#020617`}].map(e=>`
    <div class="adp_role_opt ${a===e.id?`selected`:``}" data-rol="${e.id}" style="--ac:${e.c}">
      <i class="fas ${e.ic}"></i>
      <b>${e.tit}</b>
      <small>${e.sub}</small>
    </div>
  `).join(``);e(`#adp_modales`).html(`
    <div class="adp_modal_bg">
      <div class="adp_modal_card">
        <div class="adp_modal_hdr">
          <h3 class="adp_modal_title"><i class="fas fa-user-tag"></i> Asignar Permisos</h3>
          <button class="adp_modal_close"><i class="fas fa-times"></i></button>
        </div>
        <div class="adp_modal_body">
          <div class="adp_usr_preview">
            <div class="adp_av" style="width:5vh;height:5vh;margin:0;font-size:2vh">${i}</div>
            <div>
              <div style="font-weight:800;font-size:var(--fz_m1);color:var(--tx)">${n}</div>
              <div style="font-size:var(--fz_s4);color:var(--tx3)">@${t.id}</div>
            </div>
          </div>
          <div style="font-weight:700;color:var(--tx)">Selecciona el nivel de acceso:</div>
          <div class="adp_roles_grid">
            ${o}
          </div>
        </div>
        <div class="adp_modal_foot">
          <button class="adp_btn_cancel">Cancelar</button>
          <button class="adp_btn_save" id="adp_btn_save_rol" data-id="${t.id}">Guardar Permisos</button>
        </div>
      </div>
    </div>`)}export{g as cleanup,h as init,m as render};