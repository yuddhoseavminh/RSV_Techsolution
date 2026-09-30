"use client";

import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "../primitives/reveal";
import type { WorkContent } from "../content/types";

export function Work({ eyebrow, title, lede, items }: WorkContent) {
  return (
    <Section id="portfolio" divider={false} className="bg-slate-50 py-20 lg:py-28">
      <SectionHeading eyebrow={eyebrow} title={title} description={lede} />

      <RevealGroup className="grid gap-5 md:grid-cols-2">
        {items.map((item, index) => {
          const featured = index === 0;

          return (
            <RevealItem
              key={item.title}
              className={cn("h-full", featured && "md:col-span-2")}
            >
              <article
                className={cn(
                  "group h-full overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_28px_70px_-40px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20",
                  featured && "md:grid md:grid-cols-2 md:items-stretch"
                )}
              >
                <div
                  className={cn(
                    "relative isolate min-h-[210px] overflow-hidden bg-gradient-to-br from-navy-600 via-navy-500 to-brand-cyan",
                    featured && "md:min-h-full"
                  )}
                >
                  <div aria-hidden="true" className="premium-grid absolute inset-0 opacity-20" />
                  <div className="relative flex h-full flex-col justify-between gap-6 p-6">
                    <span className="eyebrow text-white/70">{item.category}</span>
                    <p className="font-display text-2xl font-bold leading-snug tracking-normal text-white lg:text-3xl">
                      {item.outcome}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-bold tracking-normal">{item.title}</h3>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy-600 dark:text-slate-600 dark:group-hover:text-navy-300" />
                  </div>

                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-5 dark:border-white/10">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.client}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                    {item.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
