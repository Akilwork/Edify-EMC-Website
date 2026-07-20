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

  // ── Behavioural Counselling — unique contextual images per card
  "behavioural-counselling-student-support": [
    "/Why It Matters/behavioural-counselling/img-1.png",        // Enhance Student Wellbeing  (real counselling photo)
    "/Why It Matters/educational-institutional/img-3.png",      // Improve Behaviour & Engagement  (students in classroom)
    "/Why It Matters/educational-institutional/img-5.png",      // Strengthen Career Readiness  (academic planning)
    "/Why It Matters/educational-institutional/img-1.png",      // Empower Educators  (teacher-led session)
    "/Why It Matters/educational-institutional/img-6.png",      // Build Parent Partnerships  (stakeholder meeting)
    "/Why It Matters/educational-institutional/img-4.png",      // Promote Holistic Growth  (campus / wider environment)
  ],

  // ── IT Solutions — service hero repeated across all 6 cards ─────────────
  "it-solutions-digital-transformation": [
    "/Service-page/IT-Solutions-&-Digital-Transformation.png",
    "/Service-page/IT-Solutions-&-Digital-Transformation.png",
    "/Service-page/IT-Solutions-&-Digital-Transformation.png",
    "/Service-page/IT-Solutions-&-Digital-Transformation.png",
    "/Service-page/IT-Solutions-&-Digital-Transformation.png",
    "/Service-page/IT-Solutions-&-Digital-Transformation.png",
  ],

  // ── Printing & Branding — service hero repeated across all 6 cards ───────
  "printing-branding-solutions": [
    "/Service-page/Printing-&-Branding-Solutions.png",
    "/Service-page/Printing-&-Branding-Solutions.png",
    "/Service-page/Printing-&-Branding-Solutions.png",
    "/Service-page/Printing-&-Branding-Solutions.png",
    "/Service-page/Printing-&-Branding-Solutions.png",
    "/Service-page/Printing-&-Branding-Solutions.png",
  ],

  // ── E-Commerce & Digital Services — service hero repeated ────────────────
  "ecommerce-digital-services": [
    "/Service-page/E-Commerce-&-Digital-Services.png",
    "/Service-page/E-Commerce-&-Digital-Services.png",
    "/Service-page/E-Commerce-&-Digital-Services.png",
    "/Service-page/E-Commerce-&-Digital-Services.png",
    "/Service-page/E-Commerce-&-Digital-Services.png",
    "/Service-page/E-Commerce-&-Digital-Services.png",
  ],

  // ── Civil Engineering — service hero repeated ────────────────────────────
  "civil-engineering-infrastructure": [
    "/Service-page/Civil-Engineering-&-Infrastructure-Development.png",
    "/Service-page/Civil-Engineering-&-Infrastructure-Development.png",
    "/Service-page/Civil-Engineering-&-Infrastructure-Development.png",
    "/Service-page/Civil-Engineering-&-Infrastructure-Development.png",
    "/Service-page/Civil-Engineering-&-Infrastructure-Development.png",
    "/Service-page/Civil-Engineering-&-Infrastructure-Development.png",
  ],

  // ── Transportation — service hero repeated ───────────────────────────────
  "transportation-fleet-support": [
    "/Service-page/Transportation-&-Fleet-Support.png",
    "/Service-page/Transportation-&-Fleet-Support.png",
    "/Service-page/Transportation-&-Fleet-Support.png",
    "/Service-page/Transportation-&-Fleet-Support.png",
    "/Service-page/Transportation-&-Fleet-Support.png",
    "/Service-page/Transportation-&-Fleet-Support.png",
  ],

  // ── Uniform Solutions — service hero repeated ────────────────────────────
  "uniform-solutions": [
    "/Service-page/Uniform-&-Clothing-Solutions.png",
    "/Service-page/Uniform-&-Clothing-Solutions.png",
    "/Service-page/Uniform-&-Clothing-Solutions.png",
    "/Service-page/Uniform-&-Clothing-Solutions.png",
    "/Service-page/Uniform-&-Clothing-Solutions.png",
    "/Service-page/Uniform-&-Clothing-Solutions.png",
  ],

  // ── Sports Training — service hero repeated ──────────────────────────────
  "sports-training-talent-development": [
    "/Service-page/Sports-Training-&-Talent-Development.png",
    "/Service-page/Sports-Training-&-Talent-Development.png",
    "/Service-page/Sports-Training-&-Talent-Development.png",
    "/Service-page/Sports-Training-&-Talent-Development.png",
    "/Service-page/Sports-Training-&-Talent-Development.png",
    "/Service-page/Sports-Training-&-Talent-Development.png",
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
    <section className="relative w-full py-20 md:py-28 overflow-hidden bg-white text-black">
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

