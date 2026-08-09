import { useEffect, useState } from "react";
import { motion, useTransform, MotionValue, useSpring } from "motion/react";

interface TypewriterSectionProps {
  scrollYProgress: MotionValue<number>;
}

export default function TypewriterSection({ scrollYProgress }: TypewriterSectionProps) {
  const strings = [
    "AI accelerates creation, yet exceptional design engineering always begins with human thinking, purposeful decisions, and meaningful creative interaction.",
    "Behind every intelligent AI solution stands human-centered design engineering, transforming technology into purposeful, practical, and memorable experiences for everyone."
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

  // Create a smoothed progress spring to avoid any notches/jerks during scrolling up or down
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
    restDelta: 0.0001
  });

  // Seamless scroll transition ranges with NO gaps
  // 1. Typewriter fades out, scales down and moves up slightly from scroll 0.0 to 0.25
  const typewriterOpacity = useTransform(smoothScrollProgress, [0, 0.22], [1, 0]);
  const typewriterScale = useTransform(smoothScrollProgress, [0, 0.22], [1, 0.88]);
  const typewriterY = useTransform(smoothScrollProgress, [0, 0.22], [0, -50]);

  // 2. White background portal circle expands smoothly from scroll 0.12 to 0.65
  const whiteCircleScale = useTransform(smoothScrollProgress, [0.12, 0.65], [0, 20]);

  // 3. "what i do" text fades in, scales up, and moves up from scroll 0.22 to 0.58
  const galleryScale = useTransform(smoothScrollProgress, [0.22, 0.58], [0.15, 1]);
  const galleryOpacity = useTransform(smoothScrollProgress, [0.22, 0.50], [0, 1]);
  const galleryY = useTransform(smoothScrollProgress, [0.22, 0.58], [280, 0]);

  // 4. Description text fades in, scales up, and moves up from scroll 0.32 to 0.65
  const descScale = useTransform(smoothScrollProgress, [0.32, 0.65], [0.5, 1]);
  const descOpacity = useTransform(smoothScrollProgress, [0.32, 0.58], [0, 1]);
  const descY = useTransform(smoothScrollProgress, [0.32, 0.65], [300, 0]);

  // 5. Scroll the content block up naturally as the user scrolls further (from scroll 0.70 to 1.0)
  const naturalScrollY = useTransform(smoothScrollProgress, [0.70, 1.0], ["0vh", "-10vh"]);

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

      {/* 1. Typewriter container (centered, absolute) */}
      <motion.div
        style={{
          opacity: typewriterOpacity,
          scale: typewriterScale,
          y: typewriterY,
          transformOrigin: "center center",
        }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 sm:px-12 md:px-16 lg:px-24 select-none max-w-[1200px] mx-auto"
      >
        <h2 
          className={`font-sans font-medium text-xl sm:text-2xl md:text-[36px] lg:text-[38px] text-white tracking-tight leading-[1.3] transition-opacity duration-1000 min-h-[120px] sm:min-h-[100px] md:min-h-[120px] flex flex-col justify-center ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="block text-center w-full">
            <span id="typewriter-text" className="text-white font-sans font-medium">
              {(() => {
                const lastSpaceIndex = displayedText.lastIndexOf(" ");
                if (lastSpaceIndex === -1) {
                  return (
                    <span className="inline-block whitespace-nowrap">
                      {displayedText || "\u00A0"}
                      <span className="inline-block w-[3px] sm:w-[4px] h-[1.1em] bg-white ml-1.5 align-middle animate-[blink_1s_infinite]" />
                    </span>
                  );
                }
                const mainText = displayedText.substring(0, lastSpaceIndex + 1);
                const lastWord = displayedText.substring(lastSpaceIndex + 1);
                return (
                  <>
                    {mainText}
                    <span className="inline-block whitespace-nowrap">
                      {lastWord || "\u00A0"}
                      <span className="inline-block w-[3px] sm:w-[4px] h-[1.1em] bg-white ml-1.5 align-middle animate-[blink_1s_infinite]" />
                    </span>
                  </>
                );
              })()}
            </span>
          </div>
        </h2>
      </motion.div>

      {/* 2. Expanding White Portal Circle (positioned at bottom center without transform conflicts) */}
      <motion.div 
        style={{
          scale: whiteCircleScale,
          transformOrigin: "center center",
          left: "calc(50% - 150px)",
          bottom: "-150px",
          willChange: "transform",
        }}
        className="absolute w-[300px] h-[300px] rounded-full bg-white z-0 pointer-events-none origin-center transform-gpu"
      />

      {/* 3. Content revealed inside the white portal (centered, absolute overlay) */}
      <motion.div 
        style={{
          y: naturalScrollY,
        }}
        className="absolute inset-x-0 top-0 bottom-0 flex flex-col items-center justify-center z-20 px-4 w-full select-none pointer-events-none"
      >
        <motion.div 
          style={{
            scale: galleryScale,
            opacity: galleryOpacity,
            y: galleryY,
            transformOrigin: "center center"
          }}
          className="flex justify-center w-full"
        >
          <h1 className="font-sans font-black text-[10vw] sm:text-[11vw] md:text-[12vw] lg:text-[13.5vw] tracking-tighter text-[#1A4B82] text-center leading-[0.85] select-none whitespace-nowrap">
            Ideas in Action
          </h1>
        </motion.div>
        <motion.p 
          style={{
            scale: descScale,
            opacity: descOpacity,
            y: descY,
            transformOrigin: "center center"
          }}
          className="text-zinc-500 text-[2.8vw] sm:text-[2.4vw] md:text-2xl lg:text-3xl xl:text-4xl tracking-tight leading-none whitespace-nowrap font-semibold font-sans text-center mt-2 px-4"
        >
          Perfectly aligned creative and production expertise to increase digital impact.
        </motion.p>
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
