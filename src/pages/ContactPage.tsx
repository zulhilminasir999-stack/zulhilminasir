import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpLeft, ArrowUpRight, Check, Copy, Mail, Plus, X } from "lucide-react";
import { useLenis } from "lenis/react";
import { useReveal } from "../context/RevealContext";

interface FaqItem {
  index: string;
  question: string;
  answer: string;
}

const CONTACT_FAQS: FaqItem[] = [
  {
    index: "01",
    question: "What exactly do you usually do?",
    answer:
      "I design and engineer end-to-end digital products — combining high-craft UI/UX design in Figma, modern frontend engineering (React, TypeScript, Tailwind CSS), CMS & e-commerce storefronts (WordPress Elementor, SiteGiant), and AI-assisted web applications.",
  },
  {
    index: "02",
    question: "How long does a typical project take from start to launch?",
    answer:
      "Focused landing pages and UI/UX prototypes typically take 2 to 4 weeks, while full corporate websites, e-commerce stores, or custom web systems usually span 4 to 8 weeks depending on scope, content readiness, and integrations.",
  },
  {
    index: "03",
    question: "Do you handle both UI/UX design and frontend code?",
    answer:
      "Yes. Keeping strategy, visual direction, and frontend implementation under one roof ensures the final live product matches the design system pixel-for-pixel with smooth motion and responsive precision.",
  },
  {
    index: "04",
    question: "Are you open to full-time roles, freelance, or partnerships?",
    answer:
      "I am open to impactful full-time opportunities, select freelance commissions, and long-term agency or product partnerships — both within Malaysia and remotely across global timezones.",
  },
  {
    index: "05",
    question: "What details should I share when reaching out?",
    answer:
      "A brief overview of your project goals, target timeline, and any reference links or existing brand assets is plenty to kick things off. Drop a message via Telegram or copy my email above and I will reply promptly.",
  },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", url: "https://linkedin.com" },
  { label: "GitHub", url: "https://github.com" },
  { label: "Behance", url: "https://behance.net" },
  { label: "Facebook", url: "https://facebook.com" },
  { label: "The X", url: "https://x.com" },
  { label: "Telegram", url: "https://t.me" },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const lenis = useLenis();
  const { triggerReveal, triggerFullLoading } = useReveal();

  const [localTime, setLocalTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const emailBoxRef = useRef<HTMLButtonElement | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const EMAIL_ADDRESS = "zulhilminasir999@gmail.com";

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  useEffect(() => {
    const updateClock = () => {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kuala_Lumpur",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setLocalTime(formatter.format(new Date()));
    };

    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let ticking = false;
    let rafId = 0;

    const evaluateScroll = () => {
      ticking = false;
      const nextScrolled = window.scrollY >= 72;
      setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(evaluateScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    evaluateScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
      return;
    }

    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isMenuOpen, lenis]);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleBackToMain = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    }
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    if (isDesktop) {
      triggerFullLoading(() => {
        navigate("/");
      });
    } else {
      navigate("/");
    }
  };

  const handleSectionNavigate = (
    e: React.MouseEvent<HTMLElement>,
    sectionHash: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    lenis?.start();

    const dest = sectionHash ? `/#${sectionHash.replace("#", "")}` : "/";
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

    if (isDesktop) {
      triggerReveal(() => {
        navigate(dest);
      });
    } else {
      navigate(dest);
    }
  };

  const handleEmailMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = emailBoxRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = EMAIL_ADDRESS;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setEmailCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      setEmailCopied(false);
    }, 2400);
  };

  const displayTime = localTime || "05:30";

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#09090B] font-sans selection:bg-[#2563EB] selection:text-white relative">
      {/* Minimalist 3-Zone Top Bar matching reference video */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#FFFFFF]/90 backdrop-blur-md border-b border-zinc-100/80">
        <div className="w-full px-6 sm:px-12 lg:px-16 h-16 sm:h-20 flex items-center justify-between gap-8">
          {/* Left: Live Local Time & Location */}
          <div className="text-xs sm:text-[13px] font-normal text-zinc-800 tabular-nums whitespace-nowrap shrink-0">
            {displayTime}, Kuala Lumpur (MY)
          </div>

          {/* Center: Morphs from "Main page" at top to Brand Mark on scroll */}
          <div className="flex items-center justify-center shrink-0">
            <AnimatePresence mode="wait" initial={false}>
              {!isScrolled ? (
                <motion.a
                  key="nav-main-link"
                  href="/"
                  onClick={handleBackToMain}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-medium text-zinc-900 hover:text-[#2563EB] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
                >
                  <ArrowUpLeft className="w-3.5 h-3.5 stroke-[1.75]" aria-hidden="true" />
                  <span>Main page</span>
                </motion.a>
              ) : (
                <motion.a
                  key="nav-brand-mark"
                  href="/"
                  onClick={handleBackToMain}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xs sm:text-[13px] font-semibold tracking-wider uppercase text-zinc-950 hover:text-[#2563EB] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
                >
                  ZULHILMI&reg;
                </motion.a>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Menu + 4-dot Grid Trigger */}
          <div className="flex items-center justify-end shrink-0">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle site navigation menu"
              className="inline-flex items-center gap-2.5 py-2 pl-3 pr-1 text-xs sm:text-[13px] font-medium text-zinc-900 hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded-sm"
            >
              <span>{isMenuOpen ? "Close" : "Menu"}</span>
              {isMenuOpen ? (
                <X className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
              ) : (
                <svg
                  viewBox="0 0 14 14"
                  fill="currentColor"
                  className="w-3.5 h-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="3" cy="3" r="1.35" />
                  <circle cx="11" cy="3" r="1.35" />
                  <circle cx="3" cy="11" r="1.35" />
                  <circle cx="11" cy="11" r="1.35" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Drawer Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="contact-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[95] bg-black/25 backdrop-blur-xs"
            />
            <motion.nav
              key="contact-menu-drawer"
              aria-label="Site navigation"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-16 sm:top-20 right-6 sm:right-12 lg:right-16 z-[101] w-[calc(100vw-3rem)] sm:w-80 bg-white border border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-1"
            >
              <a
                href="/"
                onClick={handleBackToMain}
                className="flex items-center justify-between py-2.5 text-base font-medium text-zinc-900 hover:text-[#2563EB] transition-colors whitespace-nowrap"
              >
                <span>Main Page</span>
                <ArrowUpLeft className="w-4 h-4 text-zinc-400" />
              </a>
              <a
                href="/#services-section"
                onClick={(e) => handleSectionNavigate(e, "services-section")}
                className="flex items-center justify-between py-2.5 text-base font-medium text-zinc-900 hover:text-[#2563EB] transition-colors whitespace-nowrap"
              >
                <span>Services</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a
                href="/#integration-section"
                onClick={(e) => handleSectionNavigate(e, "integration-section")}
                className="flex items-center justify-between py-2.5 text-base font-medium text-zinc-900 hover:text-[#2563EB] transition-colors whitespace-nowrap"
              >
                <span>Software &amp; AI Solution</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a
                href="/#capabilities-section"
                onClick={(e) => handleSectionNavigate(e, "capabilities-section")}
                className="flex items-center justify-between py-2.5 text-base font-medium text-zinc-900 hover:text-[#2563EB] transition-colors whitespace-nowrap"
              >
                <span>Projects</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a
                href="/#about-section"
                onClick={(e) => handleSectionNavigate(e, "about-section")}
                className="flex items-center justify-between py-2.5 text-base font-medium text-zinc-900 hover:text-[#2563EB] transition-colors whitespace-nowrap"
              >
                <span>About</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </a>
              <a
                href="/#career-section"
                onClick={(e) => handleSectionNavigate(e, "career-section")}
                className="flex items-center justify-between py-2.5 text-base font-medium text-zinc-900 hover:text-[#2563EB] transition-colors whitespace-nowrap"
              >
                <span>Career</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              </a>

              <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-col gap-1">
                <span className="text-[11px] text-zinc-400">Direct email</span>
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="text-sm font-medium text-zinc-900 hover:text-[#2563EB] transition-colors truncate"
                >
                  {EMAIL_ADDRESS}
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        {/* Section 1: LET'S CHAT + Availability & Timezone */}
        <section className="w-full px-6 sm:px-12 lg:px-16 pt-28 sm:pt-36 lg:pt-40 pb-10 sm:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <h1 className="font-condensed uppercase text-[clamp(4.4rem,15.5vw,13.5rem)] leading-[0.84] tracking-[-0.015em] !text-[#0A0A0A] select-none">
                LET&apos;S CHAT
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 lg:pb-2 lg:pl-4 flex flex-col items-start"
            >
              <p className="text-sm font-medium text-zinc-900">
                Available for New Projects &middot; 2026
              </p>
              <p className="text-sm text-zinc-500 mt-1">
                Let&apos;s check timezones so no one suffers.
              </p>
              <p className="text-sm font-medium text-zinc-900 tabular-nums mt-5">
                {displayTime}, Kuala Lumpur (MY)
              </p>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Interactive 2-Column Split Contact Cards (Telegram & Email) */}
        <section className="w-full px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-zinc-200 bg-white">
            {/* Left Card: Telegram */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-[136px] sm:h-[180px] lg:h-[205px] border-b md:border-b-0 md:border-r border-zinc-200 flex items-center justify-center overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB]"
            >
              {/* Compositor-only dark curtain reveal on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[#141414] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />

              {/* Default Label */}
              <span className="relative z-10 inline-flex items-center gap-2.5 text-xl sm:text-2xl lg:text-[28px] font-medium text-zinc-900 tracking-tight transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 group-hover:opacity-0 whitespace-nowrap">
                <span>Telegram</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 sm:w-[22px] sm:h-[22px] shrink-0"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </span>

              {/* Hover Reveal State */}
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2.5 text-lg sm:text-2xl lg:text-[26px] font-medium !text-white tracking-tight opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap px-4">
                <span className="!text-white">Quickest way to chat</span>
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 !text-white shrink-0" aria-hidden="true" />
              </span>
            </a>

            {/* Right Card: Email (Click to Copy + Cursor Tooltip matching 00:04) */}
            <button
              ref={emailBoxRef}
              type="button"
              onClick={handleCopyEmail}
              onMouseMove={handleEmailMouseMove}
              onMouseEnter={() => setIsEmailHovered(true)}
              onMouseLeave={() => setIsEmailHovered(false)}
              className="group relative h-[136px] sm:h-[180px] lg:h-[205px] w-full flex items-center justify-center overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB]"
            >
              {/* Compositor-only dark curtain reveal on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[#141414] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />

              {/* Default Label */}
              <span className="relative z-10 inline-flex items-center gap-2.5 text-xl sm:text-2xl lg:text-[28px] font-medium text-zinc-900 tracking-tight transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-3 group-hover:opacity-0 whitespace-nowrap">
                <span>Email</span>
                <Copy className="w-5 h-5 sm:w-[21px] sm:h-[21px] stroke-[1.8] shrink-0" aria-hidden="true" />
              </span>

              {/* Hover Reveal State matching reference video 00:04 */}
              <span className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] px-4">
                {emailCopied ? (
                  <>
                    <span className="inline-flex items-center gap-2 text-lg sm:text-2xl lg:text-[26px] font-medium !text-white tracking-tight whitespace-nowrap">
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 !text-emerald-400 shrink-0" aria-hidden="true" />
                      <span className="!text-white">Email copied!</span>
                    </span>
                    <span className="text-xs !text-zinc-400">{EMAIL_ADDRESS}</span>
                  </>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-2.5 text-lg sm:text-2xl lg:text-[26px] font-medium !text-white tracking-tight whitespace-nowrap">
                      <span className="!text-white">Weeeell &mdash; I&apos;ll reply</span>
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 !text-white shrink-0" aria-hidden="true" />
                    </span>
                    <span className="text-xs !text-zinc-400">{EMAIL_ADDRESS}</span>
                  </>
                )}
              </span>

              {/* Cursor-following "Copy Email" tag on desktop */}
              {isEmailHovered && (
                <span
                  aria-hidden="true"
                  style={{
                    transform: `translate3d(${cursorPos.x + 14}px, ${cursorPos.y + 14}px, 0)`,
                  }}
                  className="hidden md:inline-flex pointer-events-none absolute top-0 left-0 z-20 items-center px-3 py-1.5 rounded-md bg-[#27272A] border border-white/15 text-xs font-medium !text-white shadow-lg whitespace-nowrap"
                >
                  {emailCopied ? "Copied!" : "Copy Email"}
                </span>
              )}
            </button>
          </div>
        </section>

        {/* Section 3: Socials Editorial Split + 3x2 Interactive Social Buttons */}
        <section className="w-full px-6 sm:px-12 lg:px-16 pt-20 sm:pt-28 lg:pt-36 pb-20 sm:pb-28 lg:pb-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6">
              <span className="text-sm text-zinc-400 font-normal">Socials</span>
            </div>

            <div className="lg:col-span-6">
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-normal leading-[1.2] tracking-[-0.02em] text-zinc-900 text-balance">
                Feel free to reach me across different social platforms, always
                open to connect, collaborate, and explore partnerships.
              </h2>

              <div className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-3.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white hover:bg-[#141414] hover:border-[#141414] text-zinc-800 hover:!text-white py-3.5 px-5 text-xs sm:text-[13px] font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: FAQ / Questions Accordion */}
        <section className="w-full px-6 sm:px-12 lg:px-16 pt-4 sm:pt-8 pb-24 sm:pb-32">
          {/* 3-Column Metadata Strip matching 00:05-00:07 */}
          <div className="flex items-center justify-between text-xs text-zinc-500 pb-6">
            <span className="tabular-nums">01</span>
            <span>FAQ</span>
            <span>ZULHILMI&reg;</span>
          </div>

          {/* Giant Condensed "Questions" Heading */}
          <h2 className="font-condensed text-[clamp(3.75rem,11.5vw,9.5rem)] leading-[0.88] tracking-[-0.015em] !text-[#0A0A0A] mt-2 mb-12 sm:mb-16 select-none">
            Questions
          </h2>

          {/* Interactive Numbered Accordion */}
          <div className="border-t border-zinc-200">
            {CONTACT_FAQS.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={item.index} className="border-b border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full py-6 sm:py-8 flex items-center justify-between gap-4 sm:gap-8 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB]"
                  >
                    <span className="text-xs text-zinc-400 tabular-nums w-10 sm:w-28 lg:w-44 shrink-0">
                      {item.index}
                    </span>
                    <span className="flex-1 text-lg sm:text-2xl lg:text-[26px] font-normal text-zinc-900 tracking-tight group-hover:text-[#2563EB] transition-colors">
                      {item.question}
                    </span>
                    <span
                      className={`w-8 h-8 flex items-center justify-center shrink-0 text-zinc-900 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`faq-answer-${item.index}`}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="pl-14 sm:pl-36 lg:pl-52 pr-4 sm:pr-12 pb-7 sm:pb-9"
                      >
                        <p className="text-sm sm:text-base text-zinc-600 leading-relaxed max-w-3xl">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Clean Minimal Footer Strip */}
      <footer className="w-full border-t border-zinc-200 bg-[#FFFFFF]">
        <div className="px-6 sm:px-12 lg:px-16 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-zinc-500">
          <div>2026 Zulhilmi Nasir &middot; All rights reserved</div>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="text-zinc-800 hover:text-[#2563EB] font-medium transition-colors whitespace-nowrap"
            >
              {EMAIL_ADDRESS}
            </a>
            <span aria-hidden="true">&middot;</span>
            <a
              href="/"
              onClick={handleBackToMain}
              className="inline-flex items-center gap-1 text-zinc-800 hover:text-[#2563EB] font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Main page</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
