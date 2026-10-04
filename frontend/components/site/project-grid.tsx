"use client";

import { useEffect, useMemo, useState } from "react";
import { Layers3 } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import { projects } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

type Project = {
  id?: number;
  title: string;
  category: string;
  description: string;
  client?: string | null;
  technologies: string[];
};

const khmerCategory: Record<string, string> = {
  All: "ទាំងអស់",
  Website: "គេហទំព័រ",
  "Mobile App": "កម្មវិធីទូរស័ព្ទ",
  POS: "ប្រព័ន្ធលក់ POS",
  Inventory: "គ្រប់គ្រងស្តុក",
  ERP: "ប្រព័ន្ធ ERP",
  CRM: "ប្រព័ន្ធ CRM"
};

const fallbackProjects: Project[] = projects.map((project) => ({
  title: project.title,
  category: project.category,
  description: project.description,
  client: project.client,
  technologies: project.technologies
}));

function extractRows(payload: unknown): Project[] {
  if (Array.isArray(payload)) return payload as Project[];
  if (payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)) {
    return (payload as { data: Project[] }).data;
  }
  return [];
}

/** Filterable project grid for /portfolio. */
export function ProjectGrid() {
  const { isKhmer } = useLanguage();
  const [items, setItems] = useState<Project[]>(fallbackProjects);
  const [active, setActive] = useState("All");

  useEffect(() => {
    async function load() {
      const payload = extractRows(await apiClient<unknown>("/portfolio"));
      if (payload.length) setItems(payload);
    }
    void load().catch(() => undefined);
  }, []);

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category).filter(Boolean)))],
    [items]
  );

  const visible = active === "All" ? items : items.filter((item) => item.category === active);

  return (
    <section className="text-slate-950 dark:text-white bg-white py-16 lg:py-24 dark:bg-[#0A0A0A]">
      <div className="section-shell">
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={cn(
                "h-9 rounded-full border px-4 text-xs font-semibold transition-colors",
                active === filter
                  ? "border-navy-600 bg-navy-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-white/25 dark:hover:text-white"
              )}
            >
              {isKhmer ? khmerCategory[filter] ?? filter : filter}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <FadeIn key={project.id ?? project.title} delay={index * 0.05}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:border-navy-400/60 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-navy-400/50">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-6 py-4 dark:border-white/10">
                  <Badge>{project.category}</Badge>
                  <Layers3 className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-600" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-lg font-[450] tracking-normal text-slate-950 dark:text-white">
                    {project.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{project.description}</p>

                  <p className="mt-5 text-xs font-medium uppercase tracking-wider text-slate-400">
                    {isKhmer ? "អតិថិជន" : "Client"}
                    <span className="ml-2 normal-case tracking-normal text-slate-600 dark:text-slate-300">
                      {project.client || (isKhmer ? "ផ្ទៃក្នុង" : "Internal")}
                    </span>
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        {!visible.length ? (
          <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
            {isKhmer ? "មិនមានគម្រោងក្នុងប្រភេទនេះទេ។" : "No projects in this category yet."}
          </p>
        ) : null}
      </div>
    </section>
  );
}
