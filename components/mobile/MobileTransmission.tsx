"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HUDCorners } from "@/components/ui/HUDCorners";

interface MobileTransmissionProps {
  onClose: () => void;
}

const WELCOME_MESSAGE = "You've found me. I'm Robby — I build web apps that people actually want to use. Feel free to look around, but check this out on desktop for the full experience.";

export function MobileTransmission({ onClose }: MobileTransmissionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStartedTalking, setHasStartedTalking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  // Start with standard image, then switch to talking after delay
  useEffect(() => {
    const talkingTimer = setTimeout(() => {
      setHasStartedTalking(true);
      setIsTalking(true);
    }, 1500);

    return () => clearTimeout(talkingTimer);
  }, []);

  // Type out text effect
  useEffect(() => {
    if (!isTalking || isTypingComplete) return;

    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (index <= WELCOME_MESSAGE.length) {
        setDisplayedText(WELCOME_MESSAGE.slice(0, index));
        const currentChar = WELCOME_MESSAGE[index - 1];
        const nextChar = WELCOME_MESSAGE[index];
        // Add 300ms pause after punctuation or before em dash
        const delay = ['.', '!', '?', ','].includes(currentChar) || nextChar === '—' ? 330 : 30;
        index++;
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        setIsTypingComplete(true);
        setIsTalking(false);
      }
    };

    const startDelay = setTimeout(() => {
      typeNextChar();
    }, 500);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
    };
  }, [isTalking, isTypingComplete]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-[2000] px-4 pb-4"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 16px) + 80px)" }}
    >
      {/* Glow effect behind */}
      <div className="absolute inset-0 bg-aurora-cyan/20 blur-xl rounded-lg" />

      {/* Main container */}
      <div className="relative bg-black/95 backdrop-blur-md border border-aurora-cyan/50 rounded-lg overflow-hidden shadow-2xl shadow-aurora-cyan/20">
        <HUDCorners />

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-aurora-cyan/30 bg-black/60">
          <div className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 bg-hud-green rounded-full"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="font-mono text-xs text-aurora-cyan uppercase tracking-wider">
              Incoming Transmission
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-aurora-cyan transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col items-center">
          {/* Image with hologram effect */}
          <div className="relative mb-4">
            {/* Glow */}
            <div className="absolute -inset-2 bg-aurora-cyan/30 blur-lg rounded-lg" />

            {/* Image container */}
            <div className="relative w-28 h-28 rounded-lg overflow-hidden border border-aurora-cyan/40">
              {/* Scan lines overlay */}
              <div
                className="absolute inset-0 z-20 pointer-events-none opacity-20"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
                }}
              />

              {/* Moving scan line */}
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-aurora-cyan/50 z-30 pointer-events-none"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Hologram tint */}
              <div className="absolute inset-0 bg-aurora-cyan/10 z-10 pointer-events-none" />

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isTalking ? "talking" : "standard"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={isTalking ? "/SpaceRob_Talking.png" : "/SpaceRob.png"}
                    alt="Robert Mitchell"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Status indicator */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-mono text-aurora-cyan/60 whitespace-nowrap">
              <span className={isTalking ? "text-hud-green" : isTypingComplete ? "text-aurora-cyan" : "text-hud-amber"}>●</span>{" "}
              {isTalking ? "LIVE" : isTypingComplete ? "STANDBY" : "CONNECTING..."}
            </div>
          </div>

          {/* Message */}
          <div className="text-center w-full">
            {!hasStartedTalking ? (
              <p className="font-mono text-sm text-text-muted italic">
                Establishing connection
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </p>
            ) : (
              <p className="font-mono text-sm text-text-secondary leading-relaxed">
                &ldquo;{displayedText}
                {!isTypingComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-aurora-cyan"
                  >
                    _
                  </motion.span>
                )}
                {isTypingComplete && "\u201D"}
              </p>
            )}

            {/* Sender info */}
            <div className="mt-3 pt-2 border-t border-aurora-cyan/20">
              <p className="text-[10px] font-mono text-aurora-cyan/60">
                FROM: ROBERT_MITCHELL
              </p>
              <p className="text-[10px] font-mono text-text-muted/40">
                SIGNAL: STRONG | ENCRYPTED
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-black/60 border border-aurora-cyan/30 rounded font-mono text-xs text-aurora-cyan hover:bg-aurora-cyan/10 hover:border-aurora-cyan/50 transition-colors"
          >
            <span className="text-nebula-purple mr-2">&gt;</span>
            CLOSE_TRANSMISSION
          </button>
        </div>
      </div>
    </motion.div>
  );
}
