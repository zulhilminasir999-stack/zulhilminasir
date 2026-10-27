import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import {
  ArrowLeft,
  ChevronLeft,
  X,
  ArrowUpRight,
  Facebook,
  Linkedin,
  Send,
  Smartphone,
  Laptop,
  Layers,
  Box,
  Sun,
  Moon,
} from "lucide-react";
import { PORTFOLIO_PROJECTS, CAPABILITIES_DATA } from "../data";
import { FloatingMenu } from "../components/FloatingMenu";
import { MobileZoomableModal } from "../components/MobileZoomableModal";
import RelatedCapabilitiesCarousel from "../components/RelatedCapabilitiesCarousel";
import { useReveal } from "../context/RevealContext";
import { useLenis } from "lenis/react";

const AI_RELATED_IMAGES = [
  "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200", // Neural pathways AI brain
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200", // AI tech facial interface
  "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=1200", // Sci-fi AI nodes network
  "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=1200", // Code AI development
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200", // Fluid gradient neural art
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200", // Robot close up
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", // AI manufacturing interface
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200", // Blockchain deep learning nodes
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200", // Cyber matrix grid
  "https://images.unsplash.com/photo-1618005198143-e5283464403f?auto=format&fit=crop&q=80&w=1200", // Futuristic synthwaves
  "https://images.unsplash.com/photo-1601134467661-3d775b999c8b?auto=format&fit=crop&q=80&w=1200", // Abstract tech light rays
];

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lenis = useLenis();

  const [headerVisible, setHeaderVisible] = useState(true);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrollReset, setIsScrollReset] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [currentHeroImage, setCurrentHeroImage] = useState<string>("");
  const [selectedMobileModalImage, setSelectedMobileModalImage] = useState<
    string | null
  >(null);
  const { triggerReveal, triggerFullLoading } = useReveal();

  const handleMobileImageClick = (src: string) => {
    if (window.innerWidth < 640 && src) {
      setSelectedMobileModalImage(src);
    }
  };

  const handleBrandHomeClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e && e.preventDefault) e.preventDefault();
    triggerFullLoading(() => {
      navigate("/");
    });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLElement>,
    targetSectionId: string,
    isFromMenuBar: boolean = false,
  ) => {
    if (e && e.preventDefault) e.preventDefault();

    const rawId = targetSectionId.replace("#", "");

    const isDesktopOrTablet = typeof window !== "undefined" && window.innerWidth >= 768;
    const menuTargets = [
      "services-section",
      "services",
      "integration-section",
      "integration",
      "software",
      "capabilities-section",
      "capabilities",
      "projects",
      "project",
      "about-section",
      "about",
      "career-section",
      "career",
      "contact-section",
      "contact",
    ];

    const isMenuBarTarget = menuTargets.includes(rawId);
    const shouldShowLoadingScreen = isDesktopOrTablet && isFromMenuBar && isMenuBarTarget;

    const navigateToHome = () => {
      if (rawId === "hero-section" || rawId === "hero") {
        navigate("/");
      } else {
        navigate(`/#${rawId}`);
      }
    };

    if (shouldShowLoadingScreen) {
      triggerReveal(() => {
        navigateToHome();
      });
    } else {
      navigateToHome();
    }
  };

  const mobileMenuPanelRef = useRef<HTMLDivElement | null>(null);

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

    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (!scrollKeys.includes(e.key)) return;
      const panel = mobileMenuPanelRef.current;
      if (!panel || !panel.contains(e.target as Node)) {
        e.preventDefault();
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isMobile, isMobileMenuOpen, lenis]);

  const handleMobileMenuNavClick = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    lenis?.start();
    setIsMobileMenuOpen(false);
    handleNavClick(e, targetId);
  };

  const project = PORTFOLIO_PROJECTS.find(
    (p) => p.id === id || (id === "zenith-cms" && p.id === "ck-lighting"),
  );

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kuala_Lumpur",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setLocalTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (project) {
      setCurrentHeroImage(
        project.galleryImages && project.galleryImages.length > 0
          ? project.galleryImages[0]
          : project.imageUrl,
      );
    }
  }, [project]);

  const handleRandomizeHeroImage = () => {
    const available = AI_RELATED_IMAGES.filter(
      (img) => img !== currentHeroImage,
    );
    const randomIndex = Math.floor(Math.random() * available.length);
    setCurrentHeroImage(available[randomIndex]);
  };

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useLayoutEffect(() => {
    setIsScrollReset(false);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [id]);

  useEffect(() => {
    let userInteracted = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const cancelResetTimers = () => {
      userInteracted = true;
      timers.forEach((t) => clearTimeout(t));
      timers.length = 0;
    };

    window.addEventListener("wheel", cancelResetTimers, { passive: true, once: true });
    window.addEventListener("touchstart", cancelResetTimers, { passive: true, once: true });
    window.addEventListener("pointerdown", cancelResetTimers, { passive: true, once: true });
    window.addEventListener("keydown", cancelResetTimers, { passive: true, once: true });

    // When entering a case study project page, ensure the page starts cleanly at the top
    const resetToTop = () => {
      if (userInteracted) return;
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(0, { immediate: true });
      }
    };

    resetToTop();
    [20, 80].forEach((d) => timers.push(setTimeout(resetToTop, d)));

    let prevY = window.scrollY;
    let ticking = false;
    let rafId = 0;

    const evaluateScroll = () => {
      ticking = false;
      const currentY = window.scrollY;

      const nextShowSideMenu = currentY > 400;
      setShowSideMenu((prev) => (prev === nextShowSideMenu ? prev : nextShowSideMenu));

      const nextHeaderScrolled = currentY >= 80;
      setIsHeaderScrolled((prev) => (prev === nextHeaderScrolled ? prev : nextHeaderScrolled));

      const delta = currentY - prevY;

      if (currentY < 80) {
        setHeaderVisible((prev) => (prev ? prev : true));
        setIsScrollingUp((prev) => (prev ? prev : true));
        prevY = currentY;
      } else {
        if (delta > 2) {
          setHeaderVisible((prev) => (prev ? false : prev));
          setIsScrollingUp((prev) => (prev ? false : prev));
          prevY = currentY;
        } else if (delta < -2) {
          setHeaderVisible((prev) => (prev ? prev : true));
          setIsScrollingUp((prev) => (prev ? prev : true));
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

    // Give a small timed delay of 120ms behind the cover to guarantee completely flash-free transition at top
    const revealTimer = setTimeout(() => {
      setIsScrollReset(true);
    }, 120);

    return () => {
      window.removeEventListener("wheel", cancelResetTimers);
      window.removeEventListener("touchstart", cancelResetTimers);
      window.removeEventListener("pointerdown", cancelResetTimers);
      window.removeEventListener("keydown", cancelResetTimers);
      timers.forEach((t) => clearTimeout(t));
      clearTimeout(revealTimer);
      window.removeEventListener("scroll", onScroll);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [id, lenis]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            Project Not Found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-[#0A2947] font-medium hover:underline flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A2947] font-sans text-white relative">
      {!isScrollReset && (
        <div className="fixed inset-0 bg-[#0A2947] z-[9999]" />
      )}

      {/* Global grain texture for the whole page */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="projectPageNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#projectPageNoise)" />
        </svg>
      </div>
      {/* Navigation Header */}
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
                <LayoutGroup id="header-project-group">
                  {!isHeaderScrolled ? (
                    <>
                      {/* Back Button */}
                      <div className="flex items-center">
                        <motion.button
                          layoutId="header-brand-link-proj"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 35,
                          }}
                          onClick={handleBrandHomeClick}
                          className="group flex items-center gap-1.5 transition-colors duration-300 hover:opacity-85 text-white cursor-pointer"
                        >
                          <span className="font-display font-semibold text-xs md:text-sm lg:text-base tracking-tight text-white">
                            Zulhilmi Nasir
                          </span>
                        </motion.button>
                      </div>

                      {/* Desktop Nav - Capsule */}
                      <motion.nav
                        layoutId="header-nav-capsule-proj"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 35,
                        }}
                        className="flex items-center bg-transparent border border-transparent rounded-full py-1.5 px-3 md:py-1.5 md:px-2 lg:py-2 lg:px-4 space-x-1 md:space-x-1 lg:space-x-2 font-normal tracking-normal font-sans text-white transition-all duration-300 shadow-none"
                      >
                        <button
                          onClick={(e) =>
                            handleNavClick(e, "#services-section", true)
                          }
                          className="nav-menu-btn-dark-theme cursor-pointer"
                        >
                          <span className="text-[15px]">Services</span>
                        </button>
                        <button
                          onClick={(e) =>
                            handleNavClick(e, "#integration-section", true)
                          }
                          className="nav-menu-btn-dark-theme cursor-pointer"
                        >
                          <span className="hidden lg:inline text-[15px]">
                            Software & AI Solution
                          </span>
                          <span className="inline lg:hidden text-[15px]">
                            Software
                          </span>
                        </button>
                        <button
                          onClick={(e) => handleNavClick(e, "#capabilities-section", true)}
                          className="nav-menu-btn-dark-theme active cursor-pointer"
                        >
                          <span className="text-[15px]">Projects</span>
                        </button>
                        <button
                          onClick={(e) => handleNavClick(e, "#about-section", true)}
                          className="nav-menu-btn-dark-theme cursor-pointer"
                        >
                          <span className="text-[15px]">About</span>
                        </button>
                        <button
                          onClick={(e) => handleNavClick(e, "#career-section", true)}
                          className="nav-menu-btn-dark-theme cursor-pointer"
                        >
                          <span className="text-[15px]">Career</span>
                        </button>
                      </motion.nav>

                      {/* Get In Touch Button */}
                      <div className="flex items-center">
                        <motion.button
                          layoutId="header-contact-btn-proj"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 35,
                          }}
                          onClick={(e) => handleNavClick(e, "#contact-section", true)}
                          className="group get-in-touch-btn-hero md:!py-1.5 md:!px-3.5 whitespace-nowrap cursor-pointer"
                        >
                          {/* Shimmer Effect Wrapper */}
                          <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0 rounded-[25px] overflow-hidden">
                            {/* Ambient internal cyan glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18)_0%,transparent_70%)] animate-[glow-pulse_3s_ease-in-out_infinite]" />

                            {/* Scanning grid sweep light */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -skew-x-12 animate-[grid-sweep_4s_ease-in-out_infinite]" />
                          </div>
                          <span className="relative z-10 text-[15px]">
                            Get In Touch
                          </span>
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    // Scrolled State Capsule
                    <div className="flex items-center justify-center w-full">
                      <motion.div
                        layoutId="header-nav-capsule-proj"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 35,
                        }}
                        className="flex items-center bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] rounded-full py-1.5 pl-6 pr-2 md:py-1 md:pl-4 md:pr-1 lg:py-2 lg:pl-7 lg:pr-2.5 font-sans transition-all duration-300"
                      >
                        <motion.button
                          layoutId="header-brand-link-proj"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 35,
                          }}
                          onClick={handleBrandHomeClick}
                          className="font-display font-semibold text-xs md:text-sm lg:text-base tracking-tight text-[#0A2947] hover:text-[#2563EB] hover:scale-105 transition-all mr-4 md:mr-6 lg:mr-12 flex items-center h-6 cursor-pointer"
                        >
                          ZN
                        </motion.button>

                        <nav className="flex items-center space-x-1 md:space-x-1 lg:space-x-2 font-normal tracking-normal">
                          <button
                            onClick={(e) =>
                              handleNavClick(e, "#services-section", true)
                            }
                            className="nav-menu-btn nav-btn-black cursor-pointer"
                          >
                            <span className="text-[15px]">Services</span>
                          </button>
                          <button
                            onClick={(e) =>
                              handleNavClick(e, "#integration-section", true)
                            }
                            className="nav-menu-btn nav-btn-black cursor-pointer"
                          >
                            <span className="hidden lg:inline text-[15px]">
                              Software & AI Solution
                            </span>
                            <span className="inline lg:hidden text-[15px]">
                              Software
                            </span>
                          </button>
                          <button
                            onClick={(e) => handleNavClick(e, "#capabilities-section", true)}
                            className="nav-menu-btn nav-btn-black active cursor-pointer"
                          >
                            <span className="text-[15px]">Projects</span>
                          </button>
                          <button
                            onClick={(e) => handleNavClick(e, "#about-section", true)}
                            className="nav-menu-btn nav-btn-black cursor-pointer"
                          >
                            <span className="text-[15px]">About</span>
                          </button>
                          <button
                            onClick={(e) =>
                              handleNavClick(e, "#career-section", true)
                            }
                            className="nav-menu-btn nav-btn-black cursor-pointer"
                          >
                            <span className="text-[15px]">Career</span>
                          </button>
                        </nav>

                        {/* Get In Touch Button inside capsule */}
                        <motion.button
                          layoutId="header-contact-btn-proj"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 35,
                          }}
                          onClick={(e) => handleNavClick(e, "#contact-section", true)}
                          className="ml-6 md:ml-3 lg:ml-6 get-in-touch-btn whitespace-nowrap md:!py-1.5 md:!px-3.5 lg:!py-1.5 lg:!px-4 cursor-pointer"
                        >
                          <span className="text-[15px]">Get In Touch</span>
                        </motion.button>
                      </motion.div>
                    </div>
                  )}
                </LayoutGroup>
              ) : (
                /* Mobile Menu View */
                <>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        if (isMobileMenuOpen) {
                          document.documentElement.style.overflow = "";
                          document.body.style.overflow = "";
                          lenis?.start();
                          setIsMobileMenuOpen(false);
                        }
                        handleBrandHomeClick(e);
                      }}
                      className="font-display font-semibold text-sm tracking-tight text-[#2563EB] transition-colors cursor-pointer hover:opacity-85 bg-transparent border-none p-0 outline-none"
                    >
                      Zulhilmi Nasir
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
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

            {/* Mobile menu panel */}
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
                    href="#services-section"
                    onClick={(e) => handleMobileMenuNavClick(e, "#services-section")}
                    className="shrink-0 flex items-center justify-end text-right py-3 !text-white hover:opacity-80 active:opacity-75 transition-opacity text-[clamp(2rem,8.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
                  >
                    Services
                  </a>
                  <a
                    href="#integration-section"
                    onClick={(e) => handleMobileMenuNavClick(e, "#integration-section")}
                    className="shrink-0 flex items-center justify-end text-right py-3 !text-white hover:opacity-80 active:opacity-75 transition-opacity text-[clamp(2rem,8.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
                  >
                    Software & AI Solutions
                  </a>
                  <a
                    href="#capabilities-section"
                    onClick={(e) => handleMobileMenuNavClick(e, "#capabilities-section")}
                    className="shrink-0 flex items-center justify-end text-right py-3 !text-white hover:opacity-80 active:opacity-75 transition-opacity text-[clamp(2rem,8.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
                  >
                    Projects
                  </a>
                  <a
                    href="#about-section"
                    onClick={(e) => handleMobileMenuNavClick(e, "#about-section")}
                    className="shrink-0 flex items-center justify-end text-right py-3 !text-white hover:opacity-80 active:opacity-75 transition-opacity text-[clamp(2rem,8.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
                  >
                    About
                  </a>
                  <a
                    href="#career-section"
                    onClick={(e) => handleMobileMenuNavClick(e, "#career-section")}
                    className="shrink-0 flex items-center justify-end text-right py-3 mb-7 !text-white hover:opacity-80 active:opacity-75 transition-opacity text-[clamp(2rem,8.8vw,2.65rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
                  >
                    Career
                  </a>

                  <div className="mt-auto shrink-0 w-full border-t border-white/50 pt-7 flex flex-col items-end text-right">
                    <a
                      href="#contact-section"
                      onClick={(e) => handleMobileMenuNavClick(e, "#contact-section")}
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
                      href="mailto:zulhilminasir999@gmail.com"
                      className="mt-7 inline-block !text-white hover:opacity-85 active:opacity-75 transition-opacity normal-case font-semibold text-[clamp(1.125rem,5.2vw,1.4rem)] leading-snug tracking-tight text-right"
                    >
                      zulhilminasir999@gmail.com
                    </a>

                    <div className="mt-5 flex flex-col items-end gap-2.5 text-right">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-end gap-2 !text-white/95 hover:!text-white active:!text-white/75 transition-colors text-xs font-medium tracking-wider uppercase py-0.5"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.817 17.507h-2.346v-3.676c0-.876-.018-2.004-1.222-2.004-1.223 0-1.41.954-1.41 1.94v3.74h-2.345V9.949h2.253v1.03h.03c.315-.594 1.08-1.221 2.224-1.221 2.377 0 2.816 1.564 2.816 3.6v4.149zM7.844 8.914a1.362 1.362 0 1 1 0-2.724 1.362 1.362 0 0 1 0 2.724zm1.177 8.593H6.668V9.949h2.353v7.558z"
                          />
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-end gap-2 !text-white/95 hover:!text-white active:!text-white/75 transition-colors text-xs font-medium tracking-wider uppercase py-0.5"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        <span>Facebook</span>
                      </a>
                      <a
                        href="https://x.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-end gap-2 !text-white/95 hover:!text-white active:!text-white/75 transition-colors text-xs font-medium tracking-wider uppercase py-0.5"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.589 6.36h1.913l-4.181 4.778L18.24 17.64h-3.851l-3.016-3.944L7.921 17.64H6.006l4.472-5.112L5.76 6.36h3.949l2.726 3.605L15.589 6.36zm-.672 10.135h1.06L9.133 7.445H7.995l6.922 9.05z"
                          />
                        </svg>
                        <span>The X</span>
                      </a>
                      <a
                        href="https://t.me"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-end gap-2 !text-white/95 hover:!text-white active:!text-white/75 transition-colors text-xs font-medium tracking-wider uppercase py-0.5"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        <span>Telegram</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="relative z-10 bg-white sm:bg-transparent">
        {/* Full-width Hero Header Section with Background Image */}
        <div className="relative w-full h-auto sm:h-screen flex flex-col sm:flex-row sm:items-end overflow-hidden pt-14 sm:pt-0 bg-white sm:bg-transparent">
          {/* Background Image: real size landscape on mobile, full-screen on desktop */}
          <div className="relative sm:absolute sm:inset-0 sm:z-0 w-full overflow-hidden bg-white sm:bg-transparent">
            <img
              src={
                currentHeroImage ||
                (project?.galleryImages && project.galleryImages.length > 0
                  ? project.galleryImages[0]
                  : project?.imageUrl || "")
              }
              alt={`${project?.title || "Project"} background`}
              className="w-full h-auto sm:h-full object-contain sm:object-cover select-none pointer-events-none block"
              style={{
                objectPosition: project?.objectPosition || "center 30%",
              }}
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay: dark gradients for beautiful visual blending and cinematic feel (desktop only, removed on mobile) */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#0A2947]/80 via-[#0A2947]/30 to-black/20 pointer-events-none" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#0A2947]/50 via-[#0A2947]/10 to-transparent pointer-events-none" />
          </div>

          {/* Header Content Container: sits cleanly below the image on mobile */}
          <div className="w-full px-6 sm:px-12 lg:px-16 pt-6 sm:pt-0 pb-10 sm:pb-16 md:pb-24 relative z-10 bg-white sm:bg-transparent">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-left"
            >
              <h1 className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl !text-[#2563EB] sm:!text-white tracking-tight leading-tight sm:leading-none uppercase flex items-center flex-wrap gap-x-3 gap-y-1">
                {project.title.split("|").map((part, index, array) => (
                  <React.Fragment key={index}>
                    <span className="text-[#2563EB] sm:text-white">
                      {part.trim()}
                    </span>
                    {index < array.length - 1 && (
                      <span className="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#2563EB]/50 sm:text-white/50 pb-1">
                        |
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </h1>
              <p className="font-sans font-normal text-base sm:text-lg md:text-xl text-[#2563EB] sm:text-white leading-relaxed max-w-4xl pt-1">
                {project.subtitle}
              </p>

              {/* Combined on mobile: Intro summary text integrated into the same single section */}
              <div className="block sm:hidden pt-4">
                <p className="text-[20px] font-light leading-snug text-zinc-700">
                  {project.summary ||
                    "A digital ecosystem that transforms how athletes interact with their performance wear, creating a seamless connection between garment and user through innovative technology."}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Main Content Area - Light Theme (Replicated from Video) */}

        {/* Section 1: Intro (Desktop only, combined into header section on mobile) */}
        <section className="hidden sm:flex w-full bg-white text-zinc-900 z-20 sm:sticky sm:top-0 sm:h-screen flex-col justify-center">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <h2 className="text-2xl font-medium tracking-tight text-zinc-900">
                  {project.title}
                </h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                  {project.summary ||
                    "A digital ecosystem that transforms how athletes interact with their performance wear, creating a seamless connection between garment and user through innovative technology."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Details */}
        <section className="w-full bg-white sm:bg-zinc-50/95 sm:backdrop-blur-md text-zinc-900 z-30 relative sm:sticky sm:top-0 h-auto sm:h-screen flex flex-col justify-center shadow-none sm:shadow-2xl py-12 sm:py-0">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <a
                  href={project.links?.[0] || "#"}
                  className="text-2xl font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  Visit Live Site
                </a>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
                <div>
                  <h4 className="text-[20px] sm:text-sm font-semibold text-zinc-900 mb-2">
                    Client
                  </h4>
                  <p className="text-zinc-600 text-[16px] sm:text-sm">
                    {project.client || "Stride Athletics"}
                  </p>
                </div>
                <div>
                  <h4 className="text-[20px] sm:text-sm font-semibold text-zinc-900 mb-2">
                    Project Type
                  </h4>
                  <p className="text-zinc-600 text-[16px] sm:text-sm">
                    {project.categoryLabel || "Digital Product Design"}
                  </p>
                </div>
                <div>
                  <h4 className="text-[20px] sm:text-sm font-semibold text-zinc-900 mb-2">
                    Released
                  </h4>
                  <p className="text-zinc-600 text-[16px] sm:text-sm">
                    {project.year || "October 11, 2024"}
                  </p>
                </div>
                <div>
                  <h4 className="text-[20px] sm:text-sm font-semibold text-zinc-900 mb-2">
                    Technology
                  </h4>
                  <div className="flex flex-col gap-1">
                    {project.toolsUsed && project.toolsUsed.length > 0 ? (
                      project.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="text-zinc-600 text-[16px] sm:text-sm"
                        >
                          {tool}
                        </span>
                      ))
                    ) : (
                      <>
                        <span className="text-zinc-600 text-[16px] sm:text-sm">
                          React Native
                        </span>
                        <span className="text-zinc-600 text-[16px] sm:text-sm">
                          Motion Analysis API
                        </span>
                        <span className="text-zinc-600 text-[16px] sm:text-sm">
                          Machine Learning
                        </span>
                        <span className="text-zinc-600 text-[16px] sm:text-sm">
                          Cloud Architecture
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-[20px] sm:text-sm font-semibold text-zinc-900 mb-2">
                    Timeframe
                  </h4>
                  <p className="text-zinc-600 text-[16px] sm:text-sm">
                    3 months
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Overview (Sticky Left) */}
        <section className="w-full bg-white text-zinc-900 z-40 relative sm:sticky sm:top-0 h-auto sm:h-screen flex flex-col justify-center shadow-none sm:shadow-2xl py-12 sm:py-0">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4 relative">
                <div>
                  <h2 className="text-2xl font-medium tracking-tight text-zinc-900">
                    Overview
                  </h2>
                </div>
              </div>
              <div className="md:col-span-8 space-y-6 sm:space-y-8 text-[20px] sm:text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p>
                  {project.summary ||
                    "Our solution focused on creating an intuitive digital platform that connects with Stride's performance wear, providing real-time insights and personalized recommendations. The challenge was to make complex performance data accessible and actionable for users of all expertise levels."}
                </p>
                <p>
                  {project.challenge ||
                    "Stride Athletics had developed cutting-edge performance wear but lacked the digital interface to unlock its full potential. They needed a digital product that would help athletes understand, customize, and maximize the benefits of their smart athletic wear."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Full-width Images */}
        <div
          className="relative bg-transparent sm:bg-zinc-900 z-50 w-full flex flex-col sm:block"
          style={{ height: undefined }}
        >
          {/* Image 1 */}
          {(() => {
            const img1Src =
              project?.galleryImages && project.galleryImages.length > 1
                ? project.galleryImages[1]
                : project?.imageUrl || "";
            const isLongImage =
              img1Src.includes("ck2") ||
              img1Src.includes("ck3") ||
              img1Src.includes("ck") ||
              project?.id === "aistudio-brand";
            const finalImg1Src =
              project?.id === "ck-lighting"
                ? "/CK Lighting Web/ck2.jpg"
                : project?.id === "komorebi-editorial"
                  ? "/Triply/Triply2.jpg"
                  : project?.id === "breeze-cargo"
                    ? "/RepX/RepX2.jpg"
                    : project?.id === "aistudio-brand"
                      ? "/PFM/PFM6.jpg"
                      : img1Src;

            if (isLongImage) {
              return (
                <div
                  className="z-10 w-full relative sm:sticky cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
                  style={project?.id === "ck-lighting" || project?.id === "aistudio-brand" ? {} : { bottom: 0 }}
                  onClick={() =>
                    handleMobileImageClick(
                      project?.id === "ck-lighting"
                        ? "/CK Lighting Web/ck2.jpg"
                        : project?.id === "aistudio-brand"
                          ? "/PFM/PFM6.jpg"
                          : img1Src,
                    )
                  }
                >
                  <img
                    src={
                      project?.id === "ck-lighting"
                        ? "/CK Lighting Web/ck2.jpg"
                        : project?.id === "aistudio-brand"
                          ? "/PFM/PFM6.jpg"
                          : img1Src
                    }
                    alt="Gallery 1"
                    className="w-full h-auto block select-none rounded-none"
                    referrerPolicy="no-referrer"
                  />
                </div>
              );
            }
            return (
              <div
                className="relative sm:sticky sm:top-0 h-auto sm:h-screen w-full overflow-hidden z-10 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
                onClick={() => handleMobileImageClick(finalImg1Src)}
              >
                <img
                  src={finalImg1Src}
                  alt="Gallery 1"
                  className="w-full h-auto sm:h-full object-contain sm:object-cover block rounded-none"
                  style={{
                    objectPosition:
                      project?.id === "komorebi-editorial"
                        ? "center 30%"
                        : undefined,
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            );
          })()}

          {(project?.id === "TGPowerWrap" ||
            project?.id === "komorebi-editorial" ||
            project?.id === "breeze-cargo") && (
            <div
              className="relative sm:sticky sm:top-0 h-auto sm:h-screen w-full overflow-hidden z-20 bg-transparent sm:bg-zinc-900 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
              onClick={() =>
                handleMobileImageClick(
                  project.id === "TGPowerWrap"
                    ? "/TGPW/6.jpg"
                    : project.id === "komorebi-editorial"
                      ? "/Triply/Triply3.jpg"
                      : "/RepX/RepX3.jpg",
                )
              }
            >
              <img
                src={
                  project.id === "TGPowerWrap"
                    ? "/TGPW/6.jpg"
                    : project.id === "komorebi-editorial"
                      ? "/Triply/Triply3.jpg"
                      : "/RepX/RepX3.jpg"
                }
                alt={
                  project?.id === "TGPowerWrap"
                    ? "TGPowerWrap 6 Showcase"
                    : project?.id === "breeze-cargo"
                      ? "RepX 3"
                      : "Gallery 2"
                }
                className="w-full h-auto sm:h-full object-contain sm:object-cover block rounded-none"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Image 3 */}
          {(project?.id === "komorebi-editorial" ||
            project?.id === "breeze-cargo") && (
            <div
              id="canvas-image-3"
              className="relative w-full h-auto overflow-visible z-30 bg-transparent sm:bg-zinc-900 cursor-pointer sm:cursor-default p-0 m-0 px-0 sm:px-0 pb-5 sm:pb-0 flex flex-col justify-center items-center"
              onClick={() =>
                handleMobileImageClick(
                  project.id === "breeze-cargo"
                    ? "/RepX/RepX4.jpg"
                    : "/Triply/Triply15.jpg",
                )
              }
            >
              <img
                src={
                  project.id === "breeze-cargo"
                    ? "/RepX/RepX4.jpg"
                    : "/Triply/Triply15.jpg"
                }
                alt={project?.id === "breeze-cargo" ? "RepX 4" : "Gallery 3"}
                className="w-full h-auto object-contain block select-none p-0 m-0 rounded-none px-0 sm:px-0 box-border"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Section 5: The Challenge (Sticky Left) */}
        <div className="w-full bg-white text-zinc-900 z-50 relative py-16 md:py-24 lg:py-32">
          <div className="w-full px-6 sm:px-12 lg:px-16 space-y-12 md:space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mt-6 mb-16 md:mt-10 md:mb-28">
              <div className="md:col-span-4 relative">
                <div>
                  <h2 className="text-2xl font-medium tracking-tight text-zinc-900">
                    The Challenge
                  </h2>
                </div>
              </div>
              <div className="md:col-span-8 space-y-6 text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p className="mb-6">
                  {project.challenge ||
                    "Athletes struggled to interpret and act on the data their smart clothing collected. Existing apps in the market were either too complex for casual users or too simplified for professional athletes. The gap between advanced garment technology and user-friendly digital interfaces was limiting the potential of smart athletic wear."}
                </p>
              </div>
            </div>

            {/* Gallery Part */}
            <div className="-mx-6 sm:mx-0 grid grid-cols-1 md:grid-cols-12 gap-0 sm:gap-4 lg:gap-6 items-stretch">
              <div className="md:col-span-6 h-auto sm:h-[600px] lg:h-[800px] overflow-hidden cursor-pointer sm:cursor-default pb-5 sm:pb-0 flex flex-col justify-between">
                <img
                  src={
                    project?.id === "TGPowerWrap"
                      ? "/TGPW/TGPW Mobile.jpg"
                      : project?.id === "ck-lighting" ||
                          project?.id === "zenith-cms"
                        ? "/CK Lighting Web/ck5.jpg"
                        : project?.id === "komorebi-editorial"
                          ? "/Triply/Triply11.jpg"
                          : project?.id === "breeze-cargo"
                            ? "/RepX/RepX12.jpg"
                            : project?.galleryImages &&
                                project.galleryImages.length > 2
                              ? project.galleryImages[2]
                              : project?.imageUrl || ""
                  }
                  className={`w-full h-auto sm:h-full object-contain sm:object-cover block m-0 rounded-none px-5 sm:px-0 box-border object-center`}
                  style={{
                    objectPosition: "center center",
                  }}
                  alt={project?.id === "breeze-cargo" ? "RepX 12" : `${project?.title || "Gallery"} 3`}
                  referrerPolicy="no-referrer"
                  onClick={() =>
                    handleMobileImageClick(
                      project?.id === "TGPowerWrap"
                        ? "/TGPW/TGPW Mobile.jpg"
                        : project?.id === "ck-lighting" ||
                            project?.id === "zenith-cms"
                          ? "/CK Lighting Web/ck5.jpg"
                          : project?.id === "komorebi-editorial"
                            ? "/Triply/Triply11.jpg"
                            : project?.id === "breeze-cargo"
                              ? "/RepX/RepX12.jpg"
                              : project?.galleryImages &&
                                  project.galleryImages.length > 2
                                ? project.galleryImages[2]
                                : project?.imageUrl || "",
                    )
                  }
                />
              </div>
              <div className="md:col-span-6 flex flex-col justify-between gap-0 sm:gap-4 lg:gap-6 h-auto sm:h-[600px] lg:h-[800px]">
                <div className="w-full sm:flex-1 px-5 sm:px-0 pb-5 sm:pb-0 flex flex-col justify-center items-center overflow-hidden">
                  <img
                    src={
                      project?.id === "TGPowerWrap"
                        ? "/TGPW/5.jpg"
                        : project?.id === "ck-lighting"
                          ? "/CK Lighting Web/ck6.jpg"
                          : project?.id === "komorebi-editorial"
                            ? "/Triply/Triply6.png"
                            : project?.id === "breeze-cargo"
                              ? "/RepX/RepX9.jpg"
                              : project?.galleryImages &&
                                  project.galleryImages.length > 5
                                ? project.galleryImages[5]
                                : project?.galleryImages &&
                                    project.galleryImages.length > 4
                                  ? project.galleryImages[4]
                                  : project?.imageUrl || ""
                    }
                    className="w-full h-auto sm:h-full object-contain sm:object-cover min-h-0 block p-0 m-0 cursor-pointer sm:cursor-default rounded-none object-center"
                    alt={`${project?.title || "Gallery"} 5`}
                    referrerPolicy="no-referrer"
                    onClick={() =>
                      handleMobileImageClick(
                        project?.id === "TGPowerWrap"
                          ? "/TGPW/5.jpg"
                          : project?.id === "ck-lighting"
                            ? "/CK Lighting Web/ck6.jpg"
                            : project?.id === "komorebi-editorial"
                              ? "/Triply/Triply6.png"
                              : project?.id === "breeze-cargo"
                                ? "/RepX/RepX9.jpg"
                                : project?.galleryImages &&
                                    project.galleryImages.length > 5
                                  ? project.galleryImages[5]
                                  : project?.galleryImages &&
                                      project.galleryImages.length > 4
                                    ? project.galleryImages[4]
                                    : project?.imageUrl || "",
                      )
                    }
                  />
                </div>
                <div className="w-full sm:flex-1 px-5 sm:px-0 pb-5 sm:pb-0 flex flex-col justify-end overflow-hidden">
                  <img
                    src={
                      project?.id === "TGPowerWrap"
                        ? "/TGPW/Thumbnail Mobile TGPW.jpg"
                        : project?.id === "komorebi-editorial"
                          ? "/Triply/Triply5.jpg"
                          : project?.id === "breeze-cargo"
                            ? "/RepX/RepX11.png"
                            : project?.galleryImages &&
                                project.galleryImages.length > 3
                              ? project.galleryImages[3]
                              : project?.imageUrl || ""
                    }
                    className="w-full h-auto sm:h-full object-contain sm:object-cover min-h-0 block p-0 m-0 cursor-pointer sm:cursor-default rounded-none object-center"
                    alt={project?.id === "breeze-cargo" ? "RepX 11" : `${project?.title || "Gallery"} 4`}
                    referrerPolicy="no-referrer"
                    onClick={() =>
                      handleMobileImageClick(
                        project?.id === "TGPowerWrap"
                          ? "/TGPW/Thumbnail Mobile TGPW.jpg"
                          : project?.id === "komorebi-editorial"
                            ? "/Triply/Triply5.jpg"
                            : project?.id === "breeze-cargo"
                              ? "/RepX/RepX11.png"
                              : project?.galleryImages &&
                                  project.galleryImages.length > 3
                                ? project.galleryImages[3]
                                : project?.imageUrl || "",
                      )
                    }
                  />
                </div>
              </div>
            </div>

            {/* The Solution / User Flow */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-12 md:pt-20 lg:pt-24 pb-6 md:pb-10">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-medium tracking-tight text-zinc-900">
                  User Flow
                </h3>
              </div>
              <div className="md:col-span-8 space-y-6 text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p>
                  {project.solution ||
                    "The digital product needed to handle complex data streams from advanced garment technology and user-friendly digital interfaces was limiting the potential of smart athletic wear."}
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Section 6: Additional Sticky Full-width Images */}
        <div className="relative bg-transparent sm:bg-zinc-900 z-50 w-full flex flex-col sm:block">
          {/* Image 0 (CK8.jpg for CK Lighting above CK9) */}
          {project?.id === "ck-lighting" && (
            <div
              className="relative w-full h-auto overflow-visible flex flex-col justify-center items-center bg-transparent sm:bg-zinc-900 z-10 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
              onClick={() =>
                handleMobileImageClick("/CK Lighting Web/CK8.jpg")
              }
            >
              <img
                src="/CK Lighting Web/CK8.jpg"
                alt="CK Lighting Web CK8"
                className="w-full h-auto object-contain block select-none rounded-none"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Image 1 */}
          <div
            className="relative w-full h-auto overflow-visible flex flex-col justify-center items-center bg-transparent sm:bg-zinc-900 z-10 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
            onClick={() =>
              handleMobileImageClick(
                project?.id === "aistudio-brand"
                  ? "/PFM/PFM2.jpg"
                  : project?.id === "ck-lighting"
                    ? "/CK Lighting Web/CK9.jpg"
                    : project?.id === "komorebi-editorial"
                      ? "/Triply/Triply4.jpg"
                      : project?.id === "breeze-cargo"
                        ? "/RepX/RepX5.jpg"
                        : project.galleryImages &&
                            project.galleryImages.length > 4
                          ? project.galleryImages[4]
                          : "/TGPW/TGPW Site Map.jpg",
              )
            }
          >
            <img
              src={
                project?.id === "aistudio-brand"
                  ? "/PFM/PFM2.jpg"
                  : project?.id === "ck-lighting"
                    ? "/CK Lighting Web/CK9.jpg"
                    : project?.id === "komorebi-editorial"
                      ? "/Triply/Triply4.jpg"
                      : project?.id === "breeze-cargo"
                        ? "/RepX/RepX5.jpg"
                        : project.galleryImages &&
                            project.galleryImages.length > 4
                          ? project.galleryImages[4]
                          : "/TGPW/TGPW Site Map.jpg"
              }
              alt={
                project?.id === "aistudio-brand"
                  ? "PFM 2 Showcase"
                  : project?.id === "breeze-cargo"
                    ? "RepX 5"
                    : "Gallery Sticky 1"
              }
              className="w-full h-auto object-contain block select-none rounded-none"
              onError={(e) => {
                if (project?.id === "breeze-cargo") {
                  const target = e.currentTarget;
                  if (target.src.endsWith("/RepX/RepX5.jpg")) {
                    target.src = "/RepX/RepX.jpg";
                  }
                }
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Image 2 (New CK10.jpg for CK Lighting) */}
          {project?.id === "ck-lighting" && (
            <div
              className="relative sm:sticky sm:top-0 h-auto sm:h-screen w-full z-20 shadow-none sm:shadow-2xl flex flex-col justify-center bg-zinc-900 overflow-hidden cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
              onClick={() =>
                handleMobileImageClick("/CK Lighting Web/CK10.jpg")
              }
            >
              <img
                src="/CK Lighting Web/CK10.jpg"
                alt="Gallery Sticky CK10"
                className="w-full h-auto sm:h-full object-contain sm:object-cover block rounded-none"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Image 3 (Previously Image 2) */}
          {project?.id !== "ck-lighting" && (
            <div
              className={`relative w-full ${(project?.id === "komorebi-editorial" || project?.id === "breeze-cargo" || project?.id === "TGPowerWrap" || project?.id === "aistudio-brand") ? "h-auto z-20 overflow-visible flex flex-col justify-center bg-transparent" : "sm:sticky sm:top-0 h-auto sm:h-screen z-20 shadow-none sm:shadow-2xl overflow-hidden flex flex-col justify-center bg-transparent sm:bg-zinc-900"} cursor-pointer sm:cursor-default pb-5 sm:pb-0`}
              onClick={() =>
                handleMobileImageClick(
                  project?.id === "aistudio-brand"
                    ? "/PFM/PFM9.jpg"
                    : project?.id === "komorebi-editorial"
                      ? "/Triply/Triply8.jpg"
                      : project?.id === "breeze-cargo"
                        ? "/RepX/RepX6.jpg"
                        : "/TGPW/TGPW Visual Guideline.jpg",
                )
              }
            >
              <img
                src={
                  project?.id === "aistudio-brand"
                    ? "/PFM/PFM9.jpg"
                    : project?.id === "komorebi-editorial"
                      ? "/Triply/Triply8.jpg"
                      : project?.id === "breeze-cargo"
                        ? "/RepX/RepX6.jpg"
                        : "/TGPW/TGPW Visual Guideline.jpg"
                }
              alt={
                project?.id === "aistudio-brand"
                  ? "PFM 9 Showcase"
                  : project?.id === "komorebi-editorial"
                    ? "Triply Design"
                    : project?.id === "breeze-cargo"
                      ? "RepX 6"
                      : "TGPW Visual Guideline"
              }
              className={`w-full h-auto ${(project?.id === "komorebi-editorial" || project?.id === "breeze-cargo" || project?.id === "TGPowerWrap" || project?.id === "aistudio-brand") ? "object-contain select-none" : "sm:h-full object-contain sm:object-cover"} block rounded-none px-5 sm:px-0 box-border`}
              onError={(e) => {
                if (project?.id === "breeze-cargo") {
                  const target = e.currentTarget;
                  if (target.src.endsWith("/RepX/RepX6.jpg")) {
                    target.src = "/RepX/RepX.jpg";
                  }
                }
              }}
              referrerPolicy="no-referrer"
            />
          </div>
        )}

          {/* Triply 12 (Directly After Triply 8) - Full original dimension, fully display */}
          {project?.id === "komorebi-editorial" && (
            <div
              className="relative w-full h-auto z-25 overflow-visible flex flex-col justify-center bg-transparent cursor-pointer sm:cursor-default pb-5 sm:pb-0"
              onClick={() => handleMobileImageClick("/Triply/Triply12.jpg")}
            >
              <img
                src="/Triply/Triply12.jpg"
                alt="Triply 12 Showcase"
                className="w-full h-auto object-contain block select-none rounded-none px-5 sm:px-0 box-border"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Triply 7 (Directly After Triply 12) */}
          {project?.id === "komorebi-editorial" && (
            <div
              className="relative w-full h-auto overflow-visible z-35 bg-transparent sm:bg-zinc-900 cursor-pointer sm:cursor-default p-0 m-0 pb-5 sm:pb-0 flex flex-col justify-center items-center"
              onClick={() => handleMobileImageClick("/Triply/Triply7.jpg")}
            >
              <img
                src="/Triply/Triply7.jpg"
                alt="Triply 7 Showcase"
                className="w-full h-auto object-contain block select-none p-0 m-0 rounded-none px-5 sm:px-0 box-border"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* RepX 7 (Directly After RepX 6) - Full original dimension, fully display */}
          {project?.id === "breeze-cargo" && (
            <div
              className="relative w-full h-auto z-25 overflow-visible flex flex-col justify-center bg-transparent cursor-pointer sm:cursor-default pb-5 sm:pb-0"
              onClick={() => handleMobileImageClick("/RepX/RepX7.jpg")}
            >
              <img
                src="/RepX/RepX7.jpg"
                alt="RepX 7 Showcase"
                className="w-full h-auto object-contain block select-none rounded-none px-5 sm:px-0 box-border"
                referrerPolicy="no-referrer"
              />
            </div>
          )}
        </div>

        {/* Section 7: The Solution */}
        <div className="w-full bg-white text-zinc-900 z-50 relative py-16 md:py-24 lg:py-32">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-medium tracking-tight text-zinc-900">
                  The Solution
                </h3>
              </div>
              <div className="md:col-span-8 space-y-6 text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p className="mb-4">
                  {project.solution ||
                    "The digital product needed to handle complex data streams from advanced garment technology and user-friendly digital interfaces was limiting the potential of smart athletic wear."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Added Full-width Image Section (Between Solution & Key Results) */}
        <div
          className="w-full relative bg-zinc-900 z-50 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
          onClick={() =>
            handleMobileImageClick(
              project?.id === "aistudio-brand"
                ? "/PFM/PFM7.jpg"
                : project?.id === "ck-lighting"
                  ? "/CK Lighting Web/CK12.jpg"
                  : project?.id === "TGPowerWrap"
                    ? "/TGPW/TGPW7.jpg"
                    : project?.id === "breeze-cargo"
                      ? "/RepX/RepX10.jpg"
                      : project?.id === "komorebi-editorial"
                        ? "/Triply/Triply9.jpg"
                        : project?.galleryImages && project.galleryImages.length > 5
                          ? project.galleryImages[5]
                          : project?.imageUrl || "",
            )
          }
        >
          <img
            src={
              project?.id === "aistudio-brand"
                ? "/PFM/PFM7.jpg"
                : project?.id === "ck-lighting"
                  ? "/CK Lighting Web/CK12.jpg"
                  : project?.id === "TGPowerWrap"
                    ? "/TGPW/TGPW7.jpg"
                    : project?.id === "breeze-cargo"
                      ? "/RepX/RepX10.jpg"
                      : project?.id === "komorebi-editorial"
                        ? "/Triply/Triply9.jpg"
                        : project?.galleryImages && project.galleryImages.length > 5
                          ? project.galleryImages[5]
                          : project?.imageUrl || ""
            }
            alt={
              project?.id === "aistudio-brand"
                ? "PFM 7 Showcase"
                : project?.id === "ck-lighting"
                  ? "CK Lighting 12 Showcase"
                  : project?.id === "TGPowerWrap"
                    ? "TG PowerWrap 7 Showcase"
                    : project?.id === "breeze-cargo"
                      ? "RepX 10 Showcase"
                      : project?.id === "komorebi-editorial"
                        ? "Triply 9 Showcase"
                        : "Solution Showcase"
            }
            className="w-full h-auto block select-none rounded-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* PFM 8 Image Section (Directly after PFM 7) */}
        {project?.id === "aistudio-brand" && (
          <div
            className="w-full relative bg-zinc-900 z-50 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
            onClick={() => handleMobileImageClick("/PFM/PFM8.jpg")}
          >
            <img
              src="/PFM/PFM8.jpg"
              alt="PFM 8 Showcase"
              className="w-full h-auto block select-none rounded-none"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Triply 10 Image Section */}
        {project?.id === "komorebi-editorial" && (
          <div
            className="w-full relative bg-zinc-900 z-50 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
            onClick={() => handleMobileImageClick("/Triply/Triply10.jpg")}
          >
            <img
              src="/Triply/Triply10.jpg"
              alt="Triply Showcase 10"
              className="w-full h-auto block select-none rounded-none"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Triply 13 Image Section (Directly after Triply 10) */}
        {project?.id === "komorebi-editorial" && (
          <div
            className="w-full relative bg-zinc-900 z-50 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
            onClick={() => handleMobileImageClick("/Triply/Triply13.jpg")}
          >
            <img
              src="/Triply/Triply13.jpg"
              alt="Triply Showcase 13"
              className="w-full h-auto block select-none rounded-none"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* RepX 8 Image Section (Directly after RepX 10) */}
        {project?.id === "breeze-cargo" && (
          <div
            className="w-full relative bg-zinc-900 z-50 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
            onClick={() => handleMobileImageClick("/RepX/RepX8.jpg")}
          >
            <img
              src="/RepX/RepX8.jpg"
              alt="RepX 8 Showcase"
              className="w-full h-auto block select-none rounded-none"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Section: Key Results */}
        {project.results && project.results.length > 0 && (
          <div className="w-full bg-white text-zinc-900 z-50 relative py-16 md:py-24 lg:py-32">
            <div className="w-full px-6 sm:px-12 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-medium tracking-tight text-zinc-900">
                    Key Results
                  </h3>
                </div>
                <div className="md:col-span-8">
                  <ul className="grid grid-cols-1 gap-6">
                    {project.results.map((result, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-4 text-xl font-light text-zinc-700 leading-relaxed"
                      >
                        <span className="mt-1.5 h-6 w-6 shrink-0 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 flex items-center justify-center text-xs font-mono font-bold">
                          ✓
                        </span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RepX 13 Image Section (After Key Results) */}
        {project?.id === "breeze-cargo" && (
          <div
            className="w-full relative bg-zinc-900 z-50 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
            onClick={() => handleMobileImageClick("/RepX/RepX13.jpg")}
          >
            <img
              src="/RepX/RepX13.jpg"
              alt="RepX 13 Showcase"
              className="w-full h-auto block select-none rounded-none"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* RepX 14 Image Section (Directly after RepX 13) */}
        {project?.id === "breeze-cargo" && (
          <div
            className="w-full relative bg-zinc-900 z-50 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
            onClick={() => handleMobileImageClick("/RepX/RepX14.jpg")}
          >
            <img
              src="/RepX/RepX14.jpg"
              alt="RepX 14 Showcase"
              className="w-full h-auto block select-none rounded-none"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Section 8: Final Full-width Image */}
        {project?.id !== "breeze-cargo" && (
          <div
            className="w-full relative bg-zinc-900 z-50 cursor-pointer sm:cursor-default px-5 sm:px-0 pb-5 sm:pb-0"
            onClick={() =>
              handleMobileImageClick(
                project?.id === "komorebi-editorial"
                  ? "/Triply/Triply14.jpg"
                  : project?.id === "TGPowerWrap"
                    ? "/TGPW/TGPW8.jpg"
                    : project?.id === "ck-lighting"
                      ? "/CK Lighting Web/ck11.jpg"
                      : project?.id === "aistudio-brand"
                        ? "/PFM/PFM10.jpg"
                        : project.galleryImages && project.galleryImages.length > 6
                          ? project.galleryImages[6]
                          : "/TGPW/TGPW8.jpg",
              )
            }
          >
            <img
              src={
                project?.id === "komorebi-editorial"
                  ? "/Triply/Triply14.jpg"
                  : project?.id === "TGPowerWrap"
                    ? "/TGPW/TGPW8.jpg"
                    : project?.id === "ck-lighting"
                      ? "/CK Lighting Web/ck11.jpg"
                      : project?.id === "aistudio-brand"
                        ? "/PFM/PFM10.jpg"
                        : project.galleryImages && project.galleryImages.length > 6
                          ? project.galleryImages[6]
                          : "/TGPW/TGPW8.jpg"
              }
              alt={project?.id === "aistudio-brand" ? "PFM 10 Showcase" : "Final Gallery Image"}
              className={`w-full ${project?.id === "ck-lighting" || project?.id === "TGPowerWrap" || project?.id === "komorebi-editorial" || project?.id === "aistudio-brand" ? "h-auto block rounded-none" : "h-auto sm:h-screen object-contain sm:object-cover block rounded-none"}`}
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Related Capabilities Carousel with Scroll-Driven Horizontal Movement */}
        <RelatedCapabilitiesCarousel currentId={project.id} />
      </main>

      {/* Floating back button */}
      <FloatingMenu
        visible={showSideMenu && !isMobileMenuOpen}
        theme="dark"
        onNavClick={(targetId) =>
          handleNavClick({ preventDefault: () => {} } as any, targetId)
        }
      />

      {/* Pre-Footer Image Section */}
      <section className="w-full relative overflow-hidden bg-[#2563EB] -mb-1">
        <div className="w-full h-[350px] sm:h-[500px] md:h-[650px] lg:h-[800px] relative">
          <img
            src="/hero-bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
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

      {/* Footer Section */}
      <footer
        id="contact-section"
        className="relative overflow-hidden bg-[#2563EB] text-white pt-24 pb-0"
      >
        <div className="relative z-10 w-full mx-auto select-none">
          {/* Top content wrapper with margins */}
          <div className="px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-24">
            {/* Left part: Time, Title and pill button */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              {/* Dynamic local time */}
              <div className="text-xs text-white flex items-center gap-2 mb-8 tracking-wider uppercase font-sans">
                {localTime &&
                parseInt(localTime.split(":")[0], 10) >= 6 &&
                parseInt(localTime.split(":")[0], 10) < 18 ? (
                  <Sun className="h-4 w-4 text-white" />
                ) : (
                  <Moon className="h-4 w-4 text-white" />
                )}
                <span>
                  {localTime
                    ? `${localTime} Kuala Lumpur, MY`
                    : "05:03 PM Kuala Lumpur, MY"}
                </span>
              </div>

              {/* Contact email */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-white !text-[#ffffff] leading-[1.15] max-w-full mb-10">
                zulhilminasir999@gmail.com
              </h2>

              {/* Get in touch button from the image */}
              <button
                onClick={(e) => handleNavClick(e, "#contact-section")}
                className="inline-flex items-center gap-2 bg-white text-[#2563EB] hover:bg-white/90 active:scale-95 transition-all px-7 py-3.5 rounded-full font-sans font-semibold tracking-wide text-sm shadow-xl group cursor-pointer"
              >
                <span className="text-xs">✦</span>
                <span>Get in touch</span>
              </button>
            </div>

            {/* Right part: Explore & Socials columns */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:justify-items-end w-full text-left">
              {/* Explore Column */}
              <div className="flex flex-col gap-3 text-sm lg:min-w-[120px]">
                <span className="text-white font-sans text-xs uppercase tracking-widest mb-2 font-bold">
                  Explore
                </span>
                <button
                  onClick={(e) => handleNavClick(e, "#hero-section")}
                  className="text-white hover:text-white/80 transition-colors text-[15px] text-left cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={(e) => handleNavClick(e, "#about-section")}
                  className="text-white hover:text-white/80 transition-colors text-[15px] text-left cursor-pointer"
                >
                  About
                </button>
                <button
                  onClick={(e) => handleNavClick(e, "#career-section")}
                  className="text-white hover:text-white/80 transition-colors text-[15px] text-left cursor-pointer"
                >
                  Career
                </button>
                <button
                  onClick={(e) => handleNavClick(e, "#services-section")}
                  className="text-white hover:text-white/80 transition-colors text-[15px] text-left cursor-pointer"
                >
                  Services
                </button>
                <button
                  onClick={(e) => handleNavClick(e, "#capabilities-section")}
                  className="text-white hover:text-white/80 text-[15px] text-left cursor-default"
                >
                  Projects
                </button>
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
              </div>
            </div>
          </div>

          {/* Metadata Row */}
          <div className="flex justify-between items-end px-6 sm:px-12 lg:px-16 text-[10px] text-white uppercase tracking-widest font-sans mb-2 text-left">
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
                <linearGradient
                  id="zulhilmi-gradient-proj"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
                fill="url(#zulhilmi-gradient-proj)"
                style={{ letterSpacing: "-0.05em" }}
              >
                ZULHILMI
              </text>
            </svg>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Full Image Modal with pinch/zoom gestures */}
      <MobileZoomableModal
        isOpen={Boolean(selectedMobileModalImage)}
        imageSrc={selectedMobileModalImage}
        onClose={() => setSelectedMobileModalImage(null)}
      />
    </div>
  );
}
