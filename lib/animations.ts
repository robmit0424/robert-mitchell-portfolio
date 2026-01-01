// Animation configuration constants and utilities

export const DURATION = {
  fast: 300,
  normal: 500,
  slow: 800,
  extraSlow: 1200,
} as const;

export const EASING = {
  smooth: "outQuad",
  bounce: "outBack",
  elastic: "outElastic",
  expo: "outExpo",
  linear: "linear",
} as const;

export const STAGGER = {
  fast: 30,
  normal: 50,
  slow: 100,
  extraSlow: 150,
} as const;

// Common animation presets
export const fadeInUp = {
  opacity: [0, 1],
  translateY: [30, 0],
  duration: DURATION.normal,
  ease: EASING.smooth,
};

export const fadeIn = {
  opacity: [0, 1],
  duration: DURATION.normal,
  ease: EASING.smooth,
};

export const scaleIn = {
  scale: [0.8, 1],
  opacity: [0, 1],
  duration: DURATION.normal,
  ease: EASING.bounce,
};

export const slideInLeft = {
  opacity: [0, 1],
  translateX: [-50, 0],
  duration: DURATION.normal,
  ease: EASING.smooth,
};

export const slideInRight = {
  opacity: [0, 1],
  translateX: [50, 0],
  duration: DURATION.normal,
  ease: EASING.smooth,
};

// Utility to check for reduced motion preference
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Utility to split text into characters for animation
export function splitTextToChars(text: string): string[] {
  return text.split("");
}

// Utility to split text into words for animation
export function splitTextToWords(text: string): string[] {
  return text.split(" ");
}
