"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personal } from "@/data/personal";
import { HUDCorners } from "@/components/ui/HUDCorners";
import { useContactModal } from "@/contexts/ContactModalContext";

export function MobileAbout() {
  const { openModal } = useContactModal();

  return (
    <div className="space-y-6">
      {/* Profile image */}
      <div className="flex justify-center">
        <div className="relative">
          {/* Glow */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-aurora-cyan/30 via-nebula-purple/20 to-aurora-cyan/30 rounded-lg blur-xl"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Image container */}
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-aurora-cyan/60">
            <HUDCorners />
            {/* Scan lines */}
            <div
              className="absolute inset-0 z-20 pointer-events-none opacity-20"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
              }}
            />
            {/* Moving scan line */}
            <motion.div
              className="absolute inset-x-0 h-[1px] bg-white/20 z-20 pointer-events-none"
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <Image
              src="/SpaceRob.png"
              alt="Robert Mitchell"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Status */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-mono text-aurora-cyan/50 whitespace-nowrap">
            <span className="text-hud-green">●</span> ID:7734
          </div>
        </div>
      </div>

      {/* Status line */}
      <div className="text-aurora-cyan/70 text-[10px] font-mono text-center">
        [STATUS: <span className="text-hud-green">ACTIVE</span> | CLEARANCE: <span className="text-aurora-cyan">SENIOR</span>]
      </div>

      {/* Bio */}
      <div className="font-mono text-sm space-y-3">
        <div>
          <p className="text-text-muted">
            <span className="text-nebula-purple mr-2">&gt;</span>
            <span className="text-aurora-cyan/60">cat</span> bio.txt
          </p>
          <p className="pl-4 mt-1 text-text-secondary text-xs leading-relaxed">
            {personal.summary}
          </p>
        </div>

        <div className="h-px bg-aurora-cyan/20" />

        <div>
          <p className="text-text-muted">
            <span className="text-nebula-purple mr-2">&gt;</span>
            <span className="text-aurora-cyan/60">location</span>
          </p>
          <p className="pl-4 mt-1 text-white/80 text-xs">{personal.location}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="space-y-2">
        <a
          href={personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full px-4 py-3 bg-black/60 border border-aurora-cyan/40 hover:border-aurora-cyan hover:bg-aurora-cyan/10 transition-colors rounded"
        >
          <HUDCorners />
          <span className="font-mono text-xs uppercase tracking-wider text-aurora-cyan flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-hud-green rounded-full" />
            ./view_linkedin_profile
          </span>
        </a>
        <button
          onClick={openModal}
          className="block relative w-full px-4 py-3 bg-gradient-to-r from-stellar-pink/20 to-nebula-purple/20 border border-stellar-pink/50 hover:border-stellar-pink transition-all rounded overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-stellar-pink/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <span className="relative font-mono text-xs uppercase tracking-wider text-stellar-pink flex items-center justify-center gap-2">
            <motion.span
              className="w-1.5 h-1.5 bg-stellar-pink rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            ./send_transmission
          </span>
        </button>
      </div>
    </div>
  );
}
