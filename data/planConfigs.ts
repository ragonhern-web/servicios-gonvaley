export type PlanConfigId = "essential" | "growth" | "premium";

export type GoogleBusinessLevel = "none" | "basic" | "complete";

export type PlanConfig = {
  name: string;
  postsPerMonth: number;
  storiesDaysPerMonth: number | "daily";
  reelsPerMonth: number;
  reelsRange?: string;
  googleBusiness: GoogleBusinessLevel;
  googleBusinessPostsPerWeek?: number;
  creativeSessionsPerMonth: number;
  communityManagement: boolean;
  dmManagement: boolean;
  quarterlyVideo?: boolean;
  monthlyReport: boolean;
};

export const planConfigs: Record<PlanConfigId, PlanConfig> = {
  essential: {
    name: "Esencial",
    postsPerMonth: 8,
    storiesDaysPerMonth: 12,
    reelsPerMonth: 4,
    googleBusiness: "none",
    creativeSessionsPerMonth: 0,
    communityManagement: false,
    dmManagement: false,
    monthlyReport: true
  },
  growth: {
    name: "Crecimiento",
    postsPerMonth: 8,
    storiesDaysPerMonth: 12,
    reelsPerMonth: 8,
    googleBusiness: "basic",
    googleBusinessPostsPerWeek: 1,
    creativeSessionsPerMonth: 1,
    communityManagement: true,
    dmManagement: true,
    monthlyReport: true
  },
  premium: {
    name: "Premium",
    postsPerMonth: 8,
    storiesDaysPerMonth: "daily",
    reelsPerMonth: 10,
    reelsRange: "8-10",
    googleBusiness: "complete",
    creativeSessionsPerMonth: 2,
    communityManagement: true,
    dmManagement: true,
    quarterlyVideo: true,
    monthlyReport: true
  }
};
