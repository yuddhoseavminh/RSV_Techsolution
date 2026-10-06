"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroParticles } from "@/components/site/hero-particles";
import { LogoPlaceholder } from "@/components/ui/logo-placeholder";
import { TypedHeadline } from "@/components/site/typed-headline";
import { useLanguage } from "@/lib/language-context";
import { useSettings } from "@/lib/settings-context";
import { cn } from "@/lib/utils";

export function Hero() {
  const { isKhmer } = useLanguage();
  const { logoUrl, companyName } = useSettings();
  const [logoError, setLogoError] = useState(false);
  // A fresh URL from a settings refresh deserves a fresh chance to load.
  useEffect(() => setLogoError(false), [logoUrl]);
  const headline = isKhmer
    ? "យើងបង្កើតកម្មវិធីដែលអាជីវកម្មកម្ពុជាប្រើប្រាស់ជាប្រចាំ។"
    : "We build the software Cambodian businesses run on.";

  // Antigravity's order: headline types first, everything else stays hidden
  // until the caret hands off — then logo, CTA and backdrop bloom in together.
  const [typedDone, setTypedDone] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Antigravity's ScrollTrigger scrub: the backdrop starts fading once the
    // hero's centre reaches the top of the viewport, gone by the time its
    // bottom does — reversible, so scrolling back restores it.
    offset: ["center start", "end start"]
  });
  const backdropFade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className={cn(
        "relative overflow-hidden border-b border-slate-200 bg-white text-slate-950 dark:border-white/10 dark:bg-[#0A0A0A] dark:text-white",
        typedDone && "hero-typed"
      )}
    >
      {/* Antigravity's `.welcome-wrapper`: one viewport tall, centres the
          shrink-to-fit `.welcome-section` inside it. The particle field sits
          in here too — theirs is `.hero-video-container`, sized to this box. */}
      <div className="relative flex min-h-[100svh] items-center justify-center">
        {/* Backdrop = two layers, so the reveal and the scroll never fight
            over the same opacity:
              outer — scroll scrub (fades the field out as the hero leaves),
              inner — `.hero-enter-backdrop`: the particle field fading 0 → 1
              over 4s once the headline has finished typing (globals.css).
            Absolute + out of flow, so it can never shift the text. */}
        <motion.div className="absolute inset-0" style={{ opacity: backdropFade }}>
          <div className="hero-enter-backdrop h-full w-full">
            <HeroParticles />
          </div>
        </motion.div>

        {/* `.welcome-section`: no intrinsic width of its own, so it takes the
            width of the headline box plus the page-margin gutters — 1244px at
            1440, 1024px at ≤1024, full-bleed on mobile. */}
        <div className="relative flex flex-col items-center justify-center overflow-x-clip pb-[60px] pt-9 text-center font-[450] max-[1024px]:mb-[60px] max-[1024px]:p-0">
          {/* `.logo-container` — 30px-tall wordmark, 16px below the top gap.
              Hidden until typing finishes; `.hero-enter-logo` then fades it up
              1em over 2s (Antigravity's timing and distance). The mark comes
              from settings (`company.logo`) like every other BrandLogo slot,
              with the neutral placeholder until one is uploaded. */}
          <div className="hero-enter-logo mb-4 flex h-[30px] items-center justify-center gap-2.5">
            {logoUrl && !logoError ? (
              <Image
                src={logoUrl}
                alt={companyName}
                width={160}
                height={30}
                unoptimized
                onError={() => setLogoError(true)}
                className="h-[30px] w-auto max-w-[160px] object-contain"
              />
            ) : (
              <LogoPlaceholder className="h-[30px] w-[30px]" />
            )}
            <span className="whitespace-nowrap text-[21px] font-[450] leading-[30px] tracking-[-0.015em]">
              {companyName}
            </span>
          </div>

          {/* `.header-container` — margin: 32px <page-margin> 64px */}
          <div className="relative mx-4 mb-16 mt-8 md:mx-10 min-[1025px]:mx-[72px]">
            <TypedHeadline
              text={headline}
              className="hero-headline mx-auto max-w-[1100px] font-display text-slate-950 dark:text-white"
              onComplete={() => setTypedDone(true)}
            />
          </div>

          {/* `.welcome-cta` — margin-inline: <page-margin>, gap 16px, wraps.
              Reveals with the logo: `.hero-enter-cta` fades it up 50px over 2s,
              opacity/transform only — never scale, which would read as a pop. */}
          <div className="hero-enter-cta mx-4 flex max-w-full flex-wrap items-center justify-center gap-4 md:mx-10 min-[1025px]:mx-[72px]">
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
          </div>
        </div>
      </div>
    </section>
  );
}
