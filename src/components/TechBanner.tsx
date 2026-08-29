import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { WordsStagger } from "../registry/spell-ui/words-stagger";
import techLaptopImg from "../assets/images/tech_laptop.png";

interface ScrollWordProps {
  word: string;
  index: number;
  total: number;
  progress: any;
  key?: React.Key;
}

function ScrollWord({ word, index, total, progress }: ScrollWordProps) {
  // Slower, steady, and ultra-smooth scroll-driven reveal across the sticky scroll runway (0.04 to 0.70)
  // Generous word overlap creates a continuous, refined progressive illumination instead of abrupt snapping.
  // After 0.70, the complete illuminated statement stays locked at 100% white until the user leaves the section.
  const progressStart = 0.04;
  const progressEnd = 0.70;
  const wordStep = (progressEnd - progressStart) / total;
  const wordStart = progressStart + index * wordStep;
  const wordEnd = Math.min(progressEnd, wordStart + wordStep * 2.5);
  
  // Animate opacity from 0.18 (soft readable base) to 1.0 (brilliant white), smoothly clamping through the end of the section
  const opacity = useTransform(
    progress, 
    [0, wordStart, wordEnd, 1], 
    [0.18, 0.18, 1, 1],
    { clamp: true }
  );
  
  return (
    <span className="relative inline-block mr-[0.25em] select-none">
      <motion.span 
        style={{ opacity }} 
        className="font-sans font-medium text-white"
      >
        {word}
      </motion.span>
    </span>
  );
}

interface LogoItem {
  name: string;
  path: string;
  customScale?: string;
}

export default function TechBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleTrackRef = useRef<HTMLDivElement>(null);

  const [activeLogo, setActiveLogo] = useState<string | null>(null);

  // Track scroll progress of the banner container for the sticky scroll-reveal text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lines = [
    "Passionate UI/UX designer focused",
    "on creating intuitive, visually compelling",
    "digital experiences that combine creativity",
    "with user-centered design."
  ];

  // Pre-calculate the structure for scroll reveal animation
  let globalIdx = 0;
  const linesWithIndices = lines.map(line => {
    const wordsInLine = line.split(" ");
    return wordsInLine.map(word => ({
      word,
      index: globalIdx++
    }));
  });
  const totalWordsCount = globalIdx;

  // List of logos (same as IntegrationLogoGrid, using white versions)
  const logos: LogoItem[] = [
    { name: "Figma", path: "/logos/Figma_w.png" , customScale: "1.25" },
    { name: "WordPress", path: "/logos/wordpress_w.png", customScale: "1.6" },
    { name: "SiteGiant", path: "/logos/sitegiant_w.png" },
    { name: "Framer", path: "/logos/framer_w.png" , customScale: "1.8" },
    { name: "Wix", path: "/logos/wix_w.png", customScale: "0.8" },
    { name: "Illustrator", path: "/logos/adobeillustrator_w.png", customScale: "0.45" },
    { name: "Photoshop", path: "/logos/adobephotoshop_w.png", customScale: "0.45" },
    { name: "Adobe Firefly AI", path: "/logos/firefly.ai_w.png", customScale: "1.55" },
    { name: "Google Gemini", path: "/logos/gemini_w.png" , customScale: "1.3" },
    { name: "Claude AI", path: "/logos/claude_w.png" , customScale: "1.3" },
    { name: "Stitch", path: "/logos/stitch_logo_w.png", customScale: "1.5" },
    { name: "Sleek.design", path: "/logos/sleek_w.png", customScale: "1.75" },
    { name: "Perplexity AI", path: "/logos/perplexity_AI_w.png", customScale: "1.45" },
    { name: "ChatGPT", path: "/logos/OpenAI_w.png" , customScale: "1.25" },
    { name: "Antigravity", path: "/logos/antigravity_w.png" , customScale: "2.5" },
  ];

  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const inMomentumRef = useRef(false);
  const shouldResumeRef = useRef(true);

  const currentXRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const pointerVelocityRef = useRef(0);
  const momentumVelocityRef = useRef(0);
  const singleWidthRef = useRef(0);

  const interactionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let animationId: number;
    const defaultSpeed = 0.5; // slow speed in pixels per frame (~30px / sec)
    let currentX = 0;

    // Capture initial width on mount
    if (singleTrackRef.current) {
      singleWidthRef.current = singleTrackRef.current.offsetWidth;
    }

    const tick = () => {
      const singleWidth = singleWidthRef.current || (singleTrackRef.current ? singleTrackRef.current.offsetWidth : 1200);
      const period = singleWidth + 48; // 48px is the gap size (gap-12)

      if (isDraggingRef.current) {
        currentX = currentXRef.current;
      } else if (isHoveredRef.current) {
        // Pause marquee movement while user is hovering
        currentX = currentXRef.current;
      } else {
        if (inMomentumRef.current) {
          momentumVelocityRef.current *= 0.95;
          currentX += momentumVelocityRef.current;
          currentXRef.current = currentX;

          if (Math.abs(momentumVelocityRef.current) < 0.05) {
            inMomentumRef.current = false;
            momentumVelocityRef.current = 0;
          }
        } else if (shouldResumeRef.current) {
          momentumVelocityRef.current = momentumVelocityRef.current * 0.95 + defaultSpeed * 0.05;
          currentX += momentumVelocityRef.current;
          currentXRef.current = currentX;
        }
      }

      if (period > 50) {
        currentX = ((currentX % period) + period) % period;
        currentXRef.current = currentX;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-currentX}px, 0, 0)`;
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    const handleResize = () => {
      if (singleTrackRef.current) {
        singleWidthRef.current = singleTrackRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.currentTarget as HTMLDivElement;
    target.setPointerCapture(e.pointerId);

    isDraggingRef.current = true;
    inMomentumRef.current = false;
    shouldResumeRef.current = false;

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
      interactionTimeoutRef.current = null;
    }

    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    pointerVelocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const currentClientX = e.clientX;
    const currentTime = performance.now();
    const dx = lastPointerXRef.current - currentClientX;
    const dt = currentTime - lastPointerTimeRef.current;

    currentXRef.current += dx;

    if (dt > 0) {
      const instantVelocity = dx / (dt / 16.666);
      pointerVelocityRef.current = pointerVelocityRef.current * 0.6 + instantVelocity * 0.4;
    }

    lastPointerXRef.current = currentClientX;
    lastPointerTimeRef.current = currentTime;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      const target = e.currentTarget as HTMLDivElement;
      target.releasePointerCapture(e.pointerId);
    } catch (err) {}

    momentumVelocityRef.current = pointerVelocityRef.current;
    inMomentumRef.current = true;

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = window.setTimeout(() => {
      shouldResumeRef.current = true;
    }, 3000);
  };

  return (
    <section 
      id="integration-section"
      ref={containerRef}
      className="relative w-full h-[280vh] sm:h-[300vh] bg-[#02040A] p-0 m-0 select-none z-20"
    >
      {/* Sticky Fullscreen Inner Section */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        {/* Cinematic Background Image - covering the full container */}
        <img 
          src={techLaptopImg}
          alt="Cinematic Futuristic Technology Scene"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />

        {/* Ambient dark gradient overlay to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#02040A]/95 via-[#02040A]/60 to-transparent pointer-events-none z-10" />

        {/* Smooth bottom gradient overlay blending to the next section's background (#2563EB) */}
        <div 
          className="absolute inset-x-0 bottom-0 h-36 sm:h-48 md:h-64 lg:h-80 pointer-events-none z-10" 
          style={{
            background: 'linear-gradient(to bottom, rgba(37, 99, 235, 0) 0%, rgba(37, 99, 235, 0.08) 20%, rgba(37, 99, 235, 0.3) 40%, rgba(37, 99, 235, 0.65) 65%, rgba(37, 99, 235, 0.92) 85%, rgba(37, 99, 235, 1) 95%, rgba(37, 99, 235, 1) 100%)'
          }}
        />

        {/* Content wrapper on the left side aligned precisely with Featured Projects */}
        <div className="relative z-20 w-full max-w-4xl lg:max-w-5xl px-6 sm:px-12 lg:px-16 pt-8 sm:pt-12 pb-8 sm:pb-12 text-left flex flex-col items-start gap-5 sm:gap-7 md:gap-9 my-auto">
          {/* Section Title: SOFTWARE & AI INTEGRATION */}
          <div className="w-full text-left">
            <h2 
              className="text-4xl sm:text-5xl md:text-[60px] lg:text-[72px] font-sans font-bold tracking-tighter uppercase leading-[0.85] select-none !text-white text-left"
              style={{ color: "#ffffff" }}
            >
              <WordsStagger className="text-inherit">
                SOFTWARE &
              </WordsStagger>{" "}
              <br />
              <WordsStagger className="text-inherit" delay={0.35}>
                AI INTEGRATION
              </WordsStagger>
            </h2>
          </div>

          {/* Scroll-Reveal Bold Paragraph aligned left */}
          <div className="w-full max-w-2xl sm:max-w-3xl text-left">
            <p className="font-sans font-medium text-lg sm:text-2xl md:text-3xl lg:text-4xl leading-snug tracking-tight text-white/20 text-left">
              {linesWithIndices.map((lineWords, lineIdx) => (
                <span key={lineIdx} className="block text-left">
                  {lineWords.map(({ word, index }) => (
                    <ScrollWord 
                      key={index} 
                      word={word} 
                      index={index} 
                      total={totalWordsCount} 
                      progress={scrollYProgress} 
                    />
                  ))}
                </span>
              ))}
            </p>
          </div>

          {/* Copy of Logo grid slide animation aligned left */}
          <div className="w-full relative mt-1 sm:mt-2 text-left">
            <div 
              ref={marqueeContainerRef}
              className="relative w-full flex items-center overflow-hidden py-3 sm:py-4 cursor-grab active:cursor-grabbing touch-pan-y"
              onMouseEnter={() => { isHoveredRef.current = true; }}
              onMouseLeave={() => { isHoveredRef.current = false; }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onTouchStart={() => setActiveLogo(null)}
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
                maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
              }}
            >
              {/* Marquee Content Belt */}
              <div 
                ref={trackRef} 
                className="flex shrink-0 gap-20 sm:gap-24 items-center will-change-transform"
              >
                {[1, 2].map((segmentIdx) => (
                  <div 
                    key={`tech-logo-segment-${segmentIdx}`}
                    ref={segmentIdx === 1 ? singleTrackRef : null} 
                    className="flex shrink-0 gap-20 sm:gap-24 items-center will-change-transform"
                    aria-hidden={segmentIdx > 1}
                  >
                    {logos.map((logo, idx) => {
                      let customSpacingClass = "";
                      if (logo.name === "Wix") {
                        customSpacingClass = "-ml-4 -mr-5";
                      } else if (logo.name === "Illustrator") {
                        customSpacingClass = "-ml-8 -mr-8";
                      } else if (logo.name === "Photoshop") {
                        customSpacingClass = "-ml-8 -mr-8";
                      } else if (logo.name === "Antigravity") {
                        customSpacingClass = "ml-6 mr-6";
                      }

                      return (
                        <div
                          key={`tech-logo-item-${segmentIdx}-${idx}`}
                          className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center transition-all duration-500 ${
                            activeLogo === logo.name 
                              ? "scale-110 z-20" 
                              : "hover:scale-105"
                          } group ${customSpacingClass}`}
                          title={logo.name}
                        >
                          <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${
                            activeLogo === logo.name 
                              ? "opacity-100" 
                              : "opacity-85 group-hover:opacity-100"
                          }`}>
                            <img
                              src={logo.path}
                              alt={logo.name}
                              className="w-full h-full object-contain pointer-events-none select-none transition-all duration-700"
                              style={{ transform: logo.customScale ? `scale(${logo.customScale})` : 'scale(1)' }}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
