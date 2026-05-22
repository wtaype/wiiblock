import{n as e}from"./vendor-BBPjS4yS.js";import{t}from"./wii-DZw4TcJ0.js";import{r as n}from"./index-WaeVJtKe.js";import"./cookies-C5AISacK.js";var r=[{ico:`fa-envelope`,color:`#0EBEFF`,bg:`var(--wb)`,txt:`var(--tx)`,tit:`Contacto por Email`,desc:`Escríbenos directamente a nuestro correo de soporte para cualquier consulta técnica o duda de privacidad.`,url:`mailto:soporte@wiiblock.dev`,cta:`Enviar correo`},{ico:`fa-comment-dots`,color:`#29C72E`,bg:`var(--wb)`,txt:`var(--tx)`,tit:`Formulario de Reportes`,desc:`Reporta anuncios no bloqueados, sitios rotos o solicita nuevas listas de filtros directamente.`,url:`/contacto`,cta:`Abrir Formulario`}],i=[{ico:`fa-bug`,color:`#FF5C69`,tit:`Anuncios no Bloqueados`,desc:`Reporta páginas web específicas donde se logren filtrar banners o pop-ups de anuncios.`},{ico:`fa-circle-exclamation`,color:`#FFDA34`,tit:`Sitio Web Dañado (Roto)`,desc:`Páginas que presentan errores visuales o no cargan correctamente con la extensión activa.`},{ico:`fa-gears`,color:`#0EBEFF`,tit:`Funcionalidad / Config`,desc:`Propuestas y sugerencias para mejorar el panel de configuración y los filtros personalizados.`},{ico:`fa-lightbulb`,color:`#29C72E`,tit:`Sugerir Filtros Nuevos`,desc:`Solicitud para añadir listas comunitarias predeterminadas a la base de datos de WiiBlock.`}],a=()=>`
<main id="wimain">
<div class="ac_wrap tm_wrap">

  <section class="ac_hero tm_hero">
    <div class="ac_hero_orb ac_orb1"></div><div class="ac_hero_orb ac_orb2"></div><div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-comments"></i> Centro de Retroalimentación</div>
      <h1 class="ac_hero_tit">Soporte y<br><span class="ac_grad">Feedback 💬</span></h1>
      <p class="ac_hero_sub">
        Tus reportes y sugerencias nos ayudan a optimizar las reglas de bloqueo y la velocidad de la extensión.
        <strong>Construyamos juntos una web más limpia.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-bolt"></i> Mejora Continua</span>
        <span class="tm_chip"><i class="fas fa-shield-halved"></i> 100% Privado</span>
        <span class="tm_chip"><i class="fas fa-heart"></i> Apoyo Comunitario</span>
      </div>
    </div>
  </section>

  <section class="ac_sec">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-comments"></i> Canales de ayuda</div>
      <h2 class="ac_sec_tit">¿Cómo reportar <span class="ac_grad">una incidencia?</span></h2>
      <p class="ac_sec_sub">Elige la vía más cómoda para comunicarte con nuestro equipo técnico</p>
    </div>
    <div class="fb_canales">
      ${r.map(e=>`
        <a href="${e.url}" class="fb_canal wi_fadeUp" style="--cc:${e.color}">
          <div class="fb_canal_ico" style="background:${e.bg};color:${e.txt}"><i class="fas ${e.ico}"></i></div>
          <div class="fb_canal_info">
            <strong>${e.tit}</strong>
            <span>${e.desc}</span>
          </div>
          <div class="fb_canal_cta" style="color:${e.color}">${e.cta} <i class="fas fa-arrow-right"></i></div>
        </a>`).join(``)}
    </div>
  </section>

  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-layer-group"></i> Categorías</div>
      <h2 class="ac_sec_tit">¿Qué tipo de problema <span class="ac_grad">presentas?</span></h2>
      <p class="ac_sec_sub">Clasifica tu solicitud para poder responderte de forma óptima</p>
    </div>
    <div class="ac_feat_grid">
      ${i.map(e=>`
        <div class="ac_feat_card wi_fadeUp" style="--sc:${e.color}">
          <div class="ac_feat_ico"><i class="fas ${e.ico}"></i></div>
          <h3>${e.tit}</h3><p>${e.desc}</p>
        </div>`).join(``)}
    </div>
  </section>

</div></main>`,o=null,s=()=>{o=new IntersectionObserver(t=>t.forEach(t=>{t.isIntersecting&&e(t.target).addClass(`visible`)}),{threshold:.1}),e(`.wi_fadeUp`).each(function(){o.observe(this)}),e(document).on(`click.feedback`,`.fb_canal`,function(t){let r=e(this).attr(`href`);r&&r.startsWith(`/`)&&(t.preventDefault(),n(()=>import(`./index-WaeVJtKe.js`).then(e=>e.rutas.navigate(r)),[]))}),console.log(`💬 ${t} Feedback cargado`)},c=()=>{o?.disconnect?.(),o=null,e(document).off(`.feedback`)};export{c as cleanup,s as init,a as render};