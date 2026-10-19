"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  BookOpen,
  GraduationCap,
  BadgeDollarSign,
  Users,
  Monitor,
  Printer,
  MessageSquare,
  Bus,
  Utensils,
  Shirt,
  Workflow,
} from "lucide-react";
import { useConsultation } from "@/components/providers/ConsultationProvider";
import { SERVICE_SLUGS } from "@/data/service-details";

/* ────────────────────────────────────────────────────────────
 data – icon mapped per service id
──────────────────────────────────────────────────────────── */
const MEGA_SERVICES = [
  {
    id: "academic-service",
    title: "Academic Services",
    description: "Strategic guidance & holistic support for educational excellence.",
    icon: GraduationCap,
    slug: "academic-services",
  },
  {
    id: "financial-services",
    title: "Financial Services",
    description: "Expert financial planning and advisory services.",
    icon: BadgeDollarSign,
    slug: "financial-services",
  },
  {
    id: "hr-services",
    title: "Human Resource Services",
    description: "End-to-end HR solutions for your organisation.",
    icon: Users,
    slug: "human-resource-services",
  },
  {
    id: "it-solutions",
    title: "IT Solutions & Digital Transformation",
    description: "E-Commerce, software & smart technology solutions.",
    icon: Monitor,
    slug: "it-solutions-digital-transformation",
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Impactful branding that leaves a lasting impression.",
    icon: Printer,
    slug: "marketing",
  },
  {
    id: "transportation-service",
    title: "Institutional Transport",
    description: "Safe & reliable student transport solutions.",
    icon: Bus,
    slug: "transportation-service",
  },
  {
    id: "canteen-service",
    title: "Canteen Service",
    description: "Hygienic, nutritious, and quality catering.",
    icon: Utensils,
    slug: "canteen-management-services",
  },
  {
    id: "uniform-services",
    title: "Uniform Services",
    description: "Quality school uniforms & institutional clothing.",
    icon: Shirt,
    slug: "uniform-services",
  },
  {
    id: "project-management-development",
    title: "Project Management & Development",
    description: "End-to-end project management & consulting for facilities.",
    icon: Workflow,
    slug: "project-management-development",
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", hasMega: true },
  // { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];


/* ────────────────────────────────────────────────────────────
   Mega Menu Component
──────────────────────────────────────────────────────────── */
function ServicesMegaMenu({
  onClose,
  openConsultation,
  onNavigate,
}: {
  onClose: () => void;
  openConsultation: () => void;
  onNavigate: (href: string, e?: React.MouseEvent) => void;
}) {
  const half = Math.ceil(MEGA_SERVICES.length / 2);
  const leftCol = MEGA_SERVICES.slice(0, half);
  const rightCol = MEGA_SERVICES.slice(half);

  return (
    <div className="absolute top-full left-0 right-0 z-40">
      {/* Full-screen backdrop to close on outside click and mouse leave */}
      <div
        className="fixed inset-0 top-0 z-[-1] bg-black/20 backdrop-blur-[2px]"
        onClick={onClose}
        onMouseEnter={onClose}
        aria-hidden="true"
      />

      {/* White panel */}
      <div
        className="w-full bg-white"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        }}
      >
        <div className="container-responsive container-max">
          <div className="grid grid-cols-[280px_1fr] min-h-[320px]">

            {/* ── Left hero image panel ── */}
            <div className="relative rounded-[16px] overflow-hidden m-5 mr-0 min-h-[290px]">
              <Image
                src="/Rectangle 53.png"
                alt="Edify services"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
              {/* Stronger dark overlay for glass feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
              {/* Subtle glass sheen on image */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white font-semibold text-[18px] leading-[1.3] max-w-[200px] drop-shadow-lg">
                  Expert Solutions for Every Need
                </p>
                <p className="text-white/60 text-[12.5px] mt-2 max-w-[200px] leading-relaxed">
                  High-quality consulting designed around your goals.
                </p>
              </div>
            </div>

            {/* ── Right content ── */}
            <div className="flex flex-col px-8 py-6">
              {/* Column heading - clickable to show Services Hero section first */}
              <Link
                href="/services"
                onClick={(e) => onNavigate("/services", e)}
                className="group/heading inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[1.5px] uppercase text-black/50 hover:text-black mb-3 transition-colors duration-200 cursor-pointer w-fit"
              >
                <span>Our Services</span>
                <ArrowRight size={12} className="transition-transform duration-200 group-hover/heading:translate-x-0.5 text-black/40 group-hover/heading:text-black" />
              </Link>

              {/* Service rows */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-0.5 flex-1">
                {/* Left column */}
                <div className="space-y-0.5">
                  {leftCol.map(({ id, title, description, icon: Icon, slug }) => (
                    <Link
                      key={id}
                      href={`/services/${slug}`}
                      onClick={(e) => onNavigate(`/services/${slug}`, e)}
                      className="flex items-start gap-3 p-3 rounded-[12px] group transition-all duration-200 cursor-pointer hover:bg-black/[0.04]"
                    >
                      {/* Icon box */}
                      <div className="flex-shrink-0 w-9 h-9 rounded-[10px] bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-200">
                        <Icon
                          size={16}
                          className="text-black/60 group-hover:text-black transition-colors duration-200"
                          strokeWidth={1.5}
                        />
                      </div>
                      {/* Text */}
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-black/80 group-hover:text-black leading-snug transition-colors duration-200">
                          {title}
                        </p>
                        <p className="text-[11.5px] text-black/45 mt-0.5 leading-snug transition-colors duration-200">
                          {description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Right column */}
                <div className="space-y-0.5">
                  {rightCol.map(({ id, title, description, icon: Icon, slug }) => (
                    <Link
                      key={id}
                      href={`/services/${slug}`}
                      onClick={(e) => onNavigate(`/services/${slug}`, e)}
                      className="flex items-start gap-3 p-3 rounded-[12px] group transition-all duration-200 cursor-pointer hover:bg-black/[0.04]"
                    >
                      {/* Icon box */}
                      <div className="flex-shrink-0 w-9 h-9 rounded-[10px] bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-200">
                        <Icon
                          size={16}
                          className="text-black/60 group-hover:text-black transition-colors duration-200"
                          strokeWidth={1.5}
                        />
                      </div>
                      {/* Text */}
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-black/80 group-hover:text-black leading-snug transition-colors duration-200">
                          {title}
                        </p>
                        <p className="text-[11.5px] text-black/45 mt-0.5 leading-snug transition-colors duration-200">
                          {description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── Bottom CTA strip ── */}
              <div className="mt-4 pt-4 border-t border-black/10 flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-black/80">
                    Need assist for choosing a service?
                  </p>
                  <p className="text-[11.5px] text-black/45 mt-0.5">
                    Our experts will guide you to the right solution.
                  </p>
                </div>
                <button
                  onClick={(e) => onNavigate("/services", e)}
                  className="flex items-center gap-2 px-5 py-[11px] text-[13px] font-semibold rounded-[40px] bg-black text-white hover:bg-black/80 transition-all duration-200 whitespace-nowrap cursor-pointer border-none outline-none active:scale-95"
                >
                  View all Services
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


/* ────────────────────────────────────────────────────────────
   Main Navbar
──────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { openConsultation } = useConsultation();
  const megaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(72);

  // Keep scroll restoration manual so programmatic scroll-to-top is never overridden
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  // Prevent background scrolling when mega menu or mobile menu is open
  useEffect(() => {
    if (megaOpen || menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [megaOpen, menuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (megaOpen) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setScrolled(true);
        setHidden(currentScrollY > lastScrollY);
      } else {
        setScrolled(false);
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [megaOpen]);

  // Scroll to top on route change so that the hero section is always first shown
  useEffect(() => {
    setMegaOpen(false);
    setMenuOpen(false);
    setHidden(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.dispatchEvent(new Event("scroll"));
      });
    }
  }, [pathname]);

  // Handle section heading click: always show the hero section first
  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)) {
      return; // Respect user opening link in new tab/window
    }
    if (e) {
      e.preventDefault();
    }
    setMegaOpen(false);
    setMenuOpen(false);
    setHidden(false);

    const targetPath = href.split("#")[0] || "/";
    const isCurrentPage = pathname === targetPath;

    // Clear hash if any exists so page doesn't jump away from the hero section
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.pushState(null, "", targetPath);
    }

    const scrollToHeroTop = () => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.dispatchEvent(new Event("scroll"));
      }
    };

    if (isCurrentPage) {
      scrollToHeroTop();
      // Ensure smooth return to hero section
      requestAnimationFrame(scrollToHeroTop);
    } else {
      router.push(targetPath);
      scrollToHeroTop();
      setTimeout(scrollToHeroTop, 10);
      setTimeout(scrollToHeroTop, 100);
    }
  };

  // Prefetch all service routes on mount to make dynamic transitions instant
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        SERVICE_SLUGS.forEach((slug) => {
          router.prefetch(`/services/${slug}`);
        });
      }, 1000); // Small delay to prioritize initial page render load
      return () => clearTimeout(timer);
    }
  }, [router]);

  const handleServicesEnter = () => {
    if (megaTimerRef.current) clearTimeout(megaTimerRef.current);
    setHidden(false);
    setMegaOpen(true);
  };

  const handleServicesLeave = () => {
    megaTimerRef.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const isLightPage = pathname === "/contact";
  const isLightMode = megaOpen || isLightPage;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm border-b ${
          megaOpen || menuOpen
            ? "!bg-white border-black/10 shadow-sm"
            : isLightPage
            ? "border-black/10 " + (scrolled ? "bg-white/85 shadow-sm" : "bg-white/60")
            : "border-white/10 " + (scrolled ? "bg-black/50" : "bg-transparent")
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container-responsive container-max flex items-center justify-between pt-[clamp(10px,1.2vw,16px)] pb-[clamp(10px,1.2vw,16px)]">
          {/* Logo - clicking shows hero section at top */}
          <Link
            href="/"
            onClick={(e) => handleNavClick("/", e)}
            className="flex items-center gap-2 group flex-shrink-0"
          >
            <Image
              src="/Edify logo.png"
              alt="Edify Management Consultancy"
              width={160}
              height={70}
              className={`h-[52px] sm:h-[60px] md:h-[68px] w-auto object-contain transition-all duration-300 ${
                isLightMode || menuOpen
                  ? ""
                  : "brightness-[2.2] contrast-[1.1] drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]"
              }`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href, hasMega }) =>
              hasMega ? (
                <div
                  key={href}
                  className="relative"
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <button
                    onClick={(e) => {
                      handleNavClick(href, e);
                    }}
                    className={`flex items-center gap-1 text-[14px] font-semibold tracking-[0.96px] transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                      isLightMode
                        ? pathname.startsWith("/services")
                          ? "text-black"
                          : "text-black/60 hover:text-black"
                        : pathname.startsWith("/services")
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                  >
                    {label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${
                        megaOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(href, e)}
                  className={`text-[14px] font-semibold tracking-[0.96px] transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                    isLightMode
                      ? pathname === href
                        ? "text-black"
                        : "text-black/60 hover:text-black"
                      : pathname === href
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
              isLightMode || menuOpen ? "text-black hover:bg-black/10" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Horizontal Divider */}
        <div className={`absolute bottom-0 left-0 right-0 h-px transition-colors duration-500 ${
          isLightMode || menuOpen ? "bg-black/10" : "bg-white/10"
        }`} />

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-black/10 max-h-[calc(100vh-72px)] overflow-y-auto no-scrollbar">
            <div className="container-responsive py-4 space-y-1">
              {NAV_LINKS.map(({ label, href, hasMega }) =>
                hasMega ? (
                  <div key={href}>
                    <div className="flex items-center justify-between">
                      {/* Label navigates to /services and shows hero section first */}
                      <Link
                        href={href}
                        onClick={(e) => handleNavClick(href, e)}
                        className={`flex-1 text-[16px] font-semibold tracking-[0.96px] py-3 cursor-pointer transition-colors duration-200 ${pathname.startsWith("/services")
                            ? "text-black"
                            : "text-black/50"
                          }`}
                      >
                        {label}
                      </Link>
                      {/* Chevron toggles the sub-list */}
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className={`p-2 cursor-pointer transition-colors duration-200 ${pathname.startsWith("/services") ? "text-black" : "text-black/50"}`}
                        aria-label="Expand services menu"
                      >
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>

                    {mobileServicesOpen && (
                      <div className="pl-4 pb-2 space-y-1">
                        {MEGA_SERVICES.map(({ id, title, icon: Icon, slug }) => (
                          <Link
                            key={id}
                            href={`/services/${slug}`}
                            onClick={(e) => handleNavClick(`/services/${slug}`, e)}
                            className="flex items-center gap-3 py-2 px-3 rounded-[10px] hover:bg-black/5 transition-colors duration-200 cursor-pointer"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-[8px] bg-black/5 flex items-center justify-center">
                              <Icon size={15} className="text-black/60" strokeWidth={1.5} />
                            </div>
                            <span className="text-[13px] font-medium text-black/70">
                              {title}
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/services"
                          onClick={(e) => handleNavClick("/services", e)}
                          className="flex items-center gap-1 text-[12px] font-semibold text-black/40 px-3 pt-1 hover:text-black transition-colors duration-200"
                        >
                          View all services <ArrowRight size={12} />
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={href}
                    href={href}
                    onClick={(e) => handleNavClick(href, e)}
                    className={`block text-[16px] font-semibold tracking-[0.96px] transition-colors duration-200 hover:text-black py-3 cursor-pointer ${pathname === href ? "text-black" : "text-black/50"
                      }`}
                  >
                    {label}
                  </Link>
                )
              )}


            </div>
          </div>
        )}
      </header>

      {/* Mega Menu – rendered outside header to avoid clipping */}
      <div
        className={`fixed left-0 right-0 z-40 transition-all duration-300 origin-top ${
          megaOpen ? "opacity-100 visible" : "opacity-0 invisible -translate-y-2 pointer-events-none"
        }`}
        style={{ top: `${headerHeight}px` }}
        onMouseEnter={handleServicesEnter}
        onMouseLeave={handleServicesLeave}
      >
        <ServicesMegaMenu
          onClose={() => setMegaOpen(false)}
          openConsultation={openConsultation}
          onNavigate={handleNavClick}
        />
      </div>
    </>
  );
}

