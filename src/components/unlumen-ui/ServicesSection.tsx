import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WordsStagger } from "../../registry/spell-ui/words-stagger";

const SERVICES_DATA = [
  {
    id: "brand",
    title: "Web Design & Dev",
    shortTitle: "Web Design\n& Dev",
    description: "Comprehensive Brand Strategy, Visual Direction, Custom Typography Pairings, And Structured Guidelines To Elevate Market Positioning.",
    tags: ["Logo Design", "Visual Systems", "Brand Guidelines", "Rebranding", "Typography", "Asset Libraries"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop",
    overlayColor: "#FFFFFF",
  },
  {
    id: "product",
    title: "Mobile UI/UX",
    shortTitle: "Mobile UI/UX",
    description: "User-Centric Interface Architecture, Complex System Workflows, And Scalable Design Systems For Modern Web And Native Platforms.",
    tags: ["UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "User Testing", "App Design"],
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
    overlayColor: "#38BDF8", // Electric cyan/sky
  },
  {
    id: "web",
    title: "Web App & System",
    shortTitle: "Web App\n& System",
    description: "High-Performance Digital Experiences, Marketing Sites, And E-Commerce Platforms Engineered For Conversion And Speed.",
    tags: ["Web Design", "E-Commerce", "Landing Pages", "CMS Integration", "Webflow", "SEO Architecture"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    overlayColor: "#FCD34D", // Radiant gold
  },
  {
    id: "dev",
    title: "AI-native Dev",
    shortTitle: "AI-native Dev",
    description: "Robust Full-Stack Implementation Utilizing Modern Frameworks, Serverless Architectures, And Pristine Code Quality.",
    tags: ["Frontend", "Backend", "React / Next.js", "API Development", "Database Architecture", "Cloud Hosting"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    overlayColor: "#4ADE80", // Vibrant neon mint
  },
  {
    id: "content",
    title: "Brand Identity",
    shortTitle: "Brand\nIdentity",
    description: "Strategic Copywriting, Tone Of Voice Development, And Narrative Structuring That Aligns Perfectly With Business Objectives.",
    tags: ["Copywriting", "Content Strategy", "Microcopy", "Tone of Voice", "Narrative Design", "SEO Writing"],
    image: "/a.jpg",
    overlayColor: "#FFFFFF", // Crisp white
  },
  {
    id: "motion",
    title: "Packaging Design",
    shortTitle: "Packaging Design",
    description: "Purposeful Animation And Micro-Interactions That Guide User Focus, Enhance Usability, And Bring Interfaces To Life.",
    tags: ["Micro-interactions", "UI Animation", "Lottie", "Transitions", "3D Elements", "Video Editing"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    overlayColor: "#C084FC", // Luminous violet
  },
  {
    id: "marketing",
    title: "Marketing Visual Design",
    shortTitle: "Marketing\nVisual\nDesign",
    description: "Creating High-Impact Visual Assets And Marketing Materials That Drive Engagement And Brand Recognition.",
    tags: ["Social Media Graphics", "Ad Creatives", "Email Design", "Presentation Decks", "Print Collateral"],
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=2070&auto=format&fit=crop",
    overlayColor: "#FB7185", // Radiant coral rose
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isDark = false;
  const bgColor = isDark ? "bg-zinc-950" : "bg-white";
  const textColor = isDark ? "text-white" : "text-zinc-900";
  const mutedTextColor = isDark ? "text-zinc-500" : "text-zinc-400";
  const activeColor = "#2563EB";

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeService = SERVICES_DATA[activeIndex];

  return (
    <section
      id="services-section"
      className={`relative w-full min-h-screen pt-16 sm:pt-20 md:pt-24 pb-28 sm:pb-36 md:pb-44 lg:pb-52 px-6 sm:px-12 lg:px-16 flex flex-col justify-center overflow-hidden transition-colors duration-500 isolate bg-white text-zinc-900`}
    >
      {/* Section Header Row: WHAT I DO + Sentence */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 md:mb-16 mt-4 md:mt-8 items-center">
        <div className="col-span-1 md:col-span-12 lg:col-span-8 text-left">
          <h2 
            className="text-4xl sm:text-5xl md:text-[60px] lg:text-[72px] font-sans font-bold tracking-tighter uppercase leading-[0.85] select-none text-left text-[#2563EB]"
          >
            <WordsStagger className="!text-[#2563EB]">
              WHAT I DO
            </WordsStagger>
          </h2>
        </div>
        <div className="col-span-1 md:col-span-12 lg:col-span-4 flex items-center">
          <p className="text-zinc-500 text-[14px] leading-relaxed font-sans max-w-sm ml-auto md:max-w-xl lg:max-w-sm text-left md:text-right">
            My creative spirit comes alive in the digital realm. Discover high-fidelity works engineered with precision, detail, and seamless interactivity.
          </p>
        </div>
      </div>

      <div className="w-full flex-1 flex flex-col md:flex-row items-stretch justify-between relative min-h-[500px] md:min-h-[580px] lg:min-h-[640px]">
        
        <div
          id="services-nav-container"
          className="flex flex-col justify-between items-start z-20 pointer-events-auto min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] mb-8 md:mb-0"
        >
          <div className="flex flex-col space-y-3 sm:space-y-4 lg:space-y-6 pt-4">
            {SERVICES_DATA.map((service, index) => (
              <button
                key={service.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
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

          <div id="services-description" className="hidden md:flex items-end pb-2">
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${activeService.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`text-[11px] md:text-[12px] leading-relaxed font-sans font-normal tracking-[0.05em] max-w-[280px] ${mutedTextColor}`}
              >
                <span style={{ color: activeColor }} className="mr-2 text-base align-text-top leading-none">{"//"}</span>
                {activeService.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex-1 flex items-end justify-end relative my-8 md:my-0 pt-4 pb-2">
          
          <div className="relative flex items-end justify-center pointer-events-auto shrink-0 select-text">
            
            {/* Image Container */}
            <div className="relative h-[430px] sm:h-[500px] md:h-[560px] lg:h-[620px] xl:h-[660px] aspect-[10/11] rounded-none shrink-0 overflow-hidden z-20 select-text">
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
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  <img
                    id="service-featured-image"
                    src={activeService.image}
                    alt={activeService.title}
                    className="w-full h-full object-cover select-none pointer-events-none block rounded-none"
                    draggable={false}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.endsWith("/a.jpg") && !target.src.includes("/Images/")) {
                        target.src = "/Images/a.jpg";
                      }
                    }}
                  />
                  {/* Subtle top scrim to guarantee high contrast and legibility for the white text */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Single-Line White Title at the Top Center Inside the Image */}
              <div 
                className="absolute top-5 sm:top-6 md:top-8 inset-x-0 flex justify-center items-center z-30 px-4 pointer-events-auto select-text"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`title-${activeService.id}`}
                    id="service-center-title-clipped-container"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.3 }}
                    className="text-center pointer-events-auto select-text"
                  >
                    <h2
                      id="service-center-heading-clipped"
                      className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[34px] font-sans font-bold tracking-tight !text-white whitespace-nowrap select-text"
                      style={{ color: "#ffffff" }}
                    >
                      {activeService.title}
                    </h2>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Bar at bottom */}
              <div className="absolute bottom-5 inset-x-0 flex justify-center z-30 px-6 pointer-events-auto">
                <div 
                  onClick={() => setActiveIndex((prev) => (prev + 1) % SERVICES_DATA.length)}
                  className="w-20 sm:w-28 lg:w-32 h-[3px] rounded-full overflow-hidden bg-white/30 backdrop-blur-xs cursor-pointer hover:bg-white/50 transition-colors"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`progress-bar-${activeIndex}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 4.5, ease: "linear" }}
                      className="h-full w-full bg-[#2563EB]"
                      style={{ transformOrigin: "left center" }}
                    />
                  </AnimatePresence>
                </div>
              </div>

            </div>

          </div>

          <div
            id="services-tags-container"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
            className="flex-1 min-w-[170px] lg:min-w-[210px] max-w-[320px] xl:max-w-[400px] flex flex-col justify-between rounded-none border-none bg-black/[0.02] h-[430px] sm:h-[500px] md:h-[560px] lg:h-[620px] xl:h-[660px] self-end text-left relative z-20 pointer-events-auto mt-8 md:my-0 pt-6 pb-4 pl-6 sm:pl-8 -mr-6 sm:-mr-12 lg:-mr-16 pr-6 sm:pr-12 lg:pr-16 hidden md:flex transition-colors duration-300"
          >
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

            <div id="services-index-number" className="flex justify-end items-end w-full p-0 m-0 pb-0 text-right">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`index-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-baseline space-x-3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans font-semibold leading-none text-zinc-400 select-none tracking-tight p-0 m-0 text-right"
                >
                  <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 rounded-full bg-zinc-400 inline-block shrink-0 mb-1" />
                  <span>{(activeIndex + 1).toString().padStart(2, "0")}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

      <div className="w-full flex md:hidden flex-col justify-between items-start mt-8 relative z-20 pb-2">
        <div className="w-full flex justify-between items-end">
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-mob-${activeService.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-baseline space-x-2 text-2xl sm:text-3xl font-sans font-semibold leading-none text-zinc-400 select-none tracking-tight"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 inline-block shrink-0 mb-0.5" />
              <span>{(activeIndex + 1).toString().padStart(2, "0")}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
