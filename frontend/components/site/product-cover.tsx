"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import { useLanguage } from "@/lib/language-context";

/**
 * Framed product shot sitting directly under the hero.
 *
 * The frame plays Antigravity's intro-box move: as it scrolls in it grows
 * from small to full size, scrubbed to the scroll (their GSAP recipe —
 * `scale 0.5 → 1`, trigger `top bottom → top center`, `scrub: 1`,
 * `power2.out`; 0.92 on ≤768px, disabled under reduced motion).
 */
export function ProductCover() {
  const { isKhmer } = useLanguage();
  const figureRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: figureRef,
    offset: ["start end", "start center"],
  });
  // Overdamped spring ≈ GSAP's 1s scrub catch-up: smooth, never bounces.
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 25, mass: 1 });
  const from = reduceMotion ? 1 : isMobile ? 0.92 : 0.5;
  const scale = useTransform(smooth, (value) => {
    const eased = 1 - Math.pow(1 - value, 3); // power2.out ≡ cubic-bezier(0.33, 1, 0.68, 1)
    return from + (1 - from) * eased;
  });

  return (
    <Section
      className="overflow-x-clip bg-white pt-16 pb-16 lg:pt-18 lg:pb-24 dark:bg-[#0A0A0A]"
      aria-label={isKhmer ? "ប្រព័ន្ធគំរូ" : "Product preview"}
    >
      <SectionHeading
        eyebrow={isKhmer ? "ប្រព័ន្ធគំរូ" : "The system"}
        title={isKhmer ? "មើលប្រព័ន្ធ ដែលក្រុមរបស់អ្នកប្រើប្រាស់ជាប្រចាំ។" : "A look at the system your team will run every day."}
        description={
          isKhmer
            ? "ផ្ទាំងគ្រប់គ្រង ការលក់ POS ស្តុកទំនិញ និងការិយាល័យផ្ទៃក្នុង ដំណើរការលើទិន្នន័យតែមួយ។"
            : "Dashboard, point of sale, inventory and back office — one interface, one source of truth."
        }
      />

      <motion.figure ref={figureRef} style={{ scale }} className="relative">
        {/* Brand glow lifting the frame off the page. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -top-6 h-44 rounded-[2.5rem] bg-navy-400/12 blur-3xl dark:bg-navy-400/20"
        />

        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_40px_90px_-45px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_40px_90px_-45px_rgba(0,0,0,0.9)]">
          <Image
            src="/images/og-hero.png"
            alt={
              isKhmer
                ? "ផ្ទាំងគ្រប់គ្រងផលិតផល RVS Techsolution បង្ហាញលើម៉ូនីទ័រ ថេប្លេត ទូរស័ព្ទ និងម៉ាស៊ីន POS"
                : "RVS Techsolution dashboard displayed on a monitor, tablet, phone and point-of-sale terminal"
            }
            width={1672}
            height={941}
            sizes="(min-width: 1360px) 1360px, calc(100vw - 32px)"
            className="h-auto w-full"
          />
        </div>
      </motion.figure>
    </Section>
  );
}
