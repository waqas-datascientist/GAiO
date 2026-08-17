import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LayoutFrame } from "@/components/page-elements";
import { BlogPostCard } from "@/components/blog-post-card";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { buildTopicJsonLd } from "@/lib/json-ld";
import { getTopicCluster, topicClusters } from "@/lib/editorial";
import { absoluteUrl } from "@/lib/site";
import { getInsightPostsByTopic } from "@/sanity/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return topicClusters.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicCluster(slug);
  if (!topic) return { title: "Topic not found" };
  const canonical = absoluteUrl(`/topics/${topic.slug}`);
  return {
    title: `${topic.name}: guides, evidence, and practical answers`,
    description: topic.description,
    alternates: { canonical },
    openGraph: { title: `${topic.name} | GAiO Engine`, description: topic.description, url: canonical, images: [] },
    twitter: { card: "summary", title: `${topic.name} | GAiO Engine`, description: topic.description, images: [] },
  };
}

export default async function TopicDetailPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopicCluster(slug);
  if (!topic) notFound();
  const posts = await getInsightPostsByTopic(topic.slug);
  const jsonLd = buildTopicJsonLd(topic, posts);

  return (
    <LayoutFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="page-hero topic-detail-hero">
        <div className="wrap">
          <nav className="article-breadcrumbs" aria-label="Breadcrumb"><Link href="/topics">Topics</Link><span aria-hidden="true">/</span><span>{topic.name}</span></nav>
          <div className="topic-detail-grid">
            <div className="section-intro">
              <p className="eyebrow">{topic.eyebrow}</p>
              <h1 className="display headline">{topic.name}</h1>
              <p className="lede">{topic.description}</p>
            </div>
            <aside className="topic-question-panel">
              <span className="meta">Questions this hub answers</span>
              <ul>{topic.questions.map((question) => <li key={question}>{question}</li>)}</ul>
            </aside>
          </div>
        </div>
      </header>
      <section className="section section-muted">
        <div className="wrap topic-pillar-panel">
          <div>
            <p className="eyebrow">Pillar resource</p>
            <h2 className="display section-title">Begin with the shared foundation.</h2>
            <p className="lede">{topic.promise}</p>
          </div>
          <Link className="button button-signal" href={topic.pillarHref}>{topic.pillarLabel} <ArrowRight size={16} /></Link>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="split-head">
            <div>
              <p className="eyebrow">Supporting answers</p>
              <h2 className="display section-title">Go from the big question to the useful detail.</h2>
            </div>
            <Link className="button button-ghost" href="/blog">Browse all insights</Link>
          </div>
          {posts.length ? (
            <div className="blog-card-grid">
              {posts.map((post) => (
                <BlogPostCard
                  key={post._id}
                  title={post.title}
                  subtitle={`${post.author} · ${post.category}`}
                  href={`/blog/${post.slug}`}
                  image={post.imageUrl}
                  likes={post.likes}
                  comments={post.comments}
                  views={post.views}
                />
              ))}
            </div>
          ) : (
            <div className="topic-empty-state">
              <p className="eyebrow">Editorial queue</p>
              <h3>New supporting answers are being prepared for this hub.</h3>
              <p>The pillar resource is live now. The first linked field notes will appear here without changing this hub URL.</p>
            </div>
          )}
        </div>
      </section>
      <section className="section section-dark">
        <div className="wrap"><NewsletterSignup source={`topic-${topic.slug}`} /></div>
      </section>
    </LayoutFrame>
  );
}
