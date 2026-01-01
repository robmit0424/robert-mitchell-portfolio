"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HUDCorners } from "@/components/ui/HUDCorners";
import { SkillSlot } from "./SkillSlot";
import type { SkillCategory } from "@/data/skills";

interface WeaponStatsProps {
  category: SkillCategory;
}

interface StatBarProps {
  label: string;
  value: number;
  color: string;
  delay: number;
}

function StatBar({ label, value, color, delay }: StatBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">
          {label}
        </span>
        <span
          className="text-[10px] font-mono font-bold"
          style={{ color }}
        >
          {value}%
        </span>
      </div>
      <div className="h-2 bg-black/60 rounded-sm overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: 0.8,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="h-full rounded-sm"
          style={{
            background: `linear-gradient(90deg, ${color}80 0%, ${color} 100%)`,
            boxShadow: `0 0 10px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

export function WeaponStats({ category }: WeaponStatsProps) {
  return (
    <div className="relative h-full">
      <div className="relative bg-black/40 backdrop-blur-xl border border-aurora-cyan/20 rounded-lg p-4 h-full flex flex-col">
        <HUDCorners size="sm" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-hud-green animate-pulse" />
            <span className="text-xs font-mono text-aurora-cyan uppercase tracking-wider">
              Loadout
            </span>
          </div>
          <span
            className="text-xs font-mono font-bold"
            style={{ color: category.color }}
          >
            {category.skills.length} EQUIPPED
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Stats bars */}
            <div className="space-y-2 mb-3">
              <StatBar
                label="Versatility"
                value={category.stats.versatility}
                color={category.color}
                delay={0.1}
              />
              <StatBar
                label="Complexity"
                value={category.stats.complexity}
                color={category.color}
                delay={0.2}
              />
              <StatBar
                label="Power"
                value={category.stats.power}
                color={category.color}
                delay={0.3}
              />
            </div>

            {/* Tagline */}
            <div className="text-center py-2 border-t border-b border-white/5">
              <p
                className="text-xs font-mono italic"
                style={{ color: category.color }}
              >
                &ldquo;{category.tagline}&rdquo;
              </p>
            </div>

            {/* Skills grid - scrollable, with padding for hover effects */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden mt-3 min-h-0 px-1 py-2">
              <div className="grid grid-cols-3 gap-2">
                {category.skills.map((skill, index) => (
                  <SkillSlot
                    key={skill.id}
                    skill={skill}
                    categoryColor={category.color}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Status bar */}
            <div className="mt-3 pt-2 border-t border-white/5">
              <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-text-muted/50">
                <span>LOADOUT: ACTIVE</span>
                <span className="text-aurora-cyan/30">|</span>
                <span>READY: 100%</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
