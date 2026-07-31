import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Plus, ArrowUpRight } from "lucide-react";
import PORTRAIT_IMAGE from "../assets/images/zul_portrait_1782401824631.jpg";

// You can replace this image path with your uploaded image!
// If you upload a file named "my-bg.png" in your file explorer under the public folder, it is served as "/my-bg.png"
const BG_IMAGE = "bg.png";

export function GetInTouchHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll for subtle parallax or entrance effects if needed
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Marquee text animation: move horizontally based on scroll
  const xTranslate = useTransform(scrollYProgress, [0, 1], [100, -800]);

  return (
    <section 
      ref={containerRef}
      id="get-in-touch-hero" 
      className="w-full bg-white py-12 md:py-16 px-6 sm:px-12 lg:px-16"
    >
      <div 
        className="relative w-full h-[550px] sm:h-[600px] md:h-[650px] rounded-lg sm:rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,78,132,0.15)]"
        style={{
          background: "linear-gradient(135deg, #00a2e1 0%, #004e84 55%, #091b31 100%)"
        }}
      >
        {/* Background Image - Clean and original without filters or saturation if they want to override */}
        <div className="absolute inset-0 z-0">
          {BG_IMAGE && BG_IMAGE !== "bg.png" && (
            <img 
              src={BG_IMAGE} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Stylized Floating Plus Icons - Static positioning relative to container */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-50">
          <div className="absolute top-[20%] left-[15%]">
            <Plus className="text-white w-6 h-6" strokeWidth={1} />
          </div>
          <div className="absolute top-[35%] right-[20%]">
            <Plus className="text-white w-6 h-6" strokeWidth={1} />
          </div>
          <div className="absolute bottom-[30%] left-[25%]">
            <Plus className="text-white w-6 h-6" strokeWidth={1} />
          </div>
          <div className="absolute bottom-[20%] right-[10%]">
            <Plus className="text-white w-6 h-6" strokeWidth={1} />
          </div>
        </div>

        {/* Marquee Text Container - Behind the portrait, in front of BG */}
        <div 
          className="absolute inset-y-0 left-8 right-8 sm:left-16 sm:right-16 md:left-24 md:right-24 z-10 flex items-center overflow-hidden pointer-events-none"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, white 20%, white 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, white 20%, white 80%, transparent 100%)"
          }}
        >
          <div className="flex whitespace-nowrap overflow-hidden w-full">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex items-center"
            >
              {[...Array(4)].map((_, i) => (
                <span key={i} className="text-[60px] sm:text-[80px] font-bold text-white/90 font-sans tracking-tighter lowercase px-10 select-none">
                  Better" We Are Faster, Better" We Are Faster,
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Center Portrait Card */}
        <div className="relative z-30 h-full flex items-center justify-center pointer-events-none px-6 sm:px-12 lg:px-16">
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[240px] sm:w-[280px] aspect-[3/4] relative rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 pointer-events-auto"
          >
            <img 
              src={PORTRAIT_IMAGE} 
              alt="Portrait" 
              className="w-full h-full object-cover"
            />
            
            {/* Subtle gradient at the bottom of the card for button contrast */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
            
            {/* Contact Now Button at the base of the card */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full px-8">
              <a 
                href="#"
                className="flex items-center justify-between w-full border-t border-white/20 pt-4 group transition-all duration-300"
              >
                <span className="text-white font-sans font-medium text-sm uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                  Contact Now
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0A2947] group-hover:rotate-45 transition-all duration-300 border border-transparent group-hover:border-[#164E85]">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
