import { SiteHeader } from "@/components/site-header";
import { HeroShowreel } from "@/components/hero-showreel";
import { TestimonialsSection } from "@/components/testimonials-section";
import { WhatWeBuild } from "@/components/what-we-build";
import { WhyCreovates } from "@/components/why-creovates";
import { ProjectList } from "@/components/project-list";
import { ProcessSection } from "@/components/process-section";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { getFeaturedProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <main className="min-h-screen bg-[#08090b] text-white">
      <SiteHeader />
      <HeroShowreel />
      <TestimonialsSection />
      <WhatWeBuild />
      <WhyCreovates />
      <ProjectList projects={projects} />
      <ProcessSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
