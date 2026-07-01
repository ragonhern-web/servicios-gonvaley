import type { PlanId } from "./planConfigs";

export type ComparisonValue =
  | { kind: "check" }
  | { kind: "cross" }
  | { kind: "text"; text: string };

export type ComparisonRow = {
  label: string;
  values: Record<PlanId, ComparisonValue>;
};

export type ComparisonGroup = {
  title: string;
  rows: ComparisonRow[];
};

const check: ComparisonValue = { kind: "check" };
const cross: ComparisonValue = { kind: "cross" };
const text = (value: string): ComparisonValue => ({ kind: "text", text: value });

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: "Plataformas",
    rows: [
      { label: "Instagram", values: { essential: check, growth: check, premium: check } },
      { label: "TikTok", values: { essential: check, growth: check, premium: check } },
      { label: "YouTube Shorts", values: { essential: check, growth: check, premium: check } },
      { label: "Google My Business", values: { essential: cross, growth: text("Básico"), premium: text("Completo") } }
    ]
  },
  {
    title: "Estrategia y contenido",
    rows: [
      { label: "Plan de contenido mensual", values: { essential: check, growth: check, premium: check } },
      { label: "Publicaciones (feed/carrusel)", values: { essential: text("8 / mes"), growth: text("8 / mes"), premium: text("8 / mes") } },
      { label: "Stories", values: { essential: text("12 días/mes"), growth: text("12 días/mes"), premium: text("Diarias") } },
      { label: "Reels / Shorts", values: { essential: text("4 / mes"), growth: text("8 / mes"), premium: text("8-10 / mes") } },
      { label: "Sesión creatividad / foto", values: { essential: cross, growth: text("1 / mes"), premium: text("2 / mes") } }
    ]
  },
  {
    title: "Comunidad",
    rows: [
      { label: "Gestión de comentarios", values: { essential: cross, growth: check, premium: check } },
      { label: "Gestión de mensajes (DMs)", values: { essential: cross, growth: check, premium: check } }
    ]
  },
  {
    title: "Extras y reporting",
    rows: [
      { label: "Vídeo promocional pro", values: { essential: cross, growth: cross, premium: text("1 / trim.") } },
      { label: "Informe de resultados", values: { essential: text("Mensual"), growth: text("Mensual"), premium: text("Mensual") } }
    ]
  }
];
