"use client";

import Link from "next/link";
import { BrandMark } from "./brand-mark";

const CONTACT_LINKS = [
  { label: "mindverse2000@gmail.com", href: "mailto:mindverse2000@gmail.com" },
  { label: "+91 82509 67250", href: "tel:+918250967250" },
  {
    label: "WhatsApp",
    href: "https://wa.me/918250967250?text=Hi%20Creovates%20Studio%2C%20I%20have%20a%20project%20enquiry",
    external: true,
  },
] as const;

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[.08] bg-[#08090b] px-5 py-10 md:px-9">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left: Wordmark & Tagline */}
        <div>
          <BrandMark />
          <p className="mt-2 text-xs text-[#8e949d]">
            Where Creativity Meets Innovation.
          </p>
        </div>

        {/* Center: Contact Channels */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-6 border-y border-white/[.04] py-4 lg:border-none lg:py-0">
          {CONTACT_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target={"external" in item && item.external ? "_blank" : undefined}
              rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
              className="focus-ring text-[11px] font-bold uppercase tracking-[0.12em] text-[#8e949d] hover:text-[#f4f4f2] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Social Links & Copyright */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5 sm:gap-6">
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

          <p className="text-[11px] uppercase tracking-[0.14em] text-[#8e949d]">
            © {new Date().getFullYear()} CREOVATES.
          </p>
        </div>
      </div>
    </footer>
  );
}
