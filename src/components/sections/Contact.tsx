import { Clock, Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AppointmentForm } from "@/components/sections/AppointmentForm";
import { CLINIC } from "@/lib/clinic";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 pb-20 lg:px-8 lg:pb-28">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Contact &amp; Location
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          Visit us in Ashoknagar
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal className="space-y-6">
          <div className="flex gap-4">
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
              <MapPin className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <div>
              <p className="font-semibold text-foreground">Clinic address</p>
              <address className="mt-1 text-sm not-italic leading-relaxed text-muted-foreground">
                {CLINIC.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={CLINIC.directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-primary underline underline-offset-4"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Phone className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <div>
              <p className="font-semibold text-foreground">Phone</p>
              <a
                href={CLINIC.phoneHref}
                className="mt-1 inline-block text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {CLINIC.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
              <Clock className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <div className="w-full">
              <p className="font-semibold text-foreground">Business hours</p>
              <ul className="mt-2 space-y-1.5">
                {CLINIC.hours.map((entry) => (
                  <li
                    key={entry.day}
                    className="flex flex-wrap justify-between gap-x-6 gap-y-0.5 border-b border-border/70 pb-1.5 text-sm last:border-0"
                  >
                    <span className="text-foreground">{entry.day}</span>
                    <span className="text-muted-foreground">{entry.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={CLINIC.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AlineU Physio on Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary transition-colors hover:bg-secondary"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={CLINIC.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AlineU Physio on Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary transition-colors hover:bg-secondary"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border">
            <iframe
              title="Map showing AlineU Physiotherapy in Ashoknagar, Madhya Pradesh"
              src={CLINIC.mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0"
            />
          </div>
        </Reveal>

        <div id="book" className="scroll-mt-28">
          <Reveal delay={80}>
            <AppointmentForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
