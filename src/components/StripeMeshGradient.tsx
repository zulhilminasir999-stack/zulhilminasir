import { motion } from "motion/react";

export default function StripeMeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic theme-colored blobs rotating and drifting without gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-[#0A2947]/15 blur-[130px] animate-[float-slow_25s_infinite_alternate]" />
      
      <div className="absolute top-[10%] right-[-10%] w-[70vw] h-[70vw] md:w-[45vw] md:h-[45vw] rounded-full bg-[#0A2947]/10 blur-[120px] animate-[float-medium_20s_infinite_alternate-reverse_2s]" />
      
      <div className="absolute bottom-[20%] left-[15%] w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] rounded-full bg-[#0A2947]/8 blur-[110px] animate-[float-slow_30s_infinite_alternate_4s]" />
      
      <div className="absolute bottom-[-10%] right-[10%] w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[#0A2947]/12 blur-[140px] animate-[float-fast_18s_infinite_alternate_1s]" />

      {/* Decorative vector curves radiating outward */}
      <div className="absolute top-0 inset-x-0 h-full opacity-[0.03] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,1),transparent)]" />
    </div>
  );
}
