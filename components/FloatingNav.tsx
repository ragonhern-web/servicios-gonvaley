import type { Plan, PlanId } from "@/data/services";

type Props = {
  plans: Plan[];
  activePlanId: PlanId;
  onSelectPlan: (id: PlanId) => void;
  onStart: () => void;
};

export default function FloatingNav({ plans, activePlanId, onSelectPlan, onStart }: Props) {
  return (
    <footer className="floating-nav" aria-label="Planes disponibles">
      <div className="floating-brand"><span className="pause-dot">Ⅱ</span><strong>AMZ Creatives</strong></div>
      {plans.map((plan) => (
        <button
          key={plan.id}
          className={activePlanId === plan.id ? "is-active" : ""}
          type="button"
          onClick={() => onSelectPlan(plan.id)}
        >
          {plan.label}
        </button>
      ))}
      <button className="nav-cta" type="button" onClick={onStart}>Empezar</button>
    </footer>
  );
}
