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
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "ethan-carter",
    name: "Ethan Carter",
    title: "Founder & Chief Executive Officer",
    roleSubtitle: "FOUNDER & CHIEF EXECUTIVE OFFICER",
    imageSrc: "/about/team/Ethan-Carter.jpg",
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
    id: "sophia-bennett",
    name: "Sophia Bennett",
    title: "Chief Operating Officer",
    roleSubtitle: "CHIEF OPERATING OFFICER",
    imageSrc: "/about/team/Sophia-Bennett.jpg",
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
    id: "liam-anderson",
    name: "Liam Anderson",
    title: "Chief Technology Officer",
    roleSubtitle: "CHIEF TECHNOLOGY OFFICER",
    imageSrc: "/about/team/Liam-Anderson.jpg",
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
    id: "olivia-parker",
    name: "Olivia Parker",
    title: "Head of Product Design",
    roleSubtitle: "HEAD OF PRODUCT DESIGN",
    imageSrc: "/about/team/Olivia-Parker.jpg",
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
    id: "noah-mitchell",
    name: "Noah Mitchell",
    title: "Lead Software Engineer",
    roleSubtitle: "LEAD SOFTWARE ENGINEER",
    imageSrc: "/about/team/Noah-Mitchell.avif",
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
    id: "ava-collins",
    name: "Ava Collins",
    title: "Marketing & Brand Strategist",
    roleSubtitle: "MARKETING & BRAND STRATEGIST",
    imageSrc: "/about/team/Ava-Collins.avif",
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
  {
    id: "mason-brooks",
    name: "Mason Brooks",
    title: "Business Development Manager",
    roleSubtitle: "BUSINESS DEVELOPMENT MANAGER",
    imageSrc: "/about/team/Mason-Brooks.jpg",
    bio: "Fostering strategic enterprise alliances, institutional funding pathways, and corporate partnerships that create new revenue streams and growth opportunities.",
    features: [
      {
        iconType: "users",
        title: "Strategic Alliances",
        description: "High-value institutional and corporate partnership building.",
      },
      {
        iconType: "chart",
        title: "Revenue Expansion",
        description: "Sustainable monetization models and funding strategies.",
      },
      {
        iconType: "globe",
        title: "Market Expansion",
        description: "Identifying untapped regional and international opportunities.",
      },
    ],
    specializations: ["Partnership Development", "Strategic Growth", "Market Expansion", "Deal Structuring"],
  },
  {
    id: "isabella-reed",
    name: "Isabella Reed",
    title: "Customer Success Manager",
    roleSubtitle: "CUSTOMER SUCCESS MANAGER",
    imageSrc: "/about/team/Isabella-Reed.jpg",
    bio: "Ensuring seamless client onboarding, continuous institutional support, and long-term partnership value for all partner schools and universities.",
    features: [
      {
        iconType: "users",
        title: "Client Onboarding",
        description: "Structured transition plans and comprehensive stakeholder training.",
      },
      {
        iconType: "shield",
        title: "Relationship Mgmt",
        description: "Proactive support, account health tracking, and feedback loops.",
      },
      {
        iconType: "zap",
        title: "Retention & Value",
        description: "Maximizing institutional ROI through continuous guidance.",
      },
    ],
    specializations: ["Client Success", "Account Strategy", "Stakeholder Training", "Service Excellence"],
  },
];
