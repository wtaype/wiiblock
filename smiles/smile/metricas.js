import './metricas.css';
import { getls } from '../widev.js';
import { db } from '../firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const render = async () => {
  return `
    <div class="me_layout wi_fadeUp wi_visible">
      <div class="me_header">
        <h1 class="me_title">Métricas de Rendimiento</h1>
        <p class="me_subtitle">Monitorea el tráfico de tus proyectos en tiempo real.</p>
      </div>

      <div id="me_loading" style="text-align:center; padding:15vh 0; color:var(--tx3); font-size:1.2rem;">
        <i class="fas fa-spinner fa-spin" style="margin-bottom:2vh; font-size:2rem; color:var(--mco);"></i>
        <div>Calculando métricas...</div>
      </div>

      <div id="me_content" style="display:none;">
        <div class="me_stats_grid" id="me_stats_render"></div>

        <div class="me_table_card">
          <div class="me_table_header">
            <i class="fas fa-layer-group" style="color:var(--mco);"></i> Resumen por Proyecto
          </div>
          <table class="me_table">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Enlaces Activos</th>
                <th>Vistas Totales</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="me_tbody_render"></tbody>
          </table>
        </div>
      </div>
    </div>
  `;
};

export const init = async () => {
  const wi = getls('wiSmile');
  if (!wi) return;

  try {
    const q = query(collection(db, 'linkwiis'), where('usuario', '==', wi.usuario));
    const snap = await getDocs(q);
    
    let totalVistas = 0;
    let totalLinks = 0;
    const proyectos = [];

    snap.forEach(doc => {
      const p = doc.data();
      const vistas = p.vistas || 0;
      // Filter out empty links
      const numLinks = p.links ? p.links.filter(l => l.url || l.titulo).length : 0;
      
      totalVistas += vistas;
      totalLinks += numLinks;
      proyectos.push({ slug: doc.id, vistas, linksCount: numLinks, logo: p.logo });
    });

    // Sort by most viewed
    proyectos.sort((a, b) => b.vistas - a.vistas);

    const statsHtml = `
      <div class="me_stat_card">
        <div class="me_stat_label"><i class="fas fa-eye" style="color:var(--mco); font-size:1rem;"></i> Vistas Globales</div>
        <div class="me_stat_val">${totalVistas.toLocaleString()}</div>
      </div>
      <div class="me_stat_card">
        <div class="me_stat_label"><i class="fas fa-folder-open" style="color:#0F9D58; font-size:1rem;"></i> Proyectos Activos</div>
        <div class="me_stat_val">${proyectos.length}</div>
      </div>
      <div class="me_stat_card">
        <div class="me_stat_label"><i class="fas fa-link" style="color:#E53935; font-size:1rem;"></i> Enlaces Creados</div>
        <div class="me_stat_val">${totalLinks}</div>
      </div>
    `;

    const trsHtml = proyectos.map(p => `
      <tr>
        <td data-label="Proyecto">
          <div class="me_slug_cell">
            <img src="${p.logo || '/smile.avif'}" class="me_slug_avatar" alt="logo">
            <span>linkwii.com/${p.slug}</span>
          </div>
        </td>
        <td data-label="Enlaces Activos"><span class="me_badge"><i class="fas fa-link" style="color:var(--tx3)"></i> ${p.linksCount}</span></td>
        <td data-label="Vistas Totales"><strong>${p.vistas.toLocaleString()}</strong> <span style="font-size:0.75rem; color:var(--tx3); font-weight:normal;">vistas</span></td>
        <td data-label="Acciones">
          <div style="display:flex; gap:1vh; flex-wrap:wrap;">
            <a href="/${p.slug}" target="_blank" class="me_action_btn sec"><i class="fas fa-external-link-alt"></i> Visitar</a>
            <!-- Link to editor, maybe in future we can automatically select it via localStorage -->
            <a href="/p/crear" class="me_action_btn"><i class="fas fa-pen"></i> Editar</a>
          </div>
        </td>
      </tr>
    `).join('');

    document.getElementById('me_stats_render').innerHTML = statsHtml;
    document.getElementById('me_tbody_render').innerHTML = trsHtml || `<tr><td colspan="4" style="text-align:center; padding:5vh; color:var(--tx3);">No tienes proyectos creados aún.</td></tr>`;

    document.getElementById('me_loading').style.display = 'none';
    document.getElementById('me_content').style.display = 'block';

  } catch (e) {
    console.error(e);
    const errEl = document.getElementById('me_loading');
    if(errEl) errEl.innerHTML = '<i class="fas fa-exclamation-triangle" style="color:var(--error); font-size:2rem; margin-bottom:1vh; display:block;"></i> Error al cargar métricas.';
  }
};

export const cleanup = () => {};
