"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import { HUDCorners } from "@/components/ui/HUDCorners";

export function MobileHero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center w-full"
      >
        {/* Name */}
        <h1 className="text-4xl sm:text-5xl font-bold tracking-wider mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-aurora-cyan/50">
            {personal.name.toUpperCase()}
          </span>
        </h1>

        {/* Title badge */}
        <div className="relative inline-block mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple via-stellar-pink to-cosmic-blue opacity-30 blur" />
          <div className="relative px-4 py-2 bg-black/50 backdrop-blur-sm border border-white/10">
            <HUDCorners />
            <p className="text-sm sm:text-base font-mono text-aurora-cyan tracking-widest">
              <span className="text-text-muted mr-2">&gt;</span>
              {personal.title.toUpperCase()}
            </p>
          </div>
        </div>

        {/* Scroll instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <p className="text-xs font-mono text-text-muted/50 mb-4">
            Scroll to explore
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-aurora-cyan/50"
          >
            <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
