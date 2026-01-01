"use client";

import { motion } from "framer-motion";
import { featuredProjects, otherProjects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { BackgroundWaves } from "@/components/ui/background-waves";

function FeaturedProjectCard({ project, index }: { project: typeof featuredProjects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "group relative p-8 rounded-3xl bg-black border border-white/[0.1] hover:border-accent/50 transition-all duration-500 overflow-hidden",
        index === 0 && "md:col-span-2 lg:col-span-2"
      )}
    >
      {/* Gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <span className="text-sm font-mono text-accent">
            0{index + 1}
          </span>
          {project.metrics && (
            <span className="px-3 py-1 text-xs rounded-full bg-accent/10 text-accent border border-accent/20">
              {project.metrics}
            </span>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-neutral-100 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="text-neutral-400 mb-6 leading-relaxed">
          {project.longDescription || project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-sm rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:border-accent/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-500" />
    </motion.div>
  );
}

function ProjectListItem({ project, index }: { project: typeof otherProjects[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group p-6 rounded-2xl bg-black/50 border border-white/[0.05] hover:border-accent/30 hover:bg-black transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <span className="text-xs font-mono text-accent/50 mt-1">
          0{index + 1}
        </span>
        <div className="flex-1">
          <h4 className="text-lg font-semibold mb-2 text-neutral-200 group-hover:text-accent transition-colors">
            {project.title}
          </h4>
          <p className="text-sm text-neutral-500 mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500"
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

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative py-24 px-4 bg-neutral-950 overflow-hidden"
    >
      <BackgroundWaves />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
            Projects
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Products and features I&apos;ve built that users love
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-neutral-500 mb-6 text-center">
              Other Notable Work
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {otherProjects.map((project, index) => (
                <ProjectListItem key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
