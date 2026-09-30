"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";
import { services } from "@/lib/data";
import { localizeService } from "@/lib/i18n/service-copy";
import { Reveal } from "../primitives/reveal";
import type { ServicesContent } from "../content/types";

export function Services({ eyebrow, title, lede }: ServicesContent) {
  const { isKhmer } = useLanguage();
  const visible = services.slice(0, 6);

  return (
    <Section id="services" divider={false} className="bg-white py-20 lg:py-28">
      <SectionHeading eyebrow={eyebrow} title={title} description={lede} />

      <Reveal>
        <div className="border-b border-slate-200 dark:border-white/10">
          {visible.map((service, index) => {
            const { title: name, description } = localizeService(service, isKhmer);
            const Icon = service.icon;

            return (
              <Link
                key={service.slug}
                href="/services"
                className="group grid gap-3 border-t border-slate-200 py-7 transition-colors md:grid-cols-[3.5rem_1fr_15rem] md:items-start md:gap-6 dark:border-white/10 dark:hover:bg-white/[0.03]"
              >
                <span className="text-sm font-semibold tabular-nums text-slate-400 transition-colors group-hover:text-navy-600 dark:text-slate-500 dark:group-hover:text-navy-300">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="flex items-start gap-2">
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-navy-600 dark:text-navy-300" />
                    <h3 className="font-display text-xl font-bold tracking-normal transition-colors group-hover:text-navy-600 md:text-2xl dark:group-hover:text-navy-300">
                      {name}
                    </h3>
                    <ArrowUpRight className="mt-1.5 h-4 w-4 shrink-0 -translate-x-1 text-slate-400 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 md:justify-end">
                  {service.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
