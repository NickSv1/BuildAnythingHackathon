import type { Startup } from "@/lib/mock-data";
import { AvatarImage } from "@/components/avatar-image";
import { TrendingUp, ShieldCheck } from "lucide-react";

export function DealCard({
  s,
  active,
  onClick,
}: {
  s: Startup;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`group w-full rounded-md border bg-surface p-4 text-left transition-all ${
        active
          ? "border-primary/60 ring-1 ring-primary/40 bg-surface-elevated"
          : "border-border hover:border-primary/30 hover:bg-surface-elevated"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <AvatarImage
            src={s.logoUrl}
            alt={`${s.name} logo`}
            className="h-9 w-9 shrink-0 rounded-md ring-1 ring-border"
            fallback={<span className="text-sm font-bold text-foreground">{s.logo}</span>}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate font-semibold tracking-tight">{s.name}</span>
              {s.verified && (
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
              )}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {s.location.split("·")[0]} · {s.sector}
            </div>
          </div>
        </div>
        <ScoreBadge score={s.aiScore} />
      </div>

      <p className="mt-3 line-clamp-2 text-[13px] leading-snug text-muted-foreground">
        {s.summary}
      </p>

      <div className="mt-3 flex items-start gap-1.5 text-[11.5px] text-foreground/80">
        <TrendingUp className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
        <span className="line-clamp-2">{s.tractionNote}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Tag>{s.sector}</Tag>
        <Tag>{s.stage}</Tag>
        <Tag tone="primary">{s.raiseAmount}</Tag>
      </div>
    </button>
  );
}

function Tag({
  children,
  tone = "muted",
}: {
  children: React.ReactNode;
  tone?: "muted" | "primary";
}) {
  return (
    <span
      className={`rounded-sm px-1.5 py-0.5 text-[10.5px] font-medium tracking-wide uppercase ${
        tone === "primary"
          ? "bg-primary/15 text-primary"
          : "border border-border bg-background/40 text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 8 ? "text-primary" : score >= 7 ? "text-foreground" : "text-muted-foreground";
  return (
    <div className={`text-sm font-bold tabular-nums ${tone}`}>
      {score.toFixed(1)}
      <span className="text-[10px] font-normal text-muted-foreground">/10</span>
    </div>
  );
}
