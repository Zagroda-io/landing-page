"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* Design space the wordmark is sampled in; scaled to the canvas width. */
export const DESIGN_W = 1400;
export const DESIGN_H = 280;
const STEP = 4; // sampling grid (design px) — ~8–9k points

const INK = new THREE.Color("#0a0a0a");
const GREEN = new THREE.Color("#2f7d4f");
const LIGHT_GREEN = new THREE.Color("#5fae7b");

/* Logo mark paths (same as components/Logo.tsx, viewBox 0 0 28 28). */
const MARK_PATHS = [
  "M14 24 Q13.7 14.5 14 5.4",
  "M14 24 Q11.2 15 9.1 9.2",
  "M14 24 Q16.8 15 18.9 9.2",
  "M14 24 Q9.2 16.4 5.7 12.6",
  "M14 24 Q18.8 16.4 22.3 12.6",
];

type Sample = { targets: Float32Array; colors: Float32Array; count: number };

/** Draw mark + "ZAGRODA" on a 2D canvas and turn filled pixels into points. */
function sampleWordmark(fontFamily: string): Sample {
  const c = document.createElement("canvas");
  c.width = DESIGN_W;
  c.height = DESIGN_H;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  const text = "ZAGRODA";

  // fit mark + gap + text into 94% of the width
  ctx.font = `600 200px ${fontFamily}`;
  const m = ctx.measureText(text);
  const cap200 = m.actualBoundingBoxAscent;
  const markW200 = cap200 * 0.95;
  const gap200 = cap200 * 0.32;
  const k = (DESIGN_W * 0.94) / (markW200 + gap200 + m.width);
  const fs = 200 * Math.min(k, (DESIGN_H * 0.62) / cap200);
  ctx.font = `600 ${fs}px ${fontFamily}`;
  const tm = ctx.measureText(text);
  const cap = tm.actualBoundingBoxAscent;
  const markW = cap * 0.95;
  const gap = cap * 0.32;
  const total = markW + gap + tm.width;
  const x0 = (DESIGN_W - total) / 2;
  const baseline = (DESIGN_H + cap) / 2;

  // mark: strokes in black, rooted dot in pure red (→ green points)
  const ms = cap / (24.2 + 1.9 - 5.4);
  ctx.save();
  ctx.translate(x0 + markW / 2 - 14 * ms, baseline - cap - 5.4 * ms);
  ctx.scale(ms, ms);
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineWidth = 1.9;
  for (const d of MARK_PATHS) ctx.stroke(new Path2D(d));
  ctx.fillStyle = "#f00";
  ctx.beginPath();
  ctx.arc(14, 24.4, 2.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = "#000";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(text, x0 + markW + gap, baseline);

  const { data } = ctx.getImageData(0, 0, DESIGN_W, DESIGN_H);
  const pos: number[] = [];
  const col: number[] = [];
  // denser grid over the thin strokes of the mark, regular grid for the type
  const markEnd = Math.ceil(x0 + markW + gap / 2);
  const grid: [number, number][] = [];
  for (let y = 0; y < DESIGN_H; y += 3)
    for (let x = 0; x < markEnd; x += 3) grid.push([x, y]);
  for (let y = 0; y < DESIGN_H; y += STEP)
    for (let x = markEnd; x < DESIGN_W; x += STEP) grid.push([x, y]);
  for (const [x, y] of grid) {
    {
      const i = (y * DESIGN_W + x) * 4;
      if (data[i + 3] < 128) continue;
      const isDot = data[i] > 150 && data[i + 1] < 80;
      const jx = (Math.random() - 0.5) * STEP * 0.5;
      const jy = (Math.random() - 0.5) * STEP * 0.5;
      pos.push(x - DESIGN_W / 2 + jx, DESIGN_H / 2 - y + jy, 0);
      // mostly ink, a sprinkle of green "sprouts", the mark's dot fully green
      const c3 = isDot ? GREEN : Math.random() < 0.07 ? LIGHT_GREEN : INK;
      col.push(c3.r, c3.g, c3.b);
    }
  }
  return {
    targets: new Float32Array(pos),
    colors: new Float32Array(col),
    count: pos.length / 3,
  };
}

const vertex = /* glsl */ `
  attribute vec3 aStart;
  attribute vec3 aColor;
  attribute float aSeed;
  uniform float uProgress;
  uniform float uTime;
  uniform float uSize;
  uniform float uScale;
  uniform vec2 uMouse;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // staggered gather from the scattered start positions
    float p = clamp((uProgress - aSeed * 0.45) / 0.55, 0.0, 1.0);
    p = 1.0 - pow(1.0 - p, 3.0);
    vec3 pos = mix(aStart, position, p);

    // idle sway, like grain moving in the wind
    pos.y += sin(position.x * 0.011 + uTime * 1.3) * 2.2 * p;
    pos.x += sin(position.y * 0.05 + uTime * 0.9 + aSeed * 6.283) * 0.9 * p;

    // push away from the pointer
    vec2 d = pos.xy - uMouse;
    float f = smoothstep(110.0, 0.0, length(d));
    pos.xy += normalize(d + vec2(0.0001)) * f * 34.0;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * uScale * (1.0 + f * 0.5);
    vColor = mix(aColor, vec3(0.184, 0.49, 0.31), f * 0.85);
    vAlpha = mix(0.18, 1.0, p);
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    gl_FragColor = vec4(vColor, vAlpha * smoothstep(0.5, 0.38, r));
  }
`;

function Points({
  sample,
  play,
  still,
  hover,
}: {
  sample: Sample;
  play: boolean;
  still: boolean;
  hover: React.RefObject<boolean>;
}) {
  const { size, viewport } = useThree();
  const scale = size.width / DESIGN_W;
  const progress = useRef(still ? 1.0 : 0);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const start = new Float32Array(sample.count * 3);
    const seed = new Float32Array(sample.count);
    for (let i = 0; i < sample.count; i++) {
      start[i * 3] = (Math.random() - 0.5) * DESIGN_W * 1.3;
      start[i * 3 + 1] = (Math.random() - 0.5) * DESIGN_H * 2.4;
      start[i * 3 + 2] = 0;
      // left-to-right sweep with some noise
      seed[i] =
        Math.min(
          1,
          Math.max(
            0,
            (sample.targets[i * 3] + DESIGN_W / 2) / DESIGN_W +
              (Math.random() - 0.5) * 0.3,
          ),
        ) || 0;
    }
    g.setAttribute("position", new THREE.BufferAttribute(sample.targets, 3));
    g.setAttribute("aStart", new THREE.BufferAttribute(start, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(sample.colors, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return g;
  }, [sample]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uProgress: { value: progress.current },
          uTime: { value: 0 },
          uSize: { value: 3.7 },
          uScale: { value: 1 },
          uMouse: { value: new THREE.Vector2(99999, 99999) },
        },
      }),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const u = material.uniforms;
    if (play && !still)
      progress.current = Math.min(1.0, progress.current + delta / 2.2);
    u.uProgress.value = progress.current;
    u.uTime.value = still ? 0 : state.clock.elapsedTime;
    u.uScale.value = scale * viewport.dpr;
    // pointer: normalized (-1..1) → design units; park it far away when idle
    const p = state.pointer;
    const inside = hover.current && !still;
    u.uMouse.value.set(
      inside ? (p.x * size.width) / 2 / scale : 99999,
      inside ? (p.y * size.height) / 2 / scale : 99999,
    );
  });

  return (
    <points geometry={geometry} material={material} scale={[scale, scale, 1]} />
  );
}

export default function WordmarkScene({
  fontFamily,
  play,
  still,
  onReady,
}: {
  fontFamily: string;
  play: boolean;
  still: boolean;
  onReady: () => void;
}) {
  const [sample, setSample] = useState<Sample | null>(null);
  const hover = useRef(false);

  useEffect(() => {
    let alive = true;
    document.fonts
      .load(`600 100px ${fontFamily}`)
      .catch(() => undefined)
      .then(() => {
        if (alive) setSample(sampleWordmark(fontFamily));
      });
    return () => {
      alive = false;
    };
  }, [fontFamily]);

  if (!sample) return null;

  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 10], zoom: 1 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={play ? "always" : "never"}
      onCreated={() => onReady()}
      onPointerEnter={() => (hover.current = true)}
      onPointerLeave={() => (hover.current = false)}
    >
      <Points sample={sample} play={play} still={still} hover={hover} />
    </Canvas>
  );
}
