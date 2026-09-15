import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Reveal } from "@/components/reveal";
import { ProjectList } from "@/components/project-list";
import { getFeaturedProjects } from "@/lib/projects";
import { WhatWeBuildSection } from "@/components/what-we-build";
import { WhyCreovatesSection } from "@/components/why-creovates";
import { ProcessSection } from "@/components/process-section";
import { MoreCapabilitiesSection } from "@/components/more-capabilities";
import { IndustriesSection } from "@/components/industries-section";
import { ContactSection } from "@/components/contact-section";

export default async function Home() {
  const projects = await getFeaturedProjects();
  return <main className="overflow-hidden"><SiteHeader />
    <section className="site-grid relative flex min-h-[100svh] items-center px-5 pb-10 pt-32 md:px-9 md:pb-12 lg:items-end"><p className="watermark bottom-[12%] left-[-2%]">CREOVATES.</p><div className="mx-auto grid w-full max-w-[1600px] gap-10 lg:grid-cols-12 lg:items-end"><div className="relative z-10 lg:col-span-8"><Reveal><p className="eyebrow mb-8">Where Creativity Meets Innovation.</p></Reveal><Reveal delay={.06}><h1 className="max-w-5xl text-[clamp(3.5rem,9vw,9.5rem)] font-medium leading-[.84] tracking-[-.085em]">WE BUILD<br /><span className="text-[#8e949d]">DIGITAL</span> EXPERIENCES.</h1></Reveal><Reveal delay={.14} className="mt-9 flex flex-wrap items-center gap-3"><Button href="/work">View selected work</Button><Button href="/start-project" subtle arrow={false}>Start a project</Button></Reveal></div><Reveal delay={.18} className="relative z-10 lg:col-span-4 lg:pb-2"><p className="max-w-sm text-sm leading-6 text-[#8e949d]">Creovates is a digital studio designing and building premium websites for businesses with something meaningful to say.</p><div className="mt-12 flex items-center justify-between border-t border-white/[.08] pt-4"><p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#8e949d]">Scroll to explore</p><ArrowDown className="text-[#4b83ee]" size={17} /></div></Reveal></div></section>
    <section id="work" className="px-5 py-16 md:px-9 md:py-24"><div className="mx-auto max-w-[1600px]"><div className="mb-8 flex items-center justify-between rule pt-4"><p className="eyebrow">01 — Selected work</p><Link href="/work" className="focus-ring hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d] hover:text-[#f4f4f2] sm:flex">See the archive <ArrowUpRight size={13} /></Link></div><Reveal><p className="mb-10 max-w-xl text-sm leading-6 text-[#8e949d] md:text-base md:leading-7">Form, function, and a point of view — digital work made for brands with something worth building.</p></Reveal><ProjectList projects={projects} /><Link href="/work" className="focus-ring mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d] sm:hidden">See the archive <ArrowUpRight size={13} /></Link></div></section>
    <WhatWeBuildSection />
    <WhyCreovatesSection />
    <ProcessSection />
    <MoreCapabilitiesSection />
    <IndustriesSection projects={projects} />
    <ContactSection />
    <SiteFooter /></main>;
}

