"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { services } from "@/lib/data";
import { localizeService } from "@/lib/i18n/service-copy";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { navItemActive, navItemIdle, navItemStyles } from "./nav-link";

/**
 * The single "Services" entry in the topbar. It is a link first (click goes to
 * /services) and a dropdown second (hover or focus reveals four featured
 * services), which removes the old Services-link / Solutions-menu duplication.
 */
export function SolutionsMenu({ active = false }: { active?: boolean }) {
  const { t, isKhmer } = useLanguage();

  return (
    <div className="group relative flex h-full shrink-0">
      <Link
        href="/services"
        aria-current={active ? "page" : undefined}
        className={cn(navItemStyles, active ? navItemActive : navItemIdle, "gap-1")}
      >
        {t("nav_services")}
        <ChevronDown className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:rotate-180" />
      </Link>

      <div className="invisible absolute left-1/2 top-full w-[min(560px,calc(100vw-32px))] -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="grid gap-2 rounded-xl border border-slate-200/80 bg-white/95 p-3 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.5)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#0F172A]/95">
          {services.slice(0, 4).map((service) => {
            const Icon = service.icon;
            const { title, description } = localizeService(service, isKhmer, "summary");
            return (
              <Link
                key={service.slug}
                href={`/services#${service.slug}`}
                className="rounded-lg p-3 transition hover:bg-slate-50 dark:hover:bg-white/8"
              >
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-navy-50 text-navy-400 dark:bg-white/10 dark:text-navy-300">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-950 dark:text-white">{title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
              </Link>
            );
          })}

          <Link
            href="/services"
            className="mt-1 flex items-center justify-between rounded-lg border-t border-slate-200 px-3 py-3 text-sm font-semibold text-navy-600 transition hover:text-navy-700 dark:border-white/10 dark:text-navy-300 dark:hover:text-white"
          >
            {isKhmer ? "មើលសេវាទាំងអស់" : "View all services"}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
