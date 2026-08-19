# Modernize the Dr. Chinmay Jain name card in the hero

Refine the small white card overlaying the doctor photo so it feels premium and animated, instead of a plain white box.

## Visual direction
- Frosted glass panel: translucent card background with backdrop blur and a hairline light border, sitting over the photo instead of a flat white block.
- Layered depth: soft green-tinted shadow plus a subtle gradient edge using existing sage/tint tokens.
- Content upgrade: a small circular badge (verified/leaf-style line icon in primary green) to the left, name in the display font, role in muted small caps with tighter tracking, and a thin divider before a compact "5+ yrs" / "4.9" micro-stat line.
- All colors from existing semantic tokens in `src/styles.css` — no hardcoded colors.

## Animation
- Entrance: card fades and slides up with a slight scale on load, delayed a beat after the hero headline, using the existing reveal pattern.
- Hover/focus: gentle lift, shadow deepen, and the badge glow ring pulse; transitions ~250ms ease-out.
- Optional slow ambient shimmer on the badge ring, disabled under `prefers-reduced-motion`.

## Scope
- Only the name card inside `src/components/sections/Hero.tsx`, plus any new keyframes/utility added to `src/styles.css`.
- Position stays bottom-left of the photo; adjusted slightly so it doesn't cover the doctor's face on small screens.
