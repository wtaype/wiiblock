import './nuevo.css';
import $ from 'jquery';
import { db } from '../../firebase.js';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { COL, getPost, clearPostCache, clearBlogCache, wiSanihtml } from './devblog.js';
import { wiAuth, wiSpin, Notificacion, Mensaje, wiPath, wiTip, getls } from '../../widev.js';
import { linkweb } from '../../wii.js';

import { collection, query, getDocs, limit, orderBy } from 'firebase/firestore';
const toSlug = s => s.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
  .replace(/\b(el|la|los|las|de|del|en|un|una|y|a|con|por|para|que|es|se)\b/g,' ')
  .replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,'_').replace(/_{2,}/g,'_').replace(/^_|_$/g,'').slice(0,50);
const countWords = html => { const t=html.replace(/<[^>]*>/g,' ').split(/\s+/).filter(Boolean); return { words:t.length, min:Math.max(1,Math.ceil(t.length/200)) }; };

// ── Detectar modo edición ─────────────────────────────────────
const getEditSlug = () => wiPath.params()?.edit || new URLSearchParams(location.search).get('edit') || null;

export const render = () => {
  const u = wiAuth.user?.usuario ? wiAuth.user : (getls('wiSmile') || {});
  if (!u.email) return `<div class="nu_err dpvc"><i class="fas fa-lock"></i><h2>Acceso restringido</h2><p>Inicia sesión para crear historias</p></div>`;
  const editSlug = getEditSlug();
  return `
  <div class="nu_wrap">
    <div class="nu_head">
      <div class="nu_head_left"><h1><i class="fas fa-${editSlug?'pen':'pen-fancy'}"></i> ${editSlug?'Editar historia':'Nueva historia'}</h1><p>${editSlug?`Editando: <strong>${editSlug}</strong> ✏️`:''}</p></div>
      <div class="nu_head_right">
        ${editSlug?`<a href="/${editSlug}" class="nu_btn_outline" ${wiTip('Ver post')}><i class="fas fa-eye"></i> Ver</a>`:`<button type="button" id="nu_preview_pg" class="nu_btn_outline" ${wiTip('Preview')}><i class="fas fa-eye"></i> Preview</button>`}
        <button type="submit" form="nu_form" id="nu_submit" class="nu_btn_submit"><i class="fas fa-${editSlug?'save':'paper-plane'}"></i> ${editSlug?'Guardar':'Publicar'}</button>
      </div>
    </div>
    <form id="nu_form" autocomplete="off"><div class="nu_layout">
      <div class="nu_left">
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-heading"></i> Título</div>
          <input id="nu_titulo" type="text" class="nu_titulo_inp" placeholder="Historias que inspiren y con mucho valor" maxlength="100" required/>
          <div class="nu_slug_box">
            <span class="nu_slug_label"><i class="fas fa-link"></i> ${linkweb}</span>
            <input id="nu_slug_inp" type="text" placeholder="mi_historia" maxlength="50" spellcheck="false" ${editSlug?'readonly':''}/>
            ${editSlug?'':`<button type="button" id="nu_slug_reset" class="nu_slug_btn" ${wiTip('Regenerar')}><i class="fas fa-rotate"></i></button>`}
          </div>
          <div id="nu_slug_status" class="nu_slug_status">${editSlug?'<span class="ok"><i class="fas fa-lock"></i> Slug bloqueado (edición)</span>':''}</div>
        </div>
        <div class="nu_grid_seo">
          <div class="nu_card">
            <div class="nu_card_title"><i class="fas fa-align-left"></i> Resumen (Meta Description)</div>
            <textarea id="nu_resumen" rows="3" maxlength="160" placeholder="Describe en pocas palabras..."></textarea>
            <div class="nu_counter"><span id="nu_resumen_cnt">0</span>/160</div>
          </div>
          <div class="nu_card">
            <div class="nu_card_title"><i class="fas fa-search"></i> Palabras Clave (Meta Keywords)</div>
            <textarea id="nu_keywords" rows="3" placeholder="amor, fe, esperanza, wiihope..."></textarea>
            <div class="nu_hint">Separa las palabras con comas. Solo para SEO.</div>
          </div>
        </div>
        <div class="nu_card nu_card_editor">
          <div class="nu_card_title_row">
            <span><i class="fas fa-code"></i> Contenido Markdown</span>
            <div class="nu_editor_tabs">
              <button type="button" class="nu_tab active" data-tab="edit"><i class="fas fa-code"></i> Editor</button>
              <button type="button" class="nu_tab" data-tab="prev"><i class="fas fa-eye"></i> Preview</button>
            </div>
          </div>
          <div class="nu_toolbar" style="flex-wrap:wrap;">${[
            [['fa-bold','**texto**', 'Negrita'],['fa-italic','*texto*', 'Cursiva'],['fa-strikethrough','~~texto~~', 'Tachado']],
            [['fa-heading','## Título H2', 'Subtítulo (H2)'],['fa-heading','### Título H3', 'Sección (H3)']],
            [['fa-list-ul','- item\n- item2', 'Lista'],['fa-check-square','- [ ] tarea', 'Checklist'],['fa-quote-right','> cita', 'Citar'],['fa-minus','\n---\n', 'Separador']],
            [['fa-code','`código`', 'Código'],['fa-image','![desc](url)', 'Imagen'],['fa-link','[texto](url)', 'Enlace']]
          ].map((g,i) => `<div style="display:flex;gap:0.4vh${i<3?';border-right:1px solid var(--brd);padding-right:0.6vh;margin-right:0.2vh':''}">${g.map(([ic,tag,tip])=>`<button type="button" class="nu_tool" data-tag='${tag}' ${wiTip(tip)}><i class="fas ${ic}"></i></button>`).join('')}</div>`).join('')}</div>
          <textarea id="nu_contenido" class="nu_code" rows="18" placeholder="Escribe tu historia en Markdown...\n\n## Un nuevo comienzo\n\nHabía una vez..."></textarea>
          <div id="nu_prev_html" class="nu_html_prev dpn po_contenido" style="padding: 1.5vh; border: 1px solid var(--brd); border-radius: 1vh; min-height: 20vh; margin-top: 1vh; background: var(--wb);"></div>
          <div class="nu_content_footer"><span id="nu_palabras" class="nu_hint"><i class="fas fa-font"></i> 0 palabras</span><span id="nu_lectura" class="nu_hint"><i class="fas fa-clock"></i> 1 min</span></div>
        </div>
      </div>
      <div class="nu_right">
        <div class="nu_card nu_card_publish">
          <div class="nu_card_title"><i class="fas fa-rocket"></i> ${editSlug?'Actualizar':'Publicar'}</div>
          <div class="nu_publish_opts">
            <label class="nu_check_l"><input type="checkbox" id="nu_activo" checked/><span><i class="fas fa-globe"></i> Público</span></label>
            <label class="nu_check_l"><input type="checkbox" id="nu_pin"/><span><i class="fas fa-thumbtack"></i> Pin</span></label>
          </div>
          <button type="submit" form="nu_form" class="nu_btn_submit nu_btn_full"><i class="fas fa-${editSlug?'save':'paper-plane'}"></i> ${editSlug?'Guardar cambios':'Publicar'}</button>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-folder"></i> Categoría</div>
          <input id="nu_cat_inp" type="text" placeholder="Ej: Esperanza, Salud..." maxlength="30" required/>
          <div id="nu_cat_sug" class="nu_sug_box"></div>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-tags"></i> Tags</div>
          <input id="nu_tags_inp" type="text" placeholder="Escribe y presiona Enter"/>
          <div id="nu_tag_sug" class="nu_sug_box"></div>
          <div id="nu_tags_box" class="nu_tags_box"></div>
        </div>
        <div class="nu_card">
          <div class="nu_card_title"><i class="fas fa-image"></i> Imágenes</div>
          <div style="display:flex; flex-direction:column; gap:1vh; margin-bottom: 1.5vh;">
            <label style="font-size:var(--fz_s4); color:var(--tx2); font-weight:600;"><i class="fas fa-compress"></i> Miniatura (Inicio-Blog)</label>
            <input id="nu_img" type="url" placeholder="https://... (Sugerido: 334x208px)"/>
            <div id="nu_img_prev" class="nu_img_prev dpn"><img id="nu_img_el" src="" alt=""/><button type="button" id="nu_img_clear" class="nu_img_clear" ${wiTip('Quitar')}><i class="fas fa-xmark"></i></button></div>
          </div>
          <div style="display:flex; flex-direction:column; gap:1vh;">
            <label style="font-size:var(--fz_s4); color:var(--tx2); font-weight:600;"><i class="fas fa-panorama"></i> ImagenTop (Post)</label>
            <input id="nu_img_top" type="url" placeholder="https://... (Sugerido: 1180px425px u horizontal)"/>
            <div id="nu_img_top_prev" class="nu_img_prev dpn"><img id="nu_img_top_el" src="" alt=""/><button type="button" id="nu_img_top_clear" class="nu_img_clear" ${wiTip('Quitar')}><i class="fas fa-xmark"></i></button></div>
          </div>
        </div>
        <div class="nu_card nu_card_autor">
          <div class="nu_card_title"><i class="fas fa-user-pen"></i> Autor</div>
          <div class="nu_autor_info"><div class="nu_autor_av"><i class="fas fa-user-circle"></i></div><div><strong>${u?.nombre||u?.usuario||'Anónimo'}</strong><span>${u?.email||''}</span></div></div>
        </div>
      </div>
    </div></form>
  </div>`;
};

export const init = async () => {
  const u = wiAuth.user?.usuario ? wiAuth.user : (getls('wiSmile') || {});
  if (!u.email) return;
  const editSlug = getEditSlug();
  let tags=[], sT, iT, scT, isEdit = !!editSlug;

  const genSlug = ()=> toSlug($('#nu_titulo').val());
  const updCount = ()=>{ const{words,min}=countWords($('#nu_contenido').val()); $('#nu_palabras').html(`<i class="fas fa-font"></i> ${words} palabras`); $('#nu_lectura').html(`<i class="fas fa-clock"></i> ${min} min`); };
  const renderTags = ()=> $('#nu_tags_box').html(tags.map((t,i)=>`<span class="nu_tag_chip">#${t} <i class="fas fa-xmark nu_tag_rm" data-i="${i}"></i></span>`).join(''));

  // ── MARKDOWN TO HTML ────────────────────────────────────────
  const mdToHtml = (md) => {
    if (!md) return '';
    let html = md
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/~~(.*?)~~/gim, '<del>$1</del>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[(.*?)\]\((https:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)(?:\S*?))\)/gim, '<button type="button" class="po_yt_btn" data-yt="$3"><i class="fab fa-youtube" style="color:#fe0149; font-size:1.2em; margin-right:6px;"></i> $1</button>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^---/gim, '<hr style="border:none;border-top:1px solid var(--brd);margin:2vh 0"/>');

    const lines = html.split('\n');
    const result = [];
    let inList = false;
    let inTable = false;

    lines.forEach(line => {
      const trimLine = line.trim();

      // Lógica de Tablas
      if (trimLine.startsWith('|') && trimLine.endsWith('|')) {
        if (!inTable) {
          result.push('<div class="po_table_wrap"><table>');
          inTable = true;
        }
        // Ignorar la línea separadora |---|---|
        if (trimLine.match(/^\|?[\s\-\|:]+\|?$/)) return;
        
        const cells = trimLine.split('|').filter((c, i, a) => (i > 0 && i < a.length - 1));
        const isHeader = inTable && result[result.length-1].includes('<table>');
        const tag = isHeader ? 'th' : 'td';
        result.push('<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>');
        return;
      } else if (inTable) {
        result.push('</table></div>');
        inTable = false;
      }

      // Lógica de Listas
      const listMatch = line.match(/^[\-\*]\s+(.*)$/);
      if (listMatch) {
        if (!inList) { result.push('<ul>'); inList = true; }
        let text = listMatch[1];
        if (text.startsWith('[ ] ')) text = '<input type="checkbox" disabled style="margin-right:0.5vh"> ' + text.slice(4);
        else if (text.startsWith('[x] ')) text = '<input type="checkbox" checked disabled style="margin-right:0.5vh"> ' + text.slice(4);
        result.push(`<li>${text}</li>`);
      } else {
        if (inList) { result.push('</ul>'); inList = false; }
        if (trimLine === '') return;
        if (!line.match(/^<(h2|h3|ul|ol|li|blockquote|img|hr|div|table|tr|th|td)/)) {
          result.push(`<p>${line}</p>`);
        } else {
          result.push(line);
        }
      }
    });

    if (inTable) result.push('</table></div>');
    if (inList) result.push('</ul>');
    return result.join('\n');
  };

  // ── DRAFTS (AUTOGUARDADO LOCAL) ─────────────────────────────
  const draftKey = isEdit ? 'wi_draft_edit_'+editSlug : 'wi_draft_new';
  const saveDraft = () => {
    const draft = {
      titulo: $('#nu_titulo').val(), slug: $('#nu_slug_inp').val(), resumen: $('#nu_resumen').val(),
      keywords: $('#nu_keywords').val(),
      cat: $('#nu_cat_inp').val(), img: $('#nu_img').val(), imgTop: $('#nu_img_top').val(), content: $('#nu_contenido').val(), tags
    };
    localStorage.setItem(draftKey, JSON.stringify(draft));
  };
  
  $('#nu_form').on('input', 'input, textarea', () => {
    clearTimeout(window.wiDraftTimer);
    window.wiDraftTimer = setTimeout(saveDraft, 1000);
  });

  // ── CARGAR SUGERENCIAS (SOLO CACHÉ) ─────────────────────────
  const cargarSugerencias = () => {
    try {
      const setCats = new Set(), setTags = new Set();
      for (const k of Object.keys(localStorage).filter(k => k.startsWith('wi_blogs') || k.startsWith('wi_post_'))) {
        const arr = getls(k);
        const list = Array.isArray(arr) ? arr : (arr ? [arr] : []);
        list.forEach(p => {
          if (p.categoria) setCats.add(p.categoria);
          if (p.tags && Array.isArray(p.tags)) p.tags.forEach(t => setTags.add(t));
        });
      }
      if (setCats.size > 0) {
        $('#nu_cat_sug').html(Array.from(setCats).slice(0,8).map(c => `<span class="nu_sug_chip cat_sug">${c}</span>`).join(''));
      }
      if (setTags.size > 0) {
        $('#nu_tag_sug').html(Array.from(setTags).slice(0,12).map(t => `<span class="nu_sug_chip tag_sug">#${t}</span>`).join(''));
      }
    } catch (e) { console.warn('No se pudieron cargar sugerencias'); }
  };
  cargarSugerencias();

  // ── CARGAR POST PARA EDICIÓN ────────────────────────────────
  if (isEdit) {
    try {
      const result = await getPost(editSlug, true); // force para tener datos frescos
      if (!result?.data) { Notificacion('Post no encontrado','error'); return; }
      const p = result.data;

      // Rellenar formulario
      $('#nu_titulo').val(p.titulo);
      $('#nu_slug_inp').val(p.slug || p.id);
      $('#nu_resumen').val(p.resumen || '').trigger('input');
      $('#nu_keywords').val(p.keywords || '');
      $('#nu_contenido').val(p.contenidoMd || p.contenido || '');
      $('#nu_img').val(p.imagen || '');
      $('#nu_img_top').val(p.imagenTop || '');
      $('#nu_activo').prop('checked', p.activo !== false);
      $('#nu_pin').prop('checked', !!p.pin);

      // Categoría
      $('#nu_cat_inp').val(p.categoria || '');

      // Tags
      tags = Array.isArray(p.tags) ? [...p.tags] : [];
      renderTags();

      // Imagen preview
      if (p.imagen) {
        $('#nu_img_el').attr('src', p.imagen);
        $('#nu_img_prev').removeClass('dpn');
      }
      if (p.imagenTop) {
        $('#nu_img_top_el').attr('src', p.imagenTop);
        $('#nu_img_top_prev').removeClass('dpn');
      }

      // Actualizar contadores
      $('#nu_resumen_cnt').text((p.resumen||'').length);
      updCount();

    } catch(e) { console.error('edit load:', e); Notificacion('Error cargando post','error'); }
  } else {
    // Si no es edición, cargamos el draft
    try {
      const d = JSON.parse(localStorage.getItem(draftKey));
      if (d) { 
          $('#nu_titulo').val(d.titulo); $('#nu_slug_inp').val(d.slug); $('#nu_resumen').val(d.resumen);
          $('#nu_keywords').val(d.keywords || '');
          $('#nu_cat_inp').val(d.cat); $('#nu_img').val(d.img).trigger('input'); 
          $('#nu_img_top').val(d.imgTop).trigger('input'); $('#nu_contenido').val(d.content);
         if(d.tags) { tags = d.tags; renderTags(); }
         updCount();
      }
    } catch(e){}
  }

  // ── EVENTOS COMUNES ─────────────────────────────────────────
  $('#nu_form').on('keydown', e => { if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') e.preventDefault(); });
  if (!isEdit) {
    $('#nu_slug_inp').on('input', function(){
      $(this).val($(this).val().replace(/[^a-z0-9_]/gi,s=>s===' '?'_':'').toLowerCase().replace(/_{2,}/g,'_'));
      $('#nu_slug_status').html('<i class="fas fa-pen"></i> Escribiendo...').removeClass('ok err');
    }).on('change', async function(){
      const v=$(this).val(), $s=$('#nu_slug_status'); if(!v) return $s.html('').removeClass('ok err');
      if(v.length<3) return $s.html('<i class="fas fa-exclamation"></i> Muy corto').addClass('err').removeClass('ok');
      $s.html('<i class="fas fa-spinner fa-spin"></i>').removeClass('ok err');
      const snap=await getDoc(doc(db,COL,v)).catch(()=>null);
      snap?.exists() ? $s.html('<i class="fas fa-xmark"></i> Ya existe').addClass('err').removeClass('ok') : $s.html('<i class="fas fa-check"></i> OK').addClass('ok').removeClass('err');
    });
    $('#nu_slug_reset').on('click',()=>{ $('#nu_slug_inp').val(genSlug()).trigger('input').trigger('change'); });
  }

  $('#nu_resumen').on('input', function(){ $('#nu_resumen_cnt').text($(this).val().length); });
  $('#nu_img').on('input', function(){ clearTimeout(iT); iT=setTimeout(()=>{ const u=$(this).val().trim(); if(!u) return $('#nu_img_prev').addClass('dpn');
    $('#nu_img_el').attr('src',u).off('load error').on('load',()=>$('#nu_img_prev').removeClass('dpn')).on('error',()=>$('#nu_img_prev').addClass('dpn'));
  },600); });
  $('#nu_img_clear').on('click',()=>{ $('#nu_img').val('').trigger('input'); $('#nu_img_prev').addClass('dpn'); });
  
  let iT2;
  $('#nu_img_top').on('input', function(){ clearTimeout(iT2); iT2=setTimeout(()=>{ const u=$(this).val().trim(); if(!u) return $('#nu_img_top_prev').addClass('dpn');
    $('#nu_img_top_el').attr('src',u).off('load error').on('load',()=>$('#nu_img_top_prev').removeClass('dpn')).on('error',()=>$('#nu_img_top_prev').addClass('dpn'));
  },600); });
  $('#nu_img_top_clear').on('click',()=>{ $('#nu_img_top').val('').trigger('input'); $('#nu_img_top_prev').addClass('dpn'); });

  $('#nu_contenido').on('input', updCount);
  $('#nu_tags_inp').on('keydown', function(e){ if(e.key!=='Enter'&&e.key!==',') return; e.preventDefault(); $(this).val().toLowerCase().split(',').map(t=>t.trim().replace(/\s+/g,'_')).filter(Boolean).forEach(t=>{ if(!tags.includes(t)&&tags.length<8) tags.push(t); }); renderTags(); $(this).val(''); });

  $(document)
    .on('click.nuevo','.nu_tool', function(){ const tag=$(this).data('tag'),$ta=$('#nu_contenido'),ta=$ta[0],s=ta.selectionStart,e=ta.selectionEnd,sel=ta.value.substring(s,e)||'texto';
      const ins=tag.replace('texto',sel).replace('cita',sel); $ta.val(ta.value.substring(0,s)+ins+ta.value.substring(e)); ta.focus();ta.selectionStart=s;ta.selectionEnd=s+ins.length; updCount(); saveDraft(); })
    .on('click.nuevo','.nu_tab', function(){ const t=$(this).data('tab'); $('.nu_tab').removeClass('active');$(this).addClass('active');
      t==='prev' ? ($('#nu_prev_html').html(wiSanihtml(mdToHtml($('#nu_contenido').val()))).removeClass('dpn'),$('#nu_contenido').addClass('dpn')) : ($('#nu_contenido').removeClass('dpn'),$('#nu_prev_html').addClass('dpn')); })
    .on('click.nuevo','.nu_tag_rm', function(){ tags.splice(+$(this).data('i'),1); renderTags(); })
    .on('click.nuevo','.cat_sug', function(){ $('#nu_cat_inp').val($(this).text()); })
    .on('click.nuevo','.tag_sug', function(){ const t=$(this).text().replace('#',''); if(t&&!tags.includes(t)&&tags.length<8){ tags.push(t); renderTags(); } });

  // ── SUBMIT: CREAR o ACTUALIZAR ──────────────────────────────
  $('#nu_form').on('submit', async function(e){
    e.preventDefault(); const $btn=$('#nu_submit,.nu_btn_full'), u=wiAuth.user?.usuario ? wiAuth.user : (getls('wiSmile') || {});
    let catVal = $('#nu_cat_inp').val().trim();
    if (catVal) catVal = catVal.charAt(0).toUpperCase() + catVal.slice(1).toLowerCase(); // Capitalizar primera letra
    const [titulo,resumen,keywords,cat,img,imgTop,contenidoMD,slug] = [$('#nu_titulo').val().trim(),$('#nu_resumen').val().trim(),$('#nu_keywords').val().trim(),catVal,$('#nu_img').val().trim(),$('#nu_img_top').val().trim(),$('#nu_contenido').val().trim(),$('#nu_slug_inp').val().trim()];
    const contenido = wiSanihtml(mdToHtml(contenidoMD)); // HTML limpio para guardar

    if(!titulo||!resumen||!cat||!img||!contenidoMD) return Notificacion('Completa los campos obligatorios','warning');
    if(contenidoMD.length<10) return Notificacion('Contenido muy corto','warning');
    if(!slug||slug.length<3) return Notificacion('Slug inválido','warning');
    if(!isEdit && $('#nu_slug_status').hasClass('err')) return Notificacion('Slug no disponible','error');

    wiSpin($btn, true, isEdit ? 'Guardando...' : 'Publicando...');

    try {
      const tiempo_lectura = `${countWords(contenido).min} min`;

      if (isEdit) {
        // ── MODO EDICIÓN: updateDoc ───────────────────────────
        await updateDoc(doc(db, COL, editSlug), {
          activo: $('#nu_activo').is(':checked'),
          pin: $('#nu_pin').is(':checked'),
          titulo, resumen, keywords, categoria: cat, contenido, contenidoMd: contenidoMD,
          imagen: img, imagenTop: imgTop, imagenAlt: titulo,
          tags, tiempoLectura: `${countWords(contenido).min} min`,
          actualizado: serverTimestamp()
        });
        // Limpiar caches del post editado  
        clearPostCache(editSlug);
        clearBlogCache();
        Mensaje('¡Historia actualizada! 🐾✨', 'success');
        setTimeout(() => import('../../rutas.js').then(m => m.rutas.navigate(`/${editSlug}`)), 1200);

      } else {
        // ── MODO CREAR: setDoc ────────────────────────────────
        if ((await getDoc(doc(db, COL, slug))).exists()) return wiSpin($btn, false), Notificacion('Slug existente','warning');
        await setDoc(doc(db, COL, slug), {
          id: slug, slug,
          activo: $('#nu_activo').is(':checked'),
          pin: $('#nu_pin').is(':checked'),
          usuario: u.usuario, email: u.email,
          autor: u.nombre || u.usuario,
          titulo, resumen, keywords, categoria: cat, contenido, contenidoMd: contenidoMD,
          imagen: img, imagenTop: imgTop, imagenAlt: titulo,
          tags, vistas: 0, likes: 0, tiempoLectura: `${countWords(contenido).min} min`,
          creado: serverTimestamp(), actualizado: serverTimestamp()
        });
        clearBlogCache();
        localStorage.removeItem(draftKey);
        Mensaje('¡Historia publicada! 🐾✨', 'success');
        setTimeout(() => import('../../rutas.js').then(m => m.rutas.navigate(`/${slug}`)), 1200);
      }

    } catch(err) { console.error('nuevo:', err); Notificacion(isEdit ? 'Error al guardar' : 'Error al publicar', 'error'); wiSpin($btn, false); }
  });
};

export const cleanup = () => { $('#nu_form,#nu_slug_inp,#nu_titulo,#nu_resumen,#nu_img,#nu_contenido').off(); $(document).off('.nuevo'); };