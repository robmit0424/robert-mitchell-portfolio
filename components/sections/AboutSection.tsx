"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personal } from "@/data/personal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { HUDCorners } from "@/components/ui/HUDCorners";

// Holographic profile frame with glitch effects
function HologramFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* Pulsing glow - enhanced */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-aurora-cyan/30 via-nebula-purple/20 to-aurora-cyan/30 rounded-lg blur-xl"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Frame */}
      <div className="relative bg-black/80 rounded-lg overflow-hidden border-2 border-aurora-cyan/60">
        <HUDCorners />

        {/* CRT scan lines overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
          }}
        />

        {/* RGB shift / chromatic aberration - red channel */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-lighten"
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-red-500/10" />
        </motion.div>

        {/* RGB shift - cyan channel */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none mix-blend-lighten"
          animate={{ x: [2, -2, 2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full bg-cyan-500/10" />
        </motion.div>

        {/* Glitch flicker */}
        <motion.div
          className="absolute inset-0 bg-aurora-cyan/10 z-10 pointer-events-none"
          animate={{ opacity: [0, 0.15, 0, 0.1, 0, 0.2, 0] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.15, 0.5, 0.55, 0.9, 1] }}
        />

        {/* Subtle scan line */}
        <motion.div
          className="absolute inset-x-0 h-[1px] bg-white/20 z-20 pointer-events-none blur-[0.5px]"
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Hologram color tint */}
        <div className="absolute inset-0 bg-aurora-cyan/5 mix-blend-overlay z-10 pointer-events-none" />

        {/* Image container */}
        <div className="relative">
          {children}
        </div>
      </div>

      {/* Corner data readout */}
      <div className="absolute -bottom-3 -right-1 text-[8px] font-mono text-aurora-cyan/50">
        <span className="text-hud-green">●</span> ID:7734
      </div>
      <div className="absolute -top-3 -left-1 text-[8px] font-mono text-aurora-cyan/50">
        SCAN:OK
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <SectionWrapper
      id="about"
      cornerData={{
        topLeft: { line1: "SECTOR: 002", line2: "NODE: MANIFEST" },
        topRight: { line1: "FILE: crew.json", line2: "ACCESS: GRANTED" },
        bottomLeft: { line1: "LAT: 32.7765° N", line2: "LON: 79.9311° W" },
        bottomRight: { line1: "SCAN: COMPLETE", line2: "INTEGRITY: 100%" },
      }}
    >
      {/* Centered terminal window */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative w-full max-w-4xl bg-black/70 backdrop-blur-sm border border-aurora-cyan/30 rounded-lg overflow-hidden"
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
                <span className="text-nebula-purple">&gt;</span> CREW_MANIFEST.exe
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  _
                </motion.span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-text-muted/50">pid: 1337</span>
          </div>

          {/* Terminal content */}
          <div className="p-6 md:p-8">
            {/* 2-column layout */}
            <div className="grid md:grid-cols-5 gap-8 items-center">
              {/* Left: Terminal output (3 cols) */}
              <div className="md:col-span-3 font-mono text-sm space-y-4">
                {/* Status line */}
                <div className="text-aurora-cyan/70 text-xs">
                  [STATUS: <span className="text-hud-green">ACTIVE</span> | CLEARANCE: <span className="text-aurora-cyan">SENIOR</span> | SECTOR: <span className="text-hud-amber">ENGINEERING</span>]
                </div>

                {/* Divider */}
                <div className="h-px bg-aurora-cyan/20" />

                {/* Bio output */}
                <div className="space-y-3 text-text-secondary leading-relaxed">
                  <p>
                    <span className="text-nebula-purple mr-2">&gt;</span>
                    <span className="text-aurora-cyan/60">cat</span> bio.txt
                  </p>
                  <p className="pl-4 text-text-muted">
                    {personal.summary}
                  </p>

                  <p>
                    <span className="text-nebula-purple mr-2">&gt;</span>
                    <span className="text-aurora-cyan/60">echo</span> $PHILOSOPHY
                  </p>
                  <p className="pl-4 text-text-muted">
                    I thrive in fast-paced environments where I can own features end-to-end, from architecture decisions to deployment.
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-aurora-cyan/20" />

                {/* Location */}
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
                    {/* Animated transmission pulse */}
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

              {/* Right: Profile image (2 cols) */}
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

          {/* Terminal footer */}
          <div className="border-t border-aurora-cyan/20 px-4 py-2 bg-black/40">
            <div className="flex items-center justify-between text-[10px] font-mono text-text-muted/40">
              <span>crew_manifest.exe - process complete</span>
              <span>exit code: 0</span>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
