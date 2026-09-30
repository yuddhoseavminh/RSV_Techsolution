"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "../primitives/reveal";
import type { PricingContent } from "../content/types";

export function Pricing({ eyebrow, title, lede, buttonLabel, plans }: PricingContent) {
  return (
    <Section id="pricing" divider={false} className="bg-white py-20 lg:py-28">
      <SectionHeading eyebrow={eyebrow} title={title} description={lede} />

      <RevealGroup className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <RevealItem key={plan.name} className="h-full">
            <div
              className={cn(
                "flex h-full flex-col rounded-xl border p-6 lg:p-7",
                plan.highlighted
                  ? "border-navy-600 bg-slate-950 text-white shadow-[0_34px_80px_-45px_rgba(20,104,240,0.75)] dark:border-navy-400"
                  : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/[0.04]"
              )}
            >
              <div className="flex min-h-6 items-center justify-between gap-3">
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-[0.16em]",
                    plan.highlighted ? "text-slate-400" : "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {plan.period}
                </span>
                {plan.highlighted ? (
                  <span className="rounded-full bg-white/[0.12] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                    Popular
                  </span>
                ) : null}
              </div>

              <h3 className="mt-4 font-display text-lg font-bold tracking-normal">{plan.name}</h3>

              <p className="mt-4 font-display text-4xl font-bold tracking-tight tabular-nums">
                {plan.price}
              </p>

              <p
                className={cn(
                  "mt-5 text-sm leading-7",
                  plan.highlighted ? "text-slate-300" : "text-slate-600 dark:text-slate-300"
                )}
              >
                {plan.description}
              </p>

              <ul className={cn("mt-6 grid gap-3 border-t pt-6", plan.highlighted ? "border-white/15" : "border-slate-200 dark:border-white/10")}>
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-start gap-3 text-sm",
                      plan.highlighted ? "text-slate-200" : "text-slate-700 dark:text-slate-200"
                    )}
                  >
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.highlighted ? "text-navy-300" : "text-navy-600 dark:text-navy-300"
                      )}
                    />
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
                  <Link href="/contact">
                    {buttonLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
