import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { 
  ArrowLeft, 
  Layers, 
  CheckCircle,
  Clock,
  LayoutGrid,
  ChevronLeft,
  X,
  ArrowUpRight,
  Facebook,
  Linkedin,
  Send,
  Smartphone,
  Laptop,
  Box,
  Sun,
  Moon
} from "lucide-react";
import { CAPABILITIES_DATA } from "../data";
import { FloatingMenu } from "../components/FloatingMenu";
import { MobileZoomableModal } from "../components/MobileZoomableModal";
import RelatedCapabilitiesCarousel from "../components/RelatedCapabilitiesCarousel";
import { useReveal } from "../context/RevealContext";
import { useLenis } from "lenis/react";
import webDesignMockupImg from "../assets/images/web_design_mockup_1783179228755.jpg";
import darkUiMockupImg from "../assets/images/dark_ui_mockup_1783179382977.jpg";
import minimalistUiMockupImg from "../assets/images/minimalist_ui_mockup_1783179396760.jpg";
import lightSaasMockupImg from "../assets/images/light_saas_mockup_1783179693159.jpg";
import brandingIdentityManualImg from "../assets/images/branding_identity_manual_1783820937836.jpg";
import editingFaceRetouchImg from "../assets/images/editing_face_retouch_1783818154488.jpg";

const CATEGORY_RANDOM_PHOTOS: Record<string, string[]> = {
  "web-design-cms": [
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    webDesignMockupImg
  ],
  "ui-ux": [
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
    darkUiMockupImg,
    minimalistUiMockupImg,
    lightSaasMockupImg
  ],
  "brand-identity": [
    brandingIdentityManualImg,
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1635492491273-455af7728453?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1599305090598-fe179d501c27?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=1200"
  ],
  "packaging": [
    "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1551538597-27920a0b23f8?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1559163263-e3c11f45c55d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1627389955805-7389d424b953?auto=format&fit=crop&q=80&w=1200"
  ],
  "visual-design": [
    editingFaceRetouchImg,
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1541462608141-ad437433b0c7?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&q=80&w=1200"
  ]
};

export default function CaseStudyPage() {
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
  const [randomImage, setRandomImage] = useState<string>("");
  const [localTime, setLocalTime] = useState("");
  const [selectedMobileModalImage, setSelectedMobileModalImage] = useState<string | null>(null);
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
    isFromMenuBar: boolean = false
  ) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const rawId = targetSectionId.replace('#', '');
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
      if (rawId === 'hero-section' || rawId === 'hero') {
        navigate('/');
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

  const capability = CAPABILITIES_DATA.find(cap => cap.id === id);

  useEffect(() => {
    if (capability) {
      // Clear the random image on mount or navigation so the handpicked custom image shows first
      setRandomImage("");
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      sessionStorage.setItem("lastExpandedCapability", id);
    }
  }, [id]);

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

    // When entering a case study capability page, ensure the page starts cleanly at the top
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

      // Toggle side menu visibility based on scroll depth
      const nextShowSideMenu = currentY > 400;
      setShowSideMenu((prev) => (prev === nextShowSideMenu ? prev : nextShowSideMenu));

      // Determine if scrolled beyond top area
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

    // Give a small timed delay of 120ms behind the white cover to guarantee completely flash-free transition at top
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

  const randomizePhoto = () => {
    if (!capability) return;
    const pool = CATEGORY_RANDOM_PHOTOS[capability.id] || [];
    const current = randomImage || capability.image;
    const choices = pool.filter(p => p !== current);
    
    if (choices.length > 0) {
      const nextPhoto = choices[Math.floor(Math.random() * choices.length)];
      setRandomImage(nextPhoto);
    } else if (pool.length > 0) {
      const nextPhoto = pool[Math.floor(Math.random() * pool.length)];
      setRandomImage(nextPhoto);
    }
  };

  if (!capability) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">Case Study Not Found</h1>
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

  const galleryImages = [
    ...(capability.gallery || []),
    ...(capability.showcases?.map(s => s.image) || []),
    "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1200"
  ];

  return (
    <div className="min-h-screen bg-[#0A2947] font-sans text-white relative">
      {!isScrollReset && <div className="fixed inset-0 bg-[#0A2947] z-[9999]" />}
      
      {/* Global grain texture for the whole page */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="casePageNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#casePageNoise)" />
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
                ? (isMobileMenuOpen 
                    ? "z-[120] !bg-transparent !border-transparent border-b-0 inset-0 h-[100vh] supports-[height:100dvh]:h-[100dvh] flex flex-col overflow-hidden shadow-none" 
                    : "z-[100] bg-white border-b border-zinc-200/80 h-14 shadow-sm")
                : "z-[100] bg-transparent border-b-0 pt-4 md:pt-2.5 lg:pt-4"
            }`}
          >
            <div className="w-full px-6 sm:px-12 lg:px-16 h-14 md:h-12 lg:h-14 shrink-0 bg-white md:bg-transparent flex items-center justify-between">
              {!isMobile ? (
                <LayoutGroup id="header-casestudy-group">
                  {!isHeaderScrolled ? (
                    <>
                      {/* Back Button */}
                      <div className="flex items-center">
                        <motion.button
                          layoutId="header-brand-link"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          onClick={handleBrandHomeClick}
                          className="group flex items-center gap-1.5 transition-colors duration-300 hover:opacity-85 text-white cursor-pointer"
                        >
                          <span className="font-display font-semibold text-xs md:text-sm lg:text-base tracking-tight text-white">Zulhilmi Nasir</span>
                        </motion.button>
                      </div>

                      {/* Desktop Nav - Capsule */}
                      <motion.nav 
                        layoutId="header-nav-capsule"
                        transition={{ type: "spring", stiffness: 380, damping: 35 }}
                        className="flex items-center bg-transparent border border-transparent rounded-full py-1.5 px-3 md:py-1.5 md:px-2 lg:py-2 lg:px-4 space-x-1 md:space-x-1 lg:space-x-2 font-normal tracking-normal font-sans text-white transition-all duration-300 shadow-none"
                      >
                        <button onClick={(e) => handleNavClick(e, "#services-section", true)} className="nav-menu-btn-dark-theme cursor-pointer">
                          <span className="text-[15px]">Services</span>
                        </button>
                        <button onClick={(e) => handleNavClick(e, "#integration-section", true)} className="nav-menu-btn-dark-theme cursor-pointer">
                          <span className="hidden lg:inline text-[15px]">Software & AI Solution</span>
                          <span className="inline lg:hidden text-[15px]">Software</span>
                        </button>
                        <button onClick={(e) => handleNavClick(e, "#capabilities-section", true)} className="nav-menu-btn-dark-theme active cursor-pointer">
                          <span className="text-[15px]">Projects</span>
                        </button>
                        <button onClick={(e) => handleNavClick(e, "#about-section", true)} className="nav-menu-btn-dark-theme cursor-pointer">
                          <span className="text-[15px]">About</span>
                        </button>
                        <button onClick={(e) => handleNavClick(e, "#career-section", true)} className="nav-menu-btn-dark-theme cursor-pointer">
                          <span className="text-[15px]">Career</span>
                        </button>
                      </motion.nav>

                      {/* Get In Touch Button */}
                      <div className="flex items-center">
                        <motion.button
                          layoutId="header-contact-btn"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
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
                          <span className="relative z-10 text-[15px] font-medium">Get In Touch</span>
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    // Scrolled State Capsule
                    <div className="flex items-center justify-center w-full">
                      <motion.div 
                        layoutId="header-nav-capsule"
                        transition={{ type: "spring", stiffness: 380, damping: 35 }}
                        className="flex items-center bg-white/80 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] rounded-full py-1.5 pl-6 pr-2 md:py-1 md:pl-4 md:pr-1 lg:py-2 lg:pl-7 lg:pr-2.5 font-sans transition-all duration-300"
                      >
                        <motion.button
                          layoutId="header-brand-link"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          onClick={handleBrandHomeClick}
                          className="font-display font-semibold text-xs md:text-sm lg:text-base tracking-tight text-[#0A2947] hover:text-[#2563EB] hover:scale-105 transition-all mr-4 md:mr-6 lg:mr-12 flex items-center h-6 cursor-pointer"
                        >
                          ZN
                        </motion.button>

                        <nav className="flex items-center space-x-1 md:space-x-1 lg:space-x-2 text-[11px] md:text-[10.5px] lg:text-[13px] font-normal tracking-normal">
                          <button onClick={(e) => handleNavClick(e, "#services-section", true)} className="nav-menu-btn nav-btn-black cursor-pointer">
                            <span className="text-[15px]">Services</span>
                          </button>
                          <button onClick={(e) => handleNavClick(e, "#integration-section", true)} className="nav-menu-btn nav-btn-black cursor-pointer">
                            <span className="hidden lg:inline text-[15px]">Software & AI Solution</span>
                            <span className="inline lg:hidden text-[15px]">Software</span>
                          </button>
                          <button onClick={(e) => handleNavClick(e, "#capabilities-section", true)} className="nav-menu-btn nav-btn-black active cursor-pointer">
                            <span className="text-[15px]">Projects</span>
                          </button>
                          <button onClick={(e) => handleNavClick(e, "#about-section", true)} className="nav-menu-btn nav-btn-black cursor-pointer">
                            <span className="text-[15px]">About</span>
                          </button>
                          <button onClick={(e) => handleNavClick(e, "#career-section", true)} className="nav-menu-btn nav-btn-black cursor-pointer">
                            <span className="text-[15px]">Career</span>
                          </button>
                        </nav>

                        {/* Get In Touch Button inside capsule */}
                        <motion.button
                          layoutId="header-contact-btn"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
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
                // Mobile View
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
      <main className="relative z-10">
        
        {/* Full-width Hero Header Section with Background Image */}
        <div className="relative w-full h-auto sm:h-screen flex flex-col sm:flex-row sm:items-end overflow-hidden mb-4 pt-14 sm:pt-0 bg-white sm:bg-transparent">
          {/* Background Image: real size landscape on mobile, full-screen on desktop */}
          <div className="relative sm:absolute sm:inset-0 sm:z-0 w-full overflow-hidden bg-white sm:bg-transparent">
            <img 
              src={randomImage || capability.image} 
              alt={`${capability.title} background`}
              className="w-full h-auto sm:h-full object-contain sm:object-cover select-none pointer-events-none block"
              style={{ objectPosition: "center 30%" }}
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay: dark gradients for beautiful visual blending and high legibility (desktop only, removed on mobile) */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#0A2947] via-[#0A2947]/50 to-black/35 pointer-events-none" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Header Content Container: sits cleanly below the image on mobile */}
          <div className="w-full px-6 sm:px-12 lg:px-16 pt-6 sm:pt-0 pb-10 sm:pb-8 relative z-10 bg-white sm:bg-transparent">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-left pb-2 sm:pb-6"
            >
              <h1 className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl !text-[#2563EB] sm:!text-white tracking-tight leading-tight sm:leading-none uppercase flex items-center flex-wrap gap-x-3 gap-y-1">
                {capability.title.split('|').map((part, index, array) => (
                  <React.Fragment key={index}>
                    <span className="text-[#2563EB] sm:text-white">{part.trim()}</span>
                    {index < array.length - 1 && (
                      <span className="font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#2563EB]/50 sm:text-white/50 pb-1">|</span>
                    )}
                  </React.Fragment>
                ))}
              </h1>
              <p className="font-sans font-normal text-base sm:text-lg md:text-xl text-[#2563EB] sm:text-white leading-relaxed max-w-4xl pt-1">
                {capability.subtitle}
              </p>

              {/* Combined on mobile: Intro summary text integrated into the same single section */}
              <div className="block sm:hidden pt-4">
                <p className="text-[20px] font-light leading-snug text-zinc-700">
                  {capability.summary}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Main Content Area - Light Theme */}
        
        {/* Section 1: Intro (Desktop only, combined into header section on mobile) */}
        <section className="hidden sm:flex w-full bg-white text-zinc-900 z-20 sm:sticky sm:top-0 sm:h-screen flex-col justify-center">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="hidden sm:block md:col-span-4">
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-900">{capability.title}</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                  {capability.summary}
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
                <span className="text-2xl font-medium text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer" onClick={randomizePhoto}>
                  Cycle Designs
                </span>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
                <div>
                  <h4 className="text-[20px] sm:text-sm font-semibold text-zinc-900 mb-2">Practice</h4>
                  <p className="text-zinc-600 text-[16px] sm:text-sm">{capability.categoryLabel}</p>
                </div>
                <div>
                  <h4 className="text-[20px] sm:text-sm font-semibold text-zinc-900 mb-2">Focus Area</h4>
                  <p className="text-zinc-600 text-[16px] sm:text-sm">{capability.title}</p>
                </div>
                <div>
                  <h4 className="text-[20px] sm:text-sm font-semibold text-zinc-900 mb-2">Released</h4>
                  <p className="text-zinc-600 text-[16px] sm:text-sm">Active</p>
                </div>
                <div>
                  <h4 className="text-[20px] sm:text-sm font-semibold text-zinc-900 mb-2">Technology & Stack</h4>
                  <div className="flex flex-col gap-1">
                    {capability.toolsUsed.map(tool => (
                      <span key={tool} className="text-zinc-600 text-[16px] sm:text-sm">{tool}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[20px] sm:text-sm font-semibold text-zinc-900 mb-2">Scope</h4>
                  <p className="text-zinc-600 text-[16px] sm:text-sm">Full-scale Implementation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Overview */}
        <section className="w-full bg-white text-zinc-900 z-40 relative sm:sticky sm:top-0 h-auto sm:h-screen flex flex-col justify-center shadow-none sm:shadow-2xl py-12 sm:py-0">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4 relative">
                <div>
                  <span className="text-sm text-zinc-400 mb-1 block">{capability.title}</span>
                  <h2 className="text-4xl font-medium tracking-tight text-zinc-900">Overview</h2>
                </div>
              </div>
              <div className="md:col-span-8 space-y-6 sm:space-y-8 text-[20px] sm:text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p>{capability.summary}</p>
                <p>{capability.challenge}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Full-width Images (Sticky Stacking) */}
        <div className="relative bg-zinc-900 z-50 w-full flex flex-col sm:block">
           {/* Image 1 */}
           <div 
             className="relative sm:sticky sm:top-0 h-auto sm:h-screen w-full overflow-hidden cursor-pointer sm:cursor-default"
             onClick={() => handleMobileImageClick(galleryImages[0])}
           >
             <img 
               src={galleryImages[0]} 
               alt="Gallery 1"
               className="w-full h-auto sm:h-full object-contain sm:object-cover block" 
               referrerPolicy="no-referrer"
             />
           </div>
           {/* Image 2 */}
           <div 
             className="relative sm:sticky sm:top-0 h-auto sm:h-screen w-full overflow-hidden cursor-pointer sm:cursor-default"
             onClick={() => handleMobileImageClick("/TGPW/6.jpg")}
           >
             <img 
               src="/TGPW/6.jpg" 
               alt="TGPW Showcase 6"
               className="w-full h-auto sm:h-full object-contain sm:object-cover block" 
               referrerPolicy="no-referrer"
             />
           </div>
           {/* Image 3 */}
           <div 
             className="relative sm:sticky sm:top-0 h-auto sm:h-screen w-full overflow-hidden cursor-pointer sm:cursor-default"
             onClick={() => handleMobileImageClick(galleryImages[2] || "/Images/Thumbnail Mobile TGPW.jpg")}
           >
             <img 
               src={galleryImages[2] || "/Images/Thumbnail Mobile TGPW.jpg"} 
               alt="Gallery 3"
               className="w-full h-auto sm:h-full object-contain sm:object-cover block" 
               referrerPolicy="no-referrer"
             />
           </div>
        </div>

        {/* Section 5: The Challenge */}
        <div className="w-full bg-white text-zinc-900 z-50 relative py-8 md:py-10">
          <div className="w-full px-6 sm:px-12 lg:px-16 space-y-8 md:space-y-10">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 mb-12 md:mb-20">
              <div className="md:col-span-4 relative">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">The Challenge</h2>
                </div>
              </div>
              <div className="md:col-span-8 space-y-6 text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p>{capability.challenge}</p>
              </div>
            </div>
            
            {/* Gallery Part */}
            <div className="-mx-6 sm:mx-0 grid grid-cols-1 md:grid-cols-12 gap-0 sm:gap-4 lg:gap-6">
              <div className="md:col-span-6 h-auto sm:h-[600px] lg:h-[800px] cursor-pointer sm:cursor-default">
                <img 
                  src={(capability?.id === "packaging" || capability?.id === "TGPowerWrap") ? "/Images/TGPW Mobile.jpg" : (capability?.id === "web-design-cms" || capability?.id === "zenith-cms" || capability?.id === "ck-lighting") ? "/CK Lighting Web/ck5.jpg" : (galleryImages[2] || capability?.image)} 
                  className="w-full h-auto sm:h-full object-contain sm:object-cover block p-0 m-0" 
                  alt="Gallery 3"
                  referrerPolicy="no-referrer"
                  onClick={() => handleMobileImageClick((capability?.id === "packaging" || capability?.id === "TGPowerWrap") ? "/Images/TGPW Mobile.jpg" : (capability?.id === "web-design-cms" || capability?.id === "zenith-cms" || capability?.id === "ck-lighting") ? "/CK Lighting Web/ck5.jpg" : (galleryImages[2] || capability?.image))}
                />
              </div>
              <div className="md:col-span-6 flex flex-col gap-0 sm:gap-4 lg:gap-6 h-auto sm:h-[600px] lg:h-[800px]">
                <img 
                  src={(capability?.id === "packaging" || capability?.id === "TGPowerWrap") ? "/Images/5.jpg" : (capability?.id === "ck-lighting") ? "/CK Lighting Web/ck6.jpg" : (galleryImages[5] || galleryImages[4] || galleryImages[1] || capability?.image)} 
                  className="w-full h-auto sm:flex-1 sm:h-auto object-contain sm:object-cover min-h-0 block p-0 m-0 cursor-pointer sm:cursor-default" 
                  alt="Gallery 5"
                  referrerPolicy="no-referrer"
                  onClick={() => handleMobileImageClick((capability?.id === "packaging" || capability?.id === "TGPowerWrap") ? "/Images/5.jpg" : (capability?.id === "ck-lighting") ? "/CK Lighting Web/ck6.jpg" : (galleryImages[5] || galleryImages[4] || galleryImages[1] || capability?.image))}
                />
                <img 
                  src={(capability?.id === "packaging" || capability?.id === "TGPowerWrap") ? "/Images/Thumbnail Mobile TGPW.jpg" : (galleryImages[3] || galleryImages[0] || capability?.image)} 
                  className="w-full h-auto sm:flex-1 sm:h-auto object-contain sm:object-cover min-h-0 block p-0 m-0 cursor-pointer sm:cursor-default" 
                  alt="Gallery 4"
                  referrerPolicy="no-referrer"
                  onClick={() => handleMobileImageClick((capability?.id === "packaging" || capability?.id === "TGPowerWrap") ? "/Images/Thumbnail Mobile TGPW.jpg" : (galleryImages[3] || galleryImages[0] || capability?.image))}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Section 6: Additional 2 Sticky Full-width Images */}
        <div className="relative bg-zinc-900 z-50 w-full flex flex-col sm:block">
           {/* Image 0 (CK8 for CK Lighting) */}
           {capability?.id === "ck-lighting" && (
             <div 
               className="w-full mx-auto cursor-pointer sm:cursor-default relative h-auto max-w-[1525px]"
               onClick={() => handleMobileImageClick("/CK Lighting Web/CK8.jpg")}
             >
               <img 
                 src="/CK Lighting Web/CK8.jpg" 
                 alt="CK Lighting Web CK8"
                 className="w-full h-auto sm:h-full object-contain sm:object-cover block"
                 referrerPolicy="no-referrer"
               />
             </div>
           )}

           {/* Image 1 */}
           <div 
             className={`w-full mx-auto cursor-pointer sm:cursor-default ${capability?.id === "ck-lighting" ? "relative h-auto max-w-[1525px]" : "relative sm:sticky sm:top-0 h-auto sm:h-screen overflow-hidden"}`}
             onClick={() => handleMobileImageClick((capability?.id === "ck-lighting") ? "/CK Lighting Web/CK9.jpg" : (galleryImages[4] || "/Images/TGPW Site Map.jpg"))}
           >
             <img 
               src={(capability?.id === "ck-lighting") ? "/CK Lighting Web/CK9.jpg" : (galleryImages[4] || "/Images/TGPW Site Map.jpg")} 
               alt="Gallery Sticky 1"
               className={`w-full h-auto sm:h-full object-contain sm:object-cover block`}
               referrerPolicy="no-referrer"
             />
           </div>
           {/* Image 2 */}
           {capability?.id !== "ck-lighting" && (
             <div 
               className="w-full mx-auto cursor-pointer sm:cursor-default relative sm:sticky sm:top-0 h-auto sm:h-screen overflow-hidden"
               onClick={() => handleMobileImageClick(galleryImages[5] || "/Images/TGPW Visual Guideline.jpg")}
             >
               <img 
                 src={galleryImages[5] || "/Images/TGPW Visual Guideline.jpg"} 
                 alt="TGPW Visual Guideline"
                 className={`w-full h-auto sm:h-full object-contain sm:object-cover block`} 
                 referrerPolicy="no-referrer"
               />
             </div>
           )}
        </div>

        {/* Section 7: The Solution */}
        <div className="w-full bg-white text-zinc-900 z-50 relative py-8 md:py-10">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">The Solution</h3>
              </div>
              <div className="md:col-span-8 space-y-6 text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p>
                  {capability.solution}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Added Full-width Image Section (Between Solution & Key Results) */}
        {(capability?.id === "komorebi-editorial" || capability?.id === "ck-lighting") && (
          <div 
            className="w-full relative bg-zinc-900 z-50 cursor-pointer sm:cursor-default"
            onClick={() => handleMobileImageClick(capability?.id === "ck-lighting" ? "/CK Lighting Web/CK12.jpg" : "/Triply/Triply9.jpg")}
          >
            <img 
              src={capability?.id === "ck-lighting" ? "/CK Lighting Web/CK12.jpg" : "/Triply/Triply9.jpg"} 
              alt={capability?.id === "ck-lighting" ? "CK Lighting 12 Showcase" : "Triply Solution Showcase"}
              className="w-full h-auto block select-none" 
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Key Results */}
        {capability.results && capability.results.length > 0 && (
          <div className="w-full bg-white text-zinc-900 z-50 relative py-8 md:py-10">
            <div className="w-full px-6 sm:px-12 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-4">
                   <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-zinc-900">Key Results</h3>
                </div>
                <div className="md:col-span-8">
                  <ul className="grid grid-cols-1 gap-6">
                    {capability.results.map((result, idx) => (
                      <li key={idx} className="flex items-start gap-4 text-xl font-light text-zinc-700 leading-relaxed">
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

        {/* Related Capabilities Carousel with Scroll-Driven Horizontal Movement */}
        <RelatedCapabilitiesCarousel currentId={capability.id} />
      </main>

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
              background: 'linear-gradient(to bottom, rgba(37, 99, 235, 0) 0%, rgba(37, 99, 235, 0.1) 20%, rgba(37, 99, 235, 0.35) 40%, rgba(37, 99, 235, 0.7) 65%, rgba(37, 99, 235, 0.95) 82%, rgba(37, 99, 235, 1) 90%, rgba(37, 99, 235, 1) 100%)'
            }}
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact-section" className="relative overflow-hidden bg-[#2563EB] text-white pt-24 pb-0">
        <div className="relative z-10 w-full mx-auto select-none">
          {/* Top content wrapper with margins */}
          <div className="px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-24">
            
            {/* Left part: Time, Title and pill button */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              {/* Dynamic local time */}
              <div className="text-xs text-white flex items-center gap-2 mb-8 tracking-wider uppercase font-sans">
                {localTime && parseInt(localTime.split(":")[0], 10) >= 6 && parseInt(localTime.split(":")[0], 10) < 18 ? (
                  <Sun className="h-4 w-4 text-white" />
                ) : (
                  <Moon className="h-4 w-4 text-white" />
                )}
                <span>
                  {localTime ? `${localTime} Kuala Lumpur, MY` : "05:03 PM Kuala Lumpur, MY"}
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
                <span className="text-white font-sans text-xs uppercase tracking-widest mb-2 font-bold">Explore</span>
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
                <span className="text-white font-sans text-xs uppercase tracking-widest mb-2 font-bold">Socials</span>
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
              <a href="#contact-section" onClick={(e) => e.preventDefault()} className="hover:text-white/80 transition-colors block">TERMS</a>
              <a href="#contact-section" onClick={(e) => e.preventDefault()} className="hover:text-white/80 transition-colors block mt-1">PRIVACY POLICY</a>
            </div>
          </div>

          {/* Bottom Giant Typographic Name "ZULHILMI" with perfect edge-to-edge SVG */}
          <div className="w-full overflow-hidden m-0 p-0 block leading-none">
            <svg viewBox="0 0 620 111" className="w-full h-auto m-0 p-0 block select-none translate-y-[2px]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="zulhilmi-gradient-case" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#zulhilmi-gradient-case)"
                style={{ letterSpacing: "-0.05em" }}
              >
                ZULHILMI
              </text>
            </svg>
          </div>

        </div>
      </footer>
      <FloatingMenu visible={showSideMenu && !isMobileMenuOpen} theme="dark" onNavClick={(targetId) => handleNavClick({ preventDefault: () => {} } as any, targetId)} />

      {/* Mobile Floating Full Image Modal with pinch/zoom gestures */}
      <MobileZoomableModal
        isOpen={Boolean(selectedMobileModalImage)}
        imageSrc={selectedMobileModalImage}
        onClose={() => setSelectedMobileModalImage(null)}
      />
    </div>
  );
}
