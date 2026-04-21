"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import PixelProgressBar from "./PixelProgressBar";

const LoadingContext = createContext(null);

export function useLoadingTransition() {
  const ctx = useContext(LoadingContext);
  if (!ctx) {
    throw new Error(
      "useLoadingTransition must be used inside <LoadingTransitionProvider>"
    );
  }
  return ctx;
}

const MARQUEE =
  "PATIENCE.  WE'RE ON IT.  GETTING THINGS READY.  ALMOST THERE.  LOADING YOUR EXPERIENCE.  THIS WON'T TAKE LONG.  ONE MOMENT.  ";

export default function LoadingTransitionProvider({ children }) {
  const router = useRouter();
  const [active, setActive] = useState(false);

  const navigate = useCallback(
    async (href, { duration = 1.6 } = {}) => {
      if (active) return;
      setActive(true);
      router.prefetch?.(href);
      await new Promise((r) => setTimeout(r, duration * 1000));
      router.push(href);
      setTimeout(() => setActive(false), 600);
    },
    [active, router]
  );

  return (
    <LoadingContext.Provider value={{ navigate, active }}>
      {children}
      <AnimatePresence>
        {active ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.08, 0.24, 1] }}
            className="fixed inset-0 z-[80] bg-[var(--color-ground)]"
          >
            <div className="absolute left-0 right-0 top-0 overflow-hidden bg-black py-3">
              <div className="marquee-track whitespace-nowrap font-sans text-[13px] font-bold italic tracking-[0.08em] text-[var(--color-ground)]">
                <span>{MARQUEE.repeat(6)}</span>
                <span>{MARQUEE.repeat(6)}</span>
              </div>
            </div>
            <div className="flex min-h-screen items-center justify-center">
              <PixelProgressBar
                variant="segments"
                segments={5}
                duration={1.4}
                label="LOADING…"
                width={170}
                height={22}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
}
