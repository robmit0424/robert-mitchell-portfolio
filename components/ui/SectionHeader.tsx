"use client";

import { motion } from "framer-motion";
import { HUDCorners } from "./HUDCorners";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  className = "",
  centered = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex-shrink-0 ${centered ? "text-center" : ""} mb-6 ${className}`}
    >
      <div className={`inline-block relative ${centered ? "" : ""}`}>
        <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple/20 to-aurora-cyan/20 blur" />
        <div className="relative px-4 py-2 bg-black/60 backdrop-blur-sm border border-aurora-cyan/30">
          <HUDCorners />
          <h2 className="text-xl md:text-2xl font-bold tracking-wider text-aurora-cyan font-mono">
            <span className="text-nebula-purple mr-2">&gt;</span>
            {title}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-1"
            >
              _
            </motion.span>
          </h2>
        </div>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-2 text-[10px] font-mono text-text-muted tracking-wider uppercase"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
