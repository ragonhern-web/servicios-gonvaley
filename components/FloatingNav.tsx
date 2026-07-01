import type { ServiceId } from "@/data/services";

type Props = {
  onNavigate: (id: ServiceId) => void;
};

export default function FloatingNav({ onNavigate }: Props) {
  return (
    <footer className="floating-nav" aria-label="Navegación rápida">
      <div className="floating-brand"><span className="pause-dot">Ⅱ</span><strong>AMZ Creatives</strong></div>
      <button type="button" onClick={() => onNavigate("plataformas")}>Plataformas</button>
      <button type="button" onClick={() => onNavigate("estrategia")}>Estrategia</button>
      <button type="button" onClick={() => onNavigate("contenido")}>Contenido</button>
      <button type="button" onClick={() => onNavigate("comunidad")}>Comunidad</button>
      <button className="nav-cta" type="button" onClick={() => onNavigate("informes")}>Empezar</button>
    </footer>
  );
}
