import React, { useState, useRef } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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

  // Refs for tracking touch gestures
  const touchStartDistRef = useRef<number | null>(null);
  const startScaleRef = useRef<number>(1);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const startPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTapRef = useRef<number>(0);

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
    setScale((prev) => Math.min(prev + 0.5, 4));
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
  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      // Pinch gesture
      touchStartDistRef.current = getDistance(e.touches);
      startScaleRef.current = scale;
    } else if (e.touches.length === 1) {
      // Double-tap check
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        // Double tap toggles zoom
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

      // Pan gesture
      touchStartPosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      startPositionRef.current = { ...position };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      // Pinch zoom
      e.preventDefault();
      const currentDist = getDistance(e.touches);
      const factor = currentDist / touchStartDistRef.current;
      const newScale = Math.min(Math.max(startScaleRef.current * factor, 1), 4.5);
      setScale(newScale);
    } else if (e.touches.length === 1 && touchStartPosRef.current !== null && scale > 1) {
      // Pan when zoomed in
      e.preventDefault();
      const dx = e.touches[0].clientX - touchStartPosRef.current.x;
      const dy = e.touches[0].clientY - touchStartPosRef.current.y;
      
      // Limit panning bounds proportional to scale
      const maxPan = (scale - 1) * 150;
      const newX = Math.max(Math.min(startPositionRef.current.x + dx, maxPan), -maxPan);
      const newY = Math.max(Math.min(startPositionRef.current.y + dy, maxPan), -maxPan);
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) {
      touchStartDistRef.current = null;
    }
    if (e.touches.length === 0) {
      touchStartPosRef.current = null;
      // If scaled down below 1, snap back to 1
      if (scale < 1) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 sm:hidden backdrop-blur-md select-none touch-none"
          onClick={handleClose}
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
              className="w-full h-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-black/40 border border-white/10 relative touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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

              {/* Finger pinch hint badge */}
              <div className="absolute bottom-2.5 inset-x-0 mx-auto w-fit px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wide text-white/75 pointer-events-none">
                {scale > 1.05 ? `${Math.round(scale * 100)}% • Drag to pan` : "Pinch or double-tap to zoom"}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
