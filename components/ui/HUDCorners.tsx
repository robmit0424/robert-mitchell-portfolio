"use client";

interface HUDCornersProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function HUDCorners({
  className = "",
  size = "md",
  color = "border-aurora-cyan"
}: HUDCornersProps) {
  const sizeClass = sizeMap[size];

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className={`absolute top-0 left-0 ${sizeClass} border-l-2 border-t-2 ${color} opacity-60`} />
      <div className={`absolute top-0 right-0 ${sizeClass} border-r-2 border-t-2 ${color} opacity-60`} />
      <div className={`absolute bottom-0 left-0 ${sizeClass} border-l-2 border-b-2 ${color} opacity-60`} />
      <div className={`absolute bottom-0 right-0 ${sizeClass} border-r-2 border-b-2 ${color} opacity-60`} />
    </div>
  );
}
