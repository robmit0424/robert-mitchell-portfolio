"use client";

import { motion } from "framer-motion";

interface CornerData {
  topLeft: { line1: string; line2: string };
  topRight: { line1: string; line2: string };
  bottomLeft: { line1: string; line2: string };
  bottomRight: { line1: string; line2: string };
}

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  cornerData: CornerData;
  showGrid?: boolean;
  className?: string;
}

function CornerDecoration({
  position,
  data,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  data: { line1: string; line2: string };
}) {
  const positionClasses = {
    "top-left": "top-4 left-4 text-left",
    "top-right": "top-4 right-4 text-right",
    "bottom-left": "bottom-4 left-4 text-left",
    "bottom-right": "bottom-4 right-4 text-right",
  };

  const isTop = position.includes("top");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`absolute text-[10px] font-mono hidden md:block z-20 ${positionClasses[position]}`}
    >
      {isTop ? (
        <>
          <div className="flex items-center gap-2 mb-0.5">
            <div className="w-1.5 h-1.5 bg-hud-green rounded-full" />
            <span className="text-text-muted/60">{data.line1}</span>
          </div>
          <div className="text-aurora-cyan/50">{data.line2}</div>
        </>
      ) : (
        <>
          <div className="text-text-muted/40">{data.line1}</div>
          <div className="text-text-muted/40">{data.line2}</div>
        </>
      )}
    </motion.div>
  );
}

export function SectionWrapper({
  id,
  children,
  cornerData,
  showGrid = true,
  className = "",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative h-screen overflow-hidden ${className}`}
      style={{ backgroundColor: "#030014" }}
    >
      {/* Grid overlay */}
      {showGrid && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 209, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 209, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      )}

      {/* Corner decorations */}
      <CornerDecoration position="top-left" data={cornerData.topLeft} />
      <CornerDecoration position="top-right" data={cornerData.topRight} />
      <CornerDecoration position="bottom-left" data={cornerData.bottomLeft} />
      <CornerDecoration position="bottom-right" data={cornerData.bottomRight} />

      {/* Main content area */}
      <div className="relative z-10 h-full flex flex-col px-4 md:px-12 lg:px-20 py-12">
        {children}
      </div>
    </section>
  );
}
