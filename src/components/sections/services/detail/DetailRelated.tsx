"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import RevealSection from "./RevealSection";
import { SERVICE_INDEX, type ServiceDetail } from "@/data/service-details";

export default function DetailRelated({
  detail,
  currentSlug,
}: {
  detail: ServiceDetail;
  currentSlug: string;
}) {
  // Resolve related slugs, dropping self + any unknown slugs defensively.
  const links = detail.related.slugs
    .map((slug) => ({ slug, meta: SERVICE_INDEX[slug] }))
    .filter((x): x is { slug: string; meta: { title: string; cardImage: string } } =>
      Boolean(x.meta) && x.slug !== currentSlug,
    );

  if (links.length === 0) return null;

  return (
    <section className="relative w-full bg-[#F9F9FB] py-20 md:py-28 overflow-hidden">
      <div className="container-responsive container-max">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <RevealSection>
            <p className="text-black/40 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Related Services
            </p>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-normal leading-tight tracking-tight">
              {detail.related.heading}
            </h2>
          </RevealSection>
        </div>

        {/* Related cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {links.map((link, index) => (
            <RevealSection key={link.slug} delay={(index % 3) * 0.08}>
              <Link
                href={`/services/${link.slug}`}
                className="group relative block overflow-hidden rounded-[18px] h-[300px] md:h-[340px] border border-black/10"
              >
                {/* Image */}
                <img
                  src={link.meta.cardImage}
                  alt={link.meta.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Gradient + content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-white text-base md:text-lg font-medium mb-2">
                    {link.meta.title}
                  </h3>
                  <span className="flex items-center gap-2 text-white/80 text-xs uppercase tracking-wide">
                    Explore More
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
