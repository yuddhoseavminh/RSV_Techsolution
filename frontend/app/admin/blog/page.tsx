import { ModulePage } from "@/components/admin/module-page";

export const metadata = {
  title: "Blog"
};

export default function BlogAdminPage() {
  return (
    <div className="grid gap-6">
      <ModulePage
        title="Blog Management"
        description="Create posts, categories, tags, SEO metadata, and rich content for the public blog."
        columns={["Post", "Category", "Author", "Status"]}
        rows={[
          ["How Custom Software Reduces Manual Work", "Digital Transformation", "KT Admin", "Published"],
          ["Planning a POS System", "POS", "KT Admin", "Draft"],
          ["Laravel API Patterns", "Engineering", "KT Admin", "Published"]
        ]}
      />
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-950">Rich Content Editor</h2>
        <div className="mt-4 min-h-48 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-600">
          Heading, paragraphs, images, tags, SEO title, SEO description, and publication workflow are modeled in the API.
        </div>
      </div>
    </div>
  );
}
