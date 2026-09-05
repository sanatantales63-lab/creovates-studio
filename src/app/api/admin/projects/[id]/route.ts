import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAuthenticatedAdmin } from "@/lib/admin";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticatedAdmin();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const db = getSupabase();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const { data, error } = await db.from("projects").select("*").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  return NextResponse.json({ project: data });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticatedAdmin();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const db = getSupabase();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  try {
    const body = await req.json();

    const updateData: Record<string, unknown> = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.slug !== undefined) {
      updateData.slug = body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    if (body.client !== undefined) updateData.client = body.client?.trim() || null;
    if (body.category !== undefined) updateData.category = body.category.trim();
    if (body.description !== undefined) updateData.description = body.description.trim();
    if (body.challenge !== undefined) updateData.challenge = body.challenge?.trim() || null;
    if (body.solution !== undefined) updateData.solution = body.solution?.trim() || null;
    if (body.services !== undefined) updateData.services = Array.isArray(body.services) ? body.services : [];
    if (body.year !== undefined) updateData.year = body.year ? parseInt(body.year, 10) : null;
    if (body.cover_image !== undefined) updateData.cover_image = body.cover_image?.trim() || null;
    if (body.mobile_image !== undefined) updateData.mobile_image = body.mobile_image?.trim() || null;
    if (body.gallery !== undefined) updateData.gallery = Array.isArray(body.gallery) ? body.gallery : [];
    if (body.live_url !== undefined) updateData.live_url = body.live_url?.trim() || null;
    if (body.featured !== undefined) updateData.featured = Boolean(body.featured);
    if (body.published !== undefined) updateData.published = Boolean(body.published);
    if (body.display_order !== undefined) updateData.display_order = parseInt(body.display_order, 10) || 0;

    const { data, error } = await db
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ project: data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to update project";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticatedAdmin();
  if (!authed) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await context.params;
  const db = getSupabase();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const { error } = await db.from("projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
