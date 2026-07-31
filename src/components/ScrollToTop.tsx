import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, skip scroll-to-top to maintain position or use hash navigation
    if (hash) return;

    // If we are returning to "/" and have a saved scroll position, do not scroll to top
    if (pathname === "/" && sessionStorage.getItem("home_scroll_position")) {
      return;
    }

    // Disable browser default scroll restoration to prevent jumping
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force scroll to top immediately on path change
    const handleScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Also try to find any scrollable containers that might be stuck
      const scrollables = document.querySelectorAll('.overflow-y-auto, .overflow-auto');
      scrollables.forEach(el => {
        el.scrollTop = 0;
      });
    };

    handleScroll();
    
    // Multiple attempts to ensure we override any late-initializing scroll libraries or browser behavior
    const timeoutIds = [0, 50, 100, 200, 500].map(delay => 
      setTimeout(handleScroll, delay)
    );

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [pathname, hash]);

  return null;
}
