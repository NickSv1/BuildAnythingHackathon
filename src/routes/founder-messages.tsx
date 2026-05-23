import { createFileRoute } from "@tanstack/react-router";
import { InboxPage } from "@/components/inbox-page";

function FounderMessagesPage() {
  return <InboxPage mode="founder" />;
}

export const Route = createFileRoute("/founder-messages")({
  head: () => ({
    meta: [
      { title: "Messages — Atlas Founder" },
      { name: "description", content: "Direct messages with investors interested in your raise." },
      { property: "og:title", content: "Founder Messages — Atlas" },
      { property: "og:description", content: "Investor conversations for your active raise." },
    ],
  }),
  component: FounderMessagesPage,
});
