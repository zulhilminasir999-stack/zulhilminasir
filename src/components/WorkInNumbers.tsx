import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

interface WorkInNumbersProps {
  theme?: "light" | "dark";
}

function RollingDigit({ value, trigger, delay }: { value: number; trigger: boolean; delay: number; key?: React.Key }) {
  // To get the "slot machine" effect, we repeat the digits multiple times
  // Using 5 iterations for a longer, more impressive roll
  const iterations = 5; 
  const digits = Array.from({ length: iterations * 10 + value + 1 }, (_, i) => i % 10);
  
  return (
    <div className="relative h-[1em] overflow-hidden inline-flex">
      <motion.div
        initial={{ y: "20%", opacity: 0 }}
        animate={{ 
          y: trigger ? `-${(iterations * 10 + value) * 100}%` : "20%",
          opacity: trigger ? 1 : 0
        }}
        transition={{ 
          duration: 3 + Math.random() * 0.5, 
          ease: [0.16, 1, 0.3, 1],
          delay: delay 
        }}
        className="flex flex-col"
      >
        {digits.map((n, i) => (
          <div key={i} className="h-[1em] flex items-center justify-center">
            {n}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function CountUp({ 
  end, 
  suffix = "", 
  trigger = false 
}: { 
  end: number; 
  suffix?: string; 
  trigger?: boolean 
}) {
  // Pad with 0 to ensure at least 2 digits like in the video
  const digits = end.toString().padStart(2, "0").split("").map(Number);
  
  return (
    <div className="flex items-baseline">
      {digits.map((digit, i) => (
        <RollingDigit 
          key={i} 
          value={digit} 
          trigger={trigger} 
          delay={i * 0.15} 
        />
      ))}
      {suffix && <span className="ml-1">{suffix}</span>}
    </div>
  );
}

export default function WorkInNumbers({ theme = "light" }: WorkInNumbersProps) {
  const isLight = theme === "light";
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const stats = [
    { 
      value: 5, 
      label: "Years Experience", 
      suffix: "+",
      description: "Building digital excellence since 2020, focusing on high-impact solutions and brand growth."
    },
    { 
      value: 9, 
      label: "Completed Projects", 
      suffix: "+",
      description: "Successfully delivered diverse projects ranging from complex e-commerce platforms to bespoke corporate identities."
    },
    { 
      value: 4, 
      label: "UI Screen Designed", 
      suffix: "+",
      description: "Crafting intuitive, user-centric interfaces that balance aesthetic beauty with functional precision."
    },
    { 
      value: 6, 
      label: "Website Managed End-to-end", 
      suffix: "+",
      description: "End-to-end management of digital storefronts, ensuring peak performance and cross-channel consistency."
    },
  ];

  return (
    <section 
      id="work-in-numbers" 
      className={`relative w-full pt-8 sm:pt-12 pb-10 sm:pb-14 ${
        isLight ? "bg-white" : "bg-zinc-950"
      }`}
    >
      <div className="w-full px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        {/* Intro Text - Aligned with Stats List */}
        <div className="mb-12 md:mb-16 max-w-3xl ml-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 text-left"
          >
            <h2 className={`font-sans font-medium text-3xl sm:text-4xl tracking-tight leading-[1.1] ${isLight ? "text-zinc-900" : "text-white"}`}>
              We take on fewer projects.<br />
              <span className={isLight ? "text-zinc-400" : "text-zinc-500"}>Each one gets full attention.</span>
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed pt-2 ${isLight ? "text-zinc-600" : "text-zinc-400"}`}>
              Fewer projects means more attention. Every brief is a commitment to the thinking behind it, not just the outcome. 
              We work with a fixed number of partners at a time to protect the quality of the work.
            </p>
          </motion.div>
        </div>

        {/* Vertical Stats List - Pushed towards the right with larger container scope */}
        <div ref={statsRef} className={`max-w-3xl ml-auto border-t divide-y ${isLight ? "border-zinc-200 divide-zinc-200" : "border-zinc-800 divide-zinc-800"}`}>
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center relative"
            >
              {/* Number Section with Accent Bar */}
              <div className="md:col-span-4 flex items-center justify-start pr-0 md:pr-4">
                <div className="flex items-center space-x-6">
                  {/* Accent Bar (Modern Blue) */}
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: statsVisible ? 110 : 0 }}
                    transition={{ duration: 1.5, delay: idx * 0.2 + 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-1 bg-[#2563EB] rounded-full md:block hidden shrink-0" 
                  />
                  
                  <div className={`font-sans font-semibold text-[60px] sm:text-[90px] tracking-tighter select-none leading-none flex items-center text-[#2563EB]`}>
                    <CountUp end={stat.value} suffix={stat.suffix} trigger={statsVisible} />
                  </div>
                </div>
              </div>

              {/* Middle Divider (Vertical) */}
              <div className={`hidden md:block absolute left-[33.333333%] top-1/2 -translate-y-1/2 h-32 w-px ${isLight ? "bg-zinc-200" : "bg-zinc-800"}`} />

              {/* Label and Description Section */}
              <div className="md:col-span-8 flex flex-col justify-center space-y-1.5 pl-0 md:pl-6">
                <h3 className={`font-sans text-xl sm:text-2xl font-semibold tracking-tight leading-none ${isLight ? "text-zinc-900" : "text-white"}`}>
                  {stat.label}
                </h3>
                <p className={`text-xs sm:text-sm leading-[1.3] max-w-md font-normal ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
