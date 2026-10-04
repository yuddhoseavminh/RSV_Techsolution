"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { projects } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

/** Three featured builds; the full catalogue lives on /portfolio. */
export function WorkBand() {
  const { isKhmer } = useLanguage();
  const featured = projects.slice(0, 3);

  return (
    <Section id="portfolio" className="border-t border-slate-200 bg-white pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
      <SectionHeading
        eyebrow={isKhmer ? "ការងារឆ្នើម" : "Selected work"}
        title={isKhmer ? "ប្រព័ន្ធដែលកំពុងដំណើរការ។" : "Systems already in daily use."}
        description={
          isKhmer
            ? "ចំណែកមួយនៃគម្រោងដែលយើងបានរចនា សាងសង់ និងប្រគល់ជូន។"
            : "A sample of the platforms we have designed, built and handed over."
        }
      />

      <motion.div variants={stagger} className="grid gap-6 md:grid-cols-3">
        {featured.map((project) => (
          <motion.article
            key={project.title}
            variants={revealItem}
            whileHover={{ y: -4, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } }}
            className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-[border-color,box-shadow] hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-white/20"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-4 dark:border-white/10">
              <Badge>{project.category}</Badge>
              <span className="truncate text-xs font-medium text-slate-400 dark:text-slate-500">
                {project.client}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-xl font-[450] tracking-normal text-slate-950 dark:text-white">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{project.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.div variants={revealItem} className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/portfolio">
            {isKhmer ? "មើលគម្រោងទាំងអស់" : "View all projects"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
