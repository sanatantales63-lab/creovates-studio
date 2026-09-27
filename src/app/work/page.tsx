import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ProjectList } from "@/components/project-list";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { getPublishedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore bespoke websites, digital products, and AI automation systems crafted by Creovates Studio.",
};

export default async function WorkPage() {
  const projects = await getPublishedProjects();

  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <SiteHeader />

      {/* J&T-style Portfolio Page Hero */}
      <section className="relative pt-36 pb-16 px-4 md:px-8 lg:px-16 overflow-hidden">
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
            Our Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-white">
            Bespoke work built to{" "}
            <span className="text-shine-blue italic font-serif font-normal">
              stand out
            </span>
          </h1>
          <p className="text-[#8e949d] text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
            Every project is designed and engineered from scratch around our
            clients&apos; commercial goals — zero templates, uncompromising
            speed.
          </p>
        </div>
      </section>

      <div className="pb-16">
        <ProjectList projects={projects} hideHeader />
      </div>

      <ContactSection />
      <SiteFooter />
    </main>
  );
}
