"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function NebulaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    // Create stars
    const stars: { x: number; y: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
      });
    }

    const animate = () => {
      time += 0.001;

      // Deep space background
      const bgGradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.5,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.8
      );
      bgGradient.addColorStop(0, "#0a0520");
      bgGradient.addColorStop(0.5, "#050210");
      bgGradient.addColorStop(1, "#030014");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated nebula clouds
      const nebulaClouds = [
        {
          x: canvas.width * (0.3 + Math.sin(time * 0.5) * 0.1),
          y: canvas.height * (0.3 + Math.cos(time * 0.3) * 0.1),
          radius: canvas.width * 0.4,
          color: "rgba(124, 58, 237, 0.15)", // purple
        },
        {
          x: canvas.width * (0.7 + Math.cos(time * 0.4) * 0.1),
          y: canvas.height * (0.6 + Math.sin(time * 0.6) * 0.1),
          radius: canvas.width * 0.35,
          color: "rgba(37, 99, 235, 0.12)", // blue
        },
        {
          x: canvas.width * (0.5 + Math.sin(time * 0.7) * 0.15),
          y: canvas.height * (0.8 + Math.cos(time * 0.5) * 0.1),
          radius: canvas.width * 0.3,
          color: "rgba(236, 72, 153, 0.1)", // pink
        },
        {
          x: canvas.width * (0.2 + Math.cos(time * 0.3) * 0.1),
          y: canvas.height * (0.7 + Math.sin(time * 0.4) * 0.1),
          radius: canvas.width * 0.25,
          color: "rgba(34, 211, 209, 0.08)", // cyan
        },
      ];

      nebulaClouds.forEach((cloud) => {
        const gradient = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          cloud.radius
        );
        gradient.addColorStop(0, cloud.color);
        gradient.addColorStop(0.5, cloud.color.replace(/[\d.]+\)$/, "0.05)"));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      // Draw stars with twinkling
      stars.forEach((star) => {
        const twinkle = Math.sin(time * 10 + star.x * 100 + star.y * 100) * 0.3 + 0.7;
        const x = star.x * canvas.width;
        const y = star.y * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();

        // Star glow
        if (star.size > 1.5) {
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 4);
          glowGradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * twinkle * 0.3})`);
          glowGradient.addColorStop(1, "transparent");
          ctx.fillStyle = glowGradient;
          ctx.fillRect(x - star.size * 4, y - star.size * 4, star.size * 8, star.size * 8);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Additional animated gradient overlays */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 30%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)",
            "radial-gradient(ellipse at 30% 40%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 30%, rgba(124, 58, 237, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(ellipse at 80% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
            "radial-gradient(ellipse at 70% 60%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(3, 0, 20, 0.8) 100%)",
        }}
      />
    </div>
  );
}
