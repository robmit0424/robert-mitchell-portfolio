"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { NebulaBackground } from "@/components/ui/nebula-background";
import { personal } from "@/data/personal";
import { useLoading } from "@/contexts/LoadingContext";
import { useContactModal } from "@/contexts/ContactModalContext";

// HUD Corner brackets component
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

// Typing effect component
function TypeWriter({
  text,
  delay = 0,
  onComplete
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
}) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    // Don't restart if already complete
    if (isComplete) return;

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.slice(0, i + 1));
          i++;
        } else {
          if (intervalId) clearInterval(intervalId);
          setIsComplete(true);
          setTimeout(() => {
            setShowCursor(false);
            onCompleteRef.current?.();
          }, 300);
        }
      }, 50);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay, isComplete]);

  return (
    <span>
      {displayText}
      {showCursor && <span className="animate-pulse">_</span>}
    </span>
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

// Hexagonal badge stat component
function HexBadge({
  value,
  label,
  isVisible,
  delay = 0,
}: {
  value: string;
  label: string;
  isVisible: boolean;
  delay?: number;
}) {
  const hexClipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

  return (
    <motion.div
      className="flex flex-col items-center gap-4 group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      transition={{ duration: 0.5, delay: 0.2 + delay * 0.15 }}
    >
      {/* Hexagon container */}
      <div className="relative w-24 h-28 md:w-28 md:h-32 group-hover:scale-110 transition-transform duration-300">
        {/* Outer glow */}
        <motion.div
          className="absolute inset-0 bg-aurora-cyan/30 blur-xl"
          style={{ clipPath: hexClipPath }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: delay * 0.2 }}
        />

        {/* Gradient border hexagon */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-aurora-cyan via-nebula-purple to-stellar-pink"
          style={{ clipPath: hexClipPath }}
        />

        {/* Inner dark hexagon */}
        <div
          className="absolute inset-[2px] bg-black/80 backdrop-blur-sm flex items-center justify-center"
          style={{ clipPath: hexClipPath }}
        >
          {/* Tech grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 211, 209, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 209, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: "8px 8px",
            }}
          />

          {/* Value */}
          <span className="relative text-3xl md:text-4xl font-bold text-aurora-cyan font-mono z-10">
            {value}
          </span>
        </div>

        {/* Corner accents */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-hud-green rounded-full pulse-glow" />

        {/* Animated scan line */}
        <motion.div
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-aurora-cyan to-transparent"
          style={{ clipPath: hexClipPath }}
          animate={{ top: ["20%", "80%", "20%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay * 0.3 }}
        />
      </div>

      {/* Label */}
      <motion.div
        className="text-xs text-text-muted uppercase tracking-widest text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
        transition={{ duration: 0.3, delay: 0.5 + delay * 0.15 }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const { isLoaded } = useLoading();
  const { openModal } = useContactModal();

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight;

      if (scrollY < sectionHeight) {
        const progress = scrollY / sectionHeight;
        const content = sectionRef.current.querySelector(".hero-content") as HTMLElement;
        if (content) {
          content.style.transform = `translateY(${scrollY * 0.3}px)`;
          content.style.opacity = `${1 - progress * 0.8}`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="group relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Nebula background */}
      <NebulaBackground />

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

      {/* Content */}
      <div className="hero-content relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center justify-center">
        {/* Mission designation - appears first */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-4 px-4 py-2 border border-aurora-cyan/30 bg-black/30 backdrop-blur-sm rounded">
            <StatusIndicator label="STATUS" value="ONLINE" color="green" />
            <div className="w-px h-4 bg-aurora-cyan/30" />
            <StatusIndicator label="MISSION" value="ACTIVE" color="cyan" />
          </div>
        </motion.div>

        {/* Main name with glitch effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-4 glitch-text">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-aurora-cyan/50">
              {personal.name.toUpperCase()}
            </span>
          </h1>
        </motion.div>

        {/* Mission title - types out after name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple via-stellar-pink to-cosmic-blue opacity-30 blur" />
            <div className="relative px-6 py-3 bg-black/50 backdrop-blur-sm border border-white/10">
              <HUDCorners />
              <p className="text-lg sm:text-xl md:text-2xl font-mono text-aurora-cyan tracking-widest">
                <span className="text-text-muted mr-2">&gt;</span>
                {isLoaded && (
                  <TypeWriter
                    text={personal.title.toUpperCase()}
                    delay={800}
                    onComplete={() => setTypingComplete(true)}
                  />
                )}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Everything below appears after typing completes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: typingComplete ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats dashboard - Hex Badges */}
          <div className="flex justify-center gap-6 md:gap-10 mb-12">
            {personal.highlights.map((highlight, index) => (
              <HexBadge
                key={highlight.label}
                value={highlight.value}
                label={highlight.label}
                isVisible={typingComplete}
                delay={index}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: typingComplete ? 1 : 0, y: typingComplete ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
          <button
            onClick={openModal}
            className="group relative px-8 py-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-nebula-purple to-stellar-pink transition-transform group-hover:scale-105" />
            <div className="absolute inset-[1px] bg-black/80 group-hover:bg-black/60 transition-colors" />
            <span className="relative font-mono text-sm uppercase tracking-widest text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-hud-green rounded-full pulse-glow" />
              Open Channel
            </span>
            <HUDCorners />
          </button>
          <a
            href="#experience"
            className="group relative px-8 py-4 border border-aurora-cyan/50 hover:border-aurora-cyan transition-colors"
          >
            <span className="font-mono text-sm uppercase tracking-widest text-aurora-cyan flex items-center gap-2">
              View Mission Log
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <HUDCorners />
          </a>
        </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - right side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: typingComplete ? 1 : 0, x: typingComplete ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3"
      >
        {/* Top bracket */}
        <div className="w-4 h-4 border-t-2 border-r-2 border-aurora-cyan/60" />

        {/* Vertical line with animation */}
        <div className="relative h-24 w-[2px] bg-aurora-cyan/20 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-aurora-cyan via-aurora-cyan to-transparent"
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Text - rotated */}
        <div className="relative">
          <span
            className="text-[10px] text-aurora-cyan uppercase tracking-[0.3em] font-mono whitespace-nowrap"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Scroll
          </span>
        </div>

        {/* Animated chevrons */}
        <div className="flex flex-col gap-1">
          <motion.svg
            className="w-4 h-4 text-aurora-cyan/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
          <motion.svg
            className="w-4 h-4 text-aurora-cyan/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            animate={{ y: [0, 4, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </div>

        {/* Bottom bracket */}
        <div className="w-4 h-4 border-b-2 border-r-2 border-aurora-cyan/60" />
      </motion.div>

      {/* HUD decorative elements */}
      {/* Top-left corner */}
      <div className="absolute top-8 left-8 text-xs font-mono text-text-muted/50 hidden md:block">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 bg-hud-green rounded-full" />
          <span>SYS.OK</span>
        </div>
        <div className="text-aurora-cyan/50">v2.0.25</div>
      </div>

      {/* Top-right corner */}
      <div className="absolute top-8 right-8 text-xs font-mono text-right text-text-muted/50 hidden md:block">
        <div className="text-aurora-cyan/50">PORTFOLIO.exe</div>
        <div>READY</div>
      </div>

      {/* Bottom corners */}
      <div className="absolute bottom-8 left-8 text-xs font-mono text-text-muted/30 hidden md:block">
        <div>LAT: 32.7765° N</div>
        <div>LON: 79.9311° W</div>
      </div>

      <div className="absolute bottom-8 right-8 text-xs font-mono text-text-muted/30 hidden md:block">
        <div className="text-right">FRAME: 60 FPS</div>
        <div className="text-right">RENDER: OPTIMAL</div>
      </div>
    </section>
  );
}
