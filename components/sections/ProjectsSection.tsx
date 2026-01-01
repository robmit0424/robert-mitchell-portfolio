"use client";

import { motion } from "framer-motion";
import { featuredProjects, otherProjects } from "@/data/projects";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HUDCorners } from "@/components/ui/HUDCorners";

function ProjectCard({
  project,
  index,
  isFeatured = false,
}: {
  project: typeof featuredProjects[0];
  index: number;
  isFeatured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-black/60 backdrop-blur-sm border border-aurora-cyan/30 rounded-lg p-5 overflow-hidden hover:border-aurora-cyan/60 transition-colors"
    >
      <HUDCorners />

      {/* Scanline effect on hover */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-aurora-cyan/50 to-transparent opacity-0 group-hover:opacity-100"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-hud-green pulse-glow" />
          <span className="text-[10px] font-mono text-aurora-cyan uppercase tracking-wider">
            MISSION_{String(index + 1).padStart(3, "0")}
          </span>
        </div>
        {project.metrics && (
          <span className="text-[10px] font-mono px-2 py-1 border border-stellar-pink/50 text-stellar-pink">
            {project.metrics}
          </span>
        )}
      </div>

      {/* Project title */}
      <h3 className="text-lg font-mono font-bold text-aurora-cyan mb-2 group-hover:text-white transition-colors">
        {project.title.toUpperCase()}
      </h3>

      {/* Description */}
      <p className="text-xs font-mono text-text-secondary mb-4 leading-relaxed line-clamp-3">
        {isFeatured ? project.longDescription || project.description : project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.slice(0, 4).map((tech, i) => (
          <span
            key={i}
            className="px-2 py-0.5 text-[10px] font-mono bg-black/40 border border-aurora-cyan/20 rounded text-aurora-cyan/70"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-2 py-0.5 text-[10px] font-mono text-text-muted/50">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-2 right-2">
        <span className="text-[8px] font-mono text-hud-green/60">DEPLOYED</span>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const allProjects = [...featuredProjects, ...otherProjects];

  return (
    <SectionWrapper
      id="projects"
      cornerData={{
        topLeft: { line1: "SECTOR: 005", line2: "NODE: ARCHIVES" },
        topRight: { line1: `ENTRIES: ${allProjects.length}`, line2: "TYPE: FEATURED" },
        bottomLeft: { line1: "STATUS: DEPLOYED", line2: "UPTIME: 99.9%" },
        bottomRight: { line1: "CLEARANCE: PUBLIC", line2: "ACCESS: GRANTED" },
      }}
    >
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
        <SectionHeader
          title="MISSION_ARCHIVES.exe"
          subtitle="DEPLOYED SYSTEMS // ACTIVE PROJECTS"
        />

        {/* Projects grid - scrollable if needed */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-2">
          {/* Featured projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isFeatured={true}
              />
            ))}
          </div>

          {/* Other projects */}
          {otherProjects.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-aurora-cyan/30 to-transparent" />
                <span className="text-[10px] font-mono text-text-muted/50 uppercase tracking-wider">
                  Additional Missions
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-aurora-cyan/30 to-transparent" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {otherProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={featuredProjects.length + index}
                    isFeatured={false}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex-shrink-0 text-center py-3 border-t border-aurora-cyan/10 mt-4"
        >
          <span className="text-[10px] font-mono text-text-muted/40">
            ALL SYSTEMS OPERATIONAL // {allProjects.length} PROJECTS INDEXED
          </span>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
