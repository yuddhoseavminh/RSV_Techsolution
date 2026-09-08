import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/public-layout";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password"
};

export default function ForgotPasswordPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20 min-h-[85vh] flex items-center justify-center">
        <div className="section-shell flex justify-center w-full">
          <ForgotPasswordForm />
        </div>
      </section>
    </PublicLayout>
  );
}
