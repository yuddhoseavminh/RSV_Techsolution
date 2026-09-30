"use client";

import { FormEvent, useState } from "react";
import { apiClient, apiMessage } from "@/lib/api-client";
import { services } from "@/lib/data";
import { localizeApiServiceTitle } from "@/lib/i18n/service-copy";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Callout } from "@/components/ui/callout";

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
    <Card className="border border-slate-200 dark:border-white/10 dark:bg-white/5">
      <CardHeader>
        <CardTitle className="font-bold text-slate-950 dark:text-white">
          {isKhmer ? "សំណើសុំការប្រឹក្សាគម្រោង" : "Project Inquiry"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Callout>{error}</Callout>
        <Callout tone="success">{message}</Callout>
        <form className="grid gap-4" onSubmit={(event) => void submit(event)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="name" placeholder={isKhmer ? "ឈ្មោះពេញ *" : "Full Name *"} required />
            <Input name="email" type="email" placeholder={isKhmer ? "អ៊ីមែល *" : "Email Address *"} required />
            <Input name="phone" placeholder={isKhmer ? "លេខទូរស័ព្ទ" : "Phone Number"} />
            <Input name="company" placeholder={isKhmer ? "ឈ្មោះក្រុមហ៊ុន / ស្ថាប័ន" : "Company Name"} />
          </div>
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
            name="service_needed"
            defaultValue=""
            required
          >
            <option value="" disabled>
              {isKhmer ? "ជ្រើសរើសសេវាកម្មដែលត្រូវការ *" : "Select Service Needed *"}
            </option>
            {services.map((service) => {
              const label = localizeApiServiceTitle(service.title, isKhmer);
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
