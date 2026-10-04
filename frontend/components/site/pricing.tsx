"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { revealItem, stagger } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

type Plan = {
  name: { EN: string; KH: string };
  price: { EN: string; KH: string };
  description: { EN: string; KH: string };
  features: { EN: string[]; KH: string[] };
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: { EN: "Starter", KH: "ស៊េរីចាប់ផ្តើម" },
    price: { EN: "From $1,500", KH: "ពី $1,500" },
    description: {
      EN: "A focused build for one team or one branch.",
      KH: "ការសាងសង់ផ្តោតសម្រាប់ក្រុមមួយ ឬសាខាមួយ។"
    },
    features: {
      EN: ["Discovery workshop", "One web application", "Core reporting", "30-day support window"],
      KH: ["សិក្ខាសាលាស្វែងយល់", "កម្មវិធីគេហទំព័រមួយ", "របាយការណ៍មូលដ្ឋាន", "គាំទ្រ 30 ថ្ងៃ"]
    }
  },
  {
    name: { EN: "Growth", KH: "ការរីកចម្រើន" },
    price: { EN: "From $5,000", KH: "ពី $5,000" },
    description: {
      EN: "Multi-module systems for a growing operation.",
      KH: "ប្រព័ន្ធពហុមូលដ្ឋានសម្រាប់ប្រតិបត្តិការដែលកំពុងរីកចម្រើន។"
    },
    features: {
      EN: ["Everything in Starter", "Custom modules and roles", "POS, inventory or CRM", "Training plus 90-day support"],
      KH: ["រាល់អ្វីក្នុងស៊េរីចាប់ផ្តើម", "មូលដ្ឋាន និងតួនាទីផ្ទាល់ខ្លួន", "POS ស្តុក ឬ CRM", "បណ្តុះបណ្តាល និងគាំទ្រ 90 ថ្ងៃ"]
    },
    highlighted: true
  },
  {
    name: { EN: "Enterprise", KH: "សហគ្រាស" },
    price: { EN: "Custom", KH: "តាមការចរចា" },
    description: {
      EN: "Integrated ERP with ongoing delivery.",
      KH: "ERP ដែលភ្ជាប់គ្នា ជាមួយការបន្តអភិវឌ្ឍ។"
    },
    features: {
      EN: ["Everything in Growth", "ERP and third-party integrations", "SLA with 24/7 monitoring", "Dedicated delivery team"],
      KH: ["រាល់អ្វីក្នុងស៊េរីការរីកចម្រើន", "ERP និងការភ្ជាប់ក្រៅ", "SLA ជាមួយការតាមដាន 24/7", "ក្រុមប្រគល់ការងារពិសេស"]
    }
  }
];

export function Pricing() {
  const { isKhmer } = useLanguage();
  const copy = isKhmer ? "KH" : "EN";

  return (
    <Section id="pricing" className="border-t border-slate-200 bg-white pt-16 pb-20 lg:pt-18 lg:pb-30 dark:border-white/10 dark:bg-[#0A0A0A]">
      <SectionHeading
        eyebrow={isKhmer ? "តម្លៃ" : "Pricing"}
        title={isKhmer ? "ចំណុចចាប់ផ្តើមដែលត្រជាក់។" : "Clear starting points."}
        description={
          isKhmer
            ? "តម្លៃពិតប្រាកដកំណត់បន្ទាប់ពីយើងយល់ពីផ្ទៃការងារ។ គ្មានការគិតថ្លៃលើស។"
            : "Final pricing is set once scope is agreed. No surprise invoices."
        }
      />

      <motion.div variants={stagger} className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <motion.div
            key={plan.name.EN}
            variants={revealItem}
            className={cn(
              "flex flex-col rounded-xl border p-7",
              plan.highlighted
                ? "border-navy-400 bg-navy-600 text-white shadow-soft"
                : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04]"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <h3
                className={cn(
                  "font-display text-lg font-[450] tracking-normal",
                  plan.highlighted ? "text-white" : "text-slate-950 dark:text-white"
                )}
              >
                {plan.name[copy]}
              </h3>
              {plan.highlighted ? (
                <Badge className="border-white/25 bg-white/10 text-white dark:border-white/25 dark:bg-white/10 dark:text-white">
                  {isKhmer ? "ពេញនិយម" : "Popular"}
                </Badge>
              ) : null}
            </div>

            <p
              className={cn(
                "mt-5 font-display text-3xl font-bold tracking-tight",
                plan.highlighted ? "text-white" : "text-slate-950 dark:text-white"
              )}
            >
              {plan.price[copy]}
            </p>

            <p
              className={cn(
                "mt-3 text-sm leading-7",
                plan.highlighted ? "text-slate-300" : "text-slate-600 dark:text-slate-400"
              )}
            >
              {plan.description[copy]}
            </p>

            <ul
              className={cn(
                "mt-6 grid gap-3 border-t pt-6",
                plan.highlighted ? "border-white/15" : "border-slate-200 dark:border-white/10"
              )}
            >
              {plan.features[copy].map((feature) => (
                <li
                  key={feature}
                  className={cn(
                    "flex items-start gap-3 text-sm",
                    plan.highlighted ? "text-slate-200" : "text-slate-700 dark:text-slate-300"
                  )}
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-7 pt-1">
              <Button
                asChild
                size="lg"
                variant={plan.highlighted ? "secondary" : "outline"}
                className="w-full"
              >
                <Link href="#contact">{isKhmer ? "ពិភាក្សាគម្រោង" : "Discuss your project"}</Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.p variants={revealItem} className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        {isKhmer
          ? "ទាំងអស់ជាបរិមាណ USD។ យើងផ្តល់វិក្កយបត្រផ្លូវការ។"
          : "All figures in USD. We issue official invoices."}
      </motion.p>
    </Section>
  );
}
