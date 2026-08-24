"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/* ─────────────────────────────────────────────────────────────
   DATA & MESSAGING
   Simple, direct, client-friendly value propositions.
   ───────────────────────────────────────────────────────────── */
const PRINCIPLES = [
  {
    num: "01",
    key: "brand" as const,
    title: "BRAND-FIRST",
    desc: "We design around your brand, not a template.",
    word: "BRAND",
  },
  {
    num: "02",
    key: "use" as const,
    title: "EASY TO USE",
    desc: "Simple, clear and built for real people.",
    word: "USE",
  },
  {
    num: "03",
    key: "fast" as const,
    title: "FAST & SMOOTH",
    desc: "Beautiful websites that stay fast.",
    word: "FAST",
  },
  {
    num: "04",
    key: "grow" as const,
    title: "BUILT TO GROW",
    desc: "Easy to update as your business grows.",
    word: "GROW",
  },
] as const;

type PrincipleKey = (typeof PRINCIPLES)[number]["key"];

/* ─────────────────────────────────────────────────────────────
   PRINCIPLE ITEM
   Expands into a large editorial statement when active.
   Renders as a clean, compact row when inactive.
   ───────────────────────────────────────────────────────────── */
function PrincipleItem({
  item,
  isActive,
  reduced,
  onActivate,
}: {
  item: (typeof PRINCIPLES)[number];
  isActive: boolean;
  reduced: boolean;
  onActivate: () => void;
}) {
  return (
    <div
      className={`why-item transition-colors duration-300 ${
        isActive ? "why-item--active" : "why-item--inactive"
      }`}
      onMouseEnter={onActivate}
      onClick={onActivate}
      onFocus={onActivate}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
    >
      {/* Active Left Accent Line */}
      <motion.div
        className="why-accent-line"
        initial={false}
        animate={{
          scaleY: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: reduced ? 0 : 0.32, ease: [0.2, 0.8, 0.2, 1] }}
      />

      <div className="why-item-inner">
        {/* Top bar with index and status */}
        <div className="flex items-center justify-between">
          <span
            className={`why-num transition-colors duration-300 ${
              isActive ? "text-[#4b83ee]" : "text-[#4b83ee]/40"
            }`}
          >
            {item.num}
          </span>
          {!isActive && (
            <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-[#8e949d]/40 transition-colors group-hover:text-[#f4f4f2]/70">
              0{item.num.slice(1)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={`why-title transition-all duration-300 ${
            isActive
              ? "why-title--active text-[#f4f4f2]"
              : "why-title--inactive text-[#8e949d]/50 hover:text-[#f4f4f2]/80"
          }`}
        >
          {item.title}
        </h3>

        {/* Expanded Description & CTA for Active State */}
        <AnimatePresence initial={false}>
          {isActive && (
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0, y: 6 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto", y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0, y: 4 }}
              transition={{ duration: reduced ? 0 : 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="overflow-hidden"
            >
              <p className="why-desc">{item.desc}</p>
              <div className="pt-5">
                <Link
                  href="/contact"
                  className="focus-ring inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#4b83ee] transition-colors hover:text-[#f4f4f2]"
                  onClick={(e) => e.stopPropagation()}
                >
                  Explore
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────────── */
export function WhyCreovatesSection() {
  const reduced = useReducedMotion();
  const [activeKey, setActiveKey] = useState<PrincipleKey>("brand");

  const handleActivate = useCallback((key: PrincipleKey) => {
    setActiveKey(key);
  }, []);

  const activeItem = PRINCIPLES.find((p) => p.key === activeKey) || PRINCIPLES[0];

  return (
    <section
      id="about"
      className="relative px-5 py-24 md:px-9 md:py-36 border-t border-white/[.08]"
      style={{ overflow: "clip" }}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* ── LEFT (45%): Eyebrow + Section Headline ── */}
          <div className="relative z-[3] lg:col-span-5 lg:sticky lg:top-36">
            <p className="eyebrow">03 — Why Creovates</p>
            <h2 className="why-headline mt-8 font-medium leading-[.92] tracking-[-.065em]">
              DESIGN SHOULD<br />
              DO MORE THAN<br />
              <span className="text-[#8e949d]">LOOK GOOD.</span>
            </h2>
          </div>

          {/* ── RIGHT (55%): Prominent Interactive Principle Area ── */}
          <div
            className="relative z-[2] lg:col-span-7 why-panel-wrap"
            style={{ overflow: "hidden" }}
          >
            {/* Background Keyword — contained strictly within right column */}
            <AnimatePresence mode="wait">
              {activeItem && !reduced && (
                <motion.span
                  key={activeItem.word}
                  className="why-bg-keyword"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  aria-hidden
                >
                  {activeItem.word}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Principles Interactive Stack */}
            <div className="relative z-[2] border-t border-white/[.1]">
              {PRINCIPLES.map((item) => (
                <PrincipleItem
                  key={item.key}
                  item={item}
                  isActive={activeKey === item.key}
                  reduced={!!reduced}
                  onActivate={() => handleActivate(item.key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
