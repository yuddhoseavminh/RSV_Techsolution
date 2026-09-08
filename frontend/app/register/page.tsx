<<<<<<< HEAD
import { RegisterForm } from "@/components/auth/register-form";
import { PublicLayout } from "@/components/layout/public-layout";

export const metadata = {
  title: "Register"
};
=======
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Eye, EyeOff, Loader2, UserPlus, CheckCircle2 } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";
>>>>>>> 9ade3f7e0d9de2e386bfb746881c089e804ee93c

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirmation) {
      setError("Passwords do not match. Please verify your confirmation password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await register({
        name,
        email,
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
        password,
        password_confirmation: passwordConfirmation
      });

      if (!res.success) {
        setError(res.error || "Registration failed. Please check the entered information.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/portal/dashboard");
        }, 1200);
      }
    } catch {
      setError("An unexpected error occurred during registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicLayout>
<<<<<<< HEAD
      <section className="bg-slate-50 py-20">
        <div className="section-shell flex justify-center">
          <RegisterForm />
=======
      <section className="min-h-[85vh] bg-gradient-to-b from-slate-50 via-white to-slate-100 py-16 px-4">
        <div className="mx-auto max-w-xl">
          <Card className="border-slate-200/80 bg-white/95 shadow-xl backdrop-blur-md">
            <CardHeader className="space-y-2 pb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-brand-blue ring-1 ring-blue-500/20">
                <UserPlus className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Create Client Account
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Register to track your ongoing projects, invoices, and direct support requests.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {success && (
                <div className="mb-5 flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800 animate-in fade-in">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <p className="font-semibold">Account created successfully!</p>
                    <p className="text-xs text-emerald-700">Redirecting to your client portal...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50/90 p-3.5 text-sm text-rose-800 animate-in fade-in">
                  <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
                  <div className="leading-snug">{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. +855 12 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Company / Organization
                    </label>
                    <Input
                      id="company"
                      placeholder="e.g. Acme Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="bg-white"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Password *
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label htmlFor="passwordConfirmation" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Confirm Password *
                    </label>
                    <Input
                      id="passwordConfirmation"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Re-enter password"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || success}
                  className="mt-4 h-11 w-full font-medium shadow-md transition-all hover:shadow"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Client Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-brand-blue hover:underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
>>>>>>> 9ade3f7e0d9de2e386bfb746881c089e804ee93c
        </div>
      </section>
    </PublicLayout>
  );
}
