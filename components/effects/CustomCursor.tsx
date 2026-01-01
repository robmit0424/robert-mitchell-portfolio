"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const trailRef = useRef<TrailPoint[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has pointer (not touch-only)
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      // Add point to trail
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      });

      // Keep trail limited
      if (trailRef.current.length > 80) {
        trailRef.current.shift();
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");
      setIsHovering(!!isHoverable);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Canvas trail animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      const trailDuration = 500; // ms - longer for smoother fade

      // Filter old points
      trailRef.current = trailRef.current.filter(
        (point) => now - point.timestamp < trailDuration
      );

      if (trailRef.current.length < 3) {
        animationRef.current = requestAnimationFrame(drawTrail);
        return;
      }

      const points = trailRef.current;

      // Draw smooth trail using quadratic bezier curves
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < points.length - 1; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];

        // Calculate control point (midpoint between current and next)
        const cpX = (p1.x + p2.x) / 2;
        const cpY = (p1.y + p2.y) / 2;

        // Calculate alpha based on position in trail (smoother easing)
        const progress = i / points.length;
        const alpha = Math.pow(progress, 0.5) * 0.3; // Subtle trail

        // Gradient from purple to pink to cyan
        const r = Math.round(124 + (34 - 124) * progress);
        const g = Math.round(58 + (211 - 58) * progress);
        const b = Math.round(237 + (209 - 237) * progress);

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.quadraticCurveTo(p1.x, p1.y, cpX, cpY);

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 1 + progress * 2;
        ctx.stroke();
      }

      // Draw subtle glow at the newest points only
      const recentCount = Math.min(4, points.length);
      for (let i = points.length - recentCount; i < points.length; i++) {
        const point = points[i];
        const progress = (i - (points.length - recentCount)) / recentCount;
        const size = 1.5 + progress * 1.5;

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 209, ${0.1 + progress * 0.2})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(drawTrail);
    };

    drawTrail();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Crosshair cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-aurora-cyan"
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            borderColor: isHovering ? "var(--stellar-pink)" : "var(--aurora-cyan)",
          }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: isHovering
              ? "0 0 20px var(--stellar-pink-glow), inset 0 0 10px var(--stellar-pink-glow)"
              : "0 0 15px var(--aurora-cyan-glow), inset 0 0 8px var(--aurora-cyan-glow)",
          }}
        />

        {/* Crosshair lines */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2">
          {/* Vertical line top */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bg-aurora-cyan"
            animate={{
              height: isHovering ? 8 : 6,
              top: isHovering ? -28 : -20,
            }}
            style={{ width: 1 }}
          />
          {/* Vertical line bottom */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bg-aurora-cyan"
            animate={{
              height: isHovering ? 8 : 6,
              bottom: isHovering ? -28 : -20,
            }}
            style={{ width: 1 }}
          />
          {/* Horizontal line left */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 bg-aurora-cyan"
            animate={{
              width: isHovering ? 8 : 6,
              left: isHovering ? -28 : -20,
            }}
            style={{ height: 1 }}
          />
          {/* Horizontal line right */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 bg-aurora-cyan"
            animate={{
              width: isHovering ? 8 : 6,
              right: isHovering ? -28 : -20,
            }}
            style={{ height: 1 }}
          />
        </div>

        {/* Center dot */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: isHovering ? 6 : 4,
            height: isHovering ? 6 : 4,
            backgroundColor: isHovering ? "var(--stellar-pink)" : "var(--aurora-cyan)",
          }}
          style={{
            boxShadow: "0 0 10px currentColor",
          }}
        />

        {/* Corner brackets when hovering */}
        {isHovering && (
          <>
            {/* Top-left */}
            <motion.div
              className="absolute border-l-2 border-t-2 border-stellar-pink"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                width: 8,
                height: 8,
                top: -28,
                left: -28,
              }}
            />
            {/* Top-right */}
            <motion.div
              className="absolute border-r-2 border-t-2 border-stellar-pink"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                width: 8,
                height: 8,
                top: -28,
                right: -28,
              }}
            />
            {/* Bottom-left */}
            <motion.div
              className="absolute border-l-2 border-b-2 border-stellar-pink"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                width: 8,
                height: 8,
                bottom: -28,
                left: -28,
              }}
            />
            {/* Bottom-right */}
            <motion.div
              className="absolute border-r-2 border-b-2 border-stellar-pink"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                width: 8,
                height: 8,
                bottom: -28,
                right: -28,
              }}
            />
          </>
        )}
      </motion.div>
    </>
  );
}
