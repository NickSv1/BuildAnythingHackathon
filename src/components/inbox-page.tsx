import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { Search, Send, Star, Paperclip, Smile, Filter, ShieldCheck } from "lucide-react";
import { investorAvatarUrl } from "@/lib/avatars";
import { AvatarImage } from "@/components/avatar-image";

type Msg = { from: "me" | "them"; text: string; time: string };

type Thread = {
  id: string;
  name: string;
  role: string;
  initials: string;
  avatarUrl: string;
  preview: string;
  time: string;
  unread: number;
  verified: boolean;
  starred?: boolean;
  online?: boolean;
  messages: Msg[];
};

const THREADS: Thread[] = [
  {
    id: "t1",
    name: "Sofía Reyes",
    role: "Co-founder · Teespring",
    initials: "SR",
    avatarUrl: investorAvatarUrl(30),
    preview: "Sharing the updated cap table and SAFE terms ahead of Thursday…",
    time: "2m",
    unread: 2,
    verified: true,
    online: true,
    starred: true,
    messages: [
      { from: "them", text: "Hi Alex — thanks for the call yesterday, that was super helpful.", time: "9:41 AM" },
      { from: "them", text: "Sharing the updated cap table and SAFE terms ahead of Thursday. We've added Cascade and one strategic at the same $12M cap.", time: "9:42 AM" },
      { from: "me", text: "Great. Will review tonight. Any room for a $50k allocation?", time: "10:04 AM" },
      { from: "them", text: "Yes — we're holding ~$120k for angels. Happy to confirm $50k for you.", time: "10:11 AM" },
    ],
  },
  {
    id: "t2",
    name: "Priya Shah",
    role: "CEO · Keywords AI",
    initials: "PS",
    avatarUrl: investorAvatarUrl(47),
    preview: "Loved your note on PLG retention curves. Quick favor…",
    time: "1h",
    unread: 0,
    verified: true,
    messages: [
      { from: "them", text: "Loved your note on PLG retention curves. Quick favor — could you intro me to anyone running growth at Linear?", time: "Yesterday" },
    ],
  },
  {
    id: "t3",
    name: "Marcus Reeve",
    role: "GP · Cascade Capital",
    initials: "MR",
    avatarUrl: investorAvatarUrl(3),
    preview: "We're co-leading the Zenefits round, sending docs.",
    time: "3h",
    unread: 1,
    verified: true,
    messages: [
      { from: "them", text: "We're co-leading the Zenefits round, sending docs.", time: "Tue" },
    ],
  },
  {
    id: "t4",
    name: "Dr. Anya Volkov",
    role: "Co-founder · Clearspace",
    initials: "AV",
    avatarUrl: investorAvatarUrl(41),
    preview: "Field trial data is in — 17% yield uplift on barley.",
    time: "Yesterday",
    unread: 0,
    verified: false,
    messages: [
      { from: "them", text: "Field trial data is in — 17% yield uplift on barley.", time: "Yesterday" },
    ],
  },
  {
    id: "t5",
    name: "Atlas Syndicates",
    role: "Platform",
    initials: "AS",
    avatarUrl: investorAvatarUrl(55),
    preview: "Your Q1 syndicate report is ready.",
    time: "2d",
    unread: 0,
    verified: true,
    messages: [
      { from: "them", text: "Your Q1 syndicate report is ready.", time: "Mon" },
    ],
  },
];

export function InboxPage() {
  const [activeId, setActiveId] = useState<string>(THREADS[0].id);
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");
  const [draft, setDraft] = useState("");
  const [extraMessages, setExtraMessages] = useState<Record<string, Msg[]>>({});

  const active = THREADS.find((t) => t.id === activeId)!;
  const filtered = THREADS.filter((t) =>
    filter === "all" ? true : filter === "unread" ? t.unread > 0 : t.starred
  );

  function send() {
    const text = draft.trim();
    if (!text) return;
    setExtraMessages((m) => ({
      ...m,
      [activeId]: [...(m[activeId] ?? []), { from: "me", text, time: "now" }],
    }));
    setDraft("");
  }

  const messages = [...active.messages, ...(extraMessages[active.id] ?? [])];

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-3 py-5 sm:px-6">
        <div className="grid h-[calc(100vh-7rem)] overflow-hidden rounded-xl border border-border bg-card shadow-sm md:grid-cols-[320px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)_300px]">
          {/* Threads list */}
          <aside className="flex flex-col border-r border-border">
            <div className="border-b border-border p-3">
              <div className="flex items-baseline justify-between">
                <h1 className="text-base font-semibold tracking-tight">Messaging</h1>
                <span className="text-[11px] text-muted-foreground">{THREADS.reduce((s, t) => s + t.unread, 0)} unread</span>
              </div>
              <div className="relative mt-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search messages"
                  className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
                />
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px]">
                <Filter className="h-3 w-3 text-muted-foreground" />
                {(["all", "unread", "starred"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-full px-2.5 py-0.5 font-medium capitalize ${
                      filter === f ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveId(t.id)}
                  className={`flex w-full gap-3 border-b border-border px-3 py-3 text-left transition-colors ${
                    activeId === t.id ? "bg-primary/5" : "hover:bg-surface"
                  }`}
                >
                  <ThreadAvatar t={t} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`truncate text-sm ${t.unread ? "font-semibold" : "font-medium"}`}>{t.name}</span>
                      {t.verified && <ShieldCheck className="h-3 w-3 shrink-0 text-primary" />}
                      <span className="ml-auto shrink-0 text-[10.5px] text-muted-foreground">{t.time}</span>
                    </div>
                    <div className="truncate text-[11px] text-muted-foreground">{t.role}</div>
                    <div className={`mt-0.5 truncate text-xs ${t.unread ? "text-foreground" : "text-muted-foreground"}`}>{t.preview}</div>
                  </div>
                  {t.unread > 0 && (
                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {t.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </aside>

          {/* Conversation */}
          <section className="flex flex-col">
            <header className="flex items-center gap-3 border-b border-border px-4 py-3">
              <ThreadAvatar t={active} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-semibold">{active.name}</span>
                  {active.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
                </div>
                <div className="truncate text-[11px] text-muted-foreground">{active.role} {active.online && <span className="ml-1 text-bull">· Active now</span>}</div>
              </div>
              <button className="rounded-full p-2 text-muted-foreground hover:bg-surface hover:text-foreground" aria-label="Star">
                <Star className={`h-4 w-4 ${active.starred ? "fill-primary text-primary" : ""}`} />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto bg-background/40 px-4 py-4">
              <div className="text-center text-[10.5px] text-muted-foreground">Today</div>
              {messages.map((m, i) => (
                <Bubble key={i} m={m} />
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex items-end gap-2 border-t border-border bg-card p-3"
            >
              <button type="button" className="rounded-md p-2 text-muted-foreground hover:bg-surface hover:text-foreground" aria-label="Attach">
                <Paperclip className="h-4 w-4" />
              </button>
              <button type="button" className="rounded-md p-2 text-muted-foreground hover:bg-surface hover:text-foreground" aria-label="Emoji">
                <Smile className="h-4 w-4" />
              </button>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                rows={1}
                placeholder={`Message ${active.name.split(" ")[0]}…`}
                className="max-h-32 min-h-9 flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" /> Send
              </button>
            </form>
          </section>

          {/* Right detail rail */}
          <aside className="hidden flex-col border-l border-border lg:flex">
            <div className="border-b border-border p-4 text-center">
              <div className="mx-auto"><ThreadAvatar t={active} size={64} /></div>
              <div className="mt-2 text-sm font-semibold">{active.name}</div>
              <div className="text-[11px] text-muted-foreground">{active.role}</div>
              <button className="mt-3 w-full rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-surface">View profile</button>
            </div>
            <div className="p-4">
              <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Shared</div>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center justify-between rounded-md border border-border bg-background p-2"><span>Zenefits_SAFE_v3.pdf</span><span className="text-muted-foreground">1.2 MB</span></li>
                <li className="flex items-center justify-between rounded-md border border-border bg-background p-2"><span>Cap_table_2025Q2.xlsx</span><span className="text-muted-foreground">88 KB</span></li>
                <li className="flex items-center justify-between rounded-md border border-border bg-background p-2"><span>Pitch_deck.pdf</span><span className="text-muted-foreground">4.8 MB</span></li>
              </ul>
            </div>
            <div className="mt-auto border-t border-border p-4">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Deal context</div>
              <div className="mt-2 rounded-md bg-primary/5 p-3 text-xs">
                <div className="font-semibold">Zenefits · Growth</div>
                <div className="mt-0.5 text-muted-foreground">$750k raise · $12M pre-money · 41% committed</div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function ThreadAvatar({ t, size = 40 }: { t: Thread; size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <AvatarImage
        src={t.avatarUrl}
        alt={t.name}
        className="h-full w-full rounded-full ring-1 ring-border"
        fallback={<span className="text-sm font-semibold">{t.initials}</span>}
      />
      {t.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-bull ring-2 ring-card" />}
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  const mine = m.from === "me";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
        mine
          ? "rounded-br-sm bg-primary text-primary-foreground"
          : "rounded-bl-sm bg-card text-foreground border border-border"
      }`}>
        <div className="whitespace-pre-wrap leading-relaxed">{m.text}</div>
        <div className={`mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</div>
      </div>
    </div>
  );
}
