import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/admin";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const authed = await isAuthenticatedAdmin();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Website URL is required" }, { status: 400 });
    }

    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = `https://${cleanUrl}`;
    }

    // Call Microlink API to extract metadata and high-res screenshots
    const desktopEndpoint = `https://api.microlink.io/?url=${encodeURIComponent(
      cleanUrl
    )}&screenshot=true&meta=true&viewport.width=1440&viewport.height=810`;

    const mobileEndpoint = `https://api.microlink.io/?url=${encodeURIComponent(
      cleanUrl
    )}&screenshot=true&viewport.isMobile=true&viewport.width=390&viewport.height=693`;

    const [desktopRes, mobileRes] = await Promise.all([
      fetch(desktopEndpoint),
      fetch(mobileEndpoint),
    ]);

    const desktopData = await desktopRes.json();
    const mobileData = await mobileRes.json();

    if (desktopData.status === "fail") {
      return NextResponse.json(
        { error: desktopData.message || "Failed to reach the target website URL" },
        { status: 400 }
      );
    }

    const title =
      desktopData.data?.title?.split("|")[0]?.trim() ||
      desktopData.data?.title?.trim() ||
      "New Showcase Project";

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const description =
      desktopData.data?.description ||
      `A bespoke digital experience crafted for ${title}.`;

    const coverImage = desktopData.data?.screenshot?.url || null;
    const mobileImage = mobileData.data?.screenshot?.url || null;

    return NextResponse.json({
      success: true,
      data: {
        title,
        slug: slug || `project-${Date.now()}`,
        client: title,
        category: "Website & Digital",
        description,
        live_url: cleanUrl,
        year: new Date().getFullYear(),
        cover_image: coverImage,
        mobile_image: mobileImage,
        services: ["Website Design", "Front-End Development", "Digital Experience"],
        featured: false,
        published: true,
        display_order: 0,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error scraping URL";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
