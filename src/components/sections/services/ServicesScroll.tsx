"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import GridBackground from "@/components/ui/GridBackground";

// Service categories data
const SERVICE_CATEGORIES = [
  {
    id: "institutional-management",
    title: "Institutional Management",
    description: "Building strong institutions through strategic leadership, efficient operations, and sustainable organizational growth.",
    image: "/demo-img",
    services: [
      { id: "hr-management", title: "Human Resource Management" },
      { id: "educational-consulting", title: "Educational & Institutional Consulting" },
      { id: "financial-consultancy", title: "Financial Consultancy" }
    ]
  },
  {
    id: "technology-innovation",
    title: "Technology & Innovation",
    description: "Empowering institutions with smart technologies that enhance efficiency, connectivity, and digital transformation.",
    image: "/technology-img",
    services: [
      { id: "it-solutions", title: "IT Solutions & Digital Transformation" },
      { id: "ecommerce-services", title: "E-Commerce & Digital Services" },
      { id: "printing-branding", title: "Printing & Branding Solutions" }
    ]
  },
  {
    id: "student-development",
    title: "Student Development",
    description: "Supporting holistic student growth through wellbeing, guidance, and talent development initiatives.",
    image: "/student-development",
    services: [
      { id: "behavioural-counselling", title: "Behavioural Counselling & Student Support" },
      { id: "sports-training", title: "Sports Training & Talent Development" }
    ]
  },
  {
    id: "infrastructure-operations",
    title: "Infrastructure & Operations",
    description: "Creating safe, efficient, and future-ready environments that support institutional excellence.",
    image: "/infrastructure-img",
    services: [
      { id: "civil-engineering", title: "Civil Engineering & Infrastructure Development" },
      { id: "transportation", title: "Transportation & Fleet Support" },
      { id: "uniform-solutions", title: "Uniform Solutions" }
    ]
  }
];

export default function ServicesScroll() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    // Simple fade-in animation for hero on page load
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* ─── Scene 1: Hero Section ─── */}
      <section
        ref={heroRef}
        className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-[#0A0D14]"
      >
        {/* Background Layers */}
        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0F1419] to-slate-900" />
          <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
          <div className="absolute inset-0 opacity-40">
            <GridBackground
              lineColor="rgba(168, 85, 247, 0.4)"
              dotColor="rgba(168, 85, 247, 0)"
              gridSize={50}
              dotSize={0}
              vignetteIntensity={30}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #0A0D14 90%)" }} />
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-[5] flex items-center justify-center p-8 md:px-16 lg:px-20 pointer-events-none">
          <div className="text-center max-w-[1400px]">
            <h1 className="font-sans text-[clamp(32px,5vw,56px)] md:text-[clamp(42px,5vw,64px)] lg:text-[clamp(48px,5vw,72px)] 2xl:text-[clamp(56px,4.5vw,80px)] font-normal leading-[1.1] tracking-tight text-white mb-8">
              {heroVisible && (
                <BlurText
                  text="Expertise That Powers Educational Excellence"
                  animateBy="words"
                  direction="top"
                  delay={100}
                  stepDuration={0.4}
                  className="flex flex-wrap justify-center"
                  threshold={0.5}
                  rootMargin="0px"
                />
              )}
            </h1>
            <p className="text-white/50 text-[15px] md:text-[17px] lg:text-[19px] leading-[1.75] max-w-2xl mx-auto">
              Integrated solutions designed to strengthen institutions.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Scene 2: Services Categories Section ─── */}
      <section className="relative w-full bg-white">
        <div className="w-full bg-white py-24 md:py-32 relative">
          {/* Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #f3f4f6 1px, transparent 1px),
                  linear-gradient(to bottom, #f3f4f6 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            {/* Radial white overlay blends center */}
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, white 0%, transparent 50%)',
              }}
            />
          </div>

          <div className="w-full max-w-[1920px] mx-auto px-6 md:px-56 lg:px-60 relative z-10">
            {/* Display all categories one after another */}
            {SERVICE_CATEGORIES.map((category, index) => (
              <div
                key={category.id}
                className="w-full mb-24 md:mb-32 last:mb-0"
              >
                <div className="grid lg:grid-cols-[0.8fr_1.4fr] gap-8 md:gap-12 items-center">
                  {/* Left Column - Image Card */}
                  <div className="relative h-[400px] md:h-[500px] rounded-[24px] overflow-hidden shadow-lg">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8 max-w-md">
                      <h3 className="text-white text-[32px] font-normal mb-3">
                        {category.title}
                      </h3>
                      <p className="text-white/80 text-[14px] font-light leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Services List */}
                  <div className="flex flex-col justify-center py-8">
                    {category.services.map((service, serviceIndex) => (
                      <div key={service.id}>
                        <button
                          className="group w-full flex items-center justify-between py-12 text-left transition-colors duration-300 hover:bg-white rounded-lg px-4 -mx-4"
                        >
                          <span className="text-lg md:text-[32px] font-normal text-gray-900 group-hover:text-blue-600 group-hover:md:text-[34px] transition-all duration-300 ease-out">
                            {service.title}
                          </span>
                          <span className="flex items-center gap-2 text-blue-600 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            <span className="text-sm font-medium">Explore</span>
                            <ArrowRight size={18} />
                          </span>
                        </button>
                        {serviceIndex < category.services.length - 1 && (
                          <div className="border-t border-gray-200 ml-4 mr-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
