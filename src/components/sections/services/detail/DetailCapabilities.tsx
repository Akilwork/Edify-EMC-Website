import RevealSection from "./RevealSection";
import type { ServiceDetail } from "@/data/service-details";
import {
  Users, Shield, DollarSign, ClipboardCheck, Briefcase, BarChart3, GraduationCap,
  Laptop, Layers, HardHat, Truck, Shirt, Dumbbell, CheckCircle2
} from "lucide-react";

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

function getCapabilityIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("recruitment") || t.includes("talent")) return Users;
  if (t.includes("policy") || t.includes("governance") || t.includes("handbook")) return Shield;
  if (t.includes("payroll") || t.includes("tax") || t.includes("financial")) return DollarSign;
  if (t.includes("audit") || t.includes("risk") || t.includes("assessment") || t.includes("advisory")) return ClipboardCheck;
  if (t.includes("outsourcing")) return Briefcase;
  if (t.includes("performance") || t.includes("appraisal") || t.includes("kpi")) return BarChart3;
  if (t.includes("training") || t.includes("education") || t.includes("curriculum") || t.includes("development") || t.includes("faculty")) return GraduationCap;
  if (t.includes("software") || t.includes("it ") || t.includes("digital") || t.includes("cloud") || t.includes("technology") || t.includes("erp") || t.includes("lms")) return Laptop;
  if (t.includes("branding") || t.includes("identity") || t.includes("logo") || t.includes("printing") || t.includes("signage")) return Layers;
  if (t.includes("infrastructure") || t.includes("engineering") || t.includes("construction") || t.includes("campus") || t.includes("facilities")) return HardHat;
  if (t.includes("transport") || t.includes("fleet") || t.includes("route") || t.includes("driver")) return Truck;
  if (t.includes("uniform") || t.includes("clothing") || t.includes("kit") || t.includes("attire")) return Shirt;
  if (t.includes("sport") || t.includes("coach") || t.includes("athlete")) return Dumbbell;
  return CheckCircle2;
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
    <section className="relative w-full bg-[#F9F9FB] py-20 md:py-28 overflow-hidden">
      <div className="container-responsive container-max">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <RevealSection>
            <p className="text-black/40 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Service Capabilities
            </p>
          </RevealSection>
          <RevealSection delay={0.05}>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-normal leading-tight tracking-tight mb-4">
              {detail.capabilities.heading}
            </h2>
          </RevealSection>
          <RevealSection delay={0.1}>
            <p className="text-black/60 text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>
          </RevealSection>
        </div>

        {/* Capability grid */}
        <div className="grid grid-cols-12 gap-6 max-w-6xl mx-auto w-full">
          {items.map((item, index) => {
            const Icon = getCapabilityIcon(item.title);
            const colSpan = getColSpanClass(index, totalCount);

            return (
              <div key={item.title} className={`${colSpan} w-full`}>
                <RevealSection delay={(index % 3) * 0.08} className="h-full">
                  <div className="bg-white rounded-[18px] border border-black/5 hover:border-black/10 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.05)] transform hover:-translate-y-1 transition-all duration-300 p-8 flex flex-col h-full">
                    {/* Icon container */}
                    <div className="w-12 h-12 rounded-[16px] bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-6 text-black/80">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    
                    {/* Number eyebrow */}
                    <span className="text-black/30 text-xs font-medium mb-2">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    
                    {/* Title */}
                    <h3 className="text-black text-lg md:text-xl font-semibold mb-3 font-sans">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    {item.description && (
                      <p className="text-black/60 text-sm leading-relaxed font-sans">
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
