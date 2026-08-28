"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CareerPillars() {
  const PILLARS_DATA = [
    {
      title: "Growth & Learning",
      desc: "Access continuous learning, training, mentorship, and opportunities to develop your skills."
    },
    {
      title: "Collaborative Culture",
      desc: "Access continuous learning, training, mentorship, and opportunities to develop your skills."
    },
    {
      title: "Meaningful Work",
      desc: "Contribute to projects and solutions that positively influence institutions, businesses, and communities."
    },
    {
      title: "Innovation & Technology",
      desc: "Access continuous learning, training, mentorship, and opportunities to develop your skills."
    },
    {
      title: "Leadership Opportunities",
      desc: "Contribute to projects and solutions that positively influence institutions, businesses, and communities."
    },
    {
      title: "Work-Life Balance",
      desc: "Access continuous learning, training, mentorship, and opportunities to develop your skills."
    }
  ];

  const getBorderClasses = (idx: number) => {
    let classes = "";
    // Mobile borders (single column stack):
    // Draw bottom border for all except the last item
    if (idx < 5) {
      classes += "border-b border-white/10 ";
    }
    // Desktop/tablet borders (2 columns):
    // Even indexes (0, 2, 4) get a right border on md screens
    if (idx % 2 === 0) {
      classes += "md:border-r md:border-white/10 ";
    } else {
      classes += "md:border-r-0 ";
    }
    // First 4 items (0, 1, 2, 3) get a bottom border on md screens, last 2 (4, 5) don't.
    if (idx < 4) {
      classes += "md:border-b md:border-white/10 ";
    } else {
      classes += "md:border-b-0 ";
    }
    return classes;
  };

  return (
    <section className="relative w-full overflow-hidden bg-black py-20 md:py-28 flex justify-center border-t border-white/[0.05]">
      {/* Moving line light background (using Group 47.png) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <motion.div
          className="absolute inset-[-20%] opacity-[0.06] mix-blend-screen"
          animate={{
            x: ["-5%", "5%", "-2%", "3%", "-5%"],
            y: ["-5%", "2%", "-4%", "5%", "-5%"],
            rotate: [0, 3, -2, 1, 0],
            scale: [1, 1.05, 0.98, 1.02, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: "url('/assets/Group 47.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Center ambient glow matching the teal theme */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(58,186,180,0.03),transparent_70%)]" />
      </div>

      {/* Grid Content Container */}
      <div className="relative z-10 w-full container-responsive container-max px-6 sm:px-12 lg:px-8 flex flex-col lg:flex-row items-stretch gap-16 lg:gap-12">
        {/* Left side text column */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center text-left">
          <h2 className="font-sans text-4xl sm:text-5xl lg:text-[54px] lg:leading-[1.12] font-medium tracking-tight text-white max-w-md">
            More Than a Job. <br />
            A Place to Grow.
          </h2>
        </div>

        {/* Right side pillars grid */}
        <div className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 relative border border-white/5 bg-white/[0.005] rounded-3xl backdrop-blur-sm overflow-hidden">
          {PILLARS_DATA.map((pillar, idx) => (
            <div
              key={idx}
              className={`group relative flex flex-col justify-start gap-6 p-8 sm:p-10 lg:p-12 hover:bg-white/[0.015] transition-all duration-500 ease-out ${getBorderClasses(idx)}`}
            >
              {/* Circle Badge Icon */}
              <div className="w-14 h-14 rounded-full flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/15 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.5)] group-hover:border-[#3ABAB4]/30 group-hover:shadow-[0_0_15px_rgba(58,186,180,0.15)] transition-all duration-300">
                {/* Shine effect */}
                <div className="absolute top-0.5 inset-x-2 h-[20%] rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(58,186,180,0.25),transparent_60%)]" />
                
                {/* Center molecular sphere */}
                <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#3ABAB4] relative z-10 transition-transform duration-500 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="50" cy="50" r="16" fill={`url(#sphereGlow-${idx})`} stroke="#3ABAB4" strokeWidth="1.5" />
                  <circle cx="50" cy="50" r="32" stroke="rgba(58,186,180,0.25)" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="24" stroke="rgba(58,186,180,0.4)" />
                  
                  <line x1="50" y1="50" x2="30" y2="30" stroke="#3ABAB4" strokeWidth="1" opacity="0.6" />
                  <line x1="50" y1="50" x2="70" y2="30" stroke="#3ABAB4" strokeWidth="1" opacity="0.6" />
                  <line x1="50" y1="50" x2="50" y2="74" stroke="#3ABAB4" strokeWidth="1" opacity="0.6" />
                  <line x1="50" y1="50" x2="26" y2="50" stroke="#3ABAB4" strokeWidth="1" opacity="0.6" />
                  <line x1="50" y1="50" x2="74" y2="50" stroke="#3ABAB4" strokeWidth="1" opacity="0.6" />
                  
                  <circle cx="30" cy="30" r="2.5" fill="#3ABAB4" />
                  <circle cx="70" cy="30" r="2.5" fill="#3ABAB4" />
                  <circle cx="50" cy="74" r="2.5" fill="#3ABAB4" />
                  <circle cx="26" cy="50" r="2.5" fill="#3ABAB4" />
                  <circle cx="74" cy="50" r="2.5" fill="#3ABAB4" />
                  <circle cx="50" cy="50" r="4" fill="#fff" />
                  
                  <defs>
                    <radialGradient id={`sphereGlow-${idx}`} cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#3ABAB4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#1e5c59" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>

              {/* Text Info */}
              <div className="space-y-3">
                <h3 className="font-sans text-xl font-medium text-white">
                  {pillar.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-sans font-normal">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
