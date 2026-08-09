import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SectionRevealOverlay } from "../components/SectionRevealOverlay";

interface RevealContextType {
  isRevealing: boolean;
  triggerReveal: (onMidpoint?: () => void) => void;
}

const RevealContext = createContext<RevealContextType>({
  isRevealing: false,
  triggerReveal: () => {},
});

export const useReveal = () => useContext(RevealContext);

export const RevealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const location = useLocation();
  const [lastPath, setLastPath] = useState(location.pathname);

  const triggerReveal = useCallback((onMidpoint?: () => void) => {
    setIsRevealing(true);

    // Midpoint: when 5 curtain columns completely cover viewport (~380ms)
    setTimeout(() => {
      if (onMidpoint) {
        onMidpoint();
      }
      
      // Delay before curtains slide up out of view (~120ms after midpoint)
      setTimeout(() => {
        setIsRevealing(false);
      }, 120);
    }, 380);
  }, []);

  return (
    <RevealContext.Provider value={{ isRevealing, triggerReveal }}>
      {children}
      <SectionRevealOverlay isVisible={isRevealing} />
    </RevealContext.Provider>
  );
};
