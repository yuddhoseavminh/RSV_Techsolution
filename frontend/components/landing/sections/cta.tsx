"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "../primitives/reveal";
import type { CtaContent } from "../content/types";

export function Cta({ eyebrow, title, lede, button, secondary, details }: CtaContent) {
  return (
    <Section id="contact" tone="dark" divider={false} className="relative isolate overflow-hidden bg-brand-slate py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[420px] w-[620px] rounded-full bg-navy-400/20 blur-[130px]"
      />

      <div className="relative grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-navy-300">{eyebrow}</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">{lede}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/contact">
                {button}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-slate-200 hover:bg-white/10 hover:text-white">
              <a href="mailto:hello@rvstrustsolutions.com">
                <Mail className="h-4 w-4" />
                {secondary}
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="border-b border-white/10">
            {details.map((detail) => (
              <div
                key={detail.label}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-white/10 py-4"
              >
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {detail.label}
                </dt>
                <dd className="text-sm font-medium text-white">
                  {detail.href ? (
                    <a href={detail.href} className="transition-colors hover:text-navy-300">
                      {detail.value}
                    </a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
