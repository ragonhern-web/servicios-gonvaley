import type { Plan, PlanId } from "@/data/services";

type Props = {
  plans: Plan[];
  activePlanId: PlanId;
  onSelectPlan: (id: PlanId) => void;
};

export default function PlanSwitcher({ plans, activePlanId, onSelectPlan }: Props) {
  return (
    <div className="plan-switcher" role="tablist" aria-label="Selecciona un pack">
      {plans.map((plan) => (
        <button
          key={plan.id}
          type="button"
          role="tab"
          aria-selected={activePlanId === plan.id}
          className={`plan-switch-btn${activePlanId === plan.id ? " is-active" : ""}`}
          onClick={() => onSelectPlan(plan.id)}
        >
          {plan.label}
        </button>
      ))}
    </div>
  );
}
