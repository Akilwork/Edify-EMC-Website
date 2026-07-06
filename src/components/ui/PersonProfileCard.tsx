import Image from "next/image";

interface PersonProfileCardProps {
  name: string;
  title: string;
  imageSrc: string;
  imageAlt?: string;
  className?: string;
}

export default function PersonProfileCard({
  name,
  title,
  imageSrc,
  imageAlt,
  className = ""
}: PersonProfileCardProps) {
  return (
    <div
      className={`relative w-[280px] sm:w-[320px] mx-auto ${className}`}
      style={{ filter: "drop-shadow(0 16px 32px rgba(0,0,0,0.15))" }}
    >
      {/* The PNG blob shape with image */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
        <Image
          src={imageSrc}
          alt={imageAlt || name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 280px, 320px"
          priority
        />

        {/* Bottom gradient + name overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 35%, transparent 65%)",
          }}
        >
          <span className="text-white font-sans font-bold text-base sm:text-lg leading-tight drop-shadow-sm">
            {name}
          </span>
          <span className="text-white/70 text-xs sm:text-sm font-medium mt-1">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}
