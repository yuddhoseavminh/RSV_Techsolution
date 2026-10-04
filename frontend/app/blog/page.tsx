import { PublicLayout } from "@/components/layout/public-layout";
import { BlogList } from "@/components/site/blog-list";

export const metadata = {
  title: "Blog"
};

export default function BlogPage() {
  return (
    <PublicLayout>
      <BlogList />
    </PublicLayout>
  );
}
