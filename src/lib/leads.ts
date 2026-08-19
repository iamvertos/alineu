import type { LeadStatus } from "./admin.functions";

export const DEMO_ADMIN = {
  email: "admin@alineu.demo",
  password: "AlineU@Demo2026",
} as const;

export const STATUS_ORDER: LeadStatus[] = ["new", "contacted", "not_contacted", "rejected"];

export const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  not_contacted: "Not contacted",
  rejected: "Rejected",
};

export const STATUS_CLASS: Record<LeadStatus, string> = {
  new: "bg-primary/12 text-primary ring-1 ring-primary/25",
  contacted: "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-600/25",
  not_contacted: "bg-amber-500/15 text-amber-700 ring-1 ring-amber-600/25",
  rejected: "bg-destructive/10 text-destructive ring-1 ring-destructive/25",
};

export function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatWaiting(from: string) {
  const ms = Date.now() - new Date(from).getTime();
  const hours = Math.floor(ms / 3_600_000);
  if (hours < 1) return `${Math.max(1, Math.floor(ms / 60_000))} min`;
  if (hours < 48) return `${hours} hr`;
  return `${Math.floor(hours / 24)} days`;
}