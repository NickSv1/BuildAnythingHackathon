import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { FeedPost } from "@/components/feed-post";
import { EvaluationPanel } from "@/components/evaluation-panel";
import { CURRENT_INVESTOR, FEED_STARTUPS, getFounderListedStartup } from "@/lib/mock-data";
import { useDemoStore } from "@/lib/demo-store";
import { AvatarImage } from "@/components/avatar-image";
import {
  X,
  Bookmark,
  Briefcase,
  Eye,
  TrendingUp,
  PenSquare,
  Image,
  Video,
  FileText,
  Rocket,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas — Angel Investor Feed" },
      {
        name: "description",
        content:
          "A social dealflow feed for angel investors. Discover, evaluate, and connect with vetted early-stage startups.",
      },
      { property: "og:title", content: "Atlas — Investor Feed" },
      {
        property: "og:description",
        content: "Vetted startup deals with AI Bull/Bear analysis, delivered as a feed.",
      },
    ],
  }),
  component: InvestorDashboard,
});

function InvestorDashboard() {
  const { pitchSubmission } = useDemoStore();
  const feedPosts = useMemo(() => {
    if (!pitchSubmission) return FEED_STARTUPS;
    const listed = getFounderListedStartup();
    const rest = FEED_STARTUPS.filter((s) => s.id !== listed.id);
    return [listed, ...rest];
  }, [pitchSubmission]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = feedPosts.find((s) => s.id === selectedId) ?? null;

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedId(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <AppHeader />

      <main className="mx-auto grid max-w-7xl gap-5 px-3 py-5 sm:px-6 lg:grid-cols-[225px_minmax(0,1fr)_300px]">
        {/* Left rail — profile card */}
        <aside className="hidden lg:block space-y-4">
          <ProfileCard />
          <RecentFilters />
        </aside>

        {/* Center feed */}
        <section className="space-y-4">
          <ComposerCard />
          <FeedFilterBar dealCount={feedPosts.length} newListing={Boolean(pitchSubmission)} />
          {feedPosts.map((s, index) => (
            <FeedPost
              key={s.id}
              s={s}
              onOpen={() => setSelectedId(s.id)}
              postedAgo={pitchSubmission && index === 0 ? "10 seconds ago" : undefined}
              isOwnListing={false}
            />
          ))}
          <div className="py-4 text-center text-[11px] text-muted-foreground">
            You're all caught up · refresh for more deals
          </div>
        </section>

        {/* Right rail */}
        <aside className="hidden lg:block space-y-4">
          <TrendingSectors />
          <FounderCTA />
        </aside>
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm animate-in fade-in duration-150 sm:p-6"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-interested/20 bg-surface shadow-2xl ring-1 ring-interested/10 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-interested/15 bg-card/95 px-4 py-3 backdrop-blur">
              <span className="truncate text-sm font-semibold text-interested">{selected.name}</span>
              <button
                onClick={() => setSelectedId(null)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-surface text-muted-foreground hover:border-destructive/50 hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <EvaluationPanel s={selected} />
          </div>
        </div>
      )}
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <Link
        to="/investor"
        className="relative block h-20 overflow-hidden rounded-t-xl"
      >
        <img
          src={CURRENT_INVESTOR.coverImageUrl}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#070b17]/35" aria-hidden />
      </Link>
      <div className="relative z-10 -mt-10 flex flex-col items-center px-4 pb-4 text-center">
        <AvatarImage
          src={CURRENT_INVESTOR.avatarUrl}
          alt={CURRENT_INVESTOR.name}
          className="relative z-10 h-16 w-16 rounded-full bg-card ring-4 ring-card"
          fallback={
            <span className="text-lg font-semibold text-foreground">AM</span>
          }
        />
        <div className="mt-2 font-semibold tracking-tight">{CURRENT_INVESTOR.name}</div>
        <div className="text-xs text-muted-foreground">{CURRENT_INVESTOR.title}</div>
        <div className="mt-3 grid w-full grid-cols-2 gap-px overflow-hidden rounded-md bg-border text-[11px]">
          <Stat label="Deals seen" value={CURRENT_INVESTOR.dealsSeen} />
          <Stat label="On watchlist" value={CURRENT_INVESTOR.watchlist} />
        </div>
      </div>
      <Link
        to="/investor"
        className="block border-t border-border px-4 py-2 text-center text-xs font-medium text-interested hover:bg-interested/5"
      >
        View investor profile
      </Link>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card px-2 py-2">
      <div className="font-semibold tabular-nums text-primary">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}

function RecentFilters() {
  const items = ["SaaS · Seed", "LatAm FinTech", "Climate ≥ $1M", "AI · Pre-Seed"];
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Saved searches
      </div>
      <ul className="space-y-1.5 text-sm">
        {items.map((i) => (
          <li key={i}>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-surface">
              <Bookmark className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="truncate">{i}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComposerCard() {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <AvatarImage
          src={CURRENT_INVESTOR.avatarUrl}
          alt={CURRENT_INVESTOR.name}
          className="h-10 w-10 shrink-0 rounded-full ring-1 ring-border"
          fallback={<span className="text-xs font-semibold">AM</span>}
        />
        <button className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-left text-sm text-muted-foreground hover:bg-surface">
          Share a thesis, post a check, or start a syndicate…
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-1">
        <ComposerBtn icon={<Video className="h-4 w-4 text-primary" />} label="Video" />
        <ComposerBtn icon={<Image className="h-4 w-4 text-primary" />} label="Memo" />
        <ComposerBtn icon={<FileText className="h-4 w-4 text-primary" />} label="Deck" />
      </div>
    </div>
  );
}

function ComposerBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-surface hover:text-foreground">
      {icon} {label}
    </button>
  );
}

function FeedFilterBar({
  dealCount,
  newListing,
}: {
  dealCount: number;
  newListing?: boolean;
}) {
  const tabs = ["For you", "Following", "New raises", "Pre-seed"];
  return (
    <div className="flex items-center gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1 shadow-sm">
      {tabs.map((t, i) => (
        <button
          key={t}
          type="button"
          className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            i === 0
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
        >
          {t}
        </button>
      ))}
      <span className="ml-auto shrink-0 pr-2 text-[11px] text-muted-foreground">
        {newListing && (
          <span className="mr-2 font-medium text-primary">1 new · </span>
        )}
        {dealCount} live deals
      </span>
    </div>
  );
}

function TrendingSectors() {
  const items = [
    { tag: "Embedded FinTech", note: "+18 new this week" },
    { tag: "Climate AgTech", note: "+12 new this week" },
    { tag: "Async Productivity", note: "+9 new this week" },
    { tag: "Vertical AI Agents", note: "+27 new this week" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <TrendingUp className="h-3.5 w-3.5" /> Trending on Atlas
      </div>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.tag} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <div className="min-w-0">
              <div className="truncate text-sm font-medium">{i.tag}</div>
              <div className="text-[11px] text-muted-foreground">{i.note}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FounderCTA() {
  return (
    <div className="rounded-xl border-2 border-copper/30 bg-copper/5 p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Rocket className="h-4 w-4 text-copper" /> Are you a founder?
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        Get in front of 1,200+ verified angel investors. Free submission, no warm intro.
      </p>
      <Link
        to="/founder"
        className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-copper px-3 py-2 text-xs font-semibold text-copper-foreground hover:opacity-90"
      >
        <Rocket className="h-3.5 w-3.5" /> Submit your startup
      </Link>
    </div>
  );
}
