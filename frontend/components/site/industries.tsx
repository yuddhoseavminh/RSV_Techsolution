"use client";

import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";

const industries = [
  { EN: "SMEs & startups", KH: "សហគ្រាសធុរកិច្ចតូច និងមធ្យម" },
  { EN: "Retail stores", KH: "ហាងលក់រាយ" },
  { EN: "Online sellers", KH: "អ្នកលក់អនឡាញ" },
  { EN: "Restaurants & cafés", KH: "ភោជនីយដ្ឋាន និងហាងកាហ្វេ" },
  { EN: "Service businesses", KH: "អាជីវកម្មសេវាកម្ម" },
  { EN: "Trading & distribution", KH: "ពាណិជ្ជកម្ម និងការចែកចាយ" },
  { EN: "Clinics & pharmacies", KH: "គ្លីនីក និងឱសថសាលា" },
  { EN: "Schools & training", KH: "សាលារៀន និងការបណ្តុះបណ្តាល" },
  { EN: "NGOs & community groups", KH: "អង្គការសហគមន៍" },
  { EN: "Logistics & fleets", KH: "សេវាដឹងជញ្ជូង និងឡាន" }
] as const;

/**
 * "Who we build for" — a chip cloud rather than another card grid, so the
 * landing page gets a fourth beat without a fourth block of boxes.
 *
 * Sits between ServicesBand (bg-slate-50) and WorkBand (bg-white). Both slate
 * neighbours are separated by this band's own border-t; WorkBand's white tone
 * then closes the block without a second rule.
 */
export function Industries() {
  const { isKhmer } = useLanguage();

  return (
    <Section className="border-t border-slate-200 bg-slate-50 pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
      <motion.div
        variants={stagger}
        className="grid items-center gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14"
      >
        <SectionHeading
          align="left"
          className="mb-0"
          eyebrow={isKhmer ? "វិស័យដែលយើងគាំទ្រ" : "Industries we support"}
          title={
            isKhmer
              ? "សម្រាប់អាជីវកម្មដែលកំពុងកសាងសេដ្ឋកិច្ចកម្ពុជា។"
              : "Built for the businesses shaping Cambodia's economy."
          }
        />

        <motion.div variants={revealItem} className="flex flex-wrap gap-3">
          {industries.map((industry) => (
            <span
              key={industry.EN}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-navy-400 hover:text-navy-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-navy-400 dark:hover:text-white"
            >
              {isKhmer ? industry.KH : industry.EN}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
