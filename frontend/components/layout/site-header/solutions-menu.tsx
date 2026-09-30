"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { services } from "@/lib/data";
import { localizeService } from "@/lib/i18n/service-copy";
import { useLanguage } from "@/lib/language-context";

export function SolutionsMenu({ isHome }: { isHome: boolean }) {
  const { t, isKhmer } = useLanguage();

  return (
    <div className="group relative shrink-0">
      <button
        type="button"
        className="inline-flex shrink-0 whitespace-nowrap h-9 xl:h-10 items-center gap-1 rounded-lg px-2.5 text-xs xl:text-sm font-medium text-slate-600 transition hover:bg-white/70 hover:text-navy-400 dark:text-slate-300 dark:hover:bg-white/10"
      >
        {t("nav_solutions")}
        <ChevronDown className="h-3.5 w-3.5 shrink-0 transition group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100">
        <div className="grid gap-2 p-4 shadow-[0_28px_90px_-40px_rgba(15,23,42,0.5)] backdrop-blur-2xl">
          {services.slice(0, 4).map((service) => {
            const Icon = service.icon;
            const { title, description } = localizeService(service, isKhmer, "summary");
            return (
              <Link
                key={service.slug}
                href={isHome ? "#services" : "/#services"}
                className="rounded-lg p-3 transition hover:bg-slate-50 dark:hover:bg-white/8"
              >
                <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-navy-50 text-navy-400 dark:bg-white/10 dark:text-cyan-300">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-950 dark:text-white">{title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
