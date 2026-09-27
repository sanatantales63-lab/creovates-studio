"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Globe,
  MessageCircle,
} from "lucide-react";
import { BrandMark } from "./brand-mark";

const WHATSAPP_URL =
  "https://wa.me/918250967250?text=Hi%20Creovates%20Studio%2C%20I%20have%20a%20project%20enquiry";

export function SiteFooter() {
  const [emailInput, setEmailInput] = useState("");
  const router = useRouter();

  const handleQuickStart = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/start-project");
  };

  return (
    <footer className="bg-[#08090b] px-4 md:px-8 lg:px-16 pt-20 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* 3-Column J&T Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16">
          {/* Column 1: Big Statement */}
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#b0b5be]">
              Hello! We&apos;re listening
            </span>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 leading-[1.05] tracking-tight text-white">
              Let&apos;s talk
              <br />
              about
              <br />
              <span className="text-shine-blue">your project</span>
            </h3>
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 text-sm font-medium text-white mt-8 group hover:text-[#4b83ee] transition-colors duration-200"
            >
              Sound good? Let&apos;s connect!
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Column 2: Connect with us + Services */}
          <div className="space-y-8">
            <div>
              <span className="inline-block bg-[#4b83ee] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Connect with us
              </span>
              <div className="space-y-3 mt-2">
                <a
                  href="mailto:mindverse2000@gmail.com"
                  className="flex items-center gap-2.5 text-sm text-[#b0b5be] hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 text-[#4b83ee] flex-shrink-0" />
                  mindverse2000@gmail.com
                </a>
                <a
                  href="tel:+918250967250"
                  className="flex items-center gap-2.5 text-sm text-[#b0b5be] hover:text-white transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-[#4b83ee] flex-shrink-0" />
                  +91 82509 67250
                </a>
                <div className="flex items-start gap-2.5 text-sm text-[#b0b5be]">
                  <MapPin className="w-4 h-4 text-[#4b83ee] flex-shrink-0 mt-0.5" />
                  <span>Digital Studio — Serving Clients Globally</span>
                </div>
              </div>
            </div>

            <div>
              <span className="inline-block bg-[#4b83ee] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                What we build
              </span>
              <ul className="space-y-2 mt-1 text-sm text-[#b0b5be]">
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors"
                  >
                    Bespoke Website Design
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors"
                  >
                    Interactive Digital Experiences
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors"
                  >
                    AI &amp; WhatsApp Automation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#services"
                    className="hover:text-white transition-colors"
                  >
                    UGC Ads &amp; Visual Enhancement
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Follow us + Quick Start Input */}
          <div className="space-y-8">
            <div>
              <span className="inline-block bg-[#4b83ee] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Follow us
              </span>
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-[#4b83ee] hover:bg-[#4b83ee]/10 flex items-center justify-center text-[#b0b5be] hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-[#4b83ee] hover:bg-[#4b83ee]/10 flex items-center justify-center text-[#b0b5be] hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Behance"
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-[#4b83ee] hover:bg-[#4b83ee]/10 flex items-center justify-center text-[#b0b5be] hover:text-white transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-[#25D366] hover:bg-[#25D366]/10 flex items-center justify-center text-[#b0b5be] hover:text-white transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <span className="inline-block bg-[#4b83ee] text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                Start a project brief
              </span>
              <p className="text-xs text-[#8e949d] mb-3">
                Enter your email to jump straight into our interactive project
                planner.
              </p>
              <form
                onSubmit={handleQuickStart}
                className="flex items-center gap-2 mt-2"
              >
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  className="flex-1 bg-[#101216] border border-white/15 rounded-full px-4 py-2.5 text-sm text-white placeholder-[#8e949d] focus:outline-none focus:border-[#4b83ee] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Start project"
                  className="w-10 h-10 rounded-full bg-[#4b83ee] hover:bg-[#3b73de] flex items-center justify-center text-white transition-colors duration-200 flex-shrink-0 shadow-blue"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <BrandMark />
            <div className="hidden sm:flex items-center gap-5 text-xs text-[#8e949d]">
              <Link
                href="/work"
                className="hover:text-white transition-colors duration-200"
              >
                Portfolio
              </Link>
              <Link
                href="/#services"
                className="hover:text-white transition-colors duration-200"
              >
                Services
              </Link>
              <Link
                href="/#process"
                className="hover:text-white transition-colors duration-200"
              >
                Process
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>

          <p className="text-xs text-[#8e949d]">
            &copy; {new Date().getFullYear()} Creovates Studio. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
