import { CTA, LayoutFrame, PageHero } from "@/components/page-elements";
import { VisibilityLab } from "@/components/visibility-lab";

export const metadata = {
  title: "AI Visibility Lab",
  description: "Explore how GAiO connects priority queries, answer-engine observations, citations, entity clarity, content gaps, and practical next actions.",
};

export default function VisibilityLabPage() {
  return (
    <LayoutFrame>
      <PageHero
        eyebrow="AI Visibility Lab"
        title="See the system behind an AI-search answer."
        copy="Explore an illustrative workspace that turns market questions, source patterns, representation quality, and technical readiness into a prioritized GEO action plan."
        action={false}
      />
      <section className="section section-muted lab-section">
        <div className="wrap"><VisibilityLab /></div>
      </section>
      <CTA />
    </LayoutFrame>
  );
}
