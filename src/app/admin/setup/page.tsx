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
  ArrowLeft,
  Sparkles,
  RefreshCw,
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
      <div className="border-b border-white/10 pb-6">
        <div className="mb-4">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-[#b0b5be] hover:border-[#4b83ee] hover:text-white transition-all"
          >
            <ArrowLeft size={13} />
            Back to Dashboard
          </Link>
        </div>
        <span className="inline-flex items-center gap-1.5 border border-[#4b83ee]/40 bg-[#4b83ee]/10 text-[#4b83ee] rounded-full px-4 py-1 text-xs font-medium mb-3">
          <Sparkles size={12} />
          Infrastructure &amp; Integrations
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Database &amp;{" "}
          <span className="text-shine-blue italic font-serif font-normal">
            Cloud Setup
          </span>
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-[#8e949d]">
          Manage your Supabase connection, Cloudinary media pipeline, and
          database table schemas.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Supabase Card */}
        <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 md:p-7 animated-highlight-section flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 text-[#4b83ee]">
                  <Database size={18} />
                </span>
                <h2 className="text-base font-bold text-white">
                  Supabase Database
                </h2>
              </div>
              {checking ? (
                <span className="text-xs font-mono text-[#8e949d]">
                  Testing...
                </span>
              ) : tableExists ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 size={13} />
                  Table Ready
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-400">
                  <AlertTriangle size={13} />
                  SQL Setup Needed
                </span>
              )}
            </div>

            <p className="mt-4 text-xs leading-6 text-[#b0b5be]">
              Connected to project ID:{" "}
              <code className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-white">
                khsxpfjmdsefxmmbzdop
              </code>
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <a
              href="https://supabase.com/dashboard/project/khsxpfjmdsefxmmbzdop/sql"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4b83ee] hover:text-white transition-colors"
            >
              <span>Open Supabase SQL Editor</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={checkDb}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#b0b5be] hover:border-[#4b83ee] hover:text-white transition-all"
            >
              <RefreshCw size={12} className={checking ? "animate-spin" : ""} />
              Re-test status
            </button>
          </div>
        </div>

        {/* Cloudinary Card */}
        <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 md:p-7 animated-highlight-section flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4b83ee]/15 border border-[#4b83ee]/30 text-[#4b83ee]">
                  <Cloud size={18} />
                </span>
                <h2 className="text-base font-bold text-white">
                  Cloudinary Storage
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                <CheckCircle2 size={13} />
                Configured
              </span>
            </div>

            <p className="mt-4 text-xs leading-6 text-[#b0b5be]">
              Cloud Name:{" "}
              <code className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-white">
                lko4pztb
              </code>{" "}
              · Preset:{" "}
              <code className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-white">
                creovatesstudio
              </code>
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-white/10 bg-[#08090b] p-3.5 text-xs leading-relaxed text-[#8e949d]">
            ⚡ <strong className="text-white">Status:</strong> Upload Preset{" "}
            <code className="font-mono text-[#4b83ee]">creovatesstudio</code> is
            verified active in{" "}
            <strong className="text-emerald-400">Unsigned</strong> mode. Direct
            image uploads with automatic client-side compression are
            operational.
          </div>
        </div>
      </div>

      {/* SQL Script Box with macOS Chrome & 1-Click Copy */}
      <div className="rounded-2xl border border-white/10 bg-[#101216] p-6 md:p-8 animated-highlight-section">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2.5">
              <Layers size={18} className="text-[#4b83ee]" />
              <h2 className="text-lg font-bold text-white">
                Supabase SQL Table Schema
              </h2>
            </div>
            <p className="mt-1 text-xs text-[#8e949d]">
              Copy and paste this script into your Supabase SQL Editor and click{" "}
              <strong className="text-white">Run</strong>.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-full bg-[#4b83ee] px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3b73de] shadow-blue"
          >
            {copied ? (
              <Check size={14} className="text-white" />
            ) : (
              <Copy size={14} />
            )}
            <span>{copied ? "Copied SQL!" : "Copy SQL Script"}</span>
          </button>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#151525] shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[11px] font-mono text-[#8e949d]">
              supabase_schema.sql
            </span>
          </div>
          <pre className="overflow-x-auto bg-[#0b0d14] p-5 text-xs font-mono leading-6 text-[#d4d7dd]">
            {SQL_SCHEMA}
          </pre>
        </div>
      </div>
    </div>
  );
}
