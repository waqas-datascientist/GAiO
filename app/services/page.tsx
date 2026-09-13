import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LayoutFrame, PageHero, CTA } from "@/components/page-elements";
import { engagements, services } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Search Visibility and GEO Services",
  description: "AI visibility audits, GEO strategy, technical crawlability, entity optimization, answer-ready content, citation authority, monitoring, and conversion measurement.",
  alternates: { canonical: absoluteUrl("/services") },
};

export default function ServicesPage() {
  return (
    <LayoutFrame>
      <PageHero
        eyebrow="AI Search Visibility and GEO services"
        title="One connected system for being found, trusted, cited, and chosen."
        copy="Start with a focused diagnostic or combine technical, editorial, authority, and measurement work into an ongoing programme. Every engagement is scoped around real customer questions and verifiable evidence."
      />
      <section className="section">
        <div className="wrap">
          <div className="split-head">
            <div><p className="eyebrow">Eight specialist workstreams</p><h2 className="display section-title">Choose the problem. Keep the system connected.</h2></div>
            <p className="lede">Content, schema, digital PR, crawler access, and measurement reinforce one another. Each service can begin independently, but the roadmap keeps every action connected to the same business outcome.</p>
          </div>
          <div className="service-grid service-directory-grid">
            {services.map((service) => (
              <article className="service-card" key={service.slug}>
                <span className="service-number">{service.number}</span>
                <div className="orbit-map" aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <div className="tag-row">{service.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                <Link className="service-card-link" href={`/services/${service.slug}`}>Explore this service <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-dark">
        <div className="wrap">
          <div className="split-head">
            <div><p className="eyebrow">Engagement paths</p><h2 className="display section-title">Enter at the scope that matches the decision.</h2></div>
            <p className="lede">No invented package prices or one-size-fits-all retainers. The audit establishes the evidence needed to recommend a responsible scope.</p>
          </div>
          <div className="engagement-grid">
            {engagements.map((engagement, index) => (
              <article key={engagement.title}>
                <span className="meta">0{index + 1}</span>
                <CheckCircle2 size={21} aria-hidden="true" />
                <h3>{engagement.title}</h3>
                <p>{engagement.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </LayoutFrame>
  );
}
