import { FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { projects } from "@/lib/data";

export const metadata = {
  title: "Portal Projects"
};

export default function PortalProjectsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-950">Projects</h1>
        <p className="mt-2 text-sm text-slate-600">Review status, progress, scope, and technology stack.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.slice(0, 4).map((project) => (
          <Card key={project.title}>
            <CardHeader>
              <div className="mb-4 flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                  <FolderKanban className="h-5 w-5" />
                </span>
                <Badge>{project.status}</Badge>
              </div>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-600">Progress</span>
                <span className="font-semibold text-slate-950">{project.progress}%</span>
              </div>
              <div className="h-2 rounded-md bg-slate-100">
                <div className="h-2 rounded-md bg-brand-blue" style={{ width: `${project.progress}%` }} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
