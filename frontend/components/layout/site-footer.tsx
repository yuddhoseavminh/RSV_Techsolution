"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { services, siteConfig } from "@/lib/data";
import { BrandLogo } from "@/components/ui/brand-logo";
import { localizeService } from "@/lib/i18n/service-copy";
import { useLanguage } from "@/lib/language-context";

/**
 * Social profiles are intentionally absent: every icon previously pointed at
 * `href="#"`. Reintroduce them with real URLs (rel="noreferrer noopener")
 * rather than shipping links that jump to the top of the page.
 */
export function SiteFooter() {
  const { isKhmer, t } = useLanguage();

  const footerLinks = [
    { label: t("nav_home"), href: "/#home" },
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_portfolio"), href: "/portfolio" },
    { label: t("nav_pricing"), href: "/#pricing" },
    { label: t("nav_faq"), href: "/#faq" },
    { label: t("nav_contact"), href: "/#contact" }
  ];

  const contactLink = "transition hover:text-navy-400 dark:hover:text-cyan-200";

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50 text-slate-950 dark:border-white/10 dark:bg-slate-950 dark:text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(20,104,240,0.10),transparent_70%)] dark:bg-[radial-gradient(60%_100%_at_50%_0%,rgba(20,104,240,0.18),transparent_70%)]"
      />

      <div className="section-shell relative py-14 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.9fr_1fr]">
          <div>
            <BrandLogo href="/" size="md" className="mb-5" />
            <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">
              {isKhmer
                ? "គេហទំព័រ កម្មវិធីគេហទំព័រ កម្មវិធីទូរស័ព្ទ POS ប្រព័ន្ធគ្រប់គ្រងស្តុក ERP, CRM និងប្រព័ន្ធសហគ្រាសដែលអាចទុកចិត្តបានសម្រាប់អាជីវកម្មកម្ពុជា។"
                : "Trusted websites, web applications, mobile apps, POS, inventory, ERP, CRM, and enterprise systems for growth-focused Cambodian teams."}
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {isKhmer ? "តំណភ្ជាប់សំខាន់ៗ" : "Useful Links"}
            </h3>
            <nav aria-label={isKhmer ? "តំណភ្ជាប់សំខាន់ៗ" : "Useful links"} className="grid gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-navy-400 dark:text-slate-300 dark:hover:text-cyan-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {isKhmer ? "សេវាកម្ម" : "Services"}
            </h3>
            <nav aria-label={isKhmer ? "សេវាកម្ម" : "Services"} className="grid gap-3">
              {services.slice(0, 6).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services#${service.slug}`}
                  className="text-sm font-medium text-slate-600 transition hover:text-navy-400 dark:text-slate-300 dark:hover:text-cyan-200"
                >
                  {localizeService(service, isKhmer, "summary").title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {isKhmer ? "ទំនាក់ទំនង" : "Contact"}
            </h3>
            <address className="grid gap-4 text-sm font-medium not-italic text-slate-600 dark:text-slate-300">
              <a href={`mailto:${siteConfig.email}`} className={`flex items-center gap-3 ${contactLink}`}>
                <Mail className="h-4 w-4 shrink-0" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                className={`flex items-center gap-3 ${contactLink}`}
              >
                <Phone className="h-4 w-4 shrink-0" />
                {siteConfig.phone}
              </a>
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0" />
                {siteConfig.address}
              </span>
            </address>
          </div>
        </div>
      </div>

      <div className="relative border-t border-slate-200 py-5 dark:border-white/10">
        <div className="section-shell flex flex-col gap-3 text-sm font-medium text-slate-500 md:flex-row md:items-center md:justify-between dark:text-slate-400">
          <span>
            {isKhmer
              ? `រក្សាសិទ្ធិគ្រប់យ៉ាង ${new Date().getFullYear()} ${siteConfig.name}`
              : `Copyright ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`}
          </span>
          <span>{isKhmer ? "ភ្នំពេញ ប្រទេសកម្ពុជា" : "Phnom Penh, Cambodia"}</span>
        </div>
      </div>
    </footer>
  );
}
