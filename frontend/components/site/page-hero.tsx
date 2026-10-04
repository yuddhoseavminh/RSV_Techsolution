"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal, revealItem } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

/** Shared masthead for every route below the landing page. */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="text-slate-950 dark:text-white relative overflow-hidden border-b border-slate-200 bg-slate-50 pt-32 pb-14 dark:border-white/10 dark:bg-[#0A0A0A] lg:pt-40 lg:pb-16">
      <div aria-hidden="true" className="premium-grid absolute inset-0 opacity-60" />
      <Reveal className="section-shell relative">
        <motion.p variants={revealItem} className="eyebrow text-navy-600 dark:text-navy-300">
          {eyebrow}
        </motion.p>
        <motion.h1
          variants={revealItem}
          className="mt-4 max-w-3xl font-display text-3xl font-[450] leading-[1.15] tracking-[-0.02em] text-slate-950 sm:text-4xl lg:text-5xl lg:leading-[1.1] dark:text-white"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400"
          >
            {description}
          </motion.p>
        ) : null}
      </Reveal>
    </section>
  );
}

type PageCtaProps = {
  title?: string;
  description?: string;
  action?: string;
};

/** Closing conversion band shared by every content page. */
export function PageCta({ title, description, action }: PageCtaProps) {
  const { isKhmer } = useLanguage();

  return (
    <Section className="border-t border-slate-200 bg-white pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
      <motion.div variants={revealItem} className="flex flex-col items-start justify-between gap-6 rounded-xl border border-slate-200 bg-slate-50 p-7 sm:p-9 md:flex-row md:items-center dark:border-white/10 dark:bg-white/[0.04]">
        <div>
          <h2 className="font-display text-xl font-[450] tracking-normal text-slate-950 sm:text-2xl dark:text-white">
            {title ?? (isKhmer ? "តើអ្វីជំរុញឱ្យគម្រោងរបស់អ្នកដំណើរការ?" : "What should your next system do?")}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            {description ??
              (isKhmer
                ? "ផ្ញើបទបង្ហាញខ្លីមួយ។ យើងឆ្លើយតបក្នុងមួយថ្ងៃធ្វើការ។"
                : "Send a short brief. We reply within one business day.")}
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link href="/contact">
            {action ?? (isKhmer ? "ទំនាក់ទំនងយើង" : "Talk to us")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
