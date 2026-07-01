import { useState } from "react";
import type { Service } from "@/data/services";
import { platforms } from "@/data/platforms";
import { withBasePath } from "@/utils/basePath";
import { VisualCard } from "./VisualCards";

type Props = {
  service: Service;
  active: boolean;
  setSectionRef: (id: Service["id"], node: HTMLElement | null) => void;
};

export default function FeatureSection({ service, active, setSectionRef }: Props) {
  const [selectedPlatformId, setSelectedPlatformId] = useState(platforms[0].id);
  const isPlatforms = service.id === "plataformas";

  return (
    <section
      ref={(node) => setSectionRef(service.id, node)}
      className={`feature-section${active ? " is-active" : ""}`}
      id={service.id}
      data-step={service.number}
    >
      <div className="section-copy">
        <p className="section-number">{service.number} · {service.label}</p>
        <h2>{service.heading}</h2>
        <p>{service.text}</p>

        {isPlatforms && (
          <div className="platform-selector" role="tablist" aria-label="Selecciona una plataforma">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                type="button"
                role="tab"
                aria-selected={selectedPlatformId === platform.id}
                aria-label={platform.name}
                className={`platform-chip${selectedPlatformId === platform.id ? " is-active" : ""}`}
                onClick={() => setSelectedPlatformId(platform.id)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="platform-logo" src={withBasePath(platform.logo)} alt="" aria-hidden="true" />
                <strong>{platform.mockup.label}</strong>
              </button>
            ))}
          </div>
        )}
      </div>

      <VisualCard visual={service.visual} platforms={platforms} selectedPlatformId={selectedPlatformId} />
    </section>
  );
}
