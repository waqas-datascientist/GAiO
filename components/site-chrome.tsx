"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Menu, SearchCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ShareParticleCard } from "@/components/share-particle-card";
import { SocialsCard } from "@/components/socials-card";
import { navItems } from "@/lib/content";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { siteEmails, siteName } from "@/lib/site";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label={`${siteName} home`}>
      <span>{siteName}</span>
      <small>AI Search Visibility &amp; GEO</small>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Brand />
        <button ref={toggleRef} className="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
        <nav ref={navRef} id="main-navigation" className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <Link className="mobile-nav-action" href="/book" data-event="strategy_call_clicked" data-location="mobile_header" onClick={() => setOpen(false)}>Book a strategy call</Link>
          <Link className="mobile-nav-action mobile-nav-primary" href="/assessment" data-event="audit_started" data-location="mobile_header" onClick={() => setOpen(false)}>Run a free audit</Link>
        </nav>
        <div className="header-actions">
          <Link className="header-text-action" href="/book" data-event="strategy_call_clicked" data-location="desktop_header">Strategy call <CalendarDays size={15} /></Link>
          <Link className="button button-signal header-cta" href="/assessment" data-event="audit_started" data-location="desktop_header">Free AI audit <SearchCheck size={16} /></Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Brand />
          <p className="footer-blurb">AI Search Visibility and GEO for businesses that want to become easier to find, understand, trust, cite, and recommend.</p>
          <SocialsCard />
        </div>
        <nav className="footer-links" aria-label="Explore">
          <span className="meta">Explore</span>
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          <Link href="/authority-engine">Authority Engine</Link>
          <Link href="/resources">Resource library</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/authors">Authors & editors</Link>
          <Link href="/editorial-policy">Editorial policy</Link>
          <Link href="/evidence-standards">Evidence standards</Link>
          <Link href="/ai-visibility-measurement">Measurement policy</Link>
          <Link href="/corrections-policy">Corrections</Link>
          <Link href="/assessment">Readiness assessment</Link>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/llms.txt">llms.txt</a>
        </nav>
        <nav className="footer-links footer-contact" aria-label="Contact">
          <span className="meta">Contact</span>
          <a href={`mailto:${siteEmails.connect}`} aria-label={`Connect at ${siteEmails.connect}`}>
            <span>Connect</span>
            <span className="footer-contact-address">{siteEmails.connect}</span>
          </a>
          <a href={`mailto:${siteEmails.support}`} aria-label={`Support at ${siteEmails.support}`}>
            <span>Support</span>
            <span className="footer-contact-address">{siteEmails.support}</span>
          </a>
        </nav>
        <ShareParticleCard />
      </div>
      <div className="wrap footer-newsletter"><NewsletterSignup source="footer" compact /></div>
      <div className="footer-baseline wrap">
        <span>GAiO Engine — AI Search Visibility &amp; GEO Agency</span>
        <Link href="/assessment">Find your first visibility gap <ArrowRight size={14} /></Link>
      </div>
    </footer>
  );
}
