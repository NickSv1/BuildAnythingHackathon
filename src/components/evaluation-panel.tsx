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
} from "lucide-react";
import { toast } from "sonner";

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
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="space-y-6 p-6">
          {/* Hero */}
          <div className="flex items-start gap-4">
            <AvatarImage
              src={s.logoUrl}
              alt={`${s.name} logo`}
              className="h-16 w-16 shrink-0 rounded-xl ring-1 ring-border"
              fallback={
                <span className="text-xl font-bold text-foreground">{s.logo}</span>
              }
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">{s.name}</h1>
                <span className="rounded-sm bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground ring-1 ring-border">
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
                      className="inline-flex items-center gap-1 text-foreground hover:text-primary"
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
                <span className="font-semibold text-foreground">{s.raiseAmount}</span>
                <span className="text-muted-foreground"> at </span>
                <span className="font-semibold text-foreground">{s.valuationCap}</span>
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
            <p className="text-base leading-relaxed text-muted-foreground">{s.tagline}</p>
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
              <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-gradient-to-br from-surface to-background">
                <div className="absolute inset-0 grid place-items-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.16_162/0.08),transparent_60%)]" />
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
              className="mt-2 inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary/40"
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

          {/* Metadata grid */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <MetaCard label="Sector & Focus">
              <div className="flex flex-wrap gap-1">
                {s.focusTags.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-border bg-background/40 px-1.5 py-0.5 text-[10.5px] font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </MetaCard>
            <MetaCard label="Current Stage">
              <div className="text-sm font-medium text-foreground">{s.currentStage}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{s.arr}</div>
            </MetaCard>
            <MetaCard label="Funding Progress">
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold tabular-nums">{s.raisedSoFar}%</span>
                <span className="text-xs text-muted-foreground">of {s.raiseAmount}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${s.raisedSoFar}%` }}
                />
              </div>
            </MetaCard>
            <MetaCard label="Traction Highlight" accent>
              <div className="text-[13px] leading-snug text-foreground">{s.tractionNote}</div>
            </MetaCard>
          </div>

          {/* Bull & Bear */}
          <div className="rounded-md border border-border bg-surface">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="grid h-5 w-5 place-items-center rounded-sm bg-primary/15 text-primary">
                    AI
                  </span>
                  Bull &amp; Bear Committee
                </div>
                <div className="mt-1 flex max-w-xl items-start gap-1.5 text-[11px] leading-snug text-muted-foreground">
                  <Info className="mt-0.5 h-3 w-3 shrink-0" />
                  Algorithmic thinking tool designed to stress-test your thesis. Final
                  investment decisions remain with the human user.
                </div>
              </div>
              <CompositeGauge value={s.composite} />
            </div>

            <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
              <DebateBox tone="bull" items={s.bull} />
              <DebateBox tone="bear" items={s.bear} />
            </div>
          </div>

          <DealActionBar s={s} layout="inline" />
        </div>
      </div>

      {/* Footer actions */}
      <div className="shrink-0 border-t border-border bg-background/95 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="hidden text-xs text-muted-foreground sm:block">
            Average response time for this founder is{" "}
            <span className="font-medium text-foreground">4 hours</span>
          </div>
          <div className="ml-auto flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => toast.message(`${s.name} hidden from your feed`)}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground hover:border-destructive/50 hover:text-destructive"
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
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
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
      className={`grid h-9 w-9 place-items-center rounded-sm border border-border bg-surface text-muted-foreground hover:border-primary/40 hover:text-foreground ${
        active ? "bg-primary/15 text-primary ring-1 ring-primary/30" : ""
      }`}
    >
      {children}
    </button>
  );
}

function MetaCard({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-md border p-3 ${
        accent ? "border-primary/30 bg-primary/5" : "border-border bg-surface"
      }`}
    >
      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function CompositeGauge({ value }: { value: number }) {
  return (
    <div className="w-56">
      <div className="mb-1 flex items-center justify-between text-[10.5px] font-medium uppercase tracking-wider">
        <span className="text-destructive">Bear</span>
        <span className="text-muted-foreground">Composite {value}/100</span>
        <span className="text-primary">Bull</span>
      </div>
      <div className="relative h-2 rounded-full bg-gradient-to-r from-destructive/40 via-muted to-primary/60">
        <div
          className="absolute top-1/2 h-4 w-1 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_0_2px_var(--background)]"
          style={{ left: `${value}%` }}
        />
      </div>
    </div>
  );
}

function DebateBox({ tone, items }: { tone: "bull" | "bear"; items: string[] }) {
  const isBull = tone === "bull";
  return (
    <div className={`p-4 ${isBull ? "bg-bull-tint" : "bg-bear-tint"}`}>
      <div className="mb-3 flex items-center gap-2">
        {isBull ? (
          <TrendingUp className="h-4 w-4 text-primary" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-destructive" />
        )}
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${
            isBull ? "text-primary" : "text-destructive"
          }`}
        >
          {isBull ? "The Bull Case" : "The Bear Case"}
        </span>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-[13px] leading-snug text-foreground/90">
            <span
              className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${
                isBull ? "bg-primary" : "bg-destructive"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
