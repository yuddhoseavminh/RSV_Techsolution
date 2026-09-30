"use client";

import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "../primitives/reveal";
import type { CapabilitiesContent } from "../content/types";

export function Capabilities({ eyebrow, title, lede, items }: CapabilitiesContent) {
  return (
    <Section id="features" divider={false} className="bg-slate-50 py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow={eyebrow}
          title={title}
          description={lede}
          className="mb-0 lg:sticky lg:top-28 lg:self-start"
        />

        <RevealGroup className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {items.map((item, index) => (
            <RevealItem key={item.title}>
              <div className="border-t border-slate-300/70 pt-5 dark:border-white/10">
                <span className="text-xs font-semibold tabular-nums text-navy-600 dark:text-navy-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-base font-bold leading-snug tracking-normal">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {item.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
