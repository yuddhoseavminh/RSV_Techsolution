import { PublicLayout } from "@/components/layout/public-layout";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesGrid } from "@/components/sections/services-grid";

export const metadata = {
  title: "Services"
};

export default function ServicesPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Services"
            title="Custom software services for business growth"
            description="Each service includes strategy, UX planning, API architecture, development, deployment, and long-term support."
          />
          <ServicesGrid />
        </div>
      </section>
    </PublicLayout>
  );
}
