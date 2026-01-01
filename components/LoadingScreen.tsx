"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/contexts/LoadingContext";

interface BootStep {
  text: string;
  delay: number;
  duration: number;
}

const bootSequence: BootStep[] = [
  { text: "INITIALIZING SYSTEM...", delay: 0, duration: 400 },
  { text: "LOADING CORE MODULES... [OK]", delay: 500, duration: 300 },
  { text: "ESTABLISHING NEURAL LINK... [OK]", delay: 900, duration: 300 },
  { text: "CALIBRATING DISPLAY MATRIX... [OK]", delay: 1300, duration: 300 },
  { text: "SYNCING PORTFOLIO DATA... [OK]", delay: 1700, duration: 300 },
  { text: "VERIFYING CREDENTIALS... [OK]", delay: 2100, duration: 300 },
  { text: "RENDERING INTERFACE...", delay: 2500, duration: 400 },
  { text: "SYSTEM READY", delay: 3000, duration: 500 },
];

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const { setIsLoaded } = useLoading();

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    // Show boot steps with timing
    bootSequence.forEach((step, index) => {
      setTimeout(() => {
        setVisibleSteps((prev) => [...prev, index]);
        setProgress(((index + 1) / bootSequence.length) * 100);
      }, step.delay);
    });

    // Hide loading screen after sequence
    const hideTimeout = setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
      document.body.style.overflow = "";
    }, 3800);

    return () => {
      clearTimeout(hideTimeout);
      document.body.style.overflow = "";
    };
  }, [setIsLoaded]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 scanlines pointer-events-none opacity-30" />

          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 211, 209, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 209, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Main content */}
          <div className="relative z-10 w-full max-w-lg px-8">
            {/* Logo/Title */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-2xl md:text-3xl font-bold tracking-[0.3em] text-aurora-cyan mb-2">
                MITCHELL.SYS
              </h1>
              <p className="text-xs text-text-muted font-mono tracking-widest">
                PORTFOLIO INTERFACE v2.0
              </p>
            </motion.div>

            {/* Boot sequence terminal */}
            <div className="bg-black/50 border border-aurora-cyan/30 rounded-lg p-6 mb-8 font-mono text-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-aurora-cyan/20">
                <div className="w-3 h-3 rounded-full bg-hud-red" />
                <div className="w-3 h-3 rounded-full bg-hud-amber" />
                <div className="w-3 h-3 rounded-full bg-hud-green" />
                <span className="ml-4 text-xs text-text-muted">boot_sequence.sh</span>
              </div>

              {/* Boot messages */}
              <div className="space-y-2 min-h-[200px]">
                {bootSequence.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: visibleSteps.includes(index) ? 1 : 0,
                      x: visibleSteps.includes(index) ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-nebula-purple">&gt;</span>
                    <span
                      className={
                        step.text.includes("[OK]")
                          ? "text-hud-green"
                          : step.text === "SYSTEM READY"
                          ? "text-aurora-cyan font-bold"
                          : "text-text-secondary"
                      }
                    >
                      {step.text}
                    </span>
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                {visibleSteps.length < bootSequence.length && (
                  <div className="flex items-center gap-2">
                    <span className="text-nebula-purple">&gt;</span>
                    <span className="w-2 h-4 bg-aurora-cyan animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative">
              <div className="flex justify-between text-xs font-mono text-text-muted mb-2">
                <span>LOADING</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-black/50 border border-aurora-cyan/30 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-nebula-purple via-stellar-pink to-aurora-cyan"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Fuel gauge style markers */}
              <div className="flex justify-between mt-1">
                {[0, 25, 50, 75, 100].map((marker) => (
                  <div
                    key={marker}
                    className={`text-[10px] font-mono ${
                      progress >= marker ? "text-aurora-cyan" : "text-text-muted/30"
                    }`}
                  >
                    {marker}
                  </div>
                ))}
              </div>
            </div>

            {/* Status indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex justify-center gap-8 mt-8 text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-hud-green pulse-glow" />
                <span className="text-text-muted">CPU: OK</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-hud-green pulse-glow" />
                <span className="text-text-muted">MEM: OK</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-hud-green pulse-glow" />
                <span className="text-text-muted">NET: OK</span>
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-xs font-mono text-text-muted/30">
            <div>SECTOR: 001</div>
            <div>NODE: PRIMARY</div>
          </div>

          <div className="absolute top-4 right-4 text-xs font-mono text-right text-text-muted/30">
            <div>BUILD: 2025.01</div>
            <div>ENV: PRODUCTION</div>
          </div>

          <div className="absolute bottom-4 left-4 text-xs font-mono text-text-muted/30">
            <div>PROTOCOL: HTTPS</div>
            <div>ENCRYPTION: AES-256</div>
          </div>

          <div className="absolute bottom-4 right-4 text-xs font-mono text-right text-text-muted/30">
            <div>LATENCY: 12ms</div>
            <div>UPTIME: 99.99%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
