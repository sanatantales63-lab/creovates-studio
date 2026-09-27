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
  Zap,
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
          prev.map((p) =>
            p.id === project.id ? { ...p, published: !p.published } : p
          )
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
          prev.map((p) =>
            p.id === project.id ? { ...p, featured: !p.featured } : p
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteProject(id: string) {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
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
    <div className="space-y-7 pb-16">
      {/* Top Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 border border-[#4b83ee]/40 bg-[#4b83ee]/10 text-[#4b83ee] rounded-full px-4 py-1 text-xs font-medium mb-3">
            <Sparkles size={12} />
            Portfolio Archive
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            All{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              projects
            </span>
          </h1>
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
            <Plus size={16} />
            <span>Add Project</span>
          </Link>
        </div>
      </div>

      {/* Table Missing Alert */}
      {tableMissing && (
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#4b83ee]/40 bg-[#4b83ee]/10 p-6 sm:flex-row sm:items-center animated-highlight-section">
          <div className="flex items-center gap-3.5">
            <Database size={22} className="text-[#4b83ee]" />
            <div>
              <p className="text-sm font-semibold text-white">
                Database table &apos;projects&apos; not initialized yet
              </p>
              <p className="text-xs text-[#b0b5be]">
                Run the supplied SQL schema once in your Supabase SQL Editor.
              </p>
            </div>
          </div>
          <Link
            href="/admin/setup"
            className="rounded-full bg-[#4b83ee] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#3b73de] shadow-blue"
          >
            Open SQL Setup →
          </Link>
        </div>
      )}

      {error && !tableMissing && (
        <div className="flex items-center gap-3 rounded-2xl border border-[#e05252]/30 bg-[#e05252]/10 p-4 text-xs text-[#e05252]">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#101216] p-4 sm:flex-row sm:items-center sm:justify-between animated-highlight-section">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b83ee]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, client, or category..."
            className="w-full rounded-full border border-white/15 bg-[#08090b] py-2.5 pl-11 pr-4 text-xs text-white placeholder-[#8e949d]/50 focus:border-[#4b83ee] focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 border-white/10 sm:border-l sm:pl-4">
          {(["all", "published", "draft"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`rounded-full px-4 py-2 text-xs font-medium capitalize transition-all ${
                filter === mode
                  ? "bg-[#4b83ee] text-white shadow-blue"
                  : "text-[#8e949d] hover:bg-white/5 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-[#101216] text-xs text-[#8e949d]">
          Loading projects from Supabase...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#101216] py-16 text-center animated-highlight-section">
          <p className="text-base font-bold text-white">No projects found</p>
          <p className="mt-1 text-xs text-[#8e949d]">
            {search
              ? "Try clearing your search query."
              : "Click Add Project or URL Auto-Import to publish your first showcase."}
          </p>
          {!search && (
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center gap-2 rounded-full bg-[#4b83ee] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3b73de] shadow-blue"
              >
                <Plus size={15} />
                <span>Add First Project</span>
              </Link>
              <Link
                href="/admin/import"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-white hover:border-[#4b83ee]"
              >
                <Zap size={14} className="text-[#4b83ee]" />
                <span>Import from URL</span>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-[#101216] p-5 transition-all hover:border-[#4b83ee]/40 md:flex-row md:items-center animated-highlight"
            >
              {/* Media Thumbnails & Info */}
              <div className="flex items-center gap-4">
                {/* 16:9 Laptop Cover Thumbnail */}
                <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#08090b]">
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
                <div className="relative hidden h-16 w-9 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#08090b] sm:block">
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
                    <h3 className="text-base font-bold text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#4b83ee]/40 bg-[#4b83ee]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#4b83ee]">
                        <Star size={10} fill="currentColor" />
                        Featured
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        project.published
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/10 text-[#8e949d]"
                      }`}
                    >
                      {project.published ? "Live" : "Draft"}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-[#8e949d]">
                    {project.category}{" "}
                    {project.client ? `· ${project.client}` : ""}{" "}
                    {project.year ? `· ${project.year}` : ""}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 border-t border-white/10 pt-3 md:border-t-0 md:pt-0">
                {/* Quick Toggle Live */}
                <button
                  onClick={() => togglePublished(project)}
                  title={
                    project.published ? "Unpublish to Draft" : "Publish Live"
                  }
                  className="rounded-full border border-white/10 bg-white/5 p-2.5 text-[#b0b5be] hover:border-[#4b83ee] hover:text-white transition-all"
                >
                  {project.published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>

                {/* Quick Toggle Featured */}
                <button
                  onClick={() => toggleFeatured(project)}
                  title={
                    project.featured ? "Remove Featured" : "Mark as Featured"
                  }
                  className={`rounded-full border p-2.5 transition-all ${
                    project.featured
                      ? "border-[#4b83ee]/50 bg-[#4b83ee]/15 text-[#4b83ee]"
                      : "border-white/10 bg-white/5 text-[#b0b5be] hover:border-[#4b83ee] hover:text-white"
                  }`}
                >
                  <Star
                    size={15}
                    fill={project.featured ? "currentColor" : "none"}
                  />
                </button>

                {/* View Case Study on site */}
                <Link
                  href={`/work/${project.slug}`}
                  target="_blank"
                  title="View Case Study Page"
                  className="rounded-full border border-white/10 bg-white/5 p-2.5 text-[#b0b5be] hover:border-[#4b83ee] hover:text-white transition-all"
                >
                  <ExternalLink size={15} />
                </Link>

                {/* Edit Link */}
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center gap-1.5 rounded-full bg-[#4b83ee] px-4 py-2 text-xs font-semibold text-white hover:bg-[#3b73de] shadow-blue transition-all"
                >
                  <Edit size={13} />
                  <span>Edit</span>
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => deleteProject(project.id)}
                  disabled={deletingId === project.id}
                  title="Delete project"
                  className="rounded-full border border-white/10 bg-white/5 p-2.5 text-[#e05252] hover:border-[#e05252]/40 hover:bg-[#e05252]/10 disabled:opacity-50 transition-all"
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
