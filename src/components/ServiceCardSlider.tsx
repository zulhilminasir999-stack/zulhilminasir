import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useReveal } from "../context/RevealContext";

export interface ServiceCardItem {
  id: string;
  serviceId: string;
  category: string;
  subtitle: string;
  title: string;
  image: string;
  url: string;
  actionText: string;
  isComingSoon?: boolean;
}

const SERVICES_SLIDES: ServiceCardItem[] = [
  // 5 Active Case Study Projects
  {
    id: "TGPowerWrap",
    serviceId: "packaging",
    category: "Corporate Website",
    subtitle: "Ultra-premium packaging architecture & corporate platform",
    title: "TG PowerWrap Website",
    image: "/TGPW/tgpw1.jpg",
    url: "/case-study-project/TGPowerWrap",
    actionText: "Explore",
  },
  {
    id: "komorebi-editorial",
    serviceId: "product",
    category: "Mobile UI/UX Design",
    subtitle: "Spatial smart maps and minimalist editorial travel interface",
    title: "Triply | AI-powered\nTravel Companion",
    image: "/Triply/Triply1.jpg",
    url: "/case-study-project/komorebi-editorial",
    actionText: "Explore",
  },
  {
    id: "ck-lighting",
    serviceId: "brand",
    category: "E-Commerce Webstore",
    subtitle: "Engineered high-speed custom CMS webstore & product catalog",
    title: "CK Lighting Online Store",
    image: "/CK Lighting Web/ck1.jpg",
    url: "/case-study-project/ck-lighting",
    actionText: "Explore",
  },
  {
    id: "breeze-cargo",
    serviceId: "product",
    category: "Mobile UI/UX Design",
    subtitle: "High-performance intelligent workout tracking system",
    title: "RepX | AI-powered Fitness",
    image: "/RepX/RepX1.jpg",
    url: "/case-study-project/breeze-cargo",
    actionText: "Explore",
  },
  {
    id: "aistudio-brand",
    serviceId: "web",
    category: "Web App & System",
    subtitle: "Enterprise management dashboard and automated student billing engine",
    title: "Pre-School Fee\nManagement",
    image: "/PFM/PFM1.jpg",
    url: "/case-study-project/aistudio-brand",
    actionText: "Explore",
  },

  // Coming Soon Case Study Projects (No link, purely showcase)
  {
    id: "travel-claim-system",
    serviceId: "web",
    category: "Web App & System",
    subtitle: "Automated mileage receipt scanning & expense reimbursement",
    title: "Travel Claim Management\nSystem",
    image: "/DemoPic/Demo6.png",
    url: "",
    actionText: "Coming Soon",
    isComingSoon: true,
  },
  {
    id: "solareco-website",
    serviceId: "brand",
    category: "Web Dev",
    subtitle: "Sustainable solar portal with dynamic product selectors & savings calculators",
    title: "SolarEco Website Project",
    image: "/DemoPic/Demo1.png",
    url: "",
    actionText: "Coming Soon",
    isComingSoon: true,
  },
  {
    id: "finsight-ai",
    serviceId: "dev",
    category: "AI-Native Dev",
    subtitle: "High-throughput predictive fiscal analytics engine utilizing Gemini models",
    title: "FinSight | AI Financial\nIntelligence",
    image: "/DemoPic/Demo4.png",
    url: "",
    actionText: "Coming Soon",
    isComingSoon: true,
  },
];

interface ServiceCardSliderProps {
  onSelectService?: (serviceId: string) => void;
  className?: string;
  trigger?: boolean;
  delay?: number;
}

export default function ServiceCardSlider({ onSelectService, className, trigger, delay = 0.5 }: ServiceCardSliderProps) {
  const navigate = useNavigate();
  const { triggerReveal } = useReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasRevealedRef = useRef(false);

  const total = SERVICES_SLIDES.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-advance one by one: waits until the card is fully revealed + 3 seconds before first change
  useEffect(() => {
    if (trigger === false) return;
    if (isHovered || isDragging) return;

    // If it hasn't revealed yet, calculate the exact duration of the entrance animation + 3000ms
    const revealAnimationDurationMs = (delay || 0) * 1000 + 850;
    const initialWait = hasRevealedRef.current ? 3000 : (revealAnimationDurationMs + 3000);

    let intervalTimer: NodeJS.Timeout | null = null;
    const initialTimeout = setTimeout(() => {
      hasRevealedRef.current = true;
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);

      intervalTimer = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % total);
      }, 3000);
    }, initialWait);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [trigger, isHovered, isDragging, total, delay]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
    setIsDragging(false);
    const thresholdY = 20;
    const thresholdX = 25;
    const velocityY = info.velocity.y;
    const offsetY = info.offset.y;
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    // Slide down to reveal next card, or swipe up for previous
    if (offsetY > thresholdY || velocityY > 100 || offsetX < -thresholdX || velocityX < -150) {
      nextSlide();
    } else if (offsetY < -thresholdY || velocityY < -100 || offsetX > thresholdX || velocityX > 150) {
      prevSlide();
    }
  };

  const currentItem = SERVICES_SLIDES[currentIndex];

  const handleCardClick = (e: React.MouseEvent) => {
    if (isDragging) return;
    if (currentItem.isComingSoon || !currentItem.url) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (onSelectService) {
      onSelectService(currentItem.serviceId);
    } else if (currentItem.url) {
      triggerReveal(() => {
        navigate(currentItem.url);
      });
    }
  };

  // Downward slide deck transitions with layered physical depth
  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? -16 : 40,
      opacity: 1,
      scale: 0.96,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { type: "spring", stiffness: 450, damping: 28 },
        opacity: { duration: 0.15 },
        scale: { duration: 0.18 },
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? 120 : -70,
      opacity: 0,
      scale: 0.92,
      transition: {
        y: { type: "spring", stiffness: 400, damping: 28 },
        opacity: { duration: 0.15 },
      },
    }),
  };

  // Entrance reveal animation matching WordsStagger ("Agent Experience...")
  const revealVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1], // Smooth cubic-bezier reveal curve
      },
    },
  };

  return (
    <motion.div 
      id="service-card-slider-container"
      className={className || "relative z-40 pointer-events-auto"}
      variants={revealVariants}
      initial="hidden"
      animate={trigger !== undefined ? (trigger ? "visible" : "hidden") : "visible"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div id="service-card-deck-stack" className="relative w-[300px] sm:w-[350px] md:w-[380px] lg:w-[400px]">
        
        {/* 3D Stack Deck Tab at Top (Furthest layer) */}
        <div 
          id="service-card-deck-tab-far"
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-[88%] h-4 rounded-t-xl bg-white/10 border-t border-x border-white/20 backdrop-blur-sm pointer-events-none z-0" 
        />

        {/* 3D Stack Deck Tab at Top (Middle layer) */}
        <div 
          id="service-card-deck-tab-mid"
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[94%] h-4 rounded-t-xl bg-white/15 border-t border-x border-white/25 backdrop-blur-md pointer-events-none z-10" 
        />

        {/* Permanent Underlying Card Deck Backing - clean frame without text bleed-through */}
        <div 
          id="service-card-underlying-layer"
          className="absolute inset-0 z-10 w-full h-full bg-white/15 border border-white/20 rounded-xl sm:rounded-2xl pointer-events-none origin-bottom scale-[0.96] -translate-y-1.5 opacity-90 transition-all duration-200 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]"
        />

        {/* Active Front Draggable Stack Card */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            id="active-service-card"
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 0.98, cursor: "grabbing" }}
            whileTap={{ cursor: "grabbing" }}
            onClick={handleCardClick}
            className={`relative z-20 w-full bg-white/20 hover:bg-white/25 backdrop-blur-2xl border border-white/30 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 md:p-3 transition-colors duration-200 group touch-none shadow-[0_12px_40px_rgba(0,0,0,0.15)] ${
              currentItem.isComingSoon ? "cursor-grab active:cursor-grabbing" : "cursor-pointer active:cursor-grabbing"
            }`}
          >
            <div id="service-card-main-content" className="flex items-center gap-3 sm:gap-3.5">
              
              {/* Left Side: Thumbnail Image */}
              <div id="service-card-thumbnail" className="relative w-[90px] h-[90px] sm:w-[105px] sm:h-[105px] md:w-[115px] md:h-[105px] rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-white/10 border border-white/20 shadow-inner">
                <img
                  id="service-card-image"
                  src={currentItem.image}
                  alt={currentItem.title}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    currentItem.isComingSoon ? "blur-[4px] brightness-75 scale-105" : ""
                  }`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                {currentItem.isComingSoon ? (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-black/35">
                    <div className="flex flex-col items-center justify-center font-sans font-bold text-white text-[13px] sm:text-[14px] leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] select-none text-center">
                      <span>Coming</span>
                      <span>Soon..</span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                )}
              </div>

              {/* Right Side: Copy & Read CTA */}
              <div id="service-card-info" className="flex flex-col justify-between flex-1 min-w-0 h-[90px] sm:h-[105px] md:h-[105px] py-0.5">
                
                {/* Header Group: Title on top of Description */}
                <div id="service-card-header-group" className="space-y-0.5 sm:space-y-1">
                  {/* Main Title */}
                  <h4 id="service-card-title" className="text-[13px] sm:text-[15px] md:text-[16px] font-sans font-semibold !text-white tracking-tight leading-tight line-clamp-2 whitespace-pre-line">
                    {currentItem.title}
                  </h4>

                  {/* Subtitle / Description */}
                  <p id="service-card-subtitle" className="text-[11px] sm:text-[11.5px] text-white/80 font-sans line-clamp-2 leading-snug font-normal tracking-tight">
                    {currentItem.category}
                  </p>
                </div>

                {/* Bottom Row: ↳ Read action link & Slide cue */}
                <div id="service-card-actions-row" className="flex items-center justify-between pt-1">
                  <div id="service-card-read-action" className="flex items-center gap-1.5 !text-white font-medium text-xs sm:text-[13px]">
                    {currentItem.isComingSoon ? (
                      <span className="text-[11px] sm:text-xs text-white/70 italic select-none">Coming Soon</span>
                    ) : (
                      <>
                        <span className="text-sm leading-none !text-white">↳</span>
                        <span className="tracking-tight !text-white">{currentItem.actionText}</span>
                      </>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
