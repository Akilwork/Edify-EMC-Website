"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

function AnimatedTextLine({
  text,
  inView,
  startIndex = 0,
}: {
  text: string;
  inView: boolean;
  startIndex?: number;
}) {
  const words = text.split(" ");

  return (
    <span
      className="block"
      style={{ fontSize: 'clamp(1.25rem, 0.87rem + 1.62vw, 2.33rem)' }}
    >
      {words.map((word, i) => {
        const globalIndex = startIndex + i;
        const isSpecial = globalIndex === 0;

        return (
          <motion.span
            key={globalIndex}
            className="inline-block cursor-default mr-[0.3em] last:mr-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 0.2, y: 0 } : {}}
            whileHover={{
              opacity: 1,
              scale: isSpecial ? 1.15 : 1.05,
              color: "#FFFFFF",
              textShadow: isSpecial
                ? "0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.3)"
                : "0 0 10px rgba(255, 255, 255, 0.2)",
              transition: { duration: 0.2 },
            }}
            transition={{
              duration: 0.5,
              delay: 0.08 * globalIndex,
              ease: "easeOut",
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

export default function IntroSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="intro"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-12 sm:py-16 lg:py-20"
      style={{
        background: "linear-gradient(137.145deg, #08080A 31.128%, #5A5A70 160.8%)",
      }}
    >
      {/* ===== Background Layers ===== */}

      {/* Glowing Ellipse 7 — large soft glow, right-center area */}
      <div className="absolute pointer-events-none select-none hidden lg:block"
        style={{
          left: "364px",
          top: "347px",
          width: "775px",
          height: "775px",
          maxWidth: "60vw",
          maxHeight: "60vw",
          transform: "translateX(-15%)",
        }}
      >
        <Image
          src="/assets/ellipse-7.svg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>
      {/* Mobile fallback for Ellipse 7 */}
      <div className="absolute pointer-events-none select-none lg:hidden"
        style={{
          left: "50%",
          top: "40%",
          width: "80vw",
          height: "80vw",
          maxWidth: "500px",
          maxHeight: "500px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/assets/ellipse-7.svg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Glowing Ellipse 6 — top-left area */}
      <div
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{
          left: "-23px",
          top: "9px",
          width: "687px",
          height: "726px",
          transform: "rotate(129.59deg)",
          maxWidth: "50vw",
          maxHeight: "55vw",
        }}
      >
        <Image
          src="/assets/ellipse-6.svg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Glowing Ellipse 2 — right side area */}
      <div
        className="absolute pointer-events-none select-none hidden lg:block"
        style={{
          right: "-50px",
          top: "121px",
          width: "735px",
          height: "658px",
          transform: "rotate(34.13deg)",
          maxWidth: "50vw",
          maxHeight: "45vw",
        }}
      >
        <Image
          src="/assets/ellipse-2.svg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Vector Grid Network — subtle grid pattern across the section */}
      <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full max-w-[1440px] mx-auto">
          <Image
            src="/assets/vector-bg.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div
        ref={ref}
        className="relative z-10 w-full container-responsive container-xl text-center pt-8 sm:pt-12"
      >
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 sm:mb-8 lg:mb-10"
        >
          <h1 className="font-sans font-medium text-white leading-normal max-w-4xl mx-auto tracking-[0.01em]">
            <AnimatedTextLine
              text="One Trusted Partner for Every Educational"
              inView={inView}
              startIndex={0}
            />
            <AnimatedTextLine
              text="Institution Need"
              inView={inView}
              startIndex={6}
            />
          </h1>
        </motion.div>

        {/* 3D Card Image */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center relative"
        >
          {/* Glow backdrop behind the 3D cube */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[80%] h-[80%] rounded-full opacity-40"
              style={{
                background: "radial-gradient(circle, rgba(58, 212, 255, 0.3) 0%, rgba(120, 80, 255, 0.15) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </div>
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px] max-w-[95vw] max-h-[95vw] -mb-8 lg:-mb-12">
            <Image
              src="/assets/Group 42.png"
              alt="Edify 3D Isometric Cube"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 400px, 500px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
