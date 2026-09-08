"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  Eye,
  Globe2,
  Headphones,
  Layers3,
  Mail,
  MapPin,
  MousePointer2,
  MoveRight,
  PanelTop,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  X,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { SiDocker, SiFlutter, SiLaravel, SiMysql, SiNextdotjs, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, services, siteConfig, technologies } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const fadeUp = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const featureCards: Array<{ title: string; description: string; icon: LucideIcon }> = [
  { title: "Strategy-led delivery", description: "Discovery, interface mapping, API planning, and release management shaped around your real workflow.", icon: Rocket },
  { title: "Secure portals", description: "Role-aware dashboards for projects, invoices, tickets, users, permissions, reports, and business data.", icon: ShieldCheck },
  { title: "Polished UX", description: "Responsive interfaces with clean motion, instant feedback, and practical views for daily operations.", icon: Zap },
  { title: "Cloud-ready architecture", description: "Laravel APIs, Next.js frontends, queues, clean data models, and maintainable deployment paths.", icon: Layers3 },
  { title: "Operational intelligence", description: "Live metrics, progress tracking, finance views, stock visibility, lead pipelines, and exportable reports.", icon: BarChart3 },
  { title: "Long-term support", description: "Launch training, monitoring, fixes, iteration, and a reliable partner after delivery.", icon: Headphones }
];

const trustedBrands = ["Acme Retail", "Bright Academy", "Metro Supply", "BuildPro", "ServiceLink", "Nexa Commerce", "Urban Clinic", "Prime Logistics"];

const serviceVisuals = [
  "from-blue-500/16 via-cyan-400/12 to-white",
  "from-cyan-400/16 via-violet-400/12 to-white",
  "from-violet-500/16 via-blue-500/12 to-white",
  "from-emerald-400/16 via-cyan-400/12 to-white",
  "from-amber-300/16 via-blue-400/12 to-white",
  "from-rose-300/16 via-violet-400/12 to-white"
];

const premiumStats = [
  { value: 120, suffix: "+", label: "Projects delivered", progress: 92 },
  { value: 35, suffix: "+", label: "Business systems launched", progress: 78 },
  { value: 98, suffix: "%", label: "Client satisfaction", progress: 98 },
  { value: 24, suffix: "/7", label: "Support coverage", progress: 86 }
];

const pricingPlans = [
  {
    name: "Launch",
    price: "$1.5k+",
    description: "For companies starting a premium website or small internal tool.",
    features: ["Responsive website", "CMS-ready structure", "SEO foundation", "Contact workflow"]
  },
  {
    name: "Growth",
    price: "$4.5k+",
    description: "For teams building portals, dashboards, and business operations.",
    features: ["Next.js frontend", "Laravel API", "Admin dashboard", "Client portal", "Deployment support"],
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For ERP, POS, inventory, CRM, HR, and multi-module platforms.",
    features: ["Custom modules", "Role permissions", "Advanced reporting", "Training and SLA"]
  }
];

const faqs = [
  ["Can RVS Trust Solutions Cambodia build both the website and backend system?", "Yes. The team can deliver the public website, admin dashboard, secure API, client portal, database model, deployment, and support workflow."],
  ["Do you support POS, inventory, ERP, and CRM projects?", "Yes. Those are core service areas, with modules for users, roles, branches, stock, sales, reports, invoices, support tickets, and operations."],
  ["Can the design be customized for my company brand?", "Yes. Colors, typography, content, images, animations, forms, dashboards, and page structure can be adjusted around your brand and business process."],
  ["What happens after launch?", "RVS Trust Solutions Cambodia can provide bug fixing, hosting guidance, monitoring, training, content updates, and new feature development after release."]
];

const testimonials = [
  ["RVS Trust Solutions Cambodia helped us replace manual spreadsheets with a clean system that gives our team instant visibility.", "Sokha Lim", "Operations Director", "SL"],
  ["The portal feels premium and practical. Our managers can track projects, invoices, and support without confusion.", "Dara Chea", "Managing Partner", "DC"],
  ["They understood the process first, then designed software around the way our school actually works.", "Malis Chan", "Principal", "MC"]
];

const techLogos: Array<{ label: string; icon: IconType }> = [
  { label: "Next.js", icon: SiNextdotjs },
  { label: "React", icon: SiReact },
  { label: "TypeScript", icon: SiTypescript },
  { label: "Tailwind", icon: SiTailwindcss },
  { label: "Laravel", icon: SiLaravel },
  { label: "Flutter", icon: SiFlutter },
  { label: "MySQL", icon: SiMysql },
  { label: "Docker", icon: SiDocker }
];

const portfolioCategories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

export function PremiumHomeExperience() {
  return (
    <>
      <ScrollProgress />
      <LoadingScreen />
      <AnimatedCursor />
      <HeroSection />
      <TrustedCompanies />
      <FeaturesSection />
      <ServicesSection />
      <StatisticsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <ContactSection />
      <BackToTop />
      <NewsletterPopup />
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });
  return <motion.div className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6]" style={{ scaleX }} />;
}

function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0F172A] dark:text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(16px)" }}
          transition={{ duration: 0.45 }}
        >
          <motion.div className="flex items-center gap-3" initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] text-xs font-black text-white shadow-[0_22px_70px_rgba(37,99,235,0.28)]">RVS</span>
            <span className="font-display text-lg font-semibold tracking-normal">{siteConfig.name}</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function AnimatedCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 rounded-full border border-[#2563EB]/45 mix-blend-multiply lg:block dark:border-[#06B6D4]/55 dark:mix-blend-screen"
      animate={{ x: position.x - 16, y: position.y - 16, scale: pressed ? 0.72 : 1 }}
      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.4 }}
    />
  );
}

function HeroSection() {
  const { isKhmer } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-8, 8]);
  const shapeX = useTransform(pointerX, [-0.5, 0.5], [-22, 22]);
  const shapeY = useTransform(pointerY, [-0.5, 0.5], [-16, 16]);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }
    gsap.to(sectionRef.current.querySelectorAll(".gsap-floating-shape"), {
      y: (index) => (index % 2 === 0 ? 18 : -18),
      x: (index) => (index % 2 === 0 ? -10 : 10),
      rotate: (index) => (index % 2 === 0 ? 5 : -5),
      duration: 4.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });
  }, []);

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  const metrics = [
    { label: isKhmer ? "ចំណូលអាជីវកម្ម" : "Revenue", value: "$48.2k", icon: TrendingUp },
    { label: isKhmer ? "គម្រោងសកម្ម" : "Projects", value: "32", icon: PanelTop },
    { label: isKhmer ? "សំបុត្រជំនួយ" : "Tickets", value: "18", icon: Bell }
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="premium-noise relative isolate overflow-hidden bg-[#F8FAFC] pt-24 text-[#0F172A] dark:bg-[#0F172A] dark:text-white lg:pt-28"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(6,182,212,0.08)_38%,rgba(139,92,246,0.12)_68%,rgba(248,250,252,0))] dark:bg-[linear-gradient(135deg,rgba(37,99,235,0.24),rgba(6,182,212,0.12)_38%,rgba(139,92,246,0.2)_68%,rgba(15,23,42,0))]" />
      <div className="premium-grid absolute inset-0 -z-10 opacity-70 dark:opacity-40" />
      <motion.div className="gsap-floating-shape absolute left-[6%] top-28 hidden h-20 w-20 rotate-12 rounded-lg border border-white/70 bg-white/45 shadow-soft backdrop-blur-xl md:block dark:border-white/10 dark:bg-white/8" style={{ x: shapeX, y: shapeY }} aria-hidden="true" />
      <motion.div className="gsap-floating-shape absolute right-[8%] top-36 hidden h-16 w-28 -rotate-6 rounded-lg border border-cyan-200/70 bg-cyan-100/45 shadow-soft backdrop-blur-xl lg:block dark:border-cyan-300/20 dark:bg-cyan-300/10" style={{ x: shapeY, y: shapeX }} aria-hidden="true" />
      <motion.div className="gsap-floating-shape absolute bottom-24 left-[45%] hidden h-14 w-14 rotate-45 rounded-lg border border-violet-200/80 bg-violet-100/45 shadow-soft backdrop-blur-xl xl:block dark:border-violet-300/20 dark:bg-violet-300/10" aria-hidden="true" />

      <div className="section-shell grid min-h-[86svh] items-center gap-12 pb-16 pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:pb-20">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.div variants={fadeUp}>
            <Badge className="mb-5 border-blue-200 bg-white/70 px-3 py-1.5 text-[#2563EB] shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              {isKhmer ? "ស្ទូឌីយោបច្ចេកវិទ្យាគួរឱ្យទុកចិត្ត" : "Trusted software studio"}
            </Badge>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-4xl font-black leading-[1.04] tracking-normal text-[#0F172A] sm:text-5xl md:text-6xl xl:text-7xl dark:text-white">
            {isKhmer ? "ដំណោះស្រាយបច្ចេកវិទ្យាគួរឱ្យទុកចិត្តសម្រាប់អាជីវកម្មកម្ពុជា" : siteConfig.headline}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
            {isKhmer
              ? "ការអភិវឌ្ឍកម្មវិធីតាមតម្រូវការ គេហទំព័រល្បឿនលឿន កម្មវិធីទូរស័ព្ទ POS, Inventory, ERP, CRM និងប្រព័ន្ធសហគ្រាស បង្កើតឡើងដោយភាពស្មោះត្រង់ និងគុណភាពខ្ពស់។"
              : `${siteConfig.subheadline}. Build elegant websites, portals, POS, inventory, ERP, CRM, and mobile apps with a fast, secure, premium experience.`}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticButton href="/contact" className="bg-[#2563EB] text-white shadow-[0_18px_50px_rgba(37,99,235,0.28)] hover:bg-blue-700">
              {isKhmer ? "ចាប់ផ្តើមគម្រោង" : "Start a Project"}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="#portfolio" className="border border-slate-200 bg-white/80 text-slate-950 backdrop-blur hover:border-blue-200 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15">
              {isKhmer ? "មើលស្នាដៃការងារ" : "View Portfolio"}
              <ExternalLink className="h-4 w-4" />
            </MagneticButton>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {["Next.js", "Laravel", "Mobile"].map((label) => (
              <div key={label} className="rounded-lg border border-white/70 bg-white/65 px-4 py-3 text-center text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:text-slate-200">
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.94, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
        >
          <div className="relative overflow-hidden rounded-lg border border-white/70 bg-white/75 p-3 shadow-[0_34px_120px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/8 dark:shadow-[0_34px_120px_rgba(0,0,0,0.38)]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-950">
              <Image src="/images/kt-hero.png" alt="RVS Trust Solutions Cambodia software dashboard preview" fill priority className="object-cover opacity-90" sizes="(min-width: 1024px) 52vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/18 via-transparent to-blue-950/35" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-white/15 bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur-xl sm:left-6 sm:top-6">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                {isKhmer ? "ប្រតិបត្តិការជាក់ស្តែង" : "Live operations"}
              </div>
              <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:bottom-6 sm:left-6 sm:right-6 sm:grid-cols-3">
                {metrics.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="rounded-lg border border-white/15 bg-white/16 p-4 text-white shadow-lg backdrop-blur-xl">
                    <Icon className="mb-3 h-4 w-4 text-cyan-200" />
                    <p className="text-xs text-white/70">{label}</p>
                    <p className="mt-1 text-xl font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="section-shell flex items-center justify-center pb-6">
        <motion.a
          href="#trusted"
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-xs font-semibold text-slate-500 shadow-sm backdrop-blur transition hover:text-[#2563EB] dark:border-white/10 dark:bg-white/8 dark:text-slate-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <MousePointer2 className="h-3.5 w-3.5" />
          {isKhmer ? "រំកិលចុះ" : "Scroll"}
        </motion.a>
      </div>
    </section>
  );
}

function TrustedCompanies() {
  const { isKhmer } = useLanguage();
  const brandTrack = [...trustedBrands, ...trustedBrands];

  return (
    <section id="trusted" className="border-y border-slate-200/80 bg-white py-10 dark:border-white/10 dark:bg-slate-950">
      <div className="section-shell">
        <motion.p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          {isKhmer ? "ជឿទុកចិត្តដោយក្រុមការងារ និងអាជីវកម្មឈានមុខ" : "Trusted by teams modernizing operations"}
        </motion.p>
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex min-w-max items-center gap-4">
            {brandTrack.map((brand, index) => (
              <div key={`${brand}-${index}`} className="flex h-16 min-w-48 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-6 text-sm font-bold text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/6 dark:text-slate-300">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { isKhmer } = useLanguage();

  const khmerFeatureTitles: Record<string, string> = {
    "High-Impact Landing Pages": "ទំព័រដើមទាក់ទាញ និងល្បឿនលឿន",
    "Enterprise Admin Portal": "ផ្ទាំងគ្រប់គ្រងសហគ្រាសពេញលេញ",
    "Role-Based Access": "ការកំណត់សិទ្ធិអ្នកប្រើប្រាស់ច្បាស់លាស់",
    "Scalable Architecture": "ស្ថាបត្យកម្មបច្ចេកវិទ្យាទំហំធំ",
    "Real-time Ready": "ប្រព័ន្ធដំណើរការផ្ទាល់ Real-Time",
    "Bilingual & Global Ready": "គាំទ្រពីរភាសា ខ្មែរ និងអង់គ្លេស"
  };

  const khmerFeatureDesc: Record<string, string> = {
    "High-Impact Landing Pages": "គេហទំព័របង្ហាញផលិតផល និងសេវាកម្មដែលទាក់ទាញ ផ្ទុកទិន្នន័យលឿន និង SEO ល្អបំផុត។",
    "Enterprise Admin Portal": "គ្រប់គ្រងទិន្នន័យ របាយការណ៍ គណនី និងប្រតិបត្តិការអាជីវកម្មនៅកន្លែងតែមួយ។",
    "Role-Based Access": "គ្រប់គ្រងសិទ្ធិអ្នកគ្រប់គ្រង បុគ្គលិក និងអតិថិជនប្រកបដោយសុវត្ថិភាពខ្ពស់។",
    "Scalable Architecture": "បង្កើតឡើងដោយ Next.js, Laravel និង Database ស្តង់ដារសកល ងាយស្រួលពង្រីក។",
    "Real-time Ready": "ការជូនដំណឹងផ្ទាល់ ការធ្វើបច្ចុប្បន្នភាពទិន្នន័យភ្លាមៗ និងការតាមដានរលូន។",
    "Bilingual & Global Ready": "ប្តូរភាសាខ្មែរ និងអង់គ្លេសបានភ្លាមៗ ស័ក្តិសមសម្រាប់ទីផ្សារក្នុងស្រុក និងអន្តរជាតិ។"
  };

  return (
    <section id="features" className="bg-[#F8FAFC] py-20 text-[#0F172A] dark:bg-[#0F172A] dark:text-white lg:py-28">
      <div className="section-shell">
        <SectionIntro
          eyebrow={isKhmer ? "លក្ខណៈពិសេស" : "Features"}
          title={isKhmer ? "បទពិសោធន៍ប្រព័ន្ធ SaaS ទំនើបសម្រាប់អាជីវកម្មឈានមុខ" : "A polished SaaS experience for serious business systems"}
          description={isKhmer ? "គ្រប់ទំព័រ ផតថលអតិថិជន និងការងារគ្រប់គ្រងត្រូវបានបង្កើតឡើងសម្រាប់ភាពច្បាស់លាស់ ល្បឿនលឿន និងទំនុកចិត្ត។" : "Every public page, client portal, and admin workflow is shaped for clarity, speed, and confidence."}
        />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-90px" }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            const title = isKhmer && khmerFeatureTitles[feature.title] ? khmerFeatureTitles[feature.title] : feature.title;
            const description = isKhmer && khmerFeatureDesc[feature.title] ? khmerFeatureDesc[feature.title] : feature.description;
            return (
              <motion.div key={feature.title} variants={fadeUp} whileHover={{ y: -8, scale: 1.01 }} className="group relative overflow-hidden rounded-lg border border-white/70 bg-white/72 p-6 shadow-soft backdrop-blur-2xl transition dark:border-white/10 dark:bg-white/8">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] text-white shadow-[0_16px_40px_rgba(37,99,235,0.2)] transition group-hover:rotate-6">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-bold tracking-normal">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { isKhmer } = useLanguage();

  const khmerServiceTitles: Record<string, string> = {
    "Custom Web Applications": "កម្មវិធីគេហទំព័រតាមតម្រូវការ",
    "Enterprise Admin Dashboards": "ផ្ទាំងគ្រប់គ្រងសហគ្រាស",
    "API & Backend Architecture": "ស្ថាបត្យកម្ម API និង Backend",
    "Mobile Application Delivery": "ការបង្កើតកម្មវិធីទូរស័ព្ទ",
    "POS & Retail Workflows": "ប្រព័ន្ធលក់ POS & ស្តុកទំនិញ",
    "Business Process Automation": "ស្វ័យប្រវត្តិកម្មអាជីវកម្ម"
  };

  return (
    <section id="services" className="relative overflow-hidden bg-white py-20 text-[#0F172A] dark:bg-slate-950 dark:text-white lg:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,0.08),transparent_32%,rgba(6,182,212,0.08)_58%,transparent)] dark:bg-[linear-gradient(120deg,rgba(37,99,235,0.16),transparent_32%,rgba(6,182,212,0.1)_58%,transparent)]" />
      <div className="section-shell relative">
        <SectionIntro
          eyebrow={isKhmer ? "សេវាកម្មរបស់យើង" : "Services"}
          title={isKhmer ? "ប្រព័ន្ធទំនើបសម្រាប់គេហទំព័រ ផតថល កម្មវិធី និងប្រតិបត្តិការ" : "Modern systems for websites, portals, apps, and operations"}
          description={isKhmer ? "ដៃគូបច្ចេកវិទ្យាពេញលេញសម្រាប់ឧបករណ៍ដែលក្រុមរបស់អ្នកត្រូវការដើម្បីលក់ គ្រប់គ្រង ធ្វើរបាយការណ៍ និងពង្រីក។" : "A complete software partner for the tools your team needs to sell, manage, report, and scale."}
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.slice(0, 6).map((service, index) => {
            const Icon = service.icon;
            const displayTitle = isKhmer && khmerServiceTitles[service.title] ? khmerServiceTitles[service.title] : service.title;
            return (
              <motion.article key={service.slug} className="group perspective-1000" initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-90px" }} transition={{ duration: 0.48, delay: index * 0.05 }}>
                <div className="h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_28px_90px_rgba(37,99,235,0.14)] dark:border-white/10 dark:bg-white/8">
                  <div className={cn("relative h-44 overflow-hidden bg-gradient-to-br", serviceVisuals[index % serviceVisuals.length])}>
                    <Image src="/images/kt-hero.png" alt={`${service.title} interface preview`} fill className="object-cover opacity-45 transition duration-700 group-hover:scale-110 dark:opacity-35" sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw" />
                    <div className="absolute inset-0 bg-white/28 dark:bg-slate-950/35" />
                    <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-lg bg-white text-[#2563EB] shadow-soft transition group-hover:rotate-6 dark:bg-slate-950 dark:text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold tracking-normal">{displayTitle}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.technologies.map((technology) => (
                        <span key={technology} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-white/8 dark:text-slate-300">
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatisticsSection() {
  const { isKhmer } = useLanguage();

  const statLabelsKhmer: Record<string, string> = {
    "Faster Implementation": "ការអនុវត្តរហ័សជាងមុន",
    "Uptime Reliability": "ភាពជឿជាក់ប្រព័ន្ធដំណើរការ",
    "Client Satisfaction": "ការពេញចិត្តពីអតិថិជន",
    "Delivered Modules": "ម៉ូឌុលដែលបានប្រគល់ជូន"
  };

  return (
    <section id="stats" className="bg-[#0F172A] py-20 text-white lg:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <SectionIntro
              eyebrow={isKhmer ? "ស្ថិតិ និងលទ្ធផល" : "Statistics"}
              title={isKhmer ? "បង្កើតឡើងសម្រាប់លទ្ធផលអាជីវកម្មជាក់ស្តែង" : "Built for measurable business outcomes"}
              description={isKhmer ? "ប្រសិទ្ធភាពមានសារៈសំខាន់លើផលិតផលទាំងមូល៖ ល្បឿនទំព័រ ភាពច្បាស់លាស់នៃផ្ទាំងគ្រប់គ្រង ភាពត្រឹមត្រូវនៃរបាយការណ៍ និងការគាំទ្ររហ័ស។" : "Performance matters across the whole product: page speed, dashboard clarity, reporting accuracy, and support response."}
              align="left"
              dark
            />
            <div className="mt-6 grid gap-3">
              {[
                isKhmer ? "ស្ថាបត្យកម្មផ្ទុកល្បឿនលឿន" : "Fast loading architecture",
                isKhmer ? "ចំណុចប្រទាក់ឆ្លើយតបងាយស្រួលប្រើ" : "Accessible responsive UI",
                isKhmer ? "លំហូរការងារសុវត្ថិភាពខ្ពស់" : "Secure role-based workflows"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                  <Check className="h-4 w-4 text-cyan-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {premiumStats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.94, y: 18 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.46, delay: index * 0.06 }} className="rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
                <p className="font-display text-4xl font-black tracking-normal">
                  <CountNumber target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-slate-300">{isKhmer && statLabelsKhmer[stat.label] ? statLabelsKhmer[stat.label] : stat.label}</p>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6]" initial={{ width: 0 }} whileInView={{ width: `${stat.progress}%` }} viewport={{ once: true }} transition={{ duration: 1.05, ease: "easeOut", delay: 0.15 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const { isKhmer } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const filteredProjects = useMemo(() => projects.filter((project) => activeCategory === "All" || project.category === activeCategory), [activeCategory]);

  return (
    <section id="portfolio" className="bg-[#F8FAFC] py-20 text-[#0F172A] dark:bg-[#0F172A] dark:text-white lg:py-28">
      <div className="section-shell">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow={isKhmer ? "ស្នាដៃការងារ" : "Portfolio"}
            title={isKhmer ? "ស្នាដៃការងារជ្រើសរើសជាមួយការបង្ហាញផ្ទាល់" : "Selected work with interactive previews"}
            description={isKhmer ? "ប្រព័ន្ធអាជីវកម្មរចនាឡើងសម្រាប់ក្រុមការងារជាក់ស្តែង ប្រតិបត្តិការផ្ទាល់ និងការថែទាំយូរអង្វែង។" : "Business systems designed for real teams, live operations, and long-term maintainability."}
            align="left"
          />
          <div className="flex flex-wrap gap-2">
            {portfolioCategories.map((category) => (
              <button key={category} type="button" onClick={() => setActiveCategory(category)} className={cn("rounded-lg border px-4 py-2 text-sm font-semibold transition", activeCategory === category ? "border-[#2563EB] bg-[#2563EB] text-white shadow-[0_16px_40px_rgba(37,99,235,0.22)]" : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-[#2563EB] dark:border-white/10 dark:bg-white/8 dark:text-slate-300")}>
                {category === "All" ? (isKhmer ? "ទាំងអស់" : "All") : category}
              </button>
            ))}
          </div>
        </div>
        <motion.div layout className="columns-1 gap-5 md:columns-2 xl:columns-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article key={project.title} layout initial={{ opacity: 0, scale: 0.92, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 18 }} transition={{ duration: 0.35, delay: index * 0.03 }} className="group mb-5 break-inside-avoid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft dark:border-white/10 dark:bg-white/8">
                <button type="button" onClick={() => setSelectedProject(project)} className="block w-full text-left">
                  <div className={cn("relative overflow-hidden", index % 2 === 0 ? "h-72" : "h-56")}>
                    <Image src="/images/kt-hero.png" alt={`${project.title} project preview`} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/18 to-transparent opacity-90" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <Badge className="mb-3 border-white/15 bg-white/15 text-white backdrop-blur">{project.category}</Badge>
                      <h3 className="font-display text-xl font-bold tracking-normal">{project.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-200">{project.description}</p>
                    </div>
                    <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg bg-white/15 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                      <Eye className="h-4 w-4" />
                    </div>
                  </div>
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div className="fixed inset-0 z-[85] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
            <motion.div className="w-full max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-white shadow-[0_30px_120px_rgba(0,0,0,0.36)] dark:bg-slate-950" initial={{ opacity: 0, scale: 0.92, y: 22 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 22 }} onClick={(event) => event.stopPropagation()}>
              <div className="relative h-72 bg-slate-900">
                <Image src="/images/kt-hero.png" alt={selectedProject.title} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <button type="button" onClick={() => setSelectedProject(null)} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg bg-white/14 text-white backdrop-blur transition hover:bg-white/24" aria-label="Close project preview">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
                <div>
                  <Badge className="mb-4">{selectedProject.category}</Badge>
                  <h3 className="font-display text-3xl font-black tracking-normal text-slate-950 dark:text-white">{selectedProject.title}</h3>
                  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{selectedProject.description}</p>
                </div>
                <div className="space-y-4 text-sm">
                  <MetaRow label={isKhmer ? "អតិថិជន" : "Client"} value={selectedProject.client} />
                  <MetaRow label={isKhmer ? "ស្ថានភាព" : "Status"} value={selectedProject.status ?? "Active"} />
                  <MetaRow label={isKhmer ? "វឌ្ឍនភាព" : "Progress"} value={`${selectedProject.progress ?? 100}%`} />
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((technology) => (
                      <span key={technology} className="rounded-lg bg-slate-100 px-3 py-1 font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function TestimonialsSection() {
  const { isKhmer } = useLanguage();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % testimonials.length), 4200);
    return () => window.clearInterval(timer);
  }, []);

  const [quote, name, role, initials] = testimonials[active];

  return (
    <section id="testimonials" className="bg-white py-20 text-[#0F172A] dark:bg-slate-950 dark:text-white lg:py-28">
      <div className="section-shell">
        <SectionIntro
          eyebrow={isKhmer ? "មតិអតិថិជន" : "Testimonials"}
          title={isKhmer ? "ការប្រគល់ការងារគុណភាពខ្ពស់ ជឿទុកចិត្តដោយដៃគូអាជីវកម្ម" : "Premium delivery trusted by practical operators"}
          description={isKhmer ? "មតិកែលម្អដ៏ល្អបំផុតបានមកពីក្រុមការងារដែលប្រើប្រាស់ប្រព័ន្ធជារៀងរាល់ថ្ងៃ។" : "The best feedback comes from teams who use the systems every day."}
        />
        <div className="mx-auto max-w-4xl">
          <div className="relative min-h-[310px] overflow-hidden rounded-lg border border-slate-200 bg-[#F8FAFC] p-6 shadow-soft dark:border-white/10 dark:bg-white/8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div key={name} initial={{ opacity: 0, x: 40, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={{ opacity: 0, x: -40, filter: "blur(8px)" }} transition={{ duration: 0.45 }}>
                <div className="mb-8 flex items-center justify-between gap-4">
                  <motion.div className="grid h-16 w-16 place-items-center rounded-lg bg-gradient-to-br from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] font-display text-lg font-black text-white shadow-[0_18px_50px_rgba(37,99,235,0.22)]" animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.03, 1] }} transition={{ duration: 2.4, repeat: Infinity }}>
                    {initials}
                  </motion.div>
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="font-display text-2xl font-bold leading-10 tracking-normal md:text-3xl">"{quote}"</p>
                <div className="mt-8">
                  <p className="font-bold">{name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-5 flex justify-center gap-2">
            {testimonials.map((item, index) => (
              <button key={item[1]} type="button" onClick={() => setActive(index)} className={cn("h-2.5 rounded-full transition-all", index === active ? "w-8 bg-[#2563EB]" : "w-2.5 bg-slate-300 dark:bg-white/20")} aria-label={`Show testimonial from ${item[1]}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const { isKhmer } = useLanguage();

  return (
    <section id="pricing" className="bg-[#F8FAFC] py-20 text-[#0F172A] dark:bg-[#0F172A] dark:text-white lg:py-28">
      <div className="section-shell">
        <SectionIntro
          eyebrow={isKhmer ? "តម្លៃ និងកញ្ចប់សេវា" : "Pricing"}
          title={isKhmer ? "កញ្ចប់តម្លៃសមរម្យសម្រាប់ដំណើរការកម្មវិធីអាជីវកម្មរបស់អ្នក" : "Flexible packages for serious software launches"}
          description={isKhmer ? "ចាប់ផ្តើមជាមួយទំហំសមស្រប រួចពង្រីកបន្ថែមនៅពេលដែលវេទិការបស់អ្នករីកចម្រើន។" : "Start with the right level of scope, then expand as your platform grows."}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.46, delay: index * 0.06 }} whileHover={{ y: -8 }} className={cn("relative overflow-hidden rounded-lg border bg-white p-6 shadow-soft dark:bg-white/8", plan.highlighted ? "border-transparent bg-gradient-to-br from-white via-white to-blue-50 ring-1 ring-[#2563EB]/30 dark:from-white/12 dark:via-white/8 dark:to-cyan-300/8" : "border-slate-200 dark:border-white/10")}>
              {plan.highlighted ? <span className="absolute right-5 top-5 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] px-3 py-1 text-xs font-bold text-white">{isKhmer ? "ពេញនិយម" : "Popular"}</span> : null}
              <h3 className="font-display text-xl font-bold tracking-normal">{plan.name}</h3>
              <p className="mt-3 min-h-14 text-sm leading-7 text-slate-600 dark:text-slate-300">{plan.description}</p>
              <div className="mt-7 font-display text-4xl font-black tracking-normal">{plan.price}</div>
              <div className="mt-7 grid gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Check className="h-4 w-4 text-cyan-500" />
                    {feature}
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 w-full rounded-lg">
                <Link href="/contact">
                  {isKhmer ? `ជ្រើសរើស ${plan.name}` : `Choose ${plan.name}`}
                  <MoveRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const { isKhmer } = useLanguage();
  const [open, setOpen] = useState(0);

  const khmerFaqs = [
    ["តើ RVS Trust Solutions Cambodia អាចអភិវឌ្ឍទាំងគេហទំព័រ និងប្រព័ន្ធគ្រប់គ្រងផ្ទៃក្នុង (Backend) បានទេ?", "បាទ/ចាស៎។ ក្រុមការងារយើងខ្ញុំអាចផ្តល់ជូននូវគេហទំព័រសាធារណៈ ផ្ទាំងគ្រប់គ្រង Admin ប្រព័ន្ធសុវត្ថិភាព API ផតថលអតិថិជន មូលដ្ឋានទិន្នន័យ ការដាក់ឱ្យដំណើរការលើ Server និងការគាំទ្របច្ចេកទេស។"],
    ["តើអ្នកមានសេវាកម្មប្រព័ន្ធ POS, គ្រប់គ្រងស្តុក, ERP និង CRM ដែរឬទេ?", "បាទ/ចាស៎។ ទាំងនេះជាសេវាកម្មស្នូលរបស់យើង ដែលមានម៉ូឌុលគ្រប់គ្រងអ្នកប្រើប្រាស់ សិទ្ធិ សាខា ស្តុកទំនិញ ការលក់ របាយការណ៍ វិក្កយបត្រ និងការគាំទ្រអតិថិជន។"],
    ["តើការរចនាអាចកែសម្រួលតាមអត្តសញ្ញាណម៉ាកយីហោរបស់ក្រុមហ៊ុនខ្ញុំបានទេ?", "បាទ/ចាស៎។ ពណ៌ អក្សរ ខ្លឹមសារ រូបភាព ចលនា ទម្រង់បែបបទ ផ្ទាំងគ្រប់គ្រង និងរចនាសម្ព័ន្ធទំព័រអាចបត់បែនតាមតម្រូវការអាជីវកម្មជាក់ស្តែង។"],
    ["តើមានសេវាកម្មអ្វីខ្លះបន្ទាប់ពីប្រព័ន្ធបានដាក់ឱ្យដំណើរការ?", "RVS Trust Solutions Cambodia ផ្តល់ការជួសជុលបញ្ហាបច្ចេកទេស ការណែនាំអំពី Hosting ការតាមដានសុវត្ថិភាព ការបណ្តុះបណ្តាល ការធ្វើបច្ចុប្បន្នភាព និងការអភិវឌ្ឍមុខងារបន្ថែម។"]
  ];

  const displayFaqs = isKhmer ? khmerFaqs : faqs;

  return (
    <section id="faq" className="bg-white py-20 text-[#0F172A] dark:bg-slate-950 dark:text-white lg:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
        <SectionIntro
          eyebrow={isKhmer ? "សំណួរញឹកញាប់" : "FAQ"}
          title={isKhmer ? "ចម្លើយច្បាស់លាស់មុនពេលចាប់ផ្តើមបង្កើតគម្រោង" : "Clear answers before your first build"}
          description={isKhmer ? "គម្រោងល្អចាប់ផ្តើមពីការយល់ដឹងរួមគ្នាអំពីទំហំការងារ ប្រព័ន្ធ ការគាំទ្រ និងការប្រគល់។" : "A good project starts with a shared understanding of scope, systems, support, and delivery."}
          align="left"
        />
        <div className="space-y-3">
          {displayFaqs.map(([question, answer], index) => (
            <motion.div key={question} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.42, delay: index * 0.04 }} className="overflow-hidden rounded-lg border border-slate-200 bg-[#F8FAFC] dark:border-white/10 dark:bg-white/8">
              <button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display font-bold tracking-normal">
                {question}
                <ChevronDown className={cn("h-4 w-4 shrink-0 transition", open === index && "rotate-180 text-[#2563EB]")} />
              </button>
              <AnimatePresence initial={false}>
                {open === index ? (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}>
                    <p className="px-5 pb-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { isKhmer } = useLanguage();

  return (
    <section id="contact" className="bg-[#F8FAFC] py-20 text-[#0F172A] dark:bg-[#0F172A] dark:text-white lg:py-28">
      <div className="section-shell">
        <SectionIntro
          eyebrow={isKhmer ? "ទំនាក់ទំនង" : "Contact"}
          title={isKhmer ? "ប្រាប់យើងពីតម្រូវការប្រព័ន្ធបន្ទាប់របស់អ្នក" : "Tell us what your next system needs to do"}
          description={isKhmer ? "ផ្ញើសេចក្តីសង្ខេបគម្រោងរបស់អ្នក ហើយ RVS Trust Solutions Cambodia នឹងជួយរៀបចំកំណែដំបូងជាក់ស្តែង។" : "Send a short brief and RVS Trust Solutions Cambodia will help shape the first practical version."}
        />
        <div className="grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_30px_100px_rgba(15,23,42,0.1)] dark:border-white/10 dark:bg-white/8 lg:grid-cols-[1.05fr_0.95fr]">
          <form className="grid gap-5 p-6 sm:p-8">
            <FloatingInput id="name" label={isKhmer ? "ឈ្មោះពេញ" : "Full name"} />
            <FloatingInput id="email" label={isKhmer ? "អ៊ីមែល" : "Email address"} type="email" />
            <FloatingInput id="company" label={isKhmer ? "ក្រុមហ៊ុន / ស្ថាប័ន" : "Company"} />
            <FloatingTextarea id="message" label={isKhmer ? "សារ ឬព័ត៌មានគម្រោង" : "Project message"} />
            <Button type="button" size="lg" className="rounded-lg">
              {isKhmer ? "ផ្ញើសារ" : "Send Message"}
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="relative min-h-[430px] overflow-hidden bg-slate-950 p-6 text-white sm:p-8">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.24),rgba(6,182,212,0.16),rgba(139,92,246,0.2))]" />
            <div className="map-grid absolute inset-0 opacity-35" />
            <motion.div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg bg-white text-[#2563EB] shadow-[0_24px_90px_rgba(6,182,212,0.4)]" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <MapPin className="h-7 w-7" />
            </motion.div>
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <Badge className="mb-4 border-white/15 bg-white/15 text-white backdrop-blur">{isKhmer ? "រាជធានីភ្នំពេញ ប្រទេសកម្ពុជា" : "Phnom Penh, Cambodia"}</Badge>
                <h3 className="font-display text-3xl font-black tracking-normal">
                  {isKhmer ? "ត្រៀមខ្លួនរួចរាល់សម្រាប់ការគាំទ្រក្នុងស្រុក និងគុណភាពលំដាប់អន្តរជាតិ។" : "Ready for local support and global-quality delivery."}
                </h3>
              </div>
              <div className="grid gap-3 text-sm text-slate-200">
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-cyan-200" />
                  {siteConfig.email}
                </span>
                <span className="flex items-center gap-3">
                  <Globe2 className="h-4 w-4 text-cyan-200" />
                  {isKhmer ? "គេហទំព័រ ផតថល SaaS, ERP, POS, CRM, កម្មវិធីទូរស័ព្ទ" : "Websites, portals, SaaS, ERP, POS, CRM, mobile apps"}
                </span>
                <span className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 text-cyan-200" />
                  {isKhmer ? "ឆ្លើយតបរហ័ស និងការគាំទ្របន្តជាប់ជានិច្ច" : "Fast project response and ongoing support"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, description, align = "center", dark = false }: { eyebrow: string; title: string; description: string; align?: "left" | "center"; dark?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-90px" }} transition={{ duration: 0.48 }} className={cn("mb-12 max-w-3xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <p className={cn("text-xs font-black uppercase tracking-[0.22em]", dark ? "text-cyan-200" : "text-[#2563EB] dark:text-cyan-200")}>{eyebrow}</p>
      <h2 className={cn("mt-4 font-display text-3xl font-black leading-tight tracking-normal md:text-5xl", dark ? "text-white" : "text-[#0F172A] dark:text-white")}>{title}</h2>
      <p className={cn("mt-5 text-base leading-8", dark ? "text-slate-300" : "text-slate-600 dark:text-slate-300")}>{description}</p>
    </motion.div>
  );
}

function CountNumber({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        let frame = 0;
        const totalFrames = 70;
        const tick = () => {
          frame += 1;
          setValue(Math.round(target * (1 - Math.pow(1 - frame / totalFrames, 3))));
          if (frame < totalFrames) {
            window.requestAnimationFrame(tick);
          }
        };
        tick();
        observer.disconnect();
      },
      { threshold: 0.45 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function MagneticButton({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    gsap.to(event.currentTarget, {
      x: (event.clientX - rect.left - rect.width / 2) * 0.18,
      y: (event.clientY - rect.top - rect.height / 2) * 0.22,
      duration: 0.28,
      ease: "power3.out"
    });
  }

  function handleMouseLeave() {
    if (ref.current) {
      gsap.to(ref.current, { x: 0, y: 0, duration: 0.38, ease: "elastic.out(1, 0.45)" });
    }
  }

  return (
    <Link ref={ref} href={href} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={cn("button-ripple inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-lg px-6 text-sm font-bold transition", className)}>
      {children}
    </Link>
  );
}

function FloatingInput({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <label htmlFor={id} className="group relative block">
      <input id={id} type={type} placeholder=" " className="peer h-14 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 pt-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-[#2563EB] focus:bg-white dark:border-white/10 dark:bg-white/8 dark:text-white dark:focus:bg-white/12" />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500 transition peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#2563EB] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400">{label}</span>
    </label>
  );
}

function FloatingTextarea({ id, label }: { id: string; label: string }) {
  return (
    <label htmlFor={id} className="group relative block">
      <textarea id={id} placeholder=" " rows={5} className="peer w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-4 pt-7 text-sm font-semibold text-slate-950 outline-none transition focus:border-[#2563EB] focus:bg-white dark:border-white/10 dark:bg-white/8 dark:text-white dark:focus:bg-white/12" />
      <span className="pointer-events-none absolute left-4 top-6 text-sm font-semibold text-slate-500 transition peer-focus:top-3 peer-focus:text-xs peer-focus:text-[#2563EB] peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400">{label}</span>
    </label>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 dark:border-white/10">
      <span className="font-semibold text-slate-500 dark:text-slate-400">{label}</span>
      <span className="font-bold text-slate-950 dark:text-white">{value}</span>
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-lg bg-[#2563EB] text-white shadow-[0_18px_50px_rgba(37,99,235,0.35)]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} aria-label="Back to top">
          <ArrowRight className="-rotate-90 h-4 w-4" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

function NewsletterPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("rvs-newsletter-dismissed")) {
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  function close() {
    window.sessionStorage.setItem("rvs-newsletter-dismissed", "true");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div className="fixed bottom-5 left-5 z-[70] w-[calc(100%-40px)] max-w-sm rounded-lg border border-slate-200 bg-white p-5 shadow-[0_24px_90px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-slate-950 dark:text-white" initial={{ opacity: 0, y: 30, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.94 }}>
          <button type="button" onClick={close} className="absolute right-3 top-3 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Close newsletter popup">
            <X className="h-4 w-4" />
          </button>
          <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] text-white">
            <Mail className="h-4 w-4" />
          </div>
          <h3 className="font-display text-lg font-bold tracking-normal">Get digital strategy notes</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Monthly ideas for websites, portals, POS, ERP, CRM, and automation.</p>
          <div className="mt-4 flex gap-2">
            <input type="email" placeholder="Email" className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-[#2563EB] dark:border-white/10 dark:bg-white/8" />
            <button type="button" onClick={close} className="grid h-10 w-10 place-items-center rounded-lg bg-[#2563EB] text-white" aria-label="Subscribe">
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function TechnologyLogoCloud() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {techLogos.map((item) => {
        const Icon = item.icon;
        return (
        <div key={item.label} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 dark:border-white/10 dark:bg-white/8 dark:text-slate-300">
          <Icon className="h-5 w-5 text-[#2563EB] dark:text-cyan-300" />
          {item.label}
        </div>
        );
      })}
    </div>
  );
}

export function TechnologiesBand() {
  return (
    <section className="border-y border-slate-200 bg-white py-14 dark:border-white/10 dark:bg-slate-950">
      <div className="section-shell">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2563EB] dark:text-cyan-200">Technology</p>
            <h2 className="mt-3 font-display text-2xl font-black tracking-normal text-[#0F172A] dark:text-white">Proven stack for scalable products</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">{technologies.slice(0, 8).join(", ")} and more.</p>
        </div>
        <TechnologyLogoCloud />
      </div>
    </section>
  );
}
