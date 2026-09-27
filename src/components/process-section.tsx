"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery",
    desc: "We start by understanding your business, commercial goals, and target audience through a focused strategic consultation.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Our studio crafts a bespoke visual direction, interactive prototype, and editorial architecture tailored to your brand.",
  },
  {
    num: "03",
    title: "Development",
    desc: "We bring the design to life with clean, fast, custom code, motion choreography, and AI/WhatsApp automation integrations.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "After rigorous performance testing and your final sign-off, we deploy globally and support your ongoing growth.",
  },
];

const THRESHOLDS = [0.05, 0.25, 0.45, 0.65];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState(1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let count = 0;
    for (let idx = 0; idx < THRESHOLDS.length; idx++) {
      if (latest >= THRESHOLDS[idx]) count = idx + 1;
    }
    setVisibleSteps(Math.max(1, count));
  });

  return (
    <div
      ref={containerRef}
      id="process"
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Atmospheric Process Backdrop */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 45%, rgba(75, 131, 238, 0.24) 0%, rgba(29, 78, 216, 0.08) 45%, transparent 72%),
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 56px 56px, 56px 56px",
            }}
          />
          <div className="absolute inset-0 bg-[#08090b]/75" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#08090b] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#08090b] to-transparent" />
        </div>

        {/* Top Centered Title (matches J&T `ProcessSection`) */}
        <div className="relative z-10 text-center pt-24 md:pt-28 px-4">
          <span className="inline-block border border-[#4b83ee]/40 text-[#4b83ee] rounded-full px-5 py-1.5 text-sm font-medium mb-5">
            Our Process
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider uppercase">
            <span className="text-shine-blue">PROCESS</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8e949d] mt-3 font-mono uppercase tracking-widest">
            Scroll to reveal each phase ({visibleSteps} / {PROCESS_STEPS.length})
          </p>
        </div>

        {/* Bottom 4-Column Step Reveal Grid */}
        <div className="relative z-10 px-4 md:px-8 lg:px-16 pb-12 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
              {PROCESS_STEPS.map((step, idx) => {
                const isRevealed = idx < visibleSteps;
                return (
                  <div
                    key={step.num}
                    className={`relative lg:px-8 ${
                      idx < PROCESS_STEPS.length - 1
                        ? "lg:border-r lg:border-white/15"
                        : ""
                    } transition-all duration-700 ease-out ${
                      isRevealed
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-24 pointer-events-none"
                    }`}
                  >
                    <span className="text-sm text-[#4b83ee] font-mono font-medium block mb-3">
                      .{step.num}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[#b0b5be] text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
