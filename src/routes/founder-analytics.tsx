import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
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
} from "lucide-react";

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

function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-surface text-foreground">
      <AppHeader />
      <main className="mx-auto max-w-7xl space-y-5 px-3 py-5 sm:px-6">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Pitch analytics</h1>
            <p className="text-sm text-muted-foreground">How investors are engaging with Clearspace this week.</p>
          </div>
          <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1 text-xs shadow-sm">
            {["7d", "30d", "90d", "All"].map((r, i) => (
              <button
                key={r}
                className={`rounded-sm px-3 py-1 font-medium transition-colors ${
                  i === 0 ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </header>

        {/* KPI strip */}
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Kpi label="Pitch views" value="1,284" delta="+38%" up icon={<Eye className="h-4 w-4" />} />
          <Kpi label="Investor profile clicks" value="312" delta="+12%" up icon={<Users className="h-4 w-4" />} />
          <Kpi label="Video watch-through" value="64%" delta="-3%" icon={<PlayCircle className="h-4 w-4" />} />
          <Kpi label="Inbound messages" value="27" delta="+9" up icon={<ArrowUpRight className="h-4 w-4" />} />
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          {/* Trend chart */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Daily reach</h2>
              <span className="text-[11px] text-muted-foreground">Views + interest signals</span>
            </div>
            <div className="mt-6">
              <Sparkline />
              <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <span key={d}>{d}</span>)}
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
              <Mini label="Avg. AI score" value="7.8" />
              <Mini label="Saves" value="48" />
              <Mini label="Re-shares" value="12" />
            </div>
          </div>

          {/* Funnel */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Conversion funnel</h2>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Impressions", value: 3120, color: "oklch(0.7 0.06 220)" },
                { label: "Pitch opened", value: 1284, color: "oklch(0.65 0.08 200)" },
                { label: "Video watched", value: 821, color: "oklch(0.6 0.09 180)" },
                { label: "Profile saved", value: 312, color: "oklch(0.55 0.1 160)" },
                { label: "Message sent", value: 27, color: "oklch(0.5 0.12 140)" },
              ].map((row, i, arr) => {
                const pct = (row.value / arr[0].value) * 100;
                return (
                  <li key={row.label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-medium">{row.label}</span>
                      <span className="tabular-nums text-muted-foreground">{row.value.toLocaleString()} · {pct.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: row.color }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Top investors viewing */}
        <section className="rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Top investors who viewed</h2>
            <span className="text-[11px] text-muted-foreground">Sorted by score · last 7d</span>
          </div>
          <ul>
            {TOP_INVESTOR_VIEWERS.map((p) => (
              <li key={p.name} className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-b-0 hover:bg-surface">
                <AvatarImage
                  src={p.avatarUrl}
                  alt={p.name}
                  className="h-10 w-10 shrink-0 rounded-full ring-1 ring-border"
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
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.location}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" /> {p.check}</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  <Star className="h-3 w-3 fill-primary" /> {p.score}
                </div>
                <button className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:opacity-90">
                  Message
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

function Kpi({ label, value, delta, up, icon }: { label: string; value: string; delta: string; up?: boolean; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-[11px] font-semibold uppercase tracking-wider">{label}</span>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-bold tracking-tight tabular-nums">{value}</div>
      <div className={`mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium ${up ? "text-bull" : "text-bear"}`}>
        {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {delta} vs prev
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-lg font-semibold tabular-nums">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function Sparkline() {
  // Deterministic SSR-safe data
  const pts = [38, 52, 47, 64, 71, 88, 96];
  const max = Math.max(...pts);
  const w = 100;
  const h = 40;
  const step = w / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * h}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-32 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sparkFill)" />
      <path d={path} fill="none" stroke="var(--primary)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      {pts.map((p, i) => (
        <circle key={i} cx={i * step} cy={h - (p / max) * h} r="1.4" fill="var(--primary)" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
