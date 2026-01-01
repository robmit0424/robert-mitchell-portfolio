"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";

export function MobileExperience() {
  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-3 top-2 bottom-2 w-px bg-aurora-cyan/30" />

        {/* Experience cards */}
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-3 w-6 h-6 flex items-center justify-center">
                <motion.div
                  className="w-2.5 h-2.5 rounded-full bg-aurora-cyan"
                  animate={index === 0 ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Card */}
              <div className="bg-black/40 border border-aurora-cyan/20 rounded-lg p-4">
                {/* Header */}
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-mono text-sm font-bold text-aurora-cyan">
                      {exp.company}
                    </h3>
                    <span className="text-[10px] font-mono text-hud-amber whitespace-nowrap">
                      {exp.period.split(' – ')[0]}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-text-muted mt-0.5">
                    {exp.role}
                  </p>
                </div>

                {/* Description - first 2 bullets only */}
                <ul className="space-y-1.5 mb-3">
                  {exp.description.slice(0, 2).map((item, i) => (
                    <li key={i} className="text-[11px] text-text-secondary leading-relaxed flex gap-2">
                      <span className="text-nebula-purple mt-0.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[9px] font-mono bg-aurora-cyan/10 border border-aurora-cyan/30 rounded text-aurora-cyan/80"
                    >
                      {tech}
                    </span>
                  ))}
                  {exp.technologies.length > 4 && (
                    <span className="px-2 py-0.5 text-[9px] font-mono text-text-muted">
                      +{exp.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
