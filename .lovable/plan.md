# Admin Lead Management Backend

A password-protected admin area for AlineU where you can see every appointment request that comes in from the website, mark how you've handled it, and see how many leads you're getting over time.

## What you get

**1. Admin login (`/admin/login`)**
- Single admin account with email + password.
- Demo credentials created for you and displayed right on the login screen (clearly marked as demo), so testing is one click away.
- Session persists; a "Sign out" action in the admin header.

**2. Leads module (`/admin/leads`)**
- Table of every appointment request: name, phone, preferred date, message, and when it came in.
- Status per lead: **New**, **Contacted**, **Not contacted**, **Rejected** — changed inline from a dropdown, saved instantly.
- Optional internal note per lead (short text you can add while calling).
- Filter by status, search by name/phone, newest-first ordering.
- Quick call / WhatsApp buttons on each row so you can act without copying the number.

**3. Dashboard (`/admin`)**
- Lead counts for **today**, **last 7 days**, **last 30 days**, plus all-time total.
- Status breakdown (how many new / contacted / not contacted / rejected).
- Busiest enquiry hours: a small bar strip showing which times of day leads usually arrive.
- Longest-waiting lead: how long the oldest still-untouched lead has been sitting.
- Recent leads list with a link into the full leads module.

The public website stays exactly as it is — the existing appointment form keeps writing into the same table, and those submissions show up as new leads.

## Technical notes

**Database**
- Add to `appointment_requests`: `status` (enum: `new`, `contacted`, `not_contacted`, `rejected`, default `new`), `admin_note` (text, nullable), `updated_at` with trigger.
- Keep the existing anon INSERT policy so the public form still works.
- Add `user_roles` table + `app_role` enum + `has_role()` security-definer function (roles never live on a profile table).
- Read/update policies on `appointment_requests` restricted to `has_role(auth.uid(), 'admin')`; anon keeps insert-only, no read.
- GRANTs issued for every new/updated table.

**Auth**
- Email/password via Lovable Cloud auth, auto-confirm enabled so the demo account works without an inbox.
- Demo admin user seeded and granted the `admin` role; credentials rendered on the login page behind a "Demo access" note.
- Admin routes live under `src/routes/_authenticated/` using the managed gate; `src/start.ts` already registers the bearer attacher.

**Data access**
- `src/lib/admin.functions.ts` — `listLeads`, `updateLeadStatus`, `getLeadStats`, each with `requireSupabaseAuth` middleware plus an explicit `has_role` admin check.
- TanStack Query for fetching; mutations invalidate the lead and stats queries.

**UI**
- Reuses the site's forest-green design tokens and Outfit/Figtree type; admin shell with sidebar nav (Dashboard, Leads) and sign-out.
- `noindex` meta on all admin routes.
