"use client";

import { useMemo, useState } from "react";
import type { PlanConfigId } from "@/data/planConfigs";
import { planConfigs } from "@/data/planConfigs";
import { buildMonthPlan, dayHasCategory, type CalendarCategory } from "@/utils/calendarPlanner";

const WEEKDAY_LABELS = ["L", "M", "X", "J", "V", "S", "D"];

const FILTERS: { id: CalendarCategory; label: string; dotClass: string }[] = [
  { id: "reels", label: "Reels", dotClass: "cal-dot-reels" },
  { id: "posts", label: "Carruseles", dotClass: "cal-dot-posts" },
  { id: "stories", label: "Stories", dotClass: "cal-dot-stories" },
  { id: "google", label: "Google Business", dotClass: "cal-dot-google" },
  { id: "creative", label: "Sesiones", dotClass: "cal-dot-creative" }
];

export default function StrategyCalendar() {
  // Plan activo preparado para leerse desde un selector futuro (essential | growth | premium).
  // Por ahora la interfaz solo expone Premium.
  const [activePlanId] = useState<PlanConfigId>("premium");
  const [cursor, setCursor] = useState(() => ({ year: new Date().getFullYear(), month: 0 }));
  const [selectedCategory, setSelectedCategory] = useState<CalendarCategory | null>(null);

  const planConfig = planConfigs[activePlanId];
  const monthPlan = useMemo(
    () => buildMonthPlan(cursor.year, cursor.month, planConfig),
    [cursor.year, cursor.month, planConfig]
  );

  const goPrevMonth = () => {
    setCursor((prev) => (prev.month === 0 ? { year: prev.year - 1, month: 11 } : { year: prev.year, month: prev.month - 1 }));
  };
  const goNextMonth = () => {
    setCursor((prev) => (prev.month === 11 ? { year: prev.year + 1, month: 0 } : { year: prev.year, month: prev.month + 1 }));
  };

  const toggleCategory = (category: CalendarCategory) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="visual-card strategy-visual">
      <div className="strategy-dashboard">
        <div className="cal-header-row">
          <div className="cal-header-info">
            <span>Plan mensual</span>
            <strong>{monthPlan.monthLabel} {monthPlan.year}</strong>
          </div>
          <div className="cal-header-actions">
            <span className="cal-plan-badge">{planConfig.name}</span>
            <div className="cal-nav">
              <button type="button" aria-label="Mes anterior" onClick={goPrevMonth}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button type="button" aria-label="Mes siguiente" onClick={goNextMonth}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="cal-weekdays" aria-hidden="true">
          {WEEKDAY_LABELS.map((label, i) => <span key={i}>{label}</span>)}
        </div>

        <div className="cal-grid">
          {monthPlan.weeks.flatMap((week, weekIndex) =>
            week.map((day, dayIndex) => {
              if (!day) return <span key={`${weekIndex}-${dayIndex}`} className="cal-day cal-day-empty" aria-hidden="true" />;

              const isLit = selectedCategory ? dayHasCategory(day, selectedCategory) : false;
              const isDimmed = selectedCategory ? !dayHasCategory(day, selectedCategory) : false;

              return (
                <button
                  key={day.day}
                  type="button"
                  className={`cal-day${isLit ? " is-lit" : ""}${isDimmed ? " is-dimmed" : ""}`}
                >
                  <span className="cal-day-number">{day.day}</span>
                  <span className="cal-day-dots">
                    {day.post && <i className="cal-dot cal-dot-posts" />}
                    {day.reel && <i className="cal-dot cal-dot-reels" />}
                    {day.story && <i className="cal-dot cal-dot-stories" />}
                    {day.google && <i className="cal-dot cal-dot-google" />}
                    {day.creative && <i className="cal-dot cal-dot-creative" />}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="cal-filters" role="tablist" aria-label="Filtrar contenido del calendario">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={selectedCategory === filter.id}
              className={`cal-filter${selectedCategory === filter.id ? " is-active" : ""}`}
              onClick={() => toggleCategory(filter.id)}
            >
              <i className={`cal-dot ${filter.dotClass}`} />
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
