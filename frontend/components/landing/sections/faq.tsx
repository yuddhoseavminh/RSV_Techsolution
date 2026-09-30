"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { EASE_OUT } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";
import { Reveal } from "../primitives/reveal";
import type { FaqContent } from "../content/types";

export function Faq({ eyebrow, title, lede, items }: FaqContent) {
  const [open, setOpen] = useState(0);

  return (
    <Section id="faq" divider={false} className="bg-slate-50 py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow={eyebrow}
          title={title}
          description={lede}
          className="mb-0 lg:sticky lg:top-28 lg:self-start"
        />

        <Reveal delay={0.05}>
          <div className="grid gap-3">
            {items.map((item, index) => {
              const isOpen = open === index;
              const panelId = `faq-panel-${index}`;

              return (
                <div
                  key={item.question}
                  className={cn(
                    "overflow-hidden rounded-xl border bg-white transition-colors dark:bg-white/[0.04]",
                    isOpen
                      ? "border-navy-300 dark:border-navy-400/60"
                      : "border-slate-200 dark:border-white/10"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-sm font-bold leading-6 tracking-normal md:text-base">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300",
                        isOpen && "rotate-180 text-navy-600 dark:text-navy-300"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                      >
                        <p className="px-5 pb-5 pr-14 text-sm leading-7 text-slate-600 dark:text-slate-300">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
