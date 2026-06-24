import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Login"
};

export default function LoginPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <CardTitle>Client Portal Login</CardTitle>
              <CardDescription>Access project tracking, invoices, support tickets, and notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button type="submit">
                  Login
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
        </div>
      </section>
    </PublicLayout>
  );
}
