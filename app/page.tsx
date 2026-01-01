"use client";

import { useIsMobile } from "@/components/hooks/useIsMobile";
import { DesktopApp } from "@/components/desktop/DesktopApp";
import { MobileApp } from "@/components/mobile/MobileApp";

export default function Home() {
  const isMobile = useIsMobile();

  // Show nothing during SSR/hydration to avoid flash
  if (isMobile === undefined) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-aurora-cyan/30 border-t-aurora-cyan rounded-full animate-spin" />
      </div>
    );
  }

  return isMobile ? <MobileApp /> : <DesktopApp />;
}
