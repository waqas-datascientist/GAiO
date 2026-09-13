import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CTA, LayoutFrame } from "@/components/page-elements";
import type { StandardsDocument as StandardsDocumentData } from "@/lib/standards";

export function StandardsDocument({ document }: { document: StandardsDocumentData }) {
  return (
    <LayoutFrame>
      <header className="page-hero standards-hero">
        <div className="wrap section-intro">
          <p className="eyebrow">{document.eyebrow}</p>
          <h1 className="display headline">{document.title}</h1>
          <p className="lede">{document.description}</p>
          <p className="meta">Last updated {document.updated}</p>
        </div>
      </header>
      <section className="section">
        <div className="wrap standards-layout">
          <aside className="standards-index">
            <span className="meta">On this page</span>
            {document.sections.map((section, index) => <a key={section.title} href={`#standard-${index + 1}`}>{section.title}</a>)}
          </aside>
          <div className="standards-sections">
            {document.sections.map((section, index) => (
              <section id={`standard-${index + 1}`} key={section.title}>
                <span className="meta">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
                {section.points?.length ? <ul>{section.points.map((point) => <li key={point}><CheckCircle2 size={18} aria-hidden="true" /><span>{point}</span></li>)}</ul> : null}
              </section>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="wrap service-next-step">
          <div><p className="eyebrow">Inspect the practice</p><h2 className="section-title">See the evidence and the method together.</h2></div>
          <div className="hero-actions"><Link className="button button-outline" href="/proof">View proof <ArrowRight size={16} /></Link><Link className="button button-primary" href="/methodology">Read the methodology</Link></div>
        </div>
      </section>
      <CTA />
    </LayoutFrame>
  );
}
