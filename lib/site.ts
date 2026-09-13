/** Canonical public origin for sitemap, robots, and metadataBase. */
export const siteUrl = "https://gaio-engine.vercel.app";

/** Preferred citation name for AI answer engines and human references. */
export const siteName = "GAiO Engine";

/** Compact mark for favicons, particle letterforms, and tight UI. */
export const siteShortName = "GAiO";

export const siteAlternateNames = [
  "GAiO",
  "Generative AI Optimization",
  "gaioengine.com",
] as const;

export const siteTagline =
  "We help businesses become the sources Google and AI answer engines can find, understand, trust, cite, and recommend.";

export const siteDescription =
  "GAiO Engine is an AI Search Visibility and Generative Engine Optimization (GEO) agency helping businesses improve retrievability, entity clarity, citation readiness, and measurable discovery across Google and AI answer engines.";

/** Public company inboxes — not team personal addresses. */
export const siteEmails = {
  connect: "connect@gaioengine.com",
  support: "support@gaioengine.com",
} as const;

/** Official GAiO Engine social profiles — single source of truth for footer and machine surfaces. */
export const siteSocials = {
  facebook: "https://www.facebook.com/profile.php?id=61593077471387",
  tiktok: "https://www.tiktok.com/@gaioengine",
  instagram: "https://www.instagram.com/gaioengine/",
  x: "https://x.com/Gaioengine",
} as const;

/** Absolute URL helper for machine-readable surfaces (llms.txt, JSON-LD). */
export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
