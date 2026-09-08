"use client";

import { useEffect, useMemo, useState } from "react";
import { Layers3 } from "lucide-react";
import { projects } from "@/lib/data";
import { apiClient } from "@/lib/api-client";
import { useLanguage } from "@/lib/language-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const khmerFilterLabels: Record<string, string> = {
  All: "ទាំងអស់",
  Website: "គេហទំព័រ",
  "Mobile App": "កម្មវិធីទូរស័ព្ទ",
  POS: "ប្រព័ន្ធលក់ POS",
  Inventory: "គ្រប់គ្រងស្តុក",
  ERP: "ប្រព័ន្ធ ERP"
};

const filters = ["All", "Website", "Mobile App", "POS", "Inventory", "ERP"] as const;

type PortfolioItem = {
  id?: number;
  title: string;
  category: string;
  summary: string;
  description: string;
  client_name?: string | null;
  technologies: string[];
};

function extractRows(payload: unknown): PortfolioItem[] {
  if (Array.isArray(payload)) {
    return payload as PortfolioItem[];
  }

  if (payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)) {
    return (payload as { data: PortfolioItem[] }).data;
  }

  return [];
}

const fallbackProjects: PortfolioItem[] = projects.map((project) => ({
  title: project.title,
  category: project.category,
  summary: project.description,
  description: project.description,
  client_name: project.client,
  technologies: project.technologies
}));

export function PortfolioFilter() {
  const { isKhmer } = useLanguage();
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [items, setItems] = useState<PortfolioItem[]>(fallbackProjects);

  useEffect(() => {
    async function loadPortfolio() {
      const rows = extractRows(await apiClient<unknown>("/portfolio?per_page=60"));

      if (rows.length) {
        setItems(rows);
      }
    }

    void loadPortfolio().catch(() => undefined);
  }, []);

  const filteredProjects = useMemo(
    () => items.filter((project) => active === "All" || project.category === active),
    [active, items]
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((filter) => {
          const label = isKhmer && khmerFilterLabels[filter] ? khmerFilterLabels[filter] : filter;
          return (
            <Button
              key={filter}
              variant={active === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setActive(filter)}
            >
              {label}
            </Button>
          );
        })}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id ?? project.title} className="h-full overflow-hidden">
            <div className="border-b border-slate-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
              <div className="mb-5 flex items-center justify-between">
                <Badge>{project.category}</Badge>
                <Layers3 className="h-5 w-5 text-brand-blue" />
              </div>
              <div className="grid gap-3">
                <div className="h-3 w-5/6 rounded-md bg-white shadow-sm" />
                <div className="h-3 w-2/3 rounded-md bg-white shadow-sm" />
                <div className="mt-3 h-28 rounded-lg border border-blue-100 bg-white/80 shadow-sm" />
              </div>
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.summary || project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-5 text-sm text-slate-600">
                {isKhmer ? `អតិថិជន៖ ${project.client_name ?? "ផ្ទៃក្នុង"}` : `Client: ${project.client_name ?? "Internal"}`}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <Badge key={technology} className="border-slate-200 bg-slate-50 text-slate-700">
                    {technology}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
