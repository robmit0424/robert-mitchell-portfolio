"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NebulaBackground } from "@/components/ui/nebula-background";
import { personal } from "@/data/personal";
import { TopBar } from "./TopBar";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { Dock } from "./Dock";
import { useWindows } from "./WindowContext";
import { HUDCorners } from "@/components/ui/HUDCorners";

// Window content imports
import { AboutContent } from "./window-content/AboutContent";
import { ExperienceContent } from "./window-content/ExperienceContent";
import { SkillsContent } from "./window-content/SkillsContent";
import { ContactContent } from "./window-content/ContactContent";

const desktopApps = [
  { id: "about", label: "About Me", windowTitle: "CREW_MANIFEST", icon: "/icons/about.png", component: AboutContent, initialPos: { x: 24, y: 60 }, initialSize: { width: 800, height: 580 } },
  { id: "experience", label: "Experience", windowTitle: "MISSION_HISTORY", icon: "/icons/experience.png", component: ExperienceContent, initialPos: { x: 24, y: 170 } },
  { id: "skills", label: "Skills", windowTitle: "ARMORY", icon: "/icons/skills.png", component: SkillsContent, initialPos: { x: 24, y: 280 } },
  { id: "contact", label: "Contact", windowTitle: "COMMS_LINK", icon: "/icons/contact.png", component: ContactContent, initialPos: { x: 24, y: 390 }, initialSize: { width: 700, height: 420 } },
];

export function Desktop() {
  const { windows, openWindow, closeWindow, focusWindow, minimizeWindow, toggleMaximize } = useWindows();
  const desktopRef = useRef<HTMLDivElement>(null);

  // Get minimized windows for dock
  const minimizedWindows = windows
    .filter(w => w.minimized)
    .map(w => {
      const app = desktopApps.find(a => a.id === w.id);
      return { id: w.id, label: app?.label || '', icon: app?.icon || '' };
    });

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-black">
      {/* Background */}
      <NebulaBackground />

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

      {/* Top bar */}
      <TopBar />

      {/* Desktop content */}
      <div ref={desktopRef} className="absolute inset-0 pt-10 pb-4 px-4">
        {/* Hero/Welcome content - centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            {/* Name */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-aurora-cyan/50">
                {personal.name.toUpperCase()}
              </span>
            </h1>

            {/* Title badge */}
            <div className="relative inline-block mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-nebula-purple via-stellar-pink to-cosmic-blue opacity-30 blur" />
              <div className="relative px-6 py-3 bg-black/50 backdrop-blur-sm border border-white/10">
                <HUDCorners />
                <p className="text-lg md:text-xl font-mono text-aurora-cyan tracking-widest">
                  <span className="text-text-muted mr-2">&gt;</span>
                  {personal.title.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 md:gap-12">
              {personal.highlights.map((highlight, index) => (
                <motion.div
                  key={highlight.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-aurora-cyan font-mono">
                    {highlight.value}
                  </div>
                  <div className="text-xs text-text-muted uppercase tracking-wider mt-1">
                    {highlight.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Instruction */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-sm font-mono text-text-muted/50"
            >
              Click an icon to explore
            </motion.p>
          </motion.div>
        </div>

        {/* Desktop icons - draggable */}
        {desktopApps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            style={{ position: 'absolute', left: app.initialPos.x, top: app.initialPos.y }}
            className="z-10"
          >
            <DesktopIcon
              id={app.id}
              label={app.label}
              icon={app.icon}
              onClick={() => openWindow(app.id)}
              isOpen={windows.some(w => w.id === app.id && !w.minimized)}
              constraintsRef={desktopRef}
            />
          </motion.div>
        ))}

        {/* Windows layer */}
        <AnimatePresence>
          {windows.map((window) => {
            const app = desktopApps.find(a => a.id === window.id);
            if (!app || window.minimized) return null;

            const ContentComponent = app.component;

            return (
              <Window
                key={window.id}
                id={window.id}
                title={`${app.windowTitle}.exe`}
                zIndex={window.zIndex}
                isMaximized={window.maximized}
                initialWidth={app.initialSize?.width}
                initialHeight={app.initialSize?.height}
                onClose={() => closeWindow(window.id)}
                onFocus={() => focusWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onToggleMaximize={() => toggleMaximize(window.id)}
              >
                <ContentComponent />
              </Window>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock for minimized windows */}
      <Dock minimizedWindows={minimizedWindows} onRestore={openWindow} />

      {/* Corner HUD elements */}
      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-text-muted/40 hidden md:block z-10">
        <div>LAT: 32.7765° N</div>
        <div>LON: 79.9311° W</div>
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] font-mono text-text-muted/40 hidden md:block z-10">
        <div className="text-right">PORTFOLIO v2.0</div>
        <div className="text-right">ALL SYSTEMS NOMINAL</div>
      </div>
    </div>
  );
}
