"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { revealItem } from "@/components/motion/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";

/** Framed product shot sitting directly under the hero. */
export function ProductCover() {
  const { isKhmer } = useLanguage();

  return (
    <Section
      className="overflow-x-clip bg-white pt-16 pb-16 lg:pt-18 lg:pb-24 dark:bg-[#0A0A0A]"
      aria-label={isKhmer ? "ប្រព័ន្ធគំរូ" : "Product preview"}
    >
      <SectionHeading
        eyebrow={isKhmer ? "ប្រព័ន្ធគំរូ" : "The system"}
        title={isKhmer ? "មើលប្រព័ន្ធ ដែលក្រុមរបស់អ្នកប្រើប្រាស់ជាប្រចាំ។" : "A look at the system your team will run every day."}
        description={
          isKhmer
            ? "ផ្ទាំងគ្រប់គ្រង ការលក់ POS ស្តុកទំនិញ និងការិយាល័យផ្ទៃក្នុង ដំណើរការលើទិន្នន័យតែមួយ។"
            : "Dashboard, point of sale, inventory and back office — one interface, one source of truth."
        }
      />

      <motion.figure variants={revealItem} className="relative">
        {/* Brand glow lifting the frame off the page. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -top-6 h-44 rounded-[2.5rem] bg-navy-400/12 blur-3xl dark:bg-navy-400/20"
        />

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_40px_90px_-45px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_40px_90px_-45px_rgba(0,0,0,0.9)]">
          <Image
            src="/images/og-hero.png"
            alt={
              isKhmer
                ? "ផ្ទាំងគ្រប់គ្រងផលិតផល RVS Techsolution បង្ហាញលើម៉ូនីទ័រ ថេប្លេត ទូរស័ព្ទ និងម៉ាស៊ីន POS"
                : "RVS Techsolution dashboard displayed on a monitor, tablet, phone and point-of-sale terminal"
            }
            width={1672}
            height={941}
            sizes="(min-width: 1360px) 1360px, calc(100vw - 32px)"
            className="h-auto w-full"
          />
        </div>
      </motion.figure>
    </Section>
  );
}
