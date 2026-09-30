import type { LandingContent } from "./types";

/**
 * English copy for the landing page.
 *
 * This file and `km.ts` are the only two places landing copy lives. Both are
 * checked against `LandingContent`, so a missing Khmer string is a type error
 * rather than a silent English fallback in production.
 *
 * PLACEHOLDER blocks are marked inline and must be replaced with verified
 * client data before launch.
 */

export const en: LandingContent = {
  hero: {
    badge: "Phnom Penh software studio",
    title: "We build the systems Cambodian businesses run on.",
    lede:
      "RVS Trust Solutions Cambodia designs and delivers websites, portals, POS, inventory, ERP, CRM, and mobile systems — engineered for daily use, not for demos.",
    ctaPrimary: "Start a project",
    ctaSecondary: "See our work",
    proof: "Based in Phnom Penh · Delivering nationwide",
    image: {
      src: "/images/kt-hero.png",
      alt: "Operations dashboard built by RVS Trust Solutions Cambodia",
      caption: "Live operations"
    }
  },

  logos: {
    label: "Teams modernising how they operate",
    // PLACEHOLDER — replace with verified client or partner names.
    names: [
      "Acme Retail",
      "Bright Academy",
      "Metro Supply",
      "BuildPro",
      "ServiceLink",
      "Nexa Commerce",
      "Urban Clinic",
      "Prime Logistics"
    ]
  },

  capabilities: {
    eyebrow: "Capabilities",
    title: "Everything a working system needs.",
    lede:
      "One team across strategy, interface, engineering, and support — so nothing is lost between handoffs.",
    items: [
      {
        title: "Discovery and scope",
        body: "We map your real process before a line of code, so the scope you approve is the scope we build."
      },
      {
        title: "Interface design",
        body: "Clear screens for the people who open them every morning — fast to read, hard to misuse."
      },
      {
        title: "Engineering",
        body: "Next.js front ends on Laravel APIs, with clean data models your next developer can follow."
      },
      {
        title: "Security and roles",
        body: "Permission levels, audit trails, and careful handling of the data your business depends on."
      },
      {
        title: "Reporting",
        body: "Live numbers your managers can act on, plus exports for the spreadsheets they still trust."
      },
      {
        title: "Support after launch",
        body: "Training, monitoring, fixes, and steady iteration with the same team that built it."
      }
    ]
  },

  services: {
    eyebrow: "Services",
    title: "What we build",
    lede:
      "Each service is delivered end to end — discovery, design, build, deployment, and the support that follows."
  },

  work: {
    eyebrow: "Selected work",
    title: "Four systems in daily use.",
    lede: "A sample of platforms we have designed, built, and handed over.",
    // PLACEHOLDER — client names are illustrative until approved for release.
    items: [
      {
        title: "Retail POS Suite",
        category: "POS",
        description:
          "Multi-branch point of sale with barcode scanning, cashier roles, stock movements, and end-of-day reconciliation.",
        outcome: "One stock count, every branch.",
        client: "Acme Retail",
        technologies: ["Laravel", "Next.js", "MySQL"]
      },
      {
        title: "School Operations Portal",
        category: "ERP",
        description:
          "Student records, attendance, fee billing, grading, and parent messaging gathered into a single portal.",
        outcome: "Term billing that runs itself.",
        client: "Bright Academy",
        technologies: ["Laravel", "React", "MySQL"]
      },
      {
        title: "Logistics Inventory Control",
        category: "Inventory",
        description:
          "Warehouse stock, purchasing, inter-branch transfers, and low-stock alerts for a distribution business.",
        outcome: "Reorder before you run out.",
        client: "Metro Supply",
        technologies: ["Laravel", "REST API", "MySQL"]
      },
      {
        title: "Construction CRM",
        category: "CRM",
        description:
          "Lead capture, sales pipeline, proposal tracking, and a client portal for a construction firm.",
        outcome: "No lead left waiting.",
        client: "BuildPro",
        technologies: ["Next.js", "Laravel", "Tailwind"]
      }
    ]
  },

  proof: {
    eyebrow: "Proof",
    title: "Outcomes clients can point to.",
    lede:
      "We measure delivery in systems that stay running, not in slides that get filed away.",
    // PLACEHOLDER — replace with verified figures before launch.
    stats: [
      { value: 120, suffix: "+", label: "Projects delivered" },
      { value: 35, suffix: "+", label: "Business systems launched" },
      { value: 98, suffix: "%", label: "Client satisfaction" },
      { value: 24, suffix: "/7", label: "Support coverage" }
    ],
    // PLACEHOLDER — replace with approved testimonials and real attribution.
    quotes: [
      {
        quote:
          "They replaced a room of spreadsheets with one system our team actually opens every morning.",
        name: "Sokha Lim",
        role: "Operations Director",
        initials: "SL"
      },
      {
        quote:
          "The portal is straightforward. Managers track projects, invoices, and tickets without asking anyone for a login.",
        name: "Dara Chea",
        role: "Managing Partner",
        initials: "DC"
      }
    ]
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Three ways to start.",
    lede:
      "Clear starting points. Final scope and timeline are agreed in writing before any work begins.",
    buttonLabel: "Start a project",
    plans: [
      {
        name: "Launch",
        price: "$1,500+",
        period: "one-off",
        description: "For a first professional website or a small internal tool.",
        features: [
          "Responsive website",
          "Content you can edit yourself",
          "SEO foundation",
          "Contact and enquiry workflow"
        ]
      },
      {
        name: "Growth",
        price: "$4,500+",
        period: "one-off",
        description: "For teams building a portal, dashboard, or daily operations platform.",
        features: [
          "Next.js front end",
          "Laravel API and database",
          "Admin dashboard",
          "Client portal",
          "Deployment and handover"
        ],
        highlighted: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "scoped",
        description: "For ERP, POS, inventory, CRM, HR, and multi-module platforms.",
        features: [
          "Modules designed around your process",
          "Role and permission model",
          "Advanced reporting",
          "Training and support agreement"
        ]
      }
    ]
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions before you commit.",
    lede: "Straight answers about scope, timeline, and what happens after launch.",
    items: [
      {
        question: "Do you build both the website and the backend system?",
        answer:
          "Yes. We deliver the public website, admin dashboard, secure API, client portal, database design, deployment, and the support workflow around them — from one team."
      },
      {
        question: "Do you handle POS, inventory, ERP, and CRM projects?",
        answer:
          "Those are our core areas. Each one ships with modules for users, roles, branches, stock, sales, invoices, reports, and support tickets, shaped around how your business already works."
      },
      {
        question: "Can the design match our own brand?",
        answer:
          "Yes. Colours, typography, wording, imagery, motion, forms, and page structure are all adjusted to your brand — we do not resell a fixed template."
      },
      {
        question: "What happens after the system goes live?",
        answer:
          "Bug fixes, hosting guidance, monitoring, staff training, content updates, and new features. You work with the same engineers who built the system."
      }
    ]
  },

  cta: {
    eyebrow: "Contact",
    title: "Tell us what your next system needs to do.",
    lede:
      "Send a short brief. We reply within one business day with clear next steps and a realistic budget range.",
    button: "Start a project",
    secondary: "hello@rvstrustsolutions.com",
    details: [
      { label: "Email", value: "hello@rvstrustsolutions.com", href: "mailto:hello@rvstrustsolutions.com" },
      { label: "Phone", value: "+855 12 345 678", href: "tel:+85512345678" },
      { label: "Hours", value: "Mon–Fri, 9:00–18:00 ICT" },
      { label: "Studio", value: "Phnom Penh, Cambodia" }
    ]
  }
};
