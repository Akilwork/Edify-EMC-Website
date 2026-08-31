"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Users, Award, ShieldCheck } from "lucide-react";

export default function   () {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Image columns refs
  const leftImageRef = useRef<HTMLDivElement>(null);
  const centerImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  // Content layers refs
  const initialHeaderRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapContext: any;

    const initGSAP = async () => {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      const gsap = gsapModule.default;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      // Setup matchMedia for responsive animations
      const mm = gsap.matchMedia();
      gsapContext = mm;

      mm.add({
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isDesktop: "(min-width: 1024px)"
      }, (context) => {
        const { isMobile, isTablet } = context.conditions || {};
        
        // Responsive scale targets to fit cover aspect perfectly without over-zooming
        const targetScale = isMobile ? 1.8 : isTablet ? 2.4 : 3.2;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outerRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1.2,
            pin: stickyRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ── PHASE 1: Zoom center, push sides, fade initial header, fade scrim ──
        tl.to(
          initialHeaderRef.current,
          {
            opacity: 0,
            y: -40,
            duration: 0.6,
            ease: "power2.out",
          },
          0
        );

        if (!isMobile) {
          // Slide left image out to the left
          if (leftImageRef.current) {
            tl.to(
              leftImageRef.current,
              {
                xPercent: -120,
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                ease: "power2.inOut",
              },
              0
            );
          }

          // Slide right image out to the right
          if (rightImageRef.current) {
            tl.to(
              rightImageRef.current,
              {
                xPercent: 120,
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                ease: "power2.inOut",
              },
              0
            );
          }
        }

        // Zoom the center image to fill the screen
        tl.to(
          centerImageRef.current,
          {
            scale: targetScale,
            borderRadius: "0px",
            duration: 1.6,
            ease: "power2.inOut",
          },
          0
        );

        // Animate the dark scrim over the center image
        tl.to(
          scrimRef.current,
          {
            opacity: 0.75,
            duration: 1.4,
            ease: "power1.inOut",
          },
          0.2
        );

        // ── PHASE 2: Fade in and slide up main content panels ──
        tl.fromTo(
          mainContentRef.current,
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            duration: 0.4,
          },
          0.8
        );

        // Slide up left text column
        tl.fromTo(
          leftTextRef.current,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          1.0
        );

        // Slide up cards staggered
        if (cardsContainerRef.current) {
          const cards = cardsContainerRef.current.children;
          tl.fromTo(
            cards,
            {
              y: 50,
              opacity: 0,
              scale: 0.96,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              stagger: 0.15,
              duration: 0.8,
              ease: "power3.out",
            },
            1.2
          );
        }
      }, outerRef);
    };

    initGSAP();

    return () => {
      if (gsapContext) {
        gsapContext.revert();
      }
    };
  }, []);

  return (
    <section
      ref={outerRef}
      className="relative w-full overflow-visible bg-black"
      style={{ height: "280vh" }}
    >
      <div
        ref={stickyRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-[#05060b] z-10"
      >
        {/* Background Visual Layer */}
        <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none select-none">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3ABAB4]/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Left Column Image (Hidden on Mobile) */}
          <div
            ref={leftImageRef}
            className="absolute left-[6%] md:left-[10%] lg:left-[12%] w-[24vw] h-[40vh] md:h-[48vh] rounded-3xl overflow-hidden hidden sm:block border border-white/10 opacity-60 z-0 will-change-transform"
          >
            <Image
              src="/assets/careers/career-1.png"
              fill
              sizes="25vw"
              className="object-cover"
              alt="Workspace and Focus"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Center Main Column Image (Zooms in to fill background) */}
          <div
            ref={centerImageRef}
            className="w-[85vw] sm:w-[48vw] md:w-[32vw] h-[48vh] md:h-[55vh] rounded-3xl overflow-hidden relative border border-white/15 z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] will-change-transform"
          >
            <Image
              src="/assets/careers/career-3.png"
              fill
              sizes="(max-width: 640px) 85vw, 32vw"
              className="object-cover"
              alt="Team Collaboration"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Right Column Image (Hidden on Mobile) */}
          <div
            ref={rightImageRef}
            className="absolute right-[6%] md:right-[10%] lg:right-[12%] w-[24vw] h-[40vh] md:h-[48vh] rounded-3xl overflow-hidden hidden sm:block border border-white/10 opacity-60 z-0 will-change-transform"
          >
            <Image
              src="/assets/careers/career-4.png"
              fill
              sizes="25vw"
              className="object-cover"
              alt="Creative office environment"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Scrim Overlay */}
          <div
            ref={scrimRef}
            className="absolute inset-0 bg-black opacity-0 z-20 pointer-events-none"
          />
        </div>

        {/* Initial Header Row (Visible at start, fades out as user scrolls) */}
        <div
          ref={initialHeaderRef}
          className="absolute top-[6%] md:top-[8%] z-20 text-center space-y-4 max-w-xl px-6 pointer-events-none select-none"
        >
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-[46px] lg:leading-tight font-medium text-white tracking-tight">
            Life Inside EDIFY
          </h2>
          <p className="text-white/50 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Scroll down to explore how our teams collaborate, innovate, and thrive.
          </p>
        </div>

        {/* Main Content Layer (Fades in overlaying the zoomed image) */}
        <div
          ref={mainContentRef}
          className="absolute inset-0 z-30 flex items-center justify-center pointer-events-auto opacity-0 invisible"
        >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-8 py-4 sm:py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center">
            
            {/* Left side text block */}
            <div ref={leftTextRef} className="lg:col-span-5 space-y-3 sm:space-y-4 lg:space-y-5 text-left">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-white uppercase block">
                Vibrant & Empowering
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-[48px] lg:leading-[1.15] font-medium tracking-tight text-white">
                Where Passion <br /> Meets Purpose.
              </h2>
              <p className="text-white/70 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed font-sans">
                At EDIFY, we believe that reshaping educational and enterprise consultancy requires trust, continuous development, and high execution. We offer our team members room to lead, collaborate globally, and make a tangible impact.
              </p>
            </div>

            {/* Right side glassmorphic cards */}
            <div
              ref={cardsContainerRef}
              className="lg:col-span-7 flex flex-col gap-3 lg:gap-4 w-full"
            >
              {[
                {
                  icon: <Users className="w-4 h-4 sm:w-5 h-5 text-white transition-colors duration-300" />,
                  title: "Absolute Autonomy",
                  desc: "We hire brilliant minds and get out of their way. Own your tasks, drive execution, and shape solutions with total trust."
                },
                {
                  icon: <Award className="w-4 h-4 sm:w-5 h-5 text-white transition-colors duration-300" />,
                  title: "Continuous Growth",
                  desc: "Invest in your career path with sponsored technical trainings, professional education, certifications, and active mentorship."
                },
                {
                  icon: <ShieldCheck className="w-4 h-4 sm:w-5 h-5 text-white transition-colors duration-300" />,
                  title: "Modern Collaboration",
                  desc: "Work in visual, friction-free office spaces (or remote/hybrid set ups) utilizing the best collaboration suites and tech stacks."
                }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="flex gap-3 sm:gap-4 p-4 lg:p-5 bg-white/[0.02] border border-white/[0.07] backdrop-blur-md rounded-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)] group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all duration-300">
                    {card.icon}
                  </div>
                  <div className="space-y-1 text-left">
                    <h3 className="font-sans text-xs sm:text-sm lg:text-base font-semibold text-white transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="text-white/50 text-[10px] sm:text-xs leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
