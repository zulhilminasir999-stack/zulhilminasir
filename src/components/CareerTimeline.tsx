import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { WordsStagger } from "../registry/spell-ui/words-stagger";

interface CareerTimelineProps {
  theme: "dark" | "light";
}

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
  image: string;
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "factor",
    company: "Digital & Web Designer",
    role: "JumpFactor",
    location: "Newton Research & Development Centre",
    period: "Dec 2024 - Aug 2026",
    summary: "Designed and developed responsive web layouts, Figma prototypes, and the company's packaging design mockups, while implementing front-end code, SEO practices, and AI-assisted workflows to modernize digital experiences.",
    bullets: [
      "Designed and managed WordPress-based landing pages to showcase branch services and enhance customer engagement.",
      "Designed and prototyped structured mobile app systems and dashboards using Figma to support engineering and laboratory operations.",
      "Applied basic HTML, CSS, and JavaScript knowledge to ensure UI feasibility and implement custom front-end layouts in WordPress",
      "Supported digital transformation initiatives by modernizing company branch websites using a Content Management System (CMS) and restructuring documentation layouts.",
      "Enhanced digital visibility for branch services by incorporating basic SEO, GEO, and AEO best practices during the redesign and structuring of WordPress landing pages.",
      "Utilized Adobe Illustrator and Photoshop for vector graphics, packaging mockups, UI designs, and digital content creation, and leveraged AI-assisted tools to enhance design efficiency, ideation, and visual development."
    ],
    image: "/Images/tgpw1.jpg"
  },
  {
    id: "ecraft",
    company: "E-Commerce Web Designer",
    role: "FutureCraft",
    location: "CK LIGHTING SDN BHD",
    period: "May 2023 - Nov 2024",
    summary: "Managed end-to-end digital storefront layouts and visual assets, developing responsive web designs, updating CMS listings, and collaborating on marketing campaigns to improve online conversion.",
    bullets: [
      "Customized and maintained CK Lighting webstores using SiteGiant, ensuring consistent branding across banners, icons, product visuals, and overall website layout.",
      "Optimized Shopee marketplace visuals such as product images, banners, and promotional materials to strengthen brand presence and improve conversion performance.",
      "Developed responsive web designs optimized for desktop and mobile, ensuring cross-browser compatibility and seamless user experience using SiteGiant.",
      "Managed product listings and visual assets via SiteGiant CMS while collaborating with marketing teams to produce compelling campaign materials."
    ],
    image: "/Images/ck1.jpg"
  },
  {
    id: "marketing",
    company: "Digital Marketing Executive",
    role: "Raxbit Smart Solution",
    location: "Raxbit Smart Solution",
    period: "Apr 2022 - Apr 2023",
    summary: "Created impactful brand assets, digital designs, and social media content, ensuring visual consistency and driving online presence for diverse clients.",
    bullets: [
      "Designed various creative materials including posters, banners, brochures, packaging, and business cards for both print and digital platforms based on company and client requirements.",
      "Developed brand identity assets such as logos and social media cover designs, ensuring visual consistency and strong audience engagement.",
      "Managed social media content creation for six businesses, including promotional visuals, copywriting, and content writing to strengthen brand presence.",
      "Produced 10–13 content pieces monthly and supported video recording sessions for business-focused graphic and social media content."
    ],
    image: "/Images/3.jpg"
  }
];

function TypewriterText({ text, active, isLight }: { text: string; active: boolean; isLight: boolean }) {
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!active) {
      setDisplayedText("");
      setCharIndex(0);
      return;
    }

    if (charIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 15);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, text, active]);

  return (
    <span className="relative">
      {displayedText}
      {charIndex < text.length && active && (
        <span className={`inline-block w-[2px] h-[1em] ml-1 align-middle animate-[blink_1s_infinite] ${
          isLight ? "bg-zinc-900" : "bg-white"
        }`} />
      )}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

export default function CareerTimeline({ theme }: CareerTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isLight = theme === "light";

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={`w-full font-sans antialiased select-none ${
      isLight ? "text-zinc-900" : "text-zinc-100"
    }`}>
      {/* Editorial Header Accent - Similar to Latest Portfolio */}
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 pb-16 items-start transition-colors duration-300`}>
        <div className="col-span-1 md:col-span-12 lg:col-span-8 text-center md:text-center lg:text-left">
          <h2 className="text-5xl md:text-[60px] lg:text-[70px] font-sans font-bold tracking-tighter uppercase leading-[0.85] select-none text-center md:text-center lg:text-left text-[#2563EB]">
            <WordsStagger className="text-[#2563EB]">
              PROFESSIONAL
            </WordsStagger>
            <br />
            <WordsStagger className="text-[#2563EB]" delay={0.35}>
              CHRONOLOGY
            </WordsStagger>
          </h2>
        </div>
        <div className="col-span-1 md:col-span-12 lg:col-span-4 pt-4 md:pt-4 lg:pt-4">
        </div>
      </div>

      {/* Accordion Container */}
      <div className="space-y-0">
        {EXPERIENCE_DATA.map((item) => {
          const isOpen = expandedId === item.id;

          return (
            <div 
              key={item.id} 
              className={`transition-colors duration-300`}
            >
              {/* Trigger Row */}
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex items-center justify-between py-10 sm:py-12 text-left group focus:outline-none"
              >
                <div className="flex items-baseline gap-4">
                  <h3 className={`text-xl sm:text-2xl md:text-3xl font-medium tracking-tight transition-all duration-500 group-hover:!text-[#2563EB] ${
                    isOpen ? "opacity-100 !text-[#2563EB]" : "opacity-40 group-hover:opacity-100"
                  }`}>
                    {item.company}
                  </h3>
                </div>
                
                <div className="flex items-center gap-6">
                  {!isOpen && (
                    <div className="hidden lg:block text-right">
                      <span className="block text-xs font-bold uppercase tracking-widest text-zinc-400">
                        {item.location}
                      </span>
                      <span className="block text-xs text-zinc-500 mt-1">
                        {item.period}
                      </span>
                    </div>
                  )}
                  <div className={`p-2 rounded-full border transition-all duration-500 ${
                    isOpen 
                      ? "rotate-45 bg-[#2563EB] border-[#2563EB] text-white" 
                      : "border-zinc-200 text-zinc-400 group-hover:border-zinc-400 group-hover:text-zinc-900"
                  }`}>
                    <Plus size={18} />
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-16 pt-2">
                      {/* Meta Row */}
                      <div className="flex justify-end items-end gap-4 mb-12">
                        <div className="text-right font-sans">
                          <span className="block text-xs font-bold uppercase tracking-[0.1em] text-zinc-500">
                            {item.location}
                          </span>
                          <span className="block text-sm font-medium text-zinc-400 mt-1">
                            {item.period}
                          </span>
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* Summary Column */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                          {/* Monochrome rectangle preview image that restores full color on hover */}
                          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl group/img">
                            <img 
                              src={item.image} 
                              alt={`${item.company} preview`}
                              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer hover:scale-[1.03]"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                        {/* Bullets Column */}
                        <div className="lg:col-span-7">
                          <ul className="space-y-6">
                            {item.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex gap-4 group/bullet">
                                <span className={`mt-2.5 h-[1px] w-4 shrink-0 transition-all duration-300 ${
                                  isLight ? "bg-zinc-300 group-hover/bullet:w-6 group-hover/bullet:bg-zinc-900" : "bg-zinc-700 group-hover/bullet:w-6 group-hover/bullet:bg-white"
                                }`} />
                                <span className={`text-sm sm:text-base leading-relaxed ${
                                  isLight ? "text-zinc-500" : "text-zinc-400"
                                }`}>
                                  {bullet}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
