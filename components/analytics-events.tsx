"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/** Captures intentionally labelled conversion events without collecting link text or personal data. */
export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-event]") : null;
      const eventName = target?.dataset.event;
      if (!eventName) return;
      track(eventName, { location: target.dataset.location || "unknown" });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return null;
}
