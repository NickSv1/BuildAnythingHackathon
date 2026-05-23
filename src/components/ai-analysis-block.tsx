import { useState } from "react";
import type { Startup } from "@/lib/mock-data";
import { BarChart3, Loader2, LineChart } from "lucide-react";
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
    <div className="overflow-hidden rounded-xl border border-interested/25 bg-card shadow-sm ring-1 ring-interested/10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-interested/15 bg-interested/5 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-interested">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-interested/15">
            <BarChart3 className="h-4 w-4" />
          </span>
          Atlas AI Analysis
        </div>
        {!revealed && !loading && (
          <Button
            type="button"
            size="sm"
            onClick={runAnalysis}
            className="gap-1.5 rounded-full bg-interested text-xs text-interested-foreground hover:bg-interested/90"
          >
            <LineChart className="h-3.5 w-3.5" />
            Generate AI Analysis
          </Button>
        )}
        {revealed && !loading && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={runAnalysis}
            className="gap-1.5 rounded-full border-interested/30 text-xs text-interested hover:bg-interested/10"
          >
            Regenerate
          </Button>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin text-interested" />
          Analysing pitch…
        </div>
      )}

      {revealed && !loading && (
        <div className="space-y-4 p-4">
          <div className="flex flex-wrap items-end gap-6 rounded-xl border border-l-4 border-l-interested border-interested/20 bg-interested/[0.06] p-4">
            <div>
              <div className="text-[10.5px] font-semibold uppercase tracking-wider text-interested/80">
                Atlas AI Score
              </div>
              <div className="mt-1 text-5xl font-semibold tabular-nums leading-none text-interested">
                {s.aiScore.toFixed(1)}
                <span className="text-2xl text-muted-foreground">/10</span>
              </div>
            </div>
            <div className="pb-1">
              <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground">
                Sentiment
              </div>
              <div className="mt-1 text-lg font-semibold text-interested">{s.aiSentiment}</div>
            </div>
          </div>

          <p className="rounded-lg border border-border bg-surface/80 p-3 text-sm leading-relaxed text-foreground">
            {s.aiSummary}
          </p>

          <div className="rounded-lg border border-copper/20 bg-copper/5 p-3">
            <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-wider text-copper">
              What drove the score
            </div>
            <ul className="space-y-2">
              {s.aiScoreFactors.map((factor, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-[13px] leading-snug text-foreground/90"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-interested" />
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
