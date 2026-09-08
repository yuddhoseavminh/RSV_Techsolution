import { RegisterForm } from "@/components/auth/register-form";
import { PublicLayout } from "@/components/layout/public-layout";

export const metadata = {
  title: "Register"
};

export default function RegisterPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell flex justify-center">
          <RegisterForm />
        </div>
      </section>
    </PublicLayout>
  );
}
