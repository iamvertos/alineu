# Hero Headline Refinement

## Goal
Make the hero H1 ("Move Better. / Recover Stronger.") more visually rich and give it a tasteful entrance animation that elevates the whole hero section, while keeping the calm, clinical, premium feel of the AlineU brand.

## What changes

### 1. Typography & styling (`src/components/sections/Hero.tsx`)
- Keep Outfit display font, large and bold, tight leading.
- Add a brand accent to the second line: render "Recover Stronger." with a forest-green text gradient (`from --primary to --sage`) so it reads as the emotional payoff line, while "Move Better." stays solid foreground. This adds depth without clutter.
- Add a small animated accent underline beneath the headline (a short primary-colored bar that grows in width on load) — a premium editorial detail.
- Keep the existing `<span className="sr-only">` for SEO intact and unchanged.

### 2. Entrance animation (`src/styles.css` + Hero.tsx)
- Add a `hero-headline` utility: a staggered, word-by-word (line-by-line) reveal — each line fades in and slides up with a slight delay between lines, using a refined cubic-bezier easing (~0.6–0.8s total).
- The accent underline grows from 0 to full width after the headline settles, as a secondary motion beat.
- Wrap the two headline lines in spans carrying the animation; no JS state needed — pure CSS keyframes with `animation-delay`, gated behind `@media (prefers-reduced-motion: reduce)` to render instantly.

### 3. Files touched
- `src/components/sections/Hero.tsx` — restructure the `<h1>` into two animated line spans with gradient + underline.
- `src/styles.css` — add `@keyframes hero-line-up`, `@keyframes hero-underline-grow`, and a `@utility hero-headline` (plus reduced-motion override).

## Out of scope
- No changes to the doctor image, name tag card, CTAs, rating strip, or any other section.
- No new dependencies; pure CSS animation (no Motion/GSAP).

## Quality bar
- Animation must feel calm and premium, not bouncy or busy — one smooth settle, one subtle underline beat.
- Must remain fully legible and accessible (contrast preserved, reduced-motion respected).
- Mobile and desktop both look intentional.
