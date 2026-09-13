import { services, team } from "@/lib/content";
import {
  absoluteUrl,
  siteAlternateNames,
  siteDescription,
  siteEmails,
  siteName,
  siteTagline,
  siteUrl,
} from "@/lib/site";
import { getEditorialProfile, getTopicCluster, type TopicCluster } from "@/lib/editorial";
import type { InsightPost } from "@/sanity/lib/posts";

/** Sitewide Organization / WebSite / ProfessionalService graph for AI + search grounding. */
export function buildSiteJsonLd() {
  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;
  const serviceId = `${siteUrl}/#professionalservice`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        alternateName: [...siteAlternateNames],
        url: siteUrl,
        description: siteDescription,
        slogan: siteTagline,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/icons/icon-192.png"),
          width: 192,
          height: 192,
        },
        email: siteEmails.connect,
        employee: team.map((person) => ({
          "@type": "Person",
          name: person.name,
          jobTitle: person.role,
          description: person.about,
          email: person.email,
          url: absoluteUrl("/about"),
        })),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteEmails.connect,
            url: absoluteUrl("/book"),
            availableLanguage: ["English"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: siteEmails.support,
            availableLanguage: ["English"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteName,
        alternateName: [...siteAlternateNames],
        url: siteUrl,
        description: siteDescription,
        inLanguage: "en",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: `${siteName} — AI Search Visibility & GEO Agency`,
        alternateName: ["GEO agency", "AI search visibility agency"],
        url: siteUrl,
        description: siteDescription,
        serviceType: [
          "Generative Engine Optimization",
          "GEO",
          "Answer Engine Optimization",
          "AI search visibility consulting",
        ],
        provider: { "@id": organizationId },
        areaServed: "Worldwide",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `${siteName} GEO services`,
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.copy,
              url: absoluteUrl(`/services/${service.slug}`),
            },
          })),
        },
      },
    ],
  };
}

/** Article-level graph mirrors the authorship, dates, topic, and image visible on the page. */
export function buildArticleJsonLd(post: InsightPost) {
  const author = getEditorialProfile(post.author);
  const editor = getEditorialProfile(post.editor);
  const topic = getTopicCluster(post.topic);
  const url = absoluteUrl(`/blog/${post.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    mainEntityOfPage: url,
    url,
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.updatedAt || post.publishedAt
      ? { dateModified: post.updatedAt || post.publishedAt }
      : {}),
    ...(post.imageUrl ? { image: [post.imageUrl] } : {}),
    author: {
      "@type": author.slug === "editorial-desk" ? "Organization" : "Person",
      name: author.name,
      url: absoluteUrl(`/authors/${author.slug}`),
    },
    editor: {
      "@type": editor.slug === "editorial-desk" ? "Organization" : "Person",
      name: editor.name,
      url: absoluteUrl(`/authors/${editor.slug}`),
    },
    publisher: { "@id": `${siteUrl}/#organization` },
    articleSection: topic?.name || post.category,
    keywords: ["Generative Engine Optimization", post.category, topic?.name].filter(Boolean),
    ...(topic ? { isPartOf: absoluteUrl(`/topics/${topic.slug}`) } : {}),
  };
}

export function buildTopicJsonLd(topic: TopicCluster, articles: InsightPost[]) {
  const url = absoluteUrl(`/topics/${topic.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name: `${topic.name} topic hub`,
    description: topic.description,
    url,
    isPartOf: { "@id": `${siteUrl}/#website` },
    publisher: { "@id": `${siteUrl}/#organization` },
    hasPart: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: absoluteUrl(`/blog/${article.slug}`),
    })),
  };
}
