"use client";

import { SERVICE_CATEGORIES } from "@/data/service-categories";
import { useEffect, useRef, useState } from "react";
import GridBackground from "@/components/ui/GridBackground";

const CARD_GRADIENTS = [
  "linear-gradient(135deg, rgba(123, 104, 238, 0.15) 0%, rgba(65, 105, 225, 0.15) 100%)",
  "linear-gradient(135deg, rgba(32, 178, 170, 0.15) 0%, rgba(72, 209, 204, 0.15) 100%)",
  "linear-gradient(135deg, rgba(255, 99, 71, 0.15) 0%, rgba(255, 159, 64, 0.15) 100%)",
  "linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(250, 204, 21, 0.15) 100%)",
  "linear-gradient(135deg, rgba(50, 205, 50, 0.15) 0%, rgba(74, 222, 128, 0.15) 100%)",
  "linear-gradient(135deg, rgba(147, 112, 219, 0.15) 0%, rgba(167, 139, 250, 0.15) 100%)",
  "linear-gradient(135deg, rgba(255, 140, 0, 0.15) 0%, rgba(251, 146, 60, 0.15) 100%)",
  "linear-gradient(135deg, rgba(70, 130, 180, 0.15) 0%, rgba(96, 165, 250, 0.15) 100%)",
  "linear-gradient(135deg, rgba(218, 112, 214, 0.15) 0%, rgba(244, 114, 182, 0.15) 100%)",
  "linear-gradient(135deg, rgba(60, 179, 113, 0.15) 0%, rgba(52, 211, 153, 0.15) 100%)",
  "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(129, 140, 248, 0.15) 100%)",
];

const BORDER_COLORS = [
  "rgba(123, 104, 238, 0.6)",
  "rgba(32, 178, 170, 0.6)",
  "rgba(255, 99, 71, 0.6)",
  "rgba(255, 215, 0, 0.6)",
  "rgba(50, 205, 50, 0.6)",
  "rgba(147, 112, 219, 0.6)",
  "rgba(255, 140, 0, 0.6)",
  "rgba(70, 130, 180, 0.6)",
  "rgba(218, 112, 214, 0.6)",
  "rgba(60, 179, 113, 0.6)",
  "rgba(139, 92, 246, 0.6)",
];

export default function ServiceSection() {
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setTimeout(() => {
              setVisibleSections((prev) => new Set([...prev, index]));
            }, index * 100);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-50px" }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-[#0A0D14] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <GridBackground
          lineColor="rgba(168, 85, 247, 0.17)"
          dotColor="rgba(168, 85, 247, 0.3)"
          gridSize={50}
          dotSize={1.5}
          vignetteIntensity={50}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Introduction */}
        <div className="w-full py-20 md:py-32 container-responsive container-max">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white mb-6 leading-tight">
              One Ecosystem.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Multiple Areas Of Expertise.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
              Supporting every stage of institutional growth through multidisciplinary consulting and professional services.
            </p>
          </div>
        </div>

        {/* Service Categories */}
        {SERVICE_CATEGORIES.map((category, index) => {
          const gradientStart = index * 2;
          const isVisible = visibleSections.has(index);

          return (
            <div
              key={category.id}
              ref={(el) => {
                if (sectionRefs.current) {
                  sectionRefs.current[index] = el;
                }
              }}
              data-index={index}
              className={`w-full py-16 md:py-24 container-responsive container-max transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-32"
              }`}
            >
              <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
                  {/* Left: Title and Description */}
                  <div className="lg:col-span-1 lg:sticky lg:top-32">
                    <div className="mb-4">
                      <span className="text-sm font-medium text-purple-400 tracking-wider uppercase">
                        0{index + 1}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
                      {category.title}
                    </h2>
                    <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-md">
                      {category.description || "Comprehensive solutions tailored to your institution's unique needs and challenges."}
                    </p>
                  </div>

                  {/* Right: Service Cards */}
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                    {category.services.map((service, serviceIndex) => {
                      const gradientIndex = (gradientStart + serviceIndex) % CARD_GRADIENTS.length;
                      const isHovered = false;

                      return (
                        <div
                          key={service.id}
                          className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
                          style={{
                            background: CARD_GRADIENTS[gradientIndex],
                            border: `1px solid ${BORDER_COLORS[gradientIndex]}`,
                            backdropFilter: "blur(10px)",
                            minHeight: "180px",
                          }}
                        >
                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          {/* Card Content */}
                          <div className="relative h-full p-6 flex flex-col justify-center">
                            <div className="mb-3">
                              <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{
                                  background: `linear-gradient(135deg, ${BORDER_COLORS[gradientIndex]}, ${BORDER_COLORS[gradientIndex]}40)`,
                                }}
                              >
                                <svg
                                  className="w-5 h-5 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <h3 className="text-white text-lg md:text-xl font-medium leading-snug group-hover:text-purple-200 transition-colors duration-300">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
