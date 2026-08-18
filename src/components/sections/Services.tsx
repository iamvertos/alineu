import {
  Activity,
  Bone,
  Brain,
  Dumbbell,
  HandHeart,
  Hexagon,
  MoveVertical,
  Stethoscope,
  Syringe,
  Waves,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";

const SERVICES = [
  { icon: HandHeart, name: "Manual Therapy", desc: "Hands-on release for stiff, painful joints" },
  { icon: Dumbbell, name: "Sports Injury Rehabilitation", desc: "Return to play, stronger than before" },
  { icon: Stethoscope, name: "Post-Surgical Rehabilitation", desc: "Guided recovery after any operation" },
  { icon: MoveVertical, name: "Back & Spine Physiotherapy", desc: "Lasting relief for spine-related pain" },
  { icon: Activity, name: "Neck Pain Treatment", desc: "Ease stiffness from posture and strain" },
  { icon: Bone, name: "Knee Pain Rehabilitation", desc: "Restore strength, stability and walking" },
  { icon: Syringe, name: "Dry Needling Therapy", desc: "Targeted release of stubborn trigger points" },
  { icon: Hexagon, name: "Cupping Therapy", desc: "Improves circulation and muscle recovery" },
  { icon: Waves, name: "Shockwave Therapy", desc: "Advanced care for chronic tissue pain" },
  { icon: Brain, name: "Neurological Rehabilitation", desc: "Rebuild movement, balance and control" },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
      <Reveal className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Services</p>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          Complete physiotherapy care under one roof
        </h2>
      </Reveal>

      <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {SERVICES.map((service, i) => (
          <Reveal
            as="li"
            key={service.name}
            delay={(i % 4) * 60}
            className="group rounded-3xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_26px_50px_-38px_rgba(31,46,23,0.9)]"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary transition-colors group-hover:bg-accent">
              <service.icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-foreground">
              {service.name}
            </h3>
            <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{service.desc}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
