"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HUDCorners } from "@/components/ui/HUDCorners";

interface TransmissionProps {
  onClose: () => void;
}

const WELCOME_MESSAGE = "You've found me. I'm Robby — I build web apps that people actually want to use. Go ahead, click around — everything here is for you.";

export function Transmission({ onClose }: TransmissionProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStartedTalking, setHasStartedTalking] = useState(false);
  const [isTalking, setIsTalking] = useState(false);

  // Start with standard image, then switch to talking after delay
  useEffect(() => {
    const talkingTimer = setTimeout(() => {
      setHasStartedTalking(true);
      setIsTalking(true);
    }, 1500); // Wait 1.5s before starting to "talk"

    return () => clearTimeout(talkingTimer);
  }, []);

  // Type out text effect (starts after talking begins with additional delay)
  useEffect(() => {
    if (!isTalking || isTypingComplete) return;

    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (index <= WELCOME_MESSAGE.length) {
        setDisplayedText(WELCOME_MESSAGE.slice(0, index));
        const currentChar = WELCOME_MESSAGE[index - 1];
        // Add 300ms pause after punctuation or before em dash
        const nextChar = WELCOME_MESSAGE[index];
        const delay = ['.', '!', '?', ','].includes(currentChar) || nextChar === '—' ? 330 : 30;
        index++;
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        setIsTypingComplete(true);
        // Switch back to standard image after finishing
        setIsTalking(false);
      }
    };

    // Small delay before typing starts
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
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-6 right-6 w-[480px] z-[2000]"
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
            className="w-6 h-6 flex items-center justify-center text-text-muted hover:text-aurora-cyan transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex gap-4">
          {/* Image with hologram effect */}
          <div className="relative flex-shrink-0">
            {/* Glow */}
            <div className="absolute -inset-2 bg-aurora-cyan/30 blur-lg rounded-lg" />

            {/* Image container */}
            <div className="relative w-36 h-36 rounded-lg overflow-hidden border border-aurora-cyan/40">
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

              {/* Image - switches from standard to talking */}
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

            {/* Corner label */}
            <div className="absolute -bottom-1 -right-1 text-[7px] font-mono text-aurora-cyan/60">
              <span className={isTalking ? "text-hud-green" : isTypingComplete ? "text-aurora-cyan" : "text-hud-amber"}>●</span>{" "}
              {isTalking ? "LIVE" : isTypingComplete ? "STANDBY" : "CONNECTING..."}
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 flex flex-col justify-center">
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
            className="w-full py-2 bg-black/60 border border-aurora-cyan/30 rounded font-mono text-xs text-aurora-cyan hover:bg-aurora-cyan/10 hover:border-aurora-cyan/50 transition-colors"
          >
            <span className="text-nebula-purple mr-2">&gt;</span>
            CLOSE_TRANSMISSION
          </button>
        </div>

        {/* Bottom scan line animation */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-aurora-cyan to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
