export type StandardsDocument = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: readonly { title: string; body: string; points?: readonly string[] }[];
};

export const standardsDocuments: readonly StandardsDocument[] = [
  {
    slug: "editorial-policy",
    eyebrow: "Editorial accountability",
    title: "Editorial policy",
    description: "How GAiO Engine assigns ownership, reviews claims, handles AI assistance, and keeps published guidance useful.",
    updated: "13 September 2026",
    sections: [
      { title: "Visible ownership", body: "Every substantive article should name its author and editor or reviewer. Those names link to profiles that explain their role and relevant area of work." },
      { title: "Claims before volume", body: "We prefer a smaller body of specific, maintained guidance to high-volume generic publishing.", points: ["Direct answers must match the supporting explanation.", "Non-obvious factual claims require a named source or an inspectable first-party artefact.", "Recommendations, interpretations, and observations must be distinguishable from established facts."] },
      { title: "Responsible AI assistance", body: "AI tools may support outlining, comparison, editing, or quality checks. A named person remains accountable for accuracy, originality, sourcing, and the final published version." },
      { title: "Updates", body: "Material updates should change the visible updated date. Pages are reviewed when important sources, platform behavior, evidence, or the recommended action changes." },
    ],
  },
  {
    slug: "corrections-policy",
    eyebrow: "Corrections",
    title: "Corrections policy",
    description: "How readers can report an error and how GAiO Engine records meaningful corrections.",
    updated: "13 September 2026",
    sections: [
      { title: "Report a concern", body: "Send the page URL, the statement you believe is wrong, and any supporting source to support@gaioengine.com. We review factual errors, broken evidence, authorship concerns, and misleading presentation." },
      { title: "What happens next", body: "We check the published claim against the source, underlying artefact, and stated method. If a correction is needed, we update the page and its modification date rather than silently preserving an inaccurate claim." },
      { title: "Material corrections", body: "When a correction changes the meaning of a conclusion, reported number, attribution, or recommendation, the article should include a visible correction note explaining what changed and when." },
      { title: "Disagreement is not automatically an error", body: "Professional interpretations can differ. When a conclusion depends on judgment, the page should explain its assumptions and limitations so readers can evaluate it." },
    ],
  },
  {
    slug: "evidence-standards",
    eyebrow: "Proof practice",
    title: "Evidence standards",
    description: "The minimum context required before GAiO Engine treats a screenshot, source, experiment, or dataset as evidence.",
    updated: "13 September 2026",
    sections: [
      { title: "Evidence levels", body: "We separate first-party observations, controlled experiments, interviews, datasets, primary sources, supporting sources, and untested hypotheses. The label should match what the material can actually support." },
      { title: "Required context", body: "A useful evidence record answers the basic inspection questions.", points: ["What was observed or measured?", "When, where, and under which conditions?", "Which source or artefact supports the claim?", "Who recorded or reviewed it?", "What can the evidence not establish?"] },
      { title: "AI-answer screenshots", body: "A screenshot documents one output under one set of conditions. It does not prove permanent placement, universal visibility, causal impact, or a repeatable rank." },
      { title: "No manufactured authority", body: "We do not create fictional client names, testimonials, awards, studies, or performance results. Unfinished research is labelled as planned or coming soon rather than presented as published evidence." },
    ],
  },
  {
    slug: "ai-visibility-measurement",
    eyebrow: "Measurement methodology",
    title: "How GAiO Engine measures AI visibility",
    description: "A transparent framework for observing mentions and citations without treating probabilistic answers like fixed rankings.",
    updated: "13 September 2026",
    sections: [
      { title: "Start with a fixed question set", body: "We agree the real buyer questions, target market, language, engines, and observation conditions before comparing change. A focused set is more useful than thousands of disconnected prompts." },
      { title: "Record more than a mention", body: "The observation log can include brand mention, linked citation, source position, competitor presence, description accuracy, sentiment, and whether the answer supports a realistic next step." },
      { title: "Connect visibility to owned signals", body: "We review the cited sources, crawl access, priority pages, entity consistency, evidence, external corroboration, and conversion path behind the observed answer." },
      { title: "Report limits and commercial context", body: "AI outputs vary by model, time, account, location, and retrieval state. We report trends as dated observations and connect them to qualified visits, audit requests, and assisted leads where those events can be measured." },
    ],
  },
] as const;

export function getStandardsDocument(slug: string) {
  return standardsDocuments.find((document) => document.slug === slug) ?? null;
}
