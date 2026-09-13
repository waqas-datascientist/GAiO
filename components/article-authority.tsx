import Link from "next/link";
import { ArrowRight, ExternalLink, Mail } from "lucide-react";
import { CopyLinkButton } from "@/components/copy-link-button";
import { getEditorialProfile, getTopicCluster } from "@/lib/editorial";
import type { EvidenceItem } from "@/sanity/lib/posts";

export function TopicBreadcrumb({ topic }: { topic: string }) {
  const cluster = getTopicCluster(topic);
  if (!cluster) return null;
  return (
    <nav className="article-breadcrumbs" aria-label="Breadcrumb">
      <Link href="/topics">Topics</Link>
      <span aria-hidden="true">/</span>
      <Link href={`/topics/${cluster.slug}`}>{cluster.name}</Link>
    </nav>
  );
}

export function EditorialByline({
  author,
  editor,
  publishedAt,
  updatedAt,
}: {
  author: string;
  editor: string;
  publishedAt: string | null;
  updatedAt: string | null;
}) {
  const authorProfile = getEditorialProfile(author);
  const editorProfile = getEditorialProfile(editor);
  const updated = updatedAt && updatedAt !== publishedAt ? updatedAt : null;
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="editorial-byline" aria-label="Article authorship">
      <p>
        Written by <Link href={`/authors/${authorProfile.slug}`}>{authorProfile.name}</Link>
        <span aria-hidden="true"> · </span>
        Edited by <Link href={`/authors/${editorProfile.slug}`}>{editorProfile.name}</Link>
      </p>
      <p>
        {publishedAt ? <>Published <time dateTime={publishedAt}>{formatDate(publishedAt)}</time></> : "Editorial insight"}
        {updated ? <><span aria-hidden="true"> · </span>Updated <time dateTime={updated}>{formatDate(updated)}</time></> : null}
      </p>
    </div>
  );
}

export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="takeaways" aria-labelledby="key-takeaways">
      <p className="eyebrow">Answer first</p>
      <h2 id="key-takeaways">Key takeaways</h2>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

export function EvidenceLedger({ items }: { items: EvidenceItem[] }) {
  if (!items.length) return null;
  return (
    <section className="evidence-ledger" aria-labelledby="evidence-ledger">
      <div>
        <p className="eyebrow">Inspectable proof</p>
        <h2 className="display section-title" id="evidence-ledger">Evidence ledger</h2>
        <p className="body-text">What was observed, how it was checked, and where its limits begin.</p>
      </div>
      <div className="evidence-ledger-list">
        {items.map((item, index) => (
          <article key={item._key ?? `${item.kind}-${index}`}>
            <span className="meta">{item.kind}</span>
            <h3>{item.finding}</h3>
            {item.method ? <p><strong>Method:</strong> {item.method}</p> : null}
            {item.limitation ? <p><strong>Limitation:</strong> {item.limitation}</p> : null}
            <div className="evidence-source-row">
              {item.observedAt ? <time dateTime={item.observedAt}>{item.observedAt}</time> : null}
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer noopener">
                  {item.sourceName || "Inspect source"} <ExternalLink size={14} />
                </a>
              ) : item.sourceName ? <span>{item.sourceName}</span> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CommercialArticleCTA({ topic }: { topic: string }) {
  const cluster = getTopicCluster(topic);
  return (
    <aside className="article-commercial-cta">
      <div>
        <p className="eyebrow">Apply this to your site</p>
        <h2>Find the evidence and structure gap that matters first.</h2>
        <p>GAiO’s assessment turns your priority topics, current pages, and proof into a staged implementation plan.</p>
      </div>
      <div className="article-commercial-actions">
        <Link className="button button-signal" href="/assessment" data-event="article_to_service_conversion" data-location="article_cta">Run the assessment <ArrowRight size={16} /></Link>
        <Link className="button button-ghost" href={cluster ? `/topics/${cluster.slug}` : "/topics"}>
          Explore the topic hub
        </Link>
      </div>
    </aside>
  );
}

export function ArticleShare({ url, title }: { url: string; title: string }) {
  const campaignUrl = (source: string) => {
    const tracked = new URL(url);
    tracked.searchParams.set("utm_source", source);
    tracked.searchParams.set("utm_medium", "social");
    tracked.searchParams.set("utm_campaign", "answer_signal");
    return encodeURIComponent(tracked.toString());
  };
  const encodedTitle = encodeURIComponent(title);
  return (
    <section className="article-share" aria-label="Share this article">
      <div>
        <span className="meta">Distribute the signal</span>
        <p>Share the useful idea—not just the link.</p>
      </div>
      <div className="article-share-links">
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${campaignUrl("linkedin")}`} target="_blank" rel="noreferrer noopener" aria-label="Share on LinkedIn" data-event="outbound_social_share" data-location="linkedin">LinkedIn</a>
        <a href={`https://twitter.com/intent/tweet?url=${campaignUrl("x")}&text=${encodedTitle}`} target="_blank" rel="noreferrer noopener" aria-label="Share on X" data-event="outbound_social_share" data-location="x">X</a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${campaignUrl("facebook")}`} target="_blank" rel="noreferrer noopener" aria-label="Share on Facebook" data-event="outbound_social_share" data-location="facebook">Facebook</a>
        <a href={`mailto:?subject=${encodedTitle}&body=${campaignUrl("email")}`} aria-label="Share by email" data-event="outbound_social_share" data-location="email"><Mail size={17} /> Email</a>
        <CopyLinkButton url={url} />
      </div>
    </section>
  );
}
