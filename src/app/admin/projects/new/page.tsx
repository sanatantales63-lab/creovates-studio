import { requireAdmin } from "@/lib/admin";
import { ProjectForm } from "@/components/admin/project-form";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  await requireAdmin();

  return <ProjectForm />;
}
