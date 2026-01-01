"use client";

import { useEffect, useCallback, useRef, useState } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(true);

  // Check scroll position
  const updateScrollIndicators = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollUp(el.scrollTop > 10);
    setCanScrollDown(el.scrollTop < el.scrollHeight - el.clientHeight - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollIndicators();
    el.addEventListener("scroll", updateScrollIndicators);
    return () => el.removeEventListener("scroll", updateScrollIndicators);
  }, [updateScrollIndicators]);

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
      <div className="relative bg-black/40 backdrop-blur-xl border border-aurora-cyan/20 rounded-lg p-3 h-full flex flex-col">
        <HUDCorners size="sm" />

        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse" />
          <span className="text-xs font-mono text-aurora-cyan uppercase tracking-wider">
            Weapon Select
          </span>
        </div>

        {/* Scroll container with indicators */}
        <div className="relative flex-1 min-h-0">
          {/* Top scroll indicator */}
          {canScrollUp && (
            <div className="absolute top-0 left-0 right-2 h-8 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none flex items-start justify-center pt-1">
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-aurora-cyan text-xs"
              >
                ▲
              </motion.span>
            </div>
          )}

          {/* Scrollable weapon list */}
          <div
            ref={scrollRef}
            className="space-y-2 overflow-y-auto h-full pr-1"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(34, 211, 209, 0.4) transparent",
            }}
          >
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

          {/* Bottom scroll indicator */}
          {canScrollDown && (
            <div className="absolute bottom-0 left-0 right-2 h-8 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none flex items-end justify-center pb-1">
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-aurora-cyan text-xs"
              >
                ▼
              </motion.span>
            </div>
          )}
        </div>

        {/* Footer with nav hints */}
        <div className="pt-2 mt-2 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-aurora-cyan/60">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              CLICK TO SELECT
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}
