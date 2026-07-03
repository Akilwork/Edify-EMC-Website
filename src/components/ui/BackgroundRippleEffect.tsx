"use client";

import React, { useEffect, useRef } from "react";

interface BackgroundRippleEffectProps {
  className?: string;
  rippleColor?: string;
  rippleCount?: number;
  animationDuration?: number;
}

/**
 * Background ripple effect that creates expanding circles from the center.
 */
export const BackgroundRippleEffect = ({
  className = "",
  rippleColor = "rgba(59, 130, 246, 0.1)",
  rippleCount = 3,
  animationDuration = 8,
}: BackgroundRippleEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create ripple elements
    const ripples: HTMLDivElement[] = [];
    for (let i = 0; i < rippleCount; i++) {
      const ripple = document.createElement("div");
      ripple.className = "absolute rounded-full border";
      ripple.style.left = "50%";
      ripple.style.top = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.borderColor = rippleColor;
      ripple.style.borderWidth = "2px";
      ripple.style.boxShadow = `0 0 20px ${rippleColor}`;
      ripple.style.animation = `ripple-expand ${animationDuration}s ease-out infinite`;
      ripple.style.animationDelay = `${i * (animationDuration / rippleCount)}s`;
      container.appendChild(ripple);
      ripples.push(ripple);
    }

    return () => {
      ripples.forEach((ripple) => ripple.remove());
    };
  }, [rippleColor, rippleCount, animationDuration]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}
      style={{ overflow: "hidden" }}
    >
      <style jsx>{`
        @keyframes ripple-expand {
          0% {
            width: 0px;
            height: 0px;
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            width: 250vmax;
            height: 250vmax;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundRippleEffect;
