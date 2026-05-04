"use client";

import { useEffect, useRef, useState } from "react";

export default function PixelProgressBar({
  variant = "segments",
  progress,
  duration,
  segments = 5,
  label,
  width = 140,
  height = 18,
  className = "",
  onComplete,
  indefinite = false,
}) {
  const controlled = typeof progress === "number";
  const [value, setValue] = useState(controlled ? progress : 0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // RAF only used for segments variant with duration (so segments fill stepwise).
  // Smooth variant with duration uses a CSS animation (loading-complete) instead.
  useEffect(() => {
    if (indefinite) return;
    if (controlled) {
      setValue(progress);
      return;
    }
    if (typeof duration !== "number") return;
    if (variant !== "segments") return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      setValue(t);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [variant, controlled, progress, duration, indefinite]);

  const clamped = Math.max(0, Math.min(1, value));

  const handleAnimationEnd = (e) => {
    if (
      e.animationName === "loading-complete-anim" &&
      onCompleteRef.current
    ) {
      onCompleteRef.current();
    }
  };

  if (variant === "segments") {
    const filled = Math.floor(clamped * segments);
    return (
      <div className={`inline-flex flex-col items-center ${className}`}>
        <div
          className="inline-flex items-center gap-[3px] rounded-md border-2 border-[var(--color-ink)] bg-[var(--color-ground)] px-[3px] py-[3px]"
          style={{ width, height }}
          role="progressbar"
          aria-valuenow={Math.round(clamped * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className="h-full flex-1 rounded-[2px] transition-[background] duration-300"
              style={{
                background:
                  i < filled ? "var(--color-ink)" : "transparent",
              }}
            />
          ))}
        </div>
        {label ? (
          <span className="mt-2 font-mono text-[10px] tracking-[0.25em] text-[var(--color-ink)]">
            {label}
          </span>
        ) : null}
      </div>
    );
  }

  // Smooth variant
  const isCssAnimated =
    !indefinite && !controlled && typeof duration === "number";

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div
        className="overflow-hidden rounded-[3px] border-2 border-[var(--color-accent)] bg-[var(--color-ground)]"
        style={{ width, height }}
        role="progressbar"
        aria-valuenow={indefinite || isCssAnimated ? undefined : Math.round(clamped * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {indefinite ? (
          <div className="loading-loop h-full bg-[var(--color-accent)]" />
        ) : isCssAnimated ? (
          <div
            className="loading-complete h-full bg-[var(--color-accent)]"
            style={{ animationDuration: `${duration}s` }}
            onAnimationEnd={handleAnimationEnd}
          />
        ) : (
          <div
            className="h-full bg-[var(--color-accent)]"
            style={{ width: `${clamped * 100}%`, transition: "width 300ms linear" }}
          />
        )}
      </div>
      {label ? (
        <span className="mt-1 font-mono text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
          {label}
        </span>
      ) : null}
    </div>
  );
}
