import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/app-header";
import {
  UploadCloud,
  CheckCircle2,
  Loader2,
  Circle,
  Sparkles,
  Info,
  Rocket,
  Video,
} from "lucide-react";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Atlas — Get Discovered by Top Angel Investors" },
      {
        name: "description",
        content:
          "Submit your startup to Atlas. We structure your pitch so top-tier angel investors can evaluate your strongest metrics instantly.",
      },
      { property: "og:title", content: "Atlas — Founder Submission" },
      {
        property: "og:description",
        content: "Free founder submissions. No warm intro required.",
      },
    ],
  }),
  component: FounderDashboard,
});

type FormState = {
  company: string;
  bio: string;
  pitch: string;
  sector: string;
  stage: string;
  raise: string;
  traction: string;
  videoName: string | null;
};

const initialForm: FormState = {
  company: "",
  bio: "",
  pitch: "",
  sector: "",
  stage: "",
  raise: "",
  traction: "",
  videoName: null,
};

function FounderDashboard() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const required: (keyof FormState)[] = ["company", "pitch", "sector", "stage", "raise"];
  const completion = Math.round(
    (required.filter((k) => Boolean(form[k])).length / required.length) * 100,
  );

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (completion < 100) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-surface text-foreground">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <header className="mb-8 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-destructive/30 bg-destructive/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-destructive">
            <Rocket className="h-3 w-3" /> Founder Portal · Free Submission
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Get discovered by 1,200+ verified angel investors
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Skip the warm intro. Submit once — we structure your pitch into the data
            points investors actually scan for.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {submitted ? (
            <SuccessCard form={form} onReset={() => { setForm(initialForm); setSubmitted(false); }} />
          ) : (
            <SubmissionForm
              form={form}
              update={update}
              onSubmit={onSubmit}
              completion={completion}
              submitting={submitting}
            />
          )}
          <StatusTracker submitted={submitted} />
        </div>
      </main>
    </div>
  );
}

function SubmissionForm({
  form,
  update,
  onSubmit,
  completion,
  submitting,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  onSubmit: (e: React.FormEvent) => void;
  completion: number;
  submitting: boolean;
}) {
  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Your Submission
        </h2>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>
          <span className="tabular-nums">{completion}%</span>
        </div>
      </div>

      <div className="mt-5 grid gap-5">
        <Field label="Company Name" required>
          <Input
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="e.g. Clearspace"
          />
        </Field>

        <Field label="Founder Bio">
          <Textarea
            rows={3}
            value={form.bio}
            onChange={(e) => update("bio", e.target.value)}
            placeholder="2–3 sentences on your background and unfair advantage."
          />
        </Field>

        <Field label="One-Sentence Elevator Pitch" required>
          <Input
            value={form.pitch}
            onChange={(e) => update("pitch", e.target.value)}
            placeholder="We help [audience] do [job] by [unique mechanism]."
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Sector" required>
            <Select
              value={form.sector}
              onChange={(e) => update("sector", e.target.value)}
              options={["SaaS", "FinTech", "AI", "DevTools", "ClimateTech"]}
            />
          </Field>
          <Field label="Stage" required>
            <Select
              value={form.stage}
              onChange={(e) => update("stage", e.target.value)}
              options={["Pre-Seed", "Seed", "Series A"]}
            />
          </Field>
          <Field label="Target Raise" required>
            <Select
              value={form.raise}
              onChange={(e) => update("raise", e.target.value)}
              options={["$100k–$300k", "$300k–$750k", "$750k–$1.5M", "$1.5M–$2M"]}
            />
          </Field>
          <Field label="Current Traction">
            <Select
              value={form.traction}
              onChange={(e) => update("traction", e.target.value)}
              options={["Users", "Revenue (MRR/ARR)", "LOIs / Pilots", "Pre-launch"]}
            />
          </Field>
        </div>

        <Field label="Video Pitch (max 3 minutes)">
          <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background/60 px-6 py-8 text-center transition-colors hover:border-primary/60 hover:bg-primary/5">
            {form.videoName ? (
              <>
                <Video className="h-6 w-6 text-primary" />
                <div className="text-sm font-medium text-foreground">{form.videoName}</div>
                <div className="text-xs text-muted-foreground">Click to replace</div>
              </>
            ) : (
              <>
                <UploadCloud className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                <div className="text-sm font-medium">
                  Drag &amp; drop your video, or <span className="text-primary">browse files</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  MP4 or MOV · up to 3 minutes · 1080p recommended
                </div>
              </>
            )}
            <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={(e) => update("videoName", e.target.files?.[0]?.name ?? null)}
            />
          </label>
        </Field>

        <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-border pt-5 sm:flex-row sm:items-center">
          <span className="text-xs text-muted-foreground">
            We never share your data without your consent.
          </span>
          <button
            type="submit"
            disabled={completion < 100 || submitting}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-destructive px-5 py-2.5 text-sm font-semibold text-destructive-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                {completion < 100 ? `Complete ${100 - completion}% more to submit` : "Submit for Vetting"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function SuccessCard({ form, onReset }: { form: FormState; onReset: () => void }) {
  return (
    <div className="rounded-xl border-2 border-primary/40 bg-card p-8 text-center shadow-sm">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight">
        {form.company || "Your startup"} is in the queue
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Our vetting team has been notified. Expect AI-generated bull/bear cards and an
        initial outreach window within 48 hours.
      </p>
      <div className="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-3 text-xs">
        <Pill label="Stage" value={form.stage || "—"} />
        <Pill label="Sector" value={form.sector || "—"} />
        <Pill label="Raise" value={form.raise || "—"} />
      </div>
      <button
        onClick={onReset}
        className="mt-6 text-xs font-medium text-primary hover:underline"
      >
        Submit another startup
      </button>
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface px-2 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 truncate font-semibold text-foreground">{value}</div>
    </div>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none"
    />
  );
}

function Select({
  options,
  ...rest
}: { options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...rest}
      className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus:border-primary/60 focus:outline-none"
    >
      <option value="">Select…</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function StatusTracker({ submitted }: { submitted: boolean }) {
  const steps = [
    { title: "Submission Received", desc: "We have your pitch and metadata." },
    { title: "Manual & AI Quality Vetting", desc: "Reviewer + model scoring your fundamentals." },
    { title: "AI Summary & Asset Generation", desc: "Structured cards, Bull/Bear, transcript." },
    { title: "Listed to Atlas Marketplace", desc: "Visible to matched institutional angels." },
  ];
  const activeIdx = submitted ? 1 : 0;

  return (
    <aside className="space-y-4">
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Application Status
        </h2>

        <ol className="relative mt-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
          {steps.map((s, i) => {
            const state = i < activeIdx ? "done" : i === activeIdx && submitted ? "active" : i === 0 && !submitted ? "active" : "pending";
            return (
              <li key={i} className="relative flex gap-4">
                <div className="relative z-10">
                  {state === "done" && (
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  )}
                  {state === "active" && (
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-primary ring-2 ring-primary/40">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    </div>
                  )}
                  {state === "pending" && (
                    <div className="grid h-6 w-6 place-items-center rounded-full bg-surface-elevated text-muted-foreground ring-1 ring-border">
                      <Circle className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <div className="-mt-0.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        state === "pending" ? "text-muted-foreground" : "text-foreground"
                      }`}
                    >
                      {i + 1}. {s.title}
                    </span>
                    {state === "active" && (
                      <span className="rounded-sm bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <p className="text-xs leading-relaxed text-foreground/90">
            We review every pitch to generate structured data points, ensuring angel
            investors see your strongest metrics instantly — no warm intro required.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> What investors will see
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Your pitch appears in the investor feed alongside an AI Bull/Bear committee
          breakdown, traction highlights, and a one-tap "request deck" CTA.
        </p>
      </div>
    </aside>
  );
}
