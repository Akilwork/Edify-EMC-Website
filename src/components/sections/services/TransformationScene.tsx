"use client";

import { useEffect, useRef } from "react";
import { RefreshCw, CheckCircle2, ArrowRight } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

interface TransformationSceneProps {
  isVisible: boolean;
}

export default function TransformationScene({ isVisible }: TransformationSceneProps) {
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const animate = async () => {
      const { default: gsap } = await import("gsap");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Left column slides in from left
      if (leftColRef.current) {
        tl.fromTo(
          leftColRef.current,
          { opacity: 0, x: -80, filter: "blur(8px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 1 }
        );
      }

      // Right column slides in from right with scale
      if (rightColRef.current) {
        tl.fromTo(
          rightColRef.current,
          { opacity: 0, x: 80, scale: 0.85, filter: "blur(8px)" },
          { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "back.out(1.2)" },
          "-=0.8"
        );
      }

      // Icon rotation animation
      if (iconRef.current) {
        tl.fromTo(
          iconRef.current,
          { opacity: 0, scale: 0.5, rotation: -180 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "back.out(1.3)" },
          "-=0.8"
        );

        // Continuous slow rotation
        gsap.to(iconRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none"
        });
      }
    };

    animate();
  }, [isVisible]);

  const benefits = [
    "Cultural transformation & alignment",
    "Organisational restructuring",
    "Performance optimization",
    "Sustainable change implementation"
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto grid lg:grid-cols-[45%_55%] gap-8 lg:gap-16 items-center px-4 md:px-8">
      {/* Left Column: Content */}
      <div ref={leftColRef} className="order-2 lg:order-1 text-left">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl mb-6">
          <RefreshCw size={32} className="text-blue-400" />
        </div>

        <h2 className="font-sans text-[clamp(24px,4vw,36px)] md:text-[clamp(28px,4vw,40px)] lg:text-[clamp(32px,3.5vw,44px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
          {isVisible && (
            <BlurText
              text="Organisational Transformation"
              animateBy="words"
              direction="top"
              delay={50}
              stepDuration={0.3}
              className="flex flex-wrap"
              threshold={0.5}
            />
          )}
        </h2>

        <p className="text-white/60 text-[15px] md:text-[16px] lg:text-[17px] leading-[1.75] mb-8">
          End-to-end transformation programmes that reshape culture, structure, and performance to create lasting organisational impact.
        </p>

        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3 text-white/80">
              <CheckCircle2 size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <span className="text-[15px] md:text-[16px]">{benefit}</span>
            </li>
          ))}
        </ul>

        <button className="mt-8 group inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Right Column: Visual */}
      <div ref={rightColRef} className="order-1 lg:order-2 flex items-center justify-center">
        <div ref={iconRef} className="relative">
          {/* Circular transformation visual */}
          <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
            {/* Outer ring */}
            <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full" />
            <div className="absolute inset-4 border border-blue-500/30 rounded-full border-dashed animate-spin" style={{ animationDuration: '30s' }} />
            <div className="absolute inset-8 border-2 border-purple-500/20 rounded-full" />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500/15 to-purple-600/15 rounded-full flex items-center justify-center">
                <RefreshCw size={48} className="text-blue-400" strokeWidth={1.5} />
              </div>
            </div>

            {/* Orbiting dots */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4 h-4 bg-blue-400/80 rounded-full" />
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1 w-3 h-3 bg-purple-400/80 rounded-full" />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/40 rounded-full" />
          <div className="absolute bottom-8 left-8 w-3 h-3 bg-purple-400/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}
