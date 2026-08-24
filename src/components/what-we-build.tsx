"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/* ─────────────────────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    index: "01",
    key: "websites" as const,
    title: "Websites",
    word: "WEBSITES",
    body: "Business, portfolio and campaign websites designed with a sharper point of view — built around what your brand needs to say and do.",
    href: "/contact",
  },
  {
    index: "02",
    key: "experiences" as const,
    title: "Digital Experiences",
    word: "EXPERIENCES",
    body: "Interfaces, interactions and visual systems designed to turn attention into meaningful action.",
    href: "/contact",
  },
] as const;

type ServiceKey = (typeof SERVICES)[number]["key"] | null;

/* ─────────────────────────────────────────────────────────────
   VISUAL PREVIEW — WEBSITES
   Pure CSS browser-chrome composition. aria-hidden, decorative.
   ───────────────────────────────────────────────────────────── */
function WebsitePreview({ shown }: { shown: boolean }) {
  return (
    <motion.div
      className="svc-preview"
      initial={false}
      animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.97 }}
      transition={{ duration: 0.48, ease: [0.2, 0.8, 0.2, 1] }}
      aria-hidden
    >
      <div className="svc-chrome">
        <span className="svc-chrome-dot" />
        <span className="svc-chrome-dot" />
        <span className="svc-chrome-dot" />
        <div className="svc-urlbar" />
      </div>
      <div className="svc-page">
        <div className="svc-nav">
          <div className="svc-b svc-b--brand" />
          <div style={{ display: "flex", gap: 10 }}>
            <div className="svc-b" /><div className="svc-b" /><div className="svc-b svc-b--blue" />
          </div>
        </div>
        <div className="svc-hero">
          <div className="svc-b svc-b--h" style={{ width: "82%" }} />
          <div className="svc-b svc-b--h" style={{ width: "58%", marginTop: 7 }} />
          <div className="svc-accent-hr" />
          <div className="svc-b svc-b--sm" style={{ width: "68%" }} />
          <div className="svc-b svc-b--sm" style={{ width: "52%", marginTop: 5 }} />
        </div>
        <div className="svc-content-row">
          <div style={{ flex: 1 }}>
            <div className="svc-b svc-b--sm" />
            <div className="svc-b svc-b--sm" style={{ width: "80%", marginTop: 5 }} />
            <div className="svc-b svc-b--sm" style={{ width: "65%", marginTop: 5 }} />
          </div>
          <div className="svc-imgblock" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   VISUAL PREVIEW — DIGITAL EXPERIENCES
   Abstract interface: layered panels, progress, metric bars.
   ───────────────────────────────────────────────────────────── */
function ExperiencePreview({ shown }: { shown: boolean }) {
  return (
    <motion.div
      className="svc-preview"
      initial={false}
      animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.97 }}
      transition={{ duration: 0.48, ease: [0.2, 0.8, 0.2, 1] }}
      aria-hidden
    >
      <div className="svc-exp-wrap">
        <div className="svc-exp-back" />
        <div className="svc-exp-main">
          <div className="svc-exp-toprow">
            <div className="svc-b svc-b--blue" style={{ width: 30 }} />
            <span className="svc-live-dot" />
          </div>
          <div className="svc-b svc-b--h" style={{ width: "80%", marginTop: 10 }} />
          <div className="svc-b svc-b--h" style={{ width: "56%", marginTop: 6 }} />
          <div className="svc-exp-track">
            <motion.div
              className="svc-exp-fill"
              animate={shown ? { width: "68%" } : { width: "0%" }}
              transition={{ duration: shown ? 0.9 : 0.2, ease: [0.2, 0.8, 0.2, 1], delay: shown ? 0.3 : 0 }}
            />
          </div>
          <div className="svc-exp-metrics">
            {([80, 63, 91] as const).map((pct, i) => (
              <div key={i} className="svc-exp-metric">
                <div className="svc-b" style={{ width: 28 }} />
                <div className="svc-exp-bar">
                  <motion.div
                    className="svc-exp-bar-fill"
                    animate={shown ? { width: `${pct}%` } : { width: "0%" }}
                    transition={{ duration: shown ? 0.7 : 0.2, ease: [0.2, 0.8, 0.2, 1], delay: shown ? 0.35 + i * 0.07 : 0 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="svc-exp-chip">
          <span className="svc-live-dot" />
          <div className="svc-b" style={{ width: 38, height: 4 }} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SERVICE ROW
   ───────────────────────────────────────────────────────────── */
function ServiceRow({
  svc,
  active,
  reduced,
  onEnter,
  onLeave,
  onToggle,
}: {
  svc: (typeof SERVICES)[number];
  active: boolean;
  reduced: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
}) {
  return (
    <div
      className={`svc-row${active ? " svc-row--active" : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-expanded={active}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Blue top accent — grows from left on active */}
      <motion.div
        className="svc-row-accent"
        initial={false}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.38, ease: [0.2, 0.8, 0.2, 1] }}
      />

      <div className="svc-row-inner">
        {/* Index */}
        <motion.span
          className="svc-idx"
          animate={{ color: active ? "#4b83ee" : "rgba(75,131,238,.38)" }}
          transition={{ duration: reduced ? 0 : 0.25 }}
        >
          {svc.index}
        </motion.span>

        {/* Title + description */}
        <div className="svc-col">
          <motion.h3
            className="svc-title"
            animate={{
              y: active && !reduced ? -2 : 0,
              color: active ? "#f4f4f2" : "rgba(244,244,242,.45)",
            }}
            transition={{ duration: reduced ? 0 : 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {svc.title}
          </motion.h3>

          {/* Description — height 0 → auto on active */}
          <motion.div
            initial={false}
            animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.36, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="svc-body">{svc.body}</p>
          </motion.div>
        </div>

        {/* Explore CTA */}
        <motion.div
          className="svc-cta"
          animate={{ opacity: active ? 1 : 0.28 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
        >
          <span>Explore</span>
          <ArrowUpRight
            size={11}
            className={`transition-transform duration-200 ${active ? "translate-x-0.5 -translate-y-0.5" : ""}`}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────────── */
export function WhatWeBuildSection() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<ServiceKey>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  // Attach to the right column — parallax measured relative to it
  const rightColRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !rightColRef.current) return;
      const r = rightColRef.current.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left - r.width / 2) / r.width,
        y: (e.clientY - r.top - r.height / 2) / r.height,
      });
    },
    [reduced]
  );

  const activeWord =
    active === "websites" ? "WEBSITES"
    : active === "experiences" ? "EXPERIENCES"
    : null;

  return (
    <section
      id="services"
      className="relative border-y border-white/[.08] bg-[#101216] px-5 py-24 md:px-9 md:py-36"
      style={{ overflow: "clip" }} /* clip prevents scroll, keeps position:sticky children safe */
    >
      <div className="relative mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12">

        {/* ── LEFT col: eyebrow + headline + CTA — sits above decorative layers ── */}
        <div className="relative z-[4] lg:col-span-5">
          <p className="eyebrow">02 — What we build</p>
          <h2 className="mt-7 text-[clamp(3rem,5vw,5.3rem)] font-medium leading-[.86] tracking-[-.07em]">
            A WEBSITE<br />SHOULD DO<br />
            <span className="text-[#8e949d]">MORE.</span>
          </h2>
          <Link
            href="/contact"
            className="focus-ring mt-14 hidden items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d] transition-colors duration-200 hover:text-[#f4f4f2] lg:inline-flex"
          >
            Explore what we build
            <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* ── RIGHT col: preview panel (absolute) + service rows (in-flow) ── */}
        {/*
            Stacking inside this column:
              z-index 1  →  background word (atmospheric, decorative)
              z-index 2  →  preview visual panel (right 40%)
              z-index 3  →  service rows (always readable, always on top)
        */}
        <div
          ref={rightColRef}
          className="relative lg:col-span-7"
          style={{ overflow: "hidden" }}   /* contains bg-word & preview strictly within column */
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActive(null)}
        >

          {/* ── z:1  Background word — inside right column only ── */}
          <AnimatePresence mode="wait">
            {activeWord && !reduced && (
              <motion.span
                key={activeWord}
                className="svc-bg-word"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                aria-hidden
              >
                {activeWord}
              </motion.span>
            )}
          </AnimatePresence>

          {/* ── z:2  Preview panel — absolute, right side, desktop only ── */}
          {/*
              width: 40% of right column (~370px on a 1440px viewport).
              Service rows get padding-right: 44% so they never extend beneath this.
              Both previews live here, opacity-switched — no layout shift.
          */}
          <div className="svc-panel" aria-hidden>
            <motion.div
              className="svc-panel-inner"
              animate={
                !reduced
                  ? {
                      x: mouse.x * 8,   /* ±4px max travel */
                      y: mouse.y * 6,   /* ±3px max travel */
                    }
                  : {}
              }
              transition={{ type: "spring", stiffness: 52, damping: 22, mass: 0.8 }}
            >
              <WebsitePreview shown={active === "websites"} />
              <ExperiencePreview shown={active === "experiences"} />
            </motion.div>
          </div>

          {/* ── z:3  Service rows — always above all decorative layers ── */}
          <div className="svc-rows-wrap">
            <div className="border-t border-white/[.1]">
              {SERVICES.map((svc) => (
                <ServiceRow
                  key={svc.key}
                  svc={svc}
                  active={active === svc.key}
                  reduced={!!reduced}
                  onEnter={() => setActive(svc.key)}
                  onLeave={() => setActive(null)}
                  onToggle={() => setActive((p) => (p === svc.key ? null : svc.key))}
                />
              ))}
            </div>

            {/* Mobile CTA */}
            <Link
              href="/contact"
              className="focus-ring mt-8 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d] transition-colors duration-200 hover:text-[#f4f4f2] lg:hidden"
            >
              Explore what we build
              <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
