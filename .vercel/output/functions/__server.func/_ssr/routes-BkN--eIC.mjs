import { r as __toESM } from "../_runtime.mjs";
import { a as MIRAS_LAYERS, c as PROFILE, d as RESTORATION_STAGES, i as MIRAS_FEATURES, l as PROJECTS, n as CIRO_STAGES, o as MORE_WORK, r as EXPERIENCE, s as NAV, t as CAPABILITIES, u as PROOF } from "./site-Os0M_2SH.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as ArrowUpRight, t as Check } from "../_libs/lucide-react.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BkN--eIC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var RAMP = [
	{
		at: .2,
		rgb: "62,158,102",
		alpha: .4
	},
	{
		at: .4,
		rgb: "231,180,22",
		alpha: .5
	},
	{
		at: .6,
		rgb: "238,127,31",
		alpha: .55
	},
	{
		at: .8,
		rgb: "211,43,60",
		alpha: .6
	},
	{
		at: 1,
		rgb: "106,44,158",
		alpha: .7
	}
];
var ROUTE_COLOR = "#2347f5";
var INK = "#0e1a21";
var GROUND = "#e9eeec";
var ROUTE_POINTS = 160;
var LEVEL_STEP = .08;
var SEGMENTS = [
	[],
	[3, 2],
	[2, 1],
	[3, 1],
	[0, 1],
	[
		0,
		1,
		3,
		2
	],
	[0, 2],
	[0, 3],
	[0, 3],
	[0, 2],
	[
		0,
		3,
		2,
		1
	],
	[0, 1],
	[3, 1],
	[2, 1],
	[3, 2],
	[]
];
var MinHeap = class {
	keys = [];
	vals = [];
	get size() {
		return this.keys.length;
	}
	clear() {
		this.keys.length = 0;
		this.vals.length = 0;
	}
	push(key, val) {
		const { keys, vals } = this;
		let i = keys.length;
		keys.push(key);
		vals.push(val);
		while (i > 0) {
			const p = i - 1 >> 1;
			if (keys[p] <= key) break;
			keys[i] = keys[p];
			vals[i] = vals[p];
			i = p;
		}
		keys[i] = key;
		vals[i] = val;
	}
	pop() {
		const { keys, vals } = this;
		const top = vals[0];
		const lastKey = keys.pop();
		const lastVal = vals.pop();
		const n = keys.length;
		if (n > 0) {
			let i = 0;
			for (;;) {
				let c = 2 * i + 1;
				if (c >= n) break;
				if (c + 1 < n && keys[c + 1] < keys[c]) c++;
				if (keys[c] >= lastKey) break;
				keys[i] = keys[c];
				vals[i] = vals[c];
				i = c;
			}
			keys[i] = lastKey;
			vals[i] = lastVal;
		}
		return top;
	}
};
function terrain(x, y, t) {
	const u = x / 700;
	const v = y / 700;
	return .5 + .2 * Math.sin(u * 2.1 + 1.3 * Math.sin(v * 1.7 + t * .06)) + .17 * Math.sin(v * 2.9 - u * 1.4 + 1.1 + t * .045) + .09 * Math.sin((u + v) * 5.1 + t * .07) + .05 * Math.sin(u * 9.7 - v * 4.3);
}
function RouteField({ mode = "scene", paused = false, className }) {
	const canvasRef = (0, import_react.useRef)(null);
	const pausedRef = (0, import_react.useRef)(paused);
	(0, import_react.useEffect)(() => {
		pausedRef.current = paused;
	}, [paused]);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const host = canvas?.parentElement;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !host || !ctx) return;
		const scene = mode === "scene";
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const staticOnly = reduceMotion || !scene;
		let w = 0;
		let h = 0;
		let dpr = 1;
		let cell = 14;
		let cols = 0;
		let rows = 0;
		let elev = new Float32Array(0);
		let hazard = new Float32Array(0);
		let gScore = new Float32Array(0);
		let came = new Int32Array(0);
		let closed = new Uint8Array(0);
		const heap = new MinHeap();
		let blocked = new Uint8Array(0);
		let avoid = [];
		let target = null;
		let shown = null;
		const pointer = {
			x: 0,
			y: 0,
			active: false,
			px: 0,
			py: 0,
			strength: 0
		};
		let raf = 0;
		let running = false;
		let visible = true;
		let lastRoute = -1e9;
		let lastDraw = 0;
		let clock = 0;
		let prev = 0;
		function resize() {
			const rect = host.getBoundingClientRect();
			w = Math.max(1, Math.round(rect.width));
			h = Math.max(1, Math.round(rect.height));
			dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			cell = w < 640 ? 12 : 14;
			while ((w / cell + 2) * (h / cell + 2) > 14e3) cell += 2;
			cols = Math.ceil(w / cell) + 1;
			rows = Math.ceil(h / cell) + 1;
			const n = cols * rows;
			elev = new Float32Array(n);
			hazard = new Float32Array(n);
			gScore = new Float32Array(n);
			came = new Int32Array(n);
			closed = new Uint8Array(n);
			target = null;
			shown = null;
			lastRoute = -1e9;
			measureAvoid();
		}
		function storms(t) {
			const s = Math.min(1, Math.max(.6, w / 1200));
			const out = [
				{
					x: w * (.42 + .14 * Math.sin(t * .11)),
					y: h * (.62 + .1 * Math.sin(t * .09 + 1)),
					sigma: 44 * s,
					strength: 1.05
				},
				{
					x: w * (.76 + .08 * Math.sin(t * .08 + 2.2)),
					y: h * (.5 + .1 * Math.sin(t * .13 + .4)),
					sigma: 38 * s,
					strength: .95
				},
				{
					x: w * (.2 + .08 * Math.sin(t * .1 + 4)),
					y: h * (.74 + .06 * Math.sin(t * .12 + 2)),
					sigma: 30 * s,
					strength: .8
				}
			];
			if (pointer.strength > .02) out.push({
				x: pointer.px,
				y: pointer.py,
				sigma: 64 * s,
				strength: 1.45 * pointer.strength
			});
			return out;
		}
		function computeFields(t, list) {
			for (let j = 0; j < rows; j++) {
				const y = j * cell;
				for (let i = 0; i < cols; i++) {
					const x = i * cell;
					const idx = j * cols + i;
					elev[idx] = terrain(x, y, t);
					if (scene) {
						let hz = 0;
						for (let k = 0; k < list.length; k++) {
							const s = list[k];
							const dx = x - s.x;
							const dy = y - s.y;
							hz += s.strength * Math.exp(-(dx * dx + dy * dy) / (2 * s.sigma * s.sigma));
						}
						hazard[idx] = hz;
					}
				}
			}
		}
		function drawContours(color, minor, major) {
			ctx.lineCap = "round";
			for (const pass of [0, 1]) {
				ctx.beginPath();
				for (let level = LEVEL_STEP, n = 1; level < 1; level += LEVEL_STEP, n++) {
					if ((n % 3 === 0 ? 1 : 0) !== pass) continue;
					for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
						const tl = elev[j * cols + i];
						const tr = elev[j * cols + i + 1];
						const bl = elev[(j + 1) * cols + i];
						const br = elev[(j + 1) * cols + i + 1];
						const code = (tl > level ? 8 : 0) | (tr > level ? 4 : 0) | (br > level ? 2 : 0) | (bl > level ? 1 : 0);
						if (code === 0 || code === 15) continue;
						const segs = SEGMENTS[code];
						const x0 = i * cell;
						const y0 = j * cell;
						for (let s = 0; s < segs.length; s += 2) {
							const a = edgePoint(pointA, segs[s], x0, y0, tl, tr, br, bl, level);
							const b = edgePoint(pointB, segs[s + 1], x0, y0, tl, tr, br, bl, level);
							ctx.moveTo(a[0], a[1]);
							ctx.lineTo(b[0], b[1]);
						}
					}
				}
				ctx.strokeStyle = color;
				ctx.globalAlpha = pass === 1 ? major : minor;
				ctx.lineWidth = pass === 1 ? 1.25 : .8;
				ctx.stroke();
			}
			ctx.globalAlpha = 1;
		}
		const pointA = [0, 0];
		const pointB = [0, 0];
		function edgePoint(out, edge, x0, y0, tl, tr, br, bl, level) {
			switch (edge) {
				case 0:
					out[0] = x0 + cell * (level - tl) / (tr - tl);
					out[1] = y0;
					break;
				case 1:
					out[0] = x0 + cell;
					out[1] = y0 + cell * (level - tr) / (br - tr);
					break;
				case 2:
					out[0] = x0 + cell * (level - bl) / (br - bl);
					out[1] = y0 + cell;
					break;
				default:
					out[0] = x0;
					out[1] = y0 + cell * (level - tl) / (bl - tl);
			}
			return out;
		}
		function drawHazard() {
			const half = cell / 2;
			for (let b = 0; b < RAMP.length; b++) {
				const lo = RAMP[b].at;
				const hi = b + 1 < RAMP.length ? RAMP[b + 1].at : Infinity;
				ctx.beginPath();
				for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
					const hz = hazard[j * cols + i];
					if (hz >= lo && hz < hi) ctx.rect(i * cell - half, j * cell - half, cell - 1, cell - 1);
				}
				ctx.fillStyle = `rgba(${RAMP[b].rgb},${RAMP[b].alpha})`;
				ctx.fill();
			}
		}
		function measureAvoid() {
			avoid = [];
			blocked = new Uint8Array(cols * rows);
			if (!scene) return;
			const hr = host.getBoundingClientRect();
			host.querySelectorAll("[data-route-avoid]").forEach((el) => {
				const r = el.getBoundingClientRect();
				const box = {
					x0: r.left - hr.left - 14,
					y0: r.top - hr.top - 14,
					x1: r.right - hr.left + 14,
					y1: r.bottom - hr.top + 14
				};
				avoid.push(box);
				for (let j = Math.max(0, Math.floor(box.y0 / cell)); j <= Math.min(rows - 1, Math.ceil(box.y1 / cell)); j++) for (let i = Math.max(0, Math.floor(box.x0 / cell)); i <= Math.min(cols - 1, Math.ceil(box.x1 / cell)); i++) blocked[j * cols + i] = 1;
			});
			lastRoute = -1e9;
			target = null;
		}
		function endpoints() {
			const narrow = w < 700;
			const top = avoid[0] ? avoid[0].y1 : h * .5;
			const bottom = avoid[1] ? avoid[1].y0 : h - 110;
			const band = Math.max(40, bottom - top);
			return {
				sx: Math.round(w * (narrow ? .09 : .05) / cell),
				sy: Math.round((top + band * .72) / cell),
				ex: Math.round(w * (narrow ? .91 : .95) / cell),
				ey: Math.round((top + band * .3) / cell)
			};
		}
		function findRoute() {
			const { sx, sy, ex, ey } = endpoints();
			const start = Math.min(rows - 1, sy) * cols + Math.min(cols - 1, sx);
			const goal = Math.min(rows - 1, ey) * cols + Math.min(cols - 1, ex);
			gScore.fill(Infinity);
			closed.fill(0);
			heap.clear();
			gScore[start] = 0;
			heap.push(0, start);
			const gx = goal % cols;
			const gy = goal / cols | 0;
			let found = false;
			while (heap.size > 0) {
				const cur = heap.pop();
				if (closed[cur]) continue;
				closed[cur] = 1;
				if (cur === goal) {
					found = true;
					break;
				}
				const cx = cur % cols;
				const cy = cur / cols | 0;
				for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
					if (dx === 0 && dy === 0) continue;
					const nx = cx + dx;
					const ny = cy + dy;
					if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
					const ni = ny * cols + nx;
					if (closed[ni]) continue;
					const hz = Math.min(hazard[ni], 1.6);
					const step = (dx !== 0 && dy !== 0 ? 1.414 : 1) * (1 + 22 * hz * hz + 12 * blocked[ni]);
					const g = gScore[cur] + step;
					if (g < gScore[ni]) {
						gScore[ni] = g;
						came[ni] = cur;
						const ddx = Math.abs(nx - gx);
						const ddy = Math.abs(ny - gy);
						heap.push(g + (ddx + ddy) - .586 * Math.min(ddx, ddy), ni);
					}
				}
			}
			if (!found) return null;
			const nodes = [];
			for (let n = goal;; n = came[n]) {
				nodes.push(n);
				if (n === start) break;
			}
			const raw = [];
			for (let k = nodes.length - 1; k >= 0; k--) raw.push(nodes[k] % cols * cell, (nodes[k] / cols | 0) * cell);
			return resample(smooth(raw), ROUTE_POINTS);
		}
		function smooth(pts) {
			let cur = pts;
			for (let pass = 0; pass < 2; pass++) {
				const next = [cur[0], cur[1]];
				for (let i = 0; i < cur.length - 2; i += 2) {
					const ax = cur[i];
					const ay = cur[i + 1];
					const bx = cur[i + 2];
					const by = cur[i + 3];
					next.push(.75 * ax + .25 * bx, .75 * ay + .25 * by, .25 * ax + .75 * bx, .25 * ay + .75 * by);
				}
				next.push(cur[cur.length - 2], cur[cur.length - 1]);
				cur = next;
			}
			return cur;
		}
		function resample(pts, count) {
			const lens = [0];
			for (let i = 2; i < pts.length; i += 2) lens.push(lens[lens.length - 1] + Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]));
			const total = lens[lens.length - 1] || 1;
			const out = new Float32Array(count * 2);
			let seg = 0;
			for (let k = 0; k < count; k++) {
				const d = total * k / (count - 1);
				while (seg < lens.length - 2 && lens[seg + 1] < d) seg++;
				const span = lens[seg + 1] - lens[seg] || 1;
				const f = (d - lens[seg]) / span;
				out[k * 2] = pts[seg * 2] + (pts[seg * 2 + 2] - pts[seg * 2]) * f;
				out[k * 2 + 1] = pts[seg * 2 + 1] + (pts[seg * 2 + 3] - pts[seg * 2 + 1]) * f;
			}
			return out;
		}
		function drawRoute(t) {
			if (!target) return;
			if (!shown) shown = Float32Array.from(target);
			const ease = reduceMotion ? 1 : .2;
			for (let i = 0; i < shown.length; i++) shown[i] += (target[i] - shown[i]) * ease;
			const path = () => {
				ctx.beginPath();
				ctx.moveTo(shown[0], shown[1]);
				for (let i = 2; i < shown.length; i += 2) ctx.lineTo(shown[i], shown[i + 1]);
			};
			ctx.lineJoin = "round";
			ctx.lineCap = "round";
			path();
			ctx.strokeStyle = GROUND;
			ctx.lineWidth = 7;
			ctx.stroke();
			path();
			ctx.strokeStyle = ROUTE_COLOR;
			ctx.lineWidth = 3;
			ctx.stroke();
			if (!reduceMotion) {
				const f = t * .07 % 1;
				const k = Math.min(ROUTE_POINTS - 1, Math.floor(f * (ROUTE_POINTS - 1)));
				ctx.beginPath();
				ctx.arc(shown[k * 2], shown[k * 2 + 1], 5, 0, Math.PI * 2);
				ctx.fillStyle = ROUTE_COLOR;
				ctx.fill();
				ctx.lineWidth = 2;
				ctx.strokeStyle = GROUND;
				ctx.stroke();
			}
			const last = ROUTE_POINTS - 1;
			marker(shown[0], shown[1], "A", ROUTE_COLOR);
			marker(shown[last * 2], shown[319], "B", INK);
		}
		function marker(x, y, label, fill) {
			ctx.beginPath();
			ctx.arc(x, y, 11, 0, Math.PI * 2);
			ctx.fillStyle = fill;
			ctx.fill();
			ctx.lineWidth = 2.5;
			ctx.strokeStyle = GROUND;
			ctx.stroke();
			ctx.fillStyle = GROUND;
			ctx.font = "700 12px Archivo, system-ui, sans-serif";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(label, x, y + .5);
		}
		function frame(now) {
			raf = 0;
			if (!running) return;
			const dt = Math.min(.1, (now - (prev || now)) / 1e3);
			prev = now;
			if (!pausedRef.current) clock += dt;
			pointer.px += (pointer.x - pointer.px) * .14;
			pointer.py += (pointer.y - pointer.py) * .14;
			pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * .07;
			if (scene || now - lastDraw > 33) {
				lastDraw = now;
				render(clock, now);
			}
			raf = requestAnimationFrame(frame);
		}
		function render(t, now) {
			ctx.clearRect(0, 0, w, h);
			computeFields(t, scene ? storms(t) : []);
			if (scene) {
				drawContours(INK, .16, .3);
				drawHazard();
				if (reduceMotion || now - lastRoute > 70 || !target) {
					lastRoute = now;
					target = findRoute() ?? target;
				}
				drawRoute(t);
			} else drawContours("#e9eeec", .07, .14);
		}
		function start() {
			if (running || staticOnly) return;
			running = true;
			prev = 0;
			raf = requestAnimationFrame(frame);
		}
		function stop() {
			running = false;
			if (raf) cancelAnimationFrame(raf);
			raf = 0;
		}
		function renderStatic() {
			raf = 0;
			render(8, performance.now());
		}
		function scheduleStatic() {
			if (!raf) raf = requestAnimationFrame(renderStatic);
		}
		function onMove(e) {
			const rect = canvas.getBoundingClientRect();
			pointer.x = e.clientX - rect.left;
			pointer.y = e.clientY - rect.top;
			if (!pointer.active) {
				pointer.px = pointer.x;
				pointer.py = pointer.y;
			}
			pointer.active = true;
			if (reduceMotion) {
				pointer.px = pointer.x;
				pointer.py = pointer.y;
				pointer.strength = 1;
				scheduleStatic();
			}
		}
		function onLeave() {
			pointer.active = false;
			if (reduceMotion) {
				pointer.strength = 0;
				scheduleStatic();
			}
		}
		let disposed = false;
		resize();
		if (staticOnly) render(8, performance.now());
		else start();
		document.fonts?.ready.then(() => {
			if (disposed) return;
			measureAvoid();
			if (staticOnly) render(8, performance.now());
		});
		const ro = new ResizeObserver(() => {
			resize();
			if (staticOnly) render(8, performance.now());
		});
		ro.observe(host);
		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible && !document.hidden) start();
			else stop();
		});
		io.observe(host);
		const onVisibility = () => {
			if (document.hidden) stop();
			else if (visible) start();
		};
		document.addEventListener("visibilitychange", onVisibility);
		if (scene) {
			host.addEventListener("pointermove", onMove, { passive: true });
			host.addEventListener("pointerleave", onLeave);
			host.addEventListener("pointercancel", onLeave);
		}
		return () => {
			disposed = true;
			stop();
			ro.disconnect();
			io.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
			host.removeEventListener("pointermove", onMove);
			host.removeEventListener("pointerleave", onLeave);
			host.removeEventListener("pointercancel", onLeave);
		};
	}, [mode]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		"aria-hidden": "true",
		className
	});
}
var LEGEND = [
	{
		label: "Low",
		color: "bg-low"
	},
	{
		label: "Moderate",
		color: "bg-moderate"
	},
	{
		label: "High",
		color: "bg-high"
	},
	{
		label: "Severe",
		color: "bg-severe"
	},
	{
		label: "No travel",
		color: "bg-no-travel"
	}
];
function Hero() {
	const [paused, setPaused] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative isolate min-h-[100svh] touch-pan-y overflow-hidden bg-ground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteField, {
			paused,
			className: "absolute inset-0 -z-10"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-[100svh] max-w-[112rem] flex-col px-5 pb-8 pt-28 sm:px-8 lg:px-12 2xl:px-16 lg:pt-32",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[90rem]",
					"data-route-avoid": true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "display text-[clamp(2.6rem,8.4vw,8.6rem)] text-ink",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-mask",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { "--d": "80ms" },
									children: "Muhammad"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-mask",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { "--d": "190ms" },
									children: "Ahsan Aftab"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rise mt-6 max-w-[38ch] text-[clamp(1.15rem,2vw,1.5rem)] leading-snug text-ink sm:mt-8",
							style: { "--d": "520ms" },
							children: "I build AI systems that turn messy real-world signals into decisions: crisis reports into response plans, forecasts into safer routes, damaged photos into restored images."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3",
							style: { "--d": "680ms" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#work",
									className: "label inline-flex h-12 items-center rounded-sm bg-ink px-6 text-base text-ground transition-colors hover:bg-route",
									children: "See the work"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: PROFILE.resume,
									className: "label inline-flex h-12 items-center rounded-sm border border-ink px-6 text-base transition-colors hover:bg-ink hover:text-ground",
									children: "Download résumé"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `mailto:${PROFILE.email}`,
									className: "link label text-base",
									children: PROFILE.email
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-h-16 flex-1",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rise flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
					style: { "--d": "900ms" },
					"data-route-avoid": true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 self-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "label max-w-[34ch] rounded-sm bg-ground/80 px-3 py-2 text-[0.95rem] text-ink backdrop-blur-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Move your cursor: it’s a storm, and the route replans around it."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sm:hidden",
								children: "Drag a finger across the map: it’s a storm, and the route replans."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": paused,
							onClick: () => setPaused((p) => !p),
							className: "label inline-flex h-11 items-center rounded-sm border border-ink/40 bg-ground/80 px-3 text-[0.9rem] backdrop-blur-sm transition-colors hover:bg-ink hover:text-ground motion-reduce:hidden",
							children: paused ? "Resume motion" : "Pause motion"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "label flex flex-wrap gap-x-4 gap-y-1.5 rounded-sm bg-ground/80 px-3 py-2 text-[0.85rem] text-ink backdrop-blur-sm",
						"aria-label": "Map legend: weather risk",
						children: LEGEND.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `h-2.5 w-2.5 rounded-full ${l.color}`,
								"aria-hidden": "true"
							}), l.label]
						}, l.label))
					})]
				})
			]
		})]
	});
}
function Nav() {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 12);
			const line = window.innerHeight * .4;
			let current = "";
			for (const n of NAV) {
				const el = document.getElementById(n.id);
				if (el && el.getBoundingClientRect().top <= line) current = n.id;
			}
			setActive(current);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${scrolled || open ? "border-b bg-ground/90 backdrop-blur-md" : "border-b border-transparent"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			"aria-label": "Primary",
			className: "mx-auto flex h-16 max-w-[112rem] items-center justify-between px-5 sm:px-8 lg:px-12 2xl:px-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#top",
					className: "heading text-lg",
					"aria-label": "Ahsan Aftab, back to top",
					children: "Ahsan Aftab"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "hidden items-center gap-8 md:flex",
					children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `#${n.id}`,
						"aria-current": active === n.id ? "location" : void 0,
						className: `label text-[0.95rem] transition-colors hover:text-route ${active === n.id ? "text-route" : "text-ink"}`,
						children: n.label
					}) }, n.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "label hidden items-center gap-2 text-slate lg:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "live-dot",
								"aria-hidden": "true"
							}), "Available now, remote"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: PROFILE.resume,
							className: "label hidden rounded-sm border border-ink px-3.5 py-2 text-[0.9rem] transition-colors hover:bg-ink hover:text-ground sm:inline-block",
							children: "Résumé"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-expanded": open,
							"aria-controls": "mobile-menu",
							onClick: () => setOpen((v) => !v),
							className: "label -mr-2 inline-flex h-11 min-w-11 items-center justify-center px-2 md:hidden",
							children: open ? "Close" : "Menu"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: "mobile-menu",
			hidden: !open,
			className: "border-b border-t bg-ground shadow-[0_24px_32px_-24px_rgba(14,26,33,0.35)] md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mx-auto max-w-[112rem] px-5 py-3 sm:px-8",
				children: [NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `#${n.id}`,
					onClick: () => setOpen(false),
					className: "heading flex h-14 items-center border-b text-2xl last:border-b-0",
					children: n.label
				}) }, n.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: PROFILE.resume,
					className: "label flex h-14 items-center text-lg text-route",
					children: "Download résumé"
				}) })]
			})
		})]
	});
}
function useReveal() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const rect = el.getBoundingClientRect();
		if (rect.top < window.innerHeight * .9 && rect.bottom > 0) return;
		el.dataset.reveal = "armed";
		const io = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return;
			el.dataset.reveal = "in";
			io.disconnect();
		}, { rootMargin: "0px 0px -12% 0px" });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	return ref;
}
function RevealHeading({ id, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		id,
		ref: useReveal(),
		className: `reveal-mask ${className}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })
	});
}
function Proof() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"aria-label": "Highlights",
		className: "border-y border-ink bg-panel px-5 sm:px-8 lg:px-12 2xl:px-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mx-auto grid max-w-[104rem] divide-y divide-ink/15 md:grid-cols-3 md:divide-x md:divide-y-0",
			children: PROOF.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "py-8 md:px-8 md:first:pl-0 md:last:pr-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "heading text-[1.35rem] leading-tight",
					children: p.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[0.98rem] text-slate measure",
					children: p.note
				})]
			}, p.title))
		})
	});
}
function Experience() {
	const listRef = useReveal();
	let marker = 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "experience",
		"aria-labelledby": "experience-title",
		className: "px-5 pb-8 pt-24 sm:px-8 lg:px-12 2xl:px-16 lg:pt-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[104rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, {
				id: "experience-title",
				className: "heading text-[clamp(2.4rem,6vw,4.75rem)]",
				children: "Experience"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				ref: listRef,
				className: "reveal-markers mt-12 border-t border-ink lg:mt-16",
				children: EXPERIENCE.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-x-10 gap-y-4 border-b py-9 lg:grid-cols-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "heading text-[1.6rem]",
								children: r.company
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "label mt-2 text-lg text-slate",
								children: r.title
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "label text-lg text-slate lg:col-span-3",
							children: [r.period, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[0.95rem]",
								children: r.place
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3 lg:col-span-5",
							children: r.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "relative pl-6 measure",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": "true",
									className: "marker absolute left-0 top-[0.7em] h-2 w-2 rounded-[1px] bg-route",
									style: { "--i": marker++ }
								}), p]
							}, p))
						})
					]
				}, r.company))
			})]
		})
	});
}
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "about",
		"aria-labelledby": "about-title",
		className: "px-5 pb-28 pt-24 sm:px-8 lg:px-12 2xl:px-16 lg:pt-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-[104rem] gap-12 lg:grid-cols-12 lg:gap-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, {
					id: "about-title",
					className: "heading text-[clamp(2.4rem,6vw,4.75rem)]",
					children: "About"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-5 text-[1.12rem] measure",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "I like projects where software has to make a call and show its reasoning. In CIRO that’s a response plan with the agent trace behind it. In Spotter it’s one recommended route and a sentence on why." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "I’m a Computer Science graduate from Air University Islamabad, based in Pakistan and working remotely. I’m looking for my first full-time role in AI/ML or software engineering, and I can start right away." })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "border-t border-ink lg:col-span-7 lg:col-start-6",
				children: CAPABILITIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-x-8 gap-y-1 border-b py-6 sm:grid-cols-[11rem_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "heading text-lg",
						children: c.area
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "measure",
						children: c.items
					})]
				}, c.area))
			})]
		})
	});
}
function Contact() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(PROFILE.email);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 2200);
		} catch {
			window.location.href = `mailto:${PROFILE.email}`;
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "contact",
		"aria-labelledby": "contact-title",
		className: "on-ink relative isolate overflow-hidden bg-ink px-5 pb-10 pt-24 text-ground sm:px-8 lg:px-12 2xl:px-16 lg:pt-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteField, {
			mode: "contours",
			className: "absolute inset-0 -z-10"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[104rem]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, {
					id: "contact-title",
					className: "display max-w-[16ch] text-[clamp(2.4rem,7.6vw,6.5rem)]",
					children: "Hiring for a remote role?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 max-w-[44ch] text-[1.3rem] leading-snug text-ground/90",
					children: "I’m looking for a junior AI/ML or software role and can start right away. Email is the fastest way to reach me."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-wrap items-center gap-x-6 gap-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${PROFILE.email}`,
							className: "heading text-[clamp(1.3rem,3.4vw,2.2rem)] underline decoration-route-soft decoration-2 underline-offset-[0.2em] transition-colors hover:text-route-soft",
							children: PROFILE.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: copyEmail,
							className: `label inline-flex h-11 min-w-[9.5rem] items-center justify-center gap-2 rounded-sm border px-4 text-[0.95rem] transition-colors duration-200 ${copied ? "border-route-soft bg-route-soft text-ink" : "border-ground/50 hover:bg-ground hover:text-ink"}`,
							children: [copied && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								"aria-hidden": "true",
								className: "h-4 w-4"
							}), copied ? "Copied" : "Copy address"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							role: "status",
							className: "sr-only",
							children: copied ? "Copied to clipboard" : ""
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-ground/20 pt-6",
					children: [[{
						label: "GitHub",
						href: PROFILE.github
					}, {
						label: "LinkedIn",
						href: PROFILE.linkedin
					}].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: l.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "label group inline-flex min-h-11 items-center gap-1 text-lg text-route-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "link",
								children: l.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								"aria-hidden": "true",
								className: "h-4 w-4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "(opens in a new tab)"
							})
						]
					}) }, l.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: PROFILE.resume,
						className: "label inline-flex min-h-11 items-center text-lg text-route-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "link",
							children: "Download résumé"
						})
					}) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label mt-12 text-[0.9rem] text-ground/70",
					children: "Built with TanStack Start, Tailwind and one canvas. Map ramp borrowed from Spotter."
				})
			]
		})]
	});
}
var SPOTTER_VIEWS = [
	{
		id: "routes",
		tab: "Compare routes",
		src: "/projects/spotter-route-comparison.jpg",
		alt: "Spotter showing a recommended green route from Chicago to Denver with grey alternatives, and a risk summary in the sidebar",
		caption: "Chicago to Denver with a 45,000 lb load. The recommended route is green; the alternatives stay grey."
	},
	{
		id: "heatmap",
		tab: "Weather over time",
		src: "/projects/spotter-heatmap-storms.jpg",
		alt: "Spotter showing a route from Los Angeles to Dallas with the weather heatmap and time slider moved 13 hours after departure",
		caption: "Los Angeles to Dallas. The slider moves through the forecast hour by hour after departure."
	},
	{
		id: "checkpoint",
		tab: "Checkpoint detail",
		src: "/projects/spotter-checkpoint-popup.jpg",
		alt: "A checkpoint popup on the Chicago to Denver route listing arrival time and wind, rain and snow risk",
		caption: "Click a checkpoint to see wind, rain and snow for the hour the truck gets there."
	}
];
function SpotterViewer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root2, {
		defaultValue: "routes",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
			"aria-label": "Spotter screenshots",
			className: "mb-3 flex flex-wrap gap-x-6 gap-y-1",
			children: SPOTTER_VIEWS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
				value: v.id,
				className: "label -mb-px h-11 border-b-2 border-transparent text-[0.95rem] text-slate transition-colors hover:text-ink data-[state=active]:border-route data-[state=active]:text-ink",
				children: v.tab
			}, v.id))
		}), SPOTTER_VIEWS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
			value: v.id,
			className: "animate-in fade-in duration-300 focus-visible:outline-offset-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-md border border-ink/20 bg-panel shadow-[0_1px_0_rgba(14,26,33,0.06),0_18px_40px_-24px_rgba(14,26,33,0.35)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: v.src,
					alt: v.alt,
					width: 800,
					height: 600,
					loading: "lazy",
					decoding: "async",
					className: "block h-auto w-full"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "label mt-3 text-[0.9rem] text-slate",
				children: v.caption
			})] })
		}, v.id))]
	});
}
function PipelineDiagram({ stages, label }) {
	const [active, setActive] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [canAnimate, setCanAnimate] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setCanAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = window.setInterval(() => {
			setActive((a) => {
				if (a >= stages.length - 1) {
					setPlaying(false);
					return a;
				}
				return a + 1;
			});
		}, 1500);
		return () => window.clearInterval(id);
	}, [playing, stages.length]);
	const current = stages[active];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-ink/20 bg-panel p-5 sm:p-7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "label text-[0.95rem] text-slate",
					children: label
				}), canAnimate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						if (!playing) setActive(0);
						setPlaying((p) => !p);
					},
					className: "label inline-flex h-10 items-center rounded-sm border border-ink px-4 text-[0.9rem] transition-colors hover:bg-ink hover:text-ground",
					children: playing ? "Pause" : "Step through"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-0 lg:[grid-template-columns:repeat(var(--n),minmax(0,1fr))]",
				style: { "--n": stages.length },
				children: stages.map((s, i) => {
					const reached = i <= active;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative pb-1 pl-5 lg:pl-0 lg:pr-3 lg:pt-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: "absolute left-0 top-0 h-full w-0.5 bg-ink/20 lg:h-0.5 lg:w-full"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: "absolute left-0 top-0 h-full w-0.5 origin-top bg-route transition-transform duration-500 ease-out [transform:scaleY(var(--f))] lg:h-0.5 lg:w-full lg:origin-left lg:[transform:scaleX(var(--f))]",
								style: { "--f": reached ? 1 : 0 }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": "true",
								className: `absolute -left-[0.6875rem] top-0 grid h-5 w-5 place-items-center rounded-full text-[0.7rem] font-bold transition-colors duration-300 lg:-top-[0.6875rem] lg:left-0 ${reached ? "bg-route text-ground" : "bg-ground text-slate ring-2 ring-inset ring-ink/25"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "label",
									children: i + 1
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": i === active,
								onClick: () => {
									setPlaying(false);
									setActive(i);
								},
								className: `heading min-h-11 min-w-0 py-2 text-left text-[1rem] leading-tight transition-colors [font-stretch:88%] [overflow-wrap:anywhere] hover:text-route lg:pt-1 ${i === active ? "text-ink" : "text-slate"}`,
								children: s.name
							})
						]
					}, s.name);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid gap-5 border-t pt-6 sm:grid-cols-2",
				"aria-live": "polite",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-in fade-in duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "label text-[0.9rem] text-slate",
						children: "Reads"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: current.reads
					})]
				}, `${active}-reads`), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-in fade-in duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "label text-[0.9rem] text-slate",
						children: "Produces"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1",
						children: current.makes
					})]
				}, `${active}-makes`)]
			})
		]
	});
}
function LayerDiagram() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-ink/20 bg-panel p-5 sm:p-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex flex-col",
			children: MIRAS_LAYERS.map((layer, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-x-8 gap-y-2 sm:grid-cols-[9rem_1fr] sm:items-baseline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "heading text-lg",
						children: layer.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap gap-x-5 gap-y-1",
						children: layer.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-[0.98rem]",
							children: item
						}, item))
					})]
				}), i < MIRAS_LAYERS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": "true",
					className: "my-4 flex h-8 items-center sm:pl-[9rem]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "16",
						height: "32",
						viewBox: "0 0 16 32",
						fill: "none",
						className: "text-route",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M8 0v26M2 20l6 7 6-7",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})
				})]
			}, layer.name))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 border-t pt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "label text-[0.9rem] text-slate",
				children: "What it covers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1",
				children: [MIRAS_FEATURES.join(", "), "."]
			})]
		})]
	});
}
function Visual({ kind }) {
	switch (kind) {
		case "spotter": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotterViewer, {});
		case "pipeline-ciro": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineDiagram, {
			stages: CIRO_STAGES,
			label: "The five agents, in the order a report passes through them"
		});
		case "layers-miras": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayerDiagram, {});
		case "pipeline-restoration": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineDiagram, {
			stages: RESTORATION_STAGES,
			label: "How the three parts fit together"
		});
	}
}
function ExternalLink({ href, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "label group inline-flex min-h-11 items-center gap-1 text-base text-route",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "link",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
				"aria-hidden": "true",
				className: "h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "(opens in a new tab)"
			})
		]
	});
}
function ProjectIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"aria-label": "Projects in this section",
		className: "mt-12 grid divide-y divide-ink/15 border-t border-ink xl:grid-cols-4 xl:divide-x xl:divide-y-0",
		children: PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: `#project-${p.slug}`,
			className: "group block h-full py-5 xl:px-6 xl:first:pl-0 xl:last:pr-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "heading block text-xl transition-colors group-hover:text-route",
					children: p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label mt-1.5 block text-[0.95rem] text-slate",
					children: p.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "label mt-3 block text-[0.9rem] text-ink",
					children: p.meta
				})
			]
		}) }, p.slug))
	});
}
function ProjectArticle({ project }) {
	const titleId = `project-${project.slug}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"aria-labelledby": titleId,
		className: "grid gap-10 border-t border-ink py-16 lg:grid-cols-12 lg:gap-14 lg:py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "lg:col-span-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:sticky lg:top-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						id: titleId,
						className: "heading text-[clamp(2rem,4.4vw,3.4rem)]",
						children: project.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label mt-3 text-lg text-slate",
						children: project.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 measure",
						children: project.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label mt-6 text-[0.95rem] text-slate",
						children: project.stack.join(", ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-x-6",
						children: project.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							href: l.href,
							children: l.label
						}, l.href))
					}),
					project.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "label mt-1 text-[0.9rem] text-slate",
						children: project.note
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Visual, { kind: project.visual }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-9 space-y-4",
				children: project.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative pl-6 measure",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						className: "absolute left-0 top-[0.7em] h-2 w-2 rounded-[1px] bg-route"
					}), p]
				}, p))
			})]
		})]
	});
}
function Work() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "work",
		"aria-labelledby": "work-title",
		className: "px-5 pb-8 pt-24 sm:px-8 lg:px-12 2xl:px-16 lg:pt-32",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-[104rem]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealHeading, {
						id: "work-title",
						className: "heading text-[clamp(2.4rem,6vw,4.75rem)]",
						children: "Selected work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-[1.2rem] leading-snug measure",
						children: "Four projects across AI systems and full-stack products. Each has a live demo or a deployed API, and the source is linked where it’s public."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectIndex, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 lg:mt-10",
					children: PROJECTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectArticle, { project: p }, p.slug))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-ink pt-12 lg:pt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "heading text-[clamp(1.6rem,3vw,2.2rem)]",
						children: "Also built"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-8 divide-y border-y",
						children: MORE_WORK.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-x-10 gap-y-2 py-7 lg:grid-cols-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "heading text-xl lg:col-span-3",
									children: m.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "lg:col-span-6 measure",
									children: m.summary
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "lg:col-span-3 lg:text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "label text-[0.95rem] text-slate",
										children: m.stack
									}), m.link && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "lg:flex lg:justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
											href: m.link.href,
											children: m.link.label
										})
									})]
								})
							]
						}, m.name))
					})]
				})
			]
		})
	});
}
function Portfolio() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen overflow-x-clip bg-ground text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#work",
				className: "label sr-only z-[60] rounded-sm bg-ink px-4 py-3 text-ground focus:not-sr-only focus:fixed focus:left-4 focus:top-4",
				children: "Skip to work"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Proof, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Work, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
			] })
		]
	});
}
//#endregion
export { Portfolio as component };
