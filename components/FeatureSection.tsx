import { useState } from "react";
import type { Service } from "@/data/services";
import type { PlanConfig } from "@/data/planConfigs";
import { platforms } from "@/data/platforms";
import { VisualCard } from "./VisualCards";

type Props = {
  service: Service;
  active: boolean;
  setSectionRef: (id: Service["id"], node: HTMLElement | null) => void;
  activePlan: PlanConfig;
};

export default function FeatureSection({ service, active, setSectionRef, activePlan }: Props) {
  const [selectedPlatformId, setSelectedPlatformId] = useState(platforms[0].id);

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
      </div>

      <VisualCard
        visual={service.visual}
        platforms={platforms}
        selectedPlatformId={selectedPlatformId}
        onSelectPlatform={setSelectedPlatformId}
        activePlan={activePlan}
      />
    </section>
  );
}
