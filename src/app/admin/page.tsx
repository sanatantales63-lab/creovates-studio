import { requireAdmin } from "@/lib/admin";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import {
  FolderGit2,
  Plus,
  Star,
  Eye,
  Database,
  Cloud,
  ArrowRight,
  ExternalLink,
  Laptop,
  Zap,
  Inbox,
  Sparkles,
} from "lucide-react";
import { Project } from "@/types/project";

export const runtime = "edge";
export const dynamic = "force-dynamic";

async function getDashboardData() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { projects: [], tableMissing: true };

  try {
    const db = createClient(url, key, { auth: { persistSession: false } });
    const { data, error } = await db
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return { projects: [], tableMissing: true, error: error.message };
    }

    return { projects: (data as Project[]) || [], tableMissing: false };
  } catch (err: unknown) {
    return {
      projects: [],
      tableMissing: true,
      error: err instanceof Error ? err.message : "Error",
    };
  }
}

export default async function AdminDashboardPage() {
  await requireAdmin();
  const { projects, tableMissing } = await getDashboardData();

  const total = projects.length;
  const publishedCount = projects.filter((p) => p.published).length;
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="space-y-10 pb-16">
      {/* Top Welcome Header */}
      <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 border border-[#4b83ee]/40 bg-[#4b83ee]/10 text-[#4b83ee] rounded-full px-4 py-1 text-xs font-medium mb-3">
            <Sparkles size={12} />
            Studio Management Area
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Studio{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              overview
            </span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#8e949d]">
            Manage portfolio showcases, dual-screen presentations, client leads,
            and cloud assets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/import"
            className="flex items-center gap-2 rounded-full border border-[#4b83ee]/40 bg-[#4b83ee]/10 px-5 py-2.5 text-xs font-semibold text-[#4b83ee] transition hover:bg-[#4b83ee]/20"
          >
            <Zap size={14} />
            <span>URL Auto-Import</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 rounded-full bg-[#4b83ee] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3b73de] shadow-blue"
          >
            <Plus size={15} />
            <span>Add Project</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-[#b0b5be] hover:border-white/40 hover:text-white transition-all"
          >
            <span>Live Site</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      {/* Table Missing Alert Banner */}
      {tableMissing && (
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#4b83ee]/40 bg-[#4b83ee]/10 p-6 sm:flex-row sm:items-center animated-highlight-section">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4b83ee]/20 text-[#4b83ee]">
              <Database size={22} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Database table `projects` not initialized yet
              </p>
              <p className="text-xs text-[#b0b5be] mt-0.5">
                Run the supplied SQL schema once in your Supabase SQL Editor to
                unlock the database archive.
              </p>
            </div>
          </div>
          <Link
            href="/admin/setup"
            className="rounded-full bg-[#4b83ee] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3b73de] shadow-blue shrink-0"
          >
            Copy SQL Script →
          </Link>
        </div>
      )}

      {/* 4-Column Animated Highlight Metric Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Projects */}
        <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 animated-highlight-section">
          <div className="flex items-center justify-between text-[#8e949d]">
            <span className="text-xs font-mono uppercase tracking-wider">
              Total Projects
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4b83ee]/15 text-[#4b83ee]">
              <FolderGit2 size={16} />
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold text-white">{total}</p>
          <p className="mt-1.5 text-xs text-[#8e949d]">Archived in Supabase</p>
        </div>

        {/* Live Published */}
        <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 animated-highlight-section">
          <div className="flex items-center justify-between text-[#8e949d]">
            <span className="text-xs font-mono uppercase tracking-wider">
              Live Published
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <Eye size={16} />
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold text-white">{publishedCount}</p>
          <p className="mt-1.5 text-xs text-[#8e949d]">Active on portfolio</p>
        </div>

        {/* Featured Showcases */}
        <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 animated-highlight-section">
          <div className="flex items-center justify-between text-[#8e949d]">
            <span className="text-xs font-mono uppercase tracking-wider">
              Featured Hero
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
              <Star size={16} />
            </span>
          </div>
          <p className="mt-4 text-4xl font-bold text-white">{featuredCount}</p>
          <p className="mt-1.5 text-xs text-[#8e949d]">
            Primary homepage showcases
          </p>
        </div>

        {/* Storage Pipeline */}
        <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 animated-highlight-section">
          <div className="flex items-center justify-between text-[#8e949d]">
            <span className="text-xs font-mono uppercase tracking-wider">
              Media Cloud
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4b83ee]/15 text-[#4b83ee]">
              <Cloud size={16} />
            </span>
          </div>
          <p className="mt-4 text-xl font-bold text-white">Cloudinary CDN</p>
          <p className="mt-2 text-xs text-emerald-400 font-medium">
            ⚡ Auto-Compressor Active
          </p>
        </div>
      </div>

      {/* Quick Actions Bento Strip */}
      <div className="grid gap-5 md:grid-cols-3">
        <Link
          href="/admin/import"
          className="group rounded-2xl border border-white/10 bg-[#101216] p-6 hover:border-[#4b83ee]/50 transition-all duration-300 hover:-translate-y-0.5 animated-highlight"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 text-[#4b83ee]">
              <Zap size={18} />
            </span>
            <ArrowRight
              size={15}
              className="text-[#8e949d] group-hover:text-[#4b83ee] group-hover:translate-x-1 transition-all"
            />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-[#4b83ee] transition-colors">
            One-Click URL Importer
          </h3>
          <p className="mt-1 text-xs text-[#8e949d] leading-relaxed">
            Paste any live website URL to automatically capture 16:9 laptop &amp;
            9:16 mobile screenshots.
          </p>
        </Link>

        <Link
          href="/admin/leads"
          className="group rounded-2xl border border-white/10 bg-[#101216] p-6 hover:border-[#4b83ee]/50 transition-all duration-300 hover:-translate-y-0.5 animated-highlight"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 text-[#4b83ee]">
              <Inbox size={18} />
            </span>
            <ArrowRight
              size={15}
              className="text-[#8e949d] group-hover:text-[#4b83ee] group-hover:translate-x-1 transition-all"
            />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-[#4b83ee] transition-colors">
            Client Enquiries &amp; Leads
          </h3>
          <p className="mt-1 text-xs text-[#8e949d] leading-relaxed">
            Review incoming project briefs, update lead statuses, and reply
            directly via WhatsApp or Email.
          </p>
        </Link>

        <Link
          href="/admin/setup"
          className="group rounded-2xl border border-white/10 bg-[#101216] p-6 hover:border-[#4b83ee]/50 transition-all duration-300 hover:-translate-y-0.5 animated-highlight"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 text-[#4b83ee]">
              <Database size={18} />
            </span>
            <ArrowRight
              size={15}
              className="text-[#8e949d] group-hover:text-[#4b83ee] group-hover:translate-x-1 transition-all"
            />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-[#4b83ee] transition-colors">
            Database &amp; Cloud Setup
          </h3>
          <p className="mt-1 text-xs text-[#8e949d] leading-relaxed">
            Inspect your Supabase table connection, SQL schema script, and
            Cloudinary upload preset.
          </p>
        </Link>
      </div>

      {/* Recent Projects Section */}
      <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 md:p-8 animated-highlight-section">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Projects</h2>
            <p className="text-xs text-[#8e949d] mt-0.5">
              Latest additions to your studio showcase.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:border-[#4b83ee] hover:text-[#4b83ee] transition-all"
          >
            <span>View All ({total})</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="py-14 text-center text-xs text-[#8e949d]">
            <p className="text-sm text-white font-medium">
              No projects published in Supabase yet
            </p>
            <p className="mt-1 text-xs text-[#8e949d]">
              Add a custom project or import one with a single URL click.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center gap-2 rounded-full bg-[#4b83ee] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#3b73de] shadow-blue"
              >
                <Plus size={14} />
                Add Your First Project
              </Link>
              <Link
                href="/admin/import"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-white hover:border-[#4b83ee]"
              >
                <Zap size={14} className="text-[#4b83ee]" />
                Import from URL
              </Link>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-white/10 mt-2">
            {projects.slice(0, 6).map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 transition hover:bg-white/[0.02] rounded-xl px-2"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#08090b]">
                    {p.cover_image ? (
                      <Image
                        src={p.cover_image}
                        alt={p.title}
                        fill
                        className="object-cover object-top"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#8e949d]/40">
                        <Laptop size={15} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{p.title}</p>
                    <p className="text-xs text-[#8e949d] mt-0.5">
                      {p.category} {p.year ? `· ${p.year}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                      p.published
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-white/10 text-[#8e949d] border border-white/10"
                    }`}
                  >
                    {p.published ? "Live" : "Draft"}
                  </span>
                  <Link
                    href={`/work/${p.slug}`}
                    target="_blank"
                    className="rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-[#b0b5be] hover:border-[#4b83ee] hover:text-white transition-all"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="rounded-full bg-[#4b83ee]/15 border border-[#4b83ee]/40 px-4 py-1.5 text-xs font-semibold text-[#4b83ee] hover:bg-[#4b83ee] hover:text-white transition-all"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
