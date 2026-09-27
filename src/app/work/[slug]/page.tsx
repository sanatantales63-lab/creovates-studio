import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Globe,
  Sparkles,
  CheckCircle2,
  Layers,
  Zap,
  ShieldCheck,
  Calendar,
  Building2,
  Tag,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { FALLBACK_PROJECTS } from "@/components/project-list";
import { getProject } from "@/lib/projects";
import type { Project } from "@/types/project";

export const runtime = "edge";

async function resolveProject(slug: string): Promise<Project | null> {
  const dbProject = await getProject(slug);
  if (dbProject) return dbProject;
  return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await resolveProject(slug);
  return {
    title: project?.title || "Project Case Study",
    description:
      project?.description ||
      "Explore this bespoke digital project designed and engineered by Creovates Studio.",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await resolveProject(slug);
  if (!project) notFound();

  const titleParts = project.title.split("—");
  const mainTitle = titleParts[0]?.trim() || project.title;
  const subHeading = titleParts[1]?.trim() || "";

  const servicesList =
    project.services && project.services.length > 0
      ? project.services
      : ["Bespoke UI/UX", "Next.js Engineering", "Performance & SEO"];

  const challengeText =
    project.challenge ||
    `${project.client || mainTitle} needed a distinctive digital flagship that stood apart from generic industry templates—combining immediate visual authority with frictionless lead conversion across mobile and desktop.`;

  const approachText =
    "We architected a bespoke design system from the ground up, pairing choreographed scroll motion and clear typographic hierarchy with sub-second edge delivery and conversion-focused user flows.";

  const solutionText =
    project.solution ||
    `The launched platform established a category-leading digital presence for ${project.client || mainTitle}, delivering 99+ Lighthouse performance, seamless mobile responsiveness, and measurable growth in qualified client enquiries.`;

  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <SiteHeader />

      {/* J&T-Style Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-36 px-4 md:px-8 lg:px-16 overflow-hidden">
        {/* Ambient Radial Glow & Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="w-full h-full opacity-40"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 25%, rgba(75, 131, 238, 0.34) 0%, rgba(29, 78, 216, 0.12) 42%, transparent 70%),
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 64px 64px, 64px 64px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-[#08090b]/80" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Top Navigation & Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 border border-white/15 hover:border-[#4b83ee] bg-white/5 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-medium text-[#b0b5be] hover:text-white transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Portfolio
            </Link>
            <span className="inline-flex items-center gap-2 border border-[#4b83ee]/40 bg-[#4b83ee]/10 text-[#4b83ee] rounded-full px-4 py-1.5 text-xs font-medium">
              <Sparkles className="w-3 h-3" />
              {project.category || "Bespoke Case Study"}
              {project.year ? ` • ${project.year}` : ""}
            </span>
          </div>

          {/* Project Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-white mb-6">
            {mainTitle}{" "}
            {subHeading ? (
              <span className="text-shine-blue italic font-serif font-normal block sm:inline mt-1 sm:mt-0">
                — {subHeading}
              </span>
            ) : (
              <span className="text-shine-blue italic font-serif font-normal">
                Case Study
              </span>
            )}
          </h1>

          {/* Project Description */}
          <p className="text-[#b0b5be] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {project.description}
          </p>

          {/* Action CTA Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#4b83ee] hover:bg-[#3b73de] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-blue inline-flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                Visit Live Website
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
            <Link
              href="/start-project"
              className="border border-white/25 hover:border-[#4b83ee] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm inline-flex items-center gap-2"
            >
              Build Something Similar
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Overlapping Glowing Showcase Frame (Matches J&T `-mt-24` Showreel Frame) */}
      <section className="relative z-20 -mt-24 px-4 md:px-8 lg:px-16 pb-16">
        {/* Sapphire Glow Halo Behind Showcase */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-32 bg-gradient-to-b from-[#4b83ee]/75 via-[#4b83ee]/30 to-transparent blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[75%] max-w-4xl h-20 rounded-full bg-[#4b83ee]/40 blur-3xl"
        />

        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#101216] animated-highlight">
            {/* macOS Browser Top Chrome */}
            <div className="bg-[#151525] px-4 sm:px-6 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#b0b5be] bg-white/5 border border-white/10 px-4 py-1 rounded-full">
                <Globe className="w-3 h-3 text-[#4b83ee]" />
                <span className="truncate max-w-[260px]">
                  {project.live_url
                    ? project.live_url.replace(/^https?:\/\//, "")
                    : `${project.slug}.creovates.com`}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                <span>Bespoke Build</span>
              </div>
            </div>

            {/* Main 16:9 Showcase Viewport */}
            <div className="relative aspect-[16/9] max-h-[720px] w-full bg-[#08090b] overflow-hidden">
              {project.cover_image ? (
                <Image
                  src={project.cover_image}
                  alt={`${project.title} website preview`}
                  fill
                  priority
                  unoptimized
                  className="object-cover object-top"
                  sizes="100vw"
                />
              ) : (
                /* Rich Architectural Mockup Canvas when no external cover image is uploaded */
                <div
                  className="w-full h-full p-8 md:p-16 flex flex-col justify-between relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #0b0f19 0%, #172554 50%, #4b83ee 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0%, transparent 55%)",
                    }}
                  />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-sky-300 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
                      {project.client || mainTitle} • Digital Flagship
                    </span>
                    <span className="text-xs font-mono text-white/80 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                      99/100 Performance
                    </span>
                  </div>

                  <div className="relative z-10 my-auto max-w-2xl">
                    <div className="font-serif text-3xl sm:text-5xl md:text-6xl text-white leading-tight">
                      {mainTitle}
                    </div>
                    <p className="text-sm sm:text-base text-white/80 mt-4 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-wrap gap-2">
                    {servicesList.map((srv) => (
                      <span
                        key={srv}
                        className="text-xs font-medium text-white bg-black/40 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Project Metadata Bar (Matches J&T Counter/Telemetry Bar) */}
      <section className="px-4 md:px-8 lg:px-16 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#101216] border border-white/10 rounded-2xl p-6 md:p-8 animated-highlight-section">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 flex items-center justify-center text-[#4b83ee] shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#8e949d]">
                  Client
                </div>
                <div className="text-base font-bold text-white mt-1">
                  {project.client || mainTitle}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 flex items-center justify-center text-[#4b83ee] shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#8e949d]">
                  Category
                </div>
                <div className="text-base font-bold text-white mt-1">
                  {project.category || "Bespoke Digital"}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 flex items-center justify-center text-[#4b83ee] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#8e949d]">
                  Year
                </div>
                <div className="text-base font-bold text-white mt-1">
                  {project.year || "2025"}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 flex items-center justify-center text-[#4b83ee] shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#8e949d]">
                  Deliverables
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {servicesList.map((srv) => (
                    <span
                      key={srv}
                      className="text-[11px] font-medium text-[#b0b5be] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Story Bento Section (`The Challenge`, `The Approach`, `The Solution`) */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block border border-[#4b83ee]/40 text-[#4b83ee] rounded-full px-5 py-1.5 text-sm font-medium mb-5">
              The Story
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              How we brought it{" "}
              <span className="text-shine-blue italic font-serif font-normal">
                to life
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 01: The Challenge */}
            <div className="rounded-2xl bg-[#101216] border border-white/10 hover:border-[#4b83ee]/40 p-7 md:p-8 transition-all duration-300 animated-highlight-section spotlight-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-mono font-semibold text-[#4b83ee]">
                    .01
                  </span>
                  <span className="w-9 h-9 rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 flex items-center justify-center text-[#4b83ee]">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  The <span className="text-shine-blue">Challenge</span>
                </h3>
                <p className="text-[#b0b5be] text-sm leading-relaxed">
                  {challengeText}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-[#8e949d]">
                Strategic Discovery &amp; Audit
              </div>
            </div>

            {/* 02: The Approach */}
            <div className="rounded-2xl bg-[#101216] border border-white/10 hover:border-[#4b83ee]/40 p-7 md:p-8 transition-all duration-300 animated-highlight-section spotlight-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-mono font-semibold text-[#4b83ee]">
                    .02
                  </span>
                  <span className="w-9 h-9 rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 flex items-center justify-center text-[#4b83ee]">
                    <Layers className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  The <span className="text-shine-blue">Approach</span>
                </h3>
                <p className="text-[#b0b5be] text-sm leading-relaxed">
                  {approachText}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-[#8e949d]">
                Bespoke Architecture &amp; Motion
              </div>
            </div>

            {/* 03: The Solution */}
            <div className="rounded-2xl bg-[#101216] border border-white/10 hover:border-[#4b83ee]/40 p-7 md:p-8 transition-all duration-300 animated-highlight-section spotlight-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-mono font-semibold text-[#4b83ee]">
                    .03
                  </span>
                  <span className="w-9 h-9 rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 flex items-center justify-center text-[#4b83ee]">
                    <Zap className="w-4 h-4" />
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  The <span className="text-shine-blue">Solution</span>
                </h3>
                <p className="text-[#b0b5be] text-sm leading-relaxed">
                  {solutionText}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Delivered &amp; Optimised</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery & Mobile Showcase Section */}
      {(project.gallery.length > 0 || project.mobile_image) && (
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block border border-[#4b83ee]/40 text-[#4b83ee] rounded-full px-5 py-1.5 text-sm font-medium mb-5">
                Visual Breakdown
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                Project{" "}
                <span className="text-shine-blue italic font-serif font-normal">
                  gallery
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((source, index) => (
                <div
                  key={source}
                  className={`rounded-2xl overflow-hidden bg-[#101216] border border-white/10 p-3 animated-highlight group ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-center justify-between px-3 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-[11px] font-mono text-[#8e949d]">
                      0{index + 1} / Interface View
                    </span>
                  </div>
                  <div
                    className={`relative rounded-xl overflow-hidden bg-[#08090b] ${
                      index === 0 ? "aspect-[16/9]" : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={source}
                      alt={`${project.title} detail ${index + 1}`}
                      fill
                      unoptimized
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>
              ))}

              {project.mobile_image && (
                <div className="rounded-2xl overflow-hidden bg-[#101216] border border-white/10 p-3 animated-highlight group">
                  <div className="flex items-center justify-between px-3 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <span className="text-[11px] font-mono text-[#8e949d]">
                      Mobile Experience
                    </span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden bg-[#08090b] aspect-[4/3]">
                    <Image
                      src={project.mobile_image}
                      alt={`${project.title} mobile view`}
                      fill
                      unoptimized
                      className="object-contain p-4 group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* J&T-Style Bottom Gradient CTA Banner + 3-Col Footer */}
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
