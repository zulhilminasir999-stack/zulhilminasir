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

// Disable browser default scroll restoration to guarantee landing on the top section
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

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

  // Prevent scrolling while loading screen is active so user sees first section on complete
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <RevealProvider>
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
    </RevealProvider>
  );
}
