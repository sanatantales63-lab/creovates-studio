"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/918250967250?text=Hi%20Creovates%20Studio%2C%20I%20have%20a%20project%20enquiry";

export function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mx-4 md:mx-8 lg:mx-12 my-8 rounded-3xl overflow-hidden relative animated-highlight-section"
    >
      <div
        className="relative px-8 md:px-16 lg:px-20 py-16 md:py-20 flex items-center justify-between min-h-[280px] md:min-h-[350px]"
        style={{
          background:
            "linear-gradient(135deg, #1d4ed8 0%, #4b83ee 50%, #93c5fd 100%)",
        }}
      >
        {/* Left CTA Copy */}
        <div className="relative z-10 max-w-xl">
          <span className="inline-block bg-[#08090b]/15 text-[#08090b] font-mono text-xs uppercase tracking-widest px-3.5 py-1 rounded-full mb-4 font-semibold">
            Ready to Scale?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#08090b] leading-[1.08] tracking-tight">
            Transform your
            <br />
            Website today!
          </h2>
          <p className="text-[#08090b]/80 text-sm sm:text-base mt-3 max-w-md font-medium">
            Tell us about your project, timeline, or automation goals — we
            respond within 24 hours.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 bg-[#08090b] hover:bg-[#101216] text-white px-8 py-4 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-xl"
            >
              Let&apos;s discuss a project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/25 hover:bg-white/40 text-[#08090b] border border-[#08090b]/15 px-6 py-4 rounded-full text-sm font-semibold transition-all duration-200 backdrop-blur-md"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Right Decorative 3D Geometric Swirl (matches J&T `CTASection`) */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[260px] md:w-[360px] lg:w-[440px] pointer-events-none select-none hidden sm:flex items-center justify-center"
        >
          <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto opacity-90 drop-shadow-2xl"
          >
            <defs>
              <linearGradient
                id="creovatesSwirl1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#08090b" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#1e3a8a" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient
                id="creovatesSwirl2"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#08090b" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <circle
              cx="230"
              cy="200"
              r="145"
              stroke="url(#creovatesSwirl1)"
              strokeWidth="28"
              strokeLinecap="round"
              strokeDasharray="520 200"
            />
            <circle
              cx="230"
              cy="200"
              r="98"
              stroke="url(#creovatesSwirl2)"
              strokeWidth="22"
              strokeLinecap="round"
              strokeDasharray="340 160"
            />
            <circle
              cx="230"
              cy="200"
              r="52"
              fill="#08090b"
              fillOpacity="0.18"
              stroke="#ffffff"
              strokeWidth="2"
              strokeOpacity="0.5"
            />
          </svg>
        </div>
      </div>
    </motion.section>
  );
}
