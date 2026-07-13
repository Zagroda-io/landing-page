"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------- generated textures (no external assets) ---------- */

function makeGlowTexture() {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.18, "rgba(214,255,174,0.95)");
  g.addColorStop(0.5, "rgba(139,219,74,0.45)");
  g.addColorStop(1, "rgba(139,219,74,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGridTexture() {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(139,219,74,0.5)";
  ctx.lineWidth = 1.25;
  const step = size / 16;
  for (let i = 0; i <= 16; i++) {
    const p = i * step;
    ctx.beginPath();
    ctx.moveTo(p, 0);
    ctx.lineTo(p, size);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, p);
    ctx.lineTo(size, p);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  return tex;
}

/* ---------- field grid ---------- */

function FieldGrid() {
  const tex = useMemo(() => makeGridTexture(), []);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    tex.offset.y = (clock.elapsedTime * 0.03) % 1;
    if (matRef.current)
      matRef.current.opacity = 0.18 + Math.sin(clock.elapsedTime) * 0.03;
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, -4]}>
      <planeGeometry args={[80, 80]} />
      <meshBasicMaterial
        ref={matRef}
        map={tex}
        transparent
        opacity={0.18}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ---------- the herd: glowing monitored nodes ---------- */

type HerdData = {
  geometry: THREE.BufferGeometry;
  alerts: { x: number; y: number; z: number }[];
};

function useHerd(count: number): HerdData {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const brand = new THREE.Color("#9fe85a");
    const dim = new THREE.Color("#5d8a2f");
    const alerts: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 26;
      const z = -2 - Math.random() * 22;
      const y = -2.2 + Math.random() * 0.5;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      const c = Math.random() > 0.5 ? brand : dim;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      scales[i] = 0.5 + Math.random() * 0.9;
      if (i % 17 === 3) alerts.push({ x, y, z });
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
    return { geometry, alerts };
  }, [count]);
}

function Herd() {
  const glow = useMemo(() => makeGlowTexture(), []);
  const { geometry, alerts } = useHerd(120);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.06) * 0.04;
    }
  });

  return (
    <group>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial
          size={0.9}
          map={glow}
          vertexColors
          transparent
          depthWrite={false}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      {alerts.map((a, i) => (
        <AlertNode key={i} position={[a.x, a.y, a.z]} delay={i * 0.7} />
      ))}
    </group>
  );
}

/* ---------- alert nodes with expanding ring ---------- */

function AlertNode({
  position,
  delay,
}: {
  position: [number, number, number];
  delay: number;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime + delay) % 2.6;
    const p = t / 2.6;
    if (ring.current) {
      const s = 0.3 + p * 2.4;
      ring.current.scale.set(s, s, s);
    }
    if (mat.current) mat.current.opacity = (1 - p) * 0.8;
    if (core.current) {
      const pulse = 0.9 + Math.sin(clock.elapsedTime * 4 + delay) * 0.25;
      core.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={position}>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.62, 48]} />
        <meshBasicMaterial
          ref={mat}
          color="#ff5a4d"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={core}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color="#ff7a6e" />
      </mesh>
    </group>
  );
}

/* ---------- ambient data particles drifting upward ---------- */

function DataStream() {
  const ref = useRef<THREE.Points>(null);
  const count = 260;
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = Math.random() * 16 - 3;
      positions[i * 3 + 2] = -2 - Math.random() * 24;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame((_, delta) => {
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      let y = pos.getY(i) + delta * (0.5 + (i % 5) * 0.12);
      if (y > 13) y = -3;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    if (ref.current) ref.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        color="#7fe8ff"
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- sweeping scanner ---------- */

function Scanner() {
  const ref = useRef<THREE.Mesh>(null);
  const tex = useMemo(() => {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, size, 0);
    g.addColorStop(0, "rgba(139,219,74,0)");
    g.addColorStop(1, "rgba(139,219,74,0.28)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * 0.5;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.35, -8]}>
      <circleGeometry args={[26, 64, 0, Math.PI / 3]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={0.5}
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ---------- camera drift + mouse parallax ---------- */

function Rig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  useFrame(({ clock, pointer }) => {
    mouse.current.x += (pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.04;
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.08) * 1.6 + mouse.current.x * 1.4;
    camera.position.y = 3.4 + mouse.current.y * 0.7;
    camera.lookAt(0, -1, -8);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 3.4, 11], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <fogExp2 attach="fog" args={["#0a0d0b", 0.045]} />
      <ambientLight intensity={0.6} />
      <FieldGrid />
      <Scanner />
      <Herd />
      <DataStream />
      <Rig />
    </Canvas>
  );
}
