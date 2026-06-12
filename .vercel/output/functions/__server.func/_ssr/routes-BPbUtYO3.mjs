import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useScroll, r as motion, t as useTransform } from "../_libs/framer-motion.mjs";
import { a as Mail, c as Github, d as CodeXml, f as Cloud, i as MapPin, l as Download, m as ArrowUpRight, n as Sparkles, o as Linkedin, p as Brain, r as Rocket, s as Layers, t as Trophy, u as Database } from "../_libs/lucide-react.mjs";
import { t as useEmblaCarousel } from "../_libs/embla-carousel-react+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BPbUtYO3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		id: "about",
		label: "About"
	},
	{
		id: "skills",
		label: "Skills"
	},
	{
		id: "projects",
		label: "Projects"
	},
	{
		id: "experience",
		label: "Experience"
	},
	{
		id: "contact",
		label: "Contact"
	}
];
var SKILLS = [
	{
		group: "Frontend",
		icon: Layers,
		items: [
			"React",
			"Next.js",
			"TypeScript",
			"JavaScript",
			"Tailwind CSS",
			"Flutter"
		]
	},
	{
		group: "Backend",
		icon: CodeXml,
		items: [
			"Node.js",
			"Express.js",
			"FastAPI",
			"Python",
			"REST APIs"
		]
	},
	{
		group: "Databases",
		icon: Database,
		items: [
			"MongoDB",
			"PostgreSQL",
			"Supabase"
		]
	},
	{
		group: "AI & Machine Learning",
		icon: Brain,
		items: [
			"Generative AI",
			"Large Language Models",
			"RAG Systems",
			"Agentic AI",
			"Prompt Engineering",
			"Deep Learning",
			"CNNs",
			"RNNs",
			"GANs",
			"Computer Vision"
		]
	},
	{
		group: "Cloud & DevOps",
		icon: Cloud,
		items: [
			"Docker",
			"GitHub",
			"Vercel",
			"Render",
			"Google Cloud Platform"
		]
	}
];
var PROJECTS = [
	{
		name: "Miraas",
		tagline: "Digital Archiving & Cultural Artifact Restoration",
		description: "An AI-powered platform for cultural preservation that restores damaged historical artifacts and maintains provenance records using blockchain technology.",
		bullets: [
			"AI image restoration pipeline",
			"Backend architecture",
			"Blockchain integration",
			"Team coordination"
		],
		tech: [
			"Python",
			"Computer Vision",
			"AI",
			"Node.js",
			"Express",
			"PostgreSQL"
		],
		accent: "from-violet-500/30 to-fuchsia-500/10",
		github: "https://github.com/Ahsan361/Miras-Digital-Archiving-and-Cultural-Artifact-Preservation",
		showGithub: true,
		liveDemo: "https://miraas.tech",
		showDemo: true
	},
	{
		name: "CIRO",
		tagline: "Crisis Intelligence & Response Orchestrator",
		description: "A multi-agent AI crisis response platform that analyzes crisis reports, performs reasoning, generates response plans, and coordinates emergency actions.",
		bullets: [
			"Multi-agent architecture",
			"Gemini AI integration",
			"FastAPI backend",
			"Flutter mobile app",
			"Supabase database"
		],
		tech: [
			"Python",
			"FastAPI",
			"Gemini",
			"Vertex AI",
			"Flutter",
			"Supabase"
		],
		accent: "from-cyan-500/30 to-blue-500/10",
		github: "https://github.com/Ahsan361/Crisis-Intelligence-Response-Orchestrator",
		showGithub: true,
		liveDemo: "https://crisis-intelligence-response-orches.vercel.app",
		showDemo: true
	},
	{
		name: "PDME",
		tagline: "Disaster Early Warning System",
		description: "An intelligent disaster prediction and monitoring platform developed during the NDMA DEWTE Hackathon. Awarded First Position.",
		bullets: [
			"Backend development",
			"Model training",
			"Disaster prediction pipelines",
			"Database design"
		],
		tech: [
			"Python",
			"Machine Learning",
			"FastAPI",
			"PostgreSQL"
		],
		accent: "from-emerald-500/30 to-teal-500/10",
		award: "🏆 1st Place — NDMA DEWTE",
		github: "YOUR_GITHUB_LINK_HERE",
		showGithub: false,
		liveDemo: "YOUR_LIVE_DEMO_LINK_HERE",
		showDemo: false
	},
	{
		name: "AI-Driven Digital Artifact Restoration",
		tagline: "Image restoration api.",
		description: "Backend API for image restoration built and deployed on Hugging Face Spaces.",
		bullets: [
			"Image restoration",
			"Deep Learning API",
			"Hugging Face Spaces"
		],
		tech: [
			"Python",
			"OpenCV",
			"Hugging Face",
			"Deep Learning",
			"U-Net"
		],
		accent: "from-blue-500/30 to-teal-500/10",
		github: "YOUR_GITHUB_LINK_HERE",
		showGithub: false,
		liveDemo: "https://huggingface.co/spaces/AhsanAftab/restoration-api",
		showDemo: true
	},
	{
		name: "Damage Segmentation Api ⚡",
		tagline: "segformer sementic segmentation model for damage detection",
		description: "A semantic segmentation API using SegFormer to detect and highlight damage in images.",
		bullets: [
			"Semantic segmentation",
			"Damage detection",
			"Hugging Face Spaces"
		],
		tech: [
			"Python",
			"Segformer",
			"Hugging Face",
			"SegFormer"
		],
		accent: "from-rose-500/30 to-pink-500/10",
		github: "YOUR_GITHUB_LINK_HERE",
		showGithub: false,
		liveDemo: "https://huggingface.co/spaces/AhsanAftab/damage-segmentation-api",
		showDemo: true
	}
];
var EXPERIENCE = [{
	role: "MERN Stack Developer Intern",
	company: "OctaThorn",
	period: "Internship",
	bullets: [
		"Full-stack web application development",
		"API development",
		"Database integration",
		"Feature implementation"
	]
}, {
	role: "App Development Intern",
	company: "AKSA-SDS",
	period: "Jul 2025 – Sep 2025",
	bullets: [
		"Mobile application development",
		"Flutter UI development",
		"State management",
		"Firebase integration"
	]
}];
var ACHIEVEMENTS = [
	{
		icon: Trophy,
		title: "First Position",
		subtitle: "NDMA DEWTE Hackathon"
	},
	{
		icon: Sparkles,
		title: "Shortlisted Team",
		subtitle: "AISeekho 2026 Hackathon"
	},
	{
		icon: Rocket,
		title: "10+ Projects",
		subtitle: "AI & Full Stack Development"
	}
];
var MARQUEE = [
	"Generative AI",
	"RAG",
	"Agentic AI",
	"LLMs",
	"Next.js",
	"FastAPI",
	"Computer Vision",
	"MERN",
	"Vertex AI",
	"Supabase",
	"Docker",
	"GCP"
];
function Portfolio() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen overflow-x-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackgroundFX, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Achievements, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			})
		]
	});
}
function BackgroundFX() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-bg opacity-40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-40 -left-32 h-[480px] w-[480px] rounded-full bg-[oklch(0.72_0.22_295)]/25 blur-3xl animate-blob" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-[oklch(0.75_0.18_220)]/20 blur-3xl animate-blob",
				style: { animationDelay: "4s" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-[oklch(0.7_0.22_330)]/15 blur-3xl animate-blob",
				style: { animationDelay: "8s" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_75%)]" })
		]
	});
}
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: `flex w-full items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${scrolled ? "glass-strong glow-ring" : "glass"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "#top",
						className: "flex items-center gap-2.5 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid h-8 w-8 place-items-center rounded-lg border border-violet-500/40 bg-violet-500/10 font-display text-xs font-bold text-violet-300 tracking-wide",
							children: "MA"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-sm font-semibold tracking-tight",
							children: "Muhammad Ahsan Aftab"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "hidden items-center gap-1 md:flex",
						children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `#${n.id}`,
							className: "rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground",
							children: n.label
						}) }, n.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#contact",
							className: "group hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:scale-[1.03] sm:inline-flex",
							children: ["Hire me", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Toggle menu",
							"aria-expanded": open,
							onClick: () => setOpen((v) => !v),
							className: "grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-foreground transition-colors hover:bg-white/10 md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative block h-3 w-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-0 top-3 h-0.5 w-4 bg-current transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}` })
								]
							})
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `overflow-hidden transition-all duration-300 md:hidden ${open ? "mt-2 max-h-96 opacity-100" : "max-h-0 opacity-0"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "glass-strong flex flex-col gap-1 rounded-3xl p-3",
					children: [NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${n.id}`,
						onClick: () => setOpen(false),
						className: "block rounded-2xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground",
						children: n.label
					}) }, n.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "sm:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#contact",
							onClick: () => setOpen(false),
							className: "mt-1 flex items-center justify-center gap-1.5 rounded-2xl bg-foreground px-4 py-2.5 text-sm font-medium text-background",
							children: ["Hire me", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" })]
						})
					})]
				})
			})]
		})
	});
}
function Hero() {
	const ref = (0, import_react.useRef)(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	});
	const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
	const opacity = useTransform(scrollYProgress, [0, .8], [1, 0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "top",
		ref,
		className: "relative flex min-h-[100svh] items-center px-5 pt-32 pb-20 sm:px-8 lg:px-10 xl:px-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			style: {
				y,
				opacity
			},
			className: "mx-auto w-full max-w-7xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-12 lg:grid-cols-12 lg:gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7 xl:col-span-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .6 },
							className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex h-2 w-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-emerald-400" })]
							}), "Open to AI Engineer & Full Stack roles"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
							initial: {
								opacity: 0,
								y: 30
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .7,
								delay: .1
							},
							className: "mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6rem]",
							children: [
								"Muhammad ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden sm:block" }),
								"Ahsan Aftab"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .7,
								delay: .2
							},
							className: "mt-5 max-w-2xl text-lg text-foreground/80 sm:text-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient font-medium",
								children: "Full Stack AI Engineer"
							}), " building AI-powered applications, Agentic AI systems, and scalable full-stack products."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .7,
								delay: .3
							},
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#contact",
									className: "group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:gap-3 hover:shadow-[0_0_40px_-5px_oklch(0.72_0.22_295)]",
									children: ["Hire me", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#projects",
									className: "inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10",
									children: "View Projects"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/resume.pdf",
									download: true,
									className: "inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), "Resume"]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: {
						duration: .8,
						delay: .5
					},
					className: "grid grid-cols-3 gap-4 lg:col-span-5 lg:grid-cols-1 lg:gap-5 xl:col-span-4",
					children: [
						{
							k: "10+",
							v: "AI & Full Stack Projects"
						},
						{
							k: "1st",
							v: "NDMA DEWTE Hackathon"
						},
						{
							k: "2x",
							v: "Industry Internships"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl px-4 py-4 lg:px-6 lg:py-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-2xl font-semibold text-gradient lg:text-4xl",
							children: s.k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-muted-foreground lg:text-sm",
							children: s.v
						})]
					}, s.v))
				})]
			})
		})
	});
}
function Marquee() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative border-y border-white/5 bg-white/[0.02] py-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex animate-marquee gap-10 whitespace-nowrap",
			children: [...MARQUEE, ...MARQUEE].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-sm uppercase tracking-widest text-muted-foreground/70",
				children: [
					it,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-10 text-foreground/30",
						children: "✦"
					})
				]
			}, i))
		})
	});
}
function SectionHeading({ eyebrow, title, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl",
				children: title
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base text-muted-foreground",
				children: sub
			})
		]
	});
}
function Reveal({ children, delay = 0, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 24
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			duration: .6,
			delay
		},
		className,
		children
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		className: "relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "About",
				title: "Engineer at the intersection of AI and product."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-3xl p-7 md:col-span-2 lg:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-base leading-relaxed text-foreground/85",
						children: [
							"I'm a final-year Computer Science student with experience across full-stack development, machine learning, deep learning, and AI-powered application development. My expertise spans the",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: "MERN stack"
							}),
							", Generative AI applications,",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: "Retrieval Augmented Generation (RAG)"
							}),
							",",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: "Agentic AI systems"
							}),
							", backend engineering, and cloud deployment."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-muted-foreground",
						children: "I enjoy building intelligent software that combines modern web technologies with AI capabilities to solve real-world problems — from cultural preservation platforms to multi-agent crisis response systems."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass rounded-3xl p-7",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Available worldwide · Remote"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "GenAI · RAG · Agentic AI"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "MERN · Next.js · FastAPI"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "h-4 w-4 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "GCP · Vercel · Docker"
								})]
							})
						]
					})
				})]
			}) })]
		})
	});
}
function Skills() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "skills",
		className: "relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Toolkit",
				title: "Skills & Stack",
				sub: "A pragmatic stack spanning product engineering and modern AI."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: SKILLS.map((s, i) => {
					const Icon = s.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group relative h-full overflow-hidden rounded-3xl glass p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.06]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-10 w-10 place-items-center rounded-xl bg-white/5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-accent" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-semibold",
										children: s.group
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-5 flex flex-wrap gap-2",
									children: s.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-foreground/80",
										children: it
									}, it))
								})
							]
						})
					}, s.group);
				})
			})]
		})
	});
}
function Projects() {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "start",
		loop: true,
		dragFree: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "projects",
		className: "relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Selected Work",
					title: "Featured Projects",
					sub: "Shipped products combining AI capabilities with real-world impact."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-14",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute left-0 top-0 z-10 h-10 w-full bg-gradient-to-b from-background to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent sm:w-24" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent sm:w-24" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden py-2",
							ref: emblaRef,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex",
								children: PROJECTS.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-w-0 flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
										delay: i * .08,
										className: "h-full",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
											className: "group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition-all hover:-translate-y-1 hover:glow-ring",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br ${p.accent} blur-3xl transition-opacity duration-500 group-hover:opacity-100` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [
													p.award && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mb-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-1 text-xs text-amber-300",
														children: p.award
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "font-display text-2xl font-semibold tracking-tight",
														children: p.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-1 text-sm text-accent",
														children: p.tagline
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-4 text-sm leading-relaxed text-muted-foreground",
														children: p.description
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
														className: "mt-5 space-y-1.5 text-sm",
														children: p.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
															className: "flex items-start gap-2 text-foreground/80",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" }), b]
														}, b))
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mt-6 flex flex-wrap gap-1.5",
														children: p.tech.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-muted-foreground",
															children: t
														}, t))
													}),
													(p.showGithub || p.showDemo) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-6 flex gap-3",
														children: [p.showGithub && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
															href: p.github,
															target: "_blank",
															rel: "noreferrer",
															className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-white/10",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "h-3.5 w-3.5" }), "GitHub"]
														}), p.showDemo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
															href: p.liveDemo,
															target: "_blank",
															rel: "noreferrer",
															className: "inline-flex items-center gap-2 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background transition-transform hover:scale-[1.02]",
															children: ["Live Demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3.5 w-3.5" })]
														})]
													})
												]
											})]
										})
									})
								}, p.name))
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselArrow, {
							direction: "prev",
							onClick: () => emblaApi?.scrollPrev()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselDots, {
							api: emblaApi,
							count: PROJECTS.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarouselArrow, {
							direction: "next",
							onClick: () => emblaApi?.scrollNext()
						})
					]
				})
			]
		})
	});
}
function CarouselArrow({ direction, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-label": direction === "prev" ? "Previous project" : "Next project",
		className: "group grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:border-white/25 hover:bg-white/10 hover:text-foreground hover:scale-105 active:scale-95",
		children: direction === "prev" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "h-4 w-4 transition-transform group-hover:-translate-x-0.5",
			viewBox: "0 0 16 16",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 12L6 8l4-4",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			className: "h-4 w-4 transition-transform group-hover:translate-x-0.5",
			viewBox: "0 0 16 16",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "1.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6 4l4 4-4 4",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		})
	});
}
function CarouselDots({ api, count }) {
	const [selected, setSelected] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!api) return;
		const onSelect = () => setSelected(api.selectedScrollSnap());
		api.on("select", onSelect);
		onSelect();
		return () => {
			api.off("select", onSelect);
		};
	}, [api]);
	(0, import_react.useEffect)(() => {
		if (!api) return;
		let timer;
		const start = () => {
			timer = setInterval(() => {
				api.scrollNext();
			}, 3e3);
		};
		const stop = () => clearInterval(timer);
		start();
		api.on("pointerDown", stop);
		api.on("pointerUp", start);
		return () => {
			stop();
			api.off("pointerDown", stop);
			api.off("pointerUp", start);
		};
	}, [api]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-1.5",
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => api?.scrollTo(i),
			"aria-label": `Go to project ${i + 1}`,
			className: `h-1.5 rounded-full transition-all duration-300 ${i === selected ? "w-6 bg-foreground" : "w-1.5 bg-white/20 hover:bg-white/40"}`
		}, i))
	});
}
function Experience() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "experience",
		className: "relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Experience",
				title: "Where I've worked"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-10",
					children: EXPERIENCE.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .05,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pl-10 md:pl-0 md:text-right md:pr-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
										children: e.period
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-display text-xl font-semibold",
										children: e.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-accent",
										children: e.company
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pl-10 md:pl-12",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute left-1.5 grid h-4 w-4 -translate-y-0.5 place-items-center rounded-full bg-background md:left-1/2 md:-translate-x-1/2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "glass space-y-1.5 rounded-2xl p-5 text-sm",
									children: e.bullets.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2 text-foreground/80",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" }), b]
									}, b))
								})]
							})]
						})
					}, e.role))
				})]
			})]
		})
	});
}
function Achievements() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Recognition",
				title: "Achievements"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid gap-5 md:grid-cols-3",
				children: ACHIEVEMENTS.map((a, i) => {
					const Icon = a.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * .06,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass group rounded-3xl p-7 text-center transition-all hover:-translate-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-7 w-7 text-accent" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 font-display text-xl font-semibold",
									children: a.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: a.subtitle
								})
							]
						})
					}, a.title);
				})
			})]
		})
	});
}
function Contact() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: "relative px-5 py-28 sm:px-8 lg:px-10 xl:px-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-5xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-[2rem] glass-strong p-10 sm:p-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-32 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-full bg-[var(--gradient-primary,linear-gradient(135deg,#a78bfa,#22d3ee))] opacity-20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground",
							children: "Let's build something"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl",
							children: "Have an AI product in mind?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-muted-foreground",
							children: "I'm currently open to full-time roles, contract work, and ambitious side projects. Let's talk about what you're building."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "mailto:ahsanaftab077@gmail.com",
								className: "group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all hover:gap-3 hover:shadow-[0_0_40px_-5px_oklch(0.72_0.22_295)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }), " Contact me"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/resume.pdf",
								download: true,
								className: "inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download Resume"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialLink, {
									href: "https://github.com/Ahsan361",
									icon: Github,
									label: "GitHub"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialLink, {
									href: "https://linkedin.com/in/muhammad-ahsan-aftab-7085ba2a7",
									icon: Linkedin,
									label: "LinkedIn"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialLink, {
									href: "mailto:ahsanaftab077@gmail.com",
									icon: Mail,
									label: "Email"
								})
							]
						})
					]
				})]
			}) })
		})
	});
}
function SocialLink({ href, icon: Icon, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		target: "_blank",
		rel: "noreferrer",
		"aria-label": label,
		className: "grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-white/10 hover:text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-white/5 px-5 py-10 sm:px-8 lg:px-10 xl:px-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Muhammad Ahsan Aftab. Built with care."
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-mono text-xs uppercase tracking-widest",
				children: [
					"Full Stack ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-accent",
						children: "×"
					}),
					" AI Engineer"
				]
			})]
		})
	});
}
//#endregion
export { Portfolio as component };
