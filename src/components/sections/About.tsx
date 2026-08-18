import { Reveal } from "@/components/Reveal";
import { CLINIC } from "@/lib/clinic";

const STATS = [
  { value: "5+", label: "Years of experience" },
  { value: "4.9", label: "Google rating" },
  { value: "41", label: "Patient reviews" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            About AlineU
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            Recovery built around you — not a template
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="text-base leading-relaxed text-muted-foreground">
            AlineU is a dedicated physiotherapy and rehabilitation center in Ashoknagar
            where every plan starts with a proper assessment, not a guess. We treat pain
            at its source and rebuild the strength and movement around it, so relief
            actually lasts.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Sessions are one-on-one, hands-on, and paced to your body. From sports
            injuries and back pain to post-surgical recovery, you get a clear path
            forward and a therapist who stays with you through every step of it.
          </p>

          <div className="mt-8 rounded-3xl border border-border bg-secondary/60 p-6">
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
              {CLINIC.doctor.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {CLINIC.doctor.title} · {CLINIC.doctor.experience}
            </p>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-border p-4 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-[family-name:var(--font-display)] text-2xl font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
