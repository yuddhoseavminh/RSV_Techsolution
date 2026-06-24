import Link from "next/link";
import { UserPlus } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const metadata = {
  title: "Register"
};

export default function RegisterPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell flex justify-center">
          <Card className="w-full max-w-xl">
            <CardHeader>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
                <UserPlus className="h-5 w-5" />
              </div>
              <CardTitle>Create Client Account</CardTitle>
              <CardDescription>Register to track projects, invoices, and support requests.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input placeholder="Name" />
                  <Input type="email" placeholder="Email" />
                  <Input placeholder="Phone" />
                  <Input placeholder="Company" />
                  <Input type="password" placeholder="Password" />
                  <Input type="password" placeholder="Confirm Password" />
                </div>
                <Button type="submit">Create Account</Button>
              </form>
              <p className="mt-5 text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-brand-blue">
                  Login
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicLayout>
  );
}
