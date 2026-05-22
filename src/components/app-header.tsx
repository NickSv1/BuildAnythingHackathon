import { Link, useLocation } from "@tanstack/react-router";
import { Bell, Search, Sun, Moon, Briefcase, Rocket, Home, Users, MessageSquare, BarChart3 } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { CURRENT_INVESTOR } from "@/lib/mock-data";
import { AvatarImage } from "@/components/avatar-image";
import { AtlasLogo } from "@/components/atlas-logo";

export function AppHeader() {
  const { pathname } = useLocation();
  const { theme, toggle } = useTheme();
  const isFounder = pathname.startsWith("/founder");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center py-1">
          <AtlasLogo heightClass="h-7 sm:h-8" />
        </Link>

        <div className="relative hidden md:flex flex-1 max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder={isFounder ? "Search investors, sectors…" : "Search startups, sectors, founders…"}
            className="h-9 w-full rounded-full border border-border bg-surface pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {!isFounder ? (
            <>
              <NavIcon to="/" icon={<Home className="h-5 w-5" />} label="Feed" active={pathname === "/"} />
              <NavIcon to="/network" icon={<Users className="h-5 w-5" />} label="Network" active={pathname.startsWith("/network")} />
              <NavIcon to="/portfolio" icon={<Briefcase className="h-5 w-5" />} label="Portfolio" active={pathname.startsWith("/portfolio")} />
              <NavIcon to="/inbox" icon={<MessageSquare className="h-5 w-5" />} label="Inbox" badge={3} active={pathname.startsWith("/inbox")} />
            </>
          ) : (
            <>
              <NavIcon to="/founder" icon={<Home className="h-5 w-5" />} label="Pitch" active={pathname === "/founder"} />
              <NavIcon to="/founder-analytics" icon={<BarChart3 className="h-5 w-5" />} label="Analytics" active={pathname.startsWith("/founder-analytics")} />
              <NavIcon to="/founder-messages" icon={<MessageSquare className="h-5 w-5" />} label="Messages" active={pathname.startsWith("/founder-messages")} />
            </>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <RoleSwitcher current={isFounder ? "founder" : "investor"} />
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full p-2 text-muted-foreground hover:bg-surface hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="rounded-full p-2 text-muted-foreground hover:bg-surface hover:text-foreground">
            <Bell className="h-4 w-4" />
          </button>
          <AvatarImage
            src={CURRENT_INVESTOR.avatarUrl}
            alt={CURRENT_INVESTOR.name}
            className="h-8 w-8 rounded-full ring-1 ring-border"
            fallback={<span className="text-[10px] font-semibold">AM</span>}
          />
        </div>
      </div>
    </header>
  );
}

function NavIcon({ to, icon, label, active, badge }: { to?: string; icon: React.ReactNode; label: string; active?: boolean; badge?: number }) {
  const className = `relative flex flex-col items-center gap-0.5 rounded-md px-3 py-1 text-[11px] transition-colors ${
    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
  }`;
  const content = (
    <>
      <span className="relative">
        {icon}
        {badge ? (
          <span className="absolute -right-1.5 -top-1 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
            {badge}
          </span>
        ) : null}
      </span>
      <span>{label}</span>
      {active && <span className="absolute inset-x-2 -bottom-[15px] h-0.5 rounded-full bg-primary" />}
    </>
  );
  if (to) return <Link to={to} className={className}>{content}</Link>;
  return <button className={className}>{content}</button>;
}

function RoleSwitcher({ current }: { current: "investor" | "founder" }) {
  return (
    <div className="flex items-center rounded-full border-2 border-border bg-surface p-0.5 text-xs shadow-sm">
      <Link
        to="/"
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold transition-all ${
          current === "investor"
            ? "bg-primary text-primary-foreground shadow-[0_2px_8px_-2px_var(--primary)]"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Briefcase className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Investor</span>
      </Link>
      <Link
        to="/founder"
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold transition-all ${
          current === "founder"
            ? "bg-destructive text-destructive-foreground shadow-[0_2px_8px_-2px_var(--destructive)]"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Rocket className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Founder</span>
      </Link>
    </div>
  );
}
