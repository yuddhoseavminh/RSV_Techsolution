"use client";

import { Section } from "@/components/ui/section";
import { Reveal } from "../primitives/reveal";
import type { LogoStripContent } from "../content/types";

export function LogoStrip({ label, names }: LogoStripContent) {
  return (
    <Section
      divider={false}
      className="border-y border-slate-200 bg-white py-12 dark:border-white/10"
    >
      <Reveal>
        <p className="eyebrow text-center text-slate-400 dark:text-slate-500">{label}</p>
      </Reveal>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
        {names.map((name) => (
          <span
            key={name}
            className="text-sm font-semibold text-slate-400 transition-colors hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300"
          >
            {name}
          </span>
        ))}
      </div>
    </Section>
  );
}
