"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { HUDCorners } from "@/components/ui/HUDCorners";

interface DockItem {
  id: string;
  label: string;
  icon: string;
}

interface DockProps {
  minimizedWindows: DockItem[];
  onRestore: (id: string) => void;
}

function DockIcon({ item, onRestore }: { item: DockItem; onRestore: (id: string) => void }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.button
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0, y: 20 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onRestore(item.id)}
      className="flex flex-col items-center gap-1 p-2 hover:bg-white/10 rounded-lg transition-colors group"
    >
      <div className="relative w-10 h-10">
        {!imageError ? (
          <Image
            src={item.icon}
            alt={item.label}
            fill
            className="object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-aurora-cyan/20 rounded-lg text-aurora-cyan font-mono text-lg">
            {item.label[0]}
          </div>
        )}
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-aurora-cyan/30 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
      </div>
      <span className="text-[8px] font-mono text-aurora-cyan/70 group-hover:text-aurora-cyan transition-colors truncate max-w-[60px]">
        {item.label}
      </span>
    </motion.button>
  );
}

export function Dock({ minimizedWindows, onRestore }: DockProps) {
  return (
    <AnimatePresence>
      {minimizedWindows.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000]"
        >
          <div className="relative flex items-center gap-1 px-3 py-2 bg-black/80 backdrop-blur-md border border-aurora-cyan/30 rounded-xl">
            <HUDCorners size="sm" />

            {/* Dock items */}
            <AnimatePresence mode="popLayout">
              {minimizedWindows.map((item) => (
                <DockIcon key={item.id} item={item} onRestore={onRestore} />
              ))}
            </AnimatePresence>

            {/* Dock label */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2">
              <span className="text-[8px] font-mono text-aurora-cyan/50 uppercase tracking-wider">
                Minimized
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
