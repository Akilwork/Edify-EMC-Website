import { ALL_SERVICES } from "@/data/all-services";
import ServiceCard from "./ServiceCard";

interface ServicesGridSceneProps {
  isVisible?: boolean;
}

export default function ServicesGridScene({ isVisible }: ServicesGridSceneProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:px-16 lg:px-20">
      <div className="w-full max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-4">
          {ALL_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
