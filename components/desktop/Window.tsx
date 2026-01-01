"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { HUDCorners } from "@/components/ui/HUDCorners";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  zIndex: number;
  isMaximized?: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
}

const MIN_WIDTH = 400;
const MIN_HEIGHT = 300;
const DEFAULT_WIDTH = 1000;
const DEFAULT_HEIGHT = 750;
const TOP_BAR_HEIGHT = 40;

export function Window({
  id,
  title,
  children,
  zIndex,
  isMaximized = false,
  onClose,
  onFocus,
  onMinimize,
  onToggleMaximize,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({ x: -1, y: -1 });
  const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);

  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const resizeStart = useRef({ mouseX: 0, mouseY: 0, width: 0, height: 0, posX: 0, posY: 0 });

  // Initialize position centered on screen
  useEffect(() => {
    if (position.x === -1 && typeof window !== 'undefined') {
      setPosition({
        x: Math.max(0, (window.innerWidth - size.width) / 2),
        y: Math.max(TOP_BAR_HEIGHT, (window.innerHeight - size.height) / 2),
      });
    }
  }, [position.x, size.width, size.height]);

  // Drag handlers
  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y,
    };
    onFocus();
  }, [isMaximized, position, onFocus]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;

      setPosition({
        x: dragStart.current.posX + deltaX,
        y: Math.max(TOP_BAR_HEIGHT, dragStart.current.posY + deltaY), // Don't go above top bar
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Resize handlers
  const handleResizeStart = useCallback((direction: string) => (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    resizeStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y,
    };
    onFocus();
  }, [isMaximized, size, position, onFocus]);

  useEffect(() => {
    if (!isResizing || !resizeDirection) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.current.mouseX;
      const deltaY = e.clientY - resizeStart.current.mouseY;

      let newWidth = resizeStart.current.width;
      let newHeight = resizeStart.current.height;
      let newX = resizeStart.current.posX;
      let newY = resizeStart.current.posY;

      // East - grow right (anchor left)
      if (resizeDirection.includes('e')) {
        newWidth = Math.max(MIN_WIDTH, resizeStart.current.width + deltaX);
      }

      // South - grow down (anchor top)
      if (resizeDirection.includes('s')) {
        newHeight = Math.max(MIN_HEIGHT, resizeStart.current.height + deltaY);
      }

      // West - grow left (anchor right, move position)
      if (resizeDirection.includes('w')) {
        const proposedWidth = resizeStart.current.width - deltaX;
        if (proposedWidth >= MIN_WIDTH) {
          newWidth = proposedWidth;
          newX = resizeStart.current.posX + deltaX;
        }
      }

      // North - grow up (anchor bottom, move position)
      if (resizeDirection.includes('n')) {
        const proposedHeight = resizeStart.current.height - deltaY;
        if (proposedHeight >= MIN_HEIGHT) {
          newHeight = proposedHeight;
          newY = Math.max(TOP_BAR_HEIGHT, resizeStart.current.posY + deltaY);
        }
      }

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setResizeDirection(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeDirection]);

  // Double-click header to toggle maximize
  const handleHeaderDoubleClick = () => {
    onToggleMaximize();
  };

  // Don't render until position is initialized
  if (position.x === -1) {
    return null;
  }

  // Calculate animated values
  const animatedLeft = isMaximized ? 0 : position.x;
  const animatedTop = isMaximized ? TOP_BAR_HEIGHT : position.y;
  const animatedWidth = isMaximized ? typeof window !== 'undefined' ? window.innerWidth : 1920 : size.width;
  const animatedHeight = isMaximized ? typeof window !== 'undefined' ? window.innerHeight - TOP_BAR_HEIGHT : 1040 : size.height;

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        left: animatedLeft,
        top: animatedTop,
        width: animatedWidth,
        height: animatedHeight,
        borderRadius: isMaximized ? 0 : 8,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        y: 100,
        transition: { duration: 0.2 }
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.2 },
      }}
      onPointerDown={onFocus}
      className="fixed bg-black/90 backdrop-blur-md border border-aurora-cyan/30 overflow-hidden shadow-2xl shadow-aurora-cyan/10"
      style={{
        zIndex,
        cursor: isDragging ? "grabbing" : "auto",
      }}
    >
      <HUDCorners />

      {/* Window header - draggable area */}
      <div
        className="flex items-center justify-between border-b border-aurora-cyan/30 px-4 py-2 bg-black/60 select-none"
        style={{ cursor: isMaximized ? "default" : (isDragging ? "grabbing" : "grab") }}
        onMouseDown={handleDragStart}
        onDoubleClick={handleHeaderDoubleClick}
      >
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-hud-red/80 hover:bg-hud-red transition-colors hover:scale-110"
              title="Close"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-hud-amber/80 hover:bg-hud-amber transition-colors hover:scale-110"
              title="Minimize"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleMaximize();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-3 h-3 rounded-full bg-hud-green/80 hover:bg-hud-green transition-colors hover:scale-110"
              title={isMaximized ? "Restore" : "Maximize"}
            />
          </div>

          {/* Title */}
          <span className="font-mono text-sm text-aurora-cyan">
            <span className="text-nebula-purple">&gt;</span> {title}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              _
            </motion.span>
          </span>
        </div>

        {/* Window ID */}
        <span className="text-[10px] font-mono text-text-muted/50">
          pid: {id.substring(0, 4)}
        </span>
      </div>

      {/* Window content */}
      <div className="h-[calc(100%-40px)] overflow-auto">
        {children}
      </div>

      {/* Resize handles (only when not maximized) */}
      {!isMaximized && (
        <>
          {/* Right edge */}
          <div
            className="absolute top-0 right-0 w-2 h-full cursor-e-resize hover:bg-aurora-cyan/20 transition-colors"
            onMouseDown={handleResizeStart('e')}
          />
          {/* Bottom edge */}
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize hover:bg-aurora-cyan/20 transition-colors"
            onMouseDown={handleResizeStart('s')}
          />
          {/* Bottom-right corner */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-aurora-cyan/30 transition-colors"
            onMouseDown={handleResizeStart('se')}
          >
            {/* Resize grip indicator */}
            <svg
              className="absolute bottom-1 right-1 w-2 h-2 text-aurora-cyan/50"
              viewBox="0 0 6 6"
              fill="currentColor"
            >
              <circle cx="5" cy="1" r="0.5" />
              <circle cx="5" cy="3" r="0.5" />
              <circle cx="5" cy="5" r="0.5" />
              <circle cx="3" cy="3" r="0.5" />
              <circle cx="3" cy="5" r="0.5" />
              <circle cx="1" cy="5" r="0.5" />
            </svg>
          </div>
          {/* Left edge */}
          <div
            className="absolute top-0 left-0 w-2 h-full cursor-w-resize hover:bg-aurora-cyan/20 transition-colors"
            onMouseDown={handleResizeStart('w')}
          />
          {/* Top edge (below header) */}
          <div
            className="absolute top-10 left-0 w-full h-2 cursor-n-resize hover:bg-aurora-cyan/20 transition-colors"
            style={{ top: 40 }}
            onMouseDown={handleResizeStart('n')}
          />
          {/* Top-left corner */}
          <div
            className="absolute w-4 h-4 cursor-nw-resize hover:bg-aurora-cyan/30 transition-colors"
            style={{ top: 40, left: 0 }}
            onMouseDown={handleResizeStart('nw')}
          />
          {/* Top-right corner */}
          <div
            className="absolute w-4 h-4 cursor-ne-resize hover:bg-aurora-cyan/30 transition-colors"
            style={{ top: 40, right: 0 }}
            onMouseDown={handleResizeStart('ne')}
          />
          {/* Bottom-left corner */}
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize hover:bg-aurora-cyan/30 transition-colors"
            onMouseDown={handleResizeStart('sw')}
          />
        </>
      )}
    </motion.div>
  );
}
