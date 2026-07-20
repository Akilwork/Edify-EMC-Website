"use client";

import { useState } from "react";
import RevealSection from "./RevealSection";
import { Plus, Minus } from "lucide-react";
import type { ServiceDetail } from "@/data/service-details";

const FAQ_ITEMS = [
  {
    q: "Why should I choose Edify Management Consultancy?",
    a: "Edify provides end-to-end consultancy services with industry expertise, innovative strategies, and practical solutions that help institutions achieve sustainable growth and operational excellence.",
  },
  {
    q: "Which industries does Edify serve?",
    a: "We serve educational institutions including schools, colleges, universities, and training centers, as well as corporate organizations seeking management and transformational consulting.",
  },
  {
    q: "What services does Edify offer?",
    a: "Edify offers a comprehensive range of services including Human Resource Management, Financial Consulting, IT & Digital Transformation, Educational Consulting, and Student Support.",
  },
  {
    q: "How does Edify support institutional growth?",
    a: "We support growth by offering tailored strategies, workforce planning, process automation, compliance advisory, and performance management systems that build long-term capacity.",
  },
  {
    q: "Why is Edify different from other consultancy firms?",
    a: "Our education-first focus, experienced professionals, outcome-driven methodology, and commitment to long-term collaborative partnerships set us apart.",
  },
];

export default function DetailWhyChoose({ detail }: { detail: ServiceDetail }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const subtitle = "Providing reliable consultancy and tailored strategies that drive excellence, efficiency, and long-term growth.";

  return (
    <section className="relative w-full bg-black py-28 md:py-36 lg:py-44 overflow-hidden">
      <div className="container-responsive container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <RevealSection>
              <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Why Choose Edify
              </p>
            </RevealSection>
            
            <RevealSection delay={0.05}>
              <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-white font-normal leading-tight tracking-tight mb-6">
                {detail.whyChoose.heading}
              </h2>
            </RevealSection>
            
            <RevealSection delay={0.1}>
              <p className="text-white/60 text-base leading-relaxed max-w-md">
                {subtitle}
              </p>
            </RevealSection>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 w-full space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <RevealSection key={item.q} delay={index * 0.05}>
                  <div
                    onMouseEnter={() => setOpenIndex(index)}
                    onClick={() => setOpenIndex(index)}
                    className={`bg-white/[0.03] border rounded-[18px] transition-all duration-300 overflow-hidden cursor-pointer ${
                      isOpen ? "border-white/20 bg-white/[0.05]" : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-left p-6 md:p-8">
                      <span className="text-white text-base md:text-lg font-medium leading-snug pr-4">
                        {item.q}
                      </span>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "bg-white border-white text-black"
                            : "bg-transparent border-white/20 text-white/60"
                        }`}
                      >
                        {isOpen ? <Minus size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
                      </div>
                    </div>

                    {/* Smooth CSS Grid-Rows Height Transition */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 border-t border-white/5">
                          <p className="text-white/60 text-sm md:text-base leading-relaxed font-sans mt-4">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
