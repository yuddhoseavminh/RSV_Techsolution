import Link from "next/link";
import { MailCheck } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Verify Email"
};

export default function VerifyEmailPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell flex justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                <MailCheck className="h-5 w-5" />
              </div>
              <CardTitle>Verify Your Email</CardTitle>
              <CardDescription>Confirm your email address to activate portal access.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/login">Back to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
