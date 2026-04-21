"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PHRASES = [
  "STILL IN QUEUE",
  "THANK YOU FOR WAITING",
  "YOUR TURN IS COMING",
  "HOLD",
  "PROCESSING",
];

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function PersistentWaitingUI() {
  const pathname = usePathname();
  const [elapsed, setElapsed] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    setElapsed(0);
  }, [pathname]);

  useEffect(() => {
    const id = setInterval(() => setElapsed((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setPhraseIdx((v) => (v + 1) % PHRASES.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-[50] flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-[var(--color-mute)] select-none mix-blend-multiply">
      <span
        aria-hidden="true"
        className="h-[6px] w-[6px] animate-pulse rounded-full bg-[var(--color-accent)]"
      />
      <span>{PHRASES[phraseIdx]}</span>
      <span className="opacity-50">·</span>
      <span>{formatTime(elapsed)}</span>
    </div>
  );
}
