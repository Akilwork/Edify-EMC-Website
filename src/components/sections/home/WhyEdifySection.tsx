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
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black py-12 sm:py-16 lg:py-20"
    >
      {/* Abstract Background Image */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2/3 lg:w-3/5 h-2/3 lg:h-3/5 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/assets/Group 47.png"
            alt=""
            fill
            className="object-contain object-left opacity-50"
            priority={false}
            sizes="(max-width: 1024px) 67vw, 60vw"
          />
        </div>
      </div>

      <div className="relative z-10 w-full container-responsive container-xl">
        
        {/* Main Content */}
        <div ref={ref} className="flex items-center justify-center lg:justify-end min-h-[60vh]">
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-medium text-white leading-tight text-center lg:text-right max-w-4xl lg:mr-0 xl:mr-8"
            style={{ 
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 'clamp(2rem, 8vw, 6rem)'
            }}
          >
            Beyond Consulting.
          </motion.h1>
          
        </div>
      </div>
    </section>
  );
}
