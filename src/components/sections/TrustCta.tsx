import { MapPin, Phone, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CLINIC } from "@/lib/clinic";

export function TrustCta() {
  return (
    <section className="px-5 pb-20 lg:px-8 lg:pb-24">
      <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[var(--sage)] via-[var(--tint)] to-[var(--mist)] px-6 py-14 text-center lg:px-16 lg:py-20">
        <div className="mx-auto inline-flex items-center gap-3 rounded-full bg-background/85 px-5 py-2.5 shadow-[0_16px_34px_-28px_rgba(31,46,23,0.9)]">
          <span className="flex items-center gap-0.5 text-primary" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {CLINIC.rating} Google Rating
          </span>
          <span className="text-sm text-muted-foreground">· {CLINIC.reviews} Reviews</span>
        </div>

        <h2 className="mx-auto mt-7 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          Start Your Recovery Journey Today
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-[oklch(0.34_0.05_138)]">
          Same-day appointments are often available. Call us, or send a request and we'll
          confirm your slot.
        </p>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
          <a
            href={CLINIC.phoneHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-[0_18px_36px_-20px_rgba(31,46,23,0.95)] transition-transform hover:-translate-y-0.5"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <a
            href={CLINIC.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-transform hover:-translate-y-0.5"
          >
            <MapPin className="h-4 w-4 text-primary" />
            Get Directions
          </a>
          <a
            href="#book"
            className="inline-flex items-center justify-center rounded-full border border-primary/40 px-7 py-3.5 text-base font-semibold text-primary transition-colors hover:bg-background/70"
          >
            Book Appointment
          </a>
        </div>
      </Reveal>
    </section>
  );
}
