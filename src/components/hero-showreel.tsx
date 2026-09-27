"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  Sparkles,
  ArrowUpRight,
  Globe,
  Bot,
  Zap,
  Layers,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const HERO_PHRASES = [
  {
    text: "We design and build bespoke websites for ambitious brands",
    highlight: "bespoke websites",
  },
  {
    text: "Where bold creativity meets digital engineering",
    highlight: "digital engineering",
  },
  {
    text: "Transforming businesses with AI automation & web craft",
    highlight: "AI automation & web craft",
  },
];

function TypewriterHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const stateRef = useRef<{
    phase: "typing" | "pausing" | "deleting";
    startTime: number;
    idx: number;
  }>({
    phase: "typing",
    startTime: 0,
    idx: 0,
  });

  useEffect(() => {
    let rafId: number;
    stateRef.current.startTime = performance.now();

    const tick = (now: number) => {
      const st = stateRef.current;
      const fullLen = HERO_PHRASES[st.idx].text.length;
      const elapsed = now - st.startTime;

      if (st.phase === "typing") {
        const nextCount = Math.min(fullLen, Math.floor(elapsed / 50));
        setCharCount(nextCount);
        if (nextCount >= fullLen) {
          st.phase = "pausing";
          st.startTime = now;
        }
      } else if (st.phase === "pausing") {
        if (elapsed >= 2400) {
          st.phase = "deleting";
          st.startTime = now;
        }
      } else if (st.phase === "deleting") {
        const remaining = Math.max(0, fullLen - Math.floor(elapsed / 26));
        setCharCount(remaining);
        if (remaining <= 0) {
          st.idx = (st.idx + 1) % HERO_PHRASES.length;
          st.phase = "typing";
          st.startTime = now;
          setPhraseIndex(st.idx);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const current = HERO_PHRASES[phraseIndex];
  const visible = current.text.slice(0, charCount);
  const hlStart = current.text.indexOf(current.highlight);
  const hlEnd = hlStart + current.highlight.length;

  const renderStyledText = () => {
    if (hlStart === -1 || charCount <= hlStart) {
      return <span>{visible}</span>;
    }
    const before = visible.slice(0, hlStart);
    const highlighted = visible.slice(hlStart, Math.min(charCount, hlEnd));
    const after = charCount > hlEnd ? visible.slice(hlEnd) : "";

    return (
      <>
        <span>{before}</span>
        <span className="text-shine-blue italic font-serif font-normal">
          {highlighted}
        </span>
        {after && <span>{after}</span>}
      </>
    );
  };

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6 min-h-[3.3em] sm:min-h-[2.4em] flex items-center justify-center text-white">
      <span>
        {renderStyledText()}
        <span className="inline-block w-[3px] h-[0.85em] bg-[#4b83ee] ml-1.5 align-middle animate-[pulse_0.8s_ease-in-out_infinite] shadow-[0_0_12px_#4b83ee]" />
      </span>
    </h1>
  );
}

const SHOWREEL_SCENES = [
  {
    id: "flagship",
    tag: "01 / BESPOKE ARCHITECTURE",
    title: "Luxury & High-Growth Web Flagships",
    subtitle:
      "Hand-crafted interfaces built in Next.js, TypeScript & WebGL with sub-second page transitions.",
    metricLabel: "Avg. Conversion Lift",
    metricValue: "+184%",
    accent: "#4b83ee",
    badge: "Zero Templates • 100% Custom",
  },
  {
    id: "automation",
    tag: "02 / INTELLIGENT SYSTEMS",
    title: "AI Agents & WhatsApp Lead Flows",
    subtitle:
      "Automated qualification, instant booking, and smart CRM pipelines that capture revenue 24/7.",
    metricLabel: "Lead Response Time",
    metricValue: "< 1.8s",
    accent: "#60a5fa",
    badge: "Automated Revenue Engine",
  },
  {
    id: "interactive",
    tag: "03 / DIGITAL EXPERIENCES",
    title: "Interactive Product Showcases & Motion",
    subtitle:
      "Choreographed scroll storytelling, 3D product reveals, and tactile micro-interactions.",
    metricLabel: "Session Engagement",
    metricValue: "3.4x",
    accent: "#38bdf8",
    badge: "60fps Motion Choreography",
  },
  {
    id: "performance",
    tag: "04 / TECHNICAL DOMINANCE",
    title: "Core Web Vitals & Search Authority",
    subtitle:
      "Engineered for 99+ Lighthouse scores, semantic schema architecture, and global edge delivery.",
    metricLabel: "Lighthouse Performance",
    metricValue: "99 / 100",
    accent: "#4b83ee",
    badge: "Global Edge CDN",
  },
];

export function HeroShowreel() {
  const [activeScene, setActiveScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % SHOWREEL_SCENES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const scene = SHOWREEL_SCENES[activeScene];

  return (
    <>
      {/* HERO SECTION (matches J&T Promotions `_` component) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-36">
        {/* Background Atmospheric Canvas */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full opacity-40"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 28%, rgba(75, 131, 238, 0.32) 0%, rgba(29, 78, 216, 0.12) 38%, transparent 70%),
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 64px 64px, 64px 64px",
            }}
          />
          <div className="absolute inset-0 bg-[#08090b]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090b] via-transparent to-[#08090b]/80" />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-2 text-sm text-white mb-8 backdrop-blur-sm bg-white/5">
              <span className="w-2 h-2 rounded-full bg-[#4b83ee] animate-pulse" />
              Welcome to Creovates Studio
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <TypewriterHeadline />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#b0b5be] text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            We combine architectural design, full-stack engineering, and
            intelligent automation to turn ambitious businesses into category
            leaders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/start-project"
              className="bg-[#4b83ee] hover:bg-[#3b73de] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-blue"
            >
              Start a Project
            </Link>
            <Link
              href="/work"
              className="border border-white/30 hover:border-white/60 text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm"
            >
              Explore Portfolio
            </Link>
            <a
              href="#testimonials"
              className="border border-white/30 hover:border-white/60 text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-200 backdrop-blur-sm inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              Client Stories
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-[#8e949d] text-sm mt-8"
          >
            Trusted by founders &amp; teams worldwide — 100% bespoke design &amp; code.
          </motion.p>
        </div>
      </section>

      {/* OVERLAPPING STUDIO SHOWREEL SECTION (matches J&T Promotions `K` component) */}
      <section className="relative z-20 -mt-28 px-4 md:px-8 lg:px-16 pb-16">
        {/* Sapphire Glow Halo Behind Frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl h-36 bg-gradient-to-b from-[#4b83ee]/80 via-[#4b83ee]/35 to-transparent blur-2xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-[78%] max-w-4xl h-24 rounded-full bg-[#4b83ee]/45 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#101216] aspect-video animated-highlight flex flex-col justify-between p-5 sm:p-8 md:p-10">
            {/* Ambient Interactive Scene Backdrop */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-700"
              style={{
                background: `
                  radial-gradient(circle at 78% 25%, rgba(75, 131, 238, 0.24) 0%, transparent 55%),
                  radial-gradient(circle at 20% 80%, rgba(29, 78, 216, 0.18) 0%, transparent 50%),
                  linear-gradient(160deg, #0b0d12 0%, #10141d 50%, #08090b 100%)
                `,
              }}
            />

            {/* Top Chrome Bar */}
            <div className="relative z-10 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-[#8e949d] bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4b83ee] animate-ping" />
                  creovates.studio/reel-2025
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#b0b5be] bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  {scene.badge}
                </span>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause Showreel" : "Play Showreel"}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#4b83ee] text-white flex items-center justify-center transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Center Scene Stage */}
            <div className="relative z-10 my-auto py-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scene.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.45 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  {/* Left Story Column */}
                  <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
                    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#4b83ee]">
                      <Sparkles className="w-3.5 h-3.5" />
                      {scene.tag}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                      {scene.title}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-[#b0b5be] max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {scene.subtitle}
                    </p>
                    <div className="pt-1 flex flex-wrap items-center gap-3">
                      <Link
                        href="/work"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-[#4b83ee] hover:bg-[#3b73de] px-4 py-2 rounded-full transition-all shadow-blue"
                      >
                        Inspect Live Projects
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <Link
                        href="/start-project"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#b0b5be] hover:text-white px-4 py-2 rounded-full border border-white/15 hover:border-white/35 transition-all"
                      >
                        Book Discovery Call
                      </Link>
                    </div>
                  </div>

                  {/* Right Interactive Visual Telemetry Card */}
                  <div className="hidden lg:block lg:col-span-5">
                    <div className="rounded-2xl bg-[#0b0d12]/90 border border-white/10 p-5 shadow-2xl space-y-4 backdrop-blur-xl">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-[#8e949d] font-mono">
                          {scene.metricLabel}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                          <TrendingUp className="w-3 h-3" /> Verified
                        </span>
                      </div>

                      <div className="text-4xl font-bold text-shine-blue tracking-tight">
                        {scene.metricValue}
                      </div>

                      {/* Mini Live Architecture Bars */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#b0b5be] flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-[#4b83ee]" />
                            Bespoke UI System
                          </span>
                          <span className="text-white font-mono">100%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-[#4b83ee] to-[#93c5fd] rounded-full"
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-[#b0b5be] flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-[#4b83ee]" />
                            Edge Response &amp; SEO
                          </span>
                          <span className="text-white font-mono">99.4%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "96%" }}
                            transition={{ duration: 0.9, delay: 0.1 }}
                            className="h-full bg-gradient-to-r from-[#4b83ee] to-[#60a5fa] rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Scene Selector Scrubber */}
            <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-3 pt-3 border-t border-white/10">
              {SHOWREEL_SCENES.map((item, idx) => {
                const isActive = idx === activeScene;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveScene(idx);
                      setIsPlaying(false);
                    }}
                    className={`text-left p-2 sm:p-2.5 rounded-xl transition-all border ${
                      isActive
                        ? "bg-white/10 border-[#4b83ee]/60"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-[#8e949d] mb-1">
                      <span>0{idx + 1}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4b83ee]" />
                      )}
                    </div>
                    <div className="text-xs font-medium text-white truncate">
                      {item.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
