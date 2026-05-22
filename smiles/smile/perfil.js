import $ from 'jquery';
import './perfil.css';
import { auth, db } from '../firebase.js';
import { updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getls, savels, wicopy, Mensaje, wiTip, Saludar, wiDate } from '../widev.js';
import { rutas } from '../rutas.js';
import { app, version } from '../wii.js';

const wi = () => getls('wiSmile') || {};

export const render = () => {
  const u = wi();
  if (!u.email) { location.replace('/'); return ''; }
  
  const nombre    = u.nombre    || '';
  const apellidos = u.apellidos || '';
  const usuario   = u.usuario   || '';
  const email     = u.email     || '';
  const rol       = u.rol       || 'smile';
  const plan      = u.plan      || 'free';
  const estado    = u.estado    || 'activo';
  const tema      = (u.tema     || 'Por defecto').split('|')[0];
  const uid       = u.uid       || '';
  const avatar    = u.avatar    || '';
  const fechaNacimiento = u.fechaNacimiento || '';
  const pais      = u.pais      || '';
  const genero    = u.genero    || '';
  const gustos    = u.gustos    || '';
  const bio       = u.bio       || '';
  const tsCreacion = u.creacion || u.creado;
  const creado    = tsCreacion ? wiDate(null).get(tsCreacion, 'local') : 'Desconocido';

  const defaultAvatar = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(nombre + ' ' + apellidos) + '&background=random&color=fff';
  const imagen = avatar || defaultAvatar;

  return `
  <div class="prf_wrap">

    <div class="prf_hero">
      <div class="prf_av_wrap">
        <img src="${imagen}" alt="${nombre}" class="prf_av" onerror="this.src='./smile.avif'">
        <div class="prf_av_ring"></div>
      </div>
      <div class="prf_hero_info">
        <h1 class="prf_fullname">${nombre} ${apellidos}</h1>
        <p class="prf_username"><i class="fas fa-at"></i> ${usuario}</p>
        <span class="prf_rol_chip"><i class="fas fa-crown"></i> Plan ${plan.toUpperCase()}</span>
      </div>
    </div>

    <div class="prf_grid">

      <div class="prf_card">
        <h2 class="prf_card_tit"><i class="fas fa-user-edit"></i> Editar perfil</h2>
        
        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label>Nombres</label>
            <input id="prf_nombre" value="${nombre}" placeholder="Tus nombres">
          </div>
          <div class="prf_form_grp">
            <label>Apellidos</label>
            <input id="prf_apellidos" value="${apellidos}" placeholder="Tus apellidos">
          </div>
        </div>
        
        <label>Enlace del Avatar (URL)</label>
        <input id="prf_avatar" value="${avatar}" placeholder="https://tu-foto.com/imagen.jpg">
        
        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label>Fecha de Nacimiento</label>
            <input type="date" id="prf_nacimiento" value="${fechaNacimiento}">
          </div>
          <div class="prf_form_grp">
            <label>Género</label>
            <select id="prf_genero">
              <option value="" disabled ${!genero ? 'selected' : ''}>Selecciona tu género</option>
              <option value="Masculino" ${genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
              <option value="Femenino" ${genero === 'Femenino' ? 'selected' : ''}>Femenino</option>
              <option value="Otro" ${genero === 'Otro' ? 'selected' : ''}>Otro</option>
              <option value="Prefiero no decirlo" ${genero === 'Prefiero no decirlo' ? 'selected' : ''}>Prefiero no decirlo</option>
            </select>
          </div>
        </div>

        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label>País</label>
            <input id="prf_pais" value="${pais}" placeholder="Ej. Perú, México, España...">
          </div>
          <div class="prf_form_grp">
            <label>Gustos o intereses</label>
            <input id="prf_gustos" value="${gustos}" placeholder="Ej. Fútbol, leer, viajar...">
          </div>
        </div>
        
        <label>Biografía</label>
        <textarea id="prf_bio" rows="3" placeholder="Cuéntanos un poco sobre ti...">${bio}</textarea>

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
            <span class="prf_val em">${email}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-crown"></i> Plan</span>
            <span class="prf_val" style="color:var(--mco); text-transform:uppercase;">${plan}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-signal"></i> Estado</span>
            <span class="prf_val" style="color:var(--success)">${estado}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-calendar-alt"></i> Registro</span>
            <span class="prf_val">${creado}</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-user-tag"></i> Rol</span>
            <span class="prf_val" style="text-transform:capitalize;">${rol}</span>
          </div>
        </div>
      </div>

    </div>
  </div>`;
};

export const init = () => {
  if (!wi().email) return rutas.navigate('/');
  
  $(document)
    .on('click.prf', '#prf_guardar', async function () {
      const u = wi();
      const updates = {
        nombre: $('#prf_nombre').val().trim(),
        apellidos: $('#prf_apellidos').val().trim(),
        avatar: $('#prf_avatar').val().trim(),
        fechaNacimiento: $('#prf_nacimiento').val(),
        pais: $('#prf_pais').val().trim(),
        genero: $('#prf_genero').val() || '',
        gustos: $('#prf_gustos').val().trim(),
        bio: $('#prf_bio').val().trim(),
      };

      if (!updates.nombre) return wiTip(document.getElementById('prf_nombre'), 'Ingresa tu nombre', 'error');

      $(this).prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Guardando...');
      try {
        await updateDoc(doc(db, 'smiles', u.usuario), updates);
        savels('wiSmile', { ...u, ...updates }, 24);
        
        $('.prf_fullname').text(`${updates.nombre} ${updates.apellidos}`);
        if(updates.avatar) {
          $('.prf_av').attr('src', updates.avatar);
        } else {
          $('.prf_av').attr('src', 'https://ui-avatars.com/api/?name=' + encodeURIComponent(updates.nombre + ' ' + updates.apellidos) + '&background=random&color=fff');
        }
        
        Mensaje('Perfil actualizado ✅', 'success');
      } catch (e) {
        console.error(e);
        Mensaje('Error al guardar', 'error');
      } finally {
        $(this).prop('disabled', false).html('<i class="fas fa-save"></i> Guardar cambios');
      }
    })
    .on('click.prf', '#prf_guardar_pass', async function () {
      const p1 = $('#prf_pass').val();
      const p2 = $('#prf_pass_conf').val();
      const btn = $(this);
      
      if (!p1 || p1.length < 6) return wiTip(document.getElementById('prf_pass'), 'Mínimo 6 caracteres', 'error');
      if (p1 !== p2) return wiTip(document.getElementById('prf_pass_conf'), 'Las contraseñas no coinciden', 'error');
      
      if (!auth.currentUser) return Mensaje('Sesión expirada. Por favor recarga', 'error');
      
      btn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Actualizando...');
      try {
        await updatePassword(auth.currentUser, p1);
        $('#prf_pass').val('');
        $('#prf_pass_conf').val('');
        Mensaje('Contraseña actualizada correctamente ✅', 'success');
      } catch (e) {
        console.error(e);
        if (e.code === 'auth/requires-recent-login') {
          Mensaje('Por seguridad, cierra sesión y vuelve a ingresar para cambiar la contraseña.', 'error');
        } else {
          Mensaje('Error al actualizar contraseña', 'error');
        }
      } finally {
        btn.prop('disabled', false).html('<i class="fas fa-key"></i> Actualizar contraseña');
      }
    });
};

export const cleanup = () => $(document).off('.prf');
