"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Code2, Database, MonitorSmartphone, Smartphone, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";
import { useLanguage } from "@/lib/language-context";
import { services as fallbackServices } from "@/lib/data";

const khmerServiceTitles: Record<string, string> = {
  "Custom Web Applications": "កម្មវិធីគេហទំព័រតាមតម្រូវការ",
  "Enterprise Admin Dashboards": "ផ្ទាំងគ្រប់គ្រងសហគ្រាស",
  "API & Backend Architecture": "ស្ថាបត្យកម្ម API និង Backend",
  "Mobile Application Delivery": "ការបង្កើតកម្មវិធីទូរស័ព្ទ",
  "POS & Retail Workflows": "ប្រព័ន្ធលក់ POS & ស្តុកទំនិញ",
  "Business Process Automation": "ស្វ័យប្រវត្តិកម្មអាជីវកម្ម",
  "HR & Payroll Platform": "ប្រព័ន្ធគ្រប់គ្រងបុគ្គលិក និងប្រាក់ខែ",
  "School Management System": "ប្រព័ន្ធគ្រប់គ្រងសាលារៀន",
  "Custom Software Development": "ការអភិវឌ្ឍសូហ្វវែរតាមតម្រូវការ"
};

type ApiService = {
  id?: number;
  name: string;
  slug: string;
  icon?: string | null;
  summary: string;
  description: string;
  benefits: string[];
  technologies: string[];
};

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Smartphone,
  MonitorSmartphone,
  Database,
  Workflow
};

function extractRows(payload: unknown): ApiService[] {
  if (Array.isArray(payload)) {
    return payload as ApiService[];
  }

  if (payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)) {
    return (payload as { data: ApiService[] }).data;
  }

  return [];
}

const initialServices: ApiService[] = fallbackServices.map((service) => ({
  name: service.title,
  slug: service.slug,
  summary: service.description,
  description: service.description,
  benefits: service.benefits,
  technologies: service.technologies
}));

export function ServicesGrid() {
  const { isKhmer } = useLanguage();
  const [services, setServices] = useState<ApiService[]>(initialServices);

  useEffect(() => {
    async function loadServices() {
      const rows = extractRows(await apiClient<unknown>("/services"));

      if (rows.length) {
        setServices(rows);
      }
    }

    void loadServices().catch(() => undefined);
  }, []);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon ? iconMap[service.icon] ?? Code2 : Code2;
          const displayTitle = isKhmer && khmerServiceTitles[service.name] ? khmerServiceTitles[service.name] : service.name;

          return (
            <FadeIn key={service.slug} delay={index * 0.03}>
              <Card className="h-full">
                <CardHeader>
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                    <Icon className="h-5 w-5" />
                  </span>
                  <CardTitle>{displayTitle}</CardTitle>
                  <CardDescription>{service.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-5 grid gap-2">
                    {service.benefits.map((benefit) => (
                      <span key={benefit} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="h-4 w-4 text-brand-cyan" />
                        {benefit}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((technology) => (
                      <Badge key={technology} className="border-slate-200 bg-slate-50 text-slate-700">
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center">
        <Button asChild>
          <a href="/contact">
            {isKhmer ? "ពិភាក្សាអំពីគម្រោងរបស់អ្នក" : "Discuss Your Project"}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </>
  );
}
