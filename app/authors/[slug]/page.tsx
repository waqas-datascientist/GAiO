import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LayoutFrame } from "@/components/page-elements";
import { BlogPostCard } from "@/components/blog-post-card";
import { editorialProfiles } from "@/lib/editorial";
import { absoluteUrl } from "@/lib/site";
import { getInsightPosts } from "@/sanity/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return editorialProfiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = editorialProfiles.find((item) => item.slug === slug);
  if (!profile) return { title: "Author not found" };
  const canonical = absoluteUrl(`/authors/${profile.slug}`);
  const images = profile.imageSrc ? [{ url: absoluteUrl(profile.imageSrc), alt: `Portrait of ${profile.name}` }] : [];
  return {
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio,
    alternates: { canonical },
    openGraph: { type: "profile", title: `${profile.name} — ${profile.role}`, description: profile.bio, url: canonical, images },
    twitter: { card: profile.imageSrc ? "summary_large_image" : "summary", title: `${profile.name} — ${profile.role}`, description: profile.bio, images },
  };
}

export default async function AuthorDetailPage({ params }: Props) {
  const { slug } = await params;
  const profile = editorialProfiles.find((item) => item.slug === slug);
  if (!profile) notFound();
  const posts = (await getInsightPosts()).filter(
    (post) => post.author === profile.name || post.editor === profile.name,
  );
  const url = absoluteUrl(`/authors/${profile.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    mainEntity: {
      "@type": profile.slug === "editorial-desk" ? "Organization" : "Person",
      name: profile.name,
      jobTitle: profile.role,
      description: profile.bio,
      url,
      ...(profile.imageSrc ? { image: absoluteUrl(profile.imageSrc) } : {}),
    },
  };

  return (
    <LayoutFrame>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="page-hero author-profile-hero">
        <div className="wrap author-profile-grid">
          {profile.imageSrc ? <Image src={profile.imageSrc} alt={`Portrait of ${profile.name}`} width={360} height={360} priority /> : <div className="author-profile-mark" aria-hidden="true">GAiO</div>}
          <div className="section-intro">
            <nav className="article-breadcrumbs" aria-label="Breadcrumb"><Link href="/authors">Authors</Link><span aria-hidden="true">/</span><span>{profile.name}</span></nav>
            <p className="eyebrow">{profile.role}</p>
            <h1 className="display headline">{profile.name}</h1>
            <p className="lede">{profile.bio}</p>
            <p className="author-specialty"><strong>Editorial focus:</strong> {profile.specialty}</p>
          </div>
        </div>
      </header>
      <section className="section">
        <div className="wrap">
          <div className="split-head">
            <div><p className="eyebrow">Published and reviewed work</p><h2 className="display section-title">Accountability follows the article.</h2></div>
            <Link className="button button-ghost" href="/topics">Explore topic hubs</Link>
          </div>
          {posts.length ? (
            <div className="blog-card-grid">
              {posts.map((post) => <BlogPostCard key={post._id} title={post.title} subtitle={post.author === profile.name ? "Author" : "Editor"} href={`/blog/${post.slug}`} image={post.imageUrl} likes={post.likes} comments={post.comments} views={post.views} />)}
            </div>
          ) : <p className="author-empty">This profile supports the editorial standard. Linked articles will appear here as the library is updated.</p>}
        </div>
      </section>
    </LayoutFrame>
  );
}
