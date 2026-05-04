"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLoadingTransition } from "./LoadingTransition";

const DWELL_MS = 400;

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [dwelling, setDwelling] = useState(false);
  const dwellTimer = useRef(null);
  const closeTimer = useRef(null);
  const { navigate } = useLoadingTransition();

  const startDwell = () => {
    clearTimeout(closeTimer.current);
    if (open) return;
    setDwelling(true);
    dwellTimer.current = setTimeout(() => {
      setOpen(true);
      setDwelling(false);
    }, DWELL_MS);
  };

  const cancelDwell = () => {
    clearTimeout(dwellTimer.current);
    setDwelling(false);
    closeTimer.current = setTimeout(() => setOpen(false), 350);
  };

  const go = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    navigate(href);
  };

  return (
    <div
      className="fixed right-8 top-8 z-[60] font-sans"
      onMouseLeave={cancelDwell}
    >
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onMouseEnter={startDwell}
        onFocus={startDwell}
        onBlur={cancelDwell}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-10 w-10 items-center justify-center"
      >
        <span className="sr-only">Menu</span>
        <span className="flex items-center gap-[5px]">
          <span className="block h-[4px] w-[4px] rounded-full bg-[var(--color-ink)]" />
          <span className="block h-[4px] w-[4px] rounded-full bg-[var(--color-ink)]" />
          <span className="block h-[4px] w-[4px] rounded-full bg-[var(--color-ink)]" />
        </span>
        <AnimatePresence>
          {dwelling ? (
            <motion.span
              key="dwell"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.3em] text-[var(--color-mute)]"
            >
              HOLD…
            </motion.span>
          ) : null}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.8, ease: [0.32, 0.08, 0.24, 1] }}
            onMouseEnter={() => clearTimeout(closeTimer.current)}
            onMouseLeave={cancelDwell}
            className="absolute right-0 top-12 w-48 rounded-2xl bg-[var(--color-dim)]/80 px-2 py-4 shadow-sm backdrop-blur-sm"
          >
            <nav className="flex flex-col">
              <a
                href="/"
                onClick={go("/")}
                className="group flex items-center justify-between px-5 py-3 text-[13px] font-bold tracking-[0.3em] text-[var(--color-ink)] hover:text-[var(--color-accent)]"
              >
                <span>HOME</span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </a>
              <a
                href="/queue"
                onClick={go("/queue")}
                className="group flex items-center justify-between px-5 py-3 text-[13px] font-bold tracking-[0.3em] text-[var(--color-ink)] hover:text-[var(--color-accent)]"
              >
                <span>QUEUE</span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </a>
              <a
                href="/hold"
                onClick={go("/hold")}
                className="group flex items-center justify-between px-5 py-3 text-[13px] font-bold tracking-[0.3em] text-[var(--color-ink)] hover:text-[var(--color-accent)]"
              >
                <span>HOLD</span>
                <span className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
