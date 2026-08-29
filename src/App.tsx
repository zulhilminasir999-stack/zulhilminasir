import React, { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CaseStudyPage from "./pages/CaseStudyPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";
import { LoadingScreen } from "./components/LoadingScreen";
import StickyStackScrollDemo from "./components/StickyStackScrollDemo";
import { RevealProvider } from "./context/RevealContext";
import { LenisProvider, useLenis } from "./context/LenisContext";

// Disable browser default scroll restoration to guarantee landing on the top section
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { stop, start, scrollTo } = useLenis();

  // Keep HTML root node synchronized with light theme configuration on mount for all pages
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("light");
    root.classList.remove("dark");
  }, []);

  // Initial loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200); // Slightly more than 2s for smoother transition
    return () => clearTimeout(timer);
  }, []);

  // Coordinate scroll locking with Lenis & document while loading screen is active
  useEffect(() => {
    if (isLoading) {
      stop();
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      start();
      scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLoading, stop, start, scrollTo]);

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
    <LenisProvider>
      <RevealProvider>
        <AppContent />
      </RevealProvider>
    </LenisProvider>
  );
}

