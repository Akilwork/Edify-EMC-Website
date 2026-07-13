"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Workflow } from "lucide-react";

export default function ServicesScroll() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const heroHighlights = [
    "11 Specialized Domains",
    "Integrated Solutions",
    "Expert Professionals",
    "Long-Term Support"
  ];

  const serviceCards = [
    {
      image: "/Service-page/Human-Resource-Services.png",
      title: "Human Resource Management",
      description: "Recruitment, workforce planning, payroll, compliance, performance management, and employee development."
    },
    {
      image: "/Service-page/Educationalal.png",
      title: "Educational & Institutional Consulting",
      description: "Strategic guidance for institutional planning, governance, accreditation, and operational excellence."
    },
    {
      image: "/Service-page/Financial-Consultancy.png",
      title: "Financial Consultancy",
      description: "Financial planning, budgeting, compliance, auditing support, and long-term sustainability strategies."
    },
    {
      image: "/Service-page/Behavioural-Counselling-&-Student-Support.png",
      title: "Behavioural Counselling & Student Support",
      description: "Professional counselling, wellbeing programmes, mentoring, and student support services."
    }
  ];

  const bottomHighlights = [
    {
      icon: <Shield className="w-8 h-8" />,
      text: "Empowering leadership through expert management solutions."
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      text: "Driving efficiency with structured institutional frameworks."
    }
  ];

  return (
    <div className="relative">
      {/* ─── Hero Section ─── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen overflow-hidden bg-black"
      >
        {/* Background Video with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Service-page/hero-video-services" type="video/mp4" />
          </video>
          {/* Left-to-right gradient: black to 30% black */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen px-6 py-20 md:px-12 lg:px-20 xl:px-32">
          {/* Main content - centered */}
          <div className={`flex-1 flex flex-col justify-center max-w-4xl transition-opacity duration-1000 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Headline */}
            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-normal leading-tight tracking-tight text-white mb-6">
              Expertise That Builds Stronger Institutions.
            </h1>

            {/* Full-width line */}
            <div className="w-full h-px bg-white/30 mb-8" />

            {/* Supporting Copy */}
            <p className="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
              Integrated consulting and professional services designed to strengthen every aspect of educational institutions—from strategy and people to infrastructure, technology, and student development.
            </p>
          </div>

          {/* Highlights at bottom */}
          <div className={`transition-opacity duration-1000 delay-300 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col md:flex-row md:items-center md:divide-x md:divide-white/20">
              {heroHighlights.map((highlight, index) => (
                <div key={index} className="md:px-8">
                  {/* Highlight text */}
                  <p className="text-white text-lg md:text-xl lg:text-2xl font-normal py-4 md:py-0">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Service Listing Section ─── */}
      <section
        ref={sectionRef}
        className="relative w-full bg-white min-h-screen px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col justify-center"
      >
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Heading and Subhead */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
              Institutional Management
            </h2>
            <p className="text-black/70 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              Building strong institutions through strategic leadership, efficient operations, and sustainable organizational growth.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-12 md:mb-16">
            {serviceCards.map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-[2/3] md:aspect-[3/4] border border-black/10 bg-white"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-80 transition-opacity duration-500"
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-white text-base md:text-lg lg:text-xl font-medium mb-3">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Highlights */}
          <div className="flex flex-col md:flex-row md:items-center md:divide-x md:divide-black/20 gap-6 md:gap-0">
            {bottomHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start md:items-center gap-4 md:px-8">
                {/* Icon */}
                <div className="flex-shrink-0 text-black">
                  {highlight.icon}
                </div>
                {/* Text */}
                <p className="text-black/90 text-sm md:text-base lg:text-lg">
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
