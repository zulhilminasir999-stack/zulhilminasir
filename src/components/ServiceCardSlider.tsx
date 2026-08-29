import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface ServiceCardItem {
  id: string;
  serviceId: string;
  category: string;
  subtitle: string;
  title: string;
  image: string;
  actionText: string;
}

const SERVICES_SLIDES: ServiceCardItem[] = [
  {
    id: "web-design",
    serviceId: "brand",
    category: "Web Design & Dev",
    subtitle: "Why aesthetics alone can't solve real product problems",
    title: "Beyond Visual Appeal",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    actionText: "Read",
  },
  {
    id: "mobile-ux",
    serviceId: "product",
    category: "Mobile UI/UX",
    subtitle: "How structure and hierarchy help users make decisions",
    title: "Designing for Intent",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop",
    actionText: "Read",
  },
  {
    id: "web-system",
    serviceId: "web",
    category: "Web App & System",
    subtitle: "Reframing the 'form follows function' idea for digital product",
    title: "Form With Purpose",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    actionText: "Read",
  },
  {
    id: "ai-native",
    serviceId: "dev",
    category: "AI-native Dev",
    subtitle: "Bridging generative intelligence into deterministic user flows",
    title: "Intelligent Systems",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    actionText: "Read",
  },
  {
    id: "brand-identity",
    serviceId: "content",
    category: "Brand Identity",
    subtitle: "Crafting memorable distinctiveness in crowded SaaS markets",
    title: "Distinctive Presence",
    image: "/a.jpg",
    actionText: "Read",
  },
  {
    id: "packaging",
    serviceId: "motion",
    category: "Packaging Design",
    subtitle: "Tactile resonance between physical and digital touchpoints",
    title: "Tactile Precision",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
    actionText: "Read",
  },
  {
    id: "marketing-visual",
    serviceId: "marketing",
    category: "Marketing Visual Design",
    subtitle: "High-conversion creative systems that scale brand authority",
    title: "Impactful Media",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop",
    actionText: "Read",
  },
];

interface ServiceCardSliderProps {
  onSelectService?: (serviceId: string) => void;
  className?: string;
}

export default function ServiceCardSlider({ onSelectService, className }: ServiceCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const total = SERVICES_SLIDES.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-advance when not interacting
  useEffect(() => {
    if (isHovered || isDragging) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, isDragging, total]);

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
    if (onSelectService) {
      onSelectService(currentItem.serviceId);
    } else {
      const servicesSection = document.getElementById("services-section");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      }
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

  return (
    <div 
      id="service-card-slider-container"
      className={className || "relative z-40 pointer-events-auto"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div id="service-card-deck-stack" className="relative w-[300px] sm:w-[350px] md:w-[380px] lg:w-[400px]">
        
        {/* 3D Stack Deck Tab at Top (Furthest layer) */}
        <div 
          id="service-card-deck-tab-far"
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-[88%] h-4 rounded-t-xl bg-zinc-800/40 border-t border-x border-white/10 backdrop-blur-sm pointer-events-none z-0" 
        />

        {/* 3D Stack Deck Tab at Top (Middle layer) */}
        <div 
          id="service-card-deck-tab-mid"
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[94%] h-4 rounded-t-xl bg-zinc-800/60 border-t border-x border-white/15 backdrop-blur-md pointer-events-none z-10" 
        />

        {/* Permanent Underlying Card Deck Backing - clean frame without text bleed-through */}
        <div 
          id="service-card-underlying-layer"
          className="absolute inset-0 z-10 w-full h-full bg-[#18181b]/70 border border-white/10 rounded-xl sm:rounded-2xl pointer-events-none origin-bottom scale-[0.96] -translate-y-1.5 opacity-90 transition-all duration-200 backdrop-blur-lg"
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
            className="relative z-20 w-full bg-[#18181b]/75 hover:bg-[#1c1c20]/80 backdrop-blur-xl border border-white/15 rounded-xl sm:rounded-2xl p-2 sm:p-2.5 md:p-3 cursor-grab active:cursor-grabbing transition-colors duration-200 group touch-none"
          >
            <div id="service-card-main-content" className="flex items-center gap-3 sm:gap-3.5">
              
              {/* Left Side: Thumbnail Image */}
              <div id="service-card-thumbnail" className="relative w-[90px] h-[90px] sm:w-[105px] sm:h-[105px] md:w-[115px] md:h-[105px] rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-zinc-800 border border-white/10 shadow-inner">
                <img
                  id="service-card-image"
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right Side: Copy & Read CTA */}
              <div id="service-card-info" className="flex flex-col justify-between flex-1 min-w-0 h-[90px] sm:h-[105px] md:h-[105px] py-0.5">
                
                {/* Top Subtitle Hook */}
                <div id="service-card-header-group" className="space-y-1">
                  <p id="service-card-subtitle" className="text-[11px] sm:text-[11.5px] text-zinc-400 font-sans line-clamp-2 leading-snug font-normal tracking-tight">
                    {currentItem.subtitle}
                  </p>
                  
                  {/* Main Title */}
                  <h4 id="service-card-title" className="text-[14px] sm:text-[16px] md:text-[17px] font-sans font-semibold !text-white tracking-tight leading-tight line-clamp-1">
                    {currentItem.title}
                  </h4>
                </div>

                {/* Bottom Row: ↳ Read action link & Slide cue */}
                <div id="service-card-actions-row" className="flex items-center justify-between pt-1">
                  <div id="service-card-read-action" className="flex items-center gap-1.5 !text-white font-medium text-xs sm:text-[13px]">
                    <span className="text-sm leading-none !text-white">↳</span>
                    <span className="tracking-tight !text-white">{currentItem.actionText}</span>
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
