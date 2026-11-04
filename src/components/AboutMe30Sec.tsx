import React, { useState, useEffect, useRef } from "react";
import { Hand, ChevronDown, ChevronUp } from "lucide-react";
import { motion, useInView } from "motion/react";
import { WordsStagger } from "../registry/spell-ui/words-stagger";

interface AboutMeProps {
  theme?: "light" | "dark";
}

function JustifiedWordsStagger({
  children,
  trigger,
  delay = 0.15,
  duration = 0.75,
  stagger = 0.015,
  yOffset = 14,
  blurAmount = "8px",
}: {
  children: string;
  trigger: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
  yOffset?: number;
  blurAmount?: string;
}) {
  const words = children.trim().split(/\s+/);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: `blur(${blurAmount})`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.p
      style={{ textAlign: "justify", textAlignLast: "left" }}
      variants={containerVariants}
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <motion.em variants={wordVariants} className="not-italic inline-block">
            {word}
          </motion.em>
          {index < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </motion.p>
  );
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDesktopSm, setIsDesktopSm] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 640;
    }
    return true;
  });

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktopSm(window.innerWidth >= 640);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const isHeadlineInView = useInView(headlineRef, { once: false, amount: 0.2 });
  const isBodyInView = useInView(bodyRef, { once: false, amount: 0.15 });

  return (
    <div id="about-me-container" className="w-full text-left">
      <div className="max-w-[850px] mx-auto px-0 sm:px-6 space-y-10">
        {/* Bold Headline matching the two-line size of the reference image */}
        <h2
          ref={headlineRef}
          className="font-sans font-bold text-3xl sm:text-4xl md:text-[50px] leading-[1.12] tracking-tight text-zinc-900"
        >
          <WordsStagger
            trigger={isHeadlineInView}
            delay={0.05}
            stagger={0.06}
            className="text-inherit leading-[1.12] [&>span:last-child]:mr-0"
          >
            Creating thoughtful digital experiences where design, technology, and AI work together.
          </WordsStagger>
        </h2>

        {/* Description paragraphs - justified with last line aligned left */}
        <div
          ref={bodyRef}
          className="space-y-6 font-sans text-[17px] sm:text-[19px] leading-[1.65] text-zinc-600 font-normal"
        >
          {/* Paragraph 1: Always visible */}
          <JustifiedWordsStagger
            trigger={isBodyInView}
            delay={0.12}
            stagger={0.016}
          >
            I started my career in visual design, where I developed a strong foundation in digital communication, visual presentation, and creating engaging user experiences. Over time, my interests expanded into website development, digital platforms, and technology-driven solutions.
          </JustifiedWordsStagger>

          {/* Paragraph 2: Always visible */}
          <JustifiedWordsStagger
            trigger={isBodyInView}
            delay={0.26}
            stagger={0.012}
          >
            Today, I combine web development, UI/UX principles, CMS management, and AI-assisted development to build intuitive, responsive, and user-focused digital solutions. With hands-on experience using Visual Studio Code (VS Code), Figma, WordPress, SiteGiant, HTML, CSS, JavaScript, and AI-powered development tools such as Google Antigravity, Claude Code, Codex, and Cline. I work across website development, interface customisation, wireframing, prototyping, and digital platform management to transform user and business requirements into practical digital solutions.
          </JustifiedWordsStagger>

          {/* Mobile More Button (at bottom of earlier 2 paragraphs when collapsed) */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={
                isBodyInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 14, filter: "blur(8px)" }
              }
              transition={{ duration: 0.75, delay: 0.38, ease: [0.215, 0.61, 0.355, 1] }}
              className="sm:hidden pt-1"
            >
              <button
                type="button"
                id="about-me-more-btn"
                onClick={() => setIsExpanded(true)}
                className="inline-flex items-center gap-1.5 text-[#2563EB] font-sans font-medium text-[16px] hover:text-[#1d4ed8] cursor-pointer transition-colors"
              >
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Paragraphs 3 & 4: Always visible on desktop (sm:), toggleable on mobile */}
          <div className={`${isExpanded ? "block" : "hidden"} sm:!block space-y-6 transition-opacity duration-300`}>
            <JustifiedWordsStagger
              trigger={isBodyInView && (isDesktopSm || isExpanded)}
              delay={isDesktopSm ? 0.40 : 0.04}
              stagger={0.015}
            >
              Beyond website development, I have also explored building web-based systems, administrative applications, and interactive platforms using technologies such as Firebase, JavaScript, and AI-assisted coding workflows. My approach integrates technical implementation, usability, problem-solving, and continuous improvement to deliver solutions that support both operational efficiency and business objectives.
            </JustifiedWordsStagger>
            <JustifiedWordsStagger
              trigger={isBodyInView && (isDesktopSm || isExpanded)}
              delay={isDesktopSm ? 0.54 : 0.16}
              stagger={0.016}
            >
              For me, successful digital solutions go beyond visual presentation. They are about building functional and intuitive front-end experiences, delivering seamless interactions, simplifying processes, and creating meaningful value for both users and businesses.
            </JustifiedWordsStagger>

            {/* Mobile Less Button (at bottom of full texts when expanded) */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={
                  isBodyInView && isExpanded
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 14, filter: "blur(8px)" }
                }
                transition={{ duration: 0.75, delay: 0.28, ease: [0.215, 0.61, 0.355, 1] }}
                className="sm:hidden pt-1"
              >
                <button
                  type="button"
                  id="about-me-less-btn"
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center gap-1.5 text-[#2563EB] font-sans font-medium text-[16px] hover:text-[#1d4ed8] cursor-pointer transition-colors"
                >
                  <span>Less</span>
                  <ChevronUp className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Author details with circular profile image matching the Stephen McShannock style of reference image */}
        <div className="flex items-center gap-4 pt-8 mt-4">
          <img 
            src="/DemoPic/Zul.jpg" 
            alt="Zulhilmi Nasir" 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-[50%_20%] filter grayscale contrast-[1.05] hover:grayscale-0 hover:contrast-100 transition-all duration-500 ease-out border border-zinc-200"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-sans font-semibold text-[17px] sm:text-[19px] text-zinc-900 leading-tight">
              Zulhilmi Nasir,
            </span>
            <span className="font-sans text-[13px] sm:text-[14px] text-zinc-500 font-medium tracking-wide mt-1">
              Web Developer &amp; AI-Driven Digital Solutions | Front-End Development | UI/UX
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
