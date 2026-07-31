import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Smartphone, ChevronDown, Check, MousePointerClick } from "lucide-react";

/**
 * StickyStackScrollDemo Component
 * 
 * This component demonstrates the exact high-fidelity overlapping/stacking scroll effect
 * seen in premium interactive landing pages. 
 * 
 * HOW IT WORKS conceptually:
 * 1. SECTION 1 (Hero / Trigger) is given a sticky position ('sticky top-0 h-screen') and lower z-index.
 *    This keeps it pinned at the top of the viewport as the user starts scrolling.
 * 2. We use Framer Motion's 'useScroll' to track the scroll position of the parent container.
 * 3. As the user scrolls, we apply subtle parallax scale, translation, and opacity transforms to Section 1,
 *    giving it a beautiful "receding" or depth effect.
 * 4. SECTION 2 (Overlapping Card) has relative positioning, a higher z-index ('z-20'), and a solid background.
 *    It naturally flows up from below the viewport, sliding over Section 1.
 * 5. Once Section 2 is fully in view, normal page scrolling resumes seamlessly.
 */
export default function StickyStackScrollDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the entire container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1 Transforms: recedes slightly and fades as Section 2 moves up
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.35]);
  const y = useTransform(scrollYProgress, [0, 0.4], ["0%", "-4%"]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-zinc-950 text-white font-sans selection:bg-sky-500 selection:text-white"
      style={{
        // We need extra height to allow the scroll container to drive the stickiness and progress
        minHeight: "220vh", 
      }}
    >
      {/* SECTION 1: Sticky Hero Card (Behaves like the laptop screen hero in your video) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        
        {/* Subtle Background Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12)_0%,transparent_65%)] pointer-events-none" />

        {/* Hero Top Nav Info */}
        <motion.div 
          style={{ opacity }}
          className="flex justify-between items-center z-10 w-full"
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="font-mono text-xs tracking-widest uppercase text-sky-400">Interaction Concept</span>
          </div>
          <span className="font-mono text-xs text-zinc-500">Scroll down to trigger reveal</span>
        </motion.div>

        {/* Hero Content with Parallax / Scale effects */}
        <motion.div 
          style={{ scale, opacity, y }}
          className="my-auto z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-zinc-300">
            <Sparkles className="h-4 w-4 text-sky-400" />
            <span>Smooth Sticky-Stack Scroll Interaction</span>
          </div>

          <h1 className="font-sans font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] text-white">
            Instant and <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Secure Solutions
            </span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            This is Section 1. Scroll downward to see how Section 2 seamlessly slides upward, overlaying this container with a clean card transition.
          </p>

          <div className="flex justify-center pt-4">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-xs font-mono tracking-widest uppercase">Scroll Down</span>
              <ChevronDown className="h-5 w-5 text-sky-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Footer Info */}
        <motion.div 
          style={{ opacity }}
          className="flex justify-between items-end z-10 w-full border-t border-zinc-900 pt-6 text-zinc-500 text-xs font-mono"
        >
          <span>DESIGN CONCEPT</span>
          <span>© 2026 CODESPACE</span>
        </motion.div>
      </div>

      {/* SECTION 2: Overlapping Card (Sliding over Section 1 from bottom-up) */}
      <div 
        className="relative z-20 w-full bg-white text-zinc-900 rounded-t-[32px] sm:rounded-t-[48px] shadow-[0_-24px_60px_-15px_rgba(0,0,0,0.4)] border-t border-zinc-200/50"
      >
        {/* Content of Section 2 */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-24 sm:py-32 space-y-16">
          
          {/* Header Row */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Introduction
            </div>
            <h2 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl text-zinc-950 tracking-tight leading-tight">
              An app that is a powerful tool designed to help users succeed.
            </h2>
          </div>

          {/* Body Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
            <p className="font-sans text-lg sm:text-xl text-zinc-650 leading-relaxed font-medium">
              This second section has a high <code className="bg-zinc-100 text-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono">z-index: 20</code>, solid background, and is positioned relatively in the document flow. 
              As you scroll down, it naturally covers the sticky hero container to give a beautiful native card reveal effect.
            </p>

            <div className="space-y-6">
              <h3 className="font-sans font-semibold text-lg uppercase tracking-wider text-zinc-400">
                Key Stacking Highlights:
              </h3>
              <ul className="space-y-4">
                {[
                  "No complex javascript scrolljacking is required",
                  "Extremely performant and leverages native hardware acceleration",
                  "Fully responsive across all screen sizes",
                  "Perfect for portfolios, products, and landing pages"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center text-xs font-bold">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-zinc-700 font-sans text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Playground Blueprint Box */}
          <div className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 border border-zinc-900 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <MousePointerClick className="h-48 w-48 text-white" />
            </div>

            <div className="space-y-2 relative z-10">
              <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">Interactive Blueprint</span>
              <h3 className="text-xl sm:text-2xl font-bold font-sans">Core CSS & Framer Motion Structure</h3>
            </div>

            <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed relative z-10">
              To apply this on your website, you can structure your JSX tree like below. Feel free to copy or modify this approach for your needs:
            </p>

            <pre className="bg-zinc-900 rounded-2xl p-4 sm:p-6 overflow-x-auto text-[11px] sm:text-xs md:text-sm font-mono text-zinc-300 leading-relaxed border border-zinc-800/50">
{`// 1. Structure of parent and child sections
<div className="relative w-full" style={{ minHeight: '200vh' }}>
  
  {/* SECTION 1: Sticky container */}
  <div className="sticky top-0 h-screen w-full z-10 overflow-hidden">
    {/* Content goes here */}
  </div>

  {/* SECTION 2: Stacked relative container */}
  <div className="relative z-20 w-full bg-white rounded-t-[48px] shadow-[0_-24px_60px_rgba(0,0,0,0.3)]">
    {/* Content goes here */}
  </div>

</div>`}
            </pre>
          </div>

        </div>
      </div>
    </div>
  );
}
