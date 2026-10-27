import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const targetSectionIds = [
      "services-section",
      "hover-list-section",
      "capabilities-section",
      "about-section",
      "career-section",
      "creative-approach",
      "creative-approach-section",
      "workflow-section",
    ];

    let ticking = false;
    let rafId = 0;

    const evaluateScroll = () => {
      ticking = false;

      // Hidden on mobile (< 768px), skip heavy DOM queries on small screens
      if (window.innerWidth < 768) {
        return;
      }

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const buttonCenter = scrollY + windowHeight - 56; // 32px bottom + 24px half-height
      const nextVisible = scrollY > 450;

      setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));

      if (!nextVisible) {
        return;
      }

      let inLight = false;
      for (const id of targetSectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + scrollY;
          const bottom = top + el.offsetHeight;
          if (buttonCenter >= top && buttonCenter <= bottom) {
            inLight = true;
            break;
          }
        }
      }

      // Check if on case-study or project detail page (white background above footer)
      const isProjectOrCaseStudy =
        window.location.pathname.startsWith("/case-study") ||
        window.location.pathname.startsWith("/project");

      if (isProjectOrCaseStudy) {
        const footer = document.getElementById("contact-section");
        if (footer) {
          const footerTop = footer.getBoundingClientRect().top + scrollY;
          if (buttonCenter < footerTop) {
            inLight = true;
          }
        } else {
          inLight = true;
        }
      }

      setIsLightSection((prev) => (prev === inLight ? prev : inLight));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(evaluateScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    evaluateScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 40 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className={`hidden md:flex fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full items-center justify-center transition-all duration-500 group cursor-pointer ${
            isLightSection
              ? "bg-[#2563EB] hover:bg-[#1D4ED8] backdrop-blur-xl border border-blue-400/40 shadow-[0_8px_28px_rgba(37,99,235,0.45)] text-white"
              : "bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] text-white"
          }`}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

