"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  duration?: number;
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
  /** "reveal" (default) — trigger-once blur removal on scroll into view.
   *  "scroll-blur" — scroll-driven progressive blur reduction per word. */
  mode?: "reveal" | "scroll-blur";
}

/**
 * Scroll-driven blur: each word starts blurred and progressively
 * resolves as the element scrolls through the viewport.
 * Works bidirectionally — blur returns on scroll up.
 */
function ScrollBlurReveal({
  words,
  className,
  staggerDelay = 0.04,
}: {
  words: string[];
  className?: string;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: ref,
    // Animation triggers when the element is between 90% and 20% of the viewport height.
    offset: ["start 0.9", "start 0.2"],
  });

  // Apply spring physics to smooth out scroll ticks and achieve a slow-motion fluid transition
  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 60,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <span ref={ref} className={cn("", className)}>
      {words.map((word, idx) => {
        const totalWords = words.length;
        const maxStart = 0.55; // Last word starts revealing when scroll reaches 55%
        const wordDuration = 0.4; // Each word transitions over 40% of the scroll length
        
        const start = totalWords > 1 ? (idx / (totalWords - 1)) * maxStart : 0;
        const end = start + wordDuration;

        const blur = useTransform(
          scrollYProgress,
          [start, end],
          ["blur(8px)", "blur(0px)"]
        );
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

        return (
          <motion.span
            key={idx}
            className="inline-block"
            style={{ filter: blur as unknown as string, opacity }}
          >
            {word}
            {idx < words.length - 1 && <span>&nbsp;</span>}
          </motion.span>
        );
      })}
    </span>
  );
}

/**
 * Standard reveal: words animate from blurred → clear in a staggered
 * sequence triggered once when the element enters the viewport.
 */
function RevealText({
  words,
  className,
  duration,
  staggerDelay,
  initialDelay,
  once,
}: {
  words: string[];
  className?: string;
  duration: number;
  staggerDelay: number;
  initialDelay: number;
  once: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <span ref={ref} className={cn("", className)}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)" }
              : { opacity: 0, filter: "blur(8px)" }
          }
          transition={{
            duration,
            delay: initialDelay + idx * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
          {idx < words.length - 1 && <span>&nbsp;</span>}
        </motion.span>
      ))}
    </span>
  );
}

export function TextReveal({
  children,
  className,
  duration = 0.4,
  staggerDelay = 0.04,
  initialDelay = 0,
  once = true,
  mode = "reveal",
}: TextRevealProps) {
  const words = children.split(" ");

  if (mode === "scroll-blur") {
    return (
      <ScrollBlurReveal
        words={words}
        className={className}
        staggerDelay={staggerDelay}
      />
    );
  }

  return (
    <RevealText
      words={words}
      className={className}
      duration={duration}
      staggerDelay={staggerDelay}
      initialDelay={initialDelay}
      once={once}
    />
  );
}
