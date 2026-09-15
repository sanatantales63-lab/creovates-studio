import { requireAdmin } from "@/lib/admin";
import { ProjectTable } from "@/components/admin/project-table";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await requireAdmin();

  return <ProjectTable />;
}
