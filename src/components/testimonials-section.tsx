"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Star,
  Quote,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  service: string;
  metric: string;
  quote: string;
  initials: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    name: "Aarav Mehta",
    role: "Founder & CEO",
    company: "Veloce Luxury",
    service: "Bespoke Website",
    metric: "+210% Qualified Leads",
    quote:
      "Creovates completely transformed our digital presence. Within weeks of launching our new bespoke site, inbound inquiries more than doubled and clients constantly compliment the motion and speed.",
    initials: "AM",
  },
  {
    id: "2",
    name: "Sophia Jenkins",
    role: "Head of Growth",
    company: "Aether Aesthetics",
    service: "Web + AI Automation",
    metric: "24/7 Automated Booking",
    quote:
      "Combining our website redesign with their WhatsApp AI automation was the best investment we made this year. Leads are qualified and booked automatically while our team sleeps.",
    initials: "SJ",
  },
  {
    id: "3",
    name: "Rohan Kapoor",
    role: "Managing Director",
    company: "Kinetix Architecture",
    service: "Digital Experience",
    metric: "99/100 Speed Score",
    quote:
      "Unlike agencies that force you into clunky templates, Creovates engineered everything from the ground up. The editorial layout and scroll choreography feel truly world-class.",
    initials: "RK",
  },
  {
    id: "4",
    name: "Elena Rostova",
    role: "Creative Director",
    company: "Lumina Studio",
    service: "UGC Ads & Web",
    metric: "3.8x ROAS Lift",
    quote:
      "Their attention to visual craft is unmatched. Both our high-converting landing pages and product ad creatives look like they belong to a Fortune 500 brand.",
    initials: "ER",
  },
  {
    id: "5",
    name: "Marcus Vance",
    role: "Co-Founder",
    company: "NexaCloud SaaS",
    service: "Web Application",
    metric: "-64% Bounce Rate",
    quote:
      "Fast, communicative, and deeply technical. They took our complex SaaS positioning and distilled it into an interactive story that converts enterprise buyers effortlessly.",
    initials: "MV",
  },
  {
    id: "6",
    name: "Priya Nair",
    role: "Brand Partner",
    company: "Solstice Hospitality",
    service: "Bespoke Flagship",
    metric: "+145% Direct Bookings",
    quote:
      "Every detail—from typography to how the imagery reveals on scroll—was thoughtfully considered. Creovates delivered on time and exceeded every expectation.",
    initials: "PN",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(4);

  useEffect(() => {
    const updatePerView = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(4);
    };
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - cardsPerView);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, handleNext]);

  const visibleTestimonials = TESTIMONIALS.slice(
    currentIndex,
    currentIndex + cardsPerView
  );

  return (
    <section
      id="testimonials"
      className="py-24 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block border border-[#4b83ee]/40 text-[#4b83ee] rounded-full px-5 py-1.5 text-sm font-medium mb-6">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Hear it from{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              our clients
            </span>
          </h2>
          <p className="text-[#8e949d] text-base max-w-xl mx-auto mt-4">
            Real stories from founders and marketing leaders — see how we helped
            transform their digital presence and accelerate growth.
          </p>
        </motion.div>

        {/* Carousel Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleTestimonials.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="animated-highlight-section spotlight-card rounded-2xl overflow-hidden bg-[#101216] border border-white/10 hover:border-[#4b83ee]/40 transition-all duration-300 p-6 flex flex-col justify-between min-h-[340px]"
              >
                <div>
                  {/* Top Row: Stars & Service Pill */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-0.5 text-[#4b83ee]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#4b83ee] text-[#4b83ee]"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-[#b0b5be] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                      {item.service}
                    </span>
                  </div>

                  {/* Metric Highlight Badge */}
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#4b83ee]/15 border border-[#4b83ee]/30 px-3 py-1 rounded-full mb-4">
                    <Sparkles className="w-3 h-3 text-[#4b83ee]" />
                    {item.metric}
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-[#d4d7dd] leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Footer */}
                <div className="flex items-center justify-between pt-5 mt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4b83ee] to-[#1d4ed8] flex items-center justify-center text-white font-semibold text-xs shadow-blue">
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {item.name}
                      </div>
                      <div className="text-xs text-[#8e949d]">
                        {item.role}, {item.company}
                      </div>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-[#4b83ee]/30 shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Carousel Controls (matches J&T Promotions `I` component) */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => {
                setAutoPlay(false);
                handlePrev();
              }}
              aria-label="Previous testimonials"
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#4b83ee] flex items-center justify-center text-[#b0b5be] hover:text-white transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setAutoPlay(false);
                    setCurrentIndex(idx);
                  }}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-6 bg-[#4b83ee]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setAutoPlay(false);
                handleNext();
              }}
              aria-label="Next testimonials"
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#4b83ee] flex items-center justify-center text-[#b0b5be] hover:text-white transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => setAutoPlay(!autoPlay)}
              aria-label={autoPlay ? "Pause auto-scroll" : "Resume auto-scroll"}
              title={autoPlay ? "Pause auto-scroll" : "Resume auto-scroll"}
              className="w-10 h-10 rounded-full border border-white/15 hover:border-[#4b83ee] flex items-center justify-center text-[#b0b5be] hover:text-white transition-all duration-200"
            >
              {autoPlay ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
            </button>
          </div>
        </div>

        {/* Verified Client Reviews Highlight Strip (matches J&T `P` component) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-16 animated-highlight-section rounded-3xl p-6 md:p-10 bg-[#101216] border border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center">
                <div className="text-2xl font-bold text-white flex items-center gap-1.5">
                  5.0
                  <Star className="w-5 h-5 fill-[#4b83ee] text-[#4b83ee]" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#8e949d]">
                  Client Rating
                </span>
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-semibold text-lg">
                  <span>Rated Excellent by Ambition-Driven Founders</span>
                  <CheckCircle2 className="w-4 h-4 text-[#4b83ee]" />
                </div>
                <p className="text-sm text-[#8e949d] mt-1">
                  100% bespoke delivery across web engineering, brand systems,
                  and AI automation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/start-project"
                className="bg-[#4b83ee] hover:bg-[#3b73de] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 shadow-blue"
              >
                Start Your Project
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
