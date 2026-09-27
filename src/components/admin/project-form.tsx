"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Laptop,
  Smartphone,
  Plus,
  X,
  ExternalLink,
} from "lucide-react";
import { Project } from "@/types/project";
import { autoCompressImage, uploadToCloudinary } from "@/lib/image-compressor";

interface ProjectFormProps {
  initialData?: Project | null;
  isEditing?: boolean;
}

interface ImageUploadMeta {
  wasCompressed: boolean;
  originalSizeText?: string;
  compressedSizeText?: string;
  reduction?: number;
  uploading: boolean;
  error?: string;
}

export function ProjectForm({
  initialData,
  isEditing = false,
}: ProjectFormProps) {
  const router = useRouter();

  // Basic Details
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [client, setClient] = useState(initialData?.client || "");
  const [category, setCategory] = useState(
    initialData?.category || "Bespoke Website"
  );
  const [year, setYear] = useState(
    initialData?.year?.toString() || new Date().getFullYear().toString()
  );
  const [liveUrl, setLiveUrl] = useState(initialData?.live_url || "");
  const [displayOrder, setDisplayOrder] = useState(
    initialData?.display_order?.toString() || "0"
  );
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [published, setPublished] = useState(initialData?.published ?? true);

  // Content
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [challenge, setChallenge] = useState(initialData?.challenge || "");
  const [solution, setSolution] = useState(initialData?.solution || "");

  // Services Tags
  const [services, setServices] = useState<string[]>(
    Array.isArray(initialData?.services) && initialData.services.length
      ? initialData.services
      : ["Bespoke UI/UX", "Next.js Engineering", "Motion Design"]
  );
  const [newServiceTag, setNewServiceTag] = useState("");

  // Cover Image (Laptop - 16:9)
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || "");
  const [coverMeta, setCoverMeta] = useState<ImageUploadMeta>({
    uploading: false,
    wasCompressed: false,
  });

  // Mobile Image (Phone - 9:16)
  const [mobileImage, setMobileImage] = useState(
    initialData?.mobile_image || ""
  );
  const [mobileMeta, setMobileMeta] = useState<ImageUploadMeta>({
    uploading: false,
    wasCompressed: false,
  });

  // Form State
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Handle auto-generating slug from title
  function handleTitleChange(val: string) {
    setTitle(val);
    if (!isEditing) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generated);
    }
  }

  // Handle Service Tag Addition
  function addServiceTag() {
    if (!newServiceTag.trim()) return;
    if (!services.includes(newServiceTag.trim())) {
      setServices([...services, newServiceTag.trim()]);
    }
    setNewServiceTag("");
  }

  function removeServiceTag(tagToRemove: string) {
    setServices(services.filter((t) => t !== tagToRemove));
  }

  // Handle Cover Image (Laptop 16:9) Upload & Auto-compression
  async function handleCoverUpload(file: File) {
    setCoverMeta({ uploading: true, wasCompressed: false, error: undefined });

    try {
      const result = await autoCompressImage(file, {
        thresholdBytes: 1500 * 1024,
        maxDimension: 2560,
        quality: 0.92,
      });

      const uploadRes = await uploadToCloudinary(result.file);

      if (uploadRes.error) {
        setCoverMeta({
          uploading: false,
          wasCompressed: result.wasCompressed,
          error: uploadRes.error,
        });
        return;
      }

      setCoverImage(uploadRes.url);
      setCoverMeta({
        uploading: false,
        wasCompressed: result.wasCompressed,
        originalSizeText: result.formattedOriginal,
        compressedSizeText: result.formattedCompressed,
        reduction: result.reductionPercent,
      });
    } catch (err) {
      setCoverMeta({
        uploading: false,
        wasCompressed: false,
        error: err instanceof Error ? err.message : "Upload failed",
      });
    }
  }

  // Handle Mobile Image (Phone 9:16) Upload & Auto-compression
  async function handleMobileUpload(file: File) {
    setMobileMeta({ uploading: true, wasCompressed: false, error: undefined });

    try {
      const result = await autoCompressImage(file, {
        thresholdBytes: 1200 * 1024,
        maxDimension: 1600,
        quality: 0.92,
      });

      const uploadRes = await uploadToCloudinary(result.file);

      if (uploadRes.error) {
        setMobileMeta({
          uploading: false,
          wasCompressed: result.wasCompressed,
          error: uploadRes.error,
        });
        return;
      }

      setMobileImage(uploadRes.url);
      setMobileMeta({
        uploading: false,
        wasCompressed: result.wasCompressed,
        originalSizeText: result.formattedOriginal,
        compressedSizeText: result.formattedCompressed,
        reduction: result.reductionPercent,
      });
    } catch (err) {
      setMobileMeta({
        uploading: false,
        wasCompressed: false,
        error: err instanceof Error ? err.message : "Upload failed",
      });
    }
  }

  // Submit Handler
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    const payload = {
      title,
      slug,
      client,
      category,
      year: parseInt(year, 10) || new Date().getFullYear(),
      live_url: liveUrl,
      display_order: parseInt(displayOrder, 10) || 0,
      featured,
      published,
      description,
      challenge,
      solution,
      services,
      cover_image: coverImage,
      mobile_image: mobileImage,
    };

    try {
      const url = isEditing
        ? `/api/admin/projects/${initialData?.id}`
        : "/api/admin/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save project");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to save project"
      );
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 pb-16">
      {/* Top Action Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
        <div>
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
            {isEditing ? "Project Editor" : "Portfolio Publisher"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {isEditing ? "Edit " : "Add new "}
            <span className="text-shine-blue italic font-serif font-normal">
              project
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-[#b0b5be] hover:border-white/35 hover:text-white transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving || coverMeta.uploading || mobileMeta.uploading}
            className="flex items-center gap-2 rounded-full bg-[#4b83ee] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3b73de] shadow-blue disabled:opacity-50"
          >
            <Sparkles size={14} />
            <span>
              {saving
                ? "Saving..."
                : isEditing
                  ? "Update Project"
                  : "Publish Project"}
            </span>
          </button>
        </div>
      </div>

      {formError && (
        <div className="flex items-center gap-3 rounded-2xl border border-[#e05252]/30 bg-[#e05252]/10 p-4 text-xs text-[#e05252]">
          <AlertCircle size={18} className="shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      {/* SECTION 1: Dual-View Media Uploads (Laptop 16:9 + Phone 9:16) */}
      <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 md:p-8 animated-highlight-section">
        <div className="border-b border-white/10 pb-5">
          <span className="inline-block border border-[#4b83ee]/40 text-[#4b83ee] rounded-full px-3.5 py-1 text-[11px] font-medium mb-2.5">
            01 / Portfolio Screen Visuals
          </span>
          <h2 className="text-xl font-bold text-white">
            Dual-Screen{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              presentations
            </span>
          </h2>
          <p className="mt-1 text-xs text-[#8e949d]">
            Upload website screenshots. Images strictly fit their frames (16:9
            for laptop, 9:16 for standing phone) with zero border spillage.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Cover Image — Laptop 16:9 Frame */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white">
                <Laptop size={15} className="text-[#4b83ee]" />
                <span>Laptop View (16:9 Ratio)</span>
              </label>
              {coverMeta.wasCompressed && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  ⚡ Auto-compressed (-{coverMeta.reduction}%)
                </span>
              )}
            </div>

            {/* Laptop Chrome Frame Preview (16:9 strictly contained) */}
            <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#08090b] shadow-2xl">
              {/* macOS Chrome Top Bar */}
              <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-[#151525] px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="ml-2 h-2 w-32 rounded-full bg-white/10" />
              </div>
              {/* Screen Area: strictly 16:9 */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#090b0e]">
                {coverImage ? (
                  <Image
                    src={coverImage}
                    alt="Laptop cover preview"
                    fill
                    className="object-cover object-top"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-[#8e949d]/40">
                    <Laptop size={36} className="mb-2 opacity-40 text-[#4b83ee]" />
                    <p className="text-xs text-white/70 font-medium">
                      16:9 Laptop Website Screenshot
                    </p>
                    <p className="text-[10px] mt-0.5">Aspect ratio locked</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload & Compression Info */}
            <div className="mt-4 space-y-2.5">
              <div className="flex flex-wrap items-center gap-3">
                <label className="cursor-pointer rounded-full border border-[#4b83ee]/40 bg-[#4b83ee]/15 px-5 py-2 text-xs font-semibold text-white transition hover:bg-[#4b83ee] shadow-blue">
                  <span>
                    {coverMeta.uploading
                      ? "Compressing & Uploading..."
                      : "Choose Image (Auto-Compress)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={coverMeta.uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleCoverUpload(file);
                    }}
                  />
                </label>
                {coverImage && (
                  <button
                    type="button"
                    onClick={() => setCoverImage("")}
                    className="text-xs font-medium text-[#e05252] hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>

              {coverMeta.originalSizeText && (
                <div className="flex items-center gap-2 text-[11px] text-[#8e949d]">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>
                    Size: {coverMeta.originalSizeText}
                    {coverMeta.wasCompressed &&
                      ` → ${coverMeta.compressedSizeText}`}
                  </span>
                </div>
              )}

              {coverMeta.error && (
                <p className="text-[11px] text-[#e05252]">{coverMeta.error}</p>
              )}

              {/* Direct URL input fallback */}
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Or paste Cloudinary / direct image URL"
                className="w-full rounded-xl border border-white/15 bg-[#08090b] px-4 py-2.5 text-xs text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
              />
            </div>
          </div>

          {/* Mobile Image — Standing Phone 9:16 Frame */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white">
                <Smartphone size={15} className="text-[#4b83ee]" />
                <span>Mobile View (9:16 Standing)</span>
              </label>
              {mobileMeta.wasCompressed && (
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  ⚡ -{mobileMeta.reduction}%
                </span>
              )}
            </div>

            {/* Standing Phone Frame Preview (9:16 strictly contained) */}
            <div className="mt-3 flex justify-center">
              <div className="relative w-44 overflow-hidden rounded-[26px] border-2 border-white/20 bg-[#090b0e] p-1.5 shadow-2xl">
                {/* Notch */}
                <div className="absolute left-1/2 top-2.5 z-20 h-2 w-14 -translate-x-1/2 rounded-full border border-white/15 bg-[#090b0e]" />
                {/* Screen strictly 9:16 */}
                <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[20px] bg-[#050608]">
                  {mobileImage ? (
                    <Image
                      src={mobileImage}
                      alt="Mobile screen preview"
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center text-[#8e949d]/40">
                      <Smartphone
                        size={28}
                        className="mb-2 opacity-40 text-[#4b83ee]"
                      />
                      <p className="text-[11px] text-white/70 font-medium">
                        9:16 Mobile View
                      </p>
                      <p className="text-[9px] mt-0.5">Standing phone</p>
                    </div>
                  )}
                </div>
                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 z-20 h-1 w-12 -translate-x-1/2 rounded-full bg-white/25" />
              </div>
            </div>

            {/* Upload & Compression Info */}
            <div className="mt-4 space-y-2.5">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <label className="cursor-pointer rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold text-white transition hover:border-[#4b83ee] hover:bg-[#4b83ee]/15">
                  <span>
                    {mobileMeta.uploading
                      ? "Uploading..."
                      : "Upload Mobile View"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={mobileMeta.uploading}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleMobileUpload(file);
                    }}
                  />
                </label>
                {mobileImage && (
                  <button
                    type="button"
                    onClick={() => setMobileImage("")}
                    className="text-xs font-medium text-[#e05252] hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>

              {mobileMeta.originalSizeText && (
                <div className="flex items-center justify-center gap-2 text-[11px] text-[#8e949d]">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>
                    Size: {mobileMeta.originalSizeText}
                    {mobileMeta.wasCompressed &&
                      ` → ${mobileMeta.compressedSizeText}`}
                  </span>
                </div>
              )}

              {mobileMeta.error && (
                <p className="text-center text-[11px] text-[#e05252]">
                  {mobileMeta.error}
                </p>
              )}

              <input
                type="text"
                value={mobileImage}
                onChange={(e) => setMobileImage(e.target.value)}
                placeholder="Or paste mobile screenshot URL"
                className="w-full rounded-xl border border-white/15 bg-[#08090b] px-4 py-2.5 text-xs text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Project Specifications */}
      <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 md:p-8 animated-highlight-section">
        <div className="border-b border-white/10 pb-5">
          <span className="inline-block border border-[#4b83ee]/40 text-[#4b83ee] rounded-full px-3.5 py-1 text-[11px] font-medium mb-2.5">
            02 / Project Identity
          </span>
          <h2 className="text-xl font-bold text-white">
            General{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              information
            </span>
          </h2>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Title */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. RFM Wedding Photography"
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#08090b] px-4 py-3 text-sm text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. rfm-wedding-photography"
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#08090b] px-4 py-3 text-sm text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
            />
          </div>

          {/* Client */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
              Client / Organization
            </label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="e.g. RFM Studios Ltd"
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#08090b] px-4 py-3 text-sm text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Bespoke Website / Digital Experience"
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#08090b] px-4 py-3 text-sm text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
            />
          </div>

          {/* Year */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
              Launch Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="2026"
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#08090b] px-4 py-3 text-sm text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
            />
          </div>

          {/* Live URL */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
              Live Website URL
            </label>
            <div className="relative mt-2">
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-xl border border-white/15 bg-[#08090b] px-4 py-3 pr-10 text-sm text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
              />
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#8e949d] hover:text-[#4b83ee]"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Services Tag Input */}
        <div className="mt-6">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
            Services &amp; Technologies
          </label>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            {services.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#4b83ee]/35 bg-[#4b83ee]/10 px-3.5 py-1 text-xs font-medium text-white"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeServiceTag(tag)}
                  className="text-[#8e949d] hover:text-[#e05252]"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={newServiceTag}
                onChange={(e) => setNewServiceTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addServiceTag();
                  }
                }}
                placeholder="Add service tag..."
                className="w-40 rounded-full border border-white/15 bg-[#08090b] px-3.5 py-1.5 text-xs text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
              />
              <button
                type="button"
                onClick={addServiceTag}
                className="rounded-full bg-[#4b83ee] p-1.5 text-white hover:bg-[#3b73de] shadow-blue"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Short Description */}
        <div className="mt-6">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
            Short Summary / Editorial Description *
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief overview of the project that displays in the portfolio card..."
            className="mt-2 w-full rounded-xl border border-white/15 bg-[#08090b] p-4 text-sm leading-6 text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
          />
        </div>

        {/* Challenge & Solution */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
              Challenge / Background
            </label>
            <textarea
              rows={4}
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              placeholder="What was the client problem or creative brief?"
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#08090b] p-4 text-sm leading-6 text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
              Solution / Architectural Execution
            </label>
            <textarea
              rows={4}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="How did Creovates design and engineer the outcome?"
              className="mt-2 w-full rounded-xl border border-white/15 bg-[#08090b] p-4 text-sm leading-6 text-white placeholder-[#8e949d]/40 focus:border-[#4b83ee] focus:outline-none"
            />
          </div>
        </div>

        {/* Publishing Options */}
        <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
          {/* Published toggle */}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#08090b] px-4 py-3 hover:border-[#4b83ee]/40 transition-colors">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-[#08090b] text-[#4b83ee] accent-[#4b83ee]"
            />
            <div>
              <span className="text-xs font-bold text-white">
                Published Status
              </span>
              <p className="text-[10px] text-[#8e949d]">
                Visible to live website visitors
              </p>
            </div>
          </label>

          {/* Featured toggle */}
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#08090b] px-4 py-3 hover:border-[#4b83ee]/40 transition-colors">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-[#08090b] text-[#4b83ee] accent-[#4b83ee]"
            />
            <div>
              <span className="text-xs font-bold text-white">
                Featured Hero
              </span>
              <p className="text-[10px] text-[#8e949d]">
                Highlights in homepage portfolio grid
              </p>
            </div>
          </label>

          {/* Display Order */}
          <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#08090b] px-4 py-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[#b0b5be]">
              Sort Order:
            </span>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              className="w-16 rounded-lg border border-white/15 bg-[#101216] px-2.5 py-1 text-xs text-white focus:border-[#4b83ee] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-end gap-4">
        <Link
          href="/admin/projects"
          className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-medium text-[#b0b5be] hover:border-white/35 hover:text-white transition-all"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving || coverMeta.uploading || mobileMeta.uploading}
          className="flex items-center gap-2 rounded-full bg-[#4b83ee] px-8 py-3 text-xs font-semibold text-white transition hover:bg-[#3b73de] shadow-blue disabled:opacity-50"
        >
          <Sparkles size={15} />
          <span>
            {saving
              ? "Saving Project..."
              : isEditing
                ? "Save Changes"
                : "Create Project"}
          </span>
        </button>
      </div>
    </form>
  );
}
