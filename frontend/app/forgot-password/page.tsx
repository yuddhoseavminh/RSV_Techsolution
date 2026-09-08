"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Loader2, MailCheck, ArrowLeft } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setError(null);
    setIsSubmitting(true);

    try {
      await apiClient("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email })
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err?.message || "Failed to process request. Please ensure the email address is valid.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
      <section className="min-h-[85vh] bg-gradient-to-b from-slate-50 via-white to-slate-100 py-20 px-4">
        <div className="section-shell flex justify-center">
          <Card className="w-full max-w-md border-slate-200/80 bg-white/95 shadow-xl backdrop-blur-md">
            <CardHeader className="space-y-2 pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-brand-blue ring-1 ring-blue-500/20">
                <MailCheck className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Reset Password
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Enter your email address and we&apos;ll send you instructions to reset your password.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {submitted ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900">Password reset link sent!</p>
                      <p className="text-xs text-emerald-700 mt-1">
                        If an account exists with <span className="font-medium">{email}</span>, you will receive an email with reset instructions.
                      </p>
                    </div>
                  </div>

                  <Button asChild variant="outline" className="w-full">
                    <Link href="/login" className="flex items-center justify-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back to Sign in
                    </Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  {error && (
                    <div className="flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50/90 p-3.5 text-sm text-rose-800">
                      <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
                      <div className="leading-snug">{error}</div>
                    </div>
                  )}

                  <div className="grid gap-2">
                    <label htmlFor="reset-email" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Email Address
                    </label>
                    <Input
                      id="reset-email"
                      type="email"
                      required
                      placeholder="e.g. client@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 bg-white"
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="h-11 w-full font-medium">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending reset link...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>

                  <div className="pt-2 text-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:underline"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to Sign in
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
