"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personal } from "@/data/personal";
import { HUDCorners } from "@/components/ui/HUDCorners";

// Holographic profile frame with glitch effects
function HologramFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-aurora-cyan/30 via-nebula-purple/20 to-aurora-cyan/30 rounded-lg blur-xl"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative bg-black/80 rounded-lg overflow-hidden border-2 border-aurora-cyan/60">
        <HUDCorners />
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
          }}
        />
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-lighten"
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-red-500/10" />
        </motion.div>
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-lighten"
          animate={{ x: [2, -2, 2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-cyan-500/10" />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-aurora-cyan/10 z-10 pointer-events-none"
          animate={{ opacity: [0, 0.15, 0, 0.1, 0, 0.2, 0] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.15, 0.5, 0.55, 0.9, 1] }}
        />
        <motion.div
          className="absolute inset-x-0 h-[1px] bg-white/20 z-20 pointer-events-none blur-[0.5px]"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-aurora-cyan/5 mix-blend-overlay z-10 pointer-events-none" />
        <div className="relative">{children}</div>
      </div>
      <div className="absolute -bottom-3 -right-1 text-[8px] font-mono text-aurora-cyan/50">
        <span className="text-hud-green">●</span> ID:7734
      </div>
      <div className="absolute -top-3 -left-1 text-[8px] font-mono text-aurora-cyan/50">
        SCAN:OK
      </div>
    </div>
  );
}

export function AboutContent() {
  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* Status line */}
        <div className="text-aurora-cyan/70 text-xs font-mono mb-4">
          [STATUS: <span className="text-hud-green">ACTIVE</span> | CLEARANCE: <span className="text-aurora-cyan">SENIOR</span> | SECTOR: <span className="text-hud-amber">ENGINEERING</span>]
        </div>

        <div className="h-px bg-aurora-cyan/20 mb-6" />

        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Left: Terminal output */}
          <div className="md:col-span-3 font-mono text-sm space-y-4">
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p>
                <span className="text-nebula-purple mr-2">&gt;</span>
                <span className="text-aurora-cyan/60">cat</span> bio.txt
              </p>
              <p className="pl-4 text-text-muted">{personal.summary}</p>

              <p>
                <span className="text-nebula-purple mr-2">&gt;</span>
                <span className="text-aurora-cyan/60">echo</span> $PHILOSOPHY
              </p>
              <p className="pl-4 text-text-muted">
                I thrive in fast-paced environments where I can own features end-to-end, from architecture decisions to deployment.
              </p>
            </div>

            <div className="h-px bg-aurora-cyan/20" />

            <div>
              <span className="text-nebula-purple mr-2">&gt;</span>
              <span className="text-aurora-cyan/60">location</span>
              <span className="text-stellar-pink ml-2">--coordinates</span>
              <p className="pl-4 text-white/80 mt-1">{personal.location}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-4 py-2 bg-black/60 border border-aurora-cyan/40 hover:border-aurora-cyan hover:bg-aurora-cyan/10 transition-colors"
              >
                <HUDCorners />
                <span className="font-mono text-xs uppercase tracking-wider text-aurora-cyan flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-hud-green rounded-full" />
                  ./view_profile
                </span>
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="group relative px-5 py-2 bg-gradient-to-r from-stellar-pink/20 to-nebula-purple/20 border border-stellar-pink/50 hover:border-stellar-pink hover:from-stellar-pink/30 hover:to-nebula-purple/30 transition-all overflow-hidden rounded"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-stellar-pink/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative font-mono text-xs uppercase tracking-wider text-stellar-pink flex items-center gap-2">
                  <motion.span
                    className="w-1.5 h-1.5 bg-stellar-pink rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  ./transmit_msg
                </span>
              </a>
            </div>
          </div>

          {/* Right: Profile image */}
          <div className="md:col-span-2 flex justify-center">
            <HologramFrame>
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <Image
                  src="/SpaceRob.png"
                  alt="Robert Mitchell"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </HologramFrame>
          </div>
        </div>
      </div>
    </div>
  );
}
