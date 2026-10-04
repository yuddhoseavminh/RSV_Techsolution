"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { PageCta, PageHero } from "@/components/site/page-hero";
import { ProjectGrid } from "@/components/site/project-grid";
import { useLanguage } from "@/lib/language-context";

export default function PortfolioPage() {
  const { isKhmer } = useLanguage();

  return (
    <PublicLayout>
      <PageHero
        eyebrow={isKhmer ? "ការងារ" : "Portfolio"}
        title={isKhmer ? "ប្រព័ន្ធដែលបានប្រគល់។" : "Work we have handed over."}
        description={
          isKhmer
            ? "គម្រោងដែលកំពុងដំណើរការជាប្រចាំថ្ងៃ សម្រាប់ក្រុមហ៊ុននៅកម្ពុជា។"
            : "Platforms running day to day for teams across Cambodia."
        }
      />
      <ProjectGrid />
      <PageCta />
    </PublicLayout>
  );
}
