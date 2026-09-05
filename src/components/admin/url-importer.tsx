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
  ExternalLink,
  UploadCloud,
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
      setError(err instanceof Error ? err.message : "Error capturing website");
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
      setError(err instanceof Error ? err.message : "Failed to publish project");
      setPublishing(false);
    }
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="border-b border-white/[.08] pb-6">
        <Link
          href="/admin/projects"
          className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d] hover:text-[#f4f4f2]"
        >
          <ArrowLeft size={12} />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-medium tracking-tight text-[#f4f4f2] md:text-4xl">
          ONE-CLICK URL IMPORTER
        </h1>
        <p className="mt-1 text-xs text-[#8e949d]">
          Just paste any website URL. We automatically capture 16:9 laptop screenshots, 9:16 mobile standing screenshots, and extract title & description!
        </p>
      </div>

      {/* URL Input Form */}
      <div className="rounded-xl border border-white/[.08] bg-[#0d0f12] p-6 md:p-8">
        <form onSubmit={handleCapture} className="space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#8e949d]">
            Enter Live Website URL
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8e949d]">
                <Globe size={16} />
              </div>
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. https://rfmweddingphotography.in/"
                className="w-full rounded-lg border border-white/[.12] bg-[#08090b] py-3 pl-10 pr-4 text-sm text-[#f4f4f2] placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#4b83ee] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#3d6fd4] disabled:opacity-50"
            >
              <Zap size={15} />
              <span>{loading ? "Capturing Screens..." : "Capture Project"}</span>
            </button>
          </div>
        </form>

        {loading && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-[#4b83ee]/30 bg-[#4b83ee]/10 p-4 text-xs text-[#4b83ee]">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>
              Analyzing website, rendering 16:9 desktop & 9:16 mobile viewport snapshots... Please wait ~5 seconds.
            </span>
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-[#e05252]/30 bg-[#e05252]/10 p-4 text-xs text-[#e05252]">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {publishedSuccess && (
          <div className="mt-6 flex items-center gap-3 rounded-lg border border-[#34d399]/30 bg-[#34d399]/10 p-4 text-xs text-[#34d399]">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>Project successfully published to portfolio! Redirecting to project list...</span>
          </div>
        )}
      </div>

      {/* Captured Project Preview Area */}
      {projectData && !publishedSuccess && (
        <div className="space-y-6 rounded-xl border border-white/[.08] bg-[#0d0f12] p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-white/[.08] pb-4 sm:flex-row sm:items-center">
            <div>
              <span className="rounded bg-[#34d399]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#34d399]">
                ✓ Capture Complete
              </span>
              <h2 className="mt-2 text-xl font-semibold text-[#f4f4f2]">
                {projectData.title}
              </h2>
              <p className="mt-1 text-xs text-[#8e949d]">{projectData.description}</p>
            </div>

            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 rounded-lg bg-[#34d399] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#08090b] transition hover:bg-[#2eb885] disabled:opacity-50"
            >
              <CheckCircle2 size={15} />
              <span>{publishing ? "Publishing..." : "Publish to Portfolio ↗"}</span>
            </button>
          </div>

          {/* Dual Screen Previews */}
          <div className="grid gap-8 lg:grid-cols-12">
            {/* 16:9 Laptop Frame */}
            <div className="lg:col-span-7">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f4f4f2]">
                <Laptop size={15} className="text-[#4b83ee]" />
                <span>Auto-Captured Laptop View (16:9)</span>
              </label>

              <div className="mt-3 overflow-hidden rounded-md border border-white/[.1] bg-[#08090b] shadow-xl">
                <div className="flex h-7 items-center gap-1.5 border-b border-white/[.07] bg-[#12151c] px-3">
                  <span className="h-2 w-2 rounded-full bg-white/[.1]" />
                  <span className="h-2 w-2 rounded-full bg-white/[.1]" />
                  <span className="h-2 w-2 rounded-full bg-white/[.1]" />
                  <div className="ml-2 h-2 w-28 rounded bg-white/[.06]" />
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
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#f4f4f2]">
                <Smartphone size={15} className="text-[#4b83ee]" />
                <span>Auto-Captured Mobile View (9:16)</span>
              </label>

              <div className="mt-3 flex justify-center">
                <div className="relative w-40 overflow-hidden rounded-[24px] border-2 border-white/[.18] bg-[#090b0e] p-1 shadow-2xl">
                  <div className="absolute left-1/2 top-2 z-20 h-2 w-12 -translate-x-1/2 rounded-full border border-white/[.12] bg-[#090b0e]" />
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
                  <div className="absolute bottom-2 left-1/2 z-20 h-1 w-10 -translate-x-1/2 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Edit Details */}
          <div className="grid gap-4 border-t border-white/[.08] pt-6 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e949d]">
                Title
              </label>
              <input
                type="text"
                value={projectData.title}
                onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                className="mt-1 w-full rounded-md border border-white/[.1] bg-[#08090b] px-3 py-2 text-xs text-[#f4f4f2] focus:border-[#4b83ee] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e949d]">
                Category
              </label>
              <input
                type="text"
                value={projectData.category}
                onChange={(e) => setProjectData({ ...projectData, category: e.target.value })}
                className="mt-1 w-full rounded-md border border-white/[.1] bg-[#08090b] px-3 py-2 text-xs text-[#f4f4f2] focus:border-[#4b83ee] focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e949d]">
                Description
              </label>
              <textarea
                rows={2}
                value={projectData.description}
                onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                className="mt-1 w-full rounded-md border border-white/[.1] bg-[#08090b] p-3 text-xs text-[#f4f4f2] focus:border-[#4b83ee] focus:outline-none"
              />
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex items-center justify-end gap-3 border-t border-white/[.08] pt-4">
            <button
              onClick={handlePublish}
              disabled={publishing}
              className="flex items-center gap-2 rounded-lg bg-[#4b83ee] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#3d6fd4] disabled:opacity-50"
            >
              <CheckCircle2 size={15} />
              <span>{publishing ? "Publishing Project..." : "Publish to Portfolio"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
