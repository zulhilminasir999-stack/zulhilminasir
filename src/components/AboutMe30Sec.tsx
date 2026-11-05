import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "motion/react";

interface AboutMeProps {
  theme?: "light" | "dark";
}

export default function AboutMe30Sec({ theme = "dark" }: AboutMeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id="about-me-container" className="w-full text-left">
      <div className="max-w-[850px] mx-auto px-0 sm:px-6 space-y-10">
        {/* Bold Headline with smooth one-time reveal matching WorkInNumbers */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-bold text-3xl sm:text-4xl md:text-[50px] leading-[1.12] tracking-tight text-zinc-900"
        >
          Creating thoughtful digital experiences where design, technology, and AI work together.
        </motion.h2>

        {/* Description paragraphs with smooth one-time reveal matching WorkInNumbers */}
        <div className="space-y-6 font-sans text-[17px] sm:text-[19px] leading-[1.65] text-zinc-600 font-normal">
          {/* Paragraph 1: Always visible */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "justify", textAlignLast: "left" }}
          >
            I started my career in visual design, where I developed a strong foundation in digital communication, visual presentation, and creating engaging user experiences. Over time, my interests expanded into website development, digital platforms, and technology-driven solutions.
          </motion.p>

          {/* Paragraph 2: Always visible */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "justify", textAlignLast: "left" }}
          >
            Today, I combine web development, UI/UX principles, CMS management, and AI-assisted development to build intuitive, responsive, and user-focused digital solutions. With hands-on experience using Visual Studio Code (VS Code), Figma, WordPress, SiteGiant, HTML, CSS, JavaScript, and AI-powered development tools such as Google Antigravity, Claude Code, Codex, and Cline. I work across website development, interface customisation, wireframing, prototyping, and digital platform management to transform user and business requirements into practical digital solutions.
          </motion.p>

          {/* Mobile More Button (at bottom of earlier 2 paragraphs when collapsed) */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="sm:hidden pt-1"
            >
              <button
                type="button"
                id="about-me-more-btn"
                onClick={() => setIsExpanded(true)}
                className="inline-flex items-center gap-1.5 text-[#2563EB] font-sans font-medium text-[16px] hover:text-[#1d4ed8] cursor-pointer transition-colors"
              >
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Paragraphs 3 & 4: Always visible on desktop (sm:), toggleable on mobile */}
          <div className={`${isExpanded ? "block" : "hidden"} sm:!block space-y-6 transition-opacity duration-300`}>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "justify", textAlignLast: "left" }}
            >
              Beyond website development, I have also explored building web-based systems, administrative applications, and interactive platforms using technologies such as Firebase, JavaScript, and AI-assisted coding workflows. My approach integrates technical implementation, usability, problem-solving, and continuous improvement to deliver solutions that support both operational efficiency and business objectives.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "justify", textAlignLast: "left" }}
            >
              For me, successful digital solutions go beyond visual presentation. They are about building functional and intuitive front-end experiences, delivering seamless interactions, simplifying processes, and creating meaningful value for both users and businesses.
            </motion.p>

            {/* Mobile Less Button (at bottom of full texts when expanded) */}
            {isExpanded && (
              <div className="sm:hidden pt-1">
                <button
                  type="button"
                  id="about-me-less-btn"
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center gap-1.5 text-[#2563EB] font-sans font-medium text-[16px] hover:text-[#1d4ed8] cursor-pointer transition-colors"
                >
                  <span>Less</span>
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Author details with circular profile image and smooth one-time reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 pt-8 mt-4"
        >
          <img 
            src="/DemoPic/Zul.jpg" 
            alt="Zulhilmi Nasir" 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-[50%_20%] filter grayscale contrast-[1.05] hover:grayscale-0 hover:contrast-100 transition-all duration-500 ease-out border border-zinc-200"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-sans font-semibold text-[17px] sm:text-[19px] text-zinc-900 leading-tight">
              Zulhilmi Nasir,
            </span>
            <span className="font-sans text-[13px] sm:text-[14px] text-zinc-500 font-medium tracking-wide mt-1">
              Web Developer &amp; AI-Driven Digital Solutions | Front-End Development | UI/UX
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
