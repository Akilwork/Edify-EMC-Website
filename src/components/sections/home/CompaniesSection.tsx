"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const logos = [
  { src: "/Client logo/1.png", alt: "Techno Alliance" },
  { src: "/Client logo/2.png", alt: "NIMS Group" },
  { src: "/Client logo/3.png", alt: "Imprint" },
  { src: "/Client logo/4.png", alt: "Golden Career" },
  { src: "/Client logo/5.png", alt: "Emke Garage" },
  { src: "/Client logo/6.png", alt: "EduCraft" },
  { src: "/Client logo/7.png", alt: "Uni Design" },
  { src: "/Client logo/8.png", alt: "Seed" },
  { src: "/Client logo/9.png", alt: "Toss Academy" },
  { src: "/Client logo/10.png", alt: "Loyaltri" }
];

export default function CompaniesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });

  const gap = 8;     // Gap size around the plus signs (in pixels)
  const ext = 24;    // Outer line extension (in pixels)

  // Grid boundaries for Desktop (5 columns, 2 rows)
  const desktopCols = ["0%", "20%", "40%", "60%", "80%", "100%"];
  const desktopRows = ["0%", "50%", "100%"];

  // Grid boundaries for Mobile (2 columns, 5 rows)
  const mobileCols = ["0%", "50%", "100%"];
  const mobileRows = ["0%", "20%", "40%", "60%", "80%", "100%"];

  // Animation variants
  const lineVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } }
  };



  const textVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const logoContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  return (
    <section
      id="companies"
      ref={containerRef}
      className="relative w-full bg-white py-10 md:py-16 overflow-hidden font-sans border-t border-[#F1F5F9]"
    >
      <div className="container-responsive container-max relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <motion.h2
            variants={textVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="font-sans font-bold text-black tracking-tight leading-tight text-center"
            style={{
              fontFamily: "var(--font-inter-tight, 'Inter Tight', sans-serif)",
              fontSize: "clamp(1.85rem, 4vw, 2.5rem)",
            }}
          >
            Partnering with Excellence
          </motion.h2>
          
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
            className="text-[#64748B] text-center font-normal mt-4 max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-inter-tight, 'Inter Tight', sans-serif)",
              fontSize: "clamp(0.95rem, 2.5vw, 1.125rem)",
              lineHeight: 1.6
            }}
          >
            Proud to collaborate with organizations that inspire innovation and progress.
          </motion.p>
        </div>

        {/* Retro Grid Container */}
        <div className="relative w-full max-w-[1100px] mx-auto px-4 md:px-0">
          
          {/* ========================================================================= */}
          {/* DESKTOP RETRO GRID (5 cols x 2 rows) - Visible md and up                 */}
          {/* ========================================================================= */}
          <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
            {/* Horizontal Line Segments (broken at intersections) */}
            {desktopRows.map((topVal, yIdx) => {
              const segments = [];
              // Draw segments inside the grid
              for (let c = 0; c < 5; c++) {
                segments.push(
                  <motion.div
                    key={`desk-h-seg-${yIdx}-${c}`}
                    variants={lineVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="absolute h-[1px] bg-[#E2E8F0]"
                    style={{
                      top: topVal,
                      left: `calc(${c * 20}% + ${gap}px)`,
                      width: `calc(20% - ${gap * 2}px)`
                    }}
                  />
                );
              }
              // Draw extensions outside left and right
              segments.push(
                <motion.div
                  key={`desk-h-ext-l-${yIdx}`}
                  variants={lineVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="absolute h-[1px] bg-[#E2E8F0]"
                  style={{
                    top: topVal,
                    left: `-${ext}px`,
                    width: `${ext - gap}px`
                  }}
                />
              );
              segments.push(
                <motion.div
                  key={`desk-h-ext-r-${yIdx}`}
                  variants={lineVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="absolute h-[1px] bg-[#E2E8F0]"
                  style={{
                    top: topVal,
                    left: `calc(100% + ${gap}px)`,
                    width: `${ext - gap}px`
                  }}
                />
              );
              return segments;
            })}
            
            {/* Vertical Line Segments (broken at intersections) */}
            {desktopCols.map((leftVal, xIdx) => {
              const segments = [];
              // Draw segments inside the grid
              for (let r = 0; r < 2; r++) {
                segments.push(
                  <motion.div
                    key={`desk-v-seg-${xIdx}-${r}`}
                    variants={lineVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="absolute w-[1px] bg-[#E2E8F0]"
                    style={{
                      left: leftVal,
                      top: `calc(${r * 50}% + ${gap}px)`,
                      height: `calc(50% - ${gap * 2}px)`
                    }}
                  />
                );
              }
              // Draw extensions outside top and bottom
              segments.push(
                <motion.div
                  key={`desk-v-ext-t-${xIdx}`}
                  variants={lineVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="absolute w-[1px] bg-[#E2E8F0]"
                  style={{
                    left: leftVal,
                    top: `-${ext}px`,
                    height: `${ext - gap}px`
                  }}
                />
              );
              segments.push(
                <motion.div
                  key={`desk-v-ext-b-${xIdx}`}
                  variants={lineVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="absolute w-[1px] bg-[#E2E8F0]"
                  style={{
                    left: leftVal,
                    top: `calc(100% + ${gap}px)`,
                    height: `${ext - gap}px`
                  }}
                />
              );
              return segments;
            })}


          </div>

          {/* ========================================================================= */}
          {/* MOBILE RETRO GRID (2 cols x 5 rows) - Visible below md                  */}
          {/* ========================================================================= */}
          <div className="block md:hidden absolute inset-0 pointer-events-none z-0">
            {/* Horizontal Line Segments (broken at intersections) */}
            {mobileRows.map((topVal, yIdx) => {
              const segments = [];
              // Draw segments inside grid
              for (let c = 0; c < 2; c++) {
                segments.push(
                  <motion.div
                    key={`mob-h-seg-${yIdx}-${c}`}
                    variants={lineVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="absolute h-[1px] bg-[#E2E8F0]"
                    style={{
                      top: topVal,
                      left: `calc(${c * 50}% + ${gap}px)`,
                      width: `calc(50% - ${gap * 2}px)`
                    }}
                  />
                );
              }
              // Draw extensions outside left and right
              segments.push(
                <motion.div
                  key={`mob-h-ext-l-${yIdx}`}
                  variants={lineVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="absolute h-[1px] bg-[#E2E8F0]"
                  style={{
                    top: topVal,
                    left: `-${ext}px`,
                    width: `${ext - gap}px`
                  }}
                />
              );
              segments.push(
                <motion.div
                  key={`mob-h-ext-r-${yIdx}`}
                  variants={lineVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="absolute h-[1px] bg-[#E2E8F0]"
                  style={{
                    top: topVal,
                    left: `calc(100% + ${gap}px)`,
                    width: `${ext - gap}px`
                  }}
                />
              );
              return segments;
            })}

            {/* Vertical Line Segments (broken at intersections) */}
            {mobileCols.map((leftVal, xIdx) => {
              const segments = [];
              // Draw segments inside grid
              for (let r = 0; r < 5; r++) {
                segments.push(
                  <motion.div
                    key={`mob-v-seg-${xIdx}-${r}`}
                    variants={lineVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="absolute w-[1px] bg-[#E2E8F0]"
                    style={{
                      left: leftVal,
                      top: `calc(${r * 20}% + ${gap}px)`,
                      height: `calc(20% - ${gap * 2}px)`
                    }}
                  />
                );
              }
              // Draw extensions outside top and bottom
              segments.push(
                <motion.div
                  key={`mob-v-ext-t-${xIdx}`}
                  variants={lineVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="absolute w-[1px] bg-[#E2E8F0]"
                  style={{
                    left: leftVal,
                    top: `-${ext}px`,
                    height: `${ext - gap}px`
                  }}
                />
              );
              segments.push(
                <motion.div
                  key={`mob-v-ext-b-${xIdx}`}
                  variants={lineVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="absolute w-[1px] bg-[#E2E8F0]"
                  style={{
                    left: leftVal,
                    top: `calc(100% + ${gap}px)`,
                    height: `${ext - gap}px`
                  }}
                />
              );
              return segments;
            })}


          </div>

          {/* ========================================================================= */}
          {/* LOGOS GRID DISPLAY                                                        */}
          {/* ========================================================================= */}
          <motion.div
            variants={logoContainerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative z-10 grid grid-cols-2 md:grid-cols-5 w-full"
          >
            {logos.map((logo, idx) => (
              <motion.div
                key={idx}
                variants={logoVariants}
                className="relative flex items-center justify-center h-28 sm:h-32 md:h-36 px-4 py-6 sm:px-6 sm:py-8 md:p-8"
              >
                <div className="relative w-full h-full flex items-center justify-center transition-all duration-300 hover:scale-[1.04]">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain max-h-[56px] sm:max-h-[64px] md:max-h-[72px] transition-all duration-300 filter"
                    sizes="(max-width: 768px) 45vw, 18vw"
                    priority={idx < 5}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
