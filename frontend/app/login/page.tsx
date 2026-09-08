"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  UserCheck,
  AlertCircle
} from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const { login, user, isAuthenticated, isAdmin, isClient, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeDemo, setActiveDemo] = useState<"admin" | "client" | null>(null);

  useEffect(() => {
    // If already authenticated and not actively submitting, redirect to destination
    if (isAuthenticated && user) {
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/portal/dashboard");
      }
    }
  }, [isAuthenticated, user, isAdmin, redirectUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.error || "Invalid email or password.");
      } else {
        // Redirection will trigger via useEffect or manually here
        const userRoles = res.user?.roles ?? [];
        if (redirectUrl) {
          router.push(redirectUrl);
        } else if (userRoles.includes("admin") || userRoles.includes("manager")) {
          router.push("/admin");
        } else {
          router.push("/portal/dashboard");
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFill = async (demoEmail: string, demoPass: string, type: "admin" | "client", autoSubmit = false) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setActiveDemo(type);
    setError(null);

    if (autoSubmit) {
      setIsSubmitting(true);
      const res = await login(demoEmail, demoPass);
      if (!res.success) {
        setError(res.error || "Failed to log in with demo credentials.");
        setIsSubmitting(false);
      } else {
        const userRoles = res.user?.roles ?? [];
        if (redirectUrl) {
          router.push(redirectUrl);
        } else if (userRoles.includes("admin") || userRoles.includes("manager")) {
          router.push("/admin");
        } else {
          router.push("/portal/dashboard");
        }
      }
    }
  };

  return (
    <PublicLayout>
      <section className="min-h-[85vh] bg-gradient-to-b from-slate-50 via-white to-slate-100 py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Form */}
            <div className="lg:col-span-7">
              <Card className="border-slate-200/80 bg-white/95 shadow-xl backdrop-blur-md">
                <CardHeader className="space-y-2 pb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-brand-blue ring-1 ring-blue-500/20">
                      <LockKeyhole className="h-6 w-6" />
                    </div>
                    {isAuthenticated && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-600/20">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Signed in
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                    Sign in to your account
                  </CardTitle>
                  <CardDescription className="text-sm text-slate-500">
                    Access project tracking, invoices, admin management, and support tickets.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {/* If authenticated notice */}
                  {isAuthenticated && user && (
                    <div className="mb-6 rounded-lg border border-blue-100 bg-blue-50/60 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Currently signed in as {user.name}
                          </p>
                          <p className="text-xs text-slate-600">
                            {user.email} &bull; <span className="capitalize font-medium">{user.roles.join(", ")}</span>
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => logout()}
                          className="h-8 text-xs border-slate-300"
                        >
                          Sign out
                        </Button>
                      </div>
                      <div className="mt-3 flex gap-2">
                        {isAdmin ? (
                          <Button asChild size="sm" className="w-full">
                            <Link href="/admin">Go to Admin Dashboard</Link>
                          </Button>
                        ) : (
                          <Button asChild size="sm" className="w-full">
                            <Link href="/portal/dashboard">Go to Client Portal</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Error Alert */}
                  {error && (
                    <div className="mb-5 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50/90 p-3.5 text-sm text-rose-800 animate-in fade-in duration-200">
                      <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 mt-0.5" />
                      <div className="leading-snug">{error}</div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. admin@ktsolution.local"
                        className="h-11 bg-white"
                      />
                    </div>

                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                          Password
                        </label>
                        <Link
                          href="/forgot-password"
                          className="text-xs font-medium text-brand-blue hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="h-11 pr-11 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                          tabIndex={-1}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 h-11 w-full font-medium transition-all shadow-md hover:shadow"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign in
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
                    Don&apos;t have an account yet?{" "}
                    <Link href="/register" className="font-semibold text-brand-blue hover:underline">
                      Create an account
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Quick Demo Credentials */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2 text-slate-900 font-semibold mb-1">
                  <KeyRound className="h-5 w-5 text-brand-blue" />
                  <h3>Quick Demo Credentials</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Click any demo account below to instantly fill credentials or test single-click login.
                </p>

                <div className="space-y-3">
                  {/* Admin Card */}
                  <div
                    className={`group relative rounded-xl border p-4 transition-all hover:border-brand-blue hover:shadow-md ${
                      activeDemo === "admin"
                        ? "border-brand-blue bg-blue-50/50 ring-1 ring-brand-blue"
                        : "border-slate-200 bg-slate-50/70"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm">
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Administrator</p>
                          <p className="text-sm font-semibold text-slate-900">admin@ktsolution.local</p>
                        </div>
                      </div>
                      <span className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[11px] text-slate-700">
                        password
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      Full access to administrative console, users, CMS, services, projects &amp; settings.
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isSubmitting}
                        onClick={() => handleQuickFill("admin@ktsolution.local", "password", "admin", false)}
                        className="h-8 flex-1 text-xs bg-white"
                      >
                        Auto-fill
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        disabled={isSubmitting}
                        onClick={() => handleQuickFill("admin@ktsolution.local", "password", "admin", true)}
                        className="h-8 flex-1 text-xs bg-brand-slate hover:bg-slate-800 text-white"
                      >
                        Login as Admin
                      </Button>
                    </div>
                  </div>

                  {/* Client Card */}
                  <div
                    className={`group relative rounded-xl border p-4 transition-all hover:border-emerald-500 hover:shadow-md ${
                      activeDemo === "client"
                        ? "border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500"
                        : "border-slate-200 bg-slate-50/70"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
                          <UserCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Client Portal</p>
                          <p className="text-sm font-semibold text-slate-900">client@example.com</p>
                        </div>
                      </div>
                      <span className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[11px] text-slate-700">
                        password
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                      Client access for tracking active projects, reviewing invoices, and support tickets.
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={isSubmitting}
                        onClick={() => handleQuickFill("client@example.com", "password", "client", false)}
                        className="h-8 flex-1 text-xs bg-white"
                      >
                        Auto-fill
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        disabled={isSubmitting}
                        onClick={() => handleQuickFill("client@example.com", "password", "client", true)}
                        className="h-8 flex-1 text-xs bg-emerald-700 hover:bg-emerald-800 text-white"
                      >
                        Login as Client
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security info note */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 text-xs text-slate-600">
                <p className="font-semibold text-slate-800 mb-1">Secure Token Authentication</p>
                <p>
                  Sessions are authenticated via Laravel Sanctum API tokens with role-based authorization for the Client Portal and Admin Console.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
