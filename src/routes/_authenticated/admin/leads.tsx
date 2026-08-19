import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Phone, Search } from "lucide-react";
import { listLeads, updateLead, type Lead, type LeadStatus } from "@/lib/admin.functions";
import { AdminShell } from "@/components/admin/AdminShell";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { STATUS_CLASS, STATUS_LABEL, STATUS_ORDER, formatDateTime } from "@/lib/leads";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  head: () => ({
    meta: [
      { title: "Appointment Leads | AlineU Admin" },
      { name: "description", content: "Track and update every appointment request from the AlineU website." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Appointment Leads | AlineU Admin" },
      {
        property: "og:description",
        content: "Track and update every appointment request from the AlineU website.",
      },
    ],
  }),
  component: LeadsPage,
});

function digitsOnly(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

function LeadsPage() {
  const fetchLeads = useServerFn(listLeads);
  const saveLead = useServerFn(updateLead);
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leads"],
    queryFn: () => fetchLeads(),
  });

  const mutation = useMutation({
    mutationFn: (input: { id: string; status?: LeadStatus; admin_note?: string }) =>
      saveLead({ data: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["lead-stats"] });
    },
  });

  const leads = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (data ?? []).filter((lead: Lead) => {
      if (filter !== "all" && lead.status !== filter) return false;
      if (!term) return true;
      return (
        lead.name.toLowerCase().includes(term) || lead.phone.toLowerCase().includes(term)
      );
    });
  }, [data, filter, search]);

  return (
    <AdminShell
      title="Leads"
      subtitle="Every appointment request submitted from the website, newest first."
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1.5">
          {(["all", ...STATUS_ORDER] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                filter === value
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-primary"
              }`}
            >
              {value === "all" ? "All" : STATUS_LABEL[value]}
            </button>
          ))}
        </div>
        <div className="relative ml-auto w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or phone"
            className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading leads…</p>
        ) : isError ? (
          <p className="text-sm text-destructive">Could not load leads.</p>
        ) : leads.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No leads match this view yet.
          </p>
        ) : (
          leads.map((lead: Lead) => {
            const wa = digitsOnly(lead.phone);
            const noteValue = noteDrafts[lead.id] ?? lead.admin_note ?? "";
            return (
              <div key={lead.id} className="rounded-3xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
                        {lead.name}
                      </h3>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLASS[lead.status]}`}
                      >
                        {STATUS_LABEL[lead.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {lead.phone} · received {formatDateTime(lead.created_at)}
                      {lead.preferred_date ? ` · prefers ${lead.preferred_date}` : ""}
                    </p>
                    {lead.message ? (
                      <p className="mt-2.5 rounded-2xl bg-secondary/60 p-3 text-sm text-foreground">
                        {lead.message}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lead.phone.replace(/\s/g, "")}`}
                      aria-label={`Call ${lead.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary transition-colors hover:bg-secondary"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://wa.me/${wa}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`WhatsApp ${lead.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-[#25D366] transition-colors hover:bg-secondary"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-[200px_1fr]">
                  <div>
                    <label
                      htmlFor={`status-${lead.id}`}
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Status
                    </label>
                    <select
                      id={`status-${lead.id}`}
                      value={lead.status}
                      onChange={(e) =>
                        mutation.mutate({ id: lead.id, status: e.target.value as LeadStatus })
                      }
                      className="mt-1 w-full rounded-2xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      {STATUS_ORDER.map((status) => (
                        <option key={status} value={status}>
                          {STATUS_LABEL[status]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor={`note-${lead.id}`}
                      className="text-xs font-medium text-muted-foreground"
                    >
                      Internal note
                    </label>
                    <div className="mt-1 flex gap-2">
                      <input
                        id={`note-${lead.id}`}
                        value={noteValue}
                        maxLength={500}
                        onChange={(e) =>
                          setNoteDrafts((prev) => ({ ...prev, [lead.id]: e.target.value }))
                        }
                        placeholder="E.g. called, will visit Friday"
                        className="w-full rounded-2xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        type="button"
                        onClick={() => mutation.mutate({ id: lead.id, admin_note: noteValue })}
                        disabled={noteValue === (lead.admin_note ?? "")}
                        className="shrink-0 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </AdminShell>
  );
}