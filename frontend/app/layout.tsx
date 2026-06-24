import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "KT Solution - Smart Digital Solutions",
    template: "%s | KT Solution"
  },
  description:
    "Custom software, web applications, mobile apps, POS, inventory, ERP, and enterprise systems built for growth.",
  keywords: ["KT Solution", "software development", "Laravel", "Next.js", "POS", "inventory system"],
  openGraph: {
    title: "KT Solution",
    description: "Transform your business with smart digital solutions.",
    images: ["/images/kt-hero.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
