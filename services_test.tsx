import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceItem {
  id: string;
  title: string;
  shortTitle: string; // for the huge center text if needed
  image: string;
  description: string;
  tags: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "brand-identity",
    title: "Brand Identity",
    shortTitle: "Brand\nIdentity",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80",
    description: "Comprehensive brand strategy, visual direction, custom typography pairings, and structured style guides. We shape the complete aesthetic DNA of a business, establishing a confident market presence.",
    tags: ["Logo Design", "Visual Systems", "Brand Guidelines", "Rebranding", "Typography", "Asset Libraries"]
  },
  {
    id: "ui-ux",
    title: "Product Design",
    shortTitle: "Product\nDesign",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80",
    description: "User-centric design systems, clickable wireframes, and high-fidelity interactive prototypes. We conduct meticulous research and map out seamless user flows.",
    tags: ["User Experience Design", "Visual Design", "Design Systems", "Flows", "Prototypes", "Interaction"]
  },
  {
    id: "web-design",
    title: "Web Systems",
    shortTitle: "Web\nSystems",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    description: "Custom-crafted high-performance websites built with React, Vite, and flexible CMS integrations. We bridge the gap between creative visual layouts and pixel-perfect front-end architecture.",
    tags: ["Website Design", "CMS Setup", "Components", "Content Structure", "Performance", "SEO Base"]
  },
  {
    id: "ai-native-dev",
    title: "Development",
    shortTitle: "Develop\nment",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    description: "Architecting intelligent web applications powered by Gemini AI and LLM agents. We blend rapid AI-assisted development with clean TypeScript engineering.",
    tags: ["Frontend", "Framer", "Components", "Animation", "Integration", "Optimization"]
  },
  {
    id: "packaging",
    title: "Packaging",
    shortTitle: "Pack\naging",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    description: "Tactile, sustainable physical packaging designs and photorealistic 3D mockups. We construct brand containers engineered to elevate the unboxing experience.",
    tags: ["Box Design", "Labeling", "3D Mockups", "Material Specs", "Sustainability", "Print Ready"]
  },
  {
    id: "visual-design",
    title: "Visual Design",
    shortTitle: "Visual\nDesign",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    description: "High-impact brand assets, promotional key visuals, and custom-tailored marketing collateral. We combine traditional graphic design fundamentals with state-of-the-art prompt engineering.",
    tags: ["Key Visuals", "Marketing Assets", "Social Media", "Iconography", "Illustrations", "Prompting"]
  }
];

export function ServicesSection({ isDark }: { isDark: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = SERVICES_DATA[activeIndex];

  return (
    <section 
      id="services-section"
      className={`relative w-full py-24 min-h-[90vh] flex flex-col justify-center overflow-hidden transition-colors duration-500 ${isDark ? "bg-zinc-950 text-white" : "bg-[#fafafa] text-zinc-900"}`}
    >
      <div className="max-w-[95vw] lg:max-w-[90vw] mx-auto w-full grid grid-cols-1 md:grid-cols-[200px_1fr_200px] lg:grid-cols-[250px_1fr_250px] gap-8 relative z-10">
        
        {/* Left Side: Navigation List */}
        <div className="flex flex-col space-y-4 pt-4 lg:pt-12 relative z-20">
          {SERVICES_DATA.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActiveIndex(index)}
              className={`text-left text-sm md:text-base lg:text-lg font-sans transition-all duration-300 ${
                activeIndex === index 
                  ? "text-[#FF3B30] font-semibold tracking-tight" // A vibrant red like the video
                  : `${isDark ? "text-zinc-500 hover:text-zinc-300" : "text-zinc-500 hover:text-zinc-800"}`
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Center: Interactive Image and Huge Text */}
        <div className="relative flex items-center justify-center min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center z-0"
            >
              <img 
                src={activeService.image} 
                alt={activeService.title} 
                className="w-full max-w-[500px] lg:max-w-[600px] h-auto object-contain mask-image-circle md:mask-image-none mix-blend-multiply opacity-90"
                style={{ 
                  filter: isDark ? "invert(1) hue-rotate(180deg) brightness(1.2)" : "none",
                  WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 70%)"
                }}
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeService.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 pointer-events-none text-center"
            >
              <h2 
                className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] leading-[0.9] font-sans font-black tracking-tighter whitespace-pre-line text-transparent"
                style={{
                  WebkitTextStroke: isDark ? "2px rgba(255,255,255,0.8)" : "2px rgba(0,0,0,0.9)",
                  backgroundImage: `url(${activeService.image})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                {activeService.shortTitle}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Tags/Features List */}
        <div className="flex flex-col space-y-3 pt-4 lg:pt-12 text-right relative z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`tags-${activeService.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col space-y-2"
            >
              {activeService.tags.map((tag, i) => (
                <span 
                  key={i} 
                  className={`text-xs md:text-sm lg:text-base font-sans ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="max-w-[95vw] lg:max-w-[90vw] mx-auto w-full grid grid-cols-1 md:grid-cols-2 mt-8 md:mt-0 relative z-20 items-end">
        {/* Bottom Left: Description */}
        <div className="flex items-start gap-4 max-w-sm">
          <div className="w-1 h-full min-h-[40px] bg-[#FF3B30] mt-1 hidden md:block"></div>
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeService.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`text-xs md:text-sm leading-relaxed uppercase tracking-widest font-semibold ${isDark ? "text-zinc-500" : "text-zinc-400"}`}
            >
              <span className="text-[#FF3B30] mr-2">{"//"}</span>
              {activeService.description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bottom Right: Huge Index Number */}
        <div className="text-right hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`index-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`text-[12vw] md:text-[10vw] lg:text-[8vw] font-sans font-black leading-none opacity-20 select-none ${isDark ? "text-white" : "text-black"}`}
            >
              {(activeIndex + 1).toString().padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
