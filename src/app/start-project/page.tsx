import { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LeadForm } from "@/components/lead-form";
import { ArrowLeft } from "lucide-react";

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
    <main className="min-h-screen bg-[#08090b]">
      <SiteHeader />

      {/* Hero strip */}
      <section className="site-grid border-b border-white/[.07] px-5 pb-14 pt-36 md:px-9 md:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-[#8e949d] transition hover:text-[#f4f4f2]"
          >
            <ArrowLeft size={13} />
            Home
          </Link>

          <div className="mt-2 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">Start a project</p>
              <h1 className="mt-6 text-[clamp(3.2rem,8vw,7.5rem)] font-medium leading-[.84] tracking-[-.085em]">
                LET&apos;S BUILD<br />
                <span className="text-[#8e949d]">SOMETHING</span>
                <br />
                GREAT.
              </h1>
            </div>
            <div className="lg:col-span-5 lg:pb-2">
              <p className="text-sm leading-7 text-[#8e949d] md:text-base md:leading-8">
                Fill in the brief below — the more detail you share, the better
                our response. We&apos;ll review and reply within{" "}
                <span className="text-[#f4f4f2]">24 hours.</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-5 border-t border-white/[.07] pt-5">
                {[
                  "Free Consultation",
                  "No Commitment",
                  "24h Response",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-[.14em] text-[#4b83ee]/70"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-5 py-20 md:px-9 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <LeadForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
