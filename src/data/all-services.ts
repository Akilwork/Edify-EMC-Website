export interface AllService {
  id: string;
  title: string;
  image: string;
  slug: string;
}

export const ALL_SERVICES: AllService[] = [
  {
    id: "academic-service",
    title: "Academic Services",
    image: "/Services/educational_&_institutional_consulting_card_image.png",
    slug: "academic-services",
  },
  {
    id: "financial-services",
    title: "Financial Services",
    image: "/Services/financial_consultancy_card_image.png",
    slug: "financial-services",
  },
  {
    id: "hr-services",
    title: "Human Resource Services",
    image: "/Services/human_resource_services_card_image.png",
    slug: "human-resource-services",
  },
  {
    id: "it-solutions",
    title: "IT Solutions & Digital Transformation",
    image: "/Services/it_solutions_&_digital_transformation_card_image.png",
    slug: "it-solutions-digital-transformation",
  },
  {
    id: "marketing",
    title: "Marketing",
    image: "/Services/printing_&_branding_solutions_card_image.png",
    slug: "marketing",
  },
  {
    id: "uniform-services",
    title: "Uniform Services",
    image: "/Service-page/Uniform-&-Clothing-Solutions.png",
    slug: "uniform-services",
  },
  {
    id: "canteen-services",
    title: "Canteen Service",
    image: "/Service-page/student-development.jpg",
    slug: "canteen-management-services",
  },
  {
    id: "project-management-development",
    title: "Project Management & Development",
    image: "/Service-page/Civil-Engineering-&-Infrastructure-Development.png",
    slug: "project-management-development",
  },
];
