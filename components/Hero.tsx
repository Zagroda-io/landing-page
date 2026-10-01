"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Container, ButtonLink } from "@/components/primitives";
import { AccentLines } from "@/components/AccentLines";
import { DetectionDemo } from "@/components/DetectionDemo";
import { surveyHref } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-40 sm:pb-28 sm:pt-44">
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
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg py-1 pl-1 pr-3.5 text-xs font-medium text-muted"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-warn/10 px-2 py-0.5 text-[#8a5f0f]">
              <span className="h-1.5 w-1.5 rounded-full bg-warn" />W fazie
              rozwoju
            </span>
            Budujemy Zagrodę razem z hodowcami
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[4.4rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Opieka nad stadem{" "}
            <span className="text-gradient-brand">przez całą dobę</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg"
          >
            Kamery z AI obserwują stado przez całą dobę, a czujniki na obrożach
            mówią, co dzieje się z każdą krową. Razem pozwalają wcześnie
            zauważyć chorobę, ruję czy kulawiznę i dać Ci znać, zanim zrobi się
            z tego problem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <ButtonLink href={surveyHref} variant="primary">
              Wypełnij ankietę
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
                Obora · kamera 2
                <span className="hidden sm:inline"> · nagranie nocne</span>
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium text-white/70">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff6a5e] shadow-[0_0_8px_2px_rgba(255,106,94,0.6)]" />
                AI · ANALIZA
              </span>
            </div>

            <DetectionDemo />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
