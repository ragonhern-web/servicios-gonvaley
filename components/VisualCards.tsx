import type { Service } from "@/data/services";

type Props = {
  visual: Service["visual"];
};

export function VisualCard({ visual }: Props) {
  if (visual === "platforms") return <PlatformsVisual />;
  if (visual === "strategy") return <StrategyVisual />;
  if (visual === "content") return <ContentVisual />;
  if (visual === "community") return <CommunityVisual />;
  return <ReportsVisual />;
}

function PlatformsVisual() {
  return (
    <div className="visual-card platform-visual">
      <div className="visual-glow" />
      <div className="browser-card large">
        <div className="browser-dots"><span /><span /><span /></div>
        <h3>Presencia conectada</h3>
        <p>Una estrategia. Cuatro puntos de contacto. Cero cuentas criando polvo digital.</p>
        <div className="platform-grid">
          <article><div className="icon insta" /><strong>Instagram</strong><span>Feed, stories y reels</span></article>
          <article><div className="icon tiktok" /><strong>TikTok</strong><span>Vídeo corto local</span></article>
          <article><div className="icon shorts" /><strong>Shorts</strong><span>Contenido vertical</span></article>
          <article><div className="icon google" /><strong>Google Business</strong><span>Búsqueda y reseñas</span></article>
        </div>
      </div>
      <div className="mini-stat stat-a"><strong>4</strong><span>canales activos</span></div>
      <div className="mini-stat stat-b"><strong>Local</strong><span>orientado a zona</span></div>
    </div>
  );
}

function StrategyVisual() {
  return (
    <div className="visual-card strategy-visual">
      <div className="calendar-header">
        <div><span>Plan mensual</span><strong>Julio</strong></div>
        <button type="button">Objetivos</button>
      </div>
      <div className="calendar-grid">
        <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span>
        <button className="empty" type="button">1</button><button type="button">2</button><button className="tag reel" type="button">3 Reel</button><button type="button">4</button><button className="tag story" type="button">5 Stories</button><button type="button">6</button><button type="button">7</button>
        <button className="tag carousel" type="button">8 Carrusel</button><button type="button">9</button><button type="button">10</button><button className="tag gmb" type="button">11 Google</button><button type="button">12</button><button type="button">13</button><button type="button">14</button>
        <button type="button">15</button><button className="tag reel" type="button">16 Reel</button><button type="button">17</button><button type="button">18</button><button className="tag promo" type="button">19 Promo</button><button type="button">20</button><button type="button">21</button>
        <button className="tag carousel" type="button">22 Carrusel</button><button type="button">23</button><button className="tag reel" type="button">24 Reel</button><button type="button">25</button><button type="button">26</button><button type="button">27</button><button type="button">28</button>
      </div>
      <div className="objective-stack">
        <span>Visibilidad</span><span>Confianza</span><span>Promoción</span><span>Captación</span>
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
