"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import { services, siteConfig } from "@/lib/data";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/section";
import { localizeService } from "@/lib/i18n/service-copy";
import { useLanguage } from "@/lib/language-context";

const socialLinks = [
  { label: "Facebook", href: "#", icon: FaFacebookF },
  { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
  { label: "GitHub", href: "#", icon: FaGithub },
  { label: "Telegram", href: "#", icon: FaTelegramPlane }
];

export function SiteFooter() {
  const { isKhmer, t } = useLanguage();

  const footerLinks = [
    { label: t("nav_home"), href: "/#home" },
    { label: t("nav_features"), href: "/#features" },
    { label: t("nav_services"), href: "/#services" },
    { label: t("nav_portfolio"), href: "/#portfolio" },
    { label: t("nav_pricing"), href: "/#pricing" },
    { label: t("nav_contact"), href: "/#contact" }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-50 text-slate-950 dark:border-white/10 dark:bg-slate-950 dark:text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(20,104,240,0.10),transparent_70%)] dark:bg-[radial-gradient(60%_100%_at_50%_0%,rgba(20,104,240,0.18),transparent_70%)]" />

      <div className="section-shell relative py-14 lg:py-18">
        <Panel elevated className="mb-10 grid gap-6 rounded-lg border border-white/70 bg-white/72 p-6 shadow-soft backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <Badge className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              {isKhmer ? "ព្រឹត្តិបត្រព័ត៌មាន" : "Newsletter"}
            </Badge>
            <h2 className="mt-4 font-display text-2xl font-bold tracking-normal md:text-3xl">
              {isKhmer ? "ទទួលបានកំណត់ចំណាំយុទ្ធសាស្ត្រឌីជីថលជាក់ស្តែង។" : "Get practical digital strategy notes."}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {isKhmer
                ? "គំនិត និងបច្ចេកវិទ្យាសម្រាប់គេហទំព័រ ច្រកទ្វារ SaaS, POS, ស្តុក, ERP, CRM, កម្មវិធីទូរស័ព្ទ និងស្វ័យប្រវត្តិកម្ម។"
                : "Ideas for websites, SaaS portals, POS, inventory, ERP, CRM, mobile apps, and automation."}
            </p>
          </div>
          <form className="flex w-full gap-2 md:w-[380px]">
            <input
              type="email"
              aria-label={isKhmer ? "អាសយដ្ឋានអ៊ីមែល" : "Email address"}
              placeholder={isKhmer ? "អាសយដ្ឋានអ៊ីមែល" : "Email address"}
              className="border h-12 min-w-0 flex-1 rounded-lg border-slate-200 bg-white px-4 text-sm font-medium outline-none transition focus:border-navy-400 dark:bg-slate-950/70-slate-950/70"
            />
            <button
              type="button"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-navy-400 text-white shadow-[0_16px_40px_rgba(20,104,240,0.24)]"
              aria-label="Subscribe"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </Panel>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.9fr_1fr]">
          <div>
            <BrandLogo href="/" size="md" className="mb-5" />
            <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">
              {isKhmer
                ? "គេហទំព័រ កម្មវិធីគេហទំព័រ កម្មវិធីទូរស័ព្ទ POS ប្រព័ន្ធគ្រប់គ្រងស្តុក ERP, CRM និងប្រព័ន្ធសហគ្រាសដែលអាចទុកចិត្តបានសម្រាប់អាជីវកម្មកម្ពុជា។"
                : "Trusted websites, web applications, mobile apps, POS, inventory, ERP, CRM, and enterprise systems for growth-focused Cambodian teams."}
            </p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="border grid h-10 w-10 place-items-center rounded-lg border-slate-200 bg-white text-slate-600 text-sm transition hover:-translate-y-1 hover:border-navy-200 hover:text-navy-400 dark:bg-white/8 dark:text-slate-300 dark:hover:text-cyan-200"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {isKhmer ? "តំណភ្ជាប់សំខាន់ៗ" : "Useful Links"}
            </h3>
            <div className="grid gap-3">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-slate-600 transition hover:text-navy-400 dark:text-slate-300 dark:hover:text-cyan-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {isKhmer ? "សេវាកម្ម" : "Services"}
            </h3>
            <div className="grid gap-3">
              {services.slice(0, 6).map((service) => (
                <Link
                  key={service.slug}
                  href="/#services"
                  className="text-sm font-medium text-slate-600 transition hover:text-navy-400 dark:text-slate-300 dark:hover:text-cyan-200"
                >
                  {localizeService(service, isKhmer, "summary").title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-4 text-sm font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              {isKhmer ? "ទំនាក់ទំនង" : "Contact"}
            </h3>
            <div className="grid gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                {siteConfig.email}
              </span>
              <span className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                {siteConfig.phone}
              </span>
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0" />
                {siteConfig.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-slate-200 py-5 dark:border-white/10">
        <div className="section-shell flex flex-col gap-3 text-sm font-medium text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>
            {isKhmer
              ? `រក្សាសិទ្ធិគ្រប់យ៉ាង ${new Date().getFullYear()} ${siteConfig.name}`
              : `Copyright ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`}
          </span>
          <span>
            {isKhmer
              ? "អភិវឌ្ឍជាមួយ Next.js, Laravel, TypeScript និង Tailwind CSS"
              : "Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and React Icons."}
          </span>
        </div>
      </div>
    </footer>
  );
}
