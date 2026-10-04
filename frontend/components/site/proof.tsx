"use client";

import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { stats } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

const khLabels: Record<string, string> = {
  "Projects Delivered": "គម្រោងដែលបានប្រគល់",
  "Business Systems": "ប្រព័ន្ធអាជីវកម្ម",
  "Client Satisfaction": "ការពេញចិត្តរបស់អតិថិជន",
  "Support Coverage": "ការគាំទ្រ"
};

export function Proof() {
  const { isKhmer } = useLanguage();

  return (
    <Section
      tone="dark"
      className="relative overflow-hidden bg-brand-slate pt-16 pb-20 lg:pt-18 lg:pb-30"
      decor={
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[620px] rounded-full bg-navy-400/25 blur-[140px]"
        />
      }
    >
      <motion.div variants={stagger} className="relative">
        <SectionHeading
          tone="dark"
          eyebrow={isKhmer ? "ភស្តុតាង" : "Track record"}
          title={isKhmer ? "លទ្ធផលដែលអាចវាស់បាន។" : "Results you can measure."}
        />

        <motion.div
          variants={stagger}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={revealItem} className="bg-brand-slate p-6 text-center lg:p-8">
              <p className="font-display text-3xl font-bold tracking-tight text-white lg:text-4xl">{stat.value}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">
                {isKhmer ? khLabels[stat.label] ?? stat.label : stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.figure variants={revealItem} className="mx-auto mt-14 max-w-3xl text-center">
          <blockquote className="font-display text-xl font-semibold leading-relaxed tracking-normal text-white lg:text-2xl">
            {isKhmer
              ? "«RVS Techsolution បានជួយយើងជំនួសសៀវភៅ Excel ដោយប្រព័ន្ធ POS និងស្តុកដែលក្រុមយើងពិតជាចូលចិត្តប្រើ។»"
              : "“RVS Techsolution replaced our spreadsheets with a POS and inventory system our team actually enjoys using.”"}
          </blockquote>
          <figcaption className="mt-5 text-sm text-slate-400">
            {isKhmer ? "Sokha Lim · នាយកប្រតិបត្តិការ, Acme Retail" : "Sokha Lim · Operations Director, Acme Retail"}
          </figcaption>
        </motion.figure>
      </motion.div>
    </Section>
  );
}
