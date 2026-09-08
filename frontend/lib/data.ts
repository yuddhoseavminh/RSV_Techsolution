import {
  BadgeCheck,
  Boxes,
  BrainCircuit,
  Building2,
  Cloud,
  Code2,
  Database,
  GraduationCap,
  Handshake,
  Layers3,
  LayoutDashboard,
  LineChart,
  MonitorSmartphone,
  PackageCheck,
  PanelTop,
  ScrollText,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Tags,
  Wrench,
  UsersRound,
  Workflow
} from "lucide-react";
import type { BlogPost, NavigationItem, Project, Service } from "@/types";

export const siteConfig = {
  name: "RVS Trust Solutions Cambodia",
  headline: "Trusted Technology Solutions for Growing Cambodian Businesses",
  subheadline:
    "Custom Software, Web Applications, Mobile Apps, and Enterprise Systems Built with Integrity",
  email: "hello@rvstrustsolutions.com",
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
      "RVS Trust Solutions Cambodia helped us replace spreadsheets with a clean POS and inventory system that our team actually enjoys using.",
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
  { title: "Trust", description: "We build every relationship around honesty, clear communication, and dependable delivery." },
  { title: "Quality", description: "We care about reliable systems, clean interfaces, maintainable code, and practical results." },
  { title: "Integrity", description: "We keep commitments visible and make technical decisions that protect the client long term." },
  { title: "Partnership", description: "We stay close after launch with support, iteration, training, and long-term collaboration." }
];

export const team = [
  { name: "Raj", role: "Co-Founder", focus: "Technology strategy and trusted client solutions" },
  { name: "Vun", role: "Co-Founder", focus: "Software delivery and operational systems" },
  { name: "Siev Meng", role: "Co-Founder", focus: "Product quality, support, and long-term partnerships" }
];

export const timeline = [
  { year: "Origin", title: "RVS Founded", description: "RVS Trust Solutions Cambodia was created through the close collaboration of Raj, Vun, and Siev Meng." },
  { year: "Identity", title: "Trust Solutions", description: "The name reflects a commitment to reliable technology solutions clients can trust." },
  { year: "Practice", title: "Business Systems Focus", description: "The team delivers websites, software platforms, POS, inventory, ERP, CRM, and mobile applications." },
  { year: "Growth", title: "Long-Term Client Partner", description: "RVS focuses on quality, integrity, and lasting relationships with every client." }
];

export const adminModules = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard, count: "Overview" },
  { title: "Users", href: "/admin/users", icon: UsersRound, count: "CRUD" },
  { title: "Roles", href: "/admin/roles", icon: ShieldCheck, count: "CRUD" },
  { title: "Permissions", href: "/admin/permissions", icon: BadgeCheck, count: "Read" },
  { title: "Clients", href: "/admin/clients", icon: Building2, count: "CRUD" },
  { title: "Projects", href: "/admin/projects", icon: PanelTop, count: "CRUD" },
  { title: "Service Categories", href: "/admin/service-categories", icon: Boxes, count: "CRUD" },
  { title: "Services", href: "/admin/services", icon: PackageCheck, count: "CRUD" },
  { title: "Technologies", href: "/admin/technologies", icon: Wrench, count: "CRUD" },
  { title: "Portfolio", href: "/admin/portfolio", icon: MonitorSmartphone, count: "CRUD" },
  { title: "Blog Categories", href: "/admin/blog-categories", icon: Tags, count: "CRUD" },
  { title: "Blog", href: "/admin/blog", icon: ScrollText, count: "CRUD" },
  { title: "Tags", href: "/admin/tags", icon: Tags, count: "CRUD" },
  { title: "Contacts", href: "/admin/contacts", icon: BrainCircuit, count: "Update" },
  { title: "Tickets", href: "/admin/tickets", icon: ShieldCheck, count: "Update" },
  { title: "Invoices", href: "/admin/invoices", icon: Database, count: "CRUD" },
  { title: "Settings", href: "/admin/settings", icon: Cloud, count: "Update" }
];

export const dashboardRows = [
  ["Retail POS Suite", "Acme Retail", "Active", "62%"],
  ["School Operations Portal", "Bright Academy", "Delivered", "100%"],
  ["Inventory Control", "Metro Supply", "Review", "86%"],
  ["Construction CRM", "BuildPro", "Planning", "24%"]
];
