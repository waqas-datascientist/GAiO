import Link from "next/link";
import { LayoutFrame, PageHero } from "@/components/page-elements";
import { BlogExplorer } from "@/components/blog-explorer";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { topicClusters } from "@/lib/editorial";
import { getInsightPosts } from "@/sanity/lib/posts";

export const metadata = {
  title: "GEO insights, research, and practical playbooks",
  description: "Evidence-led guidance on GEO fundamentals, citation-ready content, brand authority, and AI-search measurement.",
};

/** Refresh listing after Studio publishes (also set on Sanity fetches). */
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getInsightPosts();

  return (
    <LayoutFrame>
      <PageHero
        eyebrow="GAiO publication"
        title="Useful answers. Connected into authority."
        copy="Research notes, practical playbooks, and evidence-led guidance organised around the questions teams actually need to solve."
        action={false}
      />
      <section className="section section-muted">
        <div className="wrap">
          <div className="split-head">
            <div>
              <p className="eyebrow">Browse by topic</p>
              <h2 className="display section-title">Start with a hub, not a feed.</h2>
            </div>
            <Link className="button button-ghost" href="/authority-engine">See the authority engine</Link>
          </div>
          <div className="topic-mini-grid">
            {topicClusters.map((topic) => (
              <Link className="topic-mini-card" href={`/topics/${topic.slug}`} key={topic.slug}>
                <span className="meta">{topic.eyebrow}</span>
                <strong>{topic.name}</strong>
                <p>{topic.promise}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap"><BlogExplorer posts={posts} /></div>
      </section>
      <section className="section section-dark">
        <div className="wrap"><NewsletterSignup source="blog-index" /></div>
      </section>
    </LayoutFrame>
  );
}
