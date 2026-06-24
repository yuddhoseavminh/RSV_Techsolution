import Link from "next/link";
import { MailCheck } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Forgot Password"
};

export default function ForgotPasswordPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                <MailCheck className="h-5 w-5" />
              </div>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>Enter your email and we will send a reset link.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <Input type="email" placeholder="Email" />
                <Button type="submit">Send Reset Link</Button>
              </form>
              <Link href="/login" className="mt-5 block text-sm font-semibold text-brand-blue">
                Back to login
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
