"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/project";

/* ────────────────────────────────────────────────────────────
   IMAGE FRAME
   ──────────────────────────────────────────────────────────── */
function ProjectFrame({
  project,
  aspect = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 66vw, 100vw",
  priority = false,
}: {
  project: Project;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`project-frame relative ${aspect} w-full overflow-hidden rounded-sm bg-[#0d0f11]`}>
      {project.cover_image ? (
        <Image
          src={project.cover_image}
          alt={`${project.title} — Creovates`}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
          sizes={sizes}
        />
      ) : (
        <div className="portfolio-placeholder h-full w-full" />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   PROJECT METADATA BLOCK
   ──────────────────────────────────────────────────────────── */
function ProjectMeta({
  index,
  project,
  linkTarget,
}: {
  index: number;
  project: Project;
  linkTarget: string;
}) {
  const servicesLine =
    Array.isArray(project.services) && project.services.length
      ? project.services.join(" · ")
      : null;

  return (
    <div className="flex flex-col justify-end">
      <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]">
        {String(index + 1).padStart(2, "0")}
      </p>

      <h3 className="mt-2 text-xl font-medium tracking-[-.055em] text-[#f4f4f2] transition-transform duration-300 group-hover:-translate-y-px sm:text-2xl">
        {project.title}
      </h3>

      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[#8e949d]">
        {project.category}
        {project.year ? ` · ${project.year}` : ""}
      </p>

      {servicesLine && (
        <p className="mt-px text-[9px] uppercase tracking-[.1em] text-[#8e949d]/55">
          {servicesLine}
        </p>
      )}

      {project.client && (
        <p className="mt-px text-[9px] uppercase tracking-[.1em] text-[#8e949d]/45">
          {project.client}
        </p>
      )}

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#8e949d]">
        {project.description}
      </p>

      <Link
        href={linkTarget}
        target={linkTarget.startsWith("http") ? "_blank" : undefined}
        rel={linkTarget.startsWith("http") ? "noopener noreferrer" : undefined}
        className="focus-ring group/cta mt-4 inline-flex w-fit items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#f4f4f2] transition-colors duration-200 hover:text-[#4b83ee]"
      >
        View project
        <ArrowUpRight
          size={12}
          className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
        />
      </Link>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   FEATURED PROJECT — full-width dominant
   ──────────────────────────────────────────────────────────── */
function FeaturedProject({ project }: { project: Project }) {
  const ctaHref = project.live_url || `/work/${project.slug}`;
  const isExternal = !!project.live_url;
  const servicesLine =
    Array.isArray(project.services) && project.services.length
      ? project.services.join(" · ")
      : null;

  return (
    <article className="group">
      {/* small eyebrow above the image */}
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]/65">
        01 / Featured
      </p>

      <Link href={`/work/${project.slug}`} className="focus-ring block">
        <ProjectFrame
          project={project}
          aspect="aspect-[16/9] lg:aspect-[21/9]"
          sizes="100vw"
          priority
        />
      </Link>

      {/* metadata row */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:items-end">
        <div>
          <h3 className="text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[.9] tracking-[-.06em] text-[#f4f4f2] transition-transform duration-300 group-hover:-translate-y-px">
            {project.title}
          </h3>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[#8e949d]">
            {project.category}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          {servicesLine && (
            <p className="mt-px text-[9px] uppercase tracking-[.1em] text-[#8e949d]/55">
              {servicesLine}
            </p>
          )}
          {project.client && (
            <p className="mt-1 text-[9px] uppercase tracking-[.1em] text-[#8e949d]/45">
              {project.client}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:items-end sm:text-right">
          <p className="max-w-xs text-sm leading-6 text-[#8e949d]">
            {project.description}
          </p>
          <Link
            href={ctaHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="focus-ring group/cta mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#f4f4f2] transition-colors duration-200 hover:text-[#4b83ee]"
          >
            {isExternal ? "Visit live site" : "View project"}
            <ArrowUpRight
              size={13}
              className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────────────────
   ASYMMETRIC PAIR — 3fr + 2fr columns
   ──────────────────────────────────────────────────────────── */
function AsymmetricPair({
  large,
  small,
  largeIndex,
  smallIndex,
  flipped = false,
}: {
  large: Project;
  small: Project;
  largeIndex: number;
  smallIndex: number;
  flipped?: boolean;
}) {
  const largeCol = (
    <article className="group">
      <Link href={`/work/${large.slug}`} className="focus-ring block">
        <ProjectFrame
          project={large}
          aspect="aspect-[16/11]"
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
      </Link>
      <div className="mt-4">
        <ProjectMeta
          index={largeIndex}
          project={large}
          linkTarget={large.live_url || `/work/${large.slug}`}
        />
      </div>
    </article>
  );

  const smallCol = (
    <article className="group">
      <Link href={`/work/${small.slug}`} className="focus-ring block">
        <ProjectFrame
          project={small}
          aspect="aspect-[4/3]"
          sizes="(min-width: 1024px) 37vw, 100vw"
        />
      </Link>
      <div className="mt-4">
        <ProjectMeta
          index={smallIndex}
          project={small}
          linkTarget={small.live_url || `/work/${small.slug}`}
        />
      </div>
    </article>
  );

  return (
    <div className="grid gap-5 md:gap-6 lg:grid-cols-[3fr_2fr] lg:items-end">
      {flipped ? (
        <>
          <div className="lg:order-2">{largeCol}</div>
          <div className="lg:order-1">{smallCol}</div>
        </>
      ) : (
        <>
          {largeCol}
          {smallCol}
        </>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   COMPACT GRID — overflow projects
   ──────────────────────────────────────────────────────────── */
function ProjectGrid({
  projects,
  startIndex,
}: {
  projects: Project[];
  startIndex: number;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {projects.map((p, i) => (
        <article key={p.id} className="group">
          <Link href={`/work/${p.slug}`} className="focus-ring block">
            <ProjectFrame
              project={p}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
          <div className="mt-4">
            <ProjectMeta
              index={startIndex + i}
              project={p}
              linkTarget={p.live_url || `/work/${p.slug}`}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   EMPTY / DEV STATE
   Renders when no Supabase projects are available.
   Uses RFM Wedding Photography as the real upcoming project.
   Disappears automatically when real Supabase data is present.
   ──────────────────────────────────────────────────────────── */

/* Three browser-chrome dots — communicates "website preview" */
function BrowserDots() {
  return (
    <div className="absolute left-4 top-3.5 z-10 flex items-center gap-1.5 select-none" aria-hidden>
      <span className="h-2 w-2 rounded-full bg-white/[.08]" />
      <span className="h-2 w-2 rounded-full bg-white/[.08]" />
      <span className="h-2 w-2 rounded-full bg-white/[.08]" />
    </div>
  );
}

function PlaceholderFrame({ aspect, showDots = false }: { aspect: string; showDots?: boolean }) {
  return (
    <div className={`placeholder-frame relative ${aspect} w-full overflow-hidden rounded-sm`}>
      {showDots && <BrowserDots />}
      {/* clean dark surface — slightly lighter than page background */}
      <div className="absolute inset-0 bg-[#161a1f]" />
      {/* very faint top border line mimicking a browser tab bar when dots shown */}
      {showDots && (
        <div className="absolute inset-x-0 top-9 h-px bg-white/[.055]" />
      )}
      <p className="absolute bottom-5 left-5 text-[9px] font-semibold uppercase tracking-[.22em] text-[#8e949d]/45 select-none">
        Work being prepared
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="space-y-16 md:space-y-20 lg:space-y-28">

      {/* ── 01 / Featured placeholder ── */}
      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]/70">
          01 / Featured
        </p>

        <PlaceholderFrame aspect="aspect-[16/9] lg:aspect-[21/9]" showDots />

        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:items-end">
          <div>
            {/* Title: fully readable — this is the real project name */}
            <h3 className="text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[.9] tracking-[-.06em] text-[#f4f4f2]">
              RFM Wedding Photography
            </h3>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[#8e949d]/70">
              Wedding Photography · 2026
            </p>
            <p className="mt-px text-[9px] uppercase tracking-[.1em] text-[#8e949d]/50">
              Website · Art Direction · Development
            </p>
          </div>

          <div className="flex flex-col sm:items-end sm:text-right">
            <p className="max-w-xs text-sm leading-6 text-[#8e949d]/60">
              A visual-first website designed around storytelling and enquiries.
            </p>
            {/* Coming soon — intentionally secondary */}
            <span className="mt-4 inline-flex cursor-default select-none items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d]/40">
              Coming soon
              <ArrowUpRight size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* ── 02 + 03 / Asymmetric placeholder pair ── */}
      <div className="grid gap-5 md:gap-6 lg:grid-cols-[3fr_2fr] lg:items-end">
        {/* large */}
        <div>
          <PlaceholderFrame aspect="aspect-[16/11]" showDots />
          <div className="mt-4">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]/55">02</p>
            <p className="mt-2 text-xl font-medium tracking-[-.055em] text-[#f4f4f2]/40">
              Project in preparation
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[#8e949d]/45">
              Work being prepared
            </p>
          </div>
        </div>

        {/* small */}
        <div>
          <PlaceholderFrame aspect="aspect-[4/3]" showDots />
          <div className="mt-4">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]/55">03</p>
            <p className="mt-2 text-xl font-medium tracking-[-.055em] text-[#f4f4f2]/40">
              Project in preparation
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[#8e949d]/45">
              Work being prepared
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   ROOT EXPORT
   ──────────────────────────────────────────────────────────── */
export function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects.length) return <EmptyState />;

  const [first, second, third, ...rest] = projects;

  return (
    <div className="space-y-16 md:space-y-20 lg:space-y-28">

      {/* 01 — dominant featured project */}
      <FeaturedProject project={first} />

      {/* 02 + 03 — asymmetric pair */}
      {second && third && (
        <AsymmetricPair
          large={second}
          small={third}
          largeIndex={1}
          smallIndex={2}
        />
      )}

      {/* 02 solo */}
      {second && !third && (
        <article className="group max-w-3xl">
          <Link href={`/work/${second.slug}`} className="focus-ring block">
            <ProjectFrame
              project={second}
              aspect="aspect-[16/9]"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </Link>
          <div className="mt-4">
            <ProjectMeta
              index={1}
              project={second}
              linkTarget={second.live_url || `/work/${second.slug}`}
            />
          </div>
        </article>
      )}

      {/* 04 + 05 — second asymmetric pair, flipped */}
      {rest.length >= 2 && (
        <AsymmetricPair
          large={rest[0]}
          small={rest[1]}
          largeIndex={3}
          smallIndex={4}
          flipped
        />
      )}

      {/* remaining overflow grid */}
      {rest.length > 2 && (
        <ProjectGrid projects={rest.slice(2)} startIndex={5} />
      )}

      {/* solo fourth project */}
      {rest.length === 1 && (
        <article className="group max-w-3xl">
          <Link href={`/work/${rest[0].slug}`} className="focus-ring block">
            <ProjectFrame
              project={rest[0]}
              aspect="aspect-[16/9]"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </Link>
          <div className="mt-4">
            <ProjectMeta
              index={3}
              project={rest[0]}
              linkTarget={rest[0].live_url || `/work/${rest[0].slug}`}
            />
          </div>
        </article>
      )}

    </div>
  );
}
