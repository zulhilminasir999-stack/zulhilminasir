import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { motion, useMotionValue } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
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
}

const ALL_CAROUSEL_CASES: CarouselCaseItem[] = [
  {
    id: "TGPowerWrap",
    slugTitle: "TG PowerWrap - Packaging & Web",
    displayTitle: "TG PowerWrap Website",
    type: "Packaging & Web",
    description: "Ultra-premium packaging architecture and responsive corporate web platform engineered with AI-assisted 3D mockups and precision vector blueprints.",
    role: "CREATOR / LEAD DESIGNER / VIBE-CODER",
    image: "/Images/tgpw1.jpg",
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study-project/aistudio-brand",
    isProject: true,
  },
  {
    id: "atelier-luxe",
    slugTitle: "Atelier Luxe - Identity Manual",
    displayTitle: "Atelier Botanical Floral Monogram",
    type: "Brand Identity",
    description: "Designed a complete custom-illustrated visual monogram logo, letterpress stationery matrices, and tactile layout system for eco-boutique skin care.",
    role: "LEAD DESIGNER / ART DIRECTOR",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study-project/atelier-luxe",
    isProject: true,
  },
  {
    id: "helios-exhibition",
    slugTitle: "Helios Biennale - Brutalist Series",
    displayTitle: "Helios Architectural Poster Series",
    type: "Visual Design",
    description: "Collection of high-concept graphic posters displaying striking monochromatic chiaroscuro geometry and safety-orange typographical layers.",
    role: "ART DIRECTOR / VISUAL DESIGNER",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study-project/helios-exhibition",
    isProject: true,
  },
  {
    id: "web-design-cms",
    slugTitle: "Zenith CMS - Front-End Architecture",
    displayTitle: "Web Design & CMS Systems",
    type: "Web Dev",
    description: "Translating bespoke component architectures into blazing-fast production front-ends with sub-second page loads and seamless editor accessibility.",
    role: "VIBE-CODER / LEAD DESIGNER",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study/web-design-cms",
    isProject: false,
  },
  {
    id: "ui-ux",
    slugTitle: "Vortex UI - Design Systems",
    displayTitle: "User Interface & Experience",
    type: "Mobile UI/UX",
    description: "Cognitive interaction flows, scalable token systems, and interactive prototypes built to minimize friction and elevate product usability.",
    role: "LEAD DESIGNER",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study/ui-ux",
    isProject: false,
  },
  {
    id: "ai-native-development",
    slugTitle: "Product Lens - AI Rich Generator",
    displayTitle: "AI-Native Development & Vibe Coding",
    type: "AI-Native Dev",
    description: "Accelerating full-stack engineering with generative pipelines, Gemini API integrations, and smart agentic prototyping workflows.",
    role: "CREATOR / LEAD DESIGNER / VIBE-CODER",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study/ai-native-development",
    isProject: false,
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
  },
  {
    id: "web-app-system",
    slugTitle: "Aura System - Scalable Web Platform",
    displayTitle: "Web Applications & Scalable Systems",
    type: "Web App & System",
    description: "Enterprise full-stack architecture, real-time database synchronizations, and scalable micro-services engineered for speed.",
    role: "FULL-STACK LEAD / ARCHITECT",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study/web-app-system",
    isProject: false,
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
  }
];

// Similarity mapping for featured projects relative to each capability or project
const SIMILARITY_MAP: Record<string, string[]> = {
  // Capability IDs -> Ranked relevant featured projects
  "web-design-cms": ["ck-lighting", "TGPowerWrap", "aistudio-brand", "breeze-cargo", "komorebi-editorial", "atelier-luxe", "helios-exhibition"],
  "ui-ux": ["breeze-cargo", "komorebi-editorial", "aistudio-brand", "ck-lighting", "TGPowerWrap", "atelier-luxe", "helios-exhibition"],
  "web-app-system": ["aistudio-brand", "ck-lighting", "breeze-cargo", "komorebi-editorial", "TGPowerWrap", "atelier-luxe", "helios-exhibition"],
  "ai-native-development": ["breeze-cargo", "komorebi-editorial", "TGPowerWrap", "aistudio-brand", "ck-lighting", "atelier-luxe", "helios-exhibition"],
  "brand-identity": ["atelier-luxe", "TGPowerWrap", "helios-exhibition", "ck-lighting", "breeze-cargo", "komorebi-editorial", "aistudio-brand"],
  "packaging": ["TGPowerWrap", "atelier-luxe", "helios-exhibition", "ck-lighting", "breeze-cargo", "komorebi-editorial", "aistudio-brand"],
  "visual-design": ["helios-exhibition", "atelier-luxe", "TGPowerWrap", "komorebi-editorial", "breeze-cargo", "ck-lighting", "aistudio-brand"],

  // Project IDs -> Ranked other featured projects
  "TGPowerWrap": ["ck-lighting", "atelier-luxe", "helios-exhibition", "breeze-cargo", "komorebi-editorial", "aistudio-brand"],
  "breeze-cargo": ["komorebi-editorial", "aistudio-brand", "ck-lighting", "TGPowerWrap", "atelier-luxe", "helios-exhibition"],
  "ck-lighting": ["TGPowerWrap", "aistudio-brand", "breeze-cargo", "komorebi-editorial", "atelier-luxe", "helios-exhibition"],
  "komorebi-editorial": ["breeze-cargo", "aistudio-brand", "ck-lighting", "atelier-luxe", "helios-exhibition", "TGPowerWrap"],
  "aistudio-brand": ["breeze-cargo", "ck-lighting", "komorebi-editorial", "TGPowerWrap", "atelier-luxe", "helios-exhibition"],
  "atelier-luxe": ["helios-exhibition", "TGPowerWrap", "breeze-cargo", "komorebi-editorial", "ck-lighting", "aistudio-brand"],
  "helios-exhibition": ["atelier-luxe", "TGPowerWrap", "breeze-cargo", "komorebi-editorial", "ck-lighting", "aistudio-brand"],
};

// Seeded PRNG for consistent, unique shuffle per page
function createSeededRNG(seedStr: string) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

interface RelatedCapabilitiesCarouselProps {
  currentId?: string;
}

export default function RelatedCapabilitiesCarousel({ currentId }: RelatedCapabilitiesCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const xMotionValue = useMotionValue(0);
  const navigate = useNavigate();
  const { triggerReveal } = useReveal();

  // 5 Similar Featured Projects followed by 5 Random Hoverlist Projects
  const randomizedCases = useMemo(() => {
    const seed = currentId || "portfolio_default";
    const rng = createSeededRNG(seed);

    // 1. Featured Projects (isProject: true)
    const allFeatured = ALL_CAROUSEL_CASES.filter((item) => item.isProject);
    const preferredOrder = currentId && SIMILARITY_MAP[currentId] ? SIMILARITY_MAP[currentId] : [];
    
    // Sort featured projects by similarity, excluding currentId
    const sortedFeatured = [...allFeatured]
      .filter((item) => item.id !== currentId)
      .sort((a, b) => {
        const indexA = preferredOrder.indexOf(a.id);
        const indexB = preferredOrder.indexOf(b.id);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return 0;
      });
    const first5Featured = sortedFeatured.slice(0, 5);

    // 2. Hoverlist Capabilities / Projects (isProject: false)
    const allHoverlist = ALL_CAROUSEL_CASES.filter((item) => !item.isProject && item.id !== currentId);
    const shuffledHoverlist = [...allHoverlist];
    for (let i = shuffledHoverlist.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [shuffledHoverlist[i], shuffledHoverlist[j]] = [shuffledHoverlist[j], shuffledHoverlist[i]];
    }
    const next5Hoverlist = shuffledHoverlist.slice(0, 5);

    // Combine: 5 featured projects + 5 hoverlist projects
    return [...first5Featured, ...next5Hoverlist];
  }, [currentId]);

  // Measure track width to dynamically calculate exact horizontal scroll distance
  useEffect(() => {
    const calculateScrollRange = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        // Total distance track needs to move so last card is fully visible with right padding
        const paddingRight = windowWidth < 640 ? 32 : windowWidth < 1024 ? 64 : 96;
        const distance = Math.max(0, trackWidth - windowWidth + paddingRight);
        setScrollRange(distance);
      }
    };

    calculateScrollRange();
    window.addEventListener("resize", calculateScrollRange);
    const timer = setTimeout(calculateScrollRange, 200);

    return () => {
      window.removeEventListener("resize", calculateScrollRange);
      clearTimeout(timer);
    };
  }, [randomizedCases]);

  // Direct sync function that recalculates translation based on current scroll position
  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const totalScroll = container.offsetHeight - window.innerHeight;

    if (totalScroll <= 0) return;

    const currentScrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScrolled / totalScroll));

    // Smooth horizontal translation directly locked to Lenis interpolated coordinates
    const targetX = -progress * scrollRange;
    xMotionValue.set(targetX);

    // Update index counter
    const total = randomizedCases.length;
    const calculated = Math.min(total, Math.max(1, Math.round(progress * (total - 1)) + 1));
    setCurrentIndex(calculated);
  }, [scrollRange, randomizedCases.length, xMotionValue]);

  // Hook directly into Lenis's high-precision render loop
  useLenis(updateScrollProgress);

  // Standard scroll listener fallback for immediate sync during page load/anchor jumps
  useEffect(() => {
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, [updateScrollProgress]);

  const handleCardClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    triggerReveal(() => {
      navigate(url);
    });
  };

  return (
    <div 
      id="capabilities-section"
      ref={containerRef}
      className="relative w-full bg-white z-50 select-none"
      style={{
        // Height calculated to provide 1:1 fluid feel matching horizontal track width
        height: scrollRange > 0 ? `${Math.round(window.innerHeight + scrollRange * 1.08)}px` : "260vh",
      }}
    >
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 sm:py-14 md:py-16 bg-white z-10">
        
        {/* Header Bar: Exact Preserved Typography + Dynamic Counter */}
        <div className="w-full px-6 sm:px-12 lg:px-16 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-sans font-medium text-2xl sm:text-3xl tracking-tight text-zinc-900 uppercase">
              Related Capabilities
            </h4>
          </div>

          {/* Video-inspired progress counter (e.g. 3 / 11) */}
          <div className="font-mono text-xs sm:text-sm tracking-wider text-zinc-400 font-medium">
            <span className="text-zinc-900">{currentIndex}</span>
            <span className="mx-1 text-zinc-300">/</span>
            <span>{randomizedCases.length}</span>
          </div>
        </div>

        {/* Horizontal Track Area */}
        <div className="w-full overflow-visible my-auto py-4">
          <motion.div 
            ref={trackRef}
            style={{ 
              x: xMotionValue,
              willChange: "transform",
            }}
            className="flex items-stretch gap-6 sm:gap-8 md:gap-10 pl-6 sm:pl-12 lg:pl-16 pr-12 w-max"
          >
            {randomizedCases.map((item) => (
              <div
                key={item.id}
                onClick={(e) => handleCardClick(e, item.url)}
                className="group w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] shrink-0 bg-white rounded-2xl border border-zinc-200/90 hover:border-zinc-400/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer flex flex-col overflow-hidden"
              >
                {/* Media Thumbnail Container with subtle hover zoom */}
                <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100 border-b border-zinc-100 relative">
                  <img 
                    src={item.image} 
                    alt={item.displayTitle}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-700 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle top-right hover arrow icon */}
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 text-zinc-900" />
                  </div>
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
    </div>
  );
}

