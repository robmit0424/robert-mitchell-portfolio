"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

// HUD Corner brackets component
function HUDCorners({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-aurora-cyan opacity-60" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-aurora-cyan opacity-60" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-aurora-cyan opacity-60" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-aurora-cyan opacity-60" />
    </div>
  );
}

// Mission card component for experience
function MissionCard({
  experience,
  index,
}: {
  experience: typeof experiences[0];
  index: number;
}) {
  const isActive = experience.period.includes("Present");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
      viewport={{ once: true }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative bg-black/60 backdrop-blur-sm border border-aurora-cyan/30 rounded-lg p-6 md:p-8 overflow-hidden group-hover:border-aurora-cyan/50 transition-colors">
        <HUDCorners />

        {/* Scanline effect on hover */}
        <motion.div
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-aurora-cyan/50 to-transparent opacity-0 group-hover:opacity-100"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Classified stamp */}
        <motion.div
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10"
          initial={{ rotate: -12 }}
          whileHover={{ rotate: 0, y: -5, opacity: 0.3 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-3 py-1.5 border-2 border-hud-amber/60 bg-black/80 rounded">
            <span className="text-[10px] font-mono font-bold text-hud-amber tracking-wider">
              {isActive ? "ACTIVE" : "CLASSIFIED"}
            </span>
          </div>
        </motion.div>

        {/* Status indicator */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-2 h-2 rounded-full ${isActive ? "bg-hud-green" : "bg-aurora-cyan"} pulse-glow`} />
          <span className={`text-xs font-mono uppercase tracking-wider ${isActive ? "text-hud-green" : "text-aurora-cyan"}`}>
            STATUS: {isActive ? "ACTIVE" : "COMPLETE"}
          </span>
        </div>

        {/* Company name */}
        <h3 className="text-2xl md:text-3xl font-bold text-aurora-cyan font-mono tracking-wide mb-2">
          {experience.company.toUpperCase()}
        </h3>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-aurora-cyan/60 via-aurora-cyan/30 to-transparent mb-4" />

        {/* Role and period */}
        <div className="mb-6">
          <p className="text-lg md:text-xl text-white font-medium mb-1">
            {experience.role}
          </p>
          <p className="text-sm font-mono text-text-muted">
            {experience.period}
            {experience.location && ` | ${experience.location}`}
          </p>
        </div>

        {/* Mission briefing */}
        <div className="mb-6">
          <p className="text-xs font-mono text-stellar-pink uppercase tracking-wider mb-3">
            Mission Briefing:
          </p>
          <div className="space-y-2 font-mono text-sm">
            {experience.description.map((item, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
                className="text-text-secondary leading-relaxed flex items-start gap-2"
              >
                <span className="text-nebula-purple mt-0.5">&gt;</span>
                <span>{item}</span>
              </motion.p>
            ))}
          </div>
        </div>

        {/* Tech deployed */}
        <div>
          <p className="text-xs font-mono text-aurora-cyan/60 uppercase tracking-wider mb-3">
            Tech Deployed:
          </p>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-mono bg-black/40 border border-aurora-cyan/30 rounded text-aurora-cyan/80 hover:border-aurora-cyan/60 hover:text-aurora-cyan transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative py-24 px-4 overflow-hidden"
      style={{ backgroundColor: "#030014" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 209, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 209, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple/30 to-aurora-cyan/30 blur" />
            <div className="relative px-6 py-3 bg-black/60 backdrop-blur-sm border border-aurora-cyan/30">
              <HUDCorners />
              <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-aurora-cyan font-mono">
                <span className="text-nebula-purple mr-2">&gt;</span>
                MISSION_HISTORY.exe
                <span className="animate-pulse ml-1">_</span>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Mission Cards */}
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <MissionCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations - Desktop only */}
      <div className="absolute top-8 left-8 text-xs font-mono text-text-muted/50 hidden md:block">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-hud-green rounded-full" />
          <span>SECTOR: 004</span>
        </div>
        <div className="text-aurora-cyan/50">NODE: HISTORY</div>
      </div>

      <div className="absolute top-8 right-8 text-xs font-mono text-right text-text-muted/50 hidden md:block">
        <div className="text-aurora-cyan/50">DB: experience.json</div>
        <div>RECORDS: {experiences.length}</div>
      </div>

      <div className="absolute bottom-8 left-8 text-xs font-mono text-text-muted/30 hidden md:block">
        <div>MISSIONS: {experiences.length}</div>
        <div>YEARS: 3+</div>
      </div>

      <div className="absolute bottom-8 right-8 text-xs font-mono text-text-muted/30 hidden md:block">
        <div className="text-right">CLEARANCE: GRANTED</div>
        <div className="text-right">ACCESS: FULL</div>
      </div>
    </section>
  );
}
