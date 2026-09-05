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
      active: pathname === "/admin/projects" || (pathname.startsWith("/admin/projects/") && pathname !== "/admin/projects/new" && pathname !== "/admin/import"),
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
      <div className="flex h-16 w-full items-center justify-between border-b border-white/[.08] bg-[#0d0f12] px-5 lg:hidden">
        <div className="flex items-center gap-3">
          <BrandMark />
          <span className="rounded bg-[#4b83ee]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4b83ee]">
            Admin
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[.1] text-[#f4f4f2]"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-white/[.08] bg-[#0a0c0f] p-6 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          {/* Brand Header */}
          <div className="flex items-center justify-between border-b border-white/[.08] pb-5">
            <div className="flex items-center gap-3">
              <BrandMark />
              <span className="rounded-full bg-[#4b83ee]/15 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#4b83ee]">
                Control
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#8e949d] hover:text-[#f4f4f2] lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[.18em] text-[#8e949d]/50">
              Workspace
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-medium transition-all ${
                    item.active
                      ? "bg-[#4b83ee]/10 text-[#4b83ee] shadow-sm"
                      : "text-[#8e949d] hover:bg-white/[.03] hover:text-[#f4f4f2]"
                  }`}
                >
                  <Icon
                    size={16}
                    className={
                      item.active
                        ? "text-[#4b83ee]"
                        : "text-[#8e949d] group-hover:text-[#f4f4f2]"
                    }
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-2 border-t border-white/[.08] pt-4">
          <Link
            href="/"
            target="_blank"
            className="group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[#8e949d] hover:bg-white/[.03] hover:text-[#f4f4f2]"
          >
            <span className="flex items-center gap-2.5">
              <Sparkles size={14} className="text-[#4b83ee]" />
              Live Website
            </span>
            <ExternalLink
              size={12}
              className="text-[#8e949d] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#e05252] transition-colors hover:bg-[#e05252]/10 disabled:opacity-50"
          >
            <LogOut size={14} />
            <span>{loggingOut ? "Signing out..." : "Sign out"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
