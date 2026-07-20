"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingLoaderProps {
  onComplete: () => void;
}

export default function LandingLoader({ onComplete }: LandingLoaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    // Disable scrolling on the main page while loader is active
    document.body.style.overflow = "hidden";

    // Try to play the video explicitly on mount
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Video auto-play failed. Fallback will trigger.", err);
      });
    }

    // Safety timeout: if the video doesn't play/finish or hangs, auto-complete after 3.5s
    const safetyTimeout = setTimeout(() => {
      handleComplete();
    }, 3500);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(safetyTimeout);
    };
  }, []);

  const handleComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsVisible(false);

    // Wait for the exit animation duration (600ms) before notifying the parent
    setTimeout(() => {
      onComplete();
      document.body.style.overflow = "";
    }, 600);
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="landing-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.02,
            filter: "blur(8px)",
            transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number] } 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Subtle glowing ambient background effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(58,186,180,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
          
          <video
            ref={videoRef}
            src="/Loader/Loading_animation_edify%201.mp4"
            muted
            playsInline
            autoPlay
            onEnded={handleComplete}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
