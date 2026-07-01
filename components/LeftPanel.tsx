import type { Service, ServiceId } from "@/data/services";
import type { PlanConfig } from "@/data/planConfigs";
import FunnelProgress from "./FunnelProgress";

type Props = {
  services: Service[];
  activeId: ServiceId;
  onNavigate: (id: ServiceId) => void;
  activePlan: PlanConfig;
};

export default function LeftPanel({ services, activeId, onNavigate, activePlan }: Props) {
  const platformsLine = `Instagram, TikTok y Shorts${activePlan.platforms.googleBusiness !== "none" ? " y Google" : ""}`;
  const storiesLine = `Reels, carruseles y stories ${activePlan.storiesDaysPerMonth === "daily" ? "diarias" : `${activePlan.storiesDaysPerMonth} días/mes`}`;
  const communityLine = activePlan.communityManagement
    ? "Comunidad, mensajes y reseñas"
    : "Comunidad y mensajes no incluidos";

  return (
    <aside className="left-panel" aria-label="Introducción y navegación por servicios">
      <div className="brand-row">
        <div className="mark" aria-hidden="true"><span /></div>
        <span>AMZ Creatives</span>
      </div>

      <div className="left-scroll">
        <section className="hero-copy">
          <p className="eyebrow">Pack {activePlan.name} para negocios locales</p>
          <h1>Gestión integral de redes para negocios que quieren verse grandes.</h1>
          <p className="lead">Creamos, publicamos, gestionamos y medimos el contenido de tu marca para ayudarte a llegar a más personas cada mes.</p>

          <div className="benefits" aria-label="Beneficios principales">
            <div><span>✦</span> {platformsLine}</div>
            <div><span>◷</span> Estrategia mensual con dirección</div>
            <div><span>▣</span> {storiesLine}</div>
            <div><span>◌</span> {communityLine}</div>
            <div><span>▴</span> Informes claros para mejorar</div>
          </div>

          <div className="hero-actions">
            <button className="primary-btn" type="button" onClick={() => onNavigate("plataformas")}>Ver qué incluye <span>👀</span></button>
            <div className="price-pill"><strong>{activePlan.name}</strong><span>{activePlan.price}</span></div>
          </div>
        </section>

        <FunnelProgress services={services} activeId={activeId} onNavigate={onNavigate} />
      </div>
    </aside>
  );
}
