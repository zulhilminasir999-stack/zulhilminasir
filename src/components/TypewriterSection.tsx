import React, { useEffect, useState, useRef } from "react";
import { motion, useTransform, MotionValue, useSpring } from "motion/react";

interface TypewriterSectionProps {
  scrollYProgress: MotionValue<number>;
}

export default function TypewriterSection({ scrollYProgress }: TypewriterSectionProps) {
  const strings = [
    "        AI accelerates creation, yet exceptional design engineering always begins with human thinking, purposeful decisions, and meaningful creative interaction.",
    "        Behind every intelligent AI solution stands human-centered design engineering, transforming technology into purposeful, practical, and memorable experiences for everyone."
  ];

  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (isFading) {
      // Fade out duration is 1000ms. When complete, switch to the next string and reset typing
      const fadeOutTimeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setStringIndex((prev) => (prev + 1) % strings.length);
        setIsFading(false);
      }, 1000);
      return () => clearTimeout(fadeOutTimeout);
    }

    const currentString = strings[stringIndex];
    const leadingMatch = currentString.match(/^\s+/);
    const leadingCount = leadingMatch ? leadingMatch[0].length : 0;

    if (charIndex === 0 && leadingCount > 0) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText(currentString.substring(0, leadingCount + 1));
        setCharIndex(leadingCount + 1);
      }, 35);
      return () => clearTimeout(typingTimeout);
    }

    if (charIndex < currentString.length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText(currentString.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(typingTimeout);
    } else {
      // Typing finished. Stay visible for 4 seconds, then trigger fade out
      const stayTimeout = setTimeout(() => {
        setIsFading(true);
      }, 4000);
      return () => clearTimeout(stayTimeout);
    }
  }, [charIndex, isFading, stringIndex]);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Create a smoothed progress spring to avoid any notches/jerks during scrolling up or down
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
    restDelta: 0.0001
  });

  // Desktop scroll transition ranges
  const typewriterOpacityDesktop = useTransform(smoothScrollProgress, [0, 0.22], [1, 0]);
  const typewriterScaleDesktop = useTransform(smoothScrollProgress, [0, 0.22], [1, 0.92]);
  const typewriterYDesktop = useTransform(smoothScrollProgress, [0, 0.22], [0, -40]);

  const whiteCircleScaleDesktop = useTransform(smoothScrollProgress, [0.12, 0.65], [0, 20]);

  const galleryScaleDesktop = useTransform(smoothScrollProgress, [0.22, 0.58], [0.7, 1]);
  const galleryOpacityDesktop = useTransform(smoothScrollProgress, [0.22, 0.50], [0, 1]);
  const galleryYDesktop = useTransform(smoothScrollProgress, [0.22, 0.58], [120, 0]);

  // Mobile-specific scroll transition ranges (reveal earlier right after the expanding white portal circle)
  const typewriterOpacityMobile = useTransform(smoothScrollProgress, [0, 0.12], [1, 0]);
  const typewriterScaleMobile = useTransform(smoothScrollProgress, [0, 0.12], [1, 0.92]);
  const typewriterYMobile = useTransform(smoothScrollProgress, [0, 0.12], [0, -30]);

  const whiteCircleScaleMobile = useTransform(smoothScrollProgress, [0.06, 0.32], [0, 26]);

  const galleryScaleMobile = useTransform(smoothScrollProgress, [0.08, 0.20], [0.88, 1]);
  const galleryOpacityMobile = useTransform(smoothScrollProgress, [0.08, 0.18], [0, 1]);
  const galleryYMobile = useTransform(smoothScrollProgress, [0.08, 0.20], [20, 0]);

  const typewriterOpacity = isMobile ? typewriterOpacityMobile : typewriterOpacityDesktop;
  const typewriterScale = isMobile ? typewriterScaleMobile : typewriterScaleDesktop;
  const typewriterY = isMobile ? typewriterYMobile : typewriterYDesktop;

  const whiteCircleScale = isMobile ? whiteCircleScaleMobile : whiteCircleScaleDesktop;

  const galleryScale = isMobile ? galleryScaleMobile : galleryScaleDesktop;
  const galleryOpacity = isMobile ? galleryOpacityMobile : galleryOpacityDesktop;
  const galleryY = isMobile ? galleryYMobile : galleryYDesktop;

  // 5. Scroll the content block up naturally as the user scrolls further
  const naturalScrollYDesktop = useTransform(smoothScrollProgress, [0.70, 1.0], ["0vh", "-10vh"]);
  const naturalScrollYMobile = useTransform(smoothScrollProgress, [0.40, 1.0], ["0vh", "-4vh"]);
  const naturalScrollY = isMobile ? naturalScrollYMobile : naturalScrollYDesktop;

  // Refs for auto-scaling text to perfectly match the width of the container
  const h1ContainerRef = useRef<HTMLDivElement>(null);
  const h1TextRef = useRef<HTMLHeadingElement>(null);
  const pTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const resizeText = () => {
      if (h1ContainerRef.current) {
        const containerWidth = h1ContainerRef.current.clientWidth;
        if (containerWidth > 0) {
          // Scale H1
          if (h1TextRef.current) {
            h1TextRef.current.style.fontSize = "100px";
            const h1Width = h1TextRef.current.scrollWidth;
            if (h1Width > 0) {
              const visualWidth = h1Width - 8;
              const h1Scale = containerWidth / visualWidth;
              h1TextRef.current.style.fontSize = `${100 * h1Scale}px`;
            }
          }
          // Scale P
          if (pTextRef.current) {
            pTextRef.current.style.fontSize = "10px";
            const pWidth = pTextRef.current.scrollWidth;
            if (pWidth > 0) {
              const pScale = containerWidth / pWidth;
              pTextRef.current.style.fontSize = `${10 * pScale}px`;
            }
          }
        }
      }
    };

    // Initial resize
    resizeText();
    
    // Add small delay to ensure fonts are loaded
    const timeoutId = setTimeout(resizeText, 100);
    const timeoutId2 = setTimeout(resizeText, 500);
    
    window.addEventListener("resize", resizeText);
    return () => {
      window.removeEventListener("resize", resizeText);
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, []);

  const renderFormattedText = (text: string) => {
    if (!text) {
      return (
        <span className="inline-block w-[3px] sm:w-[4px] h-[1.1em] bg-white ml-1.5 align-middle animate-[blink_1s_infinite]" />
      );
    }

    const tokens = text.split(/(\s+)/);
    const elements: React.ReactNode[] = [];

    tokens.forEach((token, idx) => {
      if (!token) return;
      if (/^\s+$/.test(token)) {
        elements.push(token);
        return;
      }

      const cleanWord = token.toLowerCase().replace(/[^a-z]/g, "");
      const isHighlighted = ["launching", "refining", "purposeful"].includes(cleanWord);

      elements.push(
        <span 
          key={idx} 
          className={isHighlighted ? "text-white font-medium" : "text-white font-medium"}
        >
          {token}
        </span>
      );
    });

    return (
      <>
        {elements}
        <span className="inline-block w-[3px] sm:w-[4px] h-[1.1em] bg-white ml-1.5 align-middle animate-[blink_1s_infinite]" />
      </>
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden" style={{ paddingBottom: 0 }}>
      {/* Grain texture in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.12] mix-blend-overlay">
        <svg viewBox="0 0 250 250" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="typewriterNoiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#typewriterNoiseFilter)" />
        </svg>
      </div>

      {/* 1. Typewriter content without bounding container */}
      <motion.div
        style={{
          opacity: typewriterOpacity,
          scale: typewriterScale,
          y: typewriterY,
          transformOrigin: "center center",
        }}
        className="absolute inset-0 flex flex-col justify-center z-10 px-6 sm:px-12 lg:px-16 select-none w-full"
      >
        {/* Top Headline: Typewriter sentence aligned like photo with stable height */}
        <h2 
          className={`font-sans font-medium text-[19px] sm:text-[30px] md:text-[36px] lg:text-[41px] xl:text-[41px] text-white tracking-tight leading-[1.3] sm:leading-[1.2] transition-opacity duration-1000 min-h-[130px] sm:min-h-[145px] md:min-h-[160px] lg:min-h-[175px] flex flex-col justify-start text-left w-full max-w-[1400px] -mt-60 sm:-mt-12 md:-mt-16 ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <span 
            id="typewriter-text" 
            className="text-white font-sans font-medium block whitespace-pre-wrap text-[19px] sm:text-[30px] md:text-[36px] lg:text-[41px] xl:text-[41px]"
          >
            {renderFormattedText(displayedText)}
          </span>
        </h2>

        {/* Bottom Section: 2 Images on left, Text & Button on right - fixed position unaffected by typing */}
        <div className="w-full flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8 mt-24 sm:mt-[90px] md:mt-[110px] lg:mt-[125px] -mb-56 sm:mb-0">
          {/* 2 images located under-left of the sentence */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-lg overflow-hidden shadow-2xl border border-white/20 bg-zinc-900 group shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=400" 
                alt="Creative Mineral Art Concept" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-lg overflow-hidden shadow-2xl border border-white/20 bg-zinc-900 group shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" 
                alt="Creative Portrait" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Text and Button located on right of images */}
          <div className="flex flex-col items-start text-left max-w-xl sm:ml-20 md:ml-[140px] lg:ml-[320px] xl:ml-[420px]">
            <span className="text-[#EF4444] font-bold text-xs sm:text-sm tracking-tight mb-1 select-none">
              Afterform®
            </span>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-3 font-normal select-none">
              We work with teams at different stages, helping them define direction, reduce complexity, and build digital experiences that support real goals. From early concepts to mature products, our focus stays on clarity, structure, and long-term value
            </p>
            <button
              id="typewriter-create-btn"
              onClick={() => {
                const contactSection = document.getElementById("contact-section");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 bg-black hover:bg-zinc-900 active:scale-[0.98] text-white text-xs sm:text-sm font-medium px-3.5 py-2 rounded-md shadow-lg transition-all duration-200 border border-white/10 select-none cursor-pointer"
            >
              <span>Let's Create</span>
              <span className="inline-block w-1.5 h-1.5 bg-white rounded-[1px]" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* 2. Expanding White Portal Circle (positioned at top layout on mobile, bottom center on desktop) */}
      <motion.div 
        style={{
          scale: whiteCircleScale,
          transformOrigin: "center center",
          left: "calc(50% - 150px)",
          top: isMobile ? "calc(16% - 150px)" : undefined,
          bottom: isMobile ? "auto" : "-150px",
          willChange: "transform",
        }}
        className="absolute w-[300px] h-[300px] rounded-full bg-white z-0 pointer-events-none origin-center transform-gpu"
      />

      {/* 3. Content revealed inside the white portal (positioned high in top layout on mobile, bottom on desktop) */}
      <motion.div 
        style={{
          y: naturalScrollY,
        }}
        className="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center justify-start pt-[10vh] sm:justify-end sm:pt-0 sm:pb-[22vh] md:pb-[28vh] z-20 w-full p-0 m-0 pointer-events-none"
      >
        <motion.div 
          style={{
            scale: galleryScale,
            opacity: galleryOpacity,
            y: galleryY,
            transformOrigin: "center center"
          }}
          className="flex justify-center w-full p-0 m-0 px-0 mx-0"
        >
          <div className="flex flex-col items-center pointer-events-auto translate-y-0 sm:-translate-y-12 w-full p-0 m-0 px-6 sm:px-12 lg:px-16">
            <div ref={h1ContainerRef} className="w-full flex justify-center items-center overflow-visible">
              <h1 ref={h1TextRef} style={{ marginLeft: "-0.04em", marginRight: "-0.04em", fontFamily: "Satoshi, sans-serif" }} className="text-[12vw] sm:text-[14vw] md:text-[clamp(60px,15vw,217.24px)] font-black tracking-tighter text-[#1A4B82] text-center leading-[0.85] whitespace-nowrap p-0 m-0 select-none origin-center">
                Ideas in Action
              </h1>
            </div>
            <p 
              id="ideas-in-action-subtitle"
              ref={pTextRef}
              style={{ 
                margin: isMobile ? "12px 0 0 0" : "20px 0 0 0", 
                padding: "0" 
              }} 
              className="text-[#666666] font-medium text-center whitespace-nowrap tracking-tight leading-none select-none block origin-center"
            >
              Perfectly aligned creative and production expertise to increase digital impact
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Tailwind keyframes style injection for custom cursor blinking */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
