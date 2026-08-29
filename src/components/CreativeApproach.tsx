import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WordsStagger } from "../registry/spell-ui/words-stagger";

export function CreativeApproach() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const updateOpacity = () => {
      const windowHeight = window.innerHeight;
      const viewportCenter = windowHeight / 2;

      let closestIdx = 0;
      let minDistance = Infinity;

      // First pass: Find the closest item to the vertical center
      itemRefs.current.forEach((item, idx) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportCenter - itemCenter);
        
        if (distanceFromCenter < minDistance) {
          minDistance = distanceFromCenter;
          closestIdx = idx;
        }
      });

      // Second pass: Apply opacities based on active state and distance
      itemRefs.current.forEach((item, idx) => {
        if (!item) return;
        
        if (idx === closestIdx) {
          item.style.opacity = "1";
        } else {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.top + rect.height / 2;
          const distanceFromCenter = Math.abs(viewportCenter - itemCenter);
          const maxDistance = windowHeight / 2;
          
          // Calculate a smooth fade for non-active items
          let opacity = 1 - (distanceFromCenter / maxDistance);
          opacity = Math.max(0.2, Math.min(0.4, opacity));
          item.style.opacity = opacity.toString();
        }
      });

      setActiveIdx(closestIdx);
    };

    window.addEventListener('scroll', updateOpacity, { passive: true });
    window.addEventListener('resize', updateOpacity, { passive: true });
    
    setTimeout(updateOpacity, 100);

    return () => {
      window.removeEventListener('scroll', updateOpacity);
      window.removeEventListener('resize', updateOpacity);
    };
  }, []);

  const steps = [
    {
      number: "01",
      title: "Research & Analysis",
      description: "We're like detectives, sleuthing through data to unearth golden insights about your project's audience, industry, and rivals.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    {
      number: "02",
      title: "Define & Ideation",
      description: "We mix research insights, user personas, and pain points to cook up a clear plan. Stirring creativity into the pot, we simmer ideas that serve up solutions beyond the ordinary.",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop"
    },
    {
      number: "03",
      title: "Execution & Deliver",
      description: "In this phase, we act like artists in a vibrant studio, sketching, molding, and refining ideas. With each stroke and feedback loop, we sculpt solutions that break the mold.",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop"
    },
    {
      number: "04",
      title: "Evaluation & Testing",
      description: "In this last phase, we infuse ideas with design magic, ensuring seamless integration into development. With precision and collaboration, our goal is to craft visually stunning designs that translate seamlessly into reality.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="creative-approach" className="w-full bg-white relative z-40 pt-[220px] md:pt-[32vh] pb-16">
      <div className="w-full px-6 sm:px-12 lg:px-16 pt-10 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pt-12">
          
          {/* Left Column: Sticky Title & Image */}
          <div className="md:col-span-5 relative h-full">
            <div className="sticky top-[50vh] -translate-y-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 space-y-8 lg:space-y-12">
              <h2 className="font-sans font-bold text-5xl md:text-[50px] lg:text-[70px] tracking-tighter text-[#2563EB] uppercase leading-[0.9] select-none text-center md:text-left bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none rounded-2xl md:rounded-none py-4 md:py-0">
                <WordsStagger className="text-[#2563EB]">
                  WORKFLOW
                </WordsStagger>
                <br />
                <WordsStagger className="text-[#2563EB]" delay={0.35}>
                  STEPS
                </WordsStagger>
              </h2>

              {/* Dynamic Image Card */}
              <div className="relative w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl shadow-zinc-200/50 border border-zinc-100">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={steps[activeIdx].image}
                      alt={steps[activeIdx].title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Subtle Overlay for aesthetic */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/10 to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </div>

          {/* Right Column: Scroll Text Fade Items */}
          <div className="md:col-span-7 md:pl-12 lg:pl-20 xl:pl-24">
            <div className="flex flex-col items-center md:items-start gap-[200px] pt-[30vh] pb-[50vh]">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  className="flex flex-row items-start text-left gap-6 md:gap-8 lg:gap-10 transition-opacity duration-300 ease-out will-change-opacity"
                  style={{ opacity: 0.2 }}
                >
                  {/* Number in Modern Blue */}
                  <div className="text-[#2563EB] font-sans font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight mt-1 sm:mt-0">
                    {step.number}
                  </div>

                  <div className="flex flex-col space-y-4 max-w-xl">
                    {/* Step Title */}
                    <h3 className="font-sans font-bold text-2xl sm:text-3xl lg:text-[2.5rem] text-zinc-900 leading-[1.15]">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-zinc-500 text-sm sm:text-base lg:text-lg leading-snug font-sans">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
