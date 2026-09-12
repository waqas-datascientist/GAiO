import Link from "next/link";
import { ArrowRight, BarChart3, Bot, Link2, Network } from "lucide-react";
import type { CSSProperties } from "react";

const signals = [
  { icon: Bot, label: "Prompt market", copy: "Track the customer questions that shape discovery and decisions." },
  { icon: Link2, label: "Citation map", copy: "See which owned, earned, community, and institutional sources support an answer." },
  { icon: Network, label: "Entity clarity", copy: "Find where your name, offer, expertise, and proof agree—or drift." },
  { icon: BarChart3, label: "Qualified outcomes", copy: "Connect visibility observations to implementation and commercial actions." },
];

export function VisibilityPreview() {
  return (
    <section className="section visibility-preview-section">
      <div className="wrap visibility-preview-grid">
        <div className="visibility-preview-copy">
          <p className="eyebrow">Visibility intelligence</p>
          <h2 className="display section-title">From “Are we visible?” to “What should we improve next?”</h2>
          <p className="lede">A useful GEO view connects prompt observations to the sources, entities, pages, and decisions your team can actually change.</p>
          <Link className="button button-signal" href="/visibility-lab">Explore the Visibility Lab <ArrowRight size={16} /></Link>
          <p className="visibility-demo-label">Interactive demonstration · no live customer or model data</p>
        </div>
        <div className="visibility-preview-board" aria-label="Illustrative AI visibility system">
          <div className="preview-board-header"><span>GAiO / SIGNAL MAP</span><span className="preview-live">Illustrative</span></div>
          <div className="preview-query">How will a buyer discover and verify your expertise?</div>
          <div className="preview-orbit" aria-hidden="true">
            <span className="preview-orbit-core">SOURCE<br />OF TRUTH</span>
            <i className="preview-node preview-node-one">Pages</i>
            <i className="preview-node preview-node-two">Proof</i>
            <i className="preview-node preview-node-three">Entities</i>
            <i className="preview-node preview-node-four">Mentions</i>
          </div>
          <div className="preview-bars" aria-hidden="true">
            <span style={{ "--bar": "72%" } as CSSProperties}><i>Clarity</i></span>
            <span style={{ "--bar": "58%" } as CSSProperties}><i>Evidence</i></span>
            <span style={{ "--bar": "64%" } as CSSProperties}><i>Coverage</i></span>
          </div>
        </div>
        <div className="visibility-signal-grid">
          {signals.map((signal) => {
            const Icon = signal.icon;
            return <article key={signal.label}><Icon size={19} aria-hidden="true" /><h3>{signal.label}</h3><p>{signal.copy}</p></article>;
          })}
        </div>
      </div>
    </section>
  );
}
