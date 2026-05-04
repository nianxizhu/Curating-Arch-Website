"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLoadingTransition } from "./LoadingTransition";

const TICKET_DROP_MS = 3600;
const HOLD_AFTER_DROP_MS = 1800;
const TOP_SPACER_HEIGHT = 40;
const TICKET_AREA_HEIGHT = 200;

export default function WaitingSymbol({ href = "/queue" }) {
  const { navigate } = useLoadingTransition();
  const [dispensed, setDispensed] = useState(false);
  const [number, setNumber] = useState(null);

  useEffect(() => {
    if (!dispensed) return;
    const id = setTimeout(
      () => navigate(href),
      TICKET_DROP_MS + HOLD_AFTER_DROP_MS
    );
    return () => clearTimeout(id);
  }, [dispensed, href, navigate]);

  const dispense = () => {
    if (dispensed) return;
    setNumber(Math.floor(Math.random() * 900) + 100);
    setDispensed(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, delay: 0.6, ease: [0.32, 0.08, 0.24, 1] }}
      className="flex w-[300px] flex-col items-center md:w-[360px]"
    >
      <div
        aria-hidden="true"
        style={{ height: TOP_SPACER_HEIGHT }}
      />

      <div className="w-full overflow-hidden rounded-lg border-2 border-[var(--color-ink)] bg-[var(--color-ink)]">
        <div className="flex flex-col items-center px-7 pb-6 pt-7">
          <p className="font-mono text-[14px] font-bold tracking-[0.4em] text-[var(--color-ground)]">
            TAKE A NUMBER
          </p>

          <motion.button
            type="button"
            onClick={dispense}
            disabled={dispensed}
            initial={false}
            whileHover={!dispensed ? { y: -2 } : {}}
            whileTap={!dispensed ? { y: 2 } : {}}
            transition={{ duration: 0.3, ease: [0.32, 0.08, 0.24, 1] }}
            className="mt-5 inline-flex items-center justify-center rounded-md border-2 border-[var(--color-ground)] bg-[var(--color-accent)] px-12 py-3 font-mono text-[15px] font-bold tracking-[0.4em] text-[var(--color-ground)] transition-colors duration-300 hover:bg-[var(--color-ground)] hover:text-[var(--color-ink)] disabled:cursor-default disabled:opacity-40"
            aria-label="Press to dispense your ticket"
          >
            PRESS
          </motion.button>

          <p className="mt-5 font-mono text-[10px] tracking-[0.35em] text-[var(--color-ground)] opacity-60">
            ↓  TICKET DISPENSES BELOW  ↓
          </p>
        </div>

        <div className="relative h-[16px] bg-[var(--color-ink)]">
          <div className="absolute inset-x-7 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[var(--color-ground)]" />
        </div>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{ height: TICKET_AREA_HEIGHT }}
        aria-live="polite"
      >
        <AnimatePresence>
          {dispensed && number !== null ? (
            <motion.div
              key="ticket"
              initial={{ y: "-110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: TICKET_DROP_MS / 1000,
                ease: [0.32, 0.08, 0.24, 1],
              }}
              className="absolute inset-x-4 top-2 rounded-lg border border-[var(--color-ink)] bg-[#f3ede0]"
            >
              <div className="flex h-3 items-center justify-between px-4 pt-1">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className="block h-[3px] w-[3px] rounded-full bg-[var(--color-ink)]"
                  />
                ))}
              </div>

              <div className="px-6 pb-7 pt-3 text-center">
                <p className="font-mono text-[14px] font-bold tracking-[0.4em] text-[var(--color-mute)]">
                  NOW SERVING
                </p>
                <p className="mt-3 font-sans text-[92px] font-extrabold leading-none tracking-[-0.04em] text-[var(--color-ink)]">
                  {String(number).padStart(3, "0")}
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
