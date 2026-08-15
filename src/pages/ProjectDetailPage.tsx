import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { 
  ArrowLeft, 
  ChevronLeft,
  X,
  Menu,
  Facebook,
  Linkedin,
  Send,
  Smartphone,
  Laptop,
  Layers,
  Box,
  Sun,
  Moon
} from "lucide-react";
import { PORTFOLIO_PROJECTS, CAPABILITIES_DATA } from "../data";
import Lenis from "lenis";
import { FloatingMenu } from "../components/FloatingMenu";
import { useReveal } from "../context/RevealContext";

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
  const lenisRef = useRef<Lenis | null>(null);

  const [headerVisible, setHeaderVisible] = useState(true);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrollReset, setIsScrollReset] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [currentHeroImage, setCurrentHeroImage] = useState<string>("");
  const { triggerReveal } = useReveal();

  const handleNavClick = (e: React.MouseEvent<HTMLElement>, targetSectionId: string) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const rawId = targetSectionId.replace('#', '');
    
    if (rawId === 'capabilities-section' || rawId === 'capabilities') {
      navigate(-1);
      return;
    }
    
    triggerReveal(() => {
      if (rawId === 'hero-section' || rawId === 'hero') {
        navigate('/');
      } else {
        navigate(`/#${rawId}`);
      }
    });
  };

  const project = PORTFOLIO_PROJECTS.find(p => p.id === id || (id === "zenith-cms" && p.id === "ck-lighting"));

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
      setCurrentHeroImage((project.galleryImages && project.galleryImages.length > 0) ? project.galleryImages[0] : project.imageUrl);
    }
  }, [project]);

  const handleRandomizeHeroImage = () => {
    const available = AI_RELATED_IMAGES.filter(img => img !== currentHeroImage);
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
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [id]);

  useEffect(() => {
    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    };

    resetToTop();
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
      
      setShowSideMenu(currentY > 400);
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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 font-sans">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">Project Not Found</h1>
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
      {!isScrollReset && <div className="fixed inset-0 bg-[#0A2947] z-[9999]" />}
      
      {/* Global grain texture for the whole page */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="projectPageNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#projectPageNoise)" />
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
                ? "bg-zinc-950/45 backdrop-blur-md border-b border-white/10 h-14" 
                : "bg-transparent border-b-0 pt-4 md:pt-2.5 lg:pt-4"
            }`}
          >
            <div className="w-full px-6 sm:px-12 lg:px-16 h-14 md:h-12 lg:h-14 flex items-center justify-between">
              {!isMobile ? (
                <LayoutGroup id="header-project-group">
                  {!isHeaderScrolled ? (
                    <>
                      {/* Back Button */}
                      <div className="flex items-center">
                        <motion.button
                          layoutId="header-brand-link-proj"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          onClick={(e) => handleNavClick(e, "#hero-section")}
                          className="group flex items-center gap-1.5 transition-colors duration-300 hover:opacity-85 text-white cursor-pointer"
                        >
                          <span className="font-display font-semibold text-xs md:text-sm lg:text-base tracking-tight text-white">Zuhilmi Nasir</span>
                        </motion.button>
                      </div>

                      {/* Desktop Nav - Capsule */}
                      <motion.nav 
                        layoutId="header-nav-capsule-proj"
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
                          layoutId="header-contact-btn-proj"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          onClick={(e) => handleNavClick(e, "#contact-section")}
                          className="group get-in-touch-btn-hero md:!py-1.5 md:!px-3.5 md:!text-[12px] lg:!py-1.5 lg:!px-4 lg:!text-[14px] whitespace-nowrap cursor-pointer"
                        >
                          {/* Shimmer Effect Wrapper */}
                          <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-0 rounded-[25px] overflow-hidden">
                            {/* Ambient internal cyan glow */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18)_0%,transparent_70%)] animate-[glow-pulse_3s_ease-in-out_infinite]" />
                            
                            {/* Scanning grid sweep light */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent -skew-x-12 animate-[grid-sweep_4s_ease-in-out_infinite]" />
                          </div>
                          <span className="relative z-10 text-[13px] md:text-[11px] lg:text-[13px]">Get In Touch</span>
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    // Scrolled State Capsule
                    <div className="flex items-center justify-center w-full">
                      <motion.div 
                        layoutId="header-nav-capsule-proj"
                        transition={{ type: "spring", stiffness: 380, damping: 35 }}
                        className="flex items-center bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] rounded-full py-1.5 pl-6 pr-2 md:py-1 md:pl-4 md:pr-1 lg:py-2 lg:pl-7 lg:pr-2.5 font-sans transition-all duration-300"
                      >
                        <motion.button
                          layoutId="header-brand-link-proj"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          onClick={(e) => handleNavClick(e, "#hero-section")}
                          className="font-display font-semibold text-xs md:text-sm lg:text-base tracking-tight text-white hover:text-cyan-300 hover:scale-105 transition-all mr-4 md:mr-6 lg:mr-12 flex items-center h-6 cursor-pointer"
                        >
                          ZN
                        </motion.button>

                        <nav className="flex items-center space-x-1 md:space-x-1 lg:space-x-2 text-[11px] md:text-[10.5px] lg:text-[13px] font-normal tracking-normal">
                          <button onClick={(e) => handleNavClick(e, "#about-section")} className="nav-menu-btn nav-btn-white cursor-pointer">
                            <span className="text-[13px] md:text-[11px] lg:text-[13px]">About</span>
                          </button>
                          <button onClick={(e) => handleNavClick(e, "#career-section")} className="nav-menu-btn nav-btn-white cursor-pointer">
                            <span className="text-[13px] md:text-[11px] lg:text-[13px]">Career</span>
                          </button>
                          <button onClick={(e) => handleNavClick(e, "#services-section")} className="nav-menu-btn nav-btn-white cursor-pointer">
                            <span className="text-[13px] md:text-[11px] lg:text-[13px]">Services</span>
                          </button>
                          <button onClick={(e) => handleNavClick(e, "#integration-section")} className="nav-menu-btn nav-btn-white cursor-pointer">
                            <span className="hidden lg:inline text-[13px] md:text-[11px] lg:text-[13px]">Software & AI Solution</span>
                            <span className="inline lg:hidden text-[13px] md:text-[11px] lg:text-[13px]">Software</span>
                          </button>
                          <button onClick={(e) => e.preventDefault()} className="nav-menu-btn active cursor-default">
                            <span className="text-[13px] md:text-[11px] lg:text-[13px]">Projects</span>
                          </button>
                        </nav>

                        {/* Get In Touch Button inside capsule */}
                        <motion.button
                          layoutId="header-contact-btn-proj"
                          transition={{ type: "spring", stiffness: 380, damping: 35 }}
                          onClick={(e) => handleNavClick(e, "#contact-section")}
                          className="ml-6 md:ml-3 lg:ml-6 get-in-touch-btn-dark whitespace-nowrap md:!py-1.5 md:!px-3.5 md:!text-[11px] lg:!py-1.5 lg:!px-4 lg:!text-[13px] cursor-pointer"
                        >
                          <span className="text-[13px] md:text-[11px] lg:text-[13px]">Get In Touch</span>
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
                      onClick={(e) => handleNavClick(e, "#hero-section")}
                      className="font-display font-black text-xl tracking-tighter text-white cursor-pointer"
                    >
                      ZN
                    </button>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-1 cursor-pointer hover:bg-white/10 rounded-lg text-white focus:outline-none"
                    aria-label="Toggle Menu"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-14 bg-[#1a3a5a]/95 backdrop-blur-lg border-b border-white/10 z-40 py-6 px-6 flex flex-col space-y-4 md:hidden text-white shadow-xl"
          >
            <button 
              onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, "#about-section"); }} 
              className="font-sans font-medium text-left text-white hover:text-white pb-2 border-b border-white/5 cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, "#career-section"); }} 
              className="font-sans font-medium text-left text-white hover:text-white pb-2 border-b border-white/5 cursor-pointer"
            >
              Career
            </button>
            <button 
              onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, "#services-section"); }} 
              className="font-sans font-medium text-left text-white hover:text-white pb-2 border-b border-white/5 cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, "#integration-section"); }} 
              className="font-sans font-medium text-left text-white hover:text-white pb-2 border-b border-white/5 cursor-pointer"
            >
              Software & AI Solution
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); }} 
              className="font-sans font-medium text-left text-white/40 pb-2 border-b border-white/5 cursor-default"
            >
              Projects
            </button>
            <button 
              onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, "#contact-section"); }} 
              className="w-full py-3 bg-white text-[#0A2947] rounded-xl font-semibold text-center cursor-pointer"
            >
              Get In Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="relative z-10">
        
        {/* Full-width Hero Header Section with Background Image */}
        <div className="relative w-full h-screen flex items-end overflow-hidden">
          {/* Background Image with elegant overlay to ensure full readability */}
          <div className="absolute inset-0 z-0">
            <img 
              src={currentHeroImage || ((project?.galleryImages && project.galleryImages.length > 0) ? project.galleryImages[0] : (project?.imageUrl || ""))} 
              alt={`${project?.title || "Project"} background`}
              className="w-full h-full object-cover select-none pointer-events-none"
              style={{ objectPosition: project?.objectPosition || "center 30%" }}
              referrerPolicy="no-referrer"
            />
            {/* Elegant overlay: dark gradients for beautiful visual blending and high legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2947] via-[#0A2947]/50 to-black/35" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
          </div>

          {/* Header Content Container */}
          <div className="w-full px-6 sm:px-12 lg:px-16 pb-16 md:pb-24 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-left"
            >
              <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl !text-white tracking-tight leading-none uppercase">
                {project.title}
              </h1>
              <p className="font-sans font-normal text-base sm:text-lg md:text-xl text-white leading-relaxed max-w-4xl pt-1">
                {project.subtitle}
              </p>
            </motion.div>
          </div>
        </div>
        {/* Main Content Area - Light Theme (Replicated from Video) */}
        
        {/* Section 1: Intro */}
        <section className="w-full bg-white text-zinc-900 z-20 sticky top-0 h-screen flex flex-col justify-center">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <h2 className="text-2xl font-medium tracking-tight text-zinc-900">{project.title}</h2>
              </div>
              <div className="md:col-span-8">
                <p className="text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                  {project.summary || "A digital ecosystem that transforms how athletes interact with their performance wear, creating a seamless connection between garment and user through innovative technology."}
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
                <a href={project.links?.[0] || "#"} className="text-2xl font-medium text-zinc-900 hover:text-zinc-600 transition-colors">
                  Visit Live Site
                </a>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-8">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Client</h4>
                  <p className="text-zinc-600 text-sm">{project.client || "Stride Athletics"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Project Type</h4>
                  <p className="text-zinc-600 text-sm">{project.categoryLabel || "Digital Product Design"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Released</h4>
                  <p className="text-zinc-600 text-sm">{project.year || "October 11, 2024"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Technology</h4>
                  <div className="flex flex-col gap-1">
                    {(project.toolsUsed && project.toolsUsed.length > 0) ? project.toolsUsed.map(tool => (
                      <span key={tool} className="text-zinc-600 text-sm">{tool}</span>
                    )) : (
                      <>
                        <span className="text-zinc-600 text-sm">React Native</span>
                        <span className="text-zinc-600 text-sm">Motion Analysis API</span>
                        <span className="text-zinc-600 text-sm">Machine Learning</span>
                        <span className="text-zinc-600 text-sm">Cloud Architecture</span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 mb-2">Timeframe</h4>
                  <p className="text-zinc-600 text-sm">3 months</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Overview (Sticky Left) */}
        <section className="w-full bg-white text-zinc-900 z-40 sticky top-0 h-screen flex flex-col justify-center shadow-2xl">
          <div className="w-full px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4 relative">
                <div>
                  <h2 className="text-2xl font-medium tracking-tight text-zinc-900">Overview</h2>
                </div>
              </div>
              <div className="md:col-span-8 space-y-8 text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p>{project.summary || "Our solution focused on creating an intuitive digital platform that connects with Stride's performance wear, providing real-time insights and personalized recommendations. The challenge was to make complex performance data accessible and actionable for users of all expertise levels."}</p>
                <p>
                  {project.challenge || "Stride Athletics had developed cutting-edge performance wear but lacked the digital interface to unlock its full potential. They needed a digital product that would help athletes understand, customize, and maximize the benefits of their smart athletic wear."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Full-width Images */}
        <div 
          className="relative bg-zinc-900 z-50 w-full" 
          style={{ height: project?.id === "TGPowerWrap" ? "200vh" : undefined }}
        >
           {/* Image 1 */}
           {(() => {
             const img1Src = (project?.galleryImages && project.galleryImages.length > 1) ? project.galleryImages[1] : (project?.imageUrl || "");
             const isLongImage = img1Src.includes('ck2') || img1Src.includes('ck3') || img1Src.includes('ck');
             if (isLongImage) {
               return (
                 <div 
                   className="z-10 w-full"
                   style={{ position: "sticky", bottom: 0 }}
                 >
                   <img 
                     src={img1Src} 
                     alt="Gallery 1"
                     className="w-full h-auto block select-none" 
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
               );
             }
             return (
               <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
                 <img 
                   src={img1Src} 
                   alt="Gallery 1"
                   className="w-full h-full object-cover" 
                   referrerPolicy="no-referrer"
                 />
               </div>
             );
           })()}

           {/* Image 2 - Specific for TG PowerWrap Website (TGPowerWrap) */}
           {project?.id === "TGPowerWrap" && (
             <div className="sticky top-0 h-screen w-full overflow-hidden z-20 bg-zinc-900">
               <img 
                 src="/Images/TGPW Visual Guideline.jpg" 
                 alt="TGPW Visual Guideline"
                 className="w-full h-full object-cover" 
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
                  <h2 className="text-2xl font-medium tracking-tight text-zinc-900">The Challenge</h2>
                </div>
              </div>
              <div className="md:col-span-8 space-y-6 text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p className="mb-6">{project.challenge || "Athletes struggled to interpret and act on the data their smart clothing collected. Existing apps in the market were either too complex for casual users or too simplified for professional athletes. The gap between advanced garment technology and user-friendly digital interfaces was limiting the potential of smart athletic wear."}</p>
              </div>
            </div>
            
            {/* Gallery Part */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
              <div className="md:col-span-6 h-[400px] sm:h-[600px] lg:h-[800px]">
                <img 
                  src={(project?.id === "TGPowerWrap") ? "/Images/TGPW Mobile.jpg" : (project?.id === "ck-lighting" || project?.id === "zenith-cms") ? "/CK Lighting Web/ck5.jpg" : ((project?.galleryImages && project.galleryImages.length > 2) ? project.galleryImages[2] : (project?.imageUrl || ""))} 
                  className="w-full h-full object-cover" 
                  alt={`${project?.title || "Gallery"} 3`}
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
                  src={(project?.id === "TGPowerWrap") ? "/Images/Thumbnail Mobile TGPW.jpg" : ((project?.galleryImages && project.galleryImages.length > 3) ? project.galleryImages[3] : (project?.imageUrl || ""))} 
                  className="w-full flex-1 object-cover min-h-0" 
                  alt={`${project?.title || "Gallery"} 4`}
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
                  src={(project?.id === "TGPowerWrap") ? "/Images/5.jpg" : ((project?.galleryImages && project.galleryImages.length > 5) ? project.galleryImages[5] : ((project?.galleryImages && project.galleryImages.length > 4) ? project.galleryImages[4] : (project?.imageUrl || "")))} 
                  className="w-full flex-1 object-cover min-h-0" 
                  alt={`${project?.title || "Gallery"} 5`}
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

            {/* The Solution / User Flow */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-12 md:pt-20 lg:pt-24 pb-6 md:pb-10">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-medium tracking-tight text-zinc-900">User Flow</h3>
              </div>
              <div className="md:col-span-8 space-y-6 text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p>
                  {project.solution || "The digital product needed to handle complex data streams from advanced garment technology and user-friendly digital interfaces was limiting the potential of smart athletic wear."}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Section 6: Additional 2 Sticky Full-width Images */}
        <div className="relative bg-zinc-900 z-50 w-full" style={{ height: "200vh" }}>
           {/* Image 1 */}
           <div className="sticky top-0 h-screen w-full overflow-hidden">
             <img 
               src={(project.galleryImages && project.galleryImages.length > 4) ? project.galleryImages[4] : "/Images/TGPW Site Map.jpg"} 
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
        <div className="w-full bg-white text-zinc-900 z-50 relative py-16 md:py-24 lg:py-32">
          <div className="w-full px-6 sm:px-12 lg:px-16 space-y-16 md:space-y-24">
            {/* The Solution */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4">
                <h3 className="text-2xl font-medium tracking-tight text-zinc-900">The Solution</h3>
              </div>
              <div className="md:col-span-8 space-y-6 text-2xl md:text-3xl font-light leading-snug text-zinc-700">
                <p className="mb-4">
                  {project.solution || "The digital product needed to handle complex data streams from advanced garment technology and user-friendly digital interfaces was limiting the potential of smart athletic wear."}
                </p>
              </div>
            </div>

            {/* Key Results */}
            {project.results && project.results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 pt-12 md:pt-16 lg:pt-20">
                <div className="md:col-span-4">
                  <h3 className="text-2xl font-medium tracking-tight text-zinc-900">Key Results</h3>
                </div>
                <div className="md:col-span-8">
                  <ul className="grid grid-cols-1 gap-6">
                    {project.results.map((result, idx) => (
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
        <div className="w-full bg-white relative z-40 py-16 md:py-24 px-6 sm:px-12 lg:px-16">
          <div className="w-full space-y-6 md:space-y-8">
            <div className="space-y-2">
              <h4 className="font-sans font-medium text-2xl tracking-tight text-zinc-900 uppercase">
                Related Capabilities
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
              {CAPABILITIES_DATA.slice(0, 2).map((relatedCap) => (
                <Link
                  key={relatedCap.id}
                  to={`/case-study/${relatedCap.id}`}
                  className="group bg-transparent p-0 transition-all duration-300 h-full flex flex-col justify-between cursor-pointer block"
                >
                  <div className="space-y-3">
                    {/* Photo area */}
                    <div className="aspect-[16/10] rounded-xl overflow-hidden relative border bg-zinc-100 border-zinc-200">
                      <img 
                        src={relatedCap.image} 
                        alt={relatedCap.title}
                        className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 transition-all duration-700 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Title at below left side */}
                    <div className="text-left pt-1">
                      <h5 className="font-sans font-medium text-lg sm:text-xl text-zinc-900 group-hover:text-zinc-600 transition-colors">
                        {relatedCap.title}
                      </h5>
                      {relatedCap.subtitle && (
                        <p className="text-xs text-zinc-500 font-sans mt-0.5 line-clamp-1">
                          {relatedCap.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Floating back button */}
      <FloatingMenu visible={showSideMenu} theme="dark" onNavClick={(targetId) => handleNavClick({ preventDefault: () => {} } as any, targetId)} />

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

              {/* Design statement from the image */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-medium tracking-tight text-white !text-[#ffffff] leading-[1.15] max-w-2xl mb-10">
                Design for those who want to become a better version of themselves.
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
              <a href="#" className="hover:text-white/80 transition-colors block">TERMS</a>
              <a href="#" className="hover:text-white/80 transition-colors block mt-1">PRIVACY POLICY</a>
            </div>
          </div>

          {/* Bottom Giant Typographic Name "ZULHILMI" with perfect edge-to-edge SVG */}
          <div className="w-full overflow-hidden m-0 p-0 block leading-none">
            <svg viewBox="0 0 620 111" className="w-full h-auto m-0 p-0 block select-none translate-y-[2px]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="zulhilmi-gradient-proj" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#zulhilmi-gradient-proj)"
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
