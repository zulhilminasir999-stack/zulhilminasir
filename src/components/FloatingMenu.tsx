import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Briefcase, Wrench, LayoutGrid, Mail, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [activeTab, setActiveTab] = useState("hero");

  const [isMobile, setIsMobile] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Instagram-style scroll behavior: scroll down shrinks/compacts bar, scroll up restores full size, top is 100%
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // At the top of the page -> navigation remains at 100% full size
      if (currentScrollY <= 20) {
        setIsCompact(false);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      const diff = currentScrollY - lastScrollY;

      // Threshold to prevent flickering from small/micro scroll movements
      if (Math.abs(diff) >= 8) {
        if (diff > 0) {
          // Scrolling down -> compact mode
          setIsCompact(true);
        } else {
          // Scrolling up -> restore to normal/full size
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

  const { triggerReveal } = useReveal();

  const scrollToSection = (id: string) => {
    // If already in project page, clicking the projects/capabilities tab is disabled
    if (isProjectPage && id === "capabilities") {
      return;
    }

    const targetSectionId = id === "hero" ? "#hero-section" : `#${id}-section`;
    if (onNavClick) {
      onNavClick(targetSectionId);
      setActiveTab(id);
      return;
    }

    triggerReveal(() => {
      if (location.pathname !== "/") {
        navigate(`/${targetSectionId}`);
        return;
      }

      const element = document.getElementById(targetSectionId.replace('#', ''));
      if (element) {
        const targetY = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: targetY,
          behavior: "instant" as ScrollBehavior
        });
        setActiveTab(id);
      }
    });
  };

  return (
    <AnimatePresence>
      {visible && isMobile && (
        <div 
          className="fixed left-0 right-0 sm:bottom-auto sm:top-1/2 sm:right-0 sm:left-auto sm:-translate-y-1/2 z-[100] h-auto pointer-events-none flex justify-center items-center px-4"
          style={{
            bottom: isMobile ? "calc(10px + env(safe-area-inset-bottom, 0px))" : undefined
          }}
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row sm:flex-col justify-center items-center relative transition-all duration-[450ms] ease-in-out h-auto pointer-events-auto"
          >
            <article 
              className={`border border-zinc-200/90 sm:border-y sm:border-l sm:border-r-0 h-auto rounded-[24px] sm:rounded-t-none sm:rounded-l-[24px] sm:rounded-r-none flex flex-row sm:flex-col gap-1 w-auto justify-center sm:justify-start backdrop-blur-md bg-white/95 sm:bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.12)] sm:shadow-[-10px_0_30px_rgba(0,0,0,0.04)] origin-bottom ${
                isMobile && isCompact 
                  ? "p-1.5 px-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)] scale-[0.88]" 
                  : "p-2 px-3 sm:p-1.5 sm:pr-1 scale-100"
              }`}
              style={{
                transformOrigin: "bottom center",
                transition: "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), padding 0.25s ease, box-shadow 0.25s ease"
              }}
            >
              {currentMenuItems.map((item) => {
                const isSelected = activeTab === item.id;
                const isCurrentDisabled = isProjectPage && item.id === "capabilities";
                return (
                  <label
                    key={item.id}
                    className={`relative w-12 sm:w-11 group flex flex-col items-center justify-center transition-all duration-[250ms] rounded-[14px] ${
                      isMobile && isCompact ? "h-9 p-1" : "h-11 sm:h-11 p-1.5 sm:p-2"
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
                      size={isMobile && isCompact ? 18 : 20}
                      className={`transition-all duration-[250ms] ${
                        isSelected 
                          ? "text-[#2563EB] scale-[1.2] opacity-100" 
                          : "text-zinc-400 group-hover:text-zinc-600 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                      }`}
                    />
                    
                    {/* Tooltip for desktop */}
                    <span className="absolute right-full mr-3 text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-widest shadow-lg bg-[#0A2947] text-white">
                      {item.label}
                    </span>
                  </label>
                );
              })}
            </article>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
