"use client";

import { CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/language-context";

const identityHighlightsEn = [
  {
    title: "1. Origin & Name Meaning",
    description:
      "RVS Trust Solutions Cambodia was established through close partnership by three co-founders: Reach, Vun, and Siev Minh. The initials 'RVS' honor each founder, while 'Trust Solutions' signifies our unwavering commitment to dependable, world-class technology solutions."
  },
  {
    title: "2. Our Expertise",
    description:
      "We specialize in full-cycle software development and end-to-end IT consulting to enhance daily operational efficiency, customer satisfaction, and digital modernization for enterprises in Cambodia."
  },
  {
    title: "3. Brand Identity & Logo",
    description:
      "Our emblem features interconnected RVS geometric ribbons, symbolizing genuine partnership and shared technical ambition. Royal blue and silver gradients represent intelligence, trust, stability, and cutting-edge engineering."
  },
  {
    title: "4. Why Clients Trust Us",
    description:
      "Beyond writing code, we focus on genuine business outcomes, transparent communication, clean maintainable architectures, and dedicated long-term post-launch support."
  }
];

const identityHighlightsKh = [
  {
    title: "១. ការបង្កើត និងអត្ថន័យឈ្មោះ",
    description:
      "ក្រុមហ៊ុន RVS Trust Solutions Cambodia ត្រូវបានបង្កើតឡើងដោយការរួបរួមគ្នាយ៉ាងស្អិតរមួតពីសំណាក់ស្ថាបនិកទាំងបីរូប គឺ លោក រាជ (Reach), លោក វុន (Vun), និង លោក សៀវ មិញ (Siev Minh)។ ឈ្មោះ RVS គឺជាអក្សរកាត់តំណាងឱ្យឈ្មោះស្ថាបនិកនីមួយៗ ហើយ Trust Solutions បង្ហាញពីការប្តេជ្ញាចិត្តក្នុងការផ្តល់ដំណោះស្រាយបច្ចេកវិទ្យាដែលមានទំនុកចិត្តខ្ពស់បំផុត។"
  },
  {
    title: "២. សេវាកម្ម និងឯកទេសរបស់យើង",
    description:
      "យើងមានឯកទេសក្នុងការអភិវឌ្ឍប្រព័ន្ធសូហ្វវែរ និងផ្តល់ដំណោះស្រាយផ្នែកព័ត៌មានវិទ្យាគ្រប់ជ្រុងជ្រោយ ដើម្បីលើកកម្ពស់ប្រសិទ្ធភាព និងភាពជឿនលឿននៃអាជីវកម្មរបស់អតិថិជន។"
  },
  {
    title: "៣. ឡូហ្គោ និងអត្តសញ្ញាណម៉ាកយីហោ",
    description:
      "ឡូហ្គោរបស់ក្រុមហ៊ុនត្រូវបានរចនាឡើងដោយផ្តោតលើនិមិត្តសញ្ញា RVS ដែលភ្ជាប់គ្នា ដើម្បីតំណាងឱ្យកិច្ចសហប្រតិបត្តិការពិតប្រាកដ។ ពណ៌ខៀវ និងប្រាក់ បង្ហាញពីភាពឆ្លាតវៃ ទំនុកចិត្ត និងបច្ចេកវិទ្យាទំនើប។"
  },
  {
    title: "៤. ហេតុអ្វីគួរទុកចិត្តយើង?",
    description:
      "យើងមិនត្រឹមតែផ្តោតលើការផ្តល់សេវាកម្មប៉ុណ្ណោះទេ ប៉ុន្តែថែមទាំងយកចិត្តទុកដាក់ខ្ពស់លើគុណភាព ភាពស្មោះត្រង់ គ្មានថ្លៃសេវាលាក់កំបាំង និងទំនាក់ទំនងយូរអង្វែងជាមួយអតិថិជន។"
  }
];

const companyValuesEn = [
  { title: "Trust", description: "We build every relationship around honesty, clear communication, and dependable delivery." },
  { title: "Quality", description: "We care about reliable systems, clean interfaces, maintainable code, and practical results." },
  { title: "Integrity", description: "We keep commitments visible and make technical decisions that protect the client long term." },
  { title: "Partnership", description: "We stay close after launch with support, iteration, training, and long-term collaboration." }
];

const companyValuesKh = [
  { title: "ទំនុកចិត្ត (Trust)", description: "យើងកសាងគ្រប់ទំនាក់ទំនងលើភាពស្មោះត្រង់ ការប្រាស្រ័យទាក់ទងច្បាស់លាស់ និងការប្រគល់ការងារគួរឱ្យទុកចិត្ត។" },
  { title: "គុណភាព (Quality)", description: "យើងយកចិត្តទុកដាក់លើប្រព័ន្ធមានស្ថិរភាព ចំណុចប្រទាក់ស្អាត កូដងាយស្រួលថែទាំ និងលទ្ធផលជាក់ស្តែង។" },
  { title: "សុចរិតភាព (Integrity)", description: "យើងគោរពការសន្យាយ៉ាងខ្ជាប់ខ្ជួន និងធ្វើការសម្រេចចិត្តបច្ចេកទេសដែលការពារផលប្រយោជន៍អតិថិជនយូរអង្វែង។" },
  { title: "ភាពជាដៃគូ (Partnership)", description: "យើងនៅជាប់ជានិច្ចជាមួយអតិថិជនបន្ទាប់ពីការដាក់ឱ្យប្រើប្រាស់ ជាមួយការគាំទ្រ ការបណ្តុះបណ្តាល និងការអភិវឌ្ឍបន្ថែម។" }
];

const teamEn = [
  { name: "Reach", role: "Co-Founder & Technology Lead", focus: "Enterprise technology strategy, architecture, and client solutions." },
  { name: "Vun", role: "Co-Founder & Engineering Lead", focus: "Software delivery, backend API engineering, and operational systems." },
  { name: "Siev Minh", role: "Co-Founder & Product Quality Lead", focus: "Product excellence, client experience, support, and long-term growth." }
];

const teamKh = [
  { name: "រាជ (Reach)", role: "សហស្ថាបនិក & អ្នកដឹកនាំបច្ចេកវិទ្យា", focus: "យុទ្ធសាស្ត្របច្ចេកវិទ្យាសហគ្រាស ស្ថាបត្យកម្មប្រព័ន្ធ និងដំណោះស្រាយអតិថិជន។" },
  { name: "វុន (Vun)", role: "សហស្ថាបនិក & អ្នកដឹកនាំវិស្វកម្ម", focus: "ការដឹកនាំអភិវឌ្ឍសូហ្វវែរ ប្រព័ន្ធ API និងប្រព័ន្ធប្រតិបត្តិការអាជីវកម្ម។" },
  { name: "សៀវ មិញ (Siev Minh)", role: "សហស្ថាបនិក & អ្នកដឹកនាំគុណភាពផលិតផល", focus: "គុណភាពផលិតផល បទពិសោធន៍អតិថិជន ការគាំទ្របច្ចេកទេស និងភាពជាដៃគូយូរអង្វែង។" }
];

const timelineEn = [
  { year: "Origin", title: "RVS Founded", description: "RVS Trust Solutions Cambodia was created through the close collaboration of Reach, Vun, and Siev Minh." },
  { year: "Identity", title: "Trust Solutions", description: "The name reflects a dedication to reliable, secure technology solutions clients can truly trust." },
  { year: "Practice", title: "Core Systems Focus", description: "The studio delivers modern websites, ERP, POS, inventory, CRM, and cross-platform mobile apps." },
  { year: "Growth", title: "Long-Term Client Partner", description: "RVS focuses on engineering excellence, integrity, and lasting relationships with every partner." }
];

const timelineKh = [
  { year: "ការចាប់ផ្តើម", title: "ការបង្កើត RVS", description: "ក្រុមហ៊ុន RVS Trust Solutions Cambodia ត្រូវបានបង្កើតឡើងដោយការសហការគ្នារវាង រាជ, វុន, និង សៀវ មិញ។" },
  { year: "អត្តសញ្ញាណ", title: "ដំណោះស្រាយគួរឱ្យទុកចិត្ត", description: "ឈ្មោះ Trust Solutions បង្ហាញពីការប្តេជ្ញាចិត្តចំពោះដំណោះស្រាយបច្ចេកវិទ្យាប្រកបដោយទំនុកចិត្ត និងសុវត្ថិភាពខ្ពស់។" },
  { year: "ការអនុវត្ត", title: "ការផ្តោតលើប្រព័ន្ធអាជីវកម្ម", description: "ក្រុមការងារផ្តល់ជូននូវគេហទំព័រទំនើប ប្រព័ន្ធ ERP, POS, គ្រប់គ្រងស្តុក, CRM និងកម្មវិធីទូរស័ព្ទដៃ។" },
  { year: "ការរីកចម្រើន", title: "ដៃគូបច្ចេកវិទ្យាយូរអង្វែង", description: "RVS ផ្តោតសំខាន់លើគុណភាពវិស្វកម្ម សុចរិតភាព និងទំនាក់ទំនងយូរអង្វែងជាមួយគ្រប់ដៃគូអាជីវកម្ម។" }
];

export default function AboutPage() {
  const { isKhmer } = useLanguage();

  const identityHighlights = isKhmer ? identityHighlightsKh : identityHighlightsEn;
  const companyValues = isKhmer ? companyValuesKh : companyValuesEn;
  const team = isKhmer ? teamKh : teamEn;
  const timeline = isKhmer ? timelineKh : timelineEn;

  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20 dark:bg-slate-900/60">
        <div className="section-shell">
          <FadeIn className="max-w-3xl">
            <Badge className="mb-5 border-blue-200 bg-white text-blue-700 shadow-xs dark:border-white/10 dark:bg-white/10 dark:text-cyan-300">
              {isKhmer ? "អំពីក្រុមហ៊ុន RVS Trust Solutions Cambodia" : "About RVS Trust Solutions Cambodia"}
            </Badge>
            <h1 className="text-4xl font-bold leading-tight text-slate-950 md:text-5xl dark:text-white">
              {isKhmer
                ? "ដៃគូបច្ចេកវិទ្យាគួរឱ្យទុកចិត្តសម្រាប់អាជីវកម្មដែលចង់បានប្រតិបត្តិការកាន់តែស្អាត និងការរីកចម្រើនឆ្លាតវៃ។"
                : "A trusted technology partner for companies that want cleaner operations and smarter growth."}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {isKhmer
                ? "RVS Trust Solutions Cambodia រចនា និងអភិវឌ្ឍកម្មវិធីតាមតម្រូវការ គេហទំព័រ កម្មវិធីទូរស័ព្ទ ប្រព័ន្ធ POS ប្រព័ន្ធគ្រប់គ្រងស្តុក ប្រព័ន្ធធនធានមនុស្ស និងប្រាក់បៀវត្សរ៍ ប្រព័ន្ធគ្រប់គ្រងសាលារៀន និងដំណោះស្រាយប្រឹក្សាយោបល់ផ្នែកព័ត៌មានវិទ្យា។"
                : "RVS Trust Solutions Cambodia designs and builds custom software, websites, mobile apps, POS systems, inventory platforms, HR and payroll systems, school management platforms, and consulting-led IT solutions."}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="section-shell">
          <SectionHeading
            eyebrow={isKhmer ? "អត្តសញ្ញាណក្រុមហ៊ុន" : "Company Identity"}
            title={isKhmer ? "អត្ថន័យនៅពីក្រោយ RVS Trust Solutions Cambodia" : "The meaning behind RVS Trust Solutions Cambodia"}
            description={
              isKhmer
                ? "RVS តំណាងឱ្យស្ថាបនិកទាំង ៣ រូប (Reach, Vun, Siev Minh) និងការប្តេជ្ញាចិត្តរួមគ្នាក្នុងការផ្តល់ដំណោះស្រាយបច្ចេកវិទ្យាដែលគួរឱ្យទុកចិត្តបំផុត។"
                : "RVS represents the three founders (Reach, Vun, Siev Minh) and a shared commitment to dependable technology solutions."
            }
          />
          <div className="grid gap-5 md:grid-cols-2">
            {identityHighlights.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.04}>
                <div className="h-full rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-xs dark:border-white/10 dark:bg-white/5">
                  <h2 className="text-lg font-bold leading-7 text-slate-950 dark:text-white">{item.title}</h2>
                  <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/60">
        <div className="section-shell grid gap-6 lg:grid-cols-3">
          {(isKhmer
            ? [
                ["ប្រវត្តិនៃការបង្កើត", "RVS Trust Solutions Cambodia ត្រូវបានបង្កើតឡើងដោយស្ថាបនិក រាជ, វុន, និង សៀវ មិញ តាមរយៈកិច្ចសហការយ៉ាងជិតស្និទ្ធ និងមហិច្ឆតាបច្ចេកទេសរួមគ្នា។"],
                ["ចក្ខុវិស័យ (Vision)", "ក្លាយជាដៃគូបច្ចេកវិទ្យាដែលគួរឱ្យទុកចិត្តបំផុតសម្រាប់អាជីវកម្មនៅកម្ពុជា ក្នុងការធ្វើទំនើបកម្មរបៀបលក់ ប្រតិបត្តិការ គាំទ្រ និងរីកចម្រើន។"],
                ["បេសកកម្ម (Mission)", "ផ្តល់ជូនផលិតផលឌីជីថលជាក់ស្តែង មានសុវត្ថិភាព និងងាយស្រួលថែទាំ ដែលជួយកែលម្អការអនុវត្តអាជីវកម្មប្រចាំថ្ងៃ។"]
              ]
            : [
                ["Company Story", "RVS Trust Solutions Cambodia was founded by Reach, Vun, and Siev Minh through close collaboration and shared technical ambition."],
                ["Vision", "To become a trusted technology partner for Cambodian companies modernizing how they sell, operate, support, and grow."],
                ["Mission", "To deliver practical, secure, and maintainable digital products that improve daily business execution."]
              ]
          ).map(([title, description], index) => (
            <FadeIn key={title} delay={index * 0.04}>
              <Card className="h-full border-slate-200 bg-white dark:border-white/10 dark:bg-white/5">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-950 dark:text-white">{title}</CardTitle>
                  <CardDescription className="text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="section-shell">
          <SectionHeading
            eyebrow={isKhmer ? "គុណតម្លៃស្នូល" : "Core Values"}
            title={isKhmer ? "របៀបដែលយើងធ្វើការ" : "How we work"}
            description={
              isKhmer
                ? "យើងរក្សាគម្រោងឱ្យច្បាស់លាស់ គួរឱ្យទុកចិត្ត មានគុណភាពខ្ពស់ និងភ្ជាប់ទៅនឹងលទ្ធផលអាជីវកម្មពិតប្រាកដ។"
                : "We keep projects clear, reliable, well-crafted, and connected to real business outcomes."
            }
            className="[&_h2]:text-white [&_p]:text-slate-300"
          />
          <div className="grid gap-5 md:grid-cols-4">
            {companyValues.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.04}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-xs backdrop-blur-md">
                  <CheckCircle2 className="mb-5 h-6 w-6 text-cyan-400" />
                  <h3 className="font-semibold text-lg text-white">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950">
        <div className="section-shell">
          <SectionHeading
            eyebrow={isKhmer ? "ក្រុមការងារ" : "Team"}
            title={isKhmer ? "ក្រុមវិស្វករ និងស្ថាបនិកប្រកបដោយបទពិសោធន៍" : "Product-minded engineering team"}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {team.map((member, index) => (
              <FadeIn key={member.name} delay={index * 0.04}>
                <Card className="border-slate-200 dark:border-white/10 dark:bg-white/5">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-base font-bold text-blue-600 dark:bg-blue-950 dark:text-cyan-300">
                      {member.name.slice(0, 2).toUpperCase()}
                    </div>
                    <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
                    <CardDescription className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-300">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{member.focus}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 dark:bg-slate-900/60">
        <div className="section-shell">
          <SectionHeading
            eyebrow={isKhmer ? "ដំណាក់កាលរីកចម្រើន" : "Timeline"}
            title={isKhmer ? "ព្រឹត្តិការណ៍សំខាន់ៗរបស់ក្រុមហ៊ុន" : "Company milestones"}
          />
          <div className="grid gap-4 max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <FadeIn key={item.year} delay={index * 0.04}>
                <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs md:grid-cols-[140px_1fr] dark:border-white/10 dark:bg-white/5">
                  <div className="text-xl font-bold text-blue-600 dark:text-cyan-300">{item.year}</div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-950 dark:text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
