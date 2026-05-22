import './blog.css';
import $ from 'jquery';
import { wiTip, Notificacion, getls, herowi } from '../../widev.js';
import { getPostsPaginated, fetchAll, catInfo, skCard, srcBadge, prefetchPost, clearBlogCache } from './devblog.js';

const PAG_INI = 16, PAG_MAS = 8;
const ORDEN = [{ id:'nuevo', icon:'fa-clock', label:'Recientes' }, { id:'vistas', icon:'fa-fire', label:'Populares' }];

const tplCard = (p) => { const c = catInfo(p.categoria); return `
  <a href="/${p.slug||p.id}" class="bl_card">
    <div class="bl_card_img">
      <img src="${p.imagen||'https://placehold.co/600x400?text=📖'}" alt="${p.imagenAlt||p.titulo}" loading="lazy" onerror="this.src='https://placehold.co/600x400?text=📖'"/>
      <div class="bl_card_over">
        <span class="bl_card_cat" style="--cc:${c.color}"><i class="fas ${c.icon}"></i> ${p.categoria||'—'}</span>
        ${p.pin?`<span class="bl_card_dest" ${wiTip('Destacada')}><i class="fas fa-thumbtack"></i></span>`:''}
      </div>
    </div>
    <div class="bl_card_body">
      <h2 class="bl_card_tit">${p.titulo}</h2>
      <p class="bl_card_res">${p.resumen||''}</p>
      <div class="bl_card_footer">
        <div class="bl_card_meta">
          <span ${wiTip('Tiempo')}><i class="fas fa-clock"></i> ${p.tiempoLectura||'—'}</span>
          <span ${wiTip('Vistas')}><i class="fas fa-eye"></i> ${p.vistas||0}</span>
          <span ${wiTip('Likes')}><i class="fas fa-heart" style="color:#fe0149"></i> ${p.likes||0}</span>
        </div>
        <span class="bl_card_leer">Leer <i class="fas fa-arrow-right"></i></span>
      </div>
    </div>
  </a>`; 
};

export const render = () => `
  <div class="bl_wrap">
    <div class="bl_hero" data-herowi="100">
      <h1 class="bl_hero_tit">Historias que <span class="bl_grad">inspiran</span> 🕊️</h1>
      <p class="bl_hero_sub">Reflexiones, fe y palabras que tocan el corazón</p>
    </div>
    <div class="bl_search_bar" id="bl_search_bar" style="display:none">
      <div class="bl_search_inner">
        <i class="fas fa-search bl_search_ico"></i>
        <input id="bl_search_inp" type="text" placeholder="Buscar historias..." autocomplete="off" spellcheck="false"/>
        <button id="bl_search_close" class="bl_search_close"><i class="fas fa-xmark"></i></button>
      </div>
    </div>
    <div class="bl_bar">
      <div class="bl_cats" id="bl_cats"></div>
      <div class="bl_bar_right">
        <div class="bl_orden">${ORDEN.map(o=>`<button class="bl_ord_btn ${o.id==='nuevo'?'active':''}" data-ord="${o.id}"><i class="fas ${o.icon}"></i><span>${o.label}</span></button>`).join('')}</div>
        <button class="bl_icon_btn" id="bl_search_toggle" ${wiTip('Buscar')}><i class="fas fa-search"></i></button>
        <button class="bl_icon_btn" id="bl_refresh" ${wiTip('Actualizar')}><i class="fas fa-rotate"></i></button>
      </div>
    </div>
    <div class="bl_result_bar" id="bl_result_bar"></div>
    <div class="bl_grid" id="bl_grid" data-herowi="140"></div>
    <div class="bl_mas_wrap" id="bl_mas_wrap" style="display:none"><button class="bl_mas_btn" id="bl_mas"><i class="fas fa-plus"></i> Ver más</button></div>
    <div class="bl_empty dpvc" id="bl_empty" style="display:none"><i class="fas fa-dove"></i><h3>Sin historias</h3></div>
  </div>`;

export const init = async () => {
  let cat='todo', ord='nuevo', lista=[], busy=false, lastDoc=null, hasMore=true, isFirstLoad=true;
  const nav = s => import('../../rutas.js').then(m => m.rutas.navigate(s));

  const buildCats = (posts) => {
    const uniq = [...new Set(posts.map(p=>p.categoria).filter(Boolean))].sort();
    localStorage.setItem('wi_blogs_cats', JSON.stringify(uniq));
    $('#bl_cats').html(`<button class="bl_cat_btn ${cat==='todo'?'active':''}" data-cat="todo" style="--cc:var(--mco)"><i class="fas fa-grip"></i><span>Todas</span></button>` + 
      uniq.map(c => `<button class="bl_cat_btn ${cat===c?'active':''}" data-cat="${c}" style="--cc:${catInfo(c).color}"><i class="fas ${catInfo(c).icon}"></i><span>${c}</span></button>`).join(''));
  };

  const grid = (append, newItems = []) => {
    const items = append || newItems.length ? newItems : lista;
    if (!items.length && !append) return $('#bl_empty').show(), $('#bl_mas_wrap').hide(), $('#bl_grid').html('');
    
    $('#bl_empty').hide();
    $('#bl_grid')[append ? 'append' : 'html'](items.map(tplCard).join(''));
    herowi();
    $('#bl_mas_wrap').toggle(newItems.length && newItems !== lista ? false : hasMore);
  };

  const renderInstantaneo = () => {
    try { const c = JSON.parse(localStorage.getItem('wi_blogs_cats')||'[]'); if (c.length) buildCats(c.map(categoria => ({ categoria }))); } catch {}
    const cData = getls(cat === 'todo' && ord === 'nuevo' ? 'wi_blogs' : `wi_blogs_${cat}_${ord}`);
    if (Array.isArray(cData) && cData.length) {
      lista = cData.slice(0, PAG_INI);
      $('#bl_result_bar').html(`<span><strong>${lista.length}</strong> historia${lista.length!==1?'s':''}</span><span class="bl_cache_tag" ${wiTip('⚡ Memoria')}><i class="fas fa-bolt"></i> Local</span>`);
      return grid(false, lista), (isFirstLoad = false, true);
    }
    return false;
  };

  const cargar = async (force=false, append=false) => {
    if (busy) return; busy = true;
    const limit = append ? PAG_MAS : PAG_INI;
    if (!append) { $('#bl_empty,#bl_mas_wrap').hide(); lastDoc = null; }
    
    try {
      const r = await getPostsPaginated(cat, ord, force, lastDoc, limit);
      if (isFirstLoad || JSON.stringify(append ? [] : lista) !== JSON.stringify(r.lista)) {
        lista = append ? [...lista, ...r.lista] : r.lista;
        buildCats(lista);
        grid(append, r.lista);
      }
      lastDoc = r.lastSnap; hasMore = r.lista.length === limit;
      $('#bl_result_bar').html(`<span><strong>${lista.length}</strong> historia${lista.length!==1?'s':''}</span>${srcBadge(r.fromCache)}`);
    } catch(e) { console.error('[blog]',e); Notificacion('Error','error'); if(!append && !lista.length && $('#bl_grid .bl_card').length === 0) $('#bl_empty').show(); }
    isFirstLoad = busy = false;
  };

  let sT;
  const doSearch = q => {
    clearTimeout(sT);
    sT = setTimeout(async () => {
      if (!q.trim()) return grid(false), $('#bl_result_bar').html(`<span><strong>${lista.length}</strong> historias</span>`);
      const s = q.toLowerCase();
      $('#bl_result_bar').html(`<span><i class="fas fa-spinner fa-spin"></i> Buscando...</span>`);
      const res = (await fetchAll()).filter(p => [p.titulo, p.resumen, p.categoria, ...(p.tags||[])].some(t => t?.toLowerCase().includes(s)));
      $('#bl_result_bar').html(`<span><i class="fas fa-search"></i> <strong>${res.length}</strong> resultados — "<em>${q}</em>"</span>`);
      grid(false, res);
    }, 400);
  };

  const resetList = () => { isFirstLoad = true; if (!renderInstantaneo() && $('#bl_grid .bl_card').length === 0) $('#bl_grid').html(Array(16).fill(skCard()).join('')); };

  renderInstantaneo() || ($('#bl_grid .bl_card').length === 0 && $('#bl_grid').html(Array(16).fill(skCard()).join('')));
  await cargar(false, false);
  window.__WIREADY__ = true;

  $(document)
    .on('click.blog','.bl_cat_btn', function(){ const c=$(this).data('cat'); if(c===cat) return; cat=c; resetList(); cargar(); })
    .on('click.blog','.bl_ord_btn', function(){ const o=$(this).data('ord'); if(o===ord) return; ord=o; resetList(); cargar(); })
    .on('click.blog','#bl_refresh', async function(){
      $(this).html('<i class="fas fa-spinner fa-spin"></i>').prop('disabled',true);
      clearBlogCache(); localStorage.removeItem('wi_blogs_cats');
      resetList(); await cargar(true);
      $(this).html('<i class="fas fa-rotate"></i>').prop('disabled',false); Notificacion('Actualizado ✅','success');
    })
    .on('click.blog','#bl_search_toggle', function(){ $('#bl_search_bar').stop(true).slideToggle(180, function(){ $(this).is(':visible') ? $('#bl_search_inp').focus() : ($('#bl_search_inp').val(''), grid(false)); }); })
    .on('click.blog','#bl_search_close', ()=>{ $('#bl_search_bar').slideUp(160); $('#bl_search_inp').val(''); grid(false); })
    .on('input.blog','#bl_search_inp', function(){ doSearch($(this).val()); })
    .on('click.blog','#bl_mas', function(){ const $b=$(this), o=$b.html(); $b.html('<i class="fas fa-spinner fa-spin"></i> Cargando...').prop('disabled',true); cargar(false,true).finally(()=>$b.html(o).prop('disabled',false)); })
    .on('click.blog','.bl_card', function(e){ e.preventDefault(); const s=$(this).attr('href'); s&&nav(s); })
    .on('mouseenter.blog','.bl_card', function(){ const h=$(this).attr('href'); if(h) prefetchPost(h.substring(1)); });
    
  herowi();
};

export const cleanup = () => $(document).off('.blog');