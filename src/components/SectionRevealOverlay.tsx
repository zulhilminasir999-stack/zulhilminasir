import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface SectionRevealOverlayProps {
  isVisible: boolean;
}

const COLUMNS = [0, 1, 2, 3, 4];

export function SectionRevealOverlay({ isVisible }: SectionRevealOverlayProps) {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <div className="fixed inset-0 z-[99999] pointer-events-none flex w-full h-full overflow-hidden">
          {COLUMNS.map((i) => (
            <motion.div
              key={i}
              className="relative h-full flex-1 bg-white overflow-hidden border-none outline-none"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{
                duration: 0.65,
                ease: [0.76, 0, 0.24, 1],
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
