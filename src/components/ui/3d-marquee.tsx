import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

interface ThreeDMarqueeProps {
  images: string[];
}

export function ThreeDMarquee({ images }: ThreeDMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 45,
    restDelta: 0.001
  });

  // Map scroll progress to horizontal translation
  // Reduced range for slower, steadier movement
  const x1 = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const x2 = useTransform(smoothProgress, [0, 1], ["-20%", "0%"]);
  const x3 = useTransform(smoothProgress, [0, 1], ["5%", "-15%"]);

  // Create rows for the marquee
  const row1 = images.slice(0, 10);
  const row2 = images.slice(10, 20);
  const row3 = images.slice(20, 31);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-transparent py-32 sm:py-64"
      style={{ perspective: "1500px" }}
    >
      <div 
        className="flex flex-col gap-6 sm:gap-10"
        style={{ transform: "rotateX(20deg) rotateY(-8deg) rotateZ(8deg) scale(1.35)" }}
      >
        <MarqueeRow items={row1} translateX={x1} />
        <MarqueeRow items={row2} translateX={x2} />
        <MarqueeRow items={row3} translateX={x3} />
      </div>

      {/* Overlays for depth effect - Changed to soft white fades */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/10" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/20 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white/20 to-transparent" />
    </div>
  );
}

interface MarqueeRowProps {
  items: string[];
  translateX: any; // Using MotionValue
}

function MarqueeRow({ items, translateX }: MarqueeRowProps) {
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex gap-8 sm:gap-12 will-change-transform"
        style={{ x: translateX }}
      >
        {items.map((src, index) => (
          <div
            key={index}
            className="h-40 w-64 sm:h-52 sm:w-80 shrink-0 overflow-hidden rounded-2xl border border-zinc-200/80 bg-transparent shadow-xl transition-all duration-500 hover:scale-[1.02] hover:border-zinc-300 group"
          >
            <img
              src={src}
              alt={`Marquee item ${index}`}
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
