import { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProjectList } from "@/components/project-list";
import { getPublishedProjects } from "@/lib/projects";
export const metadata:Metadata={title:"Selected work",description:"A selection of digital experiences designed and built by Creovates."};
export default async function WorkPage(){const projects=await getPublishedProjects(); return <main><SiteHeader/><section className="site-grid px-5 pb-20 pt-44 md:px-9 md:pb-32 md:pt-56"><div className="mx-auto max-w-[1600px]"><p className="eyebrow">Selected work</p><h1 className="mt-9 max-w-5xl text-[clamp(4rem,10vw,10rem)] font-medium leading-[.8] tracking-[-.09em]">THE WORK<br/><span className="text-[#8e949d]">SPEAKS.</span></h1><p className="mt-10 max-w-md text-sm leading-6 text-[#8e949d]">Websites and digital experiences made for brands that value the details.</p></div></section><section className="px-5 pb-28 md:px-9 md:pb-40"><div className="mx-auto max-w-[1600px]"><ProjectList projects={projects}/></div></section><SiteFooter/></main>;}
