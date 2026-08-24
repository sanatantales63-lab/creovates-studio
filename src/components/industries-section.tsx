"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useReducedMotion } from "motion/react";
import { Project } from "@/types/project";

/* ─────────────────────────────────────────────────────────────
   AUTHENTIC INDUSTRIES
   Real business sectors represented by Creovates work.
   ───────────────────────────────────────────────────────────── */
const INDUSTRIES = [
  "Photography",
  "Interior Design",
  "Hospitality",
  "Real Estate",
  "Retail",
  "Personal Brands",
  "Creative Studios",
  "Architecture",
] as const;

export function IndustriesSection({ projects = [] }: { projects?: Project[] }) {
  const reduced = useReducedMotion();
  const [manualIdx, setManualIdx] = useState<number | null>(null);
  const [autoIdx, setAutoIdx] = useState<number>(0);

  // Auto-cycle through industries smoothly on mobile & when not hovered
  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setAutoIdx((prev) => (prev + 1) % INDUSTRIES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [reduced]);

  // If manual hover is active, prioritize it; otherwise use smooth auto-cycle
  const activeIdx = manualIdx !== null ? manualIdx : autoIdx;

  // Compute real metrics strictly from actual data (no fake numbers)
  const totalProjects = projects.length;
  const distinctCategories = new Set(projects.map((p) => p.category).filter(Boolean)).size;
  const liveCount = projects.filter((p) => p.live_url).length;
  const hasRealMetrics = totalProjects > 0;

  return (
    <section
      id="proof"
      className="relative bg-[#08090b] px-5 py-16 md:px-9 md:py-24 border-y border-white/[.08] text-[#f4f4f2] overflow-hidden"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* ── Section Header ── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow">06 — Built for brands in motion</p>
            <h2 className="mt-6 text-[clamp(2.2rem,3.8vw,3.8rem)] font-medium leading-[.94] tracking-[-.065em]">
              WEB EXPERIENCES<br />
              FOR DIFFERENT<br />
              <span className="text-[#8e949d]">BUSINESSES.</span>
            </h2>
          </div>

          <div className="lg:col-span-8 lg:pt-8">
            <p className="text-base sm:text-lg md:text-xl text-[#8e949d] leading-relaxed max-w-xl">
              Different businesses. One standard: better digital experiences.
            </p>

            {/* Real Data Metrics (rendered only if real data exists) */}
            {hasRealMetrics ? (
              <div className="mt-8 flex flex-wrap gap-8 border-t border-white/[.08] pt-6">
                <div>
                  <p className="text-2xl font-medium tracking-tight text-[#f4f4f2]">
                    {totalProjects}+
                  </p>
                  <p className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#8e949d] mt-1">
                    Projects Built
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-medium tracking-tight text-[#f4f4f2]">
                    {distinctCategories}
                  </p>
                  <p className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#8e949d] mt-1">
                    Industries
                  </p>
                </div>
                {liveCount > 0 && (
                  <div>
                    <p className="text-2xl font-medium tracking-tight text-[#f4f4f2]">
                      {liveCount}
                    </p>
                    <p className="text-[11px] uppercase font-bold tracking-[0.14em] text-[#8e949d] mt-1">
                      Live Websites
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-6 text-xs md:text-sm uppercase tracking-[0.12em] font-semibold text-[#8e949d]/70">
                Selected work across photography, interiors, hospitality and more.
              </p>
            )}
          </div>
        </div>

        {/* ── Large Editorial Industry Strip (Auto-Cycling + Hover Interaction) ── */}
        <div className="mt-14 pt-10 border-t border-white/[.08]">
          <div className="flex flex-wrap items-center gap-y-4 gap-x-2 sm:gap-x-3 text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium tracking-[-0.04em] leading-tight">
            {INDUSTRIES.map((ind, i) => {
              const isActive = activeIdx === i;
              const isDimmed = activeIdx !== null && !isActive;

              return (
                <span key={ind} className="inline-flex items-center">
                  <span
                    className={`cursor-pointer transition-all duration-500 select-none ${
                      isActive
                        ? "text-[#f4f4f2] translate-y-[-1px]"
                        : isDimmed
                        ? "text-[#8e949d]/35"
                        : "text-[#f4f4f2]/75 hover:text-[#f4f4f2]"
                    }`}
                    onMouseEnter={() => setManualIdx(i)}
                    onMouseLeave={() => setManualIdx(null)}
                    onClick={() => setManualIdx(i)}
                    onFocus={() => setManualIdx(i)}
                    onBlur={() => setManualIdx(null)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                  >
                    {ind}
                  </span>
                  {i < INDUSTRIES.length - 1 && (
                    <span className="text-[#4b83ee] mx-3 sm:mx-4 font-bold text-lg select-none opacity-80" aria-hidden>
                      ·
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* ── Bottom Transition Bridge Link ── */}
        <div className="mt-12 pt-8 border-t border-white/[.08] flex items-center justify-between">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e949d]">
            Industry-tailored web architecture
          </p>
          <Link
            href="/contact"
            className="focus-ring inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#4b83ee] transition-colors hover:text-[#f4f4f2]"
          >
            Ready to build something better?
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
