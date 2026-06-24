"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { posts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function BlogExplorer() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const tags = ["All", ...Array.from(new Set(posts.flatMap((post) => post.tags)))];

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesQuery = [post.title, post.category, post.excerpt]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesTag = tag === "All" || post.tags.includes(tag);
        return matchesQuery && matchesTag;
      }),
    [query, tag]
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
          <Card key={post.title} className="h-full">
            <CardHeader>
              <div className="mb-3 flex items-center justify-between gap-3">
                <Badge>{post.category}</Badge>
                <span className="text-xs font-medium text-slate-500">{post.date}</span>
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
