import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, Route, ShieldCheck } from "lucide-react";
import { resourceLibrary } from "@/lib/content";

const icons = [BookOpen, FlaskConical, ShieldCheck, Route] as const;

export function ResourceLibrary({ compact = false }: { compact?: boolean }) {
  const resources = compact ? resourceLibrary.slice(0, 3) : resourceLibrary;

  return (
    <div className={`resource-library${compact ? " resource-library-compact" : ""}`}>
      {resources.map((resource, index) => {
        const Icon = icons[index] ?? BookOpen;
        return (
          <article className={`resource-card resource-card-${resource.tone}`} key={resource.title}>
            <div className="resource-cover" aria-hidden="true">
              <div className="resource-cover-topline"><span>{resource.index}</span><Icon size={18} /></div>
              <strong>{resource.title}</strong>
              <span className="resource-cover-mark">GAiO</span>
              <small>{resource.format}</small>
            </div>
            <div className="resource-card-copy">
              <span className="meta">{resource.format}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <Link href={resource.href}>{resource.action} <ArrowRight size={15} /></Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
