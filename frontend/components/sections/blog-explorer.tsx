"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { posts } from "@/lib/data";
import { apiClient } from "@/lib/api-client";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type BlogItem = {
  id?: number;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  published_at?: string | null;
  date?: string;
};

function extractRows(payload: unknown): BlogItem[] {
  if (Array.isArray(payload)) {
    return payload as BlogItem[];
  }

  if (payload && typeof payload === "object" && Array.isArray((payload as { data?: unknown }).data)) {
    return (payload as { data: BlogItem[] }).data;
  }

  return [];
}

const fallbackPosts: BlogItem[] = posts;

function formatDate(post: BlogItem) {
  if (post.date) {
    return post.date;
  }

  if (!post.published_at) {
    return "Draft";
  }

  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(post.published_at));
}

export function BlogExplorer() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [items, setItems] = useState<BlogItem[]>(fallbackPosts);
  const tags = ["All", ...Array.from(new Set(items.flatMap((post) => post.tags)))];

  useEffect(() => {
    async function loadPosts() {
      const rows = extractRows(await apiClient<unknown>("/blog?per_page=60"));

      if (rows.length) {
        setItems(rows);
      }
    }

    void loadPosts().catch(() => undefined);
  }, []);

  const filteredPosts = useMemo(
    () =>
      items.filter((post) => {
        const matchesQuery = [post.title, post.category, post.excerpt]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesTag = tag === "All" || post.tags.includes(tag);
        return matchesQuery && matchesTag;
      }),
    [items, query, tag]
  );

  return (
    <>
      <div className="mb-8 grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles" className="pl-10" />
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((item) => (
            <button
              key={item}
              className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
                tag === item
                  ? "border-brand-blue bg-brand-blue text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setTag(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.id ?? post.title} className="h-full">
            <CardHeader>
              <div className="mb-3 flex items-center justify-between gap-3">
                <Badge>{post.category}</Badge>
                <span className="text-xs font-medium text-slate-500">{formatDate(post)}</span>
              </div>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.excerpt}</CardDescription>
              <div className="flex flex-wrap gap-2 pt-3">
                {post.tags.map((item) => (
                  <Badge key={item} className="border-slate-200 bg-slate-50 text-slate-700">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
}
