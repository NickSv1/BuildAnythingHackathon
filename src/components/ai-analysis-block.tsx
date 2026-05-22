import { useState } from "react";
import type { Startup } from "@/lib/mock-data";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AiAnalysisBlock({ s }: { s: Startup }) {
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  function runAnalysis() {
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setRevealed(true);
    }, 2000);
  }

  return (
    <div className="rounded-md border border-border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" />
          Atlas AI Analysis
        </div>
        {!revealed && !loading && (
          <Button
            type="button"
            size="sm"
            onClick={runAnalysis}
            className="gap-1.5 rounded-sm text-xs"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Generate AI Analysis
          </Button>
        )}
        {revealed && !loading && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={runAnalysis}
            className="gap-1.5 rounded-sm text-xs"
          >
            Regenerate
          </Button>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          Analysing pitch…
        </div>
      )}

      {revealed && !loading && (
        <div className="space-y-4 p-4">
          <div className="flex flex-wrap items-end gap-4 rounded-md border border-primary/25 bg-primary/5 p-4">
            <div>
              <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                Atlas AI Score
              </div>
              <div className="mt-1 font-display text-5xl font-semibold tabular-nums leading-none text-primary">
                {s.aiScore.toFixed(1)}
                <span className="text-2xl text-muted-foreground">/10</span>
              </div>
            </div>
            <div className="pb-1">
              <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                Sentiment
              </div>
              <div className="mt-1 text-lg font-semibold text-foreground">{s.aiSentiment}</div>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-foreground">{s.aiSummary}</p>

          <div>
            <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
              What drove the score
            </div>
            <ul className="space-y-2">
              {s.aiScoreFactors.map((factor, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-[13px] leading-snug text-foreground/90"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!revealed && !loading && (
        <p className="px-4 py-6 text-center text-xs text-muted-foreground">
          Run Atlas AI on this pitch to see a scored sentiment summary and key factors.
        </p>
      )}
    </div>
  );
}
