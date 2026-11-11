import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import React, { useEffect, useState, useRef, MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigationType } from "react-router-dom";

interface HoverImageShowcase {
  title: string;
  image: string;
  projectId?: string;
  url?: string;
  isComingSoon?: boolean;
}

interface HoverImageItem {
  id?: string;
  label: string;
  image: string;
  category?: string;
  showcases?: HoverImageShowcase[];
}

interface HoverImageListProps {
  items: HoverImageItem[];
  onItemClick?: (item: HoverImageItem, index: number, showcase?: HoverImageShowcase) => void;
  onExpandedChange?: (index: number | null) => void;
}

interface HoverImageListItemProps {
  key?: string | number;
  item: HoverImageItem;
  idx: number;
  isMobile: boolean;
  hoveredIndex: number | null;
  expandedIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
  setExpandedIndex: (idx: number | null) => void;
  onItemClick?: (item: HoverImageItem, index: number, showcase?: HoverImageShowcase) => void;
  navType: string;
}

function HoverImageListItem({
  item,
  idx,
  isMobile,
  hoveredIndex,
  expandedIndex,
  setHoveredIndex,
  setExpandedIndex,
  onItemClick,
  navType,
}: HoverImageListItemProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHeldOnMobile, setIsHeldOnMobile] = useState(false);
  const touchStateRef = useRef<{ startX: number; startY: number; isLongHold: boolean } | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLongHoldEndRef = useRef<number>(0);

  const clearMobileHold = (recordLongHoldEnd = false) => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (recordLongHoldEnd && touchStateRef.current?.isLongHold) {
      lastLongHoldEndRef.current = Date.now();
    }
    touchStateRef.current = null;
    setIsHeldOnMobile(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    if (!touch) return;
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    touchStateRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      isLongHold: false,
    };
    setIsHeldOnMobile(true);
    holdTimerRef.current = setTimeout(() => {
      if (touchStateRef.current) {
        touchStateRef.current.isLongHold = true;
      }
    }, 450);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!isMobile || !touchStateRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const insideBounds =
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom;

    if (!insideBounds) {
      clearMobileHold(false);
      return;
    }

    if (!touchStateRef.current.isLongHold) {
      const dx = touch.clientX - touchStateRef.current.startX;
      const dy = touch.clientY - touchStateRef.current.startY;
      if (Math.hypot(dx, dy) > 12) {
        clearMobileHold(false);
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    clearMobileHold(true);
  };

  const handleTouchCancel = () => {
    if (!isMobile) return;
    clearMobileHold(false);
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
    };
  }, []);

  const isHovered = !isMobile && hoveredIndex === idx;
  const isExpanded = expandedIndex === idx;
  const isBlueActive = isHovered || isExpanded || isHeldOnMobile;

  const handleClick = () => {
    if (isMobile) {
      clearMobileHold(false);
    }
    const nextExpanded = isExpanded ? null : idx;
    setExpandedIndex(nextExpanded);
    if (isMobile) {
      setHoveredIndex(null);
    }
  };

  return (
    <motion.div 
      ref={rowRef}
      className={`w-full border-b transition-colors duration-300 ${
        isExpanded ? "bg-[#2563EB] border-[#2563EB]" : "border-zinc-200"
      }`}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: isMobile ? 0.04 : idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={headerRef}
        onMouseEnter={() => {
          if (!isMobile) {
            setHoveredIndex(idx);
          }
        }}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onContextMenu={(e) => {
          if (isMobile) e.preventDefault();
        }}
        className={`group relative overflow-hidden w-full flex items-center justify-between py-4 sm:py-5 md:py-6 cursor-pointer px-6 sm:px-12 lg:px-16 touch-manipulation select-none max-md:select-none max-md:[-webkit-touch-callout:none] max-md:[-webkit-tap-highlight-color:transparent] ${
          isExpanded ? "bg-[#2563EB]" : ""
        }`}
      >
        {/* Contact-page social-button style modern blue (#2563EB) 2px sweep + bottom-up fill */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 bottom-0 h-[2px] w-full bg-[#2563EB] origin-left transition-transform duration-500 ease-[ease] z-[2] ${
            isBlueActive ? "scale-x-100" : "scale-x-0"
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-[#2563EB] origin-bottom transition-transform duration-300 ease-[ease] z-[1] ${
            isBlueActive ? "scale-y-100" : "scale-y-0"
          }`}
        />

        {/* SVG Noise Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none mix-blend-overlay overflow-hidden z-[2] transition-opacity duration-300 ease-[ease] ${
            isBlueActive ? "opacity-25" : "opacity-0"
          }`}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id={`noiseFilterRow-${idx}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#noiseFilterRow-${idx})`} />
          </svg>
        </div>

        {/* Left side: Wording */}
        <motion.div
          className="relative z-10 flex items-center flex-1 min-w-0"
        >
          {/* Text and category */}
          <div className="flex flex-col items-start text-left gap-1 sm:gap-2">
            <div className={`text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-sans font-semibold tracking-tighter transition-colors duration-300 ease-[ease] uppercase ${
              isBlueActive ? "!text-white" : "text-zinc-700"
            }`}>
              {item.label}
            </div>
            {item.category && (
              <span 
                className={`text-[12px] font-sans tracking-wider uppercase transition-all duration-300 ease-[ease] transform font-medium ${
                  isBlueActive ? "opacity-100 translate-y-0 !text-white/80" : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 text-zinc-500"
                }`}
                style={{ color: isBlueActive ? "rgba(255, 255, 255, 0.8)" : "rgb(113, 113, 122)" }}
              >
                {item.category}
              </span>
            )}
          </div>
        </motion.div>

        {/* Right side: Curly-braced number or arrow icon */}
        <motion.div
          className="relative z-10 flex items-center justify-end shrink-0 pl-4 select-none min-w-[70px] sm:min-w-[96px]"
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="arrow"
                initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: -45 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-center justify-center text-white !text-white"
              >
                <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 !text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="arrow-idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`flex items-center justify-center transition-colors duration-300 ease-[ease] ${
                  isBlueActive ? "!text-white" : "text-[#2563EB]"
                }`}
              >
                <ArrowUpRight className={`w-8 h-8 sm:w-10 sm:h-10 rotate-90 transition-colors duration-300 ${
                  isBlueActive ? "!text-white" : "text-[#2563EB]"
                }`} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Showcase Dropdown */}
      <motion.div
        initial={false}
        onMouseEnter={() => {
          if (!isMobile) {
            setHoveredIndex(null);
          }
        }}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: (navType === "POP" && expandedIndex === idx) ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full overflow-hidden transition-colors duration-300 relative ${
          isExpanded ? "bg-[#2563EB]" : "bg-zinc-50/30"
        }`}
      >
        {/* SVG Noise Overlay for expanded state */}
        {isExpanded && (
          <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay overflow-hidden">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <filter id={`noiseFilterExpanded-${idx}`}>
                <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter={`url(#noiseFilterExpanded-${idx})`} />
            </svg>
          </div>
        )}

        <div className="px-6 sm:px-12 lg:px-16 pb-12 sm:pb-16 pt-2 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {item.showcases?.map((showcase, sIdx) => {
              const isRestoredFromPop = navType === "POP" && expandedIndex === idx;
              return (
              <motion.div
                key={sIdx}
                initial={isRestoredFromPop ? false : { opacity: 0, y: 12 }}
                animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ delay: 0, duration: 0.25, ease: "easeOut" }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (showcase.isComingSoon) return;
                  onItemClick?.(item, idx, showcase);
                }}
                className={`group/card ${showcase.isComingSoon ? "cursor-default select-none" : "cursor-pointer"}`}
              >
                <div className={`aspect-[16/10] overflow-hidden rounded-lg transition-colors duration-500 border mb-4 relative ${
                  isExpanded 
                    ? "bg-white/5 border-white/10" 
                    : "bg-zinc-100 border-zinc-200"
                }`}>
                  <img 
                    src={showcase.image} 
                    alt={showcase.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      showcase.isComingSoon 
                        ? "blur-[6px] brightness-75 scale-105 group-hover/card:scale-110" 
                        : "group-hover/card:scale-110"
                    }`}
                  />
                  {showcase.isComingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-black/25">
                      <span className="font-sans text-sm sm:text-base font-semibold tracking-wider text-white drop-shadow-lg transition-transform duration-300 ease-out scale-100 group-hover/card:scale-75 select-none text-center px-2">
                        Coming Soon...
                      </span>
                    </div>
                  )}
                </div>
                <h4 className="text-[13px] font-sans font-medium transition-colors duration-300 !text-white">
                  {showcase.title}
                </h4>
              </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HoverImageList({ items, onItemClick, onExpandedChange }: HoverImageListProps) {
  const navType = useNavigationType();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(() => {
    const saved = sessionStorage.getItem("capabilities_expanded_index");
    return saved !== null ? parseInt(saved, 10) : null;
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  useEffect(() => {
    if (expandedIndex !== null) {
      sessionStorage.setItem("capabilities_expanded_index", expandedIndex.toString());
    } else {
      sessionStorage.removeItem("capabilities_expanded_index");
    }
    if (onExpandedChange) {
      onExpandedChange(expandedIndex);
    }
  }, [expandedIndex, onExpandedChange]);
  const [rotate, setRotate] = useState(0);
  const lastX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (isMobile) return;
    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;

    // Calculate dynamic rotation based on velocity (deltaX)
    const targetRotate = Math.min(Math.max(deltaX * 0.18, -15), 15);
    setRotate(targetRotate);

    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleMouseLeaveContainer = () => {
    setHoveredIndex(null);
  };

  // Add a tiny spring back to 0 rotation when mouse stops moving
  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => prev * 0.8);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveContainer}
      className="relative w-full border-t border-zinc-200 select-none z-50 transition-all duration-700 ease-[0.16,1,0.3,1] pb-0"
      id="hover-image-list-container"
    >
      {/* Global faint grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="globalNoiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#globalNoiseFilter)" />
        </svg>
      </div>
      {items.map((item, idx) => (
        <HoverImageListItem
          key={item.label}
          item={item}
          idx={idx}
          isMobile={isMobile}
          hoveredIndex={hoveredIndex}
          expandedIndex={expandedIndex}
          setHoveredIndex={setHoveredIndex}
          setExpandedIndex={setExpandedIndex}
          onItemClick={onItemClick}
          navType={navType}
        />
      ))}

      {/* Floating preview element (Desktop only - disabled on mobile) */}
      {!isMobile && (
        <motion.div
          style={{
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: (hoveredIndex !== null && expandedIndex === null) ? 1 : 0.8,
            opacity: (hoveredIndex !== null && expandedIndex === null) ? 1 : 0,
            rotate: rotate,
          }}
          transition={{
            scale: { type: "spring", damping: 25, stiffness: 200 },
            opacity: { duration: 0.25, ease: "easeOut" },
            rotate: { type: "spring", damping: 35, stiffness: 150 },
          }}
          className="pointer-events-none fixed top-0 left-0 hidden sm:block w-52 h-[260px] sm:w-[260px] sm:h-[325px] md:w-[310px] md:h-[390px] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)] bg-zinc-100 border-none z-[9999] origin-center"
        >
          {items.map((item, idx) => {
            const isActive = hoveredIndex === idx;
            return (
              <motion.div
                key={item.label}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.05,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
