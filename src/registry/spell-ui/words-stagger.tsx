import React from "react";
import { motion } from "motion/react";

interface WordsStaggerProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  yOffset?: number;
  blurAmount?: string;
  trigger?: boolean;
  highlightWords?: Record<string, string>;
}

export function WordsStagger({
  children,
  className = "",
  delay = 0.2,
  duration = 0.8,
  stagger = 0.08,
  yOffset = 15,
  blurAmount = "8px",
  trigger,
  highlightWords,
}: WordsStaggerProps) {
  // Split text by words
  const words = children.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: `blur(${blurAmount})`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier for smooth reveal
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap items-baseline ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={trigger !== undefined ? (trigger ? "visible" : "hidden") : undefined}
      whileInView={trigger === undefined ? "visible" : undefined}
      viewport={trigger === undefined ? { once: true, margin: "-50px" } : undefined}
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^a-zA-Z]/g, '');
        const customClass = highlightWords?.[word] || highlightWords?.[cleanWord] || "";
        return (
          <span key={index} className="inline-block mr-[0.25em]">
            <motion.span
              variants={wordVariants}
              className={`inline-block whitespace-nowrap ${customClass}`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
