"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Globe,
  ArrowLeft,
  Laptop,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";

interface ScrapedData {
  title: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  live_url: string;
  year: number;
  cover_image: string | null;
  mobile_image: string | null;
  services: string[];
  featured: boolean;
  published: boolean;
  display_order: number;
}

export function UrlImporter() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");
  const [projectData, setProjectData] = useState<ScrapedData | null>(null);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  async function handleCapture(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setPublishedSuccess(false);

    try {
      const res = await fetch("/api/admin/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to capture website");
      }

      setProjectData(json.data);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error capturing website"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    if (!projectData) return;
    setPublishing(true);
    setError("");

    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to publish project");
      }

      setPublishedSuccess(true);
      setTimeout(() => {
        router.push("/admin/projects");
        router.refresh();
      }, 1500);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to publish project"
      );
      setPublishing(false);
    }
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="mb-4">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#b0b5be] hover:border-[#4b83ee] hover:text-white transition-all"
          >
            <ArrowLeft size={13} />
            Back to Projects
          </Link>
        </div>
        <span className="inline-flex items-center gap-1.5 border border-[#4b83ee]/40 bg-[#4b83ee]/10 text-[#4b83ee] rounded-full px-4 py-1 text-xs font-medium mb-3">
          <Sparkles size={12} />
          Instant Capture Pipeline
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          One-Click{" "}
          <span className="text-shine-blue italic font-serif font-normal">
            URL Importer
          </span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#8e949d] max-w-2xl">
          Paste any live website URL below. We automatically capture 16:9 laptop
          screenshots, 9:16 standing mobile screenshots, and extract metadata.
        </p>
      </div>

      {/* URL Input Form */}
      <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 md:p-8 animated-highlight-section">
        <form onSubmit={handleCapture} className="space-y-4">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
            Enter Live Website URL
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#4b83ee]">
                <Globe size={16} />
              </div>
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. https://rfmweddingphotography.in/"
                className="w-full rounded-full border border-white/15 bg-[#08090b] py-3.5 pl-11 pr-5 text-sm text-white placeholder-[#8e949d]/45 focus:border-[#4b83ee] focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-full bg-[#4b83ee] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#3b73de] shadow-blue disabled:opacity-50"
            >
              <Zap size={15} />
              <span>
                {loading ? "Capturing Screens..." : "Capture Project"}
              </span>
            </button>
          </div>
        </form>

        {loading && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#4b83ee]/35 bg-[#4b83ee]/10 p-4 text-xs text-[#4b83ee]">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>
              Analyzing website, rendering 16:9 desktop &amp; 9:16 mobile
              viewport snapshots... Please wait ~5 seconds.
            </span>
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#e05252]/30 bg-[#e05252]/10 p-4 text-xs text-[#e05252]">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {publishedSuccess && (
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-400">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>
              Project successfully published to portfolio! Redirecting to
              project list...
            </span>
          </div>
        )}
      </div>

      {/* Captured Project Preview Area */}
      {projectData && !publishedSuccess && (
        <div className="space-y-6 rounded-2xl border border-white/10 bg-[#101216] p-6 md:p-8 animated-highlight-section">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                ✓ Capture Complete
              </span>
              <h2 className="mt-2 text-2xl font-bold text-white">
                {projectData.title}
              </h2>
              <p className="mt-1 text-xs text-[#8e949d]">
                {projectData.description}
              </p>
            </div>

            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 rounded-full bg-[#4b83ee] px-6 py-3 text-xs font-semibold text-white transition hover:bg-[#3b73de] shadow-blue disabled:opacity-50"
            >
              <CheckCircle2 size={15} />
              <span>
                {publishing ? "Publishing..." : "Publish to Portfolio ↗"}
              </span>
            </button>
          </div>

          {/* Dual Screen Previews */}
          <div className="grid gap-8 lg:grid-cols-12">
            {/* 16:9 Laptop Frame */}
            <div className="lg:col-span-7">
              <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white">
                <Laptop size={15} className="text-[#4b83ee]" />
                <span>Auto-Captured Laptop View (16:9)</span>
              </label>

              <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#08090b] shadow-2xl">
                <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-[#151525] px-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-[10px] font-mono text-[#8e949d] truncate">
                    {projectData.live_url}
                  </span>
                </div>
                <div className="relative aspect-video w-full overflow-hidden bg-[#090b0e]">
                  {projectData.cover_image && (
                    <Image
                      src={projectData.cover_image}
                      alt="Laptop screenshot"
                      fill
                      unoptimized
                      className="object-cover object-top"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* 9:16 Phone Frame */}
            <div className="lg:col-span-5">
              <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white">
                <Smartphone size={15} className="text-[#4b83ee]" />
                <span>Auto-Captured Mobile View (9:16)</span>
              </label>

              <div className="mt-3 flex justify-center">
                <div className="relative w-44 overflow-hidden rounded-[26px] border-2 border-white/20 bg-[#090b0e] p-1.5 shadow-2xl">
                  <div className="absolute left-1/2 top-2.5 z-20 h-2 w-12 -translate-x-1/2 rounded-full border border-white/15 bg-[#090b0e]" />
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-[#050608]">
                    {projectData.mobile_image && (
                      <Image
                        src={projectData.mobile_image}
                        alt="Mobile screenshot"
                        fill
                        unoptimized
                        className="object-cover object-top"
                      />
                    )}
                  </div>
                  <div className="absolute bottom-2 left-1/2 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-white/25" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Edit Details */}
          <div className="grid gap-4 border-t border-white/10 pt-6 md:grid-cols-2">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
                Title
              </label>
              <input
                type="text"
                value={projectData.title}
                onChange={(e) =>
                  setProjectData({ ...projectData, title: e.target.value })
                }
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090b] px-4 py-2.5 text-xs text-white focus:border-[#4b83ee] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
                Category
              </label>
              <input
                type="text"
                value={projectData.category}
                onChange={(e) =>
                  setProjectData({ ...projectData, category: e.target.value })
                }
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090b] px-4 py-2.5 text-xs text-white focus:border-[#4b83ee] focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
                Description
              </label>
              <textarea
                rows={2}
                value={projectData.description}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    description: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#08090b] p-3.5 text-xs text-white focus:border-[#4b83ee] focus:outline-none"
              />
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-5">
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 rounded-full bg-[#4b83ee] px-7 py-3 text-xs font-semibold text-white transition hover:bg-[#3b73de] shadow-blue disabled:opacity-50"
            >
              <CheckCircle2 size={15} />
              <span>
                {publishing ? "Publishing Project..." : "Publish to Portfolio"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
