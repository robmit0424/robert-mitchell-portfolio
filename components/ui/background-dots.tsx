"use client";

import { cn } from "@/lib/utils";

export const BackgroundDots = ({
  className,
  dotColor = "rgba(100, 108, 255, 0.3)",
}: {
  className?: string;
  dotColor?: string;
}) => {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      {/* Fade edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950" />
    </div>
  );
};
