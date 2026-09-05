import { requireAdmin } from "@/lib/admin";
import { UrlImporter } from "@/components/admin/url-importer";

export const dynamic = "force-dynamic";

export default async function AdminImportPage() {
  await requireAdmin();

  return <UrlImporter />;
}
