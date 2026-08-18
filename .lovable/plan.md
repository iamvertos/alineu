# Mobile header polish + real WhatsApp logo

## Mobile header
- Shorten the CTA label to "Appointment" on small screens (keep "Book an Appointment" from `lg` up).
- Rebalance the header row so it never crowds: logo block gets `min-w-0` with a `shrink-0` mark, CTA and icon buttons get `shrink-0`, and the row uses a tighter gap on mobile.
- Slim the mobile CTA: smaller horizontal padding, `text-sm`, fixed `h-10` so it lines up exactly with the phone and hamburger circles (all 40px tall).
- Drop the separate phone circle on mobile to reduce clutter — call is already available in the floating buttons and in the mobile menu; the header then reads: logo | Appointment | menu.
- Add the phone number as a full-width call row at the bottom of the open mobile menu so nothing is lost.

## WhatsApp logo
- Add a small inline `WhatsAppIcon` SVG component (official WhatsApp glyph path, `currentColor`) at `src/components/icons/WhatsAppIcon.tsx`.
- Use it in the floating CTA in place of the generic `MessageCircle` icon, and use it for any future WhatsApp button so the mark is consistent site-wide.
- Keep the existing circular green button styling; only the glyph changes.

## Files touched
- `src/components/icons/WhatsAppIcon.tsx` (new)
- `src/components/sections/Header.tsx`
- `src/components/sections/FloatingCta.tsx`
