import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Helper function to determine if the background at a given screen coordinate is dark.
 * Walks up the DOM tree from the element at (x, y) and checks computed background colors.
 */
const getIsDarkAtPoint = (x: number, y: number): boolean => {
  try {
    const el = document.elementFromPoint(x, y);
    if (!el) return false;

    let currentEl: HTMLElement | null = el as HTMLElement;
    while (currentEl && currentEl !== document.documentElement) {
      const style = window.getComputedStyle(currentEl);
      const bgColor = style.backgroundColor;

      if (bgColor && bgColor !== "transparent" && bgColor !== "rgba(0, 0, 0, 0)") {
        const rgb = bgColor.match(/\d+/g);
        if (rgb && rgb.length >= 3) {
          const r = parseInt(rgb[0], 10);
          const g = parseInt(rgb[1], 10);
          const b = parseInt(rgb[2], 10);
          const a = rgb[3] !== undefined ? parseFloat(rgb[3]) : 1;

          // If the background is transparent or nearly transparent, keep searching up
          if (a > 0.1) {
            // Perceived luminance formula (ITU-R BT.709)
            const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            return luminance < 140; // True if it's a dark color
          }
        }
      }
      currentEl = currentEl.parentElement;
    }
  } catch (err) {
    // Silent catch to handle any iframe/cross-origin or boundary errors gracefully
  }
  return false;
};

export default function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring physics matching the fluid lag and springiness in the video
  const springConfig = { damping: 22, stiffness: 180, mass: 0.6 };
  const followerX = useSpring(mouseX, springConfig);
  const followerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop/devices with a fine pointer (mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    let lastCheckTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by 4px to center the 8px circle exactly on the cursor
      mouseX.set(e.clientX - 4);
      mouseY.set(e.clientY - 4);
      if (!isVisible) setIsVisible(true);

      // Throttle the DOM inspection slightly to keep it extremely performant (max 30fps checks)
      const now = performance.now();
      if (now - lastCheckTime > 32) {
        lastCheckTime = now;
        const isDark = getIsDarkAtPoint(e.clientX, e.clientY);
        setIsOverDark(isDark);

        try {
          const el = document.elementFromPoint(e.clientX, e.clientY);
          const overHero = el ? !!el.closest("#hero-section") : false;
          setIsOverHero(overHero);
        } catch (err) {
          setIsOverHero(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: followerX,
        y: followerY,
      }}
      className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] transition-colors duration-300 ${
        isOverHero || isOverDark
          ? "bg-white border border-black/10 shadow-[0_0_8px_rgba(255,255,255,0.6)]" 
          : "bg-[#0A2947] border border-white/40"
      }`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 0.9 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    />
  );
}
