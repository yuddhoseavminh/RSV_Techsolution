"use client";

import { useMemo, useState } from "react";
import { Layers3 } from "lucide-react";
import { projects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const filters = ["All", "Website", "Mobile App", "POS", "Inventory", "ERP"] as const;

export function PortfolioFilter() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const filteredProjects = useMemo(
    () => projects.filter((project) => active === "All" || project.category === active),
    [active]
  );

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={active === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setActive(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.title} className="h-full overflow-hidden">
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
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-5 text-sm text-slate-600">Client: {project.client}</div>
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
