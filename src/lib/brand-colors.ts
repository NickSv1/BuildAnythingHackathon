/** Atlas brand palette */
export const ATLAS_NAVY = "#070B17";
export const ATLAS_WHITE = "#FFFFFF";
export const ATLAS_GREEN = "#22C55E";
export const ATLAS_BULL = "#16A34A";
export const ATLAS_BEAR = "#DC2626";
export const ATLAS_INTERESTED = "#0B4A47";
export const ATLAS_COPPER = "#B06A3C";

/** Light UI neutrals derived from navy */
export const ATLAS_MUTED = "#5C6370";
export const ATLAS_BORDER = "#E2E4E8";
export const ATLAS_SURFACE = "#F5F6F8";
export const ATLAS_SURFACE_ELEVATED = "#EBECEF";

/** Dark UI surfaces (navy family) */
export const ATLAS_NAVY_SURFACE = "#0C1222";
export const ATLAS_NAVY_ELEVATED = "#141C2E";
export const ATLAS_NAVY_BORDER = "#1E2A42";
export const ATLAS_NAVY_MUTED = "#8B9199";

/** Chart / funnel steps — navy scale */
export const ATLAS_CHART_SCALE = [
  ATLAS_NAVY,
  "#141C2E",
  "#2A3544",
  "#5C6370",
  "#8B9199",
] as const;

/** Portfolio & sector visuals — navy, teal, copper, sage */
export const ATLAS_PORTFOLIO_SECTORS = [
  { label: "FinTech", color: ATLAS_NAVY },
  { label: "SaaS", color: ATLAS_INTERESTED },
  { label: "ClimateTech", color: "#1A6B66" },
  { label: "Cash reserve", color: ATLAS_COPPER },
] as const;

/** Conversion funnel — light to deep engagement */
export const ATLAS_FUNNEL_COLORS = [
  ATLAS_NAVY,
  ATLAS_INTERESTED,
  "#1A6B66",
  ATLAS_COPPER,
  "#3D8A85",
] as const;
