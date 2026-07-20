"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Fade + slide-up on scroll, once. Mirrors the canonical framer-motion
 * useInView pattern used across the site (see CompaniesSection.tsx).
 * prefers-reduced-motion is honoured globally via globals.css.
 */
export default function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
