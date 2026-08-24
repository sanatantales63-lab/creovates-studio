import { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap { const base=process.env.NEXT_PUBLIC_SITE_URL || "https://creovates.com"; return ["","/work","/contact"].map(path=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:"monthly",priority:path===""?1:.8})); }
