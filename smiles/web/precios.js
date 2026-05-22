import './precios.css';
import { app, version } from '../wii.js';
import { wiVista } from '../widev.js';

const planes = [
  {
    id: 'gratis', color: '#8b9bb4', name: 'Gratis', desc: 'Todo lo básico para empezar tu viaje digital.', price: '0',
    btn: 'Comenzar Gratis', btnType: 'outline',
    features: [
      { t: '1 Perfil Linkwii', v: true },
      { t: 'Enlaces ilimitados', v: true },
      { t: '3 Temas estándar', v: true },
      { t: 'Analíticas básicas (7 días)', v: true },
      { t: 'Marca de agua Linkwii', v: true },
      { t: 'Dominios personalizados', v: false }
    ]
  },
  {
    id: 'pro', color: '#0EBEFF', name: 'Pro', desc: 'Para creadores de contenido que quieren más.', price: '9',
    btn: 'Elegir Pro', btnType: 'outline',
    features: [
      { t: 'Todo lo de Gratis, más:', v: true },
      { t: 'Temas premium desbloqueados', v: true },
      { t: 'Analíticas avanzadas (90 días)', v: true },
      { t: 'Sin marca de agua', v: true },
      { t: 'Íconos animados en links', v: true },
      { t: 'Soporte prioritario por email', v: true }
    ]
  },
  {
    id: 'promax', color: '#7000FF', name: 'Pro Max', desc: 'La herramienta definitiva para escalar tu audiencia.', price: '15',
    btn: 'Obtener Pro Max', btnType: 'solid', destacado: true,
    features: [
      { t: 'Todo lo de Pro, más:', v: true },
      { t: 'Hasta 3 Perfiles Linkwii', v: true },
      { t: 'Integración Mailchimp / GA4', v: true },
      { t: 'Formularios de captura (Leads)', v: true },
      { t: 'Botones de pago (Stripe/PayPal)', v: true },
      { t: 'Soporte VIP 24/7', v: true }
    ]
  },
  {
    id: 'negocio', color: '#FF8C00', name: 'Negocio', desc: 'Para tiendas y equipos que facturan en línea.', price: '20',
    btn: 'Elegir Negocio', btnType: 'outline',
    features: [
      { t: 'Todo lo de Pro Max, más:', v: true },
      { t: 'Dominio personalizado (.com)', v: true },
      { t: 'Módulo de e-commerce nativo', v: true },
      { t: 'Colaboradores (Hasta 5 admin)', v: true },
      { t: 'Catálogo de productos (50 items)', v: true },
      { t: 'API y Webhooks disponibles', v: true }
    ]
  },
  {
    id: 'empresa', color: '#29C72E', name: 'Empresa', desc: 'Soluciones a medida para grandes corporaciones.', price: 'Hablemos',
    btn: 'Contactar Ventas', btnType: 'outline', customPrice: true,
    features: [
      { t: 'Perfiles ilimitados', v: true },
      { t: 'Infraestructura en servidor dedicado', v: true },
      { t: 'SLA garantizado del 99.9%', v: true },
      { t: 'Gestor de éxito de cuenta asignado', v: true },
      { t: 'Desarrollo de integraciones a medida', v: true },
      { t: 'Facturación corporativa', v: true }
    ]
  }
];

export const render = () => `
<div class="pr_wrap">
  <div class="pr_hero pr_anim" style="--d:0s">
    <div class="pr_badge"><i class="fas fa-tag"></i> Transparente y Sin Sorpresas</div>
    <h1 class="pr_title">Precios diseñados <span class="pr_grad">para escalar</span></h1>
    <p class="pr_desc">Ya sea que estés empezando o manejes una agencia global, tenemos el plan perfecto para maximizar tus conversiones a través de tu Link in Bio.</p>
  </div>
  
  <div class="pr_grid">
    ${planes.map((p, i) => `
      <div class="pr_card wi_fadeUp ${p.destacado ? 'destacado' : ''}" style="--cc:${p.color}; --d:${i * 0.15}s">
        ${p.destacado ? `<div class="pr_popular"><i class="fas fa-star"></i> Más Elegido</div>` : ''}
        
        <div class="pr_head">
          <div class="pr_name"><i class="fas fa-circle" style="font-size: .4em;"></i> ${p.name}</div>
          <div class="pr_desc_card">${p.desc}</div>
          <div class="pr_price_wrap">
            ${p.customPrice ? `
              <div class="pr_price" style="font-size:2.8rem">${p.price}</div>
            ` : `
              <div class="pr_price_sim">$</div>
              <div class="pr_price">${p.price}</div>
              <div class="pr_price_per">USD / mes</div>
            `}
          </div>
        </div>
        
        <ul class="pr_features">
          ${p.features.map(f => `
            <li class="pr_feat ${f.v ? '' : 'no'}">
              <i class="fas ${f.v ? 'fa-check' : 'fa-xmark'}"></i>
              <span>${f.t}</span>
            </li>
          `).join('')}
        </ul>
        
        <a href="/p/login" class="pr_btn pr_btn_${p.btnType}">${p.btn}</a>
      </div>
    `).join('')}
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
`;

export const init = () => {
  wiVista('.pr_card, .pr_anim', null, { anim: 'pr_anim', stagger: 80 });
  console.log(`💳 ${app} ${version} · Precios OK`);
};

export const cleanup = () => {
  console.log('🧹 Precios limpiado');
};
