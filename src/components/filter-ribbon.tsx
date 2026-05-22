import { ChevronDown, Search, Check } from "lucide-react";

const FILTERS = [
  { label: "Sector / Theme", options: "SaaS, FinTech, AI, DevTools" },
  { label: "Stage", options: "Pre-Seed, Seed, Series A" },
  { label: "Funding Sought", options: "$100k – $2M" },
  { label: "Traction", options: "Users, Revenue, LOIs" },
];

export function FilterRibbon() {
  return (
    <div className="sticky top-14 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-3 px-6 py-3">
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Smart filter — e.g. ‘Seed AI infra > $500k MRR’"
            className="h-9 w-full rounded-sm border border-border bg-surface pl-8 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
          />
        </div>

        {FILTERS.map((f) => (
          <button
            key={f.label}
            className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface px-3 py-2 text-xs font-medium text-foreground hover:border-primary/40"
          >
            {f.label}
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        ))}

        <label className="ml-auto inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
          <span className="relative grid h-4 w-4 place-items-center rounded-sm border border-border bg-surface">
            <Check className="h-3 w-3 text-primary" />
          </span>
          Verified deals only
        </label>

        <span className="rounded-sm bg-surface px-2.5 py-1 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">124</span> matches
        </span>
      </div>
    </div>
  );
}
