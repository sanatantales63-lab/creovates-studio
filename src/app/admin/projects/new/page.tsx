import { AdminEditor } from "@/components/admin-editor";
import { requireAdmin } from "@/lib/admin";

export const runtime = "edge";
export default async function NewProject(){await requireAdmin();return <AdminEditor title="New project" detail="Project creation is unlocked by Supabase authentication and row-level security."/>}
