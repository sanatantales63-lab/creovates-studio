"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "motion/react";
import { ShieldCheck, Zap, Code2, Sparkles } from "lucide-react";

const QUOTE_TEXT =
  "We craft brands, design websites, and drive growth with innovative digital experiences.";
const HIGHLIGHT_PHRASES = ["craft brands", "websites", "digital experiences"];

function isHighlightedIndex(idx: number): boolean {
  for (const phrase of HIGHLIGHT_PHRASES) {
    const start = QUOTE_TEXT.indexOf(phrase);
    if (start !== -1 && idx >= start && idx < start + phrase.length) {
      return true;
    }
  }
  return false;
}

function ScrollChar({
  char,
  progress,
  range,
  highlighted,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlighted: boolean;
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={highlighted ? "text-shine-blue" : "text-white"}
    >
      {char}
    </motion.span>
  );
}

function CountUpStat({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = target / (1800 / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
        {value}
        <span className="text-[#4b83ee]">{suffix}</span>
      </div>
      <div className="text-[#8e949d] text-xs sm:text-sm mt-2">{label}</div>
    </div>
  );
}

export function WhyCreovates() {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: quoteRef,
    offset: ["start 90%", "start 35%"],
  });

  const chars = QUOTE_TEXT.split("");

  return (
    <section id="why-creovates" className="pb-24">
      {/* Full-Width Visual Studio Showcase Banner (matches J&T `ee` top image banner) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-8"
      >
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] overflow-hidden border-y border-white/10 bg-[#0b0e15]">
          {/* Perspective Studio Multi-Screen Composition */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(75, 131, 238, 0.25) 0%, rgba(29, 78, 216, 0.08) 45%, transparent 75%),
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 48px 48px, 48px 48px",
            }}
          />

          {/* Floating Mockup Frames */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex items-center justify-center gap-4 md:gap-8">
            {/* Left Floating Card */}
            <div className="hidden md:flex flex-col justify-between w-64 h-48 rounded-2xl bg-[#101216]/90 border border-white/15 p-5 -rotate-6 translate-y-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#4b83ee]">
                  01 / Architecture
                </span>
                <Code2 className="w-4 h-4 text-[#4b83ee]" />
              </div>
              <div>
                <div className="text-base font-bold text-white">
                  Zero Templates
                </div>
                <p className="text-xs text-[#8e949d] mt-1">
                  Every component hand-engineered in Next.js &amp; TypeScript.
                </p>
              </div>
            </div>

            {/* Center Hero Studio Emblem Card */}
            <div className="flex flex-col justify-between w-80 sm:w-96 h-52 sm:h-60 rounded-2xl bg-gradient-to-br from-[#131824] via-[#101216] to-[#0b0d12] border border-[#4b83ee]/40 p-6 shadow-[0_0_50px_rgba(75,131,238,0.25)] z-20">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#4b83ee] bg-[#4b83ee]/10 border border-[#4b83ee]/30 px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3" /> Creovates Design System
                </span>
                <span className="text-xs font-mono text-[#8e949d]">v4.2</span>
              </div>
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-white">
                  Where Creativity Meets{" "}
                  <span className="text-shine-blue italic">Innovation.</span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-[#b0b5be]">
                  <span>• Bespoke UI/UX</span>
                  <span>• AI Workflows</span>
                  <span>• 99+ Speed</span>
                </div>
              </div>
            </div>

            {/* Right Floating Card */}
            <div className="hidden md:flex flex-col justify-between w-64 h-48 rounded-2xl bg-[#101216]/90 border border-white/15 p-5 rotate-6 translate-y-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                  02 / Performance
                </span>
                <Zap className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-base font-bold text-white">
                  Built to Convert
                </div>
                <p className="text-xs text-[#8e949d] mt-1">
                  Sub-second page loads paired with conversion psychology.
                </p>
              </div>
            </div>
          </div>

          {/* Top & Bottom Smooth Fade Overlays */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#08090b] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#08090b] to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Scroll-Linked Character Reveal Quote + 4-Col Counter Bar (matches J&T `ee`) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block border border-[#4b83ee]/40 text-[#4b83ee] rounded-full px-4 py-1 text-xs font-medium mb-4">
              Why Creovates
            </span>
            <p className="text-[#8e949d] text-base leading-relaxed max-w-xs">
              At Creovates Studio, we blend creativity with technical
              precision to help ambitious brands stand out, capture leads, and
              grow online.
            </p>
          </motion.div>

          {/* Character-by-Character Scroll Opacity Quote */}
          <p
            ref={quoteRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-[1.2] tracking-tight"
          >
            {chars.map((char, i) => {
              const start = i / chars.length;
              const end = Math.min(1, start + 3 / chars.length);
              return (
                <ScrollChar
                  key={i}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                  highlighted={isHighlightedIndex(i)}
                />
              );
            })}
          </p>
        </div>

        {/* 4-Column Animated Highlight Counter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 bg-[#101216] border border-white/10 rounded-2xl p-6 md:p-8 animated-highlight-section"
        >
          <CountUpStat
            target={50}
            suffix="+"
            label="Bespoke Projects Delivered"
          />
          <CountUpStat target={100} suffix="%" label="Custom Hand-Crafted Code" />
          <CountUpStat target={99} suffix="%" label="Client Satisfaction Rate" />
          <CountUpStat
            target={3}
            suffix="x"
            label="Avg. Lead Conversion Lift"
          />
        </motion.div>
      </div>
    </section>
  );
}
