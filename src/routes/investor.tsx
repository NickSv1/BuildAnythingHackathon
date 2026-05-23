import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import { AvatarImage } from "@/components/avatar-image";
import { CURRENT_INVESTOR } from "@/lib/mock-data";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  MessageSquare,
  Users,
  TrendingUp,
  Eye,
} from "lucide-react";

export const Route = createFileRoute("/investor")({
  head: () => ({
    meta: [
      { title: `${CURRENT_INVESTOR.name} — Atlas` },
      {
        name: "description",
        content: `Investor profile for ${CURRENT_INVESTOR.name} on Atlas.`,
      },
    ],
  }),
  component: InvestorCoverPage,
});

function InvestorCoverPage() {
  return (
    <div className="min-h-screen bg-surface text-foreground">
      <AppHeader />

      <main className="pb-10">
        {/* Cover hero */}
        <section className="relative h-[min(42vh,320px)] w-full overflow-hidden sm:h-[min(48vh,380px)]">
          <img
            src={CURRENT_INVESTOR.coverImageUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#070b17]/95 via-[#070b17]/45 to-[#070b17]/15"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070b17]/50 to-transparent" aria-hidden />

          <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-5 sm:px-6">
            <Link
              to="/"
              className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-black/40"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to feed
            </Link>

            <div className="pb-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                Investor profile
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {CURRENT_INVESTOR.name}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {CURRENT_INVESTOR.location}
              </p>
            </div>
          </div>
        </section>

        {/* Profile body */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="-mt-14 flex flex-col gap-6 sm:-mt-16 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex shrink-0 flex-col items-center sm:items-start">
              <AvatarImage
                src={CURRENT_INVESTOR.avatarUrl}
                alt={CURRENT_INVESTOR.name}
                className="h-28 w-28 rounded-full ring-4 ring-card shadow-lg sm:h-32 sm:w-32"
                fallback={<span className="text-2xl font-semibold">AM</span>}
              />
            </div>

            <div className="min-w-0 flex-1 space-y-5 pt-2 lg:pt-6">
              <div>
                <p className="text-sm font-medium text-interested">{CURRENT_INVESTOR.title}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {CURRENT_INVESTOR.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <ProfileStat label="Deals seen" value={CURRENT_INVESTOR.dealsSeen} accent="navy" />
                <ProfileStat label="Watchlist" value={CURRENT_INVESTOR.watchlist} accent="interested" />
                <ProfileStat
                  label="Active checks"
                  value={CURRENT_INVESTOR.portfolioCompanies}
                  accent="interested"
                />
                <ProfileStat
                  label="Checks this year"
                  value={CURRENT_INVESTOR.checksThisYear}
                  accent="copper"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <ProfileLink to="/portfolio" icon={<Briefcase className="h-4 w-4" />} label="Portfolio" />
                <ProfileLink to="/network" icon={<Users className="h-4 w-4" />} label="Network" />
                <ProfileLink to="/inbox" icon={<MessageSquare className="h-4 w-4" />} label="Inbox" />
                <ProfileLink to="/" icon={<TrendingUp className="h-4 w-4" />} label="Deal feed" />
              </div>
            </div>
          </div>

          {/* Focus areas */}
          <section className="mt-8 grid gap-4 sm:grid-cols-3">
            <FocusCard
              icon={<Eye className="h-4 w-4 text-interested" />}
              title="Thesis"
              body="Seed & Series A in B2B SaaS, FinTech infrastructure, and applied climate — teams with shipped product and early revenue."
            />
            <FocusCard
              icon={<TrendingUp className="h-4 w-4 text-interested" />}
              title="Check size"
              body="$25k–$75k initial checks; reserves for follow-on when milestones hit."
            />
            <FocusCard
              icon={<Users className="h-4 w-4 text-copper" />}
              title="How I work"
              body="Fast yes/no, intro-friendly, and hands-on on GTM narrative — not board-heavy unless needed."
            />
          </section>
        </div>
      </main>
    </div>
  );
}

function ProfileStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "navy" | "interested" | "copper";
}) {
  const border =
    accent === "interested"
      ? "border-l-interested"
      : accent === "copper"
        ? "border-l-copper"
        : "border-l-primary";
  const valueClass =
    accent === "interested"
      ? "text-interested"
      : accent === "copper"
        ? "text-copper"
        : "text-foreground";

  return (
    <div className={`rounded-xl border border-border bg-card px-3 py-3 shadow-sm border-l-4 ${border}`}>
      <div className={`text-xl font-bold tabular-nums ${valueClass}`}>{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

function ProfileLink({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-sm hover:border-interested/30 hover:bg-interested/5 hover:text-interested"
    >
      {icon}
      {label}
    </Link>
  );
}

function FocusCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-semibold">{icon}{title}</div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
