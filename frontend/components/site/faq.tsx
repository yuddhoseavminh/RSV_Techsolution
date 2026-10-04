"use client";

import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";

const items = [
  {
    q: { EN: "How long does a typical project take?", KH: "តើគម្រោងមួយប្រើពេលប៉ុន្មាន?" },
    a: {
      EN: "A focused build takes 4–8 weeks. Multi-module systems usually run 3–6 months and are released in stages.",
      KH: "ការសាងសង់ផ្តោតប្រើពេល 4–8 សប្តាហ៍។ ប្រព័ន្ធពហុមូលដ្ឋានជាទូទៅ 3–6 ខែ ហើយចេញផ្សាយជាដំណាក់កាល។"
    }
  },
  {
    q: { EN: "Do you work outside Phnom Penh?", KH: "តើអ្នកធ្វើការនៅក្រៅភ្នំពេញដែរឬទេ?" },
    a: {
      EN: "Yes. We deliver remotely across Cambodia and support clients in both English and Khmer.",
      KH: "បាទ/ចាស។ យើងប្រគល់ការងារតាមអ៊ីនធឺណិតទូទាំងប្រទេស និងគាំទ្រជាភាសាអង់គ្លេស និងខ្មែរ។"
    }
  },
  {
    q: { EN: "Can you take over an existing system?", KH: "តើអ្នកអាចបន្តប្រព័ន្ធដែលមានស្រាប់បានទេ?" },
    a: {
      EN: "Yes. We start with an audit of the codebase, data and hosting, then propose a safe path forward.",
      KH: "បាទ/ចាស។ យើងចាប់ផ្តើមដោយពិនិត្យកូដ ទិន្នន័យ និងការផ្ញើ រួចស្នើផ្លូវដែលមានសុវត្ថិភាព។"
    }
  },
  {
    q: { EN: "Who owns the code and the data?", KH: "តើអ្នកណាកាន់កូដ និងទិន្នន័យ?" },
    a: {
      EN: "You do. Repositories, servers and databases are handed over in your name.",
      KH: "អ្នក។ ឃ្លាំងកូដ ម៉ាស៊ីនមេ និងមូលដ្ឋានទិន្នន័យ ត្រូវបានប្រគល់ជូនឈ្មោះរបស់អ្នក។"
    }
  },
  {
    q: { EN: "What happens after launch?", KH: "តើក្រោយការដាក់ប្រើមានអ្វី?" },
    a: {
      EN: "Training, monitoring and a defined support window, with optional retainers for ongoing improvements.",
      KH: "ការបណ្តុះបណ្តាល ការតាមដាន និងរយៈពេលគាំទ្រកំណត់ ព្រមទាំងកិច្ចសន្យាបន្តសម្រាប់ការកែលម្អ។"
    }
  },
  {
    q: { EN: "How do we start?", KH: "តើចាប់ផ្តើមដោយរបៀបណា?" },
    a: {
      EN: "Send a short brief. We reply within one business day with questions, a scope and a budget range.",
      KH: "ផ្ញើបទបង្ហាញខ្លីមួយ។ យើងឆ្លើយតបក្នុងមួយថ្ងៃធ្វើការ ជាមួយសំណួរ ផ្ទៃការងារ និងចំនួនថវិកាប៉ាន់ស្មាន។"
    }
  }
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q.EN,
    acceptedAnswer: { "@type": "Answer", text: item.a.EN }
  }))
};

export function Faq() {
  const { isKhmer } = useLanguage();
  const copy = isKhmer ? "KH" : "EN";

  return (
    <Section
      id="faq"
      className="border-t border-slate-200 bg-slate-50 pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]"
    >
      {/* DOM order (heading → answers → ask) is the mobile reading order;
          on lg the explicit placement puts the heading and the ask card in a
          left rail beside a full-height accordion. */}
      <motion.div
        variants={stagger}
        className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-8"
      >
        <SectionHeading
          align="left"
          eyebrow={isKhmer ? "សំណួរញឹកញាប់" : "FAQ"}
          title={isKhmer ? "អ្វីដែលអតិថិជនសួរជាញឹកញាប់។" : "What clients ask first."}
          description={
            isKhmer
              ? "ចម្លើយត្រង់ៗអំពីរយៈពេល សិទ្ធិជាម្ចាស់ និងអ្វីដែលកើតឡើងក្រោយការដាក់ប្រើ។"
              : "Straight answers on timelines, ownership, and what happens after launch."
          }
          className="mb-0 lg:col-start-1 lg:row-start-1"
        />

        <motion.div
          variants={revealItem}
          className="border-y border-slate-200 lg:col-start-2 lg:row-span-2 lg:row-start-1 dark:border-white/10"
        >
          {items.map((item, index) => (
            <details
              key={item.q.EN}
              open={index === 0}
              className="group border-b border-slate-200 last:border-b-0 dark:border-white/10"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-base font-semibold leading-7 tracking-normal text-slate-950 md:text-lg dark:text-white">
                  {item.q[copy]}
                </h3>
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all group-open:rotate-45 group-open:border-navy-400 group-open:text-navy-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400 dark:group-open:text-navy-300">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {item.a[copy]}
              </p>
            </details>
          ))}
        </motion.div>

        <motion.div
          variants={revealItem}
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.4)] lg:col-start-1 lg:row-start-2 lg:self-start dark:border-white/10 dark:bg-white/[0.04]"
        >
          <h3 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
            {isKhmer ? "នៅមានសំណួរទៀតឬ?" : "Still have a question?"}
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
            {isKhmer
              ? "ប្រាប់យើងថាអ្នកកំពុងបង្កើតអ្វី ហើយយើងនឹងឆ្លើយតបក្នុងមួយថ្ងៃធ្វើការ។"
              : "Tell us what you're building — we reply within one business day."}
          </p>
          <Button
            asChild
            size="lg"
            className="mt-5 dark:bg-navy-400 dark:hover:bg-navy-500 dark:shadow-none"
          >
            <Link href="#contact">
              {isKhmer ? "សួរយើង" : "Ask us"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Section>
  );
}
