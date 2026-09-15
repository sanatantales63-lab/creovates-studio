import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAuthenticatedAdmin } from "@/lib/admin";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export const runtime = "edge";

export async function GET() {
  const authed = await isAuthenticatedAdmin();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getSupabase();
  if (!db) {
    return NextResponse.json(
      { error: "Supabase credentials not configured in .env.local" },
      { status: 500 }
    );
  }

  try {
    const { data, error } = await db
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      if (error.code === "PGRST205" || error.message.includes("does not exist") || error.message.includes("not find")) {
        return NextResponse.json(
          {
            error: "Table 'projects' does not exist yet. Please go to Admin > Database Setup to copy and run the SQL schema in your Supabase SQL Editor.",
            tableMissing: true,
          },
          { status: 404 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ projects: data || [] });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const authed = await isAuthenticatedAdmin();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getSupabase();
  if (!db) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();

    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ error: "Project title is required" }, { status: 400 });
    }

    const slug =
      body.slug && body.slug.trim()
        ? body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
        : body.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newProject = {
      title: body.title.trim(),
      slug: slug || `project-${Date.now()}`,
      client: body.client?.trim() || null,
      category: body.category?.trim() || "Web Experience",
      description: body.description?.trim() || "",
      challenge: body.challenge?.trim() || null,
      solution: body.solution?.trim() || null,
      services: Array.isArray(body.services) ? body.services : [],
      year: body.year ? parseInt(body.year, 10) : new Date().getFullYear(),
      cover_image: body.cover_image?.trim() || null,
      mobile_image: body.mobile_image?.trim() || null,
      gallery: Array.isArray(body.gallery) ? body.gallery : [],
      live_url: body.live_url?.trim() || null,
      featured: Boolean(body.featured),
      published: Boolean(body.published),
      display_order: typeof body.display_order === "number" ? body.display_order : 0,
    };

    const { data, error } = await db
      .from("projects")
      .insert([newProject])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ project: data }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create project";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
