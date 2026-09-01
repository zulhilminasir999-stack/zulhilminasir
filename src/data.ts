import { Project, PromptRecipe, CapabilityDetail } from "./types";
import duaHarianImg from "./assets/images/dua_harian_mockup_1781146142023.png";
import brandingIdentityImg from "./assets/images/branding_identity_manual_1783820937836.jpg";
import editingFaceImg from "./assets/images/editing_face_retouch_1783818154488.jpg";

export const SOFTWARES_LIST = [
  {
    name: "Figma",
    category: "UI/UX & Ideation",
    proficiency: "Expert",
    description: "Component systems, typography grids, responsive layouts, high-fidelity prototypes.",
    useCase: "Translating wireframes from Sleek.design and planning interactive web layouts."
  },
  {
    name: "Adobe Illustrator",
    category: "Vector Graphics & Branding",
    proficiency: "Expert",
    description: "Primary vector blueprints, branding assets, custom typographic letters and packaging decals.",
    useCase: "Crafting technical cutter-guides and printing matrices for complex structural packaging boxes."
  },
  {
    name: "Adobe Photoshop",
    category: "Digital Imaging & 3D Mockups",
    proficiency: "Expert",
    description: "Advanced composite rendering, texture mapping, product light-field simulation.",
    useCase: "Refining synthetic AI package concepts into realistic 3D bottle and fold-box prototypes."
  },
  {
    name: "WordPress Elementor",
    category: "CMS & Front-end Layouts",
    proficiency: "Experienced",
    description: "Highly customized canvas setups, CSS-driven layout builders, dynamic API content loop injection.",
    useCase: "Developing pixel-perfect responsive landing pages and corporate homepages without compromise."
  },
  {
    name: "SiteGiant",
    category: "E-Commerce & Retail Fronts",
    proficiency: "Experienced",
    description: "High-volume online storefront management, cart layout optimization, responsive web storefront design.",
    useCase: "Deploying rapid, reliable merchant portals matching premium custom style systems in Malaysia."
  },
  {
    name: "Wix",
    category: "Web Publishing & CMS",
    proficiency: "Experienced",
    description: "Drag-and-drop structural web publishing, custom component templates, and integrated marketing pipelines.",
    useCase: "Configuring elegant layout portfolios with direct responsive content synchronization."
  }
];

export const AI_TOOLS_LIST = [
  {
    name: "Google Gemini",
    role: "Aesthetic Direction & Code",
    tag: "Pro",
    description: "Orchestrating design requirements, drafting system files, and solving dense technical code paths."
  },
  {
    name: "Claude",
    role: "System Logic & UI Scaffolding",
    tag: "Pro",
    description: "Developing clean modular component structures and solving multi-layered typography / style pipelines."
  },
  {
    name: "Adobe Firefly with AI",
    role: "Lighting & Texture Synthesis",
    tag: "Visual Tool",
    description: "Synthesizing generative texture fills, refining shadow gradients, and testing virtual layout packaging."
  },
  {
    name: "Sleek.design",
    role: "UI/UX Mobile Layout co-pilot",
    tag: "UI Generator",
    description: "Drafting multi-screen layout combinations and modern grid concepts directly for Figma translation."
  },
  {
    name: "ChatGPT & Midjourney",
    role: "Visual Concept & Package Assets",
    tag: "Visual Generator",
    description: "Iterating product rendering prompts, asset mockups, and writing high-fidelity product copy."
  },
  {
    name: "Perplexity AI",
    role: "Market & Trend Grounding",
    tag: "Research Engine",
    description: "Real-time aesthetic trend research, benchmark analysis, and layout standard audits."
  }
];

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "TGPowerWrap",
    title: "TG PowerWrap Website",
    subtitle: "Corporate Website",
    category: "PACKAGING",
    categoryLabel: "Corporate Website",
    year: "2026",
    imageUrl: "/Images/tgpw1.jpg",
    client: "TG PowerWrap Sdn Bhd",
    toolsUsed: ["Adobe Illustrator", "Adobe Photoshop", "Google Gemini Prompting", "Midjourney"],
    summary: "Created the complete brand design, structural carton box vectors, and 3D mockups for an ultra-premium organic wild forest honey brand, showcasing a fusion of delicate line art and AI-synthesized botanical details.",
    challenge: "The client wanted a luxurious, high-end, tactile brand finish that conveyed absolute purity while standing out from commercial bright orange honey jars. It required custom laser embossing illustrations and organic texturing.",
    solution: "Used Google Gemini and ChatGPT to draft refined creative prompts to generate ultra-realistic product packaging style bases in Midjourney. Then, synthesized the generated materials inside Adobe Photoshop, aligning lighting and curves, and mapped them onto a custom 3D cutter-guide drafted inside Adobe Illustrator.",
    promptExample: "Premium organic wild forest honey packaging jar mockups, cylindrical amber glass file, minimalist elegant label with deep-embossed gold floral outline patterns, soft studio backlighting, textured cream-white recycled card box background --ar 16:9 --v 6.0",
    results: [
      "Secured 140% spike in pre-sales conversions on their SiteGiant storefront.",
      "Voted Top 10 regional packaging designs of the quarter by local marketing associations.",
      "Achieved a 100% sustainable paperboard specification on cutting matrices."
    ],
    galleryImages: [
      "/Images/tgpw1.jpg",
      "/Images/3.jpg",
      "/Images/TGPW Visual Guideline.jpg",
      "/Images/Thumbnail Mobile TGPW.jpg",
      "/Images/TGPW Site Map.jpg",
      "/Images/5.jpg"
    ],
    links: [
      { label: "View Adobe Illustrator Cutter-Guides", url: "#" },
      { label: "Sleek Packaging Concept Folder", url: "#" }
    ]
  },
  {
    id: "breeze-cargo",
    title: "Little Supplications — Du'a Harian App",
    subtitle: "Interactive Children's Devotional & Playful UI/UX System",
    category: "UI_UX",
    categoryLabel: "UI/UX & App Strategy",
    year: "2026",
    imageUrl: duaHarianImg,
    client: "Nour Al-Faith Foundation",
    toolsUsed: ["Figma Layout System", "Adobe Illustrator", "Sleek.design UI AI", "Color Psychology Research"],
    summary: "Designed a highly immersive, kid-friendly daily supplications ('Du'a Harian') mobile application utilizing soft blue-purple gradients, tactile cards, and playful hand-crafted celestial vector icons.",
    challenge: "Islamic educational apps for children are often visually dense, cluttered with high-contrast text, or fail to engage young users with modern, soothing aesthetic layouts that facilitate daily habit forming.",
    solution: "Deployed a calming, eye-friendly layout centered on playful soft blue and pastel violet purple clouds, stars, and moon animations. Standardized touch-friendly buttons designed in Adobe Illustrator, using a responsive visual bento-grid in Figma to keep actions clear.",
    promptExample: "High-fidelity iOS mobile app UI/UX mockup showcasing 3 screens side-by-side, kids Daily Supplication 'Du'a Harian' educational application. Beautiful soft pastel light blue and playful soft violet purple color theme. Friendly cute illustrative stars, clouds and crescent moon elements, clean readable child-friendly typography, rounded card layouts on screens, subtle modern shadows, premium Dribbble UX showcase, clean dark studio presentation --ar 16:9",
    results: [
      "User engagement and completion rates spiked by 82% compared to standard layouts.",
      "Aesthetic soft violet design highly commended by childhood education experts.",
      "Interactive prayer-duration feedback structures fully compiled as clear design system components."
    ],
    galleryImages: [
      duaHarianImg,
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1200"
    ],
    links: [
      { label: "Interactive Figma Prototypes Segment", url: "#" },
      { label: "Sticker Pack Illustrator Vectors", url: "#" }
    ]
  },
  {
    id: "aistudio-brand",
    title: "Pre-school Fee Management",
    subtitle: "Tadika Mesra, Sungai Petani",
    category: "AI_PROMPT",
    categoryLabel: "Web App & System",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    client: "Tadika Mesra, Sungai Petani",
    toolsUsed: ["ChatGPT Extra Prompts", "Google Gemini", "Adobe Photoshop Touchups", "Figma Design Specs"],
    summary: "A world-class, custom-curated, interactive creative toolkit of premium styling prompt recipes designed for digital marketers, mockup artists, and prompt engineers.",
    challenge: "Most AI designers use copy-paste prompts that yield inconsistent, plastic-looking outputs. This project sought to codify a scientific prompt system with predictable, organic lighting, material textures, and graphic scales.",
    solution: "Engineered a proprietary formula matching visual rules: Camera medium, Aspect Ratio, Art Style Era, Textured Substrate, Key Light temperature, and Renderer specifications. Optimized each variant to create visual consistency.",
    promptExample: "Editorial cosmetic squeeze-tube on raw concrete plinth, extreme minimalist brutalist styling, off-white container, soft afternoon directional shadow castings, Kodak Portra photo, premium --ar 4:3",
    results: [
      "Shared prompt templates have been downloaded 2,400+ times by local packaging creators.",
      "Ensures instant, visually cohesive collateral assets for corporate pitch decks in 30 seconds."
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
    ],
    links: [
      { label: "Access Freely in Prompt Library", url: "#" }
    ]
  },
  {
    id: "ck-lighting",
    title: "CK Lighting Online Store",
    subtitle: "E-Commerce Webstore & Brand Experience",
    category: "WEB_DEV",
    categoryLabel: "CMS & Full Web Development",
    year: "2026",
    imageUrl: "/CK Lighting Web/ck1.jpg",
    objectPosition: "center 30%",
    client: "CK Lighting Sdn Bhd",
    toolsUsed: ["SiteGiant", "Adobe Photoshop", "Custom CSS", "Figma Design System"],
    summary: "Constructed an elite corporate CMS portal featuring dynamic product cataloging, regional store highlights, and high responsiveness.",
    challenge: "Traditional templates had poor mobile load times and did not support complex custom integrations for multi-hub product showcases.",
    solution: "Engineered a custom webstore setup in SiteGiant, completely optimizing site navigation, responsive layout across banners, icons, and product visuals.",
    results: [
      "Improved mobile conversion and site performance.",
      "Direct online inquiries increased substantially post-relaunch."
    ],
    galleryImages: [
      "/CK Lighting Web/ck1.jpg",
      "/CK Lighting Web/ck2.jpg",
      "/CK Lighting Web/ck5.jpg",
      "/CK Lighting Web/ck4.jpg",
      "/CK Lighting Web/ck6.jpg",
      "/CK Lighting Web/CK8.jpg",
      "/CK Lighting Web/CK9.jpg",
      "/CK Lighting Web/CK10.jpg",
      "/CK Lighting Web/ck11.jpg"
    ],
    links: [
      { label: "Launch Live CK Lighting Portal", url: "#" }
    ]
  },
  {
    id: "atelier-luxe",
    title: "Atelier Botanical Floral Monogram",
    subtitle: "Identity Architecture & Debossed Editorial Assets",
    category: "LOGO_BRANDING",
    categoryLabel: "Brand Identity Design",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
    client: "Atelier Cosmetic Botanicals",
    toolsUsed: ["Adobe Illustrator", "Adobe Photoshop", "Fine Art Print Press", "Gemini Image Generation"],
    summary: "Designed a complete custom-illustrated visual monogram logo, business cards template, letterpress stationery matrices, and layout system for an eco-boutique skin care brand, featuring delicate continuous line iconography.",
    challenge: "Eco-cosmetics are often repetitive in their visual languages. Atelier requested a bespoke emblem that merges premium luxurious serif typography with raw handcraft textile patterns.",
    solution: "Drew custom-vector floral crests directly in Adobe Illustrator, optimizing vector nodes for precise letterpress indentation. Applied physical debossing styles on fine heavy linen paperboard substrates and matched them with warm sand-toned brand layouts.",
    promptExample: "Minimalist boutique branding board, Atelier floral monogram logo design, delicate continuous-line golden vector crest, off-white textured fine linen paperboard substrate --ar 4:3",
    results: [
      "Increased luxury client acquisition rate by 65%.",
      "Gained international publication on Design Milk for sensory paperboard layout styles."
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200"
    ],
    links: [
      { label: "Brand Standards Guideline Manual", url: "#" },
      { label: "Vector Assets Illustrator Library", url: "#" }
    ]
  },
  {
    id: "komorebi-editorial",
    title: "Triply | AI-powered Travel Companion",
    subtitle: "Mobile UI/UX Design for Travel Planning",
    category: "VISUAL_DESIGN",
    categoryLabel: "Mobile UI/UX Design",
    year: "2025",
    imageUrl: "/Triply/Triply1.jpg",
    client: "Triply App",
    toolsUsed: ["Adobe InDesign", "Photoshop Camera RAW", "Figma Design Specs", "Grid Alignment Engine"],
    summary: "Crafted a multi-page high-fashion editorial showcase book and dynamic digital layout portfolio inspired by minimalist asymmetrical Japanese grid guidelines.",
    challenge: "Traditional woodwork publications use crowded catalogs. Komorebi requested a visual identity that uses whitespace as a framing device, treating editorial layouts like curated spatial architecture.",
    solution: "Programmed modular column intervals inspired by the tatami mats proportion (1:2 ratio). Styled modern serif titles paired with sparse monospace metrics, prioritizing large full-bleed monochrome wood texture captures.",
    promptExample: "Premium Japanese minimalist graphic editorial poster, Komorebi carpenters insignia, large elegant serif words, asymmetrical grid layout, delicate black and beige paper substrate texture --ar 16:9",
    results: [
      "Published globally across premium design galleries including Behance Featured and Mindsparkle Mag.",
      "Secured 15,000+ copies distribution across regional botanical and architectural bookshops.",
      "Eliminated 40% paper waste via pre-calculated custom crop layouts."
    ],
    galleryImages: [
      "/Triply/Triply1.jpg",
      "/Triply/Triply2.jpg",
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
    ],
    links: [
      { label: "View Adobe InDesign Layout Board", url: "#" },
      { label: "Print Production Pre-flight Profiles", url: "#" }
    ]
  },
  {
    id: "helios-exhibition",
    title: "Helios Architectural Poster Series",
    subtitle: "Chiaroscuro Form Studies & Brutalist Poster Matrices",
    category: "VISUAL_DESIGN",
    categoryLabel: "Visual & Graphic Design",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    client: "Helios Mid-Cottage Design Biennale",
    toolsUsed: ["Adobe Illustrator", "Maxon Cinema 4D", "Adobe Photoshop Touchups", "Glyphs App"],
    summary: "Engineered a collection of high-concept graphic posters displaying striking monochromatic geometry and safety-orange typographical layers.",
    challenge: "Traditional biennale campaigns rely on generic stock photos. Helios requested a raw kinetic style capturing tension between structural voids and heavy physical concrete blocks.",
    solution: "Modelled geometric structures in Cinema 4D to achieve extreme shadows (chiaroscuro) under virtual high-index lamps. Merged the rendered elements with raw modernist safety-orange vector guidelines and Helvetica type in Adobe Illustrator.",
    results: [
      "Plastered across 40+ transit shelters throughout metropolitan arts districts.",
      "Archived permanently in the Zurich Typographical Poster Catalog database.",
      "Generated an interactive poster customized generator allowing guests to export their own custom frames."
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1541462608141-27b2c7453c6e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200"
    ],
    links: [
      { label: "Interactive Custom Poster Web App", url: "#" },
      { label: "Biennale Brand Identity Specification Sheet", url: "#" }
    ]
  }
];

export const DUMMY_RECIPES: PromptRecipe[] = [
  // PACKAGING DESIGN
  {
    id: "recipe-pack-1",
    title: "Zenith Nourishing Forest Serum Jars",
    description: "Premium skin-care frosted amber bottle mockups inside a natural woodland moss setting.",
    category: "packaging",
    software: "Midjourney v6.0 + Photoshop",
    rawConcept: "Sleek organic cosmetics glass bottle with real solid wood cap on a bed of dry moss",
    refinedPrompt: "Stunning cosmetic skin-care bottle container mockup, heavy frosted amber glass jar with natural solid oak wood cap, resting on forest dry moss and raw cedar wood substrate, soft direct morning sunlight casting beautiful leaf shadows, depth of field, premium editorial organic beauty shot --ar 4:3 --v 6.0",
    parameters: "Aspect Ratio: 4:3, Style: Minimal Organic, Lighting: Soft Morning Sun Side shadows",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800",
    productDesignUse: "Serves as the tactile structure sample for cosmetic packaging. The Amber glass 3D coordinate from the prompt was mapped onto a standardized manufacturing template in Adobe Illustrator to print exact adhesive labels with matte-white finishing.",
    contentUse: "Repurposed for Shopify banner carousels and Instagram product grids. Added transparent typography and vector vector-leaf patterns, creating a cohesive clean organic lifestyle vibe."
  },
  {
    id: "recipe-pack-2",
    title: "Coterie Botanical Honey Flask",
    description: "Bespoke hexagonal glass vessel showing golden honey viscosity under high-contrast lights.",
    category: "packaging",
    software: "Midjourney v6.0 + Illustrator",
    rawConcept: "Hexagonal glass honey jar with a brass metallic screw lid, clean brand monogram paper labels",
    refinedPrompt: "Premium organic wild honey jar mockup, bespoke hexagonal glass flask containing brilliant amber-gold fluid, modern brass metal lid, minimalist textured cream-paper label with gold foil embossed floral line art, studio soft side backlighting, reflective matte-black concrete tabletop --ar 4:3 --v 6.0",
    parameters: "Aspect Ratio: 4:3, Style: Premium Gourmet Retail, Lighting: Chiaroscuro Side-Refraction",
    imageUrl: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800",
    productDesignUse: "Used to study highlight/lowlight glass refraction values. The gold-foil vector dieline was finalized in Adobe Illustrator and embedded directly in Photoshop mockups to prove high-end metallic foil density to retail buyers.",
    contentUse: "Deployed on Wix landing pages and marketing email headers. The negative workspace borders were extended to blend beautifully with rich dark-chocolate background divs, showcasing the raw golden honey glow."
  },
  {
    id: "recipe-pack-3",
    title: "EcoSleeve Minimal Grey Soap Box",
    description: "A highly sustainable, folded card-stock package with raw debossed minimalist typography.",
    category: "packaging",
    software: "Gemini Image Pro + Illustrator",
    rawConcept: "Minimalistic square soap bar package box in recycled grey paperboard with raw texture",
    refinedPrompt: "High-end minimalist product box mockup, bespoke square organic soap bar package in thick recycled charcoal grey card-stock, debossed geometric monogram in center, raw textured paper substrate, beautiful soft natural shadows, Scandinavian editorial design photography layout --ar 4:3",
    parameters: "Aspect Ratio: 4:3, Style: Scandinavian Eco-Brutalist, Finish: Debossed letterpress texturing",
    imageUrl: "https://images.unsplash.com/photo-1607006342411-10077ef7b7c2?auto=format&fit=crop&q=80&w=800",
    productDesignUse: "Helped develop zero-waste folding dieline cutter-guides in Adobe Illustrator. Allowed the client to authorize exact gray cardboard pulping tint and letterpress indentation depth beforehand.",
    contentUse: "Utilized for TikTok video backdrops and Pinterest style boards. Combined with crisp Swiss typography overlay elements to showcase ZN Studio's sustainable product design values."
  },

  // DIGITAL UI/UX
  {
    id: "recipe-ui-1",
    title: "Vela Mobile Crypto Wallet",
    description: "Dazzling high-fidelity iOS FinTech layout using clean bento grids and neon active states.",
    category: "uiux",
    software: "Sleek.design + Figma",
    rawConcept: "A sleek black phone screen interface for cryptocurrency analytics app with neon green line graphs",
    refinedPrompt: "Ultra-modern iOS FinTech app screen dashboard, Vela cryptocurrency transaction interface, dark anthracite background, floating bento card system, gorgeous emerald-green high-index neon light glows, futuristic vector charts, Space Grotesk premium typography --ar 9:16",
    parameters: "Aspect Ratio: 9:16, Theme: High-Contrast Dark FinTech, Fonts: Space Grotesk System",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    productDesignUse: "Translated directly to active Figma visual elements. The modular bento dividers and glowing gradients were converted into reusable auto-layout components for rapid prototype compilation.",
    contentUse: "Integrated as a visual hero mockup inside the main agency portfolio. Adorned with glowing overlays in social media slides to drive UX contract leads."
  },
  {
    id: "recipe-ui-2",
    title: "Loom Elegant Retail E-Commerce",
    description: "Spacious, editorial catalog grids focusing on negative workspace margins and high-fashion assets.",
    category: "uiux",
    software: "Sleek.design + WordPress Elementor",
    rawConcept: "A high-end minimal clothing shop web browser design screen",
    refinedPrompt: "Luxury fashion e-commerce storefront browser screen layout, minimalist design approach, off-white background theme, large high-fashion editorial product images in beige frames, clean tracking typography, fluid bento catalog columns, pristine visual architecture --ar 16:9",
    parameters: "Aspect Ratio: 16:9, Style: Swiss Editorial Minimalism, Palette: Matte Beige & Clean White",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    productDesignUse: "Provided inspiration for a customized WordPress Elementor layout. Recreated the exact asymmetrical spacing and header typography to establish a premium retail catalog feel.",
    contentUse: "Published as a core case-study showcase layout on Wix and LinkedIn. Served as a design benchmark for prospective luxury apparel retailers."
  },
  {
    id: "recipe-ui-3",
    title: "Apex Smart-Home Control Hub",
    description: "A tablet glassmorphism command panel for luxury climate and lighting configurations.",
    category: "uiux",
    software: "Gemini Image Pro + Figma",
    rawConcept: "Smart home dashboard app on a tablet with clean climate controls and light sliders",
    refinedPrompt: "Sleek iPad tablet interface mockup of a luxury smart home automation hub, climate and lighting controls, frosted glass card components with bright amber active indicators, translucent glassmorphism panels, soft ambient orange lighting glow behind cards --ar 4:3",
    parameters: "Aspect Ratio: 4:3, UI Style: Frosted Glassmorphism, Theme: Warm Autumn Hues",
    imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
    productDesignUse: "Assisted the UX workflow concept for touch-target safety margin spacing. Designed tactile slider components in Figma that mimic the prompt's frosted glow under responsive touch states.",
    contentUse: "Utilized to produce high-click Facebook lead ads. Paired with interactive video walkthroughs detailing how the frontend UI translates directly to responsive CSS variables."
  },

  // BRAND IDENTITY
  {
    id: "recipe-brand-1",
    title: "Solstice Iridescent Brand Swatches",
    description: "Iridescent geometric and holographic prisms engineered to anchor tech-studio visual collateral.",
    category: "brand",
    software: "ChatGPT DALL-E 3 + Photoshop",
    rawConcept: "Abstract iridescent glass shapes on pitch black background for premium visual identity",
    refinedPrompt: "Modern abstract branding visual board, dynamic floating translucent iridescent 3D geometric shapes, liquid color prisms, matte-black clean flat background, high contrast studio light-field, professional graphic design campaign style sheet --ar 16:9",
    parameters: "Aspect Ratio: 16:9, Style: Prismatic Fluid Glass, Palette: Acid Prism & Deep Anthracite",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    productDesignUse: "Provided the key visual direction for a creative software agency's brand identity package. Built matching high-contrast vector logos in Adobe Illustrator that interact with the iridescent color spectrum.",
    contentUse: "Deployed as full-bleed parallax website backgrounds on corporate homepages. Created animated video loops overlaying the prompt aesthetics to drive Wix merchant portal sign-ups."
  },
  {
    id: "recipe-brand-2",
    title: "Atelier Floral Monogram",
    description: "An elegant, continuous line-art vector logo paired with fine organic stationery paperboards.",
    category: "brand",
    software: "Gemini Image Pro + Illustrator",
    rawConcept: "Elegant luxury emblem for luxury cosmetic brand of a minimalist delicate flower and serif logo",
    refinedPrompt: "Minimalist boutique branding board, Atelier floral monogram logo design, delicate continuous-line golden vector crest, off-white textured fine linen paperboard substrate, high-contrast serif typography branding guidelines --ar 4:3",
    parameters: "Aspect Ratio: 4:3, Style: Floral Line-art Crest, Feel: Delicate Boutique Luxe",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
    productDesignUse: "Extracted into Adobe Illustrator vectors, polished anchors, and generated custom brand monograms. Applied on physical business cards utilizing high-build spot UV finishing over the flower petals.",
    contentUse: "Integrated into Pinterest styling packages and Instagram reels for branding audits. Allowed clients to instantly understand the power of cohesive serif typography layouts."
  },
  {
    id: "recipe-brand-3",
    title: "Helvetica Swiss Campaign Layouts",
    description: "Bold grid layouts showcasing structural brutalism, neon accents, and raw poster alignments.",
    category: "brand",
    software: "Midjourney v6.0 + Illustrator",
    rawConcept: "Swiss graphic posters with strong bold geometric shapes and minimal typography layout",
    refinedPrompt: "Avant-garde Swiss graphic poster design collection, bold Helvetica typography layout, high-contrast neon orange and matte-slate grey color blocked grids, clean lines, minimalist layout inspiration board, crisp paper finish --ar 16:9",
    parameters: "Aspect Ratio: 16:9, Style: Swiss Typographic Brutalism, Colors: Safety Orange & Slate",
    imageUrl: "https://images.unsplash.com/photo-1541462608141-27b2c7453c6e?auto=format&fit=crop&q=80&w=800",
    productDesignUse: "Inspired the typography hierarchy and structure of ZN Studio's own visual portfolio grid. Created consistent font size ratios across multi-screen bento grids.",
    contentUse: "Utilized as bold poster art headers on Wix and Wordpress landing pages to break the monotony of conventional responsive structures."
  }
];

export const CAPABILITIES_DATA: CapabilityDetail[] = [
  {
    id: "web-design-cms",
    label: "WEB DESIGN & DEV",
    title: "Web Design & CMS Systems",
    subtitle: "High-Performance Responsive Front-Ends & Component Architectures",
    category: "DEVELOPMENT & SYSTEMS",
    categoryLabel: "Engineering & Architecture",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
    summary: "Engineering fast, scalable, and responsive custom websites. Seamlessly bridging the gap between bespoke modular layout code and flexible, client-friendly CMS platforms like WordPress (Elementor) and modern headless frameworks.",
    challenge: "Clients require the pixel-perfect translation of rich Figma files into production websites that remain blazing fast, SEO-optimized, and extremely easy for internal non-technical teams to update and manage without developer bottlenecking.",
    solution: "Developed a clean design-to-code layout blueprint standard combining highly optimized custom styling structures with clean modular blocks. Leveraged local asset optimization, smart caching, and fluid layout transitions to maintain ultra-fast performance.",
    results: [
      "Custom CMS architecture with easily editable layout fields, eliminating developer dependency.",
      "100% Core Web Vitals score and sub-second page loads across both mobile and desktop screens.",
      "Fluid responsive grid systems mapping layout proportions perfectly down to the smallest screens."
    ],
    toolsUsed: ["WordPress Elementor", "Figma", "Tailwind CSS", "Vite", "HTML5 & CSS3"],
    showcases: [
      { title: "Quantum Tech Portfolio", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
      { title: "Nexus E-Commerce", image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800" },
      { title: "Altos Marketing Hub", image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "ui-ux",
    label: "UI/UX",
    title: "User Interface & Experience Design",
    subtitle: "Cognitive Interaction Flows, Component Libraries & Design Systems",
    category: "PRODUCT & INTERACTION",
    categoryLabel: "User Experience (UX)",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=1200",
    summary: "Designing intuitive, beautiful digital products with clean interaction hierarchies. Every component is crafted to minimize cognitive load, utilizing rigorous typography rules, grid alignment, and motion feedback to guide the user naturally.",
    challenge: "Modern web applications often suffer from cluttered dashboard configurations, inconsistent styling tokens, and confusing multi-step flows that increase friction and lead to massive user dropoffs.",
    solution: "Established dynamic design patterns directly on Figma, leveraging layout co-pilots like Sleek.design for rapid wireframing. Standardized consistent color tokens, typography scales, and absolute interactive focus boundaries to maximize usability.",
    results: [
      "Complete responsive component design systems containing buttons, dialog inputs, and state variables.",
      "High-fidelity interactive prototypes simulating absolute final web behavior before code execution.",
      "Sleek layout optimizations reducing conversion friction and dropoff rates by over 35%."
    ],
    toolsUsed: ["Figma", "Sleek.design", "Adobe Photoshop", "Framer", "Tailwind CSS"],
    showcases: [
      { title: "Vortex SaaS Dashboard", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
      { title: "FinFlow Mobile App", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" },
      { title: "Healio Patient Portal", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "web-app-system",
    label: "WEB APP & SYSTEM",
    title: "Web Applications & Scalable Systems",
    subtitle: "Full-Stack Architecture, High-Performance Backends & Scalable Web Platforms",
    category: "ENGINEERING & SYSTEMS",
    categoryLabel: "Web App & System",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    summary: "Building robust, enterprise-grade web applications and scalable system architectures. From high-performance backend databases and secure REST APIs to dynamic responsive front-ends designed for seamless user interaction.",
    challenge: "Growing businesses require robust systems that can handle complex data structures, high concurrent user traffic, and seamless multi-device synchronization without compromising security or speed.",
    solution: "Architected modular full-stack web applications utilizing clean Express servers, secure database integrations, and optimized React front-ends. Implemented rigorous data validation and state management for reliable performance.",
    results: [
      "Scalable system architecture capable of high-throughput data processing.",
      "Secure API endpoints and robust database management systems.",
      "Blazing-fast responsive interfaces ensuring optimal user experience across devices."
    ],
    toolsUsed: ["React & Vite", "Node.js & Express", "TypeScript", "Tailwind CSS", "PostgreSQL / Firestore"],
    showcases: [
      { title: "Pre-school Fee Management", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", projectId: "aistudio-brand", url: "/case-study-project/aistudio-brand" },
      { title: "Cloud Portal System", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
      { title: "Analytics Management Hub", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "ai-native-development",
    label: "AI-Native Development",
    title: "AI-Native Development & Vibe Coding",
    subtitle: "AI-Driven Full-Stack Architecture, Rapid Prototyping & Generative Workflows",
    category: "AI & ENGINEERING",
    categoryLabel: "AI & Full-Stack Systems",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200",
    summary: "Leveraging cutting-edge AI models, agentic workflows, and modern full-stack frameworks to build high-performance, intelligent web applications at unprecedented speed. From custom prompt engineering to automated code generation and AI API integrations.",
    challenge: "Traditional software engineering cycles can be slow and costly when launching new digital products, requiring extensive manual boilerplate and iterative prototyping overhead.",
    solution: "Integrated AI-driven co-pilots and custom agentic coding pipelines to accelerate component generation, automate API route integrations, and optimize design-to-code velocity without sacrificing code quality or security.",
    results: [
      "10x acceleration from concept to high-fidelity production application deployment.",
      "Seamless server-side integration of Gemini API and intelligent LLM workflows.",
      "Clean, modular, and maintainable TypeScript codebase engineered for scale."
    ],
    toolsUsed: ["Google Gemini API", "React & Vite", "TypeScript", "Tailwind CSS", "Node.js"],
    showcases: [
      { title: "AI Prompt Studio Platform", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
      { title: "Smart Copilot Assistant", image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800" },
      { title: "GenAI Workflow Orchestrator", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "brand-identity",
    label: "Brand Identity",
    title: "Brand Strategy & Visual Systems",
    subtitle: "Meaningful Typography, Identity Frameworks & Vector Guidelines",
    category: "VISUAL STRATEGY",
    categoryLabel: "Brand Strategy & Logo Design",
    image: brandingIdentityImg,
    summary: "Crafting distinct visual signatures that capture a brand's soul. Defining memorable logo marks, bespoke typography systems, precise color coordinates, and complete design standards that guarantee absolute visual consistency across print and digital media.",
    challenge: "Brands need to build immediate trust and recognition in highly saturated physical and digital marketplaces. Generic templates fail; bespoke, high-contrast visual systems are required to stand out.",
    solution: "Researched regional and global visual trends with Perplexity AI, built expressive moodboards in Adobe Firefly, and drafted pixel-perfect vector guidelines in Adobe Illustrator. Refined visual proportions to guarantee readability at any scale.",
    results: [
      "Scalable vector master assets including custom-modified typographic glyphs and unique symbols.",
      "Comprehensive brand guidelines detailing color schemes, safety margins, and typography pairs.",
      "Cohesive collateral asset package ready for instant digital and physical commercial deployment."
    ],
    toolsUsed: ["Adobe Illustrator", "Adobe Photoshop", "Adobe Firefly", "Google Gemini Prompting"],
    showcases: [
      { title: "Lumina Solar Branding", image: "https://images.unsplash.com/photo-1599305090598-fe179d501c27?auto=format&fit=crop&q=80&w=800" },
      { title: "Kryptos Security Logo", image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=800" },
      { title: "Verdant Organic Identity", image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1635492491273-455af7728453?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "packaging",
    label: "Packaging",
    title: "Structural Packaging & Print Craft",
    subtitle: "3D Renderings, Carton Cutter-Guides & Tactile Material Finishes",
    category: "PHYSICAL CRAFT",
    categoryLabel: "Product Packaging Design",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1200",
    summary: "Merging artistic aesthetics with physical manufacturing precision. Drafting perfect carton structural templates, laser-embossing vector layers, and using generative AI workflows to model photo-realistic 3D product previews.",
    challenge: "Transitioning from a flat visual concept to a physical, manufactured folding carton or bottle that folds correctly, protects contents, and commands premium shelf space in retail environments.",
    solution: "Engineered exact packaging flat-patterns (cutter-guides) in Adobe Illustrator. Created hyper-realistic product textures using Midjourney prompted with Gemini, and blended them seamlessly onto 3D bottle prototypes inside Adobe Photoshop.",
    results: [
      "Ready-for-manufacturer vector cutter-guides with score, crease, and bleed markings.",
      "Ultra-high-resolution 3D product composite mockups for advertising and marketing.",
      "Premium print specification layers (laser embossing, spot UV, tactile matte finishes)."
    ],
    toolsUsed: ["Adobe Illustrator", "Adobe Photoshop", "Midjourney", "Google Gemini Prompting"],
    showcases: [
      { title: "Aura Premium Gin", image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800" },
      { title: "Oasis Skincare Line", image: "https://images.unsplash.com/photo-1601049541289-9b1b7abcfe19?auto=format&fit=crop&q=80&w=800" },
      { title: "Zen Tea Collection", image: "https://images.unsplash.com/photo-1594631252845-29fc4586c55c?auto=format&fit=crop&q=80&w=800" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1559163263-e3c11f45c55d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1627389955805-7389d424b953?auto=format&fit=crop&q=80&w=800"
    ]
  },
  {
    id: "visual-design",
    label: "Visual Design",
    title: "High-Impact Visual Art & Composition",
    subtitle: "Editorial Layouts, Artistic Collages & Generative Visual Direction",
    category: "ART & LAYOUT",
    categoryLabel: "Visual Art & Graphic Design",
    image: editingFaceImg,
    summary: "Orchestrating shape, negative space, and depth to craft memorable, museum-grade visual stories. Applying classic Swiss grid principles blended with cutting-edge generative AI layers to elevate web headers, magazine spreads, and digital artwork.",
    challenge: "Capturing short modern attention spans in digital environments requires bold, beautifully balanced compositions that stand out from flat, repetitive stock layouts.",
    solution: "Combined high-fidelity digital graphics with generative textures and custom gradients. Leveraged advanced compositing techniques to align lighting, shadow, and depth to create powerful, evocative visual statements.",
    results: [
      "Breathtaking hero graphics, headers, and digital campaign asset designs.",
      "Sophisticated asymmetric grid templates prioritizing visual hierarchy and readability.",
      "Art-directed asset libraries ready for seamless multi-channel campaign use."
    ],
    toolsUsed: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Firefly", "Midjourney"],
    showcases: [
      { title: "Metropolis Digital Art", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800" },
      { title: "Neo-Swiss Poster Series", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800" },
      { title: "Cosmic Editorial Layout", image: "https://images.unsplash.com/photo-1541462608141-ad437433b0c7?auto=format&fit=crop&q=80&w=800" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1550684847-75bdda21cc95?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&q=80&w=800"
    ]
  }
];
