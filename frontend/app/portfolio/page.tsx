"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { PortfolioFilter } from "@/components/sections/portfolio-filter";
import { SectionHeading } from "@/components/sections/section-heading";
import { useLanguage } from "@/lib/language-context";

export default function PortfolioPage() {
  const { isKhmer } = useLanguage();

  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20 dark:bg-slate-900/60">
        <div className="section-shell">
          <SectionHeading
            eyebrow={isKhmer ? "ស្នាដៃការងារ" : "Portfolio"}
            title={
              isKhmer
                ? "ការបង្ហាញគម្រោងឆ្លងកាត់គេហទំព័រ កម្មវិធីទូរស័ព្ទ POS ស្តុកទំនិញ និង ERP"
                : "Project showcase across websites, apps, POS, inventory, and ERP"
            }
            description={
              isKhmer
                ? "ស្វែងរកតាមប្រភេទសេវាកម្ម និងពិនិត្យមើលលទ្ធផលអាជីវកម្ម បរិបទអតិថិជន និងបច្ចេកវិទ្យាដែលបានប្រើប្រាស់។"
                : "Filter by service area and review the business outcome, client context, and implementation stack."
            }
          />
          <PortfolioFilter />
        </div>
      </section>
    </PublicLayout>
  );
}
