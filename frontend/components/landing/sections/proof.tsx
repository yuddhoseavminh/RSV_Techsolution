"use client";

import { Quote } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { RevealGroup, RevealItem } from "../primitives/reveal";
import type { ProofContent } from "../content/types";

export function Proof({ eyebrow, title, lede, stats, quotes }: ProofContent) {
  return (
    <Section tone="dark" divider={false} className="bg-brand-slate py-20 lg:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-16">
        <SectionHeading
          align="left"
          tone="dark"
          eyebrow={eyebrow}
          title={title}
          description={lede}
          className="mb-0"
        />

        <RevealGroup className="grid grid-cols-2 gap-4 sm:gap-5">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="h-full rounded-xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl sm:p-6">
                <p className="font-display text-4xl font-bold tabular-nums tracking-normal text-white lg:text-5xl">
                  {stat.value}{stat.suffix}
                </p>
                <p className="mt-2 text-xs font-medium leading-5 text-slate-300 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
        {quotes.map((item) => (
          <RevealItem key={item.name}>
            <figure className="flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6">
              <Quote className="h-5 w-5 text-navy-300" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 font-display text-lg font-medium leading-8 text-slate-100">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold text-white">
                  {item.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-white">{item.name}</span>
                  <span className="block truncate text-xs text-slate-400">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
