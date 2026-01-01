"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  twinkleSpeed: number;
  twinkleOffset: number;
}

const COLORS = [
  "rgba(124, 58, 237, 0.6)",   // nebula purple
  "rgba(37, 99, 235, 0.5)",    // cosmic blue
  "rgba(236, 72, 153, 0.4)",   // stellar pink
  "rgba(34, 211, 209, 0.5)",   // aurora cyan
  "rgba(255, 255, 255, 0.6)",  // white
];

export function SpaceDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef({ y: 0, velocity: 0 });
  const animationRef = useRef<number | undefined>(undefined);

  const createParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.floor((width * height) / 15000); // Density based on screen size
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height * 3, // Extend beyond viewport for scrolling
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.1,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastScrollY = window.scrollY;
    let lastTime = performance.now();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = createParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollRef.current.velocity = currentScrollY - lastScrollY;
      scrollRef.current.y = currentScrollY;
      lastScrollY = currentScrollY;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16.67; // Normalize to ~60fps
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scrollOffset = scrollRef.current.y;
      const scrollVelocity = scrollRef.current.velocity;

      particlesRef.current.forEach((particle) => {
        // Apply scroll effect - particles move with slight parallax
        const parallaxFactor = 0.3 + (particle.size / 3) * 0.4;
        const adjustedY = (particle.y - scrollOffset * parallaxFactor) % (canvas.height * 3);
        const displayY = adjustedY < 0 ? adjustedY + canvas.height * 3 : adjustedY;

        // Only render if in viewport (with buffer)
        if (displayY < -50 || displayY > canvas.height + 50) return;

        // Mouse repulsion
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - displayY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 100;

        if (distance < repulsionRadius && distance > 0) {
          const force = (repulsionRadius - distance) / repulsionRadius;
          particle.vx -= (dx / distance) * force * 0.5;
          particle.vy -= (dy / distance) * force * 0.5;
        }

        // Apply scroll velocity effect
        particle.vy += scrollVelocity * 0.001 * deltaTime;

        // Update position with velocity
        particle.x += particle.vx * deltaTime;
        particle.y += particle.vy * deltaTime;

        // Apply friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Wrap around horizontally
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;

        // Twinkle effect
        const twinkle =
          Math.sin(currentTime * particle.twinkleSpeed + particle.twinkleOffset) * 0.3 + 0.7;
        const currentOpacity = particle.opacity * twinkle;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(particle.x, displayY, particle.size, 0, Math.PI * 2);

        // Create radial gradient for glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          displayY,
          0,
          particle.x,
          displayY,
          particle.size * 3
        );
        gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, `${currentOpacity})`));
        gradient.addColorStop(0.5, particle.color.replace(/[\d.]+\)$/, `${currentOpacity * 0.3})`));
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fill();

        // Core of the particle
        ctx.beginPath();
        ctx.arc(particle.x, displayY, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${currentOpacity})`);
        ctx.fill();
      });

      // Decay scroll velocity
      scrollRef.current.velocity *= 0.95;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
