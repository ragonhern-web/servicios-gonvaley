export type PlanId = "essential" | "growth" | "premium";

export type GoogleBusinessLevel = "none" | "basic" | "complete";

export type PlanConfig = {
  id: PlanId;
  name: string;
  price: string;
  platforms: {
    instagram: boolean;
    tiktok: boolean;
    youtubeShorts: boolean;
    googleBusiness: GoogleBusinessLevel;
  };
  postsPerMonth: number;
  storiesDaysPerMonth: number | "daily";
  reelsPerMonth: number;
  reelsRangeLabel?: string;
  googleBusinessPostsPerWeek?: number;
  creativeSessionsPerMonth: number;
  communityManagement: boolean;
  dmManagement: boolean;
  quarterlyVideo: boolean;
  monthlyReport: boolean;
};

export const planOrder: PlanId[] = ["essential", "growth", "premium"];

export const planConfigs: Record<PlanId, PlanConfig> = {
  essential: {
    id: "essential",
    name: "Esencial",
    price: "599 €/mes",
    platforms: {
      instagram: true,
      tiktok: true,
      youtubeShorts: true,
      googleBusiness: "none"
    },
    postsPerMonth: 8,
    storiesDaysPerMonth: 12,
    reelsPerMonth: 4,
    creativeSessionsPerMonth: 0,
    communityManagement: false,
    dmManagement: false,
    quarterlyVideo: false,
    monthlyReport: true
  },
  growth: {
    id: "growth",
    name: "Crecimiento",
    price: "799 €/mes",
    platforms: {
      instagram: true,
      tiktok: true,
      youtubeShorts: true,
      googleBusiness: "basic"
    },
    postsPerMonth: 8,
    storiesDaysPerMonth: 12,
    reelsPerMonth: 8,
    googleBusinessPostsPerWeek: 1,
    creativeSessionsPerMonth: 1,
    communityManagement: true,
    dmManagement: true,
    quarterlyVideo: false,
    monthlyReport: true
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: "1.199 €/mes",
    platforms: {
      instagram: true,
      tiktok: true,
      youtubeShorts: true,
      googleBusiness: "complete"
    },
    postsPerMonth: 8,
    storiesDaysPerMonth: "daily",
    reelsPerMonth: 10,
    reelsRangeLabel: "8-10",
    googleBusinessPostsPerWeek: 1,
    creativeSessionsPerMonth: 2,
    communityManagement: true,
    dmManagement: true,
    quarterlyVideo: true,
    monthlyReport: true
  }
};

export function googleBusinessLabel(level: GoogleBusinessLevel): string {
  if (level === "complete") return "Completo";
  if (level === "basic") return "Básico";
  return "No incluido";
}
