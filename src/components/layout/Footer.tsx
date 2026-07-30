'use client';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

const Footer = () => {
  const exploreLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Our Story', href: '#story' },
    { name: 'Leadership Team', href: '#leadership' },
    { name: 'Group Companies', href: '#companies' },
  ];

  const serviceLinks = [
    { name: 'Academic Services', href: '#academic' },
    { name: 'HR & Recruitment', href: '#hr' },
    { name: 'Technology & Innovation', href: '#technology' },
    { name: 'Facilities Management', href: '#facilities' },
    { name: 'Financial Services', href: '#financial' },
    { name: 'Specialized Services', href: '#specialized' },
  ];

  return (
    <footer className="relative bg-black text-[#e5e5e5] overflow-hidden pt-20 md:pt-28 flex flex-col justify-between w-full">
      {/* Content Container */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 lg:px-16 relative z-10 flex-grow flex flex-col justify-between">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          {/* Brand/Slogan Column - spans 6 columns */}
          <div className="lg:col-span-6 space-y-6 pr-4">
            <span className="block font-sans text-[10px] sm:text-[11px] font-normal tracking-[0.2em] text-[#8e8e8e] uppercase">
              EDIFY CONSULTANCY
            </span>
            <h2 className="font-sans text-[28px] sm:text-[34px] md:text-[38px] lg:text-[40px] font-normal leading-[1.3] text-white">
              Empowering education <br className="hidden md:block" />
              and institutional excellence
            </h2>
          </div>

          {/* Explore Column - spans 2 columns, starts at col 7 */}
          <div className="lg:col-span-2 lg:col-start-7">
            <h3 className="font-sans text-[11px] sm:text-[12px] font-normal tracking-[0.2em] text-[#8e8e8e] uppercase mb-6">
              EXPLORE
            </h3>
            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-[13px] sm:text-[14px] text-neutral-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column - spans 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[11px] sm:text-[12px] font-normal tracking-[0.2em] text-[#8e8e8e] uppercase mb-6">
              SERVICES
            </h3>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-[13px] sm:text-[14px] text-neutral-400 hover:text-white transition-colors duration-300"
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
                  href="tel:+971000000000"
                  className="flex items-center gap-2.5 hover:text-white transition-colors duration-300"
                >
                  <Phone size={13} strokeWidth={1.5} className="text-neutral-500" />
                  <span>+971 00 000 0000</span>
                </a>
                <a
                  href="mailto:info@edify.ae"
                  className="flex items-center gap-2.5 hover:text-white transition-colors duration-300"
                >
                  <Mail size={13} strokeWidth={1.5} className="text-neutral-500" />
                  <span>info@edify.ae</span>
                </a>
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

      {/* Massive bottom brand background text */}
      <div className="w-full overflow-hidden pointer-events-none select-none flex justify-center mt-8">
        <div
          className="font-sans font-black tracking-[0.02em] leading-none text-center select-none"
          style={{
            fontSize: '24vw',
            color: '#262626',
            marginBottom: '-8vw',
          }}
        >
          EDIFY
        </div>
      </div>
    </footer>
  );
};

export default Footer;