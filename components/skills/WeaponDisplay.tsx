"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { HUDCorners } from "@/components/ui/HUDCorners";
import type { SkillCategory } from "@/data/skills";

// Weapon image mapping
const weaponImages: Record<string, string> = {
  frontend: "/weapons/frontend.png",
  state: "/weapons/state.png",
  backend: "/weapons/backend.png",
  cloud: "/weapons/cloud.png",
  build: "/weapons/build.png",
  "auth-pay": "/weapons/auth.png",
  ai: "/weapons/ai.png",
  testing: "/weapons/testing.png",
  mobile: "/weapons/mobile.png",
  analytics: "/weapons/analytics.png",
  design: "/weapons/design.png",
  cms: "/weapons/cms.png",
};

interface WeaponDisplayProps {
  category: SkillCategory;
}

export function WeaponDisplay({ category }: WeaponDisplayProps) {
  const [imageError, setImageError] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const weaponImage = weaponImages[category.id];

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Parallax transforms
  const rotateX = useTransform(mouseY, [0, 1], [8, -8]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);
  const translateX = useTransform(mouseX, [0, 1], [-15, 15]);
  const translateY = useTransform(mouseY, [0, 1], [-15, 15]);

  // Smooth spring physics
  const springConfig = { stiffness: 100, damping: 20 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothTranslateX = useSpring(translateX, springConfig);
  const smoothTranslateY = useSpring(translateY, springConfig);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Typewriter effect for weapon name
  useEffect(() => {
    setDisplayName("");
    setImageError(false);
    const fullName = category.name.toUpperCase();
    let currentIndex = 0;

    const timer = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayName(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [category.name]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center h-full"
      style={{ perspective: "1000px" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-20 blur-3xl rounded-full"
        style={{
          background: `radial-gradient(circle, ${category.color} 0%, transparent 70%)`,
        }}
      />

      {/* Hologram scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${category.color}80, transparent)`,
            boxShadow: `0 0 20px ${category.color}`,
          }}
          animate={{
            top: ["-10%", "110%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Weapon frame */}
      <div className="relative">
        <div className="relative bg-black/30 backdrop-blur-sm border border-aurora-cyan/20 rounded-xl p-8">
          <HUDCorners size="lg" />

          {/* Corner tech labels */}
          <div className="absolute -top-6 left-0 text-[10px] font-mono text-text-muted/50">
            <span className="text-aurora-cyan/50">ID:</span> {category.id.toUpperCase()}
          </div>
          <div className="absolute -top-6 right-0 text-[10px] font-mono text-text-muted/50">
            <span className="text-hud-green">●</span> ARMED
          </div>

          {/* Weapon image with 3D effect */}
          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.5,
              }}
              style={{
                rotateX: smoothRotateX,
                rotateY: smoothRotateY,
                x: smoothTranslateX,
                y: smoothTranslateY,
                transformStyle: "preserve-3d",
              }}
              className="relative"
            >
              {/* Weapon glow effect */}
              <div
                className="absolute inset-[-20px] rounded-full opacity-60 blur-2xl animate-pulse"
                style={{ backgroundColor: category.color }}
              />

              {!imageError && weaponImage ? (
                <Image
                  src={weaponImage}
                  alt={category.name}
                  width={280}
                  height={280}
                  className="relative z-10 w-56 h-56 md:w-72 md:h-72 object-contain"
                  style={{
                    filter: `drop-shadow(0 0 30px ${category.color}80)`,
                  }}
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div
                  className="relative z-10 w-56 h-56 md:w-72 md:h-72 flex items-center justify-center"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    background: `linear-gradient(135deg, ${category.color}60 0%, ${category.color}20 100%)`,
                    boxShadow: `0 0 40px ${category.color}50`,
                  }}
                >
                  <span
                    className="text-6xl font-bold font-mono"
                    style={{ color: category.color }}
                  >
                    {category.name[0]}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Weapon name with typewriter effect */}
      <div className="mt-6 text-center">
        <motion.h3
          className="text-2xl md:text-3xl font-bold font-mono tracking-widest"
          style={{ color: category.color }}
        >
          {displayName}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="ml-1"
          >
            _
          </motion.span>
        </motion.h3>
        <p className="text-xs font-mono text-text-muted mt-1 uppercase tracking-wider">
          Arsenal Class
        </p>
      </div>
    </div>
  );
}
