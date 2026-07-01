import type { Service, ServiceId } from "@/data/services";

type Props = {
  services: Service[];
  activeId: ServiceId;
  onNavigate: (id: ServiceId) => void;
};

export default function LeftPanel({ services, activeId, onNavigate }: Props) {
  return (
    <aside className="left-panel" aria-label="Introducción y navegación por servicios">
      <div className="brand-row">
        <div className="mark" aria-hidden="true"><span /></div>
        <span>AMZ Creatives</span>
      </div>

      <section className="hero-copy">
        <p className="eyebrow">Pack Premium para negocios locales</p>
        <h1>Gestión integral de redes para negocios que quieren verse grandes.</h1>
        <p className="lead">Creamos, publicamos, gestionamos y medimos el contenido de tu marca para ayudarte a llegar a más personas cada mes.</p>

        <div className="benefits" aria-label="Beneficios principales">
          <div><span>✦</span> Instagram, TikTok, Shorts y Google</div>
          <div><span>◷</span> Estrategia mensual con dirección</div>
          <div><span>▣</span> Reels, carruseles y stories diarias</div>
          <div><span>◌</span> Comunidad, mensajes y reseñas</div>
          <div><span>▴</span> Informes claros para mejorar</div>
        </div>

        <div className="hero-actions">
          <button className="primary-btn" type="button" onClick={() => onNavigate("plataformas")}>Ver qué incluye <span>→</span></button>
          <div className="price-pill"><strong>Premium</strong><span>1.199 €/mes</span></div>
        </div>
      </section>

      <nav className="steps-box" aria-label="Secciones del servicio">
        <p>Qué gestionamos por ti</p>
        {services.map((service) => (
          <button
            key={service.id}
            className={`step-link${activeId === service.id ? " is-active" : ""}`}
            type="button"
            onClick={() => onNavigate(service.id)}
          >
            <span>{service.label}</span>
            <strong>{service.number}</strong>
          </button>
        ))}
      </nav>
    </aside>
  );
}
