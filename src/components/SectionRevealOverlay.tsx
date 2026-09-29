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
        <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden flex flex-col justify-center items-center">
          {/* 5 Vertical Staggered Column Curtains */}
          <div className="absolute inset-0 flex w-full h-full pointer-events-none">
            {COLUMNS.map((i) => (
              <motion.div
                key={i}
                className="h-full flex-1 bg-[#2563EB]"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{
                  duration: 0.75,
                  ease: [0.76, 0, 0.24, 1],
                  delay: i * 0.04,
                }}
              />
            ))}
          </div>

          {/* Center "Zulhilmi Nasir..." Loading Animation (Without percentage) */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center w-full h-full p-6 sm:p-10 md:p-16 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
          >
            <div className="loader" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
