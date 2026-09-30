"use client";

import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { ContactForm } from "@/components/sections/contact-form";
import { SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

export default function ContactPage() {
  const { isKhmer } = useLanguage();

  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20 dark:bg-slate-900/60">
        <div className="section-shell">
          <SectionHeading as="h1"
            eyebrow={isKhmer ? "ទំនាក់ទំនង" : "Contact"}
            title={
              isKhmer
                ? "ប្រាប់យើងអំពីប្រព័ន្ធដែលអាជីវកម្មរបស់អ្នកត្រូវការ"
                : "Tell us about the system your business needs"
            }
            description={
              isKhmer
                ? "ចែករំលែកគោលដៅ លំហូរការងារ និងវិសាលភាពសេវាកម្មរបស់អ្នក។ RVS Trust Solutions Cambodia នឹងឆ្លើយតបជាមួយគម្រោងប្រឹក្សាជាក់ស្តែង។"
                : "Share your goals, workflow, and service area. RVS Trust Solutions Cambodia will respond with a practical consultation path."
            }
          />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <ContactForm />
            <div className="grid gap-5">
              <Card className="bg-slate-50 py-20 dark:bg-slate-900/60">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-950 dark:text-white">
                    {isKhmer ? "ព័ត៌មានក្រុមហ៊ុន" : "Company Information"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 text-sm text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-3">
                    <Mail className="h-4 w-4" />
                    {siteConfig.email}
                  </span>
                  <span className="flex items-center gap-3">
                    <Phone className="h-4 w-4" />
                    {siteConfig.phone}
                  </span>
                  <span className="flex items-center gap-3">
                    <MapPin className="h-4 w-4" />
                    {isKhmer ? "រាជធានីភ្នំពេញ ប្រទេសកម្ពុជា" : siteConfig.address}
                  </span>
                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" size="sm" type="button" className="bg-slate-50 py-20 dark:bg-slate-900/60">
                      <Facebook className="h-4 w-4" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" type="button" className="bg-slate-50 py-20 dark:bg-slate-900/60">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="border min-h-72 rounded-2xl border-slate-200 bg-white p-4 shadow-soft dark:bg-white/5">
                <div className="relative h-full min-h-64 overflow-hidden rounded-xl bg-[linear-gradient(135deg,#F3F6FC,#F8FAFC_45%,#ECFEFF)] dark:bg-[linear-gradient(135deg,rgba(20,104,240,0.2),rgba(15,23,42,0.6))]">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,104,240,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,104,240,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
                  <div className="border absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-xl border-navy-100 bg-white/95 px-4 py-3 text-sm text-slate-800 shadow-soft backdrop-blur-sm dark:bg-slate-900/90 dark:text-white">
                    <MapPin className="h-4 w-4" />
                    {isKhmer ? "រាជធានីភ្នំពេញ ប្រទេសកម្ពុជា" : "Phnom Penh, Cambodia"}
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
