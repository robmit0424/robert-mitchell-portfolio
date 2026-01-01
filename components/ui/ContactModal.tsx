"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { personal } from "@/data/personal";

// HUD Corner brackets component
function HUDCorners({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-aurora-cyan opacity-60" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-aurora-cyan opacity-60" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-aurora-cyan opacity-60" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-aurora-cyan opacity-60" />
    </div>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TransmissionState = "idle" | "transmitting" | "success" | "error";

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [transmissionState, setTransmissionState] = useState<TransmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [typedHeader, setTypedHeader] = useState("");
  const fullHeader = "OUTGOING_TRANSMISSION";

  // Typing effect for header
  useEffect(() => {
    if (isOpen) {
      setTypedHeader("");
      let i = 0;
      const interval = setInterval(() => {
        if (i < fullHeader.length) {
          setTypedHeader(fullHeader.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setTransmissionState("idle");
        setErrorMessage("");
      }, 300);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransmissionState("transmitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setTransmissionState("success");

      // Close after success animation
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Transmission error:", error);
      setTransmissionState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Transmission failed. Please try again."
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[3000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-[3001] flex items-center justify-center"
          >
            <div className="relative w-full h-full md:h-auto bg-black/95 border border-aurora-cyan/50 rounded-lg overflow-hidden flex flex-col max-h-full md:max-h-[90vh]">
              <HUDCorners />

              {/* Scanline effect */}
              <motion.div
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aurora-cyan/30 to-transparent pointer-events-none"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />

              {/* Grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(34, 211, 209, 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(34, 211, 209, 0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Header */}
              <div className="relative border-b border-aurora-cyan/30 p-3 md:p-4 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-hud-green animate-pulse flex-shrink-0" />
                    <h3 className="text-sm md:text-lg font-mono font-bold text-aurora-cyan tracking-wider truncate">
                      <span className="text-nebula-purple">&gt;</span> {typedHeader}
                      <span className="animate-pulse">_</span>
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-aurora-cyan transition-colors flex-shrink-0 -mr-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-[10px] font-mono text-text-muted/60 mt-1 ml-4 md:ml-5 truncate">
                  TO: {personal.email}
                </p>
              </div>

              {/* Content */}
              <div className="relative p-4 md:p-6 overflow-y-auto flex-1">
                <AnimatePresence mode="wait">
                  {transmissionState === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 md:py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
                        className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full border-2 border-hud-green flex items-center justify-center"
                        style={{ boxShadow: "0 0 30px rgba(0, 255, 136, 0.5)" }}
                      >
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-hud-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h4 className="text-lg md:text-xl font-mono font-bold text-hud-green tracking-wider mb-2">
                        SENT!
                      </h4>
                      <p className="text-sm font-mono text-text-muted">
                        Message delivered successfully
                      </p>
                    </motion.div>
                  ) : transmissionState === "error" ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 md:py-12"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
                        className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full border-2 border-hud-red flex items-center justify-center"
                        style={{ boxShadow: "0 0 30px rgba(248, 113, 113, 0.5)" }}
                      >
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-hud-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.div>
                      <h4 className="text-lg md:text-xl font-mono font-bold text-hud-red tracking-wider mb-2">
                        FAILED
                      </h4>
                      <p className="text-xs md:text-sm font-mono text-text-muted mb-4 px-4">
                        {errorMessage}
                      </p>
                      <button
                        onClick={() => setTransmissionState("idle")}
                        className="px-6 py-2.5 border border-aurora-cyan/50 text-aurora-cyan font-mono text-sm hover:bg-aurora-cyan/10 transition-colors rounded"
                      >
                        TRY AGAIN
                      </button>
                    </motion.div>
                  ) : transmissionState === "transmitting" ? (
                    <motion.div
                      key="transmitting"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 md:py-12"
                    >
                      {/* Transmission animation */}
                      <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6">
                        <motion.div
                          className="absolute inset-0 border-2 border-aurora-cyan rounded-full"
                          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0 border-2 border-aurora-cyan rounded-full"
                          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                        />
                        <div className="absolute inset-2 border border-aurora-cyan/50 rounded-full flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-aurora-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                      <h4 className="text-base md:text-lg font-mono font-bold text-aurora-cyan tracking-wider mb-2">
                        SENDING...
                      </h4>
                      <div className="flex items-center justify-center gap-1">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 md:w-2 md:h-2 bg-aurora-cyan rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-3 md:space-y-4"
                    >
                      {/* Name field */}
                      <div>
                        <label className="block text-[10px] font-mono text-aurora-cyan/60 uppercase tracking-wider mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder="Enter your name"
                          className="w-full bg-black/50 border border-aurora-cyan/30 rounded px-3 md:px-4 py-2.5 md:py-3 font-mono text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-aurora-cyan transition-colors"
                        />
                      </div>

                      {/* Email field */}
                      <div>
                        <label className="block text-[10px] font-mono text-aurora-cyan/60 uppercase tracking-wider mb-1">
                          Your Email
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="Enter your email"
                          className="w-full bg-black/50 border border-aurora-cyan/30 rounded px-3 md:px-4 py-2.5 md:py-3 font-mono text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-aurora-cyan transition-colors"
                        />
                      </div>

                      {/* Message field */}
                      <div>
                        <label className="block text-[10px] font-mono text-aurora-cyan/60 uppercase tracking-wider mb-1">
                          Message
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={3}
                          placeholder="Enter your message..."
                          className="w-full bg-black/50 border border-aurora-cyan/30 rounded px-3 md:px-4 py-2.5 md:py-3 font-mono text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-aurora-cyan transition-colors resize-none"
                        />
                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        className="group w-full relative bg-aurora-cyan/10 border border-aurora-cyan/50 py-3 md:py-4 font-mono font-bold text-aurora-cyan tracking-wider transition-all duration-300 hover:bg-aurora-cyan/20 hover:border-aurora-cyan rounded-lg"
                      >
                        <span className="flex items-center justify-center gap-2 text-sm md:text-base">
                          <span className="text-nebula-purple">[</span>
                          TRANSMIT_MSG
                          <span className="text-nebula-purple">]</span>
                        </span>
                      </button>

                      {/* Footer info */}
                      <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-text-muted/40 pt-1">
                        <span>ENCRYPTED</span>
                        <span>|</span>
                        <span>SECURE</span>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom status bar */}
              <div className="border-t border-aurora-cyan/20 px-3 md:px-4 py-2 flex items-center justify-between text-[9px] md:text-[10px] font-mono text-text-muted/50 flex-shrink-0">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-hud-green" />
                  <span>ACTIVE</span>
                </div>
                <span>100%</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
