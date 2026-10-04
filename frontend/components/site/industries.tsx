"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";

const industries = [
  {
    slug: "sme",
    label: { EN: "SMEs & startups", KH: "សហគ្រាសធុរកិច្ចតូច និងមធ្យម" },
    alt: {
      EN: "A small team working together around a laptop",
      KH: "ក្រុមតូចមួយធ្វើការជុំវិញកុំព្យូទ័រយួរដៃ"
    }
  },
  {
    slug: "retail",
    label: { EN: "Retail stores", KH: "ហាងលក់រាយ" },
    alt: {
      EN: "Fresh produce stacked on retail shelving",
      KH: "ផលិតផលស្រស់រៀបចំលើជង់ស្តុកហាងលក់រាយ"
    }
  },
  {
    slug: "online",
    label: { EN: "Online sellers", KH: "អ្នកលក់អនឡាញ" },
    alt: {
      EN: "An online seller packing an order at a desk",
      KH: "អ្នកលក់អនឡាញកំពុងខ្ចប់ការបញ្ជាទិញ"
    }
  },
  {
    slug: "restaurant",
    label: { EN: "Restaurants & cafés", KH: "ភោជនីយដ្ឋាន និងហាងកាហ្វេ" },
    alt: {
      EN: "The dining room of a warm, well-lit restaurant",
      KH: "បន្ទប់អាហារនៃភោជនីយដ្ឋាន"
    }
  },
  {
    slug: "service",
    label: { EN: "Service businesses", KH: "អាជីវកម្មសេវាកម្ម" },
    alt: {
      EN: "A stylist blow-drying a client's hair in a salon",
      KH: "អ្នកជំនាញកំពុងសក់អតិថិជនក្នុងរោងសាឡន"
    }
  },
  {
    slug: "trading",
    label: { EN: "Trading & distribution", KH: "ពាណិជ្ជកម្ម និងការចែកចាយ" },
    alt: {
      EN: "Pallets of goods staged in a distribution warehouse",
      KH: "ទំនិញរៀបចំក្នុងឃ្លាំងចែកចាយ"
    }
  },
  {
    slug: "clinic",
    label: { EN: "Clinics & pharmacies", KH: "គ្លីនីក និងឱសថសាលា" },
    alt: {
      EN: "A pharmacist working between shelves of medicine",
      KH: "ឱសថការីធ្វើការរវាងជង់ឱសថ"
    }
  },
  {
    slug: "school",
    label: { EN: "Schools & training", KH: "សាលារៀន និងការបណ្តុះបណ្តាល" },
    alt: {
      EN: "Students listening in a bright classroom",
      KH: "សិស្សកំពុងស្តាប់ក្នុងបន្ទប់សិក្សាច្បាស់"
    }
  },
  {
    slug: "ngo",
    label: { EN: "NGOs & community groups", KH: "អង្គការសហគមន៍" },
    alt: {
      EN: "Volunteers packing relief bags for a community",
      KH: "អ្នកស្ម័គ្រចិត្តខ្ចប់កញ្ចប់ជំនួយសហគមន៍"
    }
  },
  {
    slug: "logistics",
    label: { EN: "Logistics & fleets", KH: "សេវាដឹងជញ្ជូង និងឡាន" },
    alt: {
      EN: "Delivery trucks lined up in a depot yard",
      KH: "ឡានដឹកទំនិញរៀបជួរក្នុងសួនឃ្លាំង"
    }
  }
] as const;

/**
 * "Who we build for" — a photo grid rather than the chip cloud it used to be,
 * so each trade is shown instead of merely named.
 *
 * Sits between ServicesBand (bg-slate-50) and WorkBand (bg-white). Both slate
 * neighbours are separated by this band's own border-t; WorkBand's white tone
 * then closes the block without a second rule.
 */
export function Industries() {
  const { isKhmer } = useLanguage();

  return (
    <Section className="border-t border-slate-200 bg-slate-50 pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
      <SectionHeading
        eyebrow={isKhmer ? "វិស័យដែលយើងគាំទ្រ" : "Industries we support"}
        title={
          isKhmer
            ? "សម្រាប់អាជីវកម្មដែលកំពុងកសាងសេដ្ឋកិច្ចកម្ពុជា។"
            : "Built for the businesses shaping Cambodia's economy."
        }
        description={
          isKhmer
            ? "ពីហាងតូចរហូតដល់ឃ្លាំងផ្គត់ផ្គង់ — ប្រព័ន្ធរបស់យើងកំពុងដំណើរការកន្លែងទាំងនេះ។"
            : "From the corner shop to the distribution floor — our systems already run these rooms."
        }
      />

      <motion.ul variants={stagger} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {industries.map((industry) => (
          <motion.li key={industry.slug} variants={revealItem}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-navy-400/60 hover:shadow-[0_24px_50px_-28px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-navy-400/60 dark:hover:shadow-[0_24px_50px_-28px_rgba(0,0,0,0.9)]">
              <Image
                src={`/images/industries/${industry.slug}.webp`}
                alt={isKhmer ? industry.alt.KH : industry.alt.EN}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 p-3.5 text-[13px] font-semibold leading-tight text-white sm:text-sm">
                {isKhmer ? industry.label.KH : industry.label.EN}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
