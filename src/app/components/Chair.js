"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Chair() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.6, delay: 0.6, ease: [0.32, 0.08, 0.24, 1] }}
      className="relative h-[220px] w-[180px]"
    >
      <Image
        src="/chair.svg"
        alt="A wooden chair, emblem of waiting."
        fill
        sizes="180px"
        priority
        style={{ objectFit: "contain" }}
      />
    </motion.div>
  );
}
