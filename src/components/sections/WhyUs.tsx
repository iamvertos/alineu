import { HeartHandshake, Layers, RefreshCcw, Sofa, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const REASONS = [
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    desc: "Every plan is built around your body and goals.",
  },
  {
    icon: Layers,
    title: "Comprehensive Services",
    desc: "Manual, sports, neuro and advanced therapies in one place.",
  },
  {
    icon: RefreshCcw,
    title: "Rehabilitation-Focused",
    desc: "We treat the cause, not just today's pain.",
  },
  {
    icon: TrendingUp,
    title: "Better Movement & Recovery",
    desc: "Measurable progress you can feel week by week.",
  },
  {
    icon: Sofa,
    title: "Comfortable Environment",
    desc: "A calm, private clinic — never a rushed queue.",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Why Choose AlineU
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          Care that stays with you until you're back to yourself
        </h2>
      </Reveal>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, i) => (
          <Reveal
            as="li"
            key={reason.title}
            delay={(i % 3) * 70}
            className="rounded-3xl border border-border bg-gradient-to-br from-secondary/70 to-card p-6"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-background text-primary">
              <reason.icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
              {reason.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.desc}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
