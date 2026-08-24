import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { requireAdmin } from "@/lib/admin";

export const runtime = "edge";
export default async function AdminPage(){await requireAdmin();return <main className="min-h-screen px-5 py-8 md:px-9"><header className="flex items-center justify-between"><BrandMark/><Link href="/" className="text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d]">View site ↗</Link></header><section className="mx-auto mt-28 max-w-3xl border-t border-white/[.08] pt-6"><p className="eyebrow">Creovates / Admin</p><h1 className="mt-8 text-5xl tracking-[-.07em] md:text-7xl">PROJECT<br/><span className="text-[#8e949d]">CONTROL.</span></h1><p className="mt-8 max-w-md text-sm leading-6 text-[#8e949d]">Connect Supabase authentication and the supplied projects schema to enable secure project publishing and media management.</p><Link href="/admin/projects" className="focus-ring mt-10 inline-block rounded-full bg-[#f4f4f2] px-5 py-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#08090b]">Open project manager ↗</Link></section></main>}
