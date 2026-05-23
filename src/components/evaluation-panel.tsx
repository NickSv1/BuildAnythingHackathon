import { useState } from "react";
import type { Startup } from "@/lib/mock-data";
import { AvatarImage } from "@/components/avatar-image";
import { PitchVideoEmbed } from "@/components/pitch-video-embed";
import { AiAnalysisBlock } from "@/components/ai-analysis-block";
import { DealActionBar } from "@/components/deal-action-bar";
import { toggleSaved, useSaved } from "@/lib/deal-interactions";
import {
  MapPin,
  Linkedin,
  Play,
  FileText,
  TrendingUp,
  AlertTriangle,
  Bookmark,
  Share2,
  X,
  ArrowRight,
  Info,
  Check,
  Globe2,
  Building2,
} from "lucide-react";
import { toast } from "sonner";
import { getIndustryInsights } from "@/lib/industry-insights";

export function EvaluationPanel({ s }: { s: Startup }) {
  const [transcript, setTranscript] = useState(false);
  const saved = useSaved(s.id);

  function handleSaveHeader() {
    const now = toggleSaved(s.id);
    toast.success(
      now ? `${s.name} saved to your watchlist` : `Removed ${s.name} from watchlist`,
    );
  }

  function handleShareHeader() {
    const url = `${window.location.origin}/?deal=${s.id}`;
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(url).then(() => {
        toast.success("Deal link copied to clipboard");
      });
    } else {
      toast.success("Share link ready");
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-surface">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          {/* Hero */}
          <div className="flex items-start gap-4 rounded-xl border border-primary/15 bg-card p-4 shadow-sm">
            <AvatarImage
              src={s.logoUrl}
              alt={`${s.name} logo`}
              className="h-16 w-16 shrink-0 rounded-xl ring-2 ring-interested/25"
              fallback={
                <span className="text-xl font-bold text-foreground">{s.logo}</span>
              }
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">{s.name}</h1>
                <span className="rounded-full bg-interested/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-interested ring-1 ring-interested/25">
                  {s.stage} Phase
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {s.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  Founders:
                  {s.founders.map((f, i) => (
                    <a
                      key={f.name}
                      href={f.linkedin}
                      className="inline-flex items-center gap-1 text-foreground hover:text-interested"
                    >
                      {f.name}
                      <Linkedin className="h-3 w-3" />
                      {i < s.founders.length - 1 && (
                        <span className="text-muted-foreground">,</span>
                      )}
                    </a>
                  ))}
                </span>
              </div>
              <div className="mt-2 text-sm">
                <span className="text-muted-foreground">Raising </span>
                <span className="font-semibold text-interested">{s.raiseAmount}</span>
                <span className="text-muted-foreground"> at </span>
                <span className="font-semibold text-primary">{s.valuationCap}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <IconButton
                active={saved}
                label="Save"
                onClick={handleSaveHeader}
              >
                {saved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
              </IconButton>
              <IconButton label="Share" onClick={handleShareHeader}>
                <Share2 className="h-4 w-4" />
              </IconButton>
            </div>
          </div>

          {s.tagline && (
            <p className="rounded-lg border border-border bg-card px-4 py-3 text-base leading-relaxed text-foreground">
              {s.tagline}
            </p>
          )}

          {/* Video player */}
          <div>
            {s.youtubeVideoId ? (
              <PitchVideoEmbed
                videoId={s.youtubeVideoId}
                title={`${s.name} founder pitch`}
                className="rounded-md border border-border"
              />
            ) : (
              <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-surface">
                <div className="absolute inset-0 grid place-items-center">
                  <div className="absolute inset-0 bg-primary/5" />
                  <button
                    type="button"
                    className="group relative grid h-16 w-16 place-items-center rounded-full bg-foreground/10 backdrop-blur-md ring-1 ring-foreground/20 transition-transform hover:scale-110"
                  >
                    <Play className="h-6 w-6 translate-x-0.5 fill-foreground text-foreground" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="rounded-sm bg-background/70 px-2 py-1 backdrop-blur">
                    Founder Pitch · 2:48
                  </span>
                  <span className="rounded-sm bg-background/70 px-2 py-1 backdrop-blur">
                    HD
                  </span>
                </div>
              </div>
            )}
            <p className="mt-4 text-sm leading-relaxed text-foreground">{s.summary}</p>
            <button
              type="button"
              onClick={() => setTranscript((t) => !t)}
              className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-interested/25 bg-interested/5 px-3 py-1.5 text-xs font-medium text-interested hover:bg-interested/15"
            >
              <FileText className="h-3.5 w-3.5" />
              {transcript ? "Hide" : "View"} Transcript
            </button>
            {transcript && (
              <div className="mt-2 rounded-md border border-border bg-surface p-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">[00:02]</span> Hi, I'm a co-founder
                of {s.name}. We're building {s.summary.toLowerCase()}{" "}
                <span className="font-medium text-foreground">[00:18]</span> Our wedge is —
                we've already proven {s.tractionNote.toLowerCase()}, and the market opportunity
                in front of us is enormous…
              </div>
            )}
          </div>

          <AiAnalysisBlock s={s} />

          <IndustryInsightsSection s={s} />

          {/* Metadata grid */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <MetaCard label="Sector & Focus" tone="navy">
              <div className="flex flex-wrap gap-1">
                {s.focusTags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-primary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </MetaCard>
            <MetaCard label="Current Stage" tone="interested">
              <div className="text-sm font-medium text-foreground">{s.currentStage}</div>
              <div className="mt-0.5 text-xs font-medium text-interested">{s.arr}</div>
            </MetaCard>
            <MetaCard label="Funding Progress" tone="copper">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold tabular-nums text-copper">{s.raisedSoFar}%</span>
                <span className="text-xs text-muted-foreground">of {s.raiseAmount}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-interested"
                  style={{ width: `${s.raisedSoFar}%` }}
                />
              </div>
            </MetaCard>
            <MetaCard label="Traction Highlight" tone="interested">
              <div className="text-[13px] leading-snug text-foreground">{s.tractionNote}</div>
            </MetaCard>
          </div>

          <BullBearCommittee composite={s.composite} bull={s.bull} bear={s.bear} />

          <DealActionBar s={s} layout="inline" />
        </div>
      </div>

      {/* Footer actions */}
      <div className="shrink-0 border-t border-interested/15 bg-card/95 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="hidden text-xs text-muted-foreground sm:block">
            Average response time for this founder is{" "}
            <span className="font-medium text-interested">4 hours</span>
          </div>
          <div className="ml-auto flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => toast.message(`${s.name} hidden from your feed`)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-primary"
            >
              <X className="h-4 w-4" /> Pass / Hide Deal
            </button>
            <button
              type="button"
              onClick={() =>
                toast.success(
                  `Connection request sent to ${s.founders[0]?.name ?? "the founder"}`,
                )
              }
              className="inline-flex items-center gap-2 rounded-full bg-interested px-5 py-2.5 text-sm font-semibold text-interested-foreground shadow-[0_2px_12px_-4px_var(--interested)] hover:opacity-90"
            >
              Request Pitch Deck &amp; Connect
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label?: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:border-interested/40 hover:text-interested ${
        active ? "bg-interested/15 text-interested ring-1 ring-interested/30" : ""
      }`}
    >
      {children}
    </button>
  );
}

function MetaCard({
  label,
  children,
  tone = "navy",
}: {
  label: string;
  children: React.ReactNode;
  tone?: "navy" | "interested" | "copper";
}) {
  const styles = {
    navy: "border-l-primary bg-card border-primary/15",
    interested: "border-l-interested bg-interested/[0.06] border-interested/20",
    copper: "border-l-copper bg-copper/[0.06] border-copper/20",
  };
  const labelClass = {
    navy: "text-primary",
    interested: "text-interested",
    copper: "text-copper",
  };

  return (
    <div className={`rounded-xl border border-l-4 p-3 shadow-sm ${styles[tone]}`}>
      <div
        className={`text-[10.5px] font-semibold uppercase tracking-wider ${labelClass[tone]}`}
      >
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function IndustryInsightsSection({ s }: { s: Startup }) {
  const insights = getIndustryInsights(s);

  return (
    <section className="overflow-hidden rounded-xl border border-primary/20 bg-card shadow-sm ring-1 ring-primary/10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/15 bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10">
            <Globe2 className="h-4 w-4" />
          </span>
          Industry insights
        </div>
        <span className="rounded-full bg-interested/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-interested">
          {insights.category}
        </span>
      </div>

      <div className="space-y-4 p-4">
        <p className="text-sm leading-relaxed text-foreground/90">{insights.summary}</p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-l-4 border-l-interested border-interested/20 bg-interested/[0.06] p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-interested">
              Market size
            </div>
            <div className="mt-1 text-sm font-semibold text-foreground">{insights.marketSize}</div>
          </div>
          <div className="rounded-lg border border-l-4 border-l-copper border-copper/20 bg-copper/[0.06] p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-copper">
              Growth
            </div>
            <div className="mt-1 text-sm font-semibold text-foreground">{insights.growthRate}</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-interested">
              <TrendingUp className="h-3.5 w-3.5" />
              Key trends
            </div>
            <ul className="space-y-2">
              {insights.trends.map((t) => (
                <li key={t} className="flex gap-2 text-[13px] leading-snug text-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-interested" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-wider text-primary">
              <Building2 className="h-3.5 w-3.5" />
              Competitive landscape
            </div>
            <div className="flex flex-wrap gap-1.5">
              {insights.competitors.map((c) => (
                <span
                  key={c}
                  className="rounded-sm border border-border bg-surface px-2 py-1 text-[11px] font-medium text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-bull-emphasis/20 bg-bull-emphasis/[0.08] p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-bull-emphasis">
              Tailwinds
            </div>
            <ul className="mt-2 space-y-1.5">
              {insights.tailwinds.map((t) => (
                <li key={t} className="text-[12px] leading-snug text-foreground/90">
                  · {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-bear-emphasis/20 bg-bear-emphasis/[0.08] p-3">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-bear-emphasis">
              Headwinds
            </div>
            <ul className="mt-2 space-y-1.5">
              {insights.headwinds.map((t) => (
                <li key={t} className="text-[12px] leading-snug text-foreground/90">
                  · {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

type CompositeLean = "bull" | "bear" | "neutral";

function getCompositeLean(value: number): CompositeLean {
  if (value >= 58) return "bull";
  if (value <= 42) return "bear";
  return "neutral";
}

function BullBearCommittee({
  composite,
  bull,
  bear,
}: {
  composite: number;
  bull: string[];
  bear: string[];
}) {
  const lean = getCompositeLean(composite);

  const shell =
    lean === "bull"
      ? "border-bull-emphasis/35 ring-1 ring-bull-emphasis/25"
      : lean === "bear"
        ? "border-bear-emphasis/35 ring-1 ring-bear-emphasis/25"
        : "border-border";

  const header =
    lean === "bull"
      ? "border-bull-emphasis/20 bg-bull-emphasis/10"
      : lean === "bear"
        ? "border-bear-emphasis/20 bg-bear-emphasis/10"
        : "border-border bg-muted/30";

  const verdict =
    lean === "bull"
      ? { label: "Bullish composite", className: "bg-bull-emphasis/15 text-bull-emphasis" }
      : lean === "bear"
        ? { label: "Bearish composite", className: "bg-bear-emphasis/15 text-bear-emphasis" }
        : { label: "Mixed composite", className: "bg-muted text-muted-foreground" };

  const gridCols =
    lean === "bull"
      ? "md:grid-cols-[1.35fr_0.65fr]"
      : lean === "bear"
        ? "md:grid-cols-[0.65fr_1.35fr]"
        : "md:grid-cols-2";

  return (
    <div className={`overflow-hidden rounded-xl border bg-card shadow-sm ${shell}`}>
      <div
        className={`flex flex-wrap items-start justify-between gap-3 border-b px-4 py-3 ${header}`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div
              className={`flex items-center gap-2 text-sm font-semibold ${
                lean === "bull"
                  ? "text-bull-emphasis"
                  : lean === "bear"
                    ? "text-bear-emphasis"
                    : "text-foreground"
              }`}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold ${
                  lean === "bull"
                    ? "bg-bull-emphasis/20 text-bull-emphasis"
                    : lean === "bear"
                      ? "bg-bear-emphasis/20 text-bear-emphasis"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                AI
              </span>
              Bull &amp; Bear Committee
            </div>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${verdict.className}`}
            >
              {verdict.label}
            </span>
          </div>
          <div className="mt-1 flex max-w-xl items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
            <Info className="mt-0.5 h-3 w-3 shrink-0" />
            Algorithmic thinking tool designed to stress-test your thesis. Final investment
            decisions remain with the human user.
          </div>
        </div>
        <CompositeGauge value={composite} lean={lean} />
      </div>

      <div className={`grid grid-cols-1 gap-px bg-border/80 ${gridCols}`}>
        <DebateBox tone="bull" items={bull} lean={lean} />
        <DebateBox tone="bear" items={bear} lean={lean} />
      </div>
    </div>
  );
}

function CompositeGauge({ value, lean }: { value: number; lean: CompositeLean }) {
  const markerColor =
    lean === "bull"
      ? "var(--bull-emphasis)"
      : lean === "bear"
        ? "var(--bear-emphasis)"
        : "var(--foreground)";

  return (
    <div className="w-full min-w-[14rem] sm:w-64">
      <div className="mb-1.5 flex items-center justify-between text-[10.5px] font-semibold uppercase tracking-wider">
        <span className="text-bear-emphasis">Bear</span>
        <span
          className={
            lean === "bull"
              ? "text-bull-emphasis"
              : lean === "bear"
                ? "text-bear-emphasis"
                : "text-muted-foreground"
          }
        >
          Composite {value}/100
        </span>
        <span className="text-bull-emphasis">Bull</span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-bear-emphasis/20 ring-1 ring-border/50">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-bull-emphasis transition-all duration-500"
          style={{ width: `${value}%` }}
        />
        <div
          className="absolute top-1/2 z-10 h-5 w-1.5 -translate-y-1/2 rounded-full shadow-md ring-2 ring-card"
          style={{ left: `calc(${value}% - 3px)`, backgroundColor: markerColor }}
        />
      </div>
      <p className="mt-1.5 text-center text-[10px] font-medium text-muted-foreground">
        {lean === "bull"
          ? "Committee leans bull — green zone dominant"
          : lean === "bear"
            ? "Committee leans bear — red zone dominant"
            : "Balanced bull/bear read"}
      </p>
    </div>
  );
}

function DebateBox({
  tone,
  items,
  lean,
}: {
  tone: "bull" | "bear";
  items: string[];
  lean: CompositeLean;
}) {
  const isBull = tone === "bull";
  const emphasized =
    (lean === "bull" && isBull) || (lean === "bear" && !isBull) || lean === "neutral";
  const deemphasized =
    (lean === "bull" && !isBull) || (lean === "bear" && isBull);

  const shell = isBull
    ? emphasized
      ? "bg-bull-emphasis/[0.14] border-l-4 border-l-bull-emphasis"
      : deemphasized
        ? "bg-bull-emphasis/[0.03] opacity-75"
        : "bg-bull-emphasis/[0.08]"
    : emphasized
      ? "bg-bear-emphasis/[0.14] border-l-4 border-l-bear-emphasis"
      : deemphasized
        ? "bg-bear-emphasis/[0.03] opacity-75"
        : "bg-bear-emphasis/[0.08]";

  const titleClass = isBull ? "text-bull-emphasis" : "text-bear-emphasis";
  const dotClass = isBull ? "bg-bull-emphasis" : "bg-bear-emphasis";

  return (
    <div className={`p-4 transition-all ${shell}`}>
      <div className="mb-3 flex items-center gap-2">
        {isBull ? (
          <TrendingUp className={`h-4 w-4 ${titleClass}`} />
        ) : (
          <AlertTriangle className={`h-4 w-4 ${titleClass}`} />
        )}
        <span className={`text-xs font-semibold uppercase tracking-wider ${titleClass}`}>
          {isBull ? "The Bull Case" : "The Bear Case"}
        </span>
        {emphasized && lean !== "neutral" && (
          <span
            className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
              isBull ? "bg-bull-emphasis/20 text-bull-emphasis" : "bg-bear-emphasis/20 text-bear-emphasis"
            }`}
          >
            Primary
          </span>
        )}
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-[13px] leading-snug text-foreground/90">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
