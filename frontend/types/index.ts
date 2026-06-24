import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  slug: string;
  description: string;
  benefits: string[];
  technologies: string[];
  icon: LucideIcon;
};

export type Project = {
  title: string;
  category: "Website" | "Mobile App" | "POS" | "Inventory" | "ERP";
  description: string;
  client: string;
  technologies: string[];
  status?: string;
  progress?: number;
};

export type BlogPost = {
  title: string;
  category: string;
  excerpt: string;
  tags: string[];
  date: string;
};
