"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { PageCta, PageHero } from "@/components/site/page-hero";
import { ServiceCatalog } from "@/components/site/service-catalog";
import { useLanguage } from "@/lib/language-context";

export default function ServicesPage() {
  const { isKhmer } = useLanguage();

  return (
    <PublicLayout>
      <PageHero
        eyebrow={isKhmer ? "សេវាកម្ម" : "Services"}
        title={isKhmer ? "ប្រព័ន្ធដែលយើងសាងសង់។" : "Systems we build."}
        description={
          isKhmer
            ? "ពីគេហទំព័រ និងកម្មវិធីទូរស័ព្ទ រហូតដល់ POS ស្តុក ERP CRM និងកម្មវិធីតាមតម្រូវការ។"
            : "From websites and mobile apps to POS, inventory, ERP, CRM and custom software."
        }
      />
      <ServiceCatalog />
      <PageCta />
    </PublicLayout>
  );
}
