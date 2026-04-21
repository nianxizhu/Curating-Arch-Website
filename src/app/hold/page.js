"use client";

import { motion } from "framer-motion";
import { holdEssay } from "@/data/hold";
import HoldEssay from "../components/HoldEssay";

export default function HoldPage() {
  return (
    <main className="relative min-h-screen bg-[var(--color-ground)]">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="font-mono text-[11px] tracking-[0.35em] text-[var(--color-accent)]"
        >
          HOLD
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.32, 0.08, 0.24, 1] }}
          className="mt-6 max-w-3xl font-sans text-[44px] font-extrabold leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)] md:text-[56px]"
        >
          {holdEssay.subtitle}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="mt-14 font-mono text-[10px] tracking-[0.3em] text-[var(--color-mute)]"
        >
          SCROLL SLOWLY.
        </motion.p>
      </section>

      <HoldEssay paragraphs={holdEssay.paragraphs} />
    </main>
  );
}
