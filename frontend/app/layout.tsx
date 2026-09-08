import type { Metadata } from "next";
import { AuthProvider } from "@/components/auth/auth-provider";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "RVS Trust Solutions Cambodia - Trusted Technology Solutions",
    template: "%s | RVS Trust Solutions Cambodia"
  },
  description:
    "Trusted software development, websites, SaaS portals, mobile apps, POS, inventory, ERP, CRM, and enterprise systems for Cambodian businesses.",
  keywords: ["RVS Trust Solutions Cambodia", "software development Cambodia", "Laravel", "Next.js", "POS", "inventory system"],
  openGraph: {
    title: "RVS Trust Solutions Cambodia",
    description: "Trusted technology solutions for growing Cambodian businesses.",
    images: ["/images/kt-hero.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
