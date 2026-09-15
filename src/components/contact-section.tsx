"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

export function ContactSection() {
  const reduced = useReducedMotion();

  const formUrl =
    (typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL ?? "") + "/start-project";

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[.08] bg-[#08090b] px-5 py-24 text-[#f4f4f2] md:px-9 md:py-40"
    >
      {/* Background watermark */}
      <p
        className="watermark pointer-events-none select-none opacity-[0.016]"
        style={{ bottom: "-4%", left: "-1%" }}
        aria-hidden
      >
        CREOVATES.
      </p>

      {/* Subtle top gradient strip */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent 0%,rgba(75,131,238,.35) 40%,rgba(75,131,238,.55) 55%,rgba(75,131,238,.35) 70%,transparent 100%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          initial={reduced ? {} : { opacity: 0, y: 10 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          07 — Let&apos;s begin
        </motion.p>

        {/* Giant Headline */}
        <motion.h2
          className="mt-8 text-[clamp(3.6rem,10vw,11rem)] font-medium leading-[.82] tracking-[-.085em]"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.06 }}
        >
          HAVE A<br />
          <span className="text-[#8e949d]">PROJECT</span>
          <br />
          WORTH
          <br />
          BUILDING?
        </motion.h2>

        {/* Subtitle + CTA row */}
        <motion.div
          className="mt-14 grid gap-10 md:grid-cols-2 md:items-end"
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.14 }}
        >
          <p className="max-w-md text-base leading-7 text-[#8e949d] md:text-lg md:leading-8">
            Tell us about your idea — budget, timeline, and what you want to
            build. We&apos;ll come back to you within 24 hours.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col gap-5 md:items-end">
            <Link
              href="/start-project"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#f4f4f2] px-8 py-5 text-[11px] font-bold uppercase tracking-[.15em] text-[#08090b] transition-all duration-300 hover:bg-white hover:shadow-[0_0_48px_rgba(75,131,238,.28)] focus-ring"
            >
              <span>Start a project</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#08090b] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={14} className="text-[#f4f4f2]" />
              </span>
            </Link>
            <p className="text-[10px] font-medium uppercase tracking-[.13em] text-[#8e949d]/60">
              Free consultation · No commitment
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mt-20 border-t border-white/[.07]"
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={reduced ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
        />

        {/* Bottom row — contact channels + brand sig */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-between gap-6"
          initial={reduced ? {} : { opacity: 0, y: 8 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.28 }}
        >
          {/* Direct channels */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://wa.me/918250967250?text=Hi%20Creovates%20Studio%2C%20I%20have%20a%20project%20enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.13em] text-[#8e949d] transition-colors hover:text-[#f4f4f2]"
            >
              WhatsApp <ArrowUpRight size={12} />
            </a>
            <a
              href="mailto:mindverse2000@gmail.com?subject=New%20Project%20Enquiry%20-%20Creovates"
              className="focus-ring inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.13em] text-[#8e949d] transition-colors hover:text-[#f4f4f2]"
            >
              Email Studio <ArrowUpRight size={12} />
            </a>
            <a
              href="tel:+918250967250"
              className="focus-ring inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.13em] text-[#8e949d] transition-colors hover:text-[#f4f4f2]"
            >
              +91 82509 67250 <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Brand sig */}
          <div className="select-none">
            <span className="text-base font-bold tracking-tight text-[#f4f4f2]">
              CREOVATES
            </span>
            <span className="text-base font-bold text-[#4b83ee]">.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
