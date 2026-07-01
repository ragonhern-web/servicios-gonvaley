import type { Service } from "@/data/services";
import type { Platform, PlatformId } from "@/data/platforms";
import { withBasePath } from "@/utils/basePath";
import StrategyCalendar from "./StrategyCalendar";

type Props = {
  visual: Service["visual"];
  platforms?: Platform[];
  selectedPlatformId?: PlatformId;
};

export function VisualCard({ visual, platforms, selectedPlatformId }: Props) {
  if (visual === "platforms") return <PlatformsVisual platforms={platforms ?? []} selectedPlatformId={selectedPlatformId} />;
  if (visual === "strategy") return <StrategyCalendar />;
  if (visual === "content") return <ContentVisual />;
  if (visual === "community") return <CommunityVisual />;
  return <ReportsVisual />;
}

function PlatformsVisual({ platforms, selectedPlatformId }: { platforms: Platform[]; selectedPlatformId?: PlatformId }) {
  return (
    <div className="visual-card platform-visual">
      <div className="visual-glow" />
      <div className="platform-showcase">
        {platforms.map((platform) => {
          const isSelected = platform.id === selectedPlatformId;
          return (
            <div key={platform.id} className={`platform-phone${isSelected ? " is-selected" : ""}`}>
              {platform.mockup.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="platform-phone-image" src={withBasePath(platform.mockup.image)} alt={platform.mockup.label} />
              ) : (
                <>
                  <div className="platform-phone-top" />
                  <div className="platform-phone-header">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="platform-logo" src={withBasePath(platform.logo)} alt="" aria-hidden="true" />
                    <strong>{platform.mockup.label}</strong>
                  </div>
                  <div className="platform-phone-feed">
                    <span>{platform.mockup.heading}</span>
                    <div className="platform-phone-feed-grid"><i /><i /><i /><i /><i /><i /></div>
                    <p>{platform.mockup.detail}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContentVisual() {
  return (
    <div className="visual-card content-visual">
      <div className="phone-mockup">
        <div className="phone-top" />
        <div className="story-row"><span /><span /><span /><span /></div>
        <div className="reel-preview">
          <span>REEL</span>
          <strong>8-10 vídeos/mes</strong>
          <p>Grabación, edición y adaptación a cada plataforma.</p>
        </div>
        <div className="feed-row"><div /><div /><div /></div>
      </div>
      <div className="floating-post post-one"><strong>8</strong><span>posts/carruseles</span></div>
      <div className="floating-post post-two"><strong>Stories</strong><span>diarias</span></div>
      <div className="floating-post post-three"><strong>2</strong><span>sesiones foto/mes</span></div>
    </div>
  );
}

function CommunityVisual() {
  return (
    <div className="visual-card community-visual">
      <div className="inbox-panel">
        <div className="panel-top"><strong>Bandeja de comunidad</strong><span>En directo</span></div>
        <div className="message-row active"><span className="avatar" /><div><strong>¿Tenéis disponibilidad?</strong><p>Respondido con información y CTA.</p></div><em>DM</em></div>
        <div className="message-row"><span className="avatar alt" /><div><strong>Comentario en reel</strong><p>Respuesta cercana y sin parecer robot.</p></div><em>IG</em></div>
        <div className="message-row"><span className="avatar third" /><div><strong>Nueva reseña 5★</strong><p>Agradecimiento publicado.</p></div><em>Google</em></div>
      </div>
      <div className="review-card"><span>★★★★★</span><strong>Imagen profesional</strong><p>Reseñas y mensajes cuidados para que el negocio transmita confianza.</p></div>
    </div>
  );
}

function ReportsVisual() {
  return (
    <div className="visual-card report-visual">
      <div className="dashboard-top">
        <div><span>Informe mensual</span><strong>Resultados claros</strong></div>
        <small>Actualizado</small>
      </div>
      <div className="kpi-grid">
        <article><span>Alcance</span><strong>+32%</strong></article>
        <article><span>Interacciones</span><strong>+18%</strong></article>
        <article><span>Visitas perfil</span><strong>+24%</strong></article>
      </div>
      <div className="chart-card">
        <div className="bar b1" /><div className="bar b2" /><div className="bar b3" /><div className="bar b4" /><div className="bar b5" /><div className="bar b6" />
        <svg viewBox="0 0 520 180" aria-hidden="true">
          <path d="M20 140 C 90 120, 110 60, 180 84 S 290 152, 350 82 S 445 35, 500 68" fill="none" stroke="rgba(255,255,255,.82)" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="next-steps"><strong>Siguiente mes</strong><span>Duplicar formatos que mejor convierten</span></div>
    </div>
  );
}
