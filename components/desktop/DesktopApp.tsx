"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BootSequence } from "@/components/boot/BootSequence";
import { Desktop } from "./Desktop";
import { WindowProvider } from "./WindowContext";
import { Transmission } from "./Transmission";

export function DesktopApp() {
  const [isBooting, setIsBooting] = useState(true);
  const [showTransmission, setShowTransmission] = useState(false);

  const handleBootComplete = () => {
    setIsBooting(false);
    // Show transmission after short delay
    setTimeout(() => setShowTransmission(true), 500);
  };

  return (
    <WindowProvider>
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        ) : (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>

      {/* Transmission popup */}
      <AnimatePresence>
        {showTransmission && (
          <Transmission onClose={() => setShowTransmission(false)} />
        )}
      </AnimatePresence>
    </WindowProvider>
  );
}
