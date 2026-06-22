"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function WhyEdifySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section 
      id="why-edify" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Abstract Background Image - Reduced Size */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3/5 h-3/5 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/assets/Group 47.png"
            alt=""
            fill
            className="object-contain object-left opacity-50"
            priority={false}
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Content - Positioned Center-Right */}
        <div ref={ref} className="flex items-center justify-center lg:justify-end min-h-screen">
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-white leading-tight text-center lg:text-right max-w-4xl lg:mr-8"
            style={{ 
              fontFamily: "Inter",
              fontWeight: 500
            }}
          >
            Beyond Consulting.
          </motion.h1>
          
        </div>
      </div>
    </section>
  );
}
