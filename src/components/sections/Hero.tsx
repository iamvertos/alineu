import { Phone, Star } from "lucide-react";
import doctor from "@/assets/dr-chinmay-jain.jpg.asset.json";
import { CLINIC } from "@/lib/clinic";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 lg:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,var(--tint),transparent_65%)] opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-56 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_center,var(--mist),transparent_70%)] opacity-50"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-secondary-foreground">
            Physiotherapy in Ashoknagar, MP
          </p>

          <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
            Move Better.
            <br />
            Recover Stronger.
            <span className="sr-only"> — Physiotherapy &amp; Rehabilitation Center in Ashoknagar</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Personalized physiotherapy and rehabilitation care in Ashoknagar for pain,
            injuries, mobility limitations, and recovery — guided one-on-one from your
            first session to full strength.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#book"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-[0_18px_36px_-20px_rgba(31,46,23,0.95)] transition-transform hover:-translate-y-0.5"
            >
              Book an Appointment
            </a>
            <a
              href={CLINIC.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 px-7 py-3.5 text-base font-semibold text-primary transition-colors hover:bg-secondary"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </div>

          <div className="mt-7 flex items-center gap-2.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-0.5 text-primary" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span>
              <strong className="font-semibold text-foreground">{CLINIC.rating}</strong> Google
              Rating · {CLINIC.reviews} Reviews
            </span>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-6 -bottom-5 top-8 rounded-[2.5rem] bg-gradient-to-br from-[var(--sage)] to-[var(--tint)]"
          />
          <img
            src={doctor.url}
            alt="Dr. Chinmay Jain, physiotherapist at AlineU Physiotherapy Ashoknagar"
            className="relative w-full rounded-[2.25rem] object-cover shadow-[0_36px_80px_-48px_rgba(31,46,23,0.85)]"
            width={900}
            height={1000}
          />
          <div className="absolute -bottom-6 left-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-[0_24px_50px_-32px_rgba(31,46,23,0.8)] sm:left-8">
            <p className="font-[family-name:var(--font-display)] text-base font-semibold text-foreground">
              {CLINIC.doctor.name}
            </p>
            <p className="text-xs text-muted-foreground">{CLINIC.doctor.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
