export interface TeamFeature {
  iconType: "code" | "cart" | "zap" | "chart" | "shield" | "layers" | "users" | "target" | "sparkles" | "globe";
  title: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  roleSubtitle: string;
  imageSrc: string;
  bio: string;
  features: [TeamFeature, TeamFeature, TeamFeature];
  specializations: string[];
  imageClassName?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "fahim-ejaj",
    name: "Fahim Ejaj",
    title: "Group Administration Manager",
    roleSubtitle: "GROUP ADMINISTRATION MANAGER",
    imageSrc: "/about/team/Fahim Ejaj.jpg",
    bio: "Driving strategic vision and operational transformation for educational institutions globally. Focused on sustainable growth, institutional governance, and building high-impact academic frameworks.",
    features: [
      {
        iconType: "target",
        title: "Strategic Leadership",
        description: "Tailored roadmaps for complex institutional growth and governance.",
      },
      {
        iconType: "globe",
        title: "Global Expansion",
        description: "Scalable educational frameworks and cross-border partnerships.",
      },
      {
        iconType: "chart",
        title: "Measurable Impact",
        description: "Data-backed outcomes for sustainable academic advancement.",
      },
    ],
    specializations: ["Strategic Planning", "Executive Leadership", "Academic Governance", "Institutional Growth"],
  },
  {
    id: "ujjwal-jani",
    name: "Ujjwal Jani",
    title: "Finance Manager",
    roleSubtitle: "FINANCE MANAGER",
    imageSrc: "/about/team/Ujjwal Jani.png",
    bio: "Streamlining operational workflows, optimizing campus resource allocation, and delivering high-performance administrative structures across diverse academic environments.",
    features: [
      {
        iconType: "layers",
        title: "Operations Excellence",
        description: "Standardized administrative systems and high-efficiency workflows.",
      },
      {
        iconType: "chart",
        title: "Resource Planning",
        description: "Strategic allocation of fiscal, human, and physical assets.",
      },
      {
        iconType: "zap",
        title: "Process Optimization",
        description: "Agile change management for institutional longevity.",
      },
    ],
    specializations: ["Operational Strategy", "Change Management", "Resource Allocation", "Performance Optimization"],
  },
  {
    id: "ms-bindu",
    name: "Ms. Bindu",
    title: "Academics - General counseling (SEED)",
    roleSubtitle: "ACADEMICS - GENERAL COUNSELING (SEED)",
    imageSrc: "/about/team/Ms. Bindu.jpg",
    imageClassName: "scale-[1.15] group-hover:scale-[1.20]",
    bio: "Architecting next-generation digital campuses, AI-powered learning infrastructure, and enterprise-grade data security systems for modern education ecosystems.",
    features: [
      {
        iconType: "code",
        title: "Digital Ecosystems",
        description: "Modern cloud architecture and campus IT ecosystem modernization.",
      },
      {
        iconType: "sparkles",
        title: "EdTech Innovation",
        description: "Integration of scalable learning platforms and smart analytics.",
      },
      {
        iconType: "shield",
        title: "Enterprise Security",
        description: "Data privacy compliance, robust security, and resilient uptime.",
      },
    ],
    specializations: ["Cloud Architecture", "AI in Education", "Campus Security", "Enterprise Infrastructure"],
  },
  {
    id: "feroz-mammed",
    name: "Feroz Mammed",
    title: "HR department - Group HR Manager",
    roleSubtitle: "HR DEPARTMENT - GROUP HR MANAGER",
    imageSrc: "/about/team/Feroz Mammed.jpg",
    bio: "Crafting human-centered learning platforms, intuitive digital student experiences, and accessible design systems that foster deep engagement and educational success.",
    features: [
      {
        iconType: "sparkles",
        title: "User Experience",
        description: "Seamless, accessible UI/UX for students, faculty, and leadership.",
      },
      {
        iconType: "layers",
        title: "Design Systems",
        description: "Cohesive digital assets and brand aesthetics across touchpoints.",
      },
      {
        iconType: "target",
        title: "Product Innovation",
        description: "Research-led design strategies for engaging learning tools.",
      },
    ],
    specializations: ["UI/UX Strategy", "Design Systems", "Product Research", "Student Experience"],
  },
  {
    id: "afzal-m",
    name: "Afzal-M",
    title: "IT Director",
    roleSubtitle: "IT DIRECTOR",
    imageSrc: "/about/team/Afzal-M.jpg",
    bio: "Building robust, ultra-fast web platforms and real-time administrative dashboards. Specialist in clean architecture, API design, and high-load web applications.",
    features: [
      {
        iconType: "code",
        title: "Web Development",
        description: "Tailor-made web applications with modern technologies.",
      },
      {
        iconType: "cart",
        title: "E-Commerce Portals",
        description: "Scalable online platforms that simplify processes and sales.",
      },
      {
        iconType: "zap",
        title: "High Performance",
        description: "Optimized solutions for fast load times and best user experience.",
      },
    ],
    specializations: ["React", "Next.js", "Node.js", "Tailwind CSS", "API Systems"],
  },
  {
    id: "zakir-hussain-kamaluddin",
    name: "Zakir Hussain Kamaluddin",
    title: "Chairman",
    roleSubtitle: "CHAIRMAN",
    imageSrc: "/about/team/Zakir_Hussain_Kamaluddin.jpg",
    bio: "Building powerful institutional brand narratives, recruitment campaigns, and global outreach strategies that increase enrollment and elevate market reputation.",
    features: [
      {
        iconType: "sparkles",
        title: "Brand Positioning",
        description: "Distinctive identity crafting and value proposition design.",
      },
      {
        iconType: "target",
        title: "Student Recruitment",
        description: "Data-driven digital acquisition campaigns and funnel growth.",
      },
      {
        iconType: "globe",
        title: "Strategic Outreach",
        description: "High-impact multi-channel engagement and public relations.",
      },
    ],
    specializations: ["Brand Strategy", "Digital Marketing", "Enrollment Growth", "Market Research"],
  },

];
