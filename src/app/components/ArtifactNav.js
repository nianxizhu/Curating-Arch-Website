"use client";

import { useLoadingTransition } from "./LoadingTransition";

export default function ArtifactNav({ prev, next }) {
  const { navigate } = useLoadingTransition();

  return (
    <>
      {prev ? (
        <button
          type="button"
          aria-label={`Previous artifact (${prev})`}
          onClick={() => navigate(`/queue/${prev}`)}
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
      {next ? (
        <button
          type="button"
          aria-label={`Next artifact (${next})`}
          onClick={() => navigate(`/queue/${next}`)}
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
