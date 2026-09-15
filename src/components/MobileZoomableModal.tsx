import React, { useState, useRef, useEffect } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";

interface MobileZoomableModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
}

export const MobileZoomableModal: React.FC<MobileZoomableModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Refs for tracking touch gestures
  const touchStartDistRef = useRef<number | null>(null);
  const startScaleRef = useRef<number>(1);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const startPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTapRef = useRef<number>(0);

  // Lock behind-screen scroll while floating image modal is open
  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
    };
  }, [isOpen, lenis]);

  // Reset zoom and pan on open or close
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => Math.min(prev + 0.5, 4.5));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return next;
    });
  };

  // Helper to get distance between 2 touches
  const getDistance = (touches: TouchList | React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Attach non-passive touch listener to guarantee smooth pinch zoom without page scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isOpen) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        // Pinch gesture start
        touchStartDistRef.current = getDistance(e.touches);
        startScaleRef.current = scale;
      } else if (e.touches.length === 1) {
        // Double-tap check
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
          if (scale > 1.2) {
            setScale(1);
            setPosition({ x: 0, y: 0 });
          } else {
            setScale(2.5);
          }
          lastTapRef.current = 0;
          return;
        }
        lastTapRef.current = now;

        touchStartPosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        startPositionRef.current = { ...position };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      // Prevent browser default zoom or background viewport movement
      e.preventDefault();

      if (e.touches.length === 2 && touchStartDistRef.current !== null) {
        // Two-finger pinch scaling
        const currentDist = getDistance(e.touches);
        const factor = currentDist / touchStartDistRef.current;
        const newScale = Math.min(Math.max(startScaleRef.current * factor, 0.8), 5);
        setScale(newScale);
      } else if (e.touches.length === 1 && touchStartPosRef.current !== null && scale > 1) {
        // One-finger pan when zoomed in
        const dx = e.touches[0].clientX - touchStartPosRef.current.x;
        const dy = e.touches[0].clientY - touchStartPosRef.current.y;
        
        const maxPan = (scale - 1) * 180;
        const newX = Math.max(Math.min(startPositionRef.current.x + dx, maxPan), -maxPan);
        const newY = Math.max(Math.min(startPositionRef.current.y + dy, maxPan), -maxPan);
        
        setPosition({ x: newX, y: newY });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        touchStartDistRef.current = null;
      }
      if (e.touches.length === 0) {
        touchStartPosRef.current = null;
        if (scale < 1) {
          setScale(1);
          setPosition({ x: 0, y: 0 });
        }
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: false });
    el.addEventListener("touchcancel", onTouchEnd, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [isOpen, scale, position]);

  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 sm:hidden backdrop-blur-md select-none touch-none"
          onClick={handleClose}
          onTouchMove={(e) => e.preventDefault()}
        >
          {/* 80% screen dimension container */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-[85vw] h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Action buttons header */}
            <div className="absolute -top-12 right-0 z-30 flex items-center gap-2">
              {/* Zoom In button */}
              <button
                type="button"
                aria-label="Zoom in"
                className="h-8 w-8 rounded-full bg-zinc-900/90 text-white/90 hover:text-white flex items-center justify-center shadow-lg border border-white/20 active:scale-95 transition-transform"
                onClick={handleZoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              {/* Zoom Out button */}
              <button
                type="button"
                aria-label="Zoom out"
                className="h-8 w-8 rounded-full bg-zinc-900/90 text-white/90 hover:text-white flex items-center justify-center shadow-lg border border-white/20 active:scale-95 transition-transform"
                onClick={handleZoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </button>

              {/* Reset zoom button (visible if zoomed) */}
              {scale !== 1 && (
                <button
                  type="button"
                  aria-label="Reset zoom"
                  className="h-8 w-8 rounded-full bg-zinc-900/90 text-blue-400 hover:text-blue-300 flex items-center justify-center shadow-lg border border-white/20 active:scale-95 transition-transform"
                  onClick={handleReset}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Close / Cross button */}
              <button
                type="button"
                aria-label="Close image preview"
                className="h-8 w-8 rounded-full bg-zinc-900/90 text-white flex items-center justify-center shadow-lg border border-white/20 active:scale-95 transition-transform"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Floating Image Window with pinch and double-tap zoom */}
            <div
              ref={containerRef}
              className="w-full h-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-white/20 backdrop-blur-2xl border border-white/30 relative touch-none"
            >
              <img
                src={imageSrc}
                alt="Expanded view"
                style={{
                  transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
                  transition: touchStartDistRef.current ? "none" : "transform 0.15s ease-out",
                  touchAction: "none",
                }}
                className="max-w-full max-h-full object-contain select-none will-change-transform cursor-grab active:cursor-grabbing"
                referrerPolicy="no-referrer"
                draggable={false}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
