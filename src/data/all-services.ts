export interface AllService {
  id: string;
  title: string;
  image: string;
  slug: string;
}

export const ALL_SERVICES: AllService[] = [
  {
    id: "behavioural-counselling",
    title: "Behavioural Counselling & Student Support",
    image: "/Services/behavioural_counselling_&_student_support_card_image.png",
    slug: "behavioural-counselling-student-support",
  },
  {
    id: "educational-consulting",
    title: "Educational & Institutional Consulting",
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
    title: "Printing & Branding Solutions",
    image: "/Services/printing_&_branding_solutions_card_image.png",
    slug: "printing-branding-solutions",
  },
];
