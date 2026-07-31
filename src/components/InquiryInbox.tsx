import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Inbox, FileText, Calendar, Mail, DollarSign, Clock, Trash2, Check, RefreshCw, AlertCircle, Sparkles } from "lucide-react";
import { ClientInquiry } from "../types";

export default function InquiryInbox() {
  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<ClientInquiry | null>(null);

  const BOILERPLATE_INQUIRIES: ClientInquiry[] = [
    {
      id: "inq-alpha",
      name: "Siti Sarah binti Ahmad",
      email: "sarah.ahmad@bambootales.my",
      company: "BambooTales Bio-Cosmetics",
      projectType: "Brand Design & Packaging",
      budget: "$3,000 - $7,000 (Professional scale)",
      timeline: "3 - 4 Weeks (Standard Sprint)",
      details: "We are launching a luxury chemical-free facial skincare line in Malaysia and need sustainable dropper glass bottles and textured carton boxes. I love the minimalist botanical line-art you created for Nectar organic honey! We want a similar aesthetic pairing featuring clean serif headings, gold hot-stamp decal borders, and a natural olive-green backdrop. We have Illustrator cutter-guides ready from our packaging supplier.",
      timestamp: "Today, 8:12 AM",
      status: "Unread"
    },
    {
      id: "inq-beta",
      name: "Marcus Chong",
      email: "m.chong@zenithsport.com",
      company: "Zenith Activewear Retail",
      projectType: "WordPress / Elementor Web",
      budget: "$7,000 - $15,000 (Premium Corporate)",
      timeline: "5 - 8 Weeks (Deep Development)",
      details: "Hi Zulhilmi! We are a sports distributor shifting to direct-to-consumer sales. We need an advanced responsive WordPress Elementor landing portal hooked into an e-commerce backend (preferably SiteGiant sync or standard WooCommerce). The UI must look ultra-modern, using brutalist typographic scales, raw grids, and highly optimize mobile fast loads. We already have structural Figma wireframes ready to bridge over.",
      timestamp: "Yesterday, 3:45 PM",
      status: "Reviewing"
    },
    {
      id: "inq-gamma",
      name: "Emily Vance",
      email: "emily@pixelgrid.studio",
      company: "PixelGrid Studios Inc.",
      projectType: "UI/UX Mobile Design System",
      budget: "$1,500 - $3,000 (Emerging Startup)",
      timeline: "1 - 2 Weeks (Urgent Sync)",
      details: "We are seeking a responsive UI redesign for our mobile video editor app dashboard. We are currently utilizing Sleek.design for early iterations but need an expert Figma artisan to polish micro-interactions, coordinate typographic weight classes, and design a gorgeous custom dark theme concept. Clean high density assets are required in 3 days. Hope we can align!",
      timestamp: "Jun 7, 2026",
      status: "Scheduled"
    }
  ];

  const loadInquiries = () => {
    const raw = localStorage.getItem("designer_inquiries");
    if (raw) {
      setInquiries(JSON.parse(raw));
    } else {
      localStorage.setItem("designer_inquiries", JSON.stringify(BOILERPLATE_INQUIRIES));
      setInquiries(BOILERPLATE_INQUIRIES);
    }
  };

  useEffect(() => {
    loadInquiries();
    
    // Set up a local storage poll to keep in sync dynamically
    const interval = setInterval(loadInquiries, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = (id: string, newStatus: ClientInquiry["status"]) => {
    const updated = inquiries.map(inq => {
      if (inq.id === id) {
        return { ...inq, status: newStatus };
      }
      return inq;
    });
    localStorage.setItem("designer_inquiries", JSON.stringify(updated));
    setInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleDeleteInquiry = (id: string) => {
    const filtered = inquiries.filter(inq => inq.id !== id);
    localStorage.setItem("designer_inquiries", JSON.stringify(filtered));
    setInquiries(filtered);
    setSelectedInquiry(null);
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clean out the lead cabinet?")) {
      localStorage.removeItem("designer_inquiries");
      setInquiries([]);
      setSelectedInquiry(null);
    }
  };

  const getStatusClass = (status: ClientInquiry["status"]) => {
    switch (status) {
      case "Unread":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Reviewing":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Scheduled":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-zinc-800 text-zinc-400 border-zinc-700";
    }
  };

  return (
    <div id="lead-inbox-wrapper" className="border border-zinc-900 bg-zinc-950 p-6 md:p-8 rounded-3xl relative overflow-hidden">
      
      {/* Inbox Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-900 gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-rose-500 flex items-center gap-1.5">
            <Inbox className="h-4 w-4" /> CLIENT RELATIONS & LEADS WORKSPACE
          </p>
          <h3 className="font-display text-2xl font-bold mt-1 text-zinc-100">
            Designer Inquiry Inbox
          </h3>
          <p className="text-zinc-400 text-xs mt-1">
            Dynamic back-office cabinet. Form submissions made in the **Project Planner** arrive here instantly in real-time.
          </p>
        </div>
        
        {inquiries.length > 0 && (
          <button
            id="clear-leads-btn"
            onClick={handleClearAll}
            className="rounded-xl border border-zinc-900 bg-zinc-900/30 px-4 py-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:border-rose-500/30 hover:text-rose-400 transition-colors cursor-pointer"
          >
            Clear Inbox
          </button>
        )}
      </div>

      {inquiries.length === 0 ? (
        <div id="empty-leads" className="py-16 text-center border border-zinc-900 border-dashed rounded-2xl mt-6">
          <AlertCircle className="h-10 w-10 text-zinc-600 mx-auto mb-3" />
          <h4 className="font-display text-sm font-medium text-zinc-400">Lead Cabinet is Clear</h4>
          <p className="text-xs text-zinc-500 max-w-xs mx-auto mt-1">
            Try submitting a creative concept in the **Interactive Project Planner** above to witness it arrive here live!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* List panel (Left) */}
          <div className="lg:col-span-5 border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-900/10 max-h-[450px] overflow-y-auto space-y-px">
            {inquiries.map((inq) => (
              <button
                id={`inq-row-${inq.id}`}
                key={inq.id}
                onClick={() => {
                  setSelectedInquiry(inq);
                  if (inq.status === "Unread") {
                    handleUpdateStatus(inq.id, "Reviewing");
                  }
                }}
                className={`w-full p-4 text-left border-b border-zinc-900/60 transition-all flex items-start justify-between cursor-pointer ${
                  selectedInquiry?.id === inq.id
                    ? "bg-zinc-900/50 border-r-2 border-r-rose-500"
                    : "hover:bg-zinc-900/20"
                }`}
              >
                <div className="space-y-1 max-w-[70%]">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${getStatusClass(inq.status)}`}>
                      {inq.status}
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500">{inq.timestamp}</span>
                  </div>
                  <h4 className={`text-xs font-semibold truncate ${inq.status === "Unread" ? "text-zinc-100" : "text-zinc-300"}`}>
                    {inq.name}
                  </h4>
                  <p className="text-[11px] text-zinc-500 truncate">{inq.company}</p>
                </div>
                
                <span className="font-mono text-[10px] text-zinc-500 text-right shrink-0">
                  {inq.projectType.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Details panel (Right) */}
          <div id="lead-viewer-panel" className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {selectedInquiry ? (
                <motion.div
                  key={selectedInquiry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border border-zinc-900 bg-zinc-900/30 p-6 rounded-2xl space-y-6 relative"
                >
                  {/* Card Title & metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-900/60 gap-4">
                    <div>
                      <h4 className="font-display text-base font-bold text-zinc-100">
                        {selectedInquiry.name}
                      </h4>
                      <p className="text-zinc-400 text-xs mt-0.5 flex items-center gap-1.5 font-mono">
                        <Mail className="h-3 w-3 text-rose-500" /> {selectedInquiry.email} &bull; {selectedInquiry.company}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        id="mark-scheduled-btn"
                        onClick={() => handleUpdateStatus(selectedInquiry.id, "Scheduled")}
                        title="Mark Scheduled"
                        className="p-1.5 rounded-lg border border-zinc-800 hover:border-emerald-500 bg-zinc-950 text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        id="delete-lead-btn"
                        onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                        title="Delete Inquiry"
                        className="p-1.5 rounded-lg border border-zinc-800 hover:border-rose-500 bg-zinc-950 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Core specifications parameters */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block">Deliverable</span>
                      <span className="text-xs font-semibold text-zinc-300">{selectedInquiry.projectType}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block">Pricing Plan</span>
                      <span className="text-xs font-semibold text-zinc-300">{selectedInquiry.budget}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block">Lead Scope</span>
                      <span className="text-xs font-semibold text-zinc-300">{selectedInquiry.timeline}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block">Catalog-ID</span>
                      <span className="text-xs font-mono text-zinc-500">{selectedInquiry.id}</span>
                    </div>
                  </div>

                  {/* Letter Details */}
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block">
                      IV. Creative Brief Specifications
                    </span>
                    <p className="rounded-xl bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-300 whitespace-pre-line border border-zinc-900 font-serif italic">
                      "{selectedInquiry.details}"
                    </p>
                  </div>

                  {/* Quick Reply Trigger simulation */}
                  <div className="flex items-center space-x-3 pt-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                      Actions Logged: Ready for Adobe Illustrator vector mapping / Wix setup &bull; Simulated Contract Signed
                    </span>
                  </div>

                </motion.div>
              ) : (
                <div id="no-lead-selected" className="border border-zinc-900 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center min-h-[250px] bg-zinc-900/5">
                  <Inbox className="h-8 w-8 text-zinc-700 mb-3" />
                  <h4 className="font-display text-xs font-medium text-zinc-400">No Inquiry Selected</h4>
                  <p className="text-xs text-zinc-500 max-w-xs mt-1">
                    Select a client letter from the left cabinet list to open their detailed creative blueprint and trigger administrative actions.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      )}

    </div>
  );
}
