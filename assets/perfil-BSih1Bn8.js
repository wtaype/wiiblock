import{n as e}from"./vendor-BBPjS4yS.js";import{d as t,m as n,r,v as i,w as a}from"./widev-8sJg4_cC.js";import{n as o}from"./index-BQVcDkZH.js";import{k as s,u as c,w as l}from"./firebase-37FTGmWc.js";import{n as u,t as d}from"./firebase-D1N8l2os.js";var f=()=>t(`wiSmile`)||{},p=()=>{let e=f();if(!e.email)return location.replace(`/`),``;let t=e.nombre||``,n=e.apellidos||``,r=e.usuario||``,a=e.email||``,o=e.rol||`smile`,s=e.plan||`free`,c=e.estado||`activo`;(e.tema||`Por defecto`).split(`|`)[0],e.uid;let l=e.avatar||``,u=e.fechaNacimiento||``,d=e.pais||``,p=e.genero||``,m=e.gustos||``,h=e.bio||``,g=e.creacion||e.creado,_=g?i(null).get(g,`local`):`Desconocido`,v=`https://ui-avatars.com/api/?name=`+encodeURIComponent(t+` `+n)+`&background=random&color=fff`;return`
  <div class="prf_wrap">

    <div class="prf_hero">
      <div class="prf_av_wrap">
        <img src="${l||v}" alt="${t}" class="prf_av" onerror="this.src='./smile.avif'">
        <div class="prf_av_ring"></div>
      </div>
      <div class="prf_hero_info">
        <h1 class="prf_fullname">${t} ${n}</h1>
        <p class="prf_username"><i class="fas fa-at"></i> ${r}</p>
        <span class="prf_rol_chip"><i class="fas fa-crown"></i> Plan ${s.toUpperCase()}</span>
      </div>
    </div>

    <div class="prf_grid">

      <div class="prf_card">
        <h2 class="prf_card_tit"><i class="fas fa-user-edit"></i> Editar perfil</h2>
        
        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label>Nombres</label>
            <input id="prf_nombre" value="${t}" placeholder="Tus nombres">
          </div>
          <div class="prf_form_grp">
            <label>Apellidos</label>
            <input id="prf_apellidos" value="${n}" placeholder="Tus apellidos">
          </div>
        </div>
        
        <label>Enlace del Avatar (URL)</label>
        <input id="prf_avatar" value="${l}" placeholder="https://tu-foto.com/imagen.jpg">
        
        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label>Fecha de Nacimiento</label>
            <input type="date" id="prf_nacimiento" value="${u}">
          </div>
          <div class="prf_form_grp">
            <label>Género</label>
            <select id="prf_genero">
              <option value="" disabled ${p?``:`selected`}>Selecciona tu género</option>
              <option value="Masculino" ${p===`Masculino`?`selected`:``}>Masculino</option>
              <option value="Femenino" ${p===`Femenino`?`selected`:``}>Femenino</option>
              <option value="Otro" ${p===`Otro`?`selected`:``}>Otro</option>
              <option value="Prefiero no decirlo" ${p===`Prefiero no decirlo`?`selected`:``}>Prefiero no decirlo</option>
            </select>
          </div>
        </div>

        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label>País</label>
            <input id="prf_pais" value="${d}" placeholder="Ej. Perú, México, España...">
          </div>
          <div class="prf_form_grp">
            <label>Gustos o intereses</label>
            <input id="prf_gustos" value="${m}" placeholder="Ej. Fútbol, leer, viajar...">
          </div>
        </div>
        
        <label>Biografía</label>
        <textarea id="prf_bio" rows="3" placeholder="Cuéntanos un poco sobre ti...">${h}</textarea>

        <button id="prf_guardar" class="prf_btn"><i class="fas fa-save"></i> Guardar cambios</button>
      </div>

      <div class="prf_col_right">
        <div class="prf_card">
          <h2 class="prf_card_tit"><i class="fas fa-lock"></i> Actualizar contraseña</h2>
          <label>Nueva contraseña</label>
          <input type="password" id="prf_pass" placeholder="Ingresa tu nueva contraseña">
          <label>Confirmar contraseña</label>
          <input type="password" id="prf_pass_conf" placeholder="Confirma tu nueva contraseña">
          <button id="prf_guardar_pass" class="prf_btn"><i class="fas fa-key"></i> Actualizar contraseña</button>
        </div>

        <div class="prf_card">
          <h2 class="prf_card_tit"><i class="fas fa-info-circle"></i> Datos de cuenta</h2>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-envelope"></i> Email</span>
            <span class="prf_val em">${a}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-crown"></i> Plan</span>
            <span class="prf_val" style="color:var(--mco); text-transform:uppercase;">${s}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-signal"></i> Estado</span>
            <span class="prf_val" style="color:var(--success)">${c}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-calendar-alt"></i> Registro</span>
            <span class="prf_val">${_}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-user-tag"></i> Rol</span>
            <span class="prf_val" style="text-transform:capitalize;">${o}</span>
          </div>
        </div>
      </div>

    </div>
  </div>`},m=()=>{if(!f().email)return o.navigate(`/`);e(document).on(`click.prf`,`#prf_guardar`,async function(){let t=f(),i={nombre:e(`#prf_nombre`).val().trim(),apellidos:e(`#prf_apellidos`).val().trim(),avatar:e(`#prf_avatar`).val().trim(),fechaNacimiento:e(`#prf_nacimiento`).val(),pais:e(`#prf_pais`).val().trim(),genero:e(`#prf_genero`).val()||``,gustos:e(`#prf_gustos`).val().trim(),bio:e(`#prf_bio`).val().trim()};if(!i.nombre)return a(document.getElementById(`prf_nombre`),`Ingresa tu nombre`,`error`);e(this).prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Guardando...`);try{await l(s(u,`smiles`,t.usuario),i),n(`wiSmile`,{...t,...i},24),e(`.prf_fullname`).text(`${i.nombre} ${i.apellidos}`),i.avatar?e(`.prf_av`).attr(`src`,i.avatar):e(`.prf_av`).attr(`src`,`https://ui-avatars.com/api/?name=`+encodeURIComponent(i.nombre+` `+i.apellidos)+`&background=random&color=fff`),r(`Perfil actualizado ✅`,`success`)}catch(e){console.error(e),r(`Error al guardar`,`error`)}finally{e(this).prop(`disabled`,!1).html(`<i class="fas fa-save"></i> Guardar cambios`)}}).on(`click.prf`,`#prf_guardar_pass`,async function(){let t=e(`#prf_pass`).val(),n=e(`#prf_pass_conf`).val(),i=e(this);if(!t||t.length<6)return a(document.getElementById(`prf_pass`),`Mínimo 6 caracteres`,`error`);if(t!==n)return a(document.getElementById(`prf_pass_conf`),`Las contraseñas no coinciden`,`error`);if(!d.currentUser)return r(`Sesión expirada. Por favor recarga`,`error`);i.prop(`disabled`,!0).html(`<i class="fas fa-spinner fa-spin"></i> Actualizando...`);try{await c(d.currentUser,t),e(`#prf_pass`).val(``),e(`#prf_pass_conf`).val(``),r(`Contraseña actualizada correctamente ✅`,`success`)}catch(e){console.error(e),e.code===`auth/requires-recent-login`?r(`Por seguridad, cierra sesión y vuelve a ingresar para cambiar la contraseña.`,`error`):r(`Error al actualizar contraseña`,`error`)}finally{i.prop(`disabled`,!1).html(`<i class="fas fa-key"></i> Actualizar contraseña`)}})},h=()=>e(document).off(`.prf`);export{h as cleanup,m as init,p as render};