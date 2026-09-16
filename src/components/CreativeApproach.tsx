import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WordsStagger } from "../registry/spell-ui/words-stagger";

export function CreativeApproach() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const updateOpacity = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const isMobile = windowWidth < 768;
      
      const titleBottom = titleRef.current 
        ? titleRef.current.getBoundingClientRect().bottom 
        : (isMobile ? 65 : 0);

      // On mobile, determine active step based on reading position
      let closestIdx = 0;
      let minDistance = Infinity;
      const readingTarget = isMobile ? titleBottom + (windowHeight - titleBottom) * 0.35 : windowHeight / 2;

      // First pass: Find the active step currently in primary reading focus
      itemRefs.current.forEach((item, idx) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distanceFromTarget = Math.abs(readingTarget - itemCenter);
        
        if (distanceFromTarget < minDistance) {
          minDistance = distanceFromTarget;
          closestIdx = idx;
        }
      });

      // Second pass: Apply opacities
      itemRefs.current.forEach((item, idx) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;

        if (isMobile) {
          // Half-way point of the step div
          // While itemCenter > titleBottom, more than half of the step is in the active area -> full opacity (1)
          if (itemCenter >= titleBottom) {
            // Check if it's below the screen entrance
            if (rect.top > windowHeight * 0.88) {
              const entryFade = Math.max(0.2, (windowHeight - rect.top) / (windowHeight * 0.12));
              item.style.opacity = Math.min(1, entryFade).toFixed(3);
            } else {
              // Visible as normal color (1.0)
              item.style.opacity = "1";
            }
            item.style.pointerEvents = "auto";
          } else {
            // Half of the step div has scrolled past the title -> smoothly fade out from 1 down to 0
            const remainingHalfHeight = Math.max(rect.height * 0.5, 80);
            const distancePastMidpoint = titleBottom - itemCenter;
            const progressToExit = Math.min(1, distancePastMidpoint / remainingHalfHeight);
            const fadeOpacity = Math.max(0, 1 - progressToExit);

            item.style.opacity = fadeOpacity.toFixed(3);
            item.style.pointerEvents = fadeOpacity > 0.1 ? "auto" : "none";
          }
        } else {
          // Desktop standard behavior
          const viewportCenter = windowHeight / 2;
          const maxDistance = windowHeight / 2;
          const distanceFromCenter = Math.abs(viewportCenter - itemCenter);

          if (idx === closestIdx) {
            item.style.opacity = "1";
          } else {
            let opacity = 1 - (distanceFromCenter / maxDistance);
            opacity = Math.max(0.2, Math.min(0.4, opacity));
            item.style.opacity = opacity.toString();
          }
          item.style.pointerEvents = "auto";
        }
      });

      setActiveIdx(closestIdx);
    };

    window.addEventListener('scroll', updateOpacity, { passive: true });
    window.addEventListener('resize', updateOpacity, { passive: true });
    
    updateOpacity();
    setTimeout(updateOpacity, 50);

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
    <section id="creative-approach" className="w-full bg-white relative z-40 pt-4 sm:pt-8 md:pt-[32vh] pb-16">
      <div className="w-full px-6 sm:px-12 lg:px-16">
        
        {/* Mobile Sticky Header pinned at top for the entire section */}
        <div 
          ref={titleRef}
          className="sticky top-0 z-30 block md:hidden bg-white pt-5 pb-3.5 -mx-6 px-6"
        >
          <h2 className="font-sans font-bold text-[40px] sm:text-5xl tracking-tighter text-[#2563EB] uppercase leading-[0.9] select-none text-center">
            <WordsStagger className="text-[#2563EB]">
              WORKFLOW
            </WordsStagger>{" "}
            <WordsStagger className="text-[#2563EB]" delay={0.25}>
              STEPS
            </WordsStagger>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 lg:gap-16 pt-2 sm:pt-6 md:pt-12">
          
          {/* Desktop Left Column: Sticky Title & Image */}
          <div className="hidden md:block md:col-span-5 relative h-full pb-0">
            <div className="sticky top-[50vh] -translate-y-1/2 flex flex-col items-start text-left z-10 space-y-8 lg:space-y-12">
              <h2 className="font-sans font-bold text-[50px] lg:text-[70px] tracking-tighter text-[#2563EB] uppercase leading-[0.9] select-none text-left">
                <WordsStagger className="text-[#2563EB]">
                  WORKFLOW
                </WordsStagger>
                <br />
                <WordsStagger className="text-[#2563EB]" delay={0.35}>
                  STEPS
                </WordsStagger>
              </h2>

              {/* Dynamic Image Card (Desktop Only) */}
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
            <div className="flex flex-col items-center md:items-start gap-[90px] sm:gap-[130px] md:gap-[200px] pt-12 md:pt-[30vh] pb-[35vh] md:pb-[50vh]">
              {steps.map((step, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div 
                    key={idx}
                    ref={(el) => { itemRefs.current[idx] = el; }}
                    className="w-full flex flex-row items-start text-left gap-5 sm:gap-8 lg:gap-10 transition-opacity duration-300 ease-out will-change-opacity"
                    style={{ opacity: idx === 0 ? 1 : 0.4 }}
                  >
                    {/* Number in Modern Blue */}
                    <div className="text-[#2563EB] font-sans font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] shrink-0 mt-0 pt-0">
                      {step.number}
                    </div>

                    <div className="flex flex-col space-y-3 sm:space-y-4 max-w-xl w-full">
                      {/* Step Title */}
                      <h3 className="font-sans font-bold text-xl sm:text-3xl lg:text-[2.5rem] text-zinc-900 leading-[1.15] mt-0 pt-0">
                        {step.title}
                      </h3>

                      {/* Step Description */}
                      <p className="text-zinc-500 text-sm sm:text-base lg:text-lg leading-snug font-sans">
                        {step.description}
                      </p>

                      {/* Mobile Only: Inline Image directly underneath description synchronized with active scroll */}
                      <div className="block md:hidden w-full pt-3">
                        <div 
                          className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-zinc-200/80 transition-all duration-500 ease-out ${
                            isActive 
                              ? "opacity-100 translate-y-0 scale-100 shadow-zinc-300/50" 
                              : "opacity-0 -translate-y-2 scale-[0.96] pointer-events-none"
                          }`}
                        >
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/15 to-transparent pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
