import { LoginForm } from "@/components/auth/login-form";
import { PublicLayout } from "@/components/layout/public-layout";

export const metadata = {
  title: "Login"
};

export default function LoginPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell flex justify-center">
          <LoginForm />
        </div>
      </section>
    </PublicLayout>
  );
}
