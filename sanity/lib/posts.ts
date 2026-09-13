import type { PortableTextBlock } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url";
import { articles, type Article } from "@/lib/content";
import { getClient } from "./client";
import { resolveImageUrl } from "./image";
import {
  commentsByPostQuery,
  latestPostsQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
} from "./queries";
import { isSanityConfigured } from "../env";
import type { PublicComment } from "@/lib/comments";
import { inferTopicSlug, type TopicSlug } from "@/lib/editorial";

export type InsightComment = PublicComment;

/** Seconds — keeps /blog and homepage Insights fresh after Studio publishes. */
const SANITY_REVALIDATE_SECONDS = 60;

export type InsightPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  editor: string;
  topic: TopicSlug;
  category: string;
  readTime: string;
  keyTakeaways: string[];
  socialHeadline: string | null;
  socialSummary: string | null;
  evidence: EvidenceItem[];
  publishedAt: string | null;
  updatedAt: string | null;
  featured: boolean;
  likes: number;
  views: number;
  comments: number;
  imageUrl: string | null;
  body?: PortableTextBlock[] | string[];
  source: "sanity" | "sample";
};

export type EvidenceItem = {
  _key?: string;
  kind: string;
  finding: string;
  method?: string | null;
  sourceName?: string | null;
  url?: string | null;
  observedAt?: string | null;
  limitation?: string | null;
};

type SanityPostDoc = {
  _id: string;
  _updatedAt?: string | null;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  author?: string | null;
  editor?: string | null;
  topic?: string | null;
  category?: string | null;
  readTime?: string | null;
  keyTakeaways?: string[] | null;
  socialHeadline?: string | null;
  socialSummary?: string | null;
  evidence?: EvidenceItem[] | null;
  publishedAt?: string | null;
  featured?: boolean | null;
  likes?: number | null;
  views?: number | null;
  comments?: number | null;
  mainImage?: SanityImageSource | null;
  body?: PortableTextBlock[] | null;
};

function sampleToInsight(article: Article, index: number): InsightPost {
  return {
    _id: `sample-${article.slug}`,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    author: article.author,
    editor: article.editor,
    topic: inferTopicSlug({ topic: article.topic }),
    category: article.category,
    readTime: article.readTime,
    keyTakeaways: article.keyTakeaways,
    socialHeadline: null,
    socialSummary: null,
    evidence: [],
    publishedAt: article.date,
    updatedAt: article.date,
    featured: index === 0,
    likes: 0,
    views: 0,
    comments: 0,
    imageUrl: null,
    body: article.body,
    source: "sample",
  };
}

function mapSanityPost(doc: SanityPostDoc): InsightPost | null {
  if (!doc?.slug || !doc.title) return null;
  return {
    _id: doc._id,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt ?? "",
    author: doc.author ?? "GAiO Editorial Desk",
    editor: doc.editor ?? "GAiO Editorial Desk",
    topic: inferTopicSlug({ topic: doc.topic, title: doc.title, category: doc.category }),
    category: doc.category ?? "Insight",
    readTime: doc.readTime ?? "5 min read",
    keyTakeaways: Array.isArray(doc.keyTakeaways) ? doc.keyTakeaways.filter(Boolean).slice(0, 5) : [],
    socialHeadline: doc.socialHeadline ?? null,
    socialSummary: doc.socialSummary ?? null,
    evidence: Array.isArray(doc.evidence) ? doc.evidence.filter((item) => item?.finding) : [],
    publishedAt: doc.publishedAt ?? null,
    updatedAt: doc._updatedAt ?? null,
    featured: Boolean(doc.featured),
    likes: doc.likes ?? 0,
    views: doc.views ?? 0,
    comments: doc.comments ?? 0,
    imageUrl: resolveImageUrl(doc.mainImage, (b) => b.width(800)),
    body: doc.body ?? undefined,
    source: "sanity",
  };
}

async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = ["sanity-post"],
): Promise<T | null> {
  const client = getClient();
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: SANITY_REVALIDATE_SECONDS,
        tags,
      },
    });
  } catch (error) {
    console.error(
      "[sanity] fetch failed — falling back to sample insights. Check NEXT_PUBLIC_SANITY_* env and network.",
      error,
    );
    return null;
  }
}

export async function getInsightPosts(): Promise<InsightPost[]> {
  if (isSanityConfigured) {
    const docs = await fetchSanity<SanityPostDoc[]>(postsQuery);
    // null = fetch failed / not configured path; [] = Sanity has no published posts
    if (docs) {
      return docs.map(mapSanityPost).filter((p): p is InsightPost => Boolean(p));
    }
  } else {
    console.warn(
      "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID missing or placeholder — using sample insights",
    );
  }
  return articles.map(sampleToInsight);
}

export async function getLatestInsightPosts(limit = 3): Promise<InsightPost[]> {
  if (isSanityConfigured) {
    const docs = await fetchSanity<SanityPostDoc[]>(latestPostsQuery);
    if (docs) {
      return docs
        .map(mapSanityPost)
        .filter((p): p is InsightPost => Boolean(p))
        .slice(0, limit);
    }
  }
  return articles.slice(0, limit).map(sampleToInsight);
}

export async function getInsightBySlug(slug: string): Promise<InsightPost | null> {
  if (isSanityConfigured) {
    const doc = await fetchSanity<SanityPostDoc | null>(postBySlugQuery, { slug });
    if (doc) {
      const mapped = mapSanityPost(doc);
      if (mapped) return mapped;
    }
  }
  const sample = articles.find((a) => a.slug === slug);
  if (!sample) return null;
  return sampleToInsight(sample, articles.findIndex((a) => a.slug === slug));
}

export async function getInsightSlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    const slugs = await fetchSanity<string[]>(postSlugsQuery);
    if (slugs) return slugs.filter(Boolean);
  }
  return articles.map((a) => a.slug);
}

export async function getInsightPostsByTopic(topic: TopicSlug): Promise<InsightPost[]> {
  const posts = await getInsightPosts();
  return posts.filter((post) => post.topic === topic);
}

const STOP_WORDS = new Set(["about", "after", "before", "from", "into", "that", "the", "this", "what", "when", "with", "without", "your"]);

function titleTerms(title: string) {
  return new Set(
    title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((term) => term.length > 3 && !STOP_WORDS.has(term)),
  );
}

export async function getRelatedInsightPosts(post: InsightPost, limit = 3): Promise<InsightPost[]> {
  const posts = await getInsightPosts();
  const sourceTerms = titleTerms(post.title);

  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.topic === post.topic) score += 8;
      if (candidate.category === post.category) score += 3;
      for (const term of titleTerms(candidate.title)) {
        if (sourceTerms.has(term)) score += 1;
      }
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export async function getCommentsForPost(
  postId: string,
): Promise<InsightComment[]> {
  if (!isSanityConfigured || postId.startsWith("sample-")) return [];
  const comments = await fetchSanity<InsightComment[]>(
    commentsByPostQuery,
    { postId },
    ["sanity-comment", `sanity-comment-${postId}`],
  );
  return comments ?? [];
}
