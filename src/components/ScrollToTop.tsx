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

  useEffect(() => {
    const isPageReload = isFirstMountRef.current;
    isFirstMountRef.current = false;
    const isSamePath = prevPathRef.current === pathname;
    prevPathRef.current = pathname;

    // Case 1: Navigating to a Case Study / Project page -> ALWAYS start at 0px top
    if (
      pathname.startsWith("/case-study") ||
      pathname.startsWith("/case-study-project") ||
      pathname.startsWith("/project") ||
      pathname.startsWith("/case-studies")
    ) {
      sessionStorage.removeItem(`scroll_pos_${pathname}`);
      const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
        }
      };

      scrollToTop();
      const timers = [0, 20, 50, 100, 200, 400].map((d) => setTimeout(scrollToTop, d));
      return () => timers.forEach((id) => clearTimeout(id));
    }

    // Case 2: Returning to the Home Page ("/") -> Restore home_scroll_position if available
    if (pathname === "/") {
      const savedHomePos = sessionStorage.getItem("home_scroll_position");
      if (savedHomePos && !hash) {
        const targetY = parseInt(savedHomePos, 10);
        if (!isNaN(targetY) && targetY > 0) {
          const restore = () => {
            window.scrollTo({ top: targetY, left: 0, behavior: "instant" });
            document.documentElement.scrollTop = targetY;
            document.body.scrollTop = targetY;
            if (lenis) {
              lenis.scrollTo(targetY, { immediate: true });
            }
          };

          restore();
          const timers = [0, 20, 50, 100, 200, 350, 500, 800].map((d) => setTimeout(restore, d));
          return () => timers.forEach((id) => clearTimeout(id));
        }
      }

      // If no saved position and not a hash navigation on initial load:
      if (!savedHomePos && !hash && !isSamePath) {
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

    // Case 3: Other routes
    if (!isSamePath && !hash) {
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
  }, [pathname, hash, navType, lenis]);

  return null;
}
