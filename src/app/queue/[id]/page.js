"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { artifacts } from "@/data/artifacts";
import PixelProgressBar from "../../components/PixelProgressBar";
import ArtifactNav from "../../components/ArtifactNav";

export default function ArtifactPage({ params }) {
  const { id } = use(params);
  const idNum = Number(id);
  const artifact = artifacts.find((a) => a.id === idNum);
  if (!artifact) notFound();

  const total = artifacts.length;
  const position = artifact.id;
  const prevHref = position > 1 ? `/queue/${position - 1}` : null;
  const nextHref =
    position < total ? `/queue/${position + 1}` : "/hold";
  const nextLabel =
    position < total ? "Next artifact" : "Continue to HOLD";

  const allImages = [artifact.image, ...artifact.thumbnails];
  const [activeImage, setActiveImage] = useState(artifact.image);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    setVideoPlaying(false);
  }, [activeImage]);

  const embedUrl = artifact.videoUrl
    ? artifact.videoUrl.replace("/video/", "/embed/video/") +
      (artifact.videoUrl.includes("?") ? "&" : "?") +
      "autoplay=1"
    : null;

  return (
    <main className="relative flex min-h-screen flex-col justify-center bg-[var(--color-ground)] px-5 py-10 md:px-24 md:py-16">
      <ArtifactNav
        prevHref={prevHref}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />

      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-center md:gap-16">
        <motion.div
          key={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.32, 0.08, 0.24, 1] }}
        >
          <div className="flex w-full items-start justify-center">
            {artifact.videoUrl ? (
              videoPlaying && embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={artifact.title}
                  allow="autoplay; fullscreen; picture-in-picture; web-share"
                  allowFullScreen
                  className="block aspect-video w-full max-h-[70vh] max-w-full border border-[var(--color-mute)]/40 bg-[var(--color-ground-deep)]"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setVideoPlaying(true)}
                  aria-label={`Play video — ${artifact.title}. ${artifact.altText}`}
                  className="group relative inline-block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeImage}
                    alt={artifact.altText}
                    className="block max-h-[70vh] w-auto max-w-full border border-[var(--color-mute)]/40 transition-all duration-500 group-hover:brightness-90"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[var(--color-ink)]/85 ring-2 ring-[var(--color-ground)]/40 transition-all duration-500 group-hover:scale-110 group-hover:bg-[var(--color-accent)]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-9 w-9 translate-x-[2px]"
                        aria-hidden="true"
                      >
                        <path d="M6 4l16 8-16 8z" fill="var(--color-ground)" />
                      </svg>
                    </span>
                  </span>
                </button>
              )
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={activeImage}
                alt={artifact.altText}
                className="block max-h-[70vh] w-auto max-w-full border border-[var(--color-mute)]/40"
              />
            )}
          </div>

          <p className="mt-4 font-sans text-[11px] leading-snug tracking-wide text-[var(--color-ink)]">
            {artifact.attribution}
          </p>

          {artifact.thumbnails.length > 0 ? (
            <div className="mt-6 flex gap-3">
              {allImages.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(src)}
                  className={`relative h-[80px] w-[110px] overflow-hidden border transition-all duration-500 ${
                    activeImage === src
                      ? "border-[var(--color-ink)] opacity-100"
                      : "border-[var(--color-mute)]/50 opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={src} alt="" fill sizes="110px" className="object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.32, 0.08, 0.24, 1] }}
          className="pt-2"
        >
          <h1 className="break-words font-sans text-[26px] font-extrabold uppercase leading-[1.05] tracking-[-0.01em] text-[var(--color-accent)] md:text-[34px]">
            {artifact.title}
          </h1>

          <div className="mt-6">
            <PixelProgressBar
              variant="smooth"
              progress={position / total}
              width={180}
              height={14}
              label={`${String(position).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}
            />
          </div>

          <div className="mt-10 whitespace-pre-line text-[17px] leading-[1.7] text-[var(--color-ink)]">
            {artifact.description}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

