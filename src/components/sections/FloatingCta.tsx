import { MessageCircle, Phone } from "lucide-react";
import { CLINIC } from "@/lib/clinic";

export function FloatingCta() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={CLINIC.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AlineU on WhatsApp"
        className="inline-flex items-center justify-center rounded-full bg-primary p-3.5 text-primary-foreground shadow-[0_18px_36px_-18px_rgba(31,46,23,0.95)] transition-transform hover:-translate-y-0.5"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href={CLINIC.phoneHref}
        aria-label={`Call AlineU at ${CLINIC.phoneDisplay}`}
        className="inline-flex items-center justify-center rounded-full bg-background p-3.5 text-primary shadow-[0_18px_36px_-20px_rgba(31,46,23,0.95)] ring-1 ring-border transition-transform hover:-translate-y-0.5 sm:hidden"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
