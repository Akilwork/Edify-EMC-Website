'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ScrollStory.module.css';
import {
  TOTAL_FRAMES,
  SCROLL_MULTIPLIER,
  getFrameSrc,
} from './constants';
import { ServiceDetailsModal } from './ServiceDetailsModal';

gsap.registerPlugin(ScrollTrigger);

// ─── Frame mapping ────────────────────────────────────────────────────────────
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

  const cw = canvas.width / dpr;
  const ch = canvas.height / dpr;

  const idx = Math.min(Math.round(fractional), TOTAL_FRAMES - 1);
  const img = images[idx];
  if (!img?.complete || !img.naturalWidth) return;

  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const sw = img.naturalWidth * scale;
  const sh = img.naturalHeight * scale;
  const ox = (cw - sw) / 2;
  const oy = (ch - sh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, ox, oy, sw, sh);
}

const CARDS_DATA = [
  {
    id: 'hr',
    title: 'Human Resource Services',
    image: '/Services/human_resource_services_card_image.png',
    link: '/services#hr',
  },
  {
    id: 'financial',
    title: 'Financial Consultancy',
    image: '/Services/financial_consultancy_card_image.png',
    link: '/services#financial',
  },
  {
    id: 'it',
    title: 'IT Solutions & Digital Transformation',
    image: '/Services/it_solutions_&_digital_transformation_card_image.png',
    link: '/services#it',
  },
  {
    id: 'educational',
    title: 'Educational & Institutional Consulting',
    image: '/Services/educational_&_institutional_consulting_card_image.png',
    link: '/services#educational',
  },
  {
    id: 'behavioural',
    title: 'Behavioural Counselling & Student Support',
    image: '/Services/behavioural_counselling_&_student_support_card_image.png',
    link: '/services#behavioural',
  },
  {
    id: 'printing',
    title: 'Printing & Branding Solutions',
    image: '/Services/printing_&_branding_solutions_card_image.png',
    link: '/services#printing',
  },
];

export const ScrollStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardsOverlayRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const fractionalFrame = useRef(0);    // current fractional position
  const rafId = useRef<number | null>(null);
  const dprRef = useRef(1);

  const [loadState, setLoadState] = useState<'loading' | 'ready'>('loading');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handlePrevService = () => {
    if (!selectedServiceId) return;
    const idx = CARDS_DATA.findIndex((c) => c.id === selectedServiceId);
    const prevIdx = (idx - 1 + CARDS_DATA.length) % CARDS_DATA.length;
    setSelectedServiceId(CARDS_DATA[prevIdx].id);
  };

  const handleNextService = () => {
    if (!selectedServiceId) return;
    const idx = CARDS_DATA.findIndex((c) => c.id === selectedServiceId);
    const nextIdx = (idx + 1) % CARDS_DATA.length;
    setSelectedServiceId(CARDS_DATA[nextIdx].id);
  };

  // ── 1. Preload every frame ──────────────────────────────────────────────────
  useEffect(() => {
    let settled = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const onSettle = () => {
      settled++;
      if (settled === TOTAL_FRAMES) setLoadState('ready');
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = onSettle;
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

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.style.left = '0px';
      canvas.style.top = '0px';

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
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    drawBlended(canvas, imagesRef.current, 0, dprRef.current);

    // ── Mobile/Tablet: extend pin to cover card overflow so page scroll drives it ──
    const isMobileOrTablet = windowSize.width <= 1024;
    const baseDist = windowSize.height * SCROLL_MULTIPLIER;
    let extraScrollPx = 0;

    if (isMobileOrTablet) {
      const overlay = cardsOverlayRef.current;
      const container = cardsContainerRef.current;
      if (overlay && container) {
        extraScrollPx = Math.max(0, container.scrollHeight - overlay.offsetHeight);
      }
    }

    // Map the page scroll 1:1 to the card list scrolling
    const lastFrameScrollDistance = isMobileOrTablet ? extraScrollPx * 1.0 : 0;
    const totalDist = baseDist + lastFrameScrollDistance;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalDist}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.6,
      refreshPriority: 3,
      onUpdate: (self) => {
        // Canvas animation always plays over the first baseDist of scroll
        const canvasProgress = Math.min(1, (self.progress * totalDist) / baseDist);
        const next = scrollProgressToFractionalFrame(canvasProgress);

        if (Math.round(next) !== Math.round(fractionalFrame.current)) {
          fractionalFrame.current = next;
          if (rafId.current) cancelAnimationFrame(rafId.current);
          rafId.current = requestAnimationFrame(() =>
            drawBlended(canvas, imagesRef.current, next, dprRef.current)
          );
        }

        const cardsOverlay = cardsOverlayRef.current;
        const contentWrapper = contentWrapperRef.current;
        if (cardsOverlay && contentWrapper) {
          const fadeStart = 0.9;
          const fadeEnd = 0.98;
          let opacity = 0;
          if (canvasProgress >= fadeEnd) {
            opacity = 1;
          } else if (canvasProgress <= fadeStart) {
            opacity = 0;
          } else {
            opacity = (canvasProgress - fadeStart) / (fadeEnd - fadeStart);
          }
          cardsOverlay.style.opacity = `${opacity}`;
          cardsOverlay.style.pointerEvents = opacity > 0.9 ? 'auto' : 'none';
          contentWrapper.style.pointerEvents = opacity > 0.9 ? 'auto' : 'none';

          if (canvasProgress >= fadeStart) {
            canvas.style.opacity = '0';
            canvas.style.visibility = 'hidden';
          } else {
            canvas.style.opacity = '1';
            canvas.style.visibility = 'visible';
          }

          // ── Drive mobile/tablet card list scroll via page scroll ────────────────
          if (isMobileOrTablet && extraScrollPx > 0) {
            const cardsPhaseStart = baseDist / totalDist;
            if (self.progress > cardsPhaseStart) {
              const cardsScrollProgress =
                (self.progress - cardsPhaseStart) / (1 - cardsPhaseStart);
              cardsOverlay.scrollTop = cardsScrollProgress * extraScrollPx;
            } else {
              cardsOverlay.scrollTop = 0;
            }
          }
        }
      },
    });

    ScrollTrigger.sort();
    ScrollTrigger.refresh();

    return () => {
      st.kill(true);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [loadState, windowSize.width, windowSize.height]);

  return (
    <div>
      <section
        ref={sectionRef}
        className={styles.section}
        aria-label="Edify services storytelling animation"
        onContextMenu={(e) => e.preventDefault()}
      >
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          aria-hidden="true"
          onContextMenu={(e) => e.preventDefault()}
        />

        <div ref={contentWrapperRef} className={styles.contentWrapper}>
          <div className={`${styles.textOverlay} ${loadState === 'ready' ? styles.visible : ''}`}>
            <h2 className={styles.title}>
              One Trusted Partner for Every Educational<br className={styles.desktopOnlyBr} /> Institution Need
            </h2>
          </div>

          <div
            ref={cardsOverlayRef}
            className={styles.cardsOverlay}
            style={{ opacity: 0, pointerEvents: 'none' }}
          >
            <div ref={cardsContainerRef} className={styles.cardsContainer}>
              {CARDS_DATA.map((card) => (
                <a
                  key={card.id}
                  href={card.link}
                  className={styles.card}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedServiceId(card.id);
                  }}
                >
                  <div className={styles.cardImageContainer}>
                    <img
                      src={card.image}
                      alt={card.title}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    <div className={styles.cardGradientOverlay} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <span className={styles.viewMore}>
                      View More
                      <svg className={styles.arrow} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedServiceId && (
        <ServiceDetailsModal
          serviceId={selectedServiceId}
          onClose={() => setSelectedServiceId(null)}
          onPrev={handlePrevService}
          onNext={handleNextService}
        />
      )}
    </div>
  );
};
