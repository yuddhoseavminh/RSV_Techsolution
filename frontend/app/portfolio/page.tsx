import { PublicLayout } from "@/components/layout/public-layout";
import { PortfolioFilter } from "@/components/sections/portfolio-filter";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata = {
  title: "Portfolio"
};

export default function PortfolioPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Portfolio"
            title="Project showcase across websites, apps, POS, inventory, and ERP"
            description="Filter by service area and review the business outcome, client context, and implementation stack."
          />
          <PortfolioFilter />
        </div>
      </section>
    </PublicLayout>
  );
}
