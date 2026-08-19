export interface ServiceItem {
  id: string;
  title: string;
  description?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description?: string;
  services: ServiceItem[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "institutional-management",
    title: "Institutional Management",
    description: "Supporting institutional growth through strategic people management, consulting, and financial expertise.",
    services: [
      {
        id: "hr-management",
        title: "Human Resource Management",
      },
      {
        id: "educational-consulting",
        title: "Academics",
      },
      {
        id: "financial-consultancy",
        title: "Financial Consultancy",
      },
    ],
  },
  {
    id: "technology-innovation",
    title: "Technology & Innovation",
    description: "Enabling smarter institutions through digital transformation and innovative technology solutions.",
    services: [
      {
        id: "it-solutions",
        title: "IT Solutions & Digital Transformation",
      },
    ],
  },
  {
    id: "infrastructure-operations",
    title: "Infrastructure & Operations",
    description: "Building efficient, future-ready learning environments with integrated operational and infrastructure support.",
    services: [
      {
        id: "civil-engineering",
        title: "Civil Engineering & Infrastructure Development",
      },
      {
        id: "transportation-fleet",
        title: "Transportation & Fleet Support",
      },
      {
        id: "uniform-solutions",
        title: "Uniform Solutions",
      },
      {
        id: "canteen-services",
        title: "Canteen Service",
      },
    ],
  },
  {
    id: "student-development",
    title: "Student Development",
    description: "Creating opportunities for holistic growth through wellbeing, guidance, and talent development.",
    services: [
      {
        id: "behavioural-counselling",
        title: "Academics",
      },
      {
        id: "sports-training",
        title: "Sports Training & Talent Development",
      },
    ],
  },
  {
    id: "brand-communication",
    title: "Brand & Communication",
    description: "Strengthening institutional identity through impactful branding and communication solutions.",
    services: [
      {
        id: "printing-branding",
        title: "Marketing",
      },
    ],
  },
];
