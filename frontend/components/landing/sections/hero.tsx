"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Reveal } from "../primitives/reveal";
import type { HeroContent } from "../content/types";

const CHROME = ["bg-slate-300", "bg-slate-300", "bg-slate-300"];

export function Hero({ badge, title, lede, ctaPrimary, ctaSecondary, proof, image }: HeroContent) {
  return (
    <Section
      id="home"
      divider={false}
      contained={false}
      className="relative isolate overflow-hidden bg-slate-50 pb-16 pt-32 lg:pb-24 lg:pt-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="premium-grid absolute inset-0 opacity-60 dark:opacity-30" />
        <div className="absolute -top-32 left-1/2 h-[480px] w-[860px] -translate-x-1/2 rounded-full bg-navy-400/10 blur-[120px] dark:bg-navy-400/15" />
      </div>

      <div className="section-shell grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <Badge className="gap-1.5">{badge}</Badge>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 max-w-xl font-display text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl xl:text-[4.25rem] xl:leading-[1.04]">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
              {lede}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  {ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#portfolio">
                  {ctaSecondary}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-10 text-sm font-medium text-slate-500 dark:text-slate-400">{proof}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-slate-200 bg-white shadow-[0_40px_90px_-45px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3 dark:border-white/10">
              {CHROME.map((tone, i) => (
                <span key={i} className={`h-2.5 w-2.5 rounded-full ${tone} dark:bg-white/25`} />
              ))}
              <span className="ml-3 hidden h-6 flex-1 items-center rounded-md bg-slate-100 px-3 text-[11px] font-medium text-slate-400 sm:flex dark:bg-white/5 dark:text-slate-500">
                app.rvstrustsolutions.com
              </span>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 54vw, 100vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/60 to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {image.caption}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
