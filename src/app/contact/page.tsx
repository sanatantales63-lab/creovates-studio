import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ArrowUpRight, Mail, Phone, MessageSquare, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Start a Project",
  description:
    "Connect with Creovates Studio via WhatsApp, Email, or Phone. Ready to build something premium?",
};

const CONTACT_CHANNELS = [
  {
    title: "Direct WhatsApp",
    value: "+91 82509 67250",
    description: "Instant chat for quick discussions, quotes, and project kickoffs.",
    href: "https://wa.me/918250967250?text=Hi%20Creovates%20Studio%2C%20I%20have%20a%20project%20enquiry",
    action: "Chat on WhatsApp",
    icon: MessageSquare,
    isExternal: true,
    highlight: true,
  },
  {
    title: "Email Studio",
    value: "mindverse2000@gmail.com",
    description: "Send detailed briefs, RFPs, documents, or formal project enquiries.",
    href: "mailto:mindverse2000@gmail.com?subject=New%20Project%20Enquiry%20-%20Creovates",
    action: "Send an Email",
    icon: Mail,
    isExternal: false,
  },
  {
    title: "Phone Call",
    value: "+91 82509 67250",
    description: "Speak directly with our studio lead for immediate consultation.",
    href: "tel:+918250967250",
    action: "Call Studio",
    icon: Phone,
    isExternal: false,
  },
];

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />

      {/* Hero Header */}
      <section className="site-grid px-5 pb-16 pt-40 md:px-9 md:pt-52">
        <div className="mx-auto max-w-[1600px] w-full">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#8e949d] transition-colors hover:text-[#f4f4f2]"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>
          </div>
          <p className="eyebrow">07 — Contact &amp; Enquiries</p>
          <div className="mt-8 grid gap-12 lg:grid-cols-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-[clamp(3.8rem,9vw,8.5rem)] font-medium leading-[.84] tracking-[-.085em]">
                LET&apos;S MAKE<br />
                <span className="text-[#8e949d]">SOMETHING</span><br />
                MATTER.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-3">
              <p className="text-base leading-7 text-[#8e949d]">
                Have an ambitious idea or need a high-performance website? Reach
                out through any channel below or fill out our project brief.
              </p>
            </div>
          </div>

          {/* Direct Contact Cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/[.08] pt-12">
            {CONTACT_CHANNELS.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.title}
                  href={ch.href}
                  target={ch.isExternal ? "_blank" : undefined}
                  rel={ch.isExternal ? "noopener noreferrer" : undefined}
                  className={`group relative flex flex-col justify-between rounded-sm border p-6 md:p-8 transition duration-300 hover:-translate-y-1 ${
                    ch.highlight
                      ? "border-[#4b83ee]/40 bg-[#101216] hover:border-[#4b83ee]"
                      : "border-white/[.08] bg-[#0c0d10] hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[.04] text-[#4b83ee]">
                        <Icon size={16} />
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d]">
                        {ch.title}
                      </span>
                    </div>
                    <p className="mt-6 text-xl font-medium tracking-tight text-[#f4f4f2]">
                      {ch.value}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#8e949d]">
                      {ch.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[.14em] text-[#4b83ee] transition group-hover:text-[#f4f4f2]">
                    <span>{ch.action}</span>
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Start Project CTA banner */}
      <section className="border-t border-white/[.08] px-5 py-20 md:px-9">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]">
              Project Brief
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-.06em] text-[#f4f4f2] md:text-5xl">
              Ready to start?<br />
              <span className="text-[#8e949d]">Fill out our brief.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#8e949d]">
              Share your budget, timeline and what you want to build — we&apos;ll
              come back within 24 hours.
            </p>
          </div>
          <Link
            href="/start-project"
            className="group inline-flex items-center gap-3 rounded-full bg-[#f4f4f2] px-8 py-5 text-[11px] font-bold uppercase tracking-[.15em] text-[#08090b] transition-all duration-300 hover:bg-white hover:shadow-[0_0_48px_rgba(75,131,238,.28)] focus-ring"
          >
            <span>Start the brief</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#08090b] transition-transform duration-300 group-hover:rotate-45">
              <ArrowRight size={14} className="text-[#f4f4f2]" />
            </span>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
