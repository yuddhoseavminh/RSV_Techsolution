import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/public-layout";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register"
};

export default function RegisterPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20 min-h-[85vh] flex items-center justify-center">
        <div className="section-shell flex justify-center w-full">
          <RegisterForm />
        </div>
      </section>
    </PublicLayout>
  );
}
