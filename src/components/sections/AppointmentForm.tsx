import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { createAppointmentRequest } from "@/lib/appointments.functions";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name" })
    .max(100, { message: "Name must be under 100 characters" }),
  phone: z
    .string()
    .trim()
    .min(6, { message: "Please enter a valid phone number" })
    .max(20, { message: "Phone number is too long" })
    .regex(/^[0-9+\-\s()]+$/, { message: "Phone number can only contain digits" }),
  preferred_date: z.string().trim().max(20).optional(),
  message: z.string().trim().max(1000, { message: "Message is too long" }).optional(),
});

type FieldErrors = Partial<Record<"name" | "phone" | "preferred_date" | "message", string>>;

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/55 focus:border-white/60 focus:ring-2 focus:ring-white/25";

const labelClass = "text-sm font-medium text-white/85";

export function AppointmentForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const submitRequest = useServerFn(createAppointmentRequest);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      await submitRequest({
        data: {
          name: parsed.data.name,
          phone: parsed.data.phone,
          preferred_date: parsed.data.preferred_date ?? null,
          message: parsed.data.message ?? null,
        },
      });
    } catch {
      setStatus("error");
      return;
    }

    form.reset();
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-sm">
        <CheckCircle2 className="mx-auto h-10 w-10 text-white" strokeWidth={1.6} />
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
          Request received
        </h3>
        <p className="mt-2 text-sm text-white/75">
          We'll call you shortly to confirm your appointment time. For anything urgent,
          please call the clinic directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-white underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-white/15 bg-linear-to-br from-primary to-[oklch(0.32_0.06_138)] p-6 shadow-[0_36px_70px_-40px_rgba(31,46,23,0.95)] ring-1 ring-primary/30 sm:p-8"
    >
      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
        Request an appointment
      </h3>
      <p className="mt-1.5 text-sm text-white/70">
        Share your details and we'll confirm your slot by phone.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" maxLength={100} placeholder="Your full name" className={fieldClass} />
          {errors.name ? <p className="mt-1.5 text-xs text-destructive">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={20}
            placeholder="+91 00000 00000"
            className={fieldClass}
          />
          {errors.phone ? <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p> : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="preferred_date" className={labelClass}>
            Preferred date <span className="text-white/45">(optional)</span>
          </label>
          <input
            id="preferred_date"
            name="preferred_date"
            type="date"
            style={{ colorScheme: "dark" }}
            className={fieldClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            What's troubling you? <span className="text-white/45">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="E.g. lower back pain for the last 3 weeks"
            className={fieldClass}
          />
          {errors.message ? (
            <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <p className="mt-4 text-sm text-destructive">
          Something went wrong sending your request. Please call the clinic instead.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary transition-all hover:-translate-y-0.5 hover:bg-secondary disabled:opacity-70"
      >
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Book an Appointment
      </button>
    </form>
  );
}
