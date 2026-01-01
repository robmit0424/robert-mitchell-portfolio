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
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: index * 0.05,
      }}
      whileHover={{
        y: -8,
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      className="group relative"
    >
      {/* Slot container */}
      <div
        className="relative flex flex-col items-center p-3 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
        style={{
          boxShadow: `0 0 0 rgba(${hexToRgb(categoryColor)}, 0)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 20px rgba(${hexToRgb(categoryColor)}, 0.4)`;
          e.currentTarget.style.borderColor = categoryColor;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 rgba(${hexToRgb(categoryColor)}, 0)`;
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }}
      >
        {/* Skill icon */}
        <div className="w-10 h-10 mb-2 relative">
          {skill.icon ? (
            <img
              src={skill.icon}
              alt={skill.name}
              className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-110 ${
                skill.invert ? "brightness-0 invert" : ""
              }`}
              style={{
                filter: `drop-shadow(0 0 4px ${categoryColor}60)`,
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center rounded-lg text-lg font-bold font-mono"
              style={{
                background: `linear-gradient(135deg, ${categoryColor}40 0%, ${categoryColor}20 100%)`,
                color: categoryColor,
              }}
            >
              {skill.name[0]}
            </div>
          )}
        </div>

        {/* Skill name */}
        <span className="text-[10px] font-mono text-text-muted text-center leading-tight max-w-[70px] group-hover:text-white transition-colors">
          {skill.name}
        </span>

        {/* Equipped indicator dot */}
        <div
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            backgroundColor: categoryColor,
            boxShadow: `0 0 6px ${categoryColor}`,
          }}
        />
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
