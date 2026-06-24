import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers3,
  MessageSquareText,
  Sparkles
} from "lucide-react";
import {
  posts,
  projects,
  services,
  siteConfig,
  stats,
  technologies,
  testimonials,
  whyChooseUs
} from "@/lib/data";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/sections/section-heading";

export function HeroSection() {
  return (
    <section className="relative min-h-[82vh] overflow-hidden border-b border-slate-200 bg-slate-100">
      <Image
        src="/images/kt-hero.png"
        alt="KT Solution enterprise software dashboard background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/18" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_70%,rgba(248,250,252,0.95)_100%)]" />
      <div className="section-shell relative flex min-h-[82vh] flex-col justify-center py-16">
        <FadeIn className="max-w-2xl">
          <Badge className="mb-5">KT Solution</Badge>
          <h1 className="text-4xl font-bold leading-tight text-slate-950 md:text-6xl">
            {siteConfig.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-700">{siteConfig.subheadline}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Get Free Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">
                View Portfolio
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function StatsBand() {
  return (
    <section className="bg-slate-50 py-8">
      <div className="section-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <FadeIn key={stat.label} delay={index * 0.04}>
            <div className="glass-panel rounded-lg px-5 py-6">
              <p className="text-3xl font-bold text-slate-950">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function ServicesPreview() {
  return (
    <section className="bg-white py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services"
          title="Software services for modern business operations"
          description="KT Solution builds practical, scalable products across websites, mobile apps, POS, inventory, ERP, CRM, HR, school systems, and custom workflows."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.slug} delay={index * 0.04}>
                <Card className="h-full transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-soft">
                  <CardHeader>
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                      <Icon className="h-5 w-5" />
                    </span>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
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
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="bg-slate-950 py-20 text-white">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Delivery discipline with a premium product experience"
          description="Every system is designed around business outcomes, secure access, clean interfaces, and operational visibility."
          className="[&_h2]:text-white [&_p]:text-slate-300"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={index * 0.04}>
                <div className="h-full rounded-lg border border-white/10 bg-white/[0.06] p-6">
                  <Icon className="mb-5 h-7 w-7 text-brand-cyan" />
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FeaturedProjects() {
  return (
    <section className="bg-white py-20">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured work built for real operations"
            description="A sample of systems across POS, inventory, ERP, mobile, and business websites."
            className="mx-0 mb-0 text-left"
          />
          <Button asChild variant="outline">
            <Link href="/portfolio">
              All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, index) => (
            <FadeIn key={project.title} delay={index * 0.05}>
              <Card className="h-full overflow-hidden">
                <div className="border-b border-slate-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <Badge>{project.category}</Badge>
                    <Layers3 className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div className="grid gap-3">
                    <div className="h-3 w-5/6 rounded-md bg-white shadow-sm" />
                    <div className="h-3 w-2/3 rounded-md bg-white shadow-sm" />
                    <div className="mt-3 h-24 rounded-lg border border-blue-100 bg-white/80 shadow-sm" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Badge key={technology} className="border-slate-200 bg-slate-50 text-slate-700">
                        {technology}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechnologiesBand() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Technology"
          title="Modern stack for secure and scalable products"
          description="We use proven tools for fast interfaces, reliable APIs, clean data models, and maintainable delivery."
        />
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {technologies.map((technology) => (
            <div key={technology} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-brand-cyan" />
              {technology}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by teams modernizing their operations"
          description="The same clean experience carries from the public website into admin workflows and client portals."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.name} delay={index * 0.04}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <MessageSquareText className="mb-5 h-6 w-6 text-brand-blue" />
                  <p className="text-sm leading-7 text-slate-700">"{testimonial.quote}"</p>
                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="font-semibold text-slate-950">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LatestNews() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Latest News"
            title="Insights on software, systems, and operations"
            description="Practical notes for companies planning custom software and digital workflows."
            className="mx-0 mb-0 text-left"
          />
          <Button asChild variant="outline">
            <Link href="/blog">
              Read Blog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <FadeIn key={post.title} delay={index * 0.04}>
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <Badge>{post.category}</Badge>
                    <span className="text-xs font-medium text-slate-500">{post.date}</span>
                  </div>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactCta() {
  return (
    <section className="bg-white py-20">
      <div className="section-shell">
        <div className="grid gap-8 rounded-lg border border-slate-200 bg-slate-950 p-8 text-white md:grid-cols-[1.3fr_0.7fr] md:p-10">
          <div>
            <Badge className="mb-5 border-cyan-300/20 bg-cyan-300/10 text-cyan-200">Start a Project</Badge>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">
              Build a system that fits your business instead of forcing your business into spreadsheets.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Tell us about your workflow, and KT Solution will help shape a practical delivery plan.
            </p>
          </div>
          <div className="flex items-center md:justify-end">
            <Button asChild size="lg">
              <Link href="/contact">
                Get Free Consultation
                <Sparkles className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
