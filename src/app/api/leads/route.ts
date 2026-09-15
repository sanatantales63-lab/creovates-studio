import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, phone, company, project_type, budget_currency, budget_range, timeline, description, referral_source, links } = body;

    if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!project_type?.trim()) return NextResponse.json({ error: "Project type is required" }, { status: 400 });
    if (!budget_range?.trim()) return NextResponse.json({ error: "Budget range is required" }, { status: 400 });
    if (!description?.trim()) return NextResponse.json({ error: "Project description is required" }, { status: 400 });

    const db = getSupabase();
    if (!db) {
      // If Supabase not configured, still return success (graceful degradation)
      console.warn("Supabase not configured — lead not saved");
      return NextResponse.json({ success: true, warning: "not_saved" });
    }

    const { data, error } = await db
      .from("leads")
      .insert([{
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        company: company?.trim() || null,
        project_type: project_type.trim(),
        budget_currency: budget_currency || "INR",
        budget_range: budget_range.trim(),
        timeline: timeline?.trim() || null,
        description: description.trim(),
        referral_source: referral_source?.trim() || null,
        links: links?.trim() || null,
        status: "new",
      }])
      .select()
      .single();

    if (error) {
      console.error("Lead insert error:", error.message);
      return NextResponse.json({ error: "Failed to save enquiry. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
