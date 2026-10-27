import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { useLenis } from "lenis/react";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();
  const lenis = useLenis();
  const prevPathRef = useRef<string | null>(null);

  // Keep sessionStorage in sync with the current route
  useEffect(() => {
    sessionStorage.setItem("last_active_route", pathname);
  }, [pathname]);

  useEffect(() => {
    const isSamePath = prevPathRef.current === pathname;
    prevPathRef.current = pathname;

    // HomePage ("/") coordinates its own initial load, hash scroll, and saved scroll restoration
    // directly with its intro loading screen so we avoid duplicate competing timers here.
    if (pathname === "/") {
      return;
    }

    let userInteracted = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const cancelPendingTimers = () => {
      userInteracted = true;
      timers.forEach((id) => clearTimeout(id));
      timers.length = 0;
    };

    window.addEventListener("wheel", cancelPendingTimers, { passive: true, once: true });
    window.addEventListener("touchstart", cancelPendingTimers, { passive: true, once: true });
    window.addEventListener("pointerdown", cancelPendingTimers, { passive: true, once: true });
    window.addEventListener("keydown", cancelPendingTimers, { passive: true, once: true });

    const cleanupListeners = () => {
      window.removeEventListener("wheel", cancelPendingTimers);
      window.removeEventListener("touchstart", cancelPendingTimers);
      window.removeEventListener("pointerdown", cancelPendingTimers);
      window.removeEventListener("keydown", cancelPendingTimers);
      timers.forEach((id) => clearTimeout(id));
    };

    // Case 1: Navigating to a Case Study / Project page -> start cleanly at 0px top
    if (
      pathname.startsWith("/case-study") ||
      pathname.startsWith("/case-study-project") ||
      pathname.startsWith("/project") ||
      pathname.startsWith("/case-studies")
    ) {
      sessionStorage.removeItem(`scroll_pos_${pathname}`);
      const scrollToTop = () => {
        if (userInteracted) return;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (lenis) {
          lenis.resize();
          lenis.scrollTo(0, { immediate: true });
        }
      };

      scrollToTop();
      [16, 60].forEach((d) => timers.push(setTimeout(scrollToTop, d)));
      return cleanupListeners;
    }

    // Case 2: Other routes without hash
    if (!isSamePath && !hash) {
      const scrollToTop = () => {
        if (userInteracted) return;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (lenis) {
          lenis.resize();
          lenis.scrollTo(0, { immediate: true });
        }
      };

      scrollToTop();
      [16, 60].forEach((d) => timers.push(setTimeout(scrollToTop, d)));
      return cleanupListeners;
    }

    // Case 3: Non-home navigation with a hash
    if (hash) {
      const targetId = hash.replace("#", "");
      const scrollToHash = () => {
        if (userInteracted) return;
        const el = document.getElementById(targetId);
        if (el) {
          const targetY = el.getBoundingClientRect().top + window.scrollY;
          if (lenis) {
            lenis.resize();
            lenis.scrollTo(targetY, {
              duration: 1.15,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
        }
      };
      timers.push(setTimeout(scrollToHash, 120));
      return cleanupListeners;
    }

    return cleanupListeners;
  }, [pathname, hash, navType, lenis]);

  return null;
}
