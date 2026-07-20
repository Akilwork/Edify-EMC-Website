import RevealSection from "./RevealSection";
import type { ServiceDetail } from "@/data/service-details";

export default function DetailApproach({ detail }: { detail: ServiceDetail }) {
  const count = detail.approach.steps.length;

  return (
    <section className="relative w-full bg-black py-20 md:py-28">
      <div className="container-responsive container-max">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <RevealSection>
            <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mb-4">
              Our Approach
            </p>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-white font-normal leading-tight tracking-tight">
              {detail.approach.heading}
            </h2>
          </RevealSection>
        </div>

        {/* Steps — reflows to suit any count (3–5) */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            count >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          } gap-4`}
        >
          {detail.approach.steps.map((step, index) => (
            <RevealSection key={step.number} delay={(index % 4) * 0.08}>
              <div className="h-full p-6 md:p-8 rounded-[24px] border border-white/10 bg-white/[0.03]">
                <span className="block text-white/30 text-2xl md:text-3xl font-normal mb-4">
                  {step.number}
                </span>
                <h3 className="text-white text-base md:text-lg font-medium mb-2">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
