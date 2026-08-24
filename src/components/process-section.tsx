"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/* ─────────────────────────────────────────────────────────────
   PROCESS STEPS DATA
   Simple, direct, client-friendly 6-step workflow.
   ───────────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "We understand your business, audience and goals.",
  },
  {
    num: "02",
    title: "Define",
    desc: "We decide what the website needs to do.",
  },
  {
    num: "03",
    title: "Design",
    desc: "We create the visual direction and user experience.",
  },
  {
    num: "04",
    title: "Build",
    desc: "We turn the design into a fast, responsive website.",
  },
  {
    num: "05",
    title: "Refine",
    desc: "We test, polish and fix the details.",
  },
  {
    num: "06",
    title: "Launch",
    desc: "Your website goes live and is ready to grow.",
  },
] as const;

export function ProcessSection() {
  const reduced = useReducedMotion();
  const [activeStep, setActiveStep] = useState<string | null>("01");

  const handleActivate = useCallback((num: string) => {
    setActiveStep(num);
  }, []);

  const handleToggle = useCallback((num: string) => {
    setActiveStep((prev) => (prev === num ? null : num));
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Keep 01 active on leave so the layout remains populated and balanced
    setActiveStep("01");
  }, []);

  return (
    <section
      id="process"
      className="relative bg-[#f4f4f2] px-5 py-24 text-[#08090b] md:px-9 md:py-36 overflow-hidden"
    >
      {/* ── Background Watermark (ultra-subtle editorial typography) ── */}
      <p
        className="watermark bottom-[-2%] left-[-5%] !text-[#08090b] pointer-events-none select-none opacity-[0.028]"
        aria-hidden
      >
        CREOVATES.
      </p>

      <div className="relative mx-auto max-w-[1600px]">
        {/* ── Section Header: Headline + Supporting Copy ── */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div>
            <p className="eyebrow !text-[#555b63]">04 — Process</p>
            <h2 className="mt-8 text-[clamp(3rem,6vw,6rem)] font-medium leading-[.88] tracking-[-.075em]">
              FROM IDEA<br />TO LIVE.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-[#555b63] md:pt-14">
            A clear process keeps every project focused, efficient and moving forward.
          </p>
        </div>

        {/* ── Desktop & Tablet: Horizontal 6-Column Process ── */}
        <div
          className="mt-20 hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-black/10"
          onMouseLeave={handleMouseLeave}
        >
          {STEPS.map((step) => {
            const isActive = activeStep === step.num;
            const isDimmed = activeStep !== null && !isActive;

            return (
              <div
                key={step.num}
                className={`process-col relative group min-h-[280px] border-b border-black/10 py-6 sm:px-4 lg:first:pl-0 lg:last:pr-0 lg:border-r lg:last:border-r-0 lg:border-b-0 cursor-pointer transition-all duration-300 ${
                  isActive ? "process-col--active" : "process-col--inactive"
                } ${isDimmed ? "opacity-45" : "opacity-100"}`}
                onMouseEnter={() => handleActivate(step.num)}
                onClick={() => handleActivate(step.num)}
                onFocus={() => handleActivate(step.num)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleActivate(step.num);
                  }
                }}
              >
                {/* Active Top Accent Line */}
                <motion.div
                  className="process-col-accent"
                  initial={false}
                  animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: reduced ? 0 : 0.3,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                />

                {/* Step Number */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-bold tracking-[0.16em] transition-colors duration-300 ${
                      isActive ? "text-[#4b83ee]" : "text-[#4b83ee]/50"
                    }`}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Step Title */}
                <h3
                  className={`mt-10 text-2xl tracking-[-0.045em] font-medium transition-all duration-300 ${
                    isActive ? "text-[#08090b] translate-y-[-2px]" : "text-[#08090b]/80"
                  }`}
                >
                  {step.title}
                </h3>

                {/* Step Description — smoothly expands close to the step */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0, y: 6 }}
                      animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto", y: 0 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0, y: 4 }}
                      transition={{ duration: reduced ? 0 : 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm leading-relaxed text-[#555b63]">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* ── Mobile: Vertical Accordion (one step open at a time) ── */}
        <div className="mt-14 sm:hidden border-t border-black/10">
          {STEPS.map((step) => {
            const isActive = activeStep === step.num;

            return (
              <div
                key={step.num}
                className={`border-b border-black/10 py-5 transition-colors duration-200 ${
                  isActive ? "bg-black/[0.02] px-3" : ""
                }`}
                onClick={() => handleToggle(step.num)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleToggle(step.num);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold tracking-[0.16em] text-[#4b83ee]">
                      {step.num}
                    </span>
                    <h3 className="text-xl font-medium tracking-[-0.04em] text-[#08090b]">
                      {step.title}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#555b63]/60">
                    {isActive ? "—" : "+"}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: reduced ? 0 : 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 pl-7 text-sm leading-relaxed text-[#555b63]">
                        {step.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
