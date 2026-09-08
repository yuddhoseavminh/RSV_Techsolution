"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { useLanguage } from "@/lib/language-context";
import { apiMessage } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const { isKhmer } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      await register({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        company: String(formData.get("company") ?? ""),
        password: String(formData.get("password") ?? ""),
        password_confirmation: String(formData.get("password_confirmation") ?? "")
      });
      router.replace("/portal/dashboard");
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-xl border-slate-200 shadow-xl dark:border-white/10 dark:bg-white/5">
      <CardHeader>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue dark:bg-blue-950 dark:text-cyan-300">
          <UserPlus className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
          {isKhmer ? "បង្កើតគណនីអតិថិជនថ្មី" : "Create Client Account"}
        </CardTitle>
        <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
          {isKhmer
            ? "ចុះឈ្មោះដើម្បីតាមដានគម្រោង ពិនិត្យវិក្កយបត្រ និងសំបុត្រជំនួយបច្ចេកទេស។"
            : "Register to track projects, invoices, and support requests."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
        <form className="grid gap-4" onSubmit={(event) => void submit(event)}>
          <div className="grid gap-4 md:grid-cols-2">
            <Input name="name" placeholder={isKhmer ? "ឈ្មោះពេញ *" : "Full Name *"} required />
            <Input name="email" type="email" placeholder={isKhmer ? "អ៊ីមែល *" : "Email Address *"} required />
            <Input name="phone" placeholder={isKhmer ? "លេខទូរស័ព្ទ" : "Phone Number"} />
            <Input name="company" placeholder={isKhmer ? "ក្រុមហ៊ុន / ស្ថាប័ន" : "Company"} />
            <Input name="password" type="password" placeholder={isKhmer ? "ពាក្យសម្ងាត់ *" : "Password *"} required />
            <Input name="password_confirmation" type="password" placeholder={isKhmer ? "ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់ *" : "Confirm Password *"} required />
          </div>
          <Button type="submit" disabled={isSubmitting} className="h-11 font-semibold">
            {isSubmitting
              ? (isKhmer ? "កំពុងបង្កើតគណនី..." : "Creating Account...")
              : (isKhmer ? "បង្កើតគណនី" : "Create Account")}
          </Button>
        </form>
        <p className="mt-5 text-sm text-slate-600 dark:text-slate-400">
          {isKhmer ? "មានគណនីរួចហើយមែនទេ? " : "Already have an account? "}
          <Link href="/login" className="font-semibold text-brand-blue hover:underline">
            {isKhmer ? "ចូលប្រើប្រាស់" : "Login"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
