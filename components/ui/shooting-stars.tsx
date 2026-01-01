"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkle: boolean;
}

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
}

export const StarsBackground = ({
  className,
  starDensity = 0.0002,
}: {
  className?: string;
  starDensity?: number;
}) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const area = width * height;
      const numStars = Math.floor(area * starDensity);

      const newStars: Star[] = [];
      for (let i = 0; i < numStars; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          twinkle: Math.random() > 0.7,
        });
      }
      setStars(newStars);
    };

    generateStars();
    window.addEventListener("resize", generateStars);
    return () => window.removeEventListener("resize", generateStars);
  }, [starDensity]);

  // Generate shooting stars periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newStar: ShootingStar = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          angle: Math.random() * 360,
          speed: 2 + Math.random() * 3,
        };
        setShootingStars((prev) => [...prev, newStar]);

        // Remove after animation
        setTimeout(() => {
          setShootingStars((prev) => prev.filter((s) => s.id !== newStar.id));
        }, 1000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-neutral-950", className)}>
      {/* Static stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={
            star.twinkle
              ? {
                  opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                  scale: [1, 0.8, 1],
                }
              : {}
          }
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          initial={{ opacity: star.opacity }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => {
        const angleRad = (star.angle * Math.PI) / 180;
        const distance = 300;
        const endX = Math.cos(angleRad) * distance;
        const endY = Math.sin(angleRad) * distance;

        return (
          <motion.div
            key={star.id}
            className="absolute h-[2px] bg-gradient-to-r from-transparent via-accent to-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: "100px",
              transformOrigin: "left center",
            }}
            initial={{ opacity: 0, x: 0, y: 0, rotate: star.angle }}
            animate={{ opacity: [0, 1, 0], x: endX, y: endY, rotate: star.angle }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        );
      })}

      {/* Nebula glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
    </div>
  );
};
