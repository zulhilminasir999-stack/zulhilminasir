import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { WordsStagger } from "../../registry/spell-ui/words-stagger";

interface ServiceItem {
  id: string;
  title: string;
  image: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-design",
    title: "WEB DESIGN & CMS",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    description: "Custom-crafted high-performance websites built with React, Vite, and flexible CMS integrations. We bridge the gap between creative visual layouts and pixel-perfect front-end architecture to empower content teams and scale seamlessly.",
    ctaText: "View CMS projects",
    ctaLink: "#capabilities-section"
  },
  {
    id: "ui-ux",
    title: "UI/UX DESIGN",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80",
    description: "User-centric design systems, clickable wireframes, and high-fidelity interactive prototypes. We conduct meticulous research and map out seamless user flows that balance intuitive usability with modern, elegant aesthetic precision.",
    ctaText: "Explore UI/UX works",
    ctaLink: "#capabilities-section"
  },
  {
    id: "ai-native-dev",
    title: "AI-NATIVE DEVELOPMENT",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    description: "Architecting intelligent web applications powered by Gemini AI and LLM agents. We blend rapid AI-assisted development with clean TypeScript engineering to ship robust, future-ready digital platforms in record time.",
    ctaText: "Explore AI projects",
    ctaLink: "#capabilities-section"
  },
  {
    id: "brand-identity",
    title: "BRAND IDENTITY",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    description: "Comprehensive brand strategy, visual direction, custom typography pairings, and structured style guides. We shape the complete aesthetic DNA of a business, establishing a confident and highly memorable market presence.",
    ctaText: "See brand systems",
    ctaLink: "#capabilities-section"
  },
  {
    id: "packaging",
    title: "PACKAGING",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    description: "Tactile, sustainable physical packaging designs and photorealistic 3D mockups. We construct brand containers, bottle styling, and custom carton boxes engineered to elevate the unboxing experience and command retail attention.",
    ctaText: "View packaging designs",
    ctaLink: "#capabilities-section"
  },
  {
    id: "visual-design",
    title: "VISUAL DESIGN",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    description: "High-impact brand assets, promotional key visuals, and custom-tailored marketing collateral. We combine traditional graphic design fundamentals with state-of-the-art prompt engineering to construct visuals that command engagement.",
    ctaText: "Discover key visuals",
    ctaLink: "#capabilities-section"
  }
];

const N = SERVICES_DATA.length;
const COPIES = 7;
const CAROUSEL_ITEMS = Array.from({ length: N * COPIES }, (_, i) => ({
  ...SERVICES_DATA[i % N],
  uniqueId: `${SERVICES_DATA[i % N].id}-${i}`,
  originalIndex: i % N,
  trackIndex: i
}));

interface ServicesSectionProps {
  theme?: "light" | "dark";
}

export default function ServicesSection({ theme = "light" }: ServicesSectionProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  
  // Start activeIndex in the middle copy (index 15)
  const [activeIndex, setActiveIndex] = useState(15);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // Measure viewport width dynamically using ResizeObserver
  useEffect(() => {
    if (!viewportRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setViewportWidth(entry.contentRect.width);
      }
    });
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  const handleNext = () => {
    if (!transitionEnabled) return;
    const nextIndex = activeIndex + 1;
    setActiveIndex(nextIndex);

    // If we reach Copy 5 (index 25), teleport back to Copy 2 (index 10) after the transition finishes
    if (nextIndex >= 25) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex(nextIndex - 15); // Teleport back by 15 items
        setTimeout(() => {
          setTransitionEnabled(true);
        }, 50);
      }, 500); // 500ms transition duration
    }
  };

  const handlePrev = () => {
    if (!transitionEnabled) return;
    const prevIndex = activeIndex - 1;
    setActiveIndex(prevIndex);

    // If we go below Copy 2 (index 10), teleport forward to Copy 5 (index 25) after the transition
    if (prevIndex < 10) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex(prevIndex + 15); // Teleport forward by 15 items
        setTimeout(() => {
          setTransitionEnabled(true);
        }, 50);
      }, 500);
    }
  };

  const handleCardClick = (trackIndex: number) => {
    if (!transitionEnabled) return;
    setActiveIndex(trackIndex);

    // Dynamic teleportation to keep the active index in the safe middle zone
    if (trackIndex >= 25) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex(trackIndex - 15);
        setTimeout(() => {
          setTransitionEnabled(true);
        }, 50);
      }, 500);
    } else if (trackIndex < 10) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setActiveIndex(trackIndex + 15);
        setTimeout(() => {
          setTransitionEnabled(true);
        }, 50);
      }, 500);
    }
  };

  // Determine width variables based on screen size
  const isMobile = viewportWidth < 640;
  const gap = isMobile ? 8 : 12;
  
  // Ratios that sum to exactly 1.00 (100% of available width)
  // 1 active + 5 collapsed cards = 6 cards total (5 gaps)
  const thinRatio = isMobile ? 0.06 : 0.07;
  const activeRatio = isMobile ? 0.70 : 0.65;

  const availableWidth = Math.max(viewportWidth - 5 * gap, 280);
  const cardWidthThin = availableWidth * thinRatio;
  const cardWidthActive = availableWidth * activeRatio;

  // The alignment translation:
  // To make the active card's left edge flush with the left boundary of the viewport (x = 0),
  // we translate the track past all activeIndex thin cards and their gaps.
  const translationPx = viewportWidth ? -(activeIndex * (cardWidthThin + gap)) : 0;

  const activeItem = CAROUSEL_ITEMS[activeIndex] || CAROUSEL_ITEMS[15];

  const isDark = theme === "dark";

  return (
    <section 
      id="services-section" 
      className={`relative w-full py-24 transition-colors duration-300 overflow-hidden ${
        isDark 
          ? "bg-zinc-950" 
          : "bg-white"
      }`}
    >
      <div className="w-full px-6 sm:px-12 lg:px-16 mx-auto">
        
        {/* Header Area */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 items-center`}>
          <div className="col-span-1 md:col-span-12 lg:col-span-8 text-center md:text-center lg:text-left">
            <h2 className={`text-5xl md:text-[60px] lg:text-[70px] font-sans font-bold tracking-tighter uppercase leading-[0.85] select-none text-center md:text-center lg:text-left ${
              isDark ? "text-white" : "text-zinc-950"
            }`}>
              <WordsStagger className="text-inherit">
                SERVICES
              </WordsStagger>
              <span className="hidden md:inline lg:hidden"> </span>
              <br className="block md:hidden lg:block" />
              <WordsStagger className="text-inherit" delay={0.35}>
                PROVIDED
              </WordsStagger>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-12 lg:col-span-4">
            <p className={`${
              isDark ? "text-white/75" : "text-zinc-500"
            } text-[14px] leading-relaxed font-sans max-w-sm ml-auto md:max-w-xl lg:max-w-sm text-right`}>
              We deliver high-performance digital experiences and thoughtful design solutions tailored to elevate your business and engage your audience.
            </p>
          </div>
        </div>

        {/* Carousel Slider Viewport Wrapper */}
        <div className="relative group/carousel">
          <div 
            ref={viewportRef} 
            className="relative w-full overflow-hidden rounded-lg"
          >
            <div 
              className="flex items-center h-[340px] sm:h-[380px] md:h-[460px]"
              style={{
                gap: `${gap}px`,
                transform: `translateX(${translationPx}px)`,
                transition: transitionEnabled ? "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
                width: `${CAROUSEL_ITEMS.length * (cardWidthThin + gap)}px`,
                willChange: "transform"
              }}
            >
              {CAROUSEL_ITEMS.map((item) => {
                const isActive = item.trackIndex === activeIndex;
                const cardWidth = isActive ? cardWidthActive : cardWidthThin;
                
                return (
                  <div
                    key={item.uniqueId}
                    onClick={() => handleCardClick(item.trackIndex)}
                    className="relative h-full overflow-hidden cursor-pointer select-none rounded-md md:rounded-lg origin-center flex-shrink-0 group"
                    style={{
                      width: `${cardWidth}px`,
                      transition: transitionEnabled ? "width 500ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
                      willChange: "width"
                    }}
                  >
                    {/* Background Image - Absolutely no distortion */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      style={{ objectPosition: "center center" }}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Subtle vignette gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-zinc-950/20 to-transparent transition-opacity duration-500 ${
                      isActive ? "opacity-100" : "opacity-40"
                    }`} />

                    {/* Card Title Overlay - Located at the bottom left in white */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10 pointer-events-none">
                      <div className="flex flex-col">
                        <span className={`font-sans font-bold tracking-tight uppercase !text-white transition-all duration-500 ease-[0.16,1,0.3,1] block ${
                          isActive 
                            ? "text-lg sm:text-xl md:text-2xl opacity-100" 
                            : "text-[10px] opacity-0 pointer-events-none select-none"
                        }`}>
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Info Paragraph below carousel - Staggered fade in/out on active slide changes */}
        <div className="mt-12 w-full flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          <div className="flex-1 max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.originalIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 text-center md:text-center lg:text-left"
              >
                <p className={`text-sm sm:text-base leading-relaxed max-w-3xl mx-auto lg:mx-0 text-center md:text-center lg:text-left ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}>
                  {activeItem.description}
                </p>
                
                <div className="pt-2 flex justify-center lg:justify-start">
                  <a
                    href={activeItem.ctaLink}
                    onClick={(e) => {
                      const el = document.getElementById(activeItem.ctaLink.substring(1));
                      if (el) {
                        e.preventDefault();
                        // Smooth scroll down to capabilities
                        const lenis = (window as any).lenisInstance;
                        if (lenis) {
                          lenis.scrollTo(el, { duration: 1.2 });
                        } else {
                          el.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase group transition-colors duration-200 cursor-pointer ${
                      isDark 
                        ? "text-emerald-400 hover:text-white" 
                        : "text-[#0A2947] hover:text-emerald-600"
                    }`}
                  >
                    <span>{activeItem.ctaText}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows - Aligned top with description on the right side */}
          <div className="flex items-center justify-center lg:justify-end space-x-3 shrink-0">
            <button
              onClick={handlePrev}
              className={`p-3 rounded-full border active:scale-95 transition-all duration-200 shadow-sm cursor-pointer nav-relocation-btn ${
                isDark 
                  ? "border-zinc-800 bg-zinc-900 text-zinc-300 border-zinc-700" 
                  : "border-zinc-200 bg-white text-zinc-700 border-zinc-300"
              }`}
              aria-label="Previous service"
            >
              <ChevronLeft className="h-5 w-5 transition-colors duration-300" />
            </button>
            <button
              onClick={handleNext}
              className={`p-3 rounded-full border active:scale-95 transition-all duration-200 shadow-sm cursor-pointer nav-relocation-btn ${
                isDark 
                  ? "border-zinc-800 bg-zinc-900 text-zinc-300 border-zinc-700" 
                  : "border-zinc-200 bg-white text-zinc-700 border-zinc-300"
              }`}
              aria-label="Next service"
            >
              <ChevronRight className="h-5 w-5 transition-colors duration-300" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
