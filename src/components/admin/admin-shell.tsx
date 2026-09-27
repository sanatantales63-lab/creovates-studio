"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "./admin-sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#08090b] text-white">{children}</div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#08090b] text-white lg:flex-row overflow-hidden">
      {/* Subtle Ambient Admin Backdrop Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-35"
        style={{
          backgroundImage: `
            radial-gradient(circle at 75% 15%, rgba(75, 131, 238, 0.16) 0%, transparent 55%),
            radial-gradient(circle at 20% 85%, rgba(29, 78, 216, 0.1) 0%, transparent 50%),
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 64px 64px, 64px 64px",
        }}
      />

      <AdminSidebar />

      <main className="relative z-10 flex-1 overflow-x-hidden p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
