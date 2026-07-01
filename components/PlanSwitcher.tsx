import { planConfigs, type PlanId } from "@/data/planConfigs";

type Props = {
  planOrder: PlanId[];
  activePlanId: PlanId;
  onSelectPlan: (id: PlanId) => void;
};

export default function PlanSwitcher({ planOrder, activePlanId, onSelectPlan }: Props) {
  const activePlan = planConfigs[activePlanId];

  return (
    <div className="plan-switcher">
      <span className="plan-switcher-label">Elige tu plan</span>

      <div className="plan-switcher-tabs" role="tablist" aria-label="Selecciona un pack">
        {planOrder.map((id) => {
          const plan = planConfigs[id];
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activePlanId === id}
              className={`plan-switch-btn${activePlanId === id ? " is-active" : ""}`}
              onClick={() => onSelectPlan(id)}
            >
              {plan.name}
            </button>
          );
        })}
      </div>

      <span className="plan-switcher-price">{activePlan.price}</span>
    </div>
  );
}
