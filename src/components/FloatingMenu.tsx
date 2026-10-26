import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Briefcase, Wrench, LayoutGrid, Sparkles, ArrowUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { useReveal } from "../context/RevealContext";

const ZNIcon = ({ className, size }: { className?: string; size?: number }) => (
  <div className={`${className} flex items-center justify-center font-sans font-medium text-[11px] tracking-tighter`} style={{ width: size, height: size }}>
    ZN
  </div>
);

const menuItems = [
  { id: "hero", icon: ZNIcon, label: "Home" },
  { id: "services", icon: Sparkles, label: "Services" },
  { id: "integration", icon: Wrench, label: "Software" },
  { id: "capabilities", icon: LayoutGrid, label: "Projects" },
  { id: "about", icon: User, label: "About" },
  { id: "career", icon: Briefcase, label: "Career" }
];

export function FloatingMenu({ visible = true, theme = "light", onNavClick }: { visible?: boolean; theme?: "light" | "dark"; onNavClick?: (targetId: string) => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();
  const [activeTab, setActiveTab] = useState("hero");

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll direction behavior: scrolling down compacts menu & reveals upward arrow button; scrolling upward hides button & restores menu
  useEffect(() => {
    let lastScrollY = Math.max(0, window.scrollY);
    let ticking = false;

    const handleScroll = () => {
      const maxScrollY = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const currentScrollY = Math.min(Math.max(0, window.scrollY), maxScrollY);

      // At the top of the page -> navigation remains at 100% full size & button hidden
      if (currentScrollY <= 20) {
        setIsCompact(false);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      const diff = currentScrollY - lastScrollY;

      // Threshold to prevent flickering from micro scroll movements
      if (Math.abs(diff) >= 6) {
        if (diff > 0) {
          // Scrolling down -> compact mode + show upward arrow button
          setIsCompact(true);
        } else {
          // Scrolling upward -> restore normal mode + hide upward arrow button
          setIsCompact(false);
        }
        lastScrollY = currentScrollY;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    setIsCompact(false);
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentMenuItems = isMobile 
    ? [
        { id: "services", icon: Sparkles, label: "Services" },
        { id: "integration", icon: Wrench, label: "Software" },
        { id: "capabilities", icon: LayoutGrid, label: "Projects" },
        { id: "about", icon: User, label: "About" },
        { id: "career", icon: Briefcase, label: "Career" }
      ]
    : menuItems;

  const isProjectPage = 
    location.pathname.startsWith("/project/") || 
    location.pathname.startsWith("/case-study/") ||
    location.pathname.startsWith("/case-study-project/") ||
    location.pathname.startsWith("/case-studies/");

  useEffect(() => {
    // If we're on a project detail or case study page, the current section is "capabilities" (Projects)
    if (isProjectPage) {
      setActiveTab("capabilities");
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPosition = scrollY + window.innerHeight / 3;
      let currentTab = "hero";

      currentMenuItems.forEach((item) => {
        const secIds = item.id === "about" ? ["about-section"] : [`${item.id}-section`];
        secIds.forEach((secId) => {
          const section = document.getElementById(secId);
          if (section) {
            const rect = section.getBoundingClientRect();
            const top = rect.top + scrollY;
            const bottom = top + section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < bottom) {
              currentTab = item.id;
            }
          }
        });
      });
      setActiveTab(currentTab);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentMenuItems, location.pathname]);

  const { triggerReveal, triggerFullLoading } = useReveal();

  const scrollToSection = (id: string) => {
    // If already in project page, clicking the projects/capabilities tab is disabled
    if (isProjectPage && id === "capabilities") {
      return;
    }

    if (id === "hero") {
      triggerFullLoading(() => {
        if (location.pathname !== "/") {
          navigate("/");
        }
        window.scrollTo({ top: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        setActiveTab("hero");
      });
      return;
    }

    const targetSectionId = `#${id}-section`;
    if (onNavClick) {
      onNavClick(targetSectionId);
      setActiveTab(id);
      return;
    }

    if (location.pathname !== "/") {
      navigate(`/${targetSectionId}`);
      return;
    }

    const element = document.getElementById(targetSectionId.replace('#', ''));
    if (element) {
      const targetY = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetY,
        behavior: "smooth"
      });
      setActiveTab(id);
    }
  };

  return (
    <AnimatePresence>
      {visible && isMobile && (
        <div
          className="md:hidden fixed left-0 right-0 bottom-[calc(10px+env(safe-area-inset-bottom,0px))] z-[100] h-auto pointer-events-none flex justify-center items-center"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row justify-center items-center relative h-auto pointer-events-auto"
          >
            <article
              className={`border border-zinc-200/90 h-auto rounded-[24px] flex flex-row gap-1 w-auto justify-center backdrop-blur-md bg-white/95 origin-bottom transition-[transform,padding,box-shadow] duration-250 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isCompact
                  ? "p-1.5 px-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] scale-[0.88]"
                  : "p-2 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] scale-100"
              }`}
            >
              {currentMenuItems.map((item) => {
                const isSelected = activeTab === item.id;
                const isCurrentDisabled = isProjectPage && item.id === "capabilities";
                return (
                  <label
                    key={item.id}
                    className={`relative group w-12 flex flex-col items-center justify-center transition-all duration-250 rounded-[14px] ${
                      isCompact ? "h-9 p-1" : "h-11 p-1.5"
                    } ${
                      isCurrentDisabled
                        ? "cursor-default pointer-events-none select-none"
                        : "cursor-pointer"
                    }`}
                    htmlFor={isCurrentDisabled ? undefined : item.id}
                    aria-disabled={isCurrentDisabled}
                    onClick={(e) => {
                      if (isCurrentDisabled) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
                    <input
                      id={item.id}
                      name="path"
                      type="radio"
                      className="hidden peer/expand"
                      checked={isSelected}
                      disabled={isCurrentDisabled}
                      onChange={() => {
                        if (!isCurrentDisabled) {
                          scrollToSection(item.id);
                        }
                      }}
                    />
                    <item.icon
                      size={isCompact ? 18 : 20}
                      className={`transition-all duration-250 ${
                        isSelected
                          ? "text-[#2563EB] scale-[1.2] opacity-100"
                          : "text-zinc-400 group-hover:text-zinc-600 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                      }`}
                    />
                  </label>
                );
              })}
            </article>

            <AnimatePresence initial={false}>
              {isCompact && (
                <motion.button
                  key="mobile-scroll-top-btn"
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Scroll to top"
                  initial={{ opacity: 0, scale: 0.6, x: -8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.6, x: -8 }}
                  transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute bottom-0 left-[calc(100%-9px)] w-11 h-11 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-95 text-white border border-white/35 shadow-[0_6px_20px_rgba(37,99,235,0.35)] flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ArrowUp className="w-5 h-5 text-white stroke-[2.25]" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
