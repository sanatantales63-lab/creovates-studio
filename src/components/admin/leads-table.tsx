"use client";

import { useEffect, useState } from "react";
import { Lead } from "@/types/lead";
import {
  ChevronDown,
  ChevronUp,
  Trash2,
  ExternalLink,
  Loader2,
  RefreshCw,
  Inbox,
  Link2,
} from "lucide-react";

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "text-[#4b83ee] bg-[#4b83ee]/10 border-[#4b83ee]/30" },
  { value: "reviewed", label: "Reviewed", color: "text-amber-400 bg-amber-400/10 border-amber-400/30" },
  { value: "in_progress", label: "In Progress", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" },
  { value: "closed", label: "Closed", color: "text-[#8e949d] bg-white/[.04] border-white/[.1]" },
];

function statusMeta(status: string) {
  return STATUS_OPTIONS.find((s) => s.value === status) ?? STATUS_OPTIONS[0];
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [formLink, setFormLink] = useState("");

  useEffect(() => {
    setFormLink(window.location.origin + "/start-project");
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: status as Lead["status"] } : l))
        );
      }
    } finally {
      setUpdating(null);
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead permanently?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (res.ok) setLeads((prev) => prev.filter((l) => l.id !== id));
    } finally {
      setDeleting(null);
    }
  }

  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="min-h-screen bg-[#08090b] px-5 py-8 md:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-white/[.08] pb-6">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="mt-4 text-4xl font-medium tracking-[-.06em] md:text-5xl">
            CLIENT LEADS
            <span className="text-[#8e949d]">.</span>
          </h1>
          <p className="mt-2 text-sm text-[#8e949d]">
            {newCount > 0 ? (
              <span className="text-[#4b83ee]">{newCount} new</span>
            ) : (
              "No new leads"
            )}{" "}
            · {leads.length} total submissions
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Form link copy */}
          <div className="flex items-center gap-2 rounded-lg border border-white/[.07] bg-white/[.02] px-3 py-2">
            <Link2 size={12} className="shrink-0 text-[#4b83ee]" />
            <span className="max-w-[180px] truncate text-[10px] font-mono text-[#8e949d]">
              {formLink}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(formLink)}
              className="text-[10px] font-bold uppercase tracking-[.1em] text-[#4b83ee] hover:text-[#f4f4f2] transition"
            >
              Copy
            </button>
            <a href={formLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={12} className="text-[#8e949d] hover:text-[#f4f4f2]" />
            </a>
          </div>

          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 rounded-lg border border-white/[.07] bg-white/[.02] px-4 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#8e949d] transition hover:text-[#f4f4f2]"
          >
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={22} className="animate-spin text-[#4b83ee]" />
        </div>
      )}

      {/* Empty */}
      {!loading && leads.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/[.07] bg-white/[.03]">
            <Inbox size={20} className="text-[#8e949d]" />
          </div>
          <h2 className="text-xl font-medium text-[#f4f4f2]">No leads yet</h2>
          <p className="mt-2 text-sm text-[#8e949d]">
            Share the form link and client enquiries will appear here.
          </p>
          <a
            href={formLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 text-xs font-bold uppercase tracking-[.14em] text-[#4b83ee] hover:text-[#f4f4f2] transition"
          >
            Open form →
          </a>
        </div>
      )}

      {/* Leads list */}
      {!loading && leads.length > 0 && (
        <div className="space-y-3">
          {leads.map((lead) => {
            const meta = statusMeta(lead.status);
            const isExpanded = expanded === lead.id;
            return (
              <div
                key={lead.id}
                className="overflow-hidden rounded-xl border border-white/[.07] bg-[#0c0e12] transition"
              >
                {/* Row */}
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : lead.id)}
                  className="grid w-full grid-cols-[1fr_auto] items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[.02] md:grid-cols-[2fr_1fr_1fr_auto_auto]"
                >
                  {/* Name + email */}
                  <div>
                    <p className="font-medium text-[#f4f4f2]">{lead.name}</p>
                    <p className="mt-0.5 text-xs text-[#8e949d]">{lead.email}</p>
                  </div>

                  {/* Project type */}
                  <p className="hidden text-xs text-[#8e949d] md:block">
                    {lead.project_type}
                  </p>

                  {/* Budget */}
                  <p className="hidden text-xs text-[#f4f4f2] md:block">
                    {lead.budget_currency === "INR" ? "₹" : "$"} {lead.budget_range}
                  </p>

                  {/* Status badge */}
                  <span
                    className={`hidden rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.12em] md:inline-block ${meta.color}`}
                  >
                    {meta.label}
                  </span>

                  {/* Time + chevron */}
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#8e949d]">
                      {timeAgo(lead.created_at)}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={15} className="text-[#8e949d]" />
                    ) : (
                      <ChevronDown size={15} className="text-[#8e949d]" />
                    )}
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-white/[.06] px-5 pb-5 pt-5">
                    <div className="grid gap-6 md:grid-cols-2">
                      {/* Left details */}
                      <div className="space-y-4">
                        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs">
                          {[
                            ["Phone", lead.phone || "—"],
                            ["Company", lead.company || "—"],
                            ["Timeline", lead.timeline || "Flexible"],
                            ["How found us", lead.referral_source || "—"],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <dt className="mb-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#8e949d]/60">
                                {k}
                              </dt>
                              <dd className="text-[#f4f4f2]">{v}</dd>
                            </div>
                          ))}
                        </dl>

                        {/* Description */}
                        <div>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#8e949d]/60">
                            Project Brief
                          </p>
                          <p className="text-sm leading-6 text-[#8e949d]">
                            {lead.description}
                          </p>
                        </div>

                        {lead.links && (
                          <div>
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#8e949d]/60">
                              Links / References
                            </p>
                            <p className="text-sm leading-5 text-[#4b83ee]">
                              {lead.links}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right — status + actions */}
                      <div className="flex flex-col gap-4">
                        <div>
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-[.12em] text-[#8e949d]/60">
                            Update Status
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {STATUS_OPTIONS.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                disabled={updating === lead.id}
                                onClick={() => updateStatus(lead.id, opt.value)}
                                className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] transition-all ${
                                  lead.status === opt.value
                                    ? opt.color + " opacity-100"
                                    : "border-white/[.08] text-[#8e949d] hover:border-white/20 hover:text-[#f4f4f2]"
                                } disabled:opacity-40`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quick actions */}
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={`mailto:${lead.email}?subject=Re: Your Creovates Project Enquiry`}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.12em] text-[#4b83ee] transition hover:text-[#f4f4f2]"
                          >
                            Reply via Email →
                          </a>
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(lead.name)}%2C%20thank%20you%20for%20reaching%20out%20to%20Creovates%20Studio!`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.12em] text-[#4b83ee] transition hover:text-[#f4f4f2]"
                            >
                              WhatsApp →
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteLead(lead.id)}
                            disabled={deleting === lead.id}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.12em] text-rose-500 transition hover:text-rose-400 disabled:opacity-40"
                          >
                            {deleting === lead.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Trash2 size={12} />
                            )}
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
