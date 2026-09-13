import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LayoutFrame, PageHero } from "@/components/page-elements";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { ResourceLibrary } from "@/components/resource-library";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Search and GEO Resource Library",
  description: "Interactive tools, evidence, methodology, and practical guidance for building clearer AI-search visibility.",
  alternates: { canonical: absoluteUrl("/resources") },
};

export default function ResourcesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "GAiO Engine AI Search and GEO Resource Library",
    description: metadata.description,
    url: absoluteUrl("/resources"),
    isPartOf: { "@id": `${absoluteUrl()}/#website` },
  };

  return (
    <LayoutFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero
        eyebrow="Research and tools"
        title="Use the system. Inspect the evidence. Build the next action."
        copy="A working library of interactive tools, methods, proof, and connected guidance for teams adapting to Google and AI-powered discovery."
        action={false}
      />
      <section className="section section-muted">
        <div className="wrap">
          <div className="split-head">
            <div><p className="eyebrow">Featured resources</p><h2 className="display section-title">Built to be used, not collected.</h2></div>
            <p className="lede">Every resource leads to an inspectable method, a working interface, or original GAiO proof. Nothing here is presented as research before the evidence exists.</p>
          </div>
          <ResourceLibrary />
        </div>
      </section>
      <section className="section">
        <div className="wrap resource-roadmap">
          <div>
            <p className="eyebrow">Research roadmap</p>
            <h2 className="display section-title">What the library will measure next.</h2>
          </div>
          <ol>
            <li><span>01</span><div><strong>Cross-engine representation</strong><p>Record how a stable business-question set is answered, sourced, and changed over time.</p></div></li>
            <li><span>02</span><div><strong>Citation-source patterns</strong><p>Separate owned, earned, community, and institutional sources without overstating causation.</p></div></li>
            <li><span>03</span><div><strong>Search-to-conversion quality</strong><p>Connect AI referrals and assisted discovery to useful business actions where measurement permits.</p></div></li>
          </ol>
          <Link className="button button-primary" href="/methodology">Read the evidence method <ArrowRight size={16} /></Link>
        </div>
      </section>
      <section className="section section-dark"><div className="wrap"><NewsletterSignup source="resource-library" /></div></section>
    </LayoutFrame>
  );
}
