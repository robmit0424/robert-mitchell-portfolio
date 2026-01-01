"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { WeaponCarousel } from "./WeaponCarousel";
import { WeaponDisplay } from "./WeaponDisplay";
import { WeaponStats } from "./WeaponStats";
import { SkillsLoadoutPanel } from "./SkillsLoadoutPanel";
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
    <div className="relative w-full h-full">
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
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple/30 to-aurora-cyan/30 blur" />
            <div className="relative px-6 py-3 bg-black/60 backdrop-blur-sm border border-aurora-cyan/30">
              <HUDCorners />
              <h2 className="text-xl md:text-2xl font-bold tracking-wider text-aurora-cyan font-mono">
                <span className="text-nebula-purple mr-2">&gt;</span>
                ARMORY.exe
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="ml-1"
                >
                  _
                </motion.span>
              </h2>
            </div>
          </div>
          <p className="mt-2 text-xs font-mono text-text-muted">
            WEAPONS LOADOUT SYSTEM
          </p>

          {/* Auto-cycle indicator */}
          {isIdle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 flex items-center justify-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-aurora-cyan animate-pulse" />
              <span className="text-[10px] font-mono text-aurora-cyan/60">AUTO-CYCLING</span>
            </motion.div>
          )}
        </motion.div>

        {/* Three-column layout */}
        <div className="flex-1 px-4 md:px-8 pb-4 flex flex-col gap-4 min-h-0">
          {/* Top section: Carousel | Display | Stats */}
          <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
            {/* Left: Weapon Carousel (20%) */}
            <div className="col-span-3 min-h-0">
              <WeaponCarousel
                categories={skillCategories}
                selectedIndex={selectedIndex}
                onSelect={handleSelect}
              />
            </div>

            {/* Center: Weapon Display (50%) */}
            <div className="col-span-6 min-h-0">
              <WeaponDisplay category={selectedCategory} />
            </div>

            {/* Right: Weapon Stats (30%) */}
            <div className="col-span-3 min-h-0">
              <WeaponStats category={selectedCategory} />
            </div>
          </div>

          {/* Bottom: Skills Loadout Panel */}
          <div className="flex-shrink-0">
            <SkillsLoadoutPanel category={selectedCategory} />
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-24 left-8 text-xs font-mono text-text-muted/50 hidden lg:block">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-hud-green rounded-full" />
            <span>SECTOR: 003</span>
          </div>
          <div className="text-aurora-cyan/50">NODE: ARMORY</div>
        </div>

        <div className="absolute top-24 right-8 text-xs font-mono text-right text-text-muted/50 hidden lg:block">
          <div className="text-aurora-cyan/50">WEAPONS: {skillCategories.length}</div>
          <div>STATUS: ARMED</div>
        </div>
      </div>
    </div>
  );
}
