import { CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { companyValues, team, timeline } from "@/lib/data";

export const metadata = {
  title: "About Us"
};

const identityHighlights = [
  {
    title: "១. ការបង្កើត និងអត្ថន័យឈ្មោះ",
    description:
      "ក្រុមហ៊ុន RVS Trust Solutions Cambodia ត្រូវបានបង្កើតឡើងដោយការរួបរួមគ្នាយ៉ាងស្អិតរមួតពីសំណាក់ស្ថាបនិកទាំងបីរូប គឺ លោក រាជ, លោក វុន, និង លោក សៀវ មិញ។ ឈ្មោះ RVS គឺជាអក្សរកាត់តំណាងឱ្យឈ្មោះស្ថាបនិកនីមួយៗ ហើយ Trust Solutions បង្ហាញពីការប្តេជ្ញាចិត្តក្នុងការផ្តល់ដំណោះស្រាយបច្ចេកវិទ្យាដែលមានជំនឿទុកចិត្តខ្ពស់។"
  },
  {
    title: "២. សេវាកម្មរបស់យើង",
    description:
      "យើងមានឯកទេសក្នុងការអភិវឌ្ឍប្រព័ន្ធសូហ្វវែរ និងផ្តល់ដំណោះស្រាយផ្នែកព័ត៌មានវិទ្យាគ្រប់ជ្រុងជ្រោយ ដើម្បីលើកកម្ពស់ប្រសិទ្ធភាព និងភាពជឿនលឿននៃអាជីវកម្មរបស់អតិថិជន។"
  },
  {
    title: "៣. ឡូហ្គោ និងអត្តសញ្ញាណ",
    description:
      "ឡូហ្គោរបស់ក្រុមហ៊ុនត្រូវបានរចនាឡើងដោយផ្តោតលើនិមិត្តសញ្ញា RVS ដែលភ្ជាប់គ្នា ដើម្បីតំណាងឱ្យកិច្ចសហប្រតិបត្តិការពិតប្រាកដ។ ពណ៌ខៀវ និងប្រាក់ បង្ហាញពីភាពឆ្លាតវៃ ទំនុកចិត្ត និងបច្ចេកវិទ្យាទំនើប។"
  },
  {
    title: "៤. ហេតុអ្វីគួរទុកចិត្តយើង?",
    description:
      "យើងមិនត្រឹមតែផ្តោតលើការផ្តល់សេវាកម្មប៉ុណ្ណោះទេ ប៉ុន្តែថែមទាំងយកចិត្តទុកដាក់ខ្ពស់លើគុណភាព ភាពស្មោះត្រង់ និងទំនាក់ទំនងយូរអង្វែងជាមួយអតិថិជន។"
  }
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell">
          <FadeIn className="max-w-3xl">
            <Badge className="mb-5">About RVS Trust Solutions Cambodia</Badge>
            <h1 className="text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              A trusted technology partner for companies that want cleaner operations and smarter growth.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              RVS Trust Solutions Cambodia designs and builds custom software, websites, mobile apps, POS systems,
              inventory platforms, HR and payroll systems, school management platforms, and consulting-led IT solutions.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Company Identity"
            title="The meaning behind RVS Trust Solutions Cambodia"
            description="RVS represents the three founders and a shared commitment to dependable technology solutions."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {identityHighlights.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.04}>
                <div className="h-full rounded-lg border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-lg font-bold leading-7 text-slate-950">{item.title}</h2>
                  <p className="mt-4 text-sm leading-8 text-slate-600">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-shell grid gap-6 lg:grid-cols-3">
          {[
            ["Company Story", "RVS Trust Solutions Cambodia was founded by Raj, Vun, and Siev Meng through close collaboration and shared technical ambition."],
            ["Vision", "To become a trusted technology partner for Cambodian companies modernizing how they sell, operate, support, and grow."],
            ["Mission", "To deliver practical, secure, and maintainable digital products that improve daily business execution."]
          ].map(([title, description], index) => (
            <FadeIn key={title} delay={index * 0.04}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Core Values"
            title="How we work"
            description="We keep projects clear, reliable, well-crafted, and connected to real business outcomes."
            className="[&_h2]:text-white [&_p]:text-slate-300"
          />
          <div className="grid gap-5 md:grid-cols-4">
            {companyValues.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.04}>
                <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
                  <CheckCircle2 className="mb-5 h-6 w-6 text-brand-cyan" />
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{value.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Team" title="Product-minded engineering team" />
          <div className="grid gap-5 md:grid-cols-3">
            {team.map((member, index) => (
              <FadeIn key={member.name} delay={index * 0.04}>
                <Card>
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 font-bold text-brand-blue">
                      {member.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">{member.focus}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="section-shell">
          <SectionHeading eyebrow="Timeline" title="Company milestones" />
          <div className="grid gap-4">
            {timeline.map((item, index) => (
              <FadeIn key={item.year} delay={index * 0.04}>
                <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 md:grid-cols-[120px_1fr]">
                  <div className="text-2xl font-bold text-brand-blue">{item.year}</div>
                  <div>
                    <h3 className="font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
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
