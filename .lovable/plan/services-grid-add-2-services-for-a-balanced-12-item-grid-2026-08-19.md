# Services Grid: Add 2 services for a balanced 12-item grid

## Goal
The Services grid uses `lg:grid-cols-4`; with only 10 services the last row shows 2 empty slots. Add 2 more physiotherapy-relevant services so the section completes to a clean 3×4 grid (12 items).

## Data source
The `SERVICES` constant array in `src/components/sections/Services.tsx` (lines 15–26). Each entry is `{ icon, name, desc }`. This is a static list — edit it directly, no DB/state changes.

## Add these two services
1. **Geriatric Physiotherapy** — "Stay active and independent with age"
   - Icon: `PersonStanding` (lucide-react) — fits elderly/mobility care.
2. **Electrotherapy (TENS & IFT)** — "Pain relief through targeted currents"
   - Icon: `Zap` (lucide-react) — fits a modality-style service, complements Cupping/Shockwave.

Both are standard offerings in Indian physio clinics and complement the existing 10 without overlapping.

## Changes
- `src/components/sections/Services.tsx`
  - Add `PersonStanding` and `Zap` to the lucide-react import list.
  - Append the two new entries to the `SERVICES` array (after Neurological Rehabilitation) so the grid fills naturally.

## Out of scope
- No other sections, no styling/layout changes, no DB or component-structure changes. The grid already handles 12 items correctly.

## Quality bar
- New cards match the existing card style and icon treatment exactly (no extra markup).
- Order keeps modalities/therapy grouping sensible; new items slot in without disrupting flow.
