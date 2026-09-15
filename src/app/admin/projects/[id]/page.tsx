import { requireAdmin } from "@/lib/admin";
import { ProjectForm } from "@/components/admin/project-form";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const runtime = "edge";
export const dynamic = "force-dynamic";

async function getProjectById(id: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const db = createClient(url, key, { auth: { persistSession: false } });
    const { data } = await db.from("projects").select("*").eq("id", id).maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return (
      <div className="rounded-xl border border-white/[.08] bg-[#0d0f12] p-8 text-center">
        <h2 className="text-xl font-medium text-[#f4f4f2]">Project Not Found</h2>
        <p className="mt-2 text-xs text-[#8e949d]">
          The project with ID `${id}` could not be located in your Supabase database.
        </p>
        <Link
          href="/admin/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#4b83ee] px-4 py-2 text-xs font-bold text-white"
        >
          <ArrowLeft size={14} />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  return <ProjectForm initialData={project} isEditing={true} />;
}
