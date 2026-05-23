import { useState } from "react";
import type { Startup } from "@/lib/mock-data";
import { toggleInterested, toggleSaved, useInterested, useSaved } from "@/lib/deal-interactions";
import { AskFounderDialog } from "@/components/ask-founder-dialog";
import { ThumbsUp, MessageCircle, Bookmark, Share2, Check } from "lucide-react";
import { toast } from "sonner";

export function DealActionBar({
  s,
  layout = "grid",
}: {
  s: Startup;
  layout?: "grid" | "inline";
}) {
  const interested = useInterested(s.id);
  const saved = useSaved(s.id);
  const [askOpen, setAskOpen] = useState(false);
  const founderName = s.founders[0]?.name ?? "the founder";

  function stop(e: React.MouseEvent) {
    e.stopPropagation();
  }

  function handleInterested(e: React.MouseEvent) {
    stop(e);
    const now = toggleInterested(s.id);
    if (now) toast.success(`Marked as interested in ${s.name}`);
  }

  function handleAsk(e: React.MouseEvent) {
    stop(e);
    setAskOpen(true);
  }

  function handleSave(e: React.MouseEvent) {
    stop(e);
    const now = toggleSaved(s.id);
    toast.success(
      now ? `${s.name} saved to your watchlist` : `Removed ${s.name} from watchlist`,
    );
  }

  function handleShare(e: React.MouseEvent) {
    stop(e);
    const url = `${window.location.origin}/?deal=${s.id}`;
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(url).then(() => {
        toast.success("Deal link copied to clipboard");
      });
    } else {
      toast.success("Share link ready");
    }
  }

  const barClass =
    layout === "grid"
      ? "grid grid-cols-4 gap-1 border-t border-border p-1"
      : "flex flex-wrap items-center gap-2";

  return (
    <>
      <div className={barClass}>
        <ActionBtn
          icon={<ThumbsUp className="h-4 w-4" />}
          label={interested ? "Interested ✓" : "Interested"}
          active={interested}
          tone="interested"
          compact={layout === "inline"}
          onClick={handleInterested}
        />
        <ActionBtn
          icon={<MessageCircle className="h-4 w-4" />}
          label="Ask"
          compact={layout === "inline"}
          onClick={handleAsk}
        />
        <ActionBtn
          icon={saved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          label={saved ? "Saved ✓" : "Save"}
          active={saved}
          compact={layout === "inline"}
          onClick={handleSave}
        />
        <ActionBtn
          icon={<Share2 className="h-4 w-4" />}
          label="Share"
          compact={layout === "inline"}
          onClick={handleShare}
        />
      </div>
      <AskFounderDialog
        open={askOpen}
        onOpenChange={setAskOpen}
        startupId={s.id}
        startupName={s.name}
        founderName={founderName}
      />
    </>
  );
}

function ActionBtn({
  icon,
  label,
  active,
  tone = "default",
  compact,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  tone?: "default" | "interested";
  compact?: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  const activeClass =
    tone === "interested"
      ? "bg-interested text-interested-foreground ring-1 ring-interested/40"
      : "bg-primary/15 text-primary ring-1 ring-primary/30";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium transition-colors ${
        active
          ? activeClass
          : tone === "interested"
            ? "text-interested hover:bg-interested/10"
            : "text-muted-foreground hover:bg-surface hover:text-foreground"
      }`}
    >
      {icon}
      {compact ? <span>{label}</span> : <span className="hidden sm:inline">{label}</span>}
    </button>
  );
}
