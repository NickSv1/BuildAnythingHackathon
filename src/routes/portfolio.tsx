import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { ATLAS_PORTFOLIO_SECTORS } from "@/lib/brand-colors";
import { STARTUPS } from "@/lib/mock-data";
import { useInterested } from "@/lib/deal-interactions";
import { DEMO_STARTUP_ID } from "@/lib/demo-store";
import { AvatarImage } from "@/components/avatar-image";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Plus,
  ArrowUpRight,
  Filter,
} from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Atlas" },
      { name: "description", content: "Track your angel investments, valuations, and check sizes across the Atlas portfolio." },
      { property: "og:title", content: "Portfolio — Atlas" },
      { property: "og:description", content: "Live performance tracking for your angel portfolio." },
    ],
  }),
  component: PortfolioPage,
});

type Holding = {
  startupId: string;
  check: number;
  ownership: number;
  multiple: number;
  status: "Active" | "Markup" | "Exited" | "Watchlist";
  date: string;
};

const HOLDINGS: Holding[] = [
  { startupId: "zenefits", check: 50000, ownership: 0.42, multiple: 3.8, status: "Markup", date: "Jul 2023" },
  { startupId: "keywords-ai", check: 25000, ownership: 0.72, multiple: 2.4, status: "Markup", date: "Mar 2024" },
  { startupId: "clearspace", check: 15000, ownership: 0.19, multiple: 1.0, status: "Active", date: "Jan 2025" },
];

const FILTER_STYLES: Record<string, { active: string; idle: string }> = {
  all: {
    active: "bg-primary text-primary-foreground",
    idle: "text-muted-foreground hover:bg-primary/5 hover:text-primary",
  },
  Active: {
    active: "bg-interested text-interested-foreground",
    idle: "text-muted-foreground hover:bg-interested/10 hover:text-interested",
  },
  Markup: {
    active: "bg-interested/20 text-interested ring-1 ring-interested/30",
    idle: "text-muted-foreground hover:bg-interested/10 hover:text-interested",
  },
  Exited: {
    active: "bg-copper text-copper-foreground",
    idle: "text-muted-foreground hover:bg-copper/10 hover:text-copper",
  },
};

function PortfolioPage() {
  const [filter, setFilter] = useState<"all" | "Active" | "Markup" | "Exited">("all");
  const interestedClearspace = useInterested(DEMO_STARTUP_ID);

  const totalDeployed = HOLDINGS.reduce((s, h) => s + h.check, 0);
  const totalValue = HOLDINGS.reduce((s, h) => s + h.check * h.multiple, 0);
  const moic = totalValue / totalDeployed;
  const visible = filter === "all" ? HOLDINGS : HOLDINGS.filter((h) => h.status === filter);

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <AppHeader />
      <main className="mx-auto max-w-7xl space-y-5 px-3 py-5 sm:px-6">
        <header className="rounded-xl border border-primary/15 bg-card px-4 py-3 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-interested">
                Portfolio overview
              </p>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Your angel book</h1>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-interested/10 px-3 py-1.5 text-xs font-semibold text-interested">
              <TrendingUp className="h-3.5 w-3.5" />
              {moic.toFixed(2)}× blended MOIC
            </div>
          </div>
        </header>

        {interestedClearspace && (
          <div className="rounded-xl border border-interested/30 bg-interested/10 px-4 py-3 text-sm ring-1 ring-interested/15">
            <span className="font-semibold text-interested">Apten</span>
            <span className="text-muted-foreground">
              {" "}
              — marked interested. Tracking in your portfolio below alongside active checks.
            </span>
          </div>
        )}

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total deployed"
            value={`$${(totalDeployed / 1000).toFixed(0)}k`}
            sub={`across ${HOLDINGS.length} deals`}
            icon={<DollarSign className="h-4 w-4" />}
            accent="navy"
          />
          <StatCard
            label="Current value"
            value={`$${(totalValue / 1000).toFixed(0)}k`}
            sub={`${moic.toFixed(2)}× MOIC`}
            icon={<TrendingUp className="h-4 w-4" />}
            accent="interested"
          />
          <StatCard
            label="Unrealized gain"
            value={`+$${((totalValue - totalDeployed) / 1000).toFixed(0)}k`}
            sub="paper, last round"
            icon={<ArrowUpRight className="h-4 w-4" />}
            accent="interested"
          />
          <StatCard
            label="Avg check"
            value={`$${(totalDeployed / HOLDINGS.length / 1000).toFixed(0)}k`}
            sub="last 12 months"
            icon={<PieChart className="h-4 w-4" />}
            accent="copper"
          />
        </section>

        <section className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Allocation by sector
            </h2>
            <span className="text-[11px] text-muted-foreground">Weighted by current value</span>
          </div>
          <AllocationBar />
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Holdings</h2>
            <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1 text-xs shadow-sm">
              <Filter className="ml-1 h-3 w-3 text-muted-foreground" />
              {(["all", "Active", "Markup", "Exited"] as const).map((f) => {
                const styles = FILTER_STYLES[f];
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`rounded-sm px-2.5 py-1 font-medium transition-colors ${
                      filter === f ? styles.active : styles.idle
                    }`}
                  >
                    {f === "all" ? "All" : f}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 border-b border-border bg-primary/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-primary/80 sm:grid">
              <span>Company</span>
              <span className="text-right">Check</span>
              <span className="text-right">Ownership</span>
              <span className="text-right">Multiple</span>
              <span>Status</span>
              <span />
            </div>
            {visible.map((h) => {
              const s = STARTUPS.find((x) => x.id === h.startupId)!;
              const isUp = h.multiple >= 1;
              return (
                <div
                  key={h.startupId}
                  className="grid grid-cols-1 gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-interested/[0.04] sm:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] sm:items-center sm:gap-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <AvatarImage
                      src={s.logoUrl}
                      alt={`${s.name} logo`}
                      className="h-10 w-10 shrink-0 rounded-md ring-2 ring-interested/20"
                      fallback={<span className="text-sm font-bold">{s.logo}</span>}
                    />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{s.name}</div>
                      <div className="truncate text-[11px] text-muted-foreground">
                        {s.sector} · {s.stage} · invested {h.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm font-medium tabular-nums text-primary">
                    ${(h.check / 1000).toFixed(0)}k
                  </div>
                  <div className="text-right text-sm tabular-nums text-copper">{h.ownership.toFixed(2)}%</div>
                  <div
                    className={`flex items-center justify-end gap-1 text-sm font-semibold tabular-nums ${
                      isUp ? "text-interested" : "text-bear"
                    }`}
                  >
                    {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {h.multiple.toFixed(2)}×
                  </div>
                  <div>
                    <StatusPill status={h.status} />
                  </div>
                  <button
                    type="button"
                    className="rounded-md border border-interested/25 bg-interested/5 px-3 py-1.5 text-xs font-medium text-interested hover:bg-interested/15"
                  >
                    Open
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between rounded-xl border border-dashed border-copper/35 bg-copper/5 p-4 shadow-sm">
            <div>
              <div className="text-sm font-semibold text-copper">Watchlist · 9 startups</div>
              <div className="text-xs text-muted-foreground">Tracking signals; no check committed yet.</div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-interested px-4 py-2 text-xs font-semibold text-interested-foreground hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" /> Log a new investment
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

type StatAccent = "navy" | "interested" | "copper";

const STAT_ACCENT: Record<
  StatAccent,
  { card: string; icon: string; value: string; sub: string }
> = {
  navy: {
    card: "border-l-4 border-l-primary bg-card",
    icon: "bg-primary/10 text-primary",
    value: "text-foreground",
    sub: "text-muted-foreground",
  },
  interested: {
    card: "border-l-4 border-l-interested bg-interested/[0.06]",
    icon: "bg-interested/15 text-interested",
    value: "text-interested",
    sub: "text-interested/80",
  },
  copper: {
    card: "border-l-4 border-l-copper bg-copper/[0.06]",
    icon: "bg-copper/15 text-copper",
    value: "text-foreground",
    sub: "text-copper",
  },
};

function StatCard({
  label,
  value,
  sub,
  icon,
  accent = "navy",
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  accent?: StatAccent;
}) {
  const a = STAT_ACCENT[accent];
  return (
    <div className={`rounded-xl border border-border p-4 shadow-sm ${a.card}`}>
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-[11px] font-semibold uppercase tracking-wider">{label}</span>
        <span className={`grid h-8 w-8 place-items-center rounded-full ${a.icon}`}>{icon}</span>
      </div>
      <div className={`mt-2 text-2xl font-bold tracking-tight tabular-nums ${a.value}`}>{value}</div>
      <div className={`mt-0.5 text-[11px] font-medium ${a.sub}`}>{sub}</div>
    </div>
  );
}

function StatusPill({ status }: { status: Holding["status"] }) {
  const map: Record<Holding["status"], string> = {
    Active: "bg-interested/15 text-interested ring-interested/35",
    Markup: "bg-interested/25 text-interested ring-interested/40",
    Exited: "bg-copper/15 text-copper ring-copper/35",
    Watchlist: "bg-primary/10 text-primary ring-primary/25",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${map[status]}`}>
      {status}
    </span>
  );
}

function AllocationBar() {
  const slices = [
    { label: "FinTech", pct: 52, color: ATLAS_PORTFOLIO_SECTORS[0].color },
    { label: "SaaS", pct: 28, color: ATLAS_PORTFOLIO_SECTORS[1].color },
    { label: "ClimateTech", pct: 12, color: ATLAS_PORTFOLIO_SECTORS[2].color },
    { label: "Cash reserve", pct: 8, color: ATLAS_PORTFOLIO_SECTORS[3].color },
  ];
  return (
    <div>
      <div className="flex h-4 w-full overflow-hidden rounded-full ring-1 ring-border">
        {slices.map((s) => (
          <div
            key={s.label}
            style={{ width: `${s.pct}%`, background: s.color }}
            title={`${s.label} ${s.pct}%`}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
        {slices.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm ring-1 ring-border/50" style={{ background: s.color }} />
            <span className="font-medium">{s.label}</span>
            <span className="tabular-nums text-muted-foreground">{s.pct}%</span>
          </span>
        ))}
      </div>
    </div>
  );
}
