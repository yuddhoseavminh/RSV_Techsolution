"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { services } from "@/lib/data";
import { localizeService } from "@/lib/i18n/service-copy";
import { useLanguage } from "@/lib/language-context";

/**
 * Names-only index of the catalogue. Descriptions, benefits and technology
 * details live on /services so the two never repeat each other.
 */
export function ServicesBand() {
  const { isKhmer } = useLanguage();

  return (
    <Section id="services" className="border-t border-slate-200 bg-slate-50 pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
      <motion.div
        variants={stagger}
        className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
      >
        <SectionHeading
          align="left"
          className="mb-0 lg:sticky lg:top-28 lg:self-start"
          eyebrow={isKhmer ? "សេវាកម្ម" : "Services"}
          title={isKhmer ? "អ្វីដែលយើងសាងសង់។" : "What we build."}
          description={
            isKhmer
              ? "ប្រព័ន្ធដែលក្រុមហ៊ុនប្រើប្រាស់ជាប្រចាំថ្ងៃ ពីគេហទំព័ររហូតដល់ ERP។"
              : "Systems businesses use every day, from websites to ERP."
          }
        />

        <motion.div variants={revealItem} className="border-b border-slate-200 dark:border-white/10">
          {services.map((service, index) => {
            const { title } = localizeService(service, isKhmer);
            const Icon = service.icon;

            return (
              <Link
                key={service.slug}
                href="/services"
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-t border-slate-200 py-5 transition-colors hover:bg-white sm:gap-5 sm:py-6 dark:border-white/10 dark:hover:bg-white/[0.03]"
              >
                <span className="text-sm font-semibold tabular-nums text-slate-400 transition-colors group-hover:text-navy-600 dark:text-slate-500 dark:group-hover:text-navy-300">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex min-w-0 items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0 text-navy-400" />
                  <span className="font-display text-base font-[450] tracking-normal text-slate-950 sm:truncate transition-colors group-hover:text-navy-600 sm:text-lg dark:text-white dark:group-hover:text-navy-300">
                    {title}
                  </span>
                </span>

                <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy-600 dark:text-slate-600 dark:group-hover:text-navy-300" />
              </Link>
            );
          })}
        </motion.div>
      </motion.div>
    </Section>
  );
}
