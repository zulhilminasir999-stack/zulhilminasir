import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please set your key in the Secrets panel inside Google AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Advanced Prompt Engineering Enhancer / Designer Tool Endpoint
app.post("/api/prompt-craft", async (req, res) => {
  try {
    const { category, rawConcept, softwareFocus } = req.body;
    if (!rawConcept) {
      return res.status(400).json({ error: "Concept description is required" });
    }

    const ai = getGeminiClient();
    const craftPrompt = `
      You are an expert AI Prompt Engineer and Packaging/UI Designer. Enhance the following raw design concept into an elite, production-grade prompt system.
      
      Category: ${category || "General Visual Design"}
      Raw Concept: "${rawConcept}"
      Intended Software/Tool: ${softwareFocus || "Midjourney / Google Gemini"}
      
      Generate a JSON response that contains:
      1. "enhancedPrompt": A highly structured prompt containing aspect ratio, visual weight, medium descriptors (e.g. "photorealistic packaging packaging box mockups", "minimal web design layout"), color palette, rendering engine details, material textures (e.g., "fine textured recycled craft paper," "minimalist embossing details"), lighting, style references.
      2. "promptBreakdown": A step-by-step breakdown of why these prompt words were chosen and their aesthetic impact.
      3. "aiSoftwareTips": How to run this inside ChatGPT, Gemini, or Sleek.design and refine it.
      4. "nextDesignSteps": Post-generation workflows in Adobe Illustrator / Photoshop, or Wordpress Elementor / Figma to finalize the design.
      
      Strictly return a valid JSON object matching the keys mentioned above, with no extra markdown wrapping tags except the raw JSON content itself.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: craftPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            enhancedPrompt: { type: "STRING" },
            promptBreakdown: { 
              type: "ARRAY", 
              items: { type: "STRING" },
              description: "Bullet points explaining specific keywords selected."
            },
            aiSoftwareTips: { type: "STRING", description: "Tips and guidelines for utilizing AI tools effectively." },
            nextDesignSteps: { type: "STRING", description: "Recommended post-generation designer steps." }
          },
          required: ["enhancedPrompt", "promptBreakdown", "aiSoftwareTips", "nextDesignSteps"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Prompt Craft Error:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred with the prompt enhancement service.",
      isConfigError: error.message?.includes("GEMINI_API_KEY")
    });
  }
});

// Auto-generate a beautiful custom PDF project proposal structure
app.post("/api/generate-brief", async (req, res) => {
  try {
    const { name, company, projectType, budget, timeline, details } = req.body;
    if (!name || !projectType) {
      return res.status(400).json({ error: "Client Name and Project Type are required" });
    }

    const ai = getGeminiClient();
    const briefPrompt = `
      You are Zulhilmi Nasir's Senior Client Strategist. Create a jaw-dropping, highly tailored, aesthetic creative proposal brief for a potential client.
      
      Client: "${name}" from "${company || "Independent Project"}"
      Project Type: "${projectType}"
      Estimated Budget Tier: "${budget}"
      Desired Timeline: "${timeline}"
      Client Brief Inquiries: "${details || "None provided"}"
      
      Provide a beautifully organized creative brief in structured JSON format with:
      1. "executiveSummary": A high-style, minimalist summary of the project scope in Awwwards agency tone.
      2. "designDirection": Typographic direction, recommended packaging material directions or Web grid system (recommend Figma mockups, then Wix/Elementor development or customized prompt design workflow).
      3. "techStack": Suggested framework, CMS, or design apps (e.g., Photoshop retouching, Illustrator vectors, Elementor structures, Sleek.design mobile assets).
      4. "aiPromptBlueprint": A custom tailored AI prompt specifically created for setting up the moodboard of this exact project.
      5. "milestones": A responsive 4-step milestones workflow customized for their timeline.
      
      Make the output professional, encouraging, and visually sound.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: briefPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            executiveSummary: { type: "STRING" },
            designDirection: { type: "STRING" },
            techStack: { type: "ARRAY", items: { type: "STRING" } },
            aiPromptBlueprint: { type: "STRING" },
            milestones: { 
              type: "ARRAY", 
              items: {
                type: "OBJECT",
                properties: {
                  phase: { type: "STRING" },
                  time: { type: "STRING" },
                  deliverables: { type: "STRING" }
                },
                required: ["phase", "time", "deliverables"]
              }
            }
          },
          required: ["executiveSummary", "designDirection", "techStack", "aiPromptBlueprint", "milestones"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Generate Brief Error:", error);
    res.status(500).json({ 
      error: error.message || "An error occurred with the brief generation service.",
      isConfigError: error.message?.includes("GEMINI_API_KEY")
    });
  }
});

// Integrate Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite Development Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static production assets from /dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully booted & running on http://localhost:${PORT}`);
  });
}

startServer();
