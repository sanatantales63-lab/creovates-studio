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
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Project } from "@/types/project";

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
      <div className="flex flex-col justify-between gap-4 border-b border-white/[.08] pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Studio Management Area</p>
          <h1 className="mt-2 text-3xl font-medium tracking-[-.05em] text-[#f4f4f2] md:text-5xl">
            STUDIO <span className="text-[#8e949d]">OVERVIEW.</span>
          </h1>
          <p className="mt-1 text-xs text-[#8e949d]">
            Manage portfolio showcases, dual-screen presentations, and cloud assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 rounded-lg bg-[#4b83ee] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#3d6fd4]"
          >
            <Plus size={15} />
            <span>Add Project</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 rounded-lg border border-white/[.1] px-4 py-2.5 text-xs font-semibold text-[#8e949d] hover:bg-white/[.04] hover:text-[#f4f4f2]"
          >
            <span>Live Site</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </div>

      {/* Table Missing Alert Banner */}
      {tableMissing && (
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-[#4b83ee]/30 bg-[#4b83ee]/10 p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Database size={22} className="text-[#4b83ee]" />
            <div>
              <p className="text-sm font-semibold text-[#f4f4f2]">
                Database table `projects` not initialized yet
              </p>
              <p className="text-xs text-[#8e949d]">
                Run the supplied SQL schema once in your Supabase SQL Editor to unlock the database archive.
              </p>
            </div>
          </div>
          <Link
            href="/admin/setup"
            className="rounded-lg bg-[#4b83ee] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#3d6fd4]"
          >
            Copy SQL Script →
          </Link>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Projects */}
        <div className="rounded-xl border border-white/[.08] bg-[#0d0f12] p-5">
          <div className="flex items-center justify-between text-[#8e949d]">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Total Projects
            </span>
            <FolderGit2 size={16} className="text-[#4b83ee]" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-[#f4f4f2]">{total}</p>
          <p className="mt-1 text-[11px] text-[#8e949d]">Archived in Supabase</p>
        </div>

        {/* Live Published */}
        <div className="rounded-xl border border-white/[.08] bg-[#0d0f12] p-5">
          <div className="flex items-center justify-between text-[#8e949d]">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Live Published
            </span>
            <Eye size={16} className="text-[#34d399]" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-[#f4f4f2]">
            {publishedCount}
          </p>
          <p className="mt-1 text-[11px] text-[#8e949d]">Active on portfolio</p>
        </div>

        {/* Featured Showcases */}
        <div className="rounded-xl border border-white/[.08] bg-[#0d0f12] p-5">
          <div className="flex items-center justify-between text-[#8e949d]">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Featured Hero
            </span>
            <Star size={16} className="text-[#f59e0b]" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-[#f4f4f2]">
            {featuredCount}
          </p>
          <p className="mt-1 text-[11px] text-[#8e949d]">Primary showcase projects</p>
        </div>

        {/* Storage Pipeline */}
        <div className="rounded-xl border border-white/[.08] bg-[#0d0f12] p-5">
          <div className="flex items-center justify-between text-[#8e949d]">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Media Cloud
            </span>
            <Cloud size={16} className="text-[#4b83ee]" />
          </div>
          <p className="mt-3 text-sm font-semibold text-[#f4f4f2]">Cloudinary</p>
          <p className="mt-1 text-[11px] text-[#34d399]">⚡ Auto-Compressor Active</p>
        </div>
      </div>

      {/* Recent Projects Section */}
      <div className="rounded-xl border border-white/[.08] bg-[#0d0f12] p-6">
        <div className="flex items-center justify-between border-b border-white/[.08] pb-4">
          <div>
            <h2 className="text-base font-semibold text-[#f4f4f2]">
              Recent Projects
            </h2>
            <p className="text-xs text-[#8e949d]">
              Latest additions to your studio showcase.
            </p>
          </div>
          <Link
            href="/admin/projects"
            className="flex items-center gap-1 text-xs font-semibold text-[#4b83ee] hover:underline"
          >
            <span>View All ({total})</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#8e949d]">
            <p>No projects published yet.</p>
            <Link
              href="/admin/projects/new"
              className="mt-3 inline-block rounded-lg bg-white/[.08] px-4 py-2 text-xs font-bold text-[#f4f4f2] hover:bg-white/[.15]"
            >
              Add Your First Project ↗
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-white/[.06]">
            {projects.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between py-4 transition hover:bg-white/[.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-18 shrink-0 overflow-hidden rounded border border-white/[.1] bg-[#08090b]">
                    {p.cover_image ? (
                      <Image
                        src={p.cover_image}
                        alt={p.title}
                        fill
                        className="object-cover object-top"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#8e949d]/30">
                        <Laptop size={14} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#f4f4f2]">
                      {p.title}
                    </p>
                    <p className="text-[11px] text-[#8e949d]">
                      {p.category} {p.year ? `· ${p.year}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      p.published
                        ? "bg-[#34d399]/15 text-[#34d399]"
                        : "bg-white/[.08] text-[#8e949d]"
                    }`}
                  >
                    {p.published ? "Live" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/projects/${p.id}`}
                    className="text-xs font-semibold text-[#4b83ee] hover:underline"
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
