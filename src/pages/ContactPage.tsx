import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { ArrowUpRight, Check, Copy, Mail, Moon, Plus, Sun, X } from "lucide-react";
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
  const [footerLocalTime, setFooterLocalTime] = useState("");
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const mobileMenuPanelRef = useRef<HTMLDivElement | null>(null);

  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [mobileHeldCard, setMobileHeldCard] = useState<"telegram" | "email" | null>(null);
  const emailBoxRef = useRef<HTMLButtonElement | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStateRef = useRef<{
    card: "telegram" | "email";
    startX: number;
    startY: number;
    isLongHold: boolean;
  } | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLongHoldEndRef = useRef<number>(0);

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
      const now = new Date();
      const shortFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kuala_Lumpur",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const fullFormatter = new Intl.DateTimeFormat([], {
        timeZone: "Asia/Kuala_Lumpur",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setLocalTime(shortFormatter.format(now));
      setFooterLocalTime(fullFormatter.format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkWidth = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileHeldCard(null);
        touchStateRef.current = null;
        if (holdTimerRef.current) {
          clearTimeout(holdTimerRef.current);
          holdTimerRef.current = null;
        }
      }
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    let prevY = window.scrollY;
    let ticking = false;
    let rafId = 0;

    const evaluateScroll = () => {
      ticking = false;
      const currentY = window.scrollY;
      const delta = currentY - prevY;

      if (currentY < 80) {
        setHeaderVisible((prev) => (prev ? prev : true));
        setIsHeaderScrolled((prev) => (prev ? false : prev));
        prevY = currentY;
      } else {
        setIsHeaderScrolled((prev) => (prev ? prev : true));
        if (delta > 2) {
          setHeaderVisible((prev) => (prev ? false : prev));
          prevY = currentY;
        } else if (delta < -2) {
          setHeaderVisible((prev) => (prev ? prev : true));
          prevY = currentY;
        }
      }
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
    if (!(isMobile && isMobileMenuOpen)) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
      return;
    }

    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const rafId = requestAnimationFrame(() => {
      mobileMenuPanelRef.current?.focus({ preventScroll: true });
    });

    const handleTouchMove = (e: TouchEvent) => {
      const panel = mobileMenuPanelRef.current;
      if (!panel || !panel.contains(e.target as Node)) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      if (panel.scrollHeight <= panel.clientHeight) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const panel = mobileMenuPanelRef.current;
      if (!panel || !panel.contains(e.target as Node)) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      if (panel.scrollHeight <= panel.clientHeight) {
        if (e.cancelable) e.preventDefault();
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleWheel);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isMobile, isMobileMenuOpen, lenis]);

  useEffect(() => {
    const resetHeldState = () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      touchStateRef.current = null;
      setMobileHeldCard(null);
    };

    window.addEventListener("blur", resetHeldState);
    document.addEventListener("visibilitychange", resetHeldState);

    return () => {
      window.removeEventListener("blur", resetHeldState);
      document.removeEventListener("visibilitychange", resetHeldState);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    };
  }, []);

  const handleBackToMain = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    }
    sessionStorage.removeItem("home_scroll_position");
    sessionStorage.removeItem("capabilities_expanded_index");
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    if (isDesktop) {
      triggerFullLoading(() => {
        navigate("/");
      });
    } else {
      navigate("/");
    }
  };

  const handleMainPageBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    }
    sessionStorage.removeItem("home_scroll_position");
    sessionStorage.removeItem("capabilities_expanded_index");
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    if (isDesktop) {
      triggerReveal(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        navigate("/");
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      navigate("/");
    }
  };

  const handleSectionNavigate = (
    e: React.MouseEvent<HTMLElement>,
    sectionHash: string
  ) => {
    e.preventDefault();
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    }

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

  const handleContactTopClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    }
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  const clearMobileCardHold = (recordLongHoldEnd = false) => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (recordLongHoldEnd && touchStateRef.current?.isLongHold) {
      lastLongHoldEndRef.current = Date.now();
    }
    touchStateRef.current = null;
    setMobileHeldCard(null);
  };

  const handleCardTouchStart = (
    card: "telegram" | "email",
    e: React.TouchEvent<HTMLElement>
  ) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    if (!touch) return;
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    touchStateRef.current = {
      card,
      startX: touch.clientX,
      startY: touch.clientY,
      isLongHold: false,
    };
    setMobileHeldCard(card);
    holdTimerRef.current = setTimeout(() => {
      if (touchStateRef.current && touchStateRef.current.card === card) {
        touchStateRef.current.isLongHold = true;
      }
    }, 450);
  };

  const handleCardTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (!isMobile || !touchStateRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const insideBounds =
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom;

    if (!insideBounds) {
      clearMobileCardHold(false);
      return;
    }

    if (!touchStateRef.current.isLongHold) {
      const dx = touch.clientX - touchStateRef.current.startX;
      const dy = touch.clientY - touchStateRef.current.startY;
      if (Math.hypot(dx, dy) > 12) {
        clearMobileCardHold(false);
      }
    }
  };

  const handleCardTouchEnd = () => {
    if (!isMobile) return;
    clearMobileCardHold(true);
  };

  const handleCardTouchCancel = () => {
    if (!isMobile) return;
    clearMobileCardHold(false);
  };

  const isTelegramHeldOnMobile = isMobile && mobileHeldCard === "telegram";
  const isEmailHeldOnMobile = isMobile && mobileHeldCard === "email";

  const displayTime = localTime || "05:30";

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#09090B] font-sans selection:bg-[#2563EB] selection:text-white relative">
      {/* Global Navigation Header matching Main Page (white-background configuration) */}
      <div className={`relative ${isMobile && isMobileMenuOpen ? "z-[120]" : "z-[100]"}`}>
        <AnimatePresence>
          {(headerVisible || (isMobile && isMobileMenuOpen)) && (
            <motion.header
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed top-0 left-0 right-0 transition-[background-color,border-color,box-shadow] duration-300 ${
                isMobile
                  ? isMobileMenuOpen
                    ? "z-[120] !bg-transparent !border-transparent border-b-0 inset-0 h-[100vh] supports-[height:100dvh]:h-[100dvh] flex flex-col overflow-hidden shadow-none"
                    : "z-[100] bg-white border-b border-zinc-200/80 h-14 shadow-sm"
                  : "z-[100] bg-transparent border-b-0 pt-4 md:pt-2.5 lg:pt-4"
              }`}
            >
              <div className="w-full px-6 sm:px-12 lg:px-16 h-14 md:h-12 lg:h-14 shrink-0 bg-white md:bg-transparent flex items-center justify-between">
                {!isMobile ? (
                  <LayoutGroup id="header-contact-group">
                    {!isHeaderScrolled ? (
                      <>
                        {/* Brand Mark (white-background setup) */}
                        <div className="flex items-center">
                          <motion.button
                            layoutId="header-brand-link-contact"
                            transition={{ type: "spring", stiffness: 320, damping: 30 }}
                            onClick={handleBackToMain}
                            className="font-display font-semibold text-xs md:text-sm lg:text-base tracking-tight flex items-center gap-1.5 transition-colors duration-300 text-zinc-950 hover:text-[#2563EB] cursor-pointer bg-transparent border-none p-0 outline-none"
                          >
                            <span className="hidden lg:inline-block">Zulhilmi Nasir</span>
                            <span className="inline-block lg:hidden">Zulhilmi</span>
                          </motion.button>
                        </div>

                        {/* Desktop Nav (white-background setup) */}
                        <motion.nav
                          layoutId="header-nav-capsule-contact"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          className="flex items-center bg-transparent border border-transparent rounded-full py-1.5 px-3 md:py-1.5 md:px-2 lg:py-2 lg:px-4 space-x-1.5 md:space-x-1.5 lg:space-x-2.5 font-normal tracking-normal font-sans text-zinc-950 transition-all duration-300 shadow-none"
                        >
                          <a
                            href="/#services-section"
                            onClick={(e) => handleSectionNavigate(e, "services-section")}
                            className="nav-menu-btn nav-btn-black"
                          >
                            <span className="inline-block text-[15px] font-medium">Services</span>
                          </a>
                          <a
                            href="/#integration-section"
                            onClick={(e) => handleSectionNavigate(e, "integration-section")}
                            className="nav-menu-btn nav-btn-black"
                          >
                            <span className="hidden lg:inline-block text-[15px] font-medium">
                              Software &amp; AI Solution
                            </span>
                            <span className="inline-block lg:hidden text-[15px] font-medium">
                              Software
                            </span>
                          </a>
                          <a
                            href="/#capabilities-section"
                            onClick={(e) => handleSectionNavigate(e, "capabilities-section")}
                            className="nav-menu-btn nav-btn-black"
                          >
                            <span className="inline-block text-[15px] font-medium">Projects</span>
                          </a>
                          <a
                            href="/#about-section"
                            onClick={(e) => handleSectionNavigate(e, "about-section")}
                            className="nav-menu-btn nav-btn-black"
                          >
                            <span className="inline-block text-[15px] font-medium">About</span>
                          </a>
                          <a
                            href="/#career-section"
                            onClick={(e) => handleSectionNavigate(e, "career-section")}
                            className="nav-menu-btn nav-btn-black"
                          >
                            <span className="inline-block text-[15px] font-medium">Career</span>
                          </a>
                        </motion.nav>

                        {/* Main Page Button (white-background setup, Contact page only) */}
                        <div className="flex items-center">
                          <motion.a
                            layoutId="header-contact-btn-contact"
                            transition={{ type: "spring", stiffness: 380, damping: 35 }}
                            href="/"
                            onClick={handleMainPageBtnClick}
                            className="get-in-touch-btn whitespace-nowrap md:!py-1.5 md:!px-3.5 lg:!py-1.5 lg:!px-4 cursor-pointer"
                          >
                            <span className="text-[15px]">Main Page</span>
                          </motion.a>
                        </div>
                      </>
                    ) : (
                      /* Scrolled State Floating Capsule (white-background setup) */
                      <div className="flex items-center justify-center w-full">
                        <motion.div
                          layoutId="header-nav-capsule-contact"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          className="flex items-center rounded-full py-1.5 pl-6 pr-2 md:py-1 md:pl-4 md:pr-1 lg:py-2 lg:pl-7 lg:pr-2.5 font-sans transition-all duration-300 backdrop-blur-2xl bg-white/85 border border-zinc-200/90 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]"
                        >
                          <motion.button
                            layoutId="header-brand-link-contact"
                            transition={{ type: "spring", stiffness: 380, damping: 35 }}
                            onClick={handleBackToMain}
                            className="font-display font-semibold text-base tracking-tight transition-all mr-10 md:mr-5 lg:mr-10 flex items-center h-6 cursor-pointer bg-transparent border-none p-0 outline-none text-zinc-950 hover:text-[#2563EB]"
                          >
                            ZN
                          </motion.button>

                          <nav className="flex items-center space-x-2.5 md:space-x-1.5 lg:space-x-2.5 text-[15px] md:text-[13px] lg:text-[15px] font-medium tracking-normal">
                            <a
                              href="/#services-section"
                              onClick={(e) => handleSectionNavigate(e, "services-section")}
                              className="nav-menu-btn nav-btn-black"
                            >
                              <span>Services</span>
                            </a>
                            <a
                              href="/#integration-section"
                              onClick={(e) => handleSectionNavigate(e, "integration-section")}
                              className="nav-menu-btn nav-btn-black"
                            >
                              <span className="hidden lg:inline">Software &amp; AI Solution</span>
                              <span className="inline lg:hidden">Software</span>
                            </a>
                            <a
                              href="/#capabilities-section"
                              onClick={(e) => handleSectionNavigate(e, "capabilities-section")}
                              className="nav-menu-btn nav-btn-black"
                            >
                              <span>Projects</span>
                            </a>
                            <a
                              href="/#about-section"
                              onClick={(e) => handleSectionNavigate(e, "about-section")}
                              className="nav-menu-btn nav-btn-black"
                            >
                              <span>About</span>
                            </a>
                            <a
                              href="/#career-section"
                              onClick={(e) => handleSectionNavigate(e, "career-section")}
                              className="nav-menu-btn nav-btn-black"
                            >
                              <span>Career</span>
                            </a>
                          </nav>

                          <motion.a
                            layoutId="header-contact-btn-contact"
                            transition={{ type: "spring", stiffness: 380, damping: 35 }}
                            href="/"
                            onClick={handleMainPageBtnClick}
                            className="ml-6 md:ml-3 lg:ml-6 get-in-touch-btn whitespace-nowrap md:!py-1.5 md:!px-3.5 lg:!py-1.5 lg:!px-4 cursor-pointer"
                          >
                            <span className="text-[15px]">Main Page</span>
                          </motion.a>
                        </motion.div>
                      </div>
                    )}
                  </LayoutGroup>
                ) : (
                  /* Mobile Sticky Header matching Main Page */
                  <>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={handleBackToMain}
                        className="font-display font-semibold text-base tracking-tight text-[#2563EB] transition-colors cursor-pointer hover:opacity-85 bg-transparent border-none p-0 outline-none"
                      >
                        Zulhilmi Nasir
                      </button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-1 px-2 -mr-3 translate-x-1 pl-2 text-[#2563EB] hover:text-[#3B82F6] active:text-[#3B82F6] transition-colors cursor-pointer"
                        aria-label="Toggle navigation menu"
                      >
                        {isMobileMenuOpen ? (
                          <X className="h-5 w-5" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 28 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-7"
                            aria-hidden="true"
                          >
                            <line x1="2" y1="5" x2="26" y2="5" />
                            <line x1="14" y1="10" x2="26" y2="10" />
                            <line x1="2" y1="15" x2="26" y2="15" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile menu panel matching Main Page */}
              <AnimatePresence>
                {isMobile && isMobileMenuOpen && (
                  <motion.div
                    ref={mobileMenuPanelRef}
                    tabIndex={-1}
                    data-lenis-prevent
                    data-lenis-prevent-wheel
                    data-lenis-prevent-touch
                    initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                    animate={{
                      opacity: 1,
                      clipPath: "inset(0% 0% 0% 0%)",
                      transitionEnd: { clipPath: "none" },
                    }}
                    exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="md:hidden m-0 mt-0 border-b-0 bg-[#2563EB] backdrop-blur-xs px-6 pt-5 pb-[max(3rem,calc(env(safe-area-inset-bottom)+1.5rem))] flex-1 min-h-0 h-[calc(100vh-3.5rem)] supports-[height:100dvh]:h-[calc(100dvh-3.5rem)] w-full flex flex-col font-sans font-semibold uppercase text-white overflow-y-auto overscroll-y-contain touch-pan-y [-webkit-overflow-scrolling:touch] pointer-events-auto outline-none"
                  >
                    <a
                      href="/#services-section"
                      onClick={(e) => handleSectionNavigate(e, "services-section")}
                      className="shrink-0 flex items-center justify-end text-right py-3 !text-white hover:opacity-80 active:opacity-75 transition-opacity text-[clamp(2rem,8.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
                    >
                      Services
                    </a>
                    <a
                      href="/#integration-section"
                      onClick={(e) => handleSectionNavigate(e, "integration-section")}
                      className="shrink-0 flex items-center justify-end text-right py-3 !text-white hover:opacity-80 active:opacity-75 transition-opacity text-[clamp(2rem,8.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
                    >
                      Software &amp; AI Solutions
                    </a>
                    <a
                      href="/#capabilities-section"
                      onClick={(e) => handleSectionNavigate(e, "capabilities-section")}
                      className="shrink-0 flex items-center justify-end text-right py-3 !text-white hover:opacity-80 active:opacity-75 transition-opacity text-[clamp(2rem,8.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
                    >
                      Projects
                    </a>
                    <a
                      href="/#about-section"
                      onClick={(e) => handleSectionNavigate(e, "about-section")}
                      className="shrink-0 flex items-center justify-end text-right py-3 !text-white hover:opacity-80 active:opacity-75 transition-opacity text-[clamp(2rem,8.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
                    >
                      About
                    </a>
                    <a
                      href="/#career-section"
                      onClick={(e) => handleSectionNavigate(e, "career-section")}
                      className="shrink-0 flex items-center justify-end text-right py-3 mb-7 !text-white hover:opacity-80 active:opacity-75 transition-opacity text-[clamp(2rem,8.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
                    >
                      Career
                    </a>

                    <div className="mt-auto shrink-0 w-full border-t border-white/50 pt-7 flex flex-col items-end text-right">
                      <a
                        href="/contact"
                        onClick={handleContactTopClick}
                        className="ml-auto inline-flex items-center justify-end gap-2.5 group active:scale-[0.98] transition-transform"
                      >
                        <ArrowUpRight
                          className="w-7 h-7 sm:w-8 sm:h-8 !text-white stroke-[2.25] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                        <span className="inline-flex items-center justify-center whitespace-nowrap bg-white !text-[#2563EB] font-semibold uppercase text-[clamp(1rem,4.8vw,1.35rem)] leading-none tracking-[-0.02em] px-5 py-3 rounded-full shadow-md group-hover:bg-white/95 transition-colors">
                          LET&apos;S CONNECT
                        </span>
                      </a>

                      <a
                        href={`mailto:${EMAIL_ADDRESS}`}
                        className="mt-7 inline-block !text-white hover:opacity-85 active:opacity-75 transition-opacity normal-case font-semibold text-[clamp(1.125rem,5.2vw,1.4rem)] leading-snug tracking-tight text-right"
                      >
                        {EMAIL_ADDRESS}
                      </a>

                      <div className="mt-5 flex flex-col items-end gap-2.5 text-right">
                        <a
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-end gap-2 !text-white/95 hover:!text-white active:!text-white/75 transition-colors text-xs font-medium tracking-wider normal-case py-0.5"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.817 17.507h-2.346v-3.676c0-.876-.018-2.004-1.222-2.004-1.223 0-1.41.954-1.41 1.94v3.74h-2.345V9.949h2.253v1.03h.03c.315-.594 1.08-1.221 2.224-1.221 2.377 0 2.816 1.564 2.816 3.6v4.149zM7.844 8.914a1.362 1.362 0 1 1 0-2.724 1.362 1.362 0 0 1 0 2.724zm1.177 8.593H6.668V9.949h2.353v7.558z"
                            />
                          </svg>
                          <span className="normal-case">LinkedIn</span>
                        </a>
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-end gap-2 !text-white/95 hover:!text-white active:!text-white/75 transition-colors text-xs font-medium tracking-wider normal-case py-0.5"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          <span className="normal-case">Facebook</span>
                        </a>
                        <a
                          href="https://x.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-end gap-2 !text-white/95 hover:!text-white active:!text-white/75 transition-colors text-xs font-medium tracking-wider normal-case py-0.5"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.589 6.36h1.913l-4.181 4.778L18.24 17.64h-3.851l-3.016-3.944L7.921 17.64H6.006l4.472-5.112L5.76 6.36h3.949l2.726 3.605L15.589 6.36zm-.672 10.135h1.06L9.133 7.445H7.995l6.922 9.05z"
                            />
                          </svg>
                          <span className="normal-case">The X</span>
                        </a>
                        <a
                          href="https://t.me"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-end gap-2 !text-white/95 hover:!text-white active:!text-white/75 transition-colors text-xs font-medium tracking-wider normal-case py-0.5"
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                          </svg>
                          <span className="normal-case">Telegram</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.header>
          )}
        </AnimatePresence>
      </div>

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
              <h1 className="contact-hero-heading font-satoshi font-bold uppercase text-[clamp(2.75rem,10vw,5.5rem)] lg:text-[clamp(3.5rem,7.4vw,7.25rem)] lg:whitespace-nowrap leading-[0.92] tracking-[-0.04em] text-[#2563EB] select-none">
                LET&apos;S CONNECT
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
              onTouchStart={(e) => handleCardTouchStart("telegram", e)}
              onTouchMove={handleCardTouchMove}
              onTouchEnd={handleCardTouchEnd}
              onTouchCancel={handleCardTouchCancel}
              onContextMenu={(e) => {
                if (isMobile) e.preventDefault();
              }}
              onDragStart={(e) => {
                if (isMobile) e.preventDefault();
              }}
              onClick={(e) => {
                if (isMobile && Date.now() - lastLongHoldEndRef.current < 450) {
                  e.preventDefault();
                }
              }}
              className="group relative h-[136px] sm:h-[180px] lg:h-[205px] border-b md:border-b-0 md:border-r border-zinc-200 flex items-center justify-center overflow-hidden cursor-pointer max-md:select-none max-md:[-webkit-touch-callout:none] max-md:[-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB]"
            >
              {/* Bottom 2px sweep + bottom-up modern blue fill */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-0 bottom-0 h-[2px] w-full bg-[#2563EB] origin-left ${
                  isTelegramHeldOnMobile ? "scale-x-100" : "scale-x-0"
                } group-hover:scale-x-100 transition-transform duration-500 ease-[ease] z-[2]`}
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-[#2563EB] origin-bottom ${
                  isTelegramHeldOnMobile ? "scale-y-100" : "scale-y-0"
                } group-hover:scale-y-100 transition-transform duration-300 ease-[ease] z-0`}
              />

              {/* Default Label */}
              <span
                className={`relative z-10 inline-flex items-center gap-2.5 text-xl sm:text-2xl lg:text-[28px] font-medium text-zinc-900 tracking-tight transition-all duration-300 ease-out ${
                  isTelegramHeldOnMobile ? "-translate-y-3 opacity-0" : ""
                } group-hover:-translate-y-3 group-hover:opacity-0 whitespace-nowrap`}
              >
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
              <span
                className={`absolute inset-0 z-10 flex items-center justify-center gap-2.5 text-lg sm:text-2xl lg:text-[26px] font-medium !text-white tracking-tight ${
                  isTelegramHeldOnMobile
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                } group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out whitespace-nowrap px-4`}
              >
                <span className="!text-white">Quickest way to chat</span>
                <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 !text-white shrink-0" aria-hidden="true" />
              </span>
            </a>

            {/* Right Card: Email (Click to Copy + Cursor Tooltip) */}
            <button
              ref={emailBoxRef}
              type="button"
              onTouchStart={(e) => handleCardTouchStart("email", e)}
              onTouchMove={handleCardTouchMove}
              onTouchEnd={handleCardTouchEnd}
              onTouchCancel={handleCardTouchCancel}
              onContextMenu={(e) => {
                if (isMobile) e.preventDefault();
              }}
              onClick={(e) => {
                if (isMobile && Date.now() - lastLongHoldEndRef.current < 450) {
                  e.preventDefault();
                  return;
                }
                handleCopyEmail();
              }}
              onMouseMove={(e) => {
                if (!isMobile) handleEmailMouseMove(e);
              }}
              onMouseEnter={() => {
                if (!isMobile) setIsEmailHovered(true);
              }}
              onMouseLeave={() => {
                if (!isMobile) setIsEmailHovered(false);
              }}
              className="group relative h-[136px] sm:h-[180px] lg:h-[205px] w-full flex items-center justify-center overflow-hidden cursor-pointer max-md:select-none max-md:[-webkit-touch-callout:none] max-md:[-webkit-tap-highlight-color:transparent] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#2563EB]"
            >
              {/* Bottom 2px sweep + bottom-up modern blue fill */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute left-0 bottom-0 h-[2px] w-full bg-[#2563EB] origin-left ${
                  isEmailHeldOnMobile ? "scale-x-100" : "scale-x-0"
                } group-hover:scale-x-100 transition-transform duration-500 ease-[ease] z-[2]`}
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-[#2563EB] origin-bottom ${
                  isEmailHeldOnMobile ? "scale-y-100" : "scale-y-0"
                } group-hover:scale-y-100 transition-transform duration-300 ease-[ease] z-0`}
              />

              {/* Default Label */}
              <span
                className={`relative z-10 inline-flex items-center gap-2.5 text-xl sm:text-2xl lg:text-[28px] font-medium text-zinc-900 tracking-tight transition-all duration-300 ease-out ${
                  isEmailHeldOnMobile ? "-translate-y-3 opacity-0" : ""
                } group-hover:-translate-y-3 group-hover:opacity-0 whitespace-nowrap`}
              >
                <span>Email</span>
                <Copy className="w-5 h-5 sm:w-[21px] sm:h-[21px] stroke-[1.8] shrink-0" aria-hidden="true" />
              </span>

              {/* Hover Reveal State */}
              <span
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-1 ${
                  isEmailHeldOnMobile
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"
                } group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out px-4`}
              >
                {emailCopied ? (
                  <>
                    <span className="inline-flex items-center gap-2 text-lg sm:text-2xl lg:text-[26px] font-medium !text-white tracking-tight whitespace-nowrap">
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 !text-white shrink-0" aria-hidden="true" />
                      <span className="!text-white">Email copied!</span>
                    </span>
                    <span className="text-xs !text-white/80">{EMAIL_ADDRESS}</span>
                  </>
                ) : (
                  <>
                    <span className="inline-flex items-center gap-2.5 text-lg sm:text-2xl lg:text-[26px] font-medium !text-white tracking-tight whitespace-nowrap">
                      <span className="!text-white">Weeeell &mdash; I&apos;ll reply</span>
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6 !text-white shrink-0" aria-hidden="true" />
                    </span>
                    <span className="text-xs !text-white/80">{EMAIL_ADDRESS}</span>
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
                  className="hidden md:inline-flex pointer-events-none absolute top-0 left-0 z-20 items-center px-3 py-1.5 rounded-md bg-white border border-white/80 text-xs font-semibold !text-[#2563EB] shadow-[0_8px_24px_rgba(0,0,0,0.16)] whitespace-nowrap"
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
              <span className="text-[18px] text-zinc-400 font-normal">Socials</span>
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
                    className="contact-blue-hover-btn inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 py-3.5 px-5 text-xs sm:text-[13px] font-medium whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <span className="relative z-10">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: FAQ / Questions Accordion */}
        <section className="w-full px-6 sm:px-12 lg:px-16 pt-4 sm:pt-8 pb-24 sm:pb-32">
          {/* "Questions" Heading */}
          <h2 className="contact-questions-heading font-satoshi font-bold text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.95] tracking-[-0.04em] text-[#2563EB] mt-2 mb-12 sm:mb-16 select-none">
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

      {/* Pre-Footer Image Section matching Main Page */}
      <section className="w-full relative overflow-hidden bg-[#2563EB] -mb-1">
        <div className="w-full h-[350px] sm:h-[500px] md:h-[650px] lg:h-[800px] relative">
          <img
            src="/hero-bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Left-aligned Display Statement with equal top and bottom margin */}
          <div className="absolute inset-0 z-20 flex items-center justify-start px-6 sm:px-12 lg:px-16 pointer-events-none select-none">
            <h2
              className="font-satoshi font-sans font-medium text-[32px] sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] !text-white !text-[#ffffff] text-left"
              style={{
                fontFamily: "'Satoshi', var(--font-sans), system-ui, sans-serif",
                fontWeight: 500,
              }}
            >
              <span className="block !text-white font-medium">Turn Ideas</span>
              <span className="block !text-white font-medium">Into AI Solution</span>
            </h2>
          </div>
          {/* Smooth multi-stop bottom color blend into footer background */}
          <div
            className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(37, 99, 235, 0) 0%, rgba(37, 99, 235, 0.1) 20%, rgba(37, 99, 235, 0.35) 40%, rgba(37, 99, 235, 0.7) 65%, rgba(37, 99, 235, 0.95) 82%, rgba(37, 99, 235, 1) 90%, rgba(37, 99, 235, 1) 100%)",
            }}
          />
        </div>
      </section>

      {/* Footer Section matching Main Page */}
      <footer id="contact-section" className="relative overflow-hidden bg-[#2563EB] text-white pt-24 pb-0">
        <div className="relative z-10 w-full mx-auto select-none">
          {/* Top content wrapper with margins */}
          <div className="px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-24">
            {/* Left part: Time, Title and pill button */}
            <div className="lg:col-span-8 flex flex-col items-start">
              {/* Dynamic local time */}
              <div className="text-xs text-white flex items-center gap-2 mb-8 tracking-wider uppercase font-sans">
                {footerLocalTime &&
                parseInt(footerLocalTime.split(":")[0], 10) >= 6 &&
                parseInt(footerLocalTime.split(":")[0], 10) < 18 ? (
                  <Sun className="h-4 w-4 text-white" />
                ) : (
                  <Moon className="h-4 w-4 text-white" />
                )}
                <span>
                  {footerLocalTime
                    ? `${footerLocalTime} Kuala Lumpur, MY`
                    : "05:03 PM Kuala Lumpur, MY"}
                </span>
              </div>

              {/* Contact email */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-white !text-[#ffffff] leading-[1.15] max-w-full mb-10">
                {EMAIL_ADDRESS}
              </h2>

              {/* Download Resume button matching Main Page */}
              <a
                href="/Zulhilmi_Nasir_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#2563EB] hover:bg-white/90 active:scale-95 transition-all px-7 py-3.5 rounded-full font-sans font-semibold tracking-wide text-sm shadow-xl group cursor-pointer"
              >
                <span className="inline-flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M14.25 2.25V6a2.25 2.25 0 0 0 2.25 2.25h3.75l-6-6Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 2.25A2.25 2.25 0 0 0 3.75 4.5v15A2.25 2.25 0 0 0 6 21.75h12a2.25 2.25 0 0 0 2.25-2.25V9.75H16.5a3.75 3.75 0 0 1-3.75-3.75V2.25H6Zm1.5 6a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Zm0 4a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Zm0 3.75a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z"
                    />
                  </svg>
                </span>
                <span>View My CV</span>
              </a>
            </div>

            {/* Right part: Explore & Socials columns */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:justify-items-end w-full">
              {/* Explore Column */}
              <div className="flex flex-col gap-3 text-sm lg:min-w-[120px]">
                <span className="text-white font-sans text-xs uppercase tracking-widest mb-2 font-bold">
                  Explore
                </span>
                <a
                  href="/"
                  onClick={handleMainPageBtnClick}
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Home
                </a>
                <a
                  href="/#services-section"
                  onClick={(e) => handleSectionNavigate(e, "services-section")}
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Services
                </a>
                <a
                  href="/#integration-section"
                  onClick={(e) => handleSectionNavigate(e, "integration-section")}
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Software &amp; AI Solution
                </a>
                <a
                  href="/#capabilities-section"
                  onClick={(e) => handleSectionNavigate(e, "capabilities-section")}
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Projects
                </a>
                <a
                  href="/#about-section"
                  onClick={(e) => handleSectionNavigate(e, "about-section")}
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  About
                </a>
                <a
                  href="/#career-section"
                  onClick={(e) => handleSectionNavigate(e, "career-section")}
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Career
                </a>
              </div>

              {/* Socials Column */}
              <div className="flex flex-col gap-3 text-sm lg:min-w-[120px]">
                <span className="text-white font-sans text-xs uppercase tracking-widest mb-2 font-bold">
                  Socials
                </span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Facebook
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  The X
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Telegram
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex justify-between items-end px-6 sm:px-12 lg:px-16 text-[10px] text-white uppercase tracking-widest font-sans mb-2">
            <div>
              <div>2026 ZULHILMI,</div>
              <div>ALL RIGHTS RESERVED</div>
            </div>
            <div className="text-right">
              <a
                href="#contact-section"
                onClick={(e) => e.preventDefault()}
                className="hover:text-white/80 transition-colors block"
              >
                TERMS
              </a>
              <a
                href="#contact-section"
                onClick={(e) => e.preventDefault()}
                className="hover:text-white/80 transition-colors block mt-1"
              >
                PRIVACY POLICY
              </a>
            </div>
          </div>

          {/* Bottom Giant Typographic Name "ZULHILMI" with perfect edge-to-edge SVG */}
          <div className="w-full overflow-hidden m-0 p-0 block leading-none">
            <svg
              viewBox="0 0 620 111"
              className="w-full h-auto m-0 p-0 block select-none translate-y-[2px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="zulhilmi-gradient-contact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
              <text
                x="-6"
                y="111"
                textLength="632"
                lengthAdjust="spacingAndGlyphs"
                fontFamily="Inter, system-ui, -apple-system, sans-serif"
                fontWeight="900"
                fontSize="144"
                fill="url(#zulhilmi-gradient-contact)"
                style={{ letterSpacing: "-0.05em" }}
              >
                ZULHILMI
              </text>
            </svg>
          </div>
        </div>
      </footer>
    </div>
  );
}
