import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface IdeasInActionHeaderProps {
  isMobile?: boolean;
}

export function IdeasInActionHeader({ isMobile: isMobileProp }: IdeasInActionHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);

  const [isMobileDevice, setIsMobileDevice] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isMobile = isMobileProp !== undefined ? isMobileProp : isMobileDevice;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center 45%"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.2,
    restDelta: 0.001
  });

  const mobileScale = useTransform(smoothProgress, [0.05, 0.95], [0.15, 1]);
  const mobileOpacity = useTransform(smoothProgress, [0.05, 0.40], [0, 1]);
  const mobileY = useTransform(smoothProgress, [0.05, 0.95], [60, 0]);

  useEffect(() => {
    const resizeText = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        if (containerWidth > 0) {
          // Scale H1
          if (h1Ref.current) {
            h1Ref.current.style.fontSize = "100px";
            const h1Width = h1Ref.current.scrollWidth;
            if (h1Width > 0) {
              const visualWidth = h1Width - 8;
              const h1Scale = containerWidth / visualWidth;
              h1Ref.current.style.fontSize = `${100 * h1Scale}px`;
            }
          }
          // Scale P
          if (pRef.current) {
            pRef.current.style.fontSize = "10px";
            const pWidth = pRef.current.scrollWidth;
            if (pWidth > 0) {
              const pScale = containerWidth / pWidth;
              pRef.current.style.fontSize = `${10 * pScale}px`;
            }
          }
        }
      }
    };

    // Initial resize
    resizeText();

    const t1 = setTimeout(resizeText, 100);
    const t2 = setTimeout(resizeText, 400);

    window.addEventListener("resize", resizeText);
    return () => {
      window.removeEventListener("resize", resizeText);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef} 
      style={isMobile ? {
        scale: mobileScale,
        opacity: mobileOpacity,
        y: mobileY,
        transformOrigin: "center center"
      } : undefined}
      className="flex flex-col items-center w-full p-0 m-0 origin-center"
    >
      <div className="w-full flex justify-center items-center overflow-visible">
        <h1 
          ref={h1Ref} 
          style={{ 
            marginLeft: "-0.04em", 
            marginRight: "-0.04em", 
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif' 
          }} 
          className="text-[12vw] sm:text-[14vw] md:text-[clamp(60px,15vw,217.24px)] font-black tracking-tighter text-[#1A4B82] text-center leading-[0.85] whitespace-nowrap p-0 m-0 select-none origin-center"
        >
          Ideas in Action
        </h1>
      </div>
      <p 
        id="ideas-in-action-subtitle"
        ref={pRef}
        style={{ 
          margin: isMobile ? "12px 0 0 0" : "20px 0 0 0", 
          padding: "0" 
        }} 
        className="text-[#666666] font-medium text-center whitespace-nowrap tracking-tight leading-none select-none block origin-center"
      >
        Perfectly aligned creative and production expertise to increase digital impact
      </p>
    </motion.div>
  );
}
