import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Download,
  FileText,
  Link2,
  Printer,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const RESUME_PDF_URL =
  "/assets/aistudio/Zulhilmi_Nasir_My_Resume_WebDeveloper_Digital_UXDesigner_b200e43f.pdf";
const RESUME_DOWNLOAD_FILENAME =
  "Zulhilmi_Nasir_My_Resume_WebDeveloper_Digital_UXDesigner.pdf";

const RESUME_PAGES = [
  {
    pageNumber: 1,
    src: "/resume-pages/page-1.png",
    alt: "Zulhilmi Nasir Resume — Page 1: Professional Summary & Experience",
  },
  {
    pageNumber: 2,
    src: "/resume-pages/page-2.png",
    alt: "Zulhilmi Nasir Resume — Page 2: Selected Projects, Freelance Projects & Technical Skills",
  },
  {
    pageNumber: 3,
    src: "/resume-pages/page-3.png",
    alt: "Zulhilmi Nasir Resume — Page 3: Education, Leadership & Languages",
  },
];

const ZOOM_STEPS = [60, 75, 90, 100, 115, 130, 150, 175];

export default function ResumePage() {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Resume — Zulhilmi Nasir";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const updateActivePage = () => {
      const viewportCenter = window.innerHeight * 0.42;
      let closestPage = 1;
      let minDistance = Number.POSITIVE_INFINITY;

      pageRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          closestPage = index + 1;
          minDistance = 0;
        } else if (minDistance > 0) {
          const dist = Math.min(
            Math.abs(rect.top - viewportCenter),
            Math.abs(rect.bottom - viewportCenter)
          );
          if (dist < minDistance) {
            minDistance = dist;
            closestPage = index + 1;
          }
        }
      });

      setCurrentPage(closestPage);
    };

    window.addEventListener("scroll", updateActivePage, { passive: true });
    window.addEventListener("resize", updateActivePage, { passive: true });
    updateActivePage();

    return () => {
      window.removeEventListener("scroll", updateActivePage);
      window.removeEventListener("resize", updateActivePage);
    };
  }, [zoom]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const lower = [...ZOOM_STEPS].reverse().find((step) => step < prev);
      return lower ?? ZOOM_STEPS[0];
    });
  };

  const handleZoomIn = () => {
    setZoom((prev) => {
      const higher = ZOOM_STEPS.find((step) => step > prev);
      return higher ?? ZOOM_STEPS[ZOOM_STEPS.length - 1];
    });
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // Fallback for restricted clipboard contexts
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const baseWidthPx = 860;
  const scaledWidthPx = Math.round((baseWidthPx * zoom) / 100);

  return (
    <div className="min-h-screen bg-[#202124] text-white font-sans selection:bg-[#2563EB] selection:text-white print:bg-white print:text-black">
      {/* Sticky Document Viewer Top Bar */}
      <header className="sticky top-0 z-50 h-16 bg-[#18191c]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 flex items-center justify-between gap-3 print:hidden">
        {/* Left: Back Navigation & File Title */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-zinc-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0"
            aria-label="Back to portfolio"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="h-5 w-px bg-white/15 hidden sm:block shrink-0" />

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-[#60A5FA]" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xs sm:text-sm font-medium text-white truncate max-w-[155px] sm:max-w-[280px] md:max-w-[380px]">
                {RESUME_DOWNLOAD_FILENAME}
              </h1>
              <p className="text-[11px] text-zinc-400 leading-tight">
                Page {currentPage} of {RESUME_PAGES.length}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Zoom Controls (Desktop / Tablet) */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-lg px-1.5 py-1">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoom <= ZOOM_STEPS[0]}
            className="p-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/10 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(100)}
            className="px-2.5 py-1 text-xs font-medium text-zinc-200 hover:text-white hover:bg-white/10 rounded-md transition-colors min-w-[54px] text-center cursor-pointer"
            title="Reset zoom to 100%"
          >
            {zoom}%
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoom >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
            className="p-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-white/10 disabled:opacity-35 disabled:pointer-events-none transition-colors cursor-pointer"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Share Link, Print & Download Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyUrl}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-zinc-200 hover:text-white bg-white/[0.06] hover:bg-white/12 border border-white/10 active:scale-95 transition-all cursor-pointer"
            title="Copy resume URL link"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                <span className="hidden lg:inline">Copy Link</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium text-zinc-200 hover:text-white bg-white/[0.06] hover:bg-white/12 border border-white/10 active:scale-95 transition-all cursor-pointer"
            title="Print resume"
            aria-label="Print resume"
          >
            <Printer className="w-4 h-4" />
          </button>

          <a
            href={`${RESUME_PDF_URL}?download=1`}
            download={RESUME_DOWNLOAD_FILENAME}
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white active:scale-95 transition-all px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/25 cursor-pointer"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Download PDF</span>
          </a>
        </div>
      </header>

      {/* Mobile Floating Page & Zoom Pill */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 bg-[#18191c]/95 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5 shadow-2xl print:hidden">
        <span className="text-xs font-medium text-zinc-300 px-2">
          {currentPage} / {RESUME_PAGES.length}
        </span>
        <div className="h-3.5 w-px bg-white/15" />
        <button
          type="button"
          onClick={handleZoomOut}
          disabled={zoom <= ZOOM_STEPS[0]}
          className="p-1.5 text-zinc-200 disabled:opacity-35"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setZoom(100)}
          className="text-xs font-medium text-white min-w-[42px] text-center"
        >
          {zoom}%
        </button>
        <button
          type="button"
          onClick={handleZoomIn}
          disabled={zoom >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
          className="p-1.5 text-zinc-200 disabled:opacity-35"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Document Pages Canvas */}
      <main className="w-full overflow-x-auto py-6 sm:py-10 px-3 sm:px-6 pb-24 md:pb-14 print:p-0 print:overflow-visible">
        <div className="flex flex-col items-center gap-5 sm:gap-7 print:gap-0">
          {RESUME_PAGES.map((page, index) => (
            <div
              key={page.pageNumber}
              ref={(el) => {
                pageRefs.current[index] = el;
              }}
              style={{
                width: zoom === 100 ? undefined : `${scaledWidthPx}px`,
              }}
              className={`bg-white shadow-[0_12px_40px_rgba(0,0,0,0.45)] rounded-[2px] overflow-hidden transition-[width] duration-150 ease-out print:w-full print:max-w-none print:shadow-none print:rounded-none print:break-after-page last:print:break-after-auto ${
                zoom === 100 ? "w-full max-w-[860px]" : "max-w-none"
              }`}
            >
              <img
                src={page.src}
                alt={page.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className="block w-full h-auto select-none"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
