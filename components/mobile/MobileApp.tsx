"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BootSequence } from "@/components/boot/BootSequence";
import { MobileLayout } from "./MobileLayout";
import { MobileTransmission } from "./MobileTransmission";

export function MobileApp() {
  const [isBooting, setIsBooting] = useState(true);
  const [showTransmission, setShowTransmission] = useState(false);

  const handleBootComplete = () => {
    setIsBooting(false);
    // Show transmission after short delay
    setTimeout(() => setShowTransmission(true), 500);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        ) : (
          <MobileLayout key="mobile" />
        )}
      </AnimatePresence>

      {/* Transmission popup */}
      <AnimatePresence>
        {showTransmission && (
          <MobileTransmission onClose={() => setShowTransmission(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
