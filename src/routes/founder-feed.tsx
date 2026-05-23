import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { FeedPost } from "@/components/feed-post";
import { EvaluationPanel } from "@/components/evaluation-panel";
import { getFounderListedStartup } from "@/lib/mock-data";
import { CURRENT_FOUNDER } from "@/lib/mock-data";
import { Radio, MessageCircle, X } from "lucide-react";

const LISTED_STARTUP = getFounderListedStartup();

export const Route = createFileRoute("/founder-feed")({
  head: () => ({
    meta: [
      { title: "Your Listing — Atlas Founder" },
      {
        name: "description",
        content: "Your startup pitch as it appears to angel investors on the Atlas marketplace.",
      },
      { property: "og:title", content: "Your Listing — Atlas Founder" },
    ],
  }),
  component: FounderFeedPage,
});

function FounderFeedPage() {
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    if (!detailOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDetailOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [detailOpen]);

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <AppHeader />

      <main className="mx-auto max-w-2xl space-y-4 px-3 py-5 sm:px-6">
        <header className="rounded-xl border border-copper/30 bg-copper/5 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-copper">
                <Radio className="h-3.5 w-3.5" /> Live on Atlas Marketplace
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Hi {CURRENT_FOUNDER.name} — this is how investors see {LISTED_STARTUP.name} in
                their feed right now.
              </p>
            </div>
            <Link
              to="/founder-messages"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Message investors
            </Link>
          </div>
        </header>

        <FeedPost
          s={LISTED_STARTUP}
          onOpen={() => setDetailOpen(true)}
          postedAgo="10 seconds ago"
          isOwnListing
        />

        <p className="text-center text-[11px] text-muted-foreground">
          Other startups appear below yours in the investor feed — yours stays pinned at the top
          for new listings.
        </p>
      </main>

      {detailOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => setDetailOpen(false)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-interested/20 bg-surface shadow-2xl ring-1 ring-interested/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-interested/15 bg-card/95 px-4 py-3 backdrop-blur">
              <span className="truncate text-sm font-semibold text-interested">{LISTED_STARTUP.name}</span>
              <button
                type="button"
                onClick={() => setDetailOpen(false)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-surface text-muted-foreground hover:border-destructive/50 hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <EvaluationPanel s={LISTED_STARTUP} />
          </div>
        </div>
      )}
    </div>
  );
}
