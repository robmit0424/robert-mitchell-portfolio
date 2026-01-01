export interface Skill {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  invert?: boolean;
}

export interface WeaponStats {
  versatility: number;  // 0-100
  complexity: number;   // 0-100
  power: number;        // 0-100
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  tagline: string;
  stats: WeaponStats;
  skills: Skill[];
}

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SIMPLE_BASE = 'https://cdn.simpleicons.org';

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#61DAFB',
    tagline: 'Build blazing fast interfaces',
    stats: { versatility: 95, complexity: 75, power: 90 },
    skills: [
      { id: 'react', name: 'React / React Native', icon: `${DEVICON_BASE}/react/react-original.svg`, color: '#61DAFB' },
      { id: 'nextjs', name: 'Next.js', icon: `${DEVICON_BASE}/nextjs/nextjs-original.svg`, color: '#ffffff' },
      { id: 'typescript', name: 'TypeScript', icon: `${DEVICON_BASE}/typescript/typescript-original.svg`, color: '#3178C6' },
      { id: 'vue', name: 'Vue.js', icon: `${DEVICON_BASE}/vuejs/vuejs-original.svg`, color: '#4FC08D' },
      { id: 'html-css', name: 'HTML5 / CSS3', icon: `${DEVICON_BASE}/html5/html5-original.svg`, color: '#E34F26' },
      { id: 'tailwind', name: 'Tailwind CSS', icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg`, color: '#06B6D4' },
      { id: 'sass', name: 'Sass / SCSS', icon: `${DEVICON_BASE}/sass/sass-original.svg`, color: '#CC6699' },
      { id: 'framer', name: 'Framer Motion', icon: `${DEVICON_BASE}/framermotion/framermotion-original.svg`, color: '#0055FF', invert: true },
      { id: 'threejs', name: 'Three.js', icon: `${DEVICON_BASE}/threejs/threejs-original.svg`, color: '#ffffff', invert: true },
    ],
  },
  {
    id: 'state',
    name: 'State & Data',
    color: '#764ABC',
    tagline: 'Manage complex data flows',
    stats: { versatility: 80, complexity: 85, power: 75 },
    skills: [
      { id: 'redux', name: 'Redux', icon: `${DEVICON_BASE}/redux/redux-original.svg`, color: '#764ABC' },
      { id: 'zustand', name: 'Zustand', icon: `https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg`, color: '#ffffff' },
      { id: 'tanstack', name: 'TanStack Query', icon: `${SIMPLE_BASE}/reactquery/FF4154`, color: '#FF4154' },
      { id: 'graphql', name: 'GraphQL', icon: `${DEVICON_BASE}/graphql/graphql-plain.svg`, color: '#E10098' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#339933',
    tagline: 'Power the server side',
    stats: { versatility: 85, complexity: 80, power: 95 },
    skills: [
      { id: 'nodejs', name: 'Node.js', icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg`, color: '#339933' },
      { id: 'express', name: 'Express.js', icon: `${DEVICON_BASE}/express/express-original.svg`, color: '#ffffff', invert: true },
      { id: 'supabase', name: 'Supabase', icon: `${DEVICON_BASE}/supabase/supabase-original.svg`, color: '#3FCF8E' },
      { id: 'mysql', name: 'MySQL', icon: `${DEVICON_BASE}/mysql/mysql-original.svg`, color: '#4479A1' },
      { id: 'python', name: 'Python', icon: `${DEVICON_BASE}/python/python-original.svg`, color: '#3776AB' },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    color: '#FF9900',
    tagline: 'Deploy and scale anywhere',
    stats: { versatility: 90, complexity: 90, power: 85 },
    skills: [
      { id: 'aws', name: 'AWS', icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`, color: '#FF9900' },
      { id: 'firebase', name: 'Firebase', icon: `${DEVICON_BASE}/firebase/firebase-original.svg`, color: '#FFCA28' },
      { id: 'vercel', name: 'Vercel', icon: `${DEVICON_BASE}/vercel/vercel-original.svg`, color: '#ffffff', invert: true },
      { id: 'cloudflare', name: 'Cloudflare R2', icon: `${DEVICON_BASE}/cloudflare/cloudflare-original.svg`, color: '#F38020' },
      { id: 'git', name: 'Git', icon: `${DEVICON_BASE}/git/git-original.svg`, color: '#F05032' },
    ],
  },
  {
    id: 'build',
    name: 'Build Tools',
    color: '#F7DF1E',
    tagline: 'Optimize the pipeline',
    stats: { versatility: 70, complexity: 65, power: 60 },
    skills: [
      { id: 'vite', name: 'Vite', icon: `${DEVICON_BASE}/vitejs/vitejs-original.svg`, color: '#646CFF' },
      { id: 'webpack', name: 'Webpack', icon: `${DEVICON_BASE}/webpack/webpack-original.svg`, color: '#8DD6F9' },
      { id: 'babel', name: 'Babel', icon: `${DEVICON_BASE}/babel/babel-original.svg`, color: '#F9DC3E' },
      { id: 'eslint', name: 'ESLint', icon: `${DEVICON_BASE}/eslint/eslint-original.svg`, color: '#4B32C3' },
      { id: 'prettier', name: 'Prettier', icon: `${SIMPLE_BASE}/prettier/F7B93E`, color: '#F7B93E' },
    ],
  },
  {
    id: 'auth-pay',
    name: 'Auth & Payments',
    color: '#635BFF',
    tagline: 'Secure transactions guaranteed',
    stats: { versatility: 75, complexity: 70, power: 88 },
    skills: [
      { id: 'nextauth', name: 'NextAuth.js', icon: `${SIMPLE_BASE}/nextdotjs/white`, color: '#ffffff' },
      { id: 'jwt', name: 'JWT / OAuth 2.0', icon: `${SIMPLE_BASE}/jsonwebtokens/white`, color: '#ffffff' },
      { id: 'stripe', name: 'Stripe', icon: `${SIMPLE_BASE}/stripe/635BFF`, color: '#635BFF' },
      { id: 'paypal', name: 'PayPal', icon: `${SIMPLE_BASE}/paypal/00457C`, color: '#00457C' },
      { id: 'shopify', name: 'Shopify', icon: `${SIMPLE_BASE}/shopify/7AB55C`, color: '#7AB55C' },
      { id: 'square', name: 'Square', icon: `${SIMPLE_BASE}/square/3E4348`, color: '#3E4348' },
    ],
  },
  {
    id: 'ai',
    name: 'AI & ML',
    color: '#00A67E',
    tagline: 'Unleash intelligent systems',
    stats: { versatility: 85, complexity: 95, power: 100 },
    skills: [
      { id: 'openai', name: 'OpenAI API', icon: `https://www.svgrepo.com/show/306500/openai.svg`, color: '#412991', invert: true },
      { id: 'anthropic', name: 'Anthropic API', icon: `${SIMPLE_BASE}/anthropic/white`, color: '#D4A574' },
      { id: 'huggingface', name: 'Hugging Face', icon: `${SIMPLE_BASE}/huggingface/FFD21E`, color: '#FFD21E' },
      { id: 'rag', name: 'RAG / n8n', icon: `${SIMPLE_BASE}/n8n/white`, color: '#EA4B71' },
      { id: 'lora', name: 'LoRA Fine-tuning', icon: `${SIMPLE_BASE}/pytorch/EE4C2C`, color: '#EE4C2C' },
    ],
  },
  {
    id: 'testing',
    name: 'Testing',
    color: '#C21325',
    tagline: 'Ship with confidence',
    stats: { versatility: 65, complexity: 55, power: 70 },
    skills: [
      { id: 'jest', name: 'Jest', icon: `${DEVICON_BASE}/jest/jest-plain.svg`, color: '#C21325' },
      { id: 'vitest', name: 'Vitest', icon: `${DEVICON_BASE}/vitest/vitest-original.svg`, color: '#6E9F18' },
      { id: 'playwright', name: 'Playwright', icon: `${DEVICON_BASE}/playwright/playwright-original.svg`, color: '#2EAD33' },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile',
    color: '#06B6D4',
    tagline: 'Native experiences everywhere',
    stats: { versatility: 80, complexity: 75, power: 85 },
    skills: [
      { id: 'expo', name: 'Expo', icon: `${SIMPLE_BASE}/expo/white`, color: '#06B6D4' },
      { id: 'swift', name: 'Swift / SwiftUI', icon: `${DEVICON_BASE}/swift/swift-original.svg`, color: '#FA7343' },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    color: '#F9AB00',
    tagline: 'Data-driven decisions',
    stats: { versatility: 75, complexity: 60, power: 80 },
    skills: [
      { id: 'ga', name: 'Google Analytics', icon: `${SIMPLE_BASE}/googleanalytics/F9AB00`, color: '#F9AB00' },
      { id: 'mixpanel', name: 'Mixpanel', icon: `${SIMPLE_BASE}/mixpanel/7856FF`, color: '#7856FF' },
      { id: 'posthog', name: 'PostHog', icon: `${SIMPLE_BASE}/posthog/white`, color: '#ffffff' },
      { id: 'sentry', name: 'Sentry', icon: `${DEVICON_BASE}/sentry/sentry-original.svg`, color: '#362D59' },
    ],
  },
  {
    id: 'design',
    name: 'Design & Tools',
    color: '#F24E1E',
    tagline: 'Pixel-perfect collaboration',
    stats: { versatility: 70, complexity: 50, power: 65 },
    skills: [
      { id: 'figma', name: 'Figma', icon: `${DEVICON_BASE}/figma/figma-original.svg`, color: '#F24E1E' },
      { id: 'photoshop', name: 'Photoshop', icon: `${DEVICON_BASE}/photoshop/photoshop-original.svg`, color: '#31A8FF' },
      { id: 'illustrator', name: 'Illustrator', icon: `${DEVICON_BASE}/illustrator/illustrator-plain.svg`, color: '#FF9A00', invert: true },
      { id: 'notion', name: 'Notion', icon: `${DEVICON_BASE}/notion/notion-original.svg`, color: '#ffffff' },
      { id: 'slack', name: 'Slack', icon: `${DEVICON_BASE}/slack/slack-original.svg`, color: '#4A154B' },
      { id: 'jira', name: 'Jira', icon: `${DEVICON_BASE}/jira/jira-original.svg`, color: '#0052CC' },
      { id: 'linear', name: 'Linear', icon: `${SIMPLE_BASE}/linear/5E6AD2`, color: '#5E6AD2' },
    ],
  },
  {
    id: 'cms',
    name: 'CMS & Content',
    color: '#21759B',
    tagline: 'Content at scale',
    stats: { versatility: 60, complexity: 40, power: 55 },
    skills: [
      { id: 'wordpress', name: 'WordPress', icon: `${DEVICON_BASE}/wordpress/wordpress-plain.svg`, color: '#21759B' },
      { id: 'mdx', name: 'Markdown / MDX', icon: `${DEVICON_BASE}/markdown/markdown-original.svg`, color: '#ffffff', invert: true },
    ],
  },
];
