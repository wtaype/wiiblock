import './crear.css';
import { getls, savels, Notificacion, wiSpin } from '../widev.js';
import { db } from '../firebase.js';
import {
  collection, doc, setDoc, getDoc, updateDoc, deleteDoc,
  onSnapshot, query, where, serverTimestamp
} from 'firebase/firestore';

let unsubscribe = null;
let misProyectos = getls('misProyectosLinkwii') || [];
let slugActivo = misProyectos.length > 0 ? misProyectos[0].slug : null;

// Paleta de colores predefinidos
const PALETA = [
  { hex: '#FFFFFF', name: 'auto' },
  { hex: '#FFDA34', name: 'Oro' },
  { hex: '#3cd741', name: 'Success' },
  { hex: '#ffa726', name: 'Warning' },
  { hex: '#00a8e6', name: 'Info' },
  { hex: '#0EBEFF', name: 'Cielo' },
  { hex: '#FF5C69', name: 'Dulce' },
  { hex: '#29C72E', name: 'Paz' },
  { hex: '#7000FF', name: 'Mora' },
  { hex: '#21273B', name: 'Futuro' },
  { hex: '#dddddd', name: 'Offline' }
];

// Ciclo de íconos al hacer clic
const CICLO_ICONOS = [
  '',
  'fas fa-link',
  'fab fa-instagram',
  'fab fa-tiktok',
  'fab fa-youtube',
  'fab fa-whatsapp',
  'fab fa-facebook',
  'fab fa-spotify',
  'fab fa-x-twitter',
  'fab fa-linkedin',
  'fab fa-telegram',
  'fas fa-globe',
  'fas fa-store',
  'fas fa-envelope',
  'fas fa-phone'
];

const autoIcon = (url) => {
  if (!url) return '';
  if (url.includes('instagram.com')) return 'fab fa-instagram';
  if (url.includes('tiktok.com')) return 'fab fa-tiktok';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'fab fa-youtube';
  if (url.includes('whatsapp.com') || url.includes('wa.me')) return 'fab fa-whatsapp';
  if (url.includes('facebook.com') || url.includes('fb.me')) return 'fab fa-facebook';
  if (url.includes('spotify.com')) return 'fab fa-spotify';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'fab fa-x-twitter';
  if (url.includes('linkedin.com')) return 'fab fa-linkedin';
  if (url.includes('t.me') || url.includes('telegram')) return 'fab fa-telegram';
  if (url.includes('pinterest.com')) return 'fab fa-pinterest';
  return 'fas fa-link';
};

export const render = async () => {
  const wi = getls('wiSmile');
  if (!wi) return '<h1>Acceso Denegado</h1>';

  return `
    <div class="cr_layout wi_fadeUp wi_visible">
      
      <!-- ── COL IZQUIERDA: Lista de Proyectos ── -->
      <div class="cr_col_left">
        <div class="cr_left_header">
          <div class="cr_left_title">Mis Linkwiis</div>
          <button class="cr_btn_new" id="btn_nuevo_proy">
            <i class="fas fa-plus"></i> Nuevo
          </button>
        </div>

        <div class="cr_slug_form" id="form_nuevo_proy">
          <div class="cr_slug_prefix">linkwii.com/</div>
          <input type="text" id="inp_slug" class="cr_input" placeholder="mi-slug" autocomplete="off">
          <div class="cr_slug_actions">
            <button class="cr_btn_xs" id="btn_cancel_proy">Cancelar</button>
            <button class="cr_btn_xs prim" id="btn_save_proy">Crear</button>
          </div>
        </div>

        <div class="cr_proy_list" id="lista_proyectos_render">
          <div style="font-size:0.85rem; color:var(--tx3); text-align:center; padding:3vh 0;">
            <i class="fas fa-spinner fa-spin"></i>
          </div>
        </div>
      </div>

      <!-- ── COL CENTRO: Editor ── -->
      <div class="cr_col_center" id="cr_col_center">
        <div style="flex:1; display:flex; align-items:center; justify-content:center; min-height:60vh;">
          <div class="ad_empty">
            <i class="fas fa-magic" style="font-size:3rem; color:var(--brd); display:block; margin-bottom:2vh;"></i>
            Selecciona un proyecto o crea uno nuevo.
          </div>
        </div>
      </div>

      <!-- ── COL DERECHA: Preview Celular ── -->
      <div class="cr_col_right">
        <div style="text-align:center; margin-bottom:2vh;">
          <div style="font-size:0.75rem; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--tx3);">Vista Previa</div>
        </div>
        <div class="cr_phone">
          <div class="cr_phone_notch"></div>
          <div class="cr_phone_content" id="cr_phone_render">
            <div class="ad_empty" style="margin-top:40%; font-size:0.75rem; color:var(--tx3);">
              <i class="fas fa-mobile-alt" style="font-size:2rem; display:block; margin-bottom:1vh; opacity:0.3;"></i>
              En vivo
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
};

const actualizarUIIzquierda = () => {
  const cont = document.getElementById('lista_proyectos_render');
  if (!cont) return;

  if (misProyectos.length === 0) {
    cont.innerHTML = `<div style="font-size:0.85rem; color:var(--tx3); text-align:center; padding:3vh 0;">Sin proyectos aún.</div>`;
    return;
  }

  cont.innerHTML = misProyectos.map(p => `
    <div class="cr_proy_item ${p.slug === slugActivo ? 'activo' : ''}" onclick="window.crSeleccionar('${p.slug}')">
      <div>
        <div class="cr_pt1">/${p.slug}</div>
        <div class="cr_pt2">${p.links?.length || 0} enlaces</div>
      </div>
      <i class="fas fa-chevron-right" style="font-size:0.75rem; color:var(--tx3);"></i>
    </div>
  `).join('');
};

const actualizarUICentro = () => {
  const cen = document.getElementById('cr_col_center');
  if (!cen) return;

  const p = misProyectos.find(x => x.slug === slugActivo);
  if (!p) {
    cen.innerHTML = `
      <div style="flex:1; display:flex; align-items:center; justify-content:center; min-height:60vh;">
        <div class="ad_empty"><i class="fas fa-magic" style="font-size:3rem; color:var(--brd); display:block; margin-bottom:2vh;"></i>Selecciona un proyecto.</div>
      </div>
    `;
    return;
  }

  const colorActual = p.color || '#FFFFFF';
  const swatches = PALETA.map(c => `
    <div class="cr_swatch ${colorActual === c.hex ? 'selected' : ''}"
         style="background:${c.hex};"
         data-color="${c.hex}"
         title="${c.name}"
         onclick="window.crElegirColor(this)"></div>
  `).join('');

  const links = p.links || [];
  const linkCards = links.map((l, i) => {
    return `
      <div class="cr_link_card">
        <div class="cr_link_card_header">
          <div style="display:flex; align-items:center; gap:1vh;">
            <span class="cr_link_num">Enlace ${i + 1}</span>
            <div class="cr_icon_btn" onclick="window.crCicloIcono(${i})" title="Haz clic para cambiar el ícono">
              <i class="${l.icon || autoIcon(l.url) || 'fas fa-link'}" id="icon_prev_${i}"></i>
            </div>
          </div>
          <button class="cr_link_del btn_rm_link" data-index="${i}" title="Eliminar"><i class="fas fa-times"></i></button>
        </div>
        <input type="text" class="cr_input arr_inp_titulo" data-idx="${i}" placeholder="Título" value="${l.titulo}" oninput="window.crPreviewEnlace(this, 'titulo')">
        <input type="url" class="cr_input arr_inp_url" data-idx="${i}" placeholder="https://..." value="${l.url}" oninput="window.crPreviewEnlace(this, 'url')">
      </div>
    `;
  }).join('');

  cen.innerHTML = `
    <!-- BARRA COMPACTA DEL PROYECTO -->
    <div class="cr_proyect_bar">
      <div class="cr_proyect_slug"><span>linkwii.com/</span>${p.slug}</div>
      <div class="cr_bar_actions">
        <button class="cr_action_btn" onclick="window.crCopiar('${p.slug}')"><i class="far fa-copy"></i> Copiar</button>
        <a class="cr_action_btn" href="/${p.slug}" target="_blank"><i class="fas fa-external-link-alt"></i> Ver</a>
        <button class="cr_action_btn danger" id="btn_del_main"><i class="fas fa-trash"></i></button>
      </div>
    </div>

    <!-- APARIENCIA -->
    <div class="cr_section">
      <div class="cr_section_title">
        <span><i class="fas fa-paint-roller" style="margin-right:0.5vh;"></i> Apariencia</span>
        <button class="cr_btn_save" id="btn_update_info" style="font-size:0.75rem; padding:0.6vh 1.8vh;"><i class="fas fa-save"></i> Guardar</button>
      </div>
      <div class="cr_apariencia_grid">
        <div class="cr_field">
          <div class="cr_label">Bio / Descripción</div>
          <textarea id="edit_desc" class="cr_input" rows="4" placeholder="Escribe algo sobre ti..." oninput="window.crPreviewApariencia(this, 'desc')">${p.desc || ''}</textarea>
        </div>
        <div style="display:flex; flex-direction:column; gap:1.5vh;">
          <div class="cr_field">
            <div class="cr_label">URL del Avatar</div>
            <input type="url" id="edit_logo" class="cr_input" placeholder="https://..." value="${p.logo || ''}" oninput="window.crPreviewApariencia(this, 'logo')">
          </div>
          <div class="cr_field">
            <div class="cr_swatches">
              ${swatches}
              <input type="hidden" id="edit_color" value="${colorActual}">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ENLACES EN GRID 2 COLUMNAS -->
    <div class="cr_section">
      <div class="cr_section_title">
        <span><i class="fas fa-link" style="margin-right:0.5vh;"></i> Mis Enlaces</span>
        <div style="display:flex; gap:0.8vh;">
          <button class="cr_action_btn" id="btn_add_link_arr"><i class="fas fa-plus"></i> Añadir</button>
          ${links.length > 0 ? `<button class="cr_btn_save" id="btn_save_links" style="font-size:0.75rem; padding:0.6vh 1.8vh;"><i class="fas fa-save"></i> Guardar</button>` : ''}
        </div>
      </div>
      ${links.length > 0
        ? `<div class="cr_links_grid">${linkCards}</div>`
        : `<div class="ad_empty" style="padding:3vh 0; font-size:0.88rem;">Sin enlaces. Añade uno.</div>`}
    </div>
  `;

  // ── Listeners ──
  document.getElementById('btn_update_info')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    wiSpin(btn, true, 'Guardando');
    try {
      await updateDoc(doc(db, 'linkwiis', p.slug), {
        desc: document.getElementById('edit_desc').value,
        logo: document.getElementById('edit_logo').value,
        color: document.getElementById('edit_color').value,
        actualizado: serverTimestamp()
      });
      Notificacion('Apariencia guardada ✨', 'success');
    } catch { Notificacion('Error al guardar'); }
    wiSpin(btn, false, '<i class="fas fa-save"></i> Guardar');
  });

  document.getElementById('btn_add_link_arr')?.addEventListener('click', async () => {
    const nuevos = [...(p.links || []), { titulo: '', url: '', icon: '' }];
    await updateDoc(doc(db, 'linkwiis', p.slug), { links: nuevos });
  });

  document.querySelectorAll('.btn_rm_link').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      if (!confirm('¿Estás seguro de eliminar este enlace? Esta acción no se puede deshacer.')) return;
      const idx = parseInt(e.currentTarget.dataset.index);
      const nuevos = [...(p.links || [])];
      nuevos.splice(idx, 1);
      try {
        await updateDoc(doc(db, 'linkwiis', p.slug), { links: nuevos });
        Notificacion('Enlace eliminado ✨', 'success');
      } catch { Notificacion('Error al eliminar'); }
    });
  });

  document.getElementById('btn_save_links')?.addEventListener('click', async (e) => {
    const btn = e.currentTarget;
    wiSpin(btn, true, 'Guardando');
    
    // Limpiamos vacíos y dejamos 1 nuevo al final
    const filtrados = p.links.filter(l => l.titulo.trim() || l.url.trim());
    filtrados.push({ titulo: '', url: '', icon: '' });

    try {
      await updateDoc(doc(db, 'linkwiis', p.slug), { links: filtrados, actualizado: serverTimestamp() });
      Notificacion('Enlaces guardados ✨', 'success');
      // Firebase onSnapshot refrescará la UI automáticamente
    } catch { Notificacion('Error al guardar enlaces'); }
    wiSpin(btn, false, '<i class="fas fa-save"></i> Guardar');
  });

  const borrar = async () => {
    if (!confirm(`¿Eliminar definitivamente el proyecto /${p.slug}? Esta acción no se puede deshacer.`)) return;
    try { await deleteDoc(doc(db, 'linkwiis', p.slug)); slugActivo = null; Notificacion('Proyecto eliminado ✨', 'success'); }
    catch { Notificacion('Error al eliminar'); }
  };
  document.getElementById('btn_del_main')?.addEventListener('click', borrar);
};

const BGS_NET = { instagram: 'linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)', tiktok: '#000', youtube: '#ff0000', whatsapp: '#25D366', facebook: '#1877F2', twitter: '#000', linkedin: '#0077b5', telegram: '#0088cc', onlyfans: '#00aff0', pinterest: '#E60023', web: '#00a8e6', link: '#FFDA34' };
const getNet = (u) => (!u) ? 'link' : u.includes('instagram.com') ? 'instagram' : u.includes('tiktok.com') ? 'tiktok' : u.includes('youtube.com')||u.includes('youtu.be') ? 'youtube' : /whatsapp|wa\.me/.test(u) ? 'whatsapp' : u.includes('facebook.com')||u.includes('fb.me') ? 'facebook' : /twitter\.com|x\.com/.test(u) ? 'twitter' : u.includes('linkedin.com') ? 'linkedin' : /t\.me|telegram/.test(u) ? 'telegram' : u.includes('onlyfans.com') ? 'onlyfans' : u.includes('pinterest.com') ? 'pinterest' : /\.(com|net|org|co|info|es|app|io|me)/.test(u) ? 'web' : 'link';

const actualizarUIDerecha = () => {
  const preview = document.getElementById('cr_phone_render');
  if (!preview) return;

  const p = misProyectos.find(x => x.slug === slugActivo);
  if (!p) {
    preview.innerHTML = `<div class="ad_empty" style="margin-top:40%; font-size:0.75rem; color:var(--tx3);"><i class="fas fa-mobile-alt" style="font-size:2rem; display:block; margin-bottom:1vh; opacity:0.3;"></i>En vivo</div>`;
    return;
  }

  const baseColor = p.color || '#FFFFFF';
  const links = p.links || [];

  const btnsHtml = links.filter(l => l.titulo).map(l => {
    const ic = l.icon || autoIcon(l.url);
    let bg = baseColor;
    if (!bg || bg.toLowerCase() === '#ffffff') bg = BGS_NET[getNet(l.url)];
    
    const isGrad = bg && bg.includes('gradient');
    const st = bg ? `background:${bg}; color:#fff; border-color:transparent; box-shadow:0 4px 14px ${isGrad ? 'rgba(0,0,0,0.2)' : bg+'40'};` : '';

    return `
      <div class="cr_phone_btn" style="${st}">
        ${ic ? `<span style="position:absolute; left:14px; font-size:15px;"><i class="${ic}"></i></span>` : ''}
        ${l.titulo}
      </div>
    `;
  }).join('');

  preview.innerHTML = `
    <img src="${p.logo || '/smile.avif'}" class="cr_phone_avatar" alt="">
    <div class="cr_phone_title">@${p.slug}</div>
    <div class="cr_phone_bio">${p.desc || ''}</div>
    <div style="width:100%;">${btnsHtml}</div>
    <div style="margin-top:auto; padding-top:24px; font-size:11px; font-weight:600; color:#aaa; display:flex; align-items:center; gap:4px;">
      <img src="/smile.avif" style="height:14px; border-radius:50%; opacity:0.4;"> Crea tu Linkwii gratis
    </div>
  `;
};

// ── Funciones globales ──────────────────────────────────────────────
window.crCicloIcono = (idx) => {
  const p = misProyectos.find(x => x.slug === slugActivo);
  if (!p) return;
  const l = p.links[idx];
  let cur = l.icon || '';
  let i = CICLO_ICONOS.indexOf(cur);
  if (i === -1) i = 0;
  let nxt = CICLO_ICONOS[(i + 1) % CICLO_ICONOS.length];
  l.icon = nxt;
  
  // Actualizar DOM en vivo sin recargar centro para no perder foco
  const el = document.getElementById(`icon_prev_${idx}`);
  if (el) el.className = nxt || autoIcon(l.url) || 'fas fa-link';
  actualizarUIDerecha();
};

window.crPreviewEnlace = (el, campo) => {
  const idx = parseInt(el.dataset.idx);
  const p = misProyectos.find(x => x.slug === slugActivo);
  if (!p) return;
  
  let val = el.value;
  if (campo === 'url' && val && !val.startsWith('http')) val = 'https://' + val;
  p.links[idx][campo] = val;
  
  if (campo === 'url' && !p.links[idx].icon) {
    const iEl = document.getElementById(`icon_prev_${idx}`);
    if (iEl) iEl.className = autoIcon(val) || 'fas fa-link';
  }
  actualizarUIDerecha();
};

window.crPreviewApariencia = (el, campo) => {
  const p = misProyectos.find(x => x.slug === slugActivo);
  if (!p) return;
  p[campo] = el.value;
  actualizarUIDerecha();
};

window.crSeleccionar = (slug) => {
  slugActivo = slug;
  actualizarUIIzquierda();
  actualizarUICentro();
  actualizarUIDerecha();
};

window.crCopiar = (slug) => {
  navigator.clipboard.writeText(`${window.location.origin}/${slug}`)
    .then(() => Notificacion('Enlace copiado 📋', 'success'));
};

window.crElegirColor = (el) => {
  document.querySelectorAll('.cr_swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  const nuevocolor = el.dataset.color;
  document.getElementById('edit_color').value = nuevocolor;
  
  const p = misProyectos.find(x => x.slug === slugActivo);
  if (p) p.color = nuevocolor;
  
  actualizarUIDerecha();
};

export const init = () => {
  const wi = getls('wiSmile');
  if (!wi) return;

  const btnNuevo = document.getElementById('btn_nuevo_proy');
  const formNuevo = document.getElementById('form_nuevo_proy');
  const inpSlug = document.getElementById('inp_slug');

  btnNuevo?.addEventListener('click', () => {
    formNuevo.style.display = 'block';
    inpSlug.focus();
  });

  document.getElementById('btn_cancel_proy')?.addEventListener('click', () => {
    formNuevo.style.display = 'none';
    inpSlug.value = '';
  });

  document.getElementById('btn_save_proy')?.addEventListener('click', async (e) => {
    let slug = inpSlug.value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!slug) return Notificacion('Ingresa un slug válido');

    const btn = e.currentTarget;
    const og = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    try {
      const docRef = doc(db, 'linkwiis', slug);
      if ((await getDoc(docRef)).exists()) {
        return Notificacion('Ese slug ya está ocupado. Elige otro.');
      }
      await setDoc(docRef, {
        slug, usuario: wi.usuario, email: wi.email,
        estado: true, vistas: 0,
        desc: '¡Bienvenido a mi Linkwii!',
        logo: wi.avatar || '',
        color: '#FFFFFF',
        links: [],
        creado: serverTimestamp(),
        actualizado: serverTimestamp()
      });
      Notificacion('Proyecto creado 🎉','success');
      formNuevo.style.display = 'none';
      inpSlug.value = '';
      window.crSeleccionar(slug);
    } catch (err) {
      console.error(err); Notificacion('Error al crear');
    } finally {
      btn.innerHTML = og;
      btn.disabled = false;
    }
  });

  const q = query(collection(db, 'linkwiis'), where('usuario', '==', wi.usuario));
  
  // Renderizar inmediato con cache si hay
  if (misProyectos.length > 0) {
    actualizarUIIzquierda();
    actualizarUICentro();
    actualizarUIDerecha();
  }

  unsubscribe = onSnapshot(q, (snap) => {
    misProyectos = snap.docs.map(d => ({ slug: d.id, ...d.data() }));
    savels('misProyectosLinkwii', misProyectos);
    
    // Auto-seleccionar el primero si no hay activo
    if (!slugActivo && misProyectos.length > 0) {
      slugActivo = misProyectos[0].slug;
    } else if (slugActivo && !misProyectos.find(x => x.slug === slugActivo)) {
      slugActivo = misProyectos.length > 0 ? misProyectos[0].slug : null;
    }
    
    actualizarUIIzquierda();
    actualizarUICentro();
    actualizarUIDerecha();
  });
};

export const cleanup = () => {
  if (unsubscribe) unsubscribe();
  delete window.crSeleccionar;
  delete window.crCopiar;
  delete window.crElegirColor;
};
