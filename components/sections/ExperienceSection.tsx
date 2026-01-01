"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "@/data/experience";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { HUDCorners } from "@/components/ui/HUDCorners";

// Extract year from period string
function getYear(period: string): string {
  const match = period.match(/(\d{4})/);
  return match ? match[1] : "";
}

// Timeline node component - Simple clean style
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
      {/* Year above */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <span className={`font-mono text-[10px] transition-colors ${
          isSelected ? "text-aurora-cyan" : "text-text-muted/40"
        }`}>
          {year}
        </span>
      </div>

      {/* Simple node */}
      <div
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          isActive ? "bg-hud-green" : "bg-aurora-cyan"
        } ${isSelected ? "scale-125 shadow-[0_0_12px_rgba(34,211,209,0.6)]" : "opacity-60 group-hover:opacity-100"}`}
      />

      {/* Company label below */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className={`text-[9px] font-mono uppercase tracking-wider transition-colors ${
          isSelected ? "text-white" : "text-text-muted/30 group-hover:text-text-muted/50"
        }`}>
          {experience.company}
        </span>
      </div>
    </motion.button>
  );
}

// Mission briefing panel
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

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-aurora-cyan/50 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          {/* Status indicator */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${isActive ? "bg-hud-green" : "bg-aurora-cyan"} pulse-glow`} />
            <span className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? "text-hud-green" : "text-aurora-cyan"}`}>
              STATUS: {isActive ? "ACTIVE" : "COMPLETE"}
            </span>
          </div>

          {/* Company name */}
          <h3 className="text-xl md:text-2xl font-bold text-aurora-cyan font-mono tracking-wide">
            {experience.company.toUpperCase()}
          </h3>

          {/* Role and period */}
          <p className="text-base text-white font-medium mt-1">{experience.role}</p>
          <p className="text-xs font-mono text-text-muted mt-1">{experience.period}</p>
        </div>

        {/* Active/Classified badge */}
        <div className="px-3 py-1.5 border-2 border-hud-amber/60 bg-black/80 rounded">
          <span className="text-[10px] font-mono font-bold text-hud-amber tracking-wider">
            {isActive ? "ACTIVE" : "CLASSIFIED"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-aurora-cyan/60 via-aurora-cyan/30 to-transparent mb-4" />

      {/* Mission objectives - scrollable */}
      <div className="mb-4">
        <p className="text-[10px] font-mono text-stellar-pink uppercase tracking-wider mb-2">
          Mission Briefing:
        </p>
        <div className="max-h-32 overflow-y-auto space-y-2 pr-2 scrollbar-thin">
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

      {/* Tech deployed */}
      <div>
        <p className="text-[10px] font-mono text-aurora-cyan/60 uppercase tracking-wider mb-2">
          Tech Deployed:
        </p>
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

export function ExperienceSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedExperience = experiences[selectedIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <SectionWrapper
      id="experience"
      cornerData={{
        topLeft: { line1: "SECTOR: 004", line2: "NODE: HISTORY" },
        topRight: { line1: "DB: experience.json", line2: `RECORDS: ${experiences.length}` },
        bottomLeft: { line1: `MISSIONS: ${experiences.length}`, line2: "YEARS: 3+" },
        bottomRight: { line1: "CLEARANCE: GRANTED", line2: "ACCESS: FULL" },
      }}
    >
      {/* Centered terminal window with nav arrows */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        {/* Left arrow */}
        <motion.button
          onClick={() => setSelectedIndex((prev) => prev - 1)}
          disabled={selectedIndex === 0}
          whileHover={selectedIndex === 0 ? {} : { x: -4, scale: 1.05 }}
          whileTap={selectedIndex === 0 ? {} : { scale: 0.95 }}
          className={`hidden md:flex flex-col items-center gap-1 mr-6 ${selectedIndex === 0 ? "opacity-30 cursor-not-allowed pointer-events-none" : "group"}`}
        >
          <div className={`relative px-4 py-6 border bg-black/40 transition-all ${selectedIndex === 0 ? "border-text-muted/20" : "border-aurora-cyan/50 group-hover:border-aurora-cyan group-hover:bg-aurora-cyan/10"}`}>
            <HUDCorners />
            <motion.span
              className={`font-mono text-3xl ${selectedIndex === 0 ? "text-text-muted/30" : "text-aurora-cyan"}`}
              animate={selectedIndex === 0 ? {} : { x: [-2, 0, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &lt;
            </motion.span>
          </div>
          <span className={`font-mono text-[10px] uppercase tracking-wider transition-colors ${selectedIndex === 0 ? "text-text-muted/30" : "text-aurora-cyan/60 group-hover:text-aurora-cyan"}`}>Prev</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative w-full max-w-5xl bg-black/70 backdrop-blur-sm border border-aurora-cyan/30 rounded-lg overflow-hidden"
        >
          <HUDCorners />

          {/* Terminal header bar */}
          <div className="flex items-center justify-between border-b border-aurora-cyan/30 px-4 py-3 bg-black/40">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-hud-red/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-hud-amber/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-hud-green/80" />
              </div>
              <span className="font-mono text-sm text-aurora-cyan">
                <span className="text-nebula-purple">&gt;</span> MISSION_HISTORY.exe
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  _
                </motion.span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-text-muted/50">records: {experiences.length}</span>
          </div>

          {/* Terminal content */}
          <div className="p-6">
            {/* Horizontal Timeline */}
            <div className="relative py-8 px-4 mb-6">
              {/* Timeline line */}
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[1px] bg-aurora-cyan/30" />

              {/* Timeline nodes */}
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

            {/* Divider */}
            <div className="h-px bg-aurora-cyan/20 mb-4" />

            {/* Mission Briefing Panel */}
            <div className="min-h-[260px]">
              <AnimatePresence mode="wait">
                <MissionBriefing experience={selectedExperience} />
              </AnimatePresence>
            </div>
          </div>

          {/* Terminal footer */}
          <div className="border-t border-aurora-cyan/20 px-4 py-2 bg-black/40">
            <div className="flex items-center justify-between text-[10px] font-mono text-text-muted/40">
              <span>click to select // ← → keys</span>
              <span>record {selectedIndex + 1} of {experiences.length}</span>
            </div>
          </div>
        </motion.div>

        {/* Right arrow */}
        <motion.button
          onClick={() => setSelectedIndex((prev) => prev + 1)}
          disabled={selectedIndex === experiences.length - 1}
          whileHover={selectedIndex === experiences.length - 1 ? {} : { x: 4, scale: 1.05 }}
          whileTap={selectedIndex === experiences.length - 1 ? {} : { scale: 0.95 }}
          className={`hidden md:flex flex-col items-center gap-1 ml-6 ${selectedIndex === experiences.length - 1 ? "opacity-30 cursor-not-allowed pointer-events-none" : "group"}`}
        >
          <div className={`relative px-4 py-6 border bg-black/40 transition-all ${selectedIndex === experiences.length - 1 ? "border-text-muted/20" : "border-aurora-cyan/50 group-hover:border-aurora-cyan group-hover:bg-aurora-cyan/10"}`}>
            <HUDCorners />
            <motion.span
              className={`font-mono text-3xl ${selectedIndex === experiences.length - 1 ? "text-text-muted/30" : "text-aurora-cyan"}`}
              animate={selectedIndex === experiences.length - 1 ? {} : { x: [2, 0, 2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &gt;
            </motion.span>
          </div>
          <span className={`font-mono text-[10px] uppercase tracking-wider transition-colors ${selectedIndex === experiences.length - 1 ? "text-text-muted/30" : "text-aurora-cyan/60 group-hover:text-aurora-cyan"}`}>Next</span>
        </motion.button>
      </div>
    </SectionWrapper>
  );
}
