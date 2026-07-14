'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cards, cardLayout } from './cards-data';
import {
  FRAME_W,
  FRAME_H,
  SCROLL_MULTIPLIER,
  FADE_START,
  FADE_END,
  INTERACTIVE_AT,
  TRIGGER_SELECTOR,
} from './constants';
import styles from './StoryHandoff.module.css';

gsap.registerPlugin(ScrollTrigger);

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export const StoryHandoff = ({ isReady = true }: { isReady?: boolean }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef(false);

  const [interactive, setInteractive] = useState(false);

  // ── 1. Cover-fit the stage to match the canvas exactly ──────────────────────
  // Mirrors ScrollStory.drawBlended: scale = max(vw/FW, vh/FH), centered.
  useEffect(() => {
    if (!isReady) return;
    const apply = () => {
      const stage = stageRef.current;
      if (!stage) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.max(vw / FRAME_W, vh / FRAME_H);
      const w = FRAME_W * scale;
      const h = FRAME_H * scale;
      stage.style.width = `${w}px`;
      stage.style.height = `${h}px`;
      stage.style.left = `${(vw - w) / 2}px`;
      stage.style.top = `${(vh - h) / 2}px`;
    };
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, [isReady]);

  // ── 2. ScrollTrigger handoff on the SAME trigger as ScrollStory ─────────────
  useEffect(() => {
    if (!isReady) return;
    const overlay = overlayRef.current;
    const section = document.querySelector<HTMLElement>(TRIGGER_SELECTOR);
    if (!overlay || !section) return;

    // Initial state — invisible & non-interactive until scrolled.
    gsap.set(overlay, { opacity: 0 });

    const setInteractiveState = (v: boolean) => {
      if (interactiveRef.current === v) return;
      interactiveRef.current = v;
      setInteractive(v);
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${window.innerHeight * SCROLL_MULTIPLIER}`,
      onUpdate: (self) => {
        const t = clamp((self.progress - FADE_START) / (FADE_END - FADE_START), 0, 1);
        // Direct DOM write — no React re-render per frame.
        gsap.set(overlay, { opacity: t });

        if (self.progress >= INTERACTIVE_AT) setInteractiveState(true);
        else setInteractiveState(false);
      },
      onLeaveBack: () => {
        gsap.set(overlay, { opacity: 0 });
        setInteractiveState(false);
      },
      onLeave: () => {
        // Past the story's end — hold the live UI fully visible (spacer keeps it on screen).
        gsap.set(overlay, { opacity: 1 });
        setInteractiveState(true);
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, [isReady]);

  return (
    <>
      {/* Fixed overlay — sits above the canvas, below the header (z-index 40 < 100).
          pointer-events:none until `.interactive` is applied, so it never blocks
          the canvas/scroll during the fade. */}
      <div
        ref={overlayRef}
        className={`${styles.overlay} ${interactive ? styles.interactive : ''}`}
        aria-hidden={!interactive}
        style={{ display: isReady ? 'block' : 'none' }}
      >
        {/* Stage cover-fits the viewport exactly like the canvas, so the % card
            positions land on the same pixels as frame_21. */}
        <div ref={stageRef} className={styles.stage}>
          {cardLayout.map((pos) => {
            const card = cards.find((c) => c.id === pos.id);
            if (!card) return null;
            return (
              <article
                key={card.id}
                className={styles.card}
                style={{
                  left: pos.left,
                  top: pos.top,
                  width: pos.width,
                  height: pos.height,
                }}
              >
                {card.image ? (
                  <div className={styles.cardImage} style={{ aspectRatio: card.imageAspect }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt={card.title}
                      draggable={false}
                      onError={(e) => {
                        // Image not uploaded yet — fall back to the styled tile.
                        (e.currentTarget.parentElement as HTMLElement).classList.add(styles.fallback);
                      }}
                    />
                  </div>
                ) : (
                  <div className={`${styles.cardImage} ${styles.fallback}`} style={{ aspectRatio: card.imageAspect }} />
                )}

                <div className={styles.cardBody}>
                  <span className={styles.eyebrow}>{card.eyebrow}</span>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDesc}>{card.description}</p>
                  <a
                    href={card.href}
                    className={styles.cardCta}
                    tabIndex={interactive ? 0 : -1}
                    aria-disabled={!interactive}
                    onClick={(e) => {
                      if (!interactive) e.preventDefault();
                    }}
                  >
                    {card.cta}
                    <span className={styles.cardArrow} aria-hidden>→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Normal-flow spacer so the live UI has scroll room to dwell in after the
          story's pin releases. The fixed overlay stays on screen across this. */}
      <div 
        className={styles.spacer} 
        aria-hidden 
        style={{ display: isReady ? 'block' : 'none' }}
      />
    </>
  );
};

