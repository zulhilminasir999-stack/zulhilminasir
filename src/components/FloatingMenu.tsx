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
  const isLight = theme === "light";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
        <div className="fixed bottom-0 left-0 right-0 sm:bottom-auto sm:top-1/2 sm:right-0 sm:left-auto sm:-translate-y-1/2 z-[100] h-auto pointer-events-none">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row sm:flex-col justify-center items-center relative transition-all duration-[450ms] ease-in-out h-auto pointer-events-auto"
          >
            <article className="border-t border-zinc-200/80 sm:border-y sm:border-l h-auto ease-in-out duration-500 rounded-t-[24px] sm:rounded-t-none sm:rounded-l-[24px] flex flex-row sm:flex-col p-3 sm:p-1.5 sm:pr-1 gap-1 w-full sm:w-auto justify-around sm:justify-start backdrop-blur-md bg-white/95 sm:bg-white/95 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] sm:shadow-[-10px_0_30px_rgba(0,0,0,0.04)]">
              {currentMenuItems.map((item) => {
                const isSelected = activeTab === item.id;
                const isCurrentDisabled = isProjectPage && item.id === "capabilities";
                return (
                  <label
                    key={item.id}
                    className={`relative w-12 h-11 sm:w-11 sm:h-11 p-1.5 sm:p-2 ease-in-out duration-300 group flex flex-col items-center justify-center transition-all rounded-[14px] ${
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
                      size={20}
                      className={`transition-all duration-300 ${
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
