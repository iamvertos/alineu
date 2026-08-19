# Plan — Highlight the Appointment Form in the Contact & Location section

## Goal
The booking form currently sits on a plain white card (`bg-card`) that blends into the page. The user wants it visually highlighted with a **dark base + white text** so it draws the eye and reads as the primary call-to-action when visitors reach this section, with proper CTA emphasis.

## Approach
Convert the form card into a dark, premium forest-green panel. Keep the existing Supabase submission logic, validation, and success/error states untouched — only the presentation layer changes.

### Changes (all in `src/components/sections/AppointmentForm.tsx`)

1. **Form card — dark forest-green base**
   - Replace `bg-card border-border` with a deep green gradient:
     `bg-gradient-to-br from-primary to-[oklch(0.32_0.06_138)]` (forest → darker forest).
   - Add a stronger, colored shadow: `shadow-[0_36px_70px_-40px_rgba(31,46,23,0.95)]`.
   - Add a subtle top accent strip or ring (`ring-1 ring-primary/30`) for a premium edge.
   - Padding stays `p-6 sm:p-8`, radius stays `rounded-3xl`.

2. **Headline + supporting copy — white**
   - `h3` → `text-white` (was `text-foreground`).
   - Subtext paragraph → `text-white/70`.

3. **Field styling — translucent white inputs on dark base**
   - Update the shared `fieldClass` so fields read on the dark panel:
     - Background: `bg-white/10` (frosted translucent) with `backdrop-blur` feel.
     - Border: `border-white/20`.
     - Text + placeholder: `text-white`, `placeholder:text-white/55`.
     - Focus: `focus:border-white/60 focus:ring-2 focus:ring-white/25`.
   - Labels → `text-white/85`; the "(optional)" hint → `text-white/45`.
   - Date input: add `[color-scheme:dark]` via inline style/`style` attr so the native date picker renders legibly on the dark surface.
   - Error text stays `text-destructive` (the red reads fine on green).

4. **CTA button — bright contrast pop**
   - Switch the submit button from `bg-primary` (same green as panel, low contrast) to a **light sage/white** fill so it pops on the dark card:
     `bg-white text-primary` with `hover:bg-secondary` lift, OR `bg-sage text-sage-foreground`.
   - Keep the rounded-full, full-width, hover-lift, disabled-opacity, and Loader2 spinner behavior.

5. **Success state — match the new dark treatment**
   - Currently `bg-secondary/60` light card. Restyle to a dark panel (`bg-white/10 border-white/15`) with a white check icon and white text so the confirmation doesn't visually clash with the new form style.

### Out of scope
- No changes to the Contact section layout, map, business hours, or address column.
- No schema/RLS/migration changes — form still inserts into `appointment_requests`.
- No new dependencies.

## Verification
- Take a screenshot of the `#book` form on desktop and mobile to confirm: dark green panel, white legible text, translucent inputs, and a bright CTA button that stands out.
- Submit a test request to confirm validation + success state still render correctly on the new dark styling.
- Confirm reduced-motion/no-JS users still see a fully legible, high-contrast form.
