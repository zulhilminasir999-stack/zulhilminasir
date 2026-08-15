import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef, MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigationType } from "react-router-dom";

interface HoverImageShowcase {
  title: string;
  image: string;
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
  onItemClick?: (item: HoverImageItem, index: number) => void;
}

export function HoverImageList({ items, onItemClick }: HoverImageListProps) {
  const navType = useNavigationType();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(() => {
    const saved = sessionStorage.getItem("capabilities_expanded_index");
    return saved !== null ? parseInt(saved, 10) : null;
  });
  
  useEffect(() => {
    if (expandedIndex !== null) {
      sessionStorage.setItem("capabilities_expanded_index", expandedIndex.toString());
    } else {
      sessionStorage.removeItem("capabilities_expanded_index");
    }
  }, [expandedIndex]);
  const [rotate, setRotate] = useState(0);
  const lastX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
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
      {items.map((item, idx) => {
        const isHovered = hoveredIndex === idx;
        const isExpanded = expandedIndex === idx;

        return (
          <motion.div 
            key={item.label} 
            className="border-b border-zinc-200"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              onMouseEnter={() => setHoveredIndex(idx)}
              onClick={() => {
                const nextExpanded = isExpanded ? null : idx;
                setExpandedIndex(nextExpanded);
              }}
              className={`group relative w-full flex items-center justify-between py-4 sm:py-5 md:py-6 cursor-pointer transition-all duration-500 px-6 sm:px-12 lg:px-16 ${
                (isHovered || isExpanded) ? "bg-[#2563EB]" : "hover:bg-[#2563EB]"
              }`}
            >
              {/* SVG Noise Overlay */}
              {(isHovered || isExpanded) && (
                <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-overlay overflow-hidden">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <filter id={`noiseFilterRow-${idx}`}>
                      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter={`url(#noiseFilterRow-${idx})`} />
                  </svg>
                </div>
              )}

              {/* Left side: Wording */}
              <div className="relative z-10 flex items-center flex-1 min-w-0">
                {/* Text and category */}
                <div className="flex flex-col items-start text-left gap-1 sm:gap-2">
                  <div className={`text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-sans font-medium tracking-tighter transition-colors duration-500 uppercase ${
                    (isHovered || isExpanded) ? "text-white" : "text-[#09090b]"
                  }`}>
                    {item.label}
                  </div>
                  {item.category && (
                    <span 
                      className={`text-[12px] font-mono tracking-wider uppercase transition-all duration-500 transform translate-y-1 group-hover:translate-y-0 font-medium ${
                        (isHovered || isExpanded) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{ color: (isHovered || isExpanded) ? "rgba(255, 255, 255, 0.8)" : "rgb(113, 113, 122)" }}
                    >
                      {item.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Right side: Curly-braced number or arrow icon */}
              <div className="relative z-10 flex items-center justify-end shrink-0 pl-4 select-none min-w-[70px] sm:min-w-[96px]">
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <motion.div
                      key="arrow"
                      initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                      animate={{ opacity: 1, scale: 1, rotate: -45 }}
                      exit={{ opacity: 0, scale: 0.6, rotate: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white bg-white flex items-center justify-center text-[#2563EB]"
                    >
                      <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="arrow-idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`flex items-center justify-center transition-colors duration-500 ${
                        isHovered ? "text-white" : "text-[#2563EB]"
                      }`}
                    >
                      <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10 rotate-90" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
 
            {/* Showcase Dropdown */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: (navType === "POP" && expandedIndex === idx) ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`overflow-hidden transition-colors duration-500 relative ${
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
                      initial={isRestoredFromPop ? false : { opacity: 0, y: 20 }}
                      animate={isExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: isRestoredFromPop ? 0 : 0.1 + sIdx * 0.1, duration: isRestoredFromPop ? 0 : 0.4 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemClick?.(item, idx);
                      }}
                      className="group/card cursor-pointer"
                    >
                      <div className={`aspect-[16/10] overflow-hidden rounded-lg transition-colors duration-500 border mb-4 ${
                        isExpanded 
                          ? "bg-white/5 border-white/10" 
                          : "bg-zinc-100 border-zinc-200"
                      }`}>
                        <img 
                          src={showcase.image} 
                          alt={showcase.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                        />
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
      })}

      {/* Floating preview element */}
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
        className="pointer-events-none fixed top-0 left-0 w-52 h-[260px] sm:w-[260px] sm:h-[325px] md:w-[310px] md:h-[390px] rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)] bg-zinc-100 border-none z-[9999] origin-center"
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
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth ease
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to a high-quality Unsplash image placeholder if the path fails
                  const fallbackUrls = [
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800"
                  ];
                  e.currentTarget.src = fallbackUrls[idx % fallbackUrls.length];
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
