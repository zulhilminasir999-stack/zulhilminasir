import React, { useState } from "react";

interface SoftwareLogoBoxProps {
  toolName: string;
  showLabel?: boolean;
  labelAlign?: "center" | "left";
}

interface LogoConfig {
  candidates: string[];
  fallbackWhiteLogo?: string;
  fallbackScale?: number;
  isWide?: boolean;
  wideImgClassName?: string;
  renderFallbackSvg?: () => React.ReactNode;
}

function getLogoConfig(toolName: string): LogoConfig {
  const lower = toolName.toLowerCase();

  // Figma
  if (lower.includes("figma")) {
    return {
      candidates: [
        "/logos/Figma.png",
        "/logos/figma.png",
        "/logos/Figma.svg",
        "/logos/figma.svg",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 38 57" className="w-6 h-6" aria-hidden="true">
          <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
          <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
          <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
          <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
          <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
        </svg>
      ),
    };
  }

  // Adobe Illustrator
  if (lower.includes("illustrator")) {
    return {
      candidates: [
        "/logos/adobeillustrator.png",
        "/logos/Adobe Illustrator.png",
        "/logos/illustrator.png",
        "/logos/Illustrator.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 240 234" className="w-7 h-7" aria-hidden="true">
          <rect width="240" height="234" rx="42.5" fill="#330000" />
          <path
            fill="#FF9A00"
            d="M116 144.4H78.8l-7.6 23.5c-.2.9-1 1.5-1.9 1.4H50.5c-1.1 0-1.4-.6-1.1-1.8l32.2-92.7c.3-1 .6-2.1 1-3.3.4-2.1.6-4.3.6-6.5-.1-.5.3-1 .8-1.1h25.5c.8 0 1.2.3 1.3.8l36.5 103c.3 1.1 0 1.6-1 1.6h-20.9c-.7.1-1.4-.4-1.6-1.1L116 144.4zm-31.4-20.3h25.4c-.6-2.1-1.4-4.6-2.3-7.2-.9-2.7-1.8-5.6-2.7-8.6-1-3.1-1.9-6.1-2.9-9.2-1-3.1-1.9-6-2.7-8.9-.8-2.8-1.5-5.4-2.2-7.8h-.2c-.9 4.3-2 8.6-3.4 12.9-1.5 4.8-3 9.8-4.6 14.8-1.4 5.1-2.9 9.8-4.4 14zm85.4-41c-3.3.1-6.5-1.2-8.9-3.5-2.3-2.5-3.5-5.8-3.4-9.2-.1-3.4 1.2-6.6 3.6-8.9 2.4-2.3 5.6-3.5 8.9-3.5 3.9 0 6.9 1.2 9.1 3.5 2.2 2.4 3.4 5.6 3.3 8.9.1 3.4-1.1 6.7-3.5 9.2-2.3 2.4-5.7 3.6-9.1 3.5zm-11.2 84.9V91c0-1 .4-1.4 1.3-1.4h19.8c.9 0 1.3.5 1.3 1.4v77c0 1.1-.4 1.6-1.3 1.6h-19.6c-1 0-1.5-.6-1.5-1.6z"
          />
        </svg>
      ),
    };
  }

  // Adobe Photoshop
  if (lower.includes("photoshop")) {
    return {
      candidates: [
        "/logos/adobephotoshop.png",
        "/logos/Adobe Photoshop.png",
        "/logos/photoshop.png",
        "/logos/Photoshop.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 240 234" className="w-7 h-7" aria-hidden="true">
          <rect width="240" height="234" rx="42.5" fill="#001E36" />
          <path
            fill="#31A8FF"
            d="M54 164.1V62.3c0-.7.3-1.1 1-1.1 1.7 0 3.3 0 5.6-.1 2.4-.1 4.9-.1 7.6-.2 2.7-.1 5.6-.1 8.7-.2 3.1-.1 6.1-.1 9.1-.1 8.2 0 15 .9 20.6 3.1 5 1.7 9.6 4.5 13.4 8.2 3.2 3.2 5.7 7.1 7.3 11.4 1.5 4.2 2.3 8.5 2.3 13 0 8.6-2 15.7-6 21.3-4 5.6-9.6 9.8-16.1 12.2-6.8 2.5-14.3 3.4-22.5 3.4-2.4 0-4 0-5-.1-1-.1-2.4-.1-4.3-.1v32.1c.1.7-.4 1.3-1.1 1.4H55.2c-.8 0-1.2-.4-1.2-1.3zm21.8-84.7v33.6c1.4.1 2.7.2 3.9.2h5.3c3.9 0 7.8-.6 11.5-1.8 3.2-.9 6-2.8 8.2-5.3 2.1-2.5 3.1-5.9 3.1-10.3.1-3.1-.7-6.2-2.3-8.9-1.7-2.6-4.1-4.6-7-5.7-3.7-1.5-7.7-2.1-11.8-2-2.6 0-4.9 0-6.8.1-2-.1-3.4 0-4.1.1zm116.2 30.2c-3-.6-6.2-2.7-9.6-3.4-3.7-.8-7.4-1.3-11.2-1.3-2-.1-4.1.2-6 .7-1.3.3-2.4 1-3.1 2-.5.8-.8 1.8-.8 2.7s.4 1.8 1 2.6c.9 1.1 2.1 2 3.4 2.7 2.3 1.2 4.7 2.3 7.1 3.3 5.4 1.8 10.6 4.3 15.4 7.3 3.3 2.1 6 4.9 7.9 8.3 1.6 3.2 2.4 6.7 2.3 10.3.1 4.7-1.3 9.4-3.9 13.3-2.8 4-6.7 7.1-11.2 8.9-4.9 2.1-10.9 3.2-18.1 3.2-4.6 0-9.1-.4-13.6-1.3-3.5-.6-7-1.7-10.2-3.2-.7-.4-1.2-1.1-1.1-1.9v-17.4c0-.3.1-.7.4-.9.3-.2.6-.1.9.1 3.9 2.3 8 3.9 12.4 4.9 3.8 1 7.8 1.5 11.8 1.5 3.8 0 6.5-.5 8.3-1.4 1.6-.7 2.7-2.4 2.7-4.2 0-1.4-.8-2.7-2.4-4-1.6-1.3-4.9-2.8-9.8-4.7-5.1-1.8-9.8-4.2-14.2-7.2-3.1-2.2-5.7-5.1-7.6-8.5-1.6-3.2-2.4-6.7-2.3-10.2 0-4.3 1.2-8.4 3.4-12.1 2.5-4 6.2-7.2 10.5-9.2 4.7-2.4 10.6-3.5 17.7-3.5 4.1 0 8.3.3 12.4.9 3 .4 5.9 1.2 8.6 2.3.4.1.8.5 1 .9.1.4.2.8.2 1.2v16.3c0 .4-.2.8-.5 1-.4.1-.9.1-1.5-.2z"
          />
        </svg>
      ),
    };
  }

  // Adobe InDesign
  if (lower.includes("indesign")) {
    return {
      candidates: [
        "/logos/adobeindesign.png",
        "/logos/Adobe InDesign.png",
        "/logos/indesign.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 240 234" className="w-7 h-7" aria-hidden="true">
          <rect width="240" height="234" rx="42.5" fill="#49021F" />
          <path
            fill="#FF3366"
            d="M87.4 61.2v103c0 1.1-.5 1.6-1.4 1.6H66.4c-.9 0-1.3-.5-1.3-1.6v-103c0-.9.5-1.3 1.4-1.3H86c.9-.1 1.3.3 1.4 1.3zm59.1 106.5c-7.4.1-14.8-1.8-21.2-5.6-6.3-3.8-11.3-9.5-14.4-16.2-3.5-7.6-5.2-16-5.1-24.4-.1-8.1 1.7-16.1 5.3-23.4 3.6-7.1 9-13.1 15.7-17.4 7.3-4.6 16-6.8 26.2-6.8 1.3 0 2.7.1 4.2.2 1.5.1 3.1.3 4.6.6V52.4c0-.7.3-1.1 1-1.1h20.3c.7-.1 1.3.4 1.4 1v95.2c0 1.8.1 3.8.2 6 .2 2.1.3 4.1.4 5.8 0 .7-.3 1.3-1 1.6-5.2 2.2-10.7 3.8-16.3 4.8-5.1.9-10.2 1.4-15.3 1.4l-6 .6zm14.5-20v-44c-1.5-.4-3-.7-4.6-.9-1.6-.2-3.2-.3-4.8-.3-3.9 0-7.7.8-11.2 2.5-3.4 1.6-6.3 4.2-8.4 7.4-2.1 3.5-3.2 7.6-3.1 11.8-.1 4.6.8 9.1 2.7 13.3 1.7 3.5 4.4 6.4 7.7 8.4 3.4 2 7.4 3 11.4 2.9 2.1 0 4.2-.2 6.2-.5 1.4-.1 2.8-.3 4.1-.6z"
          />
        </svg>
      ),
    };
  }

  // Adobe Firefly
  if (lower.includes("firefly")) {
    return {
      candidates: [
        "/logos/Adobe Firefly.png",
        "/logos/adobefirefly.png",
        "/logos/firefly.png",
        "/logos/Firefly.png",
        "/logos/firefly.ai.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 240 234" className="w-7 h-7" aria-hidden="true">
          <rect width="240" height="234" rx="42.5" fill="#EB1000" />
          <path
            fill="#FFFFFF"
            d="M58 74c0-1.1.9-2 2-2h65c1.1 0 2 .9 2 2v16c0 1.1-.9 2-2 2H80v24h37c1.1 0 2 .9 2 2v15c0 1.1-.9 2-2 2H80v43c0 1.1-.9 2-2 2H60c-1.1 0-2-.9-2-2V74zm82 30c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v74c0 1.1-.9 2-2 2h-18c-1.1 0-2-.9-2-2v-74z"
          />
          <g transform="translate(154 66) rotate(-12)">
            <path
              fill="#FFFFFF"
              d="M0-23C1.8-9 9-1.8 23 0 9 1.8 1.8 9 0 23-1.8 9-9 1.8-23 0-9-1.8-1.8-9 0-23Z"
            />
          </g>
        </svg>
      ),
    };
  }

  // Google Gemini
  if (lower.includes("gemini")) {
    return {
      candidates: [
        "/logos/Google Gemini Icon.png",
        "/logos/Google Gemini.png",
        "/logos/gemini.png",
        "/logos/Gemini.png",
        "/logos/google-gemini.png",
        "/logos/gemini.svg",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 28 28" className="w-6 h-6" aria-hidden="true">
          <defs>
            <linearGradient id="geminiGradLogo" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1C7DFF" />
              <stop offset="52%" stopColor="#8E65FF" />
              <stop offset="100%" stopColor="#F06292" />
            </linearGradient>
          </defs>
          <path
            fill="url(#geminiGradLogo)"
            d="M14 1.5C14 8.4 8.4 14 1.5 14 8.4 14 14 19.6 14 26.5 14 19.6 19.6 14 26.5 14 19.6 14 14 8.4 14 1.5Z"
          />
        </svg>
      ),
    };
  }

  // Google Flow
  if (lower.includes("flow")) {
    return {
      candidates: [
        "/logos/GoogleFlow.png",
        "/logos/Google Flow.png",
        "/logos/googleflow.png",
      ],
      isWide: true,
      wideImgClassName:
        "h-5 sm:h-[22px] w-auto object-contain select-none pointer-events-none",
    };
  }

  // Perplexity AI (already exists in /public/logos/perplexity_AI.png)
  if (lower.includes("perplexity")) {
    return {
      candidates: ["/logos/perplexity_AI.png", "/logos/perplexity.png"],
      fallbackWhiteLogo: "/logos/perplexity_AI_w.png",
      fallbackScale: 1.3,
    };
  }

  // ChatGPT / OpenAI
  if (lower.includes("chatgpt") || lower.includes("openai")) {
    return {
      candidates: [
        "/logos/chatgpt.png",
        "/logos/ChatGPT.png",
        "/logos/OpenAI.png",
        "/logos/openai.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#10A37F" aria-hidden="true">
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
        </svg>
      ),
    };
  }

  // Claude
  if (lower.includes("claude")) {
    return {
      candidates: ["/logos/claude.png", "/logos/Claude.png"],
      fallbackWhiteLogo: "/logos/claude_w.png",
      fallbackScale: 1.2,
    };
  }

  // SiteGiant
  if (lower.includes("sitegiant")) {
    return {
      candidates: [
        "/logos/sitegiant_ori.png",
        "/logos/sitegiant.png",
        "/logos/SiteGiant.png",
      ],
      fallbackWhiteLogo: "/logos/sitegiant_w.png",
      isWide: true,
      wideImgClassName:
        "h-6 sm:h-[26px] w-auto object-contain select-none pointer-events-none",
    };
  }

  // Google Antigravity
  if (lower.includes("antigravity")) {
    return {
      candidates: [
        "/logos/Google Antigravity.png",
        "/logos/antigravity.png",
        "/logos/Antigravity.png",
      ],
      fallbackWhiteLogo: "/logos/antigravity_w.png",
    };
  }

  // Google AI Studio
  if (lower.includes("ai studio") || lower.includes("aistudio")) {
    return {
      candidates: [
        "/logos/Google_AI_Studio_icon_(May_2026).png",
        "/logos/Google_AI_Studio.png",
      ],
    };
  }

  // Visual Studio Code
  if (
    lower.includes("visual studio") ||
    lower.includes("visual code") ||
    lower.includes("vscode") ||
    lower.includes("vs code")
  ) {
    return {
      candidates: [
        "/logos/vscode.png",
        "/logos/Visual Studio Code.png",
        "/logos/Visual Code Studio.png",
        "/logos/vs-code.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 128 128" className="w-6 h-6" aria-hidden="true">
          <mask
            id="vscode-ribbon-mask"
            width="128"
            height="128"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
          >
            <path
              fill="#fff"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z"
            />
          </mask>
          <g mask="url(#vscode-ribbon-mask)">
            <path
              fill="#0065A9"
              d="M123.471 13.82 97.097 1.12A7.973 7.973 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.333 5.333 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8.001 8.001 0 0 0-4.529-7.208Z"
            />
            <path
              fill="#007ACC"
              d="m123.471 114.181-26.374 12.698A7.973 7.973 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.333 5.333 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8.001 8.001 0 0 1-4.529 7.208Z"
            />
            <path
              fill="#1F9CF0"
              d="M97.098 126.882A7.977 7.977 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.977 7.977 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21l-26.369 12.681Z"
            />
          </g>
        </svg>
      ),
    };
  }

  // OpenAI Codex
  if (lower.includes("codex")) {
    return {
      candidates: [
        "/logos/codex.png",
        "/logos/Codex.png",
        "/logos/openai-codex.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="2 2 20 20" className="w-6 h-6" aria-hidden="true">
          <defs>
            <linearGradient
              id="codex-official-grad"
              x1="12"
              y1="3"
              x2="12"
              y2="21"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B1A7FF" />
              <stop offset="0.5" stopColor="#7A9DFF" />
              <stop offset="1" stopColor="#3941FF" />
            </linearGradient>
          </defs>
          <path
            fill="url(#codex-official-grad)"
            d="M9.064 3.344a4.578 4.578 0 0 1 2.285-.312c1 .115 1.891.54 2.673 1.275.01.01.024.017.037.021a.09.09 0 0 0 .043 0 4.55 4.55 0 0 1 3.046.275l.047.022.116.057a4.581 4.581 0 0 1 2.188 2.399c.209.51.313 1.041.315 1.595a4.24 4.24 0 0 1-.134 1.223.123.123 0 0 0 .03.115c.594.607.988 1.33 1.183 2.17.289 1.425-.007 2.71-.887 3.854l-.136.166a4.548 4.548 0 0 1-2.201 1.388.123.123 0 0 0-.081.076c-.191.551-.383 1.023-.74 1.494-.9 1.187-2.222 1.846-3.711 1.838-1.187-.006-2.239-.44-3.157-1.302a.107.107 0 0 0-.105-.024c-.388.125-.78.143-1.204.138a4.441 4.441 0 0 1-1.945-.466 4.544 4.544 0 0 1-1.61-1.335c-.152-.202-.303-.392-.414-.617a5.81 5.81 0 0 1-.37-.961 4.582 4.582 0 0 1-.014-2.298.124.124 0 0 0 .006-.056.085.085 0 0 0-.027-.048 4.467 4.467 0 0 1-1.034-1.651 3.896 3.896 0 0 1-.251-1.192 5.189 5.189 0 0 1 .141-1.6c.337-1.112.982-1.985 1.933-2.618.212-.141.413-.251.601-.33.215-.089.43-.164.646-.227a.098.098 0 0 0 .065-.066 4.51 4.51 0 0 1 .829-1.615 4.535 4.535 0 0 1 1.837-1.388zm3.482 10.565a.637.637 0 0 0 0 1.272h3.636a.637.637 0 1 0 0-1.272h-3.636zM8.462 9.23a.637.637 0 0 0-1.106.631l1.272 2.224-1.266 2.136a.636.636 0 1 0 1.095.649l1.454-2.455a.636.636 0 0 0 .005-.64L8.462 9.23z"
          />
        </svg>
      ),
    };
  }

  // Kilo Code
  if (lower.includes("kilo")) {
    return {
      candidates: [
        "/logos/kilocode.png",
        "/logos/Kilo Code.png",
        "/logos/kilo-code.png",
        "/logos/kilo.png",
      ],
      renderFallbackSvg: () => (
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6"
          fill="#18181B"
          fillRule="evenodd"
          aria-hidden="true"
        >
          <path d="M0 0v24h24V0H0zm22.222 22.222H1.778V1.778h20.444v20.444zm-7.555-4.964h2.222v1.778h-2.794L12.89 17.83v-2.794h1.778v2.222zm4 0h-1.778v-2.222h-2.222v-1.778h2.793l1.207 1.207v2.793zm-7.556-2.591H9.333v-1.778h1.778v1.778zm-5.778-1.778h1.778v4h4v1.778H6.54L5.333 17.46V12.89zm13.334-3.556v1.778h-5.778V9.333h1.987V7.111h-1.987V5.333h2.558l1.206 1.207v2.793h2.014zm-11.556-2h2.222l1.778 1.778v2H9.333v-2H7.111v2H5.333V5.333h1.778v2zm4 0H9.333v-2h1.778v2z" />
        </svg>
      ),
    };
  }

  // Firebase
  if (lower.includes("firebase")) {
    return {
      candidates: [
        "/logos/firebase.png",
        "/logos/Firebase.png",
        "/logos/google-firebase.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 128 128" className="w-6 h-6" aria-hidden="true">
          <path
            fill="#FFA000"
            d="M17.474 103.276 33.229 2.462a2.91 2.91 0 0 1 5.44-.924l16.294 30.39 6.494-12.366a2.91 2.91 0 0 1 5.15 0l43.97 83.714H17.474Z"
          />
          <path fill="#F57C00" d="M71.903 64.005 54.955 31.913l-37.481 71.363Z" />
          <path
            fill="#FFCA28"
            d="M110.577 103.276 98.51 28.604a2.913 2.913 0 0 0-1.984-2.286 2.906 2.906 0 0 0-2.94.714l-76.112 76.243 42.115 23.618a8.728 8.728 0 0 0 8.51 0l42.478-23.618Z"
          />
        </svg>
      ),
    };
  }

  // Stitch
  if (lower.includes("stitch")) {
    return {
      candidates: [
        "/logos/stitch_logo_black.png",
        "/logos/stitch.png",
        "/logos/Stitch.png",
      ],
      fallbackWhiteLogo: "/logos/stitch_logo_w.png",
      isWide: true,
      wideImgClassName:
        "h-4 sm:h-[18px] w-auto object-contain select-none pointer-events-none",
    };
  }

  // Sleek.design
  if (lower.includes("sleek")) {
    return {
      candidates: [
        "/logos/sleek.png",
        "/logos/Sleek.png",
        "/logos/sleek.design.png",
      ],
      fallbackWhiteLogo: "/logos/sleek_w.png",
      isWide: true,
      wideImgClassName:
        "h-5 sm:h-[22px] w-auto object-contain select-none pointer-events-none",
    };
  }

  // WordPress / Elementor
  if (lower.includes("wordpress")) {
    return {
      candidates: [
        "/logos/wordpress.png",
        "/logos/Wordpress.png",
        "/logos/WordPress.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#21759B" aria-hidden="true">
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-8.5 10c0-1.229.262-2.396.731-3.452l4.027 11.037A8.504 8.504 0 0 1 3.5 12zm8.5 8.5c-.834 0-1.64-.122-2.402-.346l2.55-7.413 2.613 7.159c.017.042.038.08.06.118A8.468 8.468 0 0 1 12 20.5zm1.171-12.484c.512-.027.973-.081.973-.081.458-.054.404-.727-.054-.701 0 0-1.376.108-2.266.108-.835 0-2.239-.108-2.239-.108-.458-.027-.512.674-.054.701 0 0 .434.054.892.081l1.324 3.63-1.86 5.578-3.094-9.208c.512-.027.973-.081.973-.081.458-.054.404-.727-.054-.701 0 0-1.376.108-2.266.108-.159 0-.347-.004-.546-.011A8.488 8.488 0 0 1 12 3.5c2.212 0 4.226.846 5.738 2.232-.036-.002-.072-.007-.11-.007-.835 0-1.428.727-1.428 1.509 0 .701.404 1.294.835 1.995.323.566.701 1.294.701 2.345 0 .727-.28 1.571-.647 2.749l-.848 2.833-3.07-9.14zm4.588 11.434 2.596-7.508c.485-1.213.647-2.183.647-3.046 0-.313-.021-.603-.059-.873A8.468 8.468 0 0 1 20.5 12a8.502 8.502 0 0 1-4.741 7.45z" />
        </svg>
      ),
    };
  }

  if (lower.includes("elementor")) {
    return {
      candidates: ["/logos/elementor.png", "/logos/Elementor.png"],
      fallbackWhiteLogo: "/logos/wordpress_w.png",
      fallbackScale: 1.4,
    };
  }

  // Wix
  if (lower.includes("wix")) {
    return {
      candidates: ["/logos/wix.png", "/logos/Wix.png"],
      fallbackWhiteLogo: "/logos/wix_w.png",
      fallbackScale: 0.9,
    };
  }

  // Framer
  if (lower.includes("framer")) {
    return {
      candidates: ["/logos/framer.png", "/logos/Framer.png"],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0055FF" aria-hidden="true">
          <path d="M4 2h16v6.67h-8L4 2zm0 6.67h8l8 6.66H4V8.67zm0 6.66h8V22l-8-6.67z" />
        </svg>
      ),
    };
  }

  // Midjourney
  if (lower.includes("midjourney")) {
    return {
      candidates: [
        "/logos/midjourney.png",
        "/logos/Midjourney.png",
        "/logos/midjourney.svg",
      ],
      renderFallbackSvg: () => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#18181B"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <path d="M12 3c2.8 3.6 4.5 7.4 4.8 12H7.2C7.5 10.4 9.2 6.6 12 3Z" />
          <path d="M12 7.5c2.2 2.4 3.6 5 3.9 7.5" />
          <path d="M4 17.5h16l-2.2 3H6.2L4 17.5Z" />
        </svg>
      ),
    };
  }

  // Tailwind CSS
  if (lower.includes("tailwind")) {
    return {
      candidates: ["/logos/tailwindcss.png", "/logos/tailwind.png", "/logos/Tailwind.png"],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 54 33" className="w-7 h-5" fill="#06B6D4" aria-hidden="true">
          <path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" />
        </svg>
      ),
    };
  }

  // React & Vite
  if (lower.includes("react")) {
    return {
      candidates: ["/logos/react.png", "/logos/React.png"],
      renderFallbackSvg: () => (
        <svg viewBox="-11.5 -10.232 23 20.463" className="w-6 h-6" aria-hidden="true">
          <circle r="2.05" fill="#00D8FF" />
          <g stroke="#00D8FF" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    };
  }

  // Vite
  if (lower.includes("vite")) {
    return {
      candidates: ["/logos/vite.png", "/logos/Vite.png"],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 32 32" className="w-6 h-6" aria-hidden="true">
          <path fill="#646CFF" d="M29.8 5.2 16.7 28.6c-.3.5-1 .5-1.3 0L2.2 5.2c-.3-.6.2-1.3.8-1.1l13 2.3 13-2.3c.6-.2 1.1.5.8 1.1z" />
          <path fill="#FFEA83" d="M21.9 2.2 12.2 4.1c-.2 0-.4.2-.4.5l-.6 10.1c0 .3.3.5.6.4l2.7-.6c.3-.1.6.2.5.5l-.8 3.9c-.1.3.2.6.5.5l1.7-.5c.3-.1.6.2.5.5l-1.3 6.2c-.1.4.4.6.6.3l7.3-11.3c.2-.3-.1-.7-.4-.6l-2.6.5c-.3.1-.6-.2-.5-.5l1.7-5.8c.1-.3-.2-.6-.5-.5l-2.2.4c-.3.1-.6-.2-.5-.5l1.4-4.9c.1-.3-.2-.6-.5-.5z" />
        </svg>
      ),
    };
  }

  // TypeScript
  if (lower.includes("typescript")) {
    return {
      candidates: ["/logos/typescript.png", "/logos/TypeScript.png"],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
          <rect width="24" height="24" rx="3" fill="#3178C6" />
          <path
            fill="#FFFFFF"
            d="M13.5 11.2v1.8h-2.4v7.5H9v-7.5H6.6v-1.8h6.9zm3.9 9.5c-1.3 0-2.3-.4-3-1v-2c.7.6 1.7 1.1 2.8 1.1.8 0 1.3-.3 1.3-.9 0-.6-.5-.9-1.7-1.3-1.6-.6-2.5-1.3-2.5-2.8 0-1.6 1.3-2.7 3.2-2.7 1.1 0 2 .3 2.6.7v1.9c-.6-.4-1.4-.8-2.4-.8-.8 0-1.2.3-1.2.8 0 .5.4.8 1.6 1.2 1.7.6 2.6 1.3 2.6 2.9 0 1.7-1.3 2.9-3.3 2.9z"
          />
        </svg>
      ),
    };
  }

  // Node.js
  if (lower.includes("node")) {
    return {
      candidates: ["/logos/nodejs.png", "/logos/node.png", "/logos/Node.png"],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
          <path
            fill="#5FA04E"
            d="M12 1.8 3.2 6.9v10.2L12 22.2l8.8-5.1V6.9L12 1.8zm3.1 13.7c0 1.6-1.3 2.5-3.2 2.5-1.5 0-2.6-.6-3.1-1.7l1.5-.9c.3.6.8.9 1.6.9.9 0 1.4-.4 1.4-1V8.6h1.8v6.9z"
          />
        </svg>
      ),
    };
  }

  // HTML / HTML5
  if (lower.includes("html") && !lower.includes("css")) {
    return {
      candidates: [
        "/logos/html.png",
        "/logos/HTML.png",
        "/logos/html5.png",
        "/logos/HTML5.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 32 32" className="w-6 h-6" aria-hidden="true">
          <path fill="#E44D26" d="M6 3l1.82 20.42L15.99 26l8.19-2.58L26 3H6z" />
          <path fill="#F16529" d="M16 24.25l6.63-2.09L24.19 4.7H16v19.55z" />
          <path
            fill="#EBEBEB"
            d="M16 12.18h-3.32l-.23-2.56H16V7.12H9.72l.06.67.62 6.89H16v-2.5zm0 6.49l-.01.01-2.78-.75-.18-1.99h-2.51l.35 3.92 5.12 1.42.01-.01v-2.6z"
          />
          <path
            fill="#FFFFFF"
            d="M15.99 12.18v2.5h3.08l-.29 3.24-2.79.75v2.6l5.12-1.42.04-.42.59-6.58.06-.67h-5.81zm0-5.06v2.5h6.04l.05-.56.12-1.27.06-.67h-6.27z"
          />
        </svg>
      ),
    };
  }

  // CSS / CSS3
  if (lower.includes("css")) {
    return {
      candidates: [
        "/logos/css.png",
        "/logos/CSS.png",
        "/logos/css3.png",
        "/logos/CSS3.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 32 32" className="w-6 h-6" aria-hidden="true">
          <path fill="#1572B6" d="M6 3l1.82 20.42L15.99 26l8.19-2.58L26 3H6z" />
          <path fill="#33A9DC" d="M16 24.25l6.63-2.09L24.19 4.7H16v19.55z" />
          <path
            fill="#FFFFFF"
            d="M16 12.18h3.32l.23-2.56H16V7.12h6.27l-.06.67-.62 6.89H16v-2.5z"
          />
          <path
            fill="#EBEBEB"
            d="M16.01 18.67l-.01.01-2.78-.75-.18-1.99h-2.51l.35 3.92 5.12 1.42.01-.01v-2.6z"
          />
          <path
            fill="#FFFFFF"
            d="M19.08 14.58l-.3 3.34-2.79.75v2.6l5.12-1.42.04-.42.43-4.85h-2.5z"
          />
          <path
            fill="#EBEBEB"
            d="M16.01 7.12v2.5H9.97l-.05-.56-.12-1.27-.06-.67h6.27zm-.01 5.06v2.5h-2.75l-.05-.56-.11-1.27-.06-.67H16z"
          />
        </svg>
      ),
    };
  }

  // JavaScript
  if (lower.includes("javascript") || lower === "js") {
    return {
      candidates: [
        "/logos/javascript.png",
        "/logos/JavaScript.png",
        "/logos/js.png",
        "/logos/JS.png",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 128 128" className="w-6 h-6 rounded-[2px]" aria-hidden="true">
          <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
          <path
            fill="#323330"
            d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
          />
        </svg>
      ),
    };
  }

  // Vercel
  if (lower.includes("vercel")) {
    return {
      candidates: [
        "/logos/vercel.png",
        "/logos/Vercel.png",
        "/logos/vercel.svg",
      ],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 128 128" className="w-5 h-5" fill="#000000" aria-hidden="true">
          <path d="M64.002 8.576 128 119.424H0Z" />
        </svg>
      ),
    };
  }

  // PostgreSQL / Firestore / Database
  if (lower.includes("postgres") || lower.includes("firestore") || lower.includes("cloud")) {
    return {
      candidates: ["/logos/postgresql.png", "/logos/firebase.png", "/logos/cloud.png"],
      renderFallbackSvg: () => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2563EB"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
          aria-hidden="true"
        >
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
      ),
    };
  }

  // Cinema 4D
  if (lower.includes("cinema 4d")) {
    return {
      candidates: ["/logos/cinema4d.png", "/logos/c4d.png"],
      renderFallbackSvg: () => (
        <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="#011A6A" />
          <circle cx="12" cy="12" r="5.5" fill="none" stroke="#38BDF8" strokeWidth="2.4" strokeDasharray="24 10" />
        </svg>
      ),
    };
  }

  // Generic clean software icon fallback with candidate slug lookup in /logos/
  const cleanSlug = lower.replace(/[^a-z0-9]+/g, "");
  return {
    candidates: [`/logos/${toolName}.png`, `/logos/${cleanSlug}.png`],
    renderFallbackSvg: () => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#3F3F46"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  };
}

export const SoftwareLogoBox: React.FC<SoftwareLogoBoxProps> = ({
  toolName,
  showLabel = false,
  labelAlign = "center",
}) => {
  const config = getLogoConfig(toolName);
  const [candidateIdx, setCandidateIdx] = useState(0);

  const hasCandidate = candidateIdx < config.candidates.length;

  const boxElement = (
    <span
      title={toolName}
      aria-label={toolName}
      className={`inline-flex items-center justify-center ${
        config.isWide
          ? "h-11 sm:h-12 px-3 py-2"
          : "w-11 h-11 sm:w-12 sm:h-12 p-2"
      } rounded-[6px] border border-zinc-200/90 bg-transparent shrink-0 transition-colors hover:border-zinc-300`}
    >
      {hasCandidate ? (
        <img
          src={config.candidates[candidateIdx]}
          alt={toolName}
          className={
            config.isWide
              ? config.wideImgClassName ||
                "h-5 w-auto object-contain select-none pointer-events-none"
              : "w-7 h-7 object-contain select-none pointer-events-none"
          }
          referrerPolicy="no-referrer"
          onError={() => setCandidateIdx((prev) => prev + 1)}
        />
      ) : config.fallbackWhiteLogo ? (
        <img
          src={config.fallbackWhiteLogo}
          alt={toolName}
          className={
            config.isWide
              ? `${
                  config.wideImgClassName ||
                  "h-5 w-auto object-contain select-none pointer-events-none"
                } brightness-0 opacity-85`
              : "w-full h-full object-contain select-none pointer-events-none brightness-0 opacity-85"
          }
          style={
            config.fallbackScale
              ? { transform: `scale(${config.fallbackScale})` }
              : undefined
          }
          referrerPolicy="no-referrer"
        />
      ) : config.renderFallbackSvg ? (
        config.renderFallbackSvg()
      ) : null}
    </span>
  );

  if (!showLabel) {
    return boxElement;
  }

  const isLeft = labelAlign === "left";

  return (
    <span
      className={`inline-flex flex-col ${
        isLeft
          ? "items-start"
          : `items-center ${config.isWide ? "" : "w-11 sm:w-12"}`
      } gap-1.5 shrink-0`}
    >
      {boxElement}
      <span
        className={`text-[11px] sm:text-xs font-medium text-zinc-600 ${
          isLeft
            ? "text-left"
            : "w-max self-center text-center text-balance"
        } leading-tight ${
          config.isWide ? "" : "max-w-[60px] sm:max-w-[68px]"
        }`}
      >
        {toolName}
      </span>
    </span>
  );
};
