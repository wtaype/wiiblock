import{n as e}from"./vendor-BBPjS4yS.js";import{t}from"./wii-DZw4TcJ0.js";import{O as n}from"./widev-s4H-x_09.js";import{r}from"./index-hqA5NJiq.js";var i=[{ico:`fa-shield-halved`,color:`#0EBEFF`,tag:`Esencial`,tit:`Configuración del Bloqueador`,desc:`Necesarias para recordar el estado de protección activa y tus preferencias.`,items:[`Almacena si el escudo de protección está encendido o apagado.`,`Guarda tus listas blancas y dominios permitidos (exclusiones).`,`Registra las reglas de filtrado personalizadas redactadas por ti.`]},{ico:`fa-hard-drive`,color:`#29C72E`,tag:`Caché Local`,tit:`Tema Estético y Estadísticas`,desc:`Datos locales guardados en tu navegador para agilizar la interfaz y llevar la cuenta de tu protección.`,items:[`Guarda tu tema estético preferido (Cielo, Dulce, Paz, Oro, Mora, Futuro).`,`Mantiene el contador local de anuncios y rastreadores bloqueados acumulados.`,`Toda la información se guarda 100% de forma local y no se transmite a internet.`]}],a=[{ico:`fa-chrome`,color:`#0EBEFF`,tit:`Chrome / Edge`,desc:`Configuración → Privacidad y seguridad → Cookies y otros datos de sitios`},{ico:`fa-firefox-browser`,color:`#FF5C69`,tit:`Firefox`,desc:`Opciones → Privacidad y seguridad → Cookies y datos del sitio`},{ico:`fa-safari`,color:`#29C72E`,tit:`Safari`,desc:`Preferencias → Privacidad → Gestionar datos de sitios web`},{ico:`fa-mobile-screen`,color:`#7000FF`,tit:`Móvil (Android/iOS)`,desc:`Configuración del navegador → Privacidad → Borrar datos de navegación`}],o=()=>`
<main id="wimain">
<div class="ac_wrap tm_wrap">
  <section class="ac_hero tm_hero">
    <div class="ac_hero_orb ac_orb1"></div><div class="ac_hero_orb ac_orb2"></div><div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-cookie-bite"></i> Seguridad e Integridad</div>
      <h1 class="ac_hero_tit">Uso de<br><span class="ac_grad">Datos Locales</span></h1>
      <p class="ac_hero_sub">Te explicamos cómo usamos el almacenamiento local y la caché técnica de tu navegador para garantizar el funcionamiento rápido y privado de la extensión.</p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-ban"></i> Cero anuncios</span>
        <span class="tm_chip"><i class="fas fa-user-shield"></i> Datos Protegidos</span>
        <span class="tm_chip"><i class="fas fa-lock"></i> Uso 100% Local</span>
      </div>
      <div class="tm_last_upd"><i class="fas fa-calendar-check"></i> Última actualización: Mayo ${n()} · Versión v10</div>
    </div>
  </section>

  <section class="ac_sec">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-list-check"></i> Almacenamiento</div>
      <h2 class="ac_sec_tit">Almacenamiento <span class="ac_grad">técnico local</span></h2>
      <p class="ac_sec_sub">Toda la información reside 100% de manera local y no se comparte con ningún servidor externo.</p>
    </div>
    <div class="ck_grid">
      ${i.map(e=>`
        <div class="ck_card wi_fadeUp">
          <div class="ck_card_top">
            <div class="tm_sec_ico" style="--tc:${e.color}"><i class="fas ${e.ico}"></i></div>
            <span class="ck_tag" style="background:color-mix(in srgb,${e.color} 15%,transparent);color:${e.color}">${e.tag}</span>
          </div>
          <h3 class="ck_tit">${e.tit}</h3>
          <p class="ck_desc">${e.desc}</p>
          <ul class="tm_list">${e.items.map(e=>`<li><i class="fas fa-check"></i>${e}</li>`).join(``)}</ul>
        </div>`).join(``)}
    </div>
  </section>

  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-sliders"></i> Control</div>
      <h2 class="ac_sec_tit">Cómo <span class="ac_grad">gestionar</span> la caché</h2>
      <p class="ac_sec_sub">Puedes limpiar el almacenamiento de tu navegador si tienes problemas de carga o deseas restablecer tus datos</p>
    </div>
    <div class="ac_feat_grid">
      ${a.map(e=>`
        <div class="ac_feat_card wi_fadeUp" style="--sc:${e.color}">
          <div class="ac_feat_ico"><i class="fab ${e.ico}"></i></div>
          <h3>${e.tit}</h3><p>${e.desc}</p>
        </div>`).join(``)}
    </div>
    <div class="tm_alert" style="max-width:800px;margin:6vh auto 0">
      <i class="fas fa-triangle-exclamation"></i>
      <p>Limpiar el almacenamiento local del navegador restablecerá la configuración del bloqueador, tu tema estético y las estadísticas de anuncios bloqueados a sus valores por defecto.</p>
    </div>
  </section>

</div></main>`,s=null,c=()=>{s=new IntersectionObserver(t=>t.forEach(t=>{t.isIntersecting&&e(t.target).addClass(`visible`)}),{threshold:.1}),e(`.wi_fadeUp`).each(function(){s.observe(this)}),e(document).on(`click.cookies`,`.tm_nav`,function(t){t.preventDefault(),r(()=>import(`./index-hqA5NJiq.js`).then(t=>t.rutas.navigate(e(this).attr(`href`))),[])}),console.log(`🍪 ${t} Cookies cargada`),window.__WIREADY__=!0},l=()=>{s?.disconnect?.(),s=null,e(document).off(`.cookies`)};export{l as cleanup,c as init,o as render};