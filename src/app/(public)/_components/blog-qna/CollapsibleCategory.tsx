"use client";

import { TBlogQACategory, TBlogQATopic } from "@/types/blog-qna";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  category: TBlogQACategory;
  topics: TBlogQATopic[];
  baseHref: string;
  selectedCategory: string;
  selectedTopic: string;
};

export default function CollapsibleCategory({
  category,
  topics,
  baseHref,
  selectedCategory,
  selectedTopic,
}: Props) {
  const isActive = selectedCategory === category.slug;
  const [open, setOpen] = useState(isActive);

  return (
    <div>
      <div className="flex items-center gap-1">
        <Link
          href={`${baseHref}?category=${encodeURIComponent(category.slug)}`}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            isActive
              ? "bg-primary/15 text-primary font-semibold"
              : "bg-primary/5 text-primary hover:bg-primary/10"
          }`}
        >
          {category.name}
        </Link>
        {topics.length > 0 && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Collapse" : "Expand"}
            className="rounded-md p-1.5 text-primary transition-colors hover:bg-primary/10"
          >
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {open && topics.length > 0 && (
        <div className="mt-1 ml-3 flex flex-wrap gap-1 border-l border-primary/20 pl-2">
          {topics.map((topic) => {
            const topicActive = isActive && selectedTopic === topic.slug;
            return (
              <Link
                key={topic._id}
                href={`${baseHref}?category=${encodeURIComponent(category.slug)}&topic=${encodeURIComponent(topic.slug)}`}
                className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                  topicActive
                    ? "bg-primary/15 text-primary font-semibold"
                    : "bg-primary/5 text-primary hover:bg-primary/10"
                }`}
              >
                {topic.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
