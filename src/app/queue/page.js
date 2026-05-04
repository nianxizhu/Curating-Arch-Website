"use client";

import { motion } from "framer-motion";
import { artifacts } from "@/data/artifacts";
import QueueCard from "../components/QueueCard";

export default function QueuePage() {
  return (
    <main className="relative flex min-h-screen flex-col justify-evenly bg-[var(--color-ground)] py-6">
      <motion.h1
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.32, 0.08, 0.24, 1] }}
        className="px-6 font-sans text-[40px] font-extrabold tracking-[-0.02em] text-[var(--color-ink)] md:px-10 md:text-[64px]"
      >
        QUEUE
      </motion.h1>

      <div className="no-scrollbar overflow-x-auto overflow-y-hidden">
        <div className="flex gap-6 px-6 md:gap-10 md:px-10">
          {artifacts.map((artifact) => (
            <QueueCard
              key={artifact.id}
              artifact={artifact}
              loadDuration={4}
            />
          ))}
          <div className="w-8 shrink-0" aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}
