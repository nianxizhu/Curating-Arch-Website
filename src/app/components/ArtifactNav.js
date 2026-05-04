"use client";

import { useLoadingTransition } from "./LoadingTransition";

export default function ArtifactNav({ prevHref, nextHref, nextLabel }) {
  const { navigate } = useLoadingTransition();

  return (
    <>
      {prevHref ? (
        <button
          type="button"
          aria-label="Previous artifact"
          onClick={() => navigate(prevHref)}
          className="fixed left-6 top-1/2 z-20 -translate-y-1/2 font-mono text-[42px] font-light text-[var(--color-mute)] transition-colors duration-700 hover:text-[var(--color-accent)]"
        >
          ‹
        </button>
      ) : (
        <span
          aria-hidden="true"
          className="fixed left-6 top-1/2 z-20 -translate-y-1/2 font-mono text-[42px] font-light text-[var(--color-mute)]/30"
        >
          ‹
        </span>
      )}
      {nextHref ? (
        <button
          type="button"
          aria-label={nextLabel || "Next artifact"}
          onClick={() => navigate(nextHref)}
          className="fixed right-6 top-1/2 z-20 -translate-y-1/2 font-mono text-[42px] font-light text-[var(--color-mute)] transition-colors duration-700 hover:text-[var(--color-accent)]"
        >
          ›
        </button>
      ) : (
        <span
          aria-hidden="true"
          className="fixed right-6 top-1/2 z-20 -translate-y-1/2 font-mono text-[42px] font-light text-[var(--color-mute)]/30"
        >
          ›
        </span>
      )}
    </>
  );
}
