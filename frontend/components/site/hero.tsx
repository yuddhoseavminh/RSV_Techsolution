"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { HeroParticles } from "@/components/site/hero-particles";
import { LogoPlaceholder } from "@/components/ui/logo-placeholder";
import { TypedHeadline } from "@/components/site/typed-headline";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { isKhmer } = useLanguage();
  const headline = isKhmer
    ? "យើងបង្កើតកម្មវិធីដែលអាជីវកម្មកម្ពុជាប្រើប្រាស់ជាប្រចាំ។"
    : "We build the software Cambodian businesses run on.";

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-slate-200 bg-white text-slate-950 dark:border-white/10 dark:bg-[#0A0A0A] dark:text-white"
    >
      {/* Antigravity's `.welcome-wrapper`: one viewport tall, centres the
          shrink-to-fit `.welcome-section` inside it. The particle field sits
          in here too — theirs is `.hero-video-container`, sized to this box. */}
      <div className="relative flex min-h-[100svh] items-center justify-center">
        <HeroParticles />

        {/* `.welcome-section`: no intrinsic width of its own, so it takes the
            width of the headline box plus the page-margin gutters — 1244px at
            1440, 1024px at ≤1024, full-bleed on mobile. */}
        <div className="relative flex flex-col items-center justify-center overflow-x-clip pb-[60px] pt-9 text-center font-[450] max-[1024px]:mb-[60px] max-[1024px]:p-0">
          {/* `.logo-container` — 30px-tall wordmark, 16px below the top gap. */}
          <FadeIn delay={0.0} className="mb-4 flex h-[30px] items-center justify-center gap-2.5">
            <LogoPlaceholder className="h-[30px] w-[30px]" />
            <span className="whitespace-nowrap text-[21px] font-[450] leading-[30px] tracking-[-0.015em]">
              RVS Techsolution
            </span>
          </FadeIn>

          {/* `.header-container` — margin: 32px <page-margin> 64px */}
          <div className="relative mx-4 mb-16 mt-8 md:mx-10 min-[1025px]:mx-[72px]">
            <TypedHeadline
              text={headline}
              className="hero-headline mx-auto max-w-[1100px] font-display text-slate-950 dark:text-white"
            />
          </div>

          {/* `.welcome-cta` — margin-inline: <page-margin>, gap 16px, wraps. */}
          <FadeIn
            delay={0.12}
            className="mx-4 flex max-w-full flex-wrap items-center justify-center gap-4 md:mx-10 min-[1025px]:mx-[72px]"
          >
            <Button asChild size="cta">
              <Link href="#contact">
                {isKhmer ? "ចាប់ផ្តើមគម្រោង" : "Start a project"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="cta"
              variant="outline"
              className="border-slate-950/[0.06] bg-slate-300/15 text-slate-950 backdrop-blur-[6px] hover:border-slate-950/[0.1] hover:bg-slate-300/25 dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1]"
            >
              <Link href="#portfolio">{isKhmer ? "មើលការងាររបស់យើង" : "See our work"}</Link>
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
