'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollStory.module.css';

gsap.registerPlugin(ScrollTrigger);

// ─── Config ───────────────────────────────────────────────────────────────────
const TOTAL_FRAMES    = 22;
const SCROLL_MULTIPLIER = 4; // 4 × 100vh of scroll travel

// Files on disk: "frame_01.jpg" … "frame_22.jpg"
function getFrameSrc(i: number): string {
  return `/frames/frame_${String(i + 1).padStart(2, '0')}.jpg`;
}

/**
 * Maps scroll progress [0→1] to a fractional frame index [0→21].
 * Linear mapping — each frame gets equal scroll distance.
 * Smoothness comes from scrub lag, not easing curves.
 */
function scrollProgressToFractionalFrame(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  return p * (TOTAL_FRAMES - 1);
}

// ─── Draw helper – single frame, cover-scaled, no blending ───────────────────
function drawBlended(
  canvas: HTMLCanvasElement,
  images: HTMLImageElement[],
  fractional: number,
  dpr: number,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const cw = canvas.width  / dpr;
  const ch = canvas.height / dpr;

  // Round to nearest frame — no crossfade, no ghosting
  const idx = Math.min(Math.round(fractional), TOTAL_FRAMES - 1);
  const img = images[idx];
  if (!img?.complete || !img.naturalWidth) return;

  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const sw = img.naturalWidth  * scale;
  const sh = img.naturalHeight * scale;
  const ox = (cw - sw) / 2;
  const oy = (ch - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, ox, oy, sw, sh);
}

// ─── Component ────────────────────────────────────────────────────────────────
export const ScrollStory = () => {
  const sectionRef      = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const imagesRef       = useRef<HTMLImageElement[]>([]);
  const fractionalFrame = useRef(0);    // current fractional position
  const rafId           = useRef<number | null>(null);
  const dprRef          = useRef(1);

  const [loadState,     setLoadState]    = useState<'loading' | 'ready'>('loading');
  const [loadProgress,  setLoadProgress] = useState(0);

  // ── 1. Preload every frame ──────────────────────────────────────────────────
  useEffect(() => {
    let settled = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const onSettle = () => {
      settled++;
      setLoadProgress(Math.round((settled / TOTAL_FRAMES) * 100));
      if (settled === TOTAL_FRAMES) setLoadState('ready');
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload  = onSettle;
      img.onerror = onSettle;
      img.src = getFrameSrc(i);
      images[i] = img;
    }
    imagesRef.current = images;
  }, []);

  // ── 2. Size canvas to true screen dimensions ───────────────────────────────
  useEffect(() => {
    if (loadState !== 'ready') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const applySize = () => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.left   = '0px';
      canvas.style.top    = '0px';

      const ctx = canvas.getContext('2d');
      if (ctx) { ctx.resetTransform(); ctx.scale(dpr, dpr); }

      drawBlended(canvas, imagesRef.current, fractionalFrame.current, dpr);
    };

    applySize();
    window.addEventListener('resize', applySize);
    return () => window.removeEventListener('resize', applySize);
  }, [loadState]);

  // ── 3. GSAP ScrollTrigger – pin + scrub ────────────────────────────────────
  useEffect(() => {
    if (loadState !== 'ready') return;
    const section = sectionRef.current;
    const canvas  = canvasRef.current;
    if (!section || !canvas) return;

    // Show frame 0 before any scroll
    drawBlended(canvas, imagesRef.current, 0, dprRef.current);
    ScrollTrigger.refresh();

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${window.innerHeight * SCROLL_MULTIPLIER}`,
      pin: true,
      pinSpacing: true,
      // scrub: number = seconds of lag — keep low so crossfade does the smoothing
      scrub: 0.6,
      onUpdate: (self) => {
        const next = scrollProgressToFractionalFrame(self.progress);

        // Skip redraw only if the rounded frame hasn't changed
        if (Math.round(next) === Math.round(fractionalFrame.current)) return;

        fractionalFrame.current = next;

        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(() =>
          drawBlended(canvas, imagesRef.current, next, dprRef.current)
        );
      },
    });

    return () => {
      st.kill(true);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [loadState]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Edify services storytelling animation"
    >
      {loadState === 'loading' && (
        <div className={styles.loader} aria-live="polite">
          <div className={styles.loaderBar}>
            <div className={styles.loaderFill} style={{ width: `${loadProgress}%` }} />
          </div>
          <span className={styles.loaderText}>Loading {loadProgress}%</span>
        </div>
      )}

      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
    </section>
  );
};
