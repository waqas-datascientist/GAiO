import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LayoutFrame, PageHero } from "@/components/page-elements";
import { editorialProfiles } from "@/lib/editorial";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Authors and editors",
  description: "Meet the named authors and editorial reviewers responsible for GAiO Engine's research, guidance, and evidence standards.",
  alternates: { canonical: absoluteUrl("/authors") },
};

export default function AuthorsPage() {
  return (
    <LayoutFrame>
      <PageHero
        eyebrow="Editorial accountability"
        title="The people behind every useful claim."
        copy="GAiO content identifies who wrote it, who reviewed it, and which expertise each contributor brings to the work."
        action={false}
      />
      <section className="section">
        <div className="wrap author-grid">
          {editorialProfiles.map((profile) => (
            <article className="author-card" key={profile.slug}>
              {profile.imageSrc ? <Image src={profile.imageSrc} alt="" width={160} height={160} /> : <div className="author-card-mark" aria-hidden="true">G</div>}
              <div>
                <p className="eyebrow">{profile.role}</p>
                <h2>{profile.name}</h2>
                <p>{profile.specialty}</p>
                <Link href={`/authors/${profile.slug}`}>View editorial profile <ArrowRight size={15} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </LayoutFrame>
  );
}
