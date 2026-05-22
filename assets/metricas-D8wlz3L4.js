import{d as e}from"./widev-mG2tMnX8.js";import{O as t,T as n,_ as r,x as i}from"./firebase-37FTGmWc.js";import{n as a}from"./firebase-Cknp8_pv.js";var o=async()=>`
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
  `,s=async()=>{let o=e(`wiSmile`);if(o)try{let e=await r(i(t(a,`linkwiis`),n(`usuario`,`==`,o.usuario))),s=0,c=0,l=[];e.forEach(e=>{let t=e.data(),n=t.vistas||0,r=t.links?t.links.filter(e=>e.url||e.titulo).length:0;s+=n,c+=r,l.push({slug:e.id,vistas:n,linksCount:r,logo:t.logo})}),l.sort((e,t)=>t.vistas-e.vistas);let u=`
      <div class="me_stat_card">
        <div class="me_stat_label"><i class="fas fa-eye" style="color:var(--mco); font-size:1rem;"></i> Vistas Globales</div>
        <div class="me_stat_val">${s.toLocaleString()}</div>
      </div>
      <div class="me_stat_card">
        <div class="me_stat_label"><i class="fas fa-folder-open" style="color:#0F9D58; font-size:1rem;"></i> Proyectos Activos</div>
        <div class="me_stat_val">${l.length}</div>
      </div>
      <div class="me_stat_card">
        <div class="me_stat_label"><i class="fas fa-link" style="color:#E53935; font-size:1rem;"></i> Enlaces Creados</div>
        <div class="me_stat_val">${c}</div>
      </div>
    `,d=l.map(e=>`
      <tr>
        <td data-label="Proyecto">
          <div class="me_slug_cell">
            <img src="${e.logo||`/smile.avif`}" class="me_slug_avatar" alt="logo">
            <span>linkwii.com/${e.slug}</span>
          </div>
        </td>
        <td data-label="Enlaces Activos"><span class="me_badge"><i class="fas fa-link" style="color:var(--tx3)"></i> ${e.linksCount}</span></td>
        <td data-label="Vistas Totales"><strong>${e.vistas.toLocaleString()}</strong> <span style="font-size:0.75rem; color:var(--tx3); font-weight:normal;">vistas</span></td>
        <td data-label="Acciones">
          <div style="display:flex; gap:1vh; flex-wrap:wrap;">
            <a href="/${e.slug}" target="_blank" class="me_action_btn sec"><i class="fas fa-external-link-alt"></i> Visitar</a>
            <!-- Link to editor, maybe in future we can automatically select it via localStorage -->
            <a href="/p/crear" class="me_action_btn"><i class="fas fa-pen"></i> Editar</a>
          </div>
        </td>
      </tr>
    `).join(``);document.getElementById(`me_stats_render`).innerHTML=u,document.getElementById(`me_tbody_render`).innerHTML=d||`<tr><td colspan="4" style="text-align:center; padding:5vh; color:var(--tx3);">No tienes proyectos creados aún.</td></tr>`,document.getElementById(`me_loading`).style.display=`none`,document.getElementById(`me_content`).style.display=`block`}catch(e){console.error(e);let t=document.getElementById(`me_loading`);t&&(t.innerHTML=`<i class="fas fa-exclamation-triangle" style="color:var(--error); font-size:2rem; margin-bottom:1vh; display:block;"></i> Error al cargar métricas.`)}},c=()=>{};export{c as cleanup,s as init,o as render};