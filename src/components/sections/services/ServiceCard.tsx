import Image from "next/image";
import { AllService } from "@/data/all-services";

interface ServiceCardProps {
  service: AllService;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative aspect-[3/4] max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300">
      {/* Background Image */}
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Text Overlay at bottom - inside the card */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-sm font-medium text-white text-center line-clamp-2">
          {service.title}
        </h3>
      </div>
    </div>
  );
}
