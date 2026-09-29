import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaseStudyPage from "./pages/CaseStudyPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";
import { LoadingScreen } from "./components/LoadingScreen";
import StickyStackScrollDemo from "./components/StickyStackScrollDemo";
import { RevealProvider } from "./context/RevealContext";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";

// Disable browser default scroll restoration to avoid uncoordinated jumps
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function AppContent() {
  const location = useLocation();
  
  // Show intro loading screen only on homepage on first mount
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return false;
    }
    return true;
  });
  
  const lenis = useLenis();

  // Keep HTML root node synchronized with light theme configuration on mount for all pages
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("light");
    root.classList.remove("dark");
  }, []);

  // Initial loading timer for homepage
  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Coordinate scroll locking with Lenis & document while loading screen is active
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isLoading) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
      
      if (isMobile) {
        lenis?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      } else {
        // Desktop: Restore saved position on reload if present
        const savedPos = sessionStorage.getItem(`scroll_pos_${window.location.pathname}`);
        if (savedPos) {
          const targetY = parseInt(savedPos, 10);
          if (!isNaN(targetY) && targetY > 0) {
            lenis?.scrollTo(targetY, { immediate: true });
            window.scrollTo(0, targetY);
          }
        }
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLoading, lenis]);

  return (
    <>
      <ScrollToTop />
      <BackToTopButton />
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage isLoading={isLoading} setIsLoading={setIsLoading} />} 
        />
        <Route path="/case-study/:id" element={<CaseStudyPage />} />
        <Route path="/case-study-project/:id" element={<ProjectDetailPage />} />
        <Route path="/case-studies/:id" element={<ProjectDetailPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/scroll-demo" element={<StickyStackScrollDemo />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.2, smoothWheel: true }}>
      <RevealProvider>
        <AppContent />
      </RevealProvider>
    </ReactLenis>
  );
}
