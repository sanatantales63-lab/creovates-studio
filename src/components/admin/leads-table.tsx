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
  Sparkles,
  Mail,
  MessageCircle,
} from "lucide-react";

const STATUS_OPTIONS = [
  {
    value: "new",
    label: "New",
    color: "text-[#4b83ee] bg-[#4b83ee]/15 border-[#4b83ee]/40",
  },
  {
    value: "reviewed",
    label: "Reviewed",
    color: "text-amber-400 bg-amber-500/15 border-amber-500/35",
  },
  {
    value: "in_progress",
    label: "In Progress",
    color: "text-emerald-400 bg-emerald-500/15 border-emerald-500/35",
  },
  {
    value: "closed",
    label: "Closed",
    color: "text-[#8e949d] bg-white/5 border-white/15",
  },
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
  const [copiedLink, setCopiedLink] = useState(false);

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
          prev.map((l) =>
            l.id === id ? { ...l, status: status as Lead["status"] } : l
          )
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
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 border border-[#4b83ee]/40 bg-[#4b83ee]/10 text-[#4b83ee] rounded-full px-4 py-1 text-xs font-medium mb-3">
            <Sparkles size={12} />
            Client Enquiries
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Client{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              leads
            </span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#8e949d]">
            {newCount > 0 ? (
              <span className="font-semibold text-[#4b83ee]">
                {newCount} new enquiry
              </span>
            ) : (
              "No new enquiries"
            )}{" "}
            · {leads.length} total submissions
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Form link copy pill */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#101216] px-4 py-2">
            <Link2 size={13} className="shrink-0 text-[#4b83ee]" />
            <span className="max-w-[180px] truncate text-xs font-mono text-[#b0b5be]">
              {formLink}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(formLink);
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="text-xs font-semibold text-[#4b83ee] hover:text-white transition"
            >
              {copiedLink ? "Copied!" : "Copy"}
            </button>
            <a
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Project Planner"
            >
              <ExternalLink
                size={13}
                className="text-[#8e949d] hover:text-white"
              />
            </a>
          </div>

          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-[#101216] px-5 py-2.5 text-xs font-semibold text-white transition hover:border-[#4b83ee]"
          >
            <RefreshCw
              size={13}
              className={loading ? "animate-spin text-[#4b83ee]" : "text-[#4b83ee]"}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#101216] py-24">
          <Loader2 size={24} className="animate-spin text-[#4b83ee]" />
        </div>
      )}

      {/* Empty */}
      {!loading && leads.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#101216] py-20 text-center animated-highlight-section">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#4b83ee]/30 bg-[#4b83ee]/15 text-[#4b83ee]">
            <Inbox size={22} />
          </div>
          <h2 className="text-xl font-bold text-white">No leads yet</h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#8e949d]">
            Share your project planner link and client enquiries will appear
            here automatically.
          </p>
          <a
            href={formLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4b83ee] px-6 py-2.5 text-xs font-semibold text-white shadow-blue hover:bg-[#3b73de] transition"
          >
            Open Project Planner ↗
          </a>
        </div>
      )}

      {/* Leads list */}
      {!loading && leads.length > 0 && (
        <div className="space-y-4">
          {leads.map((lead) => {
            const meta = statusMeta(lead.status);
            const isExpanded = expanded === lead.id;
            return (
              <div
                key={lead.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#101216] transition-all hover:border-[#4b83ee]/40 animated-highlight"
              >
                {/* Row */}
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : lead.id)}
                  className="grid w-full grid-cols-[1fr_auto] items-center gap-4 px-6 py-5 text-left transition hover:bg-white/[0.02] md:grid-cols-[2fr_1fr_1fr_auto_auto]"
                >
                  {/* Name + email */}
                  <div>
                    <p className="font-bold text-white text-sm">{lead.name}</p>
                    <p className="mt-0.5 text-xs text-[#8e949d]">{lead.email}</p>
                  </div>

                  {/* Project type */}
                  <p className="hidden text-xs font-medium text-[#b0b5be] md:block">
                    {lead.project_type}
                  </p>

                  {/* Budget */}
                  <p className="hidden text-xs font-bold text-white md:block">
                    {lead.budget_currency === "INR" ? "₹" : "$"}{" "}
                    {lead.budget_range}
                  </p>

                  {/* Status badge */}
                  <span
                    className={`hidden rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wider md:inline-block ${meta.color}`}
                  >
                    {meta.label}
                  </span>

                  {/* Time + chevron */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#8e949d]">
                      {timeAgo(lead.created_at)}
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-[#4b83ee]" />
                    ) : (
                      <ChevronDown size={16} className="text-[#8e949d]" />
                    )}
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-white/10 bg-[#0b0d12]/60 px-6 pb-6 pt-5">
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
                              <dt className="mb-1 text-[10px] font-mono uppercase tracking-wider text-[#8e949d]">
                                {k}
                              </dt>
                              <dd className="font-medium text-white">{v}</dd>
                            </div>
                          ))}
                        </dl>

                        {/* Description */}
                        <div>
                          <p className="mb-1.5 text-[10px] font-mono uppercase tracking-wider text-[#8e949d]">
                            Project Brief
                          </p>
                          <p className="text-sm leading-relaxed text-[#d4d7dd] rounded-xl bg-[#101216] border border-white/10 p-3.5">
                            {lead.description}
                          </p>
                        </div>

                        {lead.links && (
                          <div>
                            <p className="mb-1 text-[10px] font-mono uppercase tracking-wider text-[#8e949d]">
                              Links / References
                            </p>
                            <p className="text-xs leading-5 text-[#4b83ee] break-all">
                              {lead.links}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Right — status + actions */}
                      <div className="flex flex-col justify-between gap-5">
                        <div>
                          <p className="mb-2.5 text-[10px] font-mono uppercase tracking-wider text-[#8e949d]">
                            Update Lead Status
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {STATUS_OPTIONS.map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                disabled={updating === lead.id}
                                onClick={() => updateStatus(lead.id, opt.value)}
                                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                                  lead.status === opt.value
                                    ? opt.color
                                    : "border-white/10 text-[#8e949d] hover:border-white/25 hover:text-white"
                                } disabled:opacity-40`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Quick actions */}
                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                          <a
                            href={`mailto:${lead.email}?subject=Re: Your Creovates Project Enquiry`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#4b83ee] px-4 py-2 text-xs font-semibold text-white shadow-blue hover:bg-[#3b73de] transition"
                          >
                            <Mail size={13} />
                            Reply via Email
                          </a>
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(lead.name)}%2C%20thank%20you%20for%20reaching%20out%20to%20Creovates%20Studio!`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-4 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/25 transition"
                            >
                              <MessageCircle size={13} />
                              WhatsApp
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteLead(lead.id)}
                            disabled={deleting === lead.id}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#e05252]/30 bg-[#e05252]/10 px-4 py-2 text-xs font-semibold text-[#e05252] transition hover:bg-[#e05252]/20 disabled:opacity-40 ml-auto"
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
