import { requireAdmin } from "@/lib/admin";
import { LeadsTable } from "@/components/admin/leads-table";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await requireAdmin();
  return <LeadsTable />;
}
