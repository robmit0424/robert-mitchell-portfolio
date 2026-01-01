"use client";

import { useState, useEffect } from "react";
import { personal } from "@/data/personal";

export function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 h-10 bg-black/60 backdrop-blur-sm border-b border-aurora-cyan/20 z-50 flex items-center justify-between px-4">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-hud-green pulse-glow" />
          <span className="font-mono text-xs text-aurora-cyan">PORTFOLIO.exe</span>
        </div>
      </div>

      {/* Center - can add more items */}
      <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-text-muted/60">
        <span>SECTOR: HOME</span>
        <span className="text-aurora-cyan/50">|</span>
        <span>STATUS: ONLINE</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="text-text-muted/60 hidden sm:inline">{personal.name.toUpperCase()}</span>
        <span className="text-aurora-cyan/50 hidden sm:inline">|</span>
        <span className="text-aurora-cyan">{time}</span>
      </div>
    </div>
  );
}
