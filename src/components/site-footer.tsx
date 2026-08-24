"use client";

import Link from "next/link";
import { BrandMark } from "./brand-mark";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[.08] bg-[#08090b] px-5 py-8 md:px-9">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Left: Wordmark & Tagline */}
        <div>
          <BrandMark />
          <p className="mt-2 text-xs text-[#8e949d]">
            Where Creativity Meets Innovation.
          </p>
        </div>

        {/* Center / Right: Social Links */}
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring text-[11px] font-bold uppercase tracking-[0.14em] text-[#8e949d] hover:text-[#f4f4f2] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Copyright */}
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#8e949d]">
          © {new Date().getFullYear()} CREOVATES.
        </p>
      </div>
    </footer>
  );
}
