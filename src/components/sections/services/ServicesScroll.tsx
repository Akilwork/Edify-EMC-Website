"use client";

import { useEffect, useRef, useState } from "react";
import BlurText from "@/components/ui/BlurText";
import GridBackground from "@/components/ui/GridBackground";
import ServicesGridScene from "./ServicesGridScene";

export default function ServicesScroll() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [heroVisible, setHeroVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);

  const cleanupFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const grid = gridRef.current;

    if (!hero || !grid) return;

    const setupAnimation = async () => {
      try {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // ─── Hero Animation on Page Load ─────────────────────────────────────────
        const loadTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

        loadTimeline.fromTo(
          hero,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.5 }
        );

        // Trigger hero text animation after load
        setTimeout(() => setHeroVisible(true), 500);

        // ─── Scroll-Triggered Animation ────────────────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=200vh",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
              if (self.progress >= 0.5 && !gridVisible) setGridVisible(true);
            },
          },
        });

        // Hero fades out
        tl.to(
          hero,
          {
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            duration: 1,
            ease: "power2.inOut",
          },
          1
        );

        cleanupFnRef.current = () => {
          ScrollTrigger.getAll().forEach((st: any) => st.kill());
          loadTimeline.kill();
        };
      } catch (error) {
        console.error("Failed to initialize GSAP:", error);
      }
    };

    setupAnimation();

    return () => {
      if (cleanupFnRef.current) cleanupFnRef.current();
    };
  }, [gridVisible]);

  return (
    <div className="relative w-full">
      {/* ─── Hero Section ─── */}
      <section
        ref={heroRef}
        className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-[#0A0D14]"
      >
        {/* ── Background Layers ── */}
        <div className="absolute inset-0 z-[1]">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0F1419] to-slate-900" />

          {/* Animated orbs */}
          <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

          {/* Grid background */}
          <div className="absolute inset-0 opacity-30">
            <GridBackground
              lineColor="rgba(168, 85, 247, 0.17)"
              dotColor="rgba(168, 85, 247, 0.3)"
              gridSize={50}
              dotSize={1.5}
              vignetteIntensity={50}
            />
          </div>

          {/* Radial gradient vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #0A0D14 90%)" }} />
        </div>

        {/* ── Dark Overlay ── */}
        <div className="absolute inset-0 z-[3] bg-black/60 pointer-events-none" />

        {/* ── Content Container ── */}
        <div className="absolute inset-0 z-[5] flex items-center justify-center p-8 md:px-16 lg:px-20 pointer-events-none">
          <div className="w-full max-w-[1920px] mx-auto">
            {/* Hero Scene */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div ref={heroTextRef} className="text-center max-w-[1400px]">
                <h1 className="font-sans text-[clamp(32px,5vw,56px)] md:text-[clamp(42px,5vw,64px)] lg:text-[clamp(48px,5vw,72px)] 2xl:text-[clamp(56px,4.5vw,80px)] font-normal leading-[1.1] tracking-tight text-white mb-8">
                  {heroVisible && (
                    <BlurText
                      text="Transforming Institutions Through Strategic Excellence"
                      animateBy="words"
                      direction="top"
                      delay={100}
                      stepDuration={0.4}
                      className="flex flex-wrap justify-center"
                      threshold={0.5}
                      rootMargin="0px"
                    />
                  )}
                </h1>
                <p className="text-white/50 text-[15px] md:text-[17px] lg:text-[19px] leading-[1.75] max-w-2xl mx-auto animate-in slide-in-from-bottom-6 fade-in duration-700 delay-200">
                  Comprehensive solutions that drive lasting change across your organisation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Fade Gradient ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/80 to-transparent pointer-events-none z-[10]" />
      </section>

      {/* ─── Services Grid Section ─── */}
      <section
        ref={gridRef}
        className="relative w-full min-h-screen bg-white"
      >
        <ServicesGridScene isVisible={gridVisible} />
      </section>
    </div>
  );
}
