"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyEdifySection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // graphic layer refs
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  // text layer refs
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1.2,
          pin: stickyRef.current,
          anticipatePin: 1,
          refreshPriority: 1,
        },
      });

      /* ── STAGE 1 → STAGE 2 ── */
      tl
        // fade wave out
        .to(img1Ref.current, { opacity: 0, scale: 0.88, filter: "blur(20px)", duration: 1 }, 0)
        .to(text1Ref.current, { opacity: 0, y: -28, filter: "blur(10px)", duration: 0.8 }, 0)
        // fade arrow in
        .fromTo(img2Ref.current,
          { opacity: 0, scale: 0.75, filter: "blur(22px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }, 0.7)
        .fromTo(text2Ref.current,
          { opacity: 0, y: 42, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, 0.8)

        /* ── STAGE 2 → STAGE 3 ── */
        // fade arrow out
        .to(img2Ref.current, { opacity: 0, scale: 0.88, filter: "blur(20px)", duration: 1 }, 2)
        .to(text2Ref.current, { opacity: 0, y: -28, filter: "blur(10px)", duration: 0.8 }, 2)
        // fade ecosystem in
        .fromTo(img3Ref.current,
          { opacity: 0, scale: 0.75, filter: "blur(22px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }, 2.7)
        .fromTo(text3Ref.current,
          { opacity: 0, y: 42, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, 2.9);
    }, outerRef);

    return () => ctx.revert();
  }, []);

  /* ── shared graphic wrapper style ── */
  const graphicBase: React.CSSProperties = {
    position: "absolute",
    willChange: "transform, opacity, filter",
    pointerEvents: "none",
  };

  /* ── shared text wrapper style ── */
  const textBase: React.CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    willChange: "transform, opacity, filter",
  };

  return (
    <section
      id="why-edify"
      ref={outerRef}
      style={{ height: "400vh" }}
      className="relative bg-black"
    >
      {/* ── STICKY VIEWPORT ── */}
      <div
        ref={stickyRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100svh" }}
      >
        {/* Ambient radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 60% at 50% 50%, rgba(58,186,180,0.04) 0%, transparent 70%)",
          }}
        />

        {/* ═══════════════════════════
            GRAPHIC LAYER – left side on desktop, bottom-centered on mobile/tablet
        ═══════════════════════════ */}

        {/* Stage 1 – Wave */}
        <div
          ref={img1Ref}
          style={graphicBase}
          className="absolute left-6 sm:left-12 lg:left-0 bottom-[4vh] lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto w-[86vw] h-[86vw] sm:w-[70vw] sm:h-[70vw] lg:w-[48vw] lg:h-[48vw] max-w-[380px] max-h-[380px] sm:max-w-[480px] sm:max-h-[480px] lg:max-w-[640px] lg:max-h-[640px]"
        >
          <Image
            src="/WhyEdify/1.png"
            alt="Abstract wave graphic"
            fill
            className="object-contain object-left"
            sizes="(max-width: 1024px) 90vw, 48vw"
            priority
          />
        </div>

        {/* Stage 2 – Growth Arrow */}
        <div
          ref={img2Ref}
          style={{ ...graphicBase, opacity: 0 }}
          className="absolute left-6 sm:left-12 lg:left-0 bottom-[4vh] lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto w-[86vw] h-[86vw] sm:w-[70vw] sm:h-[70vw] lg:w-[48vw] lg:h-[48vw] max-w-[380px] max-h-[380px] sm:max-w-[480px] sm:max-h-[480px] lg:max-w-[640px] lg:max-h-[640px]"
        >
          <Image
            src="/WhyEdify/2.png"
            alt="Growth arrow graphic"
            fill
            className="object-contain object-left"
            sizes="(max-width: 1024px) 90vw, 48vw"
          />
        </div>

        {/* Stage 3 – Connected Ecosystem */}
        <div
          ref={img3Ref}
          style={{ ...graphicBase, opacity: 0 }}
          className="absolute left-6 sm:left-12 lg:left-0 bottom-[4vh] lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto w-[86vw] h-[86vw] sm:w-[70vw] sm:h-[70vw] lg:w-[48vw] lg:h-[48vw] max-w-[380px] max-h-[380px] sm:max-w-[480px] sm:max-h-[480px] lg:max-w-[640px] lg:max-h-[640px]"
        >
          <Image
            src="/WhyEdify/3.png"
            alt="Connected ecosystem graphic"
            fill
            className="object-contain object-left"
            sizes="(max-width: 1024px) 90vw, 48vw"
          />
        </div>

        {/* ═══════════════════════════
            TEXT LAYER – right side on desktop, top-centered on mobile/tablet
        ═══════════════════════════ */}
        <div
          className="absolute inset-0 flex items-start pt-[10vh] lg:pt-0 lg:items-center px-6 sm:px-12 lg:px-0 lg:pl-[clamp(1rem,5vw,6rem)] justify-center lg:justify-end"
        >
          <div
            className="relative w-full max-w-[540px] lg:max-w-none lg:ml-auto lg:mr-[clamp(1rem,5vw,10rem)] lg:pr-[clamp(0.5rem,3vw,5rem)] min-h-[220px] sm:min-h-[240px] lg:min-h-[420px] text-center lg:text-right"
          >
            {/* ── Stage 1 ── */}
            <div ref={text1Ref} style={textBase}>
              <span
                className="block text-white font-medium tracking-tight leading-none"
                style={{
                  fontFamily: "var(--font-inter-tight, 'Inter Tight', sans-serif)",
                  fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                  fontWeight: 500,
                  textShadow: "0 0 80px rgba(58,186,180,0.15)",
                }}
              >
                Beyond Consulting.
              </span>
            </div>

            {/* ── Stage 2 ── */}
            <div ref={text2Ref} style={{ ...textBase, opacity: 0 }}>
              <span
                className="block font-medium tracking-tight leading-none mb-3"
                style={{
                  fontFamily: "var(--font-inter-tight, 'Inter Tight', sans-serif)",
                  fontSize: "clamp(1.25rem, 4vw, 3rem)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.28)",
                }}
              >
                Beyond Consulting.
              </span>
              <span
                className="block text-white font-medium tracking-tight leading-tight"
                style={{
                  fontFamily: "var(--font-inter-tight, 'Inter Tight', sans-serif)",
                  fontSize: "clamp(2.0rem, 7vw, 4.8rem)",
                  fontWeight: 500,
                  textShadow: "0 0 80px rgba(42,126,245,0.2)",
                }}
              >
                Built For Institutional Growth.
              </span>
            </div>

            {/* ── Stage 3 ── */}
            <div ref={text3Ref} style={{ ...textBase, opacity: 0 }}>
              <span
                className="block font-medium tracking-tight leading-none mb-2"
                style={{
                  fontFamily: "var(--font-inter-tight, 'Inter Tight', sans-serif)",
                  fontSize: "clamp(1.1rem, 3.5vw, 2.4rem)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                Beyond Consulting.
              </span>
              <span
                className="block font-medium tracking-tight leading-none mb-6"
                style={{
                  fontFamily: "var(--font-inter-tight, 'Inter Tight', sans-serif)",
                  fontSize: "clamp(1.2rem, 3.8vw, 2.6rem)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.32)",
                }}
              >
                Built For Institutional Growth.
              </span>
              <span
                className="block font-medium leading-snug text-white mx-auto lg:ml-auto lg:mr-0"
                style={{
                  fontFamily: "var(--font-inter-tight, 'Inter Tight', sans-serif)",
                  fontSize: "clamp(1.5rem, 4.5vw, 2.6rem)",
                  fontWeight: 500,
                  maxWidth: "28ch",
                  textShadow: "0 0 60px rgba(58,186,180,0.2)",
                }}
              >
                We create connected solutions that strengthen every part of your institution.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom vignette */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0"
          style={{
            height: "120px",
            background: "linear-gradient(to top, #000 0%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
