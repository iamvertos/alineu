import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, CalendarClock, Clock, TrendingUp, Users } from "lucide-react";
import { getLeadStats } from "@/lib/admin.functions";
import { AdminShell } from "@/components/admin/AdminShell";
import { STATUS_CLASS, STATUS_LABEL, STATUS_ORDER, formatDateTime, formatWaiting } from "@/lib/leads";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Lead Dashboard | AlineU Admin" },
      { name: "description", content: "Appointment lead volume and status overview for AlineU." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Lead Dashboard | AlineU Admin" },
      { property: "og:description", content: "Appointment lead volume and status overview for AlineU." },
    ],
  }),
  component: Dashboard,
});

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </div>
      <p className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
}

function Dashboard() {
  const fetchStats = useServerFn(getLeadStats);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lead-stats"],
    queryFn: () => fetchStats(),
  });

  const peak = data?.hourly.reduce((best, h) => (h.count > best.count ? h : best), {
    hour: 0,
    count: 0,
  });
  const maxHourly = Math.max(1, ...(data?.hourly.map((h) => h.count) ?? [1]));

  return (
    <AdminShell title="Dashboard" subtitle="Lead volume from the clinic website at a glance.">
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading dashboard…</p>
      ) : isError || !data ? (
        <p className="text-sm text-destructive">Could not load dashboard data.</p>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Today" value={data.today} icon={CalendarClock} />
            <StatCard label="Last 7 days" value={data.last7} icon={TrendingUp} />
            <StatCard label="Last 30 days" value={data.last30} icon={Users} />
            <StatCard label="All time" value={data.total} icon={Users} />
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-5 lg:col-span-1">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                Status breakdown
              </h2>
              <ul className="mt-4 space-y-2.5">
                {STATUS_ORDER.map((status) => (
                  <li key={status} className="flex items-center justify-between text-sm">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLASS[status]}`}
                    >
                      {STATUS_LABEL[status]}
                    </span>
                    <span className="font-semibold text-foreground">{data.byStatus[status]}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-secondary/60 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  Longest waiting new lead
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {data.oldestPendingAt
                    ? `${formatWaiting(data.oldestPendingAt)} · since ${formatDateTime(data.oldestPendingAt)}`
                    : "No pending leads — all caught up."}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5 lg:col-span-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                  Busiest enquiry hours
                </h2>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {peak && peak.count > 0
                  ? `Most enquiries arrive around ${String(peak.hour).padStart(2, "0")}:00.`
                  : "Not enough data yet."}
              </p>
              <div className="mt-5 flex h-32 items-end gap-1">
                {data.hourly.map((h) => (
                  <div key={h.hour} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t bg-primary/70"
                      style={{ height: `${(h.count / maxHourly) * 100}%`, minHeight: h.count ? 4 : 2 }}
                      title={`${h.hour}:00 — ${h.count} leads`}
                    />
                    {h.hour % 6 === 0 ? (
                      <span className="text-[10px] text-muted-foreground">{h.hour}</span>
                    ) : (
                      <span className="text-[10px] text-transparent">.</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                Recent leads
              </h2>
              <Link to="/admin/leads" className="text-sm font-semibold text-primary hover:underline">
                View all
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {data.recent.length === 0 ? (
                <li className="py-4 text-sm text-muted-foreground">No leads yet.</li>
              ) : (
                data.recent.map((lead) => (
                  <li key={lead.id} className="flex flex-wrap items-center gap-3 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {lead.phone} · {formatDateTime(lead.created_at)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLASS[lead.status]}`}
                    >
                      {STATUS_LABEL[lead.status]}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </AdminShell>
  );
}