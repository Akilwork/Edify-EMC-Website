"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import GridBackground from "@/components/ui/GridBackground";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backImageRef = useRef<HTMLDivElement>(null);
  const gridBg70Ref = useRef<HTMLDivElement>(null); // Frame 2: 70% vignette
  const gridBg30Ref = useRef<HTMLDivElement>(null); // Frame 3: 30% vignette
  const dotBgRef = useRef<HTMLDivElement>(null); // Frame 4: dot background
  const textContainerRef = useRef<HTMLDivElement>(null);

  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);
  const scene5Ref = useRef<HTMLDivElement>(null);
  const scene5LeftRef = useRef<HTMLDivElement>(null);
  const scene5RightRef = useRef<HTMLDivElement>(null);
  const scene6Ref = useRef<HTMLDivElement>(null);
  const statsCounterRef = useRef<HTMLDivElement>(null);
  const whiteBgRef = useRef<HTMLDivElement>(null);
  const scene7Ref = useRef<HTMLDivElement>(null);
  const scene7LeftRef = useRef<HTMLDivElement>(null);
  const scene7RightRef = useRef<HTMLDivElement>(null);
  const scene7BlackBgRef = useRef<HTMLDivElement>(null);

  const scene7Image1Ref = useRef<HTMLDivElement>(null);
  const scene7Image2Ref = useRef<HTMLDivElement>(null);
  const scene7Image3Ref = useRef<HTMLDivElement>(null);
  const scene7Image4Ref = useRef<HTMLDivElement>(null);

  const scene7Dot1Ref = useRef<HTMLDivElement>(null);
  const scene7Dot2Ref = useRef<HTMLDivElement>(null);
  const scene7Dot3Ref = useRef<HTMLDivElement>(null);
  const scene7Dot4Ref = useRef<HTMLDivElement>(null);

  const cleanupFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const backImage = backImageRef.current;
    const gridBg70 = gridBg70Ref.current;
    const gridBg30 = gridBg30Ref.current;
    const dotBg = dotBgRef.current;
    const whiteBg = whiteBgRef.current;

    if (!section || !backImage || !gridBg70 || !gridBg30 || !dotBg) return;

    const setupAnimation = async () => {
      try {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Safeguard: if component has unmounted or refs are not ready, abort
        if (
          !sectionRef.current ||
          !backImageRef.current ||
          !scene2Ref.current ||
          !scene4Ref.current
        ) {
          return;
        }

        // ─── Initial States ──────────────────────────────────────────────────────
        gsap.set(scene2Ref.current, { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        gsap.set(scene4Ref.current, { autoAlpha: 0, y: 0, filter: "blur(18px)" });
        if (scene5Ref.current) gsap.set(scene5Ref.current, { autoAlpha: 0 });
        if (scene5LeftRef.current) gsap.set(scene5LeftRef.current, { autoAlpha: 0, x: -100, filter: "blur(12px)" });
        if (scene5RightRef.current) gsap.set(scene5RightRef.current, { autoAlpha: 0, x: 100, scale: 0.6, filter: "blur(16px)" });
        if (scene6Ref.current) gsap.set(scene6Ref.current, { autoAlpha: 0, filter: "blur(18px)" });
        if (scene7Ref.current) gsap.set(scene7Ref.current, { autoAlpha: 0, filter: "blur(12px)" });
        if (scene7LeftRef.current) gsap.set(scene7LeftRef.current, { autoAlpha: 0, x: -50 });
        if (scene7RightRef.current) gsap.set(scene7RightRef.current, { autoAlpha: 0, x: 50, scale: 0.9 });
        if (scene7BlackBgRef.current) gsap.set(scene7BlackBgRef.current, { autoAlpha: 0 });
        if (whiteBg) gsap.set(whiteBg, { autoAlpha: 0 });
        gsap.set(gridBg70, { autoAlpha: 0 });
        gsap.set(gridBg30, { autoAlpha: 0 });
        gsap.set(dotBg, { autoAlpha: 0 });

        // Scene 7 Images initial states
        if (scene7Image1Ref.current) gsap.set(scene7Image1Ref.current, { autoAlpha: 1 });
        if (scene7Image2Ref.current) gsap.set(scene7Image2Ref.current, { autoAlpha: 0 });
        if (scene7Image3Ref.current) gsap.set(scene7Image3Ref.current, { autoAlpha: 0 });
        if (scene7Image4Ref.current) gsap.set(scene7Image4Ref.current, { autoAlpha: 0 });

        // Scene 7 Dots initial states
        if (scene7Dot1Ref.current) gsap.set(scene7Dot1Ref.current, { width: 48, backgroundColor: "#FFFFFF" });
        if (scene7Dot2Ref.current) gsap.set(scene7Dot2Ref.current, { width: 8, backgroundColor: "#4B5563" });
        if (scene7Dot3Ref.current) gsap.set(scene7Dot3Ref.current, { width: 8, backgroundColor: "#4B5563" });
        if (scene7Dot4Ref.current) gsap.set(scene7Dot4Ref.current, { width: 8, backgroundColor: "#4B5563" });

        // ─── Initial Parallax Animation on Page Load ─────────────────────────────
        const loadTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

        loadTimeline.fromTo(
          backImage,
          {
            scale: 1,
            y: 0,
            filter: "blur(1px)",
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
            end: "+=7500vh", // Extended for Scene 6 + Scene 7 step-by-step
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        // Continue background animation during scroll
        tl.to(backImage, {
          scale: 3.5,
          y: -100,
          filter: "blur(3px)",
          duration: 5,
          ease: "none",
        });

        // ─── Scene 2 → Scene 4 Cross-fade (starts at 0.6, duration 0.3) ───────────────
        tl.to(
          scene2Ref.current,
          {
            autoAlpha: 0,
            y: -30,
            filter: "blur(12px)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.6
        );

        tl.to(
          scene4Ref.current,
          {
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.9
        );

        // ─── Scene 4 → Scene 5 Transition (starts at 1.5, duration 0.3) ──────────────────────────────────
        tl.to(
          scene4Ref.current,
          {
            autoAlpha: 0,
            y: -30,
            filter: "blur(12px)",
            duration: 0.3,
            ease: "power2.inOut",
          },
          1.5
        );

        // ─── Scene 5 (VisionValues) fades in (starts at 1.8) ────────────────────────────────────────────
        if (scene5Ref.current) {
          tl.to(
            scene5Ref.current,
            {
              autoAlpha: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            1.8
          );
        }

        if (scene5LeftRef.current) {
          tl.to(
            scene5LeftRef.current,
            {
              autoAlpha: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power3.out",
            },
            1.85
          );
        }

        if (scene5RightRef.current) {
          tl.to(
            scene5RightRef.current,
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "back.out(1.7)",
            },
            1.9
          );
        }

        // ─── Scene 5 → Scene 6 Transition (starts at 2.2) ─────────────────────────────────────────────────
        if (scene5Ref.current) {
          tl.to(
            scene5Ref.current,
            {
              autoAlpha: 0,
              y: -40,
              filter: "blur(12px)",
              duration: 0.3,
              ease: "power2.inOut",
            },
            2.2
          );
        }

        // ─── Scene 6 (Stats) fades in with white background (starts at 2.5) ─────────────────────────────────────
        if (whiteBg) {
          tl.to(
            whiteBg,
            {
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.inOut",
            },
            2.5
          );
        }

        if (scene6Ref.current) {
          tl.to(
            scene6Ref.current,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "power2.inOut",
            },
            2.5
          );
        }

        // Animate stats numbers with stagger timing
        if (statsCounterRef.current) {
          const statElements = statsCounterRef.current.querySelectorAll(".stat-number");
          statElements.forEach((el, index) => {
            const targetValue = parseInt(el.getAttribute("data-value") || "0");
            const counterObj = { value: 0 };
            tl.to(
              counterObj,
              {
                value: targetValue,
                duration: 1.0,
                ease: "power3.out",
                onUpdate: function () {
                  const current = Math.round(this.targets()[0].value);
                  (el as HTMLElement).innerHTML = current.toLocaleString();
                },
              },
              2.8 + (index * 0.15)
            );
          });
        }

        // ─── Scene 6 → Scene 7 Transition (starts at 3.9) ─────────────────────
        if (scene6Ref.current) {
          tl.to(
            scene6Ref.current,
            {
              autoAlpha: 0,
              scale: 1.15,
              filter: "blur(15px)",
              duration: 0.3,
              ease: "power2.inOut",
            },
            3.9
          );
        }

        // Fade out white background
        if (whiteBg) {
          tl.to(
            whiteBg,
            {
              autoAlpha: 0,
              duration: 0.3,
              ease: "power2.inOut",
            },
            3.9
          );
        }

        // Fade in black background for Scene 7
        if (scene7BlackBgRef.current) {
          tl.to(
            scene7BlackBgRef.current,
            {
              autoAlpha: 1,
              duration: 0.5,
              ease: "power2.inOut",
            },
            4.2
          );
        }

        // Fade in Scene 7 with blur
        if (scene7Ref.current) {
          tl.to(
            scene7Ref.current,
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.inOut",
            },
            4.2
          );
        }

        // Animate Scene 7 left text (slide in from left)
        if (scene7LeftRef.current) {
          tl.to(
            scene7LeftRef.current,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            4.3
          );
        }

        // Animate Scene 7 right image (slide in from right with scale)
        if (scene7RightRef.current) {
          tl.to(
            scene7RightRef.current,
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)",
            },
            4.4
          );
        }

        // ─── Scene 7 Carousel Transitions (starts at 4.9) ───────────────────
        // Step 1 -> Step 2 transition at 4.9
        if (scene7Image1Ref.current) {
          tl.to(scene7Image1Ref.current, { autoAlpha: 0, duration: 0.3 }, 4.9);
        }
        if (scene7Image2Ref.current) {
          tl.to(scene7Image2Ref.current, { autoAlpha: 1, duration: 0.3 }, 4.9);
        }
        if (scene7Dot1Ref.current) {
          tl.to(scene7Dot1Ref.current, { width: 8, backgroundColor: "#4B5563", duration: 0.3 }, 4.9);
        }
        if (scene7Dot2Ref.current) {
          tl.to(scene7Dot2Ref.current, { width: 48, backgroundColor: "#FFFFFF", duration: 0.3 }, 4.9);
        }

        // Step 2 -> Step 3 transition at 5.5
        if (scene7Image2Ref.current) {
          tl.to(scene7Image2Ref.current, { autoAlpha: 0, duration: 0.3 }, 5.5);
        }
        if (scene7Image3Ref.current) {
          tl.to(scene7Image3Ref.current, { autoAlpha: 1, duration: 0.3 }, 5.5);
        }
        if (scene7Dot2Ref.current) {
          tl.to(scene7Dot2Ref.current, { width: 8, backgroundColor: "#4B5563", duration: 0.3 }, 5.5);
        }
        if (scene7Dot3Ref.current) {
          tl.to(scene7Dot3Ref.current, { width: 48, backgroundColor: "#FFFFFF", duration: 0.3 }, 5.5);
        }

        // Step 3 -> Step 4 transition at 6.1
        if (scene7Image3Ref.current) {
          tl.to(scene7Image3Ref.current, { autoAlpha: 0, duration: 0.3 }, 6.1);
        }
        if (scene7Image4Ref.current) {
          tl.to(scene7Image4Ref.current, { autoAlpha: 1, duration: 0.3 }, 6.1);
        }
        if (scene7Dot3Ref.current) {
          tl.to(scene7Dot3Ref.current, { width: 8, backgroundColor: "#4B5563", duration: 0.3 }, 6.1);
        }
        if (scene7Dot4Ref.current) {
          tl.to(scene7Dot4Ref.current, { width: 48, backgroundColor: "#FFFFFF", duration: 0.3 }, 6.1);
        }


        // ─── Building to Grid Background Transformation (at 0.2) ──────────────────────────────────────
        tl.to(
          backImage,
          {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.2
        );

        // ─── Grid Background Transformation ─────────────────────────────────────────────────────
        // Fade in grid with 70% vignette (at 0.2)
        tl.to(
          gridBg70,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.2
        );

        // Cross-fade from 70% vignette to 30% vignette (at 0.9)
        tl.to(
          gridBg70,
          {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.9
        );

        tl.to(
          gridBg30,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
          },
          0.9
        );

        // Cross-fade from grid to dot background (at 1.7)
        tl.to(
          gridBg30,
          {
            autoAlpha: 0,
            duration: 0.5,
            ease: "power2.inOut",
          },
          1.7
        );

        tl.to(
          dotBg,
          {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
          },
          1.7
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
    <div>
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
        <div className="absolute inset-0 z-[3] bg-black/50 pointer-events-none" />
  
        {/* ── Grid Background Layer 1: Frame 2 (70% vignette) ── */}
        <div
          ref={gridBg70Ref}
          className="absolute inset-0 z-[4] opacity-0 will-change-opacity"
        >
          <GridBackground
            lineColor="rgba(168, 85, 247, 0.17)"
            dotColor="rgba(168, 85, 247, 0.3)"
            gridSize={50}
            dotSize={1.5}
            vignetteIntensity={70}
          />
        </div>
  
        {/* ── Grid Background Layer 2: Frame 3+ (50% vignette) ── */}
        <div
          ref={gridBg30Ref}
          className="absolute inset-0 z-[4] opacity-0 will-change-opacity"
        >
          <GridBackground
            lineColor="rgba(168, 85, 247, 0.17)"
            dotColor="rgba(168, 85, 247, 0.3)"
            gridSize={50}
            dotSize={1.5}
            vignetteIntensity={50}
          />
        </div>
  
        {/* ── Dot Background Layer: Frame 4 ── */}
        <div
          ref={dotBgRef}
          className="absolute inset-0 z-[4] opacity-0 will-change-opacity"
        >
          <DottedGlowBackground
            className="pointer-events-none"
            opacity={0.2}
            gap={20}
            radius={1.5}
            color="rgba(255, 255, 255, 0.7)"
            glowColor="rgba(255, 255, 255, 0.9)"
            backgroundOpacity={0}
            speedMin={0.15}
            speedMax={0.5}
            speedScale={1}
          />
          {/* Vignette overlay - 70% intensity */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #000000 40%)" }} />
        </div>
  
        {/* ── White Background Layer: Scene 6 ── */}
        <div
          ref={whiteBgRef}
          className="absolute inset-0 z-[4] opacity-0 will-change-opacity bg-white"
        >
          <GridBackground
            lineColor="rgba(59, 130, 246, 0.08)"
            dotColor="rgba(59, 130, 246, 0.15)"
            gridSize={50}
            dotSize={1.5}
            showVignette={false}
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

        {/* Scene 5 - VisionValues content (slides in from right) */}
        <div
          ref={scene5Ref}
          className="absolute inset-0 flex items-center justify-center p-8 md:px-16 lg:px-20 overflow-hidden opacity-0"
        >
          {/* Gradient 1 (Blue) - Top-left corner glow */}
          <div
            className="absolute -top-[200px] -left-[200px] w-[1100px] h-[1100px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(33,150,243,0.22) 0%, rgba(33,150,243,0.10) 35%, transparent 75%)",
              filter: "blur(220px)",
            }}
          />

          {/* Gradient 2 (Green) - Bottom-left corner glow */}
          <div
            className="absolute -bottom-[200px] -left-[200px] w-[1000px] h-[1000px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(0,255,120,0.16) 0%, rgba(0,255,120,0.08) 35%, transparent 75%)",
              filter: "blur(200px)",
            }}
          />

          <div className="grid lg:grid-cols-[45%_55%] gap-0 items-center justify-center max-w-[1920px] w-full">
            {/* Left column - content */}
            <div ref={scene5LeftRef} className="order-2 lg:order-1 opacity-0 will-change-transform">
              <h2 className="font-sans text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] font-semibold text-white leading-[1.08] tracking-tight">
                <span className="block">Shaping The Future Of</span>
                <span className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  Excellence
                </span>
                <span className="block mt-4 text-white/90">
                  Empowering Institutions
                </span>
                <span className="block text-white/80">Through Expertise</span>
              </h2>

              <p className="text-white/50 text-[15px] md:text-[16px] lg:text-[17px] leading-[1.75] max-w-[520px] font-light mt-8">
                To help educational institutions overcome operational challenges,
                unlock growth opportunities, and create environments where students,
                educators, and communities can thrive.
              </p>

              <button className="mt-10 group relative px-8 py-4 bg-black backdrop-blur-sm border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 pointer-events-auto">
                <span className="relative z-10 text-white/90 text-sm font-medium tracking-wide flex items-center gap-3">
                  Learn More
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Right column - orbital illustration */}
            <div ref={scene5RightRef} className="order-1 lg:order-2 flex items-center justify-center opacity-0 will-change-transform">
              <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
                {/* Outer ring */}
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="absolute inset-0 rounded-full border border-blue-500/20" style={{
                    boxShadow: "0 0 60px rgba(59, 130, 246, 0.1), inset 0 0 60px rgba(59, 130, 246, 0.05)"
                  }} />
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                  <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-blue-400/80 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.4)]" />
                </div>

                {/* Middle ring */}
                <div className="absolute inset-[8%] animate-spin-medium" style={{ animationDirection: "reverse" }}>
                  <div className="absolute inset-0 rounded-full border border-green-500/15" style={{
                    boxShadow: "0 0 50px rgba(34, 197, 94, 0.08), inset 0 0 50px rgba(34, 197, 94, 0.04)"
                  }} />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_18px_rgba(34,197,94,0.5)]" />
                </div>

                {/* Inner ring */}
                <div className="absolute inset-[16%] animate-spin-fast">
                  <div className="absolute inset-0 rounded-full border border-purple-500/10" style={{
                    boxShadow: "0 0 40px rgba(168, 85, 247, 0.06), inset 0 0 40px rgba(168, 85, 247, 0.03)"
                  }} />
                </div>

                {/* Center image */}
                <div className="relative w-[52%] aspect-square rounded-full overflow-hidden border-4 border-white/5 z-10" style={{
                  boxShadow: "0 0 80px rgba(59, 130, 246, 0.15), 0 0 40px rgba(34, 197, 94, 0.1), inset 0 0 60px rgba(0, 0, 0, 0.3)"
                }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10 z-10 pointer-events-none" />
                  <Image
                    src="/about/hero/circular_img.png"
                    alt="Vision & Values"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 300px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 6 - Stats/Achievements section */}
        <div
          ref={scene6Ref}
          className="absolute inset-0 flex items-center justify-center p-8 md:px-16 lg:px-20 overflow-hidden opacity-0"
        >
          {/* Gradient 1 (Blue) - Top-right corner glow */}
          <div
            className="absolute -top-[200px] -right-[200px] w-[1100px] h-[1100px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.05) 35%, transparent 75%)",
              filter: "blur(220px)",
            }}
          />

          {/* Gradient 2 (Green) - Bottom-left corner glow */}
          <div
            className="absolute -bottom-[200px] -left-[200px] w-[1000px] h-[1000px] pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(34,197,94,0.10) 0%, rgba(34,197,94,0.04) 35%, transparent 75%)",
              filter: "blur(200px)",
            }}
          />

          <div className="max-w-[1200px] w-full">
            <h2 className="font-sans text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] font-semibold text-gray-900/50 leading-[1.08] tracking-tight text-center mb-16">
              <span className="block">Trusted By Institutions</span>
              <span className="block text-gray-800/50">Across The Globe</span>
            </h2>

            <div
              ref={statsCounterRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            >
              {/* Stat 1 */}
              <div className="text-center">
                <div
                  className="stat-number font-sans text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] font-bold leading-none bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                  data-value="15"
                >
                  0
                </div>
                <div className="text-gray-600 text-sm md:text-base mt-3 font-light tracking-wide">
                  Years of Excellence
                </div>
              </div>

              {/* Stat 2 */}
              <div className="text-center">
                <div
                  className="stat-number font-sans text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] font-bold leading-none bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                  data-value="500"
                >
                  0
                </div>
                <div className="text-gray-600 text-sm md:text-base mt-3 font-light tracking-wide">
                  Institutions Served
                </div>
              </div>

              {/* Stat 3 */}
              <div className="text-center">
                <div
                  className="stat-number font-sans text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] font-bold leading-none bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                  data-value="2"
                >
                  0
                </div>
                <div className="text-gray-600 text-sm md:text-base mt-3 font-light tracking-wide">
                  Million Students Impacted
                </div>
              </div>

              {/* Stat 4 */}
              <div className="text-center">
                <div
                  className="stat-number font-sans text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] xl:text-[5rem] font-bold leading-none bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
                  data-value="98"
                >
                  0
                </div>
                <div className="text-gray-600 text-sm md:text-base mt-3 font-light tracking-wide">
                  % Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 7 - One Vision section */}
        <div
          ref={scene7Ref}
          className="absolute inset-0 flex items-center justify-center p-8 md:px-16 lg:px-20 overflow-hidden z-[25] pointer-events-auto"
        >
          {/* Black background with grid */}
          <div
            ref={scene7BlackBgRef}
            className="absolute inset-0 z-0 opacity-0 bg-black"
          >
            {/* Grid Background - positioned only behind text */}
            <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 pointer-events-none">
              <GridBackground
                lineColor="rgba(113, 196, 255, 0.2)"
                dotColor="rgba(113, 196, 255, 0.4)"
                gridSize={50}
                dotSize={1.5}
                vignetteIntensity={60}
              />
            </div>
          </div>

          {/* Content container - 50/50 split */}
          <div className="max-w-[1600px] w-full mx-auto grid lg:grid-cols-2 gap-8 items-center relative z-10 pointer-events-auto">
            {/* Left - Text content */}
            <div ref={scene7LeftRef} className="text-left will-change-transform pl-4 md:pl-8 pointer-events-auto">
              <h2 className="font-sans text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-light leading-[1.1] tracking-tight" style={{ color: "#71C4FF" }}>
                <span className="block">One Vision.</span>
              </h2>
              <h3 className="font-sans text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-light leading-[1.1] tracking-tight mt-4" style={{ color: "#71C4FF" }}>
                <span className="block">Multiple Areas Of Expertise.</span>
              </h3>
              <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed max-w-xl mt-6 font-light">
                From human resources and finance to technology, infrastructure, student development, and operational support, Edify delivers connected solutions designed for institutional success.
              </p>

              {/* Pagination indicator */}
              <div className="flex items-center gap-2 mt-12">
                <div ref={scene7Dot1Ref} className="h-0.5 bg-white transition-all duration-300" style={{ width: "48px" }}></div>
                <div ref={scene7Dot2Ref} className="h-0.5 bg-gray-600 transition-all duration-300" style={{ width: "8px" }}></div>
                <div ref={scene7Dot3Ref} className="h-0.5 bg-gray-600 transition-all duration-300" style={{ width: "8px" }}></div>
                <div ref={scene7Dot4Ref} className="h-0.5 bg-gray-600 transition-all duration-300" style={{ width: "8px" }}></div>
              </div>
            </div>

            {/* Right - Hexagonal network image with 4 carousel steps */}
            <div ref={scene7RightRef} className="flex items-center justify-center will-change-transform w-full">
              <div className="relative w-full max-w-[1000px] aspect-square flex items-center justify-center">
                <div ref={scene7Image1Ref} className="absolute inset-0 flex items-center justify-center transition-all duration-300">
                  <Image
                    src="/about/hero/img1-vision.png"
                    alt="One Vision - Area 1"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 600px, (max-width: 1024px) 800px, 1000px"
                    priority
                  />
                </div>
                <div ref={scene7Image2Ref} className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0">
                  <Image
                    src="/about/hero/img2-vision.png"
                    alt="One Vision - Area 2"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 600px, (max-width: 1024px) 800px, 1000px"
                  />
                </div>
                <div ref={scene7Image3Ref} className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0">
                  <Image
                    src="/about/hero/img3-vision.png"
                    alt="One Vision - Area 3"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 600px, (max-width: 1024px) 800px, 1000px"
                  />
                </div>
                <div ref={scene7Image4Ref} className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0">
                  <Image
                    src="/about/hero/img4-vision.png"
                    alt="One Vision - Area 4"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 600px, (max-width: 1024px) 800px, 1000px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Animation Styles for Orbital Rings ── */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-medium {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 45s linear infinite;
        }
        .animate-spin-medium {
          animation: spin-medium 35s linear infinite;
        }
        .animate-spin-fast {
          animation: spin-fast 25s linear infinite;
        }
      `}</style>
    </section>
  </div>
  );
}
