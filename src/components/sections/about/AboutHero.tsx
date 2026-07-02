"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import GridBackground from "@/components/ui/GridBackground";

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backImageRef = useRef<HTMLDivElement>(null);
  const gridBgRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);

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
            end: "+=300vh", // 3 viewport heights for 3 scenes
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

        // ─── Scene 1 → Scene 2 (25–50% progress) ─────────────────────────────────
        tl.to(
          scene1Ref.current,
          {
            opacity: 0,
            y: -20,
            filter: "blur(8px)",
            duration: 0.25,
            ease: "power2.inOut",
          },
          0.25
        );

        tl.fromTo(
          scene2Ref.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.25,
            ease: "power2.inOut",
          },
          0.35
        );

        // ─── Scene 2 → Scene 3 with Background Transformation (55–85%) ────────────
        // Fade out scene 2
        tl.to(
          scene2Ref.current,
          {
            opacity: 0,
            y: -20,
            filter: "blur(8px)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.55
        );

        // Fade in scene 3 heading
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
          0.65
        );

        // ─── Building to Grid Background Transformation (55–85%) ───────────────────
        // Fade out building image
        tl.to(
          backImage,
          {
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.55
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
          0.55
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

        {/* Scene 2 - fades in then out */}
        <div
          ref={scene2Ref}
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
      </div>
    </section>
  );
}
