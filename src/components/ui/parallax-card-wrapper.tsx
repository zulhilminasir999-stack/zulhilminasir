"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface ParallaxCardWrapperProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  key?: React.Key;
}

export const ParallaxCardWrapper = ({
  children,
  className,
  intensity = 20,
}: ParallaxCardWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Relative mouse position from -0.5 to 0.5
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    
    mouseX.set(x * intensity);
    mouseY.set(y * intensity);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(dy, (val) => -val);
  const rotateY = useTransform(dx, (val) => val);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        perspective: 1000,
      }}
      transition={{ duration: 0.4 }}
      className={`relative transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};
