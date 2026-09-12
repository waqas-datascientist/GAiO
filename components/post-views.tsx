"use client";

import { useEffect, useState } from "react";
import {
  readSessionFlag,
  viewedStorageKey,
  writeSessionFlag,
} from "@/lib/post-engagement";

export type PostViewsProps = {
  postId: string;
  initialViews?: number;
  persist?: boolean;
};

function formatViews(n: number) {
  if (n >= 1000) return `${Math.round(n / 100) / 10}k`;
  return String(n);
}

export function PostViews({
  postId,
  initialViews = 0,
  persist = true,
}: PostViewsProps) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    if (!persist) return;
    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      const key = viewedStorageKey(postId);
      if (readSessionFlag(key)) return;
      writeSessionFlag(key, true);

      try {
        const res = await fetch(`/api/posts/${encodeURIComponent(postId)}/view`, {
          method: "POST",
        });
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as { views?: number };
        if (!cancelled && typeof data.views === "number") setViews(data.views);
      } catch {
        /* silent — display still shows SSR count */
      }
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [persist, postId]);

  return (
    <p className="meta post-stat-line" aria-live="polite">
      {formatViews(views)} {views === 1 ? "view" : "views"}
    </p>
  );
}
