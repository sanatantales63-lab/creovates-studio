import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Start a Project — Creovates Studio",
  description:
    "Tell us about your project. Share your budget, timeline and goals — we'll come back to you within 24 hours with a tailored proposal.",
  openGraph: {
    title: "Start a Project — Creovates Studio",
    description:
      "Share your project brief with Creovates Studio. Premium websites and digital experiences, built for brands with something to say.",
  },
};

export default function StartProjectPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <SiteHeader />

      {/* J&T-Style Hero Strip */}
      <section className="relative pt-36 pb-14 px-4 md:px-8 lg:px-16 overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 20%, rgba(75, 131, 238, 0.28) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#8e949d] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </div>

          <span className="inline-block border border-[#4b83ee]/40 text-[#4b83ee] rounded-full px-5 py-1.5 text-sm font-medium mb-6">
            Start a Project
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-white">
            Let&apos;s build something{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              extraordinary
            </span>
          </h1>
          <p className="text-[#8e949d] text-base md:text-lg max-w-xl mx-auto mt-5 leading-relaxed">
            Fill in the project brief below — the more detail you share, the
            more tailored our roadmap. We reply within{" "}
            <span className="text-white font-medium">24 hours.</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {["Free Consultation", "No Commitment", "24h Response"].map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#b0b5be] bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4b83ee]" />
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 md:px-8 lg:px-16 py-16 md:py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#101216]/80 border border-white/10 p-6 sm:p-10 md:p-12 animated-highlight-section">
          <LeadForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
