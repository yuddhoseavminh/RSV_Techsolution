"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { apiClient } from "@/lib/api-client";
import { services as fallbackServices } from "@/lib/data";
import { localizeApiServiceTitle, localizeService } from "@/lib/i18n/service-copy";
import { useLanguage } from "@/lib/language-context";

type Row = {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  icon: LucideIcon;
};

const findByTitle = (title: string) => fallbackServices.find((service) => service.title === title);

const iconFor = (title: string): LucideIcon => findByTitle(title)?.icon ?? fallbackServices[0].icon;

const slugFor = (title: string): string =>
  findByTitle(title)?.slug ??
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const initialRows: Row[] = fallbackServices.map((service) => ({
  slug: service.slug,
  title: service.title,
  description: service.description,
  technologies: service.technologies,
  icon: service.icon
}));

type ApiRow = { name?: string; title?: string; description?: string; technologies?: string[] };

function extractRows(payload: unknown): ApiRow[] {
  if (Array.isArray(payload)) return payload as ApiRow[];
  if (payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)) {
    return (payload as { data: ApiRow[] }).data;
  }
  return [];
}

/** Full catalogue: localized copy from lib/data, refreshed from the API when available. */
export function ServiceCatalog() {
  const { isKhmer } = useLanguage();
  const [rows, setRows] = useState<Row[]>(initialRows);

  useEffect(() => {
    async function load() {
      const payload = extractRows(await apiClient<unknown>("/services"));
      if (!payload.length) return;

      setRows(
        payload.map((row) => {
          const title = row.name ?? row.title ?? "";
          return {
            slug: slugFor(title),
            title,
            description: row.description ?? "",
            technologies: row.technologies ?? [],
            icon: iconFor(title)
          };
        })
      );
    }

    void load().catch(() => undefined);
  }, []);

  return (
    <section className="text-slate-950 dark:text-white bg-white py-16 lg:py-24 dark:bg-[#0A0A0A]">
      <div className="section-shell">
        <div className="grid gap-6 md:grid-cols-2">
          {rows.map((row, index) => {
            const localized = localizeService(row, isKhmer);
            const title = localizeApiServiceTitle(localized.title, isKhmer);
            const Icon = row.icon;

            return (
              <FadeIn key={row.title} delay={index * 0.04}>
                <article
                  id={row.slug}
                  className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-navy-400/60 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-navy-400/50"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-navy-600 transition-colors group-hover:border-navy-400 group-hover:bg-navy-600 group-hover:text-white dark:border-white/10 dark:bg-white/[0.04] dark:text-navy-300 dark:group-hover:bg-navy-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-sm font-bold tabular-nums text-slate-300 dark:text-slate-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="mt-6 font-display text-xl font-[450] tracking-normal text-slate-950 dark:text-white">
                    {title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {localized.description}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {row.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <p className="mt-10 flex items-start gap-3 rounded-xl bg-navy-50 p-5 text-sm leading-6 text-navy-700 dark:bg-navy-400/10 dark:text-navy-300">
          <Check className="mt-0.5 h-4 w-4 shrink-0" />
          {isKhmer
            ? "គ្រប់សេវាកម្មអាចដាក់បញ្ចូលគ្នាក្នុងគម្រោងតែមួយ — យើងណែនាំផ្ទៃការងារបន្ទាប់ពីការពិភាក្សាលើកដំបូង។"
            : "Every service can be combined into one project — we recommend a scope after the first conversation."}
        </p>
      </div>
    </section>
  );
}
