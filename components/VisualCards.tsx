import type { Service } from "@/data/services";
import type { Platform, PlatformId } from "@/data/platforms";
import { isPlatformAvailable } from "@/data/platforms";
import type { GoogleBusinessLevel, PlanConfig } from "@/data/planConfigs";
import { withBasePath } from "@/utils/basePath";
import StrategyCalendar from "./StrategyCalendar";

type Props = {
  visual: Service["visual"];
  platforms?: Platform[];
  selectedPlatformId?: PlatformId;
  onSelectPlatform?: (id: PlatformId) => void;
  activePlan: PlanConfig;
};

export function VisualCard({ visual, platforms, selectedPlatformId, onSelectPlatform, activePlan }: Props) {
  if (visual === "platforms") {
    return (
      <PlatformsVisual
        platforms={platforms ?? []}
        selectedPlatformId={selectedPlatformId}
        onSelectPlatform={onSelectPlatform}
        activePlan={activePlan}
      />
    );
  }
  if (visual === "strategy") return <StrategyCalendar activePlan={activePlan} />;
  if (visual === "content") return <ContentVisual activePlan={activePlan} />;
  if (visual === "community") return <CommunityVisual activePlan={activePlan} />;
  return <ReportsVisual activePlan={activePlan} />;
}

function PlatformsVisual({
  platforms,
  selectedPlatformId,
  onSelectPlatform,
  activePlan
}: {
  platforms: Platform[];
  selectedPlatformId?: PlatformId;
  onSelectPlatform?: (id: PlatformId) => void;
  activePlan: PlanConfig;
}) {
  const platform = platforms.find((p) => p.id === selectedPlatformId) ?? platforms[0];
  if (!platform) return null;
  const available = isPlatformAvailable(activePlan, platform.id);

  return (
    <div className="visual-card platform-visual">
      <div className="visual-glow" />
      <div className="phone-showcase">
        <div className="phone-device">
          <div className="phone-notch" aria-hidden="true" />
          <div className="phone-screen">
            {!available ? (
              <LockedScreen planName={activePlan.name} />
            ) : platform.id === "google" ? (
              <GoogleBusinessScreen level={activePlan.platforms.googleBusiness} logo={platform.logo} />
            ) : (
              <GenericPlatformScreen platform={platform} />
            )}
          </div>
        </div>

        <div className="platform-selector" role="tablist" aria-label="Selecciona una plataforma">
          {platforms.map((p) => {
            const isAvailable = isPlatformAvailable(activePlan, p.id);
            const isSelected = p.id === selectedPlatformId;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={isAvailable ? p.name : `${p.name} (no disponible en el plan ${activePlan.name})`}
                className={`platform-chip${isSelected ? " is-active" : ""}${isAvailable ? "" : " is-locked"}`}
                onClick={() => onSelectPlatform?.(p.id)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="platform-logo" src={withBasePath(p.logo)} alt="" aria-hidden="true" />
                <strong>{p.mockup.label}</strong>
                {!isAvailable && (
                  <svg className="platform-chip-lock" width="11" height="11" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <rect x="4.5" y="9" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M6.8 9V6.8a3.2 3.2 0 0 1 6.4 0V9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GenericPlatformScreen({ platform }: { platform: Platform }) {
  return (
    <div className="phone-app-screen">
      <div className="phone-app-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="platform-logo" src={withBasePath(platform.logo)} alt="" aria-hidden="true" />
        <strong>{platform.mockup.label}</strong>
      </div>
      <div className="phone-app-feed">
        <span>{platform.mockup.heading}</span>
        <div className="phone-app-feed-grid"><i /><i /><i /><i /><i /><i /></div>
        <p>{platform.mockup.detail}</p>
      </div>
    </div>
  );
}

function GoogleBusinessScreen({ level, logo }: { level: GoogleBusinessLevel; logo: string }) {
  const isComplete = level === "complete";
  return (
    <div className="phone-app-screen">
      <div className="phone-app-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="platform-logo" src={withBasePath(logo)} alt="" aria-hidden="true" />
        <strong>Google Business</strong>
      </div>
      <div className="gmb-status"><span className="gmb-status-dot" /> Ficha activa</div>
      <p className="gmb-cadence">
        {isComplete ? "Publicaciones semanales + gestión activa" : "1 publicación por semana"}
      </p>
      {isComplete && (
        <div className="gmb-extra-grid">
          <span className="gmb-extra-chip">★ Reseñas</span>
          <span className="gmb-extra-chip">▣ Fotos</span>
          <span className="gmb-extra-chip"># Palabras clave</span>
        </div>
      )}
    </div>
  );
}

function LockedScreen({ planName }: { planName: string }) {
  return (
    <div className="phone-locked-screen">
      <svg width="30" height="30" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="4" y="8.6" width="12" height="8.4" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6.6 8.6V6.2a3.4 3.4 0 0 1 6.8 0v2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <strong>Google My Business no está disponible en el plan {planName}.</strong>
      <p>Selecciona Crecimiento o Premium para activarlo.</p>
    </div>
  );
}

function ContentVisual({ activePlan }: { activePlan: PlanConfig }) {
  const storiesLabel = activePlan.storiesDaysPerMonth === "daily" ? "Diarias" : `${activePlan.storiesDaysPerMonth} días/mes`;
  const reelsLabel = `${activePlan.reelsRangeLabel ?? activePlan.reelsPerMonth} vídeos/mes`;
  const hasCreative = activePlan.creativeSessionsPerMonth > 0;

  return (
    <div className="visual-card content-visual">
      <div className="phone-mockup">
        <div className="phone-top" />
        <div className="story-row"><span /><span /><span /><span /></div>
        <div className="reel-preview">
          <span>REEL</span>
          <strong>{reelsLabel}</strong>
          <p>Grabación, edición y adaptación a cada plataforma.</p>
        </div>
        <div className="feed-row"><div /><div /><div /></div>
      </div>
      <div className="floating-post post-one"><strong>{activePlan.postsPerMonth}</strong><span>posts/carruseles</span></div>
      <div className="floating-post post-two"><strong>Stories</strong><span>{storiesLabel}</span></div>
      <div className={`floating-post post-three${hasCreative ? "" : " is-muted"}`}>
        <strong>{hasCreative ? activePlan.creativeSessionsPerMonth : "—"}</strong>
        <span>{hasCreative ? "sesiones foto/mes" : "sin sesión de foto"}</span>
      </div>
      {activePlan.quarterlyVideo && (
        <div className="floating-post post-four"><strong>1</strong><span>vídeo promo/trimestre</span></div>
      )}
    </div>
  );
}

function CommunityVisual({ activePlan }: { activePlan: PlanConfig }) {
  if (!activePlan.communityManagement) {
    return (
      <div className="visual-card community-visual community-locked">
        <div className="locked-panel">
          <svg width="30" height="30" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <rect x="4" y="8.6" width="12" height="8.4" rx="2.2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6.6 8.6V6.2a3.4 3.4 0 0 1 6.8 0v2.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <strong>La gestión de comunidad está disponible desde el plan Crecimiento.</strong>
          <p>Sube de plan para activar respuestas a comentarios y mensajes directos.</p>
        </div>
      </div>
    );
  }

  const highlightReviews = activePlan.platforms.googleBusiness === "complete";

  return (
    <div className="visual-card community-visual">
      <div className="inbox-panel">
        <div className="panel-top"><strong>Bandeja de comunidad</strong><span>En directo</span></div>
        <div className="message-row active"><span className="avatar" /><div><strong>¿Tenéis disponibilidad?</strong><p>Respondido con información y CTA.</p></div><em>DM</em></div>
        <div className="message-row"><span className="avatar alt" /><div><strong>Comentario en reel</strong><p>Respuesta cercana y sin parecer robot.</p></div><em>IG</em></div>
        <div className="message-row"><span className="avatar third" /><div><strong>Nueva reseña 5★</strong><p>Agradecimiento publicado.</p></div><em>Google</em></div>
      </div>
      <div className="review-card">
        <span>★★★★★</span>
        <strong>Imagen profesional</strong>
        <p>Reseñas y mensajes cuidados para que el negocio transmita confianza.</p>
        {highlightReviews && <div className="review-highlight">Reseñas de Google gestionadas activamente</div>}
      </div>
    </div>
  );
}

function ReportsVisual({ activePlan }: { activePlan: PlanConfig }) {
  const kpis =
    activePlan.id === "essential"
      ? [
          { label: "Alcance", value: "+18%" },
          { label: "Interacciones", value: "+9%" },
          { label: "Publicaciones", value: "8/mes" }
        ]
      : activePlan.id === "growth"
      ? [
          { label: "Alcance", value: "+24%" },
          { label: "Interacciones", value: "+14%" },
          { label: "Visitas perfil", value: "+12%" }
        ]
      : [
          { label: "Alcance", value: "+32%" },
          { label: "Interacciones", value: "+18%" },
          { label: "Visitas perfil", value: "+24%" }
        ];

  const nextStep =
    activePlan.id === "essential"
      ? "Sumar Google Business para ganar visibilidad local"
      : activePlan.id === "growth"
      ? "Reforzar reseñas de Google Business"
      : "Duplicar formatos que mejor convierten";

  return (
    <div className="visual-card report-visual">
      <div className="dashboard-top">
        <div><span>Informe mensual</span><strong>Resultados claros</strong></div>
        <small>Actualizado</small>
      </div>
      <div className="kpi-grid">
        {kpis.map((kpi) => (
          <article key={kpi.label}><span>{kpi.label}</span><strong>{kpi.value}</strong></article>
        ))}
      </div>
      <div className="chart-card">
        <div className="bar b1" /><div className="bar b2" /><div className="bar b3" /><div className="bar b4" /><div className="bar b5" /><div className="bar b6" />
        <svg viewBox="0 0 520 180" aria-hidden="true">
          <path d="M20 140 C 90 120, 110 60, 180 84 S 290 152, 350 82 S 445 35, 500 68" fill="none" stroke="rgba(255,255,255,.82)" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>
      <div className="report-scope" aria-label="Qué incluye el informe">
        <span className="report-scope-item is-active">Contenido</span>
        <span className={`report-scope-item${activePlan.communityManagement ? " is-active" : ""}`}>Comunidad</span>
        <span className={`report-scope-item${activePlan.platforms.googleBusiness !== "none" ? " is-active" : ""}`}>Google Business</span>
        <span className={`report-scope-item${activePlan.quarterlyVideo ? " is-active" : ""}`}>Vídeo trimestral</span>
      </div>
      <div className="next-steps"><strong>Siguiente mes</strong><span>{nextStep}</span></div>
    </div>
  );
}
