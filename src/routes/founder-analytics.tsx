import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { AppHeader } from "@/components/app-header";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { ATLAS_FUNNEL_COLORS } from "@/lib/brand-colors";
import { TOP_INVESTOR_VIEWERS } from "@/lib/mock-data";
import { AvatarImage } from "@/components/avatar-image";
import {
  Eye,
  Users,
  PlayCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Star,
  MapPin,
  Briefcase,
  Activity,
  MessageCircle,
} from "lucide-react";

type AnalyticsRange = "7d" | "30d" | "90d" | "All";

type RangeAnalytics = {
  sparkline: number[];
  xLabels: string[];
  periodLabel: string;
  kpis: {
    pitchViews: string;
    profileClicks: string;
    watchThrough: string;
    messages: string;
    deltas: { pitchViews: string; profileClicks: string; watchThrough: string; messages: string };
    watchThroughUp: boolean;
    messagesUp: boolean;
    pitchViewsUp: boolean;
    profileClicksUp: boolean;
  };
  mini: { aiScore: string; saves: string; reshares: string };
};

const RANGE_OPTIONS: AnalyticsRange[] = ["7d", "30d", "90d", "All"];

const reachChartConfig = {
  reach: {
    label: "Daily reach",
    color: "var(--interested)",
  },
} satisfies ChartConfig;

function buildReachChartData(points: number[], xLabels: string[]) {
  if (points.length === 0) return [];
  return points.map((reach, i) => {
    const labelIndex =
      points.length === xLabels.length
        ? i
        : Math.round((i / Math.max(points.length - 1, 1)) * (xLabels.length - 1));
    return {
      day: xLabels[labelIndex] ?? `Day ${i + 1}`,
      reach,
    };
  });
}

function build30dSeries(): number[] {
  return Array.from({ length: 30 }, (_, i) =>
    Math.round(42 + i * 1.6 + Math.sin(i * 0.45) * 9 + (i % 7 === 0 ? 6 : 0)),
  );
}

function build90dSeries(): number[] {
  return Array.from({ length: 13 }, (_, i) =>
    Math.round(55 + i * 3.2 + Math.sin(i * 0.35) * 12),
  );
}

const ANALYTICS_BY_RANGE: Record<AnalyticsRange, RangeAnalytics> = {
  "7d": {
    sparkline: [38, 52, 47, 64, 71, 88, 96],
    xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    periodLabel: "last 7 days",
    kpis: {
      pitchViews: "1,284",
      profileClicks: "312",
      watchThrough: "64%",
      messages: "27",
      deltas: { pitchViews: "+38%", profileClicks: "+12%", watchThrough: "-3%", messages: "+9" },
      pitchViewsUp: true,
      profileClicksUp: true,
      watchThroughUp: false,
      messagesUp: true,
    },
    mini: { aiScore: "7.8", saves: "48", reshares: "12" },
  },
  "30d": {
    sparkline: build30dSeries(),
    xLabels: ["May 1", "May 8", "May 15", "May 22", "May 29"],
    periodLabel: "last 30 days",
    kpis: {
      pitchViews: "4,218",
      profileClicks: "1,042",
      watchThrough: "61%",
      messages: "94",
      deltas: { pitchViews: "+22%", profileClicks: "+18%", watchThrough: "+2%", messages: "+31" },
      pitchViewsUp: true,
      profileClicksUp: true,
      watchThroughUp: true,
      messagesUp: true,
    },
    mini: { aiScore: "7.6", saves: "186", reshares: "41" },
  },
  "90d": {
    sparkline: build90dSeries(),
    xLabels: ["Wk 1", "Wk 4", "Wk 7", "Wk 10", "Wk 13"],
    periodLabel: "last 90 days",
    kpis: {
      pitchViews: "11,640",
      profileClicks: "2,890",
      watchThrough: "58%",
      messages: "241",
      deltas: { pitchViews: "+41%", profileClicks: "+27%", watchThrough: "+5%", messages: "+78" },
      pitchViewsUp: true,
      profileClicksUp: true,
      watchThroughUp: true,
      messagesUp: true,
    },
    mini: { aiScore: "7.4", saves: "512", reshares: "118" },
  },
  All: {
    sparkline: [420, 480, 510, 590, 640, 720, 780, 810, 860, 920, 980, 1040],
    xLabels: ["Jun", "Aug", "Oct", "Dec", "Feb", "Apr"],
    periodLabel: "all time",
    kpis: {
      pitchViews: "28,412",
      profileClicks: "6,204",
      watchThrough: "55%",
      messages: "612",
      deltas: { pitchViews: "+156%", profileClicks: "+89%", watchThrough: "+8%", messages: "+412" },
      pitchViewsUp: true,
      profileClicksUp: true,
      watchThroughUp: true,
      messagesUp: true,
    },
    mini: { aiScore: "7.2", saves: "1,240", reshares: "286" },
  },
};

export const Route = createFileRoute("/founder-analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Atlas Founder" },
      { name: "description", content: "Real-time analytics on how investors are engaging with your pitch on Atlas." },
      { property: "og:title", content: "Founder Analytics — Atlas" },
      { property: "og:description", content: "Track pitch views, watch-throughs, saves, and inbound interest." },
    ],
  }),
  component: AnalyticsPage,
});

type KpiAccent = "navy" | "interested" | "copper";

const KPI_ACCENT: Record<
  KpiAccent,
  { card: string; icon: string; value: string }
> = {
  navy: {
    card: "border-l-4 border-l-primary",
    icon: "bg-primary/10 text-primary",
    value: "text-foreground",
  },
  interested: {
    card: "border-l-4 border-l-interested bg-interested/[0.06]",
    icon: "bg-interested/15 text-interested",
    value: "text-interested",
  },
  copper: {
    card: "border-l-4 border-l-copper bg-copper/[0.06]",
    icon: "bg-copper/15 text-copper",
    value: "text-foreground",
  },
};

function AnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRange>("7d");
  const data = ANALYTICS_BY_RANGE[range];
  const { kpis, mini } = data;
  const reachChartData = useMemo(
    () => buildReachChartData(data.sparkline, data.xLabels),
    [data.sparkline, data.xLabels],
  );

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <AppHeader />
      <main className="mx-auto max-w-7xl space-y-5 px-3 py-5 sm:px-6">
        <header className="flex flex-wrap items-end justify-between gap-3 rounded-xl border border-copper/20 bg-card px-4 py-3 shadow-sm">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-copper">
              Founder analytics
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">Pitch analytics</h1>
            <p className="text-sm text-muted-foreground">
              How investors engage with Apten (Daniel) — {data.periodLabel}.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-interested/10 px-3 py-1.5 text-xs font-semibold text-interested">
              <Activity className="h-3.5 w-3.5" />
              Live signals
            </span>
            <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-1 text-xs shadow-sm">
              {RANGE_OPTIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={`rounded-sm px-3 py-1 font-medium transition-colors ${
                    range === r
                      ? "bg-interested text-interested-foreground"
                      : "text-muted-foreground hover:bg-interested/10 hover:text-interested"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi
            label="Pitch views"
            value={kpis.pitchViews}
            delta={kpis.deltas.pitchViews}
            up={kpis.pitchViewsUp}
            icon={<Eye className="h-4 w-4" />}
            accent="navy"
          />
          <Kpi
            label="Investor profile clicks"
            value={kpis.profileClicks}
            delta={kpis.deltas.profileClicks}
            up={kpis.profileClicksUp}
            icon={<Users className="h-4 w-4" />}
            accent="interested"
          />
          <Kpi
            label="Video watch-through"
            value={kpis.watchThrough}
            delta={kpis.deltas.watchThrough}
            up={kpis.watchThroughUp}
            icon={<PlayCircle className="h-4 w-4" />}
            accent="copper"
          />
          <Kpi
            label="Inbound messages"
            value={kpis.messages}
            delta={kpis.deltas.messages}
            up={kpis.messagesUp}
            icon={<ArrowUpRight className="h-4 w-4" />}
            accent="interested"
          />
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl border border-border border-l-interested bg-card p-5 shadow-sm ring-1 ring-interested/10">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-interested">
                Daily reach
              </h2>
              <span className="text-[11px] text-muted-foreground">
                Views + interest signals · {data.periodLabel}
              </span>
            </div>
            <div className="mt-6">
              <DailyReachChart key={range} data={reachChartData} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
              <Mini label="Avg. AI score" value={mini.aiScore} tone="copper" />
              <Mini label="Saves" value={mini.saves} tone="interested" />
              <Mini label="Re-shares" value={mini.reshares} tone="navy" />
            </div>
          </div>

          <div className="rounded-xl border border-border border-l-copper bg-card p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-copper">
              Conversion funnel
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Impressions", value: 3120 },
                { label: "Pitch opened", value: 1284 },
                { label: "Video watched", value: 821 },
                { label: "Profile saved", value: 312 },
                { label: "Message sent", value: 27 },
              ].map((row, i, arr) => {
                const color = ATLAS_FUNNEL_COLORS[i] ?? ATLAS_FUNNEL_COLORS[0];
                const pct = (row.value / arr[0].value) * 100;
                return (
                  <li key={row.label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-medium">{row.label}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {row.value.toLocaleString()} · {pct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface ring-1 ring-border/60">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border bg-primary/5 px-5 py-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">
              Top investors who viewed
            </h2>
            <span className="text-[11px] text-muted-foreground">Sorted by score · {data.periodLabel}</span>
          </div>
          <ul>
            {TOP_INVESTOR_VIEWERS.map((p) => (
              <li
                key={p.name}
                className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-b-0 hover:bg-interested/[0.04]"
              >
                <AvatarImage
                  src={p.avatarUrl}
                  alt={p.name}
                  className="h-10 w-10 shrink-0 rounded-full ring-2 ring-interested/25"
                  fallback={
                    <span className="text-xs font-semibold">
                      {p.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  }
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{p.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{p.role}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {p.location}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 text-copper">
                      <Briefcase className="h-3 w-3" /> {p.check}
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-interested/15 px-2.5 py-1 text-xs font-semibold text-interested">
                  <Star className="h-3 w-3 fill-interested" /> {p.score}
                </div>
                <Link
                  to="/founder-messages"
                  className="inline-flex items-center gap-1 rounded-full bg-interested px-3 py-1.5 text-xs font-semibold text-interested-foreground hover:opacity-90"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Message
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  up,
  icon,
  accent = "navy",
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
  icon: React.ReactNode;
  accent?: KpiAccent;
}) {
  const a = KPI_ACCENT[accent];
  return (
    <div className={`rounded-xl border border-border bg-card p-4 shadow-sm ${a.card}`}>
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-[11px] font-semibold uppercase tracking-wider">{label}</span>
        <span className={`grid h-8 w-8 place-items-center rounded-full ${a.icon}`}>{icon}</span>
      </div>
      <div className={`mt-2 text-2xl font-bold tracking-tight tabular-nums ${a.value}`}>{value}</div>
      <div
        className={`mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium ${
          up ? "text-interested" : "text-bear"
        }`}
      >
        {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {delta} vs prev
      </div>
    </div>
  );
}

function Mini({ label, value, tone = "muted" }: { label: string; value: string; tone?: "muted" | "interested" | "copper" | "navy" }) {
  const valueClass =
    tone === "interested"
      ? "text-interested"
      : tone === "copper"
        ? "text-copper"
        : tone === "navy"
          ? "text-primary"
          : "text-foreground";
  return (
    <div className="rounded-md bg-surface/80 px-2 py-1">
      <div className={`text-lg font-semibold tabular-nums ${valueClass}`}>{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function DailyReachChart({ data }: { data: { day: string; reach: number }[] }) {
  const gradientId = "reachAreaFill";

  return (
    <ChartContainer config={reachChartConfig} className="aspect-auto h-[11rem] w-full">
      <AreaChart
        data={data}
        margin={{ top: 12, right: 12, left: 4, bottom: 4 }}
        accessibilityLayer
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-reach)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--color-reach)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="var(--border)" strokeOpacity={0.7} />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          minTickGap={24}
          interval="preserveStartEnd"
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
        />
        <YAxis
          width={36}
          tickLine={false}
          axisLine={false}
          tickMargin={6}
          tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
          domain={["dataMin - 10", "dataMax + 10"]}
        />
        <ChartTooltip
          cursor={{ stroke: "var(--interested)", strokeWidth: 1, strokeDasharray: "4 4" }}
          content={
            <ChartTooltipContent
              labelFormatter={(label) => label}
              formatter={(value) => (
                <span className="font-semibold tabular-nums text-foreground">
                  {Number(value).toLocaleString()} signals
                </span>
              )}
            />
          }
        />
        <Area
          type="monotone"
          dataKey="reach"
          stroke="var(--color-reach)"
          strokeWidth={2.5}
          fill={`url(#${gradientId})`}
          dot={{
            fill: "var(--color-reach)",
            stroke: "var(--background)",
            strokeWidth: 2,
            r: 4,
          }}
          activeDot={{
            r: 7,
            fill: "var(--color-reach)",
            stroke: "var(--background)",
            strokeWidth: 2,
          }}
          isAnimationActive
          animationDuration={400}
        />
      </AreaChart>
    </ChartContainer>
  );
}
