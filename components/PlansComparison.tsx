import { planConfigs, planOrder, type PlanId } from "@/data/planConfigs";
import { comparisonGroups, type ComparisonValue } from "@/data/planComparisonRows";

type Props = {
  activePlanId: PlanId;
  onSelectPlan: (id: PlanId) => void;
};

function ValueCell({ value }: { value: ComparisonValue }) {
  if (value.kind === "check") {
    return (
      <span className="compare-value compare-check" aria-label="Incluido">
        <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
          <path d="M4 10.5l4 4L16 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (value.kind === "cross") {
    return <span className="compare-value compare-cross" aria-label="No incluido">—</span>;
  }
  return <span className="compare-value compare-text">{value.text}</span>;
}

export default function PlansComparison({ activePlanId, onSelectPlan }: Props) {
  return (
    <section className="plans-comparison-section" aria-label="Comparativa de planes">
      <div className="compare-intro">
        <p className="compare-eyebrow">Comparativa de planes</p>
        <h2>Qué incluye cada pack</h2>
        <p className="compare-lead">Compara de forma rápida qué incluye cada plan y elige el que mejor encaja con tu negocio.</p>
      </div>

      <div className="compare-grid">
        {planOrder.map((id) => {
          const plan = planConfigs[id];
          const isActive = id === activePlanId;

          return (
            <div key={id} className={`compare-column${isActive ? " is-active" : ""}`}>
              <button type="button" className="compare-column-header" onClick={() => onSelectPlan(id)}>
                {isActive && <span className="compare-badge">Seleccionado</span>}
                <strong>{plan.name}</strong>
                <span className="compare-price">{plan.price}</span>
              </button>

              {comparisonGroups.map((group) => (
                <div key={group.title} className="compare-group">
                  <p className="compare-group-title">{group.title}</p>
                  {group.rows.map((row) => (
                    <div key={row.label} className="compare-row">
                      <span className="compare-row-label">{row.label}</span>
                      <ValueCell value={row.values[id]} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
}
