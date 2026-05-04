"use client";

import { holdEssay } from "@/data/hold";
import HoldEssay from "../components/HoldEssay";

export default function HoldPage() {
  return (
    <main className="relative min-h-screen bg-[var(--color-ground)]">
      <HoldEssay
        title={holdEssay.title}
        subtitle={holdEssay.subtitle}
        paragraphs={holdEssay.paragraphs}
      />
    </main>
  );
}
