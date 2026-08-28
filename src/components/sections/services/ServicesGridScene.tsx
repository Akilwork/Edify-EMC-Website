import { ALL_SERVICES } from "@/data/all-services";
import ServiceCard from "./ServiceCard";

interface ServicesGridSceneProps {
  isVisible?: boolean;
}

export default function ServicesGridScene({ isVisible }: ServicesGridSceneProps) {
  return (
    <div className="w-full h-full flex items-center justify-center container-responsive container-max py-8">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-4">
          {ALL_SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
