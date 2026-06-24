import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { services, siteConfig } from "@/lib/data";

export const metadata = {
  title: "Contact Us"
};

export default function ContactPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Contact"
            title="Tell us about the system your business needs"
            description="Share your goals, workflow, and service area. KT Solution will respond with a practical consultation path."
          />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle>Project Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input name="name" placeholder="Name" />
                    <Input name="email" type="email" placeholder="Email" />
                    <Input name="phone" placeholder="Phone" />
                    <Input name="company" placeholder="Company" />
                  </div>
                  <select className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100" name="service_needed" defaultValue="">
                    <option value="" disabled>
                      Service Needed
                    </option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  <Textarea name="message" placeholder="Message" />
                  <Button type="submit">Send Request</Button>
                </form>
              </CardContent>
            </Card>
            <div className="grid gap-5">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-brand-blue" />
                    {siteConfig.email}
                  </span>
                  <span className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-brand-blue" />
                    {siteConfig.phone}
                  </span>
                  <span className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-brand-blue" />
                    {siteConfig.address}
                  </span>
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" size="sm" type="button">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" type="button">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="min-h-72 rounded-lg border border-slate-200 bg-white p-4 shadow-soft">
                <div className="relative h-full min-h-64 overflow-hidden rounded-lg bg-[linear-gradient(135deg,#eff6ff,#f8fafc_45%,#ecfeff)]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-soft">
                    <MapPin className="h-4 w-4 text-brand-blue" />
                    Phnom Penh, Cambodia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
