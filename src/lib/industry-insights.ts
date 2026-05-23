import type { Startup } from "@/lib/mock-data";

export type IndustryInsights = {
  category: string;
  marketSize: string;
  growthRate: string;
  summary: string;
  trends: string[];
  competitors: string[];
  tailwinds: string[];
  headwinds: string[];
};

const BY_STARTUP_ID: Record<string, IndustryInsights> = {
  zenefits: {
    category: "SMB HR & benefits tech",
    marketSize: "$18B US SMB HR software · $42B global",
    growthRate: "11% CAGR (2024–2029)",
    summary:
      "SMBs are replacing spreadsheets and brokers with unified HR platforms. Benefits administration and payroll compliance drive spend, while insurance brokerage remains the dominant monetization layer for free HR suites.",
    trends: [
      "PEO and co-employment models gaining share among 50–500 employee firms",
      "State-by-state compliance automation becoming table stakes",
      "Embedded fintech (earned wage access, cards) bundling into HR stacks",
    ],
    competitors: ["Gusto", "Rippling", "ADP RUN", "Paychex", "Namely"],
    tailwinds: [
      "ACA & state mandate complexity increases software attach",
      "Remote work expands multi-state employer needs",
      "Broker channel still prefers digital-first enrollment",
    ],
    headwinds: [
      "Broker compensation regulation under periodic scrutiny",
      "Incumbents discount aggressively to defend installed base",
    ],
  },
  clearspace: {
    category: "Digital wellbeing & screen-time",
    marketSize: "$4.2B global digital wellness apps",
    growthRate: "14% CAGR",
    summary:
      "Consumers and employers are spending on focus, mindfulness, and screen-time reduction. App Store discovery and subscription models dominate; hardware/OS features from Apple and Google shape competitive dynamics.",
    trends: [
      "Employer wellness stipends funding B2B2C distribution",
      "Short-form content driving awareness of doomscrolling harms",
      "Gen Z adoption of intentional phone-use rituals",
    ],
    competitors: ["One Sec", "Opal", "Screen Time (OS)", "Headspace", "Calm"],
    tailwinds: [
      "Rising mental-health awareness in workplace benefits",
      "Low CAC from organic social proof and press cycles",
    ],
    headwinds: [
      "Platform risk from native OS screen-time tools",
      "High churn in consumer subscription wellness",
    ],
  },
  "keywords-ai": {
    category: "LLM observability & AI devtools",
    marketSize: "$2.8B APM + emerging $1.2B LLM ops",
    growthRate: "32% CAGR (LLM infra segment)",
    summary:
      "Every production AI app needs tracing, evals, and cost monitoring. The category is fragmenting between horizontal observability vendors and LLM-native startups racing to own the evaluation workflow.",
    trends: [
      "Evals & red-teaming moving from research to CI/CD pipelines",
      "Token-cost attribution becoming a finance-team requirement",
      "Open-source stacks (LangChain, LiteLLM) driving bottom-up adoption",
    ],
    competitors: ["LangSmith", "Braintrust", "Helicone", "Datadog LLM", "Arize"],
    tailwinds: [
      "Explosion of AI-native startups shipping to production",
      "Usage-based pricing aligns with customer scale",
    ],
    headwinds: [
      "Hyperscalers may bundle observability into model APIs",
      "Enterprise security reviews lengthen sales cycles",
    ],
  },
  "campus-job": {
    category: "Student employment marketplaces",
    marketSize: "$9B US part-time student labor",
    growthRate: "6% CAGR",
    summary:
      "Universities and local employers still rely on bulletin boards and fragmented job boards. Digital marketplaces that own campus liquidity can capture take rates on placements and employer SaaS fees.",
    trends: [
      "Gig-economy norms normalizing flexible student work",
      "Universities centralizing career services platforms",
      "Employers targeting Gen Z via mobile-first flows",
    ],
    competitors: ["Handshake", "LinkedIn Campus", "Indeed", "Snagajob"],
    tailwinds: [
      "Employer-paid model avoids student-side monetization friction",
      "Campus-by-campus network effects",
    ],
    headwinds: [
      "Handshake's exclusive university contracts in core segments",
      "Seasonal demand tied to academic calendar",
    ],
  },
  flip: {
    category: "Residential lease transfers",
    marketSize: "$3.1B addressable US lease-assignment fees",
    growthRate: "8% CAGR",
    summary:
      "Urban renters frequently need to exit leases early; assignment and subletting remain manual, broker-mediated processes. Marketplaces that standardize landlord approval and renter matching can take a transaction fee per transfer.",
    trends: [
      "Renter churn rising in gateway cities post-pandemic",
      "Property managers seeking digital tenant lifecycle tools",
      "Regulatory clarity improving for assignment marketplaces in select metros",
    ],
    competitors: ["Leasebreak", "Flip (legacy)", "Facebook Marketplace", "Zillow Rental Manager"],
    tailwinds: [
      "Clear painkiller for renters facing lease break fees",
      "Low capex marketplace model once liquidity forms",
    ],
    headwinds: [
      "Landlord approval friction varies by building",
      "Metro-by-metro cold-start before network effects",
    ],
  },
  teespring: {
    category: "Print-on-demand & creator commerce",
    marketSize: "$6.8B global POD apparel",
    growthRate: "10% CAGR",
    summary:
      "Creators and causes want merchandise without inventory risk. Print-on-demand platforms compete on fulfillment quality, catalog breadth, and integration with social distribution channels.",
    trends: [
      "Creator monetization diversifying beyond ads and sponsorships",
      "TikTok Shop and social checkout shortening purchase paths",
      "Sustainability pressure on apparel supply chains",
    ],
    competitors: ["Printful", "Printify", "Spring (Teespring)", "Redbubble", "Shopify POD apps"],
    tailwinds: [
      "Zero-inventory model limits working-capital needs",
      "Campaign virality drives episodic GMV spikes",
    ],
    headwinds: [
      "Margin compression from aggregator competition",
      "Quality consistency across global print partners",
    ],
  },
};

const DEFAULT_INSIGHTS = (s: Startup): IndustryInsights => ({
  category: s.sector,
  marketSize: "Market sizing in progress",
  growthRate: "—",
  summary: `${s.name} operates in ${s.sector}. Atlas is generating deeper sector reports as more investor views accumulate on this listing.`,
  trends: ["Category digitization accelerating", "SMB buyers prefer integrated platforms"],
  competitors: ["Incumbent legacy vendors", "Well-funded startups in adjacent categories"],
  tailwinds: ["Large underserved customer segment"],
  headwinds: ["Competitive intensity", "Regulatory or platform risk in sector"],
});

export function getIndustryInsights(s: Startup): IndustryInsights {
  return BY_STARTUP_ID[s.id] ?? DEFAULT_INSIGHTS(s);
}
