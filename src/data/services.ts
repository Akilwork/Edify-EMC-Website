import type { Service } from "@/types";

export const SERVICES: Service[] = [
  {
    id:          "strategy",
    title:       "Strategy & Planning",
    description: "Comprehensive strategic planning to align your organisation's goals with market realities.",
    icon:        "Target",
    slug:        "strategy-planning",
  },
  {
    id:          "transformation",
    title:       "Organisational Transformation",
    description: "End-to-end transformation programmes that reshape culture, structure, and performance.",
    icon:        "RefreshCw",
    slug:        "organisational-transformation",
  },
  {
    id:          "leadership",
    title:       "Leadership Development",
    description: "Tailored leadership programmes that build the capabilities needed for tomorrow's challenges.",
    icon:        "Users",
    slug:        "leadership-development",
  },
  {
    id:          "change",
    title:       "Change Management",
    description: "Structured change management to ensure sustainable adoption and minimise disruption.",
    icon:        "ArrowUpRight",
    slug:        "change-management",
  },
];
