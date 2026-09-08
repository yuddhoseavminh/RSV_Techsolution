<<<<<<< HEAD
import { RegisterForm } from "@/components/auth/register-form";
import { PublicLayout } from "@/components/layout/public-layout";

export const metadata = {
=======
import { Metadata } from "next";
import { PublicLayout } from "@/components/layout/public-layout";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
>>>>>>> 35775272cdf1eff770c1a38f111c6bfd7469eff8
  title: "Register"
};

export default function RegisterPage() {
  return (
    <PublicLayout>
<<<<<<< HEAD
      <section className="bg-slate-50 py-20">
        <div className="section-shell flex justify-center">
=======
      <section className="bg-slate-50 py-20 min-h-[85vh] flex items-center justify-center">
        <div className="section-shell flex justify-center w-full">
>>>>>>> 35775272cdf1eff770c1a38f111c6bfd7469eff8
          <RegisterForm />
        </div>
      </section>
    </PublicLayout>
  );
}
