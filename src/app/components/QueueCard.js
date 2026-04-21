"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PixelProgressBar from "./PixelProgressBar";
import { useLoadingTransition } from "./LoadingTransition";

export default function QueueCard({ artifact, delay = 0, loadDuration = 3 }) {
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);
  const { navigate } = useLoadingTransition();

  useEffect(() => {
    const id = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(id);
  }, [delay]);

  const isFirst = artifact.id === 1;

  const handleClick = () => {
    if (!loaded) return;
    navigate(`/queue/${artifact.id}`);
  };

  return (
    <div className="flex shrink-0 flex-col" style={{ width: 380 }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={!loaded}
        className={`relative block aspect-[4/5] w-full overflow-hidden border border-[var(--color-mute)]/50 transition-opacity ${
          loaded ? "opacity-100 cursor-pointer" : "opacity-70 cursor-default"
        }`}
      >
        <Image
          src={artifact.image}
          alt={artifact.altText}
          fill
          sizes="380px"
          className={`object-cover transition-all duration-[1200ms] ${
            loaded ? "grayscale-0 brightness-100" : "grayscale brightness-90"
          }`}
          priority={isFirst}
        />
        {!loaded ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <PixelProgressBar
              variant="smooth"
              duration={started ? loadDuration : undefined}
              progress={started ? undefined : 0}
              width={220}
              height={16}
              onComplete={() => setLoaded(true)}
            />
          </div>
        ) : null}
      </button>

      <div
        className={`mt-6 transition-opacity duration-[1200ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-[13px] font-bold tracking-wide text-[var(--color-ink)]">
          {artifact.title.toUpperCase()}
        </h3>
        <p className="mt-1 text-[12px] leading-snug text-[var(--color-accent)]">
          {artifact.attribution}
        </p>
      </div>

      {isFirst ? (
        <button
          type="button"
          onClick={handleClick}
          disabled={!loaded}
          className={`mt-4 self-start font-mono text-[11px] tracking-[0.35em] transition-opacity duration-[1200ms] ${
            loaded
              ? "text-[var(--color-accent)] opacity-100 hover:text-[var(--color-ink)]"
              : "pointer-events-none text-[var(--color-mute)] opacity-40"
          }`}
        >
          START HERE →
        </button>
      ) : null}
    </div>
  );
}
