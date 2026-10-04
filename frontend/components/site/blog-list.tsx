"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { posts } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import { PageCta, PageHero } from "./page-hero";

type Post = {
  id?: number;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  published_at?: string | null;
  date?: string;
};

function extractRows(payload: unknown): Post[] {
  if (Array.isArray(payload)) return payload as Post[];
  if (payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)) {
    return (payload as { data: Post[] }).data;
  }
  return [];
}

function formatDate(post: Post, locale: string) {
  if (post.date) return post.date;
  if (!post.published_at) return locale === "km" ? "សេចក្តីព្រាង" : "Draft";
  return new Intl.DateTimeFormat(locale === "km" ? "km-KH" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(post.published_at));
}

export function BlogList() {
  const { isKhmer } = useLanguage();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [items, setItems] = useState<Post[]>(posts);

  useEffect(() => {
    async function load() {
      const rows = extractRows(await apiClient<unknown>("/blog?per_page=60"));
      if (rows.length) setItems(rows);
    }
    void load().catch(() => undefined);
  }, []);

  const tags = useMemo(() => ["All", ...Array.from(new Set(items.flatMap((post) => post.tags)))], [items]);

  const visible = useMemo(
    () =>
      items.filter((post) => {
        const haystack = [post.title, post.category, post.excerpt].join(" ").toLowerCase();
        return haystack.includes(query.toLowerCase()) && (tag === "All" || post.tags.includes(tag));
      }),
    [items, query, tag]
  );

  return (
    <>
      <PageHero
        eyebrow={isKhmer ? "ប្លុក" : "Blog"}
        title={isKhmer ? "គំនិតសម្រាប់ប្រព័ន្ធអាជីវកម្មកាន់តែប្រសើរ។" : "Ideas for better business systems."}
        description={
          isKhmer
            ? "មើលតាមប្រធានបទ ស្វែងយល់ពីការអនុវត្តជាក់ស្តែង សម្រាប់គម្រោងកម្មវិធីតាមតម្រូវការ។"
            : "Browse by topic for practical guidance on custom software projects."
        }
      />

      <section className="text-slate-950 dark:text-white bg-white py-16 lg:py-24 dark:bg-[#0A0A0A]">
        <div className="section-shell">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <label className="relative block">
              <span className="sr-only">{isKhmer ? "ស្វែងរកអត្ថបទ" : "Search articles"}</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={isKhmer ? "ស្វែងរកអត្ថបទ" : "Search articles"}
                className="h-11 rounded-lg border-slate-300 pl-10 dark:border-white/15"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {tags.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTag(item)}
                  className={cn(
                    "h-9 rounded-full border px-4 text-xs font-semibold transition-colors",
                    tag === item
                      ? "border-navy-600 bg-navy-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-white/25 dark:hover:text-white"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, index) => (
              <FadeIn key={post.id ?? post.title} delay={index * 0.05}>
                <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-navy-400/60 hover:shadow-soft dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-navy-400/50">
                  <div className="flex items-center justify-between gap-3">
                    <Badge>{post.category}</Badge>
                    <time className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      {formatDate(post, isKhmer ? "km" : "en")}
                    </time>
                  </div>

                  <h2 className="mt-5 font-display text-lg font-[450] leading-snug tracking-normal text-slate-950 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{post.excerpt}</p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-6">
                    {post.tags.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          {!visible.length ? (
            <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
              {isKhmer ? "រកមិនឃើញអត្ថបទទេ។" : "No articles match that search."}
            </p>
          ) : null}
        </div>
      </section>

      <PageCta />
    </>
  );
}
