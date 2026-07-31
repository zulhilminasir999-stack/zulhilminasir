import { Hand } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface AboutMeProps {
  theme?: "light" | "dark";
}

// Custom hook-based CountUp animator to smoothly count to target numbers with zero external dependencies
function CountUp({ 
  start = 0, 
  end, 
  duration = 3200, // slightly slower for better readability
  suffix = "", 
  trigger = false 
}: { 
  start?: number; 
  end: number; 
  duration?: number; 
  suffix?: string; 
  trigger?: boolean 
}) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!trigger) {
      setCount(start);
      return;
    }

    let startVal = start;
    const endVal = end;
    if (startVal === endVal) {
      setCount(endVal);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutCubic animation progression formula for custom smooth curves
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * (endVal - startVal) + startVal);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(endVal);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [start, end, duration, trigger]);

  return <>{count}{suffix}</>;
}

// Gear & Hand illustration SVG custom crafted for high design fidelity
const GearHandIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px] text-[#1b2255] dark:text-cyan-400 fill-current" aria-hidden="true">
    {/* Vertical cuffs on wrists */}
    <rect x="8" y="52" width="6" height="26" rx="2.5" />
    {/* CUUP finger/hand contour */}
    <path d="M 18 63 L 26 63 C 32 63, 36 61, 39 58 L 74 41 C 77 39.5, 79 43, 76 45 L 43 65 C 38 68, 30 70, 24 70 L 18 70 Z" />
    <path d="M 18 52 C 18 47, 24 43, 29 43 C 32 43, 34 45, 34 48 L 34 52 H 18 Z" />
    {/* Cog background */}
    <circle cx="56" cy="34" r="21" className="text-zinc-100 dark:text-zinc-900" fill="currentColor" />
    {/* Cog border layout */}
    <circle cx="56" cy="34" r="21" fill="none" stroke="currentColor" strokeWidth="4.5" />
    {/* Gear teeth segments */}
    <path d="M 56 7 V 13 M 56 55 V 61 M 29 34 H 35 M 77 34 H 83 M 37.5 15.5 L 41.5 19.5 M 70.5 48.5 L 74.5 52.5 M 70.5 15.5 L 66.5 19.5 M 37.5 48.5 L 33.5 52.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
    {/* Rising arrow plot line */}
    <path d="M 44 42 M 45 42 L 52 34 L 59 39 L 69 25" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 61 25 H 69 V 33" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Globe with Export shipping box illustration
const GlobeBoxIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px] text-[#1b2255] dark:text-cyan-400 fill-current" aria-hidden="true">
    {/* Outer boundary sphere */}
    <circle cx="44" cy="42" r="24" fill="none" stroke="currentColor" strokeWidth="4" />
    {/* Latitude contour curves */}
    <path d="M 21.5 34 C 28 39, 60 39, 66.5 34 M 20 42 H 68 M 21.5 50 C 28 45, 60 45, 66.5 50" fill="none" stroke="currentColor" strokeWidth="2.5" />
    {/* Meridians loops */}
    <path d="M 44 18 C 34 26, 34 58, 44 66 M 44 18 C 54 26, 54 58, 44 66 M 44 18 V 66" fill="none" stroke="currentColor" strokeWidth="2.5" />
    
    {/* Isometric mailing/parcel box on the bottom right */}
    <path d="M 55 64 L 71 56 L 87 64 L 71 72 Z" stroke="currentColor" strokeWidth="1" />
    <path d="M 55 64 V 80 L 71 88 V 72 Z" stroke="currentColor" strokeWidth="1" />
    <path d="M 71 72 V 88 L 87 80 V 64 Z" stroke="currentColor" strokeWidth="1" />
    {/* Packaging split crease tape line detail */}
    <path d="M 63 60 L 79 68" stroke="currentColor" strokeWidth="2" opacity="0.35" />
    
    {/* High index shipping Up arrow */}
    <path d="M 87 22 V 44 M 79 30 L 87 22 L 95 30" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Globe with continent markers and location map pin
const GlobePinIcon = () => (
  <svg viewBox="0 0 100 100" className="w-[100px] h-[100px] text-[#1b2255] dark:text-cyan-400 fill-current" aria-hidden="true">
    {/* Spherical circle wireframe */}
    <circle cx="50" cy="54" r="24" fill="none" stroke="currentColor" strokeWidth="4" />
    {/* Latitudes outlines */}
    <path d="M 28 46 C 36 50, 64 50, 72 46 M 28 62 C 36 58, 64 58, 72 62" fill="none" stroke="currentColor" strokeWidth="2.5" />
    {/* Longitude curves */}
    <path d="M 50 30 C 40 38, 40 70, 50 78 M 50 30 C 60 38, 60 70, 50 78 M 50 30 V 78" fill="none" stroke="currentColor" strokeWidth="2.5" />
    {/* Continental land details */}
    <path d="M 32 44 Q 30 50 33 55 T 30 65 Q 36 67 36 58 Z M 64 42 Q 68 47 62 52 T 66 61 Q 72 56 68 45 Z" opacity="0.3" />

    {/* Location Pin pointer center-aligned on top */}
    <path d="M 50 6 C 41 6, 34 13, 34 22 C 34 33, 50 48, 50 48 C 50 48, 66 33, 66 22 C 66 13, 59 6, 50 6 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
    {/* Center cutout of map pin */}
    <circle cx="50" cy="22" r="5" fill="none" stroke="currentColor" strokeWidth="2.5" />
  </svg>
);

export default function AboutMe30Sec({ theme = "dark" }: AboutMeProps) {
  // Theme is synchronized with website
  const isLight = theme === "light";

  return (
    <div id="about-me-container" className="w-full text-left">
      <motion.div 
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[850px] mx-auto px-4 sm:px-6 space-y-10"
      >
        {/* Bold Headline matching the two-line size of the reference image */}
        <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-[50px] leading-[1.12] tracking-tight text-zinc-900">
          Creating thoughtful digital experiences where design, technology, and AI work together.
        </h2>

        {/* Description paragraphs - justified with last line aligned left */}
        <div className="space-y-6 font-sans text-[17px] sm:text-[19px] leading-[1.65] text-zinc-600 font-normal">
          <p style={{ textAlign: "justify", textAlignLast: "left" }}>
            I started my career in visual design, where I learned that great design is more than aesthetics - it's about communication, clarity, and creating memorable user experiences.
          </p>
          <p style={{ textAlign: "justify", textAlignLast: "left" }}>
            Today, I combine UI/UX design, front-end development, AI-powered workflows, and modern website development using Webflow and WordPress to build intuitive, responsive, and high-performing digital experiences. With over four years of experience in visual design, I bridge the gap between design and development, using AI to accelerate research, content creation, wireframing, prototyping, and design exploration.
          </p>
          <p style={{ textAlign: "justify", textAlignLast: "left" }}>
            Whether I'm designing digital products, developing websites with Webflow and WordPress, or integrating AI into the creative process, my goal is to deliver solutions that balance usability, aesthetics, performance, accessibility, and business impact.
          </p>
          <p style={{ textAlign: "justify", textAlignLast: "left" }}>
            For me, great design isn't just about how something looks - it's about how it works, how it feels, and the value it creates for both users and businesses.
          </p>
        </div>

        {/* Author details with circular profile image matching the Stephen McShannock style of reference image */}
        <div className="flex items-center gap-4 pt-8 mt-4">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80" 
            alt="Zulhilmi Nasir" 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 ease-out border border-zinc-200"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-sans font-semibold text-[17px] sm:text-[19px] text-zinc-900 leading-tight">
              Zulhilmi Nasir,
            </span>
            <span className="font-sans text-[13px] sm:text-[14px] text-zinc-500 font-medium tracking-wide mt-1">
              Web Designer, Wordpress Developer, UI/UX Design Engineer, Vibe Coding Developer
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
