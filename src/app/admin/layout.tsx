import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Admin Panel — Creovates Studio",
  description: "Manage projects, media, and digital portfolio for Creovates Studio",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
