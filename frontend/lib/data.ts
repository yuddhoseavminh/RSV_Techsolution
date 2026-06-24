import {
  BadgeCheck,
  Boxes,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Handshake,
  Layers3,
  LineChart,
  MonitorSmartphone,
  PackageCheck,
  PanelTop,
  ScrollText,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  UsersRound,
  Workflow
} from "lucide-react";
import type { BlogPost, NavigationItem, Project, Service } from "@/types";

export const siteConfig = {
  name: "KT Solution",
  headline: "Transform Your Business with Smart Digital Solutions",
  subheadline:
    "Custom Software, Web Applications, Mobile Apps, and Enterprise Systems Built for Growth",
  email: "hello@ktsolution.com",
  phone: "+855 12 345 678",
  address: "Phnom Penh, Cambodia"
};

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export const services: Service[] = [
  {
    title: "Web Development",
    slug: "web-development",
    description: "High-performance marketing sites, dashboards, portals, and business web applications.",
    benefits: ["Fast loading", "SEO-ready", "Scalable architecture"],
    technologies: ["Next.js", "Laravel", "Tailwind CSS"],
    icon: Code2
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    description: "Cross-platform mobile applications connected to secure APIs and operational workflows.",
    benefits: ["iOS and Android", "Push notifications", "Offline-ready flows"],
    technologies: ["Flutter", "React Native", "Sanctum API"],
    icon: Smartphone
  },
  {
    title: "POS System",
    slug: "pos-system",
    description: "Point-of-sale software for sales, receipts, cashier roles, stock control, and reporting.",
    benefits: ["Branch management", "Barcode support", "Daily closing reports"],
    technologies: ["Laravel", "MySQL", "Thermal printer"],
    icon: ShoppingCart
  },
  {
    title: "Inventory System",
    slug: "inventory-system",
    description: "Inventory control for purchasing, transfers, stock counts, suppliers, and warehouses.",
    benefits: ["Low-stock alerts", "Purchase orders", "Warehouse tracking"],
    technologies: ["Laravel", "MySQL", "REST API"],
    icon: Boxes
  },
  {
    title: "ERP System",
    slug: "erp-system",
    description: "Integrated finance, sales, operations, procurement, and management reporting modules.",
    benefits: ["Unified data", "Role access", "Workflow automation"],
    technologies: ["Laravel", "MySQL", "Queues"],
    icon: Workflow
  },
  {
    title: "CRM System",
    slug: "crm-system",
    description: "Lead, customer, sales pipeline, communication, and follow-up management tools.",
    benefits: ["Lead tracking", "Pipeline visibility", "Customer history"],
    technologies: ["Next.js", "Laravel", "MySQL"],
    icon: UsersRound
  },
  {
    title: "HR Management System",
    slug: "hr-management-system",
    description: "Employee records, attendance, leave, payroll, and document management.",
    benefits: ["Payroll-ready", "Attendance insights", "Self-service portal"],
    technologies: ["Laravel", "MySQL", "Reports"],
    icon: BadgeCheck
  },
  {
    title: "School Management System",
    slug: "school-management-system",
    description: "Student, teacher, attendance, billing, grading, and parent communication workflows.",
    benefits: ["Student profiles", "Attendance", "Academic reports"],
    technologies: ["Laravel", "Next.js", "MySQL"],
    icon: GraduationCap
  },
  {
    title: "Custom Software Development",
    slug: "custom-software-development",
    description: "Tailored systems for unique business processes, integrations, and reporting needs.",
    benefits: ["Discovery-led scope", "Maintainable code", "Long-term support"],
    technologies: ["Laravel", "Next.js", "Cloud"],
    icon: Settings
  }
];

export const stats = [
  { label: "Projects Delivered", value: "120+" },
  { label: "Business Systems", value: "35+" },
  { label: "Client Satisfaction", value: "98%" },
  { label: "Support Coverage", value: "24/7" }
];

export const whyChooseUs = [
  {
    title: "Enterprise Architecture",
    description: "Clean API boundaries, clear permissions, scalable database design, and maintainable code.",
    icon: Layers3
  },
  {
    title: "Security First",
    description: "Sanctum authentication, role permissions, audit-friendly workflows, and careful data access.",
    icon: ShieldCheck
  },
  {
    title: "Business Reporting",
    description: "Operational dashboards, revenue views, project progress, and data your team can act on.",
    icon: LineChart
  },
  {
    title: "Long-Term Partner",
    description: "We support planning, delivery, deployment, training, and iteration after launch.",
    icon: Handshake
  }
];

export const technologies = [
  "Laravel",
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "MySQL",
  "Sanctum",
  "Framer Motion",
  "Flutter",
  "AWS",
  "Docker",
  "REST APIs"
];

export const projects: Project[] = [
  {
    title: "Retail POS Suite",
    category: "POS",
    description: "Multi-branch POS with inventory, barcode scanning, cashier roles, and sales reports.",
    client: "Acme Retail",
    technologies: ["Laravel", "Next.js", "MySQL"],
    status: "Active",
    progress: 62
  },
  {
    title: "School Operations Portal",
    category: "ERP",
    description: "Student records, attendance, billing, grading, and parent communication dashboard.",
    client: "Bright Academy",
    technologies: ["Laravel", "React", "MySQL"],
    status: "Delivered",
    progress: 100
  },
  {
    title: "Logistics Inventory Control",
    category: "Inventory",
    description: "Warehouse stock, purchasing, transfers, and low-stock reporting for a logistics company.",
    client: "Metro Supply",
    technologies: ["Laravel", "REST API", "MySQL"],
    status: "Review",
    progress: 86
  },
  {
    title: "Construction CRM",
    category: "Website",
    description: "Lead capture, sales pipeline, proposal tracking, and client portal workflows.",
    client: "BuildPro",
    technologies: ["Next.js", "Laravel", "Tailwind"],
    status: "Planning",
    progress: 24
  },
  {
    title: "Field Service Mobile App",
    category: "Mobile App",
    description: "Technician scheduling, job status, photo evidence, and customer sign-off flows.",
    client: "ServiceLink",
    technologies: ["Flutter", "Laravel API", "Sanctum"],
    status: "Active",
    progress: 48
  }
];

export const posts: BlogPost[] = [
  {
    title: "How Custom Software Reduces Manual Work",
    category: "Digital Transformation",
    excerpt: "A practical look at turning repetitive business workflows into reliable software systems.",
    tags: ["Automation", "Operations"],
    date: "Jun 18, 2026"
  },
  {
    title: "Planning a POS System for Multi-Branch Retail",
    category: "POS",
    excerpt: "The modules, roles, reports, and hardware integrations to consider before development.",
    tags: ["Retail", "Inventory"],
    date: "Jun 10, 2026"
  },
  {
    title: "Laravel API Patterns for Enterprise Systems",
    category: "Engineering",
    excerpt: "How clean resources, policies, and role permissions keep business APIs maintainable.",
    tags: ["Laravel", "Architecture"],
    date: "May 28, 2026"
  }
];

export const testimonials = [
  {
    quote:
      "KT Solution helped us replace spreadsheets with a clean POS and inventory system that our team actually enjoys using.",
    name: "Sokha Lim",
    role: "Operations Director, Acme Retail"
  },
  {
    quote:
      "The project dashboard gave our managers real visibility into support tickets, invoices, and rollout progress.",
    name: "Dara Chea",
    role: "Managing Partner, Metro Supply"
  },
  {
    quote:
      "They understood the business process first, then built software around how our school really works.",
    name: "Malis Chan",
    role: "Principal, Bright Academy"
  }
];

export const companyValues = [
  { title: "Clarity", description: "We make scope, timelines, workflows, and tradeoffs visible from the start." },
  { title: "Reliability", description: "We build systems that teams can depend on every day." },
  { title: "Craft", description: "We care about interface quality, code quality, and operational detail." },
  { title: "Partnership", description: "We stay close after launch with support, iteration, and training." }
];

export const team = [
  { name: "Rithy Sok", role: "Solution Architect", focus: "Enterprise systems and API design" },
  { name: "Nita Vann", role: "Product Designer", focus: "Dashboards, portals, and workflows" },
  { name: "Vicheka Hun", role: "Full-Stack Engineer", focus: "Laravel, Next.js, and integrations" }
];

export const timeline = [
  { year: "2019", title: "Company Founded", description: "KT Solution began building websites and custom software for local businesses." },
  { year: "2021", title: "Business Systems Practice", description: "Expanded into POS, inventory, school, HR, and management systems." },
  { year: "2024", title: "Enterprise API Platform", description: "Standardized secure Laravel APIs and modern React dashboards." },
  { year: "2026", title: "Client Portal Launch", description: "Introduced project tracking, invoices, support tickets, and notifications." }
];

export const adminModules = [
  { title: "Users", href: "/admin/users", icon: UsersRound, count: "1,248" },
  { title: "Roles", href: "/admin/roles", icon: ShieldCheck, count: "3" },
  { title: "Permissions", href: "/admin/permissions", icon: BadgeCheck, count: "12" },
  { title: "Projects", href: "/admin/projects", icon: PanelTop, count: "86" },
  { title: "Services", href: "/admin/services", icon: PackageCheck, count: "9" },
  { title: "Portfolio", href: "/admin/portfolio", icon: MonitorSmartphone, count: "42" },
  { title: "Blog", href: "/admin/blog", icon: ScrollText, count: "128" },
  { title: "Contacts", href: "/admin/contacts", icon: BrainCircuit, count: "314" },
  { title: "Tickets", href: "/admin/tickets", icon: ShieldCheck, count: "27" },
  { title: "Invoices", href: "/admin/invoices", icon: Database, count: "$84k" },
  { title: "Settings", href: "/admin/settings", icon: Cloud, count: "SEO" }
];

export const dashboardRows = [
  ["Retail POS Suite", "Acme Retail", "Active", "62%"],
  ["School Operations Portal", "Bright Academy", "Delivered", "100%"],
  ["Inventory Control", "Metro Supply", "Review", "86%"],
  ["Construction CRM", "BuildPro", "Planning", "24%"]
];
