import { investorAvatarUrl, startupLogoUrl } from "./avatars";

export type Startup = {
  id: string;
  name: string;
  logo: string;
  logoUrl: string;
  sector: string;
  stage: string;
  location: string;
  founders: { name: string; linkedin: string }[];
  raiseAmount: string;
  valuationCap: string;
  raisedSoFar: number;
  aiScore: number;
  summary: string;
  tractionNote: string;
  currentStage: string;
  focusTags: string[];
  bull: string[];
  bear: string[];
  composite: number;
  arr?: string;
  verified: boolean;
  tagline?: string;
  youtubeVideoId?: string;
  aiSentiment: string;
  aiSummary: string;
  aiScoreFactors: string[];
};

export type NetworkPerson = {
  id: string;
  name: string;
  title: string;
  location: string;
  mutuals: number;
  tags: string[];
  initials: string;
  avatarUrl: string;
};

export type InvestorViewer = {
  name: string;
  role: string;
  check: string;
  location: string;
  score: number;
  avatarUrl: string;
};

export const CURRENT_INVESTOR = {
  name: "Alex Morgan",
  title: "Angel · 14 active checks",
  avatarUrl: investorAvatarUrl(12),
  dealsSeen: "312",
  watchlist: "9",
};

export const NETWORK_INVITES: NetworkPerson[] = [
  {
    id: "1",
    name: "Marcus Reeve",
    title: "GP · Cascade Capital",
    location: "San Francisco",
    mutuals: 14,
    tags: ["SaaS", "AI"],
    initials: "MR",
    avatarUrl: investorAvatarUrl(3),
  },
  {
    id: "2",
    name: "Yara Okonkwo",
    title: "Founder · LedgerLoop (YC W24)",
    location: "Lagos · London",
    mutuals: 6,
    tags: ["FinTech", "Africa"],
    initials: "YO",
    avatarUrl: investorAvatarUrl(8),
  },
  {
    id: "3",
    name: "Hiro Tanaka",
    title: "Angel · ex-Stripe",
    location: "Tokyo",
    mutuals: 22,
    tags: ["Payments", "Infra"],
    initials: "HT",
    avatarUrl: investorAvatarUrl(15),
  },
];

export const NETWORK_SUGGESTED: NetworkPerson[] = [
  {
    id: "s1",
    name: "Elena Park",
    title: "Partner · Atlas Seed",
    location: "New York",
    mutuals: 31,
    tags: ["Climate", "DeepTech"],
    initials: "EP",
    avatarUrl: investorAvatarUrl(22),
  },
  {
    id: "s2",
    name: "Devon Brooks",
    title: "Scout · Sequoia",
    location: "Remote",
    mutuals: 8,
    tags: ["DevTools"],
    initials: "DB",
    avatarUrl: investorAvatarUrl(5),
  },
  {
    id: "s3",
    name: "Sofía Reyes",
    title: "Co-founder · Teespring",
    location: "Mexico City",
    mutuals: 4,
    tags: ["LatAm", "FinTech"],
    initials: "SR",
    avatarUrl: investorAvatarUrl(30),
  },
  {
    id: "s4",
    name: "Anya Volkov",
    title: "Co-founder · Clearspace",
    location: "Zurich",
    mutuals: 2,
    tags: ["AgTech"],
    initials: "AV",
    avatarUrl: investorAvatarUrl(41),
  },
  {
    id: "s5",
    name: "Jordan Wei",
    title: "Operator-Angel · ex-Notion",
    location: "Toronto",
    mutuals: 17,
    tags: ["Productivity"],
    initials: "JW",
    avatarUrl: investorAvatarUrl(18),
  },
  {
    id: "s6",
    name: "Priya Shah",
    title: "CEO · Keywords AI",
    location: "NYC",
    mutuals: 9,
    tags: ["SaaS"],
    initials: "PS",
    avatarUrl: investorAvatarUrl(47),
  },
];

export const TOP_INVESTOR_VIEWERS: InvestorViewer[] = [
  {
    name: "Marcus Reeve",
    role: "GP · Cascade Capital",
    check: "$50–250k",
    location: "San Francisco",
    score: 92,
    avatarUrl: investorAvatarUrl(3),
  },
  {
    name: "Elena Park",
    role: "Partner · Atlas Seed",
    check: "$25–100k",
    location: "New York",
    score: 88,
    avatarUrl: investorAvatarUrl(22),
  },
  {
    name: "Jordan Wei",
    role: "Operator-Angel · ex-Notion",
    check: "$10–25k",
    location: "Toronto",
    score: 81,
    avatarUrl: investorAvatarUrl(18),
  },
  {
    name: "Hiro Tanaka",
    role: "Angel · ex-Stripe",
    check: "$25–100k",
    location: "Tokyo",
    score: 77,
    avatarUrl: investorAvatarUrl(15),
  },
];

export const STARTUPS: Startup[] = [
  {
    id: "clearspace",
    name: "Clearspace",
    logo: "CS",
    logoUrl: startupLogoUrl("clearspace"),
    sector: "Consumer / Health",
    stage: "Early Revenue",
    location: "San Francisco · Remote",
    founders: [
      { name: "Oliver Grant", linkedin: "#" },
      { name: "Maya Chen", linkedin: "#" },
    ],
    raiseAmount: "$1.5M",
    valuationCap: "$12M Cap",
    raisedSoFar: 44,
    aiScore: 8.4,
    tagline: "Cut your screen time in half with a moment of intentionality",
    summary:
      "Clearspace is a digital wellbeing app that tackles compulsive phone use. It inserts a deliberate pause before a user opens distracting apps, breaking the doomscroll habit. The product targets anyone struggling with screen time, focus, or phone addiction.",
    tractionNote: "500k+ downloads · Featured in App Store wellness · 4.8★ avg rating",
    currentStage: "Scaling paid conversion · iOS + Android live",
    focusTags: ["Consumer", "Health", "Wellbeing", "Mobile"],
    bull: [
      "Massive TAM: screen-time and focus apps are a proven, recurring consumer category.",
      "Differentiated mechanic — intentional pause breaks habitual opens better than blockers alone.",
      "Strong organic growth and press validation reduce paid acquisition risk.",
    ],
    bear: [
      "Apple Screen Time and OS-level controls could absorb core functionality.",
      "Consumer subscription churn in wellness apps is historically high.",
      "Monetization beyond freemium requires careful pricing experiments.",
    ],
    composite: 79,
    arr: "$320k ARR",
    verified: true,
    youtubeVideoId: "dkOpG3kqmy4",
    aiSentiment: "Strong Positive",
    aiSummary:
      "Clearspace addresses a widespread, emotionally resonant problem with a simple intervention that shows early product-market fit. Traction and App Store visibility validate demand, though long-term retention in consumer wellness remains the key diligence question.",
    aiScoreFactors: [
      "Large addressable market in digital wellbeing with proven willingness to pay for focus tools.",
      "Differentiated pause mechanic is memorable and defensible vs. pure screen-time blockers.",
      "Strong early distribution signals (500k+ downloads) de-risk initial go-to-market.",
    ],
  },
  {
    id: "keywords-ai",
    name: "Keywords AI",
    logo: "K",
    logoUrl: startupLogoUrl("keywords-ai"),
    sector: "AI / Software",
    stage: "Prototype",
    location: "San Francisco",
    founders: [
      { name: "Jason Wu", linkedin: "#" },
      { name: "Emily Park", linkedin: "#" },
    ],
    raiseAmount: "$2M",
    valuationCap: "$14M Cap",
    raisedSoFar: 38,
    aiScore: 8.8,
    tagline: "The LLM observability platform for AI startups",
    summary:
      "Keywords AI gives AI startups a single platform to monitor, debug, and improve their large language model applications. It provides observability into production LLM behaviour so teams can ship reliable AI products faster.",
    tractionNote: "40+ design partners · 2M+ traces/day ingested · YC-backed team",
    currentStage: "Private beta → GA with usage-based pricing",
    focusTags: ["AI", "DevTools", "Observability", "B2B SaaS"],
    bull: [
      "Every AI product team needs production LLM monitoring — category is forming now.",
      "Founders are ex-Machine learning infra at scale with deep technical credibility.",
      "Usage-based pricing aligns revenue with customer success as workloads grow.",
    ],
    bear: [
      "Datadog, LangSmith, and Braintrust are well-funded competitors.",
      "Platform risk if model providers bundle native observability.",
      "Enterprise security reviews slow down early revenue in regulated verticals.",
    ],
    composite: 83,
    arr: "Beta · $180k ARR run-rate",
    verified: true,
    youtubeVideoId: "BxjmoN6LhqM",
    aiSentiment: "Strong Positive",
    aiSummary:
      "Keywords AI sits in a high-growth infrastructure layer every LLM product team will need. The founding team's technical depth and design-partner velocity suggest they can win a meaningful share of observability budgets as AI apps scale to production.",
    aiScoreFactors: [
      "Category tailwinds: production LLM monitoring is becoming table stakes for AI startups.",
      "YC-backed team with credible ML infra backgrounds and strong design-partner pipeline.",
      "Usage-based model aligns with customer growth and supports expanding net revenue.",
    ],
  },
  {
    id: "campus-job",
    name: "Campus Job",
    logo: "CJ",
    logoUrl: startupLogoUrl("campus-job"),
    sector: "Consumer / Marketplace",
    stage: "Early Revenue",
    location: "Boston · National US",
    founders: [
      { name: "Rachel Kim", linkedin: "#" },
      { name: "David Ortiz", linkedin: "#" },
    ],
    raiseAmount: "$3M",
    valuationCap: "$18M Cap",
    raisedSoFar: 52,
    aiScore: 7.6,
    tagline: "The marketplace for students to find part-time work",
    summary:
      "Campus Job connects university students with part-time jobs, internships, and gigs through a single online marketplace. It removes the friction of student hiring for employers and gives students an easy way to find flexible work.",
    tractionNote: "120+ campus partners · 85k active students · $4.2M GMV last year",
    currentStage: "Expanding to 40 new universities · employer SaaS upsell",
    focusTags: ["Marketplace", "Consumer", "EdTech", "Recruiting"],
    bull: [
      "Two-sided marketplace with clear liquidity on supply (students) and demand (employers).",
      "Campus-by-campus rollout creates local network effects and defensibility.",
      "Employers pay for access — students free, proven marketplace monetization.",
    ],
    bear: [
      "Handshake and LinkedIn campus products have entrenched university relationships.",
      "Seasonal demand spikes make revenue lumpy across academic calendar.",
      "Quality control on gig listings requires ongoing ops investment.",
    ],
    composite: 68,
    arr: "$890k net revenue",
    verified: true,
    youtubeVideoId: "4nxrkPtR348",
    aiSentiment: "Cautiously Optimistic",
    aiSummary:
      "Campus Job has built real marketplace liquidity on campuses with measurable GMV, a rare achievement in student hiring. Expansion economics and incumbent competition from Handshake temper enthusiasm, but the wedge is clear and monetization is proven.",
    aiScoreFactors: [
      "Demonstrated two-sided liquidity with 120+ campus partners and meaningful GMV.",
      "Employer-paid model avoids student-side CAC and mirrors successful marketplace playbooks.",
      "Seasonality and university sales cycles will require disciplined capital deployment.",
    ],
  },
  {
    id: "flip",
    name: "Flip",
    logo: "FL",
    logoUrl: startupLogoUrl("flip"),
    sector: "Consumer / Marketplace",
    stage: "Idea",
    location: "New York",
    founders: [{ name: "Sam Rivera", linkedin: "#" }],
    raiseAmount: "$750k",
    valuationCap: "$4M Cap",
    raisedSoFar: 15,
    aiScore: 7.2,
    tagline: "A faster way to take over or get out of an apartment lease",
    summary:
      "Flip is a marketplace for apartment leases, letting renters list a lease they need to leave and letting others take it over. It streamlines subletting and lease transfers, solving a slow and painful process for renters.",
    tractionNote: "MVP waitlist 2,400 renters · 3 property-manager LOIs · NYC launch Q2",
    currentStage: "Pre-launch · regulatory review with NYC brokers",
    focusTags: ["Marketplace", "PropTech", "Consumer"],
    bull: [
      "Lease transfers are painful and underserved — clear painkiller for urban renters.",
      "Small raise matches idea-stage milestones before scaling city-by-city.",
      "Founder previously built marketplace ops at a Series B proptech.",
    ],
    bear: [
      "Regulatory and landlord approval friction varies by building and city.",
      "Zillow and Apartments.com could add lease-assignment flows.",
      "Liquidity chicken-and-egg in each metro before network effects kick in.",
    ],
    composite: 62,
    verified: false,
    youtubeVideoId: "N5cBGeRMxms",
    aiSentiment: "Mixed",
    aiSummary:
      "Flip targets a genuine pain point in urban leasing with a capital-efficient raise, but remains pre-revenue with regulatory and liquidity risks typical of early marketplaces. Worth tracking post-launch proof in NYC before a larger commitment.",
    aiScoreFactors: [
      "Clear renter pain around lease transfers in supply-constrained cities.",
      "Pre-launch traction limited to waitlist and LOIs — product risk is still high.",
      "Metro-by-metro liquidity and landlord buy-in are unresolved scaling hurdles.",
    ],
  },
  {
    id: "zenefits",
    name: "Zenefits",
    logo: "Z",
    logoUrl: startupLogoUrl("zenefits"),
    sector: "Fintech / Software",
    stage: "Growth",
    location: "San Francisco",
    founders: [
      { name: "Parker Conrad", linkedin: "#" },
      { name: "Lillian Chou", linkedin: "#" },
    ],
    raiseAmount: "$5M",
    valuationCap: "$45M Pre-Money",
    raisedSoFar: 67,
    aiScore: 9.1,
    tagline: "Free HR software that manages benefits, payroll and compliance",
    summary:
      "Zenefits is an all-in-one HR platform for small and mid-sized businesses, handling benefits, payroll, insurance, and compliance in one place. The software is offered free, monetised through insurance brokerage.",
    tractionNote: "10k+ SMB customers · $50M+ ARR · Brokerage-led monetization at scale",
    currentStage: "Growth · expanding mid-market and broker partnerships",
    focusTags: ["FinTech", "HR", "SMB", "Insurance"],
    bull: [
      "Free software + brokerage model aligns incentives and drives viral SMB adoption.",
      "Massive TAM in underserved SMB HR — incumbents are slow and expensive.",
      "Strong unit economics once customers bundle benefits and payroll.",
    ],
    bear: [
      "Regulatory scrutiny on broker compensation models can shift economics.",
      "Gusto and Rippling are well-funded with overlapping feature sets.",
      "Customer support intensity at SMB scale is operationally demanding.",
    ],
    composite: 86,
    arr: "$50M+ ARR",
    verified: true,
    youtubeVideoId: "-S83fysRwn4",
    aiSentiment: "Strong Positive",
    aiSummary:
      "Zenefits combines viral SMB distribution with brokerage economics at true scale — one of the strongest risk-adjusted profiles in the feed. Regulatory and competitive pressures exist, but revenue depth and category leadership justify a top-tier score.",
    aiScoreFactors: [
      "Exceptional scale: 10k+ customers and $50M+ ARR with a proven monetization engine.",
      "Free-software wedge drives adoption in a massive, underserved SMB HR market.",
      "Regulatory and competitive dynamics require ongoing monitoring but are manageable at this scale.",
    ],
  },
  {
    id: "teespring",
    name: "Teespring",
    logo: "T",
    logoUrl: startupLogoUrl("teespring"),
    sector: "Consumer / E-commerce",
    stage: "Early Revenue",
    location: "San Francisco",
    founders: [
      { name: "Walker Williams", linkedin: "#" },
      { name: "Evan Stites", linkedin: "#" },
    ],
    raiseAmount: "$4M",
    valuationCap: "$28M Cap",
    raisedSoFar: 58,
    aiScore: 8.0,
    tagline: "Create and sell custom apparel with zero upfront cost",
    summary:
      "Teespring lets anyone design, sell, and ship custom apparel without holding inventory or paying upfront. Sellers launch a campaign, and Teespring handles printing and fulfilment only once enough orders are placed, removing all financial risk.",
    tractionNote: "$100M+ lifetime GMV · 500k+ creators · fulfillment in 11 countries",
    currentStage: "Scaling creator partnerships · expanding product catalog",
    focusTags: ["E-commerce", "Creator Economy", "Print-on-demand"],
    bull: [
      "Zero-inventory model removes seller risk — proven demand from creators and causes.",
      "Campaign-based fulfilment optimizes unit economics vs. traditional apparel.",
      "Creator and influencer distribution channels drive low-CAC growth.",
    ],
    bear: [
      "Printful, Printify, and Shopify apps compete aggressively on margins.",
      "Quality control across global print partners is hard to standardize.",
      "Trend-driven campaigns create revenue volatility quarter to quarter.",
    ],
    composite: 76,
    arr: "$12M GMV run-rate",
    verified: true,
    youtubeVideoId: "Ipf247AmhiI",
    aiSentiment: "Cautiously Optimistic",
    aiSummary:
      "Teespring's zero-inventory print-on-demand model has demonstrated massive GMV and creator adoption. Margin pressure from competitors and campaign volatility keep this from the highest tier, but the business model is battle-tested and capital-efficient.",
    aiScoreFactors: [
      "Proven print-on-demand model with $100M+ lifetime GMV and large creator base.",
      "Campaign-based fulfilment limits inventory risk and aligns costs with demand.",
      "Competitive pressure from Printful/Printify and creator-platform checkout may compress margins.",
    ],
  },
];

/** Investor feed — highest Atlas AI score first. */
export const FEED_STARTUPS: Startup[] = [...STARTUPS].sort((a, b) => b.aiScore - a.aiScore);
