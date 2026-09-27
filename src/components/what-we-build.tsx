"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Bot,
  CheckCheck,
  Sparkles,
  TrendingUp,
  Layers,
  Film,
  Search,
  Gauge,
  ArrowUpRight,
} from "lucide-react";

function handleSpotlightMove(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
}

export function WhatWeBuild() {
  return (
    <section id="services" className="py-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading (matches J&T Promotions `Q` component) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block border border-[#4b83ee]/40 text-[#4b83ee] rounded-full px-5 py-1.5 text-sm font-medium mb-6">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            What can we do{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              for you?
            </span>
          </h2>
          <p className="text-[#8e949d] text-base max-w-xl mx-auto mt-4">
            Whether you need a bespoke flagship website, an interactive product
            experience, or intelligent AI &amp; WhatsApp automation, we&apos;ve
            got you covered.
          </p>
        </motion.div>

        {/* TOP ROW: 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* CARD 1: Bespoke Website Design (Blue Gradient + macOS Code Window) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/start-project"
              className="rounded-2xl overflow-hidden relative group min-h-[420px] flex flex-col justify-between p-6 block h-full shadow-blue transition-transform duration-300 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(160deg, #1d4ed8 0%, #4b83ee 50%, #7dd3fc 100%)",
              }}
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold text-[#08090b] leading-tight">
                    Bespoke
                    <br />
                    Website Design
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-[#08090b]/10 flex items-center justify-center text-[#08090b] group-hover:bg-[#08090b] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-[#08090b]/75 text-sm mt-2 font-medium">
                  Custom-coded websites crafted from scratch around your brand
                </p>
              </div>

              {/* macOS Code Editor Preview Window (Exact J&T style) */}
              <div className="mt-6 rounded-t-xl overflow-hidden shadow-2xl -mx-2 -mb-6 transition-transform duration-500 group-hover:translate-y-[-4px]">
                <div className="bg-[#151525] px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[11px] font-mono text-gray-400">
                    flagship.tsx
                  </span>
                </div>
                <div className="bg-[#1b1b30] p-4 font-mono text-xs leading-relaxed text-gray-300 space-y-1">
                  <div>
                    <span className="text-gray-500 select-none mr-3">1</span>
                    <span className="text-purple-400">&lt;header</span>{" "}
                    <span className="text-sky-300">className</span>=
                    <span className="text-amber-300">&quot;hero&quot;</span>
                    <span className="text-purple-400">&gt;</span>
                  </div>
                  <div>
                    <span className="text-gray-500 select-none mr-3">2</span>
                    {"  "}
                    <span className="text-purple-400">&lt;div</span>{" "}
                    <span className="text-sky-300">className</span>=
                    <span className="text-amber-300">
                      &quot;container&quot;
                    </span>
                    <span className="text-purple-400">&gt;</span>
                  </div>
                  <div>
                    <span className="text-gray-500 select-none mr-3">3</span>
                    {"    "}
                    <span className="text-purple-400">&lt;h1&gt;</span>
                    <span className="text-white">Your Brand</span>
                    <span className="text-purple-400">&lt;/h1&gt;</span>
                  </div>
                  <div>
                    <span className="text-gray-500 select-none mr-3">4</span>
                    {"    "}
                    <span className="text-purple-400">&lt;p&gt;</span>
                    <span className="text-gray-400">Built from scratch</span>
                    <span className="text-purple-400">&lt;/p&gt;</span>
                  </div>
                  <div>
                    <span className="text-gray-500 select-none mr-3">5</span>
                    {"    "}
                    <span className="text-purple-400">&lt;CTA</span>{" "}
                    <span className="text-sky-300">label</span>=
                    <span className="text-emerald-300">
                      &quot;Get Started&quot;
                    </span>{" "}
                    <span className="text-purple-400">/&gt;</span>
                  </div>
                  <div>
                    <span className="text-gray-500 select-none mr-3">6</span>
                    {"  "}
                    <span className="text-purple-400">&lt;/div&gt;</span>
                  </div>
                  <div>
                    <span className="text-gray-500 select-none mr-3">7</span>
                    <span className="text-purple-400">&lt;/header&gt;</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* CARD 2: Digital Experiences */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              href="/start-project"
              onMouseMove={handleSpotlightMove}
              className="rounded-2xl bg-[#101216] border border-white/10 overflow-hidden relative group min-h-[420px] flex flex-col justify-between p-6 hover:border-[#4b83ee]/40 transition-all duration-300 spotlight-card animated-highlight-section block h-full"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold leading-tight text-white">
                    <span className="text-shine-blue">Digital</span>
                    <br />
                    Experiences
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#b0b5be] group-hover:border-[#4b83ee] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-[#8e949d] text-sm mt-2">
                  Interactive web apps, custom portals &amp; motion-led product
                  showcases
                </p>
              </div>

              {/* Interactive Product UI Mockup */}
              <div className="mt-6 -mx-6 -mb-6 p-5 bg-[#0b0d12] border-t border-white/10">
                <div className="rounded-xl bg-[#121620] border border-white/10 p-4 space-y-3 group-hover:border-[#4b83ee]/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#4b83ee]/20 border border-[#4b83ee]/40 flex items-center justify-center text-[#4b83ee]">
                        <Layers className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          Interactive Architecture
                        </div>
                        <div className="text-[10px] text-[#8e949d]">
                          Next.js • Motion • 3D Canvas
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      60 FPS
                    </span>
                  </div>

                  {/* Interactive Mini Cards */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2.5">
                      <div className="text-[10px] text-[#8e949d]">
                        Conversion Flow
                      </div>
                      <div className="text-sm font-bold text-white mt-0.5 flex items-center gap-1">
                        +168%
                        <TrendingUp className="w-3 h-3 text-[#4b83ee]" />
                      </div>
                    </div>
                    <div className="rounded-lg bg-white/[0.03] border border-white/5 p-2.5">
                      <div className="text-[10px] text-[#8e949d]">
                        Design System
                      </div>
                      <div className="text-sm font-bold text-[#4b83ee] mt-0.5">
                        Atomic UI
                      </div>
                    </div>
                  </div>

                  {/* Animated Bar */}
                  <div className="pt-1">
                    <div className="flex justify-between text-[10px] text-[#8e949d] mb-1">
                      <span>User Journey Completion</span>
                      <span className="text-white font-mono">94%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[94%] bg-gradient-to-r from-[#4b83ee] to-[#93c5fd] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* CARD 3: AI & WhatsApp Automation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/start-project"
              onMouseMove={handleSpotlightMove}
              className="rounded-2xl bg-[#101216] border border-white/10 overflow-hidden relative group min-h-[420px] flex flex-col justify-between p-6 hover:border-[#4b83ee]/40 transition-all duration-300 spotlight-card animated-highlight-section block h-full"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold leading-tight text-white">
                    AI &amp; WhatsApp
                    <br />
                    <span className="text-shine-blue">Automation</span>
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#b0b5be] group-hover:border-[#4b83ee] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-[#8e949d] text-sm mt-2">
                  24/7 AI lead qualification, instant WhatsApp flows &amp; CRM
                  pipelines
                </p>
              </div>

              {/* Simulated Live AI & WhatsApp Chat Flow */}
              <div className="mt-6 -mx-6 -mb-6 p-5 bg-[#0b0d12] border-t border-white/10 space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5">
                    JD
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 px-3 py-2 text-xs text-[#d4d7dd]">
                    Hi! Looking for a custom website + automated lead booking.
                  </div>
                </div>

                <div className="flex items-start justify-end gap-2.5">
                  <div className="rounded-2xl rounded-tr-sm bg-[#4b83ee]/20 border border-[#4b83ee]/40 px-3 py-2 text-xs text-white max-w-[85%]">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#60a5fa] mb-1">
                      <Bot className="w-3 h-3" /> Creovates AI Agent • 0.8s
                    </div>
                    Qualifying scope &amp; syncing calendar slot for tomorrow at
                    11:00 AM.
                    <div className="flex items-center justify-end gap-1 text-[10px] text-[#93c5fd] mt-1">
                      <span>CRM Synced</span>
                      <CheckCheck className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* BOTTOM ROW: 2-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CARD 4: UGC Ads & Visual Enhancement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/start-project"
              onMouseMove={handleSpotlightMove}
              className="rounded-2xl bg-[#101216] border border-white/10 overflow-hidden relative group min-h-[380px] flex flex-col justify-between p-6 hover:border-[#4b83ee]/40 transition-all duration-300 spotlight-card animated-highlight-section block h-full"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold leading-tight text-white">
                    UGC Ads &amp;
                    <br />
                    <span className="text-shine-blue">Visual Enhancement</span>
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#b0b5be] group-hover:border-[#4b83ee] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-[#8e949d] text-sm mt-2 max-w-md">
                  Scroll-stopping UGC ad creatives, commercial product staging,
                  and visual enhancement engineered to maximize ROAS across
                  paid social.
                </p>
              </div>

              {/* Visual Production Studio Preview */}
              <div className="mt-6 -mx-6 -mb-6 p-6 bg-[#0b0d12] border-t border-white/10">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-[#121620] border border-white/10 p-3.5 group-hover:border-[#4b83ee]/40 transition-colors">
                    <div className="flex items-center justify-between text-xs text-[#8e949d] mb-2">
                      <Film className="w-4 h-4 text-[#4b83ee]" />
                      <span className="font-mono text-[10px]">9:16 REEL</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      UGC Hooks
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">
                      +4.2% CTR
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#121620] border border-white/10 p-3.5 group-hover:border-[#4b83ee]/40 transition-colors">
                    <div className="flex items-center justify-between text-xs text-[#8e949d] mb-2">
                      <Sparkles className="w-4 h-4 text-[#4b83ee]" />
                      <span className="font-mono text-[10px]">4K GRADE</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      Product Retouch
                    </div>
                    <div className="text-[11px] text-[#60a5fa] mt-0.5">
                      Studio Lighting
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#121620] border border-white/10 p-3.5 group-hover:border-[#4b83ee]/40 transition-colors">
                    <div className="flex items-center justify-between text-xs text-[#8e949d] mb-2">
                      <TrendingUp className="w-4 h-4 text-[#4b83ee]" />
                      <span className="font-mono text-[10px]">AD SCALE</span>
                    </div>
                    <div className="text-sm font-bold text-white">
                      3.8x ROAS
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">
                      Verified Lift
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* CARD 5: Performance & SEO Optimisation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/start-project"
              onMouseMove={handleSpotlightMove}
              className="rounded-2xl bg-[#101216] border border-white/10 overflow-hidden relative group min-h-[380px] flex flex-col justify-between p-6 hover:border-[#4b83ee]/40 transition-all duration-300 spotlight-card animated-highlight-section block h-full"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-bold leading-tight text-white">
                    Performance &amp; <span className="text-shine-blue">SEO</span>
                    <br />
                    Optimisation
                  </h3>
                  <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#b0b5be] group-hover:border-[#4b83ee] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
                <p className="text-[#8e949d] text-sm mt-2 max-w-md">
                  Get found on Google and convert more visitors with sub-second
                  load times, semantic schema architecture, and technical SEO
                  built to rank.
                </p>
              </div>

              {/* Lighthouse 100/100 Gauges Preview */}
              <div className="mt-6 -mx-6 -mb-6 p-6 bg-[#0b0d12] border-t border-white/10">
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  {[
                    { label: "Performance", score: "99" },
                    { label: "Accessibility", score: "100" },
                    { label: "Best Practices", score: "100" },
                    { label: "Technical SEO", score: "100" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-[#121620] border border-white/10 p-3 flex flex-col items-center justify-center group-hover:border-[#4b83ee]/40 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full border-2 border-emerald-400/80 bg-emerald-500/10 flex items-center justify-center text-xs font-bold text-emerald-400 mb-1.5 shadow-[0_0_15px_rgba(52,211,153,0.2)]">
                        {item.score}
                      </div>
                      <div className="text-[10px] text-[#b0b5be] truncate w-full">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
