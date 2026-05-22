import { createFileRoute } from "@tanstack/react-router";
import { InboxPage } from "@/components/inbox-page";

export const Route = createFileRoute("/inbox")({
  head: () => ({
    meta: [
      { title: "Inbox — Atlas" },
      { name: "description", content: "Direct messages with founders, investors, and syndicate leads on Atlas." },
      { property: "og:title", content: "Inbox — Atlas" },
      { property: "og:description", content: "Secure deal conversations with founders and co-investors." },
    ],
  }),
  component: InboxPage,
});
