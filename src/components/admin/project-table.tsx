"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  Sparkles,
  Eye,
  EyeOff,
  Star,
  Laptop,
  Smartphone,
  AlertCircle,
  Database,
  ArrowUpDown,
} from "lucide-react";
import { Project } from "@/types/project";

export function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tableMissing, setTableMissing] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchProjects() {
    setLoading(true);
    setError("");
    setTableMissing(false);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (!res.ok) {
        if (data.tableMissing) {
          setTableMissing(true);
        }
        throw new Error(data.error || "Failed to load projects");
      }
      setProjects(data.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading projects");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  async function togglePublished(project: Project) {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !project.published }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, published: !p.published } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function toggleFeatured(project: Project) {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !project.featured }),
      });
      if (res.ok) {
        setProjects((prev) =>
          prev.map((p) => (p.id === project.id ? { ...p, featured: !p.featured } : p))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteProject(id: string) {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(search.toLowerCase())) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    if (filter === "published") return matchesSearch && p.published;
    if (filter === "draft") return matchesSearch && !p.published;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/[.08] pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="eyebrow">Portfolio Archive</p>
          <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#f4f4f2] md:text-4xl">
            ALL PROJECTS
          </h1>
        </div>

        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded-lg bg-[#4b83ee] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#3d6fd4]"
        >
          <Plus size={16} />
          <span>Add Project</span>
        </Link>
      </div>

      {/* Table Missing Alert */}
      {tableMissing && (
        <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-[#4b83ee]/30 bg-[#4b83ee]/10 p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Database size={22} className="text-[#4b83ee]" />
            <div>
              <p className="text-sm font-semibold text-[#f4f4f2]">
                Database table &apos;projects&apos; not initialized yet
              </p>
              <p className="text-xs text-[#8e949d]">
                Run the supplied SQL schema once in your Supabase SQL Editor.
              </p>
            </div>
          </div>
          <Link
            href="/admin/setup"
            className="rounded-lg bg-[#4b83ee] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#3d6fd4]"
          >
            Open SQL Setup →
          </Link>
        </div>
      )}

      {error && !tableMissing && (
        <div className="flex items-center gap-3 rounded-xl border border-[#e05252]/30 bg-[#e05252]/10 p-4 text-xs text-[#e05252]">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-white/[.08] bg-[#0d0f12] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8e949d]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, client, or category..."
            className="w-full rounded-lg border border-white/[.1] bg-[#08090b] py-2.5 pl-10 pr-4 text-xs text-[#f4f4f2] placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 border-white/[.08] sm:border-l sm:pl-3">
          {(["all", "published", "draft"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition ${
                filter === mode
                  ? "bg-white/[.1] text-[#f4f4f2]"
                  : "text-[#8e949d] hover:bg-white/[.04] hover:text-[#f4f4f2]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-white/[.08] bg-[#0d0f12] text-xs text-[#8e949d]">
          Loading projects from Supabase...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/[.08] bg-[#0d0f12] py-16 text-center">
          <p className="text-sm text-[#8e949d]">No projects found</p>
          <p className="mt-1 text-xs text-[#8e949d]/60">
            {search ? "Try clearing your search query." : "Click Add Project to publish your first showcase."}
          </p>
          {!search && (
            <Link
              href="/admin/projects/new"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#4b83ee] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#3d6fd4]"
            >
              <Plus size={15} />
              <span>Add First Project</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between gap-5 rounded-xl border border-white/[.08] bg-[#0d0f12] p-4 transition hover:border-white/[.15] md:flex-row md:items-center"
            >
              {/* Media Thumbnails & Info */}
              <div className="flex items-center gap-4">
                {/* 16:9 Laptop Cover Thumbnail */}
                <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md border border-white/[.1] bg-[#08090b]">
                  {project.cover_image ? (
                    <Image
                      src={project.cover_image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#8e949d]/30">
                      <Laptop size={18} />
                    </div>
                  )}
                </div>

                {/* 9:16 Mobile Thumbnail indicator */}
                <div className="relative hidden h-14 w-8 shrink-0 overflow-hidden rounded-md border border-white/[.1] bg-[#08090b] sm:block">
                  {project.mobile_image ? (
                    <Image
                      src={project.mobile_image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#8e949d]/20">
                      <Smartphone size={14} />
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#f4f4f2]">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#4b83ee]/15 px-2 py-0.5 text-[9px] font-bold text-[#4b83ee]">
                        <Star size={9} fill="currentColor" />
                        Featured
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                        project.published
                          ? "bg-[#34d399]/15 text-[#34d399]"
                          : "bg-white/[.08] text-[#8e949d]"
                      }`}
                    >
                      {project.published ? "Live" : "Draft"}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-[#8e949d]">
                    {project.category} {project.client ? `· ${project.client}` : ""} {project.year ? `· ${project.year}` : ""}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 border-t border-white/[.06] pt-3 md:border-t-0 md:pt-0">
                {/* Quick Toggle Live */}
                <button
                  onClick={() => togglePublished(project)}
                  title={project.published ? "Unpublish to Draft" : "Publish Live"}
                  className="rounded-lg p-2 text-[#8e949d] hover:bg-white/[.05] hover:text-[#f4f4f2]"
                >
                  {project.published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>

                {/* Quick Toggle Featured */}
                <button
                  onClick={() => toggleFeatured(project)}
                  title={project.featured ? "Remove Featured" : "Mark as Featured"}
                  className={`rounded-lg p-2 transition ${
                    project.featured
                      ? "text-[#4b83ee] hover:bg-[#4b83ee]/10"
                      : "text-[#8e949d] hover:bg-white/[.05] hover:text-[#f4f4f2]"
                  }`}
                >
                  <Star size={15} fill={project.featured ? "currentColor" : "none"} />
                </button>

                {/* View on live site */}
                <Link
                  href={project.live_url || `/work/${project.slug}`}
                  target="_blank"
                  title="View on site"
                  className="rounded-lg p-2 text-[#8e949d] hover:bg-white/[.05] hover:text-[#f4f4f2]"
                >
                  <ExternalLink size={15} />
                </Link>

                {/* Edit Link */}
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center gap-1.5 rounded-lg border border-white/[.1] bg-white/[.04] px-3 py-1.5 text-xs font-semibold text-[#f4f4f2] hover:bg-white/[.08]"
                >
                  <Edit size={13} />
                  <span>Edit</span>
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => deleteProject(project.id)}
                  disabled={deletingId === project.id}
                  title="Delete project"
                  className="rounded-lg p-2 text-[#e05252] hover:bg-[#e05252]/10 disabled:opacity-50"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
