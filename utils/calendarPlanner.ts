import type { PlanConfig } from "@/data/planConfigs";

export type CalendarCategory = "posts" | "reels" | "stories" | "google" | "creative";

export type GoogleExtra = "review" | "photo" | "keyword";

export type CalendarDay = {
  date: Date;
  day: number;
  /** 0 = lunes ... 6 = domingo */
  weekdayMon: number;
  post: boolean;
  reel: boolean;
  story: boolean;
  google: boolean;
  googleExtra: GoogleExtra | null;
  creative: boolean;
};

export type MonthPlan = {
  year: number;
  month: number;
  monthLabel: string;
  daysInMonth: number;
  days: CalendarDay[];
  weeks: (CalendarDay | null)[][];
  totals: {
    posts: number;
    reels: number;
    stories: number;
    google: number;
    creative: number;
  };
};

export const MONTH_LABELS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const GOOGLE_EXTRA_CYCLE: GoogleExtra[] = ["review", "photo", "keyword"];

// Días de la semana en formato lunes-primero: 0 lunes ... 6 domingo
const POST_WEEKDAYS = [1, 3]; // martes y jueves
const REEL_WEEKDAYS = [0, 2, 4]; // lunes, miércoles y viernes
const STORY_WEEKDAYS = [0, 2, 4]; // lunes, miércoles y viernes
const GOOGLE_WEEKDAY = [2]; // miércoles, 1 vez por semana

function toMonWeekday(date: Date): number {
  return (date.getDay() + 6) % 7;
}

function daysMatchingWeekdays(year: number, month: number, daysInMonth: number, weekdays: number[]): number[] {
  const matches: number[] = [];
  for (let d = 1; d <= daysInMonth; d++) {
    if (weekdays.includes(toMonWeekday(new Date(year, month, d)))) matches.push(d);
  }
  return matches;
}

function creativeSessionDays(daysInMonth: number, sessions: number): number[] {
  // Semana 1 y semana 3, referencia visual para 1 o 2 sesiones al mes.
  const referenceDays = [4, 18];
  return referenceDays.slice(0, sessions).map((d) => Math.min(d, daysInMonth));
}

export function buildMonthPlan(year: number, month: number, plan: PlanConfig): MonthPlan {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: CalendarDay[] = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    return {
      date,
      day: i + 1,
      weekdayMon: toMonWeekday(date),
      post: false,
      reel: false,
      story: false,
      google: false,
      googleExtra: null,
      creative: false
    };
  });

  const byDay = (d: number) => days[d - 1];

  daysMatchingWeekdays(year, month, daysInMonth, POST_WEEKDAYS)
    .slice(0, plan.postsPerMonth)
    .forEach((d) => { byDay(d).post = true; });

  daysMatchingWeekdays(year, month, daysInMonth, REEL_WEEKDAYS)
    .slice(0, plan.reelsPerMonth)
    .forEach((d) => { byDay(d).reel = true; });

  if (plan.storiesDaysPerMonth === "daily") {
    days.forEach((day) => { day.story = true; });
  } else {
    daysMatchingWeekdays(year, month, daysInMonth, STORY_WEEKDAYS)
      .slice(0, plan.storiesDaysPerMonth)
      .forEach((d) => { byDay(d).story = true; });
  }

  if (plan.platforms.googleBusiness !== "none") {
    daysMatchingWeekdays(year, month, daysInMonth, GOOGLE_WEEKDAY)
      .forEach((d, idx) => {
        const dayEntry = byDay(d);
        dayEntry.google = true;
        if (plan.platforms.googleBusiness === "complete") {
          dayEntry.googleExtra = GOOGLE_EXTRA_CYCLE[idx % GOOGLE_EXTRA_CYCLE.length];
        }
      });
  }

  creativeSessionDays(daysInMonth, plan.creativeSessionsPerMonth)
    .forEach((d) => { byDay(d).creative = true; });

  const weeks: (CalendarDay | null)[][] = [];
  let currentWeek: (CalendarDay | null)[] = new Array(days[0].weekdayMon).fill(null);
  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  return {
    year,
    month,
    monthLabel: MONTH_LABELS[month],
    daysInMonth,
    days,
    weeks,
    totals: {
      posts: days.filter((d) => d.post).length,
      reels: days.filter((d) => d.reel).length,
      stories: days.filter((d) => d.story).length,
      google: days.filter((d) => d.google).length,
      creative: days.filter((d) => d.creative).length
    }
  };
}

export function dayHasCategory(day: CalendarDay, category: CalendarCategory): boolean {
  if (category === "posts") return day.post;
  if (category === "reels") return day.reel;
  if (category === "stories") return day.story;
  if (category === "google") return day.google;
  return day.creative;
}

export function isCategoryAvailable(plan: PlanConfig, category: CalendarCategory): boolean {
  if (category === "google") return plan.platforms.googleBusiness !== "none";
  if (category === "creative") return plan.creativeSessionsPerMonth > 0;
  return true;
}
