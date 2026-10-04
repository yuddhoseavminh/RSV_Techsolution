"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  /** ms before the first character lands — long enough to read the caret. */
  delay?: number;
  /** ms per character. */
  speed?: number;
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
 */
export function TypedHeadline({ text, className, delay = 1000, speed = 42 }: Props) {
  const [shown, setShown] = useState(0);
  const typedOnce = useRef(false);

  useEffect(() => {
    if (typedOnce.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      typedOnce.current = true;
      setShown(text.length);
      return;
    }

    let index = 0;
    let stepTimer = 0;
    setShown(0);

    const startTimer = window.setTimeout(function step() {
      index += 1;
      setShown(index);
      if (index < text.length) stepTimer = window.setTimeout(step, speed);
      else typedOnce.current = true;
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(stepTimer);
    };
  }, [text, delay, speed]);

  const visible = text.slice(0, Math.min(shown, text.length));

  return (
    <h1 className={cn("relative", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible block">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0 block">
        {visible}
        {shown < text.length ? <span className="caret" /> : null}
      </span>
    </h1>
  );
}
