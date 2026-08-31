"use client";

import { useEffect, useRef } from "react";
import { Users, CheckCircle2, ArrowRight } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

interface LeadershipSceneProps {
  isVisible: boolean;
}

export default function LeadershipScene({ isVisible }: LeadershipSceneProps) {
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

      // Icon scale animation
      if (iconRef.current) {
        gsap.fromTo(
          iconRef.current,
          { opacity: 0, scale: 0.3 },
          { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }
        );
      }
    };

    animate();
  }, [isVisible]);

  const benefits = [
    "Executive leadership development",
    "Talent pipeline creation",
    "Team capability building",
    "Succession planning"
  ];

  return (
    <div className="container-responsive container-max grid lg:grid-cols-[45%_55%] gap-8 lg:gap-16 items-center">
      {/* Left Column: Content */}
      <div ref={leftColRef} className="order-2 lg:order-1 text-left">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl mb-6">
          <Users size={32} className="text-purple-400" />
        </div>

        <h2 className="font-sans text-[clamp(24px,4vw,36px)] md:text-[clamp(28px,4vw,40px)] lg:text-[clamp(32px,3.5vw,44px)] font-semibold leading-[1.1] tracking-tight text-white mb-6">
          {isVisible && (
            <BlurText
              text="Leadership Development"
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
          Tailored leadership programmes that build the capabilities needed for tomorrow's challenges and create a pipeline of future-ready leaders.
        </p>

        <ul className="space-y-4">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-3 text-white/80">
              <CheckCircle2 size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
              <span className="text-[15px] md:text-[16px]">{benefit}</span>
            </li>
          ))}
        </ul>

        <button className="mt-8 group inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Right Column: Visual */}
      <div ref={rightColRef} className="order-1 lg:order-2 flex items-center justify-center">
        <div ref={iconRef} className="relative">
          {/* People network visual */}
          <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <line x1="50" y1="50" x2="20" y2="30" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="80" y2="30" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="20" y2="70" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="0.5" />
              <line x1="50" y1="50" x2="80" y2="70" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="0.5" />
            </svg>

            {/* Central leader */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-full flex items-center justify-center border-2 border-purple-500/30">
              <Users size={32} className="text-purple-400" strokeWidth={1.5} />
            </div>

            {/* Satellite team members */}
            <div className="absolute top-[15%] left-[20%] w-12 h-12 bg-purple-500/15 rounded-full flex items-center justify-center border border-purple-400/30">
              <Users size={20} className="text-purple-300" strokeWidth={2} />
            </div>
            <div className="absolute top-[15%] right-[20%] w-12 h-12 bg-purple-500/15 rounded-full flex items-center justify-center border border-purple-400/30">
              <Users size={20} className="text-purple-300" strokeWidth={2} />
            </div>
            <div className="absolute bottom-[15%] left-[20%] w-12 h-12 bg-purple-500/15 rounded-full flex items-center justify-center border border-purple-400/30">
              <Users size={20} className="text-purple-300" strokeWidth={2} />
            </div>
            <div className="absolute bottom-[15%] right-[20%] w-12 h-12 bg-purple-500/15 rounded-full flex items-center justify-center border border-purple-400/30">
              <Users size={20} className="text-purple-300" strokeWidth={2} />
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
  );
}
