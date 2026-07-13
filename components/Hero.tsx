"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Container, ButtonLink } from "@/components/primitives";
import { AccentLines } from "@/components/AccentLines";
import { site } from "@/lib/site";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <section className="relative isolate overflow-hidden pt-32 sm:pt-36">
      {/* light backdrop + deep-green accent lines */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(60%_80%_at_50%_-10%,rgba(47,125,79,0.10),transparent_70%)]" />
        <AccentLines className="opacity-70 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      </div>

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-3.5 py-1.5 text-xs font-medium text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Opieka nad stadem przez całą dobę
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[4.4rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Rolnictwo <span className="text-gradient-brand">nowej generacji</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg"
          >
            Kamery i czujniki pilnują Twojego stada dzień i noc. Gdy pojawi się
            ruja, wycielenie, kulawizna albo coś niepokojącego — od razu
            dostajesz powiadomienie z nagraniem na telefon.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <ButtonLink href={site.demoUrl} variant="primary">
              Umów demo
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#jak-to-dziala" variant="secondary">
              <Play className="h-4 w-4" />
              Zobacz, jak to działa
            </ButtonLink>
          </motion.div>
        </div>

        {/* live monitor — background video with a 3D fallback */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="relative mx-auto mt-16 max-w-5xl sm:mt-20"
        >
          <div className="overflow-hidden rounded-[1.6rem] border border-line bg-[#0a0d0b] shadow-[0_40px_120px_-32px_rgba(0,0,0,0.45)]">
            {/* app chrome */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <div className="ml-3 flex items-center gap-1.5 rounded-md bg-white/[0.05] px-2.5 py-1 text-[11px] text-white/45">
                Obora · podgląd na żywo
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_2px_rgba(74,222,128,0.6)]" />
                NA ŻYWO
              </span>
            </div>

            {/* viewport */}
            <div className="relative h-[300px] sm:h-[460px]">
              {/* fallback 3D scene (shows if video fails) */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-grid-dark opacity-70" />
                <HeroScene />
              </div>

              {/* background video */}
              {videoOk && (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/hero-poster.jpg"
                  onError={() => setVideoOk(false)}
                >
                  <source src="/hero.mp4" type="video/mp4" />
                </video>
              )}

              {/* tint + accent lines for cohesion */}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,11,0.25),rgba(7,16,11,0.55))]" />
              <AccentLines
                tone="light"
                count={7}
                className="opacity-60 mix-blend-soft-light"
              />

              {/* overlaid live alert */}
              <div className="animate-float absolute bottom-5 left-5 w-[17rem] max-w-[80%] rounded-xl border border-white/10 bg-black/45 p-3.5 backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#cf4034]/20">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff6a5e] shadow-[0_0_10px_2px_rgba(255,106,94,0.7)]" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">
                        Wykryto ruję · krowa #47
                      </p>
                      <span className="text-[11px] text-white/40">teraz</span>
                    </div>
                    <p className="mt-0.5 text-xs text-white/55">
                      Obora B · nagranie 10 s w aplikacji
                    </p>
                    <div className="mt-2 flex gap-2">
                      <span className="rounded-md bg-[#4ade80]/15 px-2 py-0.5 text-[11px] font-medium text-[#86efac]">
                        Ruja
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
