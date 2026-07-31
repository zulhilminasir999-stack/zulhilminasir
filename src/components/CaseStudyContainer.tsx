import React, { useState, useEffect, useRef } from "react";
import { Project } from "../types";
import { 
  X, 
  Smartphone, 
  Laptop, 
  Layers, 
  Box, 
  ArrowLeft 
} from "lucide-react";
import { motion } from "motion/react";
import { ParallaxCardWrapper } from "./ui/parallax-card-wrapper";
import { PORTFOLIO_PROJECTS } from "../data";

interface CaseStudyContainerProps {
  project: Project;
  theme?: string;
  onClose?: () => void;
  onNavigateToProject?: (id: string) => void;
}

export default function CaseStudyContainer({ 
  project, 
  theme = "light", 
  onClose,
  onNavigateToProject
}: CaseStudyContainerProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth < 640);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.imageUrl];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const atTop = target.scrollTop < 10;
    const atBottom = target.scrollHeight - target.scrollTop - target.clientHeight < 15;
    setIsAtTop(atTop);
    setIsAtBottom(atBottom);
  };

  return (
    <motion.div
      key={project.id}
      id="project-modal-card"
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0
      }}
      exit={{ opacity: 0, scale: 0.98, y: 30 }}
      transition={{ type: "spring", damping: 30, stiffness: 240 }}
      className={`relative z-10 h-full flex flex-col bg-white overflow-hidden transition-all duration-500 ease-out w-full border border-zinc-200/80 rounded-[24px] sm:rounded-[32px] shadow-2xl`}
    >
      
      {/* Floating Close Button Overlay */}
      {onClose && (
        <div className="absolute top-5 right-5 sm:top-6 sm:right-8 z-40">
          <button
            id="close-project-modal"
            onClick={onClose}
            className="rounded-full p-2.5 transition-all duration-200 cursor-pointer bg-white/95 backdrop-blur-md hover:bg-white text-zinc-800 border border-zinc-200/80 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 z-50 focus:outline-none"
            aria-label="Close case study"
          >
            <X className="h-4.5 w-4.5 text-zinc-800" />
          </button>
        </div>
      )}

      {/* Scrollable Content Viewport Container */}
      <div 
        ref={modalScrollRef}
        onScroll={handleScroll}
        className="overflow-y-auto flex-1 p-5 sm:p-8 md:p-12 space-y-8 scrollbar-none [&::-webkit-scrollbar]:hidden relative"
      >
        
        {/* Theme Solid Frame Align to Top with Title */}
        <div className="bg-[#0A2947] p-[1.5px] rounded-2xl w-full">
          <div className="bg-zinc-950 p-6 sm:p-8 rounded-[15px] space-y-2 text-left">
            <h3 className="font-sans font-medium text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-white uppercase">
              {project.title}
            </h3>
            <p className="font-sans font-medium text-xs sm:text-sm md:text-base text-zinc-400 leading-normal max-w-4xl pt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
          
          {/* Left Column: Scrollable Images & Explanations */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* FIRST IMAGE */}
            <div className="rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 relative group">
              <img 
                src={images[0]} 
                alt={`${project.title} main visual`}
                className="w-full h-auto object-cover max-h-[600px] transition-transform duration-500 hover:scale-[1.01]" 
                referrerPolicy="no-referrer"
              />
            </div>

            {/* EXPLANATIONS (Only after the first image) */}
            <div className="space-y-8 py-2 text-left">
              
              {/* The Challenge */}
              <div className="space-y-4">
                <h4 className="font-sans font-medium text-lg sm:text-xl text-zinc-900 dark:text-white tracking-tight flex items-center gap-2.5 border-b border-zinc-900 dark:border-zinc-800 pb-2">
                  <span className="text-[#0A2947] font-semibold">01</span> The Challenge
                </h4>
                <p className="font-sans font-medium text-zinc-650 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {project.challenge || project.summary}
                </p>
              </div>

              {/* The Solution */}
              <div className="space-y-4">
                <h4 className="font-sans font-medium text-lg sm:text-xl text-zinc-900 dark:text-white tracking-tight flex items-center gap-2.5 border-b border-zinc-900 dark:border-zinc-800 pb-2">
                  <span className="text-[#0A2947] font-semibold">02</span> The Solution
                </h4>
                <p className="font-sans font-medium text-zinc-650 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {project.solution || project.summary}
                </p>
              </div>

              {/* The Features */}
              <div className="space-y-4">
                <h4 className="font-sans font-medium text-lg sm:text-xl text-zinc-900 dark:text-white tracking-tight flex items-center gap-2.5 border-b border-zinc-900 dark:border-zinc-800 pb-2">
                  <span className="text-[#0A2947] font-semibold">03</span> Key Features
                </h4>
                <ul className="space-y-3">
                  {project.results && project.results.length > 0 ? (
                    project.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-zinc-650 dark:text-zinc-400 font-sans text-xs sm:text-sm lg:text-base leading-relaxed">
                        <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[#0A2947]/10 border border-[#0A2947]/20 text-[#0A2947] dark:text-[#0a2947]/90 flex items-center justify-center text-xs font-mono font-bold">
                          ✓
                        </span>
                        <span>{result}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-3 text-zinc-650 dark:text-zinc-400 font-sans text-xs sm:text-sm lg:text-base leading-relaxed">
                      <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[#0A2947]/10 border border-[#0A2947]/20 text-[#0A2947] dark:text-[#0a2947]/90 flex items-center justify-center text-xs font-mono font-bold">
                        ✓
                      </span>
                      <span>High precision system execution and responsive performance layouts.</span>
                    </li>
                  )}
                </ul>
              </div>

            </div>

            {/* REMAINING IMAGES (4 to 5 images stacked nicely) */}
            {images.length > 1 && (
              <div className="space-y-8 pt-4">
                {images.slice(1).map((imgUrl, idx) => (
                  <div 
                    key={imgUrl}
                    className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-900 bg-zinc-950 relative group"
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${project.title} development screenshot ${idx + 2}`}
                      className="w-full h-auto object-cover max-h-[600px] transition-transform duration-500 hover:scale-[1.01]" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Sticky "Case Details" card container */}
          <div className="lg:col-span-4 lg:sticky lg:top-6 self-start w-full">
            <div className={`rounded-2xl border p-6 sm:p-8 space-y-6 text-left shrink-0 ${
              theme === "light"
                ? "border-zinc-200 bg-white shadow-sm"
                : "border-zinc-800 bg-white"
            }`}>
              <h4 className={`font-sans font-medium text-xs uppercase tracking-widest border-b pb-3 ${
                theme === "light" ? "text-zinc-400 border-zinc-100" : "text-zinc-500 border-zinc-800"
              }`}>
                Case Details
              </h4>
              
              {/* Brand Display */}
              <div className="py-1">
                {(() => {
                  const titleLower = project.title.toLowerCase();
                  const subLower = project.subtitle.toLowerCase();
                  const catLower = project.categoryLabel.toLowerCase();
                  
                  if (titleLower.includes("app") || titleLower.includes("mobile") || titleLower.includes("wallet") || catLower.includes("mobile") || subLower.includes("children")) {
                    return (
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-sm">
                          <Smartphone className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-sans font-black text-zinc-900 text-sm tracking-tight leading-tight uppercase block text-left">
                            {project.client || "Self-Initiated Concept"}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  
                  if (titleLower.includes("hub") || titleLower.includes("system") || titleLower.includes("toolkit") || titleLower.includes("e-commerce") || titleLower.includes("retail") || catLower.includes("web") || catLower.includes("dev")) {
                    return (
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-cyan-500 flex items-center justify-center text-white shadow-sm">
                          <Laptop className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-sans font-black text-zinc-900 text-sm tracking-tight leading-tight uppercase block text-left">
                            {project.client || "Self-Initiated Concept"}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  
                  if (titleLower.includes("workspace") || titleLower.includes("ui/ux") || catLower.includes("ui") || catLower.includes("design") || subLower.includes("layout")) {
                    return (
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm">
                          <Layers className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-sans font-black text-zinc-900 text-sm tracking-tight leading-tight uppercase block text-left">
                            {project.client || "Self-Initiated Concept"}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-xl bg-purple-500 flex items-center justify-center text-white shadow-sm">
                        <Box className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="font-sans font-black text-zinc-900 text-sm tracking-tight leading-tight uppercase block text-left">
                          {project.client || "Self-Initiated Concept"}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Detail fields in clear keys/values */}
              <div className="space-y-4 pt-2">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold block mb-1">
                    Website:
                  </span>
                  <a 
                    href={project.links && project.links.length > 0 ? project.links[0].url : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-semibold text-sm text-emerald-600 hover:text-emerald-700 transition-colors break-all flex items-center gap-1 hover:underline"
                  >
                    {project.links && project.links.length > 0 
                      ? project.links[0].url.replace(/^https?:\/\//, "") 
                      : `www.${project.id}.com`}
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold block mb-1">
                    Year:
                  </span>
                  <span className="font-sans font-semibold text-sm text-zinc-800">
                    {project.year || "2026"}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold block mb-1">
                    Category:
                  </span>
                  <span className="font-sans font-semibold text-sm text-zinc-800 leading-relaxed block">
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Showcase Section */}
        <div className="border-t border-zinc-200/60 pt-12 mt-12 space-y-8 text-left">
          <div className="space-y-2">
            <h4 className="font-sans font-black text-2xl sm:text-3xl tracking-tight text-zinc-950 uppercase pt-2">
              Related Showcase
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
            {(() => {
              const related = PORTFOLIO_PROJECTS.filter((p) => p.id !== project.id);
              const charSum = Math.abs(project.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0));
              const sortedRelated = [...related].sort((a, b) => ((charSum + a.title.length) % 3) - ((charSum + b.title.length) % 3));
              
              return sortedRelated.map((relatedProj) => (
                <ParallaxCardWrapper key={relatedProj.id}>
                  <a
                    id={`related-project-card-${relatedProj.id}`}
                    href={`/case-study-project/${relatedProj.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group border rounded-3xl p-5 transition-all duration-300 h-full flex flex-col justify-between cursor-pointer block ${
                      theme === "light"
                        ? "border-zinc-200 bg-white hover:bg-zinc-50/50 hover:border-emerald-500/30"
                        : "border-zinc-800 bg-white hover:bg-zinc-100/10 hover:border-emerald-500/20"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Photo area */}
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden relative border bg-zinc-100 border-zinc-200">
                        <img 
                          src={relatedProj.imageUrl} 
                          alt={relatedProj.title}
                          className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Text descriptions */}
                      <div className="space-y-1 text-left">
                        <h5 className="font-sans font-black text-lg text-zinc-900 group-hover:text-emerald-600 transition-colors uppercase leading-snug">
                          {relatedProj.title}
                        </h5>
                      </div>
                    </div>
                  </a>
                </ParallaxCardWrapper>
              ));
            })()}
          </div>
        </div>

      </div>
    </motion.div>
  );
}
