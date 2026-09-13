import { LayoutFrame, PageHero } from "@/components/page-elements";
import { AssessmentForm } from "@/components/interactive";

export const metadata = {
  title: "Free AI Search Visibility Audit",
  description: "Request a focused review of your website, target market, competitors, customer questions, entity clarity, evidence, and AI-search readiness.",
};

export default function AssessmentPage() {
  return <LayoutFrame><PageHero eyebrow="Free AI search visibility audit" title="Start with the questions and competitors that matter." copy="Share your website, target market, competitive set, and up to five customer questions. We use that context to identify the first technical, content, entity, evidence, or measurement gap worth investigating." action={false} /><section className="section section-muted"><div className="wrap"><AssessmentForm /></div></section></LayoutFrame>;
}
