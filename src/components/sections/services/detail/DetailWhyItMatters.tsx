import Image from "next/image";
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
  // ── Human Resource Management — original Figma frames ──────────────────
  "human-resource-services": [
    "/Why It Matters/Frame 19.png",
    "/Why It Matters/Frame 20.png",
    "/Why It Matters/Frame 21.png",
    "/Why It Matters/Frame 22.png",
    "/Why It Matters/Frame 23.png",
    "/Why It Matters/Frame 24.png",
  ],

  // ── Educational & Institutional Consulting — AI-generated images ─────────
  "educational-institutional-consulting": [
    "/Why It Matters/educational-institutional/img-1.png",
    "/Why It Matters/educational-institutional/img-2.png",
    "/Why It Matters/educational-institutional/img-3.png",
    "/Why It Matters/educational-institutional/img-4.png",
    "/Why It Matters/educational-institutional/img-5.png",
    "/Why It Matters/educational-institutional/img-6.png",
  ],

  // ── Financial Consultancy — AI-generated images ─────────────────────────
  "financial-consultancy": [
    "/Why It Matters/financial-consultancy/img-1.png",
    "/Why It Matters/financial-consultancy/img-2.png",
    "/Why It Matters/financial-consultancy/img-3.png",
    "/Why It Matters/financial-consultancy/img-4.png",
    "/Why It Matters/financial-consultancy/img-5.png",
    "/Why It Matters/financial-consultancy/img-6.png",
  ],

  // ── Behavioural Counselling — dedicated folder images (img-1 → img-6) ──────
  "behavioural-counselling-student-support": [
    "/Why It Matters/behavioural-counselling/img-1.png",
    "/Why It Matters/behavioural-counselling/img-2.png",
    "/Why It Matters/behavioural-counselling/img-3.png",
    "/Why It Matters/behavioural-counselling/img-4.png",
    "/Why It Matters/behavioural-counselling/img-5.png",
    "/Why It Matters/behavioural-counselling/img-6.png",
  ],

  // ── IT Solutions — dedicated folder images (Frame1 → Frame6) ─────────────
  "it-solutions-digital-transformation": [
    "/Why It Matters/IT/Frame1.png",
    "/Why It Matters/IT/Frame2.png",
    "/Why It Matters/IT/Frame3.png",
    "/Why It Matters/IT/Frame4.png",
    "/Why It Matters/IT/Frame5.png",
    "/Why It Matters/IT/Frame6.png",
  ],

  // ── Printing & Branding — dedicated folder images (Frame1 → Frame6) ────────
  "printing-branding-solutions": [
    "/Why It Matters/Printing/Frame1.png",
    "/Why It Matters/Printing/Frame2.png",
    "/Why It Matters/Printing/Frame3.png",
    "/Why It Matters/Printing/Frame4.png",
    "/Why It Matters/Printing/Frame5.png",
    "/Why It Matters/Printing/Frame6.png",
  ],

  // ── E-Commerce & Digital Services — dedicated folder images (Frame1 → Frame6) ─
  "ecommerce-digital-services": [
    "/Why It Matters/Ecommerce/Frame1.png",
    "/Why It Matters/Ecommerce/Frame2.png",
    "/Why It Matters/Ecommerce/Frame3.png",
    "/Why It Matters/Ecommerce/Frame4.png",
    "/Why It Matters/Ecommerce/Frame5.png",
    "/Why It Matters/Ecommerce/Frame6.png",
  ],

  // ── Civil Engineering — dedicated folder images (img-1 → img-6) ────────────
  "civil-engineering-infrastructure": [
    "/Why It Matters/Civil/img-1.png",
    "/Why It Matters/Civil/img-2.png",
    "/Why It Matters/Civil/img-3.png",
    "/Why It Matters/Civil/img-4.png",
    "/Why It Matters/Civil/img-5.png",
    "/Why It Matters/Civil/img-6.png",
  ],

  // ── Transportation — dedicated folder images (Frame1 → Frame6) ───────────
  "transportation-fleet-support": [
    "/Why It Matters/Transport/Frame1.png",
    "/Why It Matters/Transport/Frame2.png",
    "/Why It Matters/Transport/Frame3.png",
    "/Why It Matters/Transport/Frame4.png",
    "/Why It Matters/Transport/Frame5.png",
    "/Why It Matters/Transport/Frame6.png",
  ],

  // ── Uniform Solutions — dedicated folder images (Frame1 → Frame6) ──────────
  "uniform-solutions": [
    "/Why It Matters/Uniform/Frame1.png",
    "/Why It Matters/Uniform/Frame2.png",
    "/Why It Matters/Uniform/Frame3.png",
    "/Why It Matters/Uniform/Frame4.png",
    "/Why It Matters/Uniform/Frame5.png",
    "/Why It Matters/Uniform/Frame6.png",
  ],

  // ── Sports Training — dedicated folder images (Frame1 → Frame6) ───────────
  "sports-training-talent-development": [
    "/Why It Matters/Sports/Frame1.png",
    "/Why It Matters/Sports/Frame2.png",
    "/Why It Matters/Sports/Frame3.png",
    "/Why It Matters/Sports/Frame4.png",
    "/Why It Matters/Sports/Frame5.png",
    "/Why It Matters/Sports/Frame6.png",
  ],
};

// Local fallback — never reaches out to the internet
const FALLBACK_IMAGES = [
  "/Why It Matters/Frame 19.png",
  "/Why It Matters/Frame 20.png",
  "/Why It Matters/Frame 21.png",
  "/Why It Matters/Frame 22.png",
  "/Why It Matters/Frame 23.png",
  "/Why It Matters/Frame 24.png",
];

export default function DetailWhyItMatters({ detail }: { detail: ServiceDetail }) {
  const subtitle = WHY_IT_MATTERS_SUBTITLES[detail.slug] || "Discover how our strategic focus and execution drive meaningful institutional outcomes.";
  const serviceImages = IMAGES_BY_SERVICE[detail.slug] || FALLBACK_IMAGES;
  const sectionBgImage = "/Why It Matters/bg.jpg";

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[#F9F9FB] text-black">
      {/* Background Image for section */}
      {sectionBgImage && (
        <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-80">
          <Image
            src={sectionBgImage}
            alt=""
            fill
            sizes="100vw"
            className="w-full h-full object-cover object-center"
            priority
          />
        </div>
      )}

      <div className="container-responsive container-max relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <RevealSection delay={0.05}>
            <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-black font-semibold leading-tight tracking-tight mb-4">
              Why It Matters
            </h2>
          </RevealSection>
          <RevealSection delay={0.1}>
            <p className="text-black/60 text-sm md:text-base leading-relaxed">
              {subtitle}
            </p>
          </RevealSection>
        </div>

        {/* 3x2 Image Cards Grid — unified design for all services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
          {detail.whyItMatters.items.map((item, index) => {
            const bgImage = serviceImages[index % serviceImages.length];

            return (
              <div key={item.title} className="w-full">
                <RevealSection delay={(index % 3) * 0.08} className="h-full">
                  <div className="group relative overflow-hidden rounded-[24px] aspect-[802/608] shadow-md bg-neutral-900 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                    <Image
                      src={bgImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
                      <h3 className="text-white text-lg md:text-xl font-medium font-sans tracking-tight leading-snug mb-1">
                        {item.title}
                      </h3>
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

