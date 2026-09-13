import Link from "next/link";
import { ArrowRight, Mail, SearchCheck } from "lucide-react";
import { LayoutFrame, PageHero } from "@/components/page-elements";
import { siteEmails } from "@/lib/site";

export const metadata = {
  title: "Talk to GAiO Engine",
  description: "Start an AI search visibility conversation with the GAiO Engine team.",
};

export default function BookPage() {
  const subject = encodeURIComponent("GAiO Engine strategy conversation");

  return (
    <LayoutFrame>
      <PageHero
        eyebrow="Strategy conversation"
        title="Bring the questions your market is asking."
        copy="Tell us where your business needs to appear and what evidence you already have. We will help you identify the most useful next step—without pretending a calendar is connected when it is not."
        action={false}
      />
      <section className="section section-muted">
        <div className="wrap contact-choice-grid">
          <article className="contact-choice-card">
            <SearchCheck size={28} aria-hidden="true" />
            <p className="meta">Recommended first step</p>
            <h2>Request the free AI visibility audit</h2>
            <p>Share your market, competitors, and real buyer questions so the first conversation starts with useful context.</p>
            <Link className="button button-signal" href="/assessment">
              Start the audit <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
          <article className="contact-choice-card contact-choice-card-dark">
            <Mail size={28} aria-hidden="true" />
            <p className="meta">Direct contact</p>
            <h2>Email the strategy team</h2>
            <p>A live scheduling provider is not connected yet. Email us directly and we will reply with a suitable time.</p>
            <a className="button button-ghost" href={`mailto:${siteEmails.connect}?subject=${subject}`}>
              {siteEmails.connect} <ArrowRight size={16} aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>
      <section className="section">
        <div className="wrap service-next-step">
          <div>
            <p className="eyebrow">Existing work</p>
            <h2 className="section-title">Need project support?</h2>
          </div>
          <a className="button button-outline" href={`mailto:${siteEmails.support}`}>
            Email {siteEmails.support} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </LayoutFrame>
  );
}
