"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from "framer-motion";
import { skillCategories, type SkillCategory, type Skill } from "@/data/skills";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Weapon image mapping for each category
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

const CARD_GAP = 16; // Gap between cards

// HUD Corner brackets component
function HUDCorners({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-aurora-cyan opacity-60" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-aurora-cyan opacity-60" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-aurora-cyan opacity-60" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-aurora-cyan opacity-60" />
    </div>
  );
}

// Skill Item component - icon with name below
function SkillItem({ skill, categoryColor }: { skill: Skill; categoryColor: string }) {
  return (
    <div className="flex flex-col items-center group">
      <div
        className="w-10 h-10 p-1.5 rounded-md bg-black/50 border border-white/10 hover:border-white/30 transition-all duration-300"
        style={{
          boxShadow: `0 0 8px ${categoryColor}20`,
        }}
      >
        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className={`w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity ${
              skill.invert ? "brightness-0 invert" : ""
            }`}
          />
        ) : (
          <span className="text-xs text-text-muted flex items-center justify-center h-full">
            {skill.name[0]}
          </span>
        )}
      </div>
      <span className="text-[8px] font-mono text-text-muted mt-1 text-center leading-tight max-w-[60px]">
        {skill.name}
      </span>
    </div>
  );
}

// Weapon Station component with skills grid below
function WeaponStation({
  category,
  mouseX,
  mouseY,
}: {
  category: SkillCategory;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const [imageError, setImageError] = useState(false);
  const weaponImage = weaponImages[category.id];

  // Mouse parallax for weapon
  const weaponParallaxX = useTransform(mouseX, [0, 1], [8, -8]);
  const weaponParallaxY = useTransform(mouseY, [0, 1], [8, -8]);
  const weaponSpringX = useSpring(weaponParallaxX, { stiffness: 120, damping: 25 });
  const weaponSpringY = useSpring(weaponParallaxY, { stiffness: 120, damping: 25 });

  return (
    <div
      className="flex-shrink-0 flex flex-col items-center px-2"
      style={{ width: "calc(33.333vw - 1rem)", minWidth: "260px", maxWidth: "340px" }}
    >
      {/* Weapon Image with glow */}
      <motion.div
        className="relative mb-3"
        style={{ x: weaponSpringX, y: weaponSpringY }}
      >
        <div
          className="absolute inset-[-10px] rounded-full opacity-50 blur-2xl"
          style={{ backgroundColor: category.color }}
        />
        {!imageError && weaponImage ? (
          <Image
            src={weaponImage}
            alt={category.name}
            width={140}
            height={140}
            className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10"
            style={{
              filter: `drop-shadow(0 0 20px ${category.color}80)`,
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center relative z-10"
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: `linear-gradient(135deg, ${category.color}60 0%, ${category.color}20 100%)`,
              boxShadow: `0 0 30px ${category.color}50`,
            }}
          >
            <span
              className="text-4xl font-bold font-mono"
              style={{ color: category.color }}
            >
              {category.name[0]}
            </span>
          </div>
        )}
      </motion.div>

      {/* Category Name */}
      <h3
        className="text-sm md:text-base font-mono font-bold uppercase tracking-wider mb-2"
        style={{ color: category.color }}
      >
        {category.name}
      </h3>

      {/* Skills Grid */}
      <div className="grid grid-cols-3 gap-2">
        {category.skills.map((skill) => (
          <SkillItem key={skill.id} skill={skill} categoryColor={category.color} />
        ))}
      </div>
    </div>
  );
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "255, 255, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

export function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [scrollDistance, setScrollDistance] = useState(3000);

  const totalCategories = skillCategories.length;

  // Calculate scroll distance on mount - for 3 visible at a time
  useEffect(() => {
    const cardWidth = Math.min(Math.max(window.innerWidth / 3 - 16, 280), 400);
    const totalTrackWidth = totalCategories * (cardWidth + CARD_GAP);
    const visibleWidth = window.innerWidth;
    setScrollDistance(totalTrackWidth - visibleWidth + cardWidth);
  }, [totalCategories]);

  // Track scroll progress through the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to horizontal track position
  const trackX = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  // Track mouse for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!stickyRef.current) return;
      const rect = stickyRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Desktop: Scroll-driven horizontal carousel */}
      <div
        ref={containerRef}
        id="skills"
        className="relative hidden md:block"
        style={{ height: `${totalCategories * 35}vh`, backgroundColor: "#030014" }}
      >
        {/* Sticky viewport */}
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen overflow-hidden flex flex-col"
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 211, 209, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 209, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Header */}
          <div className="relative z-20 pt-6 pb-2 text-center">
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple/30 to-aurora-cyan/30 blur" />
              <div className="relative px-5 py-2 bg-black/60 backdrop-blur-sm border border-aurora-cyan/30">
                <HUDCorners />
                <h2 className="text-xl md:text-2xl font-bold tracking-wider text-aurora-cyan font-mono">
                  <span className="text-nebula-purple mr-2">&gt;</span>
                  ARMORY.exe
                  <span className="animate-pulse ml-1">_</span>
                </h2>
              </div>
            </div>
            <p className="mt-2 text-xs font-mono text-text-muted">
              WEAPONS SYSTEMS &amp; TACTICAL EQUIPMENT
            </p>
          </div>

          {/* Horizontal track */}
          <div className="flex-1 flex items-center overflow-hidden">
            <motion.div
              className="flex items-start pt-2"
              style={{
                x: trackX,
                gap: CARD_GAP,
                paddingLeft: "1rem",
              }}
            >
              {skillCategories.map((category) => (
                <WeaponStation
                  key={category.id}
                  category={category}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner decorations - Top */}
          <div className="absolute top-8 left-8 text-xs font-mono text-text-muted/50 z-20">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-hud-green rounded-full" />
              <span>SECTOR: 003</span>
            </div>
            <div className="text-aurora-cyan/50">NODE: ARMORY</div>
          </div>

          <div className="absolute top-8 right-8 text-xs font-mono text-right text-text-muted/50 z-20">
            <div className="text-aurora-cyan/50">DB: armory.json</div>
            <div>STATUS: ARMED</div>
          </div>

          {/* Corner decorations - Bottom */}
          <div className="absolute bottom-8 left-8 text-xs font-mono text-text-muted/30 z-20">
            <div>AMMO: LOADED</div>
            <div>READY: 100%</div>
          </div>

          <div className="absolute bottom-8 right-8 text-xs font-mono text-text-muted/30 text-right z-20">
            <div>CLEARANCE: GRANTED</div>
            <div>ACCESS: FULL</div>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical scroll with skills grid */}
      <section
        id="skills-mobile"
        className="relative md:hidden py-16 px-4 overflow-hidden"
        style={{ backgroundColor: "#030014" }}
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 209, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 209, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple/30 to-aurora-cyan/30 blur" />
              <div className="relative px-4 py-2 bg-black/60 backdrop-blur-sm border border-aurora-cyan/30">
                <h2 className="text-xl font-bold tracking-wider text-aurora-cyan font-mono">
                  <span className="text-nebula-purple mr-2">&gt;</span>
                  ARMORY.exe
                </h2>
              </div>
            </div>
          </div>

          {/* Mobile categories with skills */}
          <div className="space-y-4">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-3 rounded-lg border border-white/5 bg-black/20"
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{
                      clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                      background: `linear-gradient(135deg, ${category.color}60 0%, ${category.color}20 100%)`,
                    }}
                  >
                    <span
                      className="text-base font-bold font-mono"
                      style={{ color: category.color }}
                    >
                      {category.name[0]}
                    </span>
                  </div>
                  <span
                    className="text-xs font-mono font-bold uppercase tracking-wider"
                    style={{ color: category.color }}
                  >
                    {category.name}
                  </span>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-4 gap-2">
                  {category.skills.map((skill) => (
                    <SkillItem key={skill.id} skill={skill} categoryColor={category.color} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
