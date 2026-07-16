"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Workflow } from "lucide-react";

export default function ServicesScroll() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      description: "Recruitment, workforce planning, payroll, compliance, performance management, and employee development.",
      slug: "human-resource-services"
    },
    {
      image: "/Service-page/Educationalal.png",
      title: "Educational & Institutional Consulting",
      description: "Strategic guidance for institutional planning, governance, accreditation, and operational excellence.",
      slug: "educational-institutional-consulting"
    },
    {
      image: "/Service-page/Financial-Consultancy.png",
      title: "Financial Consultancy",
      description: "Financial planning, budgeting, compliance, auditing support, and long-term sustainability strategies.",
      slug: "financial-consultancy"
    },
    {
      image: "/Service-page/Behavioural-Counselling-&-Student-Support.png",
      title: "Behavioural Counselling & Student Support",
      description: "Professional counselling, wellbeing programmes, mentoring, and student support services.",
      slug: "behavioural-counselling-student-support"
    }
  ];

  const techServiceCards = [
    {
      image: "/Service-page/IT-Solutions-%26-Digital-Transformation.png",
      title: "IT Solutions & Digital Transformation",
      description: "Technology consulting, software solutions, automation, infrastructure, and digital modernization.",
      isWide: false,
      slug: "it-solutions-digital-transformation"
    },
    {
      image: "/Service-page/E-Commerce-%26-Digital-Services.png",
      title: "E-Commerce & Digital Services",
      description: "Digital platforms, online solutions, web services, and technology-driven growth.",
      isWide: false,
      slug: "ecommerce-digital-services"
    },
    {
      image: "/Service-page/Printing-%26-Branding-Solutions.png",
      title: "Printing & Branding Solutions",
      description: "Professional branding, printing, promotional materials, and visual communication services.",
      isWide: true,
      slug: "printing-branding-solutions"
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

  const techBottomHighlights = [
    "Accelerating digital transformation through intelligent technology solutions.",
    "Enhancing operational efficiency with connected digital ecosystems.",
    "Empowering institutions with secure, scalable, and future-ready technologies.",
    "Simplifying complex operations through innovative digital experiences."
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
        className="relative w-full bg-white min-h-screen px-2 md:px-4 lg:px-8 xl:px-8 flex flex-col justify-center"
      >
        <div className={`max-w-[1440px] mx-auto transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6 mb-12 md:mb-16">
            {serviceCards.map((card, index) => (
              <Link
                key={index}
                href={`/services/${card.slug}`}
                aria-label={card.title}
                className="group relative overflow-hidden rounded-lg lg:rounded-[32px] h-[400px] md:h-[450px] lg:h-[400px] w-full md:w-full lg:w-[320px] border border-black/10 bg-white shadow-sm group-hover:shadow-xl transition-shadow duration-500 block"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Explore More */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity duration-500 flex items-center gap-2 text-white text-xs z-10">
                  <span className="uppercase">Explore More</span>
                  <ArrowRight className="w-3 h-3" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-[-40px]">
                  <h3 className="text-white text-base md:text-lg lg:text-xl font-medium mb-3 transition-all duration-500 ease-out">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-xs leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all duration-500 ease-out">
                    {card.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Highlights */}
          <div className="flex flex-col md:flex-row md:items-center md:divide-x md:divide-black/20 gap-6 md:gap-0">
            {bottomHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-4 md:px-8 max-w-md">
                {/* Icon */}
                <div className="flex-shrink-0 text-black/50 mt-1">
                  {highlight.icon}
                </div>
                {/* Text */}
                <p className="text-black/90 text-xs md:text-sm leading-relaxed">
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Technology & Innovation Section ─── */}
      <section className="relative w-full bg-white min-h-screen px-2 md:px-4 lg:px-8 xl:px-8 flex flex-col justify-center py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto">
          {/* Heading and Subhead */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
              Technology & Innovation
            </h2>
            <p className="text-black/70 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              Empowering institutions with smart technologies that enhance efficiency, connectivity, and digital transformation.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6 mb-12 md:mb-16">
            {techServiceCards.map((card, index) => (
              <Link
                key={index}
                href={`/services/${card.slug}`}
                aria-label={card.title}
                className={`group relative overflow-hidden rounded-lg lg:rounded-[32px] h-[400px] md:h-[450px] lg:h-[400px] w-full md:w-full ${
                  card.isWide ? 'lg:w-[664px]' : 'lg:w-[320px]'
                } border border-black/10 bg-white shadow-sm group-hover:shadow-xl transition-shadow duration-500 block`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Explore More */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-60 transition-opacity duration-500 flex items-center gap-2 text-white text-xs z-10">
                  <span className="uppercase">Explore More</span>
                  <ArrowRight className="w-3 h-3" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-transform duration-500 ease-out group-hover:translate-y-[-40px]">
                  <h3 className="text-white text-base md:text-lg lg:text-xl font-medium mb-3 transition-all duration-500 ease-out">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-xs leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-all duration-500 ease-out">
                    {card.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Highlights */}
          <div className="flex flex-col md:flex-row md:items-center md:divide-x md:divide-black/20 gap-6 md:gap-0">
            {techBottomHighlights.map((highlight, index) => (
              <div key={index} className="md:px-8">
                <p className="text-black/90 text-xs md:text-sm leading-relaxed">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
