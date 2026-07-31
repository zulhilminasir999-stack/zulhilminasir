export type ProjectCategory = "ALL" | "UI_UX" | "PACKAGING" | "VISUAL_DESIGN" | "WEB_DEV" | "AI_PROMPT" | "LOGO_BRANDING";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  imageUrl: string;
  client: string;
  toolsUsed: string[];
  summary: string;
  challenge: string;
  solution: string;
  promptExample?: string;
  results: string[];
  galleryImages?: string[];
  links?: {
    label: string;
    url: string;
  }[];
}

export interface PromptRecipe {
  id: string;
  title: string;
  description: string;
  category: "packaging" | "uiux" | "brand";
  software: string;
  rawConcept: string;
  refinedPrompt: string;
  parameters: string;
  imageUrl?: string;
  productDesignUse?: string;
  contentUse?: string;
}

export interface ClientInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  details: string;
  timestamp: string;
  status: "Unread" | "Reviewing" | "Scheduled" | "Archived";
  notes?: string;
}

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface CapabilityDetail {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  toolsUsed: string[];
  showcases?: {
    title: string;
    image: string;
  }[];
  gallery?: string[];
}
