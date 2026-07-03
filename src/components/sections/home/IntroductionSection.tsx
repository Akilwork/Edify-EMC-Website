"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function IntroductionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-100px 0px -100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  return (
    <section
      id="introduction"
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      {/* Background - Dark gradient matching the Figma design */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at top center, rgba(147, 51, 234, 0.15) 0%, rgba(147, 51, 234, 0.05) 35%, transparent 70%),
              radial-gradient(ellipse at bottom left, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, #0a0d14 0%, #0f1419 50%, #121620 100%)
            `
          }}
        />
      </div>

      {/* Main Content Container */}
      <motion.div
        className="relative z-10 w-full container-responsive container-max"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Hero Title with 3D Cube */}
        <div className="text-center">
          <motion.h1
            className="font-sans font-medium text-white leading-[1.1] tracking-tight mb-16 lg:mb-20"
            style={{
              fontSize: "clamp(2rem, 2rem + 2vw, 4rem)",
              maxWidth: "min(95%, 800px)",
              margin: "0 auto 4rem auto"
            }}
            variants={itemVariants}
          >
            One Trusted Partner for Every Educational Institution Need
          </motion.h1>

          {/* 3D Cube Image */}
          <motion.div
            className="relative w-full max-w-lg mx-auto"
            variants={imageVariants}
          >
            {/* Glow effect behind the image */}
            <div className="absolute inset-0 w-80 h-80 mx-auto bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-3xl rounded-full" />
            
            <motion.div
              className="relative w-80 h-80 mx-auto z-10"
              animate={{
                y: [0, -10, 0],
                rotateY: [0, 3, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Image
                src="/assets/Group 42.png"
                alt="Edify 3D Cube"
                fill
                className="object-contain drop-shadow-2xl"
                priority
                sizes="(max-width: 768px) 280px, 320px"
              />
            </motion.div>
          </motion.div>
        </div>


      </motion.div>
    </section>
  );
}