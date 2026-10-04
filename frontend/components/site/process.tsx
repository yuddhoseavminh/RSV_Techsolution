"use client";

import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";

const steps = [
  {
    letter: "D",
    title: { EN: "Discover", KH: "ស្វែងយល់" },
    body: {
      EN: "We map the workflow, roles and reports your team relies on today.",
      KH: "យើងវិភាគរបៀបធ្វើការ តួនាទី និងរបាយការណ៍ដែលក្រុមអ្នកពឹងផ្អែក។"
    }
  },
  {
    letter: "A",
    title: { EN: "Architect", KH: "រចនា" },
    body: {
      EN: "Screens, data model and access rules are agreed before a line of code.",
      KH: "ប៉ាន់ស្មាន គំរូទិន្នន័យ និងស៊ីម៉ង់សិទ្ធី ត្រូវបានយល់ព្រមមុនសរសេរកូដ។"
    }
  },
  {
    letter: "B",
    title: { EN: "Build", KH: "សាងសង់" },
    body: {
      EN: "Short iterations, visible staging builds and weekly demos.",
      KH: "វគ្គខ្លីៗ ការសាកល្បងដែលឃើញច្បាស់ និងការបង្ហាញរៀងរាល់សប្តាហ៍។"
    }
  },
  {
    letter: "S",
    title: { EN: "Support", KH: "គាំទ្រ" },
    body: {
      EN: "Training, monitoring and improvements after go-live.",
      KH: "ការបណ្តុះបណ្តាល ការតាមដាន និងការកែលម្អបន្ទាប់ពីដាក់ប្រើ។"
    }
  }
] as const;

export function Process() {
  const { isKhmer } = useLanguage();
  const copy = isKhmer ? "KH" : "EN";

  return (
    <Section className="border-t border-slate-200 bg-slate-50 pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
      <SectionHeading
        eyebrow={isKhmer ? "របៀបដែលយើងធ្វើការ" : "How we work"}
        title={isKhmer ? "ពីការពិភាក្សាដល់ការដាក់ប្រើ។" : "From first call to go-live."}
        description={
          isKhmer
            ? "ដំណើរការច្បាស់លាស់ ដែលអ្នកដឹងថាតើអ្វីកំពុងកើតឡើង។"
            : "A clear process, so you always know what is happening."
        }
      />

      <motion.ol variants={stagger} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <motion.li
            key={step.title.EN}
            variants={revealItem}
            whileHover={{ y: -4, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } }}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] hover:border-navy-400/50 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-navy-400/50"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-navy-400 to-navy-600 transition-transform duration-300 group-hover:scale-x-100"
            />
            <span
              aria-hidden="true"
              className="block bg-gradient-to-br from-navy-400 to-navy-600 bg-clip-text font-display text-[38px] font-bold leading-none tracking-tight text-transparent dark:from-navy-300 dark:to-navy-400"
            >
              {step.letter}
            </span>
            <h3 className="mt-4 font-display text-lg font-[450] tracking-normal text-slate-950 dark:text-white">
              {step.title[copy]}
            </h3>
            <p className="mt-2.5 text-sm leading-7 text-slate-600 dark:text-slate-400">{step.body[copy]}</p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
