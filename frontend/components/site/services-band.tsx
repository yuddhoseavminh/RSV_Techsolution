"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { services } from "@/lib/data";
import { localizeService } from "@/lib/i18n/service-copy";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

const SWAP = 0.28 as const;

/**
 * Services index with a live preview.
 *
 * The list drives a panel that swaps on hover/focus, so the section can show
 * what each service actually delivers without turning into another card grid
 * (Capabilities and Industries already own that shape). Every row deep-links to
 * its own anchor on /services. Below lg the panel is dropped and each row
 * carries its own one-line description instead, so no breakpoint loses content.
 */
export function ServicesBand() {
  const { isKhmer } = useLanguage();
  const [active, setActive] = useState(0);

  const current = services[active];
  const currentCopy = localizeService(current, isKhmer);
  const CurrentIcon = current.icon;

  return (
    <Section id="services" className="border-t border-slate-200 bg-slate-50 pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
      <SectionHeading
        align="left"
        className="mb-10 max-w-2xl"
        eyebrow={isKhmer ? "សេវាកម្ម" : "Services"}
        title={isKhmer ? "អ្វីដែលយើងសាងសង់។" : "What we build."}
        description={
          isKhmer
            ? "ប្រព័ន្ធដែលក្រុមហ៊ុនប្រើប្រាស់ជាប្រចាំថ្ងៃ ពីគេហទំព័ររហូតដល់ ERP។"
            : "Systems businesses use every day, from websites to ERP."
        }
      />

      <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <motion.ul variants={stagger} className="border-b border-slate-200 dark:border-white/10">
          {services.map((service, index) => {
            const { title, description } = localizeService(service, isKhmer);
            const Icon = service.icon;
            const isActive = index === active;

            return (
              <motion.li
                key={service.slug}
                variants={revealItem}
                className="border-t border-slate-200 dark:border-white/10"
              >
                <Link
                  href={`/services#${service.slug}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "group flex items-center gap-4 border-l-2 py-4 pl-4 pr-3 transition-colors sm:gap-5 sm:py-5 sm:pl-5",
                    isActive
                      ? "border-navy-400 bg-white dark:border-navy-400 dark:bg-white/[0.05]"
                      : "border-transparent hover:bg-white dark:hover:bg-white/[0.03]"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-semibold tabular-nums transition-colors",
                      isActive ? "text-navy-600 dark:text-navy-300" : "text-slate-400 dark:text-slate-500"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex min-w-0 flex-1 items-start gap-3">
                    <Icon
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0 transition-colors",
                        isActive ? "text-navy-400" : "text-slate-400 dark:text-slate-500"
                      )}
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-base font-[450] text-slate-950 sm:text-lg dark:text-white">
                        {title}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600 dark:text-slate-400 lg:hidden">
                        {description}
                      </span>
                    </span>
                  </span>

                  <ArrowUpRight
                    className={cn(
                      "h-5 w-5 shrink-0 transition-all",
                      isActive
                        ? "-translate-y-0.5 translate-x-0.5 text-navy-600 dark:text-navy-300"
                        : "text-slate-300 dark:text-slate-600"
                    )}
                  />
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div variants={revealItem} className="hidden lg:sticky lg:top-28 lg:block">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: SWAP, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft dark:border-white/10 dark:bg-white/[0.04]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-600 text-white dark:bg-navy-400 dark:text-navy-600">
                <CurrentIcon className="h-6 w-6" />
              </span>
              <span className="font-display text-sm font-bold tabular-nums text-slate-300 dark:text-slate-700">
                {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-6 font-display text-xl font-[450] text-slate-950 dark:text-white">
              {currentCopy.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {currentCopy.description}
            </p>

            <p className="eyebrow mt-6 text-navy-600 dark:text-navy-300">
              {isKhmer ? "អ្វីដែលអ្នកទទួលបាន" : "What you get"}
            </p>
            <ul className="mt-3 space-y-2">
              {(currentCopy.benefits ?? current.benefits).map((benefit) => (
                <li key={benefit} className="flex gap-2.5 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-navy-400" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              {current.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                >
                  {technology}
                </span>
              ))}
            </div>

            <Link
              href={`/services#${current.slug}`}
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 transition-all hover:gap-2.5 dark:text-navy-300"
            >
              {isKhmer ? "មើលព័ត៌មានលម្អិត" : "View details"}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
