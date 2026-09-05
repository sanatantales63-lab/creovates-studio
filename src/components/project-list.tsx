"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/project";


/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   PHONE FRAME â€” standing portrait silhouette
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function PhoneFrame({
  project,
  size = "md",
}: {
  project: Project;
  size?: "sm" | "md" | "lg";
}) {
  if (!project.mobile_image) return null;

  const wrapClass =
    size === "lg"
      ? "phone-frame-wrap phone-frame-wrap--lg"
      : size === "sm"
      ? "phone-frame-wrap phone-frame-wrap--sm"
      : "phone-frame-wrap";

  return (
    <div className={wrapClass} aria-hidden>
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <Image
            src={project.mobile_image}
            alt={`${project.title} — mobile view`}
            fill
            unoptimized
            className="object-cover object-top"
            sizes="130px"
          />
        </div>
        <div className="phone-indicator" />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   LAPTOP FRAME — browser chrome wrapper around cover image
   ──────────────────────────────────────────────────────────── */
function LaptopFrame({
  project,
  aspect = "aspect-[16/9]",
  sizes = "(min-width: 1024px) 66vw, 100vw",
  priority = false,
  phoneSize = "md",
}: {
  project: Project;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  phoneSize?: "sm" | "md" | "lg";
}) {
  const wrapClass =
    phoneSize === "lg"
      ? "dual-view-wrap dual-view-wrap--lg"
      : phoneSize === "sm"
      ? "dual-view-wrap dual-view-wrap--sm"
      : "dual-view-wrap";

  return (
    <div className={wrapClass}>
      <div className="laptop-chrome">
        {/* browser chrome bar */}
        <div className="laptop-chrome-bar">
          <span className="laptop-chrome-dot" />
          <span className="laptop-chrome-dot" />
          <span className="laptop-chrome-dot" />
          <span className="laptop-chrome-urlbar" />
        </div>
        {/* screen / image */}
        <div className={`project-frame relative ${aspect} w-full overflow-hidden bg-[#0d0f11]`}>
          {project.cover_image ? (
            <Image
              src={project.cover_image}
              alt={`${project.title} — Creovates`}
              fill
              unoptimized
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              sizes={sizes}
            />
          ) : (
            <div className="portfolio-placeholder h-full w-full" />
          )}
        </div>
      </div>
      {/* phone frame â€” absolute right side */}
      <PhoneFrame project={project} size={phoneSize} />
    </div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   PROJECT METADATA BLOCK
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
      ? project.services.join(" Â· ")
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   FEATURED PROJECT
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function FeaturedProject({ project }: { project: Project }) {
  const ctaHref = project.live_url || `/work/${project.slug}`;
  const isExternal = !!project.live_url;
  const servicesLine =
    Array.isArray(project.services) && project.services.length
      ? project.services.join(" Â· ")
      : null;

  return (
    <article className="group">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]/65">
        01 / Featured
      </p>

      <Link href={`/work/${project.slug}`} className="focus-ring block">
        <LaptopFrame
          project={project}
          aspect="aspect-[16/9] max-h-[640px]"
          sizes="100vw"
          priority
          phoneSize="lg"
        />
      </Link>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:items-end">
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   ASYMMETRIC PAIR
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
        <LaptopFrame
          project={large}
          aspect="aspect-[16/11]"
          sizes="(min-width: 1024px) 58vw, 100vw"
          phoneSize="md"
        />
      </Link>
      <div className="mt-6">
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
        <LaptopFrame
          project={small}
          aspect="aspect-[4/3]"
          sizes="(min-width: 1024px) 37vw, 100vw"
          phoneSize="sm"
        />
      </Link>
      <div className="mt-6">
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   COMPACT GRID â€” overflow projects
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
            <LaptopFrame
              project={p}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              phoneSize="sm"
            />
          </Link>
          <div className="mt-6">
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   EMPTY / DEV STATE
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

function PlaceholderFrame({ aspect }: { aspect: string }) {
  return (
    <div className={`placeholder-frame relative ${aspect} w-full overflow-hidden rounded-sm`}>
      <div className="absolute inset-0 bg-[#161a1f]" />
      <p className="absolute bottom-5 left-5 text-[9px] font-semibold uppercase tracking-[.22em] text-[#8e949d]/45 select-none">
        Work being prepared
      </p>
    </div>
  );
}

function PlaceholderPhone({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const wrapClass =
    size === "lg"
      ? "phone-frame-wrap phone-frame-wrap--lg"
      : size === "sm"
      ? "phone-frame-wrap phone-frame-wrap--sm"
      : "phone-frame-wrap";

  return (
    <div className={wrapClass} aria-hidden>
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen" style={{ background: "#161a1f" }}>
          <div style={{ position:"absolute", bottom:0, left:0, right:0, display:"flex", flexDirection:"column", alignItems:"flex-start", justifyContent:"flex-end", padding:"12px", gap:"6px" }}>
            <div style={{ height:"4px", width:"64px", borderRadius:"2px", background:"rgba(255,255,255,.06)" }} />
            <div style={{ height:"4px", width:"40px", borderRadius:"2px", background:"rgba(255,255,255,.04)" }} />
          </div>
        </div>
        <div className="phone-indicator" />
      </div>
    </div>
  );
}

function LaptopChromePlaceholder({ children, aspect, size = "md" }: { children?: React.ReactNode; aspect: string; size?: "sm" | "md" | "lg" }) {
  const wrapClass =
    size === "lg"
      ? "dual-view-wrap dual-view-wrap--lg"
      : size === "sm"
      ? "dual-view-wrap dual-view-wrap--sm"
      : "dual-view-wrap";
  return (
    <div className={wrapClass}>
      <div className="laptop-chrome">
        <div className="laptop-chrome-bar">
          <span className="laptop-chrome-dot" />
          <span className="laptop-chrome-dot" />
          <span className="laptop-chrome-dot" />
          <span className="laptop-chrome-urlbar" />
        </div>
        <PlaceholderFrame aspect={aspect} />
      </div>
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="space-y-16 md:space-y-20 lg:space-y-28">

      {/* 01 / Featured placeholder */}
      <div>
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]/70">
          01 / Featured
        </p>

        <LaptopChromePlaceholder aspect="aspect-[16/9]" size="lg">
          <PlaceholderPhone size="lg" />
        </LaptopChromePlaceholder>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:items-end">
          <div>
            <h3 className="text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[.9] tracking-[-.06em] text-[#f4f4f2]">
              RFM Wedding Photography
            </h3>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.12em] text-[#8e949d]/70">
              Wedding Photography Â· 2026
            </p>
            <p className="mt-px text-[9px] uppercase tracking-[.1em] text-[#8e949d]/50">
              Website Â· Art Direction Â· Development
            </p>
          </div>
          <div className="flex flex-col sm:items-end sm:text-right">
            <p className="max-w-xs text-sm leading-6 text-[#8e949d]/60">
              A visual-first website designed around storytelling and enquiries.
            </p>
            <span className="mt-4 inline-flex cursor-default select-none items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-[#8e949d]/40">
              Coming soon
              <ArrowUpRight size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* 02 + 03 / Asymmetric placeholder pair */}
      <div className="grid gap-5 md:gap-6 lg:grid-cols-[3fr_2fr] lg:items-end">
        <div>
          <LaptopChromePlaceholder aspect="aspect-[16/11]" size="md">
            <PlaceholderPhone size="md" />
          </LaptopChromePlaceholder>
          <div className="mt-6">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]/55">02</p>
            <p className="mt-2 text-xl font-medium tracking-[-.055em] text-[#f4f4f2]/40">Project in preparation</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[#8e949d]/45">Work being prepared</p>
          </div>
        </div>

        <div>
          <LaptopChromePlaceholder aspect="aspect-[4/3]" size="sm">
            <PlaceholderPhone size="sm" />
          </LaptopChromePlaceholder>
          <div className="mt-6">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#4b83ee]/55">03</p>
            <p className="mt-2 text-xl font-medium tracking-[-.055em] text-[#f4f4f2]/40">Project in preparation</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[#8e949d]/45">Work being prepared</p>
          </div>
        </div>
      </div>

    </div>
  );
}

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   ROOT EXPORT
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export function ProjectList({ projects }: { projects: Project[] }) {
  if (!projects.length) return <EmptyState />;

  const [first, second, third, ...rest] = projects;

  return (
    <div className="space-y-16 md:space-y-20 lg:space-y-28">

      {/* 01 */}
      <FeaturedProject project={first} />

      {/* 02 + 03 */}
      {second && third && (
        <AsymmetricPair large={second} small={third} largeIndex={1} smallIndex={2} />
      )}

      {/* 02 solo */}
      {second && !third && (
        <article className="group max-w-3xl">
          <Link href={`/work/${second.slug}`} className="focus-ring block">
            <LaptopFrame
              project={second}
              aspect="aspect-[16/9]"
              sizes="(min-width: 1024px) 60vw, 100vw"
              phoneSize="md"
            />
          </Link>
          <div className="mt-6">
            <ProjectMeta index={1} project={second} linkTarget={second.live_url || `/work/${second.slug}`} />
          </div>
        </article>
      )}

      {/* 04 + 05 â€” flipped */}
      {rest.length >= 2 && (
        <AsymmetricPair large={rest[0]} small={rest[1]} largeIndex={3} smallIndex={4} flipped />
      )}

      {/* overflow grid */}
      {rest.length > 2 && <ProjectGrid projects={rest.slice(2)} startIndex={5} />}

      {/* solo fourth */}
      {rest.length === 1 && (
        <article className="group max-w-3xl">
          <Link href={`/work/${rest[0].slug}`} className="focus-ring block">
            <LaptopFrame
              project={rest[0]}
              aspect="aspect-[16/9]"
              sizes="(min-width: 1024px) 60vw, 100vw"
              phoneSize="md"
            />
          </Link>
          <div className="mt-6">
            <ProjectMeta index={3} project={rest[0]} linkTarget={rest[0].live_url || `/work/${rest[0].slug}`} />
          </div>
        </article>
      )}

    </div>
  );
}

