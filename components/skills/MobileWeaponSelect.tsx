"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HUDCorners } from "@/components/ui/HUDCorners";
import { skillCategories, type Skill } from "@/data/skills";

// Weapon image mapping
const weaponImages: Record<string, string> = {
  frontend: "/weapons/frontend.png",
  state: "/weapons/state.png",
  backend: "/weapons/backend.png",
  cloud: "/weapons/cloud.png",
  build: "/weapons/build.png",
  "auth-pay": "/weapons/auth.png",
  ai: "/weapons/ai.png",
  testing: "/weapons/testing.png",
  mobile: "/weapons/mobile.png",
  analytics: "/weapons/analytics.png",
  design: "/weapons/design.png",
  cms: "/weapons/cms.png",
};

function MobileSkillItem({ skill, categoryColor }: { skill: Skill; categoryColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div
        className="w-10 h-10 p-1.5 rounded-lg bg-black/50 border border-white/10"
        style={{
          boxShadow: `0 0 8px ${categoryColor}20`,
        }}
      >
        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className={`w-full h-full object-contain ${
              skill.invert ? "brightness-0 invert" : ""
            }`}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-xs font-bold font-mono"
            style={{ color: categoryColor }}
          >
            {skill.name[0]}
          </div>
        )}
      </div>
      <span className="text-[8px] font-mono text-text-muted mt-1 text-center leading-tight max-w-[50px]">
        {skill.name}
      </span>
    </motion.div>
  );
}

export function MobileWeaponSelect() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedCategory = skillCategories[selectedIndex];
  const weaponImage = weaponImages[selectedCategory.id];

  const scrollToWeapon = (index: number) => {
    setSelectedIndex(index);
    if (scrollRef.current) {
      const itemWidth = 72; // 64px + 8px gap
      scrollRef.current.scrollTo({
        left: index * itemWidth - (scrollRef.current.offsetWidth / 2 - itemWidth / 2),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative px-4 py-8">
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

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple/30 to-aurora-cyan/30 blur" />
            <div className="relative px-4 py-2 bg-black/60 backdrop-blur-sm border border-aurora-cyan/30">
              <HUDCorners size="sm" />
              <h2 className="text-lg font-bold tracking-wider text-aurora-cyan font-mono">
                <span className="text-nebula-purple mr-2">&gt;</span>
                ARMORY.exe
              </h2>
            </div>
          </div>
        </div>

        {/* Horizontal weapon selector */}
        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {skillCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => scrollToWeapon(index)}
              className={`flex-shrink-0 snap-center p-2 rounded-lg transition-all duration-300 ${
                index === selectedIndex
                  ? "bg-black/60 border-2"
                  : "bg-black/30 border border-white/10"
              }`}
              style={{
                borderColor: index === selectedIndex ? category.color : undefined,
                boxShadow: index === selectedIndex ? `0 0 15px ${category.color}40` : undefined,
              }}
            >
              <div className="w-14 h-14 relative">
                {weaponImages[category.id] ? (
                  <Image
                    src={weaponImages[category.id]}
                    alt={category.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-contain"
                    style={{
                      filter: index === selectedIndex
                        ? `drop-shadow(0 0 6px ${category.color})`
                        : "brightness(0.6)",
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-xl font-bold font-mono"
                    style={{ color: category.color }}
                  >
                    {category.name[0]}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Selected weapon preview */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative bg-black/40 backdrop-blur-sm border border-aurora-cyan/20 rounded-lg p-4 mb-4"
          >
            <HUDCorners size="sm" />

            <div className="flex items-center gap-4">
              {/* Weapon image */}
              <div className="relative flex-shrink-0">
                <div
                  className="absolute inset-[-10px] rounded-full opacity-40 blur-xl"
                  style={{ backgroundColor: selectedCategory.color }}
                />
                {weaponImage ? (
                  <Image
                    src={weaponImage}
                    alt={selectedCategory.name}
                    width={100}
                    height={100}
                    className="relative z-10 w-24 h-24 object-contain"
                    style={{
                      filter: `drop-shadow(0 0 15px ${selectedCategory.color}80)`,
                    }}
                  />
                ) : (
                  <div
                    className="relative z-10 w-24 h-24 flex items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${selectedCategory.color}40 0%, ${selectedCategory.color}20 100%)`,
                    }}
                  >
                    <span
                      className="text-3xl font-bold font-mono"
                      style={{ color: selectedCategory.color }}
                    >
                      {selectedCategory.name[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Weapon info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-lg font-bold font-mono uppercase tracking-wider"
                  style={{ color: selectedCategory.color }}
                >
                  {selectedCategory.name}
                </h3>
                <p className="text-xs font-mono text-text-muted mt-1 italic">
                  &ldquo;{selectedCategory.tagline}&rdquo;
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: selectedCategory.color }}
                  />
                  <span className="text-[10px] font-mono text-text-muted">
                    {selectedCategory.skills.length} SKILLS
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative bg-black/30 backdrop-blur-sm border border-white/5 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-hud-green" />
              <span className="text-[10px] font-mono text-text-muted uppercase">
                Equipped Skills
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {selectedCategory.skills.map((skill) => (
                <MobileSkillItem
                  key={skill.id}
                  skill={skill}
                  categoryColor={selectedCategory.color}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
