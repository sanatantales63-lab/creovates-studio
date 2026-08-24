"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

/**
 * PageLoader — Creovates branded intro.
 *
 * Sequence  (~1.6s total):
 *   0.10s   Letters rise up one-by-one from a mask clip (stagger 0.038s each)
 *   0.85s   Blue "." drops with one soft settle (dot starts as last letters finish)
 *   1.30s   Overlay fades out (0.38s)
 *   ~1.68s  Done — layout visible
 *
 * Hard refresh → layout remounts → loader shows.
 * SPA navigation → layout stays mounted → loader never replays.
 * prefers-reduced-motion → skips entirely.
 */

const CHARS = "CREOVATES".split("");

export function PageLoader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) { setVisible(false); return; }
    const t = setTimeout(() => setVisible(false), 1300);
    return () => clearTimeout(t);
  }, [reduced]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!reduced && <Loader key="loader" />}
    </AnimatePresence>
  );
}

/* ── inner loader ────────────────────────────────────────── */
function Loader() {
  const [dotReady, setDotReady] = useState(false);

  // Dot fires when last letter is finishing (~0.85s)
  useEffect(() => {
    const t = setTimeout(() => setDotReady(true), 820);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.38, ease: [0.4, 0, 1, 1] }}
    >
      <div className="loader-wordmark">
        {/* Letter-by-letter stagger — each rises from a mask clip */}
        <span className="loader-chars" aria-label="Creovates">
          {CHARS.map((char, i) => (
            <span key={i} className="loader-char-mask">
              <motion.span
                className="loader-char"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.52,
                  ease: [0.16, 1, 0.3, 1],   // snappy decelerate — premium feel
                  delay: 0.10 + i * 0.038,
                }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>

        {/* Blue dot — drops in with one soft settle after letters land */}
        <AnimatePresence>
          {dotReady && (
            <motion.span
              key="dot"
              className="loader-dot"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.48,
                ease: [0.34, 1.3, 0.64, 1], // one gentle overshoot — not cartoonish
              }}
            >
              .
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
