export const PROFILE = {
  name: "Muhammad Ahsan Aftab",
  email: "ahsanaftab077@gmail.com",
  github: "https://github.com/Ahsan361",
  linkedin: "https://linkedin.com/in/muhammad-ahsan-aftab-7085ba2a7",
  resume: "/resume.pdf",
};

export const NAV = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const PROOF = [
  {
    title: "First place at the NDMA Disaster Early Warning Tech Expo 2025",
    note: "National Disaster Management Authority, Pakistan. Won with PDME, a flood and wildfire risk platform.",
  },
  {
    title: "Three internships since 2024",
    note: "Full-stack web development at Octathorn, app development at AKSA-SDS, and web and mobile development at LEOS.",
  },
  {
    title: "BS Computer Science",
    note: "Air University Islamabad, 2022 to 2026.",
  },
];

export interface Link {
  label: string;
  href: string;
}

export interface Stage {
  name: string;
  reads: string;
  makes: string;
}

export type VisualKind = "spotter" | "pipeline-ciro" | "layers-miras" | "pipeline-restoration";

export interface Project {
  slug: string;
  meta: string;
  name: string;
  kicker: string;
  summary: string;
  points: string[];
  stack: string[];
  links: Link[];
  note?: string;
  visual: VisualKind;
}

export const PROJECTS: Project[] = [
  {
    slug: "spotter",
    meta: "Solo project, live demo",
    name: "Spotter",
    kicker: "Weather-aware truck routing",
    summary:
      "Pick a start, a destination, a departure time and a load weight. Spotter finds up to three routes, works out when the truck reaches each checkpoint, checks the forecast for that place at that hour, and recommends the safest route with a one-sentence reason.",
    points: [
      "Forecasts are looked up for the hour the truck actually arrives, not the hour it leaves. A 6 am departure from Chicago doesn't care what Nebraska's weather is at 6 am.",
      "Every checkpoint is scored from Low to No Travel, taking load weight into account, and shown on a map with a time slider and a heatmap of bad weather.",
      "Routes of about 15,000 points are thinned to roughly a thousand with the Ramer-Douglas-Peucker algorithm before they reach the browser.",
      "Backend and frontend both have tests, and the README lists what it doesn't handle yet: wind gusts, rest-break aware ETAs, request throttling.",
    ],
    stack: [
      "Django REST Framework",
      "React",
      "TypeScript",
      "MapLibre GL JS",
      "TanStack Query",
      "OSRM",
      "Open-Meteo",
    ],
    links: [
      { label: "Live demo", href: "https://weather-aware-truck-routing-alpha-three.vercel.app" },
      { label: "Source", href: "https://github.com/Ahsan361/Weather-Aware-Truck-Routing" },
    ],
    visual: "spotter",
  },
  {
    slug: "ciro",
    meta: "Team project, live demo",
    name: "CIRO",
    kicker: "Crisis Intelligence and Response Orchestrator",
    summary:
      "A team project for the Innovista Hackathon: a command centre for Islamabad. It takes crisis signals from citizens, weather and traffic feeds, and turns each one into a classified, prioritised response plan.",
    points: [
      "I built the backend: the FastAPI service and the orchestration of a five-agent pipeline on Gemini 2.5 Flash that handles each report in turn (collect, detect, reason, plan, simulate).",
      "The pipeline reads Roman Urdu, and every report is stored with its detected language and a confidence score.",
      "The full agent trace and the simulation result are saved with each report in Supabase, so any plan can be traced to the steps that produced it.",
      "The same API and database serve a Flutter citizen app and a React web dashboard. I also worked on the frontend, but the backend was my main part.",
    ],
    stack: ["FastAPI", "Gemini 2.5 Flash", "Supabase", "Flutter", "React"],
    links: [
      { label: "Live demo", href: "https://crisis-intelligence-response-orches.vercel.app" },
      {
        label: "Source",
        href: "https://github.com/Ahsan361/Crisis-Intelligence-Response-Orchestrator",
      },
      {
        label: "Mobile demo video",
        href: "https://drive.google.com/file/d/1BX2srDHEKHPRC0_MoxvoN5dTZbIKNAzG/view?usp=drive_link",
      },
    ],
    visual: "pipeline-ciro",
  },
  {
    slug: "miras",
    meta: "Team project, live site",
    name: "Miras",
    kicker: "Digital archiving and marketplace for cultural artifacts",
    summary:
      "A team project: a platform where institutions catalogue cultural artifacts, run virtual exhibitions and events, sell tickets, hold auctions, and record ownership on a blockchain.",
    points: [
      "I wrote the Solidity smart contracts for NFT minting, on-chain provenance, and marketplace listings and transactions, and connected them to the backend with Ethers.js.",
      "On the Express backend I added phase-based email updates for listing submissions and a domain whitelisting feature, and moved email to Resend.",
      "I containerized the React client with Docker and fixed routing and deployment problems on Vercel, so the site runs live at miraas.tech.",
      "The rest of the platform, built by the team, covers Stripe payments, Cloudinary media, and auctions with scheduled checker jobs.",
    ],
    stack: [
      "React 19",
      "Material UI",
      "Redux Toolkit",
      "Express 5",
      "MongoDB",
      "Solidity",
      "Ethers.js",
      "Docker",
    ],
    links: [{ label: "Live site", href: "https://miraas.tech" }],
    note: "The source code is private.",
    visual: "layers-miras",
  },
  {
    slug: "restoration",
    meta: "Solo project, live APIs",
    name: "Digital Artifact Restoration",
    kicker: "Finding and filling damage in photos of historical artifacts",
    summary:
      "A solo project. No labelled damage dataset existed for this, so it starts by building one. Two trained models then locate the damage and reconstruct what's missing, and both run as APIs.",
    points: [
      "I wrote an OpenCV generator that applies five kinds of synthetic damage (patches, cracks, blur, scratches, stains) to clean images, giving damaged and clean pairs with pixel-level masks.",
      "I fine-tuned SegFormer-B2 for six-class damage segmentation, using a class-weighted Focal Loss and mixed-precision training to cope with class imbalance.",
      "I trained an inpainting GAN with a U-Net generator on a ResNet34 encoder and a PatchGAN discriminator, using L1, VGG perceptual and adversarial losses, and evaluated it with PSNR.",
    ],
    stack: ["PyTorch", "SegFormer", "GANs", "OpenCV", "Hugging Face Spaces"],
    links: [
      {
        label: "Segmentation API",
        href: "https://huggingface.co/spaces/AhsanAftab/damage-segmentation-api",
      },
      {
        label: "Restoration API",
        href: "https://huggingface.co/spaces/AhsanAftab/restoration-api",
      },
    ],
    note: "The source code is private.",
    visual: "pipeline-restoration",
  },
];

export const CIRO_STAGES: Stage[] = [
  {
    name: "Signal collector",
    reads: "The raw report text and its location",
    makes: "Cleaned text, and the language it was written in (Roman Urdu included)",
  },
  {
    name: "Crisis detector",
    reads: "The cleaned text",
    makes: "A crisis type, such as flood, with a confidence score",
  },
  {
    name: "Reasoning analyzer",
    reads: "The crisis type and the area",
    makes: "A severity level and a priority score",
  },
  {
    name: "Action planner",
    reads: "The severity and the crisis type",
    makes: "A response plan mapped to departments, for example Rescue 1122 and Police",
  },
  {
    name: "Simulator",
    reads: "The action plan and the area",
    makes: "Route detours, before and after ETAs, and an emergency ticket",
  },
];

export const RESTORATION_STAGES: Stage[] = [
  {
    name: "Build the data",
    reads: "Clean photos of artifacts",
    makes: "Damaged and clean pairs, with a pixel-level mask for each kind of damage",
  },
  {
    name: "Find the damage",
    reads: "A damaged image",
    makes: "A mask that labels each pixel with one of six damage classes (SegFormer-B2)",
  },
  {
    name: "Fill it in",
    reads: "The image and its damage mask",
    makes: "A reconstructed image, scored against the original with PSNR (inpainting GAN)",
  },
];

export const MIRAS_LAYERS = [
  {
    name: "Client",
    items: ["React 19 and Vite", "Material UI", "Redux Toolkit", "React Router"],
  },
  {
    name: "API",
    items: [
      "Express 5 with JWT auth",
      "Stripe payments",
      "Cloudinary media",
      "Resend email",
      "node-cron jobs",
    ],
  },
  {
    name: "Data and chain",
    items: [
      "MongoDB with Mongoose",
      "Solidity contracts",
      "Ethers.js bridge",
      "On-chain provenance",
    ],
  },
];

export const MIRAS_FEATURES = [
  "Artifact catalogue",
  "Virtual exhibitions",
  "Events and tickets",
  "Auctions",
  "Listings and orders",
  "Memberships",
  "Donations",
];

export interface SideProject {
  name: string;
  summary: string;
  stack: string;
  link?: Link;
}

export const MORE_WORK: SideProject[] = [
  {
    name: "PDME",
    summary:
      "Pakistan Disaster Management Ecosystem. A Node.js backend connected to PostgreSQL for flood and wildfire risk and emergency coordination, with the flood and forest-fire prediction models trained in Python. First place at the NDMA Disaster Early Warning Tech Expo 2025.",
    stack: "Node.js, PostgreSQL, Python",
  },
  {
    name: "Mini-language compiler",
    summary:
      "A compiler for a small language, written in Python: lexer, parser, semantic analyzer, optimizer and code generator, with test programs for missing semicolons, type mismatches and undeclared or duplicate variables.",
    stack: "Python",
    link: { label: "Source", href: "https://github.com/Ahsan361/minilanguage-compiler" },
  },
  {
    name: "AI hiring automation",
    summary:
      "An n8n workflow for software and business-development hiring. It takes form submissions, extracts resume text, scores candidates with Gemini on Vertex AI using role-specific prompts, removes duplicates, and sends emails and calendar invites, with state kept in Supabase.",
    stack: "n8n, Vertex AI, Supabase",
  },
];

export interface Role {
  title: string;
  company: string;
  place: string;
  period: string;
  points: string[];
}

export const EXPERIENCE: Role[] = [
  {
    title: "Full Stack Web Development Intern",
    company: "Octathorn",
    place: "Rawalpindi",
    period: "Jul to Aug 2025",
    points: [
      "Built real-time features on WebSockets: live messaging and multi-user interaction.",
      "Developed React and Material UI components and wired them to backend REST APIs.",
    ],
  },
  {
    title: "App Development Intern",
    company: "AKSA-SDS",
    place: "Hybrid, Islamabad",
    period: "Jul to Sep 2025",
    points: [
      "Built cross-platform Flutter apps with Firebase, API connectivity and responsive screens.",
      "Implemented state management, reusable screens and a scalable app structure.",
    ],
  },
  {
    title: "Web and Mobile App Developer Intern",
    company: "LEOS (Laser & Electro Optical Solutions)",
    place: "Pakistan",
    period: "Jul to Sep 2024",
    points: [
      "Built and maintained a full-stack Flutter app for web and mobile, using Firebase and Cloud Firestore.",
    ],
  },
];

export const CAPABILITIES = [
  {
    area: "Machine learning",
    items:
      "PyTorch, TensorFlow, Hugging Face Transformers, OpenCV, computer vision, SegFormer, GANs",
  },
  {
    area: "LLMs and agents",
    items: "Gemini, Vertex AI, multi-agent pipelines, prompt engineering, n8n workflow automation",
  },
  {
    area: "Backend",
    items:
      "FastAPI, Django REST Framework, Node.js and Express, REST APIs, WebSockets, scheduled jobs",
  },
  {
    area: "Frontend and mobile",
    items: "React, Next.js, TypeScript, Tailwind CSS, Flutter",
  },
  {
    area: "Data and shipping",
    items: "PostgreSQL, Supabase, MongoDB, Firebase, Docker, Vercel, Render, Hugging Face Spaces",
  },
];
