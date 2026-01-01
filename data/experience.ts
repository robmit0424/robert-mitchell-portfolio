export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: "portraits",
    company: "Portraits.com",
    role: "Lead Product Engineer",
    period: "April 2025 – Present",
    description: [
      "Designed and shipped an AI-powered SaaS platform from MVP to production, enabling users to generate professional headshots and portraits at scale",
      "Built and maintained a production React + Next.js frontend with Supabase auth, Stripe billing, and Cloudflare R2 storage",
      "Integrated fine-tuned LoRA-based AI pipelines for image generation, supporting thousands of user uploads",
      "Implemented analytics, referral tracking, and pricing experiments that directly impacted conversion and revenue",
      "Owned UI/UX decisions, performance optimization, and deployment workflows in a remote-first environment",
    ],
    technologies: ["React", "Next.js", "Supabase", "Stripe", "Cloudflare R2", "AI/ML", "LoRA"],
  },
  {
    id: "dupr",
    company: "DUPR",
    role: "Senior Frontend Engineer",
    period: "March 2024 – April 2025",
    description: [
      "Sole frontend engineer for web and mobile platforms serving 50,000+ monthly active users",
      "Architected and maintained shared frontend systems using React and React Native",
      "Led the frontend launch of DUPR+, a paid subscription product that expanded platform monetization",
      "Integrated Google Ads and AppLovin to diversify revenue streams",
      "Implemented Firebase Remote Config and A/B testing to safely roll out features and optimize performance",
      "Ensured analytics accuracy, QA coverage, and consistent UX across all deployments",
    ],
    technologies: ["React", "React Native", "Firebase", "Google Ads", "AppLovin", "A/B Testing"],
  },
  {
    id: "rbac",
    company: "RBAC Management",
    role: "Full Stack Engineer",
    period: "November 2023 – April 2024",
    description: [
      "Built a case management system for an insurance services company, streamlining claim intake and review workflows",
      "Developed a mobile/web platform connecting tow operators and parking enforcement teams",
      "Owned architecture, database design, frontend development, and deployment",
    ],
    technologies: ["React", "Node.js", "MySQL", "Mobile Development"],
  },
  {
    id: "codetrust",
    company: "Code/+/Trust",
    role: "Software Engineer",
    period: "January 2023 – November 2023",
    description: [
      "Built and iterated on MVP features using React and React Query in collaboration with design and product teams",
      "Translated UX designs into scalable, production-ready frontend systems",
      "Used user feedback and analytics to guide feature prioritization and improvements",
    ],
    technologies: ["React", "React Query", "TypeScript", "Product Development"],
  },
];
