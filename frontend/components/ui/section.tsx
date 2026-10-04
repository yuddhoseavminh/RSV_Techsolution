"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

export type SectionTone = "base" | "dark";

const sectionTone: Record<SectionTone, string> = {
  base: "bg-transparent text-slate-950 dark:bg-transparent dark:text-white",
  dark: "bg-slate-950 text-white dark:bg-brand-slate"
};

type SectionProps = HTMLAttributes<HTMLElement> & {
  id?: string;
  tone?: SectionTone;
  contained?: boolean;
  /** Painted inside <section> but outside the reveal wrapper, so absolute
   *  decorations keep <section> as their containing block. */
  decor?: ReactNode;
  children: ReactNode;
};

export function Section({ id, tone = "base", contained = true, decor, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(sectionTone[tone], className)}
      {...props}
    >
      {decor}
      {contained ? (
        <Reveal className="section-shell">{children}</Reveal>
      ) : (
        children
      )}
    </section>
  );
}

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  elevated?: boolean;
  children?: ReactNode;
};

export function Panel({ elevated = false, className, children, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04]",
        elevated && "shadow-[0_28px_70px_-32px_rgba(15,23,42,0.45)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: SectionTone;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "center", tone = "base", as: Heading = "h2", className }: SectionHeadingProps) {
  return (
    <motion.div
      variants={revealItem}
      className={cn("mb-12 max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left", className)}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", tone === "dark" ? "text-navy-300" : "text-navy-600 dark:text-navy-300")}>{eyebrow}</p>
      ) : null}
      <Heading
        className={cn(
          "mt-4 font-display text-3xl font-[450] leading-tight tracking-[-0.02em] md:text-4xl lg:text-[2.6rem] lg:leading-[1.15]",
          tone === "dark" ? "text-white" : "text-slate-950 dark:text-white"
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className={cn("mt-5 text-base leading-7", tone === "dark" ? "text-slate-300" : "text-slate-600 dark:text-slate-400")}>
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
