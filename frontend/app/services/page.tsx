"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesGrid } from "@/components/sections/services-grid";
import { useLanguage } from "@/lib/language-context";

export default function ServicesPage() {
  const { isKhmer } = useLanguage();

  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20 dark:bg-slate-900/60">
        <div className="section-shell">
          <SectionHeading
            eyebrow={isKhmer ? "សេវាកម្មរបស់យើង" : "Services"}
            title={
              isKhmer
                ? "សេវាកម្មសូហ្វវែរតាមតម្រូវការសម្រាប់ការពង្រីកអាជីវកម្ម"
                : "Custom software services for business growth"
            }
            description={
              isKhmer
                ? "គ្រប់សេវាកម្មរួមបញ្ចូលនូវយុទ្ធសាស្ត្រ ការរៀបចំ UX ស្ថាបត្យកម្ម API ការអភិវឌ្ឍ ការដាក់ឱ្យដំណើរការ និងការគាំទ្រយូរអង្វែង។"
                : "Each service includes strategy, UX planning, API architecture, development, deployment, and long-term support."
            }
          />
          <ServicesGrid />
        </div>
      </section>
    </PublicLayout>
  );
}
