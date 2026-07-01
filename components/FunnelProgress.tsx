import type { CSSProperties } from "react";
import type { Service, ServiceId } from "@/data/services";
import StepIcon from "./StepIcon";

type Props = {
  services: Service[];
  activeId: ServiceId;
  onNavigate: (id: ServiceId) => void;
};

export default function FunnelProgress({ services, activeId, onNavigate }: Props) {
  const activeIndex = Math.max(0, services.findIndex((service) => service.id === activeId));
  const progress = services.length > 1 ? activeIndex / (services.length - 1) : 0;

  return (
    <nav className="funnel-box" aria-label="Secciones del servicio">
      <p className="funnel-title">Así funciona nuestro método</p>
      <div className="funnel" style={{ "--funnel-progress": progress } as CSSProperties}>
        <span className="funnel-track" aria-hidden="true">
          <span className="funnel-track-fill" />
        </span>

        {services.map((service, index) => {
          const isActive = activeId === service.id;
          const isPast = index < activeIndex;

          return (
            <button
              key={service.id}
              type="button"
              className={`funnel-level${isActive ? " is-active" : ""}${isPast ? " is-past" : ""}`}
              style={{ "--level-index": index } as CSSProperties}
              onClick={() => onNavigate(service.id)}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="funnel-level-number">{service.number}</span>
              <span className="funnel-level-label">{service.label}</span>
              <StepIcon id={service.id} />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
