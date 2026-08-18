# AlineU Physio — Single-Page Website

A premium, calm, clinical single-page site for AlineU Physiotherapy & Rehabilitation Center (Ashoknagar, MP), built to drive calls and appointment bookings.

## Design system
- Palette: Deep Forest Green `#507A34` (primary), Soft Sage `#90AF82`, Light Accent `#B2C7AA`, Soft Background `#C7D6C1`, white page background, text `#1F2E17` / `#333333`.
- Typography: Outfit for headings, Figtree for body (loaded via Google Fonts link in the root route).
- Soft rounded corners, generous whitespace, subtle shadows, gentle green gradient accents, line-style icons, restrained fade/slide-in on scroll.
- All colors as semantic tokens in `src/styles.css` — no hardcoded color classes.

## Page structure (one page, anchor navigation)
1. **Sticky header** — logo, nav (About, Services, Conditions, Why AlineU, Contact), always-visible "Book an Appointment" button; mobile hamburger with CTA persisting.
2. **Hero** — H1 "Physiotherapy & Rehabilitation Center in Ashoknagar" with "Move Better. Recover Stronger." as the dominant visual headline, subheadline, primary "Book an Appointment" + outline "Call Now", trust strip (4.9 · 41 Google reviews), doctor photo with soft green gradient shape.
3. **About** — clinic philosophy in 2–4 sentences, Dr. Chinmay Jain photo card with credentials and 5+ years of experience, stat row (5+ years, 4.9 rating, 41 reviews).
4. **Services** — 10 service cards (icon + name + one-line description), 2 columns mobile / 4 desktop.
5. **Conditions We Help With** — pill grid on the soft `#C7D6C1` tinted band.
6. **Why Choose AlineU** — 5 icon-led benefit points.
7. **Trust & CTA** — large 4.9 rating / 41 reviews anchor, "Start Your Recovery Journey Today", three buttons: Call Now · Get Directions · Book Appointment, on a green gradient band.
8. **Contact & Location** — full address, click-to-call phone, business hours table (Mon–Sat 9–11 AM & 6–8 PM, Sunday closed), embedded Google Map, Instagram/Facebook links, and the appointment request form.
9. **Footer** — logo + tagline, quick links, contact info, socials, copyright, "Website by Marketing Vertos".
10. **Floating WhatsApp/Call button** on mobile.

## Appointment form (Lovable Cloud)
- Fields: Name, Phone, Preferred Date, Message. Client-side validation with inline errors and a success confirmation.
- Enable Lovable Cloud and store submissions in an `appointment_requests` table; public insert only, no public read, so submissions stay private.
- Call and WhatsApp CTAs remain everywhere as the instant path.

## Functionality
- `tel:+919406975017` click-to-call, WhatsApp click-to-chat, Get Directions deep link to Google Maps for the clinic address.
- Smooth-scroll anchors, sticky header, keyboard-navigable nav and buttons, alt text on every image, mobile-first responsive layout.

## SEO
- Title: "AlineU Physiotherapy & Rehabilitation Center | Ashoknagar, MP"; ~155-char meta description with local keywords; og/twitter tags.
- Single keyword-bearing H1; local keywords (physiotherapy Ashoknagar, sports injury rehab, back/knee pain, dry needling, shockwave therapy) woven naturally into section copy.
- JSON-LD `MedicalClinic` schema with NAP, opening hours, and aggregate rating.

## Technical notes
- Rewrites `src/routes/index.tsx` as the single page; sections split into components under `src/components/sections/`.
- Uploaded logo and doctor photo uploaded as CDN assets; logo also becomes the favicon.
- Google Fonts loaded via `<link>` in `src/routes/__root.tsx`; tokens defined in `src/styles.css`.

## Assumed where the PRD left items open
- Doctor credentials rendered as "Dr. Chinmay Jain — Physiotherapist, 5+ years of experience"; exact degree letters can be added on request.
- Map embed uses the clinic street address rather than exact coordinates.
