import type { Startup } from "@/lib/mock-data";
import { AvatarImage } from "@/components/avatar-image";
import { PitchVideoEmbed } from "@/components/pitch-video-embed";
import { DealActionBar } from "@/components/deal-action-bar";
import {
  ShieldCheck,
  MapPin,
  TrendingUp,
  Play,
  ArrowRight,
  ThumbsUp,
} from "lucide-react";

export function FeedPost({
  s,
  onOpen,
  postedAgo,
  isOwnListing,
}: {
  s: Startup;
  onOpen: () => void;
  postedAgo?: string;
  isOwnListing?: boolean;
}) {
  return (
    <article
      className={`rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md ${
        isOwnListing ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
      }`}
    >
      {/* Header */}
      <header className="flex items-start gap-3 px-4 pt-4">
        <AvatarImage
          src={s.logoUrl}
          alt={`${s.name} logo`}
          className="h-12 w-12 shrink-0 rounded-full ring-1 ring-border"
          fallback={
            <span className="text-base font-bold text-foreground">{s.logo}</span>
          }
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={onOpen}
              className="truncate font-semibold tracking-tight hover:underline"
            >
              {s.name}
            </button>
            {s.verified && <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />}
            <span className="text-muted-foreground">·</span>
            <span className="text-xs font-medium text-primary">Raising {s.raiseAmount}</span>
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            {s.sector} · {s.stage} · {s.founders[0].name} + {s.founders.length - 1} other
          </div>
          <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3" /> {s.location}
            {postedAgo ? (
              <>
                <span>·</span>
                <span className="font-medium text-primary">Posted {postedAgo}</span>
              </>
            ) : (
              <>
                <span>·</span>
                <span>{((s.aiScore * 3) | 0) + 2}h</span>
              </>
            )}
          </div>
        </div>
        <div className="text-sm font-bold tabular-nums text-primary">{s.aiScore.toFixed(1)}</div>
      </header>

      {/* Body */}
      <div className="px-4 pt-3">
        <p className="text-[15px] leading-relaxed text-foreground">
          {s.tagline ?? s.summary}
        </p>
        <div className="mt-2 flex items-start gap-1.5 rounded-md bg-primary/5 px-3 py-2 text-[13px] text-foreground/90">
          <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
          <span>{s.tractionNote}</span>
        </div>
      </div>

      {/* Video */}
      <div className="relative mt-3 border-y border-border">
        {s.youtubeVideoId ? (
          <PitchVideoEmbed videoId={s.youtubeVideoId} title={`${s.name} founder pitch`} />
        ) : (
          <button
            onClick={onOpen}
            className="group relative block w-full overflow-hidden bg-surface"
          >
            <div className="aspect-[16/9] w-full" />
            <div className="absolute inset-0 bg-primary/5" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-foreground/15 backdrop-blur-md ring-1 ring-foreground/20 transition-transform group-hover:scale-110">
                <Play className="h-5 w-5 translate-x-0.5 fill-foreground text-foreground" />
              </div>
            </div>
            <div className="absolute bottom-2 left-2 rounded-sm bg-background/80 px-2 py-0.5 text-[10.5px] font-medium text-foreground backdrop-blur">
              Founder Pitch · 2:48
            </div>
          </button>
        )}
        <button
          onClick={onOpen}
          className="absolute bottom-2 right-2 z-10 inline-flex items-center gap-1 rounded-sm bg-primary px-2 py-0.5 text-[10.5px] font-semibold text-primary-foreground shadow-sm hover:opacity-90"
        >
          Open Deal <ArrowRight className="h-3 w-3" />
        </button>
        {s.youtubeVideoId && (
          <span className="pointer-events-none absolute bottom-2 left-2 z-10 rounded-sm bg-background/80 px-2 py-0.5 text-[10.5px] font-medium text-foreground backdrop-blur">
            Founder Pitch
          </span>
        )}
      </div>

      {/* Stats row */}
      <div className="flex items-center justify-between px-4 py-2 text-[11.5px] text-muted-foreground">
        {isOwnListing ? (
          <>
            <span className="inline-flex items-center gap-1">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-muted text-muted-foreground">
                <ThumbsUp className="h-2.5 w-2.5" />
              </span>
              0 investors interested
            </span>
            <span>0 comments · 0% committed</span>
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-1">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-interested text-[9px] text-interested-foreground">
                <ThumbsUp className="h-2.5 w-2.5" />
              </span>
              {142 + Math.floor(s.aiScore * 30)} investors interested
            </span>
            <span>
              {18 + Math.floor(s.composite / 4)} comments · {s.raisedSoFar}% committed
            </span>
          </>
        )}
      </div>

      <DealActionBar s={s} layout="grid" />
    </article>
  );
}
