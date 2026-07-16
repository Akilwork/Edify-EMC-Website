import RevealSection from "./RevealSection";
import type { ServiceDetail } from "@/data/service-details";

const WHY_IT_MATTERS_SUBTITLES: Record<string, string> = {
  "human-resource-services": "Empowering institutions with strategic expertise, operational excellence, and sustainable growth.",
  "educational-institutional-consulting": "Driving academic standards, regulatory compliance, and community trust across your campus.",
  "financial-consultancy": "Optimizing budgets, reducing risk exposure, and funding future growth with clarity and assurance.",
  "behavioural-counselling-student-support": "Promoting holistic student success, mental wellness, and resilient home-school partnerships.",
  "it-solutions-digital-transformation": "Streamlining administrative workflows and modernizing learning environments with robust security.",
  "printing-branding-solutions": "Building distinct institutional presence, student enrollment growth, and strong communal identity.",
  "ecommerce-digital-services": "Reaching new educational markets, simplifying tuition payments, and diversifying digital revenue.",
  "civil-engineering-infrastructure": "Designing safe, compliant, and inspiring facilities built to host generations of learners.",
  "transportation-fleet-support": "Ensuring student safety, route efficiency, and absolute compliance to put parent minds at ease.",
  "uniform-solutions": "Promoting absolute campus equality, student belonging, and a polished, professional brand image.",
  "sports-training-talent-development": "Developing active health habits, personal discipline, and inter-school competition success.",
};

const IMAGES_BY_SERVICE: Record<string, string[]> = {
  "human-resource-services": [
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop", // Attract Qualified Talent
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop", // Improve Workforce Performance
    "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=600&auto=format&fit=crop", // Ensure Regulatory Compliance
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop", // Strengthen Employee Engagement
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop", // Streamline HR Operations
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop", // Build Long-Term Capacity
  ]
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600&auto=format&fit=crop",
];

export default function DetailWhyItMatters({ detail }: { detail: ServiceDetail }) {
  const subtitle = WHY_IT_MATTERS_SUBTITLES[detail.slug] || "Discover how our strategic focus and execution drive meaningful institutional outcomes.";
  const serviceImages = IMAGES_BY_SERVICE[detail.slug] || FALLBACK_IMAGES;

  return (
    <section className="relative w-full bg-white py-20 md:py-28 overflow-hidden">
      <div className="container-responsive container-max">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <RevealSection>
            <p className="text-black/40 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Why It Matters
            </p>
          </RevealSection>
          <RevealSection delay={0.05}>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-normal leading-tight tracking-tight mb-4">
              {detail.whyItMatters.heading}
            </h2>
          </RevealSection>
          <RevealSection delay={0.1}>
            <p className="text-black/60 text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>
          </RevealSection>
        </div>

        {/* 3x2 Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {detail.whyItMatters.items.map((item, index) => {
            const bgImage = serviceImages[index % serviceImages.length];

            return (
              <div key={item.title} className="w-full">
                <RevealSection delay={(index % 3) * 0.08} className="h-full">
                  <div className="group relative overflow-hidden rounded-[18px] h-[260px] md:h-[300px] border border-black/5 shadow-md bg-neutral-900 cursor-pointer flex flex-col justify-end">
                    {/* Background Image */}
                    <img
                      src={bgImage}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Dark Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                    
                    {/* Slide up content container */}
                    <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out h-full">
                      {/* Eyebrow index */}
                      <span className="text-white/40 text-[11px] font-semibold tracking-wider mb-2 uppercase">
                        Benefit {String(index + 1).padStart(2, "0")}
                      </span>
                      
                      {/* Title */}
                      <h3 className="text-white text-lg md:text-xl font-semibold mb-2 font-sans tracking-tight leading-snug">
                        {item.title}
                      </h3>
                      
                      {/* Description (reveals on hover) */}
                      {item.description && (
                        <p className="text-white/60 text-xs md:text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-[100px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden font-sans">
                          {item.description}
                        </p>
                      )}
                    </div>
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
