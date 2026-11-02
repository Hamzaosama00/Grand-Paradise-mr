import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site-config";

export function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp — we reply quickly"
      className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1faa55] shadow-[0_10px_30px_-8px_rgba(31,170,85,0.6)] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <span
        className="absolute inset-0 rounded-full bg-[#1faa55] animate-ping opacity-20"
        aria-hidden="true"
      />
      <MessageCircle className="relative h-7 w-7 text-white" aria-hidden="true" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-sm border border-border bg-[#0c110e] px-3 py-2 text-xs font-medium text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
        Chat with us — replies within hours
      </span>
    </a>
  );
}
