import { AdminEditor } from "@/components/admin-editor";
import { requireAdmin } from "@/lib/admin";

export const runtime = "edge";
export default async function EditProject({params}:{params:Promise<{id:string}>}){await requireAdmin();const {id}=await params;return <AdminEditor title="Edit project" detail={`Project ID: ${id}`}/>}
