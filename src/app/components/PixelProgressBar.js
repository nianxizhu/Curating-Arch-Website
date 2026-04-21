"use client";

import { useEffect, useState } from "react";

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
}) {
  const controlled = typeof progress === "number";
  const [value, setValue] = useState(controlled ? progress : 0);

  useEffect(() => {
    if (controlled) {
      setValue(progress);
      return;
    }
    if (typeof duration !== "number") return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      setValue(t);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (onComplete) {
        onComplete();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [controlled, progress, duration, onComplete]);

  const clamped = Math.max(0, Math.min(1, value));

  if (variant === "segments") {
    const filled = Math.floor(clamped * segments);
    return (
      <div className={`inline-flex flex-col items-center ${className}`}>
        <div
          className="inline-flex items-center gap-[3px] border-2 border-[var(--color-ink)] bg-[var(--color-ground)] px-[3px] py-[3px]"
          style={{ width, height }}
          role="progressbar"
          aria-valuenow={Math.round(clamped * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-full transition-[background] duration-300"
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

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <div
        className="border-2 border-[var(--color-accent)] bg-[var(--color-ground)]"
        style={{ width, height }}
        role="progressbar"
        aria-valuenow={Math.round(clamped * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-[var(--color-accent)]"
          style={{ width: `${clamped * 100}%`, transition: "width 300ms linear" }}
        />
      </div>
      {label ? (
        <span className="mt-1 font-mono text-[10px] tracking-[0.25em] text-[var(--color-accent)]">
          {label}
        </span>
      ) : null}
    </div>
  );
}
