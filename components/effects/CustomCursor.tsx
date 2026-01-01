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

  const springConfig = { damping: 25, stiffness: 400 };
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
      if (trailRef.current.length > 50) {
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
      const trailDuration = 300; // ms

      // Filter old points
      trailRef.current = trailRef.current.filter(
        (point) => now - point.timestamp < trailDuration
      );

      if (trailRef.current.length < 2) {
        animationRef.current = requestAnimationFrame(drawTrail);
        return;
      }

      // Draw trail
      ctx.beginPath();
      ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);

      for (let i = 1; i < trailRef.current.length; i++) {
        const point = trailRef.current[i];
        const age = now - point.timestamp;
        const alpha = 1 - age / trailDuration;

        // Create gradient effect
        const gradient = ctx.createLinearGradient(
          trailRef.current[i - 1].x,
          trailRef.current[i - 1].y,
          point.x,
          point.y
        );
        gradient.addColorStop(0, `rgba(124, 58, 237, ${alpha * 0.3})`);
        gradient.addColorStop(0.5, `rgba(236, 72, 153, ${alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(34, 211, 209, ${alpha * 0.7})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + alpha * 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        ctx.moveTo(trailRef.current[i - 1].x, trailRef.current[i - 1].y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      }

      // Draw glow particles at trail points
      for (let i = 0; i < trailRef.current.length; i += 3) {
        const point = trailRef.current[i];
        const age = now - point.timestamp;
        const alpha = 1 - age / trailDuration;
        const size = alpha * 3;

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 209, ${alpha * 0.5})`;
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
