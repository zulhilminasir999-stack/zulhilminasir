import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

interface TickerItemProps {
  key?: React.Key;
  text: string;
  index: number;
  scrollProgress: any;
  N: number;
  itemHeight: number;
  containerHeight: number;
}

function TickerItem({
  text,
  index,
  scrollProgress,
  N,
  itemHeight,
  containerHeight,
}: TickerItemProps) {
  // Center position of the active item in the container
  const centerOffset = containerHeight / 2 - itemHeight / 2;

  // Calculate position dynamically on each scroll frame
  const y = useTransform(scrollProgress, (latest: number) => {
    let diff = (index - latest) % N;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    return diff * itemHeight + centerOffset;
  });

  // Calculate opacity based on distance from center
  const opacity = useTransform(scrollProgress, (latest: number) => {
    let diff = (index - latest) % N;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    const absDiff = Math.abs(diff);

    if (absDiff <= 0.8) {
      // Very close to center: fully opaque
      return 1;
    } else if (absDiff <= 1.5) {
      // Transitioning away: fade out to 0.25
      const t = (absDiff - 0.8) / 0.7;
      return 1 - t * 0.75;
    } else {
      // Far away: invisible
      return 0;
    }
  });

  // Calculate scale based on distance from center
  const scale = useTransform(scrollProgress, (latest: number) => {
    let diff = (index - latest) % N;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    const absDiff = Math.abs(diff);

    if (absDiff <= 1) {
      return 1.05 - absDiff * 0.15;
    }
    return 0.9;
  });

  // Calculate CSS Blur filter based on distance from center (creates the beautiful camera blur effect)
  const filter = useTransform(scrollProgress, (latest: number) => {
    let diff = (index - latest) % N;
    if (diff > N / 2) diff -= N;
    if (diff < -N / 2) diff += N;
    const absDiff = Math.abs(diff);

    if (absDiff <= 0.4) {
      return "blur(0px)";
    } else {
      // Linearly increase blur up to 8px
      const blurVal = Math.min(8, (absDiff - 0.4) * 8);
      return `blur(${blurVal}px)`;
    }
  });

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        filter,
        height: itemHeight,
      }}
      className="absolute right-0 w-full flex items-center justify-end whitespace-nowrap select-none origin-right"
    >
      <span className="font-sans font-medium text-sm sm:text-base md:text-[14px] lg:text-[18px] tracking-tight text-white leading-none">
        {text}
      </span>
    </motion.div>
  );
}

export default function LeftSideTicker() {
  const items = [
    "Website Design & CMS",
    "Mobile App UI/UX",
    "Brand Identity",
    "Packaging Mockup Design",
    "AI-Assisted Development",
    "Advanced Prompt Engineering",
    "Visual Design"
  ];

  const N = items.length;
  const itemHeight = 34; // reduced height of each vertical slot
  const containerHeight = 110; // reduced shows ~3 items at a time

  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    // Smooth infinite continuous linear vertical scroll animation
    const controls = animate(scrollProgress, N, {
      ease: "linear",
      duration: 16, // Speed of the scrolling loop (seconds)
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [scrollProgress, N]);

  return (
    <div className="absolute right-6 sm:right-12 lg:right-16 top-[42%] -translate-y-1/2 h-[110px] w-full max-w-[350px] md:max-w-[500px] z-20 pointer-events-none select-none">
      <div 
        className="relative h-full w-full overflow-hidden"
        style={{
          // Linear gradient mask to smoothly fade edges
          maskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        }}
      >
        {items.map((text, index) => (
          <TickerItem
            key={index}
            text={text}
            index={index}
            scrollProgress={scrollProgress}
            N={N}
            itemHeight={itemHeight}
            containerHeight={containerHeight}
          />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="!text-white absolute right-0 bottom-[-40px] z-20"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </div>
  );
}
