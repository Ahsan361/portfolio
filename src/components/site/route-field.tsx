import { useEffect, useRef } from "react";

/*
 * A contour map with weather cells on it and a route that avoids them.
 * It is the same idea as my weather-aware truck routing app: the pointer is a storm, and the route replans around it.
 * "scene" draws the full thing; "contours" draws only the terrain, for use on dark grounds.
 */

type Mode = "scene" | "contours";

interface RouteFieldProps {
  mode?: Mode;
  paused?: boolean;
  className?: string;
}

const RAMP = [
  { at: 0.2, rgb: "62,158,102", alpha: 0.4 },
  { at: 0.4, rgb: "231,180,22", alpha: 0.5 },
  { at: 0.6, rgb: "238,127,31", alpha: 0.55 },
  { at: 0.8, rgb: "211,43,60", alpha: 0.6 },
  { at: 1.0, rgb: "106,44,158", alpha: 0.7 },
] as const;

const ROUTE_COLOR = "#2347f5";
const INK = "#0e1a21";
const GROUND = "#e9eeec";
const ROUTE_POINTS = 160;
const LEVEL_STEP = 0.08;

/* Which edges each marching-squares case joins. Edges: 0 top, 1 right, 2 bottom, 3 left. */
const SEGMENTS: number[][] = [
  [],
  [3, 2],
  [2, 1],
  [3, 1],
  [0, 1],
  [0, 1, 3, 2],
  [0, 2],
  [0, 3],
  [0, 3],
  [0, 2],
  [0, 3, 2, 1],
  [0, 1],
  [3, 1],
  [2, 1],
  [3, 2],
  [],
];

interface Storm {
  x: number;
  y: number;
  sigma: number;
  strength: number;
}

class MinHeap {
  keys: number[] = [];
  vals: number[] = [];
  get size() {
    return this.keys.length;
  }
  clear() {
    this.keys.length = 0;
    this.vals.length = 0;
  }
  push(key: number, val: number) {
    const { keys, vals } = this;
    let i = keys.length;
    keys.push(key);
    vals.push(val);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (keys[p] <= key) break;
      keys[i] = keys[p];
      vals[i] = vals[p];
      i = p;
    }
    keys[i] = key;
    vals[i] = val;
  }
  pop(): number {
    const { keys, vals } = this;
    const top = vals[0];
    const lastKey = keys.pop() as number;
    const lastVal = vals.pop() as number;
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
}

function terrain(x: number, y: number, t: number) {
  const u = x / 700;
  const v = y / 700;
  return (
    0.5 +
    0.2 * Math.sin(u * 2.1 + 1.3 * Math.sin(v * 1.7 + t * 0.06)) +
    0.17 * Math.sin(v * 2.9 - u * 1.4 + 1.1 + t * 0.045) +
    0.09 * Math.sin((u + v) * 5.1 + t * 0.07) +
    0.05 * Math.sin(u * 9.7 - v * 4.3)
  );
}

export function RouteField({ mode = "scene", paused = false, className }: RouteFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const scene = mode === "scene";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /* Contours are decoration: draw them once. The scene only moves for people who haven't asked for less motion. */
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
    let avoid: { x0: number; y0: number; x1: number; y1: number }[] = [];
    let target: Float32Array | null = null;
    let shown: Float32Array | null = null;
    const pointer = { x: 0, y: 0, active: false, px: 0, py: 0, strength: 0 };

    let raf = 0;
    let running = false;
    let visible = true;
    let lastRoute = -1e9;
    let lastDraw = 0;
    let clock = 0;
    let prev = 0;

    function resize() {
      const rect = host!.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      cell = w < 640 ? 12 : 14;
      while ((w / cell + 2) * (h / cell + 2) > 14000) cell += 2;
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

    function storms(t: number): Storm[] {
      const s = Math.min(1, Math.max(0.6, w / 1200));
      const out: Storm[] = [
        {
          x: w * (0.42 + 0.14 * Math.sin(t * 0.11)),
          y: h * (0.62 + 0.1 * Math.sin(t * 0.09 + 1)),
          sigma: 44 * s,
          strength: 1.05,
        },
        {
          x: w * (0.76 + 0.08 * Math.sin(t * 0.08 + 2.2)),
          y: h * (0.5 + 0.1 * Math.sin(t * 0.13 + 0.4)),
          sigma: 38 * s,
          strength: 0.95,
        },
        {
          x: w * (0.2 + 0.08 * Math.sin(t * 0.1 + 4)),
          y: h * (0.74 + 0.06 * Math.sin(t * 0.12 + 2)),
          sigma: 30 * s,
          strength: 0.8,
        },
      ];
      if (pointer.strength > 0.02) {
        out.push({
          x: pointer.px,
          y: pointer.py,
          sigma: 64 * s,
          strength: 1.45 * pointer.strength,
        });
      }
      return out;
    }

    function computeFields(t: number, list: Storm[]) {
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

    function drawContours(color: string, minor: number, major: number) {
      ctx!.lineCap = "round";
      for (const pass of [0, 1]) {
        ctx!.beginPath();
        for (let level = LEVEL_STEP, n = 1; level < 1; level += LEVEL_STEP, n++) {
          if ((n % 3 === 0 ? 1 : 0) !== pass) continue;
          for (let j = 0; j < rows - 1; j++) {
            for (let i = 0; i < cols - 1; i++) {
              const tl = elev[j * cols + i];
              const tr = elev[j * cols + i + 1];
              const bl = elev[(j + 1) * cols + i];
              const br = elev[(j + 1) * cols + i + 1];
              const code =
                (tl > level ? 8 : 0) |
                (tr > level ? 4 : 0) |
                (br > level ? 2 : 0) |
                (bl > level ? 1 : 0);
              if (code === 0 || code === 15) continue;
              const segs = SEGMENTS[code];
              const x0 = i * cell;
              const y0 = j * cell;
              for (let s = 0; s < segs.length; s += 2) {
                const a = edgePoint(pointA, segs[s], x0, y0, tl, tr, br, bl, level);
                const b = edgePoint(pointB, segs[s + 1], x0, y0, tl, tr, br, bl, level);
                ctx!.moveTo(a[0], a[1]);
                ctx!.lineTo(b[0], b[1]);
              }
            }
          }
        }
        ctx!.strokeStyle = color;
        ctx!.globalAlpha = pass === 1 ? major : minor;
        ctx!.lineWidth = pass === 1 ? 1.25 : 0.8;
        ctx!.stroke();
      }
      ctx!.globalAlpha = 1;
    }

    /* Two scratch points, so both ends of a segment can be held at once. */
    const pointA: [number, number] = [0, 0];
    const pointB: [number, number] = [0, 0];
    function edgePoint(
      out: [number, number],
      edge: number,
      x0: number,
      y0: number,
      tl: number,
      tr: number,
      br: number,
      bl: number,
      level: number,
    ) {
      switch (edge) {
        case 0:
          out[0] = x0 + (cell * (level - tl)) / (tr - tl);
          out[1] = y0;
          break;
        case 1:
          out[0] = x0 + cell;
          out[1] = y0 + (cell * (level - tr)) / (br - tr);
          break;
        case 2:
          out[0] = x0 + (cell * (level - bl)) / (br - bl);
          out[1] = y0 + cell;
          break;
        default:
          out[0] = x0;
          out[1] = y0 + (cell * (level - tl)) / (bl - tl);
      }
      return out;
    }

    function drawHazard() {
      const half = cell / 2;
      for (let b = 0; b < RAMP.length; b++) {
        const lo = RAMP[b].at;
        const hi = b + 1 < RAMP.length ? RAMP[b + 1].at : Infinity;
        ctx!.beginPath();
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const hz = hazard[j * cols + i];
            if (hz >= lo && hz < hi)
              ctx!.rect(i * cell - half, j * cell - half, cell - 1, cell - 1);
          }
        }
        ctx!.fillStyle = `rgba(${RAMP[b].rgb},${RAMP[b].alpha})`;
        ctx!.fill();
      }
    }

    /* Text and caption blocks the route should stay out of, found from [data-route-avoid] in the host. */
    function measureAvoid() {
      avoid = [];
      blocked = new Uint8Array(cols * rows);
      if (!scene) return;
      const hr = host!.getBoundingClientRect();
      host!.querySelectorAll<HTMLElement>("[data-route-avoid]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const box = {
          x0: r.left - hr.left - 14,
          y0: r.top - hr.top - 14,
          x1: r.right - hr.left + 14,
          y1: r.bottom - hr.top + 14,
        };
        avoid.push(box);
        for (
          let j = Math.max(0, Math.floor(box.y0 / cell));
          j <= Math.min(rows - 1, Math.ceil(box.y1 / cell));
          j++
        ) {
          for (
            let i = Math.max(0, Math.floor(box.x0 / cell));
            i <= Math.min(cols - 1, Math.ceil(box.x1 / cell));
            i++
          ) {
            blocked[j * cols + i] = 1;
          }
        }
      });
      lastRoute = -1e9;
      target = null;
    }

    function endpoints() {
      const narrow = w < 700;
      /* Run the route through the free band between the text above and the caption below. */
      const top = avoid[0] ? avoid[0].y1 : h * 0.5;
      const bottom = avoid[1] ? avoid[1].y0 : h - 110;
      const band = Math.max(40, bottom - top);
      return {
        sx: Math.round((w * (narrow ? 0.09 : 0.05)) / cell),
        sy: Math.round((top + band * 0.72) / cell),
        ex: Math.round((w * (narrow ? 0.91 : 0.95)) / cell),
        ey: Math.round((top + band * 0.3) / cell),
      };
    }

    function findRoute(): Float32Array | null {
      const { sx, sy, ex, ey } = endpoints();
      const start = Math.min(rows - 1, sy) * cols + Math.min(cols - 1, sx);
      const goal = Math.min(rows - 1, ey) * cols + Math.min(cols - 1, ex);
      gScore.fill(Infinity);
      closed.fill(0);
      heap.clear();
      gScore[start] = 0;
      heap.push(0, start);
      const gx = goal % cols;
      const gy = (goal / cols) | 0;
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
        const cy = (cur / cols) | 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
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
              heap.push(g + (ddx + ddy) - 0.586 * Math.min(ddx, ddy), ni);
            }
          }
        }
      }
      if (!found) return null;

      const nodes: number[] = [];
      for (let n = goal; ; n = came[n]) {
        nodes.push(n);
        if (n === start) break;
      }
      const raw: number[] = [];
      for (let k = nodes.length - 1; k >= 0; k--) {
        raw.push((nodes[k] % cols) * cell, ((nodes[k] / cols) | 0) * cell);
      }
      return resample(smooth(raw), ROUTE_POINTS);
    }

    function smooth(pts: number[]) {
      let cur = pts;
      for (let pass = 0; pass < 2; pass++) {
        const next: number[] = [cur[0], cur[1]];
        for (let i = 0; i < cur.length - 2; i += 2) {
          const ax = cur[i];
          const ay = cur[i + 1];
          const bx = cur[i + 2];
          const by = cur[i + 3];
          next.push(
            0.75 * ax + 0.25 * bx,
            0.75 * ay + 0.25 * by,
            0.25 * ax + 0.75 * bx,
            0.25 * ay + 0.75 * by,
          );
        }
        next.push(cur[cur.length - 2], cur[cur.length - 1]);
        cur = next;
      }
      return cur;
    }

    function resample(pts: number[], count: number) {
      const lens: number[] = [0];
      for (let i = 2; i < pts.length; i += 2) {
        lens.push(lens[lens.length - 1] + Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]));
      }
      const total = lens[lens.length - 1] || 1;
      const out = new Float32Array(count * 2);
      let seg = 0;
      for (let k = 0; k < count; k++) {
        const d = (total * k) / (count - 1);
        while (seg < lens.length - 2 && lens[seg + 1] < d) seg++;
        const span = lens[seg + 1] - lens[seg] || 1;
        const f = (d - lens[seg]) / span;
        out[k * 2] = pts[seg * 2] + (pts[seg * 2 + 2] - pts[seg * 2]) * f;
        out[k * 2 + 1] = pts[seg * 2 + 1] + (pts[seg * 2 + 3] - pts[seg * 2 + 1]) * f;
      }
      return out;
    }

    function drawRoute(t: number) {
      if (!target) return;
      if (!shown) shown = Float32Array.from(target);
      const ease = reduceMotion ? 1 : 0.2;
      for (let i = 0; i < shown.length; i++) shown[i] += (target[i] - shown[i]) * ease;

      const path = () => {
        ctx!.beginPath();
        ctx!.moveTo(shown![0], shown![1]);
        for (let i = 2; i < shown!.length; i += 2) ctx!.lineTo(shown![i], shown![i + 1]);
      };
      ctx!.lineJoin = "round";
      ctx!.lineCap = "round";
      path();
      ctx!.strokeStyle = GROUND;
      ctx!.lineWidth = 7;
      ctx!.stroke();
      path();
      ctx!.strokeStyle = ROUTE_COLOR;
      ctx!.lineWidth = 3;
      ctx!.stroke();

      if (!reduceMotion) {
        const f = (t * 0.07) % 1;
        const k = Math.min(ROUTE_POINTS - 1, Math.floor(f * (ROUTE_POINTS - 1)));
        ctx!.beginPath();
        ctx!.arc(shown[k * 2], shown[k * 2 + 1], 5, 0, Math.PI * 2);
        ctx!.fillStyle = ROUTE_COLOR;
        ctx!.fill();
        ctx!.lineWidth = 2;
        ctx!.strokeStyle = GROUND;
        ctx!.stroke();
      }

      const last = ROUTE_POINTS - 1;
      marker(shown[0], shown[1], "A", ROUTE_COLOR);
      marker(shown[last * 2], shown[last * 2 + 1], "B", INK);
    }

    function marker(x: number, y: number, label: string, fill: string) {
      ctx!.beginPath();
      ctx!.arc(x, y, 11, 0, Math.PI * 2);
      ctx!.fillStyle = fill;
      ctx!.fill();
      ctx!.lineWidth = 2.5;
      ctx!.strokeStyle = GROUND;
      ctx!.stroke();
      ctx!.fillStyle = GROUND;
      ctx!.font = "700 12px Archivo, system-ui, sans-serif";
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      ctx!.fillText(label, x, y + 0.5);
    }

    function frame(now: number) {
      raf = 0;
      if (!running) return;
      const dt = Math.min(0.1, (now - (prev || now)) / 1000);
      prev = now;
      if (!pausedRef.current) clock += dt;

      pointer.px += (pointer.x - pointer.px) * 0.14;
      pointer.py += (pointer.y - pointer.py) * 0.14;
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.07;

      if (scene || now - lastDraw > 33) {
        lastDraw = now;
        render(clock, now);
      }
      raf = requestAnimationFrame(frame);
    }

    function render(t: number, now: number) {
      ctx!.clearRect(0, 0, w, h);
      const list = scene ? storms(t) : [];
      computeFields(t, list);
      if (scene) {
        drawContours(INK, 0.16, 0.3);
        drawHazard();
        if (reduceMotion || now - lastRoute > 70 || !target) {
          lastRoute = now;
          target = findRoute() ?? target;
        }
        drawRoute(t);
      } else {
        drawContours("#e9eeec", 0.07, 0.14);
      }
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

    /*
     * With reduced motion the scene doesn't drift or loop. It only redraws in answer to the pointer,
     * which is the person's own action, so the storm and the replanned route still respond.
     */
    function renderStatic() {
      raf = 0;
      render(8, performance.now());
    }
    function scheduleStatic() {
      if (!raf) raf = requestAnimationFrame(renderStatic);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
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
    if (staticOnly) {
      render(8, performance.now());
    } else {
      start();
    }
    /* Web fonts change the text height, so measure again once they are in. */
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

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
