import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import {
  UserPlus,
  Users,
  Check,
  X,
  Search,
  MapPin,
  Briefcase,
  UsersRound,
  TrendingUp,
} from "lucide-react";
import { ATLAS_FOUNDERS, NETWORK_INVITES, NETWORK_SUGGESTED, type NetworkPerson } from "@/lib/mock-data";
import { AvatarImage } from "@/components/avatar-image";

export const Route = createFileRoute("/network")({
  head: () => ({
    meta: [
      { title: "Network — Atlas" },
      { name: "description", content: "Your investor network: connections, invitations, and people to know." },
      { property: "og:title", content: "Network — Atlas" },
      { property: "og:description", content: "Curated investor and founder network for early-stage dealmaking." },
    ],
  }),
  component: NetworkPage,
});

function NetworkPage() {
  const [tab, setTab] = useState<"grow" | "connections">("grow");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [connected, setConnected] = useState<Set<string>>(new Set());

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <AppHeader />
      <main className="mx-auto grid max-w-7xl gap-5 px-3 py-5 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
        {/* Left rail — manage network */}
        <aside className="space-y-1 rounded-xl border border-border bg-card p-2 shadow-sm h-fit">
          <div className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Manage my network
          </div>
          <NavRow icon={<Users className="h-4 w-4" />} label="Connections" count={284} active={tab === "connections"} onClick={() => setTab("connections")} />
          <NavRow icon={<UserPlus className="h-4 w-4" />} label="Invitations" count={NETWORK_INVITES.length - dismissed.size} active={tab === "grow"} onClick={() => setTab("grow")} />
          <NavRow icon={<Briefcase className="h-4 w-4" />} label="Companies followed" count={37} />
          <NavRow icon={<UsersRound className="h-4 w-4" />} label="Syndicates" count={5} />
        </aside>

        {/* Center */}
        <section className="space-y-4">
          <PanelHeader title="Atlas founders" subtitle="The team building the investor platform" />
          <div className="grid gap-3 sm:grid-cols-2">
            {ATLAS_FOUNDERS.map((p) => (
              <SuggestedCard
                key={p.id}
                p={p}
                connected={connected.has(p.id)}
                onConnect={() =>
                  setConnected((c) => {
                    const n = new Set(c);
                    n.has(p.id) ? n.delete(p.id) : n.add(p.id);
                    return n;
                  })
                }
              />
            ))}
          </div>

          {tab === "grow" && (
            <>
              <PanelHeader title="Pending invitations" subtitle="People asking to connect" />
              <div className="space-y-2">
                {NETWORK_INVITES.filter((p) => !dismissed.has(p.id)).map((p) => (
                  <InviteCard
                    key={p.id}
                    p={p}
                    onAccept={() => { setConnected((c) => new Set(c).add(p.id)); setDismissed((d) => new Set(d).add(p.id)); }}
                    onIgnore={() => setDismissed((d) => new Set(d).add(p.id))}
                    accepted={connected.has(p.id)}
                  />
                ))}
                {NETWORK_INVITES.every((p) => dismissed.has(p.id)) && (
                  <EmptyState text="Inbox zero. Nice work." />
                )}
              </div>

              <PanelHeader title="People you may know" subtitle="Curated from your dealflow and sectors" />
              <div className="grid gap-3 sm:grid-cols-2">
                {NETWORK_SUGGESTED.map((p) => (
                  <SuggestedCard
                    key={p.id}
                    p={p}
                    connected={connected.has(p.id)}
                    onConnect={() => setConnected((c) => { const n = new Set(c); n.has(p.id) ? n.delete(p.id) : n.add(p.id); return n; })}
                  />
                ))}
              </div>
            </>
          )}

          {tab === "connections" && (
            <>
              <PanelHeader title="284 connections" subtitle="Sorted by recently active" />
              <div className="rounded-xl border border-border bg-card p-3 shadow-sm">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    placeholder="Search your connections"
                    className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                {[...ATLAS_FOUNDERS, ...NETWORK_INVITES, ...NETWORK_SUGGESTED].map((p) => (
                  <ConnectionRow key={p.id} p={p} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* Right rail */}
        <aside className="hidden lg:block h-fit space-y-4">
          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5" /> Network signal
            </div>
            <Metric label="New connections (30d)" value="+18" trend="+12%" />
            <Metric label="Deals via referrals" value="6" trend="+2" />
            <Metric label="Syndicates active" value="5" trend="—" />
          </div>
          <div className="rounded-xl border border-border bg-primary/5 p-4 shadow-sm">
            <div className="text-sm font-semibold">Atlas Verified Angels</div>
            <p className="mt-1 text-xs text-muted-foreground">Get a verified badge and 3× more inbound founder outreach.</p>
            <button className="mt-3 w-full rounded-full bg-foreground px-3 py-2 text-xs font-semibold text-background hover:opacity-90">Apply for verification</button>
          </div>
        </aside>
      </main>
    </div>
  );
}

function NavRow({ icon, label, count, active, onClick }: { icon: React.ReactNode; label: string; count?: number; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-sm transition-colors ${
        active ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground"
      }`}
    >
      <span className="inline-flex items-center gap-2">{icon} {label}</span>
      {count !== undefined && <span className="text-xs tabular-nums">{count}</span>}
    </button>
  );
}

function PanelHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      <span className="text-[11px] text-muted-foreground">{subtitle}</span>
    </div>
  );
}

function Avatar({ p, size = 48 }: { p: NetworkPerson; size?: number }) {
  return (
    <div className="shrink-0 overflow-hidden rounded-full ring-1 ring-border" style={{ width: size, height: size }}>
      <AvatarImage
        src={p.avatarUrl}
        alt={p.name}
        className="h-full w-full"
        fallback={
          <span className="text-sm font-semibold text-foreground">{p.initials}</span>
        }
      />
    </div>
  );
}

function InviteCard({ p, onAccept, onIgnore, accepted }: { p: NetworkPerson; onAccept: () => void; onIgnore: () => void; accepted: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
      <Avatar p={p} />
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold">{p.name}</div>
        <div className="truncate text-xs text-muted-foreground">{p.title}</div>
        <div className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="h-3 w-3" /> {p.location} · {p.mutuals} mutual
        </div>
      </div>
      {accepted ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-interested/15 px-3 py-1.5 text-xs font-medium text-interested">
          <Check className="h-3.5 w-3.5" /> Connected
        </span>
      ) : (
        <div className="flex items-center gap-2">
          <button onClick={onIgnore} className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:bg-surface hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
          <button onClick={onAccept} className="inline-flex h-9 items-center gap-1.5 rounded-full bg-interested px-4 text-xs font-semibold text-interested-foreground hover:opacity-90">
            <Check className="h-3.5 w-3.5" /> Accept
          </button>
        </div>
      )}
    </div>
  );
}

function SuggestedCard({ p, connected, onConnect }: { p: NetworkPerson; connected: boolean; onConnect: () => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card text-center shadow-sm">
      <div className="h-12 bg-primary/10" />
      <div className="-mt-7 flex flex-col items-center px-4 pb-4">
        <Avatar p={p} size={56} />
        <div className="mt-2 truncate font-semibold">{p.name}</div>
        <div className="line-clamp-2 mt-0.5 text-xs text-muted-foreground">{p.title}</div>
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full bg-surface px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground">{t}</span>
          ))}
        </div>
        <div className="mt-1 text-[11px] text-muted-foreground">{p.mutuals} mutual connections</div>
        <button
          onClick={onConnect}
          className={`mt-3 w-full rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            connected ? "border border-border text-muted-foreground hover:bg-surface" : "bg-interested text-interested-foreground hover:opacity-90"
          }`}
        >
          {connected ? "Pending" : "Connect"}
        </button>
      </div>
    </div>
  );
}

function ConnectionRow({ p }: { p: NetworkPerson }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-2.5 shadow-sm hover:bg-surface">
      <Avatar p={p} size={40} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{p.name}</div>
        <div className="truncate text-[11px] text-muted-foreground">{p.title} · {p.location}</div>
      </div>
      <button className="rounded-full border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground hover:bg-surface hover:text-foreground">Message</button>
    </div>
  );
}

function Metric({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="flex items-baseline justify-between border-t border-border py-2 first:border-t-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold tabular-nums">{value} <span className="text-[10px] font-normal text-muted-foreground">{trend}</span></span>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">{text}</div>;
}
