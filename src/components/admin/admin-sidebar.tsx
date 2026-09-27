"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FolderGit2,
  PlusCircle,
  Database,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Sparkles,
  Zap,
  Inbox,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Projects",
      href: "/admin/projects",
      icon: FolderGit2,
      active:
        pathname === "/admin/projects" ||
        (pathname.startsWith("/admin/projects/") &&
          pathname !== "/admin/projects/new" &&
          pathname !== "/admin/import"),
    },
    {
      name: "New Project",
      href: "/admin/projects/new",
      icon: PlusCircle,
      active: pathname === "/admin/projects/new",
    },
    {
      name: "URL Auto-Import",
      href: "/admin/import",
      icon: Zap,
      active: pathname === "/admin/import",
    },
    {
      name: "Client Leads",
      href: "/admin/leads",
      icon: Inbox,
      active: pathname === "/admin/leads",
    },
    {
      name: "Database Setup",
      href: "/admin/setup",
      icon: Database,
      active: pathname === "/admin/setup",
    },
  ];

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="relative z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-[#101216]/90 backdrop-blur-xl px-5 lg:hidden">
        <div className="flex items-center gap-3">
          <BrandMark href="/admin" />
          <span className="rounded-full border border-[#4b83ee]/40 bg-[#4b83ee]/15 px-2.5 py-0.5 text-[10px] font-semibold text-[#4b83ee]">
            Admin
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white hover:border-[#4b83ee] transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-68 flex-col justify-between border-r border-white/10 bg-[#101216]/95 backdrop-blur-2xl p-6 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div className="flex flex-col gap-1.5">
              <BrandMark href="/admin" />
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#4b83ee]/35 bg-[#4b83ee]/10 px-3 py-0.5 text-[10px] font-medium text-[#4b83ee]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4b83ee] animate-pulse" />
                Studio Control
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8e949d] hover:text-white lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <p className="mb-1 px-3 text-[11px] font-mono uppercase tracking-widest text-[#8e949d]">
              Workspace
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3 text-xs font-medium transition-all duration-200 ${
                    item.active
                      ? "bg-[#4b83ee] text-white shadow-blue"
                      : "text-[#b0b5be] hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      size={16}
                      className={
                        item.active
                          ? "text-white"
                          : "text-[#8e949d] group-hover:text-[#4b83ee] transition-colors"
                      }
                    />
                    <span>{item.name}</span>
                  </span>
                  {item.active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions Card */}
        <div className="flex flex-col gap-2.5 border-t border-white/10 pt-5">
          <Link
            href="/"
            target="_blank"
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-[#b0b5be] hover:border-[#4b83ee]/50 hover:text-white transition-all"
          >
            <span className="flex items-center gap-2.5">
              <Sparkles size={14} className="text-[#4b83ee]" />
              Live Website
            </span>
            <ExternalLink
              size={12}
              className="text-[#8e949d] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            />
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-2.5 rounded-xl border border-transparent px-4 py-2.5 text-left text-xs font-medium text-[#e05252] transition-all hover:border-[#e05252]/30 hover:bg-[#e05252]/10 disabled:opacity-50"
          >
            <LogOut size={14} />
            <span>{loggingOut ? "Signing out..." : "Sign out"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
