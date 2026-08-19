import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

export type LeadStatus = Database["public"]["Enums"]["lead_status"];
export type Lead = Database["public"]["Tables"]["appointment_requests"]["Row"];

export const listLeads = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("appointment_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error(error.message);
    return (data ?? []) as Lead[];
  });

export const updateLead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status?: LeadStatus; admin_note?: string }) => {
    if (!input?.id) throw new Error("Missing lead id");
    if (input.admin_note !== undefined && input.admin_note.length > 500) {
      throw new Error("Note is too long");
    }
    return input;
  })
  .handler(async ({ data, context }) => {
    const patch: { status?: LeadStatus; admin_note?: string | null } = {};
    if (data.status) patch.status = data.status;
    if (data.admin_note !== undefined) patch.admin_note = data.admin_note || null;

    const { data: row, error } = await context.supabase
      .from("appointment_requests")
      .update(patch)
      .eq("id", data.id)
      .select()
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Forbidden");
    return row as Lead;
  });

export type LeadStats = {
  today: number;
  last7: number;
  last30: number;
  total: number;
  byStatus: Record<LeadStatus, number>;
  hourly: { hour: number; count: number }[];
  oldestPendingAt: string | null;
  recent: Lead[];
};

export const getLeadStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<LeadStats> => {
    const { data, error } = await context.supabase
      .from("appointment_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);

    const rows = (data ?? []) as Lead[];
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    // Clinic operates in IST; bucket "today" and hour-of-day in IST.
    const IST_OFFSET = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now + IST_OFFSET);
    const startOfTodayIst =
      Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), istNow.getUTCDate()) - IST_OFFSET;

    const byStatus: Record<LeadStatus, number> = {
      new: 0,
      contacted: 0,
      not_contacted: 0,
      rejected: 0,
    };
    const hourly = Array.from({ length: 24 }, (_, hour) => ({ hour, count: 0 }));

    let today = 0;
    let last7 = 0;
    let last30 = 0;
    let oldestPendingAt: string | null = null;

    for (const row of rows) {
      const created = new Date(row.created_at);
      const ts = created.getTime();
      if (ts >= startOfTodayIst) today += 1;
      if (now - ts <= 7 * day) last7 += 1;
      if (now - ts <= 30 * day) last30 += 1;
      byStatus[row.status] = (byStatus[row.status] ?? 0) + 1;
      hourly[new Date(ts + IST_OFFSET).getUTCHours()]!.count += 1;
      if (row.status === "new") {
        if (!oldestPendingAt || ts < new Date(oldestPendingAt).getTime()) {
          oldestPendingAt = row.created_at;
        }
      }
    }

    return {
      today,
      last7,
      last30,
      total: rows.length,
      byStatus,
      hourly,
      oldestPendingAt,
      recent: rows.slice(0, 6),
    };
  });