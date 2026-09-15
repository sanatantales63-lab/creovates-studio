"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/* ─── Constants ─── */
const PROJECT_TYPES = [
  "Website Design",
  "Landing Page",
  "E-commerce Store",
  "Brand Identity",
  "Digital Experience",
  "Web Application",
  "Automation / AI",
  "Other",
];

const TIMELINES = [
  "ASAP (< 2 weeks)",
  "1 Month",
  "2–3 Months",
  "3–6 Months",
  "Flexible",
];

const REFERRAL_SOURCES = [
  "Google Search",
  "Instagram / Social",
  "Word of Mouth",
  "LinkedIn",
  "Advertisement",
  "Other",
];

const INR_BUDGETS = [
  "Under ₹30,000",
  "₹30k – ₹75k",
  "₹75k – ₹1.5L",
  "₹1.5L – ₹3L",
  "₹3L – ₹7L",
  "₹7L+",
];

const USD_BUDGETS = [
  "Under $500",
  "$500 – $1,500",
  "$1.5k – $5k",
  "$5k – $10k",
  "$10k – $25k",
  "$25k+",
];

/* ─── Step indicator ─── */
function StepDot({ step, current, label }: { step: number; current: number; label: string }) {
  const done = step < current;
  const active = step === current;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
          done
            ? "bg-[#4b83ee] text-white"
            : active
            ? "border-2 border-[#4b83ee] bg-transparent text-[#4b83ee]"
            : "border border-white/[.12] bg-transparent text-[#8e949d]/50"
        }`}
      >
        {done ? <CheckCircle2 size={13} /> : step}
      </div>
      <span
        className={`hidden text-[9px] font-bold uppercase tracking-[.12em] sm:block ${
          active ? "text-[#f4f4f2]" : "text-[#8e949d]/50"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Pill selector ─── */
function PillSelect({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: string[];
  value: string | string[];
  onChange: (v: string) => void;
  multi?: boolean;
}) {
  const isSelected = (opt: string) =>
    multi ? (value as string[]).includes(opt) : value === opt;

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200 focus-ring ${
            isSelected(opt)
              ? "border-[#4b83ee] bg-[#4b83ee]/12 text-[#f4f4f2]"
              : "border-white/[.1] bg-white/[.025] text-[#8e949d] hover:border-white/25 hover:text-[#f4f4f2]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ─── Input component ─── */
function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-[.14em] text-[#8e949d]">
        {label}
        {required && <span className="ml-1 text-[#4b83ee]">*</span>}
        {optional && (
          <span className="ml-1.5 font-medium normal-case tracking-normal text-[#8e949d]/45">
            (optional)
          </span>
        )}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[11px] text-rose-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-sm border border-white/[.1] bg-[#0d0f12] px-4 py-3.5 text-sm text-[#f4f4f2] placeholder-[#8e949d]/35 transition-colors focus:border-[#4b83ee] focus:outline-none";
const errorInputClass = "border-rose-500/70";

/* ─── Initial form state ─── */
const INIT = {
  name: "",
  email: "",
  phone: "",
  company: "",
  project_type: "",
  budget_currency: "INR" as "INR" | "USD",
  budget_range: "",
  timeline: "",
  description: "",
  referral_source: "",
  links: "",
};

export function LeadForm() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INIT);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof typeof INIT, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  /* Step validation */
  function validateStep(s: number) {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!form.name.trim()) errs.name = "Please enter your name.";
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        errs.email = "Please enter a valid email address.";
    }
    if (s === 2) {
      if (!form.project_type) errs.project_type = "Please select a project type.";
      if (!form.budget_range) errs.budget_range = "Please select a budget range.";
      if (!form.description.trim()) errs.description = "Please describe your project briefly.";
    }
    return errs;
  }

  function next() {
    const errs = validateStep(step);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep((s) => s + 1);
  }

  function back() {
    setErrors({});
    setStep((s) => s - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep(3);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 28 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -28 }),
  };
  const [dir, setDir] = useState(1);

  function goNext() { setDir(1); next(); }
  function goBack() { setDir(-1); back(); }

  if (status === "success") {
    return (
      <motion.div
        initial={reduced ? {} : { opacity: 0, scale: 0.97 }}
        animate={reduced ? {} : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#4b83ee]/30 bg-[#4b83ee]/10">
          <CheckCircle2 size={28} className="text-[#4b83ee]" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#4b83ee]">
          Brief received
        </p>
        <h2 className="mt-4 text-4xl font-medium tracking-[-.06em] text-[#f4f4f2] md:text-6xl">
          THANK YOU.
        </h2>
        <p className="mt-5 max-w-md text-sm leading-6 text-[#8e949d]">
          We&apos;ve received your project details. Our team will review your
          brief and get back to you within 24 hours.
        </p>
        <div className="mt-10 border-t border-white/[.07] pt-8">
          <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d]/50">
            While you wait
          </p>
          <div className="mt-4 flex gap-6">
            <a
              href="/work"
              className="text-xs font-bold uppercase tracking-[.14em] text-[#8e949d] transition hover:text-[#f4f4f2]"
            >
              View our work →
            </a>
            <a
              href="/"
              className="text-xs font-bold uppercase tracking-[.14em] text-[#8e949d] transition hover:text-[#f4f4f2]"
            >
              Back to home →
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress bar */}
      <div className="mb-12">
        <div className="relative mb-6 flex items-center justify-between">
          {/* connecting line */}
          <div className="absolute left-3.5 right-3.5 top-3.5 h-px bg-white/[.08]" />
          <div
            className="absolute left-3.5 top-3.5 h-px bg-[#4b83ee] transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%`, right: "auto" }}
          />
          <StepDot step={1} current={step} label="About you" />
          <StepDot step={2} current={step} label="Project" />
          <StepDot step={3} current={step} label="Final details" />
        </div>
        <p className="text-center text-[10px] font-bold uppercase tracking-[.15em] text-[#8e949d]/50">
          Step {step} of 3
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <AnimatePresence mode="wait" custom={dir}>
          {/* ── STEP 1 ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={dir}
              variants={reduced ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-medium tracking-[-.06em] text-[#f4f4f2] md:text-4xl">
                  First, tell us<br />
                  <span className="text-[#8e949d]">about yourself.</span>
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#8e949d]">
                  Basic details so we know who we&apos;re talking to.
                </p>
              </div>

              <div className="grid gap-5 pt-4 sm:grid-cols-2">
                <Field label="Full Name" required error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Your full name"
                    className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
                  />
                </Field>
                <Field label="Email Address" required error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@company.com"
                    className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
                  />
                </Field>
                <Field label="Phone Number" optional>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </Field>
                <Field label="Company / Brand" optional>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder="e.g. Acme Studio"
                    className={inputClass}
                  />
                </Field>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={dir}
              variants={reduced ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-medium tracking-[-.06em] text-[#f4f4f2] md:text-4xl">
                  Now, about<br />
                  <span className="text-[#8e949d]">your project.</span>
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#8e949d]">
                  Help us understand the scope and budget.
                </p>
              </div>

              {/* Project type */}
              <Field label="What do you want to build?" required error={errors.project_type}>
                <div className="pt-1">
                  <PillSelect
                    options={PROJECT_TYPES}
                    value={form.project_type}
                    onChange={(v) => set("project_type", v)}
                  />
                </div>
              </Field>

              {/* Budget */}
              <Field label="Budget Range" required error={errors.budget_range}>
                {/* Currency Toggle */}
                <div className="mb-4 inline-flex rounded-full border border-white/[.1] bg-white/[.03] p-1">
                  {(["INR", "USD"] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        set("budget_currency", c);
                        set("budget_range", "");
                      }}
                      className={`rounded-full px-5 py-1.5 text-[11px] font-bold uppercase tracking-[.12em] transition-all duration-200 ${
                        form.budget_currency === c
                          ? "bg-[#f4f4f2] text-[#08090b] shadow"
                          : "text-[#8e949d] hover:text-[#f4f4f2]"
                      }`}
                    >
                      {c === "INR" ? "₹ INR" : "$ USD"}
                    </button>
                  ))}
                </div>
                <PillSelect
                  options={form.budget_currency === "INR" ? INR_BUDGETS : USD_BUDGETS}
                  value={form.budget_range}
                  onChange={(v) => set("budget_range", v)}
                />
              </Field>

              {/* Timeline */}
              <Field label="Expected Timeline" optional>
                <div className="pt-1">
                  <PillSelect
                    options={TIMELINES}
                    value={form.timeline}
                    onChange={(v) => set("timeline", v)}
                  />
                </div>
              </Field>

              {/* Description */}
              <Field label="Tell us about your project" required error={errors.description}>
                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="What are your goals, key features, target audience, and any references you love?"
                  className={`${inputClass} resize-none ${errors.description ? errorInputClass : ""}`}
                />
              </Field>
            </motion.div>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={dir}
              variants={reduced ? {} : variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-medium tracking-[-.06em] text-[#f4f4f2] md:text-4xl">
                  Almost done.<br />
                  <span className="text-[#8e949d]">Final details.</span>
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#8e949d]">
                  A few last things to help us give you a better response.
                </p>
              </div>

              <Field label="How did you find us?" optional>
                <div className="pt-1">
                  <PillSelect
                    options={REFERRAL_SOURCES}
                    value={form.referral_source}
                    onChange={(v) => set("referral_source", v)}
                  />
                </div>
              </Field>

              <Field label="Any links or references?" optional>
                <textarea
                  rows={3}
                  value={form.links}
                  onChange={(e) => set("links", e.target.value)}
                  placeholder="Website URLs, inspiration links, your existing site, Figma link, etc."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* Summary review card */}
              <div className="rounded-sm border border-white/[.07] bg-white/[.02] p-5">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]">
                  Your brief summary
                </p>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
                  {[
                    ["Name", form.name],
                    ["Email", form.email],
                    ["Project Type", form.project_type || "—"],
                    ["Budget", form.budget_range ? `${form.budget_currency === "INR" ? "₹" : "$"} ${form.budget_range}` : "—"],
                    ["Timeline", form.timeline || "Flexible"],
                    ["Company", form.company || "—"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[#8e949d]/60">{k}</dt>
                      <dd className="mt-0.5 font-medium text-[#f4f4f2]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {status === "error" && (
                <p className="rounded-sm border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-400">
                  {errorMsg}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="mt-10 flex items-center justify-between border-t border-white/[.07] pt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="focus-ring inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#8e949d] transition hover:text-[#f4f4f2]"
            >
              <ArrowLeft size={14} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={goNext}
              className="focus-ring group inline-flex items-center gap-3 rounded-full bg-[#f4f4f2] px-7 py-4 text-[11px] font-bold uppercase tracking-[.14em] text-[#08090b] transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(75,131,238,.22)]"
            >
              <span>Continue</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#08090b] transition-transform duration-300 group-hover:rotate-45">
                <ArrowRight size={12} className="text-[#f4f4f2]" />
              </span>
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="focus-ring group inline-flex items-center gap-3 rounded-full bg-[#4b83ee] px-7 py-4 text-[11px] font-bold uppercase tracking-[.14em] text-white transition-all duration-300 hover:bg-[#5e92f3] hover:shadow-[0_0_48px_rgba(75,131,238,.4)] disabled:opacity-60"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Submit Brief</span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-12">
                    <ArrowRight size={12} className="text-white" />
                  </span>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
