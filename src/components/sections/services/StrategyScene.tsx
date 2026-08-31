"use client";

import { useEffect, useRef } from "react";
import { Target, CheckCircle2, ArrowRight } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

interface StrategySceneProps {
  isVisible: boolean;
}

export default function StrategyScene({ isVisible }: StrategySceneProps) {
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

      // Icon animation
      if (iconRef.current) {
        tl.fromTo(
          iconRef.current,
          { opacity: 0, scale: 0.5, rotation: -30 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.5)" },
          "-=0.8"
        );
      }
    };

    animate();
  }, [isVisible]);

  const benefits = [
    "Strategic alignment with institutional goals",
    "Data-driven decision making",
    "Long-term sustainability planning",
    "Market positioning optimization"
  ];

  return (
    <div className="container-responsive container-max grid lg:grid-cols-[45%_55%] gap-8 lg:gap-16 items-center">
      {/* Left Column: Content */}
      <div ref={leftColRef} className="order-2 lg:order-1 text-left">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl mb-6">
          <Target size={32} className="text-cyan-400" />
        </div>

        <h2 className="font-sans text-[clamp(24px,4vw,36px)] md:text-[clamp(28px,4vw,40px)] lg:text-[clamp(32px,3.5vw,44px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
          {isVisible && (
            <BlurText
              text="Strategy & Planning"
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
          Comprehensive strategic planning to align your organisation's goals with market realities and create a roadmap for sustainable growth.
        </p>

        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3 text-white/80">
              <CheckCircle2 size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
              <span className="text-[15px] md:text-[16px]">{benefit}</span>
            </li>
          ))}
        </ul>

        <button className="mt-8 group inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Right Column: Visual */}
      <div ref={rightColRef} className="order-1 lg:order-2 flex items-center justify-center">
        <div ref={iconRef} className="relative">
          {/* Main icon container */}
          <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-full flex items-center justify-center border border-cyan-500/20">
            <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-cyan-500/15 to-blue-600/15 rounded-full flex items-center justify-center">
              <Target size={64} className="text-cyan-400" strokeWidth={1.5} />
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-8 right-8 w-4 h-4 bg-cyan-400/60 rounded-full animate-pulse" />
          <div className="absolute bottom-12 left-12 w-3 h-3 bg-blue-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 left-4 w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
}
