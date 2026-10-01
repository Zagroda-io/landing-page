"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Check, Smartphone } from "lucide-react";
import { cn } from "@/lib/cn";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => null,
});

/*
 * Real night-vision footage from a barn camera with a scripted overlay that
 * shows how lameness detection will look. Box keyframes were traced by hand
 * from the clip (public/hero.mp4, 16.5 s) and are in % of the video frame:
 * [time s, left, top, width, height].
 */
const track: [number, number, number, number, number][] = [
  [0, 61, 44, 19, 45],
  [1, 62, 45, 19, 43],
  [2, 62, 47, 19, 41],
  [3, 62, 46, 19, 42],
  [4, 62, 48, 20, 43],
  [4.5, 62, 50, 24, 45],
  [5, 62, 50, 26, 48],
  [6, 66, 52, 27, 47],
  [7, 72, 52, 26, 47],
  [8, 73, 52, 26, 47],
  [9, 74, 52, 26, 47],
];

const T = {
  locked: 0.8, // cow found, collar matched
  analyse: 2.2, // gait analysis starts
  result: 5, // verdict shown
  boxOut: 9, // cow leaves the frame
};

const CONFIDENCE = 87;

function boxAt(t: number) {
  const last = track[track.length - 1];
  if (t >= last[0]) return last.slice(1);
  let i = 0;
  while (track[i + 1][0] <= t) i++;
  const [t0, ...a] = track[i];
  const [t1, ...b] = track[i + 1];
  const k = (t - t0) / (t1 - t0);
  return a.map((v, j) => v + (b[j] - v) * k);
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Phase = "scan" | "locked" | "analyse" | "result" | "sent";

function phaseAt(t: number): Phase {
  if (t < T.locked) return "scan";
  if (t < T.analyse) return "locked";
  if (t < T.result) return "analyse";
  if (t < T.boxOut) return "result";
  return "sent";
}

const tone = {
  scan: { box: "border-white/70", tag: "bg-white/90 text-ink" },
  locked: { box: "border-[#4ade80]", tag: "bg-[#4ade80] text-ink" },
  analyse: { box: "border-[#fbbf24]", tag: "bg-[#fbbf24] text-ink" },
  result: { box: "border-[#ff6a5e]", tag: "bg-[#ff6a5e] text-white" },
  sent: { box: "border-[#ff6a5e]", tag: "bg-[#ff6a5e] text-white" },
};

function Corners({ className }: { className: string }) {
  const c = cn("absolute h-3 w-3 border-2 sm:h-4 sm:w-4", className);
  return (
    <>
      <span className={cn(c, "-left-px -top-px border-b-0 border-r-0")} />
      <span className={cn(c, "-right-px -top-px border-b-0 border-l-0")} />
      <span className={cn(c, "-bottom-px -left-px border-r-0 border-t-0")} />
      <span className={cn(c, "-bottom-px -right-px border-l-0 border-t-0")} />
    </>
  );
}

function Step({
  done,
  active,
  children,
}: {
  done: boolean;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 transition-opacity duration-300",
        done || active ? "opacity-100" : "opacity-35",
      )}
    >
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
          done ? "bg-[#4ade80]/20 text-[#86efac]" : "border border-white/30",
        )}
      >
        {done && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
        {active && !done && (
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#fbbf24]" />
        )}
      </span>
      {children}
    </li>
  );
}

/** Verdict panel — overlaid on desktop, rendered under the video on phones. */
function Panel({ t, className }: { t: number; className?: string }) {
  const phase = phaseAt(t);
  const progress = clamp01((t - T.analyse) / (T.result - T.analyse));
  const shown = phase === "result" || phase === "sent";
  const conf = Math.round(CONFIDENCE * clamp01((t - T.result) / 0.8));
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-black/55 p-3.5 text-left text-xs text-white/75 backdrop-blur-md",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">
          Analiza zdarzenia
        </p>
        <span className="font-mono text-[10px] text-white/40">kamera 2</span>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        <Step done={t >= T.locked} active={phase === "scan"}>
          Wykryto krowę w kadrze
        </Step>
        <Step done={t >= T.locked} active={phase === "scan"}>
          Obroża #047 →{" "}
          <span className="font-semibold text-white">krowa #47</span>
        </Step>
        <Step done={t >= T.result} active={phase === "analyse"}>
          <span className="flex-1">Analiza chodu</span>
          <span className="h-1 w-14 overflow-hidden rounded-full bg-white/10">
            <span
              className="block h-full rounded-full bg-[#fbbf24]"
              style={{ width: `${progress * 100}%` }}
            />
          </span>
        </Step>
      </ul>

      <div
        className={cn(
          "mt-3 border-t border-white/10 pt-3 transition-all duration-500",
          shown ? "opacity-100" : "opacity-30",
        )}
      >
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] text-white/50">Wynik</p>
            <p className="text-sm font-semibold text-white">
              {shown ? "Podejrzenie kulawizny" : "—"}
            </p>
          </div>
          <p className="font-mono text-2xl font-semibold tabular-nums text-[#ff8a80]">
            {shown ? conf : 0}
            <span className="text-sm text-white/50">%</span>
          </p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#fbbf24] to-[#ff6a5e]"
            style={{ width: `${shown ? conf : 0}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-white/45">
          Asymetria kroku · odciążanie tylnej nogi
        </p>
      </div>

      <div
        className={cn(
          "mt-3 flex items-center gap-2 rounded-lg bg-[#4ade80]/10 px-2.5 py-2 text-[11px] font-medium text-[#86efac] transition-opacity duration-500",
          phase === "sent" ? "opacity-100" : "opacity-0",
        )}
      >
        <Smartphone className="h-3.5 w-3.5" />
        Alert z nagraniem wysłany na telefon
      </div>
    </div>
  );
}

export function DetectionDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const [t, setT] = useState(0);

  // follow the video clock so the overlay stays in sync (also after looping)
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v)
        setT((prev) =>
          Math.abs(prev - v.currentTime) > 1 / 30 ? v.currentTime : prev,
        );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const phase = phaseAt(t);
  const [left, top, width, height] = boxAt(t);
  const boxVisible = videoOk && t < T.boxOut;
  const scanConf = Math.round(96 * clamp01(t / T.locked));

  const label = {
    scan: `Krowa · ${scanConf}%`,
    locked: "Krowa #47 · obroża #047",
    analyse: "#47 · analiza chodu…",
    result: `#47 · kulawizna? ${CONFIDENCE}%`,
    sent: "",
  }[phase];

  return (
    <div>
      <div className="relative aspect-[1244/592] w-full overflow-hidden bg-[#0a0d0b]">
        {videoOk ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
            onError={() => setVideoOk(false)}
          >
            <source src="/hero.mp4" type="video/mp4" />
            <source src="/hero.webm" type="video/webm" />
          </video>
        ) : (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid-dark opacity-70" />
            <HeroScene />
          </div>
        )}

        {/* subtle green tint so the IR footage sits in the brand palette */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,11,0.05),rgba(7,16,11,0.35))] mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-[#2f7d4f]/10 mix-blend-color" />

        {/* tracked bounding box */}
        {boxVisible && (
          <div
            className={cn(
              "pointer-events-none absolute border transition-colors duration-300",
              tone[phase].box,
              phase === "scan" && "border-dashed",
            )}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
            }}
          >
            <Corners className={tone[phase].box} />
            {phase === "analyse" && (
              <span className="absolute inset-x-0 h-px animate-[scan_1.2s_ease-in-out_infinite] bg-[#fbbf24] shadow-[0_0_10px_2px_rgba(251,191,36,0.6)]" />
            )}
            <span
              className={cn(
                "absolute -top-6 right-[-2px] whitespace-nowrap rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold transition-colors duration-300 sm:-top-7 sm:text-[11px]",
                tone[phase].tag,
              )}
            >
              {label}
            </span>
          </div>
        )}

        <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-medium text-white/70 backdrop-blur">
          Wizualizacja
          <span className="hidden sm:inline">
            {" "}
            · wykrywanie kulawizn w rozwoju
          </span>
        </span>

        <Panel
          t={t}
          className="absolute bottom-4 left-4 hidden w-[17rem] sm:block"
        />
      </div>

      <Panel t={t} className="m-3 sm:hidden" />
    </div>
  );
}
