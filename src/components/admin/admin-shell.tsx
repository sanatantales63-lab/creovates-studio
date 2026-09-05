"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "./admin-sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#08090b] text-[#f4f4f2]">{children}</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#08090b] text-[#f4f4f2] lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
