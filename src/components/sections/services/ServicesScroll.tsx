"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Workflow, Bus, Shirt } from "lucide-react";

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
    "10 Specialized Domains",
    "Integrated Solutions",
    "Expert Professionals",
    "Long-Term Support"
  ];

  const serviceCards = [
    {
      image: "/Service-page/Human-Resource-Services.png",
      title: "Human Resource Management",
      description: "Recruitment, workforce planning, payroll, compliance, performance management, and employee development.",
      isWide: false,
      slug: "human-resource-services"
    },
    {
      image: "/Service-page/Educationalal.png",
      title: "Academics",
      description: "Strategic guidance for institutional planning, governance, accreditation, student support, and academic excellence.",
      isWide: false,
      slug: "educational-institutional-consulting"
    },
    {
      image: "/Service-page/Financial-Consultancy.png",
      title: "Financial Consultancy",
      description: "Financial planning, budgeting, compliance, auditing support, and long-term sustainability strategies.",
      isWide: false,
      slug: "financial-consultancy"
    }
  ];

  const techServiceCards = [
    {
      image: "/Service-page/IT-Solutions-%26-Digital-Transformation.png",
      title: "IT Solutions & Digital Transformation",
      description: "Technology consulting, software solutions, E-Commerce, digital platforms, automation, infrastructure, and digital modernization.",
      isWide: true,
      slug: "it-solutions-digital-transformation"
    },
    {
      image: "/Service-page/Printing-%26-Branding-Solutions.png",
      title: "Marketing",
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

  const campusServiceCards = [
    {
      image: "/Service-page/Civil-Engineering-&-Infrastructure-Development.png",
      title: "Civil Engineering & Infrastructure Development",
      description: "Infrastructure planning, civil engineering, and construction support that build safe, modern, future-ready learning environments.",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      slug: "civil-engineering-infrastructure"
    },
    {
      image: "/Service-page/Transportation-&-Fleet-Support.png",
      title: "Transportation & Fleet Support",
      description: "Safe, reliable student transportation, fleet management, route optimisation, and compliance that keep your institution moving.",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
      slug: "transportation-fleet-support"
    },
    {
      image: "/Service-page/student-development.jpg",
      title: "Canteen Service",
      description: "Hygienic, nutritious, and high-quality canteen management and catering services tailored for educational institutions.",
      colSpan: "col-span-12 md:col-span-12 lg:col-span-4",
      slug: "canteen-management-services"
    },
    {
      image: "/Service-page/Uniform-&-Clothing-Solutions.png",
      title: "Uniform Solutions",
      description: "Quality school uniforms, sports kits, and institutional clothing designed to reflect your institution's identity and standards.",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-6",
      slug: "uniform-solutions"
    },
    {
      image: "/Service-page/Sports-Training-&-Talent-Development.png",
      title: "Sports Training & Talent Development",
      description: "Professional sports coaching, athletic development, and talent identification programmes that nurture student athletes.",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-6",
      slug: "sports-training-talent-development"
    }
  ];

  const campusBottomHighlights = [
    {
      icon: <Bus className="w-8 h-8" />,
      text: "Building safe, connected campuses through integrated physical and logistical infrastructure."
    },
    {
      icon: <Shirt className="w-8 h-8" />,
      text: "Elevating student life through unified identity, healthy development, and purposeful environments."
    }
  ];

  // Shared responsive card sizing — scales from phones to large desktops
  const cardHeight = "h-[380px] sm:h-[360px] md:h-[420px] lg:h-[400px] xl:h-[440px] 2xl:h-[480px]";

  return (
    <div className="relative">
      {/* ─── Hero Section ─── */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[100svh] overflow-hidden bg-black"
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
        <div className="relative z-10 flex flex-col min-h-[100svh] container-responsive container-max py-16">
          {/* Main content - centered */}
          <div className={`flex-1 flex flex-col justify-center max-w-4xl transition-opacity duration-1000 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Headline */}
            <h1 className="font-sans font-normal text-[2rem] leading-tight tracking-tight text-white mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] 2xl:text-[84px]">
              Expertise That Builds Stronger Institutions.
            </h1>

            {/* Full-width line */}
            <div className="w-full h-px bg-white/30 mb-6 sm:mb-8" />

            {/* Supporting Copy */}
            <p className="text-white/80 text-sm leading-relaxed max-w-3xl sm:text-base md:text-lg lg:text-xl">
              Integrated consulting and professional services designed to strengthen every aspect of educational institutions—from strategy and people to infrastructure, technology, and student development.
            </p>
          </div>

          {/* Highlights at bottom */}
          <div className={`transition-opacity duration-1000 delay-300 ${heroVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2 lg:flex-nowrap lg:divide-x lg:divide-white/20">
              {heroHighlights.map((highlight, index) => (
                <div key={index} className="lg:px-8 lg:first:pl-0">
                  {/* Highlight text */}
                  <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-normal py-1 sm:py-0">
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
        className="relative w-full bg-white py-20 md:py-28"
      >
        <div className={`container-responsive container-max transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Heading and Subhead */}
          <div className="text-center mb-10 md:mb-14 lg:mb-20">
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-3 md:mb-4">
              Institutional Management
            </h2>
            <p className="text-black/70 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
              Building strong institutions through strategic leadership, efficient operations, and sustainable organizational growth.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-5 xl:gap-6 mb-12 md:mb-16">
            {serviceCards.map((card, index) => (
              <Link
                key={index}
                href={`/services/${card.slug}`}
                aria-label={card.title}
                className={`group relative overflow-hidden rounded-2xl lg:rounded-[28px] ${cardHeight} w-full ${
                  card.isWide ? 'sm:col-span-2 lg:col-span-2' : 'lg:col-span-1'
                } border border-black/10 bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 block`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-transform duration-500 ease-out group-hover:-translate-y-10">
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
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-5 lg:flex-nowrap lg:divide-x lg:divide-black/20">
            {bottomHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-4 lg:px-8 lg:first:pl-0 max-w-md">
                {/* Icon */}
                <div className="flex-shrink-0 text-black/50 mt-1">
                  {highlight.icon}
                </div>
                {/* Text */}
                <p className="text-black/90 text-sm md:text-base leading-relaxed">
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Technology & Innovation Section ─── */}
      <section className="relative w-full bg-white py-20 md:py-28">
        <div className="container-responsive container-max">
          {/* Heading and Subhead */}
          <div className="text-center mb-10 md:mb-14 lg:mb-20">
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-3 md:mb-4">
              Technology & Innovation
            </h2>
            <p className="text-black/70 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
              Empowering institutions with smart technologies that enhance efficiency, connectivity, and digital transformation.
            </p>
          </div>

          {/* Cards Grid — normal cards span 1, the wide card spans 2 (full row on small screens) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-5 xl:gap-6 mb-12 md:mb-16">
            {techServiceCards.map((card, index) => (
              <Link
                key={index}
                href={`/services/${card.slug}`}
                aria-label={card.title}
                className={`group relative overflow-hidden rounded-2xl lg:rounded-[28px] ${cardHeight} w-full ${
                  card.isWide ? 'sm:col-span-2 lg:col-span-2' : 'lg:col-span-1'
                } border border-black/10 bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 block`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-transform duration-500 ease-out group-hover:-translate-y-10">
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

          {/* Bottom Highlights — 4 short statements in a responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:divide-x lg:divide-black/20">
            {techBottomHighlights.map((highlight, index) => (
              <div key={index} className="lg:px-6 lg:first:pl-0">
                <p className="text-black/90 text-sm md:text-base leading-relaxed">
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Campus & Student Services Section ─── */}
      <section className="relative w-full bg-white py-20 md:py-28">
        <div className="container-responsive container-max">
          {/* Heading and Subhead */}
          <div className="text-center mb-10 md:mb-14 lg:mb-20">
            <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-3 md:mb-4">
              Campus &amp; Student Services
            </h2>
            <p className="text-black/70 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-2">
              Holistic campus support covering infrastructure, transport, uniforms, and sports to nurture well-rounded student development.
            </p>
          </div>

          {/* Cards Grid — Bento Grid 5 Layout */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-5 xl:gap-6 mb-12 md:mb-16">
            {campusServiceCards.map((card, index) => (
              <Link
                key={index}
                href={`/services/${card.slug}`}
                aria-label={card.title}
                className={`group relative overflow-hidden rounded-2xl lg:rounded-[28px] ${cardHeight} w-full ${card.colSpan} border border-black/10 bg-white shadow-sm hover:shadow-xl transition-shadow duration-500 block`}
                onMouseEnter={() => setHoveredCard(200 + index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-transform duration-500 ease-out group-hover:-translate-y-10">
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
          <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-5 lg:flex-nowrap lg:divide-x lg:divide-black/20">
            {campusBottomHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-4 lg:px-8 lg:first:pl-0 max-w-md">
                {/* Icon */}
                <div className="flex-shrink-0 text-black/50 mt-1">
                  {highlight.icon}
                </div>
                {/* Text */}
                <p className="text-black/90 text-sm md:text-base leading-relaxed">
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
