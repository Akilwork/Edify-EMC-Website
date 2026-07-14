"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Network, Rocket, Shield, Smartphone, Workflow } from "lucide-react";

export default function ServicesScroll() {
  // Main container ref
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scene refs
  const heroSceneRef = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);

  // Video ref for parallax
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Element refs for animations
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const scene2TitleRef = useRef<HTMLHeadingElement>(null);
  const scene2CardsRef = useRef<HTMLDivElement>(null);
  const scene2HighlightsRef = useRef<HTMLDivElement>(null);
  const scene3TitleRef = useRef<HTMLHeadingElement>(null);
  const scene3CardsRef = useRef<HTMLDivElement>(null);
  const scene3HighlightsRef = useRef<HTMLDivElement>(null);
  const scene4TitleRef = useRef<HTMLHeadingElement>(null);
  const scene4CardsRef = useRef<HTMLDivElement>(null);

  // Card hover state (keep existing)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Cleanup ref
  const cleanupFnRef = useRef<(() => void) | null>(null);

  // Animation timing constants
  const ANIMATION_TIMING = {
    wordStagger: 80,
    cardStagger: 120,
    highlightStagger: 150,
    elementDelay: 300,
  };

  // Initialize GSAP
  useEffect(() => {
    const setupAnimation = async () => {
      try {
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        const gsap = gsapModule.default;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Safeguard: check if refs are ready
        if (
          !sectionRef.current ||
          !heroSceneRef.current ||
          !scene2Ref.current ||
          !scene3Ref.current ||
          !scene4Ref.current
        ) {
          console.warn("Some scene refs not ready, skipping animation setup");
          return;
        }

        // ─── Initial States ──────────────────────────────────────────────────────
        // Scene visibility
        gsap.set(heroSceneRef.current, { autoAlpha: 1 });
        gsap.set(scene2Ref.current, { autoAlpha: 0 });
        gsap.set(scene3Ref.current, { autoAlpha: 0 });
        gsap.set(scene4Ref.current, { autoAlpha: 0 });

        // ─── Hero Content Entrance (on load) ───────────────────────────────────────
        const heroTl = gsap.timeline({ delay: 0.3 });

        if (heroTitleRef.current) {
          // Target inner spans within .word-span elements
          const wordSpans = heroTitleRef.current.querySelectorAll('.word-span');
          const innerSpans: Element[] = [];
          wordSpans.forEach(span => {
            const inner = span.querySelector('span');
            if (inner) innerSpans.push(inner);
          });
          gsap.set(innerSpans, { y: 60, opacity: 0 });
          heroTl.to(innerSpans, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: ANIMATION_TIMING.wordStagger / 1000,
            ease: "power3.out"
          }, 0);
        }

        if (heroContentRef.current) {
          gsap.set(heroContentRef.current, { opacity: 0, y: 30 });
          heroTl.to(heroContentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.3");
        }

        // ─── Scroll-Triggered Timeline ──────────────────────────────────────────────
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=8000vh",
            pin: true,
            pinSpacing: true,
            scrub: 1,
          },
        });

        // ─── Scene 1 (Hero) Enhanced Video Parallax ────────────────────────────────
        if (videoContainerRef.current && videoRef.current) {
          // Enhanced parallax: scale and translateY
          tl.to(
            videoContainerRef.current,
            {
              scale: 1.2,
              y: -100,
              duration: 8,
              ease: "none",
            },
            0
          );
        }

        // ─── Scene 1 → Scene 2 Transition (at 1.5) ─────────────────────────────────────
        tl.to(
          heroSceneRef.current,
          {
            autoAlpha: 0,
            duration: 0.1,
            ease: "none",
          },
          1.5
        );

        tl.to(
          scene2Ref.current,
          {
            autoAlpha: 1,
            duration: 0.1,
            ease: "none",
          },
          1.5
        );

        // ─── Scene 2 Elements Animation (triggers at scene 2.0) ─────────────────────
        if (scene2TitleRef.current) {
          const wordSpans = scene2TitleRef.current.querySelectorAll('.word-span');
          const innerSpans: Element[] = [];
          wordSpans.forEach(span => {
            const inner = span.querySelector('span');
            if (inner) innerSpans.push(inner);
          });
          gsap.set(innerSpans, { y: 60, opacity: 0 });
          tl.to(innerSpans, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: ANIMATION_TIMING.wordStagger / 1000,
            ease: "power3.out"
          }, 2.1);
        }

        if (scene2CardsRef.current) {
          gsap.set(scene2CardsRef.current.children, { y: 80, opacity: 0 });
          tl.to(scene2CardsRef.current.children, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: ANIMATION_TIMING.cardStagger / 1000,
            ease: "power3.out"
          }, 2.3);
        }

        if (scene2HighlightsRef.current) {
          gsap.set(scene2HighlightsRef.current.children, { y: 40, opacity: 0 });
          tl.to(scene2HighlightsRef.current.children, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: ANIMATION_TIMING.highlightStagger / 1000,
            ease: "power2.out"
          }, 2.8);
        }

        // ─── Scene 2 → Scene 3 Transition (at 4.0) ─────────────────────────────────────
        tl.to(
          scene2Ref.current,
          {
            autoAlpha: 0,
            duration: 0.1,
            ease: "none",
          },
          4.0
        );

        tl.to(
          scene3Ref.current,
          {
            autoAlpha: 1,
            duration: 0.1,
            ease: "none",
          },
          4.0
        );

        // ─── Scene 3 Elements Animation (triggers at scene 4.5) ─────────────────────
        if (scene3TitleRef.current) {
          const wordSpans = scene3TitleRef.current.querySelectorAll('.word-span');
          const innerSpans: Element[] = [];
          wordSpans.forEach(span => {
            const inner = span.querySelector('span');
            if (inner) innerSpans.push(inner);
          });
          gsap.set(innerSpans, { y: 60, opacity: 0 });
          tl.to(innerSpans, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: ANIMATION_TIMING.wordStagger / 1000,
            ease: "power3.out"
          }, 4.6);
        }

        if (scene3CardsRef.current) {
          gsap.set(scene3CardsRef.current.children, { y: 80, opacity: 0 });
          tl.to(scene3CardsRef.current.children, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: ANIMATION_TIMING.cardStagger / 1000,
            ease: "power3.out"
          }, 4.8);
        }

        if (scene3HighlightsRef.current) {
          gsap.set(scene3HighlightsRef.current.children, { y: 40, opacity: 0 });
          tl.to(scene3HighlightsRef.current.children, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: ANIMATION_TIMING.highlightStagger / 1000,
            ease: "power2.out"
          }, 5.3);
        }

        // ─── Scene 3 → Scene 4 Transition (at 6.5) ─────────────────────────────────────
        tl.to(
          scene3Ref.current,
          {
            autoAlpha: 0,
            duration: 0.1,
            ease: "none",
          },
          6.5
        );

        tl.to(
          scene4Ref.current,
          {
            autoAlpha: 1,
            duration: 0.1,
            ease: "none",
          },
          6.5
        );

        // ─── Scene 4 Elements Animation (triggers at scene 7.0) ─────────────────────
        if (scene4TitleRef.current) {
          const wordSpans = scene4TitleRef.current.querySelectorAll('.word-span');
          const innerSpans: Element[] = [];
          wordSpans.forEach(span => {
            const inner = span.querySelector('span');
            if (inner) innerSpans.push(inner);
          });
          gsap.set(innerSpans, { y: 60, opacity: 0 });
          tl.to(innerSpans, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: ANIMATION_TIMING.wordStagger / 1000,
            ease: "power3.out"
          }, 7.1);
        }

        if (scene4CardsRef.current) {
          gsap.set(scene4CardsRef.current.children, { y: 80, opacity: 0 });
          tl.to(scene4CardsRef.current.children, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: ANIMATION_TIMING.cardStagger / 1000,
            ease: "power3.out"
          }, 7.3);
        }

        // Store cleanup function
        cleanupFnRef.current = () => {
          ScrollTrigger.getAll().forEach((st: any) => st.kill());
          tl.kill();
          heroTl?.kill();
        };
      } catch (error) {
        console.error("Failed to initialize GSAP:", error);
      }
    };

    setupAnimation();

    return () => {
      if (cleanupFnRef.current) cleanupFnRef.current();
    };
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

  const techServiceCards = [
    {
      image: "/Service-page/IT-Solutions-%26-Digital-Transformation.png",
      title: "IT Solutions & Digital Transformation",
      description: "Technology consulting, software solutions, automation, infrastructure, and digital modernization.",
      isWide: false
    },
    {
      image: "/Service-page/E-Commerce-%26-Digital-Services.png",
      title: "E-Commerce & Digital Services",
      description: "Digital platforms, online solutions, web services, and technology-driven growth.",
      isWide: false
    },
    {
      image: "/Service-page/Printing-%26-Branding-Solutions.png",
      title: "Printing & Branding Solutions",
      description: "Professional branding, printing, promotional materials, and visual communication services.",
      isWide: true
    }
  ];

  const infrastructureServiceCards = [
    {
      image: "/Service-page/Civil-Engineering-%26-Infrastructure-Development.png",
      title: "Civil Engineering & Infrastructure Development",
      description: "Campus planning, construction, renovation, facility development, and infrastructure consulting."
    },
    {
      image: "/Service-page/Transportation-%26-Fleet-Support.png",
      title: "Transportation & Fleet Support",
      description: "Reliable transportation management, fleet solutions, and operational support services."
    },
    {
      image: "/Service-page/Uniform-%26-Clothing-Solutions.png",
      title: "Uniform & Clothing Solutions",
      description: "Customized institutional uniforms designed for quality, comfort, and brand consistency."
    },
    {
      image: "/Service-page/Sports-Training-%26-Talent-Development.png",
      title: "Sports Training & Talent Development",
      description: "Structured coaching, athletic development, and programmes that nurture student potential."
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
    {
      icon: <Rocket className="w-8 h-8" />,
      text: "Accelerating digital transformation through intelligent technology solutions."
    },
    {
      icon: <Network className="w-8 h-8" />,
      text: "Enhancing operational efficiency with connected digital ecosystems."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      text: "Empowering institutions with secure, scalable, and future-ready technologies."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      text: "Simplifying complex operations through innovative digital experiences."
    }
  ];

  return (
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* ─── Scene 1: Hero Section ─── */}
      <div
        ref={heroSceneRef}
        className="absolute inset-0 overflow-hidden bg-black"
      >
        {/* Background Video with Gradient Overlay */}
        <div
          ref={videoContainerRef}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <video
            ref={videoRef}
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
          <div ref={heroContentRef} className="flex-1 flex flex-col justify-center max-w-4xl">
            {/* Headline */}
            <h1 ref={heroTitleRef} className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-[72px] font-normal leading-tight tracking-tight text-white mb-6">
              {'Expertise That Builds Stronger Institutions.'.split(' ').map((word, i) => (
                <span key={i} className="word-span inline-block overflow-hidden">
                  <span className="inline-block">{word}{i < 'Expertise That Builds Stronger Institutions.'.split(' ').length - 1 ? ' ' : ''}</span>
                </span>
              ))}
            </h1>

            {/* Full-width line */}
            <div className="w-full h-px bg-white/30 mb-8" />

            {/* Supporting Copy */}
            <p className="text-white/80 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl">
              Integrated consulting and professional services designed to strengthen every aspect of educational institutions—from strategy and people to infrastructure, technology, and student development.
            </p>
          </div>

          {/* Highlights at bottom */}
          <div>
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
      </div>

      {/* ─── Scene 2: Institutional Management Section ─── */}
      <div
        ref={scene2Ref}
        className="absolute inset-0 bg-white min-h-screen px-2 md:px-4 lg:px-8 xl:px-8 flex flex-col justify-center"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Heading and Subhead */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 ref={scene2TitleRef} className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
              {'Institutional Management'.split(' ').map((word, i) => (
                <span key={i} className="word-span inline-block overflow-hidden">
                  <span className="inline-block">{word}{i < 'Institutional Management'.split(' ').length - 1 ? ' ' : ''}</span>
                </span>
              ))}
            </h2>
            <p className="text-black/70 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              Building strong institutions through strategic leadership, efficient operations, and sustainable organizational growth.
            </p>
          </div>

          {/* Cards Grid */}
          <div ref={scene2CardsRef} className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6 mb-12 md:mb-16">
            {serviceCards.map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg lg:rounded-[32px] h-[400px] md:h-[450px] lg:h-[400px] w-full md:w-full lg:w-[320px] border border-black/10 bg-white shadow-sm group-hover:shadow-xl transition-shadow duration-500"
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
              </div>
            ))}
          </div>

          {/* Bottom Highlights */}
          <div ref={scene2HighlightsRef} className="flex flex-col md:flex-row md:items-center md:divide-x md:divide-black/20 gap-6 md:gap-0">
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
      </div>

      {/* ─── Scene 3: Technology & Innovation Section ─── */}
      <div
        ref={scene3Ref}
        className="absolute inset-0 bg-white min-h-screen px-2 md:px-4 lg:px-8 xl:px-8 flex flex-col justify-center py-12 md:py-16"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Heading and Subhead */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 ref={scene3TitleRef} className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
              {'Technology & Innovation'.split(' ').map((word, i) => (
                <span key={i} className="word-span inline-block overflow-hidden">
                  <span className="inline-block">{word}{i < 'Technology & Innovation'.split(' ').length - 1 ? ' ' : ''}</span>
                </span>
              ))}
            </h2>
            <p className="text-black/70 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              Empowering institutions with smart technologies that enhance efficiency, connectivity, and digital transformation.
            </p>
          </div>

          {/* Cards Grid */}
          <div ref={scene3CardsRef} className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6 mb-12 md:mb-16">
            {techServiceCards.map((card, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg lg:rounded-[32px] h-[400px] md:h-[450px] lg:h-[400px] w-full md:w-full ${
                  card.isWide ? 'lg:w-[664px]' : 'lg:w-[320px]'
                } border border-black/10 bg-white shadow-sm group-hover:shadow-xl transition-shadow duration-500`}
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
              </div>
            ))}
          </div>

          {/* Bottom Highlights */}
          <div ref={scene3HighlightsRef} className="flex flex-col md:flex-row md:items-center md:divide-x md:divide-black/20 gap-6 md:gap-0">
            {techBottomHighlights.map((highlight, index) => (
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
      </div>

      {/* ─── Scene 4: Infrastructure, Operations & Student Development Section ─── */}
      <div
        ref={scene4Ref}
        className="absolute inset-0 bg-white min-h-screen px-2 md:px-4 lg:px-8 xl:px-8 flex flex-col justify-center py-12 md:py-16"
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Heading and Subhead */}
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <h2 ref={scene4TitleRef} className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-normal mb-4">
              {'Infrastructure, Operations & Student Development'.split(' ').map((word, i) => (
                <span key={i} className="word-span inline-block overflow-hidden">
                  <span className="inline-block">{word}{i < 'Infrastructure, Operations & Student Development'.split(' ').length - 1 ? ' ' : ''}</span>
                </span>
              ))}
            </h2>
            <p className="text-black/70 text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              Creating future-ready campuses while supporting operational excellence and student growth.
            </p>
          </div>

          {/* Cards Grid */}
          <div ref={scene4CardsRef} className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6">
            {infrastructureServiceCards.map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg lg:rounded-[32px] h-[400px] md:h-[450px] lg:h-[400px] w-full md:w-full lg:w-[320px] border border-black/10 bg-white shadow-sm group-hover:shadow-xl transition-shadow duration-500"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
