"use client";

import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";

const paragraphs = {
  EN: [
    "RVS Techsolution was created by Raj, Vun and Siev Meng to build software the way local businesses actually work — with clear scope, honest timelines, and systems a team will still be using in five years.",
    "The name says it: trust and solutions. We take on POS, inventory, ERP, CRM, web and mobile projects, and we stay after launch with training, monitoring and steady iteration."
  ],
  KH: [
    "RVS Techsolution ត្រូវបានបង្កើតឡើងដោយ Raj, Vun និង Siev Meng ដើម្បីបង្កើតកម្មវិធីតាមរបៀបដែលអាជីវកម្មក្នុងស្រុកធ្វើការពិត — ជាមួយផ្ទៃការងារច្បាស់ ពេលវេលាស្មោះត្រង់ និងប្រព័ន្ធដែលក្រុមនៅតែប្រើបន្ទាប់ពីប្រាំឆ្នាំ។",
    "ឈ្មោះនិយាយដោយខ្លួនឯង៖ ការទុកចិត្ត និងដំណោះស្រាយ។ យើងទទួលយកគម្រោង POS ស្តុក ERP CRM គេហទំព័រ និងកម្មវិធីទូរស័ព្ទ ហើយយើងនៅបន្ទាប់ពីការដាក់ប្រើ ជាមួយការបណ្តុះបណ្តាល ការតាមដាន និងការកែលម្អជាបន្តបន្ទាប់។"
  ]
} as const;

const values = [
  {
    title: { EN: "Trust", KH: "ការទុកចិត្ត" },
    body: {
      EN: "Every relationship is built on honesty, clear communication and dependable delivery.",
      KH: "ទំនាក់ទំនងគ្រប់យ៉ាងសាងសង់ជុំវិញភាពស្មោះត្រង់ ការទំនាក់ទំនងច្បាស់លាស់ និងការប្រគល់ដែលអាចទុកចិត្ត។"
    }
  },
  {
    title: { EN: "Quality", KH: "គុណភាព" },
    body: {
      EN: "Reliable systems, clean interfaces, maintainable code and results you can measure.",
      KH: "ប្រព័ន្ធដែលអាចទុកចិត្ត ចំណុចប្រទាក់ស្អាត កូដថែទាំបាន និងលទ្ធផលដែលអាចវាស់បាន។"
    }
  },
  {
    title: { EN: "Integrity", KH: "សេចក្តីថ្លៃថ្នូ" },
    body: {
      EN: "Commitments stay visible, and technical decisions protect the client long term.",
      KH: "ការប្តេជ្ញាចិត្តនៅតែមើលឃើញ ហើយការសម្រេចចិត្តបច្ចេកទេសការពារអតិថិជនក្នុងរយៈពេលវែង។"
    }
  },
  {
    title: { EN: "Partnership", KH: "ដៃគូ" },
    body: {
      EN: "We stay close after launch with support, training and long-term collaboration.",
      KH: "យើងនៅជិតបន្ទាប់ពីការដាក់ប្រើ ជាមួយការគាំទ្រ ការបណ្តុះបណ្តាល និងកិច្ចសហការវែងឆ្ងាយ។"
    }
  }
] as const;

const milestones = [
  {
    year: { EN: "Origin", KH: "កំណើត" },
    title: { EN: "RVS founded", KH: "RVS ត្រូវបានបង្កើត" },
    body: {
      EN: "Created through the close collaboration of Raj, Vun and Siev Meng.",
      KH: "ត្រូវបានបង្កើតតាមរយៈកិច្ចសហការយ៉ាងជិតស្និទ្ធរវាង Raj, Vun និង Siev Meng។"
    }
  },
  {
    year: { EN: "Identity", KH: "អត្តសញ្ញាណ" },
    title: { EN: "Trust Solutions", KH: "ដំណោះស្រាយដែលទុកចិត្ត" },
    body: {
      EN: "A name that commits us to technology clients can rely on.",
      KH: "ឈ្មោះដែលប្តេជ្ញាឱ្យយើងផ្តល់បច្ចេកវិទ្យាដែលអតិថិជនអាចពឹងផ្អែកបាន។"
    }
  },
  {
    year: { EN: "Practice", KH: "ការអនុវត្ត" },
    title: { EN: "Business systems focus", KH: "ផ្តោតលើប្រព័ន្ធអាជីវកម្ម" },
    body: {
      EN: "Websites, POS, inventory, ERP, CRM and mobile applications delivered end to end.",
      KH: "គេហទំព័រ POS ស្តុក ERP CRM និងកម្មវិធីទូរស័ព្ទ ប្រគល់ពីដើមដល់ចប់។"
    }
  },
  {
    year: { EN: "Growth", KH: "ការរីកចម្រើន" },
    title: { EN: "Long-term partner", KH: "ដៃគូវែងឆ្ងាយ" },
    body: {
      EN: "Quality, integrity and lasting relationships with every client.",
      KH: "គុណភាព សេចក្តីថ្លៃថ្នូ និងទំនាក់ទំនងបន្តជាមួយអតិថិជនគ្រប់រូប។"
    }
  }
] as const;

const people = [
  {
    name: "Raj",
    role: { EN: "Co-Founder", KH: "សហស្ថាបិក" },
    focus: {
      EN: "Technology strategy and trusted client solutions.",
      KH: "យុទ្ធសាស្ត្របច្ចេកវិទ្យា និងដំណោះស្រាយអតិថិជនដែលទុកចិត្តបាន។"
    }
  },
  {
    name: "Vun",
    role: { EN: "Co-Founder", KH: "សហស្ថាបិក" },
    focus: {
      EN: "Software delivery and operational systems.",
      KH: "ការប្រគល់សូហ្វវែរ និងប្រព័ន្ធប្រតិបត្តិការ។"
    }
  },
  {
    name: "Siev Meng",
    role: { EN: "Co-Founder", KH: "សហស្ថាបិក" },
    focus: {
      EN: "Product quality, support and long-term partnerships.",
      KH: "គុណភាពផលិតផល ការគាំទ្រ និងដៃគូវែងឆ្ងាយ។"
    }
  }
] as const;

export function AboutStory() {
  const { isKhmer } = useLanguage();
  const copy = isKhmer ? "KH" : "EN";

  return (
    <>
      <Section className="text-slate-950 dark:text-white bg-white py-16 lg:py-24 dark:bg-[#0A0A0A]">
        <motion.div
          variants={stagger}
          className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16"
        >
          <SectionHeading
            align="left"
            className="mb-0"
            eyebrow={isKhmer ? "អំពី RVS" : "About RVS"}
            title={isKhmer ? "ការទុកចិត្ត និងដំណោះស្រាយ តាមលំដាប់នេះ។" : "Trust and solutions, in that order."}
          />
          <motion.div variants={stagger} className="grid gap-5 text-base leading-8 text-slate-600 dark:text-slate-400">
            {paragraphs[copy].map((paragraph) => (
              <motion.p key={paragraph} variants={revealItem}>
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      <Section className="bg-slate-50 pt-16 pb-20 lg:pt-18 lg:pb-30 dark:bg-[#0A0A0A]">
        <SectionHeading
          eyebrow={isKhmer ? "សិលធម៌" : "What we stand for"}
          title={isKhmer ? "បួនចំណុចដែលមិនអនុញ្ញាតឱ្យកែប្រែ។" : "Four things we do not bend on."}
        />
        <motion.div
          variants={stagger}
          className="grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-white/10"
        >
          {values.map((value) => (
            <motion.div key={value.title.EN} variants={revealItem} className="bg-white p-7 dark:bg-[#0A0A0A]">
              <span className="h-1 w-10 rounded-full bg-navy-400" />
              <h3 className="mt-5 font-display text-lg font-[450] tracking-normal text-slate-950 dark:text-white">
                {value.title[copy]}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{value.body[copy]}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section className="border-t border-slate-200 bg-white pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
        <SectionHeading
          eyebrow={isKhmer ? "ដំណើរការ" : "The journey"}
          title={isKhmer ? "របៀបដែលយើងមកដល់ទីនេះ។" : "How we got here."}
        />
        <motion.ol variants={stagger} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {milestones.map((milestone) => (
            <motion.li key={milestone.title.EN} variants={revealItem} className="border-t border-navy-400 pt-5">
              <span className="eyebrow text-navy-600 dark:text-navy-300">{milestone.year[copy]}</span>
              <h3 className="mt-3 font-display text-lg font-[450] tracking-normal text-slate-950 dark:text-white">
                {milestone.title[copy]}
              </h3>
              <p className="mt-2.5 text-sm leading-7 text-slate-600 dark:text-slate-400">{milestone.body[copy]}</p>
            </motion.li>
          ))}
        </motion.ol>
      </Section>

      <Section className="border-t border-slate-200 bg-slate-50 pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
        <SectionHeading
          eyebrow={isKhmer ? "ក្រុម" : "The team"}
          title={isKhmer ? "មនុស្សដែលនៅពីក្រោយការងារ។" : "The people behind the work."}
        />
        <motion.div variants={stagger} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <motion.article
              key={person.name}
              variants={revealItem}
              className="rounded-xl border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-navy-600 font-display text-base font-bold text-white">
                {person.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <h3 className="mt-5 font-display text-lg font-[450] tracking-normal text-slate-950 dark:text-white">
                {person.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-navy-600 dark:text-navy-300">
                {person.role[copy]}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">{person.focus[copy]}</p>
            </motion.article>
          ))}
        </motion.div>
      </Section>
    </>
  );
}
