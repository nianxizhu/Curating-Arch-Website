"use client";

import { motion } from "framer-motion";
import { artifacts } from "@/data/artifacts";
import QueueCard from "../components/QueueCard";

export default function QueuePage() {
  return (
    <main className="relative min-h-screen bg-[var(--color-ground)]">
      <motion.h1
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.32, 0.08, 0.24, 1] }}
        className="px-10 pt-14 font-sans text-[78px] font-extrabold tracking-[-0.02em] text-[var(--color-mute)]"
      >
        QUEUE
      </motion.h1>

      <div className="mt-10 overflow-x-auto overflow-y-hidden pb-24">
        <div className="flex gap-10 px-10">
          {artifacts.map((artifact, i) => (
            <QueueCard
              key={artifact.id}
              artifact={artifact}
              delay={i * 0.8}
              loadDuration={3 + i * 0.45}
            />
          ))}
          <div className="w-8 shrink-0" aria-hidden="true" />
        </div>
      </div>

      <p className="fixed bottom-16 right-8 max-w-[220px] font-mono text-[10px] leading-relaxed tracking-[0.15em] text-[var(--color-mute)] text-right">
        SCROLL HORIZONTALLY. WAIT FOR THE NEXT ARTIFACT TO LOAD BEFORE IT OPENS.
      </p>
    </main>
  );
}
