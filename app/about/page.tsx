import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LayoutFrame, PageHero, CTA } from "@/components/page-elements";
import { TeamCard } from "@/components/team-card";
import { team } from "@/lib/content";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <LayoutFrame>
      <PageHero
        eyebrow="About the agency"
        title="A team built for a search surface that keeps changing."
        copy="Generative AI Optimization connects technical search, editorial intelligence, and measurable growth work into one clear operating model."
      />
      <section className="section section-muted">
        <div className="wrap">
          <div className="team-grid">
            {team.map((person) => (
              <TeamCard
                key={person.name}
                name={person.name}
                role={person.role}
                about={person.about}
                initials={person.initials}
                avatarTone={person.avatarTone}
                email={person.email}
                imageSrc={person.imageSrc}
                imagePosition={person.imagePosition}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="prose">
            <p className="eyebrow">What we value</p>
            <h2 className="display section-title">Useful claims. Clear evidence. Honest reporting.</h2>
            <p>We do not sell placement guarantees. We build the conditions that make your knowledge easier to understand, support, and improve over time.</p>
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="wrap">
          <div className="split-head"><div><p className="eyebrow">Public standards</p><h2 className="display section-title">Trust should be inspectable.</h2></div><p className="lede">Our policies explain how content is owned, evidence is labelled, AI visibility is measured, and meaningful errors are corrected.</p></div>
          <div className="standards-link-grid">
            <Link href="/editorial-policy">Editorial policy <ArrowRight size={16} /></Link>
            <Link href="/evidence-standards">Evidence standards <ArrowRight size={16} /></Link>
            <Link href="/ai-visibility-measurement">AI visibility measurement <ArrowRight size={16} /></Link>
            <Link href="/corrections-policy">Corrections policy <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
      <CTA />
    </LayoutFrame>
  );
}
