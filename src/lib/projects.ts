import { createClient } from "@supabase/supabase-js";
import { Project } from "@/types/project";
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
function client(){ return url && key ? createClient(url,key,{auth:{persistSession:false}}) : null; }
export async function getFeaturedProjects():Promise<Project[]> { const db=client(); if(!db) return []; const {data,error}=await db.from("projects").select("*").eq("published",true).eq("featured",true).order("display_order"); if(error) { console.error("Unable to load featured projects",error.message); return []; } return data as Project[]; }
export async function getPublishedProjects():Promise<Project[]> { const db=client(); if(!db) return []; const {data,error}=await db.from("projects").select("*").eq("published",true).order("display_order"); if(error) { console.error("Unable to load projects",error.message); return []; } return data as Project[]; }
export async function getProject(slug:string):Promise<Project | null> { const db=client(); if(!db) return null; const {data}=await db.from("projects").select("*").eq("slug",slug).eq("published",true).maybeSingle(); return data as Project | null; }
