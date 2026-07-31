import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

import zulPortrait from "../assets/images/zul_portrait_1782401824631.jpg";

interface ScrollWordProps {
  word: string;
  index: number;
  total: number;
  progress: any;
  theme?: "light" | "dark";
  key?: any;
}

function ScrollWord({ word, index, total, progress, theme = "dark" }: ScrollWordProps) {
  const isLight = theme === "light";
  const start = index / total;
  const end = Math.min(1, (index + 1.5) / total);
  
  // Animate opacity from 0.15 to 1.0
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  
  return (
    <span className="relative inline-block mr-[0.25em] select-none">
      <motion.span 
        style={{ opacity }} 
        className={`font-sans font-medium ${isLight ? "text-zinc-950" : "text-white"}`}
      >
        {word}
      </motion.span>
    </span>
  );
}

interface MyStatsProps {
  theme?: "light" | "dark";
}

export default function MyStats({ theme = "dark" }: MyStatsProps) {
  const isLight = theme === "light";
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Set up scroll listener tracking the container section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 80%"],
  });

  const textParagraph = 
    "A passionate UI/UX designer committed to blending creativity with user-focused design, crafting seamless digital experiences that captivate and engage. Skilled in translating concepts into visually striking and intuitive interfaces that leave a lasting impact.";

  const words = textParagraph.split(" ");

  return (
    <section 
      id="stats-section" 
      ref={containerRef} 
      className={`relative w-full py-10 sm:py-14 overflow-hidden ${
        isLight ? "bg-white" : "bg-zinc-950"
      }`}
    >
      {/* Load beautiful handwriting Google Font for signature */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap');
        .signature-font {
          font-family: 'Alex Brush', cursive;
        }
      `}</style>

      <div className="w-full px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 lg:items-stretch items-start mb-8">
          
          {/* Left Column: Portrait Card with stylized orange/warm backdrop */}
          <div className="lg:col-span-3 lg:h-full flex flex-col items-center lg:items-stretch justify-stretch">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[265px] sm:max-w-[310px] lg:max-w-[285px] aspect-[3.5/4.5] lg:aspect-auto lg:h-full lg:flex-1 group"
            >
              {/* Outer card with overflow-hidden for the image/hover effect */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl z-10">
                {/* User Portrait Image */}
                <img 
                  src={zulPortrait} 
                  alt="Zul Portrait" 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700 ease-out z-10"
                />
                
                {/* Overlay gradient at bottom for image readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />
              </div>


            </motion.div>
          </div>

          {/* Right Column: Scroll-reveal paragraph, aligned to top and bottom of the left image column */}
          <div className="lg:col-span-8 lg:col-start-5 flex flex-col justify-center pt-0">
            
            {/* Scroll-Reveal Responsive Sentence Container */}
            <div ref={textRef} className="w-full">
              <h3 className={`font-sans font-medium text-xl sm:text-2xl lg:text-[36px] xl:text-[44px] leading-tight tracking-tight ${isLight ? "text-zinc-300" : "text-zinc-700"}`}>
                {words.map((word, i) => (
                  <ScrollWord 
                    key={i} 
                    word={word} 
                    index={i} 
                    total={words.length} 
                    progress={scrollYProgress} 
                    theme={theme}
                  />
                ))}
              </h3>
            </div>

          </div>

        </div>

        {/* Email Me button container, aligned perfectly with the text column on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
          <div className="lg:col-start-5 lg:col-span-8 flex items-center">
            <a 
              href="#"
              className={`group ${isLight ? "get-in-touch-btn" : "get-in-touch-btn-dark"} flex items-center gap-2`}
            >
              <span>Email me</span>
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out" strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

