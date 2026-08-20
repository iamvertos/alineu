import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(20)
    .regex(/^[0-9+\-\s()]+$/),
  preferred_date: z.string().trim().max(20).optional().nullable(),
  message: z.string().trim().max(1000).optional().nullable(),
});

export const createAppointmentRequest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    const { createClient } = await import("@supabase/supabase-js");
    const { sendAppointmentNotification } = await import("./appointment-email.server");

    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

    const supabase = createClient(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const row = {
      name: data.name,
      phone: data.phone,
      preferred_date: data.preferred_date ? data.preferred_date : null,
      message: data.message ? data.message : null,
    };

    const { error } = await supabase.from("appointment_requests").insert(row);
    if (error) {
      console.error("[appointments] insert failed:", error.message);
      throw new Error("Could not save appointment request");
    }

    try {
      await sendAppointmentNotification(row);
    } catch (err) {
      console.error("[appointments] notification email failed:", err);
    }

    return { ok: true as const };
  });
