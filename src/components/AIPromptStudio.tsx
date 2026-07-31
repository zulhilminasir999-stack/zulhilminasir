import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check } from "lucide-react";
import { DUMMY_RECIPES } from "../data";

interface AIPromptStudioProps {
  theme?: "light" | "dark";
}

export default function AIPromptStudio({ theme = "dark" }: AIPromptStudioProps) {
  const [selectedCategory, setSelectedCategory] = useState<"packaging" | "uiux" | "brand">("packaging");
  const [activeRecipeId, setActiveRecipeId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const filteredRecipes = DUMMY_RECIPES.filter((r) => r.category === selectedCategory);

  // Set the first item active when category changes
  useEffect(() => {
    if (filteredRecipes.length > 0) {
      setActiveRecipeId(filteredRecipes[0].id);
    }
  }, [selectedCategory]);

  const activeRecipe = filteredRecipes.find((r) => r.id === activeRecipeId) || filteredRecipes[0];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText("copied");
    setTimeout(() => setCopiedText(null), 2000);
  };

  const isLight = theme === "light";

  return (
    <div 
      id="prompt-studio-wrapper" 
      className={`border p-5 sm:p-6 md:p-8 rounded-3xl relative overflow-hidden transition-colors duration-300 ${
        isLight 
          ? "border-zinc-200 bg-zinc-50/50" 
          : "border-zinc-900 bg-zinc-950"
      }`}
    >
      
      {/* Category Controls - Minimal Selectors */}
      <div className={`flex flex-col gap-5 pb-6 border-b transition-colors duration-300 ${
        isLight ? "border-zinc-200" : "border-zinc-900"
      }`}>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full select-none">
          {[
            { id: "packaging", label: "Packaging" },
            { id: "uiux", label: "Digital UI/UX" },
            { id: "brand", label: "Logos" }
          ].map((item) => {
            const isActive = selectedCategory === item.id;
            
            // Outer wrapper classes with dynamic gradient behavior based on active state and active theme
            let parentClass = "rounded-2xl transition-all duration-300 w-full sm:flex-1 text-center ";
            if (isActive) {
              if (isLight) {
                parentClass += "bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 p-[1.5px] border-transparent shadow-[0_4px_12px_rgba(20,184,166,0.15)] scale-[1.02]";
              } else {
                parentClass += "bg-gradient-to-r from-emerald-400 to-teal-400 p-0.5 border-transparent shadow-[0_0_15px_rgba(52,211,153,0.15)] scale-[1.02]";
              }
            } else {
              if (isLight) {
                parentClass += "bg-white border border-zinc-200 hover:border-zinc-300 p-0.5";
              } else {
                parentClass += "bg-zinc-900/30 border border-zinc-900/80 hover:border-zinc-800 p-0.5";
              }
            }

            // Inner button classes with backgrounds mirroring the chosen theme container styles
            let btnClass = "rounded-xl px-4 py-3 text-xs font-semibold font-sans uppercase tracking-wider transition-all cursor-pointer block w-full whitespace-nowrap text-center ";
            if (isLight) {
              btnClass += "bg-white ";
            } else {
              btnClass += "bg-zinc-950 ";
            }

            if (isActive) {
              if (!isLight) {
                btnClass += "text-emerald-400 font-extrabold";
              }
            } else {
              if (isLight) {
                btnClass += "text-zinc-500 hover:text-zinc-800";
              } else {
                btnClass += "text-zinc-500 hover:text-zinc-200";
              }
            }

            return (
              <div key={item.id} className={parentClass}>
                <button
                  onClick={() => setSelectedCategory(item.id as "packaging" | "uiux" | "brand")}
                  className={btnClass}
                >
                  {isActive && isLight ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 font-extrabold">
                      {item.label}
                    </span>
                  ) : (
                    <span className={isActive ? "font-extrabold" : ""}>
                      {item.label}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Left Side: Recipe Swatch Selection (5 Columns) */}
        <div className="lg:col-span-5 space-y-3">
          {filteredRecipes.map((recipe) => {
            const isActive = activeRecipe && activeRecipe.id === recipe.id;
            return (
              <button
                id={`recipe-side-card-${recipe.id}`}
                key={recipe.id}
                onClick={() => setActiveRecipeId(recipe.id)}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 cursor-pointer ${
                  isActive
                    ? isLight
                      ? "border-zinc-400 bg-zinc-200/50 text-zinc-900 font-semibold"
                      : "border-zinc-500 bg-zinc-900/60 text-zinc-100"
                    : isLight
                      ? "border-zinc-200/80 bg-white/40 text-zinc-650 hover:bg-zinc-100/60"
                      : "border-zinc-900/80 bg-zinc-900/10 text-zinc-400 hover:bg-zinc-900/30"
                }`}
              >
                <div className={`h-11 w-11 rounded-lg overflow-hidden shrink-0 border relative ${
                  isLight ? "border-zinc-200 bg-white/80" : "border-zinc-800 bg-zinc-950"
                }`}>
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`font-sans text-[8px] uppercase tracking-wider block ${
                    isLight ? "text-zinc-500" : "text-zinc-500"
                  }`}>
                    {recipe.software.split("+")[0].trim()}
                  </span>
                  <h5 className={`font-sans font-bold text-xs truncate mt-0.5 ${
                    isLight 
                      ? isActive ? "text-zinc-950" : "text-zinc-800" 
                      : isActive ? "text-zinc-100" : "text-zinc-300"
                  }`}>
                    {recipe.title}
                  </h5>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Detailed Result Inspect Panel (7 Columns) */}
        <div id="prompt-output-panel" className="lg:col-span-7 flex flex-col justify-start">
          <AnimatePresence mode="wait">
            {activeRecipe ? (
              <motion.div
                key={activeRecipe.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className={`space-y-5 border p-5 rounded-2xl transition-colors duration-300 ${
                  isLight 
                    ? "bg-white border-zinc-200" 
                    : "bg-zinc-900/20 border-zinc-900"
                }`}>
                  {/* Visual Specimen */}
                  <div className={`aspect-[16/10] w-full rounded-xl overflow-hidden border relative ${
                    isLight ? "border-zinc-200 bg-zinc-50" : "border-zinc-900 bg-zinc-950"
                  }`}>
                    <img 
                      src={activeRecipe.imageUrl} 
                      alt={activeRecipe.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-colors"
                    />
                  </div>

                  {/* Info and Copy Container */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className={`font-sans font-bold text-sm truncate ${
                          isLight ? "text-zinc-900" : "text-zinc-200"
                        }`}>
                          {activeRecipe.title}
                        </h4>
                        <p className={`text-[10px] font-sans tracking-wider mt-0.5 ${
                          isLight ? "text-zinc-500" : "text-zinc-500"
                        }`}>
                          ENGINE: {activeRecipe.software}
                        </p>
                      </div>
                      
                      <button
                        id="copy-blueprint-prompt-btn"
                        onClick={() => copyToClipboard(activeRecipe.refinedPrompt)}
                        className={`rounded-lg px-3 py-1.5 flex items-center space-x-1.5 cursor-pointer transition-colors shrink-0 ${
                          isLight 
                            ? "bg-zinc-900 hover:bg-zinc-800 text-white" 
                            : "bg-zinc-100 hover:bg-zinc-200 text-black"
                        }`}
                      >
                        {copiedText ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" />
                            <span className="font-sans text-[9px] uppercase tracking-wider text-emerald-500 font-extrabold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span className="font-sans text-[9px] uppercase tracking-wider font-extrabold">Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className={`rounded-xl border p-3.5 font-sans text-xs leading-relaxed select-all transition-colors duration-300 ${
                      isLight 
                        ? "border-zinc-200 bg-zinc-50 text-zinc-700" 
                        : "border-zinc-900 bg-zinc-950 text-zinc-400"
                    }`}>
                      {activeRecipe.refinedPrompt}
                    </div>
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className={`flex-1 border border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center min-h-[300px] ${
                isLight ? "border-zinc-300" : "border-zinc-900"
              }`}>
                <h4 className={`font-sans text-xs ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
                  Select a prompt specimen to view archives
                </h4>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
