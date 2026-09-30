export interface HeroContent {
  badge: string;
  title: string;
  lede: string;
  ctaPrimary: string;
  ctaSecondary: string;
  proof: string;
  image: { src: string; alt: string; caption: string };
}

export interface LogoStripContent {
  label: string;
  names: string[];
}

export interface CapabilityItem {
  title: string;
  body: string;
}

export interface CapabilitiesContent {
  eyebrow: string;
  title: string;
  lede: string;
  items: CapabilityItem[];
}

export interface ServicesContent {
  eyebrow: string;
  title: string;
  lede: string;
}

export interface WorkItem {
  title: string;
  category: string;
  description: string;
  outcome: string;
  client: string;
  technologies: string[];
}

export interface WorkContent {
  eyebrow: string;
  title: string;
  lede: string;
  items: WorkItem[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Quote {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface ProofContent {
  eyebrow: string;
  title: string;
  lede: string;
  stats: Stat[];
  quotes: Quote[];
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export interface PricingContent {
  eyebrow: string;
  title: string;
  lede: string;
  buttonLabel: string;
  plans: PricingPlan[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  lede: string;
  items: FaqItem[];
}

export interface CtaContent {
  eyebrow: string;
  title: string;
  lede: string;
  button: string;
  secondary: string;
  details: { label: string; value: string; href?: string }[];
}

export interface LandingContent {
  hero: HeroContent;
  logos: LogoStripContent;
  capabilities: CapabilitiesContent;
  services: ServicesContent;
  work: WorkContent;
  proof: ProofContent;
  pricing: PricingContent;
  faq: FaqContent;
  cta: CtaContent;
}
