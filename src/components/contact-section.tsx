"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/* ─────────────────────────────────────────────────────────────
   PROJECT TYPE & BUDGET OPTIONS
   ───────────────────────────────────────────────────────────── */
const PROJECT_TYPES = [
  "Website",
  "Landing Page",
  "E-commerce",
  "Digital Experience",
  "Automation",
  "Other",
] as const;

const BUDGET_RANGES = [
  "Under $2k",
  "$2k – $5k",
  "$5k – $10k",
  "$10k+",
] as const;

export function ContactSection() {
  const reduced = useReducedMotion();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brand: "",
    projectType: "Website",
    budget: "$2k – $5k",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please provide your name.";
    if (!formData.email.trim()) {
      errs.email = "Please provide your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      errs.message = "Please tell us what you're building.";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    // Simulate clean dispatch (or forward to mailto / API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-[#08090b] px-5 py-20 md:px-9 md:py-32 border-t border-white/[.08] text-[#f4f4f2] overflow-hidden"
    >
      {/* ── Background Watermark (ultra-subtle) ── */}
      <p
        className="watermark bottom-[-3%] left-[-2%] pointer-events-none select-none opacity-[0.018]"
        aria-hidden
      >
        CREOVATES.
      </p>

      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* ── LEFT (5/12): Emotional Statement + Channel Info + Tagline ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <p className="eyebrow">07 — Let&apos;s begin</p>
            <h2 className="mt-8 text-[clamp(2.8rem,5.5vw,5.6rem)] font-medium leading-[.86] tracking-[-.08em]">
              HAVE A PROJECT<br />
              <span className="text-[#8e949d]">WORTH BUILDING?</span>
            </h2>
            <p className="mt-6 text-sm md:text-base leading-relaxed text-[#8e949d] max-w-sm">
              Tell us what you&apos;re building. We&apos;ll take it from there.
            </p>

            {/* Direct Channel Links */}
            <div className="mt-10 border-t border-white/[.08] pt-6 flex flex-wrap items-center gap-6">
              <a
                href="https://wa.me/918250967250?text=Hi%20Creovates%20Studio%2C%20I%20have%20a%20project%20enquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#8e949d] hover:text-[#f4f4f2] transition-colors"
              >
                WhatsApp <ArrowUpRight size={13} />
              </a>
              <a
                href="mailto:mindverse2000@gmail.com?subject=New%20Project%20Enquiry%20-%20Creovates"
                className="focus-ring inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#8e949d] hover:text-[#f4f4f2] transition-colors"
              >
                Email studio <ArrowUpRight size={13} />
              </a>
              <a
                href="tel:+918250967250"
                className="focus-ring inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#8e949d] hover:text-[#f4f4f2] transition-colors"
              >
                +91 82509 67250 <ArrowUpRight size={13} />
              </a>
            </div>

            {/* Final Brand Statement Signature */}
            <div className="mt-14 hidden lg:block border-t border-white/[.08] pt-8">
              <div className="flex items-baseline select-none">
                <span className="text-xl font-bold tracking-tight text-[#f4f4f2]">CREOVATES</span>
                <span className="text-xl font-bold text-[#4b83ee]">.</span>
              </div>
              <p className="text-xs text-[#8e949d] mt-1 tracking-wide">
                Where Creativity Meets Innovation.
              </p>
            </div>
          </div>

          {/* ── RIGHT (7/12): Premium Enquiry Form ── */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="border border-white/[.08] bg-[#101216]/80 p-8 sm:p-12 rounded-sm"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#4b83ee]" />
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#4b83ee]">
                      Enquiry Sent
                    </p>
                  </div>
                  <h3 className="mt-5 text-3xl sm:text-4xl font-medium tracking-tight text-[#f4f4f2]">
                    THANK YOU.
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[#8e949d] leading-relaxed max-w-md">
                    We&apos;ve received your project details. We&apos;ll review your requirements and get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        brand: "",
                        projectType: "Website",
                        budget: "$2k – $5k",
                        message: "",
                      });
                    }}
                    className="focus-ring mt-8 text-xs font-bold uppercase tracking-[0.14em] text-[#8e949d] hover:text-[#f4f4f2] transition-colors"
                  >
                    Start another enquiry →
                  </button>
                </motion.div>
              ) : (
                <form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  {/* Project Type Segmented Options */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e949d] mb-3">
                      What do you want to build?
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((type) => {
                        const isSelected = formData.projectType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={`focus-ring text-xs font-medium px-4 py-2 rounded-full border transition-all duration-200 ${
                              isSelected
                                ? "border-[#4b83ee] bg-[#4b83ee]/10 text-[#f4f4f2]"
                                : "border-white/[.08] bg-[#101216] text-[#8e949d] hover:border-white/20 hover:text-[#f4f4f2]"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e949d] mb-2"
                      >
                        Name <span className="text-[#4b83ee]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="Your name"
                        className={`w-full bg-[#101216] border rounded-sm px-4 py-3.5 text-sm text-[#f4f4f2] placeholder-[#8e949d]/40 transition-colors focus:outline-none focus:border-[#4b83ee] ${
                          errors.name ? "border-rose-500/80" : "border-white/[.1]"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e949d] mb-2"
                      >
                        Email <span className="text-[#4b83ee]">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        placeholder="you@company.com"
                        className={`w-full bg-[#101216] border rounded-sm px-4 py-3.5 text-sm text-[#f4f4f2] placeholder-[#8e949d]/40 transition-colors focus:outline-none focus:border-[#4b83ee] ${
                          errors.email ? "border-rose-500/80" : "border-white/[.1]"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Business / Brand (Optional) */}
                  <div>
                    <label
                      htmlFor="brand"
                      className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e949d] mb-2"
                    >
                      Business / Brand <span className="text-[#8e949d]/50">(optional)</span>
                    </label>
                    <input
                      id="brand"
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="e.g. Acme Studio"
                      className="w-full bg-[#101216] border border-white/[.1] rounded-sm px-4 py-3.5 text-sm text-[#f4f4f2] placeholder-[#8e949d]/40 transition-colors focus:outline-none focus:border-[#4b83ee]"
                    />
                  </div>

                  {/* Budget Range (Optional Segmented Selector) */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e949d] mb-3">
                      Budget Range <span className="text-[#8e949d]/50">(optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_RANGES.map((b) => {
                        const isSelected = formData.budget === b;
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormData({ ...formData, budget: b })}
                            className={`focus-ring text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all duration-200 ${
                              isSelected
                                ? "border-[#4b83ee] bg-[#4b83ee]/10 text-[#f4f4f2]"
                                : "border-white/[.08] bg-[#101216] text-[#8e949d] hover:border-white/20 hover:text-[#f4f4f2]"
                            }`}
                          >
                            {b}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e949d] mb-2"
                    >
                      Tell us about your project <span className="text-[#4b83ee]">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: "" });
                      }}
                      placeholder="What are your goals, timeline, and key requirements?"
                      className={`w-full bg-[#101216] border rounded-sm px-4 py-3.5 text-sm text-[#f4f4f2] placeholder-[#8e949d]/40 transition-colors focus:outline-none focus:border-[#4b83ee] resize-none ${
                        errors.message ? "border-rose-500/80" : "border-white/[.1]"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="focus-ring group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-[0.14em] transition duration-200 hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                      style={{
                        backgroundColor: "#f4f4f2",
                        color: "#08090b",
                      }}
                    >
                      <span>{status === "submitting" ? "Sending..." : "Start the conversation"}</span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={2.5}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{ color: "#08090b" }}
                      />
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
