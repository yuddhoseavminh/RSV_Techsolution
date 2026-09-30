"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { EASE_OUT, fadeUp, stagger } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

const VIEWPORT = { once: true, margin: "-80px" } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** A single block that fades up when it enters the viewport. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Wraps a set of `RevealItem` children and staggers them left to right. */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A child of `RevealGroup`. Never rendered outside one. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={cn(className)}>
      {children}
    </motion.div>
  );
}
