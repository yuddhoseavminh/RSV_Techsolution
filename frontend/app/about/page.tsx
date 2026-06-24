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

export default function AboutPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell">
          <FadeIn className="max-w-3xl">
            <Badge className="mb-5">About KT Solution</Badge>
            <h1 className="text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              A software partner for companies that want cleaner operations and smarter growth.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              KT Solution designs and builds custom software, websites, mobile apps, POS systems, inventory platforms,
              HR and payroll systems, school management platforms, and consulting-led business solutions.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="section-shell grid gap-6 lg:grid-cols-3">
          {[
            ["Company Story", "We started with business websites and expanded into full operational systems as clients needed stronger workflows."],
            ["Vision", "To become a trusted technology partner for companies modernizing how they sell, operate, support, and grow."],
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
