"use client";

import { Boxes, Layers, LifeBuoy, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";

const items = [
  {
    icon: Boxes,
    title: { EN: "Built for operations", KH: "បង្កើតសម្រាប់ប្រតិបត្តិការ" },
    body: {
      EN: "Software shaped around your real workflow, not a template.",
      KH: "កម្មវិធីត្រូវបានរចនាជុំវិញរបៀបធ្វើការពិតរបស់អ្នក មិនមែនជាគំរូជាសំរាប់ទេ។"
    }
  },
  {
    icon: ShieldCheck,
    title: { EN: "Reliable by default", KH: "អាចទុកចិត្ត" },
    body: {
      EN: "Role-based access, audit trails, backups and tested releases.",
      KH: "សិទ្ធិតាមតួនាទី សៀវភៅតាមដាន បម្រុងទុក និងការចេញផ្សាយដែលបានសាកល្បង។"
    }
  },
  {
    icon: Layers,
    title: { EN: "One connected stack", KH: "ស្តាត់ភ្ជាប់គ្នា" },
    body: {
      EN: "POS, inventory, ERP and CRM sharing a single source of truth.",
      KH: "POS ស្តុក ERP និង CRM ចែករំលែកប្រភពទិន្នន័យតែមួយ។"
    }
  },
  {
    icon: LifeBuoy,
    title: { EN: "Support after launch", KH: "គាំទ្រក្រោយការដាក់ប្រើ" },
    body: {
      EN: "Training, monitoring and iteration from a team you can reach.",
      KH: "ការបណ្តុះបណ្តាល ការតាមដាន និងការកែលម្អពីក្រុមដែលអ្នកទាក់ទងបាន។"
    }
  }
] as const;

export function Capabilities() {
  const { isKhmer } = useLanguage();
  const copy = isKhmer ? "KH" : "EN";

  return (
    <Section id="features" className="border-t border-slate-200 bg-white pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
      <SectionHeading
        eyebrow={isKhmer ? "អ្វីដែលអ្នកទទួលបាន" : "What you get"}
        title={isKhmer ? "ការប្រគល់ដែលអ្នកអាចដំណើរការបាន។" : "Delivery you can operate on."}
        description={
          isKhmer
            ? "គុណភាពបច្ចេកទេស គឺជារឿងដែលនៅសេសសល់បន្ទាប់ពីការប្រគល់។"
            : "Technical quality is what is left after the handover."
        }
      />

      <motion.div
        variants={stagger}
        className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-white/10"
      >
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title.EN} variants={revealItem} className="bg-white p-7 dark:bg-[#0A0A0A]">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-navy-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-navy-300">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-6 font-display text-lg font-[450] tracking-normal text-slate-950 dark:text-white">
                {item.title[copy]}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{item.body[copy]}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
