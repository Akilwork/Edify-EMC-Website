"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backImageRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);

  const cleanupFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const backImage = backImageRef.current;

    if (!section || !backImage) return;

    const setupAnimation = async () => {
      try {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // ─── Initial Parallax Animation on Page Load ─────────────────────────────
        // Cinematic depth effect - barely noticeable movement
        const loadTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

        // Background layer: hero_back_img_aboutus.png
        // Scale: 100% → 108%, Y: 0 → -40px, Blur: 0 → 1.5px
        loadTimeline.fromTo(
          backImage,
          {
            scale: 1,
            y: 0,
            filter: "blur(0px)",
          },
          {
            scale: 1.08,
            y: -40,
            filter: "blur(1.5px)",
            duration: 2.5, // Slow, cinematic
          },
          0
        );

        // ─── Scroll-Triggered Text Animations ────────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200vh", // 2 viewport heights for 2 scenes
            pin: true,
            pinSpacing: true,
            scrub: true, // Smooth scroll-driven animation
          },
        });

        // Continue background animation during scroll
        tl.to(backImage, {
          scale: 1.15,
          y: -50,
          filter: "blur(2px)",
          duration: 1,
          ease: "none",
        });

        // ─── Scene 1 → Scene 2 (Full scroll animation: 30–70% progress) ─────────
        // Scene 1 fades out
        tl.to(
          scene1Ref.current,
          {
            opacity: 0,
            y: -30,
            filter: "blur(8px)",
            duration: 0.4,
            ease: "power2.inOut",
          },
          0.3
        );

        // Scene 2 fades in (overlapping)
        tl.fromTo(
          scene2Ref.current,
          {
            opacity: 0,
            y: 30,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power2.inOut",
          },
          0.4 // Start at 40% (10% overlap)
        );

        cleanupFnRef.current = () => {
          ScrollTrigger.getAll().forEach((st) => st.kill());
          loadTimeline.kill();
        };
      } catch (error) {
        console.error("Failed to load GSAP:", error);
      }
    };

    setupAnimation();

    return () => {
      if (cleanupFnRef.current) cleanupFnRef.current();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-[#0A0D14]"
    >
      {/* ── Background Image ── */}
      <div
        ref={backImageRef}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <Image
          src="/about/hero/hero_back_img_aboutus.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* ── Dark Overlay ── */}
      <div className="absolute inset-0 z-[2] bg-black/50 pointer-events-none" />

      {/* ── Text Container (centered, never moves) ── */}
      <div
        ref={textContainerRef}
        className="absolute inset-0 z-[3] flex items-center justify-center p-8 pointer-events-none"
      >
        {/* Scene 1 - fades out */}
        <div
          ref={scene1Ref}
          className="absolute w-full max-w-[1100px] text-center"
        >
          <h1 className="font-sans font-medium leading-[1.1] text-white text-center m-0 tracking-tight text-[clamp(28px,6vw,36px)] md:text-[clamp(42px,5vw,48px)] lg:text-[clamp(48px,5vw,64px)] 2xl:text-[clamp(60px,4.5vw,68px)]">
            <span className="block">Building Institutions That Inspire</span>
            <span className="block">Excellence And Lasting Impact</span>
          </h1>
        </div>

        {/* Scene 2 - fades in (starts hidden) */}
        <div
          ref={scene2Ref}
          className="absolute w-full max-w-[1100px] text-center opacity-0 md:max-w-[1100px]"
        >
          <h1 className="font-sans font-medium leading-[1.1] text-white text-center m-0 tracking-tight text-[clamp(22px,5vw,28px)] md:text-[clamp(34px,4vw,40px)] lg:text-[clamp(36px,4vw,52px)] 2xl:text-[clamp(46px,3.5vw,56px)]">
            <span className="block">
              Empowering educational institutions
            </span>
            <span className="block">
              through integrated expertise, strategic guidance, and sustainable
              growth solutions
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
