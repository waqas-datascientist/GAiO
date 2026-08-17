import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { LayoutFrame } from "@/components/page-elements";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { authorityPhases, authorityTerms, editorialSources, topicClusters } from "@/lib/editorial";
import { absoluteUrl, siteName } from "@/lib/site";

const publishedAt = "2026-08-17";

export const metadata: Metadata = {
  title: "The GAiO Authority Engine: a step-by-step growth plan",
  description: "A practical 90-day and long-term plan for topic hubs, editorial evidence, internal linking, newsletter conversion, commercial CTAs, and social distribution.",
  alternates: { canonical: absoluteUrl("/authority-engine") },
  openGraph: {
    type: "article",
    title: "The GAiO Authority Engine",
    description: "How to turn a website into a connected, evidence-led publication that compounds authority over time.",
    url: absoluteUrl("/authority-engine"),
    publishedTime: publishedAt,
    images: [{ url: absoluteUrl("/og.png"), alt: "The GAiO Authority Engine" }],
  },
  twitter: {
    card: "summary",
    title: "The GAiO Authority Engine",
    description: "A step-by-step publication and authority plan for AI search.",
    images: [absoluteUrl("/og.png")],
  },
};

export default function AuthorityEnginePage() {
  const url = absoluteUrl("/authority-engine");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "The GAiO Authority Engine: a step-by-step growth plan",
    description: metadata.description,
    url,
    mainEntityOfPage: url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: { "@type": "Organization", name: "GAiO Editorial Desk", url: absoluteUrl("/authors/editorial-desk") },
    editor: { "@type": "Organization", name: "GAiO Editorial Desk", url: absoluteUrl("/authors/editorial-desk") },
    publisher: { "@id": `${absoluteUrl()}/#organization` },
    about: topicClusters.map((topic) => ({ "@type": "Thing", name: topic.name })),
  };

  return (
    <LayoutFrame>
      <article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <header className="page-hero authority-hero">
          <div className="wrap authority-hero-grid">
            <div className="section-intro">
              <p className="eyebrow">GAiO Authority Engine · v1</p>
              <h1 className="display headline">Build a domain people remember—and systems can verify.</h1>
              <p className="lede">The goal is not to look old or publish at maximum volume. It is to build a connected record of useful answers, accountable experts, original proof, and earned attention that becomes more valuable every year.</p>
              <div className="hero-actions">
                <Link className="button button-signal" href="/assessment">Benchmark your starting point <ArrowRight size={16} /></Link>
                <Link className="button button-ghost" href="/topics">Explore the topic system</Link>
              </div>
            </div>
            <aside className="authority-principle">
              <span className="meta">The compounding loop</span>
              <ol>
                <li><strong>Answer</strong><span>one real question well</span></li>
                <li><strong>Prove</strong><span>the claim and its limits</span></li>
                <li><strong>Connect</strong><span>it to the right topic and next step</span></li>
                <li><strong>Distribute</strong><span>the useful insight where people already are</span></li>
                <li><strong>Update</strong><span>the same durable URL as knowledge changes</span></li>
              </ol>
            </aside>
          </div>
        </header>

        <section className="section">
          <div className="wrap">
            <div className="split-head">
              <div><p className="eyebrow">Plain-language glossary</p><h2 className="display section-title">What every part of the engine means.</h2></div>
              <p className="lede">These terms describe connected editorial and growth systems. None is a shortcut to guaranteed rankings or AI citations.</p>
            </div>
            <dl className="authority-glossary">
              {authorityTerms.map((item, index) => (
                <div key={item.term}>
                  <span className="authority-term-index">{String(index + 1).padStart(2, "0")}</span>
                  <dt>{item.term}</dt>
                  <dd>{item.definition}</dd>
                  <dd className="authority-implementation"><strong>On {siteName}:</strong> {item.implementation}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section section-dark">
          <div className="wrap">
            <div className="split-head">
              <div><p className="eyebrow">Step-by-step update plan</p><h2 className="display section-title">Ninety days to launch the loop. Years to compound it.</h2></div>
              <p className="lede">Complete the sequence in order. Publishing more content before the system is connected only creates a larger cleanup later.</p>
            </div>
            <div className="authority-phase-list">
              {authorityPhases.map((phase, index) => (
                <article key={phase.range}>
                  <div className="authority-phase-heading">
                    <span className="meta">0{index + 1} · {phase.range}</span>
                    <h3>{phase.title}</h3>
                    <p>{phase.outcome}</p>
                  </div>
                  <ol>{phase.actions.map((action) => <li key={action}>{action}</li>)}</ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-muted">
          <div className="wrap">
            <div className="split-head">
              <div><p className="eyebrow">Publication architecture</p><h2 className="display section-title">Four hubs keep the strategy focused.</h2></div>
              <Link className="button button-primary" href="/topics">Open all topic hubs</Link>
            </div>
            <div className="topic-mini-grid authority-topic-grid">
              {topicClusters.map((topic) => (
                <Link className="topic-mini-card" href={`/topics/${topic.slug}`} key={topic.slug}>
                  <span className="meta">{topic.eyebrow}</span>
                  <strong>{topic.name}</strong>
                  <p>{topic.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap evidence-standard-grid">
            <div>
              <p className="eyebrow">Evidence standard</p>
              <h2 className="display section-title">Show the method, date, scope, and limitation.</h2>
              <p className="lede">Original evidence is valuable because someone can inspect how the conclusion was reached. A screenshot is an observation, not a universal result. A test is useful only when its conditions and limits are visible.</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/proof">Inspect GAiO’s observed proof</Link>
                <Link className="button button-ghost" href="/authors">Meet the authors and editors</Link>
              </div>
            </div>
            <aside className="source-ledger">
              <span className="meta">Source ledger</span>
              {editorialSources.map((source) => (
                <a href={source.href} target="_blank" rel="noreferrer noopener" key={source.href}>
                  <strong>{source.label} <ExternalLink size={14} /></strong>
                  <span>{source.note}</span>
                </a>
              ))}
            </aside>
          </div>
        </section>

        <section className="section section-dark">
          <div className="wrap"><NewsletterSignup source="authority-engine" /></div>
        </section>

        <section className="section">
          <div className="wrap cta-panel authority-final-cta">
            <div className="cta-copy">
              <p className="eyebrow">Make the plan specific</p>
              <h2 className="display section-title">Choose the first topic, proof gap, and commercial path.</h2>
              <p className="lede">A strategy call turns this framework into a prioritised roadmap for your domain, audience, and evidence.</p>
              <div className="hero-actions">
                <Link className="button button-signal" href="/book">Book a strategy call <ArrowRight size={16} /></Link>
                <Link className="button button-ghost" href="/services">Compare GAiO services</Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </LayoutFrame>
  );
}
