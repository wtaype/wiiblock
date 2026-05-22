import{t as e}from"./wii-DZw4TcJ0.js";import{T as t}from"./widev-8sJg4_cC.js";var n=[{id:`gratis`,color:`#8b9bb4`,name:`Gratis`,desc:`Todo lo básico para empezar tu viaje digital.`,price:`0`,btn:`Comenzar Gratis`,btnType:`outline`,features:[{t:`1 Perfil Linkwii`,v:!0},{t:`Enlaces ilimitados`,v:!0},{t:`3 Temas estándar`,v:!0},{t:`Analíticas básicas (7 días)`,v:!0},{t:`Marca de agua Linkwii`,v:!0},{t:`Dominios personalizados`,v:!1}]},{id:`pro`,color:`#0EBEFF`,name:`Pro`,desc:`Para creadores de contenido que quieren más.`,price:`9`,btn:`Elegir Pro`,btnType:`outline`,features:[{t:`Todo lo de Gratis, más:`,v:!0},{t:`Temas premium desbloqueados`,v:!0},{t:`Analíticas avanzadas (90 días)`,v:!0},{t:`Sin marca de agua`,v:!0},{t:`Íconos animados en links`,v:!0},{t:`Soporte prioritario por email`,v:!0}]},{id:`promax`,color:`#7000FF`,name:`Pro Max`,desc:`La herramienta definitiva para escalar tu audiencia.`,price:`15`,btn:`Obtener Pro Max`,btnType:`solid`,destacado:!0,features:[{t:`Todo lo de Pro, más:`,v:!0},{t:`Hasta 3 Perfiles Linkwii`,v:!0},{t:`Integración Mailchimp / GA4`,v:!0},{t:`Formularios de captura (Leads)`,v:!0},{t:`Botones de pago (Stripe/PayPal)`,v:!0},{t:`Soporte VIP 24/7`,v:!0}]},{id:`negocio`,color:`#FF8C00`,name:`Negocio`,desc:`Para tiendas y equipos que facturan en línea.`,price:`20`,btn:`Elegir Negocio`,btnType:`outline`,features:[{t:`Todo lo de Pro Max, más:`,v:!0},{t:`Dominio personalizado (.com)`,v:!0},{t:`Módulo de e-commerce nativo`,v:!0},{t:`Colaboradores (Hasta 5 admin)`,v:!0},{t:`Catálogo de productos (50 items)`,v:!0},{t:`API y Webhooks disponibles`,v:!0}]},{id:`empresa`,color:`#29C72E`,name:`Empresa`,desc:`Soluciones a medida para grandes corporaciones.`,price:`Hablemos`,btn:`Contactar Ventas`,btnType:`outline`,customPrice:!0,features:[{t:`Perfiles ilimitados`,v:!0},{t:`Infraestructura en servidor dedicado`,v:!0},{t:`SLA garantizado del 99.9%`,v:!0},{t:`Gestor de éxito de cuenta asignado`,v:!0},{t:`Desarrollo de integraciones a medida`,v:!0},{t:`Facturación corporativa`,v:!0}]}],r=()=>`
<div class="pr_wrap">
  <div class="pr_hero pr_anim" style="--d:0s">
    <div class="pr_badge"><i class="fas fa-tag"></i> Transparente y Sin Sorpresas</div>
    <h1 class="pr_title">Precios diseñados <span class="pr_grad">para escalar</span></h1>
    <p class="pr_desc">Ya sea que estés empezando o manejes una agencia global, tenemos el plan perfecto para maximizar tus conversiones a través de tu Link in Bio.</p>
  </div>
  
  <div class="pr_grid">
    ${n.map((e,t)=>`
      <div class="pr_card wi_fadeUp ${e.destacado?`destacado`:``}" style="--cc:${e.color}; --d:${t*.15}s">
        ${e.destacado?`<div class="pr_popular"><i class="fas fa-star"></i> Más Elegido</div>`:``}
        
        <div class="pr_head">
          <div class="pr_name"><i class="fas fa-circle" style="font-size: .4em;"></i> ${e.name}</div>
          <div class="pr_desc_card">${e.desc}</div>
          <div class="pr_price_wrap">
            ${e.customPrice?`
              <div class="pr_price" style="font-size:2.8rem">${e.price}</div>
            `:`
              <div class="pr_price_sim">$</div>
              <div class="pr_price">${e.price}</div>
              <div class="pr_price_per">USD / mes</div>
            `}
          </div>
        </div>
        
        <ul class="pr_features">
          ${e.features.map(e=>`
            <li class="pr_feat ${e.v?``:`no`}">
              <i class="fas ${e.v?`fa-check`:`fa-xmark`}"></i>
              <span>${e.t}</span>
            </li>
          `).join(``)}
        </ul>
        
        <a href="/p/login" class="pr_btn pr_btn_${e.btnType}">${e.btn}</a>
      </div>
    `).join(``)}
  </div>

  <!-- SECCIÓN COMPROMISO / VENTAS -->
  <div class="pr_trust_sec">
    <div class="pr_trust_head pr_anim" style="--d:0.2s">
      <h2>¿Por qué confiar en <span>Linkwii</span>?</h2>
      <p>No somos solo otra herramienta, somos tus socios tecnológicos para hacer crecer tu marca. Nuestro compromiso es brindarte el servicio más rápido y seguro del mercado.</p>
    </div>
    <div class="pr_trust_grid">
      <div class="pr_trust_card pr_anim" style="--d:0.3s">
        <i class="fas fa-bolt"></i>
        <h3>Velocidad Absoluta</h3>
        <p>Cada milisegundo cuenta. Optimizamos nuestros servidores para que tus enlaces carguen al instante y nunca pierdas un clic por demoras.</p>
      </div>
      <div class="pr_trust_card pr_anim" style="--d:0.4s">
        <i class="fas fa-headset"></i>
        <h3>Soporte Humano 24/7</h3>
        <p>Olvídate de los bots frustrantes. Nuestro equipo está siempre dispuesto a ayudarte a configurar o escalar tu perfil cuando lo necesites.</p>
      </div>
      <div class="pr_trust_card pr_anim" style="--d:0.5s">
        <i class="fas fa-shield-halved"></i>
        <h3>Seguridad Inquebrantable</h3>
        <p>Tu tráfico y datos están encriptados con tecnología bancaria (SSL y protección Anti-DDoS). Tu perfil siempre estará en línea.</p>
      </div>
    </div>
  </div>

</div>
`,i=()=>{t(`.pr_card, .pr_anim`,null,{anim:`pr_anim`,stagger:80}),console.log(`💳 ${e} v10 · Precios OK`)},a=()=>{console.log(`🧹 Precios limpiado`)};export{a as cleanup,i as init,r as render};