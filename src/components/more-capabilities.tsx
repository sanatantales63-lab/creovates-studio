"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/* ─────────────────────────────────────────────────────────────
   DATA & MESSAGING
   Exact secondary capabilities supporting the core website offering.
   ───────────────────────────────────────────────────────────── */
const CAPABILITIES = [
  {
    num: "01",
    key: "ai" as const,
    title: "AI AUTOMATION",
    desc: "Automate repetitive business tasks and workflows.",
    word: "AUTOMATE",
  },
  {
    num: "02",
    key: "whatsapp" as const,
    title: "WHATSAPP AUTOMATION",
    desc: "Handle enquiries, follow-ups and customer conversations faster.",
    word: "CONNECT",
  },
  {
    num: "03",
    key: "ugc" as const,
    title: "UGC ADS",
    desc: "Short-form creative content built to grab attention.",
    word: "CREATE",
  },
  {
    num: "04",
    key: "visual" as const,
    title: "IMAGE & VISUAL ENHANCEMENT",
    desc: "Improve and upgrade low-quality images and visuals.",
    word: "ENHANCE",
  },
] as const;

type CapKey = (typeof CAPABILITIES)[number]["key"] | null;

export function MoreCapabilitiesSection() {
  const reduced = useReducedMotion();
  const [activeKey, setActiveKey] = useState<CapKey>(null);

  const handleEnter = useCallback((key: CapKey) => {
    setActiveKey(key);
  }, []);

  const handleLeave = useCallback(() => {
    setActiveKey(null);
  }, []);

  const activeItem = CAPABILITIES.find((c) => c.key === activeKey) ?? null;

  return (
    <section
      id="capabilities"
      className="relative bg-[#08090b] px-5 py-16 md:px-9 md:py-24 border-t border-white/[.08] text-[#f4f4f2]"
      style={{ overflow: "clip" }}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-start">
          {/* ── LEFT (5/12): Compact Section Header & Direct CTA ── */}
          <div className="relative z-[3] lg:col-span-5">
            <p className="eyebrow">05 — And there&apos;s more</p>
            <h2 className="mt-6 text-[clamp(2.1rem,3.6vw,3.6rem)] font-medium leading-[.94] tracking-[-.065em]">
              MORE THAN<br />
              JUST WEBSITES.
            </h2>
            <p className="mt-4 max-w-sm text-xs md:text-sm leading-relaxed text-[#8e949d]">
              Need more around the website? We also build practical digital solutions that help your brand move faster.
            </p>
            <div className="mt-8 hidden lg:block">
              <Link
                href="/contact"
                className="focus-ring inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e949d] transition-colors duration-200 hover:text-[#f4f4f2]"
              >
                Talk about your project
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>

          {/* ── RIGHT (7/12): Compact, Stable Capability Rows (No Vertical Expansion) ── */}
          <div
            className="relative z-[2] lg:col-span-7"
            style={{ overflow: "hidden" }}
          >
            {/* Background Keyword (strictly contained in right container, desktop only) */}
            <AnimatePresence mode="wait">
              {activeItem && !reduced && (
                <motion.span
                  key={activeItem.word}
                  className="cap-bg-keyword hidden lg:block"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  aria-hidden
                >
                  {activeItem.word}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Rows Container */}
            <div className="relative z-[2] border-t border-white/[.08]">
              {CAPABILITIES.map((item) => {
                const isActive = activeKey === item.key;

                return (
                  <Link
                    key={item.key}
                    href="/contact"
                    className={`cap-row group relative block border-b border-white/[.08] transition-colors duration-200 ${
                      isActive ? "bg-white/[0.018]" : "hover:bg-white/[0.008]"
                    }`}
                    onMouseEnter={() => handleEnter(item.key)}
                    onMouseLeave={handleLeave}
                    onFocus={() => handleEnter(item.key)}
                    onBlur={handleLeave}
                    aria-label={`${item.title} — ${item.desc}`}
                  >
                    {/* Subtle Top Accent Line */}
                    <motion.div
                      className="cap-accent-line"
                      initial={false}
                      animate={{
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0,
                      }}
                      transition={{
                        duration: reduced ? 0 : 0.25,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                    />

                    <div className="grid grid-cols-[28px_1fr_auto] gap-3.5 items-center py-4 md:py-5 px-2">
                      {/* Number */}
                      <span
                        className={`text-[10px] font-bold tracking-[0.16em] transition-colors duration-200 ${
                          isActive ? "text-[#4b83ee]" : "text-[#4b83ee]/50"
                        }`}
                      >
                        {item.num}
                      </span>

                      {/* Title + Description (Fixed compact layout, zero vertical jump) */}
                      <div className="min-w-0 pr-2">
                        <h3
                          className={`text-base md:text-lg lg:text-[1.1875rem] font-medium tracking-[-0.035em] transition-colors duration-200 ${
                            isActive ? "text-[#f4f4f2]" : "text-[#f4f4f2]/75"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs md:text-[0.8125rem] text-[#8e949d] leading-normal max-w-lg">
                          {item.desc}
                        </p>
                      </div>

                      {/* Arrow Action */}
                      <div className="pl-1">
                        <ArrowUpRight
                          size={14}
                          className={`transition-all duration-200 ${
                            isActive
                              ? "text-[#4b83ee] translate-x-0.5 -translate-y-0.5"
                              : "text-[#8e949d]/35 group-hover:text-[#8e949d]/70"
                          }`}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 lg:hidden">
              <Link
                href="/contact"
                className="focus-ring inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e949d] transition-colors duration-200 hover:text-[#f4f4f2]"
              >
                Talk about your project
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
