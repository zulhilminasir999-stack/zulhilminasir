import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, frame, cancelFrame } from "motion/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaseStudyPage from "./pages/CaseStudyPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";
import { LoadingScreen } from "./components/LoadingScreen";
import StickyStackScrollDemo from "./components/StickyStackScrollDemo";
import { RevealProvider } from "./context/RevealContext";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";

// Disable browser default scroll restoration to avoid uncoordinated jumps
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function AppContent() {
  // Show intro loading screen with percentage indicator on full browser reload / initial mount
  const [isLoading, setIsLoading] = useState(true);
  
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
    if (isLoading) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
      const rafId = requestAnimationFrame(() => {
        lenis?.resize();
      });
      return () => cancelAnimationFrame(rafId);
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
        {isLoading && <LoadingScreen key="loader" showPercentage={true} />}
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
  const lenisRef = useRef<LenisRef>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Synchronize Lenis smooth scroll step directly with Framer Motion's frame loop
  // so sticky sections, parallax transforms, and scroll progress stay 100% locked in phase
  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: prefersReducedMotion ? 1 : 0.085,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.2,
        smoothWheel: !prefersReducedMotion,
        syncTouch: false,
        autoResize: true,
        overscroll: true,
      }}
    >
      <RevealProvider>
        <AppContent />
      </RevealProvider>
    </ReactLenis>
  );
}
