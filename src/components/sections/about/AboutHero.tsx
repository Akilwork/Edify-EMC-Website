"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import GridBackground from "@/components/ui/GridBackground";

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backImageRef = useRef<HTMLDivElement>(null);
  const gridBgRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);

  const cleanupFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const backImage = backImageRef.current;
    const gridBg = gridBgRef.current;

    if (!section || !backImage || !gridBg) return;

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
        const loadTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

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
            duration: 2.5,
          },
          0
        );

        // ─── Scroll-Triggered Animations ────────────────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=400vh", // 4 viewport height for 4 frames (100vh per frame)
            pin: true,
            pinSpacing: true,
            scrub: true,
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

        // ─── Scene 2 initially visible (fades out at 25% progress / 100vh) ─────────────────────────
        tl.to(
          scene2Ref.current,
          {
            opacity: 0,
            y: -20,
            filter: "blur(8px)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.25
        );

        // ─── Scene 3 fades in (at 25% progress / 100vh) ───────────────────────────────────────────
        tl.fromTo(
          scene3Ref.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.25
        );

        // ─── Scene 3 fades out (at 50% progress / 200vh) ───────────────────────────────────────────
        tl.to(
          scene3Ref.current,
          {
            opacity: 0,
            y: -20,
            filter: "blur(8px)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.5
        );

        // ─── Scene 4 fades in (at 50% progress / 200vh) ───────────────────────────────────────────
        tl.fromTo(
          scene4Ref.current,
          {
            opacity: 0,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.5
        );

        // ─── Scene 4 fades out (at 75% progress / 300vh) ───────────────────────────────────────────
        tl.to(
          scene4Ref.current,
          {
            opacity: 0,
            y: -20,
            filter: "blur(8px)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.75
        );

        // ─── Scene 5 (VisionValues) fades in (at 75% progress / 300vh) ───────────────────────────────
        tl.fromTo(
          scene5Ref.current,
          {
            opacity: 0,
            x: 100,
            filter: "blur(12px)",
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.75
        );

        // ─── Building to Grid Background Transformation (at 25% progress / 100vh) ───────────────────
        // Fade out building image
        tl.to(
          backImage,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.25
        );

        // Fade in grid background
        tl.fromTo(
          gridBg,
            {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.25
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
      {/* ── Background Building Image ── */}
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
      <div className="absolute inset-0 z-[3] bg-black/30 pointer-events-none" />

      {/* ── Grid Background (fades in) ── */}
      <div
        ref={gridBgRef}
        className="absolute inset-0 z-[4] opacity-0 will-change-opacity"
      >
        <GridBackground
          lineColor="rgba(168, 85, 247, 0.17)"
          dotColor="rgba(168, 85, 247, 0.3)"
          gridSize={50}
          dotSize={1.5}
        />
      </div>

      {/* ── Text Container (centered, never moves) ── */}
      <div
        ref={textContainerRef}
        className="absolute inset-0 z-[5] flex items-center justify-center p-8 pointer-events-none"
      >
        {/* Scene 2 - visible initially, fades out */}
        <div
          ref={scene2Ref}
          className="absolute w-full max-w-[1100px] text-center"
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

        {/* Scene 3 - fades in */}
        <div
          ref={scene3Ref}
          className="absolute w-full max-w-[1100px] text-center opacity-0"
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

        {/* Scene 4 - fades in with blur */}
        <div
          ref={scene4Ref}
          className="absolute w-full max-w-[1100px] text-center opacity-0"
        >
          <h1 className="font-sans font-medium leading-[1.1] text-white text-center m-0 tracking-tight text-[clamp(28px,6vw,36px)] md:text-[clamp(42px,5vw,48px)] lg:text-[clamp(48px,5vw,64px)] 2xl:text-[clamp(60px,4.5vw,68px)]">
            <span className="block">Building Institutions That Inspire</span>
            <span className="block">Excellence And Lasting Impact</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
