"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
  isOpen?: boolean;
  initialPosition?: { x: number; y: number };
  constraintsRef?: React.RefObject<HTMLDivElement | null>;
}

// CSS placeholder icon when PNG not available
function PlaceholderIcon({ label }: { label: string }) {
  const getIconContent = () => {
    switch (label) {
      case "About Me":
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case "Experience":
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case "Skills":
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case "Contact":
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="w-14 h-14 flex items-center justify-center bg-black/40 border border-aurora-cyan/30 rounded-lg text-aurora-cyan">
      {getIconContent()}
    </div>
  );
}

export function DesktopIcon({ id, label, icon, onClick, isOpen, initialPosition, constraintsRef }: DesktopIconProps) {
  const [imageError, setImageError] = useState(false);
  const hasDragged = useRef(false);

  const handleDragStart = () => {
    hasDragged.current = false;
  };

  const handleDrag = () => {
    hasDragged.current = true;
  };

  const handleDragEnd = () => {
    // Small delay to let the click event check the flag
    setTimeout(() => {
      hasDragged.current = false;
    }, 100);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasDragged.current) {
      onClick();
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.1, zIndex: 100 }}
      className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors group select-none"
      style={{ touchAction: "none" }}
    >
      <div onClick={handleClick} className="flex flex-col items-center gap-2 cursor-pointer">
        {/* Icon container */}
        <div className="relative">
          {!imageError ? (
            <div className="w-14 h-14 relative rounded-lg overflow-hidden">
              <Image
                src={icon}
                alt={label}
                fill
                className="object-contain pointer-events-none"
                onError={() => setImageError(true)}
                draggable={false}
              />
            </div>
          ) : (
            <PlaceholderIcon label={label} />
          )}

          {/* Open indicator */}
          {isOpen && (
            <motion.div
              layoutId={`indicator-${id}`}
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-aurora-cyan"
            />
          )}

          {/* Hover glow */}
          <div className="absolute inset-0 bg-aurora-cyan/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none" />
        </div>

        {/* Label */}
        <span className="font-mono text-[10px] text-text-muted group-hover:text-aurora-cyan transition-colors text-center max-w-[80px] truncate pointer-events-none">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
