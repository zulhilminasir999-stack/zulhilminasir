"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Match the ~2s loading duration from App.tsx
    const duration = 2000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const columns = [0, 1, 2, 3, 4];

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden">
      {/* 5 Vertical Staggered Column Curtains */}
      <div className="absolute inset-0 flex w-full h-full">
        {columns.map((i) => (
          <motion.div
            key={i}
            className="h-full flex-1 bg-[#fafafa]"
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Foreground Content: Logo and Percentage Counter */}
      <motion.div
        className="relative z-10 flex flex-col justify-between w-full h-full p-6 sm:p-10 md:p-16 pointer-events-auto"
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Logo Animation */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="loader"></div>
        </div>

        {/* Percentage Counter Animation */}
        <div className="relative w-full h-24 sm:h-28 md:h-36">
          <motion.div
            initial={{ left: "0%", x: "0%", opacity: 0 }}
            animate={{ left: "100%", x: "-100%", opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 flex items-center justify-start w-fit whitespace-nowrap"
          >
            <span 
              className="text-6xl sm:text-7xl md:text-9xl font-normal italic tracking-tight select-none font-serif"
              style={{ 
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                color: '#0A2947',
                filter: 'drop-shadow(0 4px 6px rgba(10, 41, 71, 0.2))'
              }}
            >
              {Math.round(progress)}%
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

