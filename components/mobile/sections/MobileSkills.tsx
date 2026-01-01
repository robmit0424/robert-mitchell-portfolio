"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/data/skills";

export function MobileSkills() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {skillCategories.map((category) => (
        <div key={category.id} className="border border-aurora-cyan/20 rounded-lg overflow-hidden">
          {/* Header - clickable */}
          <button
            onClick={() => setExpandedId(expandedId === category.id ? null : category.id)}
            className="w-full flex items-center justify-between p-3 bg-black/40 hover:bg-black/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Color indicator */}
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              {/* Name and count */}
              <div className="text-left">
                <span className="font-mono text-sm font-bold" style={{ color: category.color }}>
                  {category.name}
                </span>
                <span className="ml-2 text-[10px] font-mono text-text-muted">
                  ({category.skills.length})
                </span>
              </div>
            </div>
            {/* Expand icon */}
            <motion.svg
              className="w-4 h-4 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: expandedId === category.id ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </button>

          {/* Expanded content */}
          <AnimatePresence>
            {expandedId === category.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-3 pt-2 border-t border-aurora-cyan/10">
                  {/* Skills grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex flex-col items-center gap-1.5 p-2 bg-black/40 rounded border border-white/5"
                      >
                        {skill.icon ? (
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className={`w-6 h-6 object-contain ${skill.invert ? "brightness-0 invert" : ""}`}
                          />
                        ) : (
                          <div
                            className="w-6 h-6 flex items-center justify-center rounded text-[10px] font-bold font-mono"
                            style={{ backgroundColor: `${category.color}30`, color: category.color }}
                          >
                            {skill.name[0]}
                          </div>
                        )}
                        <span className="text-[8px] font-mono text-text-muted text-center leading-tight">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
