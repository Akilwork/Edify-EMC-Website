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

        {/* Scene 5 - VisionValues content (slides in from right) */}
        <div
          ref={scene5Ref}
          className="absolute inset-0 z-[5] flex items-center justify-center p-8 md:px-16 lg:px-20 opacity-0"
        >
          <div className="grid lg:grid-cols-[45%_55%] gap-0 items-center justify-center max-w-[1920px] w-full">
            {/* Left column - content */}
            <div className="order-2 lg:order-1">
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

              <button className="mt-10 group relative px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <span className="relative z-10 text-white/90 text-sm font-medium tracking-wide">
                  Learn More
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            {/* Right column - orbital illustration */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
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
  );
}
