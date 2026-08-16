import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LayoutFrame } from "@/components/page-elements";
import { PostBody } from "@/components/post-body";
import { PostComments } from "@/components/post-comments";
import { PostReaction } from "@/components/post-reaction";
import { PostViews } from "@/components/post-views";
import { buildBlogPostingJsonLd } from "@/lib/json-ld";
import { absoluteUrl, siteName } from "@/lib/site";
import {
  getCommentsForPost,
  getInsightBySlug,
  getInsightSlugs,
} from "@/sanity/lib/posts";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getInsightSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
      robots: { index: false, follow: false },
    };
  }

  const canonicalPath = `/blog/${post.slug}`;
  const images = post.imageUrl
    ? [{ url: post.imageUrl, alt: post.imageAlt }]
    : undefined;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(canonicalPath),
      siteName,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? post.publishedAt ?? undefined,
      authors: post.author ? [post.author] : undefined,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getInsightBySlug(slug);
  if (!post) notFound();

  const persist = post.source === "sanity";
  const comments = persist ? await getCommentsForPost(post._id) : [];
  const articleJsonLd = buildBlogPostingJsonLd({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    author: post.author,
    category: post.category,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    imageUrl: post.imageUrl,
    imageAlt: post.imageAlt,
  });

  const dateLabel = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : post.source === "sample"
      ? "Sample insight"
      : null;

  return (
    <LayoutFrame>
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <header className="page-hero">
          <div className="wrap section-intro">
            <p className="eyebrow">
              {post.category}
              {post.readTime ? ` · ${post.readTime}` : ""}
              {dateLabel ? ` · ${dateLabel}` : ""}
            </p>
            <h1 className="display headline">{post.title}</h1>
            <p className="lede">{post.excerpt}</p>
            <div className="post-meta-row">
              <p className="meta">{post.author}</p>
              <PostViews
                postId={post._id}
                initialViews={post.views}
                persist={persist}
              />
            </div>
          </div>
        </header>
        <div className="section">
          <div className="wrap">
            {post.imageUrl ? (
              <figure className="post-main-image">
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt || post.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 1200px"
                  preload
                />
              </figure>
            ) : null}
            <div className="detail-layout">
              <div className="prose">
                <PostBody value={post.body} />
              </div>
              <aside className="reading-rail">
                <span className="meta">Your reaction</span>
                <div style={{ marginTop: "var(--space-4)" }}>
                  <PostReaction
                    postId={post._id}
                    persist={persist}
                    initialLikes={post.likes}
                    initialDislikes={0}
                  />
                </div>
              </aside>
            </div>
          </div>
        </div>
        <div className="section section-muted">
          <div className="wrap">
            <PostComments
              postId={post._id}
              initialComments={comments}
              persist={persist}
            />
          </div>
        </div>
      </article>
    </LayoutFrame>
  );
}
