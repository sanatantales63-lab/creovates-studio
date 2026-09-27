"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X, Sparkles } from "lucide-react";
import { BrandMark } from "./brand-mark";

interface NavChild {
  label: string;
  href: string;
  desc?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/work" },
  {
    label: "Services",
    href: "/#services",
    children: [
      {
        label: "Bespoke Website Design",
        href: "/#services",
        desc: "Custom-coded, conversion-focused digital flagships",
      },
      {
        label: "Digital Experiences",
        href: "/#services",
        desc: "Interactive web apps, portals & custom platforms",
      },
      {
        label: "AI & WhatsApp Automation",
        href: "/#services",
        desc: "24/7 intelligent lead capture & CRM workflows",
      },
      {
        label: "UGC Ads & Visual Enhancement",
        href: "/#services",
        desc: "High-converting creative production & product visuals",
      },
      {
        label: "Performance & SEO",
        href: "/#services",
        desc: "Sub-second load speeds & technical search dominance",
      },
    ],
  },
  {
    label: "Studio",
    href: "/#why-creovates",
    children: [
      {
        label: "Why Creovates",
        href: "/#why-creovates",
        desc: "Our philosophy, craft & studio standards",
      },
      {
        label: "Our Process",
        href: "/#process",
        desc: "How we take projects from discovery to launch",
      },
      {
        label: "Client Testimonials",
        href: "/#testimonials",
        desc: "What founders and marketing leaders say about us",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08090b]/85 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent pt-4 md:pt-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Original Brand Logo */}
          <BrandMark />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 py-2 ${
                      pathname === item.href
                        ? "text-[#4b83ee]"
                        : "text-[#b0b5be] hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180 text-[#4b83ee]" : ""
                      }`}
                    />
                  </Link>

                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 pt-2 w-72 z-50"
                      >
                        <div className="bg-[#101216]/95 backdrop-blur-2xl border border-white/10 rounded-2xl py-2.5 shadow-2xl">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2.5 hover:bg-white/5 transition-colors duration-150 group"
                            >
                              <div className="text-sm font-medium text-white group-hover:text-[#4b83ee] transition-colors">
                                {child.label}
                              </div>
                              {child.desc && (
                                <div className="text-xs text-[#8e949d] mt-0.5 line-clamp-1">
                                  {child.desc}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-[#4b83ee]"
                      : "text-[#b0b5be] hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right Action Pills */}
          <div className="hidden md:flex items-center gap-3.5">
            <Link
              href="/work"
              className="border border-white/20 text-white hover:border-[#4b83ee] hover:text-[#4b83ee] px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
            >
              View Portfolio
            </Link>
            <Link
              href="/start-project"
              className="bg-[#4b83ee] hover:bg-[#3b73de] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-blue inline-flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Get in Touch
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#101216]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label
                        )
                      }
                      className="flex items-center justify-between w-full text-base font-medium py-2 text-[#b0b5be] hover:text-white transition-colors"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileExpanded === item.label ? "rotate-180 text-[#4b83ee]" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileExpanded === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-1 border-l border-white/10 ml-2 mt-1 overflow-hidden"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block text-sm py-2 text-[#8e949d] hover:text-white transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-base font-medium py-2 ${
                      pathname === item.href ? "text-[#4b83ee]" : "text-[#b0b5be]"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div className="pt-2 flex flex-col gap-3">
                <Link
                  href="/work"
                  onClick={() => setMobileOpen(false)}
                  className="block border border-white/20 text-white text-center px-6 py-3 rounded-full text-sm font-medium"
                >
                  View Portfolio
                </Link>
                <Link
                  href="/start-project"
                  onClick={() => setMobileOpen(false)}
                  className="block bg-[#4b83ee] text-white text-center px-6 py-3 rounded-full text-sm font-medium shadow-blue"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
