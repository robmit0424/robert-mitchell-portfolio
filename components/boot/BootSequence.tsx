"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/data/personal";

interface BootSequenceProps {
  onComplete: () => void;
}

const bootLines = [
  { text: "INITIALIZING SYSTEM...", delay: 0 },
  { text: "LOADING KERNEL MODULES...", delay: 400 },
  { text: "CREW_MANIFEST.exe .......... OK", delay: 800 },
  { text: "MISSION_HISTORY.exe ........ OK", delay: 1100 },
  { text: "ARMORY.exe ................. OK", delay: 1400 },
  { text: "COMMS_LINK.exe ............. OK", delay: 1700 },
  { text: "", delay: 2000 },
  { text: "ALL SYSTEMS NOMINAL", delay: 2200 },
  { text: "", delay: 2500 },
  { text: `WELCOME, OPERATOR`, delay: 2700 },
  { text: `${personal.name.toUpperCase()} // ${personal.title.toUpperCase()}`, delay: 3000 },
];

function BootLine({ text, delay }: { text: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setVisible(true);
      // Type out effect
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i <= text.length) {
          setDisplayText(text.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 20);
      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(showTimer);
  }, [text, delay]);

  if (!visible) return null;

  const isStatus = text.includes("OK");
  const isWelcome = text.includes("WELCOME") || text.includes(personal.name.toUpperCase());
  const isNominal = text.includes("NOMINAL");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`font-mono text-sm ${
        isStatus ? "text-hud-green" :
        isWelcome ? "text-aurora-cyan" :
        isNominal ? "text-hud-amber" :
        "text-text-muted"
      }`}
    >
      {isWelcome && <span className="text-nebula-purple mr-2">&gt;</span>}
      {displayText}
      {displayText.length < text.length && (
        <span className="animate-pulse">_</span>
      )}
    </motion.div>
  );
}

function LoadingBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, prev + Math.random() * 15);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const clampedProgress = Math.min(100, Math.max(0, progress));
  const filled = Math.floor((clampedProgress / 100) * 20);
  const empty = Math.max(0, 20 - filled);

  return (
    <div className="font-mono text-xs text-aurora-cyan/70 mt-2">
      [{"\u2588".repeat(filled)}{"\u2591".repeat(empty)}] {Math.floor(clampedProgress)}%
    </div>
  );
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after 1 second
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);

    // Auto-complete after boot sequence
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
        }}
      />

      {/* Boot content */}
      <div className="max-w-lg w-full px-8">
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-aurora-cyan/30">
          <div className="w-2 h-2 rounded-full bg-hud-green" />
          <span className="font-mono text-xs text-aurora-cyan/60">SYSTEM_BOOT.exe</span>
        </div>

        {/* Boot lines */}
        <div className="space-y-1 min-h-[280px]">
          {bootLines.map((line, index) => (
            <BootLine key={index} text={line.text} delay={line.delay} />
          ))}
        </div>

        {/* Loading bar */}
        <LoadingBar />

        {/* Skip button */}
        <AnimatePresence>
          {showSkip && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onComplete}
              className="mt-6 font-mono text-xs text-text-muted/40 hover:text-aurora-cyan transition-colors"
            >
              [PRESS ANY KEY OR CLICK TO SKIP]
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 text-[10px] font-mono text-text-muted/30">
        BIOS v2.0.25
      </div>
      <div className="absolute top-4 right-4 text-[10px] font-mono text-text-muted/30">
        MEM: 16384K OK
      </div>
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-text-muted/30">
        BOOT SEQUENCE
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-text-muted/30">
        {new Date().toISOString().split('T')[0]}
      </div>
    </motion.div>
  );
}
