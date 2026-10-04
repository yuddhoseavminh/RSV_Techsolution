"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { AboutStory } from "@/components/site/about-story";
import { PageCta, PageHero } from "@/components/site/page-hero";
import { useLanguage } from "@/lib/language-context";

export default function AboutPage() {
  const { isKhmer } = useLanguage();

  return (
    <PublicLayout>
      <PageHero
        eyebrow={isKhmer ? "អំពីយើង" : "About us"}
        title={isKhmer ? "ក្រុមដែលកសាងប្រព័ន្ធដែលអ្នកអាចទុកចិត្ត។" : "The team building systems you can trust."}
        description={
          isKhmer
            ? "RVS Techsolution — បញ្ជីជីវិតរបស់ក្រុមហ៊ុន សិលធម៌ ដំណើរការ និងមនុស្ស។"
            : "RVS Techsolution — the story, the values, the process and the people."
        }
      />
      <AboutStory />
      <PageCta />
    </PublicLayout>
  );
}
