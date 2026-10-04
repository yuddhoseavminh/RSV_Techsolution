"use client";

import { PublicLayout } from "@/components/layout/public-layout";
import { ContactBand } from "@/components/site/contact-band";
import { PageHero } from "@/components/site/page-hero";
import { useLanguage } from "@/lib/language-context";

export default function ContactPage() {
  const { isKhmer } = useLanguage();

  return (
    <PublicLayout>
      <PageHero
        eyebrow={isKhmer ? "ទំនាក់ទំនង" : "Contact"}
        title={isKhmer ? "ចាប់ផ្តើមការផ្សារភ្ជាប់។" : "Start the conversation."}
        description={
          isKhmer
            ? "ប្រាប់យើងពីបញ្ហាដែលអ្នកចង់ដោះស្រាយ។ យើងឆ្លើយតបក្នុងមួយថ្ងៃធ្វើការ។"
            : "Tell us the problem you need solved. We reply within one business day."
        }
      />
      <ContactBand showHeading={false} />
    </PublicLayout>
  );
}
