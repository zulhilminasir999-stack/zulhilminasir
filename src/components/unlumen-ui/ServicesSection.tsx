import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceItem {
  id: string;
  title: string;
  shortTitle: React.ReactNode;
  image: string;
  description: string;
  tags: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "brand-identity",
    title: "Brand Identity",
    shortTitle: (
      <>
        Brand<br />Identity
      </>
    ),
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    description: "Comprehensive brand strategy, visual direction, custom typography pairings, and structured style guides.",
    tags: ["Logo Design", "Visual Systems", "Brand Guidelines", "Rebranding", "Typography", "Asset Libraries"],
  },
  {
    id: "product-design",
    title: "Product Design",
    shortTitle: (
      <>
        Product<br />Design
      </>
    ),
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80",
    description: "User-centric design systems, clickable wireframes, and high-fidelity interactive prototypes. We map seamless flows.",
    tags: ["User Experience Design", "Visual Design", "Design Systems", "Flows", "Prototypes", "Interaction"],
  },
  {
    id: "web-systems",
    title: "Web Systems",
    shortTitle: (
      <>
        Web<br />Systems
      </>
    ),
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=80",
    description: "Custom-crafted high-performance websites built with React, Vite, and flexible CMS integrations.",
    tags: ["Website Design", "CMS Setup", "Components", "Content Structure", "Performance", "SEO Base"],
  },
  {
    id: "development",
    title: "Development",
    shortTitle: <>Development</>,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
    description: "Architecting intelligent web applications powered by Gemini AI and LLM agents. Clean TypeScript engineering.",
    tags: ["Frontend", "Framer", "Components", "Animation", "Integration", "Optimization"],
  },
  {
    id: "content-messaging",
    title: "Content & Messaging",
    shortTitle: (
      <>
        Content &<br />Messaging
      </>
    ),
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    description: "High-impact brand assets, promotional key visuals, and custom-tailored marketing collateral for maximum engagement.",
    tags: ["Key Visuals", "Marketing Assets", "Social Media", "Copywriting", "Illustrations", "Prompting"],
  },
  {
    id: "motion-interaction",
    title: "Motion & Interaction",
    shortTitle: (
      <>
        Motion &<br />Interaction
      </>
    ),
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    description: "Movement explains structure, used to guide, not to impress. We craft seamless transitions and interactive logic.",
    tags: ["UI Animation", "Microinteractions", "Transitions", "Motion Systems", "Prototyping", "Interaction Logic"],
  },
];

export default function ServicesSection({ isDark }: { isDark: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = SERVICES_DATA[activeIndex];

  // Auto-rotate services with synchronized timer reset
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const activeColor = "#FF3333";
  const textColor = isDark ? "text-white" : "text-zinc-900";
  const mutedTextColor = isDark ? "text-zinc-400" : "text-zinc-500";
  const bgColor = isDark ? "bg-zinc-950" : "bg-white";

  return (
    <section
      id="services-section"
      className={`relative w-full min-h-screen pt-16 sm:pt-20 md:pt-24 pb-28 sm:pb-36 md:pb-44 lg:pb-52 px-6 sm:px-12 lg:px-16 flex flex-col justify-center overflow-hidden transition-colors duration-500 ${bgColor} ${textColor}`}
    >
      <div className="w-full flex-1 flex flex-col md:flex-row items-stretch justify-between relative z-10 min-h-[500px] md:min-h-[580px] lg:min-h-[640px]">
        
        {/* Left Column: Navigation List & Bottom Quote */}
        <div
          id="services-nav-container"
          className="w-full md:w-1/4 lg:w-[22%] shrink-0 flex flex-col justify-between pt-4 relative z-30 pointer-events-auto"
        >
          <div id="services-title-list" className="flex flex-col space-y-4">
            {SERVICES_DATA.map((service, index) => (
              <button
                id={`service-nav-item-${service.id}`}
                key={service.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`text-left text-sm md:text-base lg:text-lg font-sans transition-all duration-300 w-fit cursor-pointer ${
                  activeIndex === index
                    ? "font-medium"
                    : `${mutedTextColor} hover:${textColor}`
                }`}
                style={{ color: activeIndex === index ? activeColor : undefined }}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Description aligned with Image Bottom */}
          <div id="services-description" className="hidden md:flex items-end pb-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${activeService.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`text-[10px] md:text-[11px] leading-relaxed uppercase tracking-[0.15em] font-semibold max-w-[280px] ${mutedTextColor}`}
              >
                <span style={{ color: activeColor }} className="mr-2 text-base align-text-top leading-none">{"//"}</span>
                {activeService.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Center & Right Column: Image & Extended Tags Panel */}
        <div className="flex-1 flex items-end justify-end relative my-8 md:my-0 pt-4 pb-2">
          
          {/* Unified Container for Direct Pixel Difference Blending */}
          <div className="relative flex items-end justify-center pointer-events-auto shrink-0">
            
            {/* Image Frame (No overflow-hidden to prevent stacking isolation) */}
            <div className="relative h-[430px] sm:h-[500px] md:h-[560px] lg:h-[620px] xl:h-[660px] aspect-[10/11] rounded-none shrink-0">
              <AnimatePresence initial={false}>
                <motion.div
                  key={`image-${activeService.id}`}
                  initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{
                    clipPath: { duration: 0.85, ease: [0.65, 0, 0.35, 1] },
                    opacity: { duration: 0.2, delay: 0.85 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    id="service-featured-image"
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover select-none cursor-pointer block rounded-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Progress loading indicator inside the image at the bottom */}
              <div className="absolute bottom-5 inset-x-0 flex justify-center z-10 px-6 pointer-events-none">
                <div className="w-20 sm:w-28 lg:w-32 h-[3px] rounded-full overflow-hidden bg-white/30 backdrop-blur-xs">
                  <motion.div
                    key={`progress-bar-${activeIndex}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4.5, ease: "linear" }}
                    className="h-full w-full bg-[#FF4500]"
                    style={{ transformOrigin: "left center" }}
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Optical Inversion Text with True mix-blend-mode: difference */}
            <div 
              style={{ mixBlendMode: "difference" }}
              className="absolute inset-y-0 -left-[12%] sm:-left-[16%] md:-left-[20%] lg:-left-[24%] flex items-center z-30 pointer-events-none mix-blend-difference"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activeService.id}`}
                  id="service-center-title-container"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ mixBlendMode: "difference" }}
                  className="w-[120vw] max-w-[480px] sm:max-w-[560px] md:max-w-[640px] lg:max-w-[720px] pointer-events-auto select-text mix-blend-difference"
                >
                  <h2
                    id="service-center-heading"
                    style={{
                      mixBlendMode: "difference",
                      color: "#FFFFFF",
                    }}
                    className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7.5vw] leading-[0.9] font-sans font-bold tracking-tighter cursor-text select-text drop-shadow-none mix-blend-difference"
                  >
                    {activeService.shortTitle}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: Tags List & Big Index */}
          <div
            id="services-tags-container"
            style={{ backgroundColor: "#f2f2f2" }}
            className="flex-1 min-w-[170px] lg:min-w-[210px] max-w-[320px] xl:max-w-[400px] flex flex-col justify-between rounded-none border-none bg-[#f2f2f2] h-[430px] sm:h-[500px] md:h-[560px] lg:h-[620px] xl:h-[660px] self-end text-left relative z-20 pointer-events-auto mt-8 md:my-0 pt-6 pb-4 pl-6 sm:pl-8 -mr-6 sm:-mr-12 lg:-mr-16 pr-6 sm:pr-12 lg:pr-16 hidden md:flex"
          >
            {/* Tags List */}
            <AnimatePresence mode="wait">
              <motion.div
                id="services-tags-list"
                key={`tags-${activeService.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col space-y-2 lg:space-y-3 items-start text-left pt-2 text-black"
              >
                {activeService.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs md:text-sm lg:text-[15px] font-sans font-medium text-black text-left"
                    style={{ color: "#000000" }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Index Number aligned with Image Bottom and Website Theme Right Edge (Plus Icon Grid Line) */}
            <div id="services-index-number" className="flex justify-end items-end w-full p-0 m-0 pb-0 text-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`index-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sans font-semibold leading-none text-zinc-400 select-none tracking-tight p-0 m-0 text-right inline-block"
                >
                  {(activeIndex + 1).toString().padStart(2, "0")}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile-only Bottom Description & Index */}
      <div className="w-full flex md:hidden flex-col justify-between items-start mt-8 relative z-20 pb-2">
        <div className="w-full flex justify-between items-end">
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-mob-${activeService.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`text-[11px] leading-relaxed uppercase tracking-[0.15em] font-semibold max-w-[280px] ${mutedTextColor}`}
            >
              <span style={{ color: activeColor }} className="mr-2 text-base align-text-top leading-none">{"//"}</span>
              {activeService.description}
            </motion.p>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`index-mob-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl font-sans font-semibold leading-none text-zinc-400 dark:text-zinc-500 select-none tracking-tight"
            >
              {(activeIndex + 1).toString().padStart(2, "0")}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
