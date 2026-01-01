"use client";

import Image from "next/image";

interface SkillIconProps {
  icon?: string;
  name: string;
  color?: string;
  size?: 'large' | 'medium' | 'small';
}

export function SkillIcon({ icon, name, color = '#646cff', size = 'small' }: SkillIconProps) {
  const iconSizes = {
    large: 64,
    medium: 48,
    small: 28,
  };

  const iconSize = iconSizes[size];

  if (!icon) {
    // Text-only fallback for skills without icons
    return (
      <div
        className="flex items-center justify-center rounded-xl transition-all duration-500 opacity-50 group-hover:opacity-100 group-hover:scale-110"
        style={{
          width: iconSize,
          height: iconSize,
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
          border: `1px solid ${color}30`,
        }}
      >
        <span
          className="text-lg font-bold transition-all duration-500"
          style={{ color }}
        >
          {name.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div
      className="skill-icon-wrapper relative transition-all duration-500 group-hover:scale-110"
      style={{
        width: iconSize,
        height: iconSize,
      }}
    >
      <Image
        src={icon}
        alt={name}
        width={iconSize}
        height={iconSize}
        className="skill-icon-img w-full h-full object-contain transition-all duration-500 grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100"
        style={{
          // Add glow on hover via CSS variable
          ['--glow-color' as string]: color,
        }}
        unoptimized
      />
    </div>
  );
}
