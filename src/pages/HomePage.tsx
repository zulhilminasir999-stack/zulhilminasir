import React, { useState, useEffect } from "react";
import { ParallaxCardWrapper } from "../components/ui/parallax-card-wrapper";
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from "motion/react";
import { 
  ArrowRight, 
  ExternalLink, 
  Layers, 
  Monitor, 
  Cpu, 
  Grid, 
  X, 
  Clock, 
  Mail, 
  Smartphone, 
  Globe, 
  Box,
  Laptop,
  CheckCircle,
  Menu,
  Heart,
  Sun,
  Moon,
  Figma,
  PenTool,
  Image,
  LayoutGrid,
  ShoppingBag,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Facebook,
  Twitter,
  Send
} from "lucide-react";
import { PORTFOLIO_PROJECTS, SOFTWARES_LIST, AI_TOOLS_LIST, CAPABILITIES_DATA } from "../data";
import { Project, ProjectCategory, CapabilityDetail } from "../types";
import AboutMe30Sec from "../components/AboutMe30Sec";
import WorkInNumbers from "../components/WorkInNumbers";
import { TextAnimate } from "../components/TextAnimate";
import { WordsStagger } from "@/registry/spell-ui/words-stagger";
import CareerTimeline from "../components/CareerTimeline";
import ContactForm from "../components/ContactForm";
import StripeMeshGradient from "../components/StripeMeshGradient";
import { FloatingMenu } from "../components/FloatingMenu";
import ServiceCardSlider from "../components/ServiceCardSlider";
import { useNavigate, useLocation, useNavigationType } from "react-router-dom";
import { HoverImageList } from "@/components/unlumen-ui/hover-image-list";
import { LatestPortfolio } from "@/components/unlumen-ui/latest-portfolio";
import { CreativeApproach } from "../components/CreativeApproach";
import ServicesSection from "../components/unlumen-ui/ServicesSection";
import TypewriterSection from "../components/TypewriterSection";
import TechBanner from "../components/TechBanner";
import { useReveal } from "../context/RevealContext";
import { useLenis } from "../context/LenisContext";

interface HomePageProps {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

export default function HomePage({ isLoading, setIsLoading }: HomePageProps) {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const navType = useNavigationType();
  const { lenis } = useLenis();
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("ALL");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isXlScreen, setIsXlScreen] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const heroRef = React.useRef<HTMLDivElement>(null);

  // Track scroll progress of the hero section for premium parallax effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);
  const heroBgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const galleryRef = React.useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire unified gallery wrapper (including sticky typewriter + portal)
  const { scrollYProgress: galleryScrollY } = useScroll({
    target: galleryRef,
    offset: ["start start", "end end"],
  });

  const galleryBg = useTransform(galleryScrollY, [0.50, 0.70], ["#2563EB", "#ffffff"]);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobileScreen(window.innerWidth < 640);
      setIsMobile(window.innerWidth < 768);
      setIsXlScreen(window.innerWidth >= 1280);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const mountedWithLoading = React.useRef(isLoading);

  // Continuously track scroll position in sessionStorage so back navigation always restores perfectly
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const trackScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem("home_scroll_position", window.scrollY.toString());
      }, 50); // Small debounce
    };
    
    window.addEventListener("scroll", trackScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", trackScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Scroll to hash if present on client-side navigation, otherwise start at the top on app load
  useEffect(() => {
    if (!isLoading) {
      const savedScrollPosition = sessionStorage.getItem("home_scroll_position");
      
      const targetHash = window.location.hash;
      const isInitialAppLoad = mountedWithLoading.current;

      if (targetHash && !isInitialAppLoad) {
        // Client-side navigation with a hash
        const rawId = targetHash.replace('#', '');
        
        const scrollToHash = () => {
          const el = document.getElementById(rawId);
          if (el) {
            const targetY = el.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
            if (lenis) {
              lenis.scrollTo(targetY, { immediate: true });
            }
            setActiveSection(rawId);
            setIsHeaderScrolled(targetY > 80);
            setHeaderVisible(true);
          }
        };
        
        scrollToHash();
        const timers = [10, 50, 100, 200, 300, 500, 800, 1200].map(delay => setTimeout(scrollToHash, delay));
        return () => timers.forEach(id => clearTimeout(id));
      } else {
        // If we have a saved scroll position and we navigated back (POP), restore it
        if (savedScrollPosition && navType === "POP") {
          const targetY = parseInt(savedScrollPosition, 10);
          if (!isNaN(targetY)) {
            const restoreScroll = () => {
              window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
              document.documentElement.scrollTop = targetY;
              document.body.scrollTop = targetY;
              if (lenis) {
                lenis.scrollTo(targetY, { immediate: true });
              }
            };
            
            restoreScroll();
            const timers = [10, 50, 100, 200, 300, 500, 800, 1200].map(delay => setTimeout(restoreScroll, delay));
            return () => timers.forEach(id => clearTimeout(id));
          }
        }

        // Initial app load or no hash -> force scroll to top
        if (isInitialAppLoad && targetHash) {
          // Clean up hash from URL visually if we are forcing to top on load
          window.history.replaceState(null, "", window.location.pathname);
        }

        const forceScrollToTop = () => {
          sessionStorage.removeItem("capabilities_expanded_index");
          window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          }
          setActiveSection("hero-section");
          setIsHeaderScrolled(false);
          setHeaderVisible(true);
        };

        forceScrollToTop();
        const timers = [10, 50, 100, 200, 300, 500, 800, 1200].map(delay => setTimeout(forceScrollToTop, delay));
        return () => timers.forEach(id => clearTimeout(id));
      }
    }
  }, [isLoading, lenis]);

  // Reset active slide states
  useEffect(() => {
    setActiveSlideIndex(0);
    setIsAtTop(true);
    setIsAtBottom(false);
  }, []);

  const [localTime, setLocalTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Theme is strictly light mode (removing darkmode version option)
  const theme = "light";

  // Keep HTML root node synchronized with light theme configuration
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add("light");
    root.classList.remove("dark");
  }, []);

  // Update clock in real-time matching home city
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

  // Scroll spy detection for headers and active navigation underlines
  const [headerVisible, setHeaderVisible] = useState(true);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [activeSection, setActiveSection] = useState("hero-section");
  const [capabilitiesExpandedIndex, setCapabilitiesExpandedIndex] = useState<number | null>(() => {
    const saved = sessionStorage.getItem("capabilities_expanded_index");
    return saved !== null ? parseInt(saved, 10) : null;
  });
  const isSoftwareSection = activeSection === "integration-section";
  const isProjectsSection = activeSection === "capabilities-section" || activeSection === "projects-outer-section";
  const isServicesSection = activeSection === "services-section" || activeSection === "work-in-numbers";

  // Sections that have a dark or saturated blue background (where navigation should use white text)
  const isDarkBackgroundSection = 
    activeSection === "hero-section" ||
    activeSection === "integration-section" ||
    activeSection === "projects-outer-section" ||
    activeSection === "contact-section";

  // Sections that have a clean white background (where navigation MUST use bold black text during scroll)
  const isLightBackgroundSection = 
    activeSection === "services-section" ||
    activeSection === "work-in-numbers" ||
    activeSection === "gallery-section" ||
    activeSection === "capabilities-section" ||
    activeSection === "hover-list-section" ||
    activeSection === "creative-approach" ||
    activeSection === "about-section" ||
    activeSection === "career-section";

  const isWhiteTextSection = (isDarkBackgroundSection && !isLightBackgroundSection) || 
    ((activeSection === "capabilities-section" || activeSection === "hover-list-section") && capabilitiesExpandedIndex !== null && !isScrollingUp);
  const { triggerReveal } = useReveal();

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const rawId = targetId.replace('#', '');
    const isHero = rawId === "hero-section" || rawId === "hero";

    // If already at hero section, do nothing
    if (isHero && window.scrollY < 80) {
      return;
    }

    triggerReveal(() => {
      const rawId = targetId.replace('#', '');
      const isHero = rawId === "hero-section" || rawId === "hero";
      const el = document.getElementById(rawId);
      
      if (el || isHero) {
        // Calculate exact absolute top position on the document
        const targetY = (el && !isHero) ? el.getBoundingClientRect().top + window.scrollY : 0;

        // Ensure header state is updated
        setHeaderVisible(true);
        setIsHeaderScrolled(targetY > 80);
        setIsScrollingUp(true);
        setActiveSection(isHero ? "hero-section" : rawId);

        // Disable lenis smooth scroll temporarily to jump instantly
        if (lenis) {
          lenis.stop();
        }
        
        // Jump directly to top/target section without any smooth scrolling
        window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
        document.documentElement.scrollTop = targetY;
        document.body.scrollTop = targetY;
        
        // Restart lenis and sync its position instantly
        if (lenis) {
          lenis.start();
          lenis.scrollTo(targetY, { immediate: true });
        }

        // Clean URL hash so refreshing the browser starts cleanly at top section
        window.history.replaceState(null, "", window.location.pathname);
      }
    });
  };

  useEffect(() => {
    let prevY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      
      // Toggle side action rail and scrolled capsule state thresholds
      setShowSideMenu(currentY > 550);
      setIsHeaderScrolled(currentY >= 80);

      const delta = currentY - prevY;

      if (currentY < 80) {
        // At the very top, always show header and button
        setHeaderVisible(true);
        setIsScrollingUp(true);
        setIsHeaderScrolled(false);
        prevY = currentY;
      } else {
        if (delta > 2) {
          // Scrolling down - hide header and button
          setHeaderVisible(false);
          setIsScrollingUp(false);
          prevY = currentY;
        } else if (delta < -2) {
          // Scrolling up - show header and button
          setHeaderVisible(true);
          setIsScrollingUp(true);
          setIsHeaderScrolled(true);
          prevY = currentY;
        }
      }
      
      // Track active section on scroll for desktop menu highlights
      const servicesEl = document.getElementById("services-section");
      const servicesTop = servicesEl ? servicesEl.getBoundingClientRect().top + currentY : window.innerHeight;
      const sectionIds = ["services-section", "work-in-numbers", "integration-section", "projects-outer-section", "capabilities-section", "hover-list-section", "gallery-section", "creative-approach", "about-section", "career-section", "contact-section"];
      let currentSection = "hero-section";
      const scrollPosition = currentY + 140; // Offset for header height

      if (scrollPosition >= servicesTop) {
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const top = rect.top + currentY;
            const bottom = top + el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < bottom) {
              currentSection = id;
              break;
            }
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProjects = activeFilter === "ALL"
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === activeFilter);

  const getSoftwareIcon = (name: string) => {
    switch (name) {
      case "Figma":
        return <Figma className="h-4 w-4" />;
      case "Adobe Illustrator":
        return <PenTool className="h-4 w-4" />;
      case "Adobe Photoshop":
        return <Image className="h-4 w-4" />;
      case "WordPress Elementor":
        return <LayoutGrid className="h-4 w-4" />;
      case "SiteGiant & Wix":
        return <ShoppingBag className="h-4 w-4" />;
      default:
        return <Box className="h-4 w-4" />;
    }
  };

  return (
    <>
      <div className={`${theme} min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white transition-colors duration-300 relative`}>
      
      {/* Global Navigation Header with dynamic scroll-up layout */}
      <div className="relative z-[100]">
        <AnimatePresence>
          {headerVisible && (
            <motion.header 
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                isMobile 
                  ? "bg-zinc-950/45 backdrop-blur-md border-b border-zinc-900/30 h-14" 
                  : "bg-transparent border-b-0 pt-4 md:pt-2.5 lg:pt-4"
              }`}
            >
              <div className="w-full px-6 sm:px-12 lg:px-16 h-14 md:h-12 lg:h-14 flex items-center justify-between">
                
                {/* 
                  DESKTOP & TABLET VIEW:
                  If we are NOT scrolled, we render the 3-column layout.
                  If we ARE scrolled, we center a single beautiful consolidated floating capsule menu!
                */}
                {!isMobile ? (
                  <LayoutGroup id="header-desktop-group">
                    {!isHeaderScrolled ? (
                      // 1. ORIGINAL TOP OF PAGE STATE (3 separate elements, transparent header)
                      <>
                        {/* Brand Mark */}
                        <div className="flex items-center">
                          <motion.a
                            layoutId="header-brand-link"
                            transition={{ type: "spring", stiffness: 320, damping: 30 }}
                            href="#hero-section"
                            onClick={(e) => {
                              e.preventDefault();
                              if (window.scrollY >= 80) {
                                handleNavClick(e, '#hero-section');
                              }
                            }}
                            className={`font-display font-semibold text-xs md:text-sm lg:text-base tracking-tight flex items-center gap-1.5 transition-colors duration-300 text-white ${
                              !isHeaderScrolled ? "cursor-default select-none pointer-events-none" : "hover:opacity-85 cursor-pointer"
                            }`}
                          >
                            <span className="hidden lg:inline">Zulhilmi Nasir</span>
                            <span className="inline lg:hidden">Zulhilmi</span>
                          </motion.a>
                        </div>

                        {/* Desktop Nav - Beautiful Floating Capsule */}
                        <motion.nav 
                          layoutId="header-nav-capsule"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          className="flex items-center bg-transparent border border-transparent rounded-full py-1.5 px-3 md:py-1.5 md:px-2 lg:py-2 lg:px-4 space-x-1.5 md:space-x-1.5 lg:space-x-2.5 font-normal tracking-normal font-sans text-white transition-all duration-300 shadow-none"
                        >
                          <a href="#services-section" onClick={(e) => handleNavClick(e, '#services-section')} className={`nav-menu-btn ${isServicesSection ? "active" : ""}`}>
                            <span className="text-[15px] font-medium">Services</span>
                          </a>
                          <a href="#integration-section" onClick={(e) => handleNavClick(e, '#integration-section')} className={`nav-menu-btn ${activeSection === "integration-section" ? "active" : ""}`}>
                            <span className="hidden lg:inline text-[15px] font-medium">Software & AI Solution</span>
                            <span className="inline lg:hidden text-[15px] font-medium">Software</span>
                          </a>
                          <a href="#capabilities-section" onClick={(e) => handleNavClick(e, '#capabilities-section')} className={`nav-menu-btn ${isProjectsSection ? "active" : ""}`}>
                            <span className="text-[15px] font-medium">Projects</span>
                          </a>
                          <a href="#about-section" onClick={(e) => handleNavClick(e, '#about-section')} className={`nav-menu-btn ${activeSection === "about-section" ? "active" : ""}`}>
                            <span className="text-[15px] font-medium">About</span>
                          </a>
                          <a href="#career-section" onClick={(e) => handleNavClick(e, '#career-section')} className={`nav-menu-btn ${activeSection === "career-section" ? "active" : ""}`}>
                            <span className="text-[15px] font-medium">Career</span>
                          </a>
                        </motion.nav>

                        {/* Connect Button */}
                        <div className="flex items-center">
                          <motion.a
                            layoutId="header-contact-btn"
                            transition={{ type: "spring", stiffness: 380, damping: 35 }}
                            href="#contact-section"
                            onClick={(e) => handleNavClick(e, '#contact-section')}
                            className="group get-in-touch-btn-hero md:!py-1.5 md:!px-3.5 lg:!py-1.5 lg:!px-4 cursor-pointer"
                          >
                            {/* Shimmer Effect Wrapper */}
                            <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0 rounded-[25px] overflow-hidden">
                              {/* Ambient internal cyan glow */}
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18)_0%,transparent_70%)] animate-[glow-pulse_3s_ease-in-out_infinite]" />
                              
                              {/* Scanning grid sweep light */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -skew-x-12 animate-[grid-sweep_4s_ease-in-out_infinite]" />
                            </div>
                            <span className="relative z-10 text-[15px] font-medium">Get In Touch</span>
                          </motion.a>
                        </div>
                      </>
                    ) : (
                      // 2. SCROLLED STATE (Single beautifully consolidated floating capsule in the middle)
                      <div className="flex items-center justify-center w-full">
                        <motion.div 
                          layoutId="header-nav-capsule"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          className={`flex items-center rounded-full py-1.5 pl-6 pr-2 md:py-1 md:pl-4 md:pr-1 lg:py-2 lg:pl-7 lg:pr-2.5 font-sans transition-all duration-300 backdrop-blur-2xl ${
                            isWhiteTextSection 
                              ? "bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]" 
                              : "bg-white/85 border border-zinc-200/90 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]"
                          }`}
                        >
                          {/* ZN Button / Logo inside capsule */}
                          <motion.a
                            layoutId="header-brand-link"
                            transition={{ type: "spring", stiffness: 380, damping: 35 }}
                            href="#hero-section"
                            onClick={(e) => handleNavClick(e, '#hero-section')}
                            className={`font-display font-semibold text-base tracking-tight transition-all mr-10 md:mr-5 lg:mr-10 flex items-center h-6 cursor-pointer ${
                              isWhiteTextSection 
                                ? "text-white hover:text-cyan-300" 
                                : "text-zinc-950 hover:text-[#2563EB]"
                            }`}
                          >
                            ZN
                          </motion.a>

                          {/* Navigation Links inside capsule */}
                          <nav className="flex items-center space-x-2.5 md:space-x-1.5 lg:space-x-2.5 text-[15px] md:text-[13px] lg:text-[15px] font-medium tracking-normal">
                            <a 
                              href="#services-section" 
                              onClick={(e) => handleNavClick(e, '#services-section')} 
                              className={`nav-menu-btn ${isServicesSection ? "active" : ""} ${isWhiteTextSection && !isServicesSection ? "nav-btn-white" : "nav-btn-black"}`}
                            >
                              <span>Services</span>
                            </a>
                            <a 
                              href="#integration-section" 
                              onClick={(e) => handleNavClick(e, '#integration-section')} 
                              className={`nav-menu-btn ${isSoftwareSection ? "active" : ""} ${isWhiteTextSection && !isSoftwareSection ? "nav-btn-white" : "nav-btn-black"}`}
                            >
                              <span className="hidden lg:inline">Software & AI Solution</span>
                              <span className="inline lg:hidden">Software</span>
                            </a>
                            <a 
                              href="#capabilities-section" 
                              onClick={(e) => handleNavClick(e, '#capabilities-section')} 
                              className={`nav-menu-btn ${isProjectsSection ? "active" : ""} ${isWhiteTextSection && !isProjectsSection ? "nav-btn-white" : "nav-btn-black"}`}
                            >
                              <span>Projects</span>
                            </a>
                            <a 
                              href="#about-section" 
                              onClick={(e) => handleNavClick(e, '#about-section')} 
                              className={`nav-menu-btn ${activeSection === "about-section" ? "active" : ""} ${isWhiteTextSection && activeSection !== "about-section" ? "nav-btn-white" : "nav-btn-black"}`}
                            >
                              <span>About</span>
                            </a>
                            <a 
                              href="#career-section" 
                              onClick={(e) => handleNavClick(e, '#career-section')} 
                              className={`nav-menu-btn ${activeSection === "career-section" ? "active" : ""} ${isWhiteTextSection && activeSection !== "career-section" ? "nav-btn-white" : "nav-btn-black"}`}
                            >
                              <span>Career</span>
                            </a>
                          </nav>

                          {/* Get In Touch Button inside capsule */}
                          <motion.a
                            layoutId="header-contact-btn"
                            transition={{ type: "spring", stiffness: 380, damping: 35 }}
                            href="#contact-section"
                            onClick={(e) => handleNavClick(e, '#contact-section')}
                            className={`ml-6 md:ml-3 lg:ml-6 ${isWhiteTextSection ? "get-in-touch-btn-dark" : "get-in-touch-btn"} whitespace-nowrap md:!py-1.5 md:!px-3.5 lg:!py-1.5 lg:!px-4 cursor-pointer`}
                          >
                            <span className="text-[15px]">Get In Touch</span>
                          </motion.a>
                        </motion.div>
                      </div>
                    )}
                  </LayoutGroup>
                ) : (
                  // 3. MOBILE VIEW: Standard simple 2-column sticky menu with brand on left and hamburger on right
                  <>
                    <div className="flex items-center">
                      <a
                        href="#hero-section"
                        onClick={(e) => {
                          e.preventDefault();
                          if (window.scrollY >= 80) {
                            handleNavClick(e, '#hero-section');
                          }
                        }}
                        className={`font-display font-semibold text-sm tracking-tight text-white ${
                          !isHeaderScrolled ? "cursor-default select-none pointer-events-none" : "hover:opacity-85 cursor-pointer"
                        }`}
                      >
                        Zulhilmi Nasir
                      </a>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-1 px-2 text-zinc-400 hover:text-zinc-100 cursor-pointer"
                      >
                        <Menu className="h-5 w-5" />
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile menu panel */}
              <AnimatePresence>
                {isMobile && isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden border-b border-zinc-900 bg-zinc-950 p-6 space-y-4 flex flex-col text-sm tracking-wide font-mono uppercase text-zinc-400"
                  >
                    <a href="#services-section" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, '#services-section'); }} className="hover:text-zinc-100 pb-2 border-b border-zinc-900/45">Services</a>
                    <a href="#integration-section" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, '#integration-section'); }} className="hover:text-zinc-100 pb-2 border-b border-zinc-900/45">Software & AI Solutions</a>
                    <a href="#capabilities-section" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, '#capabilities-section'); }} className="hover:text-zinc-100 pb-2 border-b border-zinc-900/45">Projects</a>
                    <a href="#about-section" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, '#about-section'); }} className="hover:text-zinc-100 pb-2 border-b border-zinc-900/45">About</a>
                    <a href="#career-section" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, '#career-section'); }} className="hover:text-zinc-100 pb-2 border-b border-zinc-900/45">Career</a>
                    <a href="#contact-section" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, '#contact-section'); }} className="hover:text-zinc-100">Collaborate</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.header>
          )}
        </AnimatePresence>
      </div>

      {/* Wrapper container for Hero and About section to enable seamless overlapping image without horizontal scrollbars */}
      <div className="relative overflow-x-clip w-full">
        {/* Stripe-inspired Hero with glowing mesh canvas backgrounds */}
        <motion.section 
          ref={heroRef}
          id="hero-section" 
          className="sticky top-0 z-10 pt-24 pb-12 h-screen min-h-[500px] sm:min-h-[600px] lg:min-h-[720px] flex items-stretch overflow-hidden"
        >
          
          {/* Background Image replacing the solid background completely */}
          <motion.div 
            style={{ y: heroBgY }}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <img 
              src="/hero-bg.jpg" 
              alt="Hero Background" 
              className="w-full h-full object-cover select-none pointer-events-none" 
              style={{ objectPosition: "center 20%" }} // Adjust this percentage (e.g., 20%, 30%, 40%) to shift the image Y coordinate down or up
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Vertical Left Ticker/Indicator matching the mockup exactly */}
          <div className="absolute left-6 sm:left-12 lg:left-16 top-[45%] md:top-[50%] -translate-y-1/2 flex flex-col items-start gap-4 pointer-events-none select-none z-20">
            <span className="font-sans font-semibold text-xs tracking-wide text-white/50">2K26</span>
            <div className="w-[1px] h-12 md:h-16 bg-white/20 ml-[2px]" />
            <span 
              className="font-mono text-[10px] uppercase tracking-widest text-white/50 select-none ml-[2px]"
              style={{ writingMode: "vertical-lr" }}
            >
              ./ portfolio
            </span>
          </div>

          <motion.div 
            style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
            className="w-full px-6 sm:px-12 lg:px-16 relative z-10 flex flex-col justify-end py-6 md:py-10"
          >
            {/* Bottom Row: Crafting Digital Design heading aligned side-by-side with ServiceCardSlider */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-8 w-full mt-auto pt-16 md:pt-0 pointer-events-auto">
              <div className="p-0 m-0 text-left max-w-2xl lg:max-w-3xl xl:max-w-4xl">
                <div className="space-y-4 translate-y-4 sm:translate-y-6 md:translate-y-8 lg:translate-y-10">
                  <h2 className="font-sans font-semibold text-xl sm:text-2xl md:text-[34px] lg:text-[40px] xl:text-[46px] tracking-tight !text-white leading-[1.22] text-left">
                    <span className="block whitespace-nowrap overflow-visible">
                      <WordsStagger trigger={!isLoading} delay={0.3} className="!text-white flex-nowrap whitespace-nowrap" highlightWords={{ "Solutions": "font-serif italic font-normal text-[1.16em]" }}>
                        Crafting SaaS Design & Web Solutions
                      </WordsStagger>
                    </span>
                    <span className="block whitespace-nowrap overflow-visible mt-1 sm:mt-1.5 md:mt-2">
                      <WordsStagger trigger={!isLoading} delay={0.45} className="!text-white flex-nowrap whitespace-nowrap">
                        Augmented by AI-Powered Innovation
                      </WordsStagger>
                    </span>
                  </h2>
                </div>
              </div>

              {/* Interactive 3D Stacked Service Deck Slider Container */}
              <div className="self-start lg:self-end shrink-0 translate-y-4 sm:translate-y-6 md:translate-y-8 lg:translate-y-10 pb-1">
                <ServiceCardSlider />
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Beautiful Overlapping Slider-up Container stacking over the Sticky Hero */}
        <div className="relative z-20 bg-white">
          {/* Services Section - Beautiful Stripe-style expanding carousel */}
          <ServicesSection isDark={false} />

          {/* Work In Numbers Section */}
          <WorkInNumbers theme={theme} />

          {/* Cinematic Futuristic Technology Banner - Edge-to-edge, no padding */}
          <TechBanner />
        </div>
      </div>

      {/* Featured Projects Section */}
      <section 
        id="projects-outer-section" 
        className="relative w-full pt-0 pb-0 bg-[#2563EB] z-20 -mt-1"
      >
        {/* Latest Portfolio Segment */}
        <LatestPortfolio />
      </section>

      {/* Unified Sticky-Scroll Section: Typewriter Section & What I Do Portal Reveal */}
      <motion.div id="gallery-section" ref={galleryRef} style={{ backgroundColor: galleryBg }} className="relative w-full h-[220vh] z-30">
        <motion.div style={{ backgroundColor: galleryBg }} className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
          <TypewriterSection scrollYProgress={galleryScrollY} />
        </motion.div>
      </motion.div>

      {/* 4. Capability Cards Section on white background */}
      <div id="hover-list-section" className="w-full bg-white relative z-50 pt-4 pb-0 -mt-[15vh] sm:-mt-[25vh] lg:-mt-[30vh]">
        <HoverImageList 
          items={CAPABILITIES_DATA.map(cap => ({
            id: cap.id,
            label: cap.label,
            image: cap.image,
            category: cap.categoryLabel,
            showcases: cap.showcases
          }))} 
          onExpandedChange={(idx) => setCapabilitiesExpandedIndex(idx)}
          onItemClick={(item, idx, showcase) => {
            sessionStorage.setItem("home_scroll_position", window.scrollY.toString());
            triggerReveal(() => {
              if (showcase) {
                if (showcase.url) {
                  navigate(showcase.url);
                  return;
                }
                if (showcase.projectId) {
                  navigate(`/case-study-project/${showcase.projectId}`);
                  return;
                }
                const lowerTitle = showcase.title.toLowerCase();
                if (lowerTitle.includes("pre-school fee management") || lowerTitle.includes("official duty")) {
                  navigate(`/case-study-project/aistudio-brand`);
                  return;
                }
                const matchedProject = PORTFOLIO_PROJECTS.find(p => p.title.toLowerCase() === lowerTitle);
                if (matchedProject) {
                  navigate(`/case-study-project/${matchedProject.id}`);
                  return;
                }
              }
              const detail = CAPABILITIES_DATA[idx];
              if (detail) {
                navigate(`/case-study/${detail.id}`);
              }
            });
          }}
        />

        {/* Embedded AboutMe30Sec Section */}
        <motion.section 
          id="about-section" 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full pt-20 sm:pt-28 pb-16 transition-all duration-300 ${
            theme === "light"
              ? "bg-white"
              : "bg-zinc-950"
          }`}
        >
          <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
            {/* Mount AboutMe30Sec with dynamic theme prop */}
            <AboutMe30Sec theme={theme} />
          </div>
        </motion.section>

        {/* Career Timeline Section */}
        <section id="career-section" className={`relative w-full py-16 sm:py-20 transition-colors duration-300 ${
          theme === "light"
            ? "bg-white"
            : "bg-zinc-950/40"
        }`}>
          <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16">
            {/* Render CareerTimeline */}
            <CareerTimeline theme={theme} />
          </div>
        </section>
      </div>

      {/* Creative Approach Section matching attached image */}
      <CreativeApproach />

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
            <div className="lg:col-span-8 flex flex-col items-start">
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

              {/* Design statement from the image */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-white !text-[#ffffff] leading-[1.15] max-w-2xl mb-10">
                Design for those who want to become a better version of themselves.
              </h2>

              {/* Get in touch button from the image */}
              <a
                href="#contact-section"
                onClick={(e) => handleNavClick(e, '#contact-section')}
                className="inline-flex items-center gap-2 bg-white text-[#2563EB] hover:bg-white/90 active:scale-95 transition-all px-7 py-3.5 rounded-full font-sans font-semibold tracking-wide text-sm shadow-xl group cursor-pointer"
              >
                <span className="text-xs">✦</span>
                <span>Get in touch</span>
              </a>
            </div>

            {/* Right part: Explore & Socials columns */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:justify-items-end w-full">
              {/* Explore Column */}
              <div className="flex flex-col gap-3 text-sm lg:min-w-[120px]">
                <span className="text-white font-sans text-xs uppercase tracking-widest mb-2 font-bold">Explore</span>
                <a 
                  href="#hero-section" 
                  onClick={(e) => handleNavClick(e, '#hero-section')} 
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Home
                </a>
                <a 
                  href="#about-section" 
                  onClick={(e) => handleNavClick(e, '#about-section')} 
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  About
                </a>
                <a 
                  href="#career-section" 
                  onClick={(e) => handleNavClick(e, '#career-section')} 
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Career
                </a>
                <a 
                  href="#services-section" 
                  onClick={(e) => handleNavClick(e, '#services-section')} 
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Services
                </a>
                <a 
                  href="#capabilities-section" 
                  onClick={(e) => handleNavClick(e, '#capabilities-section')} 
                  className="text-white hover:text-white/80 transition-colors text-[15px]"
                >
                  Projects
                </a>
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
          <div className="flex justify-between items-end px-6 sm:px-12 lg:px-16 text-[10px] text-white uppercase tracking-widest font-sans mb-2">
            <div>
              <div>2026 ZULHILMI,</div>
              <div>ALL RIGHTS RESERVED</div>
            </div>
            <div className="text-right">
              <a href="#" className="hover:text-white/80 transition-colors block">TERMS</a>
              <a href="#" className="hover:text-white/80 transition-colors block mt-1">PRIVACY POLICY</a>
            </div>
          </div>

          {/* Bottom Giant Typographic Name "ZULHILMI" with perfect edge-to-edge SVG */}
          <div className="w-full overflow-hidden m-0 p-0 block leading-none">
            <svg viewBox="0 0 620 111" className="w-full h-auto m-0 p-0 block select-none translate-y-[2px]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="zulhilmi-gradient" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#zulhilmi-gradient)"
                style={{ letterSpacing: "-0.05em" }}
              >
                ZULHILMI
              </text>
            </svg>
          </div>

        </div>
      </footer>

    </div>
      <FloatingMenu visible={isMobile && showSideMenu} onNavClick={(targetId) => handleNavClick({ preventDefault: () => {} } as any, targetId)} />
    </>
  );
}
