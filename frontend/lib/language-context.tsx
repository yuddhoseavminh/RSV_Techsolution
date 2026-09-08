"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Language = "EN" | "KH";

export interface Translations {
  // Common & Header
  nav_home: string;
  nav_features: string;
  nav_services: string;
  nav_portfolio: string;
  nav_pricing: string;
  nav_faq: string;
  nav_contact: string;
  nav_solutions: string;
  nav_portal: string;
  nav_admin: string;
  nav_consultation: string;
  nav_search: string;
  theme_toggle: string;
  lang_toggle: string;

  // Hero Section
  hero_badge: string;
  hero_title_1: string;
  hero_title_2: string;
  hero_subtitle: string;
  hero_cta_solutions: string;
  hero_cta_consultation: string;
  hero_cta_preview: string;
  hero_stat_delivered: string;
  hero_stat_satisfaction: string;
  hero_stat_support: string;

  // Features Section
  features_badge: string;
  features_title: string;
  features_subtitle: string;
  feat_strategy_title: string;
  feat_strategy_desc: string;
  feat_portals_title: string;
  feat_portals_desc: string;
  feat_ux_title: string;
  feat_ux_desc: string;
  feat_cloud_title: string;
  feat_cloud_desc: string;
  feat_intel_title: string;
  feat_intel_desc: string;
  feat_support_title: string;
  feat_support_desc: string;

  // Services Section
  services_badge: string;
  services_title: string;
  services_subtitle: string;
  svc_web_title: string;
  svc_web_desc: string;
  svc_mobile_title: string;
  svc_mobile_desc: string;
  svc_erp_title: string;
  svc_erp_desc: string;
  svc_cloud_title: string;
  svc_cloud_desc: string;
  svc_uiux_title: string;
  svc_uiux_desc: string;
  svc_consulting_title: string;
  svc_consulting_desc: string;

  // Stats Section
  stat_projects: string;
  stat_systems: string;
  stat_satisfaction: string;
  stat_coverage: string;

  // Portfolio Section
  portfolio_badge: string;
  portfolio_title: string;
  portfolio_subtitle: string;
  portfolio_view_live: string;

  // Pricing Section
  pricing_badge: string;
  pricing_title: string;
  pricing_subtitle: string;
  pricing_plan_starter: string;
  pricing_plan_growth: string;
  pricing_plan_enterprise: string;
  pricing_popular: string;
  pricing_cta: string;

  // FAQ Section
  faq_badge: string;
  faq_title: string;
  faq_subtitle: string;

  // Contact Section
  contact_badge: string;
  contact_title: string;
  contact_subtitle: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_company: string;
  contact_service: string;
  contact_message: string;
  contact_send: string;
  contact_sending: string;
  contact_success: string;

  // Footer
  footer_desc: string;
  footer_newsletter_title: string;
  footer_newsletter_desc: string;
  footer_newsletter_btn: string;
  footer_rights: string;

  // Login & Auth
  login_title: string;
  login_subtitle: string;
  login_email_label: string;
  login_password_label: string;
  login_remember_me: string;
  login_forgot_password: string;
  login_btn: string;
  login_btn_signing: string;
  login_no_account: string;
  login_create_account: string;
  login_demo_title: string;
  login_demo_subtitle: string;
  login_demo_admin: string;
  login_demo_admin_desc: string;
  login_demo_client: string;
  login_demo_client_desc: string;
  login_auto_fill: string;
  login_as_admin: string;
  login_as_client: string;

  // Admin Console
  admin_dashboard: string;
  admin_users: string;
  admin_roles: string;
  admin_settings: string;
  admin_sign_out: string;
  admin_web_view: string;
  admin_signed_in_as: string;
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
    nav_solutions: "Solutions",
    nav_portal: "Portal",
    nav_admin: "Admin",
    nav_consultation: "Consultation",
    nav_search: "Search",
    theme_toggle: "Theme",
    lang_toggle: "Language",

    hero_badge: "TRUSTED TECHNOLOGY PARTNER IN CAMBODIA",
    hero_title_1: "Build, launch, and scale",
    hero_title_2: "reliable digital platforms.",
    hero_subtitle:
      "Custom software, high-speed web apps, mobile apps, ERP, CRM, POS, and automated business workflows built with Cambodian integrity and world-class engineering.",
    hero_cta_solutions: "Explore Solutions",
    hero_cta_consultation: "Book Consultation",
    hero_cta_preview: "Watch Platform Preview",
    hero_stat_delivered: "Projects Delivered",
    hero_stat_satisfaction: "Client Satisfaction",
    hero_stat_support: "Support Coverage",

    features_badge: "ARCHITECTURE & DELIVERY",
    features_title: "Engineered for speed, security, and real business operations.",
    features_subtitle:
      "Every screen, database design, and background job is optimized for clarity, stability, and measurable business growth.",
    feat_strategy_title: "Strategy-led delivery",
    feat_strategy_desc:
      "Discovery, interface mapping, API planning, and release management shaped around your real operational workflow.",
    feat_portals_title: "Secure portals",
    feat_portals_desc:
      "Role-aware dashboards for projects, invoices, tickets, users, permissions, reports, and business data.",
    feat_ux_title: "Polished UX",
    feat_ux_desc:
      "Responsive interfaces with clean motion, instant feedback, and practical views for everyday business use.",
    feat_cloud_title: "Cloud-ready architecture",
    feat_cloud_desc:
      "Laravel APIs, Next.js frontends, asynchronous queues, clean data models, and scalable deployment pipelines.",
    feat_intel_title: "Operational intelligence",
    feat_intel_desc:
      "Live metrics, progress tracking, finance views, inventory visibility, lead pipelines, and exportable reports.",
    feat_support_title: "Long-term support",
    feat_support_desc:
      "Launch training, monitoring, performance tuning, ongoing feature iteration, and a reliable engineering partner.",

    services_badge: "CORE CAPABILITIES",
    services_title: "Full-cycle engineering from blueprint to scale.",
    services_subtitle:
      "Modern technology stacks crafted for reliability, high conversion rates, and scalable Cambodian operations.",
    svc_web_title: "Web Development",
    svc_web_desc:
      "High-performance marketing sites, SaaS platforms, portals, and robust web applications.",
    svc_mobile_title: "Mobile App Development",
    svc_mobile_desc:
      "Cross-platform iOS and Android applications connected to secure APIs and real-time operational workflows.",
    svc_erp_title: "Custom Software & ERP",
    svc_erp_desc:
      "Tailored enterprise platforms, POS systems, inventory management, and automated business workflows.",
    svc_cloud_title: "Cloud & DevOps",
    svc_cloud_desc:
      "Scalable cloud infrastructure, automated CI/CD pipelines, Docker containerization, and data security.",
    svc_uiux_title: "UI/UX Product Design",
    svc_uiux_desc:
      "Research-backed user interfaces, rapid prototyping, design systems, and conversion-focused experiences.",
    svc_consulting_title: "IT & Architecture Consulting",
    svc_consulting_desc:
      "Digital transformation roadmaps, security auditing, legacy system modernization, and database tuning.",

    stat_projects: "Projects delivered",
    stat_systems: "Business systems launched",
    stat_satisfaction: "Client satisfaction",
    stat_coverage: "Support coverage",

    portfolio_badge: "FEATURED WORK",
    portfolio_title: "Real platforms delivering measurable results for Cambodian teams.",
    portfolio_subtitle:
      "Explore selected production systems built for retail, education, finance, logistics, and enterprise services.",
    portfolio_view_live: "View Project",

    pricing_badge: "TRANSPARENT VALUE",
    pricing_title: "Straightforward plans structured for long-term ROI.",
    pricing_subtitle:
      "No hidden fees, flexible milestone-based delivery, and dedicated post-launch warranty support.",
    pricing_plan_starter: "Starter Solution",
    pricing_plan_growth: "Business Growth",
    pricing_plan_enterprise: "Enterprise Scale",
    pricing_popular: "Most Popular",
    pricing_cta: "Get Started",

    faq_badge: "FREQUENT QUESTIONS",
    faq_title: "Clear answers before we write a single line of code.",
    faq_subtitle: "Everything you need to know about our engineering approach, timelines, and guarantees.",

    contact_badge: "START A CONVERSATION",
    contact_title: "Let's plan your platform with complete clarity.",
    contact_subtitle:
      "Tell us about your project, timeline, and goals. We will provide an architecture breakdown and transparent cost estimate.",
    contact_name: "Your Name",
    contact_email: "Email Address",
    contact_phone: "Phone Number",
    contact_company: "Company Name",
    contact_service: "Interested Service",
    contact_message: "Tell us about your project requirements...",
    contact_send: "Send Consultation Request",
    contact_sending: "Sending Request...",
    contact_success: "Thank you! Our engineering team will contact you within 24 hours.",

    footer_desc:
      "Trusted software development, websites, SaaS portals, mobile apps, POS, inventory, ERP, CRM, and enterprise systems built for Cambodian businesses.",
    footer_newsletter_title: "Get practical digital strategy notes.",
    footer_newsletter_desc:
      "Ideas for websites, SaaS portals, POS, inventory, ERP, CRM, mobile apps, and business automation.",
    footer_newsletter_btn: "Subscribe",
    footer_rights: "All rights reserved.",

    login_title: "Sign in to your account",
    login_subtitle: "Access project tracking, invoices, admin management, and support tickets.",
    login_email_label: "Email Address",
    login_password_label: "Password",
    login_remember_me: "Remember me for 30 days",
    login_forgot_password: "Forgot password?",
    login_btn: "Sign in",
    login_btn_signing: "Authenticating...",
    login_no_account: "Don't have an account yet?",
    login_create_account: "Create an account",
    login_demo_title: "Quick Demo Credentials",
    login_demo_subtitle: "Click any demo account below to instantly fill credentials or test single-click login.",
    login_demo_admin: "Administrator",
    login_demo_admin_desc: "Full access to administrative console, users, CMS, services, projects & settings.",
    login_demo_client: "Client Portal",
    login_demo_client_desc: "Client access for tracking active projects, reviewing invoices, and support tickets.",
    login_auto_fill: "Auto-fill",
    login_as_admin: "Login as Admin",
    login_as_client: "Login as Client",

    admin_dashboard: "Dashboard",
    admin_users: "Users",
    admin_roles: "Roles",
    admin_settings: "Settings",
    admin_sign_out: "Sign out",
    admin_web_view: "View Live Website (CMS)",
    admin_signed_in_as: "Signed in as"
  },
  KH: {
    nav_home: "ទំព័រដើម",
    nav_features: "លក្ខណៈពិសេស",
    nav_services: "សេវាកម្ម",
    nav_portfolio: "ស្នាដៃការងារ",
    nav_pricing: "តម្លៃ",
    nav_faq: "សំណួរញឹកញាប់",
    nav_contact: "ទំនាក់ទំនង",
    nav_solutions: "ដំណោះស្រាយ",
    nav_portal: "ច្រកចូល",
    nav_admin: "គ្រប់គ្រង",
    nav_consultation: "ប្រឹក្សាយោបល់",
    nav_search: "ស្វែងរក",
    theme_toggle: "ផ្ទៃពណ៌",
    lang_toggle: "ភាសា",

    hero_badge: "ដៃគូបច្ចេកវិទ្យាគួរឱ្យទុកចិត្តនៅកម្ពុជា",
    hero_title_1: "បង្កើត បើកដំណើរការ និងពង្រីក",
    hero_title_2: "ប្រព័ន្ធឌីជីថលដែលគួរឱ្យទុកចិត្ត។",
    hero_subtitle:
      "កម្មវិធីតាមតម្រូវការ គេហទំព័រល្បឿនលឿន កម្មវិធីទូរស័ព្ទ ERP, CRM, POS និងប្រព័ន្ធគ្រប់គ្រងអាជីវកម្មស្វ័យប្រវត្តិកសាងឡើងដោយទំនុកចិត្ត និងស្តង់ដារវិស្វកម្មកម្រិតខ្ពស់។",
    hero_cta_solutions: "ស្វែងយល់ពីដំណោះស្រាយ",
    hero_cta_consultation: "កក់ការប្រឹក្សាយោបល់",
    hero_cta_preview: "ទស្សនាការបង្ហាញប្រព័ន្ធ",
    hero_stat_delivered: "គម្រោងបានបញ្ចប់",
    hero_stat_satisfaction: "ការពេញចិត្តអតិថិជន",
    hero_stat_support: "សេវាគាំទ្របច្ចេកទេស",

    features_badge: "រចនាសម្ព័ន្ធ និងការអនុវត្ត",
    features_title: "រចនាឡើងសម្រាប់ល្បឿន សុវត្ថិភាព និងប្រតិបត្តិការអាជីវកម្មជាក់ស្តែង។",
    features_subtitle:
      "រាល់ទំព័រប្រព័ន្ធ រចនាសម្ព័ន្ធទិន្នន័យ និងដំណើរការស្វ័យប្រវត្តិតែងតែត្រូវបានកែលម្អសម្រាប់ភាពច្បាស់លាស់ ស្ថិរភាព និងការរីកចម្រើននៃអាជីវកម្ម។",
    feat_strategy_title: "ការអនុវត្តតាមយុទ្ធសាស្ត្រច្បាស់លាស់",
    feat_strategy_desc:
      "ការសិក្សាតម្រូវការ ការរចនាផ្ទាំងប្រើប្រាស់ ការរៀបចំ API និងការគ្រប់គ្រងការចេញផ្សាយតាមលំហូរការងារជាក់ស្តែងរបស់អ្នក។",
    feat_portals_title: "ច្រកចូលប្រព័ន្ធមានសុវត្ថិភាពខ្ពស់",
    feat_portals_desc:
      "ផ្ទាំងគ្រប់គ្រងតាមតួនាទីសម្រាប់គម្រោង វិក្កយបត្រ សំបុត្រជំនួយ អ្នកប្រើប្រាស់ សិទ្ធិ របាយការណ៍ និងទិន្នន័យអាជីវកម្ម។",
    feat_ux_title: "បទពិសោធន៍ប្រើប្រាស់ទាន់សម័យ",
    feat_ux_desc:
      "ផ្ទាំងកម្មវិធីឆ្លើយតបរហ័ស មានចលនារលូន ឆ្លើយតបភ្លាមៗ និងមានភាពងាយស្រួលសម្រាប់ប្រតិបត្តិការប្រចាំថ្ងៃ។",
    feat_cloud_title: "រចនាសម្ព័ន្ធ Cloud ទំនើប",
    feat_cloud_desc:
      "Laravel APIs, Next.js frontend, ប្រព័ន្ធ queue ដំណើរការផ្ទៃខាងក្រោយ គំរូទិន្នន័យស្អាត និងការដំឡើងប្រព័ន្ធមានស្ថិរភាព។",
    feat_intel_title: "ការវិភាគ និងទិន្នន័យប្រតិបត្តិការ",
    feat_intel_desc:
      "ស្ថិតិផ្ទាល់ ការតាមដានវឌ្ឍនភាព ទិដ្ឋភាពហិរញ្ញវត្ថុ ការគ្រប់គ្រងស្តុក បណ្តាញអតិថិជន និងការទាញយករបាយការណ៍។",
    feat_support_title: "ការគាំទ្រ និងថែទាំយូរអង្វែង",
    feat_support_desc:
      "ការបណ្តុះបណ្តាលប្រើប្រាស់ ការតាមដានប្រព័ន្ធ ការកែលម្អដំណើរការ និងជាដៃគូសហការបច្ចេកវិទ្យាដែលអាចទុកចិត្តបាន។",

    services_badge: "សមត្ថភាព និងសេវាកម្មស្នូល",
    services_title: "វិស្វកម្មពេញលេញពីគម្រោងប្លង់ដំបូងរហូតដល់ដំណើរការធំ។",
    services_subtitle:
      "បច្ចេកវិទ្យាទំនើបបង្កើតឡើងសម្រាប់ភាពជឿជាក់ អត្រាជោគជ័យខ្ពស់ និងការរីកចម្រើននៃអាជីវកម្មកម្ពុជា។",
    svc_web_title: "ការអភិវឌ្ឍគេហទំព័រ (Web Development)",
    svc_web_desc:
      "គេហទំព័រពាណិជ្ជកម្មល្បឿនលឿន វេទិកា SaaS ច្រកទ្វារព័ត៌មាន និងកម្មវិធីគេហទំព័រអាជីវកម្មរឹងមាំ។",
    svc_mobile_title: "ការបង្កើតកម្មវិធីទូរស័ព្ទ (Mobile Apps)",
    svc_mobile_desc:
      "កម្មវិធីទូរស័ព្ទ iOS និង Android ភ្ជាប់ទៅកាន់ប្រព័ន្ធ API មានសុវត្ថិភាព និងដំណើរការទិន្នន័យផ្ទាល់ភ្លាមៗ។",
    svc_erp_title: "កម្មវិធីតាមតម្រូវការ និងប្រព័ន្ធ ERP/POS",
    svc_erp_desc:
      "ប្រព័ន្ធគ្រប់គ្រងសហគ្រាស ប្រព័ន្ធលក់ POS ការគ្រប់គ្រងស្តុក និងស្វ័យប្រវត្តិកម្មអាជីវកម្មតាមតម្រូវការជាក់ស្តែង។",
    svc_cloud_title: "ប្រព័ន្ធ Cloud & DevOps",
    svc_cloud_desc:
      "ហេដ្ឋារចនាសម្ព័ន្ធ Cloud អាចពង្រីកបាន ប្រព័ន្ធ CI/CD ស្វ័យប្រវត្តិ Docker Containers និងសុវត្ថិភាពទិន្នន័យកម្រិតខ្ពស់។",
    svc_uiux_title: "ការរចនាបទ UI/UX ផលិតផល",
    svc_uiux_desc:
      "ការស្រាវជ្រាវអ្នកប្រើប្រាស់ គំរូសាកល្បងរហ័ស ប្រព័ន្ធរចនា (Design Systems) និងបទពិសោធន៍បង្កើនការទាក់ទាញ។",
    svc_consulting_title: "ការប្រឹក្សាផ្នែក IT & រចនាសម្ព័ន្ធ",
    svc_consulting_desc:
      "ផែនទីផ្លូវការផ្លាស់ប្តូរឌីជីថល សវនកម្មសុវត្ថិភាព ការកែប្រែប្រព័ន្ធចាស់ឱ្យទាន់សម័យ និងការបង្កើនល្បឿន Database។",

    stat_projects: "គម្រោងដែលបានប្រគល់ជូន",
    stat_systems: "ប្រព័ន្ធអាជីវកម្មដាក់ឱ្យប្រើ",
    stat_satisfaction: "កម្រិតពេញចិត្តរបស់អតិថិជន",
    stat_coverage: "សេវាគាំទ្រ និងថែទាំ 24/7",

    portfolio_badge: "ស្នាដៃការងារឆ្នើម",
    portfolio_title: "ប្រព័ន្ធជាក់ស្តែងដែលផ្តល់លទ្ធផលវាស់វែងបានសម្រាប់អាជីវកម្មនៅកម្ពុជា។",
    portfolio_subtitle:
      "ស្វែងយល់ពីប្រព័ន្ធផលិតកម្មដែលបានបង្កើតសម្រាប់វិស័យលក់រាយ ការអប់រំ ហិរញ្ញវត្ថុ ភស្តុភារកម្ម និងសេវាកម្មអាជីវកម្ម។",
    portfolio_view_live: "មើលគម្រោង",

    pricing_badge: "តម្លៃសមរម្យ និងច្បាស់លាស់",
    pricing_title: "គម្រោងថ្លៃសេវាច្បាស់លាស់សម្រាប់ប្រសិទ្ធភាពយូរអង្វែង។",
    pricing_subtitle:
      "គ្មានថ្លៃសេវាលាក់កំបាំង ការបែងចែកដំណាក់កាលទូទាត់បត់បែន និងការធានាគាំទ្របន្ទាប់ពីការដាក់ឱ្យប្រើប្រាស់។",
    pricing_plan_starter: "កញ្ចប់ចាប់ផ្តើម (Starter)",
    pricing_plan_growth: "កញ្ចប់អាជីវកម្ម (Growth)",
    pricing_plan_enterprise: "កញ្ចប់សហគ្រាស (Enterprise)",
    pricing_popular: "ពេញនិយមបំផុត",
    pricing_cta: "ចាប់ផ្តើមឥឡូវនេះ",

    faq_badge: "សំណួរដែលសួរញឹកញាប់",
    faq_title: "ចម្លើយច្បាស់លាស់មុនពេលយើងចាប់ផ្តើមសរសេរកូដមួយជួរ។",
    faq_subtitle: "អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវដឹងអំពីវិធីសាស្ត្រការងារ ពេលវេលាអនុវត្ត និងការធានារបស់យើង។",

    contact_badge: "ចាប់ផ្តើមការសន្ទនា",
    contact_title: "តោះរៀបចំផែនការប្រព័ន្ធរបស់អ្នកជាមួយភាពច្បាស់លាស់។",
    contact_subtitle:
      "ប្រាប់យើងអំពីគម្រោង កាលវិភាគ និងគោលដៅរបស់អ្នក។ យើងនឹងផ្តល់នូវប្លង់រចនាសម្ព័ន្ធ និងការប៉ាន់ស្មានការចំណាយច្បាស់លាស់។",
    contact_name: "ឈ្មោះរបស់អ្នក",
    contact_email: "អាសយដ្ឋានអ៊ីមែល",
    contact_phone: "លេខទូរស័ព្ទ",
    contact_company: "ឈ្មោះក្រុមហ៊ុន / ស្ថាប័ន",
    contact_service: "សេវាកម្មដែលចាប់អារម្មណ៍",
    contact_message: "រៀបរាប់អំពីតម្រូវការគម្រោងរបស់អ្នក...",
    contact_send: "ផ្ញើសំណើសុំការប្រឹក្សា",
    contact_sending: "កំពុងផ្ញើសំណើ...",
    contact_success: "សូមអរគុណ! ក្រុមការងារវិស្វកម្មរបស់យើងនឹងទាក់ទងមកអ្នកក្នុងរយៈពេល ២៤ ម៉ោង។",

    footer_desc:
      "ការអភិវឌ្ឍកម្មវិធី គេហទំព័រ ច្រកទ្វារ SaaS កម្មវិធីទូរស័ព្ទ POS ប្រព័ន្ធគ្រប់គ្រងស្តុក ERP, CRM និងប្រព័ន្ធសហគ្រាសដែលអាចទុកចិត្តបានសម្រាប់អាជីវកម្មកម្ពុជា។",
    footer_newsletter_title: "ទទួលបានកំណត់ចំណាំយុទ្ធសាស្ត្រឌីជីថលជាក់ស្តែង។",
    footer_newsletter_desc:
      "គំនិត និងបច្ចេកវិទ្យាសម្រាប់គេហទំព័រ ច្រកទ្វារ SaaS, POS, ស្តុក, ERP, CRM, កម្មវិធីទូរស័ព្ទ និងស្វ័យប្រវត្តិកម្ម។",
    footer_newsletter_btn: "ជាវព័ត៌មាន",
    footer_rights: "រក្សាសិទ្ធិគ្រប់យ៉ាង។",

    login_title: "ចូលប្រើប្រាស់គណនីរបស់អ្នក",
    login_subtitle: "ចូលមើលការតាមដានគម្រោង វិក្កយបត្រ ការគ្រប់គ្រង និងសំបុត្រជំនួយ។",
    login_email_label: "អាសយដ្ឋានអ៊ីមែល",
    login_password_label: "ពាក្យសម្ងាត់",
    login_remember_me: "ចងចាំខ្ញុំរយៈពេល ៣០ ថ្ងៃ",
    login_forgot_password: "ភ្លេចពាក្យសម្ងាត់?",
    login_btn: "ចូលប្រើប្រាស់",
    login_btn_signing: "កំពុងផ្ទៀងផ្ទាត់...",
    login_no_account: "មិនទាន់មានគណនីនៅឡើយទេ?",
    login_create_account: "បង្កើតគណនីថ្មី",
    login_demo_title: "គណនីសាកល្បងរហ័ស",
    login_demo_subtitle: "ចុចលើគណនីសាកល្បងណាមួយខាងក្រោមដើម្បីបំពេញទិន្នន័យ ឬចូលប្រើភ្លាមៗដោយចុចតែម្តង។",
    login_demo_admin: "អ្នកគ្រប់គ្រង (Administrator)",
    login_demo_admin_desc: "សិទ្ធិពេញលេញលើផ្ទាំងគ្រប់គ្រង អ្នកប្រើប្រាស់ CMS សេវាកម្ម គម្រោង និងការកំណត់។",
    login_demo_client: "ច្រកចូលអតិថិជន (Client Portal)",
    login_demo_client_desc: "ច្រកចូលសម្រាប់អតិថិជនតាមដានគម្រោង ពិនិត្យវិក្កយបត្រ និងសំបុត្រជំនួយ។",
    login_auto_fill: "បំពេញស្វ័យប្រវត្តិ",
    login_as_admin: "ចូលជា Admin",
    login_as_client: "ចូលជា Client",

    admin_dashboard: "ផ្ទាំងគ្រប់គ្រង",
    admin_users: "អ្នកប្រើប្រាស់",
    admin_roles: "តួនាទី",
    admin_settings: "ការកំណត់",
    admin_sign_out: "ចាកចេញ",
    admin_web_view: "មើលគេហទំព័រផ្សាយផ្ទាល់ (CMS)",
    admin_signed_in_as: "បានចូលដោយ"
  }
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language | ((prev: Language) => Language)) => void;
  toggleLanguage: () => void;
  t: (key: keyof Translations, fallback?: string) => string;
  isKhmer: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("EN");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("rvs-lang") as Language | null;
      if (stored === "EN" || stored === "KH") {
        setLanguageState(stored);
      }
    } catch {
      // LocalStorage access failsafe
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "KH" ? "km" : "en";
    }
  }, [language]);

  const setLanguage = useCallback((updater: Language | ((prev: Language) => Language)) => {
    setLanguageState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try {
        window.localStorage.setItem("rvs-lang", next);
      } catch {
        // LocalStorage access failsafe
      }
      return next;
    });
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "EN" ? "KH" : "EN"));
  }, [setLanguage]);

  const t = useCallback(
    (key: keyof Translations, fallback?: string): string => {
      const currentDict = translations[language];
      if (currentDict && currentDict[key]) {
        return currentDict[key];
      }
      const fallbackDict = translations.EN;
      if (fallbackDict && fallbackDict[key]) {
        return fallbackDict[key];
      }
      return fallback ?? String(key);
    },
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isKhmer: language === "KH"
    }),
    [language, setLanguage, toggleLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "EN",
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key, fallback) => translations.EN[key] ?? fallback ?? String(key),
      isKhmer: false
    };
  }
  return context;
}
