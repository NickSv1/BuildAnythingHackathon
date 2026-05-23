import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendInvestorMessage } from "@/lib/demo-store";

export function AskFounderDialog({
  open,
  onOpenChange,
  startupId,
  startupName,
  founderName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupId: string;
  startupName: string;
  founderName: string;
}) {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);

  function handleOpenChange(next: boolean) {
    if (!next) {
      setSent(false);
      setQuestion("");
    }
    onOpenChange(next);
  }

  function handleSend() {
    if (!question.trim()) return;
    sendInvestorMessage(startupId, startupName, founderName, question);
    setSent(true);
    window.setTimeout(() => handleOpenChange(false), 1800);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md border-border bg-card sm:rounded-xl">
        {sent ? (
          <div className="py-6 text-center">
            <p className="text-sm font-medium text-foreground">
              Your question has been sent to the founder
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {founderName} at {startupName} typically responds within a few hours.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Ask {founderName}</DialogTitle>
              <DialogDescription>
                Send a question about {startupName}. The founder will see it in their Atlas inbox.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="founder-question" className="text-sm">
                Your question
              </Label>
              <Textarea
                id="founder-question"
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="e.g. I love this! Up for a coffee chat?"
                className="resize-none"
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-2">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSend} disabled={!question.trim()}>
                Send
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
