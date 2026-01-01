"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HUDCorners } from "@/components/ui/HUDCorners";
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
      <div className="relative bg-black/40 backdrop-blur-xl border border-aurora-cyan/20 rounded-lg p-4 h-full">
        <HUDCorners size="sm" />

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-aurora-cyan animate-pulse" />
          <span className="text-xs font-mono text-aurora-cyan uppercase tracking-wider">
            Weapon Analysis
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Stats bars */}
            <div className="space-y-3">
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

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Tagline */}
            <div className="text-center py-2">
              <p
                className="text-sm font-mono italic"
                style={{ color: category.color }}
              >
                &ldquo;{category.tagline}&rdquo;
              </p>
            </div>

            {/* Skill count */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-[10px] font-mono text-text-muted">
                {category.skills.length} SKILLS IN ARSENAL
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
