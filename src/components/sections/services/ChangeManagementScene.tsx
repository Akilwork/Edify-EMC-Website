"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, CheckCircle2, ArrowRight } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

interface ChangeManagementSceneProps {
  isVisible: boolean;
}

export default function ChangeManagementScene({ isVisible }: ChangeManagementSceneProps) {
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const animate = async () => {
      const { default: gsap } = await import("gsap");

      // Left column slides in from left
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -80, filter: "blur(8px)" },
          { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
        );
      }

      // Right column slides in from right with scale
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 80, scale: 0.85, filter: "blur(8px)" },
          { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "back.out(1.2)" }
        );
      }

      // Icon upward arrow animation
      if (iconRef.current) {
        gsap.fromTo(
          iconRef.current,
          { opacity: 0, y: 50, scale: 0.5 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.4)" }
        );
      }
    };

    animate();
  }, [isVisible]);

  const benefits = [
    "Stakeholder engagement & alignment",
    "Communication strategy",
    "Training & support programs",
    "Adoption measurement & sustainment"
  ];

  return (
    <div className="container-responsive container-max grid lg:grid-cols-[45%_55%] gap-8 lg:gap-16 items-center">
      {/* Left Column: Content */}
      <div ref={leftColRef} className="order-2 lg:order-1 text-left">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-2xl mb-6">
          <ArrowUpRight size={32} className="text-emerald-400" />
        </div>

        <h2 className="font-sans text-[clamp(24px,4vw,36px)] md:text-[clamp(28px,4vw,40px)] lg:text-[clamp(32px,3.5vw,44px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
          {isVisible && (
            <BlurText
              text="Change Management"
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
          Structured change management to ensure sustainable adoption, minimise disruption, and maximise the success of your initiatives.
        </p>

        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3 text-white/80">
              <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-[15px] md:text-[16px]">{benefit}</span>
            </li>
          ))}
        </ul>

        <button className="mt-8 group inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Right Column: Visual */}
      <div ref={rightColRef} className="order-1 lg:order-2 flex items-center justify-center">
        <div ref={iconRef} className="relative">
          {/* Growth/arrow visual */}
          <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative flex items-center justify-center">
            {/* Growth chart background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              {/* Grid lines */}
              <line x1="10" y1="90" x2="90" y2="90" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5" />
              <line x1="10" y1="70" x2="90" y2="70" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5" />
              <line x1="10" y1="30" x2="90" y2="30" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5" />
              <line x1="10" y1="10" x2="90" y2="10" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5" />
              <line x1="10" y1="10" x2="10" y2="90" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5" />
              <line x1="30" y1="10" x2="30" y2="90" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5" />
              <line x1="70" y1="10" x2="70" y2="90" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5" />
              <line x1="90" y1="10" x2="90" y2="90" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="0.5" />

              {/* Growth line */}
              <path d="M 15 85 L 30 75 L 45 65 L 60 45 L 75 35 L 90 15"
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.6)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
            </svg>

            {/* Central arrow icon */}
            <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-full flex items-center justify-center border-2 border-emerald-500/30 backdrop-blur-sm">
              <ArrowUpRight size={40} className="text-emerald-400" strokeWidth={1.5} />
            </div>

            {/* Milestone dots */}
            <div className="absolute top-[15%] right-[10%] w-3 h-3 bg-emerald-400/80 rounded-full" />
            <div className="absolute top-[35%] right-[25%] w-2.5 h-2.5 bg-emerald-400/70 rounded-full" />
            <div className="absolute top-[50%] right-[40%] w-2 h-2 bg-emerald-400/60 rounded-full" />
            <div className="absolute top-[65%] right-[55%] w-2 h-2 bg-emerald-400/50 rounded-full" />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
  );
}
