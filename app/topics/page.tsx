import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LayoutFrame, PageHero } from "@/components/page-elements";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { topicClusters } from "@/lib/editorial";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "GEO topic hubs",
  description: "Explore GAiO Engine's connected hubs for GEO fundamentals, citation-ready content, entity authority, and AI-search measurement.",
  alternates: { canonical: absoluteUrl("/topics") },
};

export default function TopicsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GAiO Engine topic hubs",
    description: metadata.description,
    url: absoluteUrl("/topics"),
    hasPart: topicClusters.map((topic) => ({
      "@type": "CollectionPage",
      name: topic.name,
      url: absoluteUrl(`/topics/${topic.slug}`),
    })),
  };

  return (
    <LayoutFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero
        eyebrow="Topic library"
        title="A knowledge system, not a pile of posts."
        copy="Each hub gives one strategic subject a stable home, a clear pillar resource, supporting answers, and a path to the next decision."
        action={false}
      />
      <section className="section">
        <div className="wrap topic-hub-grid">
          {topicClusters.map((topic, index) => (
            <article className="topic-hub-card" key={topic.slug}>
              <div className="topic-hub-index">0{index + 1}</div>
              <p className="eyebrow">{topic.eyebrow}</p>
              <h2 className="display section-title">{topic.name}</h2>
              <p className="lede">{topic.description}</p>
              <ul>
                {topic.questions.map((question) => <li key={question}>{question}</li>)}
              </ul>
              <Link className="topic-hub-link" href={`/topics/${topic.slug}`}>
                Open this topic hub <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-muted">
        <div className="wrap split-head">
          <div>
            <p className="eyebrow">How the system compounds</p>
            <h2 className="display section-title">Every useful page has a place and a next step.</h2>
          </div>
          <div className="topic-system-copy">
            <p>Hubs establish the subject. Pillars explain the core decision. Supporting articles answer narrower questions. Internal links move readers through the system. Newsletter and service CTAs continue the relationship.</p>
            <Link className="button button-primary" href="/authority-engine">See the step-by-step GAiO plan</Link>
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="wrap"><NewsletterSignup source="topics-index" /></div>
      </section>
    </LayoutFrame>
  );
}
