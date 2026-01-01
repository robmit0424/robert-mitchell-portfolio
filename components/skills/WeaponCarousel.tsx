"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HUDCorners } from "@/components/ui/HUDCorners";
import type { SkillCategory } from "@/data/skills";

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

interface WeaponCarouselProps {
  categories: SkillCategory[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

interface WeaponThumbnailProps {
  category: SkillCategory;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

function WeaponThumbnail({ category, isSelected, onClick, index }: WeaponThumbnailProps) {
  const weaponImage = weaponImages[category.id];

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={`relative w-full p-2 rounded-lg transition-all duration-300 group ${
        isSelected
          ? "bg-black/60 border-2"
          : "bg-black/20 border border-white/5 hover:border-white/20 hover:bg-black/40"
      }`}
      style={{
        borderColor: isSelected ? category.color : undefined,
        boxShadow: isSelected ? `0 0 20px ${category.color}40, inset 0 0 20px ${category.color}10` : undefined,
      }}
      whileHover={{ scale: isSelected ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          layoutId="weapon-selector"
          className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
          style={{ backgroundColor: category.color }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      <div className="flex items-center gap-3">
        {/* Weapon thumbnail */}
        <div
          className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${category.color}20 0%, transparent 100%)`,
          }}
        >
          {weaponImage ? (
            <Image
              src={weaponImage}
              alt={category.name}
              width={48}
              height={48}
              className="w-full h-full object-contain p-1"
              style={{
                filter: isSelected
                  ? `drop-shadow(0 0 8px ${category.color})`
                  : "brightness(0.7)",
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-lg font-bold font-mono"
              style={{ color: category.color }}
            >
              {category.name[0]}
            </div>
          )}
        </div>

        {/* Weapon info */}
        <div className="flex-1 text-left min-w-0">
          <p
            className={`text-xs font-mono font-bold uppercase tracking-wider truncate transition-colors ${
              isSelected ? "" : "text-text-muted group-hover:text-white"
            }`}
            style={{ color: isSelected ? category.color : undefined }}
          >
            {category.name}
          </p>
          <p className="text-[10px] font-mono text-text-muted/50 truncate">
            {category.skills.length} skills
          </p>
        </div>

        {/* Status indicator */}
        <div
          className={`w-2 h-2 rounded-full transition-all ${
            isSelected ? "animate-pulse" : "opacity-30"
          }`}
          style={{
            backgroundColor: isSelected ? category.color : "#666",
            boxShadow: isSelected ? `0 0 8px ${category.color}` : undefined,
          }}
        />
      </div>
    </motion.button>
  );
}

export function WeaponCarousel({ categories, selectedIndex, onSelect }: WeaponCarouselProps) {
  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        onSelect(selectedIndex === 0 ? categories.length - 1 : selectedIndex - 1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        onSelect(selectedIndex === categories.length - 1 ? 0 : selectedIndex + 1);
      }
    },
    [selectedIndex, categories.length, onSelect]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative h-full">
      <div className="relative bg-black/40 backdrop-blur-xl border border-aurora-cyan/20 rounded-lg p-3 h-full">
        <HUDCorners size="sm" />

        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse" />
          <span className="text-xs font-mono text-aurora-cyan uppercase tracking-wider">
            Weapon Select
          </span>
        </div>

        {/* Scrollable weapon list */}
        <div className="space-y-2 overflow-y-auto max-h-[calc(100%-60px)] pr-1 scrollbar-thin scrollbar-thumb-aurora-cyan/20 scrollbar-track-transparent">
          {categories.map((category, index) => (
            <WeaponThumbnail
              key={category.id}
              category={category}
              isSelected={index === selectedIndex}
              onClick={() => onSelect(index)}
              index={index}
            />
          ))}
        </div>

        {/* Footer with nav hints */}
        <div className="absolute bottom-3 left-3 right-3 pt-2 border-t border-white/5">
          <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-text-muted/40">
            <span>↑↓ Navigate</span>
            <span className="text-aurora-cyan/30">|</span>
            <span>Click Select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
