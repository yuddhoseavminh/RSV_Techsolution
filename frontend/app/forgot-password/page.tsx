import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { PublicLayout } from "@/components/layout/public-layout";

export const metadata = {
  title: "Forgot Password"
};

export default function ForgotPasswordPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell flex justify-center">
          <ForgotPasswordForm />
        </div>
      </section>
    </PublicLayout>
  );
}
