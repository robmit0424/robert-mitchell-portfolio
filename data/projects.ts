export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  featured: boolean;
  link?: string;
  github?: string;
  image?: string;
  metrics?: string;
}

export const projects: Project[] = [
  {
    id: "portraits",
    title: "Portraits.com",
    description: "AI-powered SaaS platform for generating professional headshots and portraits at scale",
    longDescription: "Designed and built from MVP to production. Features include Supabase authentication, Stripe billing integration, Cloudflare R2 storage, and fine-tuned LoRA-based AI pipelines for high-quality image generation.",
    technologies: ["Next.js", "React", "Supabase", "Stripe", "Cloudflare R2", "AI/ML", "LoRA"],
    featured: true,
    metrics: "Thousands of users served",
  },
  {
    id: "dupr",
    title: "DUPR Platform",
    description: "Sports platform serving 50,000+ monthly active users across web and mobile",
    longDescription: "Led frontend development as sole engineer for this pickleball rating and community platform. Launched DUPR+ subscription product, integrated ad monetization, and implemented A/B testing infrastructure.",
    technologies: ["React", "React Native", "Firebase", "Google Analytics", "A/B Testing"],
    featured: true,
    metrics: "50,000+ MAU",
  },
  {
    id: "case-management",
    title: "Insurance Case Management",
    description: "Streamlined claim intake and review workflows for insurance services",
    longDescription: "Built a comprehensive case management system that digitized and automated insurance claim workflows, reducing processing time and improving accuracy.",
    technologies: ["React", "Node.js", "MySQL", "REST API"],
    featured: true,
  },
  {
    id: "tow-platform",
    title: "Tow Operator Platform",
    description: "Mobile/web platform connecting tow operators and parking enforcement teams",
    longDescription: "Full-stack platform enabling real-time coordination between tow truck operators and parking enforcement, featuring mobile apps and a web dashboard.",
    technologies: ["React", "React Native", "Node.js", "Real-time"],
    featured: false,
  },
  {
    id: "mvp-features",
    title: "Startup MVP Development",
    description: "Built and iterated on MVP features for early-stage startups",
    longDescription: "Collaborated with design and product teams to rapidly build and iterate on MVP features, translating UX designs into production-ready code.",
    technologies: ["React", "React Query", "TypeScript", "Figma"],
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
