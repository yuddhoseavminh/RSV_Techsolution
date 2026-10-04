// Language dictionary for the public site and admin console.
// Kept separate from the React provider so copy lives in one place.
//
// Only keys referenced by t("...") are kept — the rest were dead.
// Page and section copy lives inline in components/site/.

export type Language = "EN" | "KH";

export interface Translations {
  nav_home: string;
  nav_features: string;
  nav_services: string;
  nav_portfolio: string;
  nav_pricing: string;
  nav_faq: string;
  nav_contact: string;
  nav_about: string;
  nav_blog: string;
  nav_solutions: string;
  nav_portal: string;
  nav_admin: string;
  nav_consultation: string;
  nav_search: string;
  theme_toggle: string;
}

export const translations: Record<Language, Translations> = {
  EN: {
    nav_home: "Home",
    nav_features: "Features",
    nav_services: "Services",
    nav_portfolio: "Portfolio",
    nav_pricing: "Pricing",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    nav_about: "About",
    nav_blog: "Blog",
    nav_solutions: "Solutions",
    nav_portal: "Portal",
    nav_admin: "Admin",
    nav_consultation: "Consultation",
    nav_search: "Search",
    theme_toggle: "Theme"
  },
  KH: {
    nav_home: "ទំព័រដើម",
    nav_features: "លក្ខណៈពិសេស",
    nav_services: "សេវាកម្ម",
    nav_portfolio: "ស្នាដៃការងារ",
    nav_pricing: "តម្លៃ",
    nav_faq: "សំណួរញឹកញាប់",
    nav_contact: "ទំនាក់ទំនង",
    nav_about: "អំពីយើង",
    nav_blog: "ប្លុក",
    nav_solutions: "ដំណោះស្រាយ",
    nav_portal: "ច្រកចូល",
    nav_admin: "គ្រប់គ្រង",
    nav_consultation: "ប្រឹក្សាយោបល់",
    nav_search: "ស្វែងរក",
    theme_toggle: "ផ្ទៃពណ៌"
  }
};
