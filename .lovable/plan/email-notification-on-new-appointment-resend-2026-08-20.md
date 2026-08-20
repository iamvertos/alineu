# Email notification on new appointment (Resend)

Whenever someone submits the appointment form, an email alert goes to **marketingvertos@gmail.com**, sent from **testing@demo.iidcstudent.online** via your Resend API.

## How it works

1. The form submission moves from a direct browser-to-database write to a single server endpoint that:
   - validates the fields again on the server (name, phone, optional date and message),
   - saves the request to the leads table exactly as today,
   - then sends the notification email through Resend.
2. If the email fails, the lead is still saved and the visitor still sees the success message — the failure is only logged. The form never breaks because of email issues.
3. Admin dashboard and leads module are unchanged; new leads keep showing up there.

## The email

- To: marketingvertos@gmail.com
- From: AlineU Website <testing@demo.iidcstudent.online>
- Reply-to: none (visitors submit phone only)
- Subject: `New appointment request — <Name>`
- Body: clean branded HTML in the clinic's forest-green style with name, phone (click-to-call), preferred date, message, submission time in IST, and a button linking to the admin leads page.

## API key

I'll request `RESEND_API_KEY` through the secure secret form — it stays server-side only and never reaches the browser.

## Technical notes

- New `src/lib/appointments.functions.ts` with a public `createAppointmentRequest` server function: Zod validation, insert with the server publishable client (existing anon insert policy), then Resend send.
- Email sent with a direct `fetch` to `https://api.resend.com/emails` (no extra dependency), reading `process.env['RESEND_API_KEY']` inside the handler.
- `src/components/sections/AppointmentForm.tsx` calls the server function via `useServerFn` instead of `supabase.from(...).insert(...)`; validation, error and success states stay as they are.
- Rate-limit safety: server-side length caps and a basic per-request sanity check on input; no arbitrary recipient or template is accepted from the browser.
- Note: since Resend's domain is `demo.iidcstudent.online`, don't add a Lovable email domain on that same subdomain later — the DNS records would conflict.
