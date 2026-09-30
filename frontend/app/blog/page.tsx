import { PublicLayout } from "@/components/layout/public-layout";
import { BlogExplorer } from "@/components/sections/blog-explorer";
import { SectionHeading } from "@/components/ui/section";

export const metadata = {
  title: "Blog"
};

export default function BlogPage() {
  return (
    <PublicLayout>
      <section className="bg-slate-50 py-20">
        <div className="section-shell">
          <SectionHeading as="h1"
            eyebrow="Blog"
            title="Ideas for better business systems"
            description="Search by topic, browse categories, and explore practical guidance for custom software projects."
          />
          <BlogExplorer />
        </div>
      </section>
    </PublicLayout>
  );
}
