"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiClient, apiMessage } from "@/lib/api-client";
import { services } from "@/lib/data";
import { localizeApiServiceTitle } from "@/lib/i18n/service-copy";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

/**
 * Inquiry form. Parent owns the heading and framing — this component only
 * renders fields, feedback and the submit action.
 */
export function ContactForm({ className }: { className?: string }) {
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
    <form className={cn("grid gap-4", className)} onSubmit={(event) => void submit(event)}>
      <Callout>{error}</Callout>
      <Callout tone="success">{message}</Callout>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input name="name" placeholder={isKhmer ? "ឈ្មោះពេញ *" : "Full Name *"} required />
        <Input name="email" type="email" placeholder={isKhmer ? "អ៊ីមែល *" : "Email Address *"} required />
        <Input name="phone" placeholder={isKhmer ? "លេខទូរស័ព្ទ" : "Phone Number"} />
        <Input name="company" placeholder={isKhmer ? "ឈ្មោះក្រុមហ៊ុន / ស្ថាប័ន" : "Company / Organisation"} />
      </div>

      <select
        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-navy-600 focus:ring-2 focus:ring-navy-100 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:ring-navy-400/25"
        name="service_needed"
        defaultValue=""
        required
      >
        <option value="" disabled>
          {isKhmer ? "ជ្រើសរើសសេវាកម្មដែលត្រូវការ *" : "Select a service *"}
        </option>
        {services.map((service) => (
          <option key={service.slug} value={service.title}>
            {localizeApiServiceTitle(service.title, isKhmer)}
          </option>
        ))}
      </select>

      <Textarea
        name="message"
        rows={5}
        placeholder={isKhmer ? "អំពីគម្រោងរបស់អ្នក *" : "Tell us about the project *"}
        required
      />

      <Button type="submit" disabled={isSubmitting} className="h-11 w-full font-semibold sm:w-auto sm:justify-self-start">
        {isSubmitting
          ? isKhmer
            ? "កំពុងផ្ញើសំណើ..."
            : "Sending…"
          : isKhmer
            ? "ផ្ញើសំណើសុំការប្រឹក្សា"
            : "Send inquiry"}
      </Button>
    </form>
  );
}
