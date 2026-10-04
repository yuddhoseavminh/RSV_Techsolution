"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/** Snappy settle — used for the (mostly off-screen) exit and small lifts. */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Long, soft settle — starts quick, glides to rest. */
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Shared reveal trigger. `once: false` means a block replays its fade every
 * time it re-enters the viewport, so scrolling away and back never snaps to
 * the finished state.
 */
const REVEAL_VIEWPORT: { once: false; margin: string } = {
  once: false,
  margin: "-60px"
};

/** Row container — carries no opacity of its own, only spaces its children out. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

/**
 * Scroll-reveal variants.
 *
 * Opacity lives on the group *and* the item (at most two layers nest, so the
 * product of both simply steepens the fade — it never compounds further),
 * translation and zoom live on the item. Each block grows from 0.86 → 1 while
 * lifting, so it reads as a zoom rather than a slide. Items settle at y:0 /
 * scale:1 / opacity:1, which framer collapses to `transform: none`, keeping
 * CSS hover transforms intact.
 */
const revealGroup: Variants = {
  hidden: {
    opacity: 0,
    // The exit is almost always off-screen, so it is kept short — that frees
    // the compositor for the entrance instead of two overlapping animations.
    transition: { duration: 0.3, ease: EASE_OUT }
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, delayChildren: 0.08, ease: EXPO_OUT, staggerChildren: 0.09 }
  }
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.86, transition: { duration: 0.3, ease: EASE_OUT } },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EXPO_OUT }
  }
};

/**
 * The animated `.section-shell`. `<Section>` uses it directly; the two blocks
 * that build their own shell for layout reasons (the page masthead and the
 * hairline capability strip) wrap it here so every reveal shares one trigger.
 */
export function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={REVEAL_VIEWPORT}
      variants={revealGroup}
    >
      {children}
    </motion.div>
  );
}

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Standalone reveal for content that sits outside a `<Section>`. */
export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 32, scale: 0.86 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.8, delay, ease: EXPO_OUT }}
    >
      {children}
    </motion.div>
  );
}
