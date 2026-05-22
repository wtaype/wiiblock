import{n as e}from"./vendor-BBPjS4yS.js";import{c as t,n,s as r,t as i}from"./wii-DZw4TcJ0.js";import{d as a,m as o}from"./widev-Bh2jKAWA.js";function s(){return`
  <footer class="foo">
    <div class="foo_inner">
      <div class="foo_left">
        <div class="foo_brand">
          <span class="foo_app"><a href="/">${i}</a></span>
          <span class="foo_ver">v10</span>
        </div>
        <div class="foo_links">
          <a href="/acerca"   class="foo_link nv_item" data-page="acerca"  ><i class="fas fa-circle-info"></i> Acerca</a>
          <a href="/terminos"   class="foo_link nv_item" data-page="terminos"  ><i class="fas fa-file-contract"></i> Términos</a> 
          <a href="/cookies"    class="foo_link nv_item" data-page="cookies"   ><i class="fas fa-cookie-bite"></i> Cookies</a>
          <a href="/privacidad" class="foo_link nv_item" data-page="privacidad"><i class="fas fa-lock"></i> Privacidad</a>
          <a href="/feedback"   class="foo_link nv_item" data-page="feedback"  ><i class="fas fa-comment-dots"></i> Feedback</a>
          <a href="/contacto"   class="foo_link nv_item" data-page="contacto"  ><i class="fas fa-envelope"></i> Contacto</a>
          </div>
          </div>
          <div class="foo_right">
          <span>Creado con <i class="fas fa-heart" style="color:var(--mco);"></i> by <a href="${t}" target="_blank"><strong>${n}</strong></a> ${r} - ${new Date().getFullYear()}</span>
          </div>
          </div>
          </footer>
          `}e(`.foo`).length||e(`body`).append(s()),e(`#wi_bg_style`).length||e(`head`).append(`<style id="wi_bg_style">:root{--bgim:url("/wpuntos.svg")}body{background: var(--bgim), var(--bg)}</style>`);var c=`cookies`,l=t=>{o(c,t),e(`#cookies`).removeClass(`cookies_show`),setTimeout(()=>e(`#cookies`).remove(),150)};e(document).on(`pointerdown`,`#ck_aceptar`,()=>l(!0)),e(document).on(`pointerdown`,`#ck_rechazar`,()=>l(!1)),a(c)?e(`#cookies`).remove():(e(`#cookies`).length||e(`body`).append(`
<div class="cookiess cookiess_show" id="cookies" role="dialog" aria-live="polite" aria-label="Consentimiento de Cookies">
    <p class="cookiess_txt"><i class="fas fa-cookie-bite cookiess_ico"></i>Usamos almacenamiento local para guardar tus preferencias de tema y configuración de privacidad de forma segura.
    <a class="cookiess_link nv_item" href="/cookies">Más info</a></p>
    <div class="cookiess_btns"><button class="cookiess_aceptar" id="ck_aceptar"><i class="fas fa-check"></i> Entendido</button>
    <button class="cookiess_rechazar" id="ck_rechazar">Cerrar</button></div>
  </div>`),setTimeout(()=>e(`#cookies`).addClass(`cookies_show`),800));export{s as footer};