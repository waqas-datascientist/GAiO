"use client";

import Link from "next/link";
import { Activity, ArrowRight, BarChart3, Bot, Check, FileSearch, Info, Link2, Network, Search, Sparkles, Users } from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";

type QueryScenario = {
  id: string;
  stage: string;
  query: string;
  intent: string;
  coverage: Record<string, number>;
  accuracy: Record<string, string>;
  sources: { label: string; value: number; kind: string }[];
  gaps: { signal: string; status: "Ready" | "Improve" | "Missing"; action: string }[];
};

const engines = ["Google AI Overview", "ChatGPT", "Perplexity", "Gemini"];

const workspaceViews = [
  {
    id: "overview",
    label: "Overview",
    icon: BarChart3,
    eyebrow: "Decision view",
    title: "See the signals that deserve action.",
    copy: "Bring answer coverage, representation quality, sources, technical access, and commercial outcomes into one accountable view.",
    signals: ["Engine comparison", "Priority movement", "Owned action queue"],
  },
  {
    id: "prompts",
    label: "Prompts",
    icon: Search,
    eyebrow: "Market questions",
    title: "Track decisions, not an inflated prompt count.",
    copy: "Organise a stable set by audience, intent, market, language, and funnel stage so changes remain comparable.",
    signals: ["Fixed question set", "Intent and persona tags", "Dated answer runs"],
  },
  {
    id: "citations",
    label: "Citations",
    icon: Link2,
    eyebrow: "Source intelligence",
    title: "Find the sources shaping the answer.",
    copy: "Separate owned, earned, community, and institutional sources, then inspect which useful assets and independent mentions are missing.",
    signals: ["Source overlap", "Citation gaps", "Evidence quality"],
  },
  {
    id: "competitors",
    label: "Competitors",
    icon: Users,
    eyebrow: "Category position",
    title: "Understand who is named—and why.",
    copy: "Compare representation, source coverage, offer clarity, and independent authority without treating probabilistic answers like fixed rankings.",
    signals: ["Share of answer", "Narrative differences", "Source advantage"],
  },
  {
    id: "crawlers",
    label: "Crawlers",
    icon: Bot,
    eyebrow: "Technical access",
    title: "Know whether priority pages can be retrieved.",
    copy: "Review verified agent access, rendering, status codes, canonical paths, and errors before assuming an editorial problem.",
    signals: ["Verified user agents", "Page access timeline", "Errors and blocks"],
  },
  {
    id: "content",
    label: "Content",
    icon: FileSearch,
    eyebrow: "Opportunity system",
    title: "Turn missing answers into owned briefs.",
    copy: "Connect each gap to the page, evidence, expert, internal links, and next action required to create a better source.",
    signals: ["Coverage gaps", "Evidence requirements", "Brief priority"],
  },
  {
    id: "entities",
    label: "Entities",
    icon: Network,
    eyebrow: "Knowledge consistency",
    title: "Make the organisation and its expertise agree.",
    copy: "Inspect people, services, topics, profiles, markup, and third-party descriptions for contradictions or missing relationships.",
    signals: ["Identity consistency", "Schema coverage", "Relationship gaps"],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: Activity,
    eyebrow: "Commercial signals",
    title: "Connect visibility to useful business outcomes.",
    copy: "Review AI referrals, assisted journeys, audit starts, bookings, and qualified conversions while stating the limits of attribution.",
    signals: ["AI referrals", "Assisted actions", "Conversion quality"],
  },
] as const;

const scenarios: QueryScenario[] = [
  {
    id: "partner",
    stage: "Decision",
    query: "Which GEO partner can help a B2B team improve AI-search visibility?",
    intent: "Compare specialists and understand evidence, method, and commercial fit.",
    coverage: { "Google AI Overview": 62, ChatGPT: 54, Perplexity: 71, Gemini: 46 },
    accuracy: { "Google AI Overview": "Clear", ChatGPT: "Partial", Perplexity: "Clear", Gemini: "Needs context" },
    sources: [
      { label: "Owned expertise", value: 38, kind: "owned" },
      { label: "Earned coverage", value: 27, kind: "earned" },
      { label: "Community", value: 18, kind: "shared" },
      { label: "Institutional", value: 17, kind: "institutional" },
    ],
    gaps: [
      { signal: "Service definition", status: "Ready", action: "Keep one canonical definition across the site." },
      { signal: "Third-party corroboration", status: "Improve", action: "Earn expert citations on trusted industry sources." },
      { signal: "Outcome evidence", status: "Missing", action: "Publish an approved case note with method and limitations." },
    ],
  },
  {
    id: "audit",
    stage: "Consideration",
    query: "How do I audit whether AI systems understand and cite my company?",
    intent: "Find a practical diagnostic process and decide what to fix first.",
    coverage: { "Google AI Overview": 57, ChatGPT: 68, Perplexity: 76, Gemini: 61 },
    accuracy: { "Google AI Overview": "Partial", ChatGPT: "Clear", Perplexity: "Clear", Gemini: "Partial" },
    sources: [
      { label: "Owned expertise", value: 44, kind: "owned" },
      { label: "Earned coverage", value: 18, kind: "earned" },
      { label: "Community", value: 12, kind: "shared" },
      { label: "Institutional", value: 26, kind: "institutional" },
    ],
    gaps: [
      { signal: "Audit methodology", status: "Ready", action: "Link the assessment to the five-stage method." },
      { signal: "Crawler observations", status: "Improve", action: "Add dated server-log and rendering observations." },
      { signal: "Benchmark history", status: "Missing", action: "Record a stable prompt set before changes begin." },
    ],
  },
  {
    id: "content",
    stage: "Learning",
    query: "What makes business content citation-ready for generative search?",
    intent: "Learn the editorial and evidence standards behind citable answers.",
    coverage: { "Google AI Overview": 73, ChatGPT: 64, Perplexity: 82, Gemini: 59 },
    accuracy: { "Google AI Overview": "Clear", ChatGPT: "Clear", Perplexity: "Clear", Gemini: "Partial" },
    sources: [
      { label: "Owned expertise", value: 49, kind: "owned" },
      { label: "Earned coverage", value: 16, kind: "earned" },
      { label: "Community", value: 10, kind: "shared" },
      { label: "Institutional", value: 25, kind: "institutional" },
    ],
    gaps: [
      { signal: "Direct answer", status: "Ready", action: "Preserve the answer-first page contract." },
      { signal: "Named method", status: "Ready", action: "Repeat the evidence ladder on relevant guides." },
      { signal: "Original dataset", status: "Improve", action: "Add a small reproducible citation-readiness study." },
    ],
  },
];

const readiness = [
  "Priority pages return meaningful server-rendered content",
  "Canonical URLs and crawlable internal links are consistent",
  "Organisation, service, article, and author entities match visible truth",
  "Claims identify their source, method, owner, and limitation",
  "Topic hubs connect learning intent to proof and commercial next steps",
];

export function VisibilityLab() {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [engine, setEngine] = useState(engines[0]);
  const [workspaceView, setWorkspaceView] = useState<(typeof workspaceViews)[number]["id"]>("overview");
  const scenario = useMemo(
    () => scenarios.find((item) => item.id === scenarioId) ?? scenarios[0],
    [scenarioId],
  );
  const coverage = scenario.coverage[engine];
  const selectedWorkspaceView = workspaceViews.find((view) => view.id === workspaceView) ?? workspaceViews[0];

  return (
    <div className="visibility-lab-shell">
      <div className="lab-notice" role="note">
        <Info size={16} aria-hidden="true" />
        <strong>Illustrative workspace</strong>
        <span>Sample observations only—no live model, competitor, or customer data.</span>
      </div>

      <section className="lab-workspace" aria-labelledby="lab-workspace-title">
        <nav className="lab-workspace-nav" aria-label="Visibility workspace views">
          <span className="meta">GAiO / Visibility workspace</span>
          <div role="tablist" aria-label="Workspace module">
            {workspaceViews.map((view) => {
              const Icon = view.icon;
              return (
                <button type="button" role="tab" aria-selected={workspaceView === view.id} onClick={() => setWorkspaceView(view.id)} key={view.id}>
                  <Icon size={16} aria-hidden="true" />{view.label}
                </button>
              );
            })}
          </div>
        </nav>
        <div className="lab-workspace-content" role="tabpanel">
          <div>
            <p className="eyebrow">{selectedWorkspaceView.eyebrow}</p>
            <h2 id="lab-workspace-title">{selectedWorkspaceView.title}</h2>
            <p>{selectedWorkspaceView.copy}</p>
          </div>
          <div className="lab-workspace-signals">
            {selectedWorkspaceView.signals.map((signal, index) => (
              <article key={signal}><span>0{index + 1}</span><strong>{signal}</strong><small>Inspectable signal</small></article>
            ))}
          </div>
        </div>
      </section>

      <div className="lab-query-panel">
        <div>
          <p className="eyebrow">01 / Select a market question</p>
          <h2>Start with a customer decision, not a vanity prompt list.</h2>
        </div>
        <label className="lab-query-select">
          <Search size={19} aria-hidden="true" />
          <span className="sr-only">Select a sample market query</span>
          <select value={scenarioId} onChange={(event) => setScenarioId(event.target.value)}>
            {scenarios.map((item) => (
              <option value={item.id} key={item.id}>{item.query}</option>
            ))}
          </select>
        </label>
        <div className="lab-query-context">
          <span>{scenario.stage} stage</span>
          <p>{scenario.intent}</p>
        </div>
      </div>

      <div className="lab-engine-tabs" role="tablist" aria-label="Answer engine">
        {engines.map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={engine === item}
            onClick={() => setEngine(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="lab-metric-grid">
        <article className="lab-score-card">
          <p className="meta">Illustrative coverage</p>
          <div className="lab-score-ring" style={{ "--score": `${coverage * 3.6}deg` } as CSSProperties}>
            <strong>{coverage}</strong><span>/ 100</span>
          </div>
          <p>A directional view of whether this question is supported by clear, relevant, and corroborated brand information.</p>
        </article>
        <article className="lab-signal-card">
          <p className="meta">Representation quality</p>
          <strong>{scenario.accuracy[engine]}</strong>
          <p>Review accuracy, completeness, consistency, and whether the answer is supported by defensible sources.</p>
        </article>
        <article className="lab-signal-card">
          <p className="meta">Highest-leverage move</p>
          <strong>{scenario.gaps.find((gap) => gap.status !== "Ready")?.signal ?? "Maintain clarity"}</strong>
          <p>{scenario.gaps.find((gap) => gap.status !== "Ready")?.action}</p>
        </article>
      </div>

      <div className="lab-analysis-grid">
        <section className="lab-panel">
          <div className="lab-panel-heading">
            <div><p className="eyebrow">02 / Source mix</p><h2>Where the answer gets its confidence.</h2></div>
            <span className="lab-panel-chip">Sample model</span>
          </div>
          <div className="source-bars">
            {scenario.sources.map((source) => (
              <div className="source-bar-row" key={source.label}>
                <div><span>{source.label}</span><strong>{source.value}%</strong></div>
                <div className="source-bar-track"><span className={`source-bar source-bar-${source.kind}`} style={{ width: `${source.value}%` }} /></div>
              </div>
            ))}
          </div>
          <p className="lab-caption">A healthy answer surface rarely depends on one owned page. It combines useful first-party expertise with independent corroboration.</p>
        </section>

        <section className="lab-panel">
          <div className="lab-panel-heading">
            <div><p className="eyebrow">03 / Opportunity map</p><h2>Turn gaps into owned actions.</h2></div>
          </div>
          <div className="gap-list">
            {scenario.gaps.map((gap) => (
              <article key={gap.signal}>
                <span className={`gap-status gap-status-${gap.status.toLowerCase()}`}>{gap.status}</span>
                <div><h3>{gap.signal}</h3><p>{gap.action}</p></div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="lab-readiness">
        <div>
          <p className="eyebrow">04 / Retrieval readiness</p>
          <h2 className="display section-title">Make every signal easier to find, verify, and connect.</h2>
          <p className="lede">The technical layer should support the editorial truth—not try to replace it.</p>
        </div>
        <ol>
          {readiness.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><Check size={18} aria-hidden="true" /><p>{item}</p></li>
          ))}
        </ol>
      </section>

      <section className="lab-final-cta">
        <div>
          <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> Replace the demo with your market</p>
          <h2 className="display section-title">See what AI can understand about your business today.</h2>
          <p>The readiness assessment turns your real pages, priority questions, entities, and proof into a focused starting plan.</p>
        </div>
        <div className="hero-actions">
          <Link className="button button-signal" href="/assessment">Run your assessment <ArrowRight size={16} /></Link>
          <Link className="button button-ghost" href="/methodology">Explore the method</Link>
        </div>
      </section>
    </div>
  );
}
