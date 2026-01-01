"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personal } from "@/data/personal";

// HUD Corner brackets component (same as HeroSection)
function HUDCorners({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Top-left */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-aurora-cyan opacity-60" />
      {/* Top-right */}
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-aurora-cyan opacity-60" />
      {/* Bottom-left */}
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-aurora-cyan opacity-60" />
      {/* Bottom-right */}
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-aurora-cyan opacity-60" />
    </div>
  );
}

// Status indicator component
function StatusIndicator({ label, value, color = "green" }: { label: string; value: string; color?: "green" | "amber" | "cyan" }) {
  const colorClasses = {
    green: "bg-hud-green text-hud-green",
    amber: "bg-hud-amber text-hud-amber",
    cyan: "bg-aurora-cyan text-aurora-cyan",
  };

  return (
    <div className="flex items-center gap-2 text-xs font-mono">
      <div className={`w-2 h-2 rounded-full ${colorClasses[color].split(" ")[0]} pulse-glow`} />
      <span className="text-text-muted uppercase tracking-wider">{label}:</span>
      <span className={colorClasses[color].split(" ")[1]}>{value}</span>
    </div>
  );
}

// Holographic profile frame - Enhanced
function HologramFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Rotating outer ring */}
      <motion.div
        className="absolute -inset-8 rounded-full border border-aurora-cyan/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {/* Orbiting dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-aurora-cyan rounded-full shadow-[0_0_10px_rgba(34,211,209,0.8)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 bg-stellar-pink rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
      </motion.div>

      {/* Second rotating ring - opposite direction */}
      <motion.div
        className="absolute -inset-6 rounded-full border border-nebula-purple/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-nebula-purple rounded-full shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-cosmic-blue rounded-full shadow-[0_0_6px_rgba(37,99,235,0.8)]" />
      </motion.div>

      {/* Pulsing outer glow */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-aurora-cyan/30 via-nebula-purple/20 to-stellar-pink/30 rounded-xl blur-xl"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main frame container */}
      <div className="relative">
        {/* Animated border glow */}
        <div className="absolute -inset-[2px] rounded-xl overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-conic from-aurora-cyan via-nebula-purple via-stellar-pink via-cosmic-blue to-aurora-cyan"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{
              background: "conic-gradient(from 0deg, #22d3d1, #7c3aed, #ec4899, #2563eb, #22d3d1)",
            }}
          />
        </div>

        {/* Inner dark frame */}
        <div className="relative bg-black/90 backdrop-blur-sm rounded-xl overflow-hidden m-[2px]">
          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aurora-cyan to-transparent z-20"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Scanlines overlay */}
          <div className="absolute inset-0 scanlines pointer-events-none opacity-20 z-10" />

          {/* Corner tech elements */}
          <div className="absolute top-2 left-2 z-20">
            <div className="flex items-center gap-1">
              <motion.div
                className="w-1.5 h-1.5 bg-hud-green rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-[8px] font-mono text-hud-green/80">SCAN</span>
            </div>
          </div>

          <div className="absolute top-2 right-2 z-20">
            <span className="text-[8px] font-mono text-aurora-cyan/60">ID:RM-001</span>
          </div>

          <div className="absolute bottom-2 left-2 z-20">
            <div className="flex items-center gap-1">
              <div className="w-8 h-1 bg-black/50 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-aurora-cyan/80"
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-2 right-2 z-20">
            <span className="text-[8px] font-mono text-stellar-pink/60">VERIFIED</span>
          </div>

          {/* Hologram flicker effect */}
          <div className="hologram">
            {children}
          </div>

          {/* Enhanced HUD Corners */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top-left corner */}
            <div className="absolute top-0 left-0">
              <div className="w-8 h-8 border-l-2 border-t-2 border-aurora-cyan" />
              <div className="absolute top-1 left-1 w-4 h-4 border-l border-t border-aurora-cyan/40" />
            </div>
            {/* Top-right corner */}
            <div className="absolute top-0 right-0">
              <div className="w-8 h-8 border-r-2 border-t-2 border-aurora-cyan" />
              <div className="absolute top-1 right-1 w-4 h-4 border-r border-t border-aurora-cyan/40" />
            </div>
            {/* Bottom-left corner */}
            <div className="absolute bottom-0 left-0">
              <div className="w-8 h-8 border-l-2 border-b-2 border-aurora-cyan" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-l border-b border-aurora-cyan/40" />
            </div>
            {/* Bottom-right corner */}
            <div className="absolute bottom-0 right-0">
              <div className="w-8 h-8 border-r-2 border-b-2 border-aurora-cyan" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-r border-b border-aurora-cyan/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Side data readouts */}
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2 text-[9px] font-mono">
        <motion.div
          className="text-aurora-cyan/60"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0 }}
        >
          BIO: OK
        </motion.div>
        <motion.div
          className="text-hud-green/60"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        >
          AUTH: ✓
        </motion.div>
        <motion.div
          className="text-nebula-purple/60"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        >
          LVL: SR
        </motion.div>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-24 px-4 overflow-hidden"
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

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-block relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple/30 to-aurora-cyan/30 blur" />
            <div className="relative px-6 py-3 bg-black/60 backdrop-blur-sm border border-aurora-cyan/30">
              <HUDCorners />
              <h2 className="text-2xl md:text-3xl font-bold tracking-wider text-aurora-cyan font-mono">
                <span className="text-nebula-purple mr-2">&gt;</span>
                CREW_MANIFEST.exe
                <span className="animate-pulse ml-1">_</span>
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Main content grid - Text Left, Image Right */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            {/* Status bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-4 mb-6 px-4 py-3 bg-black/40 backdrop-blur-sm border border-aurora-cyan/20 rounded"
            >
              <StatusIndicator label="STATUS" value="ACTIVE" color="green" />
              <div className="w-px h-4 bg-aurora-cyan/30" />
              <StatusIndicator label="CLEARANCE" value="SENIOR" color="cyan" />
              <div className="w-px h-4 bg-aurora-cyan/30 hidden sm:block" />
              <StatusIndicator label="SECTOR" value="ENGINEERING" color="amber" />
            </motion.div>

            {/* Terminal-style text */}
            <div className="space-y-4 font-mono">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-text-secondary leading-relaxed"
              >
                <span className="text-nebula-purple mr-2">&gt;</span>
                {personal.summary}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-text-muted leading-relaxed"
              >
                <span className="text-nebula-purple mr-2">&gt;</span>
                I thrive in fast-paced environments where I can own features end-to-end,
                from architecture decisions to deployment. My focus is on building products
                that users love and that drive measurable business results.
              </motion.p>

              {/* Location data */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                viewport={{ once: true }}
                className="pt-4 text-sm"
              >
                <span className="text-stellar-pink">COORDINATES:</span>{" "}
                <span className="text-white/70">{personal.location}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Holographic Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 flex justify-center"
          >
            <HologramFrame className="animate-float">
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <Image
                  src="/SpaceRob.png"
                  alt="Robert Mitchell - Astronaut Avatar"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </HologramFrame>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex gap-4 justify-center flex-wrap mt-12"
        >
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-nebula-purple to-stellar-pink transition-transform group-hover:scale-105" />
            <div className="absolute inset-[1px] bg-black/80 group-hover:bg-black/60 transition-colors" />
            <span className="relative font-mono text-sm uppercase tracking-widest text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-cosmic-blue rounded-full pulse-glow" />
              View Profile
            </span>
            <HUDCorners />
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="group relative px-8 py-4 border border-aurora-cyan/50 hover:border-aurora-cyan transition-colors"
          >
            <span className="font-mono text-sm uppercase tracking-widest text-aurora-cyan flex items-center gap-2">
              <div className="w-2 h-2 bg-hud-green rounded-full pulse-glow" />
              Open Channel
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <HUDCorners />
          </a>
        </motion.div>
      </div>

      {/* Corner decorations - Desktop only */}
      <div className="absolute top-8 left-8 text-xs font-mono text-text-muted/50 hidden md:block">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-hud-green rounded-full" />
          <span>SECTOR: 002</span>
        </div>
        <div className="text-aurora-cyan/50">NODE: MANIFEST</div>
      </div>

      <div className="absolute top-8 right-8 text-xs font-mono text-right text-text-muted/50 hidden md:block">
        <div className="text-aurora-cyan/50">FILE: crew.json</div>
        <div>ACCESS: GRANTED</div>
      </div>

      <div className="absolute bottom-8 left-8 text-xs font-mono text-text-muted/30 hidden md:block">
        <div>LAT: 32.7765° N</div>
        <div>LON: 79.9311° W</div>
      </div>

      <div className="absolute bottom-8 right-8 text-xs font-mono text-text-muted/30 hidden md:block">
        <div className="text-right">SCAN: COMPLETE</div>
        <div className="text-right">INTEGRITY: 100%</div>
      </div>
    </section>
  );
}
