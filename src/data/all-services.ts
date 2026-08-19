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
    slug: "educational-institutional-consulting",
  },
  {
    id: "financial-consultancy",
    title: "Financial Consultancy",
    image: "/Services/financial_consultancy_card_image.png",
    slug: "financial-consultancy",
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
    id: "printing-branding",
    title: "Marketing",
    image: "/Services/printing_&_branding_solutions_card_image.png",
    slug: "printing-branding-solutions",
  },
  {
    id: "uniform-solutions",
    title: "Uniform Solutions",
    image: "/Service-page/Uniform-&-Clothing-Solutions.png",
    slug: "uniform-solutions",
  },
  {
    id: "canteen-services",
    title: "Canteen Service",
    image: "/Service-page/student-development.jpg",
    slug: "canteen-management-services",
  },
];
