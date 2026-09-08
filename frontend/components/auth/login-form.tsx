"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/auth-provider";
import { apiMessage } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const user = await login(String(formData.get("email") ?? ""), String(formData.get("password") ?? ""));
      const requestedPath = new URLSearchParams(window.location.search).get("redirect");
      const isAdmin = (user.roles ?? []).some((role) => role === "admin" || role === "manager");
      const defaultPath = isAdmin ? "/admin" : "/portal/dashboard";
      const nextPath = requestedPath?.startsWith("/admin") && !isAdmin ? defaultPath : requestedPath ?? defaultPath;
      router.replace(nextPath);
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
          <LockKeyhole className="h-5 w-5" />
        </div>
        <CardTitle>Client Portal Login</CardTitle>
        <CardDescription>Access project tracking, invoices, support tickets, and notifications.</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
        <form className="grid gap-4" onSubmit={(event) => void submit(event)}>
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
        <div className="mt-5 flex items-center justify-between text-sm">
          <Link href="/forgot-password" className="font-medium text-brand-blue">
            Forgot password?
          </Link>
          <Link href="/register" className="font-medium text-slate-700">
            Create account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
