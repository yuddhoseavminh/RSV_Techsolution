"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/** Long, soft settle — matches the shared reveal easing in fade-in.tsx. */
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Container carries no motion of its own; it only spaces the words out. */
const wordGroup: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.14, staggerChildren: 0.05 } }
};

/**
 * Each word sits in an overflow-hidden slot and lifts into place from below,
 * so the heading reads as words wiping upward rather than one block fading.
 * Slot padding below the baseline keeps descenders (`p`, `y`) from being
 * clipped while the word is still hidden.
 */
const wordRise: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: EXPO_OUT } }
};

type WordRevealProps = {
  text: string;
  className?: string;
};

/**
 * Word-by-word heading reveal.
 *
 * Must sit inside a `whileInView`/`initial` variant tree (the shared `Reveal`
 * shell) — it inherits the "hidden"/"visible" label like any other child and
 * only defines how its own words behave. Renders plain text when the visitor
 * prefers reduced motion.
 */
export function WordReveal({ text, className }: WordRevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span variants={wordGroup} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span variants={wordRise} className="inline-block will-change-transform">
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}
