"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experience";
import { HUDCorners } from "@/components/ui/HUDCorners";

function getYear(period: string): string {
  const match = period.match(/(\d{4})/);
  return match ? match[1] : "";
}

function TimelineNode({
  experience,
  isSelected,
  isActive,
  onClick,
  index,
}: {
  experience: typeof experiences[0];
  isSelected: boolean;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  const year = getYear(experience.period);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="relative flex flex-col items-center group cursor-pointer"
    >
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <span className={`font-mono text-[10px] transition-colors ${isSelected ? "text-aurora-cyan" : "text-text-muted/40"}`}>
          {year}
        </span>
      </div>
      <div
        className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? "bg-hud-green" : "bg-aurora-cyan"} ${isSelected ? "scale-125 shadow-[0_0_12px_rgba(34,211,209,0.6)]" : "opacity-60 group-hover:opacity-100"}`}
      />
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className={`text-[9px] font-mono uppercase tracking-wider transition-colors ${isSelected ? "text-white" : "text-text-muted/30 group-hover:text-text-muted/50"}`}>
          {experience.company}
        </span>
      </div>
    </motion.button>
  );
}

function MissionBriefing({ experience }: { experience: typeof experiences[0] }) {
  const isActive = experience.period.includes("Present");

  return (
    <motion.div
      key={experience.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="relative bg-black/60 backdrop-blur-sm border border-aurora-cyan/30 rounded-lg p-6 overflow-hidden"
    >
      <HUDCorners />
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? "bg-hud-green" : "bg-aurora-cyan"} pulse-glow`} />
            <span className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? "text-hud-green" : "text-aurora-cyan"}`}>
              STATUS: {isActive ? "ACTIVE" : "COMPLETE"}
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-aurora-cyan font-mono tracking-wide">
            {experience.company.toUpperCase()}
          </h3>
          <p className="text-base text-white font-medium mt-1">{experience.role}</p>
          <p className="text-xs font-mono text-text-muted mt-1">{experience.period}</p>
        </div>
        <div className="px-3 py-1.5 border-2 border-hud-amber/60 bg-black/80 rounded">
          <span className="text-[10px] font-mono font-bold text-hud-amber tracking-wider">
            {isActive ? "ACTIVE" : "CLASSIFIED"}
          </span>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-aurora-cyan/60 via-aurora-cyan/30 to-transparent mb-4" />
      <div className="mb-4">
        <p className="text-[10px] font-mono text-stellar-pink uppercase tracking-wider mb-2">Mission Briefing:</p>
        <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
          {experience.description.slice(0, 3).map((item, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-mono text-text-secondary leading-relaxed flex items-start gap-2"
            >
              <span className="text-nebula-purple mt-0.5">&gt;</span>
              <span>{item}</span>
            </motion.p>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-mono text-aurora-cyan/60 uppercase tracking-wider mb-2">Tech Deployed:</p>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.slice(0, 6).map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="px-2 py-1 text-xs font-mono bg-black/40 border border-aurora-cyan/30 rounded text-aurora-cyan/80"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceContent() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedExperience = experiences[selectedIndex];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSelectedIndex((prev) => (prev === 0 ? prev : prev - 1));
    } else if (e.key === "ArrowRight") {
      setSelectedIndex((prev) => (prev === experiences.length - 1 ? prev : prev + 1));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="h-full overflow-auto p-6">
      {/* Timeline */}
      <div className="relative py-8 px-4 mb-6">
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[1px] bg-aurora-cyan/30" />
        <div className="relative flex justify-between items-center">
          {experiences.map((exp, index) => (
            <TimelineNode
              key={exp.id}
              experience={exp}
              isSelected={index === selectedIndex}
              isActive={exp.period.includes("Present")}
              onClick={() => setSelectedIndex(index)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setSelectedIndex((prev) => Math.max(0, prev - 1))}
          disabled={selectedIndex === 0}
          className={`px-4 py-2 border rounded font-mono text-sm ${selectedIndex === 0 ? "border-text-muted/20 text-text-muted/30" : "border-aurora-cyan/50 text-aurora-cyan hover:bg-aurora-cyan/10"}`}
        >
          &lt; Prev
        </button>
        <span className="font-mono text-sm text-text-muted">
          {selectedIndex + 1} / {experiences.length}
        </span>
        <button
          onClick={() => setSelectedIndex((prev) => Math.min(experiences.length - 1, prev + 1))}
          disabled={selectedIndex === experiences.length - 1}
          className={`px-4 py-2 border rounded font-mono text-sm ${selectedIndex === experiences.length - 1 ? "border-text-muted/20 text-text-muted/30" : "border-aurora-cyan/50 text-aurora-cyan hover:bg-aurora-cyan/10"}`}
        >
          Next &gt;
        </button>
      </div>

      {/* Mission Briefing */}
      <AnimatePresence mode="wait">
        <MissionBriefing experience={selectedExperience} />
      </AnimatePresence>
    </div>
  );
}
