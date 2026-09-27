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
    const { data } = await db
      .from("projects")
      .select("*")
      .eq("id", id)
      .maybeSingle();
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
      <div className="rounded-2xl border border-white/10 bg-[#101216] p-10 text-center animated-highlight-section">
        <h2 className="text-2xl font-bold text-white">Project Not Found</h2>
        <p className="mt-2 text-xs sm:text-sm text-[#8e949d]">
          The project with ID `{id}` could not be located in your Supabase
          database.
        </p>
        <Link
          href="/admin/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4b83ee] px-6 py-2.5 text-xs font-semibold text-white shadow-blue hover:bg-[#3b73de] transition"
        >
          <ArrowLeft size={14} />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  return <ProjectForm initialData={project} isEditing={true} />;
}
