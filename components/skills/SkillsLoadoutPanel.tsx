"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SkillSlot } from "./SkillSlot";
import { HUDCorners } from "@/components/ui/HUDCorners";
import type { SkillCategory } from "@/data/skills";

interface SkillsLoadoutPanelProps {
  category: SkillCategory;
}

export function SkillsLoadoutPanel({ category }: SkillsLoadoutPanelProps) {
  return (
    <div className="relative w-full">
      {/* Panel container */}
      <div className="relative bg-black/40 backdrop-blur-xl border border-aurora-cyan/20 rounded-lg p-4">
        <HUDCorners size="sm" />

        {/* Panel header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-hud-green animate-pulse" />
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
              Skills Equipped
            </span>
          </div>
          <span
            className="text-xs font-mono font-bold"
            style={{ color: category.color }}
          >
            {category.skills.length} LOADED
          </span>
        </div>

        {/* Skills grid with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {category.skills.map((skill, index) => (
              <SkillSlot
                key={skill.id}
                skill={skill}
                categoryColor={category.color}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom status bar */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center">
          <div className="flex items-center gap-4 text-[10px] font-mono text-text-muted/50">
            <span>LOADOUT: ACTIVE</span>
            <span className="text-aurora-cyan/50">|</span>
            <span>READY: 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
