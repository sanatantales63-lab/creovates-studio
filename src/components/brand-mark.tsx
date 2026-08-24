"use client";

import Link from "next/link";

/**
 * BrandMark — pure CSS wordmark, no JPG clipping.
 * Renders CREOVATES with the blue dot as a separate span.
 * Eliminates the JPG background bleed that caused the white/grey
 * fringe visible against the dark site background.
 */
export function BrandMark({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="focus-ring inline-flex items-baseline" aria-label="Creovates home">
      <span className="wordmark-text select-none">CREOVATES</span>
      <span className="wordmark-dot select-none">.</span>
    </Link>
  );
}
