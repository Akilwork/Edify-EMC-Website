'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const pathname = usePathname();

  const exploreLinks = [
    { name: 'Overview', href: '/#overview' },
    { name: 'Our Story', href: '/#story' },
    { name: 'Leadership Team', href: '/about#leadership' },
    { name: 'Group Companies', href: '/#companies' },
    { name: 'Careers', href: '/careers' },
  ];

  const handleLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('/#')) {
      const targetId = href.split('#')[1];
      if (pathname === '/') {
        const element = document.getElementById(targetId);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
      }
    } else if (href.startsWith('/about#')) {
      const targetHash = '#' + href.split('#')[1];
      if (pathname === '/about') {
        e.preventDefault();
        if (window.location.hash === targetHash) {
          window.dispatchEvent(new Event('hashchange'));
        } else {
          window.location.hash = targetHash;
        }
      }
    }
  };

  const serviceLinks = [
    { name: 'Academic Services', href: '/services/academic-services' },
    { name: 'Financial Services', href: '/services/financial-services' },
    { name: 'Human Resource Services', href: '/services/human-resource-services' },
    { name: 'IT Solutions & Digital Transformation', href: '/services/it-solutions-digital-transformation' },
    { name: 'Project Management & Development', href: '/services/project-management-development' },
    { name: 'Civil Engineering & Infrastructure', href: '/services/civil-engineering-infrastructure' },
    { name: 'Institutional Transport', href: '/services/transportation-service' },
    { name: 'Canteen Service', href: '/services/canteen-management-services' },
    { name: 'Uniform Services', href: '/services/uniform-services' },
    { name: 'Sports Training & Talent Development', href: '/services/sports-training-talent-development' },
    { name: 'Administration Service', href: '/services/administration-service' },
    { name: 'Marketing', href: '/services/marketing' },
  ];

  return (
    <footer className="relative bg-black text-[#e5e5e5] overflow-hidden pt-20 md:pt-28 flex flex-col justify-between w-full">
      {/* Content Container */}
      <div className="container-responsive container-max relative z-10 flex-grow flex flex-col justify-between">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          {/* Brand/Slogan Column - spans 4 columns */}
          <div className="lg:col-span-4 space-y-6 pr-4">
            <span className="block font-sans text-[10px] sm:text-[11px] font-normal tracking-[0.2em] text-[#8e8e8e] uppercase">
              EDIFY CONSULTANCY
            </span>
            <h2 className="font-sans text-[28px] sm:text-[34px] md:text-[36px] lg:text-[38px] font-normal leading-[1.3] text-white">
              Empowering education <br className="hidden md:block" />
              and institutional excellence
            </h2>
          </div>

          {/* Explore Column - spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[11px] sm:text-[12px] font-normal tracking-[0.2em] text-[#8e8e8e] uppercase mb-6">
              EXPLORE
            </h3>
            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                    className="font-sans text-[13px] sm:text-[14px] text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column - spans 4 columns */}
          <div className="lg:col-span-4">
            <h3 className="font-sans text-[11px] sm:text-[12px] font-normal tracking-[0.2em] text-[#8e8e8e] uppercase mb-6">
              SERVICES
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-[13px] sm:text-[14px] text-neutral-400 hover:text-white transition-colors duration-300 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Dubai Office Column - spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[11px] sm:text-[12px] font-normal tracking-[0.2em] text-[#8e8e8e] uppercase mb-6">
              DUBAI OFFICE
            </h3>
            <div className="space-y-5 font-sans text-[13px] sm:text-[14px] text-neutral-400 leading-[1.6]">
              <p>
                Business Bay, Dubai,
                <br />
                United Arab Emirates
              </p>
              <div className="space-y-3 pt-1">
                <a
                  href="mailto:info@edify.ae"
                  className="flex items-center gap-2.5 hover:text-white transition-colors duration-300"
                >
                  <Mail size={13} strokeWidth={1.5} className="text-neutral-500" />
                  <span>info@edify.ae</span>
                </a>
                <div className="pt-1">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 text-[12px] font-semibold text-black bg-white hover:bg-neutral-200 rounded-full transition-all duration-300 group shadow-sm active:scale-95"
                  >
                    <span>Contact Us</span>
                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Section */}
        <div className="w-full mt-auto">
          {/* Divider Line */}
          <div className="w-full h-[1px] bg-neutral-900" />

          {/* Copyright & Links */}
          <div className="py-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[11px] sm:text-[12px] font-sans text-neutral-500">
            <div>
              © 2026 Edify Management Consultancy LLC. All Right Reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;