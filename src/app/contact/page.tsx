import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MessageSquare,
  ArrowLeft,
  Clock,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact & Start a Project",
  description:
    "Connect with Creovates Studio via WhatsApp, Email, or Phone. Ready to build something premium?",
};

const CONTACT_CHANNELS = [
  {
    title: "Direct WhatsApp",
    value: "+91 82509 67250",
    description:
      "Instant chat for quick discussions, project quotes, and kickoffs.",
    href: "https://wa.me/918250967250?text=Hi%20Creovates%20Studio%2C%20I%20have%20a%20project%20enquiry",
    action: "Chat on WhatsApp",
    icon: MessageSquare,
    isExternal: true,
    badge: "Fastest Response",
  },
  {
    title: "Email Studio",
    value: "mindverse2000@gmail.com",
    description:
      "Send detailed briefs, RFPs, documents, or formal project enquiries.",
    href: "mailto:mindverse2000@gmail.com?subject=New%20Project%20Enquiry%20-%20Creovates",
    action: "Send an Email",
    icon: Mail,
    isExternal: false,
    badge: "24h Reply",
  },
  {
    title: "Phone Call",
    value: "+91 82509 67250",
    description:
      "Speak directly with our studio lead for immediate consultation.",
    href: "tel:+918250967250",
    action: "Call Studio",
    icon: Phone,
    isExternal: false,
    badge: "Mon – Sat",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <SiteHeader />

      {/* J&T-Style Contact Hero */}
      <section className="relative pt-36 pb-16 px-4 md:px-8 lg:px-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 25%, rgba(75, 131, 238, 0.3) 0%, transparent 65%)",
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
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
            Let&apos;s start a{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              conversation
            </span>
          </h1>
          <p className="text-[#8e949d] text-base md:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
            Have a project in mind or want to explore how we can elevate your
            digital presence? Reach out directly or complete our project brief.
          </p>
        </div>
      </section>

      {/* 3-Column Animated Highlight Contact Cards */}
      <section className="pb-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACT_CHANNELS.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.title}
                  href={ch.href}
                  target={ch.isExternal ? "_blank" : undefined}
                  rel={ch.isExternal ? "noopener noreferrer" : undefined}
                  className="group rounded-2xl bg-[#101216] border border-white/10 hover:border-[#4b83ee]/50 p-7 transition-all duration-300 hover:-translate-y-1 animated-highlight-section spotlight-card flex flex-col justify-between min-h-[260px]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 flex items-center justify-center text-[#4b83ee]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-[#4b83ee] bg-[#4b83ee]/10 border border-[#4b83ee]/25 px-3 py-1 rounded-full">
                        {ch.badge}
                      </span>
                    </div>

                    <div className="text-xs font-mono uppercase tracking-wider text-[#8e949d]">
                      {ch.title}
                    </div>
                    <div className="text-xl font-bold text-white mt-1.5 break-all">
                      {ch.value}
                    </div>
                    <p className="text-sm text-[#8e949d] mt-3 leading-relaxed">
                      {ch.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-sm font-semibold text-[#4b83ee] group-hover:text-white transition-colors">
                    <span>{ch.action}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* Interactive Brief Banner Card */}
          <div className="mt-10 rounded-2xl bg-[#101216] border border-white/10 p-8 md:p-10 animated-highlight-section flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#4b83ee]">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Project Planner
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Know what you want to build?{" "}
                <span className="text-shine-blue">Start the brief.</span>
              </h2>
              <p className="text-sm text-[#8e949d] leading-relaxed">
                Select your services, budget range, and timeline in 60 seconds —
                we&apos;ll prepare a tailored roadmap and get back to you within
                24 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <div className="hidden sm:flex items-center gap-2 text-xs text-[#8e949d] mr-2">
                <Clock className="w-4 h-4 text-[#4b83ee]" />
                <span>Takes ~1 minute</span>
              </div>
              <Link
                href="/start-project"
                className="bg-[#4b83ee] hover:bg-[#3b73de] text-white px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-blue inline-flex items-center gap-2"
              >
                Open Project Planner
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
    </main>
  );
}
