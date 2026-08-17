export type TopicSlug =
  | "geo-fundamentals"
  | "citation-ready-content"
  | "entity-authority"
  | "measurement-experiments";

export type TopicCluster = {
  slug: TopicSlug;
  name: string;
  eyebrow: string;
  description: string;
  promise: string;
  pillarHref: string;
  pillarLabel: string;
  questions: readonly string[];
};

export const topicClusters: readonly TopicCluster[] = [
  {
    slug: "geo-fundamentals",
    name: "GEO fundamentals",
    eyebrow: "Start here",
    description:
      "Plain-language guidance on generative engine optimization, how it complements SEO, and what a responsible programme can—and cannot—promise.",
    promise: "Understand the field before choosing tactics.",
    pillarHref: "/methodology",
    pillarLabel: "Explore the GAiO method",
    questions: [
      "What is GEO?",
      "How is GEO different from SEO and AEO?",
      "What should a GEO programme measure?",
    ],
  },
  {
    slug: "citation-ready-content",
    name: "Citation-ready content",
    eyebrow: "Editorial systems",
    description:
      "Answer-first structures, source discipline, useful examples, and editorial controls that make expertise easier to understand and verify.",
    promise: "Turn useful knowledge into inspectable answer assets.",
    pillarHref: "/services",
    pillarLabel: "See answer-ready content services",
    questions: [
      "What makes a page worth citing?",
      "How should evidence appear on a page?",
      "What improves clarity without keyword stuffing?",
    ],
  },
  {
    slug: "entity-authority",
    name: "Entity & authority",
    eyebrow: "Trust systems",
    description:
      "The people, organisations, claims, profiles, and third-party corroboration that help a brand become a consistent, verifiable entity over time.",
    promise: "Build a clearer identity and a longer evidence trail.",
    pillarHref: "/about",
    pillarLabel: "Meet the people behind GAiO",
    questions: [
      "How do named experts strengthen trust?",
      "What is entity consistency?",
      "Why does third-party corroboration matter?",
    ],
  },
  {
    slug: "measurement-experiments",
    name: "Measurement & experiments",
    eyebrow: "Proof practice",
    description:
      "Query sets, citation observations, controlled refreshes, and conversion signals that replace vague AI-visibility claims with an accountable learning loop.",
    promise: "Measure change without manufacturing certainty.",
    pillarHref: "/proof",
    pillarLabel: "Inspect GAiO proof",
    questions: [
      "How should AI presence be measured?",
      "What counts as original evidence?",
      "How do teams run a useful content experiment?",
    ],
  },
] as const;

export function getTopicCluster(slug: string | null | undefined) {
  return topicClusters.find((topic) => topic.slug === slug) ?? null;
}

export function inferTopicSlug(input: {
  topic?: string | null;
  title?: string | null;
  category?: string | null;
}): TopicSlug {
  const exact = getTopicCluster(input.topic);
  if (exact) return exact.slug;

  const haystack = `${input.title ?? ""} ${input.category ?? ""}`.toLowerCase();
  if (/measure|traffic|monitor|experiment|proof|data|analytics|conversion/.test(haystack)) {
    return "measurement-experiments";
  }
  if (/citation|content|editor|answer|headline|source/.test(haystack)) {
    return "citation-ready-content";
  }
  if (/entity|authority|author|brand|trust|corrobor/.test(haystack)) {
    return "entity-authority";
  }
  return "geo-fundamentals";
}

export type EditorialProfile = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  imageSrc?: string;
};

export const editorialProfiles: readonly EditorialProfile[] = [
  {
    slug: "afnan-k",
    name: "Afnan K.",
    role: "Certified AI Specialist",
    specialty: "AI systems, source discipline, and generative search strategy",
    bio: "Afnan focuses on practical generative-search strategy and the evidence standards that make recommendations more responsible and useful.",
    imageSrc: "/team/afnan-k.png",
  },
  {
    slug: "waqas-k",
    name: "Waqas K.",
    role: "Certified Senior Developer",
    specialty: "Technical delivery, structured content, and measurement systems",
    bio: "Waqas builds the technical foundations that make editorial knowledge crawlable, connected, measurable, and maintainable.",
    imageSrc: "/team/waqas-k.png",
  },
  {
    slug: "editorial-desk",
    name: "GAiO Editorial Desk",
    role: "Editorial review team",
    specialty: "Clarity, sourcing, internal links, and update controls",
    bio: "The GAiO Editorial Desk reviews house content for clear claims, visible sourcing, useful links, and honest distinctions between observed evidence and recommendations.",
  },
] as const;

export function getEditorialProfile(name: string | null | undefined) {
  if (!name) return editorialProfiles[2];
  const normalized = name.trim().toLowerCase();
  return (
    editorialProfiles.find(
      (profile) =>
        profile.name.toLowerCase() === normalized ||
        profile.slug === normalized.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    ) ?? editorialProfiles[2]
  );
}

export const authorityTerms = [
  {
    term: "Domain authority",
    definition:
      "The accumulated reputation and evidence connected to a domain. It is not a switch or a guarantee; it compounds through useful publishing, credible authors, quality mentions, consistent entities, and time.",
    implementation: "Preserve valuable URLs, show update dates, strengthen expert profiles, and earn corroboration outside the site.",
  },
  {
    term: "Topic hub",
    definition:
      "A durable index page for one subject that explains the field, points to a pillar resource, and organises every supporting article by reader need.",
    implementation: "Use one stable hub URL per strategic topic and link every relevant article back to it.",
  },
  {
    term: "Topic cluster",
    definition:
      "A pillar page plus a planned group of supporting articles that answer narrower questions around the same subject.",
    implementation: "Assign each article one primary cluster and connect it to its hub, pillar page, and closely related reading.",
  },
  {
    term: "Internal links",
    definition:
      "Descriptive links between your own pages that help readers continue a task and help crawlers understand which pages are related and important.",
    implementation: "Add contextual links inside articles, hub links near the top, related reading after the answer, and commercial next steps where relevant.",
  },
  {
    term: "Newsletter conversion",
    definition:
      "Turning a useful visit into permission to continue the relationship by email. The value promise and placement matter more than a generic ‘subscribe’ label.",
    implementation: "Offer a specific weekly brief at the hub, mid-article, and end-of-article moments; record consent and signup source.",
  },
  {
    term: "Click-attracting headline",
    definition:
      "A specific, accurate title that makes the reader’s problem, decision, or outcome immediately clear without using misleading clickbait.",
    implementation: "Combine the real question, a concrete payoff, and a useful constraint—then make sure the article fully delivers it.",
  },
  {
    term: "Key takeaways",
    definition:
      "A short answer block that gives readers the main conclusions before the detailed explanation.",
    implementation: "Write three to five standalone points that reflect the article rather than repeating its introduction.",
  },
  {
    term: "Original evidence",
    definition:
      "First-hand material the publisher can inspect and explain: experiments, interviews, observed result captures, anonymised datasets, benchmarks, or documented field work.",
    implementation: "Publish the method, date, scope, limitations, and supporting artefact beside the conclusion.",
  },
  {
    term: "Named author and editor",
    definition:
      "Visible accountability for who created a piece and who reviewed its clarity or evidence.",
    implementation: "Link author and editor names to profile pages and keep the same identities in Article structured data.",
  },
  {
    term: "Commercial CTA",
    definition:
      "A relevant next step that connects the reader’s current problem to a service, assessment, or conversation.",
    implementation: "Use distinct CTAs for early exploration, mid-article diagnosis, and high-intent booking instead of repeating one button everywhere.",
  },
  {
    term: "Related-content system",
    definition:
      "A consistent method for recommending the next useful page based on shared topic, reader intent, and editorial priority.",
    implementation: "Score shared cluster and category first, then use headline similarity as a fallback; never rely on random recency alone.",
  },
  {
    term: "Social distribution",
    definition:
      "Repackaging and sharing each published insight across the channels where the intended audience already pays attention.",
    implementation: "Prepare a strong social angle, a short expert takeaway, a visual proof asset, and a link back to the canonical article.",
  },
] as const;

export const authorityPhases = [
  {
    range: "Days 1–30",
    title: "Build the source of truth",
    outcome: "A clean information architecture and an accountable editorial baseline.",
    actions: [
      "Choose four strategic topic clusters and one pillar page for each.",
      "Give every article a named author, editor, update date, key takeaways, and evidence notes.",
      "Fix crawl, canonical, sitemap, metadata, author, and Article structured-data coverage.",
      "Create a baseline query set and record current citations, mentions, and assisted conversions.",
    ],
  },
  {
    range: "Days 31–60",
    title: "Publish and connect",
    outcome: "Topic depth that readers and retrieval systems can navigate.",
    actions: [
      "Upgrade the strongest existing articles before adding volume.",
      "Publish supporting answers for real customer questions and link them to the correct hub.",
      "Add evidence ledgers, original observations, decision tables, and precise service next steps.",
      "Launch the newsletter promise and place signup moments at high-value reading transitions.",
    ],
  },
  {
    range: "Days 61–90",
    title: "Distribute and learn",
    outcome: "A repeatable feedback loop between publishing, external attention, and commercial value.",
    actions: [
      "Turn each article into channel-specific social posts, newsletter sections, and expert commentary.",
      "Pursue relevant third-party mentions, interviews, partnerships, and citations without manufacturing them.",
      "Re-run the query set and compare source coverage, representation accuracy, and conversion quality.",
      "Refresh pages where the evidence, headline, links, or offer is weaker than the competing answer set.",
    ],
  },
  {
    range: "Quarter 2 onward",
    title: "Compound authority",
    outcome: "A maintained library whose history, authors, sources, and useful links become more valuable over time.",
    actions: [
      "Review priority hubs monthly and every evergreen article at least twice a year.",
      "Retain strong URLs, document meaningful updates, and consolidate overlapping pages.",
      "Publish original research only when the method and limitations can be shown.",
      "Keep investing in expert reputation and independent corroboration beyond the domain.",
    ],
  },
] as const;

export const editorialSources = [
  {
    label: "Google: optimizing for generative AI features",
    href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
    note: "Technical accessibility, useful content, and existing SEO foundations remain central; inclusion is not guaranteed.",
  },
  {
    label: "Google: helpful, reliable, people-first content",
    href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
    note: "Clear sourcing, visible expertise, and author background are trust signals readers should be able to inspect.",
  },
  {
    label: "Google: Article structured data",
    href: "https://developers.google.com/search/docs/appearance/structured-data/article",
    note: "Article markup can identify authors, author URLs, headlines, and publication or modification dates.",
  },
  {
    label: "Aggarwal et al.: Generative Engine Optimization",
    href: "https://arxiv.org/abs/2311.09735",
    note: "The original GEO research frames visibility as a measurable, query- and domain-dependent optimization problem.",
  },
] as const;
