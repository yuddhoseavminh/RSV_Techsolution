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
<<<<<<< HEAD
    <html lang="en" suppressHydrationWarning>
=======
    <html lang="en">
>>>>>>> 9ade3f7e0d9de2e386bfb746881c089e804ee93c
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
