"use client";

import type { ComponentType } from "react";
import { Braces, Code2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { FaAws } from "react-icons/fa";
import { Reveal, revealItem } from "@/components/motion/fade-in";
import { SiDocker, SiFramer, SiFlutter, SiLaravel, SiMui, SiMysql, SiNextdotjs, SiPostgresql, SiReact, SiRedis, SiTailwindcss, SiTypescript } from "react-icons/si";
import { technologies } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

type Mark = { icon: ComponentType<{ className?: string }>; color: string };

const fallback: Mark = { icon: Code2, color: "text-navy-400" };

/** Brand marks from Simple Icons / Font Awesome, coloured with each brand's own hue. */
const marks: Record<string, Mark> = {
  Laravel: { icon: SiLaravel, color: "text-[#FF2D20]" },
  "Next.js": { icon: SiNextdotjs, color: "text-slate-950 dark:text-white" },
  TypeScript: { icon: SiTypescript, color: "text-[#3178C6]" },
  React: { icon: SiReact, color: "text-[#087EA4] dark:text-[#61DAFB]" },
  MUI: { icon: SiMui, color: "text-[#007FFF] dark:text-[#53B1FD]" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "text-[#06B6D4]" },
  MySQL: { icon: SiMysql, color: "text-[#4479A1] dark:text-[#5A8DC7]" },
  PostgreSQL: { icon: SiPostgresql, color: "text-[#4169E1] dark:text-[#7396E8]" },
  Redis: { icon: SiRedis, color: "text-[#DC382D] dark:text-[#FF4438]" },
  Sanctum: { icon: ShieldCheck, color: "text-navy-400" },
  "Framer Motion": { icon: SiFramer, color: "text-[#0055FF]" },
  Flutter: { icon: SiFlutter, color: "text-[#02569B] dark:text-[#54C5F8]" },
  AWS: { icon: FaAws, color: "text-[#FF9900]" },
  Docker: { icon: SiDocker, color: "text-[#2496ED]" },
  "REST APIs": { icon: Braces, color: "text-navy-400" }
};

/** Hairline band listing the stack with real vendor logos. */
export function CapabilityStrip() {
  const { isKhmer } = useLanguage();

  return (
    <section
      aria-label={isKhmer ? "បច្ចេកវិទ្យាដែលយើងប្រើ" : "Technologies we build with"}
      className="text-slate-950 dark:text-white bg-white dark:bg-[#0A0A0A]"
    >
      <Reveal className="section-shell flex flex-col items-center gap-5 py-7 sm:flex-row sm:gap-10">
        <motion.span
          variants={revealItem}
          className="eyebrow shrink-0 text-slate-400 dark:text-slate-500"
        >
          {isKhmer ? "បច្ចេកវិទ្យា" : "Built with"}
        </motion.span>

        <motion.ul variants={revealItem} className="flex flex-wrap items-center justify-center gap-2.5">
          {technologies.map((technology) => {
            const { icon: Icon, color } = marks[technology] ?? fallback;
            return (
              <li
                key={technology}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-slate-300 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-white/25 dark:hover:text-white"
              >
                <Icon className={cn("h-4 w-4 shrink-0", color)} />
                {technology}
              </li>
            );
          })}
        </motion.ul>
      </Reveal>
    </section>
  );
}
