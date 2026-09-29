import React, { createContext, useContext, useState, useCallback } from "react";
import { SectionRevealOverlay } from "../components/SectionRevealOverlay";
import { LoadingScreen } from "../components/LoadingScreen";
import { AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";

interface RevealContextType {
  isRevealing: boolean;
  isFullLoading: boolean;
  triggerReveal: (onMidpoint?: () => void) => void;
  triggerFullLoading: (onMidpoint?: () => void) => void;
}

const RevealContext = createContext<RevealContextType>({
  isRevealing: false,
  isFullLoading: false,
  triggerReveal: () => {},
  triggerFullLoading: () => {},
});

export const useReveal = () => useContext(RevealContext);

export const RevealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const [isFullLoading, setIsFullLoading] = useState(false);
  const lenis = useLenis();

  // Page-to-page transition (displays Zulhilmi Nasir animation WITHOUT percentage)
  const triggerReveal = useCallback((onMidpoint?: () => void) => {
    setIsRevealing(true);

    // Midpoint: when 5 curtain columns completely cover viewport (~800ms)
    setTimeout(() => {
      if (onMidpoint) {
        onMidpoint();
      }
      
      // Delay before curtains slide up out of view
      setTimeout(() => {
        setIsRevealing(false);
      }, 300);
    }, 800);
  }, []);

  // Full loading with percentage (triggered on top-left Zulhilmi Nasir / ZN logo click)
  const triggerFullLoading = useCallback((onMidpoint?: () => void) => {
    setIsFullLoading(true);
    lenis?.stop();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Midpoint to navigate and scroll to top
    setTimeout(() => {
      if (onMidpoint) {
        onMidpoint();
      }
    }, 1100);

    // After 2200ms, hide loader, restore scroll and reveal home
    setTimeout(() => {
      setIsFullLoading(false);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
    }, 2200);
  }, [lenis]);

  return (
    <RevealContext.Provider value={{ isRevealing, isFullLoading, triggerReveal, triggerFullLoading }}>
      {children}
      <SectionRevealOverlay isVisible={isRevealing} />
      <AnimatePresence>
        {isFullLoading && <LoadingScreen key="full-loader-manual" showPercentage={true} />}
      </AnimatePresence>
    </RevealContext.Provider>
  );
};
