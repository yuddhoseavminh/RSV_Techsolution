import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/data";

export const metadata = {
  title: "Services"
};

export default function ServicesPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Services"
            title="Custom software services for business growth"
            description="Each service includes strategy, UX planning, API architecture, development, deployment, and long-term support."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <FadeIn key={service.slug} delay={index * 0.03}>
                  <Card className="h-full">
                    <CardHeader>
                      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                        <Icon className="h-5 w-5" />
                      </span>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
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
                Discuss Your Project
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
