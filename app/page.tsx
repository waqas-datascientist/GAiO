import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LayoutFrame, CTA } from "@/components/page-elements";
import { BlogPostCard } from "@/components/blog-post-card";
import { TeamCard } from "@/components/team-card";
import { AiOverviewProofList } from "@/components/ai-overview-proof";
import { AuraFeaturedBadge } from "@/components/aura-featured-badge";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { VisibilityPreview } from "@/components/visibility-preview";
import { ResourceLibrary } from "@/components/resource-library";
import { CountUp, EngineCloud, HeroGeoMap, Highlighter, KineticText, MethodFlow, MorphStatement, PixelProof, Text3DFlip, TextReveal } from "@/components/visuals";
import { blogHref, blogListingHref, faqs, methodSteps, outcomePrinciples, services, team } from "@/lib/content";
import { topicClusters } from "@/lib/editorial";
import { getLatestInsightPosts } from "@/sanity/lib/posts";

/** Refresh homepage Insights after Studio publishes. */
export const revalidate = 60;

export default async function HomePage() {
  const latestInsights = await getLatestInsightPosts(3);

  return (
    <LayoutFrame>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">AI Search Visibility &amp; Generative Engine Optimization</p>
            <h1 className="display headline hero-headline">
              <span className="hero-brand-line">GAiO Engine</span>
              <span className="hero-offer-line">AI Search Visibility &amp; GEO</span>
            </h1>
            <p className="hero-promise">From search result to trusted answer.</p>
            <p className="lede">We help businesses become the sources Google, ChatGPT, Gemini, Claude, Perplexity, and Copilot can find, understand, trust, cite, and recommend.</p>
            <MorphStatement />
            <div className="hero-actions">
              <Link className="button button-signal" href="/assessment" data-event="audit_started" data-location="homepage_hero">Run your free AI visibility audit <ArrowRight size={16} /></Link>
              <Link className="button button-ghost" href="/visibility-lab">Explore the Visibility Lab</Link>
            </div>
          </div>
          <HeroGeoMap />
          <p className="hero-note"><span className="meta signal">Clarity / Evidence / Measurement</span><br />No placement guarantees—only inspectable work, dated observations, and useful next actions.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split-head">
            <div><p className="eyebrow">The search shift</p><h2 className="display section-title"><Text3DFlip /></h2></div>
            <p className="lede">The new surface is a generated answer. Your job is not simply to appear—it is to give systems enough clarity and evidence to understand when your expertise belongs in the answer.</p>
          </div>
          <TextReveal>GEO helps translate your knowledge into a system that is direct, corroborated, structurally clear, and ready to be evaluated.</TextReveal>
          <div className="search-system-comparison" aria-label="Traditional and AI search comparison">
            <article><span className="meta">Traditional search</span><p>Crawl <i>→</i> Index <i>→</i> Rank <i>→</i> Click</p></article>
            <article><span className="meta">AI-powered discovery</span><p>Retrieve <i>→</i> Interpret <i>→</i> Compare <i>→</i> Trust <i>→</i> Cite</p></article>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap">
          <div className="split-head">
            <div><p className="eyebrow">Engine landscape</p><h2 className="display section-title">One market. Many answer surfaces.</h2></div>
            <p className="lede">We organise the work around the systems your audience actually uses while keeping your facts, expertise, and supporting evidence consistent across every surface.</p>
          </div>
          <EngineCloud />
        </div>
      </section>

      <VisibilityPreview />

      <section className="section section-muted">
        <div className="wrap">
          <div className="section-intro"><p className="eyebrow">Our GEO operating system</p><h2 className="display section-title">A five-stage path from ambiguity to evidence.</h2></div>
          <MethodFlow steps={methodSteps} />
          <div className="print-signal"><span className="print-bars"><i /><i /><i /><i /></span> Discover → structure → evidence → distribute → measure</div>
        </div>
      </section>
      <KineticText text="Make your expertise easier to find, verify, cite, and choose" />

      <section className="section">
        <div className="wrap">
          <div className="split-head">
            <div><p className="eyebrow">What we improve</p><h2 className="display section-title">Start with the problem. Keep the whole system connected.</h2></div>
            <div className="topic-system-copy"><p>Eight specialist workstreams connect technical search, content, entity clarity, authority, visibility measurement, and conversion.</p><Link className="button button-primary" href="/services">Explore all services</Link></div>
          </div>
          <div className="service-grid">
            {services.slice(0, 4).map((service) => (
              <article className="service-card" key={service.slug}>
                <span className="service-number">{service.number}</span><div className="orbit-map" aria-hidden="true" />
                <h3>{service.title}</h3><p>{service.copy}</p>
                <div className="tag-row">{service.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                <Link className="service-card-link" href={`/services/${service.slug}`}>Explore this service <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap">
          <div className="proof-intro">
            <div><p className="eyebrow">Proof of presence</p><h2 className="display section-title">Show the reasoning. Not a vanity dashboard.</h2></div>
            <p className="lede">The work stays grounded in source coverage, priority questions, implementation progress, and the way your expertise is represented.</p>
          </div>
          <div className="proof-layout">
            <PixelProof />
            <div className="proof-side">
              <div className="metric-card"><span className="sample-label">Method, not a client metric</span><CountUp value={5} suffix=" stages" /><p>Discovery, architecture, <Highlighter action="highlight" color="#e1e1e1" animationDuration={650} iterations={1} multiline={false} padding={1} isView>authority</Highlighter>, validation, and monitoring—one practical operating system.</p></div>
              <div className="sample-card"><span className="sample-label">Evidence discipline</span><p>Every proof surface records what was observed, when it was captured, and what the evidence cannot prove.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap">
          <div className="split-head">
            <div><p className="eyebrow">Observed AI-search proof</p><h2 className="display section-title">Real captures. Visible context. Honest limits.</h2></div>
            <div className="topic-system-copy light-copy"><p>These Google AI Overview screenshots preserve the query context and cited GAiO source. Each is one dated observation, not a promise of permanent visibility.</p><Link className="button button-ghost" href="/proof">Open the complete proof library</Link></div>
          </div>
          <AiOverviewProofList variant="featured" />
        </div>
      </section>

      <section className="section section-dark aura-featured-section" aria-label="Featured on Aura++"><div className="wrap"><AuraFeaturedBadge /></div></section>

      <section className="section">
        <div className="wrap">
          <div className="split-head"><div><p className="eyebrow">What useful reporting requires</p><h2 className="display section-title">A learning loop your team can defend.</h2></div><p className="lede">Credibility comes from visible people, inspectable proof, and a method that states its limits—not anonymous praise or unsupported performance claims.</p></div>
          <div className="outcome-principle-grid">
            {outcomePrinciples.map((item) => <article key={item.metric}><span>{item.metric}</span><CheckCircle2 size={20} /><h3>{item.title}</h3><p>{item.copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="wrap">
          <div className="split-head"><div><p className="eyebrow">The people behind the method</p><h2 className="display section-title">Named specialists. Visible accountability.</h2></div><Link className="button button-ghost" href="/about">Meet the team <ArrowRight size={16} /></Link></div>
          <div className="team-grid">{team.map((person) => <TeamCard key={person.name} name={person.name} role={person.role} about={person.about} initials={person.initials} avatarTone={person.avatarTone} email={person.email} imageSrc={person.imageSrc} imagePosition={person.imagePosition} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split-head"><div><p className="eyebrow">Topic authority</p><h2 className="display section-title">A connected library built to compound.</h2></div><div className="topic-system-copy"><p>Every insight belongs to one durable hub, one reader decision, and one useful next step.</p><Link className="button button-primary" href="/authority-engine">See the GAiO Authority Engine</Link></div></div>
          <div className="topic-mini-grid">{topicClusters.map((topic) => <Link className="topic-mini-card" href={`/topics/${topic.slug}`} key={topic.slug}><span className="meta">{topic.eyebrow}</span><strong>{topic.name}</strong><p>{topic.promise}</p></Link>)}</div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="wrap">
          <div className="split-head"><div><p className="eyebrow">Research and tools</p><h2 className="display section-title">Premium resources that lead to useful action.</h2></div><Link className="button button-ghost" href="/resources">Open the resource library <ArrowRight size={16} /></Link></div>
          <ResourceLibrary compact />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="split-head"><div><p className="eyebrow">Insights</p><h2 className="display section-title">Original thinking with visible ownership and evidence.</h2></div><Link className="button button-ghost" href={blogListingHref}>See all insights <ArrowRight size={16} /></Link></div>
          <div className="blog-card-grid">{latestInsights.map((post) => <BlogPostCard key={post._id} title={post.title} subtitle={`${post.author} · ${post.category}`} href={blogHref(post.slug)} image={post.imageUrl} likes={post.likes} comments={post.comments} views={post.views} />)}</div>
        </div>
      </section>

      <section className="section section-dark"><div className="wrap"><NewsletterSignup source="homepage" /></div></section>

      <section className="section">
        <div className="wrap">
          <div className="split-head"><div><p className="eyebrow">Questions, answered</p><h2 className="display section-title">GEO should be clear before it becomes complex.</h2></div></div>
          <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
        </div>
      </section>
      <CTA />
    </LayoutFrame>
  );
}
