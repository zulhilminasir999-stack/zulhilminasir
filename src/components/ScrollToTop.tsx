import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { useLenis } from "lenis/react";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();
  const lenis = useLenis();
  const prevPathRef = useRef<string | null>(null);
  const isFirstMountRef = useRef(true);

  // Keep sessionStorage in sync with the current route
  useEffect(() => {
    sessionStorage.setItem("last_active_route", pathname);
  }, [pathname]);

  // Continuously record scroll position per route for desktop views
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        // Mobile does not persist scroll position across refreshes
        return;
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem(`scroll_pos_${pathname}`, window.scrollY.toString());
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [pathname]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isPageReload = isFirstMountRef.current;
    isFirstMountRef.current = false;
    const isSamePath = prevPathRef.current === pathname;
    prevPathRef.current = pathname;

    if (isMobile) {
      // MOBILE: On refresh or route change, always reset position to the top of the page
      const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }
      };

      scrollToTop();
      const timers = [0, 50, 100, 200, 400, 700].map((d) => setTimeout(scrollToTop, d));
      return () => timers.forEach((id) => clearTimeout(id));
    } else {
      // DESKTOP:
      // On page refresh / reload: restore previous scroll position on that exact route
      if (isPageReload) {
        const savedPos = sessionStorage.getItem(`scroll_pos_${pathname}`);
        if (savedPos) {
          const targetY = parseInt(savedPos, 10);
          if (!isNaN(targetY) && targetY > 0) {
            const restoreScroll = () => {
              window.scrollTo({ top: targetY, left: 0, behavior: "instant" });
              document.documentElement.scrollTop = targetY;
              document.body.scrollTop = targetY;
              if (lenis) {
                lenis.scrollTo(targetY, { immediate: true });
              }
            };

            restoreScroll();
            const timers = [0, 50, 100, 200, 400, 700, 1200].map((d) => setTimeout(restoreScroll, d));
            return () => timers.forEach((id) => clearTimeout(id));
          }
        }
      }

      // If user navigated to a different page via link (not a page refresh) and there's no hash:
      if (!isPageReload && !isSamePath && !hash) {
        const scrollToTop = () => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          }
        };

        scrollToTop();
        const timers = [0, 50, 100, 200].map((d) => setTimeout(scrollToTop, d));
        return () => timers.forEach((id) => clearTimeout(id));
      }
    }
  }, [pathname, hash, navType, lenis]);

  return null;
}
