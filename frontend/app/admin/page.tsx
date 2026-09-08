import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard"
};

export default function AdminDashboardPage() {
  redirect("/admin_page");
}

