import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

interface TextAnimateProps {
  children: string;
  animation?: "slideLeft" | "slideRight" | "slideUp" | "slideDown" | "fadeIn";
  by?: "character" | "word";
  className?: string;
  delay?: number;
  duration?: number;
}

export function TextAnimate({
  children,
  animation = "slideLeft",
  by = "character",
  className = "",
  delay = 0,
  duration = 0.5,
}: TextAnimateProps) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Small timeout ensures that standard CSS/Framer classes are fully painted
    // and guarantees animation plays on refresh/load
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Custom transition generator based on animation type and the specific index
  const getVariants = (itemIdx: number) => {
    const itemDelay = delay + itemIdx * (by === "character" ? 0.025 : 0.08);
    
    const transition = {
      type: "spring",
      damping: 18,
      stiffness: 90,
      duration: duration,
      delay: itemDelay,
    };

    switch (animation) {
      case "slideLeft":
        return {
          hidden: { opacity: 0, x: 30 },
          show: { opacity: 1, x: 0, transition },
        };
      case "slideRight":
        return {
          hidden: { opacity: 0, x: -30 },
          show: { opacity: 1, x: 0, transition },
        };
      case "slideUp":
        return {
          hidden: { opacity: 0, y: 30 },
          show: { opacity: 1, y: 0, transition },
        };
      case "slideDown":
        return {
          hidden: { opacity: 0, y: -30 },
          show: { opacity: 1, y: 0, transition },
        };
      case "fadeIn":
      default:
        return {
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { ...transition, type: "tween", ease: "easeOut" } },
        };
    }
  };

  if (by === "word") {
    const words = children.split(" ");
    return (
      <span className={`inline-flex flex-wrap ${className}`}>
        {words.map((word, wordIdx) => {
          const variants = getVariants(wordIdx);
          return (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
              <motion.span
                variants={variants}
                initial="hidden"
                animate={startAnimation ? "show" : "hidden"}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </span>
    );
  }

  // Split by character (keeping track of overall character index to stagger properly)
  const words = children.split(" ");
  let globalCharIdx = 0;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wordIdx) => {
        return (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, charIdx) => {
              const variants = getVariants(globalCharIdx);
              globalCharIdx++;
              return (
                <motion.span
                  key={charIdx}
                  variants={variants}
                  initial="hidden"
                  animate={startAnimation ? "show" : "hidden"}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
            {/* Add spacing after word if it is not the last word */}
            {wordIdx < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
}
