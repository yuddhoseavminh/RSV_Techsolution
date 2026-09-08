"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, Mail, KeyRound, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { AdminShell } from "@/components/admin/admin-shell";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { apiMessage } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const { user, isLoading, login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAdmin = user && (user.roles ?? []).some((role) => role === "admin" || role === "manager");

  const handleQuickLogin = () => {
    setEmail("admin@gmail.com");
    setPassword("12345678");
    setError(null);
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await login(email, password);
    } catch (requestError) {
      setError(apiMessage(requestError));
    } finally {
      setIsSubmitting(false);
    }
  };

  // If loading session
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#070b13] text-white">
        <div className="relative flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          <div className="absolute h-8 w-8 animate-ping rounded-full bg-blue-500/20"></div>
        </div>
        <p className="mt-5 text-sm font-medium text-slate-400">Loading Secure Portal...</p>
      </div>
    );
  }

  // If logged in as admin/manager, show the shell and dashboard directly
  if (user && isAdmin) {
    return (
      <AdminShell>
        <AdminDashboard />
      </AdminShell>
    );
  }

  // If logged in but NOT admin, show error/unauthorized view
  if (user && !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b13] px-4 text-white">
        <div className="w-full max-w-md border border-red-500/20 bg-red-950/20 p-8 backdrop-blur-xl rounded-2xl shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-400">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-red-200">Access Denied</h2>
            <p className="mt-2 text-sm text-red-400/80">
              You are logged in as <span className="font-semibold text-white">{user.email}</span>, but you do not have administrative privileges.
            </p>
            <Button
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.location.href = "/"}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render the premium admin login gateway
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b13] px-4 font-sans antialiased text-white">
      {/* Dynamic Background Mesh / Orbs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-blue-900/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-cyan-900/15 blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] h-[30%] w-[30%] rounded-full bg-indigo-900/10 blur-[100px]" />
        <div className="premium-grid absolute inset-0 opacity-15" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <LockKeyhole className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            RVS Control Terminal
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Authorization required to access system controls.
          </p>
        </div>

        {/* Login Card */}
        <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-950/30 p-3.5 text-sm text-red-200">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <div>
                <p className="font-semibold">Authentication failed</p>
                <p className="mt-0.5 text-red-300/80 text-xs">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Secure Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/80 focus:bg-white/[0.04] focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Secret Access Token
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] pl-11 pr-4 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500/80 focus:bg-white/[0.04] focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="relative flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Decrypting Credentials...</span>
                </>
              ) : (
                <>
                  <span>Unlock Terminal</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Quick Login Helper */}
          <div className="mt-8 border-t border-white/[0.06] pt-6 text-center">
            <button
              type="button"
              onClick={handleQuickLogin}
              className="group inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-1.5 text-xs text-blue-400 transition hover:bg-blue-500/10 hover:border-blue-500/50"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-blue-400" />
              <span>Quick Login as Admin (Demo)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-500">
          RVS Trust Solutions Cambodia Admin Terminal &copy; {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
