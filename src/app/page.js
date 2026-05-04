"use client";

import { motion } from "framer-motion";
import BackgroundTicker from "./components/BackgroundTicker";
import WaitingSymbol from "./components/WaitingSymbol";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[var(--color-ground)] overflow-hidden">
      <BackgroundTicker />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
        className="relative z-10 pt-8 text-center font-sans text-[13px] font-bold tracking-[0.08em] text-[var(--color-ink)]"
      >
        THANK YOU FOR WAITING.
      </motion.p>

      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.3, ease: [0.32, 0.08, 0.24, 1] }}
          className="font-sans text-[56px] font-extrabold tracking-[-0.01em] text-[var(--color-ink)] md:text-[72px]"
        >
          TERMS OF ENTRY
        </motion.h1>

        <div className="my-8">
          <WaitingSymbol href="/queue" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 1.2 }}
          className="text-center font-sans text-[12px] font-bold tracking-[0.28em] text-[var(--color-ink)]"
        >
          ARCHITECTURES OF WAITING
        </motion.p>
      </div>
    </main>
  );
}
