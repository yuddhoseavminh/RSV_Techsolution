import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import { AuthProvider } from "@/components/auth/auth-provider";
import { SettingsProvider } from "@/lib/settings-context";
import { LanguageProvider } from "@/lib/language-context";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "RVS Techsolution - Trusted Technology Solutions",
    template: "%s | RVS Techsolution"
  },
  description:
    "Trusted software development, websites, SaaS portals, mobile apps, POS, inventory, ERP, CRM, and enterprise systems for Cambodian businesses.",
  keywords: ["RVS Techsolution", "software development Cambodia", "Laravel", "Next.js", "POS", "inventory system"],
  openGraph: {
    title: "RVS Techsolution",
    description: "Trusted technology solutions for growing Cambodian businesses.",
    images: ["/images/og-hero.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Runs before first paint: the dark class is otherwise applied by an
          effect after hydration, which flashes the light theme on every load. */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{document.documentElement.classList.add("js");var t=localStorage.getItem("rvs-theme");if(t!=="dark"&&t!=="light"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.toggle("dark",t==="dark")}catch(e){}'
          }}
        />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <LanguageProvider>
            <AuthProvider>
              <SettingsProvider>{children}</SettingsProvider>
            </AuthProvider>
          </LanguageProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
