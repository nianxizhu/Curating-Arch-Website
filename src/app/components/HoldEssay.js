"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HoldEssay({ paragraphs }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray(".hold-paragraph");
      nodes.forEach((node) => {
        gsap.fromTo(
          node,
          { opacity: 0.08, y: 32, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: node,
              start: "top 80%",
              end: "top 40%",
              scrub: 1.2,
            },
          }
        );
      });
    },
    { scope }
  );

  return (
    <div ref={scope} className="mx-auto max-w-2xl px-6 pb-[60vh]">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="hold-paragraph mt-[55vh] text-[18px] leading-[1.75] text-[var(--color-ink)]"
        >
          <span className="mr-3 font-mono text-[11px] tracking-[0.3em] text-[var(--color-accent)] align-top">
            {String(i + 1).padStart(2, "0")} /{" "}
            {String(paragraphs.length).padStart(2, "0")}
          </span>
          {p}
        </p>
      ))}
    </div>
  );
}
