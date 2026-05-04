"use client";

import { useState } from "react";
import Image from "next/image";
import PixelProgressBar from "./PixelProgressBar";
import { useLoadingTransition } from "./LoadingTransition";

export default function QueueCard({ artifact, loadDuration = 5 }) {
  const isFirst = artifact.id === 1;
  const [loaded, setLoaded] = useState(false);
  const { navigate } = useLoadingTransition();

  const accessible = isFirst && loaded;

  const handleClick = () => {
    if (!accessible) return;
    navigate(`/queue/${artifact.id}`);
  };

  const handleAnimationEnd = (e) => {
    if (e.animationName === "loading-complete-anim") {
      setLoaded(true);
    }
  };

  return (
    <div className="flex shrink-0 flex-col" style={{ width: 300 }}>
      <button
        type="button"
        onClick={handleClick}
        disabled={!accessible}
        className={`relative block aspect-[4/5] w-full overflow-hidden border border-[var(--color-mute)]/50 transition-opacity ${
          accessible ? "opacity-100 cursor-pointer" : "opacity-70 cursor-default"
        }`}
      >
        <Image
          src={artifact.image}
          alt={artifact.altText}
          fill
          sizes="300px"
          className={`object-cover transition-all duration-[1200ms] ${
            accessible ? "grayscale-0 brightness-100" : "grayscale brightness-90"
          }`}
          priority={isFirst}
        />
        {!accessible ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {isFirst ? (
              <div
                className="overflow-hidden rounded-[3px] border-2 border-[var(--color-accent)] bg-[var(--color-ground)]"
                style={{ width: 220, height: 16 }}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="loading-complete h-full bg-[var(--color-accent)]"
                  style={{ animationDuration: `${loadDuration}s` }}
                  onAnimationEnd={handleAnimationEnd}
                />
              </div>
            ) : (
              <PixelProgressBar
                variant="smooth"
                indefinite
                width={220}
                height={16}
              />
            )}
          </div>
        ) : null}
      </button>

      <div
        className={`mt-4 transition-opacity duration-[1200ms] ${
          accessible ? "opacity-100" : "opacity-40"
        }`}
      >
        <h3 className="break-words text-[13px] font-bold leading-tight tracking-wide text-[var(--color-ink)]">
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
          disabled={!accessible}
          className={`mt-4 inline-flex items-center gap-3 self-start rounded-md border-2 px-6 py-2 font-mono text-[13px] font-bold tracking-[0.4em] transition-all duration-300 ${
            accessible
              ? "border-[var(--color-ink)] bg-[var(--color-accent)] text-[var(--color-ground)] hover:-translate-y-0.5 hover:bg-[var(--color-ground)] hover:text-[var(--color-ink)]"
              : "pointer-events-none border-[var(--color-mute)]/40 bg-transparent text-[var(--color-mute)] opacity-30"
          }`}
        >
          ENTER QUEUE
          <span aria-hidden="true">→</span>
        </button>
      ) : null}
    </div>
  );
}
