"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { navigation } from "@/data/personal";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// Icons for nav items
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  about: <UserIcon />,
  skills: <CodeIcon />,
  experience: <BriefcaseIcon />,
  projects: <FolderIcon />,
  contact: <HomeIcon />,
};

export function Navigation() {
  const scrollProgress = useScrollProgress();

  const navItems = navigation.map((item) => ({
    name: item.label,
    link: `#${item.id}`,
    icon: iconMap[item.id] || <HomeIcon />,
  }));

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-accent via-blue-500 to-purple-500 z-[5001] transition-all duration-100"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Floating Navigation */}
      <FloatingNav navItems={navItems} />
    </>
  );
}
