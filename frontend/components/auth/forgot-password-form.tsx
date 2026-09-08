"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { MailCheck } from "lucide-react";
import { apiClient, apiMessage } from "@/lib/api-client";
import { useLanguage } from "@/lib/language-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
  const { isKhmer } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      await apiClient<null>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: String(formData.get("email") ?? "") })
      });
      setMessage(
        isKhmer
          ? "តំណភ្ជាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញត្រូវបានផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នក។"
          : "Password reset link queued and sent to your email."
      );
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-slate-200 shadow-xl dark:border-white/10 dark:bg-white/5">
      <CardHeader>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-brand-blue dark:bg-blue-950 dark:text-cyan-300">
          <MailCheck className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
          {isKhmer ? "កំណត់ពាក្យសម្ងាត់ឡើងវិញ" : "Reset Password"}
        </CardTitle>
        <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
          {isKhmer
            ? "បញ្ចូលអាសយដ្ឋានអ៊ីមែលរបស់អ្នក ហើយយើងនឹងផ្ញើតំណភ្ជាប់ដើម្បីកំណត់ពាក្យសម្ងាត់ថ្មី។"
            : "Enter your email and we will send a reset link."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error ? <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
        {message ? <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{message}</div> : null}
        <form className="grid gap-4" onSubmit={(event) => void submit(event)}>
          <Input
            name="email"
            type="email"
            placeholder={isKhmer ? "អាសយដ្ឋានអ៊ីមែល *" : "Email Address *"}
            required
            className="h-11"
          />
          <Button type="submit" disabled={isSubmitting} className="h-11 font-semibold">
            {isSubmitting
              ? (isKhmer ? "កំពុងផ្ញើតំណភ្ជាប់..." : "Sending...")
              : (isKhmer ? "ផ្ញើតំណភ្ជាប់កំណត់ឡើងវិញ" : "Send Reset Link")}
          </Button>
        </form>
        <Link href="/login" className="mt-5 block text-sm font-semibold text-brand-blue hover:underline">
          {isKhmer ? "ត្រឡប់ទៅទំព័រចូលប្រព័ន្ធ" : "Back to login"}
        </Link>
      </CardContent>
    </Card>
  );
}
