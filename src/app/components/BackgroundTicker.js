"use client";

const PHRASE =
  "YOUR WAIT TIME IS NOT AN ACCIDENT. SOMEONE DESIGNED THIS FOR SOMEONE ELSE. ";

export default function BackgroundTicker({
  lines = 48,
  className = "",
}) {
  const repeated = PHRASE.repeat(12);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      <div className="flex flex-col gap-[2px] py-[2px]">
        {Array.from({ length: lines }).map((_, i) => {
          const offset = ((i * 13) % 120) - 60;
          const speed = 55 + (i % 5) * 12;
          const reverse = i % 2 === 1;
          return (
            <div
              key={i}
              className="relative h-[22px] overflow-hidden"
              style={{ transform: `translateX(${offset}px)` }}
            >
              <div
                className="marquee-track whitespace-nowrap font-sans text-[12px] font-bold italic tracking-[0.02em] text-[var(--color-ink)]"
                style={{
                  animationDuration: `${speed}s`,
                  animationDirection: reverse ? "reverse" : "normal",
                  opacity: 0.18,
                }}
              >
                <span>{repeated}</span>
                <span>{repeated}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
