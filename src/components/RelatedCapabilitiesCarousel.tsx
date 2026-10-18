import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useReveal } from "../context/RevealContext";

export interface CarouselCaseItem {
  id: string;
  slugTitle: string;
  displayTitle: string;
  type: string;
  description: string;
  role: string;
  image: string;
  url: string;
  isProject?: boolean;
  isComingSoon?: boolean;
}

const ALL_CAROUSEL_CASES: CarouselCaseItem[] = [
  {
    id: "TGPowerWrap",
    slugTitle: "TG PowerWrap - Packaging & Web",
    displayTitle: "TG PowerWrap Website",
    type: "Packaging & Web",
    description: "Ultra-premium packaging architecture and responsive corporate web platform engineered with AI-assisted 3D mockups and precision vector blueprints.",
    role: "CREATOR / LEAD DESIGNER / VIBE-CODER",
    image: "/TGPW/tgpw1.jpg",
    url: "/case-study-project/TGPowerWrap",
    isProject: true,
  },
  {
    id: "breeze-cargo",
    slugTitle: "RepX - AI Fitness Tracker",
    displayTitle: "RepX | AI-Powered Fitness",
    type: "Mobile UI/UX",
    description: "Designed a high-performance, intelligent fitness tracking application with real-time biometric metrics and high-contrast dark aesthetic layouts.",
    role: "PRODUCT DESIGNER / UI-UX LEAD",
    image: "/RepX/RepX1.jpg",
    url: "/case-study-project/breeze-cargo",
    isProject: true,
  },
  {
    id: "ck-lighting",
    slugTitle: "CK Lighting - E-Commerce Platform",
    displayTitle: "CK Lighting Online Store",
    type: "Web Dev",
    description: "Engineered high-speed custom CMS webstore with dynamic product catalogs, optimized checkout flow, and 100% responsive fluid mobile layouts.",
    role: "LEAD DESIGNER / FULL-STACK",
    image: "/CK Lighting Web/ck1.jpg",
    url: "/case-study-project/ck-lighting",
    isProject: true,
  },
  {
    id: "komorebi-editorial",
    slugTitle: "Triply - AI Travel Companion",
    displayTitle: "Triply | AI Travel Companion",
    type: "Mobile UI/UX",
    description: "Crafted intuitive travel itineraries, spatial smart maps, and minimalist editorial interface design inspired by modern Swiss asymmetrical grids.",
    role: "CO-DESIGN LEAD / PRODUCT DESIGNER",
    image: "/Triply/Triply1.jpg",
    url: "/case-study-project/komorebi-editorial",
    isProject: true,
  },
  {
    id: "aistudio-brand",
    slugTitle: "Tadika Mesra - School Fee System",
    displayTitle: "Pre-School Fee Management",
    type: "Web App & System",
    description: "Enterprise management dashboard and automated student billing engine structured to clarify dense information hierarchies for non-technical teams.",
    role: "FULL-STACK ARCHITECT / LEAD DESIGNER",
    image: "/PFM/PFM1.jpg",
    url: "/case-study-project/aistudio-brand",
    isProject: true,
  },
  {
    id: "finsight-ai",
    slugTitle: "KertasDagang - Intelligent Finance",
    displayTitle: "KertasDagang | Intelligent Finance for Everyone",
    type: "AI-Native Dev",
    description: "High-throughput predictive fiscal analytics engine utilizing Gemini models for real-time market sentiment synthesis.",
    role: "CREATOR / AI ENGINEER",
    image: "/DemoPic/Demo4.png",
    url: "#",
    isProject: true,
    isComingSoon: true,
  },
  {
    id: "smart-copilot",
    slugTitle: "Smart Copilot - Agentic Assistant",
    displayTitle: "Smart Copilot Assistant",
    type: "AI-Native Dev",
    description: "Autonomous reasoning assistant automating complex multi-step user workflows through responsive client-side tooling.",
    role: "AI ARCHITECT / VIBE-CODER",
    image: "/DemoPic/Demo3.png",
    url: "#",
    isProject: true,
    isComingSoon: true,
  },
  {
    id: "genai-orchestrator",
    slugTitle: "GenAI Orchestrator - Workflow Pipeline",
    displayTitle: "GenAI Workflow Orchestrator",
    type: "AI-Native Dev",
    description: "Composable multi-agent pipeline orchestrating automated design iterations and data transformations.",
    role: "AI SYSTEM ARCHITECT",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    url: "#",
    isProject: true,
    isComingSoon: true,
  },
  {
    id: "solareco-website",
    slugTitle: "SolarEco - Renewable Energy Web",
    displayTitle: "SolarEco Website Project",
    type: "Web Dev",
    description: "Sustainable solar portal featuring responsive dynamic product selectors and carbon offset calculators.",
    role: "LEAD DESIGNER / FRONT-END",
    image: "/DemoPic/Demo1.png",
    url: "#",
    isProject: true,
    isComingSoon: true,
  },
  {
    id: "ai-workspace-apps",
    slugTitle: "AI Workspace - Productivity Suite",
    displayTitle: "AI Workspace Apps",
    type: "UI/UX",
    description: "Contextual productivity canvas integrating real-time intelligence feeds, smart prompt cards, and fluid workspace switching.",
    role: "PRODUCT DESIGNER / UI-UX LEAD",
    image: "/DemoPic/Demo2.png",
    url: "#",
    isProject: true,
    isComingSoon: true,
  },
  {
    id: "travel-claim-system",
    slugTitle: "Travel Claim - Expense Management",
    displayTitle: "Travel Claim Management System",
    type: "Web App & System",
    description: "Automated mileage receipt scanning, enterprise budget approval matrix, and multi-currency employee reimbursement.",
    role: "FULL-STACK LEAD / ARCHITECT",
    image: "/DemoPic/Demo6.png",
    url: "#",
    isProject: true,
    isComingSoon: true,
  },
  {
    id: "analytics-hub",
    slugTitle: "Analytics Hub - Realtime Reporting",
    displayTitle: "Analytics Management Hub",
    type: "Web App & System",
    description: "Live multi-tenant telemetry reporting engine with interactive chart matrices and high-velocity database streams.",
    role: "FULL-STACK ARCHITECT",
    image: "/DemoPic/Demo3.png",
    url: "#",
    isProject: true,
    isComingSoon: true,
  },
  {
    id: "atelier-luxe",
    slugTitle: "Atelier Luxe - Identity Manual",
    displayTitle: "Atelier Botanical Floral Monogram",
    type: "Brand Identity",
    description: "Designed a complete custom-illustrated visual monogram logo, letterpress stationery matrices, and tactile layout system for eco-boutique skin care.",
    role: "LEAD DESIGNER / ART DIRECTOR",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
    url: "#",
    isProject: true,
    isComingSoon: true,
  },
  {
    id: "helios-exhibition",
    slugTitle: "Helios Biennale - Brutalist Series",
    displayTitle: "Helios Architectural Poster Series",
    type: "Visual Design",
    description: "Collection of high-concept graphic posters displaying striking monochromatic chiaroscuro geometry and safety-orange typographical layers.",
    role: "ART DIRECTOR / VISUAL DESIGNER",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    url: "#",
    isProject: true,
    isComingSoon: true,
  },
  {
    id: "brand-identity",
    slugTitle: "Atelier Luxe - Brand Architecture",
    displayTitle: "Brand Strategy & Visual Systems",
    type: "Brand Identity",
    description: "Comprehensive visual identity matrices, bespoke typographic glyphs, and timeless vector guidelines guaranteeing multi-channel brand presence.",
    role: "LEAD DESIGNER / ART DIRECTOR",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study/brand-identity",
    isProject: false,
    isComingSoon: true,
  },
  {
    id: "packaging",
    slugTitle: "Carton Craft - Packaging Print",
    displayTitle: "Structural Packaging & Print Craft",
    type: "Packaging",
    description: "Engineering precision carton flat-patterns, tactile embossing finishes, and photo-realistic 3D product renders ready for manufacturing.",
    role: "PRODUCT DESIGNER / PACKAGING SPECIALIST",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study/packaging",
    isProject: false,
    isComingSoon: true,
  },
  {
    id: "visual-design",
    slugTitle: "Helios Matrix - Visual Composition",
    displayTitle: "High-Impact Visual Art & Composition",
    type: "Visual Design",
    description: "Curating shape, chiaroscuro lighting, and negative space to engineer museum-grade digital artwork and Swiss typographical posters.",
    role: "ART DIRECTOR / VISUAL DESIGNER",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study/visual-design",
    isProject: false,
    isComingSoon: true,
  }
];

// Similarity mapping for featured projects relative to each capability or project
const SIMILARITY_MAP: Record<string, string[]> = {
  "web-design-cms": ["ck-lighting", "TGPowerWrap", "aistudio-brand", "breeze-cargo", "komorebi-editorial", "solareco-website", "travel-claim-system", "analytics-hub", "finsight-ai", "smart-copilot"],
  "ui-ux": ["breeze-cargo", "komorebi-editorial", "aistudio-brand", "ck-lighting", "TGPowerWrap", "ai-workspace-apps", "travel-claim-system", "analytics-hub", "finsight-ai", "smart-copilot"],
  "web-app-system": ["aistudio-brand", "ck-lighting", "breeze-cargo", "komorebi-editorial", "TGPowerWrap", "travel-claim-system", "analytics-hub", "finsight-ai", "smart-copilot"],
  "ai-native-development": ["breeze-cargo", "komorebi-editorial", "aistudio-brand", "ck-lighting", "TGPowerWrap", "finsight-ai", "smart-copilot", "genai-orchestrator", "travel-claim-system", "analytics-hub"],
  "brand-identity": ["TGPowerWrap", "ck-lighting", "breeze-cargo", "komorebi-editorial", "aistudio-brand", "atelier-luxe", "finsight-ai", "travel-claim-system", "analytics-hub", "smart-copilot"],
  "packaging": ["TGPowerWrap", "ck-lighting", "breeze-cargo", "komorebi-editorial", "aistudio-brand", "atelier-luxe", "travel-claim-system", "analytics-hub", "finsight-ai", "smart-copilot"],
  "visual-design": ["TGPowerWrap", "komorebi-editorial", "breeze-cargo", "ck-lighting", "aistudio-brand", "helios-exhibition", "finsight-ai", "travel-claim-system", "analytics-hub", "smart-copilot"],

  "TGPowerWrap": ["ck-lighting", "breeze-cargo", "komorebi-editorial", "aistudio-brand", "solareco-website", "travel-claim-system", "analytics-hub", "finsight-ai", "smart-copilot", "genai-orchestrator"],
  "breeze-cargo": ["komorebi-editorial", "aistudio-brand", "ck-lighting", "TGPowerWrap", "ai-workspace-apps", "travel-claim-system", "analytics-hub", "finsight-ai", "smart-copilot", "genai-orchestrator"],
  "ck-lighting": ["TGPowerWrap", "aistudio-brand", "breeze-cargo", "komorebi-editorial", "solareco-website", "travel-claim-system", "analytics-hub", "finsight-ai", "smart-copilot", "genai-orchestrator"],
  "komorebi-editorial": ["breeze-cargo", "aistudio-brand", "ck-lighting", "TGPowerWrap", "ai-workspace-apps", "travel-claim-system", "analytics-hub", "finsight-ai", "smart-copilot", "genai-orchestrator"],
  "aistudio-brand": ["ck-lighting", "breeze-cargo", "komorebi-editorial", "TGPowerWrap", "travel-claim-system", "analytics-hub", "finsight-ai", "smart-copilot", "genai-orchestrator"],
  "atelier-luxe": ["TGPowerWrap", "ck-lighting", "breeze-cargo", "komorebi-editorial", "aistudio-brand", "finsight-ai", "smart-copilot", "travel-claim-system", "analytics-hub", "genai-orchestrator"],
  "helios-exhibition": ["TGPowerWrap", "komorebi-editorial", "breeze-cargo", "ck-lighting", "aistudio-brand", "finsight-ai", "smart-copilot", "travel-claim-system", "analytics-hub", "genai-orchestrator"],
};

interface RelatedCapabilitiesCarouselProps {
  currentId?: string;
}

export default function RelatedCapabilitiesCarousel({ currentId }: RelatedCapabilitiesCarouselProps) {
  const navigate = useNavigate();
  const { triggerReveal } = useReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleWidthRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const hasDraggedRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const startMotionXRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const activeAnimationRef = useRef<{ stop: () => void } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);

  // Featured works that already exist arranged earlier, followed by coming soon projects
  const orderedCases = useMemo(() => {
    const preferredOrder = currentId && SIMILARITY_MAP[currentId] ? SIMILARITY_MAP[currentId] : [];

    const sortByPreferred = (a: CarouselCaseItem, b: CarouselCaseItem) => {
      const indexA = preferredOrder.indexOf(a.id);
      const indexB = preferredOrder.indexOf(b.id);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    };

    // 1. Featured works that already exist (not coming soon)
    const existingWorks = ALL_CAROUSEL_CASES
      .filter((item) => !item.isComingSoon && item.id !== currentId)
      .sort(sortByPreferred);

    // 2. Coming soon projects continuing after the existing works
    const comingSoonWorks = ALL_CAROUSEL_CASES
      .filter((item) => item.isComingSoon && item.id !== currentId)
      .sort(sortByPreferred);

    return [...existingWorks, ...comingSoonWorks];
  }, [currentId]);

  // Repeated 3 times for a continuous seamless loop
  const duplicatedCases = useMemo(() => {
    return [...orderedCases, ...orderedCases, ...orderedCases];
  }, [orderedCases]);

  // Measure single track width and initialize x to the middle set for seamless bidirectional infinite scrolling
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const fullW = trackRef.current.scrollWidth;
        const singleW = fullW / 3;
        singleWidthRef.current = singleW;
        if (x.get() === 0 && singleW > 0) {
          x.set(-singleW);
        }
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const timer1 = setTimeout(measure, 150);
    const timer2 = setTimeout(measure, 500);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [duplicatedCases, x]);

  // Helper to wrap x position seamlessly inside the middle duplicated segment
  const wrapPosition = (pos: number) => {
    const width = singleWidthRef.current;
    if (width <= 0) return pos;
    let next = pos;
    while (next <= -2 * width) next += width;
    while (next > -width) next -= width;
    return next;
  };

  // Button slide controls: slides card-by-card in an endless repeatable loop
  const handleSlide = (direction: "left" | "right") => {
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
    }
    const width = singleWidthRef.current;
    if (width <= 0) return;
    const cardEl = trackRef.current?.children[0] as HTMLElement | undefined;
    const cardWidthWithGap = cardEl ? cardEl.offsetWidth + 32 : 460;
    const delta = direction === "right" ? -cardWidthWithGap : cardWidthWithGap;
    const targetX = x.get() + delta;

    activeAnimationRef.current = animate(x, targetX, {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (width > 0) {
          if (latest <= -2 * width) {
            x.set(latest + width);
          } else if (latest > -width) {
            x.set(latest - width);
          }
        }
      },
    });
  };

  // Pointer drag controls: supports smooth infinite repeatable sliding via mouse or touch
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if (activeAnimationRef.current) {
      activeAnimationRef.current.stop();
    }
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    startMotionXRef.current = x.get();
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = now - lastTimeRef.current;
    if (dt > 0) {
      velocityRef.current = (e.clientX - lastXRef.current) / dt;
      lastXRef.current = e.clientX;
      lastTimeRef.current = now;
    }

    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) > 5) {
      hasDraggedRef.current = true;
    }
    const nextX = wrapPosition(startMotionXRef.current + delta);
    x.set(nextX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    setTimeout(() => {
      hasDraggedRef.current = false;
    }, 120);

    const width = singleWidthRef.current;
    const v = velocityRef.current;
    if (Math.abs(v) > 0.15 && width > 0) {
      const momentumDistance = v * 280;
      const targetX = x.get() + momentumDistance;
      activeAnimationRef.current = animate(x, targetX, {
        duration: Math.min(1.2, Math.max(0.4, Math.abs(momentumDistance) / 600)),
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => {
          if (width > 0) {
            if (latest <= -2 * width) {
              x.set(latest + width);
            } else if (latest > -width) {
              x.set(latest - width);
            }
          }
        },
      });
    }
  };

  // Trackpad / Horizontal wheel support
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) > 2) {
      const nextX = wrapPosition(x.get() - delta);
      x.set(nextX);
    }
  };

  const handleCardClick = (e: React.MouseEvent, item: CarouselCaseItem) => {
    e.preventDefault();
    if (item.isComingSoon) return;
    // Do not trigger click if user dragged the track
    if (hasDraggedRef.current) return;
    triggerReveal(() => {
      navigate(item.url);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  };

  return (
    <div 
      ref={containerRef}
      id="capabilities-section"
      className="relative w-full bg-white z-50 select-none py-12 sm:py-16 md:py-20 overflow-hidden"
    >
      {/* Header Bar with Slide Navigation Buttons */}
      <div className="w-full px-6 sm:px-12 lg:px-16 flex items-center justify-between mb-8 sm:mb-10 md:mb-12">
        <div className="space-y-1">
          <h4 className="font-sans font-medium text-2xl sm:text-3xl tracking-tight text-zinc-900 uppercase">
            Related Capabilities
          </h4>
        </div>

        {/* Slide Controls (Prev / Next) - Hidden on mobile device, visible on desktop */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => handleSlide("left")}
            aria-label="Previous capability"
            className="hidden sm:flex w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-zinc-200 hover:border-zinc-900 bg-white hover:bg-zinc-900 text-zinc-700 hover:text-white transition-all duration-300 items-center justify-center cursor-pointer shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => handleSlide("right")}
            aria-label="Next capability"
            className="hidden sm:flex w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-zinc-200 hover:border-zinc-900 bg-white hover:bg-zinc-900 text-zinc-700 hover:text-white transition-all duration-300 items-center justify-center cursor-pointer shadow-sm active:scale-95"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Freely Draggable & Repeatedly Slideable Carousel Track */}
      <div 
        className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing touch-pan-y"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <motion.div 
          ref={trackRef}
          style={{ x }}
          className="flex items-stretch gap-6 sm:gap-8 md:gap-10 w-max pl-6 sm:pl-12 lg:pl-16 select-none"
        >
          {duplicatedCases.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              onClick={(e) => handleCardClick(e, item)}
              className={`group w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] shrink-0 bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-400/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col overflow-hidden select-none ${
                item.isComingSoon ? "cursor-default" : "cursor-pointer"
              }`}
            >
              {/* Media Thumbnail Container with subtle hover zoom */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100 border-b border-zinc-100 relative">
                <img 
                  src={item.image} 
                  alt={item.displayTitle}
                  className={`w-full h-full object-cover transition-all duration-700 pointer-events-none ${
                    item.isComingSoon 
                      ? "blur-[6px] brightness-75 scale-105 group-hover:scale-110" 
                      : "group-hover:scale-[1.03]"
                  }`}
                  referrerPolicy="no-referrer"
                  draggable={false}
                />
                
                {/* If Coming Soon: Animated Coming Soon... Center Overlay */}
                {item.isComingSoon ? (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 bg-black/25">
                    <span className="font-sans text-sm sm:text-base font-semibold tracking-wider text-white drop-shadow-lg transition-transform duration-300 ease-out scale-100 group-hover:scale-75 select-none text-center px-2">
                      Coming Soon...
                    </span>
                  </div>
                ) : (
                  /* Modern Blue Rounded Rectangle "View Case Study" Badge on Hover */
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center pointer-events-none">
                    <div className="bg-[#2563EB] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-sans font-medium tracking-normal flex items-center gap-2 shadow-[0_8px_24px_rgba(37,99,235,0.45)] transform scale-90 group-hover:scale-100 transition-all duration-300">
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

              {/* Card Content Anatomy */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
                <div className="space-y-1.5">
                  {/* Case Study Title in Satoshi font */}
                  <h5 
                    className="font-satoshi text-sm sm:text-base font-semibold text-zinc-900 tracking-tight leading-snug group-hover:text-[#2563EB] transition-colors"
                    style={{ fontFamily: "var(--font-satoshi), 'Satoshi', system-ui, sans-serif" }}
                  >
                    {item.slugTitle}
                  </h5>

                  {/* Case Study Type: Clean grey wording in Title Case with Satoshi font */}
                  <div 
                    className="font-satoshi text-xs sm:text-sm font-medium text-zinc-400 capitalize tracking-normal"
                    style={{ fontFamily: "var(--font-satoshi), 'Satoshi', system-ui, sans-serif" }}
                  >
                    {item.type}
                  </div>
                </div>

                {/* Role attribution tags along the bottom border */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px] sm:text-xs font-mono text-zinc-400 tracking-wider uppercase">
                  <span className="truncate pr-2">{item.role}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
