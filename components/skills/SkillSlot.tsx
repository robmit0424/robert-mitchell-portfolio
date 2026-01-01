"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/skills";

interface SkillSlotProps {
  skill: Skill;
  categoryColor: string;
  index: number;
}

export function SkillSlot({ skill, categoryColor, index }: SkillSlotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: index * 0.03,
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="group"
    >
      {/* Slot container - fixed uniform size */}
      <div
        className="relative flex flex-col items-center justify-center w-full h-20 rounded-lg bg-black/80 border border-white/20 hover:border-aurora-cyan/50 transition-all duration-300 cursor-pointer"
        style={{
          boxShadow: `0 0 0 rgba(${hexToRgb(categoryColor)}, 0)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 15px rgba(${hexToRgb(categoryColor)}, 0.5)`;
          e.currentTarget.style.borderColor = categoryColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 rgba(${hexToRgb(categoryColor)}, 0)`;
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        }}
      >
        {/* Skill icon */}
        <div className="w-8 h-8 mb-1 relative flex-shrink-0">
          {skill.icon ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className={`w-full h-full object-contain transition-all duration-300 ${
                skill.invert ? "brightness-0 invert" : ""
              }`}
              style={{
                filter: `drop-shadow(0 0 4px ${categoryColor}60)`,
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center rounded text-sm font-bold font-mono"
              style={{
                background: `linear-gradient(135deg, ${categoryColor}40 0%, ${categoryColor}20 100%)`,
                color: categoryColor,
              }}
            >
              {skill.name[0]}
            </div>
          )}
        </div>

        {/* Skill name - truncate if too long */}
        <span className="text-[9px] font-mono text-text-muted text-center leading-tight px-1 truncate w-full group-hover:text-white transition-colors">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "255, 255, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
