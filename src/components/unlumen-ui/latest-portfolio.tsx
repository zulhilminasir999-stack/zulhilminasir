import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { WordsStagger } from "../../registry/spell-ui/words-stagger";
import { useReveal } from "../../context/RevealContext";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  defaultImage: string;
  url: string;
  client: string;
  year: string;
  objectPosition?: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "seventy-seven",
    title: "TG PowerWrap Website",
    category: "Corporate Website",
    defaultImage: "/Images/tgpw1.jpg",
    url: "/case-study-project/TGPowerWrap",
    client: "TG PowerWrap Sdn Bhd",
    year: "2026"
  },
  {
    id: "triply",
    title: "Triply | AI-powered Travel Compinion",
    category: "Mobile UI/UX Design",
    defaultImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study-project/komorebi-editorial",
    client: "Triply",
    year: "2025"
  },
  {
    id: "zudio-garage",
    title: "CK Lighting Online Store",
    category: "E-commerce Website",
    defaultImage: "/Images/ck1.jpg",
    objectPosition: "center 30%",
    url: "/case-study-project/ck-lighting",
    client: "CK Lighting Sdn Bhd",
    year: "2026"
  },
  {
    id: "flakeslake",
    title: "RepX | AI- powered Fitness",
    category: "Mobile UI/UX Design",
    defaultImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study-project/breeze-cargo",
    client: "Flakeslake App",
    year: "2026"
  },
  {
    id: "rural-arena",
    title: "Warisan Ayah 3Q Catering",
    category: "Brand Identity",
    defaultImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    url: "/case-study-project/aistudio-brand",
    client: "Rural Arena Foundation",
    year: "2025"
  }
];

export function LatestPortfolio() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { triggerReveal } = useReveal();

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="w-full bg-[#0A2947]">

      {/* Main Header Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 sm:px-12 lg:px-16 pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-14 items-start border-b border-white/5">
        <div className="col-span-1 md:col-span-12 lg:col-span-8 text-center md:text-center lg:text-left">
          <h2 className="text-5xl md:text-[60px] lg:text-[70px] font-sans font-bold tracking-tighter text-white uppercase leading-[0.85] select-none text-center md:text-center lg:text-left">
            <WordsStagger className="text-white">
              FEATURED
            </WordsStagger>
            <br />
            <WordsStagger className="text-white" delay={0.35}>
              PROJECTS
            </WordsStagger>
          </h2>
        </div>
        <div className="col-span-1 md:col-span-12 lg:col-span-4 pt-4 md:pt-4 lg:pt-4">
          <p className="text-white/75 text-[14px] leading-relaxed font-sans max-w-sm ml-auto md:max-w-xl lg:max-w-sm text-right">
            My creative spirit comes alive in the digital realm. Discover high-fidelity works engineered with precision, detail, and seamless interactivity.
          </p>
        </div>
      </div>

      {/* Sticky Stacked Panels Wrapper */}
      <div id="capabilities-section" className="relative w-full flex flex-col">
        {PORTFOLIO_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              sessionStorage.setItem("home_scroll_position", window.scrollY.toString());
              triggerReveal(() => {
                navigate(item.url);
              });
            }}
            onMouseEnter={() => setHoveredCardId(item.id)}
            onMouseLeave={() => setHoveredCardId(null)}
            onMouseMove={handleMouseMove}
            className="sticky top-0 h-[80vh] sm:h-screen w-full flex flex-col justify-end group overflow-hidden cursor-pointer bg-zinc-950"
          >
            {/* Project Image Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img 
                src={item.defaultImage}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 border-none outline-none ring-0"
                style={{ objectPosition: item.objectPosition || "center center" }}
                referrerPolicy="no-referrer"
              />
              {/* Elegant dark gradient mask for high readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 z-10" />
            </div>

            {/* Custom Interactive Follower Badge */}
            <AnimatePresence>
              {hoveredCardId === item.id && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  style={{
                    position: "absolute",
                    left: mousePosition.x,
                    top: mousePosition.y,
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                  }}
                  className="hidden md:flex z-30 w-24 h-24 rounded-full bg-[#0A2947] text-white flex-col items-center justify-center font-sans text-xs tracking-widest font-extrabold shadow-2xl"
                >
                  <span className="text-white font-sans font-black text-[11px] tracking-widest uppercase leading-none">VIEW</span>
                  <span className="text-white font-sans font-black text-[11px] tracking-widest uppercase leading-none mt-1">SITE</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Info Overlay */}
            <div className="absolute bottom-16 sm:bottom-24 lg:bottom-32 left-0 w-full px-6 sm:px-12 lg:px-16 z-20 flex flex-col">
              {/* Category above the main title */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-sans font-medium text-white/90 tracking-tight mb-2 sm:mb-3">
                {item.category}
              </p>

              <div className="flex items-center justify-between w-full">
                {/* Left side: Large Title */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-sans font-semibold tracking-tighter text-white leading-[1.1] sm:leading-[1] select-none pr-4">
                  {item.title}
                </h3>

                {/* Middle: Horizontal Line */}
                <div className="hidden md:block flex-1 h-[1px] bg-white/30 mx-8" />

                {/* Right side: Client/Brand label */}
                <div className="text-right font-sans font-normal text-sm sm:text-base md:text-lg lg:text-xl tracking-tight text-white whitespace-nowrap">
                  {item.client}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
