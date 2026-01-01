"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { WeaponCarousel } from "./WeaponCarousel";
import { WeaponDisplay } from "./WeaponDisplay";
import { WeaponStats } from "./WeaponStats";
import { HUDCorners } from "@/components/ui/HUDCorners";
import { skillCategories } from "@/data/skills";

export function WeaponLoadout() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isIdle, setIsIdle] = useState(false);

  const selectedCategory = skillCategories[selectedIndex];

  // Handle weapon selection
  const handleSelect = useCallback((index: number) => {
    setSelectedIndex(index);
    setIsIdle(false);
  }, []);

  // Auto-cycle through weapons when idle (optional feature)
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    let cycleTimer: NodeJS.Timeout;

    const resetIdleTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      clearTimeout(cycleTimer);

      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 15000); // 15 seconds of inactivity
    };

    // Start cycle when idle
    if (isIdle) {
      cycleTimer = setInterval(() => {
        setSelectedIndex((prev) => (prev + 1) % skillCategories.length);
      }, 4000); // Cycle every 4 seconds
    }

    // Track user activity
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetIdleTimer));

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      clearInterval(cycleTimer);
      events.forEach((event) => window.removeEventListener(event, resetIdleTimer));
    };
  }, [isIdle]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 209, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 209, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col px-8 md:px-20 lg:px-32 py-12">
        {/* Main terminal window */}
        <div className="flex-1 flex flex-col bg-black/50 backdrop-blur-sm border border-aurora-cyan/30 rounded-lg overflow-hidden">
          <HUDCorners />

          {/* Terminal header bar */}
          <div className="flex items-center justify-between border-b border-aurora-cyan/30 px-4 py-2 bg-black/40 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-hud-red/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-hud-amber/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-hud-green/80" />
              </div>
              <span className="font-mono text-sm text-aurora-cyan">
                <span className="text-nebula-purple">&gt;</span> ARMORY.exe
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  _
                </motion.span>
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono text-text-muted/50">
              {isIdle && (
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-aurora-cyan animate-pulse" />
                  <span className="text-aurora-cyan/60">AUTO-CYCLING</span>
                </div>
              )}
              <span>weapons: {skillCategories.length}</span>
            </div>
          </div>

          {/* Three-column layout */}
          <div className="flex-1 p-4 min-h-0 overflow-hidden">
            <div className="h-full grid grid-cols-12 gap-4 overflow-hidden">
              {/* Left: Weapon Carousel in sub-window */}
              <div className="col-span-3 min-h-0 overflow-hidden">
                <div className="h-full bg-black/40 border border-aurora-cyan/20 rounded overflow-hidden flex flex-col">
                  <div className="px-3 py-1.5 border-b border-aurora-cyan/20 bg-black/40 flex-shrink-0">
                    <span className="text-[10px] font-mono text-aurora-cyan/70">INVENTORY.dat</span>
                  </div>
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <WeaponCarousel
                      categories={skillCategories}
                      selectedIndex={selectedIndex}
                      onSelect={handleSelect}
                    />
                  </div>
                </div>
              </div>

              {/* Center: Weapon Display in sub-window */}
              <div className="col-span-5 min-h-0 overflow-hidden">
                <div className="h-full bg-black/40 border border-aurora-cyan/20 rounded overflow-hidden flex flex-col">
                  <div className="px-3 py-1.5 border-b border-aurora-cyan/20 bg-black/40 flex-shrink-0">
                    <span className="text-[10px] font-mono text-aurora-cyan/70">WEAPON_VIEWER.exe</span>
                  </div>
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <WeaponDisplay category={selectedCategory} />
                  </div>
                </div>
              </div>

              {/* Right: Stats + Skills in sub-window */}
              <div className="col-span-4 min-h-0 overflow-hidden">
                <div className="h-full bg-black/40 border border-aurora-cyan/20 rounded overflow-hidden flex flex-col">
                  <div className="px-3 py-1.5 border-b border-aurora-cyan/20 bg-black/40 flex-shrink-0">
                    <span className="text-[10px] font-mono text-aurora-cyan/70">STATS.json</span>
                  </div>
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <WeaponStats category={selectedCategory} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terminal footer */}
          <div className="border-t border-aurora-cyan/20 px-4 py-2 bg-black/40 flex-shrink-0">
            <div className="flex items-center justify-between text-[10px] font-mono text-text-muted/40">
              <span>select weapon // view stats</span>
              <span>loadout {selectedIndex + 1} of {skillCategories.length}</span>
            </div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4 text-[10px] font-mono text-text-muted/60 hidden lg:block z-20">
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-1.5 h-1.5 bg-hud-green rounded-full" />
            <span>SECTOR: 003</span>
          </div>
          <div className="text-aurora-cyan/50">NODE: ARMORY</div>
        </div>

        <div className="absolute top-4 right-4 text-[10px] font-mono text-right text-text-muted/60 hidden lg:block z-20">
          <div className="text-aurora-cyan/50">STATUS: ARMED</div>
          <div>CLEARANCE: GRANTED</div>
        </div>

        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-text-muted/40 hidden lg:block z-20">
          <div>LOADOUT: ACTIVE</div>
          <div>SLOTS: EQUIPPED</div>
        </div>

        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-text-muted/40 hidden lg:block z-20">
          <div className="text-right">ACCESS: FULL</div>
          <div className="text-right">MODE: BROWSE</div>
        </div>
      </div>
    </div>
  );
}
