import { Reveal } from "@/components/Reveal";

const CONDITIONS = [
  "Back Pain",
  "Neck Pain",
  "Knee Pain",
  "Shoulder Pain",
  "Sports Injuries",
  "Joint Problems",
  "Mobility Issues",
  "Post-Surgical Recovery",
];

export function Conditions() {
  return (
    <section id="conditions" className="bg-[var(--tint)] py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Conditions We Help With
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-foreground sm:text-4xl">
            If it hurts or holds you back, we treat it
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {CONDITIONS.map((condition) => (
              <li
                key={condition}
                className="rounded-full border border-primary/20 bg-background/85 px-5 py-2.5 text-sm font-medium text-foreground shadow-[0_10px_24px_-22px_rgba(31,46,23,0.9)]"
              >
                {condition}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
