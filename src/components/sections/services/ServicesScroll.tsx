"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import GridBackground from "@/components/ui/GridBackground";

export default function ServicesScroll() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const servicesListRef = useRef<HTMLDivElement>(null);

  const [heroVisible, setHeroVisible] = useState(false);

  const cleanupFnRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const scene2 = scene2Ref.current;
    const imageCard = imageCardRef.current;
    const servicesList = servicesListRef.current;

    if (!hero || !scene2) return;

    const setupAnimation = async () => {
      try {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.default;

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation on Page Load
        const loadTimeline = gsap.timeline({ defaults: { ease: "power2.out" } });

        loadTimeline.fromTo(
          hero,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.5 }
        );

        // Trigger hero text animation after load
        setTimeout(() => setHeroVisible(true), 500);

        // Scene 2 Animations
        const scene2Timeline = gsap.timeline({
          scrollTrigger: {
            trigger: scene2,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "power3.out" }
        });

        // Animate image card from left with scale and blur
        if (imageCard) {
          scene2Timeline.fromTo(
            imageCard,
            {
              opacity: 0,
              x: -100,
              scale: 0.9,
              filter: "blur(10px)"
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.2
            },
            0
          );
        }

        // Animate services list from right with stagger
        if (servicesList) {
          const serviceButtons = servicesList.querySelectorAll("button");

          scene2Timeline.fromTo(
            servicesList,
            { opacity: 0, x: 60 },
            { opacity: 1, x: 0, duration: 1 },
            0.3
          );

          scene2Timeline.fromTo(
            serviceButtons,
            {
              opacity: 0,
              y: 40,
              filter: "blur(8px)"
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.8,
              stagger: 0.15
            },
            0.5
          );
        }

        cleanupFnRef.current = () => {
          loadTimeline.kill();
          scene2Timeline.kill();
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      } catch (error) {
        console.error("Failed to initialize GSAP:", error);
      }
    };

    setupAnimation();

    return () => {
      if (cleanupFnRef.current) cleanupFnRef.current();
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* ─── Hero Section ─── */}
      <section
        ref={heroRef}
        className="relative w-full h-[65vh] min-h-[65svh] overflow-hidden bg-black"
      >
        {/* ── Background Layers ── */}
        <div className="absolute inset-0 z-[1]">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0F1419] to-slate-900" />

          {/* Animated orbs */}
          <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

          {/* Grid background */}
          <div className="absolute inset-0 opacity-40">
            <GridBackground
              lineColor="rgba(168, 85, 247, 0.4)"
              dotColor="rgba(168, 85, 247, 0)"
              gridSize={50}
              dotSize={0}
              vignetteIntensity={30}
            />
          </div>

          {/* Radial gradient vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #0A0D14 90%)" }} />
        </div>

        {/* ── Dark Overlay ── */}
        <div className="absolute inset-0 z-[3] bg-black/20 pointer-events-none" />

        {/* ── Content Container ── */}
        <div className="absolute inset-0 z-[5] flex items-center justify-center p-8 md:px-16 lg:px-20 pointer-events-none">
          <div className="w-full max-w-[1920px] mx-auto">
            {/* Hero Scene */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div ref={heroTextRef} className="text-center max-w-[1400px]">
                <h1 className="font-sans text-[clamp(32px,5vw,56px)] md:text-[clamp(42px,5vw,64px)] lg:text-[clamp(48px,5vw,72px)] 2xl:text-[clamp(56px,4.5vw,80px)] font-normal leading-[1.1] tracking-tight text-white mb-8">
                  {heroVisible && (
                    <BlurText
                      text="Expertise That Powers Educational Excellence"
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
                  Integrated solutions designed to strengthen institutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Fade Gradient ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-[10]" />
      </section>

      {/* ─── Services Cards Section ─── */}
      <section ref={scene2Ref} className="relative w-full bg-white py-20 md:py-32">
        <div className="w-full max-w-[1920px] mx-auto px-48 md:px-64 lg:px-72">
          {/* 2-Column Layout */}
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 md:gap-12">
            {/* Left Column - Image Card */}
            <div ref={imageCardRef} className="relative h-[500px] md:h-[600px] rounded-[16px] overflow-hidden shadow-lg">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: "url(/Service-page/demo-img.jpg)" }}
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Category Info - Bottom Left */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 max-w-md">
                <p className="text-white/70 text-sm md:text-base mb-2">Service Category</p>
                <h3 className="text-white text-xl md:text-2xl font-semibold mb-3">
                  Institutional Management
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  Building strong institutions through strategic leadership, efficient operations, and sustainable organizational growth.
                </p>
              </div>
            </div>

            {/* Right Column - Services List */}
            <div ref={servicesListRef} className="flex flex-col justify-center py-8">
              {[
                { id: "hr-management", title: "Human Resource Management" },
                { id: "educational-consulting", title: "Educational & Institutional Consulting" },
                { id: "financial-consultancy", title: "Financial Consultancy" }
              ].map((service, index) => (
                <div key={service.id}>
                  <button
                    className="group w-full flex items-center justify-between py-6 text-left transition-all duration-300 hover:bg-gray-50 rounded-lg px-4 -mx-4"
                  >
                    <span className="text-lg md:text-xl font-normal text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </span>
                    <span className="flex items-center gap-2 text-blue-600 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span className="text-sm font-medium">explore</span>
                      <ArrowRight size={18} />
                    </span>
                  </button>
                  {/* Divider - not after last item */}
                  {index < 2 && (
                    <div className="border-t border-gray-200 ml-4 mr-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
