import RevealSection from "./RevealSection";
import type { ServiceDetail } from "@/data/service-details";

export default function DetailOverview({ detail }: { detail: ServiceDetail }) {
  // Configurable overview images (defaulting to the exported Figma rectangle shapes)
  const images = [
    "/Service details/Rectangle 199.png",
    "/Service details/Rectangle 200.png",
    "/Service details/Rectangle 202.png",
  ];

  return (
    <section className="relative w-full bg-black py-20 md:py-28 overflow-hidden">
      <div className="container-responsive container-max">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Text Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <RevealSection delay={0.05}>
              <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl text-white font-normal leading-tight tracking-tight mb-6">
                {detail.overview.heading}
              </h2>
            </RevealSection>
            
            <RevealSection delay={0.1}>
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl">
                {detail.overview.body}
              </p>
            </RevealSection>
          </div>

          {/* Right Column: 3-Image Grid Layout */}
          <div className="lg:col-span-6 w-full">
            <RevealSection delay={0.15}>
              <div className="grid grid-cols-2 gap-4 max-w-md lg:max-w-none mx-auto w-full">
                {/* Top Left Image */}
                <div className="overflow-hidden rounded-[18px] border border-white/5 shadow-2xl">
                  <img
                    src={images[0]}
                    alt="Overview image 1"
                    className="w-full h-[180px] sm:h-[220px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                
                {/* Top Right Image */}
                <div className="overflow-hidden rounded-[18px] border border-white/5 shadow-2xl">
                  <img
                    src={images[1]}
                    alt="Overview image 2"
                    className="w-full h-[180px] sm:h-[220px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                
                {/* Bottom Wide Image */}
                <div className="col-span-2 overflow-hidden rounded-[18px] border border-white/5 shadow-2xl">
                  <img
                    src={images[2]}
                    alt="Overview image 3"
                    className="w-full h-[200px] sm:h-[260px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
}
