"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { MailCheck } from "lucide-react";
import { apiClient, apiMessage } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm() {
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
      setMessage("Password reset link queued.");
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
          <MailCheck className="h-5 w-5" />
        </div>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your email and we will send a reset link.</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
        {message ? <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</div> : null}
        <form className="grid gap-4" onSubmit={(event) => void submit(event)}>
          <Input name="email" type="email" placeholder="Email" required />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        <Link href="/login" className="mt-5 block text-sm font-semibold text-brand-blue">
          Back to login
        </Link>
      </CardContent>
    </Card>
  );
}
