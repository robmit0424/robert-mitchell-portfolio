"use client";

import { motion } from "framer-motion";
import { HUDCorners } from "@/components/ui/HUDCorners";

interface MobileSectionProps {
  title: string;
  children: React.ReactNode;
}

export function MobileSection({ title, children }: MobileSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="px-4 py-8"
    >
      <div className="relative bg-black/60 backdrop-blur-md border border-aurora-cyan/30 rounded-lg overflow-hidden">
        <HUDCorners />

        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-aurora-cyan/30 bg-black/40">
          <motion.span
            className="w-2 h-2 bg-hud-green rounded-full"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-mono text-xs text-aurora-cyan tracking-wider">
            {title}.exe
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
