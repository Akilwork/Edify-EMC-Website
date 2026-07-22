import Image from "next/image";
import RevealSection from "./RevealSection";
import type { ServiceDetail } from "@/data/service-details";

const CAPABILITIES_SUBTITLES: Record<string, string> = {
  "human-resource-services": "End-to-end HR solutions that empower people, strengthen teams, and accelerate organizational growth.",
  "educational-institutional-consulting": "Strategic institutional consulting that strengthens quality standards, governance, and institutional scaling.",
  "financial-consultancy": "Rigorous financial planning, auditing, and cost-optimization solutions built for long-term resilience.",
  "behavioural-counselling-student-support": "Holistic student mentoring, mental health guidance, and wellbeing support to build confident learners.",
  "it-solutions-digital-transformation": "Modern IT strategy, software integration, and campus automation to accelerate digital evolution.",
  "printing-branding-solutions": "Distinct visual identities, premium prints, and promotional assets that elevate your brand prestige.",
  "ecommerce-digital-services": "Frictionless online platforms and web stores built to extend your institution's digital growth.",
  "civil-engineering-infrastructure": "Feasibility, master planning, and engineering oversight that build safe, future-ready learning spaces.",
  "transportation-fleet-support": "Fleet logistics, route planning, and driver safety standards that keep your students moving securely.",
  "uniform-solutions": "Custom school clothing and sports kits designed for comfort, durability, and institutional pride.",
  "sports-training-talent-development": "Professional coaching and athletic development pathways to foster talent and character.",
};

function getCapabilityIconUrl(index: number) {
  const frames = [
    "/Service%20details/Frame1.png",
    "/Service%20details/Frame2.png",
    "/Service%20details/Frame3.png",
    "/Service%20details/Frame4.png",
    "/Service%20details/Frame5.png",
    "/Service%20details/Frame6.png",
    "/Service%20details/Frame.png",
  ];
  return frames[index % frames.length];
}

export default function DetailCapabilities({ detail }: { detail: ServiceDetail }) {
  const items = detail.capabilities.items;
  const totalCount = items.length;
  const subtitle = CAPABILITIES_SUBTITLES[detail.slug] || "Tailored services and solutions designed to support your institution's specific goals.";

  // Helper to determine col-span classes based on total items and current index
  const getColSpanClass = (index: number, totalCount: number) => {
    if (totalCount === 7) {
      if (index === 0 || index === 1) return "col-span-12 md:col-span-6";
      if (index >= 2 && index <= 4) return "col-span-12 md:col-span-4";
      return "col-span-12 md:col-span-6";
    }
    if (totalCount === 5) {
      if (index === 0 || index === 1) return "col-span-12 md:col-span-6";
      return "col-span-12 md:col-span-4";
    }
    if (totalCount % 3 === 0) {
      return "col-span-12 md:col-span-4";
    }
    if (totalCount % 2 === 0) {
      return "col-span-12 md:col-span-6";
    }
    return "col-span-12 md:col-span-4";
  };

  return (
    <section className="relative w-full bg-[#F9F9FB] py-16 md:py-24 overflow-hidden">
      <div className="container-responsive container-max">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <RevealSection>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-semibold leading-tight tracking-tight mb-4">
              Service Capabilities
            </h2>
          </RevealSection>
          <RevealSection delay={0.05}>
            <p className="text-black/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              {subtitle}
            </p>
          </RevealSection>
        </div>

        {/* Capability grid */}
        <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto w-full">
          {items.map((item, index) => {
            const iconUrl = getCapabilityIconUrl(index);
            const colSpan = getColSpanClass(index, totalCount);

            return (
              <div key={item.title} className={`${colSpan} w-full`}>
                <RevealSection delay={(index % 3) * 0.08} className="h-full">
                  <div className="relative bg-white rounded-[16px] border border-black/5 hover:border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.05)] transform hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col h-full overflow-hidden">
                    {/* Custom Corner Glow Border */}
                    <div className="absolute top-[-1px] left-[-1px] right-[-1px] h-[20px] border-t-[4px] border-l-[4px] border-r-[4px] border-[#9F7DFF] rounded-t-[16px] pointer-events-none bg-transparent" />
                    
                    {/* Icon container */}
                    <div className="mb-6 flex items-start">
                      <Image
                        src={iconUrl}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-black text-lg md:text-xl font-bold mb-3 font-sans tracking-tight">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    {item.description && (
                      <p className="text-black/60 text-sm leading-relaxed font-sans font-normal">
                        {item.description}
                      </p>
                    )}
                  </div>
                </RevealSection>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

