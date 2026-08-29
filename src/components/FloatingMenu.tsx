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

  useEffect(() => {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentMenuItems]);

  const { triggerReveal } = useReveal();

  const scrollToSection = (id: string) => {
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
            <article className={`border-t sm:border-y sm:border-l h-auto ease-in-out duration-500 rounded-t-[24px] sm:rounded-t-none sm:rounded-l-[24px] flex flex-row sm:flex-col p-3 sm:p-1.5 sm:pr-1 gap-1 w-full sm:w-auto justify-around sm:justify-start backdrop-blur-md ${
              isLight 
                ? "bg-white/95 border-zinc-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] sm:shadow-[-10px_0_30px_rgba(0,0,0,0.04)]" 
                : "bg-[#1a3a5a]/90 border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] sm:shadow-[-10px_0_30px_rgba(0,0,0,0.2)]"
            }`}>
              {currentMenuItems.map((item) => (
                <label
                  key={item.id}
                  className="relative w-12 h-11 sm:w-11 sm:h-11 p-1.5 sm:p-2 ease-in-out duration-300 group flex flex-col items-center justify-center cursor-pointer transition-all rounded-[14px]"
                  htmlFor={item.id}
                >
                  <input
                    id={item.id}
                    name="path"
                    type="radio"
                    className="hidden peer/expand"
                    checked={activeTab === item.id}
                    onChange={() => scrollToSection(item.id)}
                  />
                  <item.icon
                    size={18}
                    className={`transition-all duration-300 group-hover:scale-[1.2] ${
                      activeTab === item.id ? "scale-[1.2] opacity-100" : "opacity-50 group-hover:opacity-100"
                    } ${isLight ? "text-[#0A2947]" : "text-white"}`}
                  />
                  
                  {/* Tooltip for desktop */}
                  <span className={`absolute right-full mr-3 text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-widest shadow-lg ${
                    isLight ? "bg-[#0A2947] text-white" : "bg-white text-[#0A2947]"
                  }`}>
                    {item.label}
                  </span>
                </label>
              ))}
            </article>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
