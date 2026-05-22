const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/admin-FWOua3Ty.css","assets/mifcm-DMGZebNt.css","assets/permisos-DocH6Ucx.css","assets/sistema-C3OQ-N0f.css","assets/usuarios-BMnNRUe5.css","assets/precios-RaoK6dN1.css","assets/rrhh-ztdrYgVG.css","assets/agregar-DOjTjWfU.css","assets/avisar-B5ddB24w.css","assets/chat-CZ6DaJJ8.css","assets/crear-DdIpSs_P.css","assets/historial-5F9ScACp.css","assets/mensajes-MIv6zaMF.css","assets/metricas-C7zPbHpQ.css","assets/notas-dOX0449r.css","assets/perfil-BZqPOASC.css","assets/ranking-DMfKxd2p.css","assets/registrar-DxSmiDQB.css","assets/smile-BWbZimzl.css","assets/tours-BJRztKEc.css","assets/win-CFprZW1q.css","assets/word-vV8fNusV.css","assets/verificar-mialvYKy.css","assets/cookies-Dxgx4MVf.css","assets/contacto-C-QNnnsD.css","assets/descubre-Dq_06vmy.css","assets/blog-Pvtd5AbW.css","assets/nuevo-BJdQZpYp.css","assets/post-CaVCZ_Tu.css","assets/chatwil-R1-t4gNv.css","assets/emojis-GLPEIk5R.css","assets/login-CS-GQr1l.css","assets/precios-D9xczg9-.css","assets/registrado-DMFE_p3X.css"])))=>i.map(i=>d[i]);
import{n as e}from"./rolldown-runtime-S-ySWqyJ.js";import{n as t}from"./vendor-BBPjS4yS.js";import{c as n,n as r,t as i}from"./wii-DZw4TcJ0.js";import{O as a,T as o,a as s,b as c,d as l,i as u,w as d,x as f,y as p}from"./widev-8sJg4_cC.js";var m=e({cleanup:()=>w,init:()=>C,render:()=>S}),h=[`Bloqueador de Anuncios 🛡️`,`Protector de Privacidad 🔒`,`Navegación Ultrarrápida ⚡`,`Cero Popups Invasivos 🚫`,`YouTube sin Publicidad 📺`],g=[{valor:100,label:`Eficacia de Bloqueo`,sufijo:`%`},{valor:2,label:`Velocidad de Carga`,sufijo:`x`}],_=[{id:`bloqueo`,icon:`fa-shield-halved`,color:`#FF5C69`,nombre:`Bloqueo Avanzado`,desc:`Di adiós a la publicidad molesta`,items:[{icon:`fa-youtube`,name:`YouTube sin pausas`,desc:`Mira videos al instante y sin interrupciones`},{icon:`fa-rectangle-ad`,name:`Adiós Banners y Popups`,desc:`Limpieza total en todas las páginas web`},{icon:`fa-window-restore`,name:`Bloqueo de Emergentes`,desc:`Detiene molestas ventanas invasivas`}]},{id:`privacidad`,icon:`fa-eye-slash`,color:`#29C72E`,nombre:`Privacidad Total`,desc:`Tus datos son y seguirán siendo tuyos`,items:[{icon:`fa-cookie-bite`,name:`Bloqueo de Trackers`,desc:`Evita que las empresas rastreen tus búsquedas`},{icon:`fa-eye-slash`,name:`Sin historial de navegación`,desc:`Funciona de forma local y 100% confidencial`},{icon:`fa-key`,name:`Escudo de Identidad`,desc:`Protege tus datos y firmas digitales de rastreadores`}]},{id:`velocidad`,icon:`fa-bolt`,color:`#FFDA34`,nombre:`Navegación 2x Rápida`,desc:`Optimización extrema de carga web`,items:[{icon:`fa-gauge-high`,name:`Carga en milisegundos`,desc:`Páginas ligeras que cargan en un parpadeo`},{icon:`fa-wifi`,name:`Ahorro de Datos móviles`,desc:`Menos publicidad significa menor consumo de megas`},{icon:`fa-battery-three-quarters`,name:`Eficiencia de Batería`,desc:`Optimiza el uso de CPU y memoria RAM en Chrome`}]},{id:`filtros`,icon:`fa-sliders`,color:`#7000FF`,nombre:`Control Absoluto`,desc:`Filtros personalizados para cada usuario`,items:[{icon:`fa-circle-check`,name:`Lista de Sitios Permitidos`,desc:`Habilita anuncios en tus webs preferidas`},{icon:`fa-list-check`,name:`Filtros Comunitarios`,desc:`Reglas de bloqueo constantemente actualizadas`},{icon:`fa-crosshairs`,name:`Bloquear Elemento`,desc:`Haz clic derecho para ocultar lo que no quieras ver`}]},{id:`estadisticas`,icon:`fa-chart-line`,color:`#0EBEFF`,nombre:`Reportes en Tiempo Real`,desc:`Monitorea el escudo de protección`,items:[{icon:`fa-clock`,name:`Contador de anuncios`,desc:`Visualiza la cantidad bloqueada por sesión`},{icon:`fa-chart-pie`,name:`Historial de Ahorro`,desc:`Reporte detallado de datos y megabytes salvados`},{icon:`fa-heart`,name:`Navegación Segura`,desc:`Estado del escudo en cada dominio visitado`}]},{id:`soporte`,icon:`fa-arrows-rotate`,color:`#FF8F00`,nombre:`Reglas al Día`,desc:`Filtros optimizados y actualizados`,items:[{icon:`fa-robot`,name:`Actualización Automática`,desc:`Reglas optimizadas para las últimas amenazas de anuncios`},{icon:`fa-circle-exclamation`,name:`Reportar anuncios`,desc:`Envía reportes sobre anuncios que se hayan filtrado`},{icon:`fa-headset`,name:`Soporte de la Comunidad`,desc:`Ayuda y sugerencias de parte del equipo técnico`}]}],v=[{icon:`fa-feather`,titulo:`Ultrarrápido y Liviano`,desc:`Diseñado para consumir el mínimo de memoria RAM y procesador en tu navegador Chrome, optimizando el rendimiento general del dispositivo.`},{icon:`fa-user-shield`,titulo:`Privacidad Garantizada`,desc:`Tus datos nunca salen de tu ordenador. WiiBlock procesa todas las reglas de bloqueo en tu propio navegador local sin servidores intermedios.`},{icon:`fa-heart`,titulo:`100% Gratuito y Libre`,desc:`Sin cargos ocultos ni suscripciones premium. Creemos en una web libre, limpia y segura para todos los usuarios de forma gratuita.`}],y=e=>`
  <div class="ini_stat">
    <div class="ini_stat_n" data-target="${e.valor}" data-sufijo="${e.sufijo}">0</div>
    <div class="ini_stat_l">${e.label}</div>
  </div>`,b=e=>`
  <div class="ini_cat_card" style="--cc:${e.color}">
    <div class="ini_cat_bar"></div>
    <div class="ini_cat_top">
      <div class="ini_cat_ico"><i class="fas ${e.icon}"></i></div>
      <div class="ini_cat_info"><h3>${e.nombre}</h3><p>${e.desc}</p></div>
    </div>
    <ul class="ini_cat_tools">
      ${e.items.map(e=>`
        <li><div class="ini_tool_a">
          <i class="fas ${e.icon}"></i>
          <div><strong>${e.name}</strong><span>${e.desc}</span></div>
          <i class="fas fa-check ini_ext" style="color:var(--success)"></i>
        </div></li>`).join(``)}
    </ul>
  </div>`,x=(e,t)=>`
  <div class="ini_about_card" style="--d:${t*.15}s">
    <div class="ini_card_ico"><i class="fas ${e.icon}"></i></div>
    <h3>${e.titulo}</h3>
    <p>${e.desc}</p>
  </div>`,S=()=>`
<div class="ini_wrap">

  <!-- ===== HERO ===== -->
  <section class="ini_hero">
    <div class="ini_hero_content">

      <div class="ini_saludo" style="--d:0s">
        <span>${s()}</span><span class="ini_wave">👋</span>
      </div>

      <h1 class="ini_titulo" style="--d:.18s">
        Seguridad y Privacidad con <span class="ini_grad">${i}</span>
      </h1>

      <div class="ini_roles" style="--d:.36s">
        ${h.map((e,t)=>`<span class="ini_role${t===0?` active`:``}">${e}</span>`).join(``)}
      </div>

      <p class="ini_sub" style="--d:.54s">
        Disfruta de una web limpia y vuela en tu navegación. Bloquea anuncios invasivos, detiene rastreadores de datos y protege tu privacidad con un solo clic.
      </p>

      <div class="ini_stats" id="in_stats" style="--d:.72s">
        ${g.map(y).join(``)}
      </div>

      <div class="ini_btns" style="--d:.9s">
        <a href="/acerca" class="ini_btn_p"><i class="fas fa-circle-info"></i> Descubrir WiiBlock</a>
      </div>

    </div>

    <!-- Derecha: preview de la Extensión WiiBlock Popup -->
    <div class="ini_hero_visual">
      <div class="ini_nw_preview" style="--d:.3s; padding: 2vh; max-width: 320px; height: auto;">
        <div class="ini_nw_head" style="height: auto; padding: 1vh 0; display: flex; justify-content: space-between; border-bottom: 2px solid var(--brd);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-shield-halved" style="color: var(--mco); font-size: 1.4rem;"></i>
            <span style="font-weight: 800; font-size: 0.95rem; color: var(--tx);">${i}</span>
          </div>
          <div style="font-size: 0.65rem; font-weight: 700; background: var(--bg5); color: var(--mco); padding: 2px 6px; border-radius: 20px;">
            10
          </div>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 3vh; padding: 4vh 1vh;">
          <!-- Power Button -->
          <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--mco) 0%, var(--bg2) 100%); display: flex; justify-content: center; align-items: center; color: #fff; font-size: 2.2rem; cursor: pointer; box-shadow: 0 0 20px rgba(55,161,221,0.4); transition: transform 0.2s;">
            <i class="fas fa-power-off"></i>
          </div>
          <div style="font-weight: 700; font-size: 0.8rem; color: var(--success); letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: var(--success); display: inline-block; animation: ini_blink 1.5s infinite;"></span>
            PROTECCIÓN ACTIVA
          </div>
        </div>
        <div style="border-top: 1px solid var(--brd); padding-top: 2vh; display: flex; flex-direction: column; gap: 1.5vh;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
            <span style="color: var(--tx2); font-weight: 500;"><i class="fas fa-ban" style="margin-right: 6px; color: #FF5C69;"></i> Bloqueados en esta web</span>
            <strong style="color: var(--tx); font-size: 0.95rem;">24</strong>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem;">
            <span style="color: var(--tx2); font-weight: 500;"><i class="fas fa-eye-slash" style="margin-right: 6px; color: #29C72E;"></i> Rastreadores detenidos</span>
            <strong style="color: var(--tx); font-size: 0.95rem;">12</strong>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; background: var(--bg1); padding: 8px; border-radius: 8px; border: 1px solid var(--brd);">
            <span style="color: var(--mco); font-weight: 700;"><i class="fas fa-trophy" style="margin-right: 6px;"></i> Total bloqueados</span>
            <strong style="color: var(--mco); font-size: 0.9rem;">15,482</strong>
          </div>
        </div>
      </div>
      <div class="ini_ftech ini_ft1" style="--d:.5s"  ${d(`Shield`)}><i class="fas fa-shield-halved"></i></div>
      <div class="ini_ftech ini_ft2" style="--d:.65s" ${d(`Speed`)}><i class="fas fa-bolt"></i></div>
      <div class="ini_ftech ini_ft3" style="--d:.8s"  ${d(`Privacy`)}><i class="fas fa-eye-slash"></i></div>
      <div class="ini_ftech ini_ft4" style="--d:.95s" ${d(`Block`)}><i class="fas fa-ban"></i></div>
    </div>
  </section>

  <!-- ===== FUNCIONALIDADES ===== -->
  <section class="ini_cats_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">Los <span class="ini_grad">6 Pilares</span> de WiiBlock</h2>
      <div class="ini_sec_line"></div>
      <p class="ini_sec_desc">Herramientas avanzadas integradas en un solo escudo para tu navegador</p>
    </div>
    <div class="ini_cats_grid">${_.map(b).join(``)}</div>
  </section>

  <!-- ===== ¿POR QUÉ? ===== -->
  <section class="ini_about_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">¿Qué beneficios tienes al usar <span class="ini_grad">${i}?</span></h2>
      <div class="ini_sec_line"></div>
    </div>
    <div class="ini_about_grid">${v.map(x).join(``)}</div>
  </section>

  <!-- ===== CTA ===== -->
  <section class="ini_cta_sec">
    <div class="ini_cta_wrap">
      <i class="fas fa-rocket ini_cta_ico"></i>
      <h2>Disfruta de una web más limpia, rápida y segura</h2>
      <p>Instala la extensión en segundos y toma el control de tu privacidad en internet.</p>
      <div class="ini_cta_chips">
        <a href="/acerca" class="ini_btn_p"><i class="fas fa-circle-info"></i> Más información</a>
        <a href="https://chromewebstore.google.com/detail/lpegdodoliifnidedjieckcmppcdecge" target="_blank" rel="noopener" class="ini_btn_s"><i class="fab fa-chrome" style="color: #0EBEFF;"></i> Instalar en Chrome</a>
      </div>
      <p class="ini_cta_autor" style="margin-top:2vh;">Creado con ❤️ por <a href="${n}" target="_blank" rel="noopener">${r}</a> · 10 © ${a()}</p>
    </div>
  </section>

</div>`,C=()=>{let e=0,n=t(`.ini_role`);setInterval(()=>{n.removeClass(`active`),n.eq(e=(e+1)%n.length).addClass(`active`)},2800),o(`#in_stats`,()=>{t(`.ini_stat_n`).each(function(){let e=t(this),n=+e.data(`target`),r=e.data(`sufijo`)||``,i=0,a=setInterval(()=>{i+=n/50,i>=n?(e.text(n+r),clearInterval(a)):e.text(Math.floor(i))},28)})}),o(`.ini_cat_card`,null,{anim:`wi_fadeUp`,stagger:80}),o(`.ini_about_card`,null,{anim:`wi_fadeUp`,stagger:140}),console.log(`🚀 ${i} 10 · Inicio OK`)},w=()=>{},T=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),E=function(e){return`/wiiblock/`+e},D={},O=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=E(t,n),t in D)return;D[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:T,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},k=[],A={todos:{nvleft:[{href:`/`,page:`inicio`,ico:`fa-house`,txt:`Bienvenido`},{href:`/descubre`,page:`descubre`,ico:`fa-compass`,txt:`Descubre`},{href:`/privacidad`,page:`privacidad`,ico:`fa-user-shield`,txt:`Privacidad`},{href:`/terminos`,page:`terminos`,ico:`fa-file-contract`,txt:`Términos`},{href:`/acerca`,page:`acerca`,ico:`fa-circle-info`,txt:`Acerca`},...k],nvright:[]},smile:{nvleft:[{href:`/registrar`,page:`registrar`,ico:`fa-plus-circle`,txt:`Registrar Ventas`},{href:`/historial`,page:`historial`,ico:`fa-clipboard-list`,txt:`Historial Ventas`},{href:`/ranking`,page:`ranking`,ico:`fa-trophy`,txt:`Ranking`},{href:`/tours`,page:`tours`,ico:`fa-route`,txt:`Tours `},{href:`/chat`,page:`chat`,ico:`fa-comments`,txt:`Chat Grupal`},...k],nvright:[{isPerfil:!0},{isSalir:!0}]},gestor:{nvleft:[{href:`/gestor`,page:`gestor`,ico:`fa-house`,txt:`Dashboard`},{href:`/registrar`,page:`registrar`,ico:`fa-plus-circle`,txt:`Registrar Ventas`},{href:`/ranking`,page:`ranking`,ico:`fa-trophy`,txt:`Ranking`},{href:`/historial`,page:`historial`,ico:`fa-clipboard-list`,txt:`Tablero`},{href:`/tours`,page:`tours`,ico:`fa-route`,txt:`Tours`},{href:`/chat`,page:`chat`,ico:`fa-comments`,txt:`Chat Grupal`},...k],nvright:[{href:`/rrhh`,page:`rrhh`,ico:`fa-users-gear`,txt:`RRHH`},{href:`/precios`,page:`precios`,ico:`fa-tags`,txt:`Precios`},{isPerfil:!0},{isSalir:!0}]},admin:{nvleft:[{href:`/admin`,page:`admin`,ico:`fa-globe`,txt:`Plataforma`},{href:`/usuarios`,page:`usuarios`,ico:`fa-users`,txt:`Usuarios`},{href:`/permisos`,page:`permisos`,ico:`fa-lock`,txt:`Permisos`},{href:`/sistema`,page:`sistema`,ico:`fa-cogs`,txt:`Sistema`},{href:`/chat`,page:`chat`,ico:`fa-comments`,txt:`Chat Grupal`}],nvright:[{href:`/mifcm`,page:`mifcm`,ico:`fa-bell`,txt:`Mi FCM`},{href:`/word`,page:`word`,ico:`fa-rocket`,txt:`Planificar`},{href:`/nuevo`,page:`nuevo`,ico:`fa-plus`,txt:`Post`},{href:`/notas`,page:`notas`,ico:`fa-comments`,txt:`Book`},{isPerfil:!0},{isSalir:!0}]},verificar:{nvleft:[],nvright:[]}},j=[{path:`/inicio`,area:`web/`},{path:`/login`,area:`web/`},{path:`/emojis`,area:`web/`},{path:`/registrado`,area:`web/`},{path:`/blog`,area:`web/blog/`},{path:`/post`,area:`web/blog/`},{path:`/chatwil`,area:`web/chatwil/`},{path:`/acerca`,area:`web/acerca/`},{path:`/descubre`,area:`web/acerca/`},{path:`/terminos`,area:`web/acerca/`},{path:`/cookies`,area:`web/acerca/`},{path:`/privacidad`,area:`web/acerca/`},{path:`/feedback`,area:`web/acerca/`},{path:`/contacto`,area:`web/acerca/`},{path:`/agregar`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/smile`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/notas`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/perfil`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/mensajes`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/word`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/nuevo`,area:`web/blog/`,roles:[`smile`,`gestor`,`admin`]},{path:`/registrar`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/ranking`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/historial`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/tours`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/avisar`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/chat`,area:`smile/`,roles:[`smile`,`gestor`,`admin`]},{path:`/rrhh`,area:`gestor/`,roles:[`gestor`,`admin`]},{path:`/precios`,area:`gestor/`,roles:[`gestor`,`admin`]},{path:`/gestor`,area:`gestor/`,roles:[`gestor`,`admin`]},{path:`/admin`,area:`admin/`,roles:[`admin`]},{path:`/usuarios`,area:`admin/`,roles:[`admin`]},{path:`/permisos`,area:`admin/`,roles:[`admin`]},{path:`/sistema`,area:`admin/`,roles:[`admin`]},{path:`/mifcm`,area:`admin/`,roles:[`admin`]},{path:`/verificar`,area:`verificar/`,roles:[`admin`]}],M=Object.assign({"./admin/admin.js":()=>O(()=>import(`./admin-YpbZt1Ra.js`),__vite__mapDeps([0])),"./admin/fcm.js":()=>O(()=>import(`./fcm-Bs8gsFCf.js`),[]),"./admin/mifcm.js":()=>O(()=>import(`./mifcm-DrR-0Srm.js`),__vite__mapDeps([1])),"./admin/permisos.js":()=>O(()=>import(`./permisos-BV0s9war.js`),__vite__mapDeps([2])),"./admin/sistema.js":()=>O(()=>import(`./sistema-N4dKeIPD.js`),__vite__mapDeps([3])),"./admin/usuarios.js":()=>O(()=>import(`./usuarios-_1T6fI_c.js`),__vite__mapDeps([4])),"./gestor/gestor.js":()=>O(()=>import(`./gestor-OypiMmyL.js`),[]),"./gestor/precios.js":()=>O(()=>import(`./precios-B6ds9Hox.js`),__vite__mapDeps([5])),"./gestor/rrhh.js":()=>O(()=>import(`./rrhh-CGJ6hNNc.js`),__vite__mapDeps([6])),"./gestor/trabajadores.js":()=>O(()=>import(`./trabajadores-KYHHSMef.js`),[]),"./smile/agregar.js":()=>O(()=>import(`./agregar-C_BmfrFI.js`),__vite__mapDeps([7])),"./smile/avisar.js":()=>O(()=>import(`./avisar-DYSuvMY8.js`),__vite__mapDeps([8])),"./smile/chat.js":()=>O(()=>import(`./chat-BOAs6eaD.js`),__vite__mapDeps([9])),"./smile/crear.js":()=>O(()=>import(`./crear-DeR1vI0M.js`),__vite__mapDeps([10])),"./smile/historial.js":()=>O(()=>import(`./historial-BfoxZoeT.js`),__vite__mapDeps([11])),"./smile/mensajes.js":()=>O(()=>import(`./mensajes-Bhi2tiYf.js`),__vite__mapDeps([12])),"./smile/metricas.js":()=>O(()=>import(`./metricas-OeL1ReY-.js`),__vite__mapDeps([13])),"./smile/notas.js":()=>O(()=>import(`./notas-D8rIPC5s.js`),__vite__mapDeps([14])),"./smile/perfil.js":()=>O(()=>import(`./perfil-BSih1Bn8.js`),__vite__mapDeps([15])),"./smile/ranking.js":()=>O(()=>import(`./ranking-CFxS5_4u.js`),__vite__mapDeps([16])),"./smile/registrar.js":()=>O(()=>import(`./registrar-CCMkmOxb.js`),__vite__mapDeps([17])),"./smile/smile.js":()=>O(()=>import(`./smile-B0AZ5kMZ.js`),__vite__mapDeps([18])),"./smile/tours.js":()=>O(()=>import(`./tours-CDNVRc50.js`),__vite__mapDeps([19])),"./smile/win.js":()=>O(()=>import(`./win-DMen6RJj.js`),__vite__mapDeps([20])),"./smile/word.js":()=>O(()=>import(`./word-_xoKmgq4.js`),__vite__mapDeps([21])),"./smile/zsmile.js":()=>O(()=>import(`./zsmile-Bz5WYaFS.js`),[]),"./verificar/verificar.js":()=>O(()=>import(`./verificar-9sPboIqf.js`),__vite__mapDeps([22])),"./web/404.js":()=>O(()=>import(`./404-OlTui3V7.js`),[]),"./web/acerca/acerca.js":()=>O(()=>import(`./acerca-BbSaaPH7.js`),__vite__mapDeps([23])),"./web/acerca/contacto.js":()=>O(()=>import(`./contacto-ClKjZpYR.js`),__vite__mapDeps([23,24])),"./web/acerca/cookies.js":()=>O(()=>import(`./cookies-BdPONwee.js`),__vite__mapDeps([23])),"./web/acerca/descubre.js":()=>O(()=>import(`./descubre-C9C-uQtj.js`),__vite__mapDeps([25])),"./web/acerca/feedback.js":()=>O(()=>import(`./feedback-B7trq0JY.js`),__vite__mapDeps([23])),"./web/acerca/privacidad.js":()=>O(()=>import(`./privacidad-CNcvGNiM.js`),__vite__mapDeps([23])),"./web/acerca/terminos.js":()=>O(()=>import(`./terminos-DkH_jLIb.js`),__vite__mapDeps([23])),"./web/blog/blog.js":()=>O(()=>import(`./blog-Cm1vCGjV.js`),__vite__mapDeps([26])),"./web/blog/nuevo.js":()=>O(()=>import(`./nuevo-B5KVCMdm.js`),__vite__mapDeps([27])),"./web/blog/post.js":()=>O(()=>import(`./post-DPztbb7w.js`),__vite__mapDeps([28])),"./web/blog/woo.js":()=>O(()=>import(`./woo-DzoyYbJ8.js`),[]),"./web/chatwil/chatwil.js":()=>O(()=>import(`./chatwil-BsPfKvor.js`),__vite__mapDeps([29])),"./web/chatwil/config.js":()=>O(()=>import(`./config-CueSkq2Q.js`),[]),"./web/chatwil/contexto.js":()=>O(()=>import(`./contexto-CN5_NjMF.js`),[]),"./web/chatwil/datawii.js":()=>O(()=>import(`./datawii-MGnarJp0.js`),[]),"./web/chatwil/waa.js":()=>O(()=>import(`./waa-BSRlNFQl.js`),[]),"./web/emojis.js":()=>O(()=>import(`./emojis-D-5Qykts.js`),__vite__mapDeps([30])),"./web/login.js":()=>O(()=>import(`./login-flym0Qrv.js`),__vite__mapDeps([31])),"./web/precios.js":()=>O(()=>import(`./precios-DcRvAAMJ.js`),__vite__mapDeps([32])),"./web/registrado.js":()=>O(()=>import(`./registrado-DGZG8A81.js`),__vite__mapDeps([33]))}),N=(e,t)=>M[`./${e}${t}.js`],P=new class{constructor(){this.rutas={},this.cache={"/inicio":m},this.modActual=null,this.cargand=!1,this.HOME=`inicio`,this.main=`#wimain`,this.pathActual=null,this.isFirstLoad=!0}register(e,t){this.rutas[e]=t}inicio(){return Promise.resolve(m)}registerAll(e){let t={},n={};j.forEach(({path:e,area:r,roles:i=null,mod:a})=>{if(e===`/inicio`){t[e]=()=>this.inicio();return}let o=a??e.split(`/`).pop(),s=N(r,o);if(!s){console.warn(`[ruta] no encontrado: ${r}${o}.js`);return}i===null?t[e]=s:(n[e]??=[]).push({roles:i,imp:s})});let r=()=>Promise.resolve({render:()=>``,init:()=>setTimeout(()=>this.navigate(`/login`),0)});new Set([...Object.keys(t),...Object.keys(n)]).forEach(i=>{let a=t[i],o=n[i]||[],s=()=>{let t=e?.()||null;return o.find(e=>e.roles.includes(t))};if(!o.length)return this.register(i,a);if(!a)return this.register(i,()=>{let e=s();return e?e.imp():r()});this.register(i,()=>{let e=s();return e?e.imp():a()})})}async prefetch(e){let t=c.limpiar(e)===`/`?`/${this.HOME}`:c.limpiar(e);if(!(this.cache[t]||!this.rutas[t]))try{this.cache[t]=await this.rutas[t](),console.log(`⚡ Listo ${t.replace(`/`,``)}`)}catch{console.warn(`[ruta] prefetch falló:`,t)}}async navigate(e,n=!0){if(this.cargand)return;this.cargand=!0;let r=c.limpiar(e)===`/`?`/${this.HOME}`:c.limpiar(e);if([`/admin`,`/usuarios`,`/permisos`,`/sistema`,`/mifcm`].includes(r)){let{getls:e}=await O(async()=>{let{getls:e}=await import(`./widev-8sJg4_cC.js`).then(e=>e.D);return{getls:e}},[]),t=e(`wiSmile`),n=e=>(this.cargand=!1,this.navigate(e,!0)),r=!t||t.rol!==`admin`?`/`:t.estado===`activo`?sessionStorage.getItem(`vault_unlocked`)?null:`/verificar`:`/registrado`;if(r)return n(r)}try{this.modActual?.cleanup?.();let e=this.rutas[r]?null:r.slice(1),i=e?N(`web/blog/`,`post`):this.rutas[r]??N(`web/`,`404`),a=this.cache[r]??await i();e||(this.cache[r]=a);let[o]=await Promise.all([a.render(e)]);document.body.classList.remove(`is-public-profile`),this.marcarNav(r),window.dispatchEvent(new CustomEvent(`winavigate`,{detail:{norm:r}})),this.isFirstLoad&&t(this.main).children().length>0&&!window.__WIREADY__&&r===`/${this.HOME}`?this.isFirstLoad=!1:await p(this.main,o),this.isFirstLoad=!1,window.scrollTo(0,0),a.init?.(e),n&&c.poner(r===`/${this.HOME}`?`/`:r,document.title),this.pathActual=r,this.modActual=a}catch(e){if(e instanceof TypeError&&e.message.includes(`Failed to fetch`))return location.reload();u(`Error en la ruta`),console.error(`[ruta] navigate:`,e)}finally{this.cargand=!1}}marcarNav(e){let n=e.slice(1)||this.HOME;t(`.nv_item`).removeClass(`active`),t(`.nv_item[data-page="${n}"]`).addClass(`active`)}init(){this.marcarNav(c.actual===`/`?`/${this.HOME}`:c.limpiar(c.actual)),t(document).on(`click`,`.nv_item`,e=>{e.preventDefault();let n=t(e.currentTarget).data(`page`);this.navigate(n===this.HOME?`/`:`/${n}`)}).on(`mouseenter touchstart`,`.nv_item[data-page]`,e=>{let n=t(e.currentTarget).data(`page`);this.prefetch(n===this.HOME?`/`:`/${n}`)}),window.addEventListener(`popstate`,e=>{let t=e.state?.ruta||c.actual;(c.limpiar(t)===`/`?`/${this.HOME}`:c.limpiar(t))!==this.pathActual&&this.navigate(t,!1)}),this.navigate(c.actual,!1)}};P.registerAll(()=>l(`wiSmile`)?.rol),P.register(`/`,(e=!1)=>{let t=l(`wiSmile`);return t&&!e&&setTimeout(()=>P.navigate({smile:`/smile`,gestor:`/gestor`,admin:`/admin`}[t.rol]||`/smile`),0),P.inicio()}),P.init(),O(()=>import(`./header-BE8C3nmF.js`),[]),O(()=>import(`./footer-C1fmuSHB.js`),[]),f({css:[`https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap`,`https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap`,`https://fonts.googleapis.com/css2?family=Rubik:wght@300..900&display=swap`]});export{P as n,O as r,A as t};