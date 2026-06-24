import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navigation, services, siteConfig } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-sm font-bold text-brand-blue">
              KT
            </span>
            <span className="font-bold">{siteConfig.name}</span>
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-300">
            Custom software, web applications, mobile apps, and enterprise systems for business growth.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Company</h3>
          <div className="grid gap-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Services</h3>
          <div className="grid gap-3">
            {services.slice(0, 5).map((service) => (
              <Link key={service.slug} href="/services" className="text-sm text-slate-300 transition hover:text-white">
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Contact</h3>
          <div className="grid gap-3 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-cyan" />
              {siteConfig.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-cyan" />
              {siteConfig.phone}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-cyan" />
              {siteConfig.address}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="section-shell flex flex-col gap-3 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>Copyright 2026 KT Solution. All rights reserved.</span>
          <span>Software, web, mobile, POS, inventory, ERP, and consulting.</span>
        </div>
      </div>
    </footer>
  );
}
