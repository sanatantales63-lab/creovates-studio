"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Sparkles, Globe } from "lucide-react";
import type { Project } from "@/types/project";

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "fallback-1",
    slug: "veloce-luxury-automotive",
    title: "Veloce — Bespoke Automotive Flagship",
    client: "Veloce Motors",
    year: 2025,
    category: "Bespoke Website",
    description:
      "Custom Next.js digital showroom with interactive configurator, 60fps scroll choreography, and instant private concierge booking.",
    challenge:
      "Veloce Motors needed a digital flagship that matched the precision and prestige of their bespoke vehicles, replacing a slow legacy template that failed to convert high-net-worth visitors.",
    solution:
      "We engineered a custom Next.js flagship from scratch featuring sub-second transitions, interactive model showcases, and a direct private concierge booking flow that lifted qualified enquiries by 210%.",
    services: ["Bespoke UI/UX", "Next.js Engineering", "Motion Design"],
    live_url: null,
    cover_image: null,
    mobile_image: null,
    gallery: [],
    featured: true,
    published: true,
    display_order: 1,
    created_at: "",
  },
  {
    id: "fallback-2",
    slug: "aether-clinic-automation",
    title: "Aether Aesthetics — Web & AI Concierge",
    client: "Aether Clinic",
    year: 2025,
    category: "AI & Automation",
    description:
      "High-converting clinical flagship paired with a 24/7 WhatsApp AI patient qualification & automated calendar booking system.",
    challenge:
      "Aether Clinic was losing over 40% of after-hours treatment enquiries due to manual reception follow-ups and a dated booking interface.",
    solution:
      "We designed a serene editorial website integrated directly with a 24/7 WhatsApp AI concierge that answers treatment questions, qualifies leads, and books calendar consultations automatically.",
    services: ["Web Design", "WhatsApp AI Bot", "CRM Sync"],
    live_url: null,
    cover_image: null,
    mobile_image: null,
    gallery: [],
    featured: true,
    published: true,
    display_order: 2,
    created_at: "",
  },
  {
    id: "fallback-3",
    slug: "kinetix-architectural-studio",
    title: "Kinetix — Architectural Portfolio System",
    client: "Kinetix Partners",
    year: 2025,
    category: "Bespoke Website",
    description:
      "Editorial digital monograph featuring spatial project indexing, sub-second image preloading, and custom CMS workflows.",
    challenge:
      "Kinetix needed a way to present hundreds of high-resolution architectural monographs without sacrificing mobile load speed or search visibility.",
    solution:
      "We built a bespoke portfolio engine with progressive edge image delivery, spatial filtering, and a custom admin CMS achieving a 99/100 Lighthouse performance score.",
    services: ["Brand Architecture", "Custom CMS", "Technical SEO"],
    live_url: null,
    cover_image: null,
    mobile_image: null,
    gallery: [],
    featured: true,
    published: true,
    display_order: 3,
    created_at: "",
  },
  {
    id: "fallback-4",
    slug: "nexacloud-enterprise-platform",
    title: "NexaCloud — AI Infrastructure Platform",
    client: "NexaCloud Inc.",
    year: 2024,
    category: "Digital Experience",
    description:
      "Interactive SaaS product storytelling, live telemetry dashboards, and developer documentation hub built for enterprise scale.",
    challenge:
      "NexaCloud's complex infrastructure offering wasn't resonating with enterprise buyers during self-serve website visits.",
    solution:
      "We crafted an interactive product experience with live architectural diagrams, developer-first documentation, and streamlined enterprise demo onboarding.",
    services: ["Product UI", "Interactive Canvas", "Design System"],
    live_url: null,
    cover_image: null,
    mobile_image: null,
    gallery: [],
    featured: true,
    published: true,
    display_order: 4,
    created_at: "",
  },
  {
    id: "fallback-5",
    slug: "lumina-commerce-flagship",
    title: "Lumina — High-Velocity D2C Flagship",
    client: "Lumina Botanics",
    year: 2024,
    category: "E-Commerce & Brand",
    description:
      "Headless luxury commerce experience with UGC video reels, one-tap checkout flows, and 99/100 Lighthouse performance.",
    challenge:
      "Rising paid social acquisition costs meant Lumina needed higher landing page conversion rates and stronger creative hooks.",
    solution:
      "We combined high-converting UGC video ad production with a custom headless storefront that reduced bounce rates by 64% and lifted ROAS to 3.8x.",
    services: ["Headless Commerce", "UGC Ad Creative", "CRO"],
    live_url: null,
    cover_image: null,
    mobile_image: null,
    gallery: [],
    featured: true,
    published: true,
    display_order: 5,
    created_at: "",
  },
  {
    id: "fallback-6",
    slug: "solstice-hospitality-group",
    title: "Solstice — Boutique Hospitality & Booking",
    client: "Solstice Group",
    year: 2024,
    category: "Bespoke Website",
    description:
      "Immersive destination storytelling and direct-booking engine with automated WhatsApp guest itinerary updates.",
    challenge:
      "Solstice wanted to reduce reliance on third-party OTA commissions by driving direct bookings through their own digital flagship.",
    solution:
      "We delivered an editorial destination experience with a seamless direct booking flow and automated WhatsApp pre-arrival concierge messaging.",
    services: ["Bespoke Web", "Booking Engine", "WhatsApp Flows"],
    live_url: null,
    cover_image: null,
    mobile_image: null,
    gallery: [],
    featured: true,
    published: true,
    display_order: 6,
    created_at: "",
  },
];

const PREVIEW_GRADIENTS = [
  "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #4b83ee 100%)",
  "linear-gradient(135deg, #090d16 0%, #1d4ed8 50%, #38bdf8 100%)",
  "linear-gradient(135deg, #111827 0%, #1e293b 50%, #4b83ee 100%)",
  "linear-gradient(135deg, #0a0f1d 0%, #172554 55%, #60a5fa 100%)",
  "linear-gradient(135deg, #0f172a 0%, #312e81 50%, #4b83ee 100%)",
  "linear-gradient(135deg, #090d16 0%, #1e40af 50%, #93c5fd 100%)",
];

function handleSpotlight(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
}

export function ProjectList({
  projects,
  totalCount,
  hideHeader = false,
}: {
  projects: Project[];
  totalCount?: number;
  hideHeader?: boolean;
}) {
  const hasRealProjects = projects && projects.length > 0;
  const displaySource = hasRealProjects ? projects : FALLBACK_PROJECTS;

  const categories = [
    "All",
    ...Array.from(
      new Set(displaySource.map((p) => p.category).filter(Boolean))
    ),
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? displaySource
      : displaySource.filter((p) => p.category === activeCategory);

  return (
    <section
      id="work"
      className={`${hideHeader ? "py-8" : "py-24"} px-4 md:px-8 lg:px-16`}
    >
      <div className="max-w-7xl mx-auto">
        {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block border border-[#4b83ee]/40 text-[#4b83ee] rounded-full px-5 py-1.5 text-sm font-medium mb-6">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Our featured <span className="text-shine-blue">portfolio</span>
            </h2>
            <p className="text-[#8e949d] text-base max-w-xl mx-auto mt-4">
              Explore how we&apos;ve helped ambitious brands launch bespoke
              websites, interactive platforms, and automated growth systems.
            </p>
          </motion.div>
        )}

        {/* Category Filter Pills (matches J&T `Industries` filter bar) */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#4b83ee] text-white shadow-blue"
                    : "bg-[#101216] border border-white/10 text-[#b0b5be] hover:border-[#4b83ee]/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* 3-Column J&T Portfolio Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const href = `/work/${project.slug}`;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                >
                  <Link
                    href={href}
                    onMouseMove={handleSpotlight}
                    className="group block rounded-2xl bg-[#101216] border border-white/10 p-4 hover:border-[#4b83ee]/40 transition-all duration-300 hover:-translate-y-1 animated-highlight spotlight-card h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="inline-block text-[11px] font-mono text-[#4b83ee] mb-1">
                            {project.category || "Bespoke Digital"}{" "}
                            {project.year ? `• ${project.year}` : ""}
                          </span>
                          <h3 className="text-base font-bold text-white group-hover:text-[#4b83ee] transition-colors duration-200">
                            {project.title}
                          </h3>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-white/15 group-hover:border-[#4b83ee] group-hover:bg-[#4b83ee] flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-2">
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#8e949d] group-hover:text-white transition-all duration-200 group-hover:rotate-45" />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[#8e949d] text-xs leading-relaxed mb-4 line-clamp-2">
                        {project.description ||
                          "Bespoke design and full-stack engineering crafted for speed, conversion, and brand authority."}
                      </p>
                    </div>

                    {/* Visual Media Frame (16:10 aspect ratio matching J&T) */}
                    <div className="rounded-xl overflow-hidden aspect-[16/10] bg-[#08090b] relative border border-white/5">
                      {project.cover_image ? (
                        <img
                          src={project.cover_image}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        /* Rich Bespoke Mockup Frame when no external image is uploaded */
                        <div
                          className="w-full h-full p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
                          style={{
                            background:
                              PREVIEW_GRADIENTS[
                                index % PREVIEW_GRADIENTS.length
                              ],
                          }}
                        >
                          <div
                            className="absolute inset-0 opacity-25"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.35) 0%, transparent 50%)",
                            }}
                          />
                          {/* Browser Top Bar */}
                          <div className="relative z-10 flex items-center justify-between bg-black/30 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/10">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                              <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                              <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                            </div>
                            <span className="text-[10px] font-mono text-white/75 truncate max-w-[140px]">
                              {project.client || project.title}
                            </span>
                            <Globe className="w-3 h-3 text-white/60" />
                          </div>

                          {/* Center Preview Mockup Content */}
                          <div className="relative z-10 my-auto py-2">
                            <div className="text-[10px] font-mono uppercase tracking-widest text-sky-300/90 mb-1 flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5" />
                              {project.client || "Creovates Flagship"}
                            </div>
                            <div className="font-serif text-lg text-white leading-snug line-clamp-1">
                              {project.title.split("—")[0]}
                            </div>
                          </div>

                          {/* Service Pills */}
                          <div className="relative z-10 flex flex-wrap gap-1.5">
                            {(project.services?.length
                              ? project.services.slice(0, 3)
                              : ["Bespoke UI", "Next.js", "Motion"]
                            ).map((srv) => (
                              <span
                                key={srv}
                                className="text-[10px] font-medium text-white/90 bg-black/35 backdrop-blur-md border border-white/15 px-2.5 py-0.5 rounded-full"
                              >
                                {srv}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom CTA Button (matches J&T `View all projects` pill) */}
        {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-12"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 bg-[#4b83ee] hover:bg-[#3b73de] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-blue"
            >
              View all projects
              {typeof totalCount === "number" && totalCount > 0
                ? ` (${totalCount})`
                : ""}
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
