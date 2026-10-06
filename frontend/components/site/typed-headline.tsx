"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  /** ms before the first character lands — long enough to read the caret. */
  delay?: number;
  /** ms per character. Defaults to a length-aware step, capped at Antigravity's 50ms. */
  speed?: number;
  /** Fires once the last character lands — the hero's reveal timeline keys
      off this, exactly as Antigravity's GSAP timeline follows its typing. */
  onComplete?: () => void;
};

/**
 * Headline that types itself in behind a blinking caret, mirroring the
 * Antigravity "typed header" pattern.
 *
 * Three copies of the string, each doing one job:
 *   1. `.sr-only`   — the real text, so screen readers and crawlers get it once.
 *   2. `.invisible` — occupies the final layout, so the block never reflows
 *                     (and therefore never jitters) while characters land.
 *   3. absolute     — the visible layer, revealing one character at a time.
 *
 * Only the first mount types; a language switch swaps the copy in instantly.
 * When the last char lands the caret stays put for a beat and fades out over
 * 0.5s (`.caret-fade`) — Antigravity's cursor hand-off before the rest of the
 * hero blooms in.
 */
export function TypedHeadline({ text, className, delay = 1000, speed, onComplete }: Props) {
  const [shown, setShown] = useState(0);
  const typedOnce = useRef(false);
  const completed = useRef(false);

  // ~3s of typing however long the string is (the Khmer headline runs more
  // than twice the English one), never slower than Antigravity's 0.05s/char.
  const step = speed ?? Math.min(50, Math.max(25, 3000 / Math.max(text.length, 1)));
  const done = shown >= text.length;

  useEffect(() => {
    if (typedOnce.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typedOnce.current = true;
      setShown(text.length);
      return;
    }

    let index = 0;
    let stepTimer = 0;
    setShown(0);

    const startTimer = window.setTimeout(function tick() {
      index += 1;
      setShown(index);
      if (index < text.length) stepTimer = window.setTimeout(tick, step);
      else typedOnce.current = true;
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(stepTimer);
    };
  }, [text, delay, step]);

  useEffect(() => {
    if (!done || completed.current) return;
    completed.current = true;
    onComplete?.();
  }, [done, onComplete]);

  const visible = text.slice(0, Math.min(shown, text.length));

  return (
    <h1 className={cn("relative", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible block">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0 block">
        {visible}
        <span className={cn("caret", done && "caret-fade")} />
      </span>
    </h1>
  );
}
