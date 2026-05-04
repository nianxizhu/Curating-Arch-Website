"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import PixelProgressBar from "./PixelProgressBar";

function Segment({ seg }) {
  if (typeof seg === "string") return seg;
  if (seg.link && seg.href) {
    return (
      <a
        href={seg.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-[var(--color-accent)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-[6px] transition-colors duration-300 hover:text-[var(--color-ink)] hover:decoration-[var(--color-ink)]"
      >
        {seg.link}
        <span
          aria-hidden="true"
          className="ml-[3px] inline-block translate-y-[-1px] text-[0.7em]"
        >
          ↗
        </span>
      </a>
    );
  }
  if (seg.italic) {
    return <em className="italic">{seg.italic}</em>;
  }
  return null;
}

function renderParagraph(p) {
  if (typeof p === "string") return p;
  return p.map((seg, j) => <Segment key={j} seg={seg} />);
}

export default function HoldEssay({ title, subtitle, paragraphs }) {
  const total = paragraphs.length;
  const [revealed, setRevealed] = useState(0);
  const [loading, setLoading] = useState(false);
  const paragraphRefs = useRef([]);
  const lastScrolledIndex = useRef(-1);

  const started = revealed > 0;
  const done = revealed >= total;

  const startLoad = () => {
    if (loading || done) return;
    setLoading(true);
  };

  const handleComplete = () => {
    setRevealed((v) => Math.min(total, v + 1));
    setLoading(false);
  };

  useEffect(() => {
    if (revealed === 0) return;
    const newIndex = revealed - 1;
    if (newIndex === lastScrolledIndex.current) return;
    lastScrolledIndex.current = newIndex;

    const id = setTimeout(() => {
      const target = paragraphRefs.current[newIndex];
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 120);
    return () => clearTimeout(id);
  }, [revealed]);

  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.2, ease: [0.32, 0.08, 0.24, 1] }}
          className="font-sans text-[56px] font-extrabold tracking-[-0.01em] text-[var(--color-ink)] md:text-[72px]"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.8, ease: [0.32, 0.08, 0.24, 1] }}
          className="mt-14 flex min-h-[60px] items-center justify-center"
        >
          {!started ? (
            loading ? (
              <PixelProgressBar
                variant="smooth"
                duration={1.8}
                width={240}
                height={20}
                label="LOADING…"
                onComplete={handleComplete}
              />
            ) : (
              <button
                type="button"
                onClick={startLoad}
                className="group inline-flex items-center gap-3 rounded-md border-2 border-[var(--color-accent)] bg-transparent px-7 py-3 font-mono text-[12px] font-bold tracking-[0.4em] text-[var(--color-accent)] transition-colors duration-500 hover:bg-[var(--color-accent)] hover:text-[var(--color-ground)]"
              >
                LOAD FIRST PARAGRAPH
                <span aria-hidden="true" className="ml-1">↓</span>
              </button>
            )
          ) : null}
        </motion.div>
      </section>

      <div className="mx-auto max-w-2xl px-6 pb-40 pt-20">
        <div className="space-y-14">
          {paragraphs.slice(0, revealed).map((p, i) => (
            <motion.p
              key={i}
              ref={(el) => {
                paragraphRefs.current[i] = el;
              }}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: [0.32, 0.08, 0.24, 1] }}
              className="text-[18px] leading-[1.75] text-[var(--color-ink)]"
            >
              <span className="mr-3 align-top font-mono text-[11px] tracking-[0.3em] text-[var(--color-accent)]">
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              {renderParagraph(p)}
            </motion.p>
          ))}
        </div>

        {started ? (
          <div className="mt-20 flex flex-col items-start gap-3">
            {!done ? (
              loading ? (
                <PixelProgressBar
                  variant="smooth"
                  duration={1.8}
                  width={220}
                  height={18}
                  label="LOADING NEXT…"
                  onComplete={handleComplete}
                />
              ) : (
                <button
                  type="button"
                  onClick={startLoad}
                  className="group inline-flex items-center gap-3 rounded-md border-2 border-[var(--color-accent)] bg-transparent px-5 py-2 font-mono text-[11px] tracking-[0.35em] text-[var(--color-accent)] transition-colors duration-700 hover:bg-[var(--color-accent)] hover:text-[var(--color-ground)]"
                >
                  LOAD NEXT PARAGRAPH
                </button>
              )
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.6 }}
                className="font-mono text-[11px] tracking-[0.35em] text-[var(--color-mute)]"
              >
                END · THANK YOU FOR WAITING.
              </motion.p>
            )}

            <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-mute)]">
              {String(revealed).padStart(2, "0")} OF{" "}
              {String(total).padStart(2, "0")} REVEALED
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
