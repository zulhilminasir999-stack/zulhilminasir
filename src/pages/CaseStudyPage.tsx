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
  Menu,
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
import Lenis from "lenis";
import { FloatingMenu } from "../components/FloatingMenu";
import { useReveal } from "../context/RevealContext";
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
  const lenisRef = useRef<Lenis | null>(null);

  const [headerVisible, setHeaderVisible] = useState(true);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrollReset, setIsScrollReset] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [randomImage, setRandomImage] = useState<string>("");
  const [localTime, setLocalTime] = useState("");
  const { triggerReveal } = useReveal();

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, targetSectionId: string) => {
    if (e && e.preventDefault) e.preventDefault();
    
    // Prevent navigating to Projects from Case Study page since we are already viewing a project
    if (targetSectionId === '#capabilities-section' || targetSectionId === 'capabilities') {
      return;
    }
    
    triggerReveal(() => {
      const rawId = targetSectionId.replace('#', '');
      if (rawId === 'hero-section' || rawId === 'hero') {
        navigate('/');
      } else {
        navigate(`/#${rawId}`);
      }
    });
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
    // Immediate and aggressive scroll reset before paint
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [id]);

  useEffect(() => {
    // Persistent scroll reset to handle late-loading content or Lenis initialization
    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    };

    resetToTop();
    // Exponentially spaced attempts to catch any race conditions
    const timers = [0, 20, 50, 100, 200, 400, 800, 1500].map(d => setTimeout(resetToTop, d));
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true
    });
    
    lenisRef.current = lenis;
    (window as any).lenisInstance = lenis;
    lenis.scrollTo(0, { immediate: true });
    
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    
    rafId = requestAnimationFrame(raf);

    let prevY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      
      // Toggle side menu visibility based on scroll depth
      setShowSideMenu(currentY > 400);

      // Determine if scrolled beyond top area
      setIsHeaderScrolled(currentY >= 80);

      const delta = currentY - prevY;

      if (currentY < 80) {
        setHeaderVisible(true);
        setIsScrollingUp(true);
        prevY = currentY;
      } else {
        if (delta > 2) {
          setHeaderVisible(false);
          setIsScrollingUp(false);
          prevY = currentY;
        } else if (delta < -2) {
          setHeaderVisible(true);
          setIsScrollingUp(true);
          prevY = currentY;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Give a small timed delay of 120ms behind the white cover to guarantee completely flash-free transition at top
    const revealTimer = setTimeout(() => {
      setIsScrollReset(true);
    }, 120);
    
    return () => {
      cancelAnimationFrame(rafId);
      timers.forEach(t => clearTimeout(t));
      clearTimeout(revealTimer);
      if ((window as any).lenisInstance === lenis) {
        (window as any).lenisInstance = null;
      }
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

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
              {!isMobile ? (
                <LayoutGroup id="header-casestudy-group">
                  {!isHeaderScrolled ? (
                    <>
                      {/* Back Button */}
                      <div className="flex items-center">
                        <motion.button
                          layoutId="header-brand-link"
                          initial={{ x: -40, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 150, damping: 18 }}
                          onClick={(e) => handleNavClick(e, "#hero-section")}
                          className="group flex items-center gap-1.5 transition-colors duration-300 hover:opacity-85 text-white cursor-pointer"
                        >
                          <span className="font-display font-semibold text-xs md:text-sm lg:text-base tracking-tight text-white">Zuhilmi Nasir</span>
                        </motion.button>
                      </div>

                      {/* Desktop Nav - Capsule */}
                      <motion.nav 
                        layoutId="header-nav-capsule"
                        transition={{ type: "spring", stiffness: 380, damping: 35 }}
                        className="flex items-center bg-transparent border border-transparent rounded-full py-1.5 px-3 md:py-1.5 md:px-2 lg:py-2 lg:px-4 space-x-1 md:space-x-1 lg:space-x-2 text-[11px] md:text-[10px] lg:text-[14px] font-normal tracking-normal font-sans text-white transition-all duration-300 shadow-none"
                      >
                        <button onClick={(e) => handleNavClick(e, "#about-section")} className="nav-menu-btn-dark-theme cursor-pointer">
                          <span className="text-[16px] md:text-[13px] lg:text-[16px]">About</span>
                        </button>
                        <button onClick={(e) => handleNavClick(e, "#career-section")} className="nav-menu-btn-dark-theme cursor-pointer">
                          <span className="text-[16px] md:text-[13px] lg:text-[16px]">Career</span>
                        </button>
                        <button onClick={(e) => handleNavClick(e, "#services-section")} className="nav-menu-btn-dark-theme cursor-pointer">
                          <span className="text-[16px] md:text-[13px] lg:text-[16px]">Services</span>
                        </button>
                        <button onClick={(e) => handleNavClick(e, "#integration-section")} className="nav-menu-btn-dark-theme cursor-pointer">
                          <span className="hidden lg:inline text-[16px] md:text-[13px] lg:text-[16px]">Software & AI Solution</span>
                          <span className="inline lg:hidden text-[16px] md:text-[13px] lg:text-[16px]">Software</span>
                        </button>
                        <button onClick={(e) => e.preventDefault()} className="nav-menu-btn-dark-theme active cursor-default">
                          <span className="text-[16px] md:text-[13px] lg:text-[16px]">Projects</span>
                        </button>
                      </motion.nav>

                      {/* Get In Touch Button */}
                      <div className="flex items-center">
                        <motion.button
                              layoutId="header-contact-btn"
                              transition={{ 
                                type: "spring", 
                                stiffness: 140, 
                                damping: 20,
                                mass: 1,
                                opacity: { duration: 0.3 }
                              }}
                              onClick={(e) => handleNavClick(e, "#contact-section")}
                              className="group get-in-touch-btn-hero md:!py-1.5 md:!px-3.5 md:!text-[13px] lg:!py-1.5 lg:!px-4 lg:!text-[15px] whitespace-nowrap cursor-pointer"
                            >
                              {/* Shimmer Effect Wrapper */}
                              <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0 rounded-[25px] overflow-hidden">
                                {/* Ambient internal cyan glow */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18)_0%,transparent_70%)] animate-[glow-pulse_3s_ease-in-out_infinite]" />
                                
                                {/* Scanning grid sweep light */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -skew-x-12 animate-[grid-sweep_4s_ease-in-out_infinite]" />
                              </div>
                              <span className="relative z-10 text-[15px] md:text-[13px] lg:text-[15px] font-medium">Get In Touch</span>
                            </motion.button>
                      </div>
                    </>
                  ) : (
                    // Scrolled State Capsule
                    <div className="flex items-center justify-center w-full">
                      <motion.div 
                        layoutId="header-nav-capsule"
                        transition={{ type: "spring", stiffness: 380, damping: 35 }}
                        className="flex items-center bg-white/30 border border-white/20 rounded-full py-1.5 pl-6 pr-2 md:py-1 md:pl-4 md:pr-1 lg:py-2 lg:pl-7 lg:pr-2.5 font-sans transition-all duration-300 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.4)] backdrop-blur-md"
                      >
                        <motion.button
                          layoutId="header-brand-link"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          onClick={(e) => handleNavClick(e, "#hero-section")}
                          className="font-display font-semibold text-xs md:text-sm lg:text-base tracking-tight text-[#0A2947] hover:scale-105 transition-all mr-4 md:mr-6 lg:mr-12 flex items-center h-6 cursor-pointer"
                        >
                          ZN
                        </motion.button>

                        <nav className="flex items-center space-x-1 md:space-x-1 lg:space-x-2 text-[11px] md:text-[10.5px] lg:text-[13px] font-normal tracking-normal text-black">
                          <button onClick={(e) => handleNavClick(e, "#about-section")} className="nav-menu-btn cursor-pointer">
                            <span className="text-[13px] md:text-[11px] lg:text-[13px]">About</span>
                          </button>
                          <button onClick={(e) => handleNavClick(e, "#career-section")} className="nav-menu-btn cursor-pointer">
                            <span className="text-[13px] md:text-[11px] lg:text-[13px]">Career</span>
                          </button>
                          <button onClick={(e) => handleNavClick(e, "#services-section")} className="nav-menu-btn cursor-pointer">
                            <span className="text-[13px] md:text-[11px] lg:text-[13px]">Services</span>
                          </button>
                          <button onClick={(e) => handleNavClick(e, "#integration-section")} className="nav-menu-btn cursor-pointer">
                            <span className="hidden lg:inline text-[13px] md:text-[11px] lg:text-[13px]">Software & AI Solution</span>
                            <span className="inline lg:hidden text-[13px] md:text-[11px] lg:text-[13px]">Software</span>
                          </button>
                          <button onClick={(e) => e.preventDefault()} className="nav-menu-btn active cursor-default">
                            <span className="text-[13px] md:text-[11px] lg:text-[13px]">Projects</span>
                          </button>
                        </nav>

                         {/* Get In Touch Button inside capsule */}
                         <motion.div
                           className="ml-6 md:ml-3 lg:ml-6 flex items-center h-10"
                         >
                           <motion.button
                             layoutId="header-contact-btn"
                             transition={{ 
                               type: "spring", 
                               stiffness: 140, 
                               damping: 20,
                               mass: 1,
                               opacity: { duration: 0.3 }
                             }}
                             onClick={(e) => handleNavClick(e, "#contact-section")}
                             className="get-in-touch-btn whitespace-nowrap md:!py-1.5 md:!px-3.5 md:!text-[11px] lg:!py-1.5 lg:!px-4 lg:!text-[13px] cursor-pointer"
                           >
                             <span className="text-[13px] md:text-[11px] lg:text-[13px]">Get In Touch</span>
                           </motion.button>
                         </motion.div>
                      </motion.div>
                    </div>
                  )}
                </LayoutGroup>
              ) : (
                // Mobile View
                <>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => handleNavClick(e, "#hero-section")}
                      className="font-display font-semibold text-base tracking-tight text-white flex items-center h-6 cursor-pointer"
                    >
                      ZN
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="h-9 w-9 flex items-center justify-center text-white/90 focus:outline-none"
                    >
                      {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-6 w-6" />}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-6 sm:px-10"
          >
            <nav className="flex flex-col space-y-6">
              {[
                { label: "About", href: "#about-section" },
                { label: "Career", href: "#career-section" },
                { label: "Services", href: "#services-section" },
                { label: "Software & AI Solutions", href: "#integration-section" },
                { label: "Projects", href: "#capabilities-section" },
                { label: "Contact", href: "#contact-section" },
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={(e) => {
                    if (link.label === "Projects") {
                      e.preventDefault();
                      return;
                    }
                    setIsMobileMenuOpen(false);
                    handleNavClick(e, link.href);
                  }}
                  className={`text-3xl font-medium text-left ${link.label === "Projects" ? "text-white/40 cursor-default" : "text-white/90 hover:text-white transition-colors cursor-pointer"}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="relative z-10">
        
        {/* Full-width Hero Header Section with Background Image */}
        <div className="relative w-full h-screen flex items-end overflow-hidden mb-4">
          {/* Background Image with elegant overlay to ensure full readability */}
          <div className="absolute inset-0 z-0">
            <img 
              src={randomImage || capability.image} 
              alt={`${capability.title} background`}
              className="w-full h-full object-cover select-none pointer-events-none"
              style={{ objectPosition: "center 30%" }}
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay: dark gradients for beautiful visual blending and high legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2947] via-[#0A2947]/50 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          </div>

          {/* Header Content Container */}
          <div className="w-full px-6 sm:px-12 lg:px-16 pb-6 md:pb-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-left pb-6"
            >
              <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl !text-white tracking-tight leading-none uppercase">
                {capability.title}
              </h1>
              <p className="font-sans font-normal text-base sm:text-lg md:text-xl text-white leading-relaxed max-w-4xl pt-1">
                {capability.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
        {/* Main Content Area - Light Theme */}
        
        {/* Section 1: Intro */}
        <section className="w-full bg-white text-zinc-900 z-20 sticky top-0 h-screen flex flex-col justify-center">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
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
        <section className="w-full bg-zinc-50/95 backdrop-blur-md text-zinc-900 z-30 sticky top-0 h-screen flex flex-col justify-center shadow-2xl">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <span className="text-2xl font-medium text-zinc-900 hover:text-zinc-600 transition-colors cursor-pointer" onClick={randomizePhoto}>
                  Cycle Designs
                </span>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Practice</h4>
                  <p className="text-zinc-600 text-sm">{capability.categoryLabel}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Focus Area</h4>
                  <p className="text-zinc-600 text-sm">{capability.title}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Released</h4>
                  <p className="text-zinc-600 text-sm">Active</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Technology & Stack</h4>
                  <div className="flex flex-col gap-1">
                    {capability.toolsUsed.map(tool => (
                      <span key={tool} className="text-zinc-600 text-sm">{tool}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Scope</h4>
                  <p className="text-zinc-600 text-sm">Full-scale Implementation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Overview */}
        <section className="w-full bg-white text-zinc-900 z-40 sticky top-0 h-screen flex flex-col justify-center shadow-2xl">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4 relative">
                <div>
                  <span className="text-sm text-zinc-400 mb-1 block">{capability.title}</span>
                  <h2 className="text-4xl font-medium tracking-tight text-zinc-900">Overview</h2>
                </div>
              </div>
              <div className="md:col-span-8 space-y-8 text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p>{capability.summary}</p>
                <p>{capability.challenge}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Full-width Images (Sticky Stacking) */}
        <div className="relative bg-zinc-900 z-50 w-full" style={{ height: "300vh" }}>
           {/* Image 1 */}
           <div className="sticky top-0 h-screen w-full overflow-hidden">
             <img 
               src={galleryImages[0]} 
               alt="Gallery 1"
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
             />
           </div>
           {/* Image 2 */}
           <div className="sticky top-0 h-screen w-full overflow-hidden">
             <img 
               src={galleryImages[1]} 
               alt="Gallery 2"
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
               onError={(e) => {
                 const img = e.currentTarget;
                 if (img.src.includes('.jpg')) {
                   img.src = img.src.replace('.jpg', '.jpj');
                 } else if (img.src.includes('.jpj')) {
                   img.src = img.src.replace('.jpj', '.jpg');
                 }
               }}
             />
           </div>
           {/* Image 3 */}
           <div className="sticky top-0 h-screen w-full overflow-hidden">
             <img 
               src={galleryImages[2] || "/Images/Thumbnail Mobile TGPW.jpg"} 
               alt="Gallery 3"
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
               onError={(e) => {
                 const img = e.currentTarget;
                 if (img.src.includes('.jpg')) {
                   img.src = img.src.replace('.jpg', '.jpj');
                 } else if (img.src.includes('.jpj')) {
                   img.src = img.src.replace('.jpj', '.jpg');
                 }
               }}
             />
           </div>
        </div>

        {/* Section 5: The Challenge */}
        <div className="w-full bg-white text-zinc-900 z-50 relative py-8 md:py-10">
          <div className="w-full px-6 sm:px-12 lg:px-16 space-y-8 md:space-y-10">
             <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
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
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
              <div className="md:col-span-6 h-[400px] sm:h-[600px] lg:h-[800px]">
                <img 
                  src="/Images/TGPW Mobile.jpg" 
                  className="w-full h-full object-cover" 
                  alt="Gallery 3"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes('.jpg')) {
                      img.src = img.src.replace('.jpg', '.jpj');
                    } else if (img.src.includes('.jpj')) {
                      img.src = img.src.replace('.jpj', '.jpg');
                    }
                  }}
                />
              </div>
              <div className="md:col-span-6 flex flex-col gap-4 lg:gap-6 h-[400px] sm:h-[600px] lg:h-[800px]">
                <img 
                  src="/Images/4.jpg" 
                  className="w-full flex-1 object-cover min-h-0" 
                  alt="Gallery 4"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes('.jpg')) {
                      img.src = img.src.replace('.jpg', '.jpj');
                    } else if (img.src.includes('.jpj')) {
                      img.src = img.src.replace('.jpj', '.jpg');
                    }
                  }}
                />
                <img 
                  src="/Images/Thumbnail Mobile TGPW2.jpg" 
                  className="w-full flex-1 object-cover min-h-0" 
                  alt="Gallery 5"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src.includes('.jpg')) {
                      img.src = img.src.replace('.jpg', '.jpj');
                    } else if (img.src.includes('.jpj')) {
                      img.src = img.src.replace('.jpj', '.jpg');
                    }
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Section 6: Additional 2 Sticky Full-width Images */}
        <div className="relative bg-zinc-900 z-50 w-full" style={{ height: "200vh" }}>
           {/* Image 1 */}
           <div className="sticky top-0 h-screen w-full overflow-hidden">
             <img 
               src={galleryImages[4] || "/Images/TGPW Site Map.jpg"} 
               alt="Gallery Sticky 1"
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
               onError={(e) => {
                 const img = e.currentTarget;
                 if (img.src.includes('.jpg')) {
                   img.src = img.src.replace('.jpg', '.jpj');
                 } else if (img.src.includes('.jpj')) {
                   img.src = img.src.replace('.jpj', '.jpg');
                 }
               }}
             />
           </div>
           {/* Image 2 */}
           <div className="sticky top-0 h-screen w-full overflow-hidden">
             <img 
               src="/Images/Ipad Pro Mockup On Rock.jpg" 
               alt="Gallery Sticky 2"
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
               onError={(e) => {
                 const img = e.currentTarget;
                 if (img.src.includes('.jpg')) {
                   img.src = img.src.replace('.jpg', '.jpj');
                 } else if (img.src.includes('.jpj')) {
                   img.src = img.src.replace('.jpj', '.jpg');
                 }
               }}
             />
           </div>
        </div>

        {/* Section 7: The Solution & Key Results (After Sticky Images) */}
        <div className="w-full bg-white text-zinc-900 z-50 relative py-8 md:py-10">
          <div className="w-full px-6 sm:px-12 lg:px-16 space-y-8 md:space-y-10">
            {/* The Solution */}
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

            {/* Key Results */}
            {capability.results && capability.results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-8 md:pt-10 border-t border-zinc-200">
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
            )}
          </div>
        </div>

        {/* Related Capabilities block (Below Sticky Images) */}
        <div className="w-full bg-white relative z-40 py-8 md:py-10 px-6 sm:px-12 lg:px-16">
          <div className="w-full space-y-6 md:space-y-8">
            <div className="space-y-2">
              <h4 className="font-sans font-medium text-2xl sm:text-3xl tracking-tight text-zinc-900 uppercase">
                Related Capabilities
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
              {(() => {
                const related = CAPABILITIES_DATA.filter((cap) => cap.id !== capability.id);
                return related.slice(0, 2).map((relatedCap) => (
                  <Link
                    key={relatedCap.id}
                    to={`/case-study/${relatedCap.id}`}
                    className="group border border-zinc-100 bg-zinc-50 hover:bg-zinc-100/55 rounded-2xl p-5 transition-all duration-300 h-full flex flex-col justify-between cursor-pointer block shadow-sm hover:shadow-md"
                  >
                    <div className="space-y-4">
                      {/* Photo area */}
                      <div className="aspect-[16/10] rounded-xl overflow-hidden relative border bg-zinc-100 border-zinc-200">
                        <img 
                          src={relatedCap.image} 
                          alt={relatedCap.title}
                          className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Text descriptions */}
                      <div className="space-y-1 text-left">
                        <h5 className="font-sans font-bold text-lg text-zinc-900 group-hover:text-zinc-600 transition-colors uppercase leading-snug">
                          {relatedCap.title}
                        </h5>
                        <p className="font-sans text-xs text-zinc-500 line-clamp-2">
                          {relatedCap.subtitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                ));
              })()}
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="relative overflow-hidden bg-[#0A2947] text-white pt-24 pb-0">
        {/* Grain texture in the background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.12] mix-blend-overlay">
          <svg viewBox="0 0 250 250" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <div className="relative z-10 w-full mx-auto select-none">
          {/* Top content wrapper with margins */}
          <div className="px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-24">
            
            {/* Left part: Time, Title and pill button */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              {/* Dynamic local time */}
              <div className="text-xs text-white/50 flex items-center gap-2 mb-8 tracking-wider uppercase font-mono">
                {localTime && parseInt(localTime.split(":")[0], 10) >= 6 && parseInt(localTime.split(":")[0], 10) < 18 ? (
                  <Sun className="h-4 w-4 text-white/60" />
                ) : (
                  <Moon className="h-4 w-4 text-white/60" />
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
              <button
                onClick={(e) => handleNavClick(e, "#contact-section")}
                className="inline-flex items-center gap-2 bg-white text-[#0A2947] hover:bg-white/90 active:scale-95 transition-all px-7 py-3.5 rounded-full font-sans font-semibold tracking-wide text-sm shadow-xl group cursor-pointer"
              >
                <span className="text-xs">✦</span>
                <span>Get in touch</span>
              </button>
            </div>

            {/* Right part: Explore & Socials columns */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-8 lg:justify-items-end w-full text-left">
              {/* Explore Column */}
              <div className="flex flex-col gap-3 text-sm lg:min-w-[120px]">
                <span className="text-white/30 font-mono text-xs uppercase tracking-widest mb-2 font-bold">Explore</span>
                <button 
                  onClick={(e) => handleNavClick(e, "#hero-section")}
                  className="text-white/70 hover:text-white transition-colors text-[15px] text-left cursor-pointer"
                >
                  Home
                </button>
                <button 
                  onClick={(e) => handleNavClick(e, "#about-section")} 
                  className="text-white/70 hover:text-white transition-colors text-[15px] text-left cursor-pointer"
                >
                  About
                </button>
                <button 
                  onClick={(e) => handleNavClick(e, "#career-section")} 
                  className="text-white/70 hover:text-white transition-colors text-[15px] text-left cursor-pointer"
                >
                  Career
                </button>
                <button 
                  onClick={(e) => handleNavClick(e, "#services-section")} 
                  className="text-white/70 hover:text-white transition-colors text-[15px] text-left cursor-pointer"
                >
                  Services
                </button>
                <button 
                  onClick={(e) => handleNavClick(e, "#capabilities-section")} 
                  className="text-white/40 text-[15px] text-left cursor-default"
                >
                  Projects
                </button>
              </div>

              {/* Socials Column */}
              <div className="flex flex-col gap-3 text-sm lg:min-w-[120px]">
                <span className="text-white/30 font-mono text-xs uppercase tracking-widest mb-2 font-bold">Socials</span>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors text-[15px]"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors text-[15px]"
                >
                  Facebook
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors text-[15px]"
                >
                  The X
                </a>
                <a 
                  href="https://t.me" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/70 hover:text-white transition-colors text-[15px]"
                >
                  Telegram
                </a>
              </div>
            </div>

          </div>

          {/* Metadata Row */}
          <div className="flex justify-between items-end px-6 sm:px-12 lg:px-16 text-[10px] text-white/30 uppercase tracking-widest font-mono mb-2 text-left">
            <div>
              <div>2026 ZULHILMI,</div>
              <div>ALL RIGHTS RESERVED</div>
            </div>
            <div className="text-right">
              <a href="#" className="hover:text-white transition-colors block">TERMS</a>
              <a href="#" className="hover:text-white transition-colors block mt-1">PRIVACY POLICY</a>
            </div>
          </div>

          {/* Bottom Giant Typographic Name "ZULHILMI" with perfect edge-to-edge SVG */}
          <div className="w-full overflow-hidden m-0 p-0 block leading-none">
            <svg viewBox="0 0 620 111" className="w-full h-auto m-0 p-0 block select-none translate-y-[2px]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="zulhilmi-gradient-case" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0A2947" />
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
      <FloatingMenu visible={showSideMenu} theme="dark" onNavClick={(targetId) => handleNavClick({ preventDefault: () => {} } as any, targetId)} />
    </div>
  );
}
