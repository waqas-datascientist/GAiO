import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Gauge, ShieldCheck, Users } from "lucide-react";
import { CTA, LayoutFrame } from "@/components/page-elements";
import { getService, services } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.copy,
    alternates: { canonical: absoluteUrl(`/services/${service.slug}`) },
    openGraph: { title: service.title, description: service.copy, url: absoluteUrl(`/services/${service.slug}`), images: [] },
    twitter: { card: "summary", title: service.title, description: service.copy, images: [] },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const url = absoluteUrl(`/services/${service.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.copy,
    url,
    serviceType: service.title,
    provider: { "@id": `${absoluteUrl()}/#organization` },
    areaServed: "Worldwide",
  };

  return (
    <LayoutFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="page-hero service-detail-hero">
        <div className="wrap service-detail-hero-grid">
          <div className="section-intro">
            <p className="eyebrow">Service {service.number} · {service.shortTitle}</p>
            <h1 className="display headline">{service.title}</h1>
            <p className="lede">{service.copy}</p>
            <div className="hero-actions">
              <Link className="button button-signal" href="/assessment">Run a free AI visibility audit <ArrowRight size={16} /></Link>
              <Link className="button button-ghost" href="/services">Compare all services</Link>
            </div>
          </div>
          <aside className="service-problem-panel">
            <span className="meta">The problem this solves</span>
            <p>{service.problem}</p>
          </aside>
        </div>
      </header>

      <section className="section">
        <div className="wrap service-detail-grid">
          <div className="service-detail-column">
            <p className="eyebrow">What is included</p>
            <h2 className="display section-title">Concrete outputs your team can inspect.</h2>
            <ul className="service-checklist">{service.deliverables.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
          </div>
          <div className="service-detail-column">
            <p className="eyebrow">How the work moves</p>
            <h2 className="display section-title">A short route from observation to action.</h2>
            <ol className="service-process">{service.process.map((item, index) => <li key={item}><span>0{index + 1}</span><p>{item}</p></li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="wrap service-signal-grid">
          <article><Gauge size={21} /><span className="meta">Measurement</span><h2>What we observe</h2><ul>{service.measurement.map((item) => <li key={item}>{item}</li>)}</ul></article>
          <article><Users size={21} /><span className="meta">Best fit</span><h2>Who this is for</h2><p>{service.fit}</p></article>
          <article><ShieldCheck size={21} /><span className="meta">Honest boundary</span><h2>What it cannot promise</h2><p>{service.limitation}</p></article>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap service-next-step">
          <div><p className="eyebrow">Continue the system</p><h2 className="display section-title">Connect the service to evidence and a durable topic.</h2></div>
          <div className="hero-actions">
            <Link className="button button-signal" href={`/topics/${service.relatedTopic}`}>Explore the related topic hub <ArrowRight size={16} /></Link>
            <Link className="button button-ghost" href="/proof">Inspect GAiO proof</Link>
          </div>
        </div>
      </section>
      <CTA />
    </LayoutFrame>
  );
}
