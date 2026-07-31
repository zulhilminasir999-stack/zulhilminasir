import React, { useRef, useEffect, useState } from "react";

interface LogoItem {
  name: string;
  path: string;
  customScale?: string;
}

export default function IntegrationLogoGrid({ theme }: { theme?: "light" | "dark" }) {
  const isLight = theme === "light";
  const [activeLogo, setActiveLogo] = useState<string | null>(null);

  // List of logos loaded from Vite's public asset directory
  const logos: LogoItem[] = [
    { name: "Figma", path: "/logos/Figma_w.png" },
    { name: "WordPress", path: "/logos/wordpress_w.png", customScale: "1.25" },
    { name: "SiteGiant", path: "/logos/sitegiant_w.png" },
    { name: "Wix", path: "/logos/wix_w.png", customScale: "0.5" },
    { name: "Framer", path: "/logos/framer_w.png" , customScale: "1.8"},
    { name: "Illustrator", path: "/logos/adobeillustrator_w.png", customScale: "0.45" },
    { name: "Photoshop", path: "/logos/adobephotoshop_w.png", customScale: "0.45" },
    { name: "Adobe Firefly AI", path: "/logos/firefly.ai_w.png", customScale: "1.25" },
    { name: "Google Gemini", path: "/logos/gemini_w.png" },
    { name: "Claude AI", path: "/logos/claude_w.png" },
    { name: "Stitch", path: "/logos/stitch_logo_w.png", customScale: "1.5" },
    { name: "Sleek.design", path: "/logos/sleek_w.png", customScale: "1.5" },
    { name: "Perplexity AI", path: "/logos/perplexity_AI_w.png" },
    { name: "ChatGPT", path: "/logos/OpenAI_w.png" },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleTrackRef = useRef<HTMLDivElement>(null);

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
      const period = singleWidth + 96; // 96px is the gap size (gap-24)

      if (isDraggingRef.current) {
        currentX = currentXRef.current;
      } else {
        if (inMomentumRef.current) {
          // Slowly decay momentum speed through friction
          momentumVelocityRef.current *= 0.95;
          currentX += momentumVelocityRef.current;
          currentXRef.current = currentX;

          if (Math.abs(momentumVelocityRef.current) < 0.05) {
            inMomentumRef.current = false;
            momentumVelocityRef.current = 0;
          }
        } else if (shouldResumeRef.current) {
          // Smoothly accelerate or transition back to the standard slow speed
          momentumVelocityRef.current = momentumVelocityRef.current * 0.95 + defaultSpeed * 0.05;
          currentX += momentumVelocityRef.current;
          currentXRef.current = currentX;
        }
        // If not in momentum and not resuming (i.e. paused), we make no changes to currentX
      }

      // Seamlessly wrap position
      if (period > 100) {
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
      const instantVelocity = dx / (dt / 16.666); // match frame intervals
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
    <div id="integration-logos-marquee-wrapper" className="w-full py-20 sm:py-28 relative overflow-hidden select-none">
      
      {/* Descriptive Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 sm:px-12 lg:px-16 pb-16 items-start relative z-10">
        <div className="col-span-1 md:col-span-12 lg:col-span-8 text-center md:text-center lg:text-left">
          <h2 className={`text-5xl md:text-[60px] lg:text-[72px] font-sans font-bold tracking-tighter uppercase leading-[0.85] select-none text-center md:text-center lg:text-left ${
            isLight ? "text-zinc-950" : "text-white"
          }`}>
            SOFTWARE &
            <br />
            AI INTEGRATION
          </h2>
        </div>
        <div className="col-span-1 md:col-span-12 lg:col-span-4 pt-4 md:pt-4 lg:pt-4">
          <p className={`text-[13px] leading-relaxed font-sans max-w-sm mx-auto md:max-w-xl lg:max-w-sm text-center md:text-center lg:text-right lg:ml-auto ${
            isLight ? "text-zinc-500" : "text-zinc-400"
          }`}>
            Leveraging industry-standard platforms and generative technologies to architect scalable, high-performance digital infrastructure.
          </p>
        </div>
      </div>

      {/* Marquee Container with Grab interactions */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full flex items-center overflow-hidden py-8 cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTouchStart={() => setActiveLogo(null)}
      >
        {/* Left Fading Gradient Overlay */}
        <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none transition-all duration-300 bg-gradient-to-r ${
          isLight ? "from-white via-white/80 to-transparent" : "from-zinc-950 via-zinc-950/80 to-transparent"
        }`} />

        {/* Marquee Content Belt */}
        <div 
          ref={trackRef} 
          className="flex shrink-0 gap-24 items-center will-change-transform"
        >
          {[1, 2].map((segmentIdx) => (
            <div 
              key={`track-segment-${segmentIdx}`}
              ref={segmentIdx === 1 ? singleTrackRef : null} 
              className="flex shrink-0 gap-24 items-center will-change-transform"
              aria-hidden={segmentIdx > 1}
            >
              {logos.map((logo, idx) => {
                let customSpacingClass = "";
                if (logo.name === "Wix") {
                  customSpacingClass = "-ml-8 -mr-9";
                } else if (logo.name === "Illustrator") {
                  customSpacingClass = "-ml-9 -mr-9";
                } else if (logo.name === "Photoshop") {
                  customSpacingClass = "-ml-9";
                }

                return (
                  <div
                    key={`logo-marquee-item-${segmentIdx}-${idx}`}
                    className={`w-32 h-32 sm:w-40 sm:h-40 shrink-0 flex items-center justify-center transition-all duration-500 ${
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

        {/* Right Fading Gradient Overlay */}
        <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none transition-all duration-300 bg-gradient-to-l ${
          isLight ? "from-white via-white/80 to-transparent" : "from-zinc-950 via-zinc-950/80 to-transparent"
        }`} />
      </div>
    </div>
  );
}
