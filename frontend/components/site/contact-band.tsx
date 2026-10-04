"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { ContactForm } from "./contact-form";

const details = [
  { key: "email", icon: Mail, value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { key: "phone", icon: Phone, value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
  { key: "address", icon: MapPin, value: siteConfig.address, href: null }
] as const;

/**
 * What happens after someone hits send. Replaces the standalone SLA note —
 * the promise lands as a step rather than as a disclaimer.
 */
const steps = [
  {
    title: { EN: "You send a brief", KH: "អ្នកផ្ញើបទបង្ហាញ" },
    body: {
      EN: "Tell us what the system has to do, in your own words.",
      KH: "ប្រាប់ថាប្រព័ន្ធត្រូវធ្វើអ្វី ដោយពាក្យរបស់អ្នក។"
    }
  },
  {
    title: { EN: "We reply in one business day", KH: "យើងឆ្លើយក្នុងមួយថ្ងៃធ្វើការ" },
    body: {
      EN: "Monday to Friday — with questions and what we still need to know.",
      KH: "ថ្ងៃច័ន្ទដល់ថ្ងៃសៅរ៍ — ជាមួយសំណួរ និងអ្វីដែលយើងត្រូវដឹង។"
    }
  },
  {
    title: { EN: "Scope and a budget range", KH: "ការវាយតម្លៃនិងថវិកាប៉ាន់ស្មាន" },
    body: {
      EN: "A realistic figure before anyone commits to anything.",
      KH: "តួលេខពិតប្រាកដ មុនពេលភាគីណាមួយសម្រេចចិត្ត។"
    }
  }
] as const;

type ContactBandProps = {
  /** Hide the big heading when a page masthead already introduces the section. */
  showHeading?: boolean;
};

export function ContactBand({ showHeading = true }: ContactBandProps) {
  const { isKhmer } = useLanguage();
  const copy = isKhmer ? "KH" : "EN";

  const labels = {
    email: isKhmer ? "អ៊ីមែល" : "Email",
    phone: isKhmer ? "ទូរស័ព្ទ" : "Phone",
    address: isKhmer ? "ទីតាំង" : "Office"
  } as const;

  return (
    <Section
      id="contact"
      tone="dark"
      className="relative overflow-hidden bg-brand-slate pt-16 pb-20 lg:pt-18 lg:pb-30"
      decor={
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[620px] rounded-full bg-navy-400/25 blur-[140px]"
        />
      }
    >
      <motion.div variants={stagger} className="relative">
        {showHeading ? (
          <SectionHeading
            tone="dark"
            eyebrow={isKhmer ? "ទំនាក់ទំនង" : "Contact"}
            title={isKhmer ? "ប្រាប់យើងថាតើប្រព័ន្ធដែលអ្នកត្រូវការធ្វើអ្វី។" : "Tell us what your next system needs to do."}
            description={
              isKhmer
                ? "ផ្ញើបទបង្ហាញខ្លី។ យើងឆ្លើយតបក្នុងមួយថ្ងៃធ្វើការ ជាមួយសំណួរ ផ្ទៃការងារ និងបរិមាណថវិកាប៉ាន់ស្មាន។"
                : "Send a short brief. We reply within one business day with questions, a scope and a realistic budget range."
            }
          />
        ) : null}

        <motion.div
          variants={stagger}
          className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14"
        >
          <motion.div variants={revealItem}>
            <ul className="grid gap-5">
              {details.map((detail) => {
                const Icon = detail.icon;
                const body = (
                  <span className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-navy-300">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
                        {labels[detail.key]}
                      </span>
                      <span className="block truncate text-sm font-semibold text-white">{detail.value}</span>
                    </span>
                  </span>
                );

                return (
                  <li key={detail.key}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="group block rounded-xl transition-colors hover:bg-white/[0.06]"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="rounded-xl">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <ol className="mt-9 grid gap-5 border-t border-white/10 pt-8">
              {steps.map((step, index) => (
                <li key={step.title.EN} className="flex gap-4">
                  <span className="pt-0.5 font-mono text-xs font-semibold tabular-nums text-navy-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">{step.title[copy]}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-400">{step.body[copy]}</span>
                  </span>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            variants={revealItem}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-none"
          >
            <h3 className="font-display text-xl font-[450] tracking-normal text-slate-950 dark:text-white">
              {isKhmer ? "សំណើសុំការប្រឹក្សាគម្រោង" : "Project inquiry"}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {isKhmer ? "ព័ត៌មានជាមូលដ្ឋាន ដើម្បីយើងអាចរៀបចំការហៅទូរស័ព្ទ។" : "Basics only — enough for us to prepare a call."}
            </p>
            {/* The card is translucent in dark mode, so the default navy-600
                submit lands at ~1.1:1 against it — lift it to the accent. */}
            <ContactForm className="mt-6 dark:[&_button]:bg-navy-400 dark:[&_button]:hover:bg-navy-500 dark:[&_button]:shadow-none" />
          </motion.div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
