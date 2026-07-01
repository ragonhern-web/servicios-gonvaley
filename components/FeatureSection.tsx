import type { Service } from "@/data/services";
import { VisualCard } from "./VisualCards";

type Props = {
  service: Service;
  active: boolean;
  setSectionRef: (id: Service["id"], node: HTMLElement | null) => void;
};

export default function FeatureSection({ service, active, setSectionRef }: Props) {
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
      <VisualCard visual={service.visual} />
    </section>
  );
}
