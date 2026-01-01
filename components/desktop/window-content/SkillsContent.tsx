"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { skillCategories, type SkillCategory, type Skill } from "@/data/skills";
import { HUDCorners } from "@/components/ui/HUDCorners";

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

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "255, 255, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

// Weapon thumbnail for inventory
function WeaponThumbnail({ categoryId, color }: { categoryId: string; color: string }) {
  const [imageError, setImageError] = useState(false);
  const weaponImage = weaponImages[categoryId];

  if (!weaponImage || imageError) {
    return (
      <div
        className="w-10 h-10 flex items-center justify-center rounded"
        style={{
          background: `linear-gradient(135deg, ${color}40 0%, ${color}20 100%)`,
        }}
      >
        <span className="text-lg font-bold font-mono" style={{ color }}>
          ?
        </span>
      </div>
    );
  }

  return (
    <div className="w-10 h-10 relative">
      <Image
        src={weaponImage}
        alt=""
        fill
        className="object-contain"
        style={{ filter: `drop-shadow(0 0 4px ${color}60)` }}
        onError={() => setImageError(true)}
      />
    </div>
  );
}

// Compact Weapon Display for the main panel
function CompactWeaponDisplay({ category }: { category: SkillCategory }) {
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const weaponImage = weaponImages[category.id];

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Parallax transforms
  const rotateX = useTransform(mouseY, [0, 1], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);

  // Smooth spring physics
  const springConfig = { stiffness: 100, damping: 20 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Reset image error when category changes
  useEffect(() => {
    setImageError(false);
  }, [category.id]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center p-4"
      style={{ perspective: "1000px" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-30 blur-2xl rounded-full"
        style={{
          background: `radial-gradient(circle, ${category.color} 0%, transparent 70%)`,
        }}
      />

      {/* Weapon image with 3D effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={category.id}
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          style={{
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative"
        >
          {/* Weapon glow effect */}
          <div
            className="absolute inset-[-10px] rounded-full opacity-50 blur-xl animate-pulse"
            style={{ backgroundColor: category.color }}
          />

          {!imageError && weaponImage ? (
            <Image
              src={weaponImage}
              alt={category.name}
              width={140}
              height={140}
              className="relative z-10 w-28 h-28 md:w-36 md:h-36 object-contain"
              style={{ filter: `drop-shadow(0 0 20px ${category.color}80)` }}
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <div
              className="relative z-10 w-28 h-28 md:w-36 md:h-36 flex items-center justify-center"
              style={{
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: `linear-gradient(135deg, ${category.color}60 0%, ${category.color}20 100%)`,
                boxShadow: `0 0 30px ${category.color}50`,
              }}
            >
              <span className="text-4xl font-bold font-mono" style={{ color: category.color }}>
                {category.name[0]}
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Stat bar component
function StatBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">{label}</span>
        <span className="text-[10px] font-mono font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 bg-black/60 rounded-sm overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-sm"
          style={{
            background: `linear-gradient(90deg, ${color}80 0%, ${color} 100%)`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

// Skill slot component
function SkillSlot({ skill, categoryColor, index }: { skill: Skill; categoryColor: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.03 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group"
    >
      <div
        className="relative flex flex-col items-center justify-center w-full h-16 rounded-lg bg-black/80 border border-white/20 hover:border-aurora-cyan/50 transition-all duration-300 cursor-pointer"
        style={{ boxShadow: `0 0 0 rgba(${hexToRgb(categoryColor)}, 0)` }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 12px rgba(${hexToRgb(categoryColor)}, 0.5)`;
          e.currentTarget.style.borderColor = categoryColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 rgba(${hexToRgb(categoryColor)}, 0)`;
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        }}
      >
        <div className="w-6 h-6 mb-1 relative flex-shrink-0">
          {skill.icon ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className={`w-full h-full object-contain transition-all duration-300 ${skill.invert ? "brightness-0 invert" : ""}`}
              style={{ filter: `drop-shadow(0 0 3px ${categoryColor}60)` }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center rounded text-xs font-bold font-mono"
              style={{ background: `linear-gradient(135deg, ${categoryColor}40 0%, ${categoryColor}20 100%)`, color: categoryColor }}
            >
              {skill.name[0]}
            </div>
          )}
        </div>
        <span className="text-[8px] font-mono text-text-muted text-center leading-tight px-1 truncate w-full group-hover:text-white transition-colors">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

export function SkillsContent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCategory = skillCategories[selectedIndex];

  return (
    <div className="h-full overflow-hidden flex">
      {/* Left: Category selector with weapon thumbnails */}
      <div className="w-56 flex-shrink-0 bg-black/40 border-r border-aurora-cyan/20 flex flex-col">
        <div className="px-3 py-2 border-b border-aurora-cyan/20 bg-black/40">
          <span className="text-[10px] font-mono text-aurora-cyan/70">INVENTORY.dat</span>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {skillCategories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedIndex(index)}
              className={`w-full text-left px-2 py-2 rounded font-mono text-[10px] transition-all ${
                index === selectedIndex
                  ? "bg-aurora-cyan/20 border border-aurora-cyan/40"
                  : "text-text-muted hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Weapon thumbnail */}
                <WeaponThumbnail categoryId={category.id} color={category.color} />
                {/* Category info */}
                <div className="flex-1 min-w-0">
                  <div
                    className="uppercase tracking-wider truncate font-bold"
                    style={{ color: index === selectedIndex ? category.color : undefined }}
                  >
                    {category.name}
                  </div>
                  <div className="text-[8px] text-text-muted/60 truncate">
                    {category.skills.length} skills
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-aurora-cyan/20 bg-black/40">
          <span className="text-[9px] font-mono text-text-muted/50">
            {selectedIndex + 1} / {skillCategories.length}
          </span>
        </div>
      </div>

      {/* Right: Main content area */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-4"
          >
            {/* Combined Weapon Display + Stats */}
            <div className="bg-black/40 border border-aurora-cyan/20 rounded-lg overflow-hidden mb-4">
              <div className="px-3 py-1.5 border-b border-aurora-cyan/20 bg-black/40 flex justify-between items-center">
                <span className="text-[10px] font-mono text-aurora-cyan/70">WEAPON_STATS.exe</span>
                <div className="flex items-center gap-2">
                  <span className="text-hud-green text-[8px]">●</span>
                  <span className="text-[8px] font-mono text-text-muted/50">ARMED</span>
                </div>
              </div>
              <div className="flex">
                {/* Left: Weapon display */}
                <div className="w-1/3 border-r border-aurora-cyan/10 flex items-center justify-center">
                  <CompactWeaponDisplay category={selectedCategory} />
                </div>
                {/* Right: Stats */}
                <div className="flex-1 p-4 flex flex-col justify-center">
                  {/* Weapon name */}
                  <div className="mb-4">
                    <h3
                      className="text-xl font-bold font-mono tracking-widest uppercase"
                      style={{ color: selectedCategory.color }}
                    >
                      {selectedCategory.name}
                    </h3>
                    <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
                      Arsenal Class
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-4">
                    <StatBar label="Versatility" value={selectedCategory.stats.versatility} color={selectedCategory.color} delay={0.1} />
                    <StatBar label="Complexity" value={selectedCategory.stats.complexity} color={selectedCategory.color} delay={0.2} />
                    <StatBar label="Power" value={selectedCategory.stats.power} color={selectedCategory.color} delay={0.3} />
                  </div>

                  {/* Tagline */}
                  <div className="pt-3 border-t border-white/5">
                    <p className="text-xs font-mono italic" style={{ color: selectedCategory.color }}>
                      &ldquo;{selectedCategory.tagline}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="bg-black/40 border border-aurora-cyan/20 rounded-lg overflow-hidden">
              <div className="px-3 py-1.5 border-b border-aurora-cyan/20 bg-black/40 flex justify-between items-center">
                <span className="text-[10px] font-mono text-aurora-cyan/70">LOADOUT.dat</span>
                <span className="text-[10px] font-mono" style={{ color: selectedCategory.color }}>
                  {selectedCategory.skills.length} EQUIPPED
                </span>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-4 gap-2">
                  {selectedCategory.skills.map((skill, index) => (
                    <SkillSlot key={skill.id} skill={skill} categoryColor={selectedCategory.color} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
