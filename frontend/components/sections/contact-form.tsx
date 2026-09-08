"use client";

import { FormEvent, useState } from "react";
import { apiClient, apiMessage } from "@/lib/api-client";
import { services } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const khmerServicesMap: Record<string, string> = {
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

export function ContactForm() {
  const { isKhmer } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await apiClient<unknown>("/contact-requests", {
        method: "POST",
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          phone: String(formData.get("phone") ?? ""),
          company: String(formData.get("company") ?? ""),
          service_needed: String(formData.get("service_needed") ?? ""),
          message: String(formData.get("message") ?? ""),
          source: "website"
        })
      });
      form.reset();
      setMessage(
        isKhmer
          ? "សំណើត្រូវបានផ្ញើជោគជ័យ។ ក្រុមការងារយើងនឹងទាក់ទងមកអ្នកឆាប់ៗនេះ។"
          : "Request sent. The team will contact you soon."
      );
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-slate-200 dark:border-white/10 dark:bg-white/5">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-950 dark:text-white">
          {isKhmer ? "សំណើសុំការប្រឹក្សាគម្រោង" : "Project Inquiry"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error ? <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
        {message ? <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{message}</div> : null}
        <form className="grid gap-4" onSubmit={(event) => void submit(event)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="name" placeholder={isKhmer ? "ឈ្មោះពេញ *" : "Full Name *"} required />
            <Input name="email" type="email" placeholder={isKhmer ? "អ៊ីមែល *" : "Email Address *"} required />
            <Input name="phone" placeholder={isKhmer ? "លេខទូរស័ព្ទ" : "Phone Number"} />
            <Input name="company" placeholder={isKhmer ? "ឈ្មោះក្រុមហ៊ុន / ស្ថាប័ន" : "Company Name"} />
          </div>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
            name="service_needed"
            defaultValue=""
            required
          >
            <option value="" disabled>
              {isKhmer ? "ជ្រើសរើសសេវាកម្មដែលត្រូវការ *" : "Select Service Needed *"}
            </option>
            {services.map((service) => {
              const label = isKhmer && khmerServicesMap[service.title] ? khmerServicesMap[service.title] : service.title;
              return (
                <option key={service.slug} value={service.title}>
                  {label}
                </option>
              );
            })}
          </select>
          <Textarea name="message" placeholder={isKhmer ? "សារ ឬព័ត៌មានលម្អិតអំពីគម្រោង *" : "Project Message / Requirements *"} required />
          <Button type="submit" disabled={isSubmitting} className="h-11 font-semibold">
            {isSubmitting
              ? (isKhmer ? "កំពុងផ្ញើសំណើ..." : "Sending Request...")
              : (isKhmer ? "ផ្ញើសំណើសុំការប្រឹក្សា" : "Send Inquiry Request")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
