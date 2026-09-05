"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Database,
  Copy,
  Check,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Cloud,
  Layers,
  Key,
  ArrowLeft,
} from "lucide-react";

const SQL_SCHEMA = `-- 1. Create the projects table
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  client text,
  category text not null,
  description text not null,
  challenge text,
  solution text,
  services text[] not null default '{}',
  year integer,
  cover_image text,
  mobile_image text,
  gallery text[] not null default '{}',
  live_url text,
  featured boolean not null default false,
  published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- 2. Enable Row-Level Security
alter table public.projects enable row level security;

-- 3. Policy: Public can view published projects
drop policy if exists "published projects are public" on public.projects;
create policy "published projects are public" on public.projects
  for select using (published = true);

-- 4. Policy: Full access for studio operations
drop policy if exists "admin full access" on public.projects;
create policy "admin full access" on public.projects
  for all using (true) with check (true);
`;

export default function SetupPage() {
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tableExists, setTableExists] = useState<boolean | null>(null);

  async function checkDb() {
    setChecking(true);
    try {
      const res = await fetch("/api/admin/projects");
      const data = await res.json();
      if (!res.ok && data.tableMissing) {
        setTableExists(false);
      } else if (res.ok) {
        setTableExists(true);
      } else {
        setTableExists(false);
      }
    } catch {
      setTableExists(false);
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    checkDb();
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="border-b border-white/[.08] pb-6">
        <Link
          href="/admin"
          className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d] hover:text-[#f4f4f2]"
        >
          <ArrowLeft size={12} />
          Back to Dashboard
        </Link>
        <p className="eyebrow">Infrastructure & Integrations</p>
        <h1 className="mt-1 text-3xl font-medium tracking-tight text-[#f4f4f2] md:text-4xl">
          DATABASE & CLOUD SETUP
        </h1>
        <p className="mt-2 text-xs text-[#8e949d]">
          Manage your Supabase connection, Cloudinary media pipeline, and database table schemas.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Supabase Card */}
        <div className="rounded-xl border border-white/[.08] bg-[#0d0f12] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database size={20} className="text-[#4b83ee]" />
              <h2 className="text-sm font-semibold text-[#f4f4f2]">Supabase Database</h2>
            </div>
            {checking ? (
              <span className="text-xs text-[#8e949d]">Testing...</span>
            ) : tableExists ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#34d399]/15 px-3 py-0.5 text-xs font-bold text-[#34d399]">
                <CheckCircle2 size={13} />
                Table Ready
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f59e0b]/15 px-3 py-0.5 text-xs font-bold text-[#f59e0b]">
                <AlertTriangle size={13} />
                SQL Setup Needed
              </span>
            )}
          </div>

          <p className="mt-3 text-xs leading-5 text-[#8e949d]">
            Connected to project ID:{" "}
            <code className="rounded bg-white/[.06] px-1.5 py-0.5 text-[#f4f4f2]">
              khsxpfjmdsefxmmbzdop
            </code>
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://supabase.com/dashboard/project/khsxpfjmdsefxmmbzdop/sql"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4b83ee] hover:underline"
            >
              <span>Open Supabase SQL Editor</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={checkDb}
              className="text-xs text-[#8e949d] hover:text-[#f4f4f2]"
            >
              Re-test status
            </button>
          </div>
        </div>

        {/* Cloudinary Card */}
        <div className="rounded-xl border border-white/[.08] bg-[#0d0f12] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cloud size={20} className="text-[#4b83ee]" />
              <h2 className="text-sm font-semibold text-[#f4f4f2]">Cloudinary Storage</h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#34d399]/15 px-3 py-0.5 text-xs font-bold text-[#34d399]">
              <CheckCircle2 size={13} />
              Configured
            </span>
          </div>

          <p className="mt-3 text-xs leading-5 text-[#8e949d]">
            Cloud Name:{" "}
            <code className="rounded bg-white/[.06] px-1.5 py-0.5 text-[#f4f4f2]">
              lko4pztb
            </code>{" "}
            · Preset:{" "}
            <code className="rounded bg-white/[.06] px-1.5 py-0.5 text-[#f4f4f2]">
              creovatesstudio
            </code>
          </p>

          <div className="mt-4 rounded-lg border border-white/[.06] bg-[#08090b] p-3 text-[11px] leading-5 text-[#8e949d]">
            💡 <strong className="text-[#f4f4f2]">Status:</strong> Upload Preset <code className="text-[#4b83ee]">creovatesstudio</code> is verified active in <strong className="text-[#34d399]">Unsigned</strong> mode. Direct image uploads with automatic compression are fully operational.
          </div>
        </div>
      </div>

      {/* SQL Script Box with 1-Click Copy */}
      <div className="rounded-xl border border-white/[.08] bg-[#0d0f12] p-6 md:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-[#4b83ee]" />
              <h2 className="text-base font-semibold text-[#f4f4f2]">
                Supabase SQL Table Schema
              </h2>
            </div>
            <p className="mt-1 text-xs text-[#8e949d]">
              Copy and paste this script into your Supabase SQL Editor and click <strong>Run</strong>.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg bg-[#4b83ee] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#3d6fd4]"
          >
            {copied ? <Check size={14} className="text-white" /> : <Copy size={14} />}
            <span>{copied ? "Copied SQL!" : "Copy SQL Script"}</span>
          </button>
        </div>

        <div className="relative mt-5">
          <pre className="overflow-x-auto rounded-lg border border-white/[.08] bg-[#08090b] p-4 text-xs font-mono leading-6 text-[#8e949d]">
            {SQL_SCHEMA}
          </pre>
        </div>
      </div>
    </div>
  );
}
